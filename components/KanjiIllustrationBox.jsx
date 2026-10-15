'use client';

import { getIllustrationForKanji } from '../lib/kanjiIllustrations';

export default function KanjiIllustrationBox({ currentChar, cardInfo, variant = 'front' }) {
  const illustration = getIllustrationForKanji(currentChar, cardInfo);

  if (!illustration) return null;

  // 1. Biến thể mặt trước thẻ học (Front Card Visual Badge):
  // Hiển thị khung tranh nghệ thuật hoặc huy hiệu tượng hình sinh động bên cạnh/dưới chữ Kanji
  if (variant === 'front') {
    return (
      <div className="flex items-center justify-center my-1.5 animate-fadeIn">
        {illustration.image ? (
          // Tranh Manga / Ukiyo-e thực thụ
          <div className="relative group overflow-hidden rounded-2xl border-2 border-stone-900 dark:border-white shadow-manga-sm bg-stone-100 max-w-[180px] sm:max-w-[210px] h-20 sm:h-24 flex items-center justify-center">
            <img
              src={illustration.image}
              alt={illustration.concept}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-2">
              <span className="text-[11px] sm:text-xs font-black text-white tracking-wide truncate flex items-center gap-1 drop-shadow-md">
                <span>{illustration.badge}</span>
                <span>{illustration.concept}</span>
              </span>
            </div>
          </div>
        ) : (
          // Khung huy hiệu tượng hình
          <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-yellow-100 dark:bg-stone-800 border-2 border-stone-900 dark:border-white shadow-manga-sm flex items-center gap-2 transition-colors">
            <span className="text-xl sm:text-2xl drop-shadow-xs">{illustration.badge}</span>
            <div className="text-left">
              <span className="text-[10px] uppercase font-black tracking-wider text-stone-600 dark:text-stone-400 block">
                HÌNH TƯỢNG:
              </span>
              <span className="text-xs sm:text-sm font-black text-akira dark:text-rose-400 font-kanji">
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
    <div className="w-full my-2 p-3 sm:p-3.5 rounded-2xl bg-yellow-50 dark:bg-stone-850 border-2 border-stone-900 dark:border-white text-xs shadow-manga-sm animate-fadeIn">
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b-2 border-stone-900 dark:border-white">
        <span className="font-black text-akira dark:text-rose-400 flex items-center gap-1.5 text-xs">
          <span>🎨</span>
          <span>HÌNH TƯỢNG & MẸO GHI NHỚ:</span>
        </span>
        <span className="text-[10px] font-black text-stone-950 bg-manga-yellow border-2 border-stone-900 dark:border-white px-2 py-0.5 rounded-lg shadow-2xs">
          {illustration.badge} {illustration.concept}
        </span>
      </div>

      <div className="flex items-start gap-3">
        {illustration.image && (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 border-stone-900 dark:border-white shadow-2xs">
            <img
              src={illustration.image}
              alt={illustration.concept}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1">
          <p className="text-xs leading-relaxed font-bold text-stone-800 dark:text-stone-200">
            {illustration.visualDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
