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
          // Tranh mộc bản Nhật Bản Ukiyo-e thực thụ (Mặt trời, Mặt trăng, Núi Phú Sĩ, Cây cổ thụ...)
          <div className="relative group overflow-hidden rounded-2xl border-2 border-amber-600/30 shadow-sm bg-washi max-w-[180px] sm:max-w-[210px] h-20 sm:h-24 flex items-center justify-center">
            <img
              src={illustration.image}
              alt={illustration.concept}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-1.5 sm:p-2">
              <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide truncate flex items-center gap-1 drop-shadow-md">
                <span>{illustration.badge}</span>
                <span>{illustration.concept}</span>
              </span>
            </div>
          </div>
        ) : (
          // Khung huy hiệu tượng hình (Pictograph Concept Badge)
          <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-washi/90 border border-washi-border shadow-2xs flex items-center gap-2 hover:border-torii/50 transition-all">
            <span className="text-xl sm:text-2xl drop-shadow-xs">{illustration.badge}</span>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-60 block">
                Hình tượng:
              </span>
              <span className="text-xs sm:text-sm font-bold text-torii font-kanji">
                {illustration.concept}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. Biến thể mặt sau thẻ học (Back Card Mnemonic Box):
  // Hiển thị khung tranh kèm câu chuyện chiết tự gợi nhớ chữ
  return (
    <div className="w-full my-2 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 text-xs shadow-2xs animate-fadeIn">
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-amber-500/20">
        <span className="font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 text-xs">
          <span>🎨</span>
          <span>HÌNH TƯỢNG & MẸO GHI NHỚ:</span>
        </span>
        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full">
          {illustration.badge} {illustration.concept}
        </span>
      </div>

      <div className="flex items-start gap-3">
        {illustration.image && (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-amber-500/40 shadow-xs">
            <img
              src={illustration.image}
              alt={illustration.concept}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1">
          <p className="text-xs leading-relaxed opacity-90 font-medium text-color-sumi">
            {illustration.visualDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
