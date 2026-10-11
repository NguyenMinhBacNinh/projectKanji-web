'use client';

/**
 * JapaneseAtmosphericBackground - Zen Luxury Studio Edition
 * Không gian mỹ học Nhật Bản đạt giải (Award-Winning Kyoto Zen Atmosphere)
 * - Tông màu Washi lụa ngà tuyết & Kim tuyến Kinpaku tinh xảo
 * - Nét vẽ thủy mặc Sumi-e thanh thoát kết hợp chỉ vàng mờ ảo
 * - Hoàn toàn không che khuất, không gây lóa, nâng đỡ tối đa trải nghiệm học tập
 */
export default function JapaneseAtmosphericBackground({ theme = 'washi' }) {
  const isDark = theme === 'yozakura';

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* =========================================================================
          1. BẦU TRỜ & ÁNH HÀO QUANG KINPAKU (ETHEREAL ZEN GLOW)
          ========================================================================= */}
      {/* Vầng hào quang ánh sáng tĩnh tại ở đỉnh trung tâm */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-36 sm:-top-44 w-[600px] sm:w-[800px] h-[450px] sm:h-[550px] rounded-full transition-all duration-1000 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, rgba(236, 72, 153, 0.08) 40%, rgba(12, 16, 26, 0) 75%)'
            : 'radial-gradient(circle, rgba(217, 119, 6, 0.09) 0%, rgba(185, 28, 28, 0.04) 45%, rgba(250, 248, 245, 0) 75%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Dải Sương Mù Kasumi (霞) trôi lững lờ tinh tế */}
      <div className="absolute top-16 left-0 right-0 h-24 opacity-25 sm:opacity-35 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-80,45 C220,10 450,75 750,30 C1050,-10 1260,65 1520,30"
            stroke={isDark ? 'rgba(244, 114, 182, 0.2)' : 'rgba(217, 119, 6, 0.12)'}
            strokeWidth="28"
            strokeLinecap="round"
            filter="blur(18px)"
          />
          <path
            d="M-30,70 C280,85 580,35 890,65 C1200,90 1340,40 1580,55"
            stroke={isDark ? 'rgba(147, 197, 253, 0.15)' : 'rgba(185, 28, 28, 0.08)'}
            strokeWidth="20"
            strokeLinecap="round"
            filter="blur(14px)"
          />
        </svg>
      </div>

      {/* =========================================================================
          2. TRỤ CẢNH BỜ TÂY (WEST FLANK - LINE-ART CỔNG TORII & RỪNG TRÚC THỦY MẶC)
          Dành riêng cho màn hình rộng (xl & 2xl) - Thu gọn sát biên, thanh thoát
          ========================================================================= */}
      <div className="hidden xl:block absolute left-3 top-0 bottom-0 w-36 2xl:w-52 pointer-events-none z-0 opacity-20 2xl:opacity-30 transition-opacity duration-700">
        <svg
          className="w-full h-full"
          viewBox="0 0 200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMid meet"
        >
          <defs>
            <linearGradient id="zenBambooGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={isDark ? '#10b981' : '#047857'} stopOpacity={isDark ? '0.35' : '0.25'} />
              <stop offset="100%" stopColor={isDark ? '#059669' : '#065f46'} stopOpacity={isDark ? '0.1' : '0.08'} />
            </linearGradient>
            <linearGradient id="zenGoldLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#fbbf24' : '#b45309'} stopOpacity="0.4" />
              <stop offset="100%" stopColor={isDark ? '#f59e0b' : '#b91c1c'} stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Rừng trúc Sagano (Thân tre mảnh nghệ thuật) */}
          <rect x="20" y="60" width="5" height="680" rx="2" fill="url(#zenBambooGrad)" />
          <line x1="18" y1="160" x2="27" y2="160" stroke={isDark ? '#34d399' : '#059669'} strokeWidth="1.5" opacity="0.3" />
          <line x1="18" y1="290" x2="27" y2="290" stroke={isDark ? '#34d399' : '#059669'} strokeWidth="1.5" opacity="0.3" />
          <line x1="18" y1="440" x2="27" y2="440" stroke={isDark ? '#34d399' : '#059669'} strokeWidth="1.5" opacity="0.3" />
          <path d="M24 160 C38 152 52 156 65 170 C52 165 38 162 24 160 Z" fill={isDark ? '#34d399' : '#047857'} opacity="0.25" />
          <path d="M24 290 C40 282 56 288 68 302 C54 296 38 294 24 290 Z" fill={isDark ? '#34d399' : '#047857'} opacity="0.25" />

          <rect x="42" y="110" width="6" height="630" rx="2" fill="url(#zenBambooGrad)" />
          <line x1="40" y1="220" x2="50" y2="220" stroke={isDark ? '#34d399' : '#059669'} strokeWidth="1.5" opacity="0.3" />
          <line x1="40" y1="380" x2="50" y2="380" stroke={isDark ? '#34d399' : '#059669'} strokeWidth="1.5" opacity="0.3" />
          <path d="M46 220 C62 212 80 220 92 236 C76 228 58 226 46 220 Z" fill={isDark ? '#34d399' : '#047857'} opacity="0.2" />

          {/* CỔNG TORII NÉT CHỈ VÀNG LINE-ART (Torii Minimal Silhouette) */}
          <g transform="translate(24, 520) scale(0.75)">
            {/* Xà ngang Kasagi uốn cong */}
            <path
              d="M 5,20 C 50,12 130,12 175,20 C 180,16 180,13 170,12 C 125,7 55,7 10,12 C 0,13 0,16 5,20 Z"
              fill="url(#zenGoldLine)"
            />
            {/* Xà ngang phụ Nuki */}
            <rect x="18" y="36" width="144" height="5" rx="1" fill="url(#zenGoldLine)" />
            {/* Cột trụ Hashira thanh mảnh */}
            <rect x="30" y="20" width="8" height="140" rx="2" fill="url(#zenGoldLine)" />
            <rect x="142" y="20" width="8" height="140" rx="2" fill="url(#zenGoldLine)" />
            {/* Chân đế Daiishi */}
            <rect x="26" y="156" width="16" height="6" rx="1.5" fill={isDark ? '#4b5563' : '#a8a29e'} opacity="0.3" />
            <rect x="138" y="156" width="16" height="6" rx="1.5" fill={isDark ? '#4b5563' : '#a8a29e'} opacity="0.3" />
          </g>

          {/* Dấu Triện Khắc Đỏ Thư Pháp: 『 寂 』(Tịch - Tĩnh lặng Zen) */}
          <g transform="translate(140, 320)">
            <rect x="0" y="0" width="22" height="42" rx="4" fill={isDark ? 'rgba(239, 68, 68, 0.12)' : 'rgba(185, 28, 28, 0.08)'} stroke={isDark ? '#ef4444' : '#b91c1c'} strokeWidth="1" opacity="0.4" />
            <text x="11" y="26" textAnchor="middle" fill={isDark ? '#f87171' : '#b91c1c'} fontSize="14" fontFamily="var(--font-kanji, serif)" fontWeight="900" opacity="0.65">寂</text>
          </g>
        </svg>
      </div>

      {/* =========================================================================
          3. TRỤ CẢNH BỜ ĐÔNG (EAST FLANK - CÀNH ANH ĐÀO VÀ THÁP CHÙA MỘC BẢN)
          Dành riêng cho màn hình rộng (xl & 2xl) - Nhẹ nhàng, thanh thoát
          ========================================================================= */}
      <div className="hidden xl:block absolute right-3 top-0 bottom-0 w-36 2xl:w-52 pointer-events-none z-0 opacity-20 2xl:opacity-30 transition-opacity duration-700">
        <svg
          className="w-full h-full"
          viewBox="0 0 200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMaxYMid meet"
        >
          <defs>
            <linearGradient id="zenSakuraBranch" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#6b7280' : '#78350f'} stopOpacity="0.35" />
              <stop offset="100%" stopColor={isDark ? '#374151' : '#451a03'} stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="zenSakuraPetal" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fdf2f8" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#f472b6" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#db2777" stopOpacity="0.45" />
            </radialGradient>
          </defs>

          {/* Cành hoa anh đào Shidarezakura rủ mỏng manh */}
          <g transform="translate(30, 0)">
            <path
              d="M 170,0 C 135,35 100,50 65,85 C 40,110 25,145 10,185"
              stroke="url(#zenSakuraBranch)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 100,50 C 75,68 55,92 40,115"
              stroke="url(#zenSakuraBranch)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Các nụ hoa tinh khôi */}
            {[
              { x: 120, y: 45 },
              { x: 90, y: 60 },
              { x: 65, y: 85 },
              { x: 40, y: 110 },
              { x: 20, y: 150 },
              { x: 8, y: 185 },
            ].map((flower, idx) => (
              <g key={idx} transform={`translate(${flower.x}, ${flower.y})`}>
                <circle cx="0" cy="-4" r="3.5" fill="url(#zenSakuraPetal)" />
                <circle cx="4" cy="-1" r="3.5" fill="url(#zenSakuraPetal)" />
                <circle cx="2" cy="4" r="3.5" fill="url(#zenSakuraPetal)" />
                <circle cx="-3" cy="3" r="3.5" fill="url(#zenSakuraPetal)" />
                <circle cx="-4" cy="-2" r="3.5" fill="url(#zenSakuraPetal)" />
                <circle cx="0" cy="0" r="1.5" fill="#fbbf24" opacity="0.8" />
              </g>
            ))}
          </g>

          {/* THÁP CHÙA 5 TẦNG KYOTO LINE-ART (Gojūnotō Silhouette) */}
          <g transform="translate(45, 530) scale(0.75)">
            <line x1="60" y1="0" x2="60" y2="30" stroke={isDark ? '#fbbf24' : '#b45309'} strokeWidth="1.5" opacity="0.4" />
            <circle cx="60" cy="5" r="2" fill="#f59e0b" opacity="0.5" />
            <circle cx="60" cy="14" r="1.5" fill="#f59e0b" opacity="0.5" />
            {/* Tầng 5 */}
            <path d="M 38,42 L 60,30 L 82,42 L 78,47 L 42,47 Z" fill={isDark ? '#ec4899' : '#b45309'} opacity="0.3" />
            <rect x="52" y="47" width="16" height="8" fill={isDark ? '#374151' : '#78350f'} opacity="0.25" />
            {/* Tầng 4 */}
            <path d="M 34,62 L 60,50 L 86,62 L 82,67 L 38,67 Z" fill={isDark ? '#ec4899' : '#b45309'} opacity="0.3" />
            <rect x="50" y="67" width="20" height="9" fill={isDark ? '#374151' : '#78350f'} opacity="0.25" />
            {/* Tầng 3 */}
            <path d="M 30,83 L 60,70 L 90,83 L 85,88 L 35,88 Z" fill={isDark ? '#ec4899' : '#b45309'} opacity="0.3" />
            <rect x="48" y="88" width="24" height="10" fill={isDark ? '#374151' : '#78350f'} opacity="0.25" />
            {/* Tầng 2 */}
            <path d="M 26,105 L 60,91 L 94,105 L 89,111 L 31,111 Z" fill={isDark ? '#ec4899' : '#b45309'} opacity="0.3" />
            <rect x="46" y="111" width="28" height="11" fill={isDark ? '#374151' : '#78350f'} opacity="0.25" />
            {/* Tầng 1 (Trệt) */}
            <path d="M 20,129 L 60,114 L 100,129 L 94,136 L 26,136 Z" fill={isDark ? '#ec4899' : '#b45309'} opacity="0.3" />
            <rect x="43" y="136" width="34" height="16" rx="1" fill={isDark ? '#374151' : '#78350f'} opacity="0.25" />
          </g>

          {/* Dấu Triện Khắc Vàng Thư Pháp: 『 雅 』(Nhã - Tao nhã Miyabi) */}
          <g transform="translate(30, 320)">
            <rect x="0" y="0" width="22" height="42" rx="4" fill={isDark ? 'rgba(217, 119, 6, 0.12)' : 'rgba(217, 119, 6, 0.08)'} stroke={isDark ? '#fbbf24' : '#d97706'} strokeWidth="1" opacity="0.4" />
            <text x="11" y="26" textAnchor="middle" fill={isDark ? '#fbbf24' : '#d97706'} fontSize="14" fontFamily="var(--font-kanji, serif)" fontWeight="900" opacity="0.65">雅</text>
          </g>
        </svg>
      </div>

      {/* =========================================================================
          4. ĐƯỜNG CHÂN TRỜI NÚI PHÚ SĨ THỦY MẶC (ETHEREAL SUMI-E FUJISAN)
          Mỏng manh, xa xăm, không cắt qua nội dung và các nút bấm
          ========================================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 pointer-events-none overflow-hidden opacity-30 sm:opacity-45 transition-opacity duration-700">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="zenFujiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#f87171' : '#b91c1c'} stopOpacity={isDark ? '0.2' : '0.1'} />
              <stop offset="40%" stopColor={isDark ? '#60a5fa' : '#78716c'} stopOpacity={isDark ? '0.1' : '0.05'} />
              <stop offset="100%" stopColor={isDark ? '#0c101a' : '#faf8f5'} stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="zenHillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#a78bfa' : '#b45309'} stopOpacity={isDark ? '0.12' : '0.06'} />
              <stop offset="100%" stopColor={isDark ? '#0c101a' : '#faf8f5'} stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Dáng Núi Phú Sĩ Thủy Mặc Xa Xăm */}
          <path
            d="M 460,180 
               C 580,130 655,48 705,28 
               C 715,24 725,24 735,28 
               C 785,48 860,130 980,180 Z"
            fill="url(#zenFujiGrad)"
          />

          {/* Đỉnh tuyết phủ Phú Sĩ cách điệu */}
          <path
            d="M 690,44 
               C 705,50 714,42 720,52 
               C 726,42 735,50 750,44 
               C 734,30 726,26 720,26 
               C 714,26 706,30 690,44 Z"
            fill={isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.6)'}
          />

          {/* Đồi núi thủy mặc thoai thoải hậu cảnh */}
          <path
            d="M 0,130 
               Q 260,85 520,125 
               T 1040,115 
               Q 1240,95 1440,135 
               L 1440,180 L 0,180 Z"
            fill="url(#zenHillGrad)"
          />
        </svg>
      </div>
    </div>
  );
}
