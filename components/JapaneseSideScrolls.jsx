'use client';

import { useState } from 'react';
import { playWaterDrop, playTempleBell, playWoodClapper } from '../lib/traditionalAudio';
import {
  ToriiShrineIcon,
  BambooIcon,
  SensuFanIcon,
  KatanaIcon,
  PagodaIcon,
  OrigamiCraneIcon,
  SakuraFlowerIcon,
} from './ZenIcons';

/**
 * JapaneseSideScrolls - Không Gian Mỹ Học Sườn Màn Hình Chuẩn Zen Nhật Bản
 * Cung cấp 3 chế độ mỹ học cao cấp, được định vị chuẩn xác vào giữa khoảng trống 2 bên sườn:
 * 1. 'kakejiku' (Mặc định): Tranh Cuộn Thủy Mặc Shin-Hanga Đạt Giải (Vườn Thiền Kyoto bên trái & Linh Sơn Phú Sĩ bên phải).
 * 2. 'shikishi': Thẻ tranh Washi Shikishi truyền thống (Cổng Torii Thần Đạo & Núi Phú Sĩ Mặt Trời Đỏ) viền vàng mỏng nhẹ.
 * 3. 'zen_icons': Bộ Huy Hiệu & Biểu Tượng Văn Hóa Nhật Bản tinh xảo (Sakura, Torii, Sensu, Katana, Hạc trắng).
 * 4. 'hidden': Ẩn hoàn toàn để giữ khoảng trống thuần khiết Wabi-Sabi.
 */
export default function JapaneseSideScrolls({ theme = 'washi' }) {
  const isDark = theme === 'yozakura';
  // Mặc định là 'kakejiku' (Tranh mộc bản nghệ thuật cao cấp)
  const [styleMode, setStyleMode] = useState('kakejiku'); // 'kakejiku' | 'shikishi' | 'zen_icons' | 'hidden'
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
        onClick={() => {
          playWoodClapper();
          setStyleMode('kakejiku');
        }}
        title="Hiện trang trí nghệ thuật 2 bên sườn"
        className="fixed bottom-3 left-3 z-30 px-2.5 py-1 rounded-xl text-xs font-kanji font-bold bg-[#FFFDF9]/90 dark:bg-[#161D27]/90 text-stone-700 dark:text-stone-300 hover:text-torii transition-all border border-[#D8CEBF] dark:border-stone-700 shadow-md flex items-center gap-1.5 cursor-pointer"
      >
        <span>🖼️</span>
        <span>Hiện tranh 2 bên</span>
      </button>
    );
  }

  return (
    <>
      {/* =========================================================================
          BỜ TÂY (WEST FLANK): CĂN CHÍNH GIỮA KHOẢNG TRỐNG BÊN TRÁI
          ========================================================================= */}
      <aside aria-label="Khoảng không gian bờ Tây" className="zen-flank-left">
        <div className="relative flex flex-col items-center pointer-events-auto group">
          {/* Menu chuyển đổi phong cách tao nhã khi hover */}
          <div className="absolute -top-9 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
            <div className="p-0.5 rounded-xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border border-[#D8CEBF] dark:border-stone-700 shadow-md flex items-center gap-0.5 text-[10px] font-bold">
              <button
                onClick={() => {
                  playWoodClapper();
                  setStyleMode('kakejiku');
                }}
                className={`px-1.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  styleMode === 'kakejiku'
                    ? 'bg-torii text-white'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
                title="Tranh cuộn mộc bản Shin-Hanga"
              >
                🖼️ Cuộn
              </button>
              <button
                onClick={() => {
                  playWoodClapper();
                  setStyleMode('shikishi');
                }}
                className={`px-1.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  styleMode === 'shikishi'
                    ? 'bg-torii text-white'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
                title="Thẻ tranh Washi vuông Torii"
              >
                🎴 Washi
              </button>
              <button
                onClick={() => {
                  playWoodClapper();
                  setStyleMode('zen_icons');
                }}
                className={`px-1.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  styleMode === 'zen_icons'
                    ? 'bg-torii text-white'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
                title="Huy hiệu & Biểu tượng Zen"
              >
                ⛩️ Icon
              </button>
              <button
                onClick={() => {
                  playWoodClapper();
                  setStyleMode('hidden');
                }}
                className="px-1.5 py-0.5 rounded-lg text-stone-400 hover:text-rose-500 transition-colors cursor-pointer"
                title="Ẩn tranh 2 bên"
              >
                ✕
              </button>
            </div>
          </div>

          {/* -------------------------------------------------------------
              PHONG CÁCH 1: TRANH CUỘN KAKEJIKU VƯỜN THIỀN KYOTO & HOA ANH ĐÀO
              ------------------------------------------------------------- */}
          {styleMode === 'kakejiku' && (
            <div
              onClick={handleLeftClick}
              title="Vườn Thiền Kyoto & Hoa Anh Đào • Chạm nhẹ để lắng nghe giọt nước Suikinkutsu"
              className="cursor-pointer flex flex-col items-center transition-all duration-500 hover:scale-105 select-none"
            >
              {/* Dây treo lụa đỏ son thắt nút Mizuhiki */}
              <div className="flex flex-col items-center mb-1">
                <div className="w-2 h-2 rounded-full border border-amber-600/70 bg-amber-700/80 shadow-2xs" />
                <div className="w-0.5 h-3 bg-gradient-to-b from-amber-700/80 to-[#BC002D]/80" />
                {/* Trục treo trên (Hyōgu) */}
                <div className="w-32 sm:w-36 h-1.5 rounded-full bg-gradient-to-r from-stone-800 via-amber-900 to-stone-800 shadow-xs border border-amber-950/40" />
              </div>

              {/* Khung tranh Kakejiku cuộn lụa */}
              <div className="relative w-28 sm:w-32 lg:w-34 p-1.5 rounded-lg bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border-2 border-[#D8CEBF] dark:border-stone-700/90 shadow-xl shadow-stone-900/10 dark:shadow-black/40 backdrop-blur-md overflow-hidden">
                {/* Viền chỉ vàng dát mỏng Kinpaku */}
                <div className="absolute inset-1 rounded-sm border border-amber-600/35 dark:border-amber-400/30 pointer-events-none z-10" />

                {/* Bức họa Vườn Thiền Kyoto */}
                <div className="relative w-full h-44 sm:h-52 overflow-hidden rounded-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/zen_left_art.jpg"
                    alt="Vườn Thiền Kyoto mùa hoa anh đào"
                    className="w-full h-full object-cover rounded-xs transition-transform duration-700 hover:scale-108"
                    loading="eager"
                  />
                  {/* Lớp phủ màng lụa mỏng giúp tranh hòa quyện */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25 pointer-events-none" />

                  {/* Vòng sóng gợn nước khi click */}
                  {leftRippling && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="w-20 h-20 rounded-full border-2 border-emerald-400/90 animate-ping" />
                    </div>
                  )}
                </div>

                {/* Dải chân tranh trục gỗ mun Jikugi */}
                <div className="mt-1 pt-1 border-t border-amber-800/20 dark:border-stone-700 flex items-center justify-between text-[9px] px-1 font-kanji font-bold text-stone-700 dark:text-stone-300">
                  <span>京都 • 禅庭</span>
                  <span className="text-[#BC002D] dark:text-rose-400">桜花</span>
                </div>
              </div>

              {/* Trục lăn dưới đáy tranh (Jikugi) */}
              <div className="w-36 sm:w-40 h-2 rounded-full bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 shadow-md mt-1 border border-amber-900/50 flex items-center justify-between px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 shadow-2xs" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 shadow-2xs" />
              </div>

              {/* Dải thẻ thơ Tanzaku treo dưới (Thư pháp dọc) */}
              <div className="mt-2 flex items-center gap-1.5 bg-[#FFFDF9]/90 dark:bg-[#161D27]/90 px-2 py-1 rounded-xl border border-[#D8CEBF] dark:border-stone-700/80 shadow-xs">
                <div className="w-3.5 h-5 rounded-xs bg-[#BC002D] text-white text-[8px] font-kanji font-bold flex items-center justify-center shadow-2xs">
                  寂
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-kanji font-bold text-stone-800 dark:text-stone-200 tracking-wider">
                    花鳥風月
                  </span>
                  <span className="text-[9px] text-stone-500 dark:text-stone-400 italic">
                    Ao xưa cánh hoa rơi
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PHONG CÁCH 2: THẺ TRANH WASHI SHIKISHI CỔNG TORII
              ------------------------------------------------------------- */}
          {styleMode === 'shikishi' && (
            <div
              onClick={handleLeftClick}
              title="Cổng Torii Thần Đạo & Hoa Anh Đào • Chạm để lắng nghe giọt nước"
              className="cursor-pointer flex flex-col items-center transition-all duration-500 hover:scale-105 select-none"
            >
              <div className="flex flex-col items-center mb-1">
                <div className="w-2 h-2 rounded-full bg-amber-700/80" />
                <div className="w-0.5 h-3 bg-amber-700/60" />
              </div>

              <div className="relative w-28 sm:w-32 lg:w-34 p-1.5 rounded-2xl bg-[#FFFDF9] dark:bg-[#161D27] border-2 border-[#D8CEBF] dark:border-stone-700 shadow-xl overflow-hidden">
                <div className="absolute inset-1 rounded-xl border border-amber-600/30 pointer-events-none z-10" />
                <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/illustrations/torii.jpg"
                    alt="Cổng Torii bên hồ nước và hoa anh đào"
                    className="w-full h-full object-cover rounded-xl transition-transform duration-700 hover:scale-108"
                    loading="eager"
                  />
                  {leftRippling && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="w-16 h-16 rounded-full border-2 border-emerald-400/90 animate-ping" />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-2 flex items-center gap-1.5 bg-[#FFFDF9]/90 dark:bg-[#161D27]/90 px-2 py-1 rounded-xl border border-[#D8CEBF] dark:border-stone-700 shadow-xs">
                <div className="w-3.5 h-4.5 rounded-xs bg-[#BC002D] text-white text-[8px] font-kanji font-bold flex items-center justify-center shadow-2xs">
                  和
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-kanji font-bold text-stone-800 dark:text-stone-200 tracking-wider">
                    鳥居神域
                  </span>
                  <span className="text-[9px] text-stone-500 dark:text-stone-400">
                    Cổng đền thanh tịnh
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PHONG CÁCH 3: BỘ HUY HIỆU & BIỂU TƯỢNG VĂN HÓA ZEN
              ------------------------------------------------------------- */}
          {styleMode === 'zen_icons' && (
            <div
              onClick={handleLeftClick}
              title="Biểu tượng Văn hóa Thiền Zen • Chạm nhẹ để nghe giọt nước"
              className="cursor-pointer flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border-2 border-[#D8CEBF] dark:border-stone-700 shadow-xl backdrop-blur-md select-none transition-all duration-300 hover:scale-105"
            >
              <div className="text-[10px] uppercase font-bold text-torii font-mono tracking-widest border-b border-[#D8CEBF] pb-1 w-full text-center">
                KYOTO ZEN
              </div>

              <div className="flex flex-col gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 hover:bg-amber-500/20 transition-colors">
                  <ToriiShrineIcon className="w-5 h-5 text-torii" />
                  <span className="text-xs font-kanji font-bold text-stone-800 dark:text-stone-200">
                    鳥居 • Torii
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 hover:bg-emerald-500/20 transition-colors">
                  <BambooIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-kanji font-bold text-stone-800 dark:text-stone-200">
                    竹林 • Trúc Lâm
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center gap-2 hover:bg-pink-500/20 transition-colors">
                  <SakuraFlowerIcon className="w-5 h-5 text-pink-500" />
                  <span className="text-xs font-kanji font-bold text-stone-800 dark:text-stone-200">
                    桜花 • Sakura
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 hover:bg-rose-500/20 transition-colors">
                  <PagodaIcon className="w-5 h-5 text-[#BC002D] dark:text-rose-400" />
                  <span className="text-xs font-kanji font-bold text-stone-800 dark:text-stone-200">
                    五重塔 • Chùa Cổ
                  </span>
                </div>
              </div>

              <div className="text-[9px] text-stone-500 dark:text-stone-400 italic text-center pt-1 border-t border-[#D8CEBF]/60">
                Tĩnh tại & An nhiên
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* =========================================================================
          BỜ ĐÔNG (EAST FLANK): CĂN CHÍNH GIỮA KHOẢNG TRỐNG BÊN PHẢI
          ========================================================================= */}
      <aside aria-label="Khoảng không gian bờ Đông" className="zen-flank-right">
        <div className="relative flex flex-col items-center pointer-events-auto group">
          {/* Menu chuyển đổi phong cách tao nhã khi hover */}
          <div className="absolute -top-9 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
            <div className="p-0.5 rounded-xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border border-[#D8CEBF] dark:border-stone-700 shadow-md flex items-center gap-0.5 text-[10px] font-bold">
              <button
                onClick={() => {
                  playWoodClapper();
                  setStyleMode('kakejiku');
                }}
                className={`px-1.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  styleMode === 'kakejiku'
                    ? 'bg-torii text-white'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
                title="Tranh cuộn mộc bản Shin-Hanga"
              >
                🖼️ Cuộn
              </button>
              <button
                onClick={() => {
                  playWoodClapper();
                  setStyleMode('shikishi');
                }}
                className={`px-1.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  styleMode === 'shikishi'
                    ? 'bg-torii text-white'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
                title="Thẻ tranh Washi vuông Phú Sĩ"
              >
                🎴 Washi
              </button>
              <button
                onClick={() => {
                  playWoodClapper();
                  setStyleMode('zen_icons');
                }}
                className={`px-1.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  styleMode === 'zen_icons'
                    ? 'bg-torii text-white'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
                title="Huy hiệu & Biểu tượng Zen"
              >
                ⛩️ Icon
              </button>
              <button
                onClick={() => {
                  playWoodClapper();
                  setStyleMode('hidden');
                }}
                className="px-1.5 py-0.5 rounded-lg text-stone-400 hover:text-rose-500 transition-colors cursor-pointer"
                title="Ẩn tranh 2 bên"
              >
                ✕
              </button>
            </div>
          </div>

          {/* -------------------------------------------------------------
              PHONG CÁCH 1: TRANH CUỘN KAKEJIKU NÚI PHÚ SĨ & BẠCH HẠC HOÀNG HÔN
              ------------------------------------------------------------- */}
          {styleMode === 'kakejiku' && (
            <div
              onClick={handleRightClick}
              title="Linh Sơn Phú Sĩ & Bạch Hạc Hoàng Hôn • Chạm nhẹ để lắng nghe chuông chùa Bonshō"
              className="cursor-pointer flex flex-col items-center transition-all duration-500 hover:scale-105 select-none"
            >
              {/* Dây treo lụa vàng hoàng gia */}
              <div className="flex flex-col items-center mb-1">
                <div className="w-2 h-2 rounded-full border border-amber-600/70 bg-amber-600 shadow-2xs" />
                <div className="w-0.5 h-3 bg-gradient-to-b from-amber-600 to-amber-700" />
                {/* Trục treo trên */}
                <div className="w-32 sm:w-36 h-1.5 rounded-full bg-gradient-to-r from-stone-800 via-amber-900 to-stone-800 shadow-xs border border-amber-950/40" />
              </div>

              {/* Khung tranh Kakejiku cuộn lụa */}
              <div className="relative w-28 sm:w-32 lg:w-34 p-1.5 rounded-lg bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border-2 border-[#D8CEBF] dark:border-stone-700/90 shadow-xl shadow-stone-900/10 dark:shadow-black/40 backdrop-blur-md overflow-hidden">
                {/* Viền chỉ vàng dát mỏng Kinpaku */}
                <div className="absolute inset-1 rounded-sm border border-amber-600/35 dark:border-amber-400/30 pointer-events-none z-10" />

                {/* Bức họa Linh Sơn Phú Sĩ */}
                <div className="relative w-full h-44 sm:h-52 overflow-hidden rounded-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/zen_right_art.jpg"
                    alt="Linh Sơn Phú Sĩ và đàn hạc bay hoàng hôn"
                    className="w-full h-full object-cover rounded-xs transition-transform duration-700 hover:scale-108"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25 pointer-events-none" />

                  {/* Sóng âm chuông chùa khi click */}
                  {rightRippling && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="w-20 h-20 rounded-full border-2 border-amber-400/90 animate-ping" />
                    </div>
                  )}
                </div>

                {/* Dải chân tranh */}
                <div className="mt-1 pt-1 border-t border-amber-800/20 dark:border-stone-700 flex items-center justify-between text-[9px] font-kanji font-bold text-stone-700 dark:text-stone-300">
                  <span>靈峰 • 富士</span>
                  <span className="text-amber-600 dark:text-amber-400">白鶴</span>
                </div>
              </div>

              {/* Trục lăn dưới đáy tranh (Jikugi) */}
              <div className="w-36 sm:w-40 h-2 rounded-full bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 shadow-md mt-1 border border-amber-900/50 flex items-center justify-between px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 shadow-2xs" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 shadow-2xs" />
              </div>

              {/* Dải thẻ thơ Tanzaku treo dưới (Thư pháp dọc) */}
              <div className="mt-2 flex items-center gap-1.5 bg-[#FFFDF9]/90 dark:bg-[#161D27]/90 px-2 py-1 rounded-xl border border-[#D8CEBF] dark:border-stone-700/80 shadow-xs">
                <div className="w-3.5 h-5 rounded-xs bg-[#D97706] text-white text-[8px] font-kanji font-bold flex items-center justify-center shadow-2xs">
                  雅
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-kanji font-bold text-stone-800 dark:text-stone-200 tracking-wider">
                    一期一会
                  </span>
                  <span className="text-[9px] text-stone-500 dark:text-stone-400 italic">
                    Lòng sáng như mặt gương
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PHONG CÁCH 2: THẺ TRANH WASHI SHIKISHI PHÚ SĨ MẶT TRỜI ĐỎ
              ------------------------------------------------------------- */}
          {styleMode === 'shikishi' && (
            <div
              onClick={handleRightClick}
              title="Linh Sơn Phú Sĩ & Mặt Trời Đỏ Thần Đạo • Chạm để lắng nghe chuông chùa"
              className="cursor-pointer flex flex-col items-center transition-all duration-500 hover:scale-105 select-none"
            >
              <div className="flex flex-col items-center mb-1">
                <div className="w-2 h-2 rounded-full bg-amber-700/80" />
                <div className="w-0.5 h-3 bg-amber-700/60" />
              </div>

              <div className="relative w-28 sm:w-32 lg:w-34 p-1.5 rounded-2xl bg-[#FFFDF9] dark:bg-[#161D27] border-2 border-[#D8CEBF] dark:border-stone-700 shadow-xl overflow-hidden">
                <div className="absolute inset-1 rounded-xl border border-amber-600/30 pointer-events-none z-10" />
                <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/illustrations/fuji.jpg"
                    alt="Núi Phú Sĩ và mặt trời đỏ"
                    className="w-full h-full object-cover rounded-xl transition-transform duration-700 hover:scale-108"
                    loading="eager"
                  />
                  {rightRippling && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="w-16 h-16 rounded-full border-2 border-amber-400/90 animate-ping" />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-2 flex items-center gap-1.5 bg-[#FFFDF9]/90 dark:bg-[#161D27]/90 px-2 py-1 rounded-xl border border-[#D8CEBF] dark:border-stone-700 shadow-xs">
                <div className="w-3.5 h-4.5 rounded-xs bg-[#D97706] text-white text-[8px] font-kanji font-bold flex items-center justify-center shadow-2xs">
                  雅
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-kanji font-bold text-stone-800 dark:text-stone-200 tracking-wider">
                    明鏡止水
                  </span>
                  <span className="text-[9px] text-stone-500 dark:text-stone-400">
                    Tâm tịnh tựa mặt hồ
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PHONG CÁCH 3: BỘ HUY HIỆU & BIỂU TƯỢNG VĂN HÓA ZEN
              ------------------------------------------------------------- */}
          {styleMode === 'zen_icons' && (
            <div
              onClick={handleRightClick}
              title="Biểu tượng Võ Sĩ Đạo & Nghệ Thuật • Chạm nhẹ để nghe chuông chùa"
              className="cursor-pointer flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border-2 border-[#D8CEBF] dark:border-stone-700 shadow-xl backdrop-blur-md select-none transition-all duration-300 hover:scale-105"
            >
              <div className="text-[10px] uppercase font-bold text-amber-600 font-mono tracking-widest border-b border-[#D8CEBF] pb-1 w-full text-center">
                SAMURAI & FUJI
              </div>

              <div className="flex flex-col gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 hover:bg-amber-500/20 transition-colors">
                  <OrigamiCraneIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-kanji font-bold text-stone-800 dark:text-stone-200">
                    白鶴 • Hạc Trắng
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 hover:bg-red-500/20 transition-colors">
                  <KatanaIcon className="w-5 h-5 text-torii" />
                  <span className="text-xs font-kanji font-bold text-stone-800 dark:text-stone-200">
                    刀 • Katana
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center gap-2 hover:bg-indigo-500/20 transition-colors">
                  <SensuFanIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-kanji font-bold text-stone-800 dark:text-stone-200">
                    扇子 • Quạt Sensu
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center gap-2 hover:bg-teal-500/20 transition-colors">
                  <span className="text-base">🍵</span>
                  <span className="text-xs font-kanji font-bold text-stone-800 dark:text-stone-200">
                    茶道 • Trà Đạo
                  </span>
                </div>
              </div>

              <div className="text-[9px] text-stone-500 dark:text-stone-400 italic text-center pt-1 border-t border-[#D8CEBF]/60">
                Nhất Kỳ Nhất Hội
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
