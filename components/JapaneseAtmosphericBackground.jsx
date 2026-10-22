'use client';

/**
 * JapaneseAtmosphericBackground - Modern Kyoto Zen / Muji Luxury Edition
 * - Nền giấy Washi trơn màu be ngà ấm áp (#FBF9F5) và sương tuyết Yozakura (#0B0F17)
 * - Vân hạt mờ siêu mịn (Film Grain SVG 0.02 opacity) mô phỏng giấy Dó thủ công Kyoto
 * - Ánh hào quang khuếch tán mềm (Ethereal Ambient Radial Glow)
 * - Bỏ hoàn toàn các bức tranh dán 2 bên để không gian thoáng đãng, rộng rãi tuyệt đối
 */
export default function JapaneseAtmosphericBackground({ theme = 'washi' }) {
  const isDark = theme === 'yozakura';

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Ánh sáng ấm Ethereal Zen Glow nhẹ nhàng ở trung tâm */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-40 w-[800px] lg:w-[1100px] h-[550px] rounded-full transition-all duration-1000 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(217, 119, 6, 0.07) 0%, rgba(185, 28, 28, 0.04) 35%, rgba(11, 15, 23, 0) 70%)'
            : 'radial-gradient(circle, rgba(217, 119, 6, 0.06) 0%, rgba(185, 28, 28, 0.03) 40%, rgba(251, 249, 245, 0) 75%)',
          filter: 'blur(70px)',
        }}
      />

      {/* 2. Lớp vân hạt mờ siêu mịn Film Grain Washi (0.02 - 0.03 opacity) tạo cảm giác giấy dó thủ công */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.028] dark:opacity-[0.038] mix-blend-multiply dark:mix-blend-screen pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="zenGrainFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#zenGrainFilter)" />
      </svg>

      {/* 3. Dải sương mù Kasumi (霞) lượn sóng tàng hình cực mờ ở chân trời */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-30 dark:opacity-20 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C320,130 640,30 960,90 C1200,135 1360,50 1440,70 L1440,160 L0,160 Z"
            fill={isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(217, 119, 6, 0.025)'}
          />
        </svg>
      </div>
    </div>
  );
}
