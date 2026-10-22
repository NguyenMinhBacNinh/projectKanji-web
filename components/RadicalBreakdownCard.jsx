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
    const dbItem = fullDb && fullDb[currentChar] ? fullDb[currentChar] : null;
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
      className="my-1.5 bg-stone-50/90 dark:bg-stone-850/90 p-3 rounded-2xl border border-stone-200/80 dark:border-stone-750/80 hover:border-[#BC002D]/50 hover:bg-white dark:hover:bg-stone-800 shadow-[0_4px_16px_-2px_rgba(45,38,28,0.03)] transition-all cursor-pointer group"
    >
      {/* Header Widget */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#BC002D] dark:text-rose-400">
          <span>🧩</span>
          <span>CHIẾT TỰ BỘ THỦ CẤU THÀNH</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            playWaterDrop();
            if (onOpenRadicalModal) onOpenRadicalModal();
          }}
          className="text-[10px] font-bold text-amber-900 dark:text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 px-2.5 py-0.5 rounded-full border border-amber-500/30 transition-all flex items-center gap-1 cursor-pointer"
        >
          <span>Khám phá</span>
          <span>➔</span>
        </button>
      </div>

      {/* Equation Badges */}
      <div className="flex items-center gap-1.5 flex-wrap mb-2">
        {decomp.components.map((c, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700/80 font-kanji font-bold text-xs text-stone-900 dark:text-white shadow-2xs flex items-center gap-1">
              <span className="text-[#BC002D] dark:text-rose-400 font-bold text-sm">
                {c.char}
              </span>
              <span className="text-[10px] font-medium opacity-80">
                {c.name.replace(/^Bộ\s+/, '')}
              </span>
            </span>
            {i < decomp.components.length - 1 && (
              <span className="text-xs font-bold text-stone-400">+</span>
            )}
          </div>
        ))}

        <span className="text-xs font-bold text-stone-400">➔</span>
        <span className="px-2.5 py-0.5 rounded-lg bg-[#BC002D] text-white font-bold text-xs shadow-2xs">
          {currentChar} {cardInfo?.hanViet ? `(${cardInfo.hanViet})` : ''}
        </span>
      </div>

      {/* Mnemonic Story */}
      <p className="text-xs font-medium leading-relaxed text-stone-700 dark:text-stone-300">
        {decomp.mnemonic || cardInfo?.mnemonic || 'Quan sát kỹ các nét cấu thành để ghi nhớ chữ Hán này.'}
      </p>

      {/* Footer hint */}
      <div className="text-[10px] text-[#BC002D] dark:text-rose-400 font-bold mt-2 flex items-center gap-1">
        <span>🔍</span>
        <span>NHẤP ĐỂ MỞ CHI TIẾT & XEM CÁC CHỮ CÙNG BỘ THỦ [R]</span>
      </div>
    </div>
  );
}
