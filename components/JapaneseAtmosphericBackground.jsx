'use client';

/**
 * JapaneseAtmosphericBackground
 * Không gian mỹ học Nhật Bản bao bọc xung quanh trang web (Atmospheric Japanese Landscape)
 * Bao gồm:
 * - Trụ cảnh Bờ Tây: Cổng Đền Torii, Rừng trúc Sagano, Đèn đá Kasuga Tōrō phát sáng ấm áp.
 * - Trụ cảnh Bờ Đông: Cành hoa anh đào rủ (Shidarezakura), Chùa 5 tầng Kyoto (Gojūnotō), Cây tùng Matsu.
 * - Đường chân trời: Núi Phú Sĩ tuyết phủ (Fujisan), Đồi núi thủy mặc Sumi-e & Sóng biển Seigaiha.
 * - Bầu trời: Vầng Thái Dương Đỏ (Akatsuki Hinomaru) / Trăng rằm Tsukimi & Dải mây Kasumi.
 * Hoàn toàn responsive, cố định z-0, không gây cuộn trang.
 */
export default function JapaneseAtmosphericBackground({ theme = 'washi' }) {
  const isDark = theme === 'yozakura';

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* =========================================================================
          1. BẦU TRỜ: VẦNG THÁI DƯƠNG (HINOMARU) / TRĂNG RẰM TSUKIMI & MÂY KASUMI
          ========================================================================= */}
      {/* Vầng sáng tỏa ra ở đỉnh trang */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-28 sm:-top-36 w-[420px] sm:w-[580px] md:w-[720px] h-[420px] sm:h-[580px] md:h-[720px] rounded-full transition-all duration-700 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(254, 240, 138, 0.18) 0%, rgba(236, 72, 153, 0.12) 35%, rgba(11, 15, 23, 0) 72%)'
            : 'radial-gradient(circle, rgba(188, 0, 45, 0.16) 0%, rgba(217, 119, 6, 0.08) 40%, rgba(248, 246, 241, 0) 72%)',
          filter: 'blur(36px)',
        }}
      />

      {/* Vầng mặt trời tròn / trăng tròn sắc nét phong cách Ukiyo-e ở trung tâm */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-32 sm:top-40 w-44 h-44 sm:w-56 sm:h-56 rounded-full transition-all duration-700 pointer-events-none opacity-85"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(254, 249, 195, 0.35) 0%, rgba(250, 204, 21, 0.15) 65%, transparent 100%)'
            : 'radial-gradient(circle, rgba(188, 0, 45, 0.22) 0%, rgba(188, 0, 45, 0.08) 65%, transparent 100%)',
          border: isDark
            ? '1.5px solid rgba(254, 240, 138, 0.25)'
            : '1.5px solid rgba(188, 0, 45, 0.22)',
          boxShadow: isDark
            ? '0 0 60px rgba(250, 204, 21, 0.22)'
            : '0 0 70px rgba(188, 0, 45, 0.18)',
        }}
      />

      {/* Dải Mây Ngang Truyền Thống Kasumi (霞) trôi lững lờ */}
      <div className="absolute top-24 left-0 right-0 h-28 opacity-30 sm:opacity-40 animate-kasumiFloat pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-100,50 C200,15 400,85 720,35 C1040,-5 1240,75 1540,35"
            stroke={isDark ? 'rgba(236, 72, 153, 0.28)' : 'rgba(188, 0, 45, 0.16)'}
            strokeWidth="36"
            strokeLinecap="round"
            filter="blur(16px)"
          />
          <path
            d="M-50,80 C250,95 550,40 880,75 C1200,100 1350,50 1600,65"
            stroke={isDark ? 'rgba(147, 197, 253, 0.22)' : 'rgba(217, 119, 6, 0.14)'}
            strokeWidth="24"
            strokeLinecap="round"
            filter="blur(12px)"
          />
        </svg>
      </div>

      {/* =========================================================================
          2. TRỤ CẢNH BỜ TÂY (LEFT FLANK VIGNETTE - DÀNH CHO MÀN HÌNH RỘNG XL & 2XL)
          Bao gồm: Cổng Torii thần đạo, Rừng trúc Sagano, Đèn đá Kasuga phát sáng ấm
          ========================================================================= */}
      <div className="hidden xl:block absolute left-2 top-0 bottom-0 w-44 2xl:w-60 pointer-events-none z-0 opacity-80 transition-opacity">
        <svg
          className="w-full h-full"
          viewBox="0 0 240 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMid meet"
        >
          <defs>
            <linearGradient id="bambooGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={isDark ? '#064e3b' : '#3f6212'} stopOpacity={isDark ? '0.45' : '0.35'} />
              <stop offset="100%" stopColor={isDark ? '#047857' : '#4d7c0f'} stopOpacity={isDark ? '0.2' : '0.15'} />
            </linearGradient>
            <linearGradient id="toriiFlankGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#ef4444' : '#bc002d'} stopOpacity={isDark ? '0.6' : '0.45'} />
              <stop offset="100%" stopColor={isDark ? '#991b1b' : '#881337'} stopOpacity={isDark ? '0.3' : '0.2'} />
            </linearGradient>
            <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Rừng trúc Sagano (Bamboo stalks) */}
          {/* Thân trúc 1 */}
          <rect x="25" y="40" width="7" height="720" rx="2" fill="url(#bambooGrad)" />
          <line x1="23" y1="120" x2="34" y2="120" stroke={isDark ? '#10b981' : '#65a30d'} strokeWidth="2.5" opacity="0.4" />
          <line x1="23" y1="240" x2="34" y2="240" stroke={isDark ? '#10b981' : '#65a30d'} strokeWidth="2.5" opacity="0.4" />
          <line x1="23" y1="380" x2="34" y2="380" stroke={isDark ? '#10b981' : '#65a30d'} strokeWidth="2.5" opacity="0.4" />
          <line x1="23" y1="520" x2="34" y2="520" stroke={isDark ? '#10b981' : '#65a30d'} strokeWidth="2.5" opacity="0.4" />
          {/* Lá trúc 1 */}
          <path d="M30 120 C45 110 65 115 80 130 C65 125 45 122 30 120 Z" fill={isDark ? '#10b981' : '#4d7c0f'} opacity="0.35" />
          <path d="M30 240 C50 230 70 238 85 255 C68 248 48 245 30 240 Z" fill={isDark ? '#10b981' : '#4d7c0f'} opacity="0.35" />

          {/* Thân trúc 2 */}
          <rect x="52" y="80" width="9" height="680" rx="2" fill="url(#bambooGrad)" />
          <line x1="50" y1="180" x2="63" y2="180" stroke={isDark ? '#10b981' : '#65a30d'} strokeWidth="2.5" opacity="0.4" />
          <line x1="50" y1="310" x2="63" y2="310" stroke={isDark ? '#10b981' : '#65a30d'} strokeWidth="2.5" opacity="0.4" />
          <line x1="50" y1="450" x2="63" y2="450" stroke={isDark ? '#10b981' : '#65a30d'} strokeWidth="2.5" opacity="0.4" />
          {/* Lá trúc 2 */}
          <path d="M58 180 C80 170 105 180 120 200 C100 190 75 188 58 180 Z" fill={isDark ? '#10b981' : '#4d7c0f'} opacity="0.3" />
          <path d="M58 310 C82 300 110 312 125 330 C102 320 78 318 58 310 Z" fill={isDark ? '#10b981' : '#4d7c0f'} opacity="0.3" />

          {/* CỔNG TORII THẦN ĐẠO (Torii Gate ở vị trí giữa-dưới) */}
          <g transform="translate(30, 480) scale(0.85)">
            {/* Xà ngang trên (Kasagi) cong vút */}
            <path
              d="M 10,25 C 60,18 140,18 190,25 C 195,20 195,16 185,15 C 135,10 65,10 15,15 C 5,16 5,20 10,25 Z"
              fill="url(#toriiFlankGrad)"
            />
            {/* Xà ngang phụ (Nuki) */}
            <rect x="25" y="42" width="150" height="7" rx="1.5" fill="url(#toriiFlankGrad)" />
            {/* Cột chống giữa (Gakuzuka) */}
            <rect x="96" y="24" width="8" height="18" fill="url(#toriiFlankGrad)" />
            {/* 2 Cột trụ chính (Hashira) nghiêng nhẹ */}
            <rect x="36" y="25" width="13" height="150" rx="3" fill="url(#toriiFlankGrad)" />
            <rect x="151" y="25" width="13" height="150" rx="3" fill="url(#toriiFlankGrad)" />
            {/* Chân đế đá (Daiishi) */}
            <rect x="31" y="168" width="23" height="9" rx="2" fill={isDark ? '#374151' : '#78716c'} opacity="0.5" />
            <rect x="146" y="168" width="23" height="9" rx="2" fill={isDark ? '#374151' : '#78716c'} opacity="0.5" />
          </g>

          {/* ĐÈN ĐÁ KASUGA TŌRŌ (Stone Lantern) ở góc dưới cùng bên trái */}
          <g transform="translate(145, 620) scale(0.75)">
            {/* Đỉnh bảo châu (Hōju) */}
            <circle cx="40" cy="10" r="5" fill={isDark ? '#9ca3af' : '#78716c'} opacity="0.6" />
            {/* Mái che ô bát giác (Kasa) */}
            <path d="M 15,30 L 40,15 L 65,30 Z" fill={isDark ? '#4b5563' : '#78716c'} opacity="0.65" />
            {/* Buồng đèn phát sáng (Hibukuro) */}
            <rect x="26" y="30" width="28" height="26" rx="2" fill={isDark ? '#1f2937' : '#d6d3d1'} opacity="0.8" />
            {/* Vầng sáng lung linh từ tâm đèn */}
            <circle cx="40" cy="43" r="16" fill="url(#lanternGlow)" />
            <rect x="32" y="36" width="16" height="14" rx="2" fill="#fef08a" opacity="0.85" />
            {/* Đế đỡ (Chūdai) và Trụ đá (Sao) */}
            <path d="M 22,56 L 58,56 L 50,66 L 30,66 Z" fill={isDark ? '#4b5563' : '#78716c'} opacity="0.6" />
            <rect x="35" y="66" width="10" height="42" fill={isDark ? '#374151' : '#78716c'} opacity="0.6" />
            <rect x="20" y="108" width="40" height="12" rx="3" fill={isDark ? '#1f2937' : '#57534e'} opacity="0.6" />
          </g>

          {/* Dấu Triện Thư Pháp Dọc: 『 静 寂 』 (Tĩnh Tịch) */}
          <g transform="translate(195, 260)">
            <rect x="0" y="0" width="26" height="74" rx="6" fill={isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(188, 0, 45, 0.1)'} stroke={isDark ? '#ef4444' : '#bc002d'} strokeWidth="1.2" opacity="0.45" />
            <text x="13" y="26" textAnchor="middle" fill={isDark ? '#f87171' : '#bc002d'} fontSize="13" fontFamily="var(--font-kanji, serif)" fontWeight="900" opacity="0.75">静</text>
            <text x="13" y="52" textAnchor="middle" fill={isDark ? '#f87171' : '#bc002d'} fontSize="13" fontFamily="var(--font-kanji, serif)" fontWeight="900" opacity="0.75">寂</text>
          </g>
        </svg>
      </div>

      {/* =========================================================================
          3. TRỤ CẢNH BỜ ĐÔNG (RIGHT FLANK VIGNETTE - DÀNH CHO MÀN HÌNH RỘNG XL & 2XL)
          Bao gồm: Cành Hoa Anh Đào rủ, Chùa 5 tầng Kyoto (Gojūnotō), Cây tùng Matsu
          ========================================================================= */}
      <div className="hidden xl:block absolute right-2 top-0 bottom-0 w-44 2xl:w-60 pointer-events-none z-0 opacity-80 transition-opacity">
        <svg
          className="w-full h-full"
          viewBox="0 0 240 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMaxYMid meet"
        >
          <defs>
            <linearGradient id="sakuraBranchGrad" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#4b5563' : '#78350f'} stopOpacity="0.5" />
              <stop offset="100%" stopColor={isDark ? '#1f2937' : '#451a03'} stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="pagodaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#ec4899' : '#b45309'} stopOpacity={isDark ? '0.45' : '0.35'} />
              <stop offset="100%" stopColor={isDark ? '#6b21a8' : '#78350f'} stopOpacity={isDark ? '0.2' : '0.15'} />
            </linearGradient>
            <radialGradient id="sakuraPetalPink" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fdf2f8" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#f472b6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#db2777" stopOpacity="0.7" />
            </radialGradient>
          </defs>

          {/* CÀNH HOA ANH ĐÀO (SHIDAREZAKURA) RỦ TỪ GÓC PHẢI TRÊN */}
          <g transform="translate(40, -10)">
            {/* Cành cây chính uốn lượn */}
            <path
              d="M 200,0 C 160,40 120,60 80,100 C 50,130 30,170 15,220"
              stroke="url(#sakuraBranchGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Nhánh con 1 */}
            <path
              d="M 120,60 C 90,80 70,110 50,135"
              stroke="url(#sakuraBranchGrad)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Nhánh con 2 */}
            <path
              d="M 60,115 C 35,130 20,150 5,180"
              stroke="url(#sakuraBranchGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Các chùm hoa anh đào nở rộ (Clusters of Sakura blossoms) */}
            {[
              { x: 140, y: 55, r: 12 },
              { x: 110, y: 70, r: 14 },
              { x: 80, y: 100, r: 15 },
              { x: 50, y: 130, r: 13 },
              { x: 25, y: 175, r: 14 },
              { x: 10, y: 220, r: 12 },
              { x: 65, y: 120, r: 10 },
              { x: 35, y: 145, r: 11 },
            ].map((flower, idx) => (
              <g key={idx} transform={`translate(${flower.x}, ${flower.y})`}>
                {/* 5 cánh hoa */}
                <circle cx="0" cy="-6" r="5" fill="url(#sakuraPetalPink)" opacity="0.85" />
                <circle cx="6" cy="-2" r="5" fill="url(#sakuraPetalPink)" opacity="0.85" />
                <circle cx="4" cy="5" r="5" fill="url(#sakuraPetalPink)" opacity="0.85" />
                <circle cx="-4" cy="5" r="5" fill="url(#sakuraPetalPink)" opacity="0.85" />
                <circle cx="-6" cy="-2" r="5" fill="url(#sakuraPetalPink)" opacity="0.85" />
                {/* Nhụy hoa vàng kim */}
                <circle cx="0" cy="0" r="2.5" fill="#fbbf24" opacity="0.9" />
              </g>
            ))}
          </g>

          {/* CHÙA 5 TẦNG KYOTO (GOJŪNOTŌ - 五重塔) ở góc dưới bên phải */}
          <g transform="translate(60, 480) scale(0.85)">
            {/* Đỉnh bảo tháp (Sōrin) */}
            <line x1="80" y1="0" x2="80" y2="40" stroke={isDark ? '#ec4899' : '#b45309'} strokeWidth="3" opacity="0.5" />
            <circle cx="80" cy="5" r="3" fill="#f59e0b" opacity="0.6" />
            <circle cx="80" cy="15" r="2.5" fill="#f59e0b" opacity="0.6" />
            <circle cx="80" cy="25" r="2.5" fill="#f59e0b" opacity="0.6" />

            {/* Mái 5 (Tầng trên cùng) */}
            <path d="M 50,55 L 80,40 L 110,55 L 105,62 L 55,62 Z" fill="url(#pagodaGrad)" />
            <rect x="68" y="62" width="24" height="12" fill={isDark ? '#1f2937' : '#78350f'} opacity="0.4" />

            {/* Mái 4 */}
            <path d="M 44,82 L 80,66 L 116,82 L 110,89 L 50,89 Z" fill="url(#pagodaGrad)" />
            <rect x="65" y="89" width="30" height="14" fill={isDark ? '#1f2937' : '#78350f'} opacity="0.4" />

            {/* Mái 3 */}
            <path d="M 38,112 L 80,94 L 122,112 L 115,119 L 45,119 Z" fill="url(#pagodaGrad)" />
            <rect x="62" y="119" width="36" height="15" fill={isDark ? '#1f2937' : '#78350f'} opacity="0.4" />

            {/* Mái 2 */}
            <path d="M 32,143 L 80,123 L 128,143 L 120,151 L 40,151 Z" fill="url(#pagodaGrad)" />
            <rect x="58" y="151" width="44" height="16" fill={isDark ? '#1f2937' : '#78350f'} opacity="0.4" />

            {/* Mái 1 (Tầng trệt) */}
            <path d="M 24,177 L 80,154 L 136,177 L 127,186 L 33,186 Z" fill="url(#pagodaGrad)" />
            <rect x="52" y="186" width="56" height="24" rx="2" fill={isDark ? '#1f2937' : '#78350f'} opacity="0.45" />
            <rect x="42" y="210" width="76" height="8" rx="2" fill={isDark ? '#374151' : '#57534e'} opacity="0.5" />
          </g>

          {/* Dấu Triện Thư Pháp Dọc: 『 風 雅 』 (Phong Nhã) */}
          <g transform="translate(20, 260)">
            <rect x="0" y="0" width="26" height="74" rx="6" fill={isDark ? 'rgba(217, 119, 6, 0.15)' : 'rgba(217, 119, 6, 0.1)'} stroke={isDark ? '#fbbf24' : '#d97706'} strokeWidth="1.2" opacity="0.45" />
            <text x="13" y="26" textAnchor="middle" fill={isDark ? '#fbbf24' : '#d97706'} fontSize="13" fontFamily="var(--font-kanji, serif)" fontWeight="900" opacity="0.75">風</text>
            <text x="13" y="52" textAnchor="middle" fill={isDark ? '#fbbf24' : '#d97706'} fontSize="13" fontFamily="var(--font-kanji, serif)" fontWeight="900" opacity="0.75">雅</text>
          </g>
        </svg>
      </div>

      {/* =========================================================================
          4. CHÂN TRANG: DÃY NÚI PHÚ SĨ THỦY MẶC & SÓNG SEIGAIHA (BOTTOM PANORAMA)
          ========================================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-60 md:h-72 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="fujiPanoramaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isDark ? '#ef4444' : '#bc002d'}
                stopOpacity={isDark ? '0.24' : '0.14'}
              />
              <stop
                offset="40%"
                stopColor={isDark ? '#3b82f6' : '#78716c'}
                stopOpacity={isDark ? '0.16' : '0.08'}
              />
              <stop
                offset="100%"
                stopColor={isDark ? '#0b0f17' : '#f5eedf'}
                stopOpacity={isDark ? '0.55' : '0.4'}
              />
            </linearGradient>

            <linearGradient id="hillBackGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#6366f1' : '#b45309'} stopOpacity={isDark ? '0.18' : '0.1'} />
              <stop offset="100%" stopColor={isDark ? '#0b0f17' : '#f5eedf'} stopOpacity="0.6" />
            </linearGradient>

            <linearGradient id="hillForeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#ec4899' : '#bc002d'} stopOpacity={isDark ? '0.14' : '0.08'} />
              <stop offset="100%" stopColor={isDark ? '#0b0f17' : '#f5eedf'} stopOpacity="0.85" />
            </linearGradient>

            {/* Pattern Họa tiết Sóng Biển Seigaiha (青海波) */}
            <pattern id="seigaihaPattern" width="40" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 0,20 A 20,20 0 0,1 40,20 M 5,20 A 15,15 0 0,1 35,20 M 10,20 A 10,10 0 0,1 30,20 M 15,20 A 5,5 0 0,1 25,20 M 20,0 A 20,20 0 0,1 60,0 M 25,0 A 15,15 0 0,1 55,0 M 30,0 A 10,10 0 0,1 50,0 M 35,0 A 5,5 0 0,1 45,0"
                stroke={isDark ? 'rgba(147, 197, 253, 0.12)' : 'rgba(188, 0, 45, 0.08)'}
                strokeWidth="1.2"
                fill="none"
              />
            </pattern>
          </defs>

          {/* DÃY NÚI PHÚ SĨ HÙNG VĨ Ở TRUNG TÂM */}
          <path
            d="M 420,320 
               C 550,240 635,100 700,68 
               C 712,62 728,62 740,68 
               C 805,100 890,240 1020,320 Z"
            fill="url(#fujiPanoramaGrad)"
          />

          {/* Đỉnh chóp tuyết Phú Sĩ cách điệu */}
          <path
            d="M 682,90 
               C 698,99 710,88 720,102 
               C 730,88 742,99 758,90 
               C 738,70 727,64 720,64 
               C 713,64 702,70 682,90 Z"
            fill={isDark ? 'rgba(255, 255, 255, 0.32)' : 'rgba(255, 255, 255, 0.72)'}
          />

          {/* Đồi núi uốn lượn lớp 1 (Hậu cảnh) */}
          <path
            d="M 0,210 
               Q 240,140 480,200 
               T 960,180 
               Q 1200,150 1440,220 
               L 1440,320 L 0,320 Z"
            fill="url(#hillBackGrad)"
          />

          {/* Đồi núi uốn lượn lớp 2 (Tiền cảnh) */}
          <path
            d="M 0,250 
               Q 320,190 640,255 
               T 1280,230 
               Q 1360,235 1440,260 
               L 1440,320 L 0,320 Z"
            fill="url(#hillForeGrad)"
          />

          {/* Dải Sóng Seigaiha gợn ở đáy cùng */}
          <rect x="0" y="270" width="1440" height="50" fill="url(#seigaihaPattern)" opacity="0.75" />
        </svg>
      </div>

      {/* =========================================================================
          5. BỐN KHUNG GÓC NGHỆ THUẬT (TRADITIONAL JAPANESE CORNER ORNAMENTS)
          ========================================================================= */}
      <div className="hidden md:block absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-border-strong opacity-35" />
      <div className="hidden md:block absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-border-strong opacity-35" />
      <div className="hidden md:block absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-border-strong opacity-35" />
      <div className="hidden md:block absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-border-strong opacity-35" />
    </div>
  );
}
