'use client';

import { useState } from 'react';
import { playWaterDrop, playTempleBell } from '../lib/traditionalAudio';

/**
 * JapaneseSideScrolls - Cảnh Sắc Toàn Cảnh (Panoramic Zen Landscape)
 * Thiết kế bao quát không viền (Full-Bleed Frameless Scenery):
 * - Bờ Tây (Left): Vườn thiền Kyoto, hoa anh đào rủ Shidarezakura & suối rêu Sumi-e
 * - Bờ Đông (Right): Linh sơn Phú Sĩ tuyết phủ, đàn hạc hoàng hôn & rặng tùng cổ thụ
 * - Hòa quyện tự nhiên vào nền Washi bằng Gradient Masking đa lớp, hoàn toàn KHÔNG đóng khung
 */
export default function JapaneseSideScrolls({ theme = 'washi' }) {
  const isDark = theme === 'yozakura';
  const [leftRippling, setLeftRippling] = useState(false);
  const [rightRippling, setRightRippling] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleLeftClick = () => {
    playWaterDrop();
    setLeftRippling(true);
    setTimeout(() => setLeftRippling(false), 900);
  };

  const handleRightClick = () => {
    playTempleBell();
    setRightRippling(true);
    setTimeout(() => setRightRippling(false), 1200);
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        title="Hiện cảnh quan 2 bên sườn"
        className="fixed bottom-3 left-3 z-30 px-2.5 py-1 rounded-xl text-xs font-kanji font-bold bg-[#FFFDF9]/90 dark:bg-[#161D27]/90 text-stone-600 dark:text-stone-300 hover:text-torii transition-all border border-[#D8CEBF] dark:border-stone-700 shadow-sm flex items-center gap-1.5 cursor-pointer select-none"
      >
        <span>🗾</span>
        <span>Hiện cảnh quan</span>
      </button>
    );
  }

  return (
    <>
      {/* =========================================================================
          BỜ TÂY (WEST FLANK): CẢNH SẮC VƯỜN THIỀN KYOTO BAO QUÁT (KHÔNG KHUNG)
          ========================================================================= */}
      <aside
        aria-label="Cảnh sắc Vườn Thiền Cố Đô Kyoto bờ Tây"
        className="zen-flank-left group pointer-events-none"
      >
        <div
          onClick={handleLeftClick}
          title="Vườn Thiền Cố Đô Kyoto • Chạm nhẹ để lắng nghe giọt nước Suikinkutsu"
          className="relative w-full h-full overflow-hidden pointer-events-auto cursor-pointer select-none"
        >
          {/* Ảnh phong cảnh bao quát bờ Tây - Phủ kín toàn bộ chiều cao & sườn trái */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/zen_left_art.jpg"
            alt="Toàn cảnh Vườn Thiền Cố Đô Kyoto"
            className="w-full h-full object-cover object-left transition-transform duration-1000 ease-out group-hover:scale-103"
            style={{
              maskImage:
                'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.4) 75%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.4) 75%, transparent 100%)',
              opacity: isDark ? 0.52 : 0.82,
            }}
            loading="eager"
          />

          {/* Lớp sương mù mềm mại trên & dưới giúp tranh tan biến nhẹ nhàng vào nền */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#FAF8F5]/60 via-transparent to-[#FAF8F5]/80 dark:from-[#0C101A]/70 dark:via-transparent dark:to-[#0C101A]/85" />

          {/* Hiệu ứng gợn sóng nước Suikinkutsu khi tương tác */}
          {leftRippling && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="w-32 h-32 rounded-full border-2 border-emerald-400/80 animate-ping" />
            </div>
          )}

          {/* Dấu Triện Khắc & Thư Pháp Nghệ Thuật Chìm Vào Phong Cảnh (Không đóng khung) */}
          <div className="absolute bottom-9 left-6 pointer-events-none flex items-center gap-2 transition-opacity duration-300 opacity-75 group-hover:opacity-100">
            {/* Con dấu triện đỏ son truyền thống (Hanko) */}
            <div className="w-5 h-7 rounded-xs bg-[#BC002D]/90 text-white text-[10px] font-kanji font-bold flex items-center justify-center shadow-xs">
              寂
            </div>
            {/* Thư pháp phong nhã */}
            <div className="flex flex-col text-left drop-shadow-xs">
              <span className="text-xs font-kanji font-bold text-stone-800 dark:text-stone-200 tracking-widest">
                花鳥風月
              </span>
              <span className="text-[9px] font-kanji text-stone-600 dark:text-stone-400 tracking-wider">
                京都 • 禅庭
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          BỜ ĐÔNG (EAST FLANK): CẢNH SẮC LINH SƠN PHÚ SĨ BAO QUÁT (KHÔNG KHUNG)
          ========================================================================= */}
      <aside
        aria-label="Cảnh sắc Linh Sơn Phú Sĩ bờ Đông"
        className="zen-flank-right group pointer-events-none"
      >
        <div
          onClick={handleRightClick}
          title="Linh Sơn Phú Sĩ & Bạch Hạc Hoàng Hôn • Chạm nhẹ để lắng nghe chuông Bonshō"
          className="relative w-full h-full overflow-hidden pointer-events-auto cursor-pointer select-none"
        >
          {/* Ảnh phong cảnh bao quát bờ Đông - Phủ kín toàn bộ chiều cao & sườn phải */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/zen_right_art.jpg"
            alt="Toàn cảnh Linh Sơn Phú Sĩ và Bạch Hạc"
            className="w-full h-full object-cover object-right transition-transform duration-1000 ease-out group-hover:scale-103"
            style={{
              maskImage:
                'linear-gradient(to left, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.4) 75%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to left, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.4) 75%, transparent 100%)',
              opacity: isDark ? 0.52 : 0.82,
            }}
            loading="eager"
          />

          {/* Lớp sương mù mềm mại trên & dưới */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#FAF8F5]/60 via-transparent to-[#FAF8F5]/80 dark:from-[#0C101A]/70 dark:via-transparent dark:to-[#0C101A]/85" />

          {/* Hiệu ứng sóng âm chuông chùa Bonshō khi tương tác */}
          {rightRippling && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-32 h-32 rounded-full border-2 border-amber-400/80 animate-ping" />
            </div>
          )}

          {/* Dấu Triện Khắc & Thư Pháp Nghệ Thuật Chìm Vào Phong Cảnh (Không đóng khung) */}
          <div className="absolute bottom-9 right-6 pointer-events-none flex items-center gap-2 transition-opacity duration-300 opacity-75 group-hover:opacity-100 flex-row-reverse text-right">
            {/* Con dấu triện hổ phách (Hanko) */}
            <div className="w-5 h-7 rounded-xs bg-[#D97706]/90 text-white text-[10px] font-kanji font-bold flex items-center justify-center shadow-xs">
              雅
            </div>
            {/* Thư pháp phong nhã */}
            <div className="flex flex-col text-right drop-shadow-xs">
              <span className="text-xs font-kanji font-bold text-stone-800 dark:text-stone-200 tracking-widest">
                一期一会
              </span>
              <span className="text-[9px] font-kanji text-stone-600 dark:text-stone-400 tracking-wider">
                靈峰 • 富士
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
