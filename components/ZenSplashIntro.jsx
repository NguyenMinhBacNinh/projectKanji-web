'use client';

import { useState, useEffect } from 'react';
import { playTempleBell, playWaterDrop } from '../lib/traditionalAudio';

/**
 * ZenSplashIntro - Màn chào chuyển cảnh mỹ học Nhật Bản (Cinematic Zen Splash Transition)
 * Hiệu ứng chuyển màn mượt mà từ Logo thương hiệu chính thức sang Màn hình học tập (Zen Studio).
 */
export default function ZenSplashIntro({ theme = 'washi', onFinish }) {
  const isDark = theme === 'yozakura';
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [statusText, setStatusText] = useState('Đang khởi tạo Cổng tri thức...');

  const handleEnter = () => {
    if (isExiting) return;
    try {
      playTempleBell();
    } catch (_) {}
    setIsExiting(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 650);
  };

  useEffect(() => {
    // Tiến trình tự động mở cổng tri thức trong ~1.8s
    const t1 = setTimeout(() => {
      setProgress(40);
      setStatusText('Nạp thư viện Hán tự & Quy tắc bút thuận...');
    }, 250);

    const t2 = setTimeout(() => {
      setProgress(85);
      setStatusText('Hoàn tất không gian Wabi-Sabi Zen Sanctuary...');
    }, 850);

    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Sẵn sàng bước vào Zen Studio');
    }, 1450);

    const t4 = setTimeout(() => {
      handleEnter();
    }, 1800);

    // Hỗ trợ nhấn phím bất kỳ để bỏ qua và vào ngay
    const handleKeyDown = (e) => {
      if (['Space', 'Enter', 'Escape'].includes(e.code) || e.key) {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      onClick={handleEnter}
      role="button"
      tabIndex={0}
      aria-label="Nhấn để bước vào ứng dụng học Kanji"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 sm:p-10 select-none cursor-pointer transition-all duration-700 ease-out ${
        isDark
          ? 'bg-[#0B0F15] text-stone-100'
          : 'bg-[#FAF8F5] text-stone-900'
      } ${
        isExiting
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Vầng hào quang mờ ảo phía sau Logo (Aura Glow) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full pointer-events-none blur-3xl opacity-60"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(217, 56, 72, 0.25) 0%, rgba(245, 158, 11, 0.12) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(188, 0, 45, 0.16) 0%, rgba(194, 120, 3, 0.10) 45%, transparent 70%)',
        }}
      />

      {/* Hoa văn truyền thống Asanoha / Seigaiha mờ nhẹ trang trí 4 góc */}
      <div className="w-full flex items-center justify-between text-xs font-kanji font-bold opacity-40 shrink-0">
        <span className="tracking-widest">京都 • 禅意空間</span>
        <span className="tracking-widest">初心 • 不忘</span>
      </div>

      {/* KHỐI TRUNG TÂM: LOGO CHÍNH THỨC & THƯ PHÁP TIÊU ĐỀ */}
      <div className="flex flex-col items-center gap-4 sm:gap-6 relative z-10 my-auto text-center">
        {/* Khung chứa Logo mới với bóng đổ mềm và hiệu ứng float nhẹ */}
        <div className="relative group">
          <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center p-2 relative transition-transform duration-500 group-hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={isDark ? '/images/logo_dark.png' : '/images/logo.png'}
              alt="Logo Kanji Gakushūchō"
              className="w-full h-full object-contain filter drop-shadow-md select-none animate-in fade-in zoom-in-95 duration-700"
            />
          </div>
        </div>

        {/* Tiêu đề Thư pháp Tiếng Nhật & Con dấu Hanko */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Con dấu đỏ Hanko: Wabi-Sabi */}
            <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold font-kanji bg-torii text-white border border-[#9B0024] shadow-xs">
              侘寂
            </span>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-kanji tracking-wider text-stone-900 dark:text-stone-100">
              漢字学習帳
            </h1>

            {/* Con dấu đỏ Hanko: Shoshin */}
            <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold font-kanji bg-torii text-white border border-[#9B0024] shadow-xs">
              初心
            </span>
          </div>

          <p className="text-xs sm:text-sm font-semibold tracking-widest text-stone-600 dark:text-stone-300 font-ui uppercase">
            Kanji Gakushūchō • Cổng Tri Thức Chữ Hán
          </p>
        </div>

        {/* Thanh tiến trình Zen thanh nhã (Minimalist Brush Progress) */}
        <div className="w-56 sm:w-72 flex flex-col items-center gap-2 mt-2">
          <div className="w-full h-1.5 rounded-full bg-stone-200/80 dark:bg-stone-800 overflow-hidden border border-stone-300/40 dark:border-stone-700/50 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-torii via-amber-500 to-torii transition-all duration-300 ease-out shadow-xs"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[11px] font-medium opacity-70 tracking-wide">
            {statusText}
          </span>
        </div>
      </div>

      {/* Chân màn hình: Hướng dẫn nhấn để vào ngay */}
      <div className="flex items-center gap-2 text-xs font-medium opacity-60 tracking-wider hover:opacity-100 transition-opacity shrink-0 animate-pulse">
        <span>⛩️</span>
        <span>Chạm nhẹ bất kỳ đâu hoặc bấm phím để vào ngay</span>
        <span>⛩️</span>
      </div>
    </div>
  );
}
