/**
 * Batch 5J: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 95 chữ Kanji N1 tiếp theo (từ 緩 đến 蒼)
 */

const fs = require('fs');
const path = require('path');

const n1jData = {
  "緩": {
    "components": ["糸", "爰"],
    "equation": "糸 (Sợi dây thừng) được hai bàn tay kéo nới lỏng ra (爰)",
    "mnemonic": "Nới lỏng sợi dây thắt chặt cho cơ thể thư giãn thong thả, nới lỏng, chậm rãi, hòa hoãn trì hoãn.",
    "illustration": {
      "badge": "🧘",
      "concept": "Thư giãn thong thả nhẹ nhàng",
      "visualDesc": "Người ngồi nghỉ ngơi thả lỏng các cơ bắp bên bờ suối róc rách gió hiu hiu."
    }
  },
  "緯": {
    "components": ["糸", "韋"],
    "equation": "糸 (Sợi chỉ dệt) đan ngang qua lớp da dày bao quanh bốn phía (韋)",
    "mnemonic": "Những đường kẻ ngang song song vòng quanh quả địa cầu định vị tọa độ, vĩ độ, sợi ngang dệt vải.",
    "illustration": {
      "badge": "🌐",
      "concept": "Những đường vĩ tuyến song song",
      "visualDesc": "Quả địa cầu với các đường vĩ tuyến ngang song song tỏa sáng màu vàng kim."
    }
  },
  "縁": {
    "components": ["糸", "彖"],
    "equation": "糸 (Sợi chỉ tơ hồng) kết nối trọn vẹn hai tâm hồn thành một chỉnh thể (彖)",
    "mnemonic": "Sợi chỉ tơ hồng vô hình kết nối con người với nhau tạo nên mối duyên lành tao ngộ, nhân duyên, mép rìa hiên nhà (engawa).",
    "illustration": {
      "badge": "⛩️",
      "concept": "Hành lang hiên nhà ngắm trăng engawa",
      "visualDesc": "Hành lang gỗ engawa nhìn ra khu vườn Nhật Bản tĩnh lặng nơi se duyên gặp gỡ tao nhã."
    }
  },
  "縄": {
    "components": ["糸", "黽"],
    "equation": "糸 (Sợi dây tơ bện chặt) cuộn tròn uốn lượn như dáng con rùa con ếch (黽)",
    "mnemonic": "Bện nhiều sợi dây cỏ thành sợi thừng to bản chắc nịch để trói buộc hay đánh dấu, dây thừng, thời kỳ đồ gốm Jōmon.",
    "illustration": {
      "badge": "🪢",
      "concept": "Sợi dây thừng bện thời Jōmon",
      "visualDesc": "Chiếc bình gốm cổ in hoa văn vết dây thừng bện cuộn tròn đặc trưng thời kỳ Jōmon."
    }
  },
  "縛": {
    "components": ["糸", "尃"],
    "equation": "糸 (Sợi dây thừng) quấn tròn bao phủ (尃) siết chặt tay chân",
    "mnemonic": "Dùng dây thừng quấn quanh trói chặt đối phương không cho cử động, trói buộc, giam cầm, gò bó câu thúc.",
    "illustration": {
      "badge": "⛓️",
      "concept": "Sợi dây thừng trói buộc kiên cố",
      "visualDesc": "Kiện hàng được buộc chằng chịt bằng những vòng dây thừng nút thắt chắc chắn."
    }
  },
  "縦": {
    "components": ["糸", "従"],
    "equation": "糸 (Sợi chỉ dọc) buông theo hàng lối đi theo bước chân người phía trước (従)",
    "mnemonic": "Đường kẻ thẳng đứng từ trên xuống dưới vuông góc với đường chân trời, chiều dọc, thẳng đứng, tung hoành ngang dọc.",
    "illustration": {
      "badge": "↕️",
      "concept": "Đường kẻ chiều dọc thẳng đứng",
      "visualDesc": "Cột gỗ thẳng tắp đứng sừng sững chỉ thẳng lên bầu trời xanh biểu trưng chiều dọc."
    }
  },
  "縫": {
    "components": ["糸", "逢"],
    "equation": "糸 (Kim chỉ) làm cho hai mép vải gặp nhau nối liền (逢)",
    "mnemonic": "Đưa từng mũi kim luồn sợi chỉ kết nối hai mảnh vải thành tấm áo ấm áp, may vá, khâu vá, khâu áo.",
    "illustration": {
      "badge": "🪡",
      "concept": "Mũi kim đường chỉ may áo",
      "visualDesc": "Cây kim thép sáng loáng đang dẫn đường chỉ tơ may liền đường viền chiếc áo kimono."
    }
  },
  "縮": {
    "components": ["糸", "宿"],
    "equation": "糸 (Sợi vải tơ) co cụm lại trong quán trọ nhỏ bé (宿) khi gặp nước nóng",
    "mnemonic": "Mảnh vải gặp nhiệt độ cao co ngắn lại kích thước nhỏ bé, co rút lại, thu nhỏ, rút ngắn cự ly.",
    "illustration": {
      "badge": "🤏",
      "concept": "Thu nhỏ kích thước co rút lại",
      "visualDesc": "Mô hình thu nhỏ tỉ lệ một phần trăm của tòa lâu đài cổ nằm gọn trong lòng bàn tay."
    }
  },
  "繁": {
    "components": ["敏", "糸"],
    "equation": "Đôi bàn tay thoăn thoắt nhanh nhẹn (敏) dệt nên muôn vàn đường tơ sợi gấm (糸)",
    "mnemonic": "Cảnh tượng buôn bán tấp nập hoa lệ muôn người qua lại tưng bừng phát triển, phồn thịnh, phồn hoa, bận rộn.",
    "illustration": {
      "badge": "🎆",
      "concept": "Phố thị phồn hoa đô hội rực rỡ",
      "visualDesc": "Đường phố lộng lẫy đèn hoa ngập tràn người mua kẻ bán tấp nập sầm uất."
    }
  },
  "繊": {
    "components": ["糸", "韯"],
    "equation": "糸 (Sợi tơ nhỏ li ti) mảnh mai sắc bén như đầu mũi tên nhọn (韯)",
    "mnemonic": "Sợi tơ mỏng mảnh tinh vi đòi hỏi sự nhạy cảm và khéo léo tuyệt vời, sợi tơ nhỏ, mảnh mai, tinh tế, chất xơ.",
    "illustration": {
      "badge": "🧵",
      "concept": "Sợi tơ mỏng manh tinh tế",
      "visualDesc": "Sợi tơ tằm siêu mỏng xuyên qua lỗ kim nhỏ tí hon dưới ánh sáng phóng đại."
    }
  },
  "織": {
    "components": ["糸", "戠"],
    "equation": "糸 (Muôn sợi tơ tằm) hòa nhịp theo tiếng thoi đưa lách cách (戠) của khung cửi",
    "mnemonic": "Đôi tay đưa thoi đan cài sợi dọc sợi ngang dệt thành tấm vải gấm lộng lẫy, dệt vải, tổ chức, chức vải.",
    "illustration": {
      "badge": "🧵",
      "concept": "Khung cửi dệt vải truyền thống",
      "visualDesc": "Khung cửi gỗ cổ truyền với con thoi thoăn thoắt dệt nên tấm vải gấm hoa rực rỡ."
    }
  },
  "繕": {
    "components": ["糸", "善"],
    "equation": "糸 (Kim chỉ) khéo léo sửa lại cho hoàn thiện tốt đẹp (善) như ban đầu",
    "mnemonic": "Dùng kim chỉ may vá lại chỗ rách vá víu sửa sang đồ vật bị hư hao, tu bổ, sửa chữa, may vá lại.",
    "illustration": {
      "badge": "🪡",
      "concept": "Khâu vá tu bổ chỗ sờn rách",
      "visualDesc": "Bàn tay khéo léo dùng chỉ vàng đính lại đường thêu bị sờn trên tấm gấm cổ."
    }
  },
  "繭": {
    "components": ["艹", "冂", "虫", "糸"],
    "equation": "Chú tằm (虫) nhả sợi tơ (糸) đan thành chiếc tổ kín bưng (冂) dưới tán dâu (艹)",
    "mnemonic": "Vỏ bọc trắng muốt bằng tơ do con tằm tự cuộn mình ấp ủ để hóa bướm, kén tằm (mayu).",
    "illustration": {
      "badge": "🐛",
      "concept": "Chiếc kén tằm trắng muốt",
      "visualDesc": "Chiếc kén tằm hình bầu dục trắng tinh bám chặt trên cành lá dâu xanh tươi."
    }
  },
  "繰": {
    "components": ["糸", "喿"],
    "equation": "糸 (Kéo sợi tơ ra) từ chiếc nồi luộc kén tằm rộn ràng tiếng nước sôi réo rắt (喿)",
    "mnemonic": "Quay guồng kéo từng sợi tơ tằm mượt mà lặp đi lặp lại nhịp nhàng, rút tơ, quay tơ, lặp đi lặp lại (kuru).",
    "illustration": {
      "badge": "🔄",
      "concept": "Guồng quay rút sợi tơ lặp lại",
      "visualDesc": "Bánh xe guồng quay gỗ xoay tròn đều đặn cuộn sợi tơ tằm vàng óng thành cuộn."
    }
  },
  "罰": {
    "components": ["罒", "言", "刂"],
    "equation": "Lưới pháp luật (罒) giăng ra kết hợp lời phán quyết (言) và thanh gươm trừng phạt (刂)",
    "mnemonic": "Áp dụng hình phạt nghiêm minh đối với kẻ vi phạm pháp luật để răn đe, hình phạt, xử phạt, trừng phạt.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Chiếc búa phán quyết công lý",
      "visualDesc": "Búa gỗ quan tòa gõ vang phán quyết nghiêm khắc trừng phạt hành vi phạm pháp."
    }
  },
  "罷": {
    "components": ["罒", "能"],
    "equation": "Lưới pháp luật (罒) trùm lên tước bỏ mọi quyền năng hành động (能)",
    "mnemonic": "Tạm dừng công việc hoặc bãi miễn chức vụ không cho tiếp tục đảm nhiệm, bãi nhiệm, bãi công, đình chỉ bãi lui.",
    "illustration": {
      "badge": "🛑",
      "concept": "Tuyên bố bãi nhiệm dừng công việc",
      "visualDesc": "Tấm biển thông báo ngừng mọi hoạt động làm việc trong cuộc đình công bãi thị."
    }
  },
  "羅": {
    "components": ["罒", "維"],
    "equation": "Lưới lớn (罒) kết bằng các sợi dây chằng giữ (維) để bắt chim muông",
    "mnemonic": "Tấm lưới bủa vây bốn phương gom trọn mọi vật chất quý giá, lụa là mỏng manh, La Mã Roma, la bàn.",
    "illustration": {
      "badge": "🧭",
      "concept": "Chiếc la bàn chỉ hướng chính xác",
      "visualDesc": "Chiếc la bàn đồng cổ kim chỉ nam xoay tròn định hướng giữa biển khơi bao la."
    }
  },
  "羊": {
    "components": ["羊"],
    "equation": "Hình tượng đầu chú cừu với hai chiếc sừng cong cong uốn lượn và bộ lông mềm mại",
    "mnemonic": "Loài vật hiền lành thuần khiết ăn cỏ trên thảo nguyên mang lại len ấm áp, con cừu, con dê (hitsuji).",
    "illustration": {
      "badge": "🐑",
      "concept": "Chú cừu trắng tròn xoe lông mềm",
      "visualDesc": "Chú cừu non với bộ lông trắng muốt như đám mây thong dong gặm cỏ trên sườn đồi."
    }
  },
  "義": {
    "components": ["羊", "我"],
    "equation": "Đội chú cừu tế lễ thuần khiết (羊) lên trên bản ngã của mình (我)",
    "mnemonic": "Lấy đạo đức và sự công bằng làm chuẩn mực hành động cao hơn lợi ích cá nhân, đạo nghĩa, chính nghĩa, ý nghĩa.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Cán cân công lý và chính nghĩa",
      "visualDesc": "Thanh gươm và cán cân công lý tỏa ánh hào quang biểu trưng tinh thần chính nghĩa bất khuất."
    }
  },
  "翁": {
    "components": ["公", "羽"],
    "equation": "Vị quan công chính (公) có chòm râu trắng mềm mại như cánh lông vũ (羽)",
    "mnemonic": "Cụ già đức cao vọng trọng râu tóc bạc phơ được cả làng kính nể, ông lão, cụ già, nhân vật ngực râu bạc.",
    "illustration": {
      "badge": "👴",
      "concept": "Cụ già râu tóc bạc phơ phúc hậu",
      "visualDesc": "Ông lão tiên phong đạo cốt mỉm cười hiền từ cầm gậy trúc ngắm mây ngàn."
    }
  },
  "翔": {
    "components": ["羊", "羽"],
    "equation": "Đôi cánh lông vũ (羽) nhẹ nhàng bay lượn trên cao thanh thản như loài cừu hiền (羊)",
    "mnemonic": "Dang rộng đôi cánh sải lượn tự do giữa bầu trời xanh lộng gió, bay lượn, phi tường, cất cánh bay cao.",
    "illustration": {
      "badge": "🦅",
      "concept": "Đại bàng sải cánh bay lượn",
      "visualDesc": "Cánh chim ưng sải rộng bay lượn kiêu hãnh trên đỉnh núi tuyết đón ánh mặt trời."
    }
  },
  "翠": {
    "components": ["羽", "卒"],
    "equation": "羽 (Bộ lông vũ) đẹp đến mức tuyệt đỉnh trọn vẹn hoàn mỹ (卒)",
    "mnemonic": "Bộ lông óng ánh màu xanh ngọc bích tuyệt đẹp của chú chim bói cá ven sông, xanh ngọc bích, chim bói cá (hisui).",
    "illustration": {
      "badge": "💎",
      "concept": "Sắc xanh ngọc phỉ thúy",
      "visualDesc": "Viên ngọc phỉ thúy xanh ngắt trong veo lấp lánh phản chiếu vẻ đẹp cung đình sang trọng."
    }
  },
  "翻": {
    "components": ["番", "羽"],
    "equation": "番 (Lần lượt đổi phiên đổi hướng) đập cánh lông vũ (羽) phấp phới",
    "mnemonic": "Lật đi lật lại trang sách hoặc chuyển đổi ngôn ngữ từ tiếng này sang tiếng khác, lật qua lại, bay phấp phới, phiên dịch.",
    "illustration": {
      "badge": "📖",
      "concept": "Lật mở từng trang sách dịch thuật",
      "visualDesc": "Cuốn từ điển mở rộng với những trang sách bay nhè nhẹ chuyển ngữ hai thứ tiếng."
    }
  },
  "翼": {
    "components": ["羽", "異"],
    "equation": "羽 (Đôi cánh lông vũ) vươn ra hai bên với hình thù khác biệt kỳ diệu (異)",
    "mnemonic": "Đôi cánh dang rộng trợ lực đưa con tàu hay loài chim bay vút vào không gian, đôi cánh, cánh máy bay, phụ tá hai bên.",
    "illustration": {
      "badge": "🪽",
      "concept": "Đôi cánh trắng vươn dài lộng gió",
      "visualDesc": "Đôi cánh thiên thần trắng muốt dang rộng uy nghi đón ngọn gió nâng bước bay cao."
    }
  },
  "耀": {
    "components": ["光", "翟"],
    "equation": "Ánh sáng (光) chói lọi rực rỡ như lông chim trĩ muôn màu (翟)",
    "mnemonic": "Ánh hào quang rực rỡ chói lòa chiếu sáng rạng ngời khắp nhân gian, chiếu sáng, chói lọi, rực rỡ vinh quang.",
    "illustration": {
      "badge": "✨",
      "concept": "Ánh hào quang chói lọi rực rỡ",
      "visualDesc": "Vòng hào quang mặt trời ló rạng trên đỉnh núi tuyết tỏa ánh sáng diệu kỳ."
    }
  },
  "耐": {
    "components": ["而", "寸"],
    "equation": "Giữ vững bộ râu quai nón (而) không suy suyển dù chịu áp lực từng tấc một (寸)",
    "mnemonic": "Kiên trì chịu đựng áp lực và thời gian thử thách mà không hề bỏ cuộc, nhẫn nại, chịu đựng, độ bền bỉ dẻo dai.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Sức chịu đựng bền bỉ kiên cường",
      "visualDesc": "Chiếc khiên chắn kiên cố chống đỡ cơn bão tuyết mà không xuất hiện một vết rạn nứt."
    }
  },
  "耗": {
    "components": ["耒", "毛"],
    "equation": "耒 (Cái cày xới đất) lâu ngày bị mài mòn từng sợi nhỏ li ti như sợi lông (毛)",
    "mnemonic": "Năng lượng và vật chất bị tiêu hao hao hụt dần theo thời gian sử dụng, tiêu hao, hao tổn, hao mòn.",
    "illustration": {
      "badge": "🔋",
      "concept": "Thanh pin tiêu hao năng lượng",
      "visualDesc": "Vạch pin năng lượng màu đỏ sụt giảm nhắc nhở việc cần nạp lại nhiên liệu."
    }
  },
  "耶": {
    "components": ["耳", "阝"],
    "equation": "Nghiêng tai (耳) nghe ngóng tin tức ở vùng thành ấp xa xôi (阝)",
    "mnemonic": "Lời nghi vấn hỏi han để xác minh rõ thông tin, trợ từ nghi vấn (vậy ư), tên thánh Da-tô (Giê-su).",
    "illustration": {
      "badge": "❓",
      "concept": "Dấu chấm hỏi nghi vấn thắc mắc",
      "visualDesc": "Khuôn mặt nghiêng tai lắng nghe lời thì thầm để tìm lời giải đáp cho câu hỏi lớn."
    }
  },
  "聖": {
    "components": ["耳", "口", "王"],
    "equation": "Người có đôi tai lắng nghe muôn dân (耳), miệng truyền lời hay (口), xứng đáng bậc vua hiền (王)",
    "mnemonic": "Bậc hiền triết thông tuệ có nhân cách vĩ đại thấu hiểu lẽ trời đất muôn dân, thánh nhân, thần thánh, linh thiêng.",
    "illustration": {
      "badge": "👑",
      "concept": "Ánh sáng thánh thiện của bậc hiền triết",
      "visualDesc": "Vầng hào quang ấm áp bao quanh bức tượng bậc thánh nhân mang lại bình an."
    }
  },
  "聡": {
    "components": ["耳", "公", "心"],
    "equation": "Đôi tai (耳) lắng nghe thấu đáo lẽ công bằng (公) với tấm lòng sáng suốt (心)",
    "mnemonic": "Đôi tai tinh tường nghe hiểu nhanh nhạy và trí óc mẫn tiệp thông tuệ, thông minh, thấu suốt, thông tuệ mẫn tiệp.",
    "illustration": {
      "badge": "🧠",
      "concept": "Trí tuệ thông minh sáng suốt",
      "visualDesc": "Bộ não tỏa ánh sáng xanh biểu trưng cho tư duy nhạy bén và thấu hiểu sâu sắc."
    }
  },
  "聴": {
    "components": ["耳", "十", "罒", "心"],
    "equation": "Dùng đôi tai (耳), mười phần ánh mắt (十 罒) và cả con tim chân thành (心) để lắng nghe",
    "mnemonic": "Dồn toàn bộ tâm trí và cảm xúc để thấu hiểu từng lời người khác nói, lắng nghe, thính giác, nghe theo chỉ đạo.",
    "illustration": {
      "badge": "🎧",
      "concept": "Chăm chú lắng nghe từng âm điệu",
      "visualDesc": "Đôi tai nghe nhạc chất lượng cao giúp cảm nhận trọn vẹn từng giai điệu tinh tế."
    }
  },
  "肇": {
    "components": ["启", "攵", "聿"],
    "equation": "Mở cánh cửa (启) cầm bút (聿) bắt tay viết nên trang sử mới",
    "mnemonic": "Đặt nền móng khởi đầu cho một sự nghiệp vĩ đại trường tồn muôn thuở, khởi đầu, sáng lập, dựng nước triệu thủy.",
    "illustration": {
      "badge": "🚀",
      "concept": "Khởi đầu hành trình vĩ đại",
      "visualDesc": "Con tàu vũ trụ khai hỏa phóng vút lên không trung mở màn kỷ nguyên khám phá mới."
    }
  },
  "肖": {
    "components": ["小", "月"],
    "equation": "Tiểu tế bào (小) trong cơ thể cha mẹ truyền lại cho xương thịt con cái (月)",
    "mnemonic": "Khuôn mặt đứa con giống hệt cha mẹ như cùng một khuôn đúc ra, tương tự, giống hệt, tiêu dung bức chân dung.",
    "illustration": {
      "badge": "🖼️",
      "concept": "Bức tranh chân dung truyền thần",
      "visualDesc": "Bức họa chân dung vẽ tay chân thực lột tả rõ nét từng đường nét khuôn mặt."
    }
  },
  "肝": {
    "components": ["月", "干"],
    "equation": "Bộ phận cơ thể (月) đóng vai trò lá chắn bảo vệ thanh lọc độc tố (干)",
    "mnemonic": "Cơ quan nội tạng quan trọng lọc độc nuôi sống cơ thể và biểu trưng cho lòng dũng cảm, lá gan, can đảm, trọng yếu.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Lá gan thanh lọc bảo vệ cơ thể",
      "visualDesc": "Hình ảnh giải phẫu lá gan hoạt động bền bỉ thanh lọc cơ thể giúp duy trì sinh lực."
    }
  },
  "肢": {
    "components": ["月", "支"],
    "equation": "月 (Cơ thể con người) phân nhánh ra các cành tay chân (支)",
    "mnemonic": "Bốn chi tay chân chìa ra như cành nhánh giúp cơ thể di chuyển và làm việc linh hoạt, tứ chi, tay chân, chi thể.",
    "illustration": {
      "badge": "🤸",
      "concept": "Vận động tứ chi dẻo dai khỏe khoắn",
      "visualDesc": "Vận động viên uốn dẻo tứ chi uyển chuyển thực hiện động tác thể dục nhịp điệu."
    }
  },
  "肥": {
    "components": ["月", "巴"],
    "equation": "Cơ thể (月) bám đầy lớp mỡ dày cuộn tròn núng nính (巴)",
    "mnemonic": "Đất đai màu mỡ nhiều dưỡng chất giúp cây cỏ tốt tươi và vật nuôi béo tròn, béo tốt, phì nhiêu, phân bón màu mỡ.",
    "illustration": {
      "badge": "🌱",
      "concept": "Đất đai phì nhiêu màu mỡ",
      "visualDesc": "Thửa ruộng đất đen tơi xốp ngập tràn chất dinh dưỡng nuôi cây xanh mơn mởn."
    }
  },
  "肪": {
    "components": ["月", "方"],
    "equation": "Thịt mỡ (月) trải đều ra khắp bốn phương bề mặt (方)",
    "mnemonic": "Lớp mỡ trắng ngậy tích tụ dưới da cung cấp năng lượng ấm áp cho cơ thể, mỡ động vật, chất béo mỡ màng.",
    "illustration": {
      "badge": "🥩",
      "concept": "Đường vân mỡ cẩm thạch bò Wagyu",
      "visualDesc": "Miếng thịt bò Wagyu với những đường vân mỡ cẩm thạch trắng xen kẽ thớ thịt đỏ tươi."
    }
  },
  "肺": {
    "components": ["月", "市"],
    "equation": "Cơ quan cơ thể (月) trao đổi khí oxy tấp nập như chợ búa đông đúc (市)",
    "mnemonic": "Hai lá phổi phập phồng hít thở khí trời nuôi dưỡng từng dòng máu đỏ, lá phổi, hô hấp, phế quản.",
    "illustration": {
      "badge": "🫁",
      "concept": "Đôi lá phổi hít thở trong lành",
      "visualDesc": "Hình ảnh đôi lá phổi xanh tươi hít căng tràn lồng ngực bầu không khí rừng thông mát rượi."
    }
  },
  "胆": {
    "components": ["月", "旦"],
    "equation": "Bộ phận cơ thể (月) chứa dịch mật vàng óng như mặt trời mọc rạng đông (旦)",
    "mnemonic": "Túi mật đắng ngắt giúp tiêu hóa và rèn giũa lòng quả cảm không sợ hãi trước hiểm nguy, túi mật, can đảm, dũng cảm.",
    "illustration": {
      "badge": "🦁",
      "concept": "Khí phách can đảm dũng mãnh",
      "visualDesc": "Chiến binh đứng hiên ngang trước giông bão thể hiện lòng dũng cảm phi thường không run sợ."
    }
  },
  "胎": {
    "components": ["月", "台"],
    "equation": "Khối máu thịt (月) được nuôi dưỡng trên bệ đỡ an toàn tử cung (台)",
    "mnemonic": "Mầm sống bé bỏng đang lớn lên từng ngày trong bụng mẹ yêu thương, bào thai, thai nhi, phôi thai.",
    "illustration": {
      "badge": "🤰",
      "concept": "Bào thai bình yên trong bụng mẹ",
      "visualDesc": "Hình ảnh siêu âm thai nhi cuộn tròn ngủ say bình yên trong vòng tay chở che của mẹ."
    }
  },
  "胞": {
    "components": ["月", "包"],
    "equation": "Khối thịt (月) được bọc kín trong túi màng ối mỏng manh (包)",
    "mnemonic": "Đơn vị sống nhỏ bé nhất tạo nên cơ thể và mối liên kết máu mủ ruột thịt cùng một bọc, tế bào, đồng bào cùng bọc trứng.",
    "illustration": {
      "badge": "🔬",
      "concept": "Tế bào phân chia sinh sôi",
      "visualDesc": "Hình ảnh kính hiển vi chụp cấu trúc tế bào sống lung linh đang phân chia phát triển."
    }
  },
  "胡": {
    "components": ["古", "月"],
    "equation": "Người già từ xưa (古) có phần thịt cằm (月) rủ xuống chòm râu dài",
    "mnemonic": "Tộc người phương Bắc có chòm râu rậm rạp mang theo hạt tiêu thơm nồng, người phương Bắc, hồ tiêu, râu cằm.",
    "illustration": {
      "badge": "🧂",
      "concept": "Hạt tiêu đen cay nồng hồ tiêu",
      "visualDesc": "Những hạt tiêu đen tròn thơm nồng rắc lên món súp nóng kích thích vị giác."
    }
  },
  "胤": {
    "components": ["幺", "月"],
    "equation": "Sợi tơ nhỏ huyết thống (幺) nối dài từ xương thịt tổ tiên (月)",
    "mnemonic": "Dòng máu mủ nối dõi truyền đời gìn giữ danh gia vọng tộc ngàn năm, con cháu nối dõi, hậu duệ huyết thống.",
    "illustration": {
      "badge": "👶",
      "concept": "Đứa trẻ nối dõi tông đường",
      "visualDesc": "Đứa trẻ kháu khỉnh nối tiếp truyền thống rạng danh dòng tộc qua bao đời."
    }
  },
  "胴": {
    "components": ["月", "同"],
    "equation": "Phần cơ thể (月) cùng nối kết đầu và chân tay thành một khối đồng nhất (同)",
    "mnemonic": "Phần thân mình chứa các cơ quan nội tạng và áo giáp bảo vệ ngực bụng kendo, thân mình, giáp ngực kendo (dō).",
    "illustration": {
      "badge": "🥋",
      "concept": "Áo giáp ngực kendo dō",
      "visualDesc": "Tấm giáp ngực sơn mài đen bóng kiên cố của kiếm sĩ kendo trong tư thế thủ kiếm."
    }
  },
  "脅": {
    "components": ["劦", "月"],
    "equation": "Dùng sức mạnh của ba người (劦) chèn ép lên thể xác tinh thần (月)",
    "mnemonic": "Dùng vũ lực và uy quyền dồn ép bắt nạt đối phương phải run sợ tuân theo, đe dọa, uy hiếp, mạn sườn hông.",
    "illustration": {
      "badge": "⚠️",
      "concept": "Mối nguy hiểm đe dọa cảnh báo",
      "visualDesc": "Biển cảnh báo nguy hiểm sắc màu vàng đen nhắc nhở đề phòng mối uy hiếp trước mặt."
    }
  },
  "脈": {
    "components": ["月", "永"],
    "equation": "Mạch máu cơ thể (月) luân chuyển dòng máu không ngừng nghỉ chảy mãi vĩnh viễn (永)",
    "mnemonic": "Đường ống dẫn máu nuôi cơ thể đập nhịp nhàng theo nhịp tim, mạch máu, huyết mạch, mạch núi sông.",
    "illustration": {
      "badge": "💓",
      "concept": "Nhịp đập mạch máu đập rộn ràng",
      "visualDesc": "Đường sóng điện tâm đồ nhảy múa nhịp nhàng thể hiện sự sống tràn trề của huyết mạch."
    }
  },
  "脚": {
    "components": ["月", "去", "卩"],
    "equation": "Bộ phận cơ thể (月) bước đi (去) rồi gập đầu gối ngồi quỳ xuống (卩)",
    "mnemonic": "Cặp chân chắc khỏe đưa ta sải bước khắp bốn phương trời và làm chân trụ đỡ bàn ghế, cẳng chân, bước chân, chân bàn.",
    "illustration": {
      "badge": "🦵",
      "concept": "Đôi chân rắn rỏi sải bước",
      "visualDesc": "Đôi chân săn chắc của vận động viên chạy bộ sải bước mạnh mẽ trên đường đua."
    }
  },
  "脩": {
    "components": ["亻", "攵", "月"],
    "equation": "Người (亻) dùng tay cầm roi (攵) phơi khô bó thịt nạc (月) dâng lễ bái sư",
    "mnemonic": "Bó thịt khô làm lễ vật bái thầy học đạo và rèn luyện đạo đức nhân cách, tu thân, bó thịt khô dâng thầy.",
    "illustration": {
      "badge": "🥩",
      "concept": "Bó thịt khô bái sư học đạo",
      "visualDesc": "Bó thịt sấy khô buộc lạt tre trang trọng học trò dâng lên kính tặng người thầy."
    }
  },
  "脱": {
    "components": ["月", "兑"],
    "equation": "Thịt da (月) được cởi bỏ lớp bọc bên ngoài nở nụ cười nhẹ nhõm vui sướng (兑)",
    "mnemonic": "Cởi bỏ áo quần nặng nề thoát khỏi vòng vây hiểm nguy lấy lại tự do, cởi bỏ, trút bỏ, thoát khỏi, rụng rơi.",
    "illustration": {
      "badge": "🚪",
      "concept": "Cửa thoát hiểm an toàn",
      "visualDesc": "Cửa thoát hiểm màu xanh sáng đèn chỉ đường thoát khỏi nguy hiểm ra ngoài an toàn."
    }
  },
  "脹": {
    "components": ["月", "長"],
    "equation": "Cơ thịt cơ thể (月) to dài ra quá cỡ (長)",
    "mnemonic": "Bụng căng tức sưng to lên phồng to như quả bóng bơm đầy hơi, phồng căng, sưng to, trương phình.",
    "illustration": {
      "badge": "🎈",
      "concept": "Quả bóng bay phồng căng tròn",
      "visualDesc": "Quả bóng bay rực rỡ được thổi căng tròn căng mọng chuẩn bị bay lên không trung."
    }
  },
  "腐": {
    "components": ["府", "肉"],
    "equation": "Thịt (肉) cất giữ quá lâu trong kho ẩm kín (府) sinh nấm mốc hư hỏng",
    "mnemonic": "Thức ăn để lâu ngày biến chất phân hủy bốc mùi khó chịu, thối rữa, mục nát, đậu phụ thanh đạm (tōfu).",
    "illustration": {
      "badge": "🧊",
      "concept": "Miếng đậu phụ tươi ngon tōfu",
      "visualDesc": "Khối đậu phụ trắng nõn mềm mại ngâm trong làn nước mát thanh tịnh bổ dưỡng."
    }
  },
  "腸": {
    "components": ["月", "昜"],
    "equation": "Cơ quan cơ thể (月) dài uốn lượn phơi phới hấp thụ ánh sáng dinh dưỡng (昜)",
    "mnemonic": "Đoạn ruột dài uốn khúc trong ổ bụng tiêu hóa thức ăn nuôi dưỡng sinh mệnh, ruột non ruột già, can tràng, đường ruột.",
    "illustration": {
      "badge": "🥣",
      "concept": "Hệ tiêu hóa đường ruột khỏe mạnh",
      "visualDesc": "Hộp sữa chua men vi sinh hỗ trợ đường ruột tiêu hóa khỏe khoắn mỗi ngày."
    }
  },
  "膜": {
    "components": ["月", "莫"],
    "equation": "Lớp thịt da (月) mỏng manh che phủ mờ mờ như sương chiều (莫)",
    "mnemonic": "Lớp màng sinh học mỏng nhẹ bao bọc bảo vệ các cơ quan bên trong, lớp màng mỏng, niêm mạc, màng tế bào.",
    "illustration": {
      "badge": "🫧",
      "concept": "Lớp màng mỏng bao bọc trong suốt",
      "visualDesc": "Lớp màng bảo vệ trong suốt siêu mỏng bao bọc giữ ẩm cho bề mặt đồ vật tinh xảo."
    }
  },
  "膨": {
    "components": ["月", "彭"],
    "equation": "Cơ thể (月) phồng to tròn căng như chiếc trống gỗ đánh vang tiếng bùng boong (彭)",
    "mnemonic": "Khối khí hoặc vật thể nở to ra chiếm trọn không gian xung quanh, phồng to, bành trướng, nở rộng thể tích.",
    "illustration": {
      "badge": "💥",
      "concept": "Vũ trụ giãn nở bành trướng",
      "visualDesc": "Các dải ngân hà giãn nở phồng to biểu trưng cho sự bành trướng không ngừng của vũ trụ."
    }
  },
  "臨": {
    "components": ["臣", "人", "口", "口"],
    "equation": "Vị quan (臣) đứng nghiêng mình quan sát mọi người đang trao đổi dưới công trình",
    "mnemonic": "Có mặt tận nơi đối diện trực tiếp giải quyết sự việc ngay tại chỗ, đối diện, cận kề, lâm thời, đến nơi lâm trận.",
    "illustration": {
      "badge": "🏥",
      "concept": "Bác sĩ lâm sàng khám chữa bệnh",
      "visualDesc": "Bác sĩ trực tiếp đến bên giường bệnh thăm khám ân cần cho từng người bệnh."
    }
  },
  "臭": {
    "components": ["自", "犬"],
    "equation": "自 (Chiếc mũi) của chú chó săn thính nhạy (犬) đánh hơi thấy mùi hương",
    "mnemonic": "Mũi ngửi thấy mùi hôi nồng bốc lên nồng nặc khó chịu, mùi hôi thối, mùi bốc lên, bốc mùi hôi tanh.",
    "illustration": {
      "badge": "👃",
      "concept": "Chú chó đánh hơi mùi lạ",
      "visualDesc": "Chú chó cưng hếch mũi hít hà đánh hơi mùi thức ăn thơm lừng trong bếp."
    }
  },
  "至": {
    "components": ["至"],
    "equation": "Hình tượng mũi tên từ trên cao cắm phập xuống đất đánh dấu điểm đến tận cùng",
    "mnemonic": "Đi đến tận nơi kết thúc hành trình và đạt tới mức độ tột cùng cao nhất, đến nơi, tột cùng, đông chí hạ chí.",
    "illustration": {
      "badge": "🏁",
      "concept": "Lá cờ đích đến tận cùng",
      "visualDesc": "Lá cờ ca-rô tung bay tại vạch đích chào đón người chiến thắng chạm tới đỉnh cao."
    }
  },
  "致": {
    "components": ["至", "攵"],
    "equation": "Thúc đẩy hành động (攵) để đạt tới kết quả đích đến cuối cùng (至)",
    "mnemonic": "Dốc lòng hành động đưa tới kết quả tốt đẹp hoặc dẫn đến hậu quả nghiêm trọng, đưa đến, trí mạng, tinh tế chu đáo.",
    "illustration": {
      "badge": "🎯",
      "concept": "Đạt tới mục tiêu viên mãn",
      "visualDesc": "Bàn tay đặt mảnh ghép cuối cùng hoàn thiện bức tranh tuyệt đẹp tinh tế chu đáo."
    }
  },
  "興": {
    "components": ["𦥑", "同"],
    "equation": "Bốn bàn tay (𦥑) cùng đồng lòng (同) nhấc bổng vật nặng lên cao",
    "mnemonic": "Mọi người chung tay nâng dậy sự nghiệp phát triển hưng thịnh và dấy lên niềm hứng thú say mê, hưng thịnh, hứng thú.",
    "illustration": {
      "badge": "🎉",
      "concept": "Niềm hứng thú say mê rộn rã",
      "visualDesc": "Đám đông hò reo vui vẻ trong lễ hội truyền thống náo nhiệt tràn đầy hứng khởi."
    }
  },
  "舌": {
    "components": ["千", "口"],
    "equation": "Chiếc lưỡi thò ra từ miệng (口) có thể nói ra ngàn lời (千) và nếm muôn vị",
    "mnemonic": "Chiếc lưỡi mềm dẻo nếm trải đủ chua cay mặn ngọt và uốn nắn câu chữ, cái lưỡi nếm vị, thiệt ngữ thiệt hại.",
    "illustration": {
      "badge": "👅",
      "concept": "Chiếc lưỡi nếm vị kem ngọt mát",
      "visualDesc": "Chiếc lưỡi nếm thử giọt mật ngọt mát rượi cảm nhận hương vị ngọt lành của tự nhiên."
    }
  },
  "舎": {
    "components": ["亼", "舌"],
    "equation": "Dưới mái nhà chung (亼) mọi người quây quần ăn uống nói chuyện cùng nhau (舌)",
    "mnemonic": "Mái nhà đơn sơ che mưa nắng làm nơi nghỉ chân cho lữ khách và học sinh, nhà cửa, quán trọ, ký túc xá.",
    "illustration": {
      "badge": "🏠",
      "concept": "Ngôi nhà ký túc xá ấm cúng",
      "visualDesc": "Khu nhà ký túc xá sinh viên mái ngói đỏ nép mình yên bình bên rặng cây xanh."
    }
  },
  "舗": {
    "components": ["舎", "甫"],
    "equation": "舎 (Khu nhà quán xá) trải rộng buôn bán phục vụ mọi người khắp nơi (甫)",
    "mnemonic": "Dãy cửa hàng buôn bán san sát trên phố hoặc rải đá phẳng lì trên mặt đường, cửa hàng, tiệm buôn, rải đường舗装.",
    "illustration": {
      "badge": "🏪",
      "concept": "Cửa tiệm lâu đời trên con phố cổ",
      "visualDesc": "Cửa tiệm bánh ngọt truyền thống treo tấm rèm noren đón chào khách qua lại."
    }
  },
  "舜": {
    "components": ["爫", "冖", "舛"],
    "equation": "Bàn tay (爫) che chở dưới mái (冖) đôi chân sải bước khiêm nhường (舛)",
    "mnemonic": "Vị minh quân đức độ thời cổ và tên loài hoa dâm bụt sớm nở tối tàn, vua Thuấn hiền triết, hoa dâm bụt mộc cẩn.",
    "illustration": {
      "badge": "🌺",
      "concept": "Đóa hoa dâm bụt sớm mai",
      "visualDesc": "Đóa hoa dâm bụt đỏ rực rỡ hé nở đón giọt sương mai tinh khôi bên bờ dậu."
    }
  },
  "舶": {
    "components": ["舟", "白"],
    "equation": "舟 (Chiếc thuyền lớn) giương cánh buồm trắng muốt (白) vượt đại dương",
    "mnemonic": "Con tàu lớn vượt muôn trùng sóng gió chở hàng hóa giao thương với nước ngoài, thuyền buôn, tàu lớn, thuyền bạc.",
    "illustration": {
      "badge": "🚢",
      "concept": "Tàu hàng viễn dương rẽ sóng",
      "visualDesc": "Con tàu chở hàng khổng lồ rẽ sóng đại dương mang hàng hóa cập cảng quốc tế."
    }
  },
  "艇": {
    "components": ["舟", "廷"],
    "equation": "舟 (Chiếc thuyền nhỏ) lướt nhanh vun vút như bước chân trước sân triều đình (廷)",
    "mnemonic": "Chiếc thuyền nhỏ dáng thon dài lướt nhanh trên mặt nước làm xuồng cứu sinh hay đua thuyền, thuyền nhỏ, canô, du thuyền.",
    "illustration": {
      "badge": "🚤",
      "concept": "Chiếc canô lướt sóng vun vút",
      "visualDesc": "Chiếc canô cao tốc rẽ sóng tung bọt trắng xóa lướt êm ái trên mặt hồ phẳng lặng."
    }
  },
  "艦": {
    "components": ["舟", "監"],
    "equation": "舟 (Chiếc tàu) có đài quan sát chỉ huy giám sát trận địa xung quanh (監)",
    "mnemonic": "Tàu chiến bọc thép trang bị đại bác kiên cố bảo vệ vùng biển đảo quê hương, chiến hạm, hạm đội tàu chiến.",
    "illustration": {
      "badge": "⚓",
      "concept": "Chiến hạm uy nghiêm giữa biển",
      "visualDesc": "Tàu hộ vệ tên lửa bằng thép xám tro sừng sững tuần tra canh giữ vùng biển tổ quốc."
    }
  },
  "艶": {
    "components": ["豊", "色"],
    "equation": "豊 (Trù phú đầy đặn căng tràn) tỏa ra sắc màu quyến rũ kiều diễm (色)",
    "mnemonic": "Vẻ đẹp đẫm sắc rực rỡ bóng bẩy kiều diễm hút hồn lòng người, diễm lệ, bóng bẩy, quyến rũ kiều diễm.",
    "illustration": {
      "badge": "💄",
      "concept": "Đôi môi thoa son diễm lệ bóng bẩy",
      "visualDesc": "Gương mặt trang điểm kiêu sa với đôi môi đỏ mọng bóng bẩy toát lên nét đẹp diễm lệ."
    }
  },
  "芋": {
    "components": ["艹", "于"],
    "equation": "艹 (Cây cỏ có củ) uốn lượn phình to dưới lòng đất sâu (于)",
    "mnemonic": "Củ khoai mọc ngầm dưới đất luộc lên dẻo bùi thơm ngọt ấm lòng ngày đông, củ khoai sọ, khoai lang (imo).",
    "illustration": {
      "badge": "🍠",
      "concept": "Củ khoai nướng nóng hổi thơm bùi",
      "visualDesc": "Củ khoai mật nướng bẻ đôi bốc hơi nghi ngút ruột vàng ươm thơm ngọt lịm."
    }
  },
  "芙": {
    "components": ["艹", "夫"],
    "equation": "艹 (Cây hoa thanh cao) sánh duyên cùng người trượng phu quân tử (夫)",
    "mnemonic": "Đóa hoa phù dung mong manh kiều diễm soi bóng đỉnh núi Phú Sĩ tuyết phủ, hoa phù dung, sen ngọc, núi Phú Sĩ.",
    "illustration": {
      "badge": "🌸",
      "concept": "Đóa hoa phù dung trắng hồng",
      "visualDesc": "Đóa phù dung đổi màu theo ánh mặt trời từ trắng tinh sang hồng thắm duyên dáng."
    }
  },
  "芝": {
    "components": ["艹", "之"],
    "equation": "艹 (Cỏ xanh non) đan cài lan rộng bò đi khắp mặt đất (之)",
    "mnemonic": "Thảm cỏ xanh mướt mọc sát mặt đất làm sân chơi và sân khấu kịch truyền thống, bãi cỏ xanh, rạp kịch shibai.",
    "illustration": {
      "badge": "🌱",
      "concept": "Thảm cỏ xanh mướt mát mắt",
      "visualDesc": "Thảm cỏ xanh non tươi tắn trải dài dưới ánh nắng ban mai lung linh sương sớm."
    }
  },
  "芳": {
    "components": ["艹", "方"],
    "equation": "艹 (Hoa cỏ ngát hương) tỏa mùi thơm ngào ngạt lan khắp bốn phương trời (方)",
    "mnemonic": "Hương hoa thơm ngát bay xa để lại danh thơm tiếng tốt cho muôn đời, hương thơm ngát, thơm tho, danh thơm.",
    "illustration": {
      "badge": "💐",
      "concept": "Bó hoa tươi tỏa ngát hương thơm",
      "visualDesc": "Bó hoa linh lan trắng muốt tỏa hương thơm thanh khiết dịu dàng khắp căn phòng."
    }
  },
  "芹": {
    "components": ["艹", "斤"],
    "equation": "艹 (Cây rau cần) được dùng dao nhỏ chặt từng khúc ngắn (斤)",
    "mnemonic": "Loài rau thơm giòn giòn mọc ven bờ nước nấu súp thơm lừng hương vị mùa xuân, rau cần tây, rau cần ta (seri).",
    "illustration": {
      "badge": "🥬",
      "concept": "Nhánh rau cần xanh giòn thơm mát",
      "visualDesc": "Bó rau cần xanh non mơn mởn vừa hái bên bờ suối chuẩn bị nấu món canh xuân."
    }
  },
  "芽": {
    "components": ["艹", "牙"],
    "equation": "艹 (Cây cỏ) nhú lên mầm non sắc nhọn như chiếc răng nanh nhỏ (牙)",
    "mnemonic": "Chồi non xanh biếc nhú ra khỏi hạt mầm báo hiệu mùa xuân ấm áp về, mầm cây non, chồi biếc nảy mầm (me).",
    "illustration": {
      "badge": "🌱",
      "concept": "Mầm cây non vừa nhú xanh biếc",
      "visualDesc": "Hai chiếc lá mầm bé xíu vươn lên từ lớp đất đen đón chào ánh nắng ban mai ấm áp."
    }
  },
  "苑": {
    "components": ["艹", "夗"],
    "equation": "艹 (Hoa thơm cỏ lạ) trồng uốn lượn quanh co thư thái lúc đêm về (夗)",
    "mnemonic": "Khu vườn hoa cảnh rộng lớn nơi trồng đủ loài kỳ hoa dị thảo cho vua chúa dạo mát, vườn thượng uyển, công viên hoa.",
    "illustration": {
      "badge": "🏡",
      "concept": "Vườn thượng uyển ngập tràn sắc hoa",
      "visualDesc": "Khu vườn thượng uyển lộng lẫy với hồ nước trong vắt và những lối đi rợp bóng hoa anh đào."
    }
  },
  "苗": {
    "components": ["艹", "田"],
    "equation": "艹 (Cây mạ non tơ) cấy thẳng hàng trên thửa ruộng ngập nước (田)",
    "mnemonic": "Cây mạ xanh non mới cấy hứa hẹn mùa màng bội thu sau bao ngày chăm bón, mạ non, cây con giống, miêu duệ.",
    "illustration": {
      "badge": "🌾",
      "concept": "Khóm mạ non xanh mướt trên ruộng",
      "visualDesc": "Những hàng mạ non xanh tươi thẳng tắp soi bóng lung linh trên mặt ruộng nước."
    }
  },
  "茂": {
    "components": ["艹", "戊"],
    "equation": "艹 (Cây cỏ) vươn cành lá mạnh mẽ sum sê như giáp sắt vũ khí bảo vệ (戊)",
    "mnemonic": "Cây cối tốt tươi đâm chồi nảy lộc mọc rậm rạp um tùm giữa mùa hạ rực nắng, xanh tốt um tùm, sum sê mọc rậm.",
    "illustration": {
      "badge": "🌳",
      "concept": "Khu rừng mùa hè xanh tốt um tùm",
      "visualDesc": "Tán lá cây rừng đại ngàn rậm rạp sum sê che mát cả một vùng thung lũng xanh tươi."
    }
  },
  "茄": {
    "components": ["艹", "加"],
    "equation": "艹 (Cây ăn quả) thêm vào (加) những quả mọng màu tím thon dài",
    "mnemonic": "Quả cà tím thon dài vỏ bóng loáng là món ăn quen thuộc thơm ngon trong bữa cơm gia đình, quả cà tím (nasu).",
    "illustration": {
      "badge": "🍆",
      "concept": "Quả cà tím bóng bẩy trên giàn",
      "visualDesc": "Quả cà tím bóng loáng màu tím thẫm treo lủng lẳng dưới tán lá xanh mát."
    }
  },
  "茅": {
    "components": ["艹", "矛"],
    "equation": "艹 (Loại cỏ tranh) có lá mọc thẳng vút nhọn hoắt như ngọn giáo (矛)",
    "mnemonic": "Loài cỏ tranh bền dai cắt về phơi khô lợp mái nhà cổ Shirakawago trăm năm không dột, cỏ tranh, mái nhà lợp tranh (kaya).",
    "illustration": {
      "badge": "🏡",
      "concept": "Mái nhà tranh cổ Shirakawago",
      "visualDesc": "Mái nhà dốc đứng lợp bằng cỏ tranh dày dặn trăm năm tuổi ở ngôi làng cổ tích Shirakawago."
    }
  },
  "茉": {
    "components": ["艹", "末"],
    "equation": "艹 (Loài hoa thảo mộc) nở rộ ở tận ngọn cành đầu mút (末) ngát hương",
    "mnemonic": "Đóa hoa nhài trắng muốt thơm ngát pha trà thanh nhiệt thư giãn tinh thần, hoa nhài (matsuri).",
    "illustration": {
      "badge": "🌼",
      "concept": "Bông hoa nhài trắng muốt ngát hương",
      "visualDesc": "Bông hoa nhài trắng tinh khôi hé nở tỏa làn hương thanh tao dịu nhẹ trong tách trà."
    }
  },
  "茎": {
    "components": ["艹", "圣"],
    "equation": "艹 (Hoa lá) mọc vươn lên trên chiếc cuống trụ thẳng đứng vững chắc (圣)",
    "mnemonic": "Trục thân cây xanh nâng đỡ cành lá và dẫn truyền nhựa sống từ rễ lên hoa quả, thân cây, cọng cuống hoa (kuki).",
    "illustration": {
      "badge": "🎋",
      "concept": "Cuống hoa thẳng tắp cứng cáp",
      "visualDesc": "Cọng thân hoa hồng thẳng tắp xanh mướt kiêu hãnh nâng đỡ đóa hoa đỏ rực rỡ."
    }
  },
  "茜": {
    "components": ["艹", "西"],
    "equation": "艹 (Loại cỏ thảo dược) cho sắc màu nhuộm đỏ rực như ánh hoàng hôn phương tây (西)",
    "mnemonic": "Củ cỏ thiến thảo dùng nhuộm sắc đỏ hoàng hôn thắm đượm màu trời chiều, cỏ thiến thảo, màu đỏ thắm (akane).",
    "illustration": {
      "badge": "🌅",
      "concept": "Bầu trời hoàng hôn đỏ thắm akane",
      "visualDesc": "Bầu trời chiều rực rỡ sắc đỏ cam ấm áp akane soi bóng trên mặt biển êm đềm."
    }
  },
  "荘": {
    "components": ["艹", "壮"],
    "equation": "艹 (Cây cỏ hoa viên bao quanh) công trình tráng lệ nguy nga vững chãi (壮)",
    "mnemonic": "Khu biệt thự nghỉ dưỡng sang trọng giữa thiên nhiên tươi đẹp với phong thái trang nghiêm, biệt thự trang viên, trang nghiêm.",
    "illustration": {
      "badge": "🏰",
      "concept": "Biệt thự trang viên giữa rừng thông",
      "visualDesc": "Tòa biệt thự nghỉ dưỡng bằng gỗ sang trọng nép mình giữa rặng thông thanh tịnh mát mẻ."
    }
  },
  "莉": {
    "components": ["艹", "利"],
    "equation": "艹 (Hoa thơm) mang lại lợi ích thư thái ngọt ngào sắc sảo (利)",
    "mnemonic": "Tên loài hoa nhài thanh tao thường ghép với chữ Mạt tạo thành đóa mạt lị thơm lừng, hoa nhài thơm ngát.",
    "illustration": {
      "badge": "🌸",
      "concept": "Nhành hoa mạt lị trắng tinh khiết",
      "visualDesc": "Nhành hoa nhài xinh xắn trắng muốt e ấp nép mình dưới tán lá xanh mát."
    }
  },
  "莞": {
    "components": ["艹", "完"],
    "equation": "艹 (Cây cỏ cói) được đan dệt trọn vẹn hoàn mỹ (完) thành tấm chiếu tatami",
    "mnemonic": "Nụ cười mỉm hé nở viên mãn trên môi và loài cói dệt chiếu thơm tho, mỉm cười mỉm miệng, cây cói chiếu tatami.",
    "illustration": {
      "badge": "😊",
      "concept": "Nụ cười mỉm hạnh phúc viên mãn",
      "visualDesc": "Gương mặt rạng rỡ với nụ cười mỉm hiền từ toát lên niềm an lạc trong tâm hồn."
    }
  },
  "菊": {
    "components": ["艹", "匊"],
    "equation": "艹 (Loài hoa mùa thu) có muôn cánh hoa ôm trọn bao bọc lấy nhụy vàng (匊)",
    "mnemonic": "Đóa hoa cúc vàng thanh tao kiêu hãnh biểu tượng cho hoàng gia Nhật Bản, hoa cúc mùa thu, quốc huy hoa cúc (kiku).",
    "illustration": {
      "badge": "🌼",
      "concept": "Đóa hoàng cúc mười sáu cánh",
      "visualDesc": "Đóa hoa cúc vàng rực rỡ mười sáu cánh uốn lượn hoàn mỹ biểu trưng cho hoàng gia Nhật."
    }
  },
  "菌": {
    "components": ["艹", "囷"],
    "equation": "艹 (Nấm mốc) sinh sôi nảy nở trong kho thóc tròn kín gió (囷)",
    "mnemonic": "Các vi sinh vật nhỏ bé li ti có ích như men nấm làm tương miso hoặc vi khuẩn gây bệnh, vi khuẩn, nấm mốc men.",
    "illustration": {
      "badge": "🍄",
      "concept": "Men nấm vi sinh ủ tương miso",
      "visualDesc": "Thùng gỗ ủ men vi sinh lên men tự nhiên làm nên món tương miso đậm đà hương vị."
    }
  },
  "菖": {
    "components": ["艹", "昌"],
    "equation": "艹 (Lá cây hình lưỡi kiếm) tỏa ánh sáng tươi tốt rực rỡ (昌) ngày Tết Đoan Ngọ",
    "mnemonic": "Lá cây xương bồ hình thanh gươm cắm trước cửa trừ tà ma trong ngày tết bé trai mùng năm tháng năm, cây xương bồ (shōbu).",
    "illustration": {
      "badge": "🗡️",
      "concept": "Lá xương bồ trừ tà ngày tết thiếu nhi",
      "visualDesc": "Bó lá xương bồ xanh ngắt hình thanh kiếm cắm bên bồn tắm nước ấm trừ tà cầu sức khỏe."
    }
  },
  "菫": {
    "components": ["艹", "堇"],
    "equation": "艹 (Cây cỏ hoa dại) mọc trên đất vàng ấm áp đón xuân (堇)",
    "mnemonic": "Bông hoa dại nhỏ xíu màu tím biếc nở rộ ven đường mỗi độ xuân về, hoa violet, hoa hoa cỏ tím (sumire).",
    "illustration": {
      "badge": "💜",
      "concept": "Đóa hoa hoa cỏ tím sumire ven đường",
      "visualDesc": "Những đóa hoa hoa cỏ tím bé xíu sumire khoe sắc tím dịu dàng ven bờ tường đá."
    }
  },
  "華": {
    "components": ["艹", "𦰌", "十"],
    "equation": "艹 (Hoa cỏ) trổ ra muôn ngàn cành nhánh nở hoa rực rỡ sum sê tươi tốt",
    "mnemonic": "Bông hoa bung nở rực rỡ khoe sắc huy hoàng lộng lẫy, bông hoa, hoa lệ, phồn hoa, Trung Hoa.",
    "illustration": {
      "badge": "🌺",
      "concept": "Đóa hoa bừng nở lộng lẫy hoa lệ",
      "visualDesc": "Bông hoa đa sắc lộng lẫy nở bung muôn cánh tỏa sáng rực rỡ giữa ánh dương quang."
    }
  },
  "萌": {
    "components": ["艹", "明"],
    "equation": "艹 (Chồi non cây cỏ) vươn mình đón ánh bình minh rạng rỡ sáng sủa (明)",
    "mnemonic": "Hạt mầm xanh cựa mình hé nhú chồi non đáng yêu tươi mới, nảy mầm đâm chồi, đáng yêu dễ thương (moe).",
    "illustration": {
      "badge": "🌱",
      "concept": "Mầm non đáng yêu nảy mầm moe",
      "visualDesc": "Mầm cây xanh non tơ với hai chiếc lá tròn xoe ngộ nghĩnh đáng yêu tràn đầy sức sống."
    }
  },
  "萩": {
    "components": ["艹", "秋"],
    "equation": "艹 (Loài hoa dại) nở rộ thành từng chùm khi ngọn gió thu về (秋)",
    "mnemonic": "Cây hoa nở chùm màu tím hồng đung đưa trong gió heo may đứng đầu bảy loài hoa mùa thu, hoa hagi mùa thu.",
    "illustration": {
      "badge": "🌾",
      "concept": "Cành hoa hagi đung đưa gió thu",
      "visualDesc": "Những cành hoa hagi thanh mảnh trĩu những chùm hoa tím nhạt đung đưa trong làn gió thu."
    }
  },
  "葬": {
    "components": ["艹", "死", "艹"],
    "equation": "Người đã khuất (死) được phủ hoa cỏ (艹 艹) vùi sâu vào lòng đất mẹ yên nghỉ",
    "mnemonic": "Nghi thức tiễn đưa người thân về nơi an nghỉ cuối cùng trong niềm tiếc thương sâu sắc, mai táng, chôn cất, tang lễ.",
    "illustration": {
      "badge": "💐",
      "concept": "Bó hoa trắng tưởng niệm tiễn đưa",
      "visualDesc": "Bó hoa cúc trắng tinh khiết đặt trang trọng tưởng niệm người đã khuất an nghỉ giấc ngàn thu."
    }
  },
  "葵": {
    "components": ["艹", "癸"],
    "equation": "艹 (Cây hoa hướng dương) xoay chuyển lá theo chu kỳ mặt trời bốn phương (癸)",
    "mnemonic": "Hoa thục quỳ ba lá hoa văn gia huy trứ danh của gia tộc tướng quân Tokugawa, hoa thục quỳ, hoa hướng dương (aoi).",
    "illustration": {
      "badge": "🌻",
      "concept": "Gia huy hoa thục quỳ Mitsuba Aoi",
      "visualDesc": "Gia huy ba chiếc lá thục quỳ tròn xoe mạ vàng của Mạc phủ Tokugawa uy nghiêm quyền lực."
    }
  },
  "蒔": {
    "components": ["艹", "時"],
    "equation": "艹 (Gieo hạt mầm) đúng thời điểm mùa vụ (時) để cây sinh trưởng",
    "mnemonic": "Gieo hạt đúng mùa và nghệ thuật sơn mài rắc bột vàng bạc tinh xảo lên hoa văn, gieo hạt giống, sơn mài rắc vàng maki-e.",
    "illustration": {
      "badge": "✨",
      "concept": "Nghệ thuật sơn mài rắc vàng maki-e",
      "visualDesc": "Hộp gỗ sơn mài đen tuyền lấp lánh hoa văn cành thông vẽ bằng bột vàng maki-e thủ công."
    }
  },
  "蒼": {
    "components": ["艹", "倉"],
    "equation": "艹 (Cây cỏ) tích tụ trong kho tàng đất trời (倉) chuyển màu xanh thẳm",
    "mnemonic": "Màu xanh thẫm sâu thẳm của đại dương bao la và bầu trời ngút ngàn, màu xanh lam thẫm, xanh ngắt, thương sinh muôn dân.",
    "illustration": {
      "badge": "🌊",
      "concept": "Biển sâu xanh ngắt thăm thẳm",
      "visualDesc": "Mặt biển xanh biếc thẳm sâu tiếp giáp với vòm trời xanh ngắt ngút ngàn tầm mắt."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n1jData)) {
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

console.log(`[Batch 5J - N1 Part 10] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n1jData).length} chữ Kanji N1.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
