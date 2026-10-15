'use client';

import { useState } from 'react';
import { playWaterDrop, playTempleBell } from '../lib/traditionalAudio';

/**
 * JapaneseSideScrolls - Không Gian Mỹ Học Sườn Màn Hình Chuẩn Zen Nhật Bản
 * Cung cấp 2 chế độ mỹ học thanh tao, được định vị chuẩn xác vào giữa khoảng trống 2 bên sườn:
 * 1. 'sumie' (Mặc định): Tranh Thủy Mặc Sumi-e & Thi Ca Haiku cổ điển hòa tan vào nền Washi (cực kỳ yên bình, không viền cứng, không che khuất).
 * 2. 'shikishi': Thẻ tranh Washi Shikishi truyền thống (Cổng Torii & Núi Phú Sĩ) viền vàng mỏng nhẹ, kích thước vừa vặn hoàn hảo.
 * 3. 'hidden': Ẩn hoàn toàn để giữ khoảng trống thuần khiết Wabi-Sabi.
 */
export default function JapaneseSideScrolls({ theme = 'washi' }) {
  const isDark = theme === 'yozakura';
  const [styleMode, setStyleMode] = useState('sumie'); // 'sumie' | 'shikishi' | 'hidden'
  const [leftRippling, setLeftRippling] = useState(false);
  const [rightRippling, setRightRippling] = useState(false);

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

  if (styleMode === 'hidden') {
    return (
      <button
        onClick={() => setStyleMode('sumie')}
        title="Hiện trang trí 2 bên sườn"
        className="fixed bottom-3 left-3 z-30 px-2 py-1 rounded text-[11px] font-kanji bg-stone-200/60 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-all border border-stone-300/40"
      >
        🎋 Hiện họa tiết Zen
      </button>
    );
  }

  return (
    <>
      {/* =========================================================================
          BỜ TÂY (WEST FLANK): CĂN CHÍNH GIỮA KHOẢNG TRỐNG BÊN TRÁI
          ========================================================================= */}
      <aside
        aria-label="Khoảng không gian bờ Tây"
        className="zen-flank-container fixed left-0 top-0 bottom-0 z-10 select-none hidden 2xl:flex items-center justify-center pointer-events-none"
        style={{ width: 'calc((100vw - 1152px) / 2)' }}
      >
        <div className="relative flex flex-col items-center pointer-events-auto">
          {/* Nút chuyển đổi phong cách nhỏ tao nhã ở góc trên */}
          <div className="absolute -top-12 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setStyleMode(styleMode === 'sumie' ? 'shikishi' : 'sumie')}
              className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100/80 dark:bg-stone-800/80 border border-stone-300/60 dark:border-stone-700/60 text-stone-500 hover:text-stone-800 transition-all shadow-xs"
              title="Đổi phong cách trang trí 2 bên"
            >
              {styleMode === 'sumie' ? '🖼️ Thẻ tranh Shikishi' : '🎋 Thủy mặc Sumi-e'}
            </button>
          </div>

          {/* CHẾ ĐỘ 1: THỦY MẶC SUMI-E & THƠ HAIKU (SIÊU YÊN BÌNH, KHÔNG BỊ CẮT VỤN) */}
          {styleMode === 'sumie' && (
            <div
              onClick={handleLeftClick}
              title="Trúc Lâm Thủy Mặc • Chạm nhẹ để lắng nghe giọt nước Suikinkutsu"
              className="group cursor-pointer flex flex-col items-center p-3 rounded-2xl transition-all duration-700 hover:bg-stone-500/5"
            >
              {/* Nét vẽ Thủy mặc cành trúc thanh thoát (Pure Sumi-e Brush SVG) */}
              <div className="w-24 h-44 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 100 180"
                  className="w-full h-full filter drop-shadow-xs transition-transform duration-700 group-hover:scale-105"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Thân tre mực tàu uyển chuyển */}
                  <path
                    d="M 50 180 C 48 140 52 110 47 70 C 45 40 48 20 46 0"
                    stroke={isDark ? '#e2e8f0' : '#292524'}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeOpacity={isDark ? '0.35' : '0.22'}
                  />
                  {/* Mắt tre */}
                  <ellipse cx="48.5" cy="112" rx="4" ry="1.5" fill={isDark ? '#e2e8f0' : '#292524'} fillOpacity={isDark ? '0.45' : '0.35'} />
                  <ellipse cx="46.5" cy="68" rx="4" ry="1.5" fill={isDark ? '#e2e8f0' : '#292524'} fillOpacity={isDark ? '0.45' : '0.35'} />

                  {/* Nhánh tre phụ */}
                  <path
                    d="M 47 70 C 58 60 70 58 82 52"
                    stroke={isDark ? '#cbd5e1' : '#44403c'}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeOpacity={isDark ? '0.35' : '0.25'}
                  />
                  <path
                    d="M 48 112 C 35 102 24 100 12 94"
                    stroke={isDark ? '#cbd5e1' : '#44403c'}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeOpacity={isDark ? '0.35' : '0.25'}
                  />

                  {/* Lá tre thư pháp mềm mại rủ xuống */}
                  {/* Nhóm lá phải */}
                  <path d="M 82 52 C 92 50 99 58 96 66 C 92 60 84 56 82 52 Z" fill={isDark ? '#94a3b8' : '#1c1917'} fillOpacity={isDark ? '0.35' : '0.25'} />
                  <path d="M 82 52 C 90 42 98 44 94 48 C 88 47 84 50 82 52 Z" fill={isDark ? '#94a3b8' : '#1c1917'} fillOpacity={isDark ? '0.3' : '0.22'} />
                  <path d="M 72 56 C 80 62 84 72 80 78 C 76 70 72 64 72 56 Z" fill={isDark ? '#94a3b8' : '#1c1917'} fillOpacity={isDark ? '0.28' : '0.2'} />

                  {/* Nhóm lá trái */}
                  <path d="M 12 94 C 2 92 -4 100 2 108 C 5 101 10 97 12 94 Z" fill={isDark ? '#94a3b8' : '#1c1917'} fillOpacity={isDark ? '0.35' : '0.25'} />
                  <path d="M 12 94 C 3 86 -2 88 4 92 C 8 91 11 93 12 94 Z" fill={isDark ? '#94a3b8' : '#1c1917'} fillOpacity={isDark ? '0.3' : '0.22'} />

                  {/* Nhóm ngọn */}
                  <path d="M 46 15 C 40 4 34 2 30 0 C 35 7 40 12 46 15 Z" fill={isDark ? '#94a3b8' : '#1c1917'} fillOpacity={isDark ? '0.4' : '0.3'} />
                  <path d="M 46 15 C 54 4 60 2 64 0 C 58 7 52 12 46 15 Z" fill={isDark ? '#94a3b8' : '#1c1917'} fillOpacity={isDark ? '0.4' : '0.3'} />
                </svg>

                {/* Giọt nước gợn sóng khi click */}
                {leftRippling && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-16 h-16 rounded-full border border-emerald-500/70 animate-ping" />
                  </div>
                )}
              </div>

              {/* Thơ Haiku Matsuo Basho khắc theo trục dọc (Thư pháp chân truyền) */}
              <div className="mt-3 flex items-start gap-2.5">
                {/* Cột 1: Câu thơ Haiku nổi tiếng */}
                <div className="writing-vertical text-[13px] font-kanji text-stone-600 dark:text-stone-300 tracking-widest leading-none select-none opacity-80 group-hover:opacity-100 transition-opacity">
                  古池や
                </div>
                <div className="writing-vertical text-[13px] font-kanji text-stone-600 dark:text-stone-300 tracking-widest leading-none select-none opacity-80 group-hover:opacity-100 transition-opacity">
                  蛙飛びこむ
                </div>
                <div className="writing-vertical text-[13px] font-kanji text-stone-600 dark:text-stone-300 tracking-widest leading-none select-none opacity-80 group-hover:opacity-100 transition-opacity">
                  水の音
                </div>

                {/* Con dấu triện son đỏ 『寂』 (Tịch - Tĩnh lặng Zen) */}
                <div className="flex flex-col items-center mt-auto">
                  <div className="w-4 h-6 rounded-xs bg-[#BC002D]/90 text-white text-[9px] font-kanji font-bold flex items-center justify-center shadow-2xs border border-red-900/30">
                    寂
                  </div>
                </div>
              </div>

              <span className="text-[10px] text-stone-400 dark:text-stone-500 font-sans tracking-wider mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                Ao xưa tiếng ếch xao
              </span>
            </div>
          )}

          {/* CHẾ ĐỘ 2: THẺ TRANH WASHI SHIKISHI CỔNG TORII (GỌN GÀNG, VIỀN VÀNG DÁT MỎNG) */}
          {styleMode === 'shikishi' && (
            <div
              onClick={handleLeftClick}
              title="Cổng Torii & Hoa Anh Đào bên hồ • Chạm để lắng nghe giọt nước"
              className="group cursor-pointer flex flex-col items-center transition-transform duration-500 hover:scale-105"
            >
              {/* Dây treo lụa mỏng */}
              <div className="w-1.5 h-1.5 rounded-full bg-amber-700/80 mb-1" />
              <div className="w-0.5 h-4 bg-amber-700/50 mb-1" />

              {/* Thẻ tranh Shikishi vuông vức tinh tế */}
              <div className="relative w-28 h-28 p-1.5 rounded-sm bg-[#FFFDF9] dark:bg-[#161D27] shadow-md border border-stone-300/80 dark:border-stone-700/80">
                <div className="absolute inset-1 rounded-2xs border border-amber-600/30 pointer-events-none" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/illustrations/torii.jpg"
                  alt="Cổng Torii bên hồ nước"
                  className="w-full h-full object-cover rounded-2xs"
                />
              </div>

              {/* Dải thơ Tanzaku treo dưới */}
              <div className="mt-2 flex flex-col items-center">
                <span className="text-[11px] font-kanji font-bold text-stone-800 dark:text-stone-200 tracking-widest">
                  一期一会
                </span>
                <div className="w-3.5 h-3.5 rounded-xs bg-[#BC002D] text-white text-[7px] font-kanji font-bold flex items-center justify-center mt-1 shadow-2xs">
                  和
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* =========================================================================
          BỜ ĐÔNG (EAST FLANK): CĂN CHÍNH GIỮA KHOẢNG TRỐNG BÊN PHẢI
          ========================================================================= */}
      <aside
        aria-label="Khoảng không gian bờ Đông"
        className="zen-flank-container fixed right-0 top-0 bottom-0 z-10 select-none hidden 2xl:flex items-center justify-center pointer-events-none"
        style={{ width: 'calc((100vw - 1152px) / 2)' }}
      >
        <div className="relative flex flex-col items-center pointer-events-auto">
          {/* Nút chuyển đổi phong cách nhỏ tao nhã ở góc trên */}
          <div className="absolute -top-12 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setStyleMode(styleMode === 'sumie' ? 'shikishi' : 'sumie')}
              className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100/80 dark:bg-stone-800/80 border border-stone-300/60 dark:border-stone-700/60 text-stone-500 hover:text-stone-800 transition-all shadow-xs"
              title="Đổi phong cách trang trí 2 bên"
            >
              {styleMode === 'sumie' ? '🖼️ Thẻ tranh Shikishi' : '🏔️ Thủy mặc Sumi-e'}
            </button>
          </div>

          {/* CHẾ ĐỘ 1: THỦY MẶC BẠCH HẠC & NÚI PHÚ SĨ (SIÊU YÊN BÌNH, KHÔNG BỊ CẮT VỤN) */}
          {styleMode === 'sumie' && (
            <div
              onClick={handleRightClick}
              title="Linh Sơn & Bạch Hạc • Chạm nhẹ để lắng nghe chuông chùa Bonshō"
              className="group cursor-pointer flex flex-col items-center p-3 rounded-2xl transition-all duration-700 hover:bg-stone-500/5"
            >
              {/* Nét vẽ Thủy mặc Bạch hạc & Đỉnh núi tuyết (Pure Sumi-e Crane & Fuji SVG) */}
              <div className="w-24 h-44 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 100 180"
                  className="w-full h-full filter drop-shadow-xs transition-transform duration-700 group-hover:scale-105"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Mặt trời đỏ Wabi-sabi mờ ảo phía xa */}
                  <circle
                    cx="50"
                    cy="40"
                    r="20"
                    fill="#BC002D"
                    fillOpacity={isDark ? '0.25' : '0.14'}
                  />

                  {/* Đôi Bạch Hạc sải cánh bay lượn (Tsuru Crane Silhouette) */}
                  {/* Hạc 1 (Lớn) */}
                  <g transform="translate(32, 28) scale(0.7)">
                    <path
                      d="M 20 20 C 35 10 50 12 60 5 C 48 18 40 25 38 32 C 34 26 26 22 20 20 Z"
                      fill={isDark ? '#f8fafc' : '#1c1917'}
                      fillOpacity={isDark ? '0.6' : '0.45'}
                    />
                    <path
                      d="M 38 32 C 45 38 55 45 62 48 C 50 44 42 40 38 32 Z"
                      fill={isDark ? '#f8fafc' : '#1c1917'}
                      fillOpacity={isDark ? '0.5' : '0.35'}
                    />
                    {/* Đầu mỏ hạc */}
                    <circle cx="62" cy="4" r="1.5" fill="#BC002D" fillOpacity="0.8" />
                  </g>

                  {/* Hạc 2 (Nhỏ xa xa) */}
                  <g transform="translate(18, 55) scale(0.45)">
                    <path
                      d="M 20 20 C 35 10 50 12 60 5 C 48 18 40 25 38 32 C 34 26 26 22 20 20 Z"
                      fill={isDark ? '#f8fafc' : '#1c1917'}
                      fillOpacity={isDark ? '0.45' : '0.3'}
                    />
                  </g>

                  {/* Đỉnh núi Phú Sĩ thủy mặc thanh thoát ở chân cảnh */}
                  <path
                    d="M 10 170 C 30 145 42 105 50 100 C 58 105 70 145 90 170 Z"
                    stroke={isDark ? '#cbd5e1' : '#44403c'}
                    strokeWidth="1.8"
                    strokeOpacity={isDark ? '0.35' : '0.25'}
                    fill="none"
                  />
                  {/* Tuyết phủ đỉnh */}
                  <path
                    d="M 44 115 C 48 112 52 112 56 115 C 53 105 50 102 47 105 Z"
                    fill={isDark ? '#ffffff' : '#78716c'}
                    fillOpacity={isDark ? '0.4' : '0.2'}
                  />

                  {/* Dải mây Kasumi ngang sườn núi */}
                  <path
                    d="M 5 140 C 25 135 45 145 65 138 C 85 132 95 142 105 138"
                    stroke={isDark ? '#94a3b8' : '#a8a29e'}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeOpacity={isDark ? '0.2' : '0.15'}
                    filter="blur(1px)"
                  />
                </svg>

                {/* Chuông ngân sóng âm khi click */}
                {rightRippling && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-16 h-16 rounded-full border border-amber-400/80 animate-ping" />
                  </div>
                )}
              </div>

              {/* Thơ Haiku Thư Pháp Trục Dọc (Thiền Viện Thanh Sơn) */}
              <div className="mt-3 flex items-start gap-2.5">
                {/* Con dấu triện vàng 『雅』 (Nhã - Tao nhã Miyabi) */}
                <div className="flex flex-col items-center mt-auto">
                  <div className="w-4 h-6 rounded-xs bg-[#D97706]/90 text-white text-[9px] font-kanji font-bold flex items-center justify-center shadow-2xs border border-amber-800/30">
                    雅
                  </div>
                </div>

                {/* Cột chữ Hán tự tao nhã */}
                <div className="writing-vertical text-[13px] font-kanji text-stone-600 dark:text-stone-300 tracking-widest leading-none select-none opacity-80 group-hover:opacity-100 transition-opacity">
                  明鏡止水
                </div>
                <div className="writing-vertical text-[13px] font-kanji text-stone-600 dark:text-stone-300 tracking-widest leading-none select-none opacity-80 group-hover:opacity-100 transition-opacity">
                  心清如水
                </div>
              </div>

              <span className="text-[10px] text-stone-400 dark:text-stone-500 font-sans tracking-wider mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                Lòng sáng như gương
              </span>
            </div>
          )}

          {/* CHẾ ĐỘ 2: THẺ TRANH WASHI SHIKISHI PHÚ SĨ (GỌN GÀNG, VIỀN VÀNG DÁT MỎNG) */}
          {styleMode === 'shikishi' && (
            <div
              onClick={handleRightClick}
              title="Linh Sơn Phú Sĩ & Mặt Trời Đỏ • Chạm để lắng nghe chuông chùa"
              className="group cursor-pointer flex flex-col items-center transition-transform duration-500 hover:scale-105"
            >
              {/* Dây treo lụa mỏng */}
              <div className="w-1.5 h-1.5 rounded-full bg-amber-700/80 mb-1" />
              <div className="w-0.5 h-4 bg-amber-700/50 mb-1" />

              {/* Thẻ tranh Shikishi vuông vức tinh tế */}
              <div className="relative w-28 h-28 p-1.5 rounded-sm bg-[#FFFDF9] dark:bg-[#161D27] shadow-md border border-stone-300/80 dark:border-stone-700/80">
                <div className="absolute inset-1 rounded-2xs border border-amber-600/30 pointer-events-none" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/illustrations/fuji.jpg"
                  alt="Núi Phú Sĩ và mặt trời đỏ"
                  className="w-full h-full object-cover rounded-2xs"
                />
              </div>

              {/* Dải thơ Tanzaku treo dưới */}
              <div className="mt-2 flex flex-col items-center">
                <span className="text-[11px] font-kanji font-bold text-stone-800 dark:text-stone-200 tracking-widest">
                  明鏡止水
                </span>
                <div className="w-3.5 h-3.5 rounded-xs bg-[#D97706] text-white text-[7px] font-kanji font-bold flex items-center justify-center mt-1 shadow-2xs">
                  雅
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
