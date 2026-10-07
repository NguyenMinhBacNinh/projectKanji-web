'use client';

// Danh sách các họa tiết văn hóa & danh lam Nhật Bản truyền thống
export const JAPANESE_MOTIFS = [
  { id: 'fuji', name: 'Núi Phú Sĩ (富士山)', type: 'image', src: '/illustrations/fuji.jpg' },
  { id: 'sumo', name: 'Võ sĩ Sumo (相撲)', type: 'image', src: '/illustrations/sumo.jpg' },
  { id: 'torii', name: 'Cổng Torii (鳥居)', type: 'image', src: '/illustrations/torii.jpg' },
  { id: 'pagoda', name: 'Chùa 5 tầng Kyoto (五重塔)', type: 'svg' },
  { id: 'koi', name: 'Cá chép Koi (錦鯉)', type: 'svg' },
  { id: 'samurai', name: 'Nón giáp Samurai (兜)', type: 'svg' },
  { id: 'daruma', name: 'Búp bê Daruma (達磨)', type: 'svg' },
  { id: 'maneki', name: 'Mèo chiêu tài (招き猫)', type: 'svg' },
  { id: 'bonsai', name: 'Cây tùng Bonsai (盆栽)', type: 'svg' },
  { id: 'sakura', name: 'Cành hoa anh đào (桜)', type: 'svg' },
  { id: 'origami', name: 'Hạc giấy Origami (折鶴)', type: 'svg' },
  { id: 'wave', name: 'Sóng lớn Ukiyo-e (波)', type: 'svg' },
  { id: 'fan', name: 'Quạt xếp Nhật (扇子)', type: 'svg' },
  { id: 'kitsune', name: 'Mặt nạ cáo Kitsune (狐面)', type: 'svg' },
  { id: 'chochin', name: 'Lồng đèn lễ hội (提灯)', type: 'svg' },
  { id: 'bamboo', name: 'Rừng trúc Sagano (竹林)', type: 'svg' },
];

/**
 * Hàm phân bổ họa tiết chính xác theo ý nghĩa chữ Kanji.
 * Nếu là các chữ tiêu biểu (Nhật, Nguyệt, Mộc, Sơn, Thủy, v.v.), gắn trực tiếp tranh minh họa chuẩn xác.
 */
export function getMotifForKanji(char, index = 0) {
  if (!char) return JAPANESE_MOTIFS[index % JAPANESE_MOTIFS.length];

  // Khớp chính xác theo nghĩa chữ Hán
  const directMap = {
    '日': { id: 'sun', name: 'Mặt trời (日)', type: 'image', src: '/illustrations/sun.jpg' },
    '月': { id: 'moon', name: 'Mặt trăng (月)', type: 'image', src: '/illustrations/moon.jpg' },
    '木': { id: 'tree', name: 'Cây cối (木)', type: 'image', src: '/illustrations/tree.jpg' },
    '林': { id: 'tree', name: 'Rừng cây (林)', type: 'image', src: '/illustrations/tree.jpg' },
    '森': { id: 'tree', name: 'Đại ngàn (森)', type: 'image', src: '/illustrations/tree.jpg' },
    '山': { id: 'fuji', name: 'Núi Phú Sĩ (山)', type: 'image', src: '/illustrations/fuji.jpg' },
    '男': { id: 'sumo', name: 'Võ sĩ Sumo (男)', type: 'image', src: '/illustrations/sumo.jpg' },
    '力': { id: 'sumo', name: 'Sức mạnh (力)', type: 'image', src: '/illustrations/sumo.jpg' },
    '門': { id: 'torii', name: 'Cổng đền Torii (門)', type: 'image', src: '/illustrations/torii.jpg' },
    '道': { id: 'torii', name: 'Con đường (道)', type: 'image', src: '/illustrations/torii.jpg' },
    '花': { id: 'sakura', name: 'Hoa anh đào (花)', type: 'svg' },
    '魚': { id: 'koi', name: 'Cá chép Koi (魚)', type: 'svg' },
    '鳥': { id: 'origami', name: 'Hạc giấy (鳥)', type: 'svg' },
    '川': { id: 'wave', name: 'Sóng lớn Ukiyo-e (川)', type: 'svg' },
    '水': { id: 'wave', name: 'Làn nước biếc (水)', type: 'svg' },
    '竹': { id: 'bamboo', name: 'Rừng trúc (竹)', type: 'svg' },
    '猫': { id: 'maneki', name: 'Mèo chiêu tài (猫)', type: 'svg' },
    '寺': { id: 'pagoda', name: 'Chùa 5 tầng Kyoto (寺)', type: 'svg' },
    '武': { id: 'samurai', name: 'Mũ giáp Samurai (武)', type: 'svg' },
  };

  if (directMap[char]) return directMap[char];

  // Tính hash từ mã unicode của chữ Kanji + index để trải đều các hình
  const code = char.charCodeAt(0);
  const motifIndex = Math.abs(code * 17 + index * 3) % JAPANESE_MOTIFS.length;
  return JAPANESE_MOTIFS[motifIndex];
}

export default function JapaneseCardIllustration({ currentChar, currentIndex = 0 }) {
  const motif = getMotifForKanji(currentChar, currentIndex);

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-72 md:h-72 pointer-events-none select-none z-0 flex items-center justify-center overflow-hidden transition-opacity duration-500 opacity-[0.14] dark:opacity-[0.20]"
      style={{
        maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 82%)',
        WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 82%)',
      }}
      aria-hidden="true"
      title={motif.name}
    >
      {motif.type === 'image' ? (
        // Ảnh mộc bản Nhật chất lượng cao (Núi Phú Sĩ, Sumo, Cổng Torii)
        <img
          src={motif.src}
          alt={motif.name}
          className="w-full h-full object-cover object-center filter grayscale contrast-125 dark:filter-none dark:brightness-110"
          loading="eager"
        />
      ) : (
        // Các họa tiết vector văn hóa Nhật vẽ nét cọ mực Sumi
        <JapaneseSvgMotif id={motif.id} />
      )}
    </div>
  );
}

function JapaneseSvgMotif({ id }) {
  switch (id) {
    case 'pagoda':
      // Chùa 5 tầng Kyoto (五重塔)
      return (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-56 h-56 text-torii">
          {/* Đỉnh tháp Sorin */}
          <path d="M100 12 V 38" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="100" cy="20" r="4" strokeWidth="1.5" />
          <circle cx="100" cy="28" r="3.5" strokeWidth="1.5" />
          <circle cx="100" cy="34" r="3" strokeWidth="1.5" />
          {/* Mái tầng 5 */}
          <path d="M82 48 C 92 46, 108 46, 118 48 C 124 45, 128 43, 130 42 C 122 41, 100 40, 70 42 C 72 43, 76 45, 82 48 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.8" />
          <path d="M92 48 V 58 H 108 V 48" strokeWidth="1.5" />
          {/* Mái tầng 4 */}
          <path d="M78 68 C 90 66, 110 66, 122 68 C 130 65, 136 63, 138 61 C 128 60, 100 59, 62 61 C 64 63, 70 65, 78 68 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.8" />
          <path d="M90 68 V 80 H 110 V 68" strokeWidth="1.5" />
          {/* Mái tầng 3 */}
          <path d="M72 90 C 88 88, 112 88, 128 90 C 138 87, 146 84, 148 82 C 136 81, 100 80, 52 82 C 54 84, 62 87, 72 90 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.8" />
          <path d="M88 90 V 104 H 112 V 90" strokeWidth="1.5" />
          {/* Mái tầng 2 */}
          <path d="M66 114 C 86 112, 114 112, 134 114 C 146 111, 156 108, 158 106 C 144 105, 100 104, 42 106 C 44 108, 54 111, 66 114 Z" fill="currentColor" fillOpacity="0.35" strokeWidth="2" />
          <path d="M85 114 V 130 H 115 V 114" strokeWidth="1.5" />
          {/* Mái tầng 1 */}
          <path d="M60 142 C 84 140, 116 140, 140 142 C 154 139, 166 135, 168 133 C 152 132, 100 131, 32 133 C 34 135, 46 139, 60 142 Z" fill="currentColor" fillOpacity="0.4" strokeWidth="2" />
          <path d="M82 142 V 165 H 118 V 142" strokeWidth="1.5" />
          {/* Cửa tháp */}
          <rect x="94" y="148" width="12" height="17" rx="1" fill="currentColor" fillOpacity="0.4" />
          {/* Đế đá tháp */}
          <path d="M50 165 H 150 V 172 H 50 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
          {/* Đám mây phong cách Nhật */}
          <path d="M30 50 C 45 45, 55 55, 65 50" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M140 120 C 155 115, 165 125, 178 120" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'koi':
      // Song ngư cá chép Koi (錦鯉)
      return (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-56 h-56 text-torii">
          {/* Vòng sóng nước âm dương */}
          <circle cx="100" cy="100" r="82" strokeWidth="1.2" strokeDasharray="6 6" opacity="0.5" />
          <circle cx="100" cy="100" r="62" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          {/* Cá Koi 1 */}
          <path
            d="M85 45 C 115 50, 135 75, 125 105 C 118 125, 95 130, 80 120 C 70 110, 75 90, 85 80 C 95 70, 95 55, 85 45 Z"
            fill="currentColor"
            fillOpacity="0.25"
            strokeWidth="2"
          />
          {/* Đuôi cá 1 */}
          <path d="M85 45 C 90 28, 105 25, 110 32 C 105 38, 98 42, 85 45 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.5" />
          <path d="M85 45 C 75 32, 68 36, 75 42 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" />
          {/* Vây cá 1 */}
          <path d="M125 80 C 140 82, 142 92, 130 92 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.2" />
          {/* Cá Koi 2 (đối xứng) */}
          <path
            d="M115 155 C 85 150, 65 125, 75 95 C 82 75, 105 70, 120 80 C 130 90, 125 110, 115 120 C 105 130, 105 145, 115 155 Z"
            fill="currentColor"
            fillOpacity="0.25"
            strokeWidth="2"
          />
          {/* Đuôi cá 2 */}
          <path d="M115 155 C 110 172, 95 175, 90 168 C 95 162, 102 158, 115 155 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.5" />
          <path d="M115 155 C 125 168, 132 164, 125 158 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" />
          {/* Vây cá 2 */}
          <path d="M75 120 C 60 118, 58 108, 70 108 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.2" />
        </svg>
      );

    case 'samurai':
      // Mũ giáp Samurai Kabuto (兜)
      return (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-56 h-56 text-torii">
          {/* Sừng giáp Kuwagata hình vầng trăng khuyết oai phong */}
          <path d="M100 65 C 120 40, 150 25, 175 35 C 155 45, 135 65, 125 80 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="2" />
          <path d="M100 65 C 80 40, 50 25, 25 35 C 45 45, 65 65, 75 80 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="2" />
          {/* Tâm ấn mặt trăng / mặt trời trên đỉnh nón */}
          <circle cx="100" cy="62" r="10" strokeWidth="2" fill="currentColor" fillOpacity="0.4" />
          {/* Vòm mũ Kabuto */}
          <path d="M60 85 C 60 70, 140 70, 140 85 C 145 105, 140 120, 100 122 C 60 120, 55 105, 60 85 Z" strokeWidth="2.5" fill="currentColor" fillOpacity="0.15" />
          {/* Các nan bảo vệ cổ Shikoro */}
          <path d="M45 105 C 70 115, 130 115, 155 105 C 158 112, 155 120, 150 124 C 125 132, 75 132, 50 124 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
          <path d="M40 122 C 68 134, 132 134, 160 122 C 162 130, 158 138, 152 142 C 125 152, 75 152, 48 142 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />
          <path d="M38 140 C 66 154, 134 154, 162 140 C 165 148, 160 156, 154 160 C 125 170, 75 170, 46 160 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.35" />
          {/* Dây thắt nón Agemaki */}
          <path d="M90 125 C 90 145, 95 160, 95 175" strokeWidth="2" strokeLinecap="round" />
          <path d="M110 125 C 110 145, 105 160, 105 175" strokeWidth="2" strokeLinecap="round" />
          <circle cx="100" cy="138" r="4" fill="currentColor" />
        </svg>
      );

    case 'daruma':
      // Búp bê may mắn Daruma (達磨)
      return (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-56 h-56 text-torii">
          {/* Thân tròn đẫy đà của Daruma */}
          <ellipse cx="100" cy="105" rx="68" ry="64" strokeWidth="2.5" fill="currentColor" fillOpacity="0.15" />
          {/* Mặt trong hình bầu dục */}
          <path d="M60 85 C 60 55, 140 55, 140 85 C 140 115, 60 115, 60 85 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
          {/* Đôi mắt mở to giác ngộ */}
          <circle cx="80" cy="82" r="10" strokeWidth="2" />
          <circle cx="80" cy="82" r="4.5" fill="currentColor" />
          <circle cx="120" cy="82" r="10" strokeWidth="2" />
          <circle cx="120" cy="82" r="4.5" fill="currentColor" />
          {/* Lông mày hình chim hạc (鶴) */}
          <path d="M68 70 C 75 66, 88 68, 92 72" strokeWidth="3" strokeLinecap="round" />
          <path d="M132 70 C 125 66, 112 68, 108 72" strokeWidth="3" strokeLinecap="round" />
          {/* Râu hình mai rùa (亀) */}
          <path d="M78 102 C 85 106, 95 106, 100 102 C 105 106, 115 106, 122 102" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M82 112 C 92 116, 108 116, 118 112" strokeWidth="2.5" strokeLinecap="round" />
          {/* Họa tiết vàng kim trên áo Daruma */}
          <path d="M85 135 C 95 130, 105 130, 115 135" strokeWidth="2" strokeLinecap="round" />
          <path d="M78 145 C 92 140, 108 140, 122 145" strokeWidth="2" strokeLinecap="round" />
          <circle cx="100" cy="155" r="5" strokeWidth="1.5" />
        </svg>
      );

    case 'maneki':
      // Mèo vẫy tài lộc Maneki Neko (招き猫)
      return (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-56 h-56 text-torii">
          {/* Thân mèo tròn trịa */}
          <path d="M60 170 C 50 140, 52 110, 68 85 C 75 75, 125 75, 132 85 C 148 110, 150 140, 140 170 Z" strokeWidth="2.2" fill="currentColor" fillOpacity="0.15" />
          {/* Tai mèo */}
          <path d="M70 82 L 56 48 L 84 64 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.3" strokeLinejoin="round" />
          <path d="M130 82 L 144 48 L 116 64 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.3" strokeLinejoin="round" />
          {/* Mắt mèo híp cười may mắn */}
          <path d="M74 95 C 80 90, 88 90, 92 95" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M126 95 C 120 90, 112 90, 108 95" strokeWidth="2.5" strokeLinecap="round" />
          {/* Mũi & Miệng cười */}
          <circle cx="100" cy="102" r="2.5" fill="currentColor" />
          <path d="M94 107 C 98 111, 102 111, 106 107" strokeWidth="2" strokeLinecap="round" />
          {/* Râu mèo */}
          <path d="M62 98 H 74" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M60 104 H 73" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M138 98 H 126" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M140 104 H 127" strokeWidth="1.5" strokeLinecap="round" />
          {/* Tay phải vẫy gọi khách & tài lộc */}
          <path d="M132 88 C 145 75, 155 70, 150 56 C 142 46, 130 58, 128 72 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.3" />
          {/* Vòng cổ chuông vàng Koban */}
          <path d="M72 120 C 90 126, 110 126, 128 120" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="128" r="6" strokeWidth="2" fill="currentColor" fillOpacity="0.4" />
          {/* Đồng tiền vàng may mắn Koban (小判) */}
          <rect x="85" y="140" width="30" height="28" rx="8" strokeWidth="2" fill="currentColor" fillOpacity="0.25" />
          <path d="M96 148 V 160" strokeWidth="1.5" />
          <path d="M104 148 V 160" strokeWidth="1.5" />
        </svg>
      );

    case 'bonsai':
      // Cây tùng Bonsai cổ thụ (盆栽)
      return (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-56 h-56 text-torii">
          {/* Thân cây uốn lượn phong trần */}
          <path d="M100 155 C 95 135, 110 120, 105 105 C 100 90, 85 92, 80 80 C 76 70, 82 58, 92 52" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M105 105 C 115 95, 130 92, 142 85" strokeWidth="3" strokeLinecap="round" />
          <path d="M95 130 C 80 120, 70 122, 60 115" strokeWidth="2.8" strokeLinecap="round" />
          {/* Tán lá tùng 1 (Đỉnh) */}
          <ellipse cx="94" cy="48" rx="22" ry="12" strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
          {/* Tán lá tùng 2 (Phải) */}
          <ellipse cx="145" cy="82" rx="26" ry="14" strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />
          {/* Tán lá tùng 3 (Trái) */}
          <ellipse cx="56" cy="112" rx="24" ry="13" strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />
          {/* Chậu gốm Bonsai (鉢) */}
          <path d="M55 155 H 145 L 138 175 H 62 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.2" strokeLinejoin="round" />
          <path d="M68 175 V 180 H 78 V 175" strokeWidth="1.8" />
          <path d="M122 175 V 180 H 132 V 175" strokeWidth="1.8" />
        </svg>
      );

    case 'sakura':
      // Cành hoa anh đào Sakura (桜)
      return (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-56 h-56 text-torii">
          {/* Cành cây uốn lượn tự nhiên */}
          <path d="M25 150 C 65 140, 95 110, 120 100 C 145 90, 165 65, 180 40" strokeWidth="3" strokeLinecap="round" />
          <path d="M95 110 C 90 90, 85 75, 75 60" strokeWidth="2" strokeLinecap="round" />
          <path d="M135 95 C 145 110, 155 120, 170 125" strokeWidth="2" strokeLinecap="round" />
          {/* Hoa đào 1 (Trung tâm) */}
          <g transform="translate(120, 98) scale(0.9)">
            {[0, 72, 144, 216, 288].map((rot, i) => (
              <path
                key={i}
                d="M0 0 C -6 -14, -4 -20, 0 -22 C 4 -20, 6 -14, 0 0 Z"
                transform={`rotate(${rot})`}
                strokeWidth="1.5"
                fill="currentColor"
                fillOpacity="0.3"
              />
            ))}
            <circle cx="0" cy="0" r="3" fill="currentColor" />
          </g>
          {/* Hoa đào 2 (Trái) */}
          <g transform="translate(74, 58) scale(0.8)">
            {[0, 72, 144, 216, 288].map((rot, i) => (
              <path
                key={i}
                d="M0 0 C -6 -14, -4 -20, 0 -22 C 4 -20, 6 -14, 0 0 Z"
                transform={`rotate(${rot})`}
                strokeWidth="1.5"
                fill="currentColor"
                fillOpacity="0.3"
              />
            ))}
            <circle cx="0" cy="0" r="2.5" fill="currentColor" />
          </g>
          {/* Hoa đào 3 (Phải) */}
          <g transform="translate(165, 122) scale(0.75)">
            {[0, 72, 144, 216, 288].map((rot, i) => (
              <path
                key={i}
                d="M0 0 C -6 -14, -4 -20, 0 -22 C 4 -20, 6 -14, 0 0 Z"
                transform={`rotate(${rot})`}
                strokeWidth="1.5"
                fill="currentColor"
                fillOpacity="0.3"
              />
            ))}
            <circle cx="0" cy="0" r="2.5" fill="currentColor" />
          </g>
          {/* Cánh hoa bay lơ lửng */}
          <path d="M45 80 C 40 72, 48 68, 52 72 C 55 76, 50 84, 45 80 Z" fill="currentColor" fillOpacity="0.3" />
          <path d="M150 45 C 145 38, 152 35, 156 38 C 158 42, 154 48, 150 45 Z" fill="currentColor" fillOpacity="0.3" />
        </svg>
      );

    case 'origami':
      // Hạc giấy Origami (折鶴)
      return (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-56 h-56 text-torii">
          {/* Thân hạc gấp nếp hình học */}
          <path d="M100 135 L 75 90 L 100 105 L 125 90 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.25" strokeLinejoin="round" />
          {/* Cánh trái giương rộng */}
          <path d="M75 90 L 25 55 L 100 105 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.2" strokeLinejoin="round" />
          {/* Cánh phải giương rộng */}
          <path d="M125 90 L 175 55 L 100 105 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.2" strokeLinejoin="round" />
          {/* Cổ & Đầu hạc kiêu hãnh */}
          <path d="M75 90 L 55 125 L 42 120" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Đuôi hạc vút nhọn */}
          <path d="M125 90 L 155 130" strokeWidth="2.2" strokeLinecap="round" />
          {/* Đáy thân hạc */}
          <path d="M100 135 L 100 160" strokeWidth="1.8" strokeLinecap="round" />
          {/* Vòng tròn nhật nguyệt phía sau */}
          <circle cx="100" cy="100" r="70" strokeWidth="1" strokeDasharray="5 5" opacity="0.4" />
        </svg>
      );

    case 'wave':
      // Sóng lớn Kanagawa phong cách Hokusai (波)
      return (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-56 h-56 text-torii">
          {/* Sóng trào lớn cuộn tròn */}
          <path
            d="M20 160 C 50 160, 60 145, 80 120 C 100 95, 125 60, 155 65 C 175 70, 170 95, 150 105 C 135 112, 115 110, 105 125 C 95 140, 105 155, 115 160 Z"
            strokeWidth="2.5"
            fill="currentColor"
            fillOpacity="0.25"
            strokeLinejoin="round"
          />
          {/* Bọt sóng vuốt nhọn đặc trưng Ukiyo-e */}
          <path d="M155 65 C 152 55, 146 50, 140 54 C 142 58, 146 62, 150 64" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M165 72 C 168 64, 164 58, 158 60 C 160 65, 162 69, 165 72" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M172 82 C 178 76, 175 70, 170 72" strokeWidth="1.8" strokeLinecap="round" />
          {/* Sóng phụ dập dềnh bên dưới */}
          <path d="M20 170 C 60 165, 90 175, 130 168 C 150 165, 170 172, 185 168" strokeWidth="2" strokeLinecap="round" />
          <circle cx="70" cy="110" r="2.5" fill="currentColor" opacity="0.6" />
          <circle cx="85" cy="95" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="120" cy="80" r="2.5" fill="currentColor" opacity="0.6" />
        </svg>
      );

    case 'fan':
      // Quạt xếp Sensu truyền thống (扇子)
      return (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-56 h-56 text-torii">
          {/* Nan quạt xòe hình cung */}
          <path
            d="M30 120 C 50 65, 150 65, 170 120 L 120 135 C 110 115, 90 115, 80 135 Z"
            strokeWidth="2.2"
            fill="currentColor"
            fillOpacity="0.2"
            strokeLinejoin="round"
          />
          {/* Nan tre đỡ quạt */}
          <path d="M100 165 L 30 120" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M100 165 L 60 88" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M100 165 L 100 75" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M100 165 L 140 88" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M100 165 L 170 120" strokeWidth="1.8" strokeLinecap="round" />
          {/* Đinh tán chốt quạt Kaname */}
          <circle cx="100" cy="165" r="4.5" strokeWidth="1.8" fill="currentColor" fillOpacity="0.5" />
          {/* Vầng thái dương trên mặt quạt */}
          <circle cx="100" cy="105" r="14" strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />
        </svg>
      );

    case 'kitsune':
      // Mặt nạ cáo thần Kitsune (狐面)
      return (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-56 h-56 text-torii">
          {/* Dáng mặt nạ cáo thanh tú */}
          <path
            d="M100 45 C 130 45, 155 70, 150 115 C 145 145, 115 168, 100 172 C 85 168, 55 145, 50 115 C 45 70, 70 45, 100 45 Z"
            strokeWidth="2.2"
            fill="currentColor"
            fillOpacity="0.15"
          />
          {/* Tai cáo nhọn vểnh */}
          <path d="M68 62 L 48 30 L 78 46 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.3" strokeLinejoin="round" />
          <path d="M132 62 L 152 30 L 122 46 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.3" strokeLinejoin="round" />
          {/* Mắt cáo xếch sắc sảo */}
          <path d="M70 102 C 78 98, 86 102, 92 110" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M130 102 C 122 98, 114 102, 108 110" strokeWidth="2.5" strokeLinecap="round" />
          {/* Họa tiết son đỏ Shinto trên trán và má */}
          <path d="M100 60 V 78" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="85" r="3" fill="currentColor" />
          <path d="M62 120 C 68 122, 74 120, 78 116" strokeWidth="2" strokeLinecap="round" />
          <path d="M138 120 C 132 122, 126 120, 122 116" strokeWidth="2" strokeLinecap="round" />
          {/* Mũi cáo */}
          <ellipse cx="100" cy="155" rx="3.5" ry="2.5" fill="currentColor" />
        </svg>
      );

    case 'chochin':
      // Lồng đèn giấy đỏ Chochin (提灯)
      return (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-56 h-56 text-torii">
          {/* Khung treo lồng đèn */}
          <path d="M100 25 V 45" strokeWidth="2.5" strokeLinecap="round" />
          {/* Nắp gỗ trên & dưới */}
          <rect x="78" y="45" width="44" height="10" rx="3" strokeWidth="2" fill="currentColor" fillOpacity="0.3" />
          <rect x="82" y="148" width="36" height="10" rx="3" strokeWidth="2" fill="currentColor" fillOpacity="0.3" />
          {/* Thân lồng đèn căng tròn */}
          <ellipse cx="100" cy="102" rx="46" ry="46" strokeWidth="2.5" fill="currentColor" fillOpacity="0.2" />
          {/* Các vòng nan tre lồng đèn */}
          <path d="M58 80 C 72 86, 128 86, 142 80" strokeWidth="1.5" />
          <path d="M54 102 C 70 108, 130 108, 146 102" strokeWidth="1.5" />
          <path d="M58 124 C 72 130, 128 130, 142 124" strokeWidth="1.5" />
          {/* Tua rua lủng lẳng dưới đáy */}
          <path d="M100 158 V 182" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'bamboo':
    default:
      // Rừng trúc Sagano thanh tịnh (竹林)
      return (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-56 h-56 text-torii">
          {/* Thân trúc chính */}
          <path d="M96 25 V 65 M96 70 V 115 M96 120 V 175" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M91 65 H 101 M91 70 H 101 M91 115 H 101 M91 120 H 101" strokeWidth="2" strokeLinecap="round" />
          {/* Thân trúc phụ */}
          <path d="M60 40 V 85 M60 90 V 140 M60 145 V 175" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M135 30 V 75 M135 80 V 130 M135 135 V 175" strokeWidth="3.5" strokeLinecap="round" />
          {/* Lá trúc thon dài */}
          <path d="M96 68 C 110 65, 125 72, 132 80 C 122 80, 110 75, 96 68 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.2" />
          <path d="M96 118 C 80 115, 68 122, 60 130 C 72 130, 84 125, 96 118 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.2" />
          <path d="M60 88 C 72 82, 85 86, 90 92 C 80 92, 70 88, 60 88 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.2" />
          <path d="M135 78 C 148 72, 162 76, 168 82 C 158 82, 146 78, 135 78 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.2" />
        </svg>
      );
  }
}
