'use client';

import { useMemo } from 'react';
import { getKanjiDecomposition } from '../lib/radicalData';
import { playWaterDrop } from '../lib/traditionalAudio';

export default function RadicalBreakdownCard({
  currentChar,
  cardInfo,
  onOpenRadicalModal,
  fullDb = null,
}) {
  const decomp = useMemo(() => {
    if (!currentChar) return null;
    const dbItem = (fullDb && fullDb[currentChar]) ? fullDb[currentChar] : null;
    const mergedCardInfo = dbItem ? { ...dbItem, ...cardInfo } : cardInfo;
    return getKanjiDecomposition(currentChar, mergedCardInfo, fullDb);
  }, [currentChar, cardInfo, fullDb]);

  if (!decomp) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        playWaterDrop();
        if (onOpenRadicalModal) onOpenRadicalModal();
      }}
      className="my-2 bg-yellow-50 dark:bg-stone-850 p-3 rounded-2xl border-2 border-stone-900 dark:border-white hover:border-akira dark:hover:border-rose-400 hover:bg-yellow-100/70 dark:hover:bg-stone-800 shadow-manga-sm transition-colors cursor-pointer group active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
    >
      {/* Header Widget */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-black text-akira dark:text-rose-400">
          <span>🧩</span>
          <span>CHIẾT TỰ BỘ THỦ CẤU THÀNH</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            playWaterDrop();
            if (onOpenRadicalModal) onOpenRadicalModal();
          }}
          className="text-[11px] font-black text-stone-950 bg-manga-yellow hover:bg-yellow-300 px-2.5 py-0.5 rounded-lg border-2 border-stone-900 dark:border-white shadow-2xs transition-all active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1 cursor-pointer"
        >
          <span>Khám phá</span>
          <span>➔</span>
        </button>
      </div>

      {/* Equation Badges */}
      <div className="flex items-center gap-1.5 flex-wrap mb-2">
        {decomp.components.map((c, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-white font-kanji font-bold text-xs text-stone-950 dark:text-white shadow-2xs flex items-center gap-1">
              <span className="text-akira dark:text-rose-400 font-black text-sm">{c.char}</span>
              <span className="text-[10px] font-bold opacity-80">{c.name.replace(/^Bộ\s+/, '')}</span>
            </span>
            {i < decomp.components.length - 1 && (
              <span className="text-xs font-black text-stone-900 dark:text-white">+</span>
            )}
          </div>
        ))}

        <span className="text-xs font-black text-stone-900 dark:text-white">➔</span>
        <span className="px-2.5 py-0.5 rounded-lg bg-akira text-white font-black text-xs border-2 border-stone-900 dark:border-white shadow-2xs">
          {currentChar} {cardInfo?.hanViet ? `(${cardInfo.hanViet})` : ''}
        </span>
      </div>

      {/* Mnemonic Story */}
      <p className="text-xs font-bold leading-relaxed text-stone-800 dark:text-stone-200">
        {decomp.mnemonic || cardInfo?.mnemonic || 'Quan sát kỹ các nét cấu thành để ghi nhớ chữ Hán này.'}
      </p>

      {/* Footer hint */}
      <div className="text-[10px] text-akira dark:text-rose-400 font-black mt-2 flex items-center gap-1">
        <span>🔍</span>
        <span>NHẤP ĐỂ MỞ CHI TIẾT & XEM CÁC CHỮ CÙNG BỘ THỦ [R]</span>
      </div>
    </div>
  );
}
