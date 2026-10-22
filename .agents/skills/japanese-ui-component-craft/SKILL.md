---
name: japanese-ui-component-craft
description: Hệ thống tiêu chuẩn component UI văn hóa Nhật Bản (Karuta Glassmorphism, Hanko Seals, Kifuda Woodblock Tabs, Nihon Dentōshoku Palette và Chế độ tối Yozakura).
---

# Japanese UI Component Craft: Hệ Thống Component Nhật Bản Cao Cấp

Kỹ năng này quy định chi tiết cách xây dựng và hoàn thiện từng thành phần giao diện (UI Components) đạt chuẩn thẩm mỹ thủ công Kyoto và công nghệ giáo dục hiện đại.

---

## 1. Thẻ bài Karuta / Tanzaku (Flashcard Component)
- **Cấu trúc 3D:** Hiệu ứng lật thẻ 3 chiều (`preserve-3d`, `rotateY(180deg)`).
- **Mặt trước (Thử thách phản xạ):**
  - Chữ Kanji trung tâm trang nghiêm, font Thư pháp `Shippori Mincho` / `Noto Serif JP`.
  - Furigana `<rt>` tinh xảo (15px, cách đều ký tự).
  - Tên Hán-Việt màu đỏ son Torii (`#B91C1C` / `#F87171`).
  - Âm On / Kun trong khung chữ nhật bo góc viền kép *Nijuwaku*.
- **Mặt sau (Giải mã toàn diện):**
  - Bóc tách chiết tự bộ thủ cấu thành.
  - Hình tượng & mẹo ghi nhớ kèm tranh mộc bản Ukiyo-e.
  - Hệ thống lặp lại ngắt quãng SRS 4 cấp độ (Quên, Khó, Tốt, Dễ).

---

## 2. Thẻ mộc bài Kifuda (Level Tab Component)
- Lấy cảm hứng từ các thẻ gỗ ghi công đức hoặc thẻ bài mộc truyền thống Nhật (木札).
- Trạng thái Active: Màu đỏ Torii nguyên bản, bóng đổ mềm mại, chữ trắng tinh khôi.
- Trạng thái Inactive: Vân gỗ Washi hoặc đá sẫm Slate, độ tương phản cao, chuyển động hover tinh tế.

---

## 3. Con dấu triện đỏ Hanko (Hanko Stamp Component)
- Dấu triện son đỏ góc bo tròn hoặc hình tròn truyền thống (`.hanko-stamp`).
- Góc xoay nghiêng ngẫu nhiên nhẹ (`rotate(-1.5deg)`) tạo cảm giác như được đóng dấu bằng tay thực thụ.
- Sử dụng cho: Phân cấp JLPT (`JLPT N5`), dấu xác nhận đã thuộc (`済 - Sumi`), loại từ vựng.

---

## 4. Tương tác phát âm Audio tự nhiên (Zen Audio Component)
- Nút loa tròn tối giản, thanh lịch với phản hồi haptic và âm thanh giọt nước Suikinkutsu tinh tế.
- Tích hợp giọng phát âm chuẩn Nhật Bản (Web Speech API / Cloud TTS) không gây rối mắt bởi các đồ thị cao độ thừa.
- Trạng thái hover/active chuyển màu đỏ Torii hoặc xanh tre dịu mắt.

---

## 5. Chế độ tối Đêm Kyoto (Yozakura Dark Mode)
- Nền xanh đen mực tàu `#0b0f17` phối cùng sắc hoa anh đào đêm và ánh đỏ Torii.
- Thẻ bài chuyển sang chất liệu đá phiến nhung `#141a24`.
- Văn bản sử dụng màu trắng bạc Sumi `#f8fafc` đảm bảo tương phản tối đa, bảo vệ mắt khi học ban đêm.
