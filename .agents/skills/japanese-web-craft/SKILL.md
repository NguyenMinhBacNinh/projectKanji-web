---
name: japanese-web-craft
description: Tiêu chuẩn thiết kế giao diện và sư phạm số chuyên sâu cho ứng dụng học tiếng Nhật (Furigana Ruby, Bảng màu Dentōshoku, Âm học Zen & Keyboard-First UX).
---

# Japanese Web Craft: Bộ 4 Kỹ Năng Thiết Kế & Sư Phạm Tiếng Nhật

Tài liệu này xác định 4 nguyên tắc kỹ năng cốt lõi áp dụng xuyên suốt ứng dụng học tiếng Nhật để tạo nên trải nghiệm chân thực, tinh tế (*Wabi-Sabi*) và có tính sư phạm cao nhất.

---

## Kỹ năng 1: Thư pháp & Bố cục Furigana Chuẩn Mực (`<ruby><rt>`)
- **Nguyên tắc cốt lõi:** Luôn sử dụng thẻ ngữ nghĩa chuẩn HTML5 `<ruby>` và `<rt>` để đặt cách đọc Hiragana ngay phía trên Hán tự thay vì đặt trong dấu ngoặc đơn lộn xộn.
- **Tính năng chuyển đổi sư phạm (Toggle Furigana):**
  - Mặc định: Bật Furigana để người mới học dễ theo dõi.
  - Chế độ ẩn Furigana: Giúp người học tự thử thách khả năng nhận diện mặt chữ Kanji độc lập.
  - Bố cục font chữ: Sử dụng font chữ Thư pháp Nhật (`Noto Serif JP` / `Shippori Mincho` cho Hán tự trang trọng, `Zen Maru Gothic` cho Kana thân thiện).

---

## Kỹ năng 2: Bảng màu Di sản Nhật Bản (*Nihon no Dentōshoku - 日本の伝統色*)
Loại bỏ hoàn toàn các màu sắc kỹ thuật số chói mắt (pure hex neon). Sử dụng bảng màu tự nhiên lấy cảm hứng từ thiên nhiên, trà đạo và đền chùa Nhật:

| Tên màu Nhật | Mã màu | Ứng dụng trong giao diện |
| :--- | :--- | :--- |
| **Sumi (墨 - Mực Tàu)** | `#1A1917` | Màu chữ chính, viền nét bút, thanh thoát và sâu lắng |
| **Torinoko (鳥の子 - Giấy dâu tằm ngà)** | `#F8F6F1` | Màu nền giấy Washi, giảm mỏi mắt khi học lâu |
| **Shu-iro (朱色 - Đỏ son Torii)** | `#BC002D` | Điểm nhấn chính, cổng Torii, con dấu, nút hành động chính |
| **Matcha (抹茶 - Xanh lá trà đạo)** | `#4A6B48` | Trạng thái "Đã thuộc", câu trả lời chính xác, thành công |
| **Yamabuki (山吹色 - Vàng hoa sơn xuy)** | `#D97706` | Trạng thái "Cần ôn tập", mẹo nhớ chiết tự, Sổ tay Chōmen |
| **Aizome (藍染 - Chàm sẫm)** | `#203744` | Trạng thái phụ, liên kết, phân loại ngữ pháp |

---

## Kỹ năng 3: Tương tác Thính giác Zen (Zen Acoustic Feedback)
Trải nghiệm học không chỉ bằng mắt mà còn kích hoạt xúc giác và thính giác thông qua Web Audio API mô phỏng nhạc cụ truyền thống Nhật:

1. **Hyōshigi (拍子木 - Phách gỗ):** Tiếng gõ gỗ giòn dã khi lật thẻ flashcard hoặc chuyển trang.
2. **Bonshō / Rin (梵鐘 / 鈴 - Chuông đồng thiền môn):** Tiếng chuông chùa ngân nga thanh tịnh khi người học bấm "Đã thuộc" hoặc vượt qua bài thi.
3. **Hanko Stamp (判子 - Con dấu son):** Âm thanh đóng dấu chắc nịch khi lưu chữ vào Sổ tay Chōmen hay hoàn thành bài học.
4. **Suikinkutsu (水琴窟 - Giọt nước hang đá):** Tiếng giọt nước róc rách trong trẻo khi phát âm hoặc chọn bộ lọc.

---

## Kỹ năng 4: Sư phạm Tốc độ cao (Keyboard-First Mastery & Audio)
- **Tập trung vào phát âm tự nhiên:** Nghe audio trực tiếp, không làm rối mắt người học bằng các biểu đồ cao độ phức tạp.
- **Điều khiển phím tắt tốc độ cao (Keyboard-First Mastery):**
  - `Space`: Lật mặt thẻ Flashcard
  - `←` / `→`: Chuyển từ vựng / Hán tự trước - sau
  - `1`: Đánh dấu chưa nhớ / Lưu Sổ tay
  - `2`: Đánh dấu đã thuộc (Matcha + Chuông chùa)
  - `F`: Bật / tắt hiển thị Furigana
  - `A`: Phát âm chuẩn âm thanh Nhật Bản
  - `⌘K` / `Ctrl+K`: Mở tìm kiếm toàn năng Spotlight
