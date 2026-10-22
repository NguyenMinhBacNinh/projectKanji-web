const fs = require('fs');
const path = require('path');

const n2bData = {
  "巨": {
    components: ["匚", "一", "𠄌"],
    equation: "Chiếc thước thợ mộc cỡ đại có tay cầm vặn chữ T",
    mnemonic: "Chiếc thước thợ mộc to lớn dùng để đo đạc những công trình đồ sộ, biểu thị sự khổng lồ, cự đại.",
    illustration: {
      badge: "🦕",
      concept: "Khổng lồ đồ sộ",
      visualDesc: "Bức tượng voi đá khổng lồ sừng sững bên cổng thành uy nghi."
    }
  },
  "巻": {
    components: ["丷", "二", "人", "己"],
    equation: "Hai tay cuộn tròn tấm lụa/thẻ tre thành từng cuốn (己)",
    mnemonic: "Hai tay khéo léo cuộn tròn dải lụa hoặc cuộn sushi thơm ngon, biểu thị cuộn tròn, cuốn sách, tập san.",
    illustration: {
      badge: "📜",
      concept: "Cuộn thư tịch cuộn tròn",
      visualDesc: "Cuộn tranh thủy mặc mở hé để lộ bức tranh phong cảnh hữu tình."
    }
  },
  "布": {
    components: ["𠂇", "巾"],
    equation: "𠂇 (bàn tay đưa thoi dệt) + 巾 (Cân - tấm vải mềm mại)",
    mnemonic: "Bàn tay thoăn thoắt dệt nên tấm vải mềm mại che thân (巾), vải vóc và phân bố trải rộng.",
    illustration: {
      badge: "🧵",
      concept: "Sấp vải dệt mềm mại",
      visualDesc: "Cuộn vải lụa tơ tằm dệt hoa văn tinh xảo óng ả dưới ánh đèn."
    }
  },
  "希": {
    components: ["㐅", "巾"],
    equation: "Tấm vải dệt hoa văn thưa thớt (㐅) thanh nhã độc đáo",
    mnemonic: "Tấm vải tơ mỏng dệt sợi thưa thớt quý hiếm khó tìm, biểu thị điều hiếm có và niềm hy vọng thiết tha.",
    illustration: {
      badge: "🌟",
      concept: "Ánh sao hy vọng",
      visualDesc: "Ngôi sao băng vụt sáng lấp lánh mang theo lời ước nguyện hy vọng tươi sáng."
    }
  },
  "帯": {
    components: ["丗", "冖", "巾"],
    equation: "Dải lụa mềm (巾) thắt ngang hông gắn ngọc bội trang nhã",
    mnemonic: "Dải lụa mềm thắt chặt quanh eo áo kimono giữ nếp trang phục chỉnh tề, dải đai thắt lưng, mang theo bên mình.",
    illustration: {
      badge: "👘",
      concept: "Dải đai Obi kimono",
      visualDesc: "Dải đai Obi thêu hoa văn chỉ vàng thắt nơ trang nhã phía sau tà áo Kimono."
    }
  },
  "帽": {
    components: ["巾", "曰", "目"],
    equation: "巾 (vải che chở) + 冒 (mắt nhìn xuyên qua lớp che phủ đầu)",
    mnemonic: "Tấm vải (巾) đội trùm lên đầu che chở cho đôi mắt (目) tránh nắng gắt mưa sa, đó là chiếc mũ đội đầu.",
    illustration: {
      badge: "🧢",
      concept: "Chiếc mũ che nắng",
      visualDesc: "Chiếc mũ rộng vành che bóng mát dịu dàng cho khuôn mặt dưới nắng hè."
    }
  },
  "幅": {
    components: ["巾", "畐"],
    equation: "巾 (tấm vải dệt khổ lớn) + 畐 (tràn đầy mép biên)",
    mnemonic: "Tấm vải dệt căng tràn đầy trọn vẹn hai bên mép (畐), biểu thị bề rộng khổ vải, biên độ dao động.",
    illustration: {
      badge: "↔️",
      concept: "Bề rộng thênh thang",
      visualDesc: "Thước dây đo bề rộng căn phòng chuẩn xác từng centimet."
    }
  },
  "干": {
    components: ["干"],
    equation: "Cây cọc chữ T cắm phơi đồ đạc dưới nắng trời",
    mnemonic: "Cây sào dựng đứng phơi đồ khô ráo dưới nắng, biểu thị sự khô cằn, can dự và chiếc khiên.",
    illustration: {
      badge: "🛡️",
      concept: "Chiếc khiên vững chãi",
      visualDesc: "Chiếc khiên gỗ cổ kính viền đồng vững vàng ngăn chặn mọi mũi tên."
    }
  },
  "幼": {
    components: ["幺", "力"],
    equation: "幺 (sợi tơ mỏng manh non nớt) + 力 (sức lực còn yếu ớt)",
    mnemonic: "Sức lực còn yếu ớt (力) như sợi tơ nhỏ manh nha mới chào đời (幺), biểu thị lứa tuổi ấu thơ non nớt.",
    illustration: {
      badge: "🐣",
      concept: "Chú chim non chào đời",
      visualDesc: "Chú chim non hé mỏ đón giọt mồi mẹ mớm trong tổ ấm bình yên."
    }
  },
  "庁": {
    components: ["广", "丁"],
    equation: "广 (mái hiên công sở lớn) + 丁 (điểm mốc hành chính)",
    mnemonic: "Tòa nhà hành chính mái rộng uy nghiêm (广) nơi giải quyết công vụ giấy tờ cho dân chúng, cục, sảnh, cơ quan.",
    illustration: {
      badge: "🏛️",
      concept: "Tòa công sảnh",
      visualDesc: "Tòa nhà ủy ban thành phố khang trang với lá cờ tung bay trước tiền sảnh."
    }
  },
  "床": {
    components: ["广", "木"],
    equation: "广 (dưới mái nhà) + 木 (những tấm ván gỗ ghép phẳng)",
    mnemonic: "Dưới mái nhà ấm cúng (广), lát những tấm ván gỗ phẳng phiu mát rượi (木) làm sàn nhà và giường nằm êm ái.",
    illustration: {
      badge: "🛏️",
      concept: "Sàn gỗ bóng loáng",
      visualDesc: "Sàn gỗ tự nhiên lau bóng loáng phản chiếu ánh nắng ban mai ấm áp."
    }
  },
  "底": {
    components: ["广", "氐"],
    equation: "广 (không gian bên trong) + 氐 (điểm thấp nhất sát đất)",
    mnemonic: "Lần tìm xuống tận điểm sâu nhất chạm đáy đất dưới mái vòm (广 氐), biểu thị đáy sông, đáy lòng.",
    illustration: {
      badge: "⚓",
      concept: "Chạm tận đáy sâu",
      visualDesc: "Chiếc mỏ neo chìm sâu chạm vào lớp cát phẳng dưới đáy đại dương."
    }
  },
  "府": {
    components: ["广", "付"],
    equation: "广 (tòa dinh thự đồ sộ) + 付 (nơi lưu trữ công văn giấy tờ và báu vật)",
    mnemonic: "Tòa dinh thự lớn nơi lưu giữ sổ sách kho báu và điều hành việc quan, biểu thị phủ chúa, phủ huyện, chính phủ.",
    illustration: {
      badge: "🏛️",
      concept: "Tòa dinh phủ",
      visualDesc: "Dinh thự cổ với hàng cột đá trắng uy nghi biểu trưng cho trung tâm quyền lực."
    }
  },
  "庫": {
    components: ["广", "車"],
    equation: "广 (mái nhà che chắn) + 車 (những cỗ xe xếp đầy hàng hóa)",
    mnemonic: "Dưới mái nhà kho kiên cố (广) cất giữ những cỗ xe ngựa chở đầy của cải hàng hóa (車), nhà kho, kho báu.",
    illustration: {
      badge: "🏬",
      concept: "Nhà kho chứa hàng",
      visualDesc: "Dãy kệ nhà kho hiện đại xếp gọn gàng các kiện hàng chuẩn bị xuất kho."
    }
  },
  "延": {
    components: ["廴", "正"],
    equation: "Bước chân bước dạo trên con đường thênh thang kéo dài mãi",
    mnemonic: "Chân bước thong thả kéo dài thời gian trên con đường thênh thang, biểu thị sự kéo dài, trì hoãn, hoãn lại.",
    illustration: {
      badge: "⏳",
      concept: "Kéo dài thời hạn",
      visualDesc: "Đồng hồ cát lật ngược kéo dài thêm thời gian cho bài thi hoàn tất."
    }
  },
  "弱": {
    components: ["弓", "冫", "弓", "冫"],
    equation: "Hai cánh cung nhỏ mềm dẻo không đủ sức bắn xa",
    mnemonic: "Hai cánh cung nhỏ xíu mềm oặt dây cung lỏng lẻo không căng nổi mũi tên, biểu thị sự yếu ớt, suy nhược.",
    illustration: {
      badge: "🥀",
      concept: "Cành hoa yếu ớt",
      visualDesc: "Cành hoa mong manh nghiêng mình trước làn gió nhẹ cần được chở che."
    }
  },
  "律": {
    components: ["彳", "聿"],
    equation: "彳 (bước đi trên đường) + 聿 (cây bút chép điều luật nề nếp)",
    mnemonic: "Dùng cây bút lông (聿) ghi rõ từng bước đi khuôn phép trên đường đời (彳), định ra kỷ luật, quy luật, luật lệ.",
    illustration: {
      badge: "⚖️",
      concept: "Kỷ luật chuẩn mực",
      visualDesc: "Cuốn sách luật pháp bìa da mạ vàng mở ra các điều khoản công minh."
    }
  },
  "復": {
    components: ["彳", "𠂉", "日", "夂"],
    equation: "彳 (bước chân trên đường) + quay gót trở về chốn cũ",
    mnemonic: "Cất bước chân quay trở về con đường xưa nạp lại năng lượng (彳 复), phục hồi sức sống, khôi phục.",
    illustration: {
      badge: "🔄",
      concept: "Phục hồi sinh khí",
      visualDesc: "Mầm cây khô héo bỗng hồi sinh xanh tươi sau cơn mưa rào tưới mát."
    }
  },
  "快": {
    components: ["忄", "夬"],
    equation: "忄 (Tâm - trong lòng) + 夬 (bật mở then chắn thông suốt)",
    mnemonic: "Nút thắt trong lòng (忄) được bật tung giải tỏa nhẹ bẫng (夬), cảm giác vô cùng sảng khoái, vui sướng và nhanh chóng.",
    illustration: {
      badge: "😄",
      concept: "Khoan khoái dễ chịu",
      visualDesc: "Nụ cười rạng rỡ vươn hai tay đón làn gió mát lành từ biển thổi vào."
    }
  },
  "恋": {
    components: ["亠", "丷", "心"],
    equation: "Những mối tơ vương vấn đan cài trong trái tim (心)",
    mnemonic: "Bao sợi tơ vương vấn quấn quýt không rời quanh trái tim thổn thức (心), nỗi niềm tình yêu đôi lứa, luyến ái.",
    illustration: {
      badge: "💖",
      concept: "Tình yêu đôi lứa",
      visualDesc: "Trái tim hồng lấp lánh đôi chim bồ câu trao nhau nhánh cỏ tình yêu."
    }
  },
  "患": {
    components: ["串", "心"],
    equation: "Một chiếc que nhọn xuyên qua hai nỗi đau (串) đè nặng lên trái tim (心)",
    mnemonic: "Que nhọn đâm xuyên qua trái tim gây bao nỗi giày vò đau đớn (串 心), biểu thị tai họa hiểm nghèo, bệnh hoạn.",
    illustration: {
      badge: "🩹",
      concept: "Tai ương hoạn nạn",
      visualDesc: "Vết thương được băng bó cẩn thận nhắc nhở vượt qua hoạn nạn gian nguy."
    }
  },
  "悩": {
    components: ["忄", "㐫"],
    equation: "忄 (Tâm - nỗi lòng) + 㐫 (tâm tư rối bời trong óc)",
    mnemonic: "Trong lòng (忄) suy nghĩ quẩn quanh bế tắc không tìm được lối thoát, sinh ra bao nỗi phiền não trăn trở.",
    illustration: {
      badge: "🤦",
      concept: "Trăn trở suy tư",
      visualDesc: "Người ôm trán thở dài suy ngẫm giải pháp tháo gỡ bế tắc trong công việc."
    }
  },
  "憎": {
    components: ["忄", "曽"],
    equation: "忄 (Tâm - cảm xúc) + 曽 (sự bực bội tích tụ từng lớp qua năm tháng)",
    mnemonic: "Những nỗi ấm ức chất chồng thành từng tầng lớp trong lòng (忄 曽), biến thành mối căm thù oán ghét sâu sắc.",
    illustration: {
      badge: "😠",
      concept: "Căm ghét phẫn uất",
      visualDesc: "Ngọn lửa bốc khói đen kịt thể hiện cảm xúc oán ghét dồn nén."
    }
  },
  "戸": {
    components: ["戸"],
    equation: "Chữ tượng hình một cánh cửa gỗ bản lề",
    mnemonic: "Một cánh cửa gỗ khép mở ngăn chia gian phòng tổ ấm, đại diện cho từng căn nhà, hộ gia đình.",
    illustration: {
      badge: "🚪",
      concept: "Cánh cửa gỗ ấm cúng",
      visualDesc: "Cánh cửa gỗ đơn giản với tay nắm tròn mở hé đón luồng gió xuân ùa vào."
    }
  },
  "承": {
    components: ["㇇", "乛", "丨", "三"],
    equation: "Hai bàn tay cung kính đón nhận mệnh lệnh từ bề trên dâng trao",
    mnemonic: "Hai tay cung kính dang ra đón nhận chiếu chỉ và trọng trách trao xuống, thừa nhận, phụng mệnh tiếp nhận.",
    illustration: {
      badge: "🤲",
      concept: "Cung kính tiếp nhận",
      visualDesc: "Đôi bàn tay nâng niu cuộn chiếu thư biểu thị sự tiếp nhận và thừa nhận."
    }
  },
  "技": {
    components: ["扌", "支"],
    equation: "扌 (Thủ - đôi bàn tay) + 支 (chống đỡ uốn nắn thành thạo)",
    mnemonic: "Đôi bàn tay (扌) khéo léo uốn nắn điều khiển từng chi tiết nhịp nhàng thuần thục, tạo nên tài nghệ kỹ thuật.",
    illustration: {
      badge: "🔧",
      concept: "Kỹ năng điêu luyện",
      visualDesc: "Người thợ lành nghề thao tác nhịp nhàng chuẩn xác từng thao tác kỹ thuật."
    }
  },
  "担": {
    components: ["扌", "旦"],
    equation: "扌 (Thủ - cánh tay ghé vai) + 旦 (từ sáng sớm mai bắt đầu gánh)",
    mnemonic: "Từ sáng sớm tinh mơ (旦) đã đưa tay ghé vai gánh vác đòn gánh củi nặng (扌), gánh vác đảm trách.",
    illustration: {
      badge: "🏋️",
      concept: "Gánh vác trọng trách",
      visualDesc: "Người gánh đòn gánh thong dong bước đi đón ánh bình minh ban mai."
    }
  },
  "拝": {
    components: ["扌", "一", "一", "丨", "丨", "丨"],
    equation: "Hai bàn tay chắp lại ngay ngắn trước ngực thi lễ",
    mnemonic: "Hai bàn tay chắp lại ngay ngắn cúi đầu thành kính thi lễ trước đền thờ thần linh, bái lạy, bái tạ.",
    illustration: {
      badge: "🙏",
      concept: "Chắp tay bái lễ",
      visualDesc: "Đôi bàn tay chắp trang nghiêm trước điện thờ linh thiêng khói hương nghi ngút."
    }
  },
  "拾": {
    components: ["扌", "合"],
    equation: "扌 (Thủ - bàn tay) + 合 (gom nhặt các mảnh ghép lại với nhau)",
    mnemonic: "Đưa bàn tay (扌) cúi nhặt từng đồng xu rơi gom lại bỏ vào túi (合), thu lượm, nhặt được của rơi.",
    illustration: {
      badge: "🪙",
      concept: "Nhặt được đồng xu may mắn",
      visualDesc: "Bàn tay nhặt được đồng xu vàng lấp lánh dưới kẽ lá bên đường."
    }
  },
  "挟": {
    components: ["扌", "大", "从"],
    equation: "扌 (Thủ - bàn tay cầm kẹp) + 夾 (kẹp giữ đồ vật ở giữa)",
    mnemonic: "Dùng ngón tay (扌) kẹp chặt chiếc kẹp giữ đồ vật ở chính giữa không để rơi, kẹp vào giữa kẽ hẹp.",
    illustration: {
      badge: "📎",
      concept: "Chiếc kẹp giấy",
      visualDesc: "Chiếc kẹp ghim giấy bằng thép sáng bóng kẹp chặt tập tài liệu gọn gàng."
    }
  },
  "捜": {
    components: ["扌", "臼", "又"],
    equation: "扌 (Thủ - bàn tay lục lọi) + tay cầm ngọn đuốc soi từng góc tối",
    mnemonic: "Cầm ngọn đuốc đưa tay lục tìm từng ngõ ngách trong bóng đêm (扌 叟), tìm kiếm, truy tìm manh mối.",
    illustration: {
      badge: "🔍",
      concept: "Kính lúp truy tìm",
      visualDesc: "Kính lúp soi rõ từng dấu vết chân in trên cát trong cuộc tìm kiếm."
    }
  },
  "捨": {
    components: ["扌", "舍"],
    equation: "扌 (Thủ - bàn tay ném đi) + 舍 (dọn dẹp quán trọ)",
    mnemonic: "Bàn tay buông lỏng vứt bỏ đồ vật cũ không dùng nữa vào sọt rác (扌 舍), buông xả, từ bỏ gánh nặng.",
    illustration: {
      badge: "🗑️",
      concept: "Bỏ rác đúng nơi",
      visualDesc: "Thùng rác phân loại gọn gàng sạch sẽ nơi công cộng sẵn sàng tiếp nhận đồ bỏ."
    }
  },
  "掃": {
    components: ["扌", "帚"],
    equation: "扌 (Thủ - bàn tay) + 帚 (cây chổi rơm quét bụi bẩn)",
    mnemonic: "Bàn tay cầm cây chổi (扌 帚) lia đều trên mặt sàn quét sạch mọi bụi bẩn rác rưởi, quét dọn tinh tươm.",
    illustration: {
      badge: "🧹",
      concept: "Quét dọn sạch sẽ",
      visualDesc: "Cây chổi quét sạch những chiếc lá rụng xào xạc trên lối đi lát sỏi."
    }
  },
  "掘": {
    components: ["扌", "屈"],
    equation: "扌 (Thủ - bàn tay vung xẻng) + 屈 (khom lưng đào sâu xuống lòng đất)",
    mnemonic: "Khom lưng vung chiếc xẻng sắt đào sâu xuống lòng đất tìm nguồn nước (扌 屈), đào bới, khai quật cổ vật.",
    illustration: {
      badge: "⛏️",
      concept: "Khai quật cổ vật",
      visualDesc: "Chiếc xẻng khảo cổ đào hé lộ chiếc bình gốm cổ nghìn năm dưới lòng đất."
    }
  },
  "採": {
    components: ["扌", "爫", "木"],
    equation: "扌 (Thủ - bàn tay vươn lên) + 采 (ngắt từng quả chín trên cành cây)",
    mnemonic: "Vươn bàn tay (扌) hái từng trái chín mọng ngon ngọt nhất trên cành cây (采), hái lượm, tuyển chọn.",
    illustration: {
      badge: "🍎",
      concept: "Thu hái quả ngọt",
      visualDesc: "Giỏ mây đầy ắp những trái táo chín mọng vừa được hái trên cành cây."
    }
  },
  "接": {
    components: ["扌", "妾"],
    equation: "扌 (Thủ - bàn tay chạm vào) + gắn kết gần gũi thân mật",
    mnemonic: "Đưa bàn tay ra chạm tiếp xúc gắn kết nối liền đôi bên (扌 妾), tiếp xúc thân cận, trực tiếp nối tiếp.",
    illustration: {
      badge: "🤝",
      concept: "Tiếp xúc gắn kết",
      visualDesc: "Hai bàn tay chạm vào nhau thể hiện sự tiếp xúc nồng ấm và kết nối."
    }
  },
  "換": {
    components: ["扌", "奐"],
    equation: "扌 (Thủ - bàn tay đổi chác) + 奐 (đổi cũ lấy mới rạng rỡ)",
    mnemonic: "Đưa tay trao món đồ cũ đổi lấy món đồ mới tinh tươm hơn (扌 奐), hoán đổi, thay thế cho tốt hơn.",
    illustration: {
      badge: "💱",
      concept: "Đổi tiền hoán đổi",
      visualDesc: "Ký hiệu hai đồng tiền quy đổi cho nhau tượng trưng cho sự hoán đổi giá trị."
    }
  },
  "損": {
    components: ["扌", "員"],
    equation: "扌 (Thủ - bàn tay sơ sảy) + 員 (đồ vật quý bị sứt mẻ rơi rớt)",
    mnemonic: "Sơ ý để bàn tay làm rơi vỡ món đồ quý giá (扌 員), chịu sự hao hụt, tổn thất và tổn thương.",
    illustration: {
      badge: "📉",
      concept: "Tổn thất hao hụt",
      visualDesc: "Biểu đồ sụt giảm thể hiện sự tổn thất hao hụt cần khắc phục."
    }
  },
  "改": {
    components: ["己", "攵"],
    equation: "己 (bản thân mình) + 攵 (cầm roi rèn giũa sửa đổi cho tốt hơn)",
    mnemonic: "Cầm roi nghiêm khắc uốn nắn bản thân sửa chữa sai lầm cũ (己 攵), cải cách, đổi mới tiến bộ.",
    illustration: {
      badge: "🛠️",
      concept: "Cải cách đổi mới",
      visualDesc: "Bàn tay sửa chữa chiếc đồng hồ tinh chỉnh lại từng bánh răng chạy chuẩn xác."
    }
  },
  "敬": {
    components: ["艹", "勹", "口", "攵"],
    equation: "Tự rèn giũa bản thân trong khuôn phép nghiêm cẩn cúi đầu tôn kính",
    mnemonic: "Giữ mình nghiêm cẩn trong khuôn phép lễ nghi, hướng lòng kính cẩn về bậc tiền bối, tôn kính, kính trọng.",
    illustration: {
      badge: "🙇‍♂️",
      concept: "Cung kính thi lễ",
      visualDesc: "Người cúi mình trang nhã chào kính cẩn trong không gian trà đạo thanh tao."
    }
  },
  "旧": {
    components: ["丨", "日"],
    equation: "Thanh gỗ rêu phong (丨) đứng dãi dầu qua bao ngày tháng (日)",
    mnemonic: "Thanh gỗ đứng phơi mình qua bao năm tháng ngày dài (日) nhuốm màu rêu phong, biểu thị sự xưa cũ, cựu trào.",
    illustration: {
      badge: "📻",
      concept: "Chiếc radio cổ",
      visualDesc: "Chiếc đài radio bằng gỗ cổ kính lưu giữ những bản nhạc xưa cũ êm dịu."
    }
  },
  "昇": {
    components: ["日", "升"],
    equation: "日 (mặt trời rạng rỡ) + 升 (chiếc gáo nâng bổng lên cao)",
    mnemonic: "Mặt trời (日) dần dần nhô lên cao khỏi đường chân trời tỏa ánh bình minh, thăng tiến thăng hoa.",
    illustration: {
      badge: "🌅",
      concept: "Mặt trời mọc thăng hoa",
      visualDesc: "Vầng thái dương đỏ ối nhô lên từ biển mây bừng sáng cả bầu trời."
    }
  },
  "星": {
    components: ["日", "生"],
    equation: "Nhật (nguồn sáng rực rỡ) + Sinh (sinh sôi lấp lánh giữa trời đêm)",
    mnemonic: "Những đốm sáng nhỏ sinh ra lấp lánh (生) như hàng ngàn mặt trời con (日) giữa trời đêm, ngôi sao tinh tú.",
    illustration: {
      badge: "⭐",
      concept: "Ngôi sao lấp lánh",
      visualDesc: "Ngôi sao vàng năm cánh tỏa ánh sáng lung linh rực rỡ trên bầu trời nhung huyền."
    }
  },
  "普": {
    components: ["並", "日"],
    equation: "Ánh mặt trời (日) chiếu rọi đồng đều chan hòa cho tất cả mọi người đứng ngang hàng (並)",
    mnemonic: "Ánh dương (日) chiếu tỏa đồng đều khắp muôn nơi không phân biệt ai, phổ biến rộng rãi cho toàn thể muôn dân.",
    illustration: {
      badge: "🌐",
      concept: "Phổ biến rộng rãi",
      visualDesc: "Mạng lưới kết nối toàn cầu phủ sóng rộng rãi khắp năm châu bốn biển."
    }
  },
  "暴": {
    components: ["日", "共", "氺"],
    equation: "Nắng lửa dữ dội thiêu rụi dòng nước trơ trọi đất đá hung tợn",
    mnemonic: "Ánh nắng gay gắt như thiêu đốt làm cạn khô dòng nước bộc lộ tính khí hung tợn, bạo lực, giông bão.",
    illustration: {
      badge: "⚡",
      concept: "Cơn thịnh nộ bão táp",
      visualDesc: "Cơn bão biển cuồn cuộn gầm thét với những con sóng dữ dội."
    }
  },
  "曇": {
    components: ["日", "雲"],
    equation: "日 (mặt trời) + 雲 (đám mây dày xám xịt che lấp)",
    mnemonic: "Vầng mặt trời (日) bị những đám mây đen dày đặc (雲) che khuất ánh sáng, thời tiết âm u nhiều mây.",
    illustration: {
      badge: "☁️",
      concept: "Trời nhiều mây che nắng",
      visualDesc: "Đám mây xám bạc bồng bềnh che khuất vầng mặt trời dịu mát bầu không khí."
    }
  },
  "替": {
    components: ["夫", "夫", "日"],
    equation: "Hai người (夫 夫) luân phiên đổi ca trực cho nhau theo từng ngày (日)",
    mnemonic: "Hai người đàn ông thay phiên đổi ca trực cho nhau sau mỗi ngày (日), thay thế, đổi chác, luân phiên.",
    illustration: {
      badge: "🔄",
      concept: "Thay ca luân phiên",
      visualDesc: "Đồng hồ đổi ca trực nhịp nhàng chuyển giao nhiệm vụ cho người tiếp theo."
    }
  },
  "札": {
    components: ["木", "乚"],
    equation: "木 (thanh gỗ mỏng) + 乚 (nét móc khắc dấu tên lên thẻ)",
    mnemonic: "Miếng gỗ mỏng khắc chữ dùng làm thẻ bài ghi tên hoặc tấm vé, tờ tiền giấy thẻ trát.",
    illustration: {
      badge: "🏷️",
      concept: "Tấm thẻ treo tên",
      visualDesc: "Chiếc thẻ gỗ Ema xinh xắn treo trước hiên đền mang theo lời chúc bình an."
    }
  },
  "机": {
    components: ["木", "几"],
    equation: "木 (Mộc - chất liệu gỗ bền) + 几 (chiếc kỷ con ngồi dựa)",
    mnemonic: "Đóng bằng gỗ cây chắc chắn (木) kết hợp chiếc ghế nhỏ ngồi viết lách (几), chiếc bàn học, bàn làm việc.",
    illustration: {
      badge: "🪑",
      concept: "Bàn học bằng gỗ",
      visualDesc: "Chiếc bàn học gỗ mộc mạc ngăn nắp với đèn bàn và cuốn sách mở sẵn."
    }
  },
  "材": {
    components: ["木", "才"],
    equation: "木 (thân cây gỗ) + 才 (bàn tay tài hoa đẽo gọt thành vật liệu)",
    mnemonic: "Cây gỗ trong rừng (木) qua bàn tay người thợ tài hoa biến thành vật liệu xây dựng quý giá, tài liệu, vật liệu.",
    illustration: {
      badge: "🪵",
      concept: "Khúc gỗ xẻ thành ván",
      visualDesc: "Những khúc gỗ xẻ vuông vức xếp ngay ngắn sẵn sàng cho công trình xây dựng."
    }
  },
  "村": {
    components: ["木", "寸"],
    equation: "木 (rặng cây quanh xóm) + 寸 (tấc đất quê hương đầm ấm)",
    mnemonic: "Rặng cây cổ thụ xanh mát (木) bao bọc từng tấc đất mái nhà thân thương (寸), ngôi làng quê, thôn bản.",
    illustration: {
      badge: "🏡",
      concept: "Thôn làng yên bình",
      visualDesc: "Ngôi làng nhỏ yên bình nép mình dưới rặng thông xanh bên bờ suối róc rách."
    }
  },
  "板": {
    components: ["木", "反"],
    equation: "木 (Mộc - khúc gỗ) + 反 (xẻ lát phẳng lật sang hai mặt)",
    mnemonic: "Khúc gỗ tròn (木) được cưa xẻ lật phẳng hai mặt nhẵn bóng (反), tạo thành tấm ván gỗ, bảng đen.",
    illustration: {
      badge: "🛹",
      concept: "Tấm ván trượt gỗ",
      visualDesc: "Chiếc ván trượt gỗ ép bóng loáng với bánh xe xoay tít lướt trên đường phố."
    }
  },
  "林": {
    components: ["木", "木"],
    equation: "Hai cây gỗ (木 + 木) đứng cạnh nhau thành hàng",
    mnemonic: "Hai cây đứng cạnh nhau tạo thành rặng cây xanh mướt râm mát, khu rừng nhỏ, rừng thưa.",
    illustration: {
      badge: "🌲🌲",
      concept: "Rặng cây rừng nhỏ",
      visualDesc: "Rặng cây thông xanh mướt đứng song song đón ánh nắng ban mai rực rỡ."
    }
  },
  "枚": {
    components: ["木", "攵"],
    equation: "木 (thanh gỗ dẹt mỏng) + vector (tay đếm từng phiến gỗ)",
    mnemonic: "Cầm từng phiến gỗ mỏng hoặc tờ giấy trên tay đếm lần lượt (木 攵), dùng làm đơn vị đếm tờ giấy, tấm ván.",
    illustration: {
      badge: "📄",
      concept: "Tờ giấy Washi phẳng",
      visualDesc: "Từng tờ giấy truyền thống Washi trắng mịn đặt ngay ngắn trên bàn vẽ."
    }
  },
  "枝": {
    components: ["木", "支"],
    equation: "木 (Mộc - thân cây cổ thụ) + 支 (nhánh nhỏ vươn ra nâng đỡ lá)",
    mnemonic: "Từ thân cây lớn (木) mọc đâm chồi những cành nhánh nhỏ vươn ra đón ánh sáng (支), cành cây, chi nhánh.",
    illustration: {
      badge: "🌿",
      concept: "Cành hoa đào đâm chồi",
      visualDesc: "Cành hoa anh đào khẳng khiu điểm xuyết những nụ hoa hồng phấn hé nở."
    }
  },
  "枯": {
    components: ["木", "古"],
    equation: "木 (Mộc - cành cây) + 古 (già cỗi cằn cỗi hết nhựa sống)",
    mnemonic: "Cành cây (木) qua năm tháng già cỗi cạn kiệt nhựa sống (古) trở nên héo úa rụng lá, khô héo tàn lụi.",
    illustration: {
      badge: "🍂",
      concept: "Cành cây khô héo",
      visualDesc: "Cành cây khô khẳng khiu trơ trọi giữa mùa đông lạnh giá chờ xuân sang."
    }
  },
  "柔": {
    components: ["矛", "木"],
    equation: "Ngọn giáo nhọn được làm từ thân cành cây gỗ dẻo dai (木)",
    mnemonic: "Cành cây gỗ uốn cong mềm mại dẻo dai (木) có thể bẻ không gãy, lấy nhu thắng cương, mềm dẻo nhu đạo.",
    illustration: {
      badge: "🥋",
      concept: "Võ đạo Nhu đạo Judo",
      visualDesc: "Võ sĩ Judo thực hiện đòn ném uyển chuyển lấy sự mềm dẻo khắc chế sức mạnh."
    }
  },
  "柱": {
    components: ["木", "主"],
    equation: "木 (thân gỗ tròn thẳng đứng) + 主 (vị trí chủ lực nâng đỡ ngôi nhà)",
    mnemonic: "Thân cây gỗ lim tròn trịa đứng vững chãi nâng đỡ toàn bộ ngôi nhà (木 主), cột nhà, trụ cột gia đình.",
    illustration: {
      badge: "🏛️",
      concept: "Cột trụ bằng đá uy nghiêm",
      visualDesc: "Hàng cột gỗ tròn vững chãi nâng đỡ mái đền cổ uy nghiêm nghìn năm."
    }
  },
  "査": {
    components: ["木", "旦"],
    equation: "Thanh gỗ làm giá soi chiếu xem xét từng chi tiết kỹ lưỡng",
    mnemonic: "Đặt đối tượng lên giá gỗ soi xét cẩn trọng từng đường nét không bỏ sót lỗi nào, kiểm tra tra xét.",
    illustration: {
      badge: "🔍",
      concept: "Kiểm tra kỹ lưỡng",
      visualDesc: "Kính hiển vi phóng đại mẫu vật phục vụ công tác tra xét kiểm định chuẩn xác."
    }
  },
  "栄": {
    components: ["⺍", "冖", "木"],
    equation: "Cây xanh (木) bừng nở ngàn hoa rực rỡ lấp lánh như ánh đèn",
    mnemonic: "Cây cối trổ hoa rực rỡ sum suê bừng sáng cả góc trời (木), biểu thị sự hưng thịnh phồn vinh, vinh quang.",
    illustration: {
      badge: "🏆",
      concept: "Vinh quang chói lọi",
      visualDesc: "Vòng nguyệt quế vàng óng ánh tôn vinh thành tích vinh quang chói lọi."
    }
  },
  "根": {
    components: ["木", "艮"],
    equation: "木 (Mộc - cây cối) + 艮 (cắm sâu kiên định vào lòng đất)",
    mnemonic: "Phần của cây cối (木) cắm sâu bám chặt kiên định vào lòng đất mẹ (艮), hút chất dinh dưỡng nuôi cây, gốc rễ căn nguyên.",
    illustration: {
      badge: "🌳",
      concept: "Gốc rễ cổ thụ",
      visualDesc: "Bộ rễ cây cổ thụ khổng lồ cắm sâu vào lòng đất đá vững chãi nghìn năm."
    }
  },
  "械": {
    components: ["木", "戒"],
    equation: "木 (khung gỗ) + 戒 (vũ khí phòng vệ gắn cơ cấu đòn bẩy)",
    mnemonic: "Khung gỗ lắp đặt cơ chế đòn bẩy và vũ khí vận hành chuẩn xác, khí giới, máy móc cơ khí.",
    illustration: {
      badge: "⚙️",
      concept: "Cơ cấu máy móc",
      visualDesc: "Cụm chi tiết cơ khí tinh xảo khớp nhau vận hành trong cỗ máy hiện đại."
    }
  },
  "棒": {
    components: ["木", "奉"],
    equation: "木 (thân gỗ tròn thẳng) + 奉 (hai tay cầm gậy luyện võ)",
    mnemonic: "Hai tay cầm chắc khúc gỗ thẳng tròn (木 奉) luyện tập côn bổng phòng thân, cây gậy, dùi cui gỗ.",
    illustration: {
      badge: "🦯",
      concept: "Cây gậy gỗ bóng",
      visualDesc: "Cây gậy tre nhẵn bóng dùng làm gậy chống bước vững chãi trên đường đồi."
    }
  },
  "森": {
    components: ["木", "木", "木"],
    equation: "Ba cây gỗ lớn (木 木 木) mọc um tùm chen chúc",
    mnemonic: "Rừng cây tầng tầng lớp lớp bạt ngàn muôn trùng cây lớn che bóng râm mát rượi, cánh rừng già thâm sâu.",
    illustration: {
      badge: "🌲🌲🌲",
      concept: "Khu rừng rậm rạp",
      visualDesc: "Cánh rừng nguyên sinh bạt ngàn với những tán cây cổ thụ cao vút chạm mây."
    }
  },
  "植": {
    components: ["木", "直"],
    equation: "木 (Mộc - mầm cây giống) + 直 (cắm thẳng đứng vào lòng đất)",
    mnemonic: "Cầm cây non (木) cắm ngay ngắn thẳng hàng (直) vào luống đất tơi xốp tưới nước vun xới, trồng trọt thực vật.",
    illustration: {
      badge: "🌱",
      concept: "Trồng cây ươm mầm",
      visualDesc: "Bàn tay cẩn thận vun luống đất trồng mầm cây xanh tươi đón nắng ấm."
    }
  },
  "極": {
    components: ["木", "亟"],
    equation: "木 (cây gỗ xà nóc) + vươn lên tới điểm mút cao nhất",
    mnemonic: "Cây xà gồ gỗ (木) vươn lên tận chóp đỉnh cao nhất của mái nhà đồ sộ, đỉnh điểm tột cùng, Bắc cực Nam cực.",
    illustration: {
      badge: "🧭",
      concept: "Điểm cực Bắc",
      visualDesc: "Cột mốc cắm trên tảng băng tuyết vĩnh cửu tại điểm cực Bắc của địa cầu."
    }
  },
  "橋": {
    components: ["木", "喬"],
    equation: "木 (những thanh gỗ dài) + 喬 (uốn cong vòm cung cao vút qua sông)",
    mnemonic: "Những thanh gỗ lớn (木) ghép uốn cong nhịp nhàng bắc qua dòng sông sâu (喬), cây cầu nối liền đôi bờ.",
    illustration: {
      badge: "🌉",
      concept: "Cây cầu gỗ cong đỏ",
      visualDesc: "Cây cầu gỗ sơn đỏ truyền thống uốn cong duyên dáng soi bóng mặt hồ hoa sen."
    }
  },
  "欧": {
    components: ["区", "欠"],
    equation: "Vùng đất phương Tây xa lạ (区) mở to miệng đón nhận văn minh mới (欠)",
    mnemonic: "Vùng đất xa xôi phía trời Tây với bao công trình kỳ vĩ khiến người trông thấy phải trầm trồ, châu Âu.",
    illustration: {
      badge: "🏰",
      concept: "Lâu đài cổ kính châu Âu",
      visualDesc: "Lâu đài kiến trúc gothic cổ kính soi bóng bên dòng sông Danube êm đềm."
    }
  },
  "武": {
    components: ["弋", "止"],
    equation: "Chỉ (止 dừng lại bước chân bạo lực) + ngọn giáo kích (弋)",
    mnemonic: "Cầm ngọn giáo (弋) với tinh thần thượng võ để ngăn chặn bạo lực giữ yên bờ cõi (止), võ thuật vũ trang.",
    illustration: {
      badge: "⚔️",
      concept: "Vũ đạo thượng võ",
      visualDesc: "Võ sĩ Samurai rút thanh kiếm Katana sáng loáng với phong thái uy dũng kiên định."
    }
  },
  "歴": {
    components: ["厂", "禾", "禾", "止"],
    equation: "Dưới vách núi đá dãi dầu qua bao mùa lúa chín (禾 禾) bàn chân dẫm bước qua (止)",
    mnemonic: "Từng bước chân (止) bước qua bao mùa gặt hái dưới chân vách đá sừng sững, trải qua năm tháng, lý lịch lịch sử.",
    illustration: {
      badge: "📜",
      concept: "Dòng chảy lịch sử",
      visualDesc: "Bản đồ thời gian ghi dấu những mốc son lịch sử hào hùng qua các triều đại."
    }
  },
  "殿": {
    components: ["尸", "共", "殳"],
    equation: "Đục đẽo công trình nguy nga + nơi thần dân cung kính dâng bái",
    mnemonic: "Tòa thành lâu đài nguy nga tráng lệ nơi vua chúa ngự trị, biểu thị cung điện điện hạ và tôn xưng kính trọng.",
    illustration: {
      badge: "🏯",
      concept: "Cung điện nguy nga",
      visualDesc: "Chính điện hoàng gia tráng lệ lộng lẫy dưới ánh hoàng hôn vàng rực rỡ."
    }
  },
  "毒": {
    components: ["龶", "毋"],
    equation: "Loại cây cỏ độc mọc lên có dấu cấm kỵ (毋) không được đụng vào",
    mnemonic: "Loài thảo mộc mọc dại chứa chất hiểm nguy gây hại đến tính mạng cấm tuyệt đối ăn vào (毋), độc hại thuốc độc.",
    illustration: {
      badge: "☠️",
      concept: "Biển cảnh báo chất độc",
      visualDesc: "Biển tam giác cảnh báo đầu lâu xương chéo cảnh báo chất độc nguy hiểm."
    }
  },
  "比": {
    components: ["匕", "匕"],
    equation: "Hai người (匕 + 匕) đứng sát bên nhau đọ tầm vóc",
    mnemonic: "Hai người đứng sát cạnh nhau để so đọ chiều cao và tài nghệ hơn kém, biểu thị sự so sánh, tỷ lệ.",
    illustration: {
      badge: "⚖️",
      concept: "So sánh cân nhắc",
      visualDesc: "Hai cán cân nâng lên đặt xuống so sánh đối chiếu giá trị của từng phương án."
    }
  },
  "毛": {
    components: ["毛"],
    equation: "Chữ tượng hình chùm lông vũ tơ uốn lượn mềm mại",
    mnemonic: "Từng sợi tơ lông thú mềm mại óng ả bao bọc giữ ấm cho cơ thể muôn thú, lông mao, sợi len.",
    illustration: {
      badge: "🧶",
      concept: "Cuộn len lông cừu",
      visualDesc: "Cuộn len lông cừu mềm mịn ấm áp dùng để đan chiếc khăn quàng mùa đông."
    }
  },
  "氷": {
    components: ["丶", "水"],
    equation: "Thủy (水 dòng nước) + dấu chấm (丶 đông đặc thành thể rắn)",
    mnemonic: "Giọt nước lỏng (水) gặp nhiệt độ âm đóng băng ngưng tụ thành khối đá rắn chắc lạnh buốt (丶), nước đá khối băng.",
    illustration: {
      badge: "🧊",
      concept: "Khối đá lạnh trong veo",
      visualDesc: "Khối băng đá trong suốt mát lạnh lấp lánh trong ly nước hoa quả mùa hè."
    }
  },
  "永": {
    components: ["永"],
    equation: "Dòng suối nguồn nhiều ngã rẽ tuôn chảy bất tận qua ngàn năm",
    mnemonic: "Dòng nước suối nguồn bất tận tuôn chảy miệt mài qua bao năm tháng không vơi cạn, biểu thị vĩnh cửu, vĩnh viễn.",
    illustration: {
      badge: "♾️",
      concept: "Dấu vô cực vĩnh hằng",
      visualDesc: "Vòng xoắn vô cực phát sáng biểu trưng cho sự trường tồn vĩnh cửu bất tận."
    }
  },
  "汗": {
    components: ["氵", "干"],
    equation: "氵 (Thủy - giọt nước rịn) + 干 (làm việc nhọc nhằn dưới nắng khô)",
    mnemonic: "Lao động nặng nhọc dưới nắng hè chang chang (干), từng giọt mồ hôi túa ra lăn dài trên trán (氵), mồ hôi hãn diện.",
    illustration: {
      badge: "💦",
      concept: "Giọt mồ hôi cần cù",
      visualDesc: "Vận động viên lau giọt mồ hôi trên trán sau chặng đua marathon nỗ lực."
    }
  },
  "汚": {
    components: ["氵", "于"],
    equation: "氵 (Thủy - dòng nước) + 于 (ứ đọng lâu ngày không thông bùn lầy)",
    mnemonic: "Dòng nước bị ứ đọng lại nơi bùn rác lâu ngày bốc mùi khó chịu (氵 于), ô nhiễm bẩn thỉu nhơ nhuốc.",
    illustration: {
      badge: "🧽",
      concept: "Lau sạch vết bẩn",
      visualDesc: "Miếng bọt biển lau sạch vết ố bẩn trên mặt bàn trả lại vẻ sáng bóng."
    }
  },
  "池": {
    components: ["氵", "也"],
    equation: "氵 (Thủy - làn nước) + 也 (lòng đất trũng lòng chảo trữ nước)",
    mnemonic: "Vùng đất trũng hình lòng chảo gom giữ làn nước trong mát phẳng lặng (氵 也), hình thành nên cái ao thả cá.",
    illustration: {
      badge: "🏞️",
      concept: "Ao cá thanh bình",
      visualDesc: "Hồ nước nhỏ nuôi cá Koi lấp lánh hoa sen nở rộ trong khuôn viên thiền viện."
    }
  },
  "汤": {
    components: ["氵", "𠃓"],
    equation: "氵 (Thủy - làn nước) + 𠃓 (hơi nước bốc nghi ngút từ nồi đun)",
    mnemonic: "Nước đun sôi sùng sục trên bếp lửa bốc khói hơi nghi ngút (氵 𠃓), bát canh súp nóng hổi, nước nóng onsen.",
    illustration: {
      badge: "🍲",
      concept: "Bát súp nóng hổi",
      visualDesc: "Bát canh súp miso bốc khói nghi ngút thơm lừng trong ngày đông se lạnh."
    }
  },
  "沈": {
    components: ["氵", "冘"],
    equation: "氵 (Thủy - vực nước) + 冘 (vật nặng rơi thẳng xuống đáy)",
    mnemonic: "Vật nặng buông tay rơi chìm nghỉm xuống tận đáy nước sâu thẳm (氵 冘), biểu thị sự chìm đắm, trầm tĩnh, trầm mặc.",
    illustration: {
      badge: "⚓",
      concept: "Mỏ neo chìm đáy nước",
      visualDesc: "Mỏ neo sắt từ từ chìm sâu xuyên qua làn nước biển tĩnh mịch."
    }
  },
  "河": {
    components: ["氵", "可"],
    equation: "氵 (Thủy - dòng nước lớn) + 可 (tiếng rì rào êm đềm xuôi dòng)",
    mnemonic: "Dòng nước lớn cuồn cuộn chảy êm đềm tưới mát cho ruộng đồng bao la (氵 可), con sông con hà giang sơn.",
    illustration: {
      badge: "🏞️",
      concept: "Dòng sông uốn lượn",
      visualDesc: "Dòng sông xanh biếc hiền hòa uốn lượn qua những cánh đồng hoa vàng."
    }
  },
  "沸": {
    components: ["氵", "弗"],
    equation: "氵 (Thủy - dòng nước) + 弗 (bọt nước sủi tăm cuộn trào)",
    mnemonic: "Lửa đun khiến ấm nước sôi sùng sục sủi tăm bọt trắng nổi cuồn cuộn (氵 弗), sôi lên, sôi nổi nhiệt tình.",
    illustration: {
      badge: "🫖",
      concept: "Ấm nước sôi reo",
      visualDesc: "Chiếc ấm trà bằng gang reo vang tiếng nước sôi bốc hơi trắng trên bếp than."
    }
  },
  "油": {
    components: ["氵", "由"],
    equation: "氵 (Thủy - chất lỏng sóng sánh) + 由 (chất dầu ép ra từ hạt giống cội nguồn)",
    mnemonic: "Chất lỏng sánh vàng óng ả ép ra từ hạt mè củ giống (氵 由), dầu ăn bổ dưỡng, dầu thô mỏ dầu.",
    illustration: {
      badge: "🫒",
      concept: "Dầu ô-liu vàng óng",
      visualDesc: "Chai dầu ô-liu trong vắt với giọt dầu vàng óng thơm ngậy rót ra đĩa."
    }
  },
  "況": {
    components: ["氵", "兄"],
    equation: "氵 (Thủy - dòng nước biến đổi) + 兄 (người quan sát thấu hiểu tình thế)",
    mnemonic: "Nhìn dòng nước lên xuống biến đổi khôn lường (氵 兄) để ứng biến tình thế cho khéo léo, tình huống, hiện trạng.",
    illustration: {
      badge: "📋",
      concept: "Báo cáo tình huống",
      visualDesc: "Bảng phân tích diễn biến tình huống với các phương án xử lý kịp thời."
    }
  },
  "泉": {
    components: ["白", "水"],
    equation: "Bạch (白 nước trong vắt màu bạc) + Thủy (水 dòng nước tuôn trào từ lòng đá)",
    mnemonic: "Từ kẽ đá ngầm tuôn trào dòng nước trong veo mát lành tinh khiết (白 水), con suối nguồn suối khoáng onsen.",
    illustration: {
      badge: "♨️",
      concept: "Suối nước khoáng Onsen",
      visualDesc: "Dòng suối nước khoáng nóng tự nhiên bốc hơi ấm áp giữa phong cảnh đá phủ rêu."
    }
  },
  "泊": {
    components: ["氵", "白"],
    equation: "氵 (Thủy - vùng nước lặng) + 白 (cánh buồm trắng hạ neo nghỉ đêm)",
    mnemonic: "Thuyền buồm trắng (白) ghé vào vùng vịnh nước lặng sóng (氵) hạ neo dừng lại nghỉ ngơi qua đêm, trú ngụ tá túc.",
    illustration: {
      badge: "⛵",
      concept: "Thuyền buồm đỗ bến",
      visualDesc: "Chiếc thuyền buồm trắng hạ neo yên bình bên cầu tàu trong ánh hoàng hôn tím."
    }
  },
  "波": {
    components: ["氵", "皮"],
    equation: "氵 (Thủy - nước biển) + 皮 (lớp màng da mặt nước nhấp nhô nhấp nhô)",
    mnemonic: "Gió thổi làm mặt nước (氵) nhấp nhô uốn lượn từng lớp như tấm da dập dềnh (皮), những con sóng bạc đầu.",
    illustration: {
      badge: "🌊",
      concept: "Con sóng biển vỗ bờ",
      visualDesc: "Những con sóng biển xanh biếc vỗ bờ tung bọt trắng xóa dập dềnh bờ cát."
    }
  },
  "泥": {
    components: ["氵", "尼"],
    equation: "氵 (Thủy - nước ứ đọng) + 尼 (đất cát nhão nhoẹt dính bết)",
    mnemonic: "Nước hòa lẫn với đất cát tạo thành lớp bùn lầy nhão nhoẹt dính bết vào chân (氵 尼), bùn đất lầy lội.",
    illustration: {
      badge: "🌱",
      concept: "Bùn lầy nuôi sen nở",
      visualDesc: "Đóa hoa sen trắng tinh khôi vươn lên nở rộ thơm ngát từ lớp bùn lầy."
    }
  },
  "浅": {
    components: ["氵", "戋"],
    equation: "氵 (Thủy - mặt nước) + 戋 (mức nước ít ỏi chỉ ngập mắt cá chân)",
    mnemonic: "Mực nước suối rút cạn chỉ còn ngập xâm xấp bàn chân (氵 戋), biểu thị sự nông cạn, thiển cận cạn hẹp.",
    illustration: {
      badge: "👣",
      concept: "Vũng nước nông cạn",
      visualDesc: "Dấu chân lội qua dòng suối cạn nhìn rõ từng viên sỏi tròn dưới đáy."
    }
  },
  "浴": {
    components: ["氵", "谷"],
    equation: "氵 (Thủy - gáo nước trong mát) + 谷 (hòa mình trong thung lũng suối nguồn)",
    mnemonic: "Ngâm mình dưới làn nước suối trong veo trong thung lũng (氵 谷) gột rửa sạch bụi trần, tắm rửa tắm nắng.",
    illustration: {
      badge: "🛁",
      concept: "Bồn tắm ngâm mình",
      visualDesc: "Bồn tắm gỗ hinoki bốc hơi ấm dịu dàng thư thái sau ngày dài lao động."
    }
  },
  "涙": {
    components: ["氵", "戸", "犬"],
    equation: "氵 (Thủy - giọt nước) + 戻 (quay trở lại nỗi niềm xúc động nghẹn ngào)",
    mnemonic: "Khi nỗi nhớ và cảm xúc dâng trào ùa về (戻), từng giọt nước mắt lăn dài trên khóe mắt (氵), giọt lệ rơi.",
    illustration: {
      badge: "😢",
      concept: "Giọt lệ xúc động",
      visualDesc: "Giọt nước mắt pha lê trong veo lăn trên gò má nghẹn ngào niềm vui hội ngộ."
    }
  }
};

const rootJsonPath = path.join(__dirname, '../kanji_full_database.json');
const publicJsonPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootJsPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicJsonPath, 'utf8'));

let count = 0;
for (const [char, patch] of Object.entries(n2bData)) {
  if (db[char]) {
    db[char].components = patch.components;
    db[char].equation = patch.equation;
    db[char].mnemonic = patch.mnemonic;
    db[char].illustration = patch.illustration;
    count++;
  } else {
    console.warn(`Không tìm thấy Kanji ${char} trong cơ sở dữ liệu!`);
  }
}

console.log(`[Batch 4B - N2 Part 2] Đã cập nhật thành công ${count} / ${Object.keys(n2bData).length} chữ Kanji N2.`);

fs.writeFileSync(publicJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsPath, 'window.KANJI_FULL_DATABASE = ' + JSON.stringify(db, null, 2) + ';\n', 'utf8');
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
