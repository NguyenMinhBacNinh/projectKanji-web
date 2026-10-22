---
name: zero-scroll-zen-studio
description: Kiến trúc giao diện học tập 1 khung hình (Zero-Scroll Studio Architecture). Phân chia bố cục Split Studio 2 cột (Thẻ học Karuta bên trái - Trạm tri thức bên phải), khóa viewport không cuộn trang (100dvh), tối ưu thao tác phím tắt và hiển thị toàn diện dữ liệu.
---

# Zero-Scroll Zen Studio: Kiến Trúc Giao Diện 1 Khung Hình

Kỹ năng này định nghĩa nguyên tắc thiết kế phòng học tiếng Nhật trong **đúng 1 khung hình hiển thị (Single-Viewport / Zero-Scroll Studio)**, loại bỏ hoàn toàn việc người học phải dùng chuột lăn trang qua lại gây mất tập trung.

---

## 1. Nguyên Tắc Cốt Lõi: Khóa Khung Hình (Zero Window Scroll)
- Chiều cao toàn bộ ứng dụng trên màn hình máy tính được neo trong `h-screen` hoặc `max-h-screen` (`100dvh`).
- Thanh cuộn cửa sổ chính (`window.scrollY`) luôn bằng **0**.
- Người học quan sát được **toàn bộ hệ sinh thái của 1 chữ Hán tự** cùng lúc:
  1. Mặt chữ thư pháp & âm Hán-Việt.
  2. Cách đọc On/Kun & Âm thanh phát âm tự nhiên.
  3. Cụm từ vựng ghép tiêu biểu JLPT.
  4. Chiết tự bộ thủ cấu thành.
  5. Mẹo ghi nhớ tượng hình & tranh mộc bản Ukiyo-e.
  6. Câu ví dụ thực tế kèm audio phát âm.
  7. Nút đánh giá ghi nhớ SRS (`[1] Chưa nhớ` / `[2] Đã thuộc`).

---

## 2. Bố Cục Phân Tách Split Studio (2 Cột Song Hành)

Trên màn hình Desktop / Laptop (`lg:` trở lên):

```
+-------------------------------------------------------------------------------+
| HEADER & PHÂN CẤP JLPT N5 - N1 (Siêu gọn gàng 1 dòng)                          |
+-------------------------------------------------------------------------------+
|  CỘT TRÁI (STUDIO TRUNG TÂM ~55%)        |  CỘT PHẢI (TRẠM TRI THỨC ~45%)     |
|                                           |                                   |
|  +-------------------------------------+  |  [Tab: Từ ghép] [Bộ thủ] [Ví dụ]  |
|  | THẺ KARUTA 3D (Kanji Thư Pháp)      |  |                                   |
|  |                                     |  |  +-----------------------------+  |
|  |       一 (ひと)                     |  |  | LƯỚI TỪ VỰNG GHÉP JLPT      |  |
|  |      NHẤT                           |  |  | Đồng bộ chiều cao tuyệt đối |  |
|  |  Một, số một, đứng đầu              |  |  | Phát âm chuẩn & Nghĩa tiếng Việt|  |
|  |  [Âm On]        [Âm Kun]            |  |  +-----------------------------+  |
|  +-------------------------------------+  |                                   |
|                                           |  +-----------------------------+  |
|  [ 1: Chưa nhớ (Sổ tay) ] [ 2: Đã thuộc ]  |  | CHIẾT TỰ & BỘ THỦ CẤU THÀNH |  |
|  [ ← Trước ]  [ 🔀 Xáo ] [ ⊞ Mục lục ] [ →]|  | MẸO NHỚ TƯỢNG HÌNH & TRANH  |  |
|                                           |  | CÂU VÍ DỤ PHÁT ÂM           |  |
|                                           |  +-----------------------------+  |
+-------------------------------------------------------------------------------+
```

---

## 3. Đồng Bộ Kích Thước Tuyệt Đối (Pixel-Perfect Alignment)
- Các thẻ từ vựng trong lưới phải có kích thước bằng nhau 100% (`h-[132px]` hoặc `h-[120px]`).
- Khóa cứng chiều cao cho từng tầng nội dung:
  - Tầng Kanji + Furigana: `h-10`
  - Tầng Cách đọc & Phát âm: `h-[22px]`
  - Tầng Dịch nghĩa: `h-8` (`line-clamp-2`)
- Không để sự chênh lệch độ dài văn bản làm xô lệch giao diện.

---

## 4. Điều Khiển Siêu Tốc (Keyboard-First Mastery)
- `Space`: Lật thẻ xem chi tiết.
- `1`: Đánh dấu Chưa nhớ (Lưu vào Sổ tay Chōmen).
- `2`: Đánh dấu Đã thuộc (Matcha + Âm chuông chùa Bonshō).
- `←` / `→`: Chuyển chữ trước / sau.
- `F`: Bật / tắt Furigana.
- `A`: Phát âm âm thanh chữ hiện tại.
- `M`: Mở Sơ đồ tư duy từ ghép.
- `R`: Mở Chiết tự bộ thủ.
- `⌘K`: Tìm kiếm toàn năng Spotlight.
