/**
 * Batch 5E: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 95 chữ Kanji N1 tiếp theo (từ 愚 đến 敵)
 */

const fs = require('fs');
const path = require('path');

const n1eData = {
  "愚": {
    "components": ["禺", "心"],
    "equation": "禺 (Con vượn ngơ ngác) + 心 (Trái tim chậm hiểu)",
    "mnemonic": "Tâm trí ngơ ngác ngờ nghệch như chú khỉ hoang trong rừng, ngốc nghếch, ngu muội, ngu ý (khiêm xưng).",
    "illustration": {
      "badge": "🐒",
      "concept": "Chú khỉ gãi đầu ngơ ngác",
      "visualDesc": "Chú khỉ ngồi ngơ ngác gãi đầu trước câu đố hóc búa."
    }
  },
  "慈": {
    "components": ["茲", "心"],
    "equation": "茲 (Tư - mầm cỏ thảo mộc sinh sôi dồi dào) + 心 (Trái tim yêu thương)",
    "mnemonic": "Trái tim chan chứa tình thương bao la nuôi dưỡng muôn loài sinh sôi nảy nở (茲-心), từ bi, nhân từ.",
    "illustration": {
      "badge": "🕊️",
      "concept": "Trái tim từ bi bác ái",
      "visualDesc": "Bồ câu trắng sải cánh bay trên bàn tay nâng niu biểu trưng cho lòng từ bi."
    }
  },
  "態": {
    "components": ["能", "心"],
    "equation": "能 (Năng - tài năng, năng lực bên ngoài) + 心 (Tâm tình biểu lộ ra bên ngoài)",
    "mnemonic": "Tâm trạng bên trong (心) bộc lộ ra thành phong thái và cử chỉ hành động bên ngoài (能), thái độ, trạng thái.",
    "illustration": {
      "badge": "🎭",
      "concept": "Biểu cảm phong thái",
      "visualDesc": "Mặt nạ biểu cảm thể hiện sự biến chuyển trạng thái cảm xúc tinh tế."
    }
  },
  "慎": {
    "components": ["忄", "真"],
    "equation": "忄 (Tâm trí) + 真 (Chân - sự thật chân chính không chút giả tạo)",
    "mnemonic": "Trong lòng (忄) luôn hướng về sự thật chân chính (真) nên làm gì cũng suy xét kỹ càng, cẩn thận, thận trọng.",
    "illustration": {
      "badge": "🔬",
      "concept": "Suy xét cẩn trọng",
      "visualDesc": "Kính lúp soi kỹ từng chi tiết nhỏ nhắc nhở hành động thận trọng."
    }
  },
  "慕": {
    "components": ["莫", "心"],
    "equation": "莫 (Mặt trời lặn tối tăm bóng người) + 心 (Trái tim tha thiết hướng về)",
    "mnemonic": "Dù người đã đi xa khuất bóng nơi chân trời (莫), trái tim vẫn tha thiết hướng về tưởng nhớ (心), ái mộ, nhớ thương.",
    "illustration": {
      "badge": "🌅",
      "concept": "Hồi tưởng nhớ nhung",
      "visualDesc": "Bóng người đứng nhìn về phía hoàng hôn xa xăm với ánh mắt tha thiết nhớ thương."
    }
  },
  "慢": {
    "components": ["忄", "曼"],
    "equation": "忄 (Tâm trạng) + 曼 (Kéo dài dây thừng, buông lỏng lề mề)",
    "mnemonic": "Lòng tự mãn buông lỏng kỷ luật sinh ra thói kiêu căng coi thường người khác, ngạo mạn, khinh mạn.",
    "illustration": {
      "badge": "🦚",
      "concept": "Chú công xòe đuôi kiêu hãnh",
      "visualDesc": "Chú công xòe bộ lông rực rỡ ngẩng cao đầu kiêu kỳ bước đi."
    }
  },
  "慧": {
    "components": ["彗", "心"],
    "equation": "彗 (Cây chổi quét sạch bụi trần) + 心 (Trái tim tâm trí sáng ngời)",
    "mnemonic": "Chiếc chổi trí tuệ (彗) quét sạch mọi u mê bụi trần làm bừng sáng tâm trí (心), thông tuệ, trí tuệ.",
    "illustration": {
      "badge": "💡",
      "concept": "Ánh sáng trí tuệ",
      "visualDesc": "Vầng hào quang trí tuệ bừng sáng quanh đóa sen ngọc thanh khiết."
    }
  },
  "慨": {
    "components": ["忄", "既"],
    "equation": "忄 (Trong lòng) + 既 (Ký - sự việc đã rồi không thể vãn hồi)",
    "mnemonic": "Trong lòng (忄) dâng trào cảm xúc nghẹn ngào trước những sự việc đã rồi (既), cảm khái, khảng khái.",
    "illustration": {
      "badge": "😮‍💨",
      "concept": "Cảm khái thở dài",
      "visualDesc": "Người đứng trước cảnh cũ ngậm ngùi buông tiếng thở dài đầy cảm khái."
    }
  },
  "慮": {
    "components": ["虍", "思"],
    "equation": "虍 (Hổ rình mồi thận trọng) + 思 (Tâm trí suy nghĩ sâu xa)",
    "mnemonic": "Tâm trí suy ngẫm sâu xa cẩn trọng như chúa sơn lâm rình mồi trước khi hành động, lo nghĩ, suy tính, tư lự.",
    "illustration": {
      "badge": "♟️",
      "concept": "Nước cờ suy tính kỹ lưỡng",
      "visualDesc": "Bàn cờ vua với quân cờ chuẩn bị đi sau những phút suy nghĩ thấu đáo."
    }
  },
  "慰": {
    "components": ["尉", "心"],
    "equation": "尉 (Viên quan trấn an) + 心 (Tấm lòng sẻ chia ấm áp)",
    "mnemonic": "Dùng tình thương ấm áp từ đáy lòng (心) để vỗ về xua tan nỗi đau thương của người khác (尉), an ủi, giải khuây.",
    "illustration": {
      "badge": "🤝",
      "concept": "Bàn tay vỗ về an ủi",
      "visualDesc": "Bàn tay ấm áp đặt lên vai người bạn đang buồn để sẻ chia nâng đỡ."
    }
  },
  "慶": {
    "components": ["广", "鹿", "心"],
    "equation": "Dưới mái nhà (广), dâng tấm da hươu quý (鹿) cùng tấm lòng chân thành chúc tụng (心)",
    "mnemonic": "Mang da hươu quý cùng tấm lòng hân hoan đến chúc mừng ngày vui đại hỷ, khánh chúc, quốc khánh, khánh tiết.",
    "illustration": {
      "badge": "🎉",
      "concept": "Lễ khánh chúc tưng bừng",
      "visualDesc": "Pháo hoa rực sáng trên bầu trời đêm mừng ngày lễ khánh tiết trọng đại."
    }
  },
  "憂": {
    "components": ["頁", "心", "夂"],
    "equation": "Cái đầu trĩu nặng (頁) với trái tim trĩu buồn (心) bước chân lê bước ngập ngừng (夂)",
    "mnemonic": "Đầu nặng trĩu suy tư, lòng nặng trĩu âu lo khiến từng bước chân bước đi nặng nề, ưu sầu, ưu tư, lo lắng.",
    "illustration": {
      "badge": "🌧️",
      "concept": "Nỗi niềm ưu tư",
      "visualDesc": "Bóng người ngồi bên khung cửa ngắm mưa rơi với ánh mắt trĩu nặng ưu tư."
    }
  },
  "憤": {
    "components": ["忄", "賁"],
    "equation": "忄 (Trái tim) + 賁 (Bí - nguồn năng lượng dồn nén chực bùng nổ)",
    "mnemonic": "Cơn tức giận dồn ứ trong lồng ngực như ngọn núi lửa chực trào sôi sục (忄-賁), phẫn nộ, căm phẫn.",
    "illustration": {
      "badge": "😡",
      "concept": "Cơn thịnh nộ bùng phát",
      "visualDesc": "Biểu cảm phẫn nộ tột độ với nắm đấm siết chặt thể hiện sự bức xúc."
    }
  },
  "憧": {
    "components": ["忄", "童"],
    "equation": "忄 (Trái tim) + 童 (Đồng - đứa trẻ thơ ngây nhìn ngắm ước mơ)",
    "mnemonic": "Trái tim thổn thức niềm khát khao trong sáng như đứa trẻ hướng về ước mơ thần tiên (忄-童), khao khát, ngưỡng mộ.",
    "illustration": {
      "badge": "🌟",
      "concept": "Ước mơ khao khát vươn tới",
      "visualDesc": "Đứa bé ngước nhìn bầu trời đêm sao băng ước mơ trở thành phi hành gia."
    }
  },
  "憩": {
    "components": ["舌", "自", "心"],
    "equation": "Mũi hít thở khí trời trong lành (自), lưỡi nếm vị trà thơm (舌), lòng an nhiên (心)",
    "mnemonic": "Dừng chân thở sâu hít căng lồng ngực nhấp ngụm trà cho lòng thảnh thơi, nghỉ ngơi, giải lao, khế tức.",
    "illustration": {
      "badge": "☕",
      "concept": "Phút giây nghỉ ngơi thư thái",
      "visualDesc": "Tách cà phê bốc khói nhẹ nhàng bên cuốn sách mở trong giờ nghỉ giải lao."
    }
  },
  "憲": {
    "components": ["宀", "龶", "罒", "心"],
    "equation": "宀 (Mái nhà quốc gia) + 罒-心 (Mắt nhìn và lòng tuân theo chuẩn mực đạo lý)",
    "mnemonic": "Đạo luật nền tảng tối cao dưới mái nhà đất nước được mọi con mắt và tấm lòng tôn kính tuân theo, hiến pháp.",
    "illustration": {
      "badge": "📜",
      "concept": "Bản Hiến pháp tối thượng",
      "visualDesc": "Cuốn sách Hiến pháp mạ vàng trang trọng đặt trên bục quốc hội."
    }
  },
  "憶": {
    "components": ["忄", "意"],
    "equation": "忄 (Trái tim) + 意 (Ý - ý nghĩ, kỷ niệm sâu sắc)",
    "mnemonic": "Những ý nghĩ và hình ảnh sâu sắc được lưu giữ mãi trong đáy tim (忄-意), ký ức, hồi ức.",
    "illustration": {
      "badge": "🧠",
      "concept": "Ký ức ùa về",
      "visualDesc": "Cuộn phim ký ức mở ra gợi lại những khoảnh khắc tuổi thơ tuyệt đẹp."
    }
  },
  "憾": {
    "components": ["忄", "感"],
    "equation": "忄 (Trái tim) + 感 (Cảm nhận nỗi niềm day dứt)",
    "mnemonic": "Trong lòng dâng trào cảm xúc nuối tiếc khôn nguôi vì việc chưa trọn vẹn (忄-感), nuối tiếc, di hám.",
    "illustration": {
      "badge": "😔",
      "concept": "Nỗi nuối tiếc day dứt",
      "visualDesc": "Cái cúi đầu trầm ngâm bày tỏ sự tiếc nuối chân thành sâu sắc."
    }
  },
  "懇": {
    "components": ["豸", "艮", "心"],
    "equation": "艮 (Cấn - kiên định chân thành từ tận đáy lòng) + 心 (Trái tim)",
    "mnemonic": "Lời giãi bày từ tận đáy lòng chân thành và kiên định tha thiết (艮-心), khẩn thiết, ân cần, khẩn khoản.",
    "illustration": {
      "badge": "🤝",
      "concept": "Tấm lòng ân cần chân tình",
      "visualDesc": "Hai bàn tay nắm chặt nhau thể hiện sự ân cần và tin cậy hết lòng."
    }
  },
  "懐": {
    "components": ["忄", "褱"],
    "equation": "忄 (Trái tim) + 褱 (Vạt áo ôm ấp kỷ niệm sâu bên trong)",
    "mnemonic": "Ôm ấp kỷ niệm thân thương sâu trong lồng ngực áo ấm áp (忄-褱), hoài niệm, lồng ngực, nhớ nhung.",
    "illustration": {
      "badge": "🧥",
      "concept": "Ôm ấp trong lồng ngực",
      "visualDesc": "Bàn tay đặt lên ngực áo ấm áp nơi lưu giữ những hoài niệm yêu thương."
    }
  },
  "懲": {
    "components": ["徴", "心"],
    "equation": "徴 (Chứng cứ rõ ràng) + 心 (Làm cho tâm can biết sợ mà chừa thói xấu)",
    "mnemonic": "Dựa vào chứng cớ rõ ràng để xử lý răn đe khiến kẻ có lỗi tâm phục khẩu phục mà chừa thói, trừng phạt, răn đe.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Búa công lý trừng phạt",
      "visualDesc": "Búa thẩm phán gõ dứt khoát răn đe và trừng phạt hành vi vi phạm."
    }
  },
  "懸": {
    "components": ["県", "心"],
    "equation": "県 (Treo lên cao) đè nặng lên 心 (Trái tim lo âu thấp thỏm)",
    "mnemonic": "Vật thể treo lơ lửng trên cao khiến lòng người lúc nào cũng lo âu thấp thỏm, treo lơ lửng, canh cánh, giải thưởng.",
    "illustration": {
      "badge": "🎐",
      "concept": "Treo lơ lửng trên cao",
      "visualDesc": "Chiếc chuông gió treo lơ lửng đung đưa nhẹ nhàng trước hiên nhà."
    }
  },
  "我": {
    "components": ["手", "戈"],
    "equation": "Bàn tay cầm ngọn giáo có răng cưa để tự vệ khẳng định quyền sở hữu",
    "mnemonic": "Cầm vũ khí trong tay kiên quyết bảo vệ quyền lợi và sự tồn tại của chính mình, bản ngã, ta, chúng ta.",
    "illustration": {
      "badge": "🙋",
      "concept": "Khẳng định bản ngã",
      "visualDesc": "Người đứng hiên ngang tự tin giơ tay khẳng định lập trường của mình."
    }
  },
  "戒": {
    "components": ["戈", "廾"],
    "equation": "Hai bàn tay (廾) nắm chắc ngọn giáo (戈) cảnh giác canh phòng cẩn mật",
    "mnemonic": "Hai tay luôn nắm chắc vũ khí phòng ngừa nguy hiểm và giữ mình nghiêm cẩn, cảnh giới, răn đe, giới luật.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Cảnh giác canh phòng",
      "visualDesc": "Lá chắn và ngọn giáo đặt sẵn sàng trong tư thế cảnh giác cao độ."
    }
  },
  "戯": {
    "components": ["虚", "戈"],
    "equation": "虚 (Hư cấu, giả vờ) + 戈 (Cầm vũ khí múa may đóng kịch)",
    "mnemonic": "Cầm binh khí múa may đóng giả trận đánh để mua vui trên sân khấu, vui đùa, diễn tuồng hí kịch.",
    "illustration": {
      "badge": "🎭",
      "concept": "Vở kịch sân khấu vui nhộn",
      "visualDesc": "Hai diễn viên kịch cầm kiếm gỗ diễn màn đấu kiếm hài hước trên sân khấu."
    }
  },
  "房": {
    "components": ["戸", "方"],
    "equation": "戸 (Cánh cửa phòng) + 方 (Bốn phương góc cạnh vuông vức)",
    "mnemonic": "Gian phòng nhỏ vuông vức có cánh cửa đóng mở khép kín, gian phòng, chùm nho (fusa), phòng ốc.",
    "illustration": {
      "badge": "🍇",
      "concept": "Chùm nho trĩu quả",
      "visualDesc": "Chùm nho tím mọng nước trĩu hạt treo lủng lẳng dưới giàn lá xanh."
    }
  },
  "扇": {
    "components": ["戸", "羽"],
    "equation": "戸 (Cánh cửa khép mở) nhịp nhàng như đôi cánh chim lông vũ (羽)",
    "mnemonic": "Xòe ra gập vào nhịp nhàng như đôi cánh chim để phe phẩy tạo gió mát lành, chiếc quạt nan, quạt gấp.",
    "illustration": {
      "badge": "🪭",
      "concept": "Chiếc quạt giấy gấp truyền thống",
      "visualDesc": "Chiếc quạt sensu vẽ tranh hoa cúc xòe rộng tinh xảo và duyên dáng."
    }
  },
  "扉": {
    "components": ["戸", "非"],
    "equation": "戸 (Cửa) + 非 (Hai cánh đối xứng dang sang hai bên)",
    "mnemonic": "Hai cánh cửa đối xứng đóng mở xoay quanh bản lề đón khách vào nhà, cánh cửa, phi môn.",
    "illustration": {
      "badge": "🚪",
      "concept": "Cánh cửa gỗ mở rộng",
      "visualDesc": "Đôi cánh cửa gỗ mở toang đón nhận ánh nắng ban mai rạng rỡ vào nhà."
    }
  },
  "扱": {
    "components": ["扌", "及"],
    "equation": "扌 (Bàn tay) + 及 (Vươn tới đạt được để điều khiển)",
    "mnemonic": "Đưa tay vươn tới cầm nắm và xử lý công việc một cách khéo léo, thao tác, đối đãi, xử lý.",
    "illustration": {
      "badge": "🤲",
      "concept": "Thao tác ân cần cẩn thận",
      "visualDesc": "Đôi bàn tay nhẹ nhàng nâng niu xử lý món đồ gốm sứ mỏng manh."
    }
  },
  "扶": {
    "components": ["扌", "夫"],
    "equation": "扌 (Bàn tay nâng đỡ) + 夫 (Người đàn ông trụ cột gia đình)",
    "mnemonic": "Chìa bàn tay ra nâng đỡ người khác vượt qua lúc hoạn nạn ốm đau, phò tá, nâng đỡ, phụng dưỡng.",
    "illustration": {
      "badge": "🤝",
      "concept": "Đưa tay nâng đỡ",
      "visualDesc": "Bàn tay nắm lấy tay người bị ngã dìu đứng dậy bước tiếp."
    }
  },
  "批": {
    "components": ["扌", "比"],
    "equation": "扌 (Bàn tay cầm bút vạch rõ) + 比 (So sánh đối chiếu hai bên)",
    "mnemonic": "Cầm bút đối chiếu so sánh hai mặt đúng sai để đưa ra nhận xét công minh, phê bình, phê phán.",
    "illustration": {
      "badge": "✍️",
      "concept": "Ngòi bút phê bình nhận xét",
      "visualDesc": "Cây bút đỏ ghi những lời nhận xét chi tiết vào bài kiểm tra."
    }
  },
  "抄": {
    "components": ["扌", "少"],
    "equation": "扌 (Bàn tay cầm bút) + 少 (Rút bớt cho ít lại súc tích)",
    "mnemonic": "Dùng tay chọn lọc những ý chính cốt lõi rút ngắn lại cho gãy gọn, trích sao, tóm tắt, sao lục.",
    "illustration": {
      "badge": "📝",
      "concept": "Bản trích sao tóm tắt",
      "visualDesc": "Tờ giấy ghi lại những điểm cốt lõi ngắn gọn của bản báo cáo dài."
    }
  },
  "把": {
    "components": ["扌", "巴"],
    "equation": "扌 (Bàn tay) + 巴 (Cuộn tròn ôm trọn chắc chắn)",
    "mnemonic": "Bàn tay nắm chặt cuộn tròn giữ trọn lấy vật trong lòng tay, nắm giữ, thấu suốt (nắm bắt).",
    "illustration": {
      "badge": "✊",
      "concept": "Nắm chặt trong lòng bàn tay",
      "visualDesc": "Bàn tay nắm chặt cán cầm thanh kiếm điều khiển chuẩn xác."
    }
  },
  "抑": {
    "components": ["扌", "卬"],
    "equation": "扌 (Bàn tay) ấn người đang ngóc đầu kiêu căng (卬) quỳ xuống",
    "mnemonic": "Dùng bàn tay ấn mạnh xuống kiềm chế cơn nóng giận không cho bộc phát, ức chế, kiềm chế, đè nén.",
    "illustration": {
      "badge": "🛑",
      "concept": "Bàn tay kiềm chế dừng lại",
      "visualDesc": "Bàn tay giơ ra đè nhẹ xuống ngăn chặn cơn sóng trào dâng."
    }
  },
  "抗": {
    "components": ["扌", "亢"],
    "equation": "扌 (Bàn tay gạt ra) + 亢 (Ngẩng cao đầu đối đầu quyết liệt)",
    "mnemonic": "Giơ tay ngẩng đầu đứng vững chống lại áp lực và thế lực áp bức, kháng cự, đối kháng, kháng thể.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Lá chắn kháng cự",
      "visualDesc": "Chiếc khiên vững chắc chặn đứng đợt tấn công đối kháng mạnh mẽ."
    }
  },
  "択": {
    "components": ["扌", "尺"],
    "equation": "扌 (Bàn tay chọn lựa) + 尺 (Cây thước đo đạc chuẩn mực)",
    "mnemonic": "Dùng thước đo đạc kỹ càng rồi tự tay nhấc ra phương án tối ưu nhất, chọn lựa, tuyển trạch.",
    "illustration": {
      "badge": "✅",
      "concept": "Tích chọn phương án",
      "visualDesc": "Bút đánh dấu tích xanh vào ô lựa chọn chính xác trong danh sách."
    }
  },
  "披": {
    "components": ["扌", "皮"],
    "equation": "扌 (Bàn tay) vạch mở lớp da bọc bên ngoài (皮)",
    "mnemonic": "Bàn tay vạch mở lớp vỏ ngoài để phô bày vẻ đẹp bên trong cho mọi người chiêm ngưỡng, phô bày, khoác áo.",
    "illustration": {
      "badge": "🧥",
      "concept": "Khoác áo choàng lộng lẫy",
      "visualDesc": "Khoác chiếc áo choàng mở rộng vạt áo bước ra sân khấu ra mắt công chúng."
    }
  },
  "抵": {
    "components": ["扌", "氐"],
    "equation": "扌 (Bàn tay) + 氐 (Đế - hạ thấp trọng tâm chạm đất vững vàng)",
    "mnemonic": "Hạ thấp trọng tâm hai tay chống đỡ vững chãi trước sức đẩy của đối phương, chống cự, đề kháng, thế chấp.",
    "illustration": {
      "badge": "🏋️",
      "concept": "Chống đỡ vững vàng",
      "visualDesc": "Vận động viên chống hai tay đẩy lùi vật cản tiến về phía trước."
    }
  },
  "抹": {
    "components": ["扌", "末"],
    "equation": "扌 (Bàn tay) + 末 (Mạt - phần ngọn nghiền nhỏ thành bột)",
    "mnemonic": "Dùng tay quét sạch bụi mạt hoặc nghiền lá trà thành bột mịn, xóa bỏ, bột matcha, quét qua.",
    "illustration": {
      "badge": "🍵",
      "concept": "Bát bột trà xanh Matcha",
      "visualDesc": "Chén trà xanh matcha thơm ngát đánh sủi bọt bằng chổi tre truyền thống."
    }
  },
  "抽": {
    "components": ["扌", "由"],
    "equation": "扌 (Bàn tay) rút mầm cây nảy mầm từ cội rễ (由)",
    "mnemonic": "Đưa tay rút ra phần tinh hoa cốt lõi từ trong sự vật sâu xa, trích xuất, rút thăm, trừu tượng.",
    "illustration": {
      "badge": "🎟️",
      "concept": "Rút thăm trúng thưởng",
      "visualDesc": "Bàn tay rút chiếc vé may mắn từ trong hòm phiếu thủy tinh trong suốt."
    }
  },
  "拍": {
    "components": ["扌", "白"],
    "equation": "扌 (Bàn tay) + 白 (Bạch - lòng bàn tay trắng ngà)",
    "mnemonic": "Hai lòng bàn tay vỗ vào nhau bôm bốp tạo nên nhịp điệu rộn ràng, vỗ tay, nhịp phách, phách nhạc.",
    "illustration": {
      "badge": "👏",
      "concept": "Vỗ tay theo nhịp phách",
      "visualDesc": "Đôi bàn tay vỗ nhịp rộn rã theo giai điệu bài hát vui tươi."
    }
  },
  "拐": {
    "components": ["扌", "口", "刀"],
    "equation": "Dùng lời ngọt ngào xảo quyệt (口-刀) dắt tay lừa người đi mất (扌)",
    "mnemonic": "Dùng miệng lưỡi sắc bén lừa dắt tay dẫn người ta đi vào bẫy, bắt cóc, dụ dỗ, lừa gạt.",
    "illustration": {
      "badge": "🚶‍♂️",
      "concept": "Lừa dắt đi dụ dỗ",
      "visualDesc": "Bóng đen lén lút dắt tay dụ dỗ đứa trẻ đi vào con hẻm vắng."
    }
  },
  "拒": {
    "components": ["扌", "巨"],
    "equation": "扌 (Bàn tay) + 巨 (Cự - khối đá khổng lồ chắn ngang)",
    "mnemonic": "Giơ bàn tay ra kiên quyết như tảng đá lớn chặn đứng không cho bước qua, từ chối, cự tuyệt.",
    "illustration": {
      "badge": "🛑",
      "concept": "Bàn tay cự tuyệt dứt khoát",
      "visualDesc": "Bàn tay đẩy ra dứt khoát từ chối lời đề nghị không hợp lý."
    }
  },
  "拓": {
    "components": ["扌", "石"],
    "equation": "扌 (Bàn tay dùng cuốc xẻng) dọn sạch đất đá (石) mở đường",
    "mnemonic": "Dùng tay bốc dọn từng khối đá tảng mở ra con đường và vùng đất mới màu mỡ, khai thác, mở mang.",
    "illustration": {
      "badge": "⛏️",
      "concept": "Khai thác mở đường",
      "visualDesc": "Chiếc cuốc chim bổ xuống mở rộng con đường xuyên qua núi đá."
    }
  },
  "拘": {
    "components": ["扌", "句"],
    "equation": "扌 (Bàn tay) nắm chặt sợi dây gói gọn lại một chỗ (句)",
    "mnemonic": "Bàn tay trói buộc gò ép vào khuôn mẫu chật hẹp không cho tự do, câu nệ, câu lưu, bắt giữ.",
    "illustration": {
      "badge": "⛓️",
      "concept": "Còng tay câu lưu giữ lại",
      "visualDesc": "Chiếc còng số tám khóa chặt giữ chân tội phạm chờ xét xử."
    }
  },
  "拙": {
    "components": ["扌", "出"],
    "equation": "扌 (Bàn tay) + 出 (Vội vã đưa ra chưa kịp gọt giũa khéo léo)",
    "mnemonic": "Đôi tay đưa ra sản phẩm còn thô mộc vụng về chưa qua trau chuốt, vụng về, chuyết tác (khiêm xưng).",
    "illustration": {
      "badge": "🧸",
      "concept": "Món đồ chơi khâu tay vụng về",
      "visualDesc": "Chú gấu bông may tay với những đường chỉ lệch lạc mộc mạc đáng yêu."
    }
  },
  "拠": {
    "components": ["扌", "処"],
    "equation": "扌 (Bàn tay) bám chặt vào vị trí đã chiếm đóng (処)",
    "mnemonic": "Nắm chắc một cứ điểm vững chãi làm chỗ dựa xuất phát hành động, căn cứ, dựa vào, chứng cứ.",
    "illustration": {
      "badge": "🏰",
      "concept": "Căn cứ địa quân sự",
      "visualDesc": "Pháo đài kiên cố xây trên đỉnh núi làm căn cứ địa chỉ huy phòng thủ."
    }
  },
  "拡": {
    "components": ["扌", "広"],
    "equation": "扌 (Bàn tay) dang rộng ra bao la (広)",
    "mnemonic": "Đôi tay dang rộng ra hết cỡ để mở rộng quy mô bờ cõi hay tầm vóc, khuếch đại, mở rộng.",
    "illustration": {
      "badge": "📢",
      "concept": "Khuếch đại âm thanh",
      "visualDesc": "Chiếc loa phóng thanh mở rộng các đợt sóng âm thanh lan tỏa khắp không gian."
    }
  },
  "括": {
    "components": ["扌", "舌"],
    "equation": "扌 (Bàn tay gom lại) + 舌 (Lưỡi cuốn gọn đồ ăn vào miệng)",
    "mnemonic": "Dùng tay gom mọi chi tiết rời rạc buộc gọn vào một mối thống nhất, bao quát, tổng quát.",
    "illustration": {
      "badge": "📦",
      "concept": "Bó gom gọn lại một mối",
      "visualDesc": "Dây thừng thắt nút gom trọn các thanh củi rời rạc thành một bó vững chắc."
    }
  },
  "拳": {
    "components": ["巻", "手"],
    "equation": "Bàn tay (手) cuộn tròn các ngón tay lại thật chặt (巻)",
    "mnemonic": "Năm ngón tay cuộn chặt vào lòng bàn tay tạo thành nắm đấm thép đầy uy lực, nắm đấm, quyền thuật.",
    "illustration": {
      "badge": "🥊",
      "concept": "Găng tay quyền anh",
      "visualDesc": "Chiếc găng boxing đỏ rực nắm chặt sẵn sàng tung cú đấm uy lực."
    }
  },
  "拷": {
    "components": ["扌", "考"],
    "equation": "扌 (Bàn tay cầm roi vọt) + 考 (Truy hỏi gắt gao tìm câu trả lời)",
    "mnemonic": "Dùng đòn roi tra tấn (扌) ép phạm nhân phải khai ra chân tướng (考), tra khảo, khảo đả.",
    "illustration": {
      "badge": "⛓️",
      "concept": "Phòng tra khảo nghiêm ngặt",
      "visualDesc": "Căn phòng hỏi cung với ánh đèn chiếu thẳng vào ghế thẩm vấn."
    }
  },
  "挑": {
    "components": ["扌", "兆"],
    "equation": "扌 (Bàn tay vẫy gọi) + 兆 (Triệu - điềm báo trận chiến sắp bùng nổ)",
    "mnemonic": "Giơ tay vẫy hiệu thách đấu dũng cảm đối mặt với thử thách chông gai phía trước, khiêu chiến, thách thức.",
    "illustration": {
      "badge": "🤺",
      "concept": "Kiếm sĩ khiêu chiến",
      "visualDesc": "Đấu sĩ giơ mũi kiếm hướng về phía đối thủ sẵn sàng bước vào cuộc so tài."
    }
  },
  "挙": {
    "components": ["興", "手"],
    "equation": "Các bàn tay đồng lòng (手) cùng nâng cao ngọn cờ chính nghĩa",
    "mnemonic": "Giơ cao cánh tay biểu quyết thể hiện sự đồng thuận nhất trí cao, bầu cử, giơ tay, cử động.",
    "illustration": {
      "badge": "🙋‍♂️",
      "concept": "Giơ tay biểu quyết",
      "visualDesc": "Cánh tay giơ cao tự tin xung phong phát biểu ý kiến giữa hội trường."
    }
  },
  "振": {
    "components": ["扌", "辰"],
    "equation": "扌 (Bàn tay) vung mạnh tạo nên chuyển động rung chuyển mạnh mẽ (辰)",
    "mnemonic": "Vung cánh tay thật mạnh tạo nên làn sóng rung chuyển cổ vũ tinh thần hừng hực, vẫy tay, chấn hưng.",
    "illustration": {
      "badge": "👋",
      "concept": "Vẫy tay chào nhau",
      "visualDesc": "Bàn tay vẫy chào nồng nhiệt tiễn bạn lên đường đi xa."
    }
  },
  "挿": {
    "components": ["扌", "千", "臼"],
    "equation": "扌 (Bàn tay) cầm chày cắm thẳng vào lòng cối (臼)",
    "mnemonic": "Dùng tay cắm chày vào cối giã gạo hoặc cài nhành hoa vào bình, cắm vào, chèn vào, tranh sáp họa.",
    "illustration": {
      "badge": "🔌",
      "concept": "Cắm phích cắm điện",
      "visualDesc": "Đầu phích cắm được tra vừa khít vào ổ điện trên tường."
    }
  },
  "据": {
    "components": ["扌", "居"],
    "equation": "扌 (Bàn tay) đặt để vật thể an tọa vững vàng ở một nơi chốn (居)",
    "mnemonic": "Dùng tay đặt món đồ ngay ngắn vững chãi cố định một chỗ, lắp đặt, đặt vững, an tọa.",
    "illustration": {
      "badge": "🖥️",
      "concept": "Lắp đặt máy tính để bàn",
      "visualDesc": "Bộ máy tính để bàn được lắp đặt chắc chắn cố định trên bàn làm việc."
    }
  },
  "捷": {
    "components": ["扌", "疌"],
    "equation": "扌 (Bàn tay) thao tác thoăn thoắt chớp mắt giành thắng lợi (疌)",
    "mnemonic": "Đôi tay nhanh thoăn thoắt chớp thời cơ chớp nhoáng mang về chiến thắng, nhanh nhẹn, thắng tiệp.",
    "illustration": {
      "badge": "⚡",
      "concept": "Nhanh như cắt thắng trận",
      "visualDesc": "Bàn tay bắt gọn trái bóng đang bay với phản xạ nhanh như chớp."
    }
  },
  "捺": {
    "components": ["扌", "奈"],
    "equation": "扌 (Bàn tay) + 奈 (Ấn mạnh dứt khoát xuống mặt giấy)",
    "mnemonic": "Dùng bàn tay ấn con dấu son đỏ dứt khoát xuống trang văn bản, đóng dấu, ấn xuống, nét nại.",
    "illustration": {
      "badge": "🔏",
      "concept": "Đóng con dấu đỏ son",
      "visualDesc": "Con dấu khắc tên cá nhân hanko đóng sắc nét mực đỏ son lên giấy tờ."
    }
  },
  "授": {
    "components": ["扌", "受"],
    "equation": "扌 (Bàn tay trao đi) cho người nhận đón lấy (受)",
    "mnemonic": "Tận tay trao truyền tri thức và bằng cấp quý báu cho học trò đón nhận, truyền thụ, trao tặng, giáo sư.",
    "illustration": {
      "badge": "📜",
      "concept": "Lễ trao bằng tốt nghiệp",
      "visualDesc": "Hiệu trưởng hai tay trao tấm bằng cử nhân cho sinh viên ưu tú."
    }
  },
  "掌": {
    "components": ["尚", "手"],
    "equation": "尚 (Đưa lên cao tôn quý) + 手 (Lòng bàn tay hứng trọn)",
    "mnemonic": "Nắm trọn mọi quyền hành điều phối trong lòng bàn tay vững chắc, lòng bàn tay, nắm giữ, chưởng quản.",
    "illustration": {
      "badge": "✋",
      "concept": "Lòng bàn tay mở rộng",
      "visualDesc": "Lòng bàn tay mở ra với các đường chỉ tay rõ ràng chứa đựng sự sống."
    }
  },
  "排": {
    "components": ["扌", "非"],
    "equation": "扌 (Bàn tay) gạt bỏ những điều xấu sai trái ra ngoài (非)",
    "mnemonic": "Dùng tay đẩy phăng những thứ cặn bã độc hại ra khỏi cơ thể và tập thể, bài trừ, đào thải, xả thải.",
    "illustration": {
      "badge": "💨",
      "concept": "Ống xả khí thải",
      "visualDesc": "Khói trắng bay ra từ ống xả khí công nghiệp qua hệ thống lọc."
    }
  },
  "控": {
    "components": ["扌", "空"],
    "equation": "扌 (Bàn tay) giữ lại khoảng trống an toàn (空)",
    "mnemonic": "Dùng tay giữ lại khoảng cách chừng mực không để vượt quá giới hạn, kiềm chế, khống chế, bản lưu.",
    "illustration": {
      "badge": "🛑",
      "concept": "Kiểm soát kiềm chế",
      "visualDesc": "Hàng rào an toàn giữ khoảng cách trật tự cho đám đông người xem."
    }
  },
  "推": {
    "components": ["扌", "隹"],
    "equation": "扌 (Bàn tay đẩy tới) theo hướng đàn chim bay (隹)",
    "mnemonic": "Đưa tay đẩy nhẹ về phía trước để mở cánh cửa khám phá sự thật, suy đoán, tiến cử, suy luận.",
    "illustration": {
      "badge": "💡",
      "concept": "Suy luận logic",
      "visualDesc": "Mảnh ghép suy luận được đẩy vào đúng vị trí hoàn chỉnh bài toán."
    }
  },
  "措": {
    "components": ["扌", "昔"],
    "equation": "扌 (Bàn tay) sắp xếp mọi việc chu đáo như nề nếp xưa cũ (昔)",
    "mnemonic": "Đưa tay sắp đặt đâu ra đấy các bước xử lý sự cố kịp thời, biện pháp, sắp đặt, thố trí.",
    "illustration": {
      "badge": "📋",
      "concept": "Bảng biện pháp xử lý",
      "visualDesc": "Quy trình các biện pháp an toàn được niêm yết rõ ràng tại nhà xưởng."
    }
  },
  "掲": {
    "components": ["扌", "曷"],
    "equation": "扌 (Bàn tay) nâng cao thông báo dưới ánh mặt trời rực rỡ (曷)",
    "mnemonic": "Giơ cao bảng thông báo lên nơi cao nhất cho toàn thể bàn dân thiên hạ trông thấy, niêm yết, treo lên.",
    "illustration": {
      "badge": "📌",
      "concept": "Bảng thông báo niêm yết",
      "visualDesc": "Tờ thông báo kết quả thi được ghim ngay ngắn trên bảng tin trường."
    }
  },
  "描": {
    "components": ["扌", "苗"],
    "equation": "扌 (Bàn tay cầm cọ) tỉ mỉ vẽ từng nhánh mầm non chi tiết (苗)",
    "mnemonic": "Cầm cây cọ khéo léo phác họa lại từng chi tiết sống động của thiên nhiên, miêu tả, phác họa, vẽ tranh.",
    "illustration": {
      "badge": "🖌️",
      "concept": "Vẽ bức tranh màu nước",
      "visualDesc": "Cây cọ lướt êm ái trên toan vẽ phác họa nhành hoa anh đào đang nở."
    }
  },
  "提": {
    "components": ["扌", "是"],
    "equation": "扌 (Bàn tay cầm xách) đưa ra trước ánh sáng chân lý (是)",
    "mnemonic": "Cầm trên tay món đồ đưa ra trước đám đông đề xuất ý kiến bàn thảo, đề xuất, xách tay, đề tài.",
    "illustration": {
      "badge": "👜",
      "concept": "Chiếc túi xách tay",
      "visualDesc": "Chiếc túi xách thanh lịch bằng da thật được xách gọn trên tay."
    }
  },
  "揚": {
    "components": ["扌", "昜"],
    "equation": "扌 (Bàn tay nâng lên) đón ánh mặt trời bừng sáng (昜)",
    "mnemonic": "Nâng cao lá cờ chiến thắng dưới ánh nắng mai / chiên ngập dầu miếng bột phồng to, giương cờ, chiên rán.",
    "illustration": {
      "badge": "🍤",
      "concept": "Món tôm chiên tempura",
      "visualDesc": "Con tôm chiên giòn tempura vàng ruộm vớt ra ráo dầu thơm phức."
    }
  },
  "握": {
    "components": ["扌", "屋"],
    "equation": "扌 (Bàn tay) gom gọn mọi hạt gạo ấm áp như trong một mái nhà (屋)",
    "mnemonic": "Hai bàn tay nắm chặt các hạt gạo dẻo thành khối cơm nắm tam giác đậm đà, nắm giữ, bắt tay, nắm cơm onigiri.",
    "illustration": {
      "badge": "🍙",
      "concept": "Nắm cơm Onigiri Nhật Bản",
      "visualDesc": "Nắm cơm tam giác bọc rong biển thơm ngon được nắm khéo léo bằng đôi tay."
    }
  },
  "揮": {
    "components": ["扌", "軍"],
    "equation": "扌 (Bàn tay vung gậy điều khiển) toàn bộ đoàn quân tiến bước (軍)",
    "mnemonic": "Vung cánh tay chỉ huy điều động toàn bộ lực lượng phát huy tối đa sức mạnh, chỉ huy, phát huy.",
    "illustration": {
      "badge": "🎼",
      "concept": "Nhạc trưởng chỉ huy dàn nhạc",
      "visualDesc": "Vị nhạc trưởng vung đũa chỉ huy nhịp nhàng điều phối dàn nhạc giao hưởng."
    }
  },
  "援": {
    "components": ["扌", "爰"],
    "equation": "扌 (Bàn tay) chìa ra kéo người khác lên khỏi bờ vực hoạn nạn (爰)",
    "mnemonic": "Chìa bàn tay cứu trợ kịp thời kéo người gặp nạn thoát khỏi hiểm nguy, viện trợ, hỗ trợ, cứu viện.",
    "illustration": {
      "badge": "🤝",
      "concept": "Đưa tay cứu viện",
      "visualDesc": "Bàn tay từ trên trực thăng chìa xuống kéo người gặp nạn lên an toàn."
    }
  },
  "揺": {
    "components": ["扌", "䍃"],
    "equation": "扌 (Bàn tay) lay chiếc bình gốm lắc lư qua lại (䍃)",
    "mnemonic": "Bàn tay đẩy nhẹ khiến cành lá hoặc chiếc nôi lắc lư đung đưa êm ái, dao động, rung lắc, đung đưa.",
    "illustration": {
      "badge": "🎐",
      "concept": "Chuông gió đung đưa",
      "visualDesc": "Chiếc chuông gió thủy tinh đung đưa trong gió phát ra thanh âm trong trẻo."
    }
  },
  "搬": {
    "components": ["扌", "般"],
    "equation": "扌 (Bàn tay khiêng đồ) đưa lên thuyền xoay chuyển vận tải (般)",
    "mnemonic": "Dùng tay bốc vác đồ đạc lên phương tiện vận tải chuyển đi nơi khác, vận chuyển, khiêng vác.",
    "illustration": {
      "badge": "📦",
      "concept": "Xe chuyển dọn đồ đạc",
      "visualDesc": "Nhân viên khuân vác các thùng carton đồ đạc xếp ngay ngắn lên xe tải chuyển nhà."
    }
  },
  "搭": {
    "components": ["扌", "荅"],
    "equation": "扌 (Bàn tay đỡ bước chân) bước lên mui tàu kết bằng tre trúc (荅)",
    "mnemonic": "Bước chân bước lên khoang máy bay hay boong tàu để bắt đầu hành trình, lên tàu xe, đáp thừa.",
    "illustration": {
      "badge": "✈️",
      "concept": "Hành khách lên máy bay",
      "visualDesc": "Hành khách xách hành lý bước qua cầu ống lồng lên máy bay cất cánh."
    }
  },
  "携": {
    "components": ["扌", "雋"],
    "equation": "扌 (Bàn tay cầm xách) chú chim nhỏ mang theo bên mình mọi lúc (雋)",
    "mnemonic": "Cầm chắc trong tay mang theo đồ vật quan trọng bên mình trên mọi nẻo đường, mang theo, điện thoại di động (keitai).",
    "illustration": {
      "badge": "📱",
      "concept": "Điện thoại di động cầm tay",
      "visualDesc": "Chiếc điện thoại thông minh nằm gọn trong lòng bàn tay kết nối thế giới."
    }
  },
  "搾": {
    "components": ["扌", "窄"],
    "equation": "扌 (Bàn tay) dồn ép vào không gian chật hẹp (窄) cho chảy giọt nước ra",
    "mnemonic": "Dùng lực bàn tay siết chặt vắt từng giọt sữa tươi nguyên chất ra khỏi bầu sữa, vắt sữa, ép dầu, bóc lột.",
    "illustration": {
      "badge": "🥛",
      "concept": "Vắt sữa bò tươi",
      "visualDesc": "Dòng sữa tươi trắng ngần chảy đều vào xô inox qua bàn tay người vắt sữa."
    }
  },
  "摂": {
    "components": ["扌", "耳", "耳", "耳"],
    "equation": "扌 (Bàn tay thâu nhận) ba cái tai chăm chú lắng nghe mọi âm thanh (ba chữ 耳)",
    "mnemonic": "Đưa tay gom nạp mọi dưỡng chất tinh hoa vào cơ thể bồi bổ sức khỏe, hấp thụ, tiếp thu, nhiếp chính.",
    "illustration": {
      "badge": "🥗",
      "concept": "Hấp thụ dinh dưỡng lành mạnh",
      "visualDesc": "Đĩa salad tươi ngon bổ sung đầy đủ vitamin và khoáng chất cần thiết."
    }
  },
  "摘": {
    "components": ["扌", "啇"],
    "equation": "扌 (Bàn tay ngón tay) khẽ bấm đứt cuống hoa quả mọc trên cành (啇)",
    "mnemonic": "Đầu ngón tay thoăn thoắt ngắt từng búp chè non hoặc vạch rõ sai phạm, hái lượm, trích dẫn, vạch trần.",
    "illustration": {
      "badge": "🍓",
      "concept": "Hái dâu tây chín mọng",
      "visualDesc": "Ngón tay khẽ ngắt cuống quả dâu tây đỏ mọng chín ngọt trong vườn."
    }
  },
  "摩": {
    "components": ["麻", "手"],
    "equation": "麻 (Bó vỏ gai thô ráp) chà xát qua lại dưới bàn tay (手)",
    "mnemonic": "Dùng lòng bàn tay chà xát cọ xát tạo ra nhiệt lượng sưởi ấm hoặc xoa bóp cơ bắp, ma sát, xoa bóp.",
    "illustration": {
      "badge": "💆",
      "concept": "Xoa bóp thư giãn cơ",
      "visualDesc": "Đôi bàn tay xoa bóp nhẹ nhàng xua tan cảm giác mệt mỏi căng thẳng."
    }
  },
  "撃": {
    "components": ["車", "殳", "手"],
    "equation": "Chiến xa xung trận (車) vung binh khí (殳) giáng đòn quyết liệt bằng tay (手)",
    "mnemonic": "Dồn toàn lực giáng đòn sấm sét đánh thẳng vào phòng tuyến quân địch, công kích, bắn kích, tập kích.",
    "illustration": {
      "badge": "💥",
      "concept": "Đòn công kích uy lực",
      "visualDesc": "Tia sét đánh xuống xé toạc màn đêm biểu trưng cho đòn tấn công bất ngờ."
    }
  },
  "撤": {
    "components": ["扌", "育", "攵"],
    "equation": "扌 (Bàn tay) thu dọn tháo dỡ toàn bộ thiết bị rút lui trật tự (育-攵)",
    "mnemonic": "Ra lệnh cho bàn tay thu dọn toàn bộ lều trại rút lui khỏi vị trí nguy hiểm, triệt thoái, tháo dỡ, bãi bỏ.",
    "illustration": {
      "badge": "🚚",
      "concept": "Rút quân tháo dỡ",
      "visualDesc": "Xe tải quân sự chở theo thiết bị trật tự rút lui khỏi tiền tuyến."
    }
  },
  "撮": {
    "components": ["扌", "最"],
    "equation": "扌 (Bàn tay điều chỉnh ống kính) bắt trọn khoảnh khắc đẹp nhất (最)",
    "mnemonic": "Bấm ngón tay lên nút chụp bắt trọn khoảnh khắc đẹp nhất của cuộc sống vào khung hình, chụp ảnh, quay phim.",
    "illustration": {
      "badge": "📸",
      "concept": "Bấm máy chụp ảnh",
      "visualDesc": "Chiếc máy ảnh cơ bấm tách một tiếng ghi lại nụ cười rạng rỡ của em bé."
    }
  },
  "撲": {
    "components": ["扌", "菐"],
    "equation": "扌 (Bàn tay) vung gậy gỗ giáng đòn đánh đuổi thú dữ (菐)",
    "mnemonic": "Hai võ sĩ dùng sức mạnh đôi tay và thân mình xô đẩy quật ngã đối thủ trên võ đài, đô vật sumo, tấn công tiêu diệt.",
    "illustration": {
      "badge": "🤼",
      "concept": "Võ sĩ Sumo so tài",
      "visualDesc": "Hai đô vật sumo khổng lồ gầm vang lao vào nhau trong trận so tài nảy lửa."
    }
  },
  "擁": {
    "components": ["扌", "雝"],
    "equation": "扌 (Vòng tay che chở) ôm ấp bầy chim non vào lòng (雝)",
    "mnemonic": "Dang rộng vòng tay ôm chặt người yếu thế vào lòng bảo vệ chở che, ủng hộ, ôm ấp, bảo bọc.",
    "illustration": {
      "badge": "🫂",
      "concept": "Cái ôm chở che ấm áp",
      "visualDesc": "Cái ôm siết chặt che chở sưởi ấm người bạn sau cơn giông bão."
    }
  },
  "操": {
    "components": ["扌", "喿"],
    "equation": "扌 (Bàn tay linh hoạt) điều khiển đàn chim ríu rít trên cành cây (喿)",
    "mnemonic": "Đôi tay khéo léo điều khiển mọi nút bấm và bộ phận vận hành nhịp nhàng chuẩn xác, thao tác, thao túng, tiết tháo.",
    "illustration": {
      "badge": "🕹️",
      "concept": "Cần gạt thao tác điều khiển",
      "visualDesc": "Bàn tay đẩy cần gạt joystick điều khiển con tàu vũ trụ chuyển hướng mượt mà."
    }
  },
  "擦": {
    "components": ["扌", "察"],
    "equation": "扌 (Bàn tay) cọ xát chà xát cẩn thận từng chi tiết bề mặt (察)",
    "mnemonic": "Cầm que diêm quẹt mạnh vào mép hộp tạo tia lửa bùng cháy, cọ xát, quẹt diêm, trầy xước.",
    "illustration": {
      "badge": "🪵",
      "concept": "Quẹt que diêm bùng cháy",
      "visualDesc": "Đầu que diêm quẹt mạnh vào bề mặt nhám bốc lên ngọn lửa vàng ấm áp."
    }
  },
  "擬": {
    "components": ["扌", "疑"],
    "equation": "扌 (Bàn tay tạo hình) mô phỏng giống hệt khiến mắt nhìn ngờ vực (疑)",
    "mnemonic": "Tạo hình bắt chước giống như thật khiến người ta nhìn vào phải ngờ vực phân vân, mô phỏng, giả lập, từ tượng thanh.",
    "illustration": {
      "badge": "🦎",
      "concept": "Tắc kè đổi màu ngụy trang",
      "visualDesc": "Chú tắc kè hoa đổi màu da tiệp vào cành cây mô phỏng ngụy trang tài tình."
    }
  },
  "攻": {
    "components": ["工", "攵"],
    "equation": "工 (Công cụ chế tạo đòn đánh) + 攵 (Bàn tay vung gậy tấn công)",
    "mnemonic": "Dùng công cụ vũ khí trong tay xông lên giáng đòn áp đảo quân địch, tấn công, công kích.",
    "illustration": {
      "badge": "⚔️",
      "concept": "Tấn công tổng lực",
      "visualDesc": "Mũi tên chiến thuật lao thẳng qua phòng tuyến mở đường công phá thành trì."
    }
  },
  "故": {
    "components": ["古", "攵"],
    "equation": "古 (Những câu chuyện cổ xưa) được bàn tay lần giở nhắc lại (攵)",
    "mnemonic": "Nhắc lại những nguyên nhân và sự việc đã diễn ra trong quá khứ, nguyên do, sự cố, quá cố, cố hương.",
    "illustration": {
      "badge": "📜",
      "concept": "Lật lại nguyên do gốc tích",
      "visualDesc": "Trang nhật ký ố vàng ghi lại cội nguồn nguyên nhân của sự việc xa xưa."
    }
  },
  "敏": {
    "components": ["毎", "攵"],
    "equation": "毎 (Người phụ nữ đội nón) + 攵 (Hành động nhanh thoăn thoắt)",
    "mnemonic": "Đầu óc nhanh nhạy và phản xạ hành động thoăn thoắt dứt khoát không chậm trễ, mẫn tiệp, nhạy bén.",
    "illustration": {
      "badge": "🐆",
      "concept": "Báo đốm phóng nhanh",
      "visualDesc": "Chú báo đốm lao nhanh như mũi tên thể hiện sự nhanh nhạy tuyệt đỉnh."
    }
  },
  "救": {
    "components": ["求", "攵"],
    "equation": "求 (Cầu cứu van xin) + 攵 (Bàn tay vung gậy đánh đuổi hiểm nguy)",
    "mnemonic": "Nghe tiếng kêu cứu khẩn thiết (求) lập tức đưa tay ứng cứu xua đuổi tai họa (攵), cứu vớt, giải cứu, cấp cứu.",
    "illustration": {
      "badge": "🚑",
      "concept": "Xe cấp cứu cứu người",
      "visualDesc": "Xe cứu thương bật còi hụ lao nhanh trên đường đưa người bệnh đi cấp cứu."
    }
  },
  "敢": {
    "components": ["古", "攵"],
    "equation": "Hai tay trần không sợ hãi lao vào chộp đuôi cầm gậy đập gấu dữ",
    "mnemonic": "Tay không dám lao vào đương đầu với thú dữ hiểm nguy không chút run sợ, dũng cảm, quả cảm.",
    "illustration": {
      "badge": "🦁",
      "concept": "Quả cảm đương đầu hiểm nguy",
      "visualDesc": "Người dũng sĩ giương cao ngọn đuốc đứng vững trước bóng đêm thú dữ."
    }
  },
  "敦": {
    "components": ["享", "攵"],
    "equation": "享 (Thụ hưởng niềm vui ấm no) được duy trì bằng phép tắc khuôn phép (攵)",
    "mnemonic": "Giữ trọn đạo đức thuần khiết và tấm lòng chất phác đối đãi với mọi người, đôn hậu, thành phố Tsuruga.",
    "illustration": {
      "badge": "🍲",
      "concept": "Nồi canh ấm lòng đôn hậu",
      "visualDesc": "Nồi súp nóng hổi thơm ngon được chia sẻ cho bà con xóm giềng ấm lòng."
    }
  },
  "整": {
    "components": ["束", "攵", "正"],
    "equation": "束-攵 (Bàn tay gom gọn từng bó củi) xếp ngay ngắn thẳng hàng (正)",
    "mnemonic": "Dùng tay thu gom đồ đạc xếp đặt lại thẳng thớm ngăn nắp theo trật tự, chỉnh đốn, điều chỉnh, tề chỉnh.",
    "illustration": {
      "badge": "📐",
      "concept": "Sắp xếp ngay ngắn thẳng hàng",
      "visualDesc": "Những cuốn sách trên giá được căn chỉnh thẳng tắp tăm tắp theo thứ tự."
    }
  },
  "敵": {
    "components": ["啇", "攵"],
    "equation": "啇 (Gốc rễ đối đầu ngang tài ngang sức) vung vũ khí tương tàn (攵)",
    "mnemonic": "Hai bên cân tài cân sức giương vũ khí đối đầu sống còn trên chiến tuyến, quân địch, địch thủ, tương địch.",
    "illustration": {
      "badge": "⚔️",
      "concept": "Hai kiếm sĩ đối địch",
      "visualDesc": "Hai võ sĩ giương kiếm đứng đối diện nhau chuẩn bị bước vào trận thư hùng."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n1eData)) {
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

console.log(`[Batch 5E - N1 Part 5] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n1eData).length} chữ Kanji N1.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
