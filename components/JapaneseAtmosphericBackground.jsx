'use client';

export default function JapaneseAtmosphericBackground({ theme = 'washi' }) {
  const isDark = theme === 'yozakura';

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Vầng Thái Dương Đỏ (Mặt trời mọc Akatsuki) / Vầng Trăng Đêm (Tsukimi) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-24 sm:-top-32 w-[340px] sm:w-[480px] md:w-[600px] h-[340px] sm:h-[480px] md:h-[600px] rounded-full transition-all duration-700 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(254, 240, 138, 0.16) 0%, rgba(239, 68, 68, 0.12) 35%, rgba(13, 18, 28, 0) 70%)'
            : 'radial-gradient(circle, rgba(185, 28, 28, 0.18) 0%, rgba(220, 38, 38, 0.08) 40%, rgba(246, 241, 232, 0) 72%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Vầng mặt trời tròn sắc nét phong cách Quốc kỳ Nhật Bản / Tranh khắc gỗ Ukiyo-e - Đặt sau thẻ học */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-48 sm:top-60 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full transition-all duration-700 pointer-events-none opacity-80"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(254, 249, 195, 0.3) 0%, rgba(250, 204, 21, 0.12) 70%, transparent 100%)'
            : 'radial-gradient(circle, rgba(220, 38, 38, 0.22) 0%, rgba(185, 28, 28, 0.1) 70%, transparent 100%)',
          border: isDark
            ? '1px solid rgba(254, 240, 138, 0.18)'
            : '1px solid rgba(185, 28, 28, 0.18)',
          boxShadow: isDark
            ? '0 0 50px rgba(250, 204, 21, 0.18)'
            : '0 0 60px rgba(185, 28, 28, 0.16)',
        }}
      />

      {/* 2. Dải Mây Ngang Truyền Thống Kasumi (霞) trôi lững lờ */}
      <div className="absolute top-28 left-0 right-0 h-24 opacity-30 sm:opacity-40 animate-kasumiFloat pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-100,50 C200,20 400,80 720,40 C1040,0 1240,70 1540,40"
            stroke={isDark ? 'rgba(236, 72, 153, 0.25)' : 'rgba(185, 28, 28, 0.15)'}
            strokeWidth="38"
            strokeLinecap="round"
            filter="blur(14px)"
          />
          <path
            d="M-50,75 C250,90 550,45 880,70 C1200,95 1350,55 1600,65"
            stroke={isDark ? 'rgba(147, 197, 253, 0.18)' : 'rgba(180, 83, 9, 0.12)'}
            strokeWidth="26"
            strokeLinecap="round"
            filter="blur(10px)"
          />
        </svg>
      </div>

      {/* 3. Dãy Núi Phú Sĩ Thủy Mặc & Đồi Núi Phù Tang (Sumi-e Mountain Silhouette) ở chân trang */}
      <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-60 md:h-72 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="fujiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isDark ? '#ef4444' : '#b91c1c'}
                stopOpacity={isDark ? '0.22' : '0.12'}
              />
              <stop
                offset="40%"
                stopColor={isDark ? '#3b82f6' : '#786e64'}
                stopOpacity={isDark ? '0.15' : '0.08'}
              />
              <stop
                offset="100%"
                stopColor={isDark ? '#0b0f19' : '#ece0c8'}
                stopOpacity={isDark ? '0.45' : '0.35'}
              />
            </linearGradient>

            <linearGradient id="hillGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isDark ? '#6366f1' : '#b45309'}
                stopOpacity={isDark ? '0.16' : '0.09'}
              />
              <stop
                offset="100%"
                stopColor={isDark ? '#0b0f19' : '#f5eedf'}
                stopOpacity="0.5"
              />
            </linearGradient>

            <linearGradient id="hillGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isDark ? '#ec4899' : '#dc2626'}
                stopOpacity={isDark ? '0.12' : '0.07'}
              />
              <stop
                offset="100%"
                stopColor={isDark ? '#0b0f19' : '#f5eedf'}
                stopOpacity="0.8"
              />
            </linearGradient>
          </defs>

          {/* Dãy Núi Phú Sĩ Hùng Vĩ ở Trung Tâm */}
          <path
            d="M 440,320 
               C 560,250 640,110 700,75 
               C 712,68 728,68 740,75 
               C 800,110 880,250 1000,320 Z"
            fill="url(#fujiGrad)"
          />

          {/* Đỉnh chóp tuyết Phú Sĩ cách điệu */}
          <path
            d="M 685,96 
               C 700,105 710,95 720,108 
               C 730,95 740,105 755,96 
               C 735,76 725,70 720,70 
               C 715,70 705,76 685,96 Z"
            fill={isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255, 255, 255, 0.65)'}
          />

          {/* Tầng đồi núi uốn lượn lớp 1 (Hậu cảnh) */}
          <path
            d="M 0,220 
               Q 240,150 480,210 
               T 960,190 
               Q 1200,160 1440,230 
               L 1440,320 L 0,320 Z"
            fill="url(#hillGrad1)"
          />

          {/* Tầng đồi núi uốn lượn lớp 2 (Tiền cảnh) */}
          <path
            d="M 0,255 
               Q 320,200 640,265 
               T 1280,240 
               Q 1360,245 1440,270 
               L 1440,320 L 0,320 Z"
            fill="url(#hillGrad2)"
          />
        </svg>
      </div>

      {/* 4. Dấu Triện Khắc Chìm Cổ Truyền ở Góc (Artistic Corner Hanko Seals) */}
      <div className="hidden lg:block absolute bottom-8 left-8 opacity-25 hover:opacity-50 transition-opacity">
        <div className="w-16 h-16 rounded-2xl border-2 border-torii flex flex-col items-center justify-center font-kanji text-torii font-black text-xs leading-none rotate-[-6deg]">
          <span>和</span>
          <span>風</span>
          <span className="text-[8px] tracking-widest border-t border-torii mt-0.5 pt-0.5">JAPAN</span>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-8 right-8 opacity-25 hover:opacity-50 transition-opacity">
        <div className="w-16 h-16 rounded-full border-2 border-gold flex flex-col items-center justify-center font-kanji text-gold font-black text-xs leading-none rotate-[4deg]">
          <span>学</span>
          <span>習</span>
          <span className="text-[8px] tracking-widest border-t border-gold mt-0.5 pt-0.5">KANJI</span>
        </div>
      </div>

      {/* 4 Khung góc nghệ thuật truyền thống Nhật Bản (Traditional Japanese Corner Ornaments) */}
      <div className="hidden md:block absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-border-strong opacity-35" />
      <div className="hidden md:block absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-border-strong opacity-35" />
      <div className="hidden md:block absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-border-strong opacity-35" />
      <div className="hidden md:block absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-border-strong opacity-35" />
    </div>
  );
}
