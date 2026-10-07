'use client';

import { useMemo } from 'react';
import { getKanjiDecomposition } from '../lib/radicalData';
import { playWaterDrop } from '../lib/traditionalAudio';

export default function RadicalBreakdownCard({
  currentChar,
  cardInfo,
  onOpenRadicalModal,
}) {
  const decomp = useMemo(() => {
    if (!currentChar) return null;
    return getKanjiDecomposition(currentChar);
  }, [currentChar]);

  if (!decomp) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        playWaterDrop();
        if (onOpenRadicalModal) onOpenRadicalModal();
      }}
      className="my-2 bg-gradient-to-br from-red-500/10 via-amber-500/10 to-red-500/10 p-3 rounded-2xl border-2 border-red-500/25 hover:border-torii transition-all cursor-pointer group shadow-2xs hover:shadow-sm"
      title="Bấm để xem bóc tách chiết tự chi tiết và danh sách chữ cùng bộ thủ (Phím R)"
    >
      {/* Header Widget */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-torii">
          <span>🧩</span>
          <span>Chiết tự bộ thủ cấu thành</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            playWaterDrop();
            if (onOpenRadicalModal) onOpenRadicalModal();
          }}
          className="text-[11px] font-bold text-torii hover:text-white bg-washi hover:bg-torii px-2 py-0.5 rounded-lg border border-torii/30 transition-all active:scale-95 flex items-center gap-1"
        >
          <span>Khám phá</span>
          <span>➔</span>
        </button>
      </div>

      {/* Equation Badges */}
      <div className="flex items-center gap-1.5 flex-wrap mb-2">
        {decomp.components.map((c, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="px-2 py-0.5 rounded-lg bg-washi/90 dark:bg-black/20 border border-washi-border font-kanji font-bold text-xs text-color-sumi shadow-2xs flex items-center gap-1">
              <span className="text-torii font-black text-sm">{c.char}</span>
              <span className="text-[10px] opacity-75 font-ui">{c.name}</span>
            </span>
            {i < decomp.components.length - 1 && (
              <span className="text-xs opacity-40 font-bold">+</span>
            )}
          </div>
        ))}

        <span className="text-xs opacity-40 font-bold">➔</span>
        <span className="px-2 py-0.5 rounded-lg bg-torii text-white font-bold text-xs shadow-2xs">
          {currentChar} {cardInfo?.hanViet ? `(${cardInfo.hanViet})` : ''}
        </span>
      </div>

      {/* Mnemonic Story */}
      <p className="text-xs font-medium leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
        {decomp.mnemonic || cardInfo?.mnemonic || 'Quan sát kỹ các nét cấu thành để ghi nhớ chữ Hán này.'}
      </p>

      {/* Footer hint */}
      <div className="text-[10px] text-torii font-semibold mt-1.5 flex items-center gap-1 opacity-70 group-hover:opacity-100">
        <span>🔍</span>
        <span>Nhấp để mở chi tiết & xem các chữ cùng bộ thủ (Phím R)</span>
      </div>
    </div>
  );
}
