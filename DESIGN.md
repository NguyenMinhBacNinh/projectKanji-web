# Design System: Kyoto Zen Studio (漢字学習帳)

<!-- impeccable:design-schema 1 -->

## Core Philosophy: Out-of-Distribution Craft
- **Anti-Slop Directive**: Loại bỏ hoàn toàn dấu ấn giao diện AI (nested cards soup, candy rainbow button strips, empty placeholder voids, bounce/elastic animations, decorative random line grids, boastful marketing pill badges).
- **Wabi-Sabi Aesthetics & Tactile Materiality**: Lấy cảm hứng từ xưởng thư pháp giấy Washi Echizen thủ công, mực tàu Sumi đen sâu, sơn mài đỏ Torii (Akane), thếp vàng kim mờ Kinpaku và đêm trăng Yozakura.
- **Zero-Scroll Studio Architecture**: Toàn bộ thao tác cốt lõi nằm trọn vẹn trong 1 viewport duy nhất (100dvh trên Laptop & Desktop), giảm thiểu phân mảnh thị giác, đưa Kanji thành chủ thể trung tâm (Hero).

## Color Palette (Nihon Dentōshoku - 日本伝統色)
- **Primary Lacquer**: `#b91c1c` (Torii Red / Akane) — Điểm nhấn hành động chính, viền tiêu điểm, chuông thiền.
- **Dark Lacquer Accent**: `#991b1b` / `#7f1d1d` (Deep Torii).
- **Ink Tone (Sumi)**: `#1c1917` (Stone-900 / Thủy mặc than củi) trên nền sáng; `#f8fafc` (Trắng trăng) trên nền tối.
- **Warm Gold (Kinpaku)**: `#b45309` (Amber-700 / Nhũ vàng mộc) trên nền sáng; `#fbbf24` (Amber-400) trên nền tối.
- **Paper Surface (Echizen Washi)**:
  - Page Background: `#faf8f5` (Ngà tuyết Washi ấm).
  - Card Surface: `#ffffff` (Bạch lụa).
  - Secondary Panel: `#f6f2ea` (Gỗ Hinoki nhạt).
  - Hairline Border: `#e7dfd3` (Sợi dâu tằm tự nhiên).
- **Dark Mode (Yozakura - 夜桜)**:
  - Page Background: `#0c101a` (Đêm sâu Kyoto).
  - Card Surface: `#131b29` (Sơn mài đen lam).
  - Secondary Panel: `#182234` (Gỗ sẫm).
  - Hairline Border: `#28354b`.

## Typography Hierarchy
- **Kanji Hero Font**: `Shippori Mincho`, `Noto Serif JP`, serif — Đậm đà, chuẩn thư pháp truyền thống, tôn vinh nét bút.
- **UI & System Font**: `Plus Jakarta Sans`, system-ui, -apple-system, sans-serif — Sạch sẽ, hình học, tỷ lệ tương phản rõ ràng.
- **Furigana (Ruby)**: Đặt ngay trên chữ Hán với `letter-spacing: 0.08em`, cỡ chữ cân đối 0.52em, sắc nét.
- **Sino-Vietnamese (Hán-Việt)**: `font-kanji font-bold uppercase tracking-[0.2em]` — Uy nghiêm, chuẩn mực, không dùng hiệu ứng gradient bóng bẩy giả tạo.

## Anti-Patterns Strictly Banned
- ❌ **No Nested Cards**: Không lồng các thẻ bài bo góc bên trong thẻ bài lớn; sử dụng nhịp điệu typography, đường kẻ chỉ mảnh (hairline) và khoảng thở tự nhiên.
- ❌ **No Rainbow Toolbars**: Các công cụ chức năng dùng bảng màu đơn sắc đồng nhất (warm neutral + torii accent), không gắn mỗi nút một màu cầu vồng ngẫu nhiên.
- ❌ **No Bounce Easing**: Tuyệt đối không dùng `bounce/elastic cubic-bezier`; sử dụng đường cong hãm đà tự nhiên `cubic-bezier(0.16, 1, 0.3, 1)`.
- ❌ **No Empty Card Voids**: Từ vựng ghép (Compounds) và chiết tự phải có mật độ thông tin cân xứng, bố cục biên tập (editorial layout), không để khoảng trống 80% chết ở giữa thẻ.
- ❌ **No Emoji Badge Ribbon**: Loại bỏ dải ruy-băng phù hiệu emoji rườm rà ở chân trang; giữ chân trang tinh tế, tối giản chuẩn Zen.
