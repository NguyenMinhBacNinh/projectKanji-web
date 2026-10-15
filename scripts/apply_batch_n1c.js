/**
 * Batch 5C: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 95 chữ Kanji N1 tiếp theo (từ 塀 đến 峠)
 */

const fs = require('fs');
const path = require('path');

const n1cData = {
  "塀": {
    "components": ["土", "屏"],
    "equation": "土 (Đất đá xây tường) + 屏 (Bình - tấm bình phong che chắn)",
    "mnemonic": "Tường đất kiên cố (土) đóng vai trò như bức bình phong che chở quanh nhà (屏), bờ tường, tường rào.",
    "illustration": {
      "badge": "🧱",
      "concept": "Bờ tường rào quanh nhà",
      "visualDesc": "Bờ tường bê tông lợp ngói đen che chắn quanh biệt thự truyền thống."
    }
  },
  "塁": {
    "components": ["田", "土"],
    "equation": "Ba khối đất/ruộng (田) xếp chồng vững chãi trên nền đất (土)",
    "mnemonic": "Các khối đất đá đắp tầng tầng lớp lớp tạo thành pháo đài phòng thủ, chiến lũy, căn cứ (base bóng chày).",
    "illustration": {
      "badge": "⚾",
      "concept": "Bục gôn bóng chày",
      "visualDesc": "Gôn một trong sân bóng chày phủ lớp đất đỏ sạch sẽ sẵn sàng đón cú chạy."
    }
  },
  "塊": {
    "components": ["土", "鬼"],
    "equation": "土 (Đất đá) + 鬼 (Quỷ - hình thù kỳ quái to lớn)",
    "mnemonic": "Khối đất đá (土) tụ lại thành tảng lớn mang hình thù kỳ dị (鬼), hòn đá, tảng đất, khối.",
    "illustration": {
      "badge": "🪨",
      "concept": "Tảng đá khối",
      "visualDesc": "Khối đá tảng nguyên khối sừng sững bên sườn núi gồ ghề."
    }
  },
  "塑": {
    "components": ["朔", "土"],
    "equation": "朔 (Sóc - ngày đầu tháng mới mẻ) + 土 (Đất sét nặn tượng)",
    "mnemonic": "Dùng đất sét mềm (土) nặn nhào tạo ra hình hài hoàn toàn mới mẻ (朔), đắp tượng, điêu khắc, tạo hình.",
    "illustration": {
      "badge": "🗿",
      "concept": "Tượng đất nặn tạo hình",
      "visualDesc": "Đôi bàn tay nghệ nhân đang xoay bàn gốm vuốt nặn bức tượng đất sét."
    }
  },
  "塚": {
    "components": ["土", "豕"],
    "equation": "土 (Đất đắp cao) + 冢/豕 (Nhà chôn cất mộ phần gia tộc)",
    "mnemonic": "Gò đất đắp cao (土) đánh dấu nơi an nghỉ thiêng liêng của bậc tiền nhân, gò mộ, đống đất.",
    "illustration": {
      "badge": "🪦",
      "concept": "Gò mộ cổ kofun",
      "visualDesc": "Gò đất mộ cổ hình lỗ khóa phủ đầy cây cỏ xanh rì trong ráng chiều."
    }
  },
  "塾": {
    "components": ["孰", "土"],
    "equation": "孰 (Chín muồi, rèn giũa kiến thức) + 土 (Nơi chốn học tập)",
    "mnemonic": "Nơi chốn (土) rèn giũa kiến thức cho học trò chín muồi đỗ đạt (孰), trường tư thục, lò luyện thi juku.",
    "illustration": {
      "badge": "🏫",
      "concept": "Lớp học tư thục juku",
      "visualDesc": "Phòng học tư thục sáng đèn đêm khuya nơi các sĩ tử miệt mài ôn thi."
    }
  },
  "墓": {
    "components": ["艹", "日", "大", "土"],
    "equation": "Mặt trời lặn sau lùm cỏ (莫) chìm vào lòng đất mẹ (土)",
    "mnemonic": "Mặt trời khuất bóng sau đồng cỏ hoang (莫) gửi gắm thân xác vào lòng đất vĩnh hằng (土), ngôi mộ, lăng mộ.",
    "illustration": {
      "badge": "🪦",
      "concept": "Bia đá ngôi mộ",
      "visualDesc": "Tấm bia mộ đá khắc chữ hoa cúc trang nghiêm trong nghĩa trang tĩnh lặng."
    }
  },
  "墜": {
    "components": ["隊", "土"],
    "equation": "隊 (Đoàn người trên bờ vực) + 土 (Đất đá sụt lún rơi rụng xuống)",
    "mnemonic": "Vật nặng từ trên cao rơi ầm ầm cắm sâu xuống mặt đất (隊-土), rơi rụng, trụy lạc, máy bay rơi.",
    "illustration": {
      "badge": "🛩️",
      "concept": "Máy bay rơi xuống",
      "visualDesc": "Vệt khói rơi dốc xuống chân trời biểu thị sự rơi rụng từ tầng không."
    }
  },
  "墨": {
    "components": ["黒", "土"],
    "equation": "黒 (Hắc - màu đen tuyền) + 土 (Đất/muội than nén lại thành thỏi)",
    "mnemonic": "Muội than củi màu đen nhánh (黒) được nén chặt với đất keo thành thỏi mài mực (土), mực tàu, mực viết.",
    "illustration": {
      "badge": "✒️",
      "concept": "Thỏi mực tàu mài nghiên",
      "visualDesc": "Thỏi mực tàu đen bóng mài nhẹ trên nghiên đá nhả ra dòng mực óng ánh."
    }
  },
  "墳": {
    "components": ["土", "賁"],
    "equation": "土 (Đất đắp cao) + 賁 (Bí - phồng to, nổi bật lên)",
    "mnemonic": "Đất được đắp vun cao phồng lên (土-賁) tạo thành gò đất uy nghi chôn cất bậc đế vương, mộ phần, lăng táng.",
    "illustration": {
      "badge": "⛰️",
      "concept": "Lăng mộ cổ kofun",
      "visualDesc": "Quần thể lăng mộ hình nấm đất phủ cây xanh cổ kính nhìn từ trên cao."
    }
  },
  "墾": {
    "components": ["豸", "艮", "土"],
    "equation": "Khai phá mảnh đất hoang cứng đầu (艮-土) để biến thành đồng ruộng màu mỡ",
    "mnemonic": "Kiên trì cuốc xới cải tạo những tảng đất cằn cỗi hoang vu thành đất trồng trọt, khai khẩn, khai hoang.",
    "illustration": {
      "badge": "🚜",
      "concept": "Khai khẩn đất hoang",
      "visualDesc": "Lưỡi cày lật từng mảng đất nâu màu mỡ khai phá cánh đồng mới."
    }
  },
  "壁": {
    "components": ["辟", "土"],
    "equation": "辟 (Ngăn cách phân định ranh giới) + 土 (Đất đá xây dựng)",
    "mnemonic": "Khối đất đá (土) dựng thẳng đứng phân chia ranh giới rõ ràng giữa các gian phòng (辟), bức tường, vách ngăn.",
    "illustration": {
      "badge": "🧱",
      "concept": "Bức tường gạch kiên cố",
      "visualDesc": "Bức tường gạch đỏ vững chãi ngăn cách không gian ấm cúng bên trong."
    }
  },
  "壇": {
    "components": ["土", "亶"],
    "equation": "土 (Đất đắp) + 亶 (Đản - chân thành, nơi cao ráo trang nghiêm)",
    "mnemonic": "Bệ đất đắp cao trang nghiêm (土-亶) dùng để tế lễ đất trời hoặc cho diễn giả đứng nói, đàn tế, bục giảng.",
    "illustration": {
      "badge": "🏛️",
      "concept": "Bục phát biểu trang trọng",
      "visualDesc": "Bục diễn đàn gỗ trang trọng với micro đặt sẵn chờ diễn giả cất lời."
    }
  },
  "壊": {
    "components": ["土", "褱"],
    "equation": "土 (Tường đất) + 褱 (Hoài - xộc xệch, vỡ vụn bên trong tà áo)",
    "mnemonic": "Bức tường đất (土) bị lực mạnh tác động vỡ vụn sụp đổ tan tành (褱), phá hủy, hư hỏng, hoại.",
    "illustration": {
      "badge": "💥",
      "concept": "Bức tường đổ vỡ",
      "visualDesc": "Bức tường đất nứt toác sụp đổ dưới chấn động dữ dội."
    }
  },
  "壌": {
    "components": ["土", "襄"],
    "equation": "土 (Đất) + 襄 (Tương - giúp đỡ mùa màng đơm hoa kết trái)",
    "mnemonic": "Chất đất tơi xốp giàu dinh dưỡng (土) nuôi nấng cây cối tốt tươi (襄), thổ nhưỡng, đất màu.",
    "illustration": {
      "badge": "🌱",
      "concept": "Đất bùn thổ nhưỡng phì nhiêu",
      "visualDesc": "Nắm đất đen giàu mùn tơi xốp nâng niu mầm cây non xanh biếc."
    }
  },
  "士": {
    "components": ["士"],
    "equation": "士 (Tượng hình chiếc rìu chiến bằng đồng biểu trưng cho bậc dũng sĩ có học vấn)",
    "mnemonic": "Hình chiếc rìu lệnh của người chỉ huy văn võ song toàn, kẻ sĩ, chiến sĩ, nam nhi có tài.",
    "illustration": {
      "badge": "⚔️",
      "concept": "Kẻ sĩ văn võ song toàn",
      "visualDesc": "Trang nam nhi phong thái đĩnh đạc lưng đeo kiếm tay cầm cuốn sách."
    }
  },
  "壮": {
    "components": ["丬", "士"],
    "equation": "丬 (Chiếc giường nâng đỡ) + 士 (Chàng trai khỏe khoắn đứng dậy)",
    "mnemonic": "Chàng trai tràn đầy sinh lực (士) vươn mình đứng dậy đầy khí thế hiên ngang, tráng niên, hùng tráng.",
    "illustration": {
      "badge": "💪",
      "concept": "Khí thế hùng tráng",
      "visualDesc": "Chiến binh giương cao ngọn cờ với khí phách kiên cường bất khuất."
    }
  },
  "壱": {
    "components": ["士", "冖", "匕"],
    "equation": "Biến thể chữ Hán phồn tạp trang trọng của chữ 一 (Nhất) chống cạo sửa giả mạo",
    "mnemonic": "Hình thức chữ viết trang trọng bảo mật của số một (1) trên khế ước tiền tệ, số một đại tự.",
    "illustration": {
      "badge": "1️⃣",
      "concept": "Số một đại tự bảo mật",
      "visualDesc": "Tờ séc ngân hàng cổ điển in chữ Nhất đại tự sắc nét chống giả mạo."
    }
  },
  "奇": {
    "components": ["大", "可"],
    "equation": "大 (To lớn khác thường) + 可 (Miệng ngạc nhiên cất tiếng thảng thốt)",
    "mnemonic": "Sự việc to lớn khác thường (大) khiến người ta phải trầm trồ ngạc nhiên thốt lên (可), kỳ lạ, kỳ tích.",
    "illustration": {
      "badge": "✨",
      "concept": "Kỳ tích nhiệm màu",
      "visualDesc": "Vầng hào quang lấp lánh xuất hiện trên đỉnh tháp cổ đầy kỳ ảo."
    }
  },
  "奈": {
    "components": ["大", "示"],
    "equation": "大 (Con người dang tay băn khoăn) + 示 (Bàn tế thần linh tìm chỉ dẫn)",
    "mnemonic": "Đứng trước bàn thờ thần linh (示) dang tay hỏi phải làm sao bây giờ (大), làm sao, hoa mận, tỉnh Nara.",
    "illustration": {
      "badge": "🦌",
      "concept": "Chú nai vàng Nara",
      "visualDesc": "Chú nai thân thiện cúi đầu chào du khách dưới bóng thông cổ thành Nara."
    }
  },
  "奉": {
    "components": ["𡗗", "十"],
    "equation": "Hai bàn tay cung kính nâng lễ vật dâng lên bàn thờ thần linh",
    "mnemonic": "Hai tay kính cẩn dâng lễ vật quý phụng sự tổ tiên và bề trên, cung phụng, phụng sự.",
    "illustration": {
      "badge": "🤲",
      "concept": "Cung kính dâng lễ vật",
      "visualDesc": "Đôi bàn tay nâng khay lễ vật bằng gỗ mộc dâng lên chốn điện thờ."
    }
  },
  "奎": {
    "components": ["大", "圭"],
    "equation": "大 (Người sải bước rộng) + 圭 (Ngọc khuê lấp lánh như tinh tú)",
    "mnemonic": "Người sải bước rộng uy phong (大) rạng rỡ như ngọc khuê (圭), chòm sao Khuê chủ về văn chương.",
    "illustration": {
      "badge": "⭐",
      "concept": "Chòm sao Khuê tỏa sáng",
      "visualDesc": "Chòm sao Khuê rực sáng trên bầu trời đêm soi rọi con đường thi cử."
    }
  },
  "奏": {
    "components": ["𡗗", "天"],
    "equation": "Hai bàn tay đưa lên tấu sớ trước thiên tử / gảy khúc đàn dâng lên trời xanh",
    "mnemonic": "Đôi bàn tay kính cẩn gảy khúc nhạc thanh tao dâng lên trời cao lắng nghe, tấu nhạc, hòa tấu.",
    "illustration": {
      "badge": "🎻",
      "concept": "Hòa tấu vĩ cầm",
      "visualDesc": "Cây đàn violin tấu lên những thanh âm du dương trong dàn nhạc thính phòng."
    }
  },
  "契": {
    "components": ["丰", "刀", "大"],
    "equation": "Dùng dao (刀) khắc từng vết khía (丰) lên thanh gỗ lớn (大) chia đôi làm bằng chứng giao ước",
    "mnemonic": "Dùng dao khắc vết khía vào thanh tre chia đôi giữ làm bằng chứng thỏa thuận, khế ước, giao kèo.",
    "illustration": {
      "badge": "🤝",
      "concept": "Ký kết khế ước hợp đồng",
      "visualDesc": "Bản hợp đồng với dấu ấn đỏ niêm phong ghi nhận giao ước hai bên."
    }
  },
  "奔": {
    "components": ["大", "卉"],
    "equation": "大 (Người dang tay lao nhanh) đạp qua bụi cỏ ba chân (卉)",
    "mnemonic": "Người chạy thục mạng giậm đạp cả cỏ cây băng băng tiến về phía trước, bôn ba, bôn tẩu.",
    "illustration": {
      "badge": "🏃‍♂️",
      "concept": "Chạy hết tốc lực",
      "visualDesc": "Vận động viên điền kinh dồn toàn lực bứt tốc trên đường chạy."
    }
  },
  "奨": {
    "components": ["将", "大"],
    "equation": "将 (Tướng quân lập công) + 大 (Ban thưởng trọng hậu to lớn)",
    "mnemonic": "Tướng quân lập chiến công hiển hách (将) được triều đình ban thưởng trọng hậu (大), khen thưởng, học bổng.",
    "illustration": {
      "badge": "📜",
      "concept": "Bằng khen danh dự",
      "visualDesc": "Tấm bằng khen gắn ruy băng đỏ trao tặng cho thành tích xuất sắc."
    }
  },
  "奪": {
    "components": ["大", "隹", "寸"],
    "equation": "Đại bàng lớn (大-隹) sà xuống chộp lấy con mồi trong tay (寸)",
    "mnemonic": "Con chim lớn vỗ cánh chộp giật lấy đồ vật ngay trên tay người khác, cướp đoạt, đoạt giải.",
    "illustration": {
      "badge": "🦅",
      "concept": "Đại bàng vồ mồi",
      "visualDesc": "Đại bàng sải cánh lao xuống quắp gọn mục tiêu với móng vuốt sắc nhọn."
    }
  },
  "奮": {
    "components": ["大", "隹", "田"],
    "equation": "Chú chim tung cánh lớn (大-隹) vút bay lên từ cánh đồng lúa bao la (田)",
    "mnemonic": "Chim dang rộng đôi cánh vỗ mạnh bay vút lên khỏi mặt ruộng lúa, phấn chấn, phấn đấu, hưng phấn.",
    "illustration": {
      "badge": "🚀",
      "concept": "Phấn đấu vút bay",
      "visualDesc": "Cánh chim tung bay mạnh mẽ vượt qua tầng mây đón ánh mặt trời chói lọi."
    }
  },
  "奴": {
    "components": ["女", "又"],
    "equation": "女 (Người phụ nữ) bị bàn tay túm bắt áp bức (又)",
    "mnemonic": "Bàn tay độc đoán (又) tóm bắt người phụ nữ (女) ép làm thân phận hầu hạ tôi đòi, nô lệ, nô dịch.",
    "illustration": {
      "badge": "⛓️",
      "concept": "Xiềng xích nô lệ",
      "visualDesc": "Khóa xích sắt bị phá vỡ biểu tượng cho sự giải phóng khỏi thân phận nô lệ."
    }
  },
  "如": {
    "components": ["女", "口"],
    "equation": "女 (Người phụ nữ ngoan hiền) + 口 (Miệng thuận theo lời khuyên bảo)",
    "mnemonic": "Miệng mềm mỏng thuận theo lẽ phải nhẹ nhàng như gió thoảng, giống như, như ý nguyện.",
    "illustration": {
      "badge": "🍃",
      "concept": "Thuận theo tự nhiên như gió",
      "visualDesc": "Chiếc lá trôi nhẹ theo dòng suối thanh thản tự tại như mây trời."
    }
  },
  "妃": {
    "components": ["女", "己"],
    "equation": "女 (Người phụ nữ quý phái) + 己 (Kỷ - biết giữ mình thanh cao đoan trang)",
    "mnemonic": "Người phụ nữ (女) giữ mình đoan chính chuẩn mực bên cạnh bậc quân vương (己), hoàng phi, vương phi.",
    "illustration": {
      "badge": "👑",
      "concept": "Vương phi cao quý",
      "visualDesc": "Trâm cài tóc phượng hoàng ngọc bích của vị hoàng phi chốn hậu cung."
    }
  },
  "妄": {
    "components": ["亡", "女"],
    "equation": "亡 (Mất trí, mù quáng) + 女 (Bị dục vọng mê hoặc)",
    "mnemonic": "Tâm trí bị u mê làm mờ mắt dẫn đến hành động sai trái càn rỡ, vọng tưởng, làm càn.",
    "illustration": {
      "badge": "🌀",
      "concept": "Ảo ảnh cuồng vọng",
      "visualDesc": "Vòng xoáy sương khói mờ ảo biểu thị những suy nghĩ hoang đường hão huyền."
    }
  },
  "妊": {
    "components": ["女", "壬"],
    "equation": "女 (Người phụ nữ) + 壬 (Nhâm - người gánh vác hạt giống mầm sống to lớn)",
    "mnemonic": "Người phụ nữ (女) mang trong mình mầm sống mới đang hoài thai lớn dần (壬), mang thai, thai nghén.",
    "illustration": {
      "badge": "🤰",
      "concept": "Người mẹ mang thai",
      "visualDesc": "Người mẹ hiền hòa đặt tay lên bụng bầu nâng niu mầm sống bé bỏng."
    }
  },
  "妙": {
    "components": ["女", "少"],
    "equation": "女 (Thiếu nữ duyên dáng) + 少 (Thiểu - trẻ trung, thanh mảnh tinh tế)",
    "mnemonic": "Vẻ đẹp duyên dáng và thanh thoát của người thiếu nữ trẻ trung (女-少), kỳ diệu, vi diệu, tuyệt vời.",
    "illustration": {
      "badge": "✨",
      "concept": "Phép màu kỳ diệu",
      "visualDesc": "Ngôi sao thần tiên tỏa ánh hào quang lung linh nhiệm màu diệu kỳ."
    }
  },
  "妥": {
    "components": ["爫", "女"],
    "equation": "爫 (Bàn tay vỗ về che chở) đặt êm dịu lên người phụ nữ (女)",
    "mnemonic": "Bàn tay ân cần che chở dàn xếp êm ấm mọi việc đâu vào đấy, thỏa đáng, ổn thỏa, thỏa hiệp.",
    "illustration": {
      "badge": "🤝",
      "concept": "Thỏa hiệp êm đẹp",
      "visualDesc": "Hai bàn tay bắt chặt nhau biểu thị sự thống nhất thỏa thuận êm thấm."
    }
  },
  "妨": {
    "components": ["女", "方"],
    "equation": "女 (Người phụ nữ chắn ngang) + 方 (Phương hướng đang đi tới)",
    "mnemonic": "Đứng chắn ngang phương hướng tiến bước (女-方) làm gián đoạn kế hoạch của người khác, cản trở, phương hại.",
    "illustration": {
      "badge": "🚧",
      "concept": "Rào chắn cản trở",
      "visualDesc": "Hàng rào chướng ngại vật chắn ngang con đường cản trở hành trình."
    }
  },
  "姫": {
    "components": ["女", "臣"],
    "equation": "女 (Người thiếu nữ hoàng tộc) có đông đảo quần thần kính cẩn phục vụ (臣)",
    "mnemonic": "Nàng tiểu thư cành vàng lá ngọc (女) được các quan thần cung kính hầu cận (臣), công chúa, nàng hime.",
    "illustration": {
      "badge": "👸",
      "concept": "Nàng công chúa yêu kiều",
      "visualDesc": "Nàng công chúa trong bộ váy áo lộng lẫy mỉm cười thanh tao giữa hoa viên."
    }
  },
  "姻": {
    "components": ["女", "因"],
    "equation": "女 (Người con gái) + 因 (Nhân duyên trời định se duyên)",
    "mnemonic": "Nhân duyên tốt lành (因) kết nối người phụ nữ bước vào cuộc sống vợ chồng gia đình (女), hôn nhân, thông gia.",
    "illustration": {
      "badge": "💍",
      "concept": "Cặp nhẫn đính hôn",
      "visualDesc": "Cặp nhẫn cưới vàng óng lồng vào nhau biểu trưng cho mối lương duyên bền chặt."
    }
  },
  "姿": {
    "components": ["次", "女"],
    "equation": "次 (Thứ tự, từng nhịp chuyển động) + 女 (Người thiếu nữ bước đi uyển chuyển)",
    "mnemonic": "Từng bước chuyển động nhịp nhàng duyên dáng của người thiếu nữ (次-女), tư thế, phong thái, vóc dáng.",
    "illustration": {
      "badge": "💃",
      "concept": "Vóc dáng uyển chuyển",
      "visualDesc": "Vũ công tạo dáng thanh lịch với những đường nét cơ thể mềm mại chuẩn mực."
    }
  },
  "威": {
    "components": ["戌", "女"],
    "equation": "戌 (Rìu lệnh chiến binh) canh giữ bên người phụ nữ trang nghiêm (女)",
    "mnemonic": "Cầm rìu lệnh thị uy bảo vệ khuôn phép hoàng gia trang trọng, uy quyền, oai phong lẫm liệt.",
    "illustration": {
      "badge": "🦁",
      "concept": "Sư tử oai phong",
      "visualDesc": "Chú sư tử đầu đàn bờm vàng đứng kiêu hãnh trên mỏm đá đầy uy quyền."
    }
  },
  "娠": {
    "components": ["女", "辰"],
    "equation": "女 (Người phụ nữ) + 辰 (Thần - sinh mệnh cựa quẫy theo thời khắc)",
    "mnemonic": "Mầm sống bé bỏng cựa mình đập nhịp trong cơ thể người mẹ hiền (女-辰), mang thai, hoài thai.",
    "illustration": {
      "badge": "🤰",
      "concept": "Bụng mẹ mang thai mầm sống",
      "visualDesc": "Hình ảnh người mẹ hạnh phúc bên mầm sống đang lớn dần từng ngày."
    }
  },
  "娯": {
    "components": ["女", "呉"],
    "equation": "女 (Người phụ nữ) + 呉 (Hò reo ca hát trong vũ khúc tưng bừng)",
    "mnemonic": "Hòa mình vào điệu múa lời ca rộn rã quên hết mệt mỏi âu lo (女-呉), giải trí, tiêu khiển, ngu lạc.",
    "illustration": {
      "badge": "🎡",
      "concept": "Công viên giải trí",
      "visualDesc": "Vòng quay đu quay khổng lồ sáng đèn rực rỡ tại công viên trò chơi vui nhộn."
    }
  },
  "婆": {
    "components": ["波", "女"],
    "equation": "波 (Làn sóng nếp nhăn thời gian) + 女 (Người phụ nữ)",
    "mnemonic": "Người phụ nữ (女) vầng trán đã hằn sâu những nếp nhăn như sóng nước qua năm tháng (波), bà lão, bà cụ.",
    "illustration": {
      "badge": "👵",
      "concept": "Bà cụ nhân hậu",
      "visualDesc": "Bà cụ tóc bạc phơ hiền từ mỉm cười ngồi đan khăn len bên lò sưởi."
    }
  },
  "婿": {
    "components": ["女", "胥"],
    "equation": "女 (Người con gái chọn bạn đời) + 胥 (Tư - quan chức có tài đức cùng sẻ chia)",
    "mnemonic": "Người đàn ông tài năng được chọn làm bạn đời cho con gái gia đình (女-胥), con rể, chú rể.",
    "illustration": {
      "badge": "🤵",
      "concept": "Chú rể ngày cưới",
      "visualDesc": "Chú rể lịch lãm trong bộ lễ phục cài hoa tươi đón cô dâu ngày đại hỷ."
    }
  },
  "媒": {
    "components": ["女", "某"],
    "equation": "女 (Bà mối khéo léo) + 某 (Mỗ - kết nối hai người xa lạ lại với nhau)",
    "mnemonic": "Người phụ nữ (女) khéo léo kết nối se duyên cho những người chưa từng quen biết (某), mai mối, môi giới.",
    "illustration": {
      "badge": "🤝",
      "concept": "Người môi giới kết nối",
      "visualDesc": "Cầu nối bắc ngang kết nối hai bờ sông biểu thị vai trò trung gian môi giới."
    }
  },
  "媛": {
    "components": ["女", "爰"],
    "equation": "女 (Người con gái) + 爰 (Viên - đưa bàn tay kéo lên giúp đỡ thanh tao)",
    "mnemonic": "Nàng tiểu thư có tấm lòng nhân hậu chìa tay giúp đỡ mọi người (女-爰), mỹ nữ quyền quý, tỉnh Ehime.",
    "illustration": {
      "badge": "🍊",
      "concept": "Đặc sản cam Ehime",
      "visualDesc": "Trái cam vàng mọng nước ngọt ngào đặc trưng của vùng đất tươi đẹp Ehime."
    }
  },
  "嫁": {
    "components": ["女", "家"],
    "equation": "女 (Người con gái) + 家 (Gia - về làm dâu một mái nhà mới)",
    "mnemonic": "Người con gái (女) bước chân về gắn bó trọn đời dưới mái nhà chồng mới (家), lấy chồng, gả đi, nàng dâu.",
    "illustration": {
      "badge": "👰",
      "concept": "Cô dâu về nhà chồng",
      "visualDesc": "Cô dâu mặc váy cưới trắng tinh khôi tay cầm bó hoa bước vào lễ đường."
    }
  },
  "嫌": {
    "components": ["女", "兼"],
    "equation": "女 (Tâm trạng) + 兼 (Kiêm - ôm đồm quá nhiều thứ lộn xộn gây bực bội)",
    "mnemonic": "Khi phải gánh chịu quá nhiều đòi hỏi phiền toái dồn dập (兼), lòng sinh ra cảm giác chán ghét (女), ghét bỏ, hiềm khích.",
    "illustration": {
      "badge": "😣",
      "concept": "Khuôn mặt chán ghét",
      "visualDesc": "Biểu cảm nhăn mày xua tay từ chối điều làm mình khó chịu."
    }
  },
  "嫡": {
    "components": ["女", "啇"],
    "equation": "女 (Người vợ cả chính thất) + 啇 (Gốc rễ dòng dõi đích truyền)",
    "mnemonic": "Người con trai sinh ra từ người vợ chính thất (女) nắm giữ quyền kế thừa hương hỏa, dòng đích, đích tôn.",
    "illustration": {
      "badge": "👑",
      "concept": "Người thừa kế đích tôn",
      "visualDesc": "Huy hiệu dòng tộc gia huy trao truyền cho người con trưởng dòng chính."
    }
  },
  "嬉": {
    "components": ["女", "喜"],
    "equation": "女 (Người con gái) + 喜 (Hỷ - niềm vui mừng khôn xiết)",
    "mnemonic": "Người con gái (女) đón nhận tin lành nhảy múa rộn ràng trong niềm vui ngập tràn (喜), vui sướng, mừng rỡ.",
    "illustration": {
      "badge": "😄",
      "concept": "Nụ cười vui sướng",
      "visualDesc": "Khuôn mặt rạng rỡ nụ cười tươi tắn đón nhận món quà bất ngờ."
    }
  },
  "嬢": {
    "components": ["女", "襄"],
    "equation": "女 (Người thiếu nữ) + 襄 (Tương - phong thái đài các dịu dàng giúp đỡ gia đình)",
    "mnemonic": "Cô gái trẻ lớn lên với phong thái đoan trang đài các được cả nhà nâng niu (女-襄), tiểu thư, cô nương.",
    "illustration": {
      "badge": "👒",
      "concept": "Nàng tiểu thư đài các",
      "visualDesc": "Thiếu nữ đội chiếc mũ rộng vành bước đi duyên dáng bên thảm hoa hồng."
    }
  },
  "孔": {
    "components": ["子", "乚"],
    "equation": "子 (Đứa bé sơ sinh) ngậm bầu sữa mẹ hút từng giọt sữa qua lỗ nhỏ (乚)",
    "mnemonic": "Giọt sữa chảy qua lỗ nhỏ nuôi đứa bé lớn khôn, lỗ thủng, lỗ hổng, họ Khổng (Khổng Tử).",
    "illustration": {
      "badge": "🕳️",
      "concept": "Chiếc lỗ tròn nhỏ",
      "visualDesc": "Lỗ nhỏ xỏ sợi chỉ qua cây kim khâu thể hiện sự tinh vi khéo léo."
    }
  },
  "孝": {
    "components": ["耂", "子"],
    "equation": "耂 (Lão - người cha già) được người con trai (子) cõng trên lưng chăm sóc",
    "mnemonic": "Người con (子) hết lòng cõng cha mẹ già yếu (耂) trên lưng phụng dưỡng ân cần, lòng hiếu thảo.",
    "illustration": {
      "badge": "👴👦",
      "concept": "Con cõng cha già hiếu thảo",
      "visualDesc": "Người con ân cần nắm tay dắt cha già đi dạo dưới bóng râm ấm áp."
    }
  },
  "孟": {
    "components": ["子", "皿"],
    "equation": "子 (Đứa con đầu lòng) được đặt tắm rửa trong chiếc chậu lớn (皿)",
    "mnemonic": "Đứa con trưởng (子) làm lễ đón nhận phước lành trong mâm bồn tắm linh thiêng (皿), con trưởng, đầu mùa, Mạnh Tử.",
    "illustration": {
      "badge": "🥇",
      "concept": "Con trưởng đứng đầu",
      "visualDesc": "Chiếc trâm lệnh dành cho người con trưởng trong nghi lễ gia tộc trang trọng."
    }
  },
  "孤": {
    "components": ["子", "瓜"],
    "equation": "子 (Đứa trẻ) trơ trọi như quả dưa leo đơn độc trên dây leo (瓜)",
    "mnemonic": "Đứa trẻ (子) một mình trơ trọi không nơi nương tựa như quả dưa đơn độc trên giàn (瓜), cô độc, mồ côi.",
    "illustration": {
      "badge": "🏝️",
      "concept": "Hòn đảo cô đơn",
      "visualDesc": "Một cái cây đơn độc đứng giữa hòn đảo nhỏ giữa đại dương bao la."
    }
  },
  "宏": {
    "components": ["宀", "厷"],
    "equation": "宀 (Mái nhà) + 厷 (Cánh tay dang rộng vươn xa hết cỡ)",
    "mnemonic": "Ngôi nhà (宀) có không gian thênh thang rộng mở như cánh tay ôm trọn đất trời (厷), bao la, hoành tráng.",
    "illustration": {
      "badge": "🏛️",
      "concept": "Đại sảnh hoành tráng",
      "visualDesc": "Đại sảnh cung điện mái vòm cao vút với không gian nguy nga tráng lệ."
    }
  },
  "宗": {
    "components": ["宀", "示"],
    "equation": "宀 (Mái nhà thờ) + 示 (Bàn tế tổ tiên linh thiêng)",
    "mnemonic": "Dưới mái nhà chung (宀) đặt bàn thờ thành kính thờ phụng tổ tiên cội nguồn (示), tông tộc, tông phái.",
    "illustration": {
      "badge": "⛩️",
      "concept": "Tông miếu tổ tiên",
      "visualDesc": "Ngôi đền thờ tổ tiên bằng gỗ trầm hương tỏa khói hương nghi ngút trang nghiêm."
    }
  },
  "宙": {
    "components": ["宀", "由"],
    "equation": "宀 (Mái vòm bầu trời) bao trùm khắp nguồn gốc vạn vật sinh sôi (由)",
    "mnemonic": "Mái vòm vĩ đại che chở cho muôn loài sinh sôi từ thuở hồng hoang qua vạn kiếp thời gian, vũ trụ, không gian thời gian.",
    "illustration": {
      "badge": "🌌",
      "concept": "Dải ngân hà vũ trụ",
      "visualDesc": "Vũ trụ bao la ngập tràn những vì sao và tinh vân rực rỡ huyền ảo."
    }
  },
  "宜": {
    "components": ["宀", "且"],
    "equation": "宀 (Mái nhà ấm cúng) + 且 (Bàn tế xếp đặt đồ đạc ngăn nắp đâu vào đấy)",
    "mnemonic": "Trong nhà (宀) mọi đồ đạc được bài trí vừa vặn ngăn nắp và hợp lý (且), tiện nghi, thích nghi, hợp tình.",
    "illustration": {
      "badge": "🛋️",
      "concept": "Căn phòng tiện nghi",
      "visualDesc": "Gian phòng khách được bài trí ấm cúng, hài hòa và vô cùng thoải mái."
    }
  },
  "宣": {
    "components": ["宀", "亘"],
    "equation": "宀 (Từ cung điện triều đình) ban bố chỉ dụ lan rộng khắp giang sơn (亘)",
    "mnemonic": "Từ chốn cung đình (宀) phát đi thông điệp lan tỏa khắp bốn cõi đất trời (亘), tuyên bố, công bố.",
    "illustration": {
      "badge": "📢",
      "concept": "Tuyên bố sắc lệnh",
      "visualDesc": "Vị sứ giả đứng trước cổng thành dõng dạc đọc bản tuyên cáo hoàng gia."
    }
  },
  "宥": {
    "components": ["宀", "有"],
    "equation": "宀 (Dưới mái ấm gia đình) + 有 (Có sự thấu hiểu bao dung che chở)",
    "mnemonic": "Dưới mái ấm (宀) dang rộng vòng tay chứa chan tình thương xoa dịu lỗi lầm (有), khoan thứ, tha thứ.",
    "illustration": {
      "badge": "🕊️",
      "concept": "Khoan dung tha thứ",
      "visualDesc": "Bồ câu trắng bay qua song cửa mang thông điệp hàn gắn và bao dung."
    }
  },
  "宮": {
    "components": ["宀", "吕"],
    "equation": "宀 (Mái nhà lớn) nối liền nhiều gian phòng liên tiếp san sát nhau (吕)",
    "mnemonic": "Mái ngói nguy nga che chở cho hàng dãy lầu các liên hoàn tráng lệ, cung điện, đền cung miếu.",
    "illustration": {
      "badge": "🏯",
      "concept": "Cung điện nguy nga",
      "visualDesc": "Cung điện hoàng gia cổ kính với những mái ngói cong phản chiếu nắng vàng."
    }
  },
  "宰": {
    "components": ["宀", "辛"],
    "equation": "宀 (Trong phủ đệ) + 辛 (Cầm dao quyền lực xử lý công việc cam go)",
    "mnemonic": "Người đứng trong công đường (宀) cầm dao cán cân quyền lực gánh vác việc nước gian truân (辛), tể tướng, chúa tể.",
    "illustration": {
      "badge": "👑",
      "concept": "Tể tướng đương triều",
      "visualDesc": "Viên tể tướng nghiêm nghị nắm giữ ấn tín quốc gia xử lý triều chính."
    }
  },
  "宴": {
    "components": ["宀", "日", "女"],
    "equation": "Dưới mái nhà (宀) sau khi mặt trời lặn (日), người phụ nữ duyên dáng (女) dọn mâm tiệc rượu",
    "mnemonic": "Đêm buông xuống dưới mái nhà ấm cúng mọi người quây quần thưởng thức yến tiệc rượu ngon, yến tiệc, dạ yến.",
    "illustration": {
      "badge": "🍷",
      "concept": "Bàn tiệc dạ yến",
      "visualDesc": "Bàn tiệc lung linh ánh nến với ly rượu vang và các món ăn thịnh soạn."
    }
  },
  "宵": {
    "components": ["宀", "肖"],
    "equation": "宀 (Mái nhà) + 肖 (Tiêu - ánh sáng mặt trời nhỏ dần tắt ngấm)",
    "mnemonic": "Dưới mái nhà (宀) khi ánh hoàng hôn dần lụi tàn nhường chỗ cho màn đêm (肖), đêm hôm, dạ tiêu.",
    "illustration": {
      "badge": "🌙",
      "concept": "Đêm đầu hôm yên tĩnh",
      "visualDesc": "Vầng trăng lưỡi liềm treo đầu ngọn cây bên mái nhà trong đêm đầu hôm tĩnh mịch."
    }
  },
  "寂": {
    "components": ["宀", "叔"],
    "equation": "宀 (Mái nhà trống vắng) + 叔 (Người chú ngồi thu mình lượm lặt cô độc)",
    "mnemonic": "Dưới mái nhà hiu quạnh không một bóng người qua lại (宀-叔), tịch mịch, vắng lặng, cô đơn.",
    "illustration": {
      "badge": "🍂",
      "concept": "Cảnh chiều tịch mịch",
      "visualDesc": "Khu vườn thiền rải cát trắng tĩnh lặng dưới ráng chiều thu buông lơi."
    }
  },
  "寅": {
    "components": ["宀", "由", "八"],
    "equation": "宀 (Mái nhà) + Hai bàn tay giương cung tên đón chờ rạng đông chi Dần",
    "mnemonic": "Hai tay giương cung sẵn sàng lúc bình minh chi Dần (3h-5h sáng), chi Dần, cầm tinh con hổ.",
    "illustration": {
      "badge": "🐯",
      "concept": "Mãnh hổ chi Dần",
      "visualDesc": "Chú hổ dũng mãnh đứng gầm vang trên mỏm núi đá đón bình minh rực rỡ."
    }
  },
  "密": {
    "components": ["宀", "必", "山"],
    "equation": "宀 (Mái nhà che kín) + 必 (Ắt hẳn chắc chắn) trên non cao hiểm trở (山)",
    "mnemonic": "Căn phòng kiên cố trên đỉnh núi cao biệt lập bảo vệ kín kẽ tuyệt đối, bí mật, mật thiết, dày đặc.",
    "illustration": {
      "badge": "🔒",
      "concept": "Ổ khóa bảo mật",
      "visualDesc": "Chiếc ổ khóa vàng kiên cố bảo vệ chiếc hòm gỗ chứa tài liệu cơ mật."
    }
  },
  "寛": {
    "components": ["宀", "艹", "見"],
    "equation": "宀 (Dưới mái nhà) + Người mở rộng tầm mắt nhìn thấu hiểu muôn loài (艹-見)",
    "mnemonic": "Tâm hồn rộng mở dưới mái nhà bao dung nhìn đời bằng ánh mắt yêu thương, khoan dung, thư thái.",
    "illustration": {
      "badge": "🛋️",
      "concept": "Thư thả khoan khoái",
      "visualDesc": "Chiếc ghế bành êm ái đặt cạnh cửa sổ thoáng đãng đón gió mát lành."
    }
  },
  "寡": {
    "components": ["宀", "頁", "分"],
    "equation": "宀 (Dưới mái nhà) chỉ còn lại một cái đầu (頁) phân chia đơn độc (分)",
    "mnemonic": "Dưới mái nhà chỉ còn lại một mình lẻ bóng sau biến cố cuộc đời, góa bụa, ít ỏi, quả phụ.",
    "illustration": {
      "badge": "👤",
      "concept": "Bóng người đơn độc",
      "visualDesc": "Bóng người ngồi lẻ loi bên bàn trà trong gian phòng vắng lặng."
    }
  },
  "寧": {
    "components": ["宀", "心", "皿", "丁"],
    "equation": "宀 (Dưới mái nhà) + 心 (Tâm bình an) + 皿-丁 (Bàn ăn no đủ vững chãi)",
    "mnemonic": "Dưới mái nhà ấm êm, lòng người thanh thản bên mâm cơm ấm no vững chãi, an ninh, thanh bình, ninh tĩnh.",
    "illustration": {
      "badge": "🕊️",
      "concept": "Thanh bình yên ả",
      "visualDesc": "Ngôi nhà nhỏ thanh bình bên dòng suối hiền hòa không chút vướng bận."
    }
  },
  "審": {
    "components": ["宀", "番"],
    "equation": "宀 (Chốn công đường) + 番 (Lần lượt đối chiếu từng dấu vết chân thực)",
    "mnemonic": "Dưới mái công đường (宀) lần lượt kiểm tra kỹ càng từng chứng cớ (番), thẩm tra, xét xử, thẩm mỹ.",
    "illustration": {
      "badge": "🔍",
      "concept": "Kính lúp thẩm tra chứng cứ",
      "visualDesc": "Tài liệu được thẩm tra kỹ càng từng con dấu và chữ ký xác thực."
    }
  },
  "寮": {
    "components": ["宀", "尞"],
    "equation": "宀 (Mái nhà chung) + 尞 (Ánh đèn cùng thắp sáng học tập làm việc)",
    "mnemonic": "Mái nhà chung (宀) nơi nhiều người cùng thắp đèn sinh hoạt học tập kề vai (尞), ký túc xá, khu nội trú.",
    "illustration": {
      "badge": "🏢",
      "concept": "Ký túc xá sinh viên",
      "visualDesc": "Dãy phòng ký túc xá sinh viên sáng đèn ấm áp mỗi ô cửa sổ về đêm."
    }
  },
  "寸": {
    "components": ["寸"],
    "equation": "寸 (Bàn tay đo khoảng cách một tấc từ cổ tay đến mạch đập)",
    "mnemonic": "Khoảng cách từ lằn chỉ cổ tay đến điểm bắt mạch dài đúng một tấc, một thốn, tấc đất tấc vàng.",
    "illustration": {
      "badge": "📏",
      "concept": "Thước đo tấc gỗ",
      "visualDesc": "Thanh thước gỗ khắc vạch một tấc cổ truyền dùng trong may mặc thủ công."
    }
  },
  "射": {
    "components": ["身", "寸"],
    "equation": "身 (Thân thể giương cung) + 寸 (Ngón tay buông dây bắn tên)",
    "mnemonic": "Cả thân mình đứng vững (身), ngón tay bật nhẹ dây cung (寸) phóng mũi tên vút đi, bắn tên, xạ kích.",
    "illustration": {
      "badge": "🏹",
      "concept": "Cung thủ bắn tên",
      "visualDesc": "Cung thủ tập trung cao độ buông mũi tên lao vun vút trúng hồng tâm."
    }
  },
  "尉": {
    "components": ["尸", "示", "寸"],
    "equation": "Bàn tay cầm bàn ủi vuốt phẳng / vị quan bảo vệ an ninh trấn an lòng người",
    "mnemonic": "Vị sĩ quan dùng uy danh và sự nghiêm minh để trấn an giữ gìn bờ cõi, sĩ quan cấp Úy, đại úy.",
    "illustration": {
      "badge": "🎖️",
      "concept": "Cầu vai quân hàm cấp úy",
      "visualDesc": "Cầu vai quân phục đính sao bạc uy nghiêm của sĩ quan quân đội."
    }
  },
  "尋": {
    "components": ["彐", "工", "口", "寸"],
    "equation": "Hai bàn tay dang rộng đo đạc sải tay tìm kiếm dấu vết",
    "mnemonic": "Dang rộng hai cánh tay lần mò khắp nơi để tìm kiếm manh mối bị thất lạc, tìm kiếm, thăm hỏi.",
    "illustration": {
      "badge": "🔎",
      "concept": "Lần theo dấu vết tìm kiếm",
      "visualDesc": "Kính lúp soi theo các dấu chân tìm kiếm manh mối trên bản đồ cổ."
    }
  },
  "尚": {
    "components": ["⺌", "冂", "口"],
    "equation": "Làn khói hương thơm từ miệng lò (口-冂) bay tỏa lên cõi trời cao (⺌)",
    "mnemonic": "Khói thơm dâng lên tôn kính đấng tối cao trên trời, tôn sùng, cao thượng, vẫn còn.",
    "illustration": {
      "badge": "🏛️",
      "concept": "Bậc cao thượng tôn nghiêm",
      "visualDesc": "Tượng đài danh nhân sừng sững được muôn người ngưỡng mộ tôn kính."
    }
  },
  "尭": {
    "components": ["垚", "兀"],
    "equation": "Ba khối đất xếp cao ngút ngàn (垚) đứng sừng sững trên đỉnh trời (兀)",
    "mnemonic": "Gò đất cao vút chọc trời nơi bậc minh quân hiền đức trị vì, vua Nghiêu thời thượng cổ.",
    "illustration": {
      "badge": "👑",
      "concept": "Vua Nghiêu hiền đức",
      "visualDesc": "Vị vua hiền từ mặc áo thô giản dị ngồi lắng nghe tiếng lòng muôn dân."
    }
  },
  "就": {
    "components": ["京", "尤"],
    "equation": "京 (Kinh đô tráng lệ) + 尤 (Người tài năng phi thường tìm đến cống hiến)",
    "mnemonic": "Người tài (尤) bước vào chốn kinh đô phồn hoa (京) để bắt đầu nhận chức cống hiến sự nghiệp, thành tựu, nhậm chức.",
    "illustration": {
      "badge": "🎓",
      "concept": "Gặt hái thành tựu",
      "visualDesc": "Khoảnh khắc cử nhân tung mũ tốt nghiệp đánh dấu bước khởi đầu sự nghiệp."
    }
  },
  "尺": {
    "components": ["尺"],
    "equation": "尺 (Tượng hình gang tay con người xòe ra để ước lượng chiều dài)",
    "mnemonic": "Hình một gang tay xòe ra dùng làm thước đo chuẩn độ dài thời cổ (khoảng 30cm), cây thước, thước xích.",
    "illustration": {
      "badge": "📏",
      "concept": "Cây thước đo xích",
      "visualDesc": "Cây thước gỗ đo độ dài chia vạch rõ nét dùng trong nghề may đo."
    }
  },
  "尼": {
    "components": ["尸", "匕"],
    "equation": "尸 (Thân thể người phụ nữ) nép mình thanh tịnh bên chiếc muỗng khất thực (匕)",
    "mnemonic": "Người phụ nữ từ bỏ bụi trần nương náu chốn thiền môn thanh tịnh tu hành, ni cô, nữ tu.",
    "illustration": {
      "badge": "📿",
      "concept": "Chuỗi tràng hạt ni cô",
      "visualDesc": "Chuỗi tràng hạt gỗ bồ đề đặt trên tà áo lam giản dị nơi cửa thiền."
    }
  },
  "尽": {
    "components": ["尺", "冫"],
    "equation": "Chiếc thước đo (尺) chạm đến hai giọt cặn cuối cùng dưới đáy (冫)",
    "mnemonic": "Dốc hết từng giọt cuối cùng không còn sót lại chút gì, tận cùng, cạn kiệt, cống hiến hết mình.",
    "illustration": {
      "badge": "⏳",
      "concept": "Đồng hồ cát cạn kiệt",
      "visualDesc": "Hạt cát cuối cùng rơi xuống đáy đồng hồ cát khép lại khoảng thời gian."
    }
  },
  "尾": {
    "components": ["尸", "毛"],
    "equation": "尸 (Thân sau con thú) + 毛 (Chùm lông mọc dài thướt tha)",
    "mnemonic": "Chùm lông dài (毛) mọc ra từ phần sau thân thể con vật (尸) đung đưa, cái đuôi, phần đuôi.",
    "illustration": {
      "badge": "🦊",
      "concept": "Chiếc đuôi cáo bồng bềnh",
      "visualDesc": "Chiếc đuôi cáo lông cam viền trắng mềm mại vẫy nhẹ trong tuyết trắng."
    }
  },
  "尿": {
    "components": ["尸", "水"],
    "equation": "尸 (Phần dưới cơ thể con người) + 水 (Dòng nước thải bài tiết ra)",
    "mnemonic": "Dòng nước (水) từ cơ thể con người (尸) bài tiết tống chất cặn bã ra ngoài, nước tiểu, bài niệu.",
    "illustration": {
      "badge": "💧",
      "concept": "Giọt nước bài tiết",
      "visualDesc": "Biểu tượng xét nghiệm y khoa mẫu nước tiểu phục vụ kiểm tra sức khỏe."
    }
  },
  "屈": {
    "components": ["尸", "出"],
    "equation": "尸 (Cơ thể con người) co gập uốn cong mình trước khi bước ra ngoài (出)",
    "mnemonic": "Uốn cong người khom lưng để luồn qua khe cửa hẹp bước ra, co gập, cúi mình, bất khuất.",
    "illustration": {
      "badge": "🙇",
      "concept": "Khom lưng cúi mình",
      "visualDesc": "Người khom lưng gập mình chui qua cửa hầm thấp kiên cường vượt khó."
    }
  },
  "展": {
    "components": ["尸", "𧰼"],
    "equation": "Mở rộng tấm da thú cuộn tròn trải phẳng ra mặt đất cho mọi người chiêm ngưỡng",
    "mnemonic": "Trải rộng cuộn tranh quý ra giữa phòng cho mọi người cùng chiêm ngưỡng, triển khai, triển lãm.",
    "illustration": {
      "badge": "🖼️",
      "concept": "Phòng triển lãm nghệ thuật",
      "visualDesc": "Bức tranh lớn mở rộng treo trang trọng giữa phòng trưng bày mỹ thuật."
    }
  },
  "属": {
    "components": ["尸", "禹"],
    "equation": "Đuôi con sâu bọ bám dính chặt chẽ vào thân cây không rời",
    "mnemonic": "Gắn bó khăng khít không thể tách rời như đuôi nối liền thân, trực thuộc, gia thuộc, thuộc về.",
    "illustration": {
      "badge": "🏷️",
      "concept": "Nhãn mác phân loại trực thuộc",
      "visualDesc": "Sơ đồ cây tổ chức hiển thị các phòng ban trực thuộc công ty mẹ."
    }
  },
  "履": {
    "components": ["尸", "复"],
    "equation": "尸 (Bàn chân) xỏ vào đôi giày bước đi bước lại nhiều lần trên đường (复)",
    "mnemonic": "Xỏ chân vào giày bước đi từng bước vững chãi trên đường đời, mang giày dép, thực thi, lý lịch.",
    "illustration": {
      "badge": "👞",
      "concept": "Đôi giày bước đi",
      "visualDesc": "Đôi giày da bóng loáng in từng bước chân vững vàng trên hành trình sự nghiệp."
    }
  },
  "屯": {
    "components": ["屯"],
    "equation": "屯 (Mầm non cuộn mình gom tích sức mạnh chờ ngày chọc thủng mặt đất nảy mầm)",
    "mnemonic": "Binh lính gom tụ lại đóng trại một nơi củng cố lực lượng chờ xuất trận, đồn trú, đồn binh.",
    "illustration": {
      "badge": "⛺",
      "concept": "Doanh trại đồn trú",
      "visualDesc": "Các căn lều quân sự đóng trại kiên cố bên bìa rừng canh phòng cẩn mật."
    }
  },
  "岐": {
    "components": ["山", "支"],
    "equation": "山 (Dãy núi non) + 支 (Cành cây rẽ ra nhiều nhánh)",
    "mnemonic": "Con đường qua núi non (山) rẽ đôi chia thành các hướng đi khác nhau (支), ngã rẽ, phân nhánh.",
    "illustration": {
      "badge": "🔀",
      "concept": "Ngã rẽ chia nhánh",
      "visualDesc": "Con đường mòn trên sườn núi tách đôi dẫn về hai hướng thung lũng."
    }
  },
  "岡": {
    "components": ["冂", "山"],
    "equation": "Vành đai gò đất (冂) nhô lên dãy núi non thoai thoải (山)",
    "mnemonic": "Dãy đồi đất nhô cao bao bọc lấy xóm làng bình yên bên dưới, gò đồi, tỉnh Fukuoka, Shizuoka.",
    "illustration": {
      "badge": "🌄",
      "concept": "Đồi cỏ xanh thoai thoải",
      "visualDesc": "Đồi cỏ xanh mướt nhấp nhô dưới ánh ban mai trong lành miền quê."
    }
  },
  "岬": {
    "components": ["山", "甲"],
    "equation": "山 (Mỏm núi) + 甲 (Giáp - tấm áo giáp nhô ra phía trước)",
    "mnemonic": "Mỏm núi đá (山) vươn nhô hẳn ra ngoài bờ biển như chiếc mũi giáp đón sóng (甲), mũi đất nhô ra biển.",
    "illustration": {
      "badge": "🗼",
      "concept": "Hải đăng trên mũi đất",
      "visualDesc": "Ngọn hải đăng trắng sừng sững trên mũi đá nhô ra biển đón gió lộng."
    }
  },
  "岳": {
    "components": ["丘", "山"],
    "equation": "丘 (Gò đất cao) xếp chồng lên ngọn núi sừng sững (山)",
    "mnemonic": "Núi non chồng chất vươn cao chạm đến trời xanh hùng vĩ, núi cao hiểm trở, nhạc phụ (cha vợ).",
    "illustration": {
      "badge": "🏔️",
      "concept": "Đỉnh núi tuyết hùng vĩ",
      "visualDesc": "Đỉnh núi tuyết sừng sững chọc thủng tầng mây trắng kiêu hãnh."
    }
  },
  "峠": {
    "components": ["山", "上", "下"],
    "equation": "山 (Ngọn núi) nơi con đường lên đỉnh cao rồi đổ dốc xuống (上-下)",
    "mnemonic": "Chữ thuần Nhật (Kokuji): Con đường núi (山) leo lên đến đỉnh (上) rồi bắt đầu thả dốc xuống (下), ngọn đèo.",
    "illustration": {
      "badge": "🛣️",
      "concept": "Con đường đèo uốn lượn",
      "visualDesc": "Đoạn đường đèo uốn lượn quanh co trên sườn núi mây phủ trắng xóa."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n1cData)) {
  if (db[char]) {
    db[char].components = patch.components;
    db[char].equation = patch.equation;
    db[char].mnemonic = patch.mnemonic;
    db[char].illustration = patch.illustration;
    updatedCount++;
  } else {
    console.warn(`Không tìm thấy chữ ${char} trong database!`);
  }
}

// Lưu đồng bộ cả 3 file
fs.writeFileSync(publicDbPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootDbPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(jsDbPath, `window.KANJI_FULL_DATABASE = ${JSON.stringify(db, null, 2)};\n`, 'utf8');

console.log(`[Batch 5C - N1 Part 3] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n1cData).length} chữ Kanji N1.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
