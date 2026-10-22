const fs = require('fs');
const path = require('path');

const n5Data = {
  "一": {
    components: ["一"],
    equation: "Bộ Nhất (一)",
    mnemonic: "Chữ tượng hình: Một nét vạch ngang chỉ một đơn vị, tượng trưng cho sự khởi đầu, ranh giới đất trời.",
    illustration: {
      badge: "1️⃣",
      concept: "Số một khởi nguyên",
      visualDesc: "Một nét gạch ngang duy nhất tượng trưng cho khởi đầu nguyên thủy, số một độc nhất vô nhị."
    }
  },
  "七": {
    components: ["一", "乚"],
    equation: "Nhất (一) + nét gập cong (乚)",
    mnemonic: "Chữ chỉ sự: Nhát gươm cắt ngang đường thẳng tạo thành hình số 7 sắc sảo.",
    illustration: {
      badge: "7️⃣",
      concept: "Số bảy biến ảo",
      visualDesc: "Hình dáng thanh gươm cắm xuống đất với nét cắt ngang qua biểu thị số bảy."
    }
  },
  "万": {
    components: ["一", "勹"],
    equation: "Nhất (一) + Bao (勹 dạng giản)",
    mnemonic: "Một (一) chiếc móc bao bọc (勹) gìn giữ kho báu chứa tới mười nghìn (vạn) của cải.",
    illustration: {
      badge: "🪙",
      concept: "Mười nghìn báu vật",
      visualDesc: "Chiếc móc khóa che chở kho báu chứa mười nghìn đồng tiền vàng quý giá."
    }
  },
  "三": {
    components: ["一", "二"],
    equation: "Một (一) + Hai (二)",
    mnemonic: "Chữ chỉ sự: Ba nét ngang tượng trưng cho ba cõi: Thiên - Địa - Nhân (Trời, Đất, Con người).",
    illustration: {
      badge: "3️⃣",
      concept: "Tam tài trời đất",
      visualDesc: "Ba nét ngang song song kết nối hài hòa giữa Trời, Đất và Con người."
    }
  },
  "上": {
    components: ["一", "卜"],
    equation: "Mặt mốc (一) + nét sổ chỉ lên (卜)",
    mnemonic: "Chữ chỉ sự: Nét sổ đứng vươn lên phía trên đường vạch ngang làm mốc, chỉ vị trí 'Ở trên'.",
    illustration: {
      badge: "⬆️",
      concept: "Hướng lên trên cao",
      visualDesc: "Từ đường mốc mặt đất, một nét thẳng vươn cao lên phía trên bầu trời."
    }
  },
  "下": {
    components: ["一", "卜"],
    equation: "Mặt mốc (一) + nét sổ chúc xuống (卜)",
    mnemonic: "Chữ chỉ sự: Nét sổ và nét chấm chúc xuống dưới đường vạch ngang làm mốc, chỉ vị trí 'Ở dưới'.",
    illustration: {
      badge: "⬇️",
      concept: "Hướng xuống phía dưới",
      visualDesc: "Từ đường chân trời, nét sổ chúc xuống dưới lòng đất phì nhiêu."
    }
  },
  "中": {
    components: ["口", "丨"],
    equation: "Khẩu (口 cái tâm) + Cổn (丨 mũi tên)",
    mnemonic: "Chữ chỉ sự: Mũi tên thẳng (丨) bắn xuyên qua chính giữa hồng tâm vòng tròn (口).",
    illustration: {
      badge: "🎯",
      concept: "Ở chính giữa tâm",
      visualDesc: "Mũi tên xuyên thẳng vào điểm trung tâm hồng tâm bia bắn."
    }
  },
  "九": {
    components: ["丿", "乙"],
    equation: "Phiệt (丿) + Ất (乙)",
    mnemonic: "Chữ chỉ sự: Dáng cánh tay co gập dồn sức lực, biểu thị số 9 tột cùng của chữ số đơn.",
    illustration: {
      badge: "9️⃣",
      concept: "Số chín tột cùng",
      visualDesc: "Cánh tay uốn lượn dũng mãnh tượng trưng cho con số chín uy quyền."
    }
  },
  "二": {
    components: ["一", "一"],
    equation: "Nhất (一) + Nhất (一)",
    mnemonic: "Chữ chỉ sự: Hai nét ngang song song tượng trưng cho hai cực âm dương cân bằng, trời và đất.",
    illustration: {
      badge: "2️⃣",
      concept: "Số hai âm dương",
      visualDesc: "Hai đường kẻ song song đối xứng tượng trưng cho đôi bạn đồng hành."
    }
  },
  "五": {
    components: ["二", "乂"],
    equation: "Nhị (二 trời đất) + nét chéo đan xen (乂)",
    mnemonic: "Chữ chỉ sự: Sự kết nối đan xen giữa trời và đất tạo nên số năm (năm ngón trên bàn tay).",
    illustration: {
      badge: "5️⃣",
      concept: "Số năm đan kết",
      visualDesc: "Bàn tay năm ngón mở rộng nắm bắt sự biến chuyển của ngũ hành."
    }
  },
  "人": {
    components: ["丿", "乀"],
    equation: "Bộ Nhân (人)",
    mnemonic: "Chữ tượng hình: Dáng người đứng hai chân vững vàng trên mặt đất, hai nét tựa vào nhau mà sống.",
    illustration: {
      badge: "🚶",
      concept: "Dáng người đứng thẳng",
      visualDesc: "Con người hai chân vững chãi bước đi và luôn cần nương tựa nâng đỡ lẫn nhau."
    }
  },
  "今": {
    components: ["亼", "㇇"],
    equation: "Tập (亼 gom lại) + nét gấp thời khắc",
    mnemonic: "Chữ hội ý: Mọi sự việc gom lại ngay dưới mái nhà này, chính là thời điểm hiện tại, bây giờ.",
    illustration: {
      badge: "⏰",
      concept: "Hiện tại bây giờ",
      visualDesc: "Chiếc đồng hồ điểm đúng khoảnh khắc hiện tại ngay trước mắt bạn."
    }
  },
  "休": {
    components: ["亻", "木"],
    equation: "亻 (Nhân đứng) + 木 (Mộc)",
    mnemonic: "Chữ hội ý: Người (亻) tựa lưng vào gốc cây (木) râm mát để nghỉ ngơi sau buổi làm việc.",
    illustration: {
      badge: "🧘",
      concept: "Nghỉ ngơi bóng cây",
      visualDesc: "Người lao động thảnh thơi tựa lưng dưới bóng mát tán cây cổ thụ đại ngàn."
    }
  },
  "何": {
    components: ["亻", "可"],
    equation: "亻 (Nhân đứng) + 可 (Khả - gánh vác)",
    mnemonic: "Chữ hội ý: Người (亻) đang gánh vật gì (可) nặng trĩu trên vai thế kia?",
    illustration: {
      badge: "❓",
      concept: "Hỏi han cái gì",
      visualDesc: "Người bộ hành trên vai gánh đồ ngoái lại hỏi han xem có chuyện gì."
    }
  },
  "先": {
    components: ["𠂉", "儿"],
    equation: "Chi sinh (mầm non ở trên) + Nhi (儿 chân người)",
    mnemonic: "Chữ hội ý: Đôi chân (儿) bước đi trước dẫn đầu mở lối cho thế hệ mai sau.",
    illustration: {
      badge: "🏃",
      concept: "Đi bước trước tiên",
      visualDesc: "Người dẫn đường sải bước chân đi trước tiên mở lối trên con đường mới."
    }
  },
  "入": {
    components: ["入"],
    equation: "Bộ Nhập (入)",
    mnemonic: "Chữ tượng hình: Hai nét chúc vào trong như dáng người cúi đầu bước vào bên trong cánh cửa.",
    illustration: {
      badge: "🚪",
      concept: "Bước vào bên trong",
      visualDesc: "Cánh cửa hé mở đón bước chân người bước vào tổ ấm."
    }
  },
  "八": {
    components: ["八"],
    equation: "Bộ Bát (八)",
    mnemonic: "Chữ tượng hình: Hai nét tách mở sang hai bên, biểu thị sự phân chia xòe rộng của số 8.",
    illustration: {
      badge: "8️⃣",
      concept: "Số tám xòe rộng",
      visualDesc: "Hai nét xòe rộng sang hai phía mang ý nghĩa phát tài rộng mở."
    }
  },
  "六": {
    components: ["亠", "八"],
    equation: "Đầu (亠) + Bát (八)",
    mnemonic: "Chữ chỉ sự: Mái nhà nhỏ (亠) có hai chân (八) choãi ra vững chãi, cấu thành số 6.",
    illustration: {
      badge: "6️⃣",
      concept: "Số sáu vững vàng",
      visualDesc: "Căn chòi nhỏ đứng vững trên sáu cột chống giữa thiên nhiên."
    }
  },
  "円": {
    components: ["冂", "一"],
    equation: "Quynh (冂) + các nét ngang dọc trong lòng",
    mnemonic: "Chữ tượng hình: Chiếc khung tròn đầy đặn bao quanh đồng tiền Yên Nhật Bản.",
    illustration: {
      badge: "💴",
      concept: "Đồng Yên tròn trịa",
      visualDesc: "Đồng tiền xu Yên Nhật Bản tròn xoe lấp lánh ánh kim."
    }
  },
  "出": {
    components: ["屮", "凵"],
    equation: "Triệt (屮 mầm cây) + Khảm (凵 hố đất)",
    mnemonic: "Chữ tượng hình: Mầm cây (屮) vươn mình ra khỏi hố đất (凵), biểu thị việc ra ngoài, xuất phát.",
    illustration: {
      badge: "📤",
      concept: "Vươn ra bên ngoài",
      visualDesc: "Mầm xanh vươn mình ra khỏi mặt đất chào đón ngày mới."
    }
  },
  "分": {
    components: ["八", "刀"],
    equation: "Bát (八 phân đôi) + Đao (刀 con dao)",
    mnemonic: "Chữ hội ý: Dùng con dao (刀) chia tách (八) một vật thành nhiều phần nhỏ, phút giây.",
    illustration: {
      badge: "🔪",
      concept: "Chia tách từng phần",
      visualDesc: "Lưỡi dao sắc bén chia bánh ngọt thành các phần đều đặn cho mọi người."
    }
  },
  "前": {
    components: ["䒑", "月", "刂"],
    equation: "Tiền thân có Chu (thuyền) + Đao (刂 dao) + bước chân",
    mnemonic: "Chữ hội ý: Mũi thuyền rẽ sóng lướt thẳng về phía trước trên mặt nước.",
    illustration: {
      badge: "⛵",
      concept: "Tiến về phía trước",
      visualDesc: "Cánh buồm trắng no gió lướt nhanh về phía chân trời phía trước."
    }
  },
  "北": {
    components: ["匕", "匕"],
    equation: "Hai người (匕) quay lưng lại với nhau",
    mnemonic: "Chữ hội ý: Hai người quay lưng lại với nhau vì tránh cơn gió lạnh buốt từ phương Bắc.",
    illustration: {
      badge: "🧭",
      concept: "Phương Bắc gió lạnh",
      visualDesc: "Kim la bàn chỉ về hướng Bắc nơi có tuyết trắng phủ ngọn núi xa."
    }
  },
  "十": {
    components: ["十"],
    equation: "Bộ Thập (十)",
    mnemonic: "Chữ chỉ sự: Nét ngang và nét dọc giao nhau trọn vẹn bốn phương, biểu thị số mười hoàn hảo.",
    illustration: {
      badge: "🔟",
      concept: "Số mười hoàn hảo",
      visualDesc: "Hai đường kẻ ngang dọc giao nhau thập toàn thập mỹ."
    }
  },
  "千": {
    components: ["丿", "十"],
    equation: "Phiệt (丿) + Thập (十)",
    mnemonic: "Chữ chỉ sự: Thêm nét phẩy lên trên số mười (十) để nhân lên thành số một nghìn (1.000).",
    illustration: {
      badge: "💯",
      concept: "Một nghìn dặm xa",
      visualDesc: "Đoàn người cất bước trên con đường dài một nghìn dặm thiên lý."
    }
  },
  "午": {
    components: ["𠂉", "十"],
    equation: "Can Ngọ (hình chiếc chày đâm thóc giơ thẳng)",
    mnemonic: "Chữ tượng hình: Chiếc chày dựng thẳng lúc mặt trời chiếu bóng đứng giữa trưa chính ngọ.",
    illustration: {
      badge: "🕛",
      concept: "Giữa trưa chính ngọ",
      visualDesc: "Mặt trời lên cao nhất đúng 12 giờ trưa rọi bóng thẳng đứng xuống đất."
    }
  },
  "半": {
    components: ["八", "十"],
    equation: "Bát (八 chia đôi) + Thập (十)",
    mnemonic: "Chữ chỉ sự: Đường vạch chia đôi một vật thành hai nửa hoàn toàn bằng nhau.",
    illustration: {
      badge: "🌓",
      concept: "Một nửa chia đôi",
      visualDesc: "Quả táo được bổ đôi thành hai nửa cân xứng tròn trịa."
    }
  },
  "南": {
    components: ["十", "冂", "羊(giản)"],
    equation: "Thập (十) + Quynh (冂) + hoa cỏ phương Nam",
    mnemonic: "Chữ tượng hình: Nhạc cụ cổ treo trong khung nhà hướng về phương Nam ấm áp rực rỡ hoa cỏ.",
    illustration: {
      badge: "🌴",
      concept: "Phương Nam ấm áp",
      visualDesc: "Ánh nắng vàng phương Nam sưởi ấm rặng cây tốt tươi quanh năm."
    }
  },
  "友": {
    components: ["𠂇", "又"],
    equation: "Hựu (又 bàn tay) + bàn tay đan nhau",
    mnemonic: "Chữ hội ý: Hai bàn tay nắm chặt lấy nhau cùng tiến bước, biểu thị tình bạn bè gắn bó.",
    illustration: {
      badge: "🤝",
      concept: "Bạn bè nắm tay",
      visualDesc: "Hai bàn tay siết chặt lấy nhau khẳng định tình bạn tri kỷ bền lâu."
    }
  },
  "右": {
    components: ["𠂇", "口"],
    equation: "Bàn tay (𠂇) + Khẩu (口 cái miệng)",
    mnemonic: "Chữ hội ý: Bàn tay thuận đưa thức ăn vào miệng (口) chính là tay bên phải.",
    illustration: {
      badge: "➡️",
      concept: "Phía bên tay phải",
      visualDesc: "Bàn tay cầm đũa đưa miếng ngon vào miệng ở phía bên phải."
    }
  },
  "名": {
    components: ["夕", "口"],
    equation: "Tịch (夕 buổi tối) + Khẩu (口 cái miệng)",
    mnemonic: "Chữ hội ý: Đêm tối (夕) không thấy rõ mặt nhau, phải dùng miệng (口) xưng tên gọi.",
    illustration: {
      badge: "🏷️",
      concept: "Xưng danh tên gọi",
      visualDesc: "Dưới ánh trăng mờ, cất tiếng gọi tên nhau để nhận ra bạn hiền."
    }
  },
  "四": {
    components: ["囗", "儿"],
    equation: "Vi (囗 khung bao) + Nhi (儿 hai chân)",
    mnemonic: "Chữ chỉ sự: Khung cửa bốn cạnh bao quanh hai dải rèm buông rủ, biểu thị số 4.",
    illustration: {
      badge: "4️⃣",
      concept: "Số bốn góc cạnh",
      visualDesc: "Khung cửa sổ vuông vức bốn cạnh mở ra ngắm cảnh trời mây."
    }
  },
  "国": {
    components: ["囗", "玉"],
    equation: "Vi (囗 biên cương) + Ngọc (玉 viên ngọc báu)",
    mnemonic: "Chữ hội ý: Biên cương bốn bề (囗) bao bọc giữ gìn viên ngọc quý (玉) của giang sơn đất nước.",
    illustration: {
      badge: "🏯",
      concept: "Giang sơn đất nước",
      visualDesc: "Thành quách uy nghiêm bao bọc viên ngọc quốc bảo của non sông."
    }
  },
  "土": {
    components: ["土"],
    equation: "Bộ Thổ (土)",
    mnemonic: "Chữ tượng hình: Mầm cây nhú lên từ vạch đất bên dưới, tượng trưng cho Đất mẹ phì nhiêu.",
    illustration: {
      badge: "🪴",
      concept: "Đất đai màu mỡ",
      visualDesc: "Hạt mầm nhú mầm xanh tươi tốt từ lớp đất nâu phì nhiêu."
    }
  },
  "外": {
    components: ["夕", "卜"],
    equation: "Tịch (夕 buổi tối) + Bặc (卜 quẻ bói)",
    mnemonic: "Chữ hội ý: Đêm tối (夕) cầm quẻ bói (卜) bước ra bên ngoài sân ngắm trăng để bói toán.",
    illustration: {
      badge: "🚪",
      concept: "Đi ra bên ngoài",
      visualDesc: "Cánh cửa mở ra dẫn lối bước chân ra ngoài hít thở khí trời tự do."
    }
  },
  "大": {
    components: ["大"],
    equation: "Bộ Đại (大)",
    mnemonic: "Chữ tượng hình: Hình dáng con người dang rộng cả hai tay và hai chân để biểu thị sự to lớn.",
    illustration: {
      badge: "🐘",
      concept: "Vóc dáng to lớn",
      visualDesc: "Con người dang rộng hai tay ôm trọn đất trời biểu thị tầm vóc to lớn."
    }
  },
  "天": {
    components: ["一", "大"],
    equation: "Nhất (一 vòm trời) + Đại (大 người vươn cao)",
    mnemonic: "Chữ chỉ sự: Phía trên đỉnh đầu của con người to lớn (大) là vòm trời (一) bao la vô tận.",
    illustration: {
      badge: "☁️",
      concept: "Bầu trời bao la",
      visualDesc: "Khoảng không xanh thẳm vời vợi trên đỉnh đầu con người là bầu trời cao vút."
    }
  },
  "女": {
    components: ["女"],
    equation: "Bộ Nữ (女)",
    mnemonic: "Chữ tượng hình: Dáng người phụ nữ ngồi khoanh tay đoan trang, dịu dàng.",
    illustration: {
      badge: "💃",
      concept: "Người phụ nữ dịu hiền",
      visualDesc: "Người phụ nữ duyên dáng với nét mặt nhu thuận và nụ cười hiền hậu."
    }
  },
  "子": {
    components: ["子"],
    equation: "Bộ Tử (子)",
    mnemonic: "Chữ tượng hình: Đứa trẻ sơ sinh quấn tã đang dang rộng hai bàn tay nhỏ bé vẫy chào thế giới.",
    illustration: {
      badge: "👶",
      concept: "Đứa trẻ thơ ngây",
      visualDesc: "Em bé sơ sinh mỉm cười dang hai tay nhỏ vẫy gọi tình yêu thương."
    }
  },
  "学": {
    components: ["⺌", "冖", "子"],
    equation: "Tiểu đầu (⺌) + Mịch (冖 mái che) + Tử (子 đứa trẻ)",
    mnemonic: "Chữ hội ý: Đứa trẻ (子) dưới mái trường (冖) tiếp thu từng kiến thức nhỏ bé (⺌) để thành tài.",
    illustration: {
      badge: "🎓",
      concept: "Đứa trẻ học hành",
      visualDesc: "Học trò ngồi ngay ngắn dưới mái trường say mê đọc từng trang sách."
    }
  },
  "小": {
    components: ["小"],
    equation: "Bộ Tiểu (小)",
    mnemonic: "Chữ chỉ sự: Một vật bị chẻ tách đôi hai bên, biểu thị sự nhỏ bé, vụn vặt.",
    illustration: {
      badge: "🐥",
      concept: "Nhỏ bé đáng yêu",
      visualDesc: "Chú chim non bé nhỏ líu lo trên cành cây đầu mùa xuân."
    }
  },
  "山": {
    components: ["山"],
    equation: "Bộ Sơn (山)",
    mnemonic: "Chữ tượng hình: Ba ngọn núi trùng điệp nhấp nhô vươn lên giữa đất trời, đỉnh cao nhất ở giữa.",
    illustration: {
      badge: "⛰️",
      concept: "Ba đỉnh núi cao",
      visualDesc: "Dãy núi hùng vĩ ba đỉnh nhấp nhô sừng sững giữa mây ngàn."
    }
  },
  "川": {
    components: ["川"],
    equation: "Bộ Xuyên (川)",
    mnemonic: "Chữ tượng hình: Ba nét uốn lượn tượng trưng cho dòng nước chảy cuồn cuộn giữa hai bờ sông.",
    illustration: {
      badge: "🌊",
      concept: "Dòng sông uốn lượn",
      visualDesc: "Dòng nước xanh mát uốn lượn hiền hòa giữa hai bờ cỏ xanh rì."
    }
  },
  "左": {
    components: ["𠂇", "工"],
    equation: "Bàn tay (𠂇) + Công (工 thước thợ)",
    mnemonic: "Chữ hội ý: Bàn tay phụ cầm chiếc thước thợ (工) hỗ trợ việc đo đạc là tay bên trái.",
    illustration: {
      badge: "⬅️",
      concept: "Phía bên tay trái",
      visualDesc: "Người thợ cầm cây thước vuông bằng tay trái để căn chỉnh công trình."
    }
  },
  "年": {
    components: ["禾(dạng cổ)", "干"],
    equation: "Hòa (禾 lúa) + 干 (thu hoạch)",
    mnemonic: "Chữ tượng hình: Cây lúa chín trĩu hạt được thu hoạch sau một chu kỳ bốn mùa, biểu thị một năm.",
    illustration: {
      badge: "📅",
      concept: "Bốn mùa trọn năm",
      visualDesc: "Cánh đồng lúa chín vàng ươm báo hiệu một năm trọn vẹn bội thu."
    }
  },
  "後": {
    components: ["彳", "幺", "夂"],
    equation: "Xích (彳 bước đi) + Yêu (幺 sợi tơ nhỏ) + Trĩ (夂 bước chậm)",
    mnemonic: "Chữ hội ý: Bước chân ngắn (彳) chậm chạp (夂) dắt theo sợi tơ nhỏ, tụt lại phía sau người khác.",
    illustration: {
      badge: "🔙",
      concept: "Lùi lại phía sau",
      visualDesc: "Người bước chậm rãi dõi mắt nhìn theo bước chân người đi trước."
    }
  },
  "日": {
    components: ["日"],
    equation: "Bộ Nhật (日)",
    mnemonic: "Chữ tượng hình: Mặt trời tròn trịa rạng ngời với vầng hào quang ở tâm, chỉ ban ngày.",
    illustration: {
      badge: "☀️",
      concept: "Mặt trời rạng rỡ",
      visualDesc: "Vầng thái dương tròn trĩnh tỏa ánh nắng ấm áp soi sáng vạn vật."
    }
  },
  "時": {
    components: ["日", "寺"],
    equation: "Nhật (日 mặt trời) + Tự (寺 ngôi chùa: 土 + 寸)",
    mnemonic: "Chữ hình thanh hội ý: Mặt trời (日) soi bóng từng tấc (寸) xuống thềm chùa (寺) để định thời gian.",
    illustration: {
      badge: "⏳",
      concept: "Thời gian bóng chùa",
      visualDesc: "Bóng nắng mặt trời ngả dần qua cổng chùa cổ kính báo hiệu giờ giấc."
    }
  },
  "書": {
    components: ["聿", "曰"],
    equation: "Duật (聿 cây bút) + Viết (曰 lời nói)",
    mnemonic: "Chữ hội ý: Tay cầm chắc cây bút lông (聿) ghi chép lại lời nói (曰) thành cuốn sách.",
    illustration: {
      badge: "✍️",
      concept: "Cầm bút viết sách",
      visualDesc: "Ngòi bút lông nắn nót từng nét mực đen thơm ngát trên trang giấy Washi."
    }
  },
  "月": {
    components: ["月"],
    equation: "Bộ Nguyệt (月)",
    mnemonic: "Chữ tượng hình: Vầng trăng khuyết lưỡi liềm lấp lánh ban đêm trên bầu trời với hai đám mây vắt ngang.",
    illustration: {
      badge: "🌙",
      concept: "Vầng trăng lưỡi liềm",
      visualDesc: "Trăng non thanh mảnh soi bóng sáng vằng vặc trên bầu trời đêm tĩnh lặng."
    }
  },
  "木": {
    components: ["木"],
    equation: "Bộ Mộc (木)",
    mnemonic: "Chữ tượng hình: Thân cây thẳng đứng vươn cành sang hai bên và rễ cắm sâu xuống lòng đất.",
    illustration: {
      badge: "🌳",
      concept: "Cây xanh vươn cành",
      visualDesc: "Cây cổ thụ tỏa bóng mát sum suê với rễ cọc bám chặt vào lòng đất."
    }
  },
  "本": {
    components: ["木", "一"],
    equation: "Mộc (木 cây cối) + nét gạch ở gốc (一)",
    mnemonic: "Chữ chỉ sự: Nét vạch ngang (一) chỉ ngay vào gốc rễ cây (木), biểu thị nguồn gốc, cuốn sách.",
    illustration: {
      badge: "📖",
      concept: "Gốc rễ nguồn cội",
      visualDesc: "Cuốn sách mở rộng khai sáng tri thức từ chính gốc rễ cội nguồn."
    }
  },
  "来": {
    components: ["木", "米(dạng cổ)"],
    equation: "Chữ tượng hình cây lúa mì (Lai) đưa lại từ xa",
    mnemonic: "Chữ tượng hình: Cây lúa bội thu đưa mùa màng no ấm đến với buôn làng, biểu thị tương lai, đến.",
    illustration: {
      badge: "🌾",
      concept: "Mùa gặt đưa đến",
      visualDesc: "Chùm lúa mì trĩu hạt mang niềm vui ấm no đến cho mọi nhà."
    }
  },
  "東": {
    components: ["木", "日"],
    equation: "Mộc (木 cây) + Nhật (日 mặt trời)",
    mnemonic: "Chữ hội ý: Mặt trời (日) vừa ló dạng mọc lên xuyên qua rặng cây (木) ở hướng Đông.",
    illustration: {
      badge: "🌅",
      concept: "Mặt trời hướng Đông",
      visualDesc: "Bình minh đỏ rực nhô lên sau rặng thông hướng phương Đông rạng rỡ."
    }
  },
  "校": {
    components: ["木", "交"],
    equation: "Mộc (木 cột gỗ) + Giao (交 giao lưu)",
    mnemonic: "Chữ hình thanh hội ý: Mái trường dựng bằng cột gỗ (木) nơi thầy trò gặp gỡ giao lưu (交) truyền dạy chữ.",
    illustration: {
      badge: "🏫",
      concept: "Mái trường mộc mạc",
      visualDesc: "Ngôi trường bằng gỗ xinh xắn rộn rã tiếng cười nói của bạn bè học trò."
    }
  },
  "母": {
    components: ["母"],
    equation: "Bộ Mẫu (母 - biến thể từ Nữ có hai giọt sữa)",
    mnemonic: "Chữ tượng hình: Người mẹ hiền bế con với hai giọt sữa nuôi nấng con khôn lớn.",
    illustration: {
      badge: "🤱",
      concept: "Người mẹ hiền từ",
      visualDesc: "Người mẹ hiền ôm con vào lòng dịu dàng chăm bẵm dòng sữa mát lành."
    }
  },
  "毎": {
    components: ["𠂉", "母"],
    equation: "Nhân (𠂉 người) + Mẫu (母 người mẹ)",
    mnemonic: "Chữ hội ý: Mỗi (毎) một con người (𠂉) sinh ra trên đời đều được một người mẹ (母) sinh thành.",
    illustration: {
      badge: "🔁",
      concept: "Mỗi một ngày qua",
      visualDesc: "Vòng quay thời gian lặp lại mỗi ngày với tình yêu thương bao la của mẹ."
    }
  },
  "気": {
    components: ["气", "乂"],
    equation: "Khí (气 hơi nước) + nét chéo (biến thể từ Mễ 米)",
    mnemonic: "Chữ tượng hình: Hơi nước (气) bốc lên ngùn ngụt từ nồi cơm gạo chín tỏa ra sinh khí trong lành.",
    illustration: {
      badge: "💨",
      concept: "Luồng khí năng lượng",
      visualDesc: "Làn hơi nước thơm ngát bốc lên mang nguồn sinh khí tràn trề sức sống."
    }
  },
  "水": {
    components: ["水"],
    equation: "Bộ Thủy (水)",
    mnemonic: "Chữ tượng hình: Dòng nước chảy xiết cuồn cuộn ở giữa và các giọt nước bắn tung tóe sang hai bên.",
    illustration: {
      badge: "💧",
      concept: "Giọt nước trong lành",
      visualDesc: "Dòng suối nguồn trong vắt róc rách chảy qua khe đá mát lạnh."
    }
  },
  "火": {
    components: ["火"],
    equation: "Bộ Hỏa (火)",
    mnemonic: "Chữ tượng hình: Ngọn lửa bốc cháy phập phồng với những đốm tia lửa phát sáng bắn ra xung quanh.",
    illustration: {
      badge: "🔥",
      concept: "Ngọn lửa bốc cháy",
      visualDesc: "Ngọn lửa ấm áp bập bùng sưởi ấm đêm đông giá lạnh."
    }
  },
  "父": {
    components: ["父"],
    equation: "Bộ Phụ (父)",
    mnemonic: "Chữ tượng hình: Người cha hai tay cầm chắc chiếc roi tre gìn giữ kỷ cương gia đình.",
    illustration: {
      badge: "👨",
      concept: "Người cha mẫu mực",
      visualDesc: "Người cha nghiêm nghị nhưng chan chứa tình thương che chở cho gia đình."
    }
  },
  "生": {
    components: ["屮", "土"],
    equation: "Triệt (屮 mầm cây) + Thổ (土 đất đai)",
    mnemonic: "Chữ tượng hình: Mầm cây xanh (屮) vươn mình nhú lên từ lòng đất (土), biểu thị sự sống sinh sôi.",
    illustration: {
      badge: "🌱",
      concept: "Mầm sống sinh sôi",
      visualDesc: "Chồi non xanh biếc đội đất vươn lên đón ánh nắng ban mai rực rỡ."
    }
  },
  "男": {
    components: ["田", "力"],
    equation: "Điền (田 ruộng) + Lực (力 sức mạnh)",
    mnemonic: "Chữ hội ý: Người dồn hết sức lực (力) cày bừa trên đồng ruộng (田) chính là đấng nam nhi, người đàn ông.",
    illustration: {
      badge: "💪",
      concept: "Đấng nam nhi cày ruộng",
      visualDesc: "Người đàn ông khỏe khoắn dùng sức vác cày chăm chỉ canh tác trên thửa ruộng."
    }
  },
  "白": {
    components: ["丿", "日"],
    equation: "Giọt nắng (丿) + Nhật (日 mặt trời)",
    mnemonic: "Chữ chỉ sự: Giọt nắng tinh khôi (丿) nhô lên trên đỉnh mặt trời (日) tỏa ra ánh sáng trắng muốt.",
    illustration: {
      badge: "⚪",
      concept: "Ánh sáng trắng muốt",
      visualDesc: "Màu trắng tinh khôi của tia nắng ban mai chiếu qua màn sương mỏng."
    }
  },
  "百": {
    components: ["一", "白"],
    equation: "Nhất (一 số 1) + Bạch (白 trắng)",
    mnemonic: "Chữ chỉ sự: Con số một (一) đứng trên màu trắng tinh khôi (白) tạo thành số một trăm (100).",
    illustration: {
      badge: "💯",
      concept: "Con số một trăm",
      visualDesc: "Một trăm đóa hoa sen trắng nở rộ ngát hương thơm trên hồ nước."
    }
  },
  "聞": {
    components: ["門", "耳"],
    equation: "Môn (門 cánh cửa) + Nhĩ (耳 vành tai)",
    mnemonic: "Chữ hội ý: Ghé sát vành tai (耳) vào khe cánh cửa (門) để lắng nghe ngóng tin tức bên ngoài.",
    illustration: {
      badge: "👂",
      concept: "Ghé tai lắng nghe",
      visualDesc: "Ghé tai bên cánh cổng gỗ lắng nghe thanh âm rộn rã của phố xá."
    }
  },
  "行": {
    components: ["彳", "亍"],
    equation: "Xích (彳 bước trái) + Xúc (亍 bước phải)",
    mnemonic: "Chữ tượng hình: Ngã tư đường phố nơi bước chân trái (彳) và bước chân phải (亍) rộn rã đi lại.",
    illustration: {
      badge: "🚶‍♂️",
      concept: "Bước đi ngã tư",
      visualDesc: "Người bộ hành thảnh thơi sải bước qua ngã tư đường rực rỡ nắng vàng."
    }
  },
  "西": {
    components: ["西"],
    equation: "Bộ Tây (西 - tổ chim chiều tà)",
    mnemonic: "Chữ tượng hình: Chiếc tổ chim đan trên cành cây nơi chim bay về trú ngụ khi mặt trời lặn về hướng Tây.",
    illustration: {
      badge: "🌇",
      concept: "Hoàng hôn hướng Tây",
      visualDesc: "Mặt trời đỏ rực từ từ lặn xuống rặng núi phía Tây trong ánh hoàng hôn."
    }
  },
  "見": {
    components: ["目", "儿"],
    equation: "Mục (目 con mắt) + Nhi (儿 đôi chân người)",
    mnemonic: "Chữ hội ý: Đôi mắt (目) đứng trên đôi chân (儿) phóng tầm mắt ra xa nhìn ngắm cảnh vật.",
    illustration: {
      badge: "👁️",
      concept: "Dõi mắt nhìn ngắm",
      visualDesc: "Đứng trên đỉnh cao phóng tầm mắt ngắm nhìn trọn vẹn cảnh sắc non nước."
    }
  },
  "話": {
    components: ["言", "舌"],
    equation: "Ngôn (言 lời nói) + Thiệt (舌 cái lưỡi)",
    mnemonic: "Chữ hội ý: Cái lưỡi (舌) mềm mại uốn lượn thốt ra lời nói (言) để trò chuyện, đàm thoại.",
    illustration: {
      badge: "🗣️",
      concept: "Uốn lưỡi nói năng",
      visualDesc: "Đôi bạn thân thiết ngồi bên tách trà trò chuyện rôm rả suốt buổi chiều."
    }
  },
  "語": {
    components: ["言", "吾"],
    equation: "Ngôn (言 lời nói) + Ngô (吾 tôi: Ngũ 五 + Khẩu 口)",
    mnemonic: "Chữ hội ý: Lời nói (言) từ miệng (口) của bản thân tôi (吾) thốt ra để tạo thành ngôn ngữ.",
    illustration: {
      badge: "💬",
      concept: "Lời nói ngôn ngữ",
      visualDesc: "Những câu chữ ngôn ngữ kết nối tâm hồn và văn hóa của các dân tộc."
    }
  },
  "読": {
    components: ["言", "売"],
    equation: "Ngôn (言 lời nói) + Mại (売 bán buôn)",
    mnemonic: "Chữ hình thanh hội ý: Dùng lời nói (言) xướng to câu từ để truyền tải tri thức (売), đó là việc đọc.",
    illustration: {
      badge: "📖",
      concept: "Cất tiếng đọc sách",
      visualDesc: "Cất giọng đọc to từng vần thơ giàu cảm xúc trong buổi sớm mai."
    }
  },
  "车": {
    components: ["车"],
    equation: "Bộ Xa (车 dạng giản của 車)",
    mnemonic: "Chữ tượng hình: Cỗ xe có hai bánh hai bên và trục xe ở giữa lăn bánh bon bon trên đường.",
    illustration: {
      badge: "🚗",
      concept: "Cỗ xe lăn bánh",
      visualDesc: "Bánh xe tròn lăn đều đưa cỗ xe chở đầy hoa trái về buôn làng."
    }
  },
  "金": {
    components: ["𠆢", "土", "八"],
    equation: "Nhân (𠆢 mái che) + Thổ (土 lòng đất) + hai thỏi vàng (八)",
    mnemonic: "Chữ hội ý: Dưới mái nhà (𠆢), sâu trong lòng đất (土) chôn giấu hai thỏi vàng ròng quý giá.",
    illustration: {
      badge: "🪙",
      concept: "Kho báu kim loại vàng",
      visualDesc: "Thỏi vàng ròng lấp lánh đào lên từ sâu trong quặng mỏ trù phú."
    }
  },
  "長": {
    components: ["長"],
    equation: "Bộ Trường (長)",
    mnemonic: "Chữ tượng hình: Bậc cao niên với mái tóc dài thướt tha, tượng trưng cho sự dài lâu và trưởng thành.",
    illustration: {
      badge: "📏",
      concept: "Dài lâu trưởng thành",
      visualDesc: "Mái tóc dài bạc phơ của bậc trưởng lão tượng trưng cho tuổi thọ dài lâu."
    }
  },
  "間": {
    components: ["門", "日"],
    equation: "Môn (門 hai cánh cửa) + Nhật (日 ánh nắng)",
    mnemonic: "Chữ hội ý: Ánh nắng mặt trời (日) rọi qua khe hở giữa hai cánh cổng (門), tạo thành khoảng cách.",
    illustration: {
      badge: "🚪",
      concept: "Khoảng cách giữa cửa",
      visualDesc: "Tia nắng mai ấm áp lọt qua khe cổng gỗ soi sáng khoảng sân nhỏ."
    }
  },
  "雨": {
    components: ["一", "冂", "丨", "灬(giọt mưa)"],
    equation: "Mây trời (一 + 冂) + bốn giọt mưa rơi",
    mnemonic: "Chữ tượng hình: Mây xám giăng kín trời và bốn giọt nước mưa đang tí tách rơi xuống mặt đất.",
    illustration: {
      badge: "🌧️",
      concept: "Mây phủ mưa rơi",
      visualDesc: "Cơn mưa rào mùa hạ tưới mát cho cây cỏ và làm dịu đi cái nóng oi bức."
    }
  },
  "電": {
    components: ["雨", "申"],
    equation: "Vũ (雨 mưa giông) + Thân (申 tia chớp)",
    mnemonic: "Chữ hội ý: Trong cơn mưa giông (雨) xuất hiện tia chớp ngoằn ngoèo (申) mang theo dòng điện.",
    illustration: {
      badge: "⚡",
      concept: "Tia chớp dòng điện",
      visualDesc: "Tia chớp xanh sáng lòa xé toạc màn mưa đêm mang theo nguồn năng lượng mạnh mẽ."
    }
  },
  "食": {
    components: ["亼", "艮"],
    equation: "Tập (亼 gom lại) + Cấn (艮 bát cơm)",
    mnemonic: "Chữ tượng hình hội ý: Mọi người quây quần dưới mái nhà (亼) bên bát cơm thơm lành (艮) để ăn uống.",
    illustration: {
      badge: "🍚",
      concept: "Bữa cơm no ấm",
      visualDesc: "Bát cơm trắng dẻo thơm ngút khói bên mâm cơm gia đình sum vầy."
    }
  },
  "高": {
    components: ["亠", "口", "冂", "口"],
    equation: "Bộ Cao (高 - tháp lầu nhiều tầng)",
    mnemonic: "Chữ tượng hình: Tòa lâu đài nguy nga có mái vòm cao chót vót vươn thẳng lên giữa trời xanh.",
    illustration: {
      badge: "🗼",
      concept: "Lầu cao vút trời",
      visualDesc: "Tòa tháp cao nguy nga nổi bật trên nền trời xanh biếc lộng gió."
    }
  }
};

// 1. Cập nhật kanji_full_database.json và public/kanji_full_database.json
const rootJsonPath = path.join(__dirname, '../kanji_full_database.json');
const publicJsonPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootJsPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicJsonPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n5Data)) {
  if (db[char]) {
    db[char].mnemonic = patch.mnemonic;
    db[char].components = patch.components;
    db[char].equation = patch.equation;
    db[char].illustration = patch.illustration;
    updatedCount++;
  }
}

console.log(`[Batch 1 - N5] Đã cập nhật thành công ${updatedCount} / 80 chữ Kanji N5.`);

// Lưu cả 3 file
fs.writeFileSync(publicJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsPath, 'window.KANJI_FULL_DATABASE = ' + JSON.stringify(db, null, 2) + ';\n', 'utf8');

console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
