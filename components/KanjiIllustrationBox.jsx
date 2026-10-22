'use client';

import { getIllustrationForKanji } from '../lib/kanjiIllustrations';

export default function KanjiIllustrationBox({ currentChar, cardInfo, variant = 'front' }) {
  const illustration = getIllustrationForKanji(currentChar, cardInfo);

  if (!illustration) return null;

  // 1. Biến thể mặt trước thẻ học (Front Card Visual Badge):
  if (variant === 'front') {
    return (
      <div className="flex items-center justify-center my-1.5 animate-fadeIn">
        {illustration.image ? (
          <div className="relative group overflow-hidden rounded-2xl border border-stone-200/80 dark:border-stone-750/80 shadow-[0_4px_16px_-2px_rgba(45,38,28,0.03)] bg-stone-100 max-w-[180px] sm:max-w-[210px] h-20 sm:h-24 flex items-center justify-center">
            <img
              src={illustration.image}
              alt={illustration.concept}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-2">
              <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide truncate flex items-center gap-1 drop-shadow-md">
                <span>{illustration.badge}</span>
                <span>{illustration.concept}</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-amber-500/10 dark:bg-stone-800 border border-amber-500/25 dark:border-stone-700 shadow-2xs flex items-center gap-2 transition-colors">
            <span className="text-xl sm:text-2xl drop-shadow-xs">{illustration.badge}</span>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400 block">
                HÌNH TƯỢNG:
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#BC002D] dark:text-rose-400 font-kanji">
                {illustration.concept}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. Biến thể mặt sau thẻ học (Back Card Mnemonic Box):
  return (
    <div className="w-full my-1.5 p-3 sm:p-3.5 rounded-2xl bg-stone-50/90 dark:bg-stone-850/90 border border-stone-200/80 dark:border-stone-750/80 text-xs shadow-[0_4px_16px_-2px_rgba(45,38,28,0.03)] animate-fadeIn">
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-stone-200/60 dark:border-stone-800/60">
        <span className="font-bold text-[#BC002D] dark:text-rose-400 flex items-center gap-1.5 text-xs">
          <span>🎨</span>
          <span>HÌNH TƯỢNG & MẸO GHI NHỚ:</span>
        </span>
        <span className="text-[10px] font-bold text-amber-900 dark:text-amber-200 bg-amber-500/15 border border-amber-500/25 px-2.5 py-0.5 rounded-full">
          {illustration.badge} {illustration.concept}
        </span>
      </div>

      <div className="flex items-start gap-3">
        {illustration.image && (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200/80 dark:border-stone-700/80 shadow-2xs">
            <img
              src={illustration.image}
              alt={illustration.concept}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1">
          <p className="text-xs leading-relaxed font-medium text-stone-700 dark:text-stone-300">
            {illustration.visualDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
