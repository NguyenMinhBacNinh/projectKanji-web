const fs = require('fs');
const path = require('path');

const n2aData = {
  "並": {
    components: ["䒑", "业", "一"],
    equation: "Hai người đứng sánh vai ngang hàng trên mặt đất phẳng (一)",
    mnemonic: "Hai người cùng đứng song song trên một vạch thẳng, biểu thị sự xếp hàng ngay ngắn, xếp ngang hàng.",
    illustration: {
      badge: "🧍🧍",
      concept: "Sóng đôi ngang hàng",
      visualDesc: "Hai hàng cây hoa anh đào thẳng tắp song song rợp bóng lối đi."
    }
  },
  "丸": {
    components: ["九", "丶"],
    equation: "Đường cong khép góc uốn lượn có một điểm chấm tâm tròn",
    mnemonic: "Uốn cong từng đường nét rồi đặt một chấm tâm xoay tròn khép kín, tạo thành viên thuốc tròn, hình cầu vo tròn.",
    illustration: {
      badge: "⚪",
      concept: "Viên ngọc tròn xoe",
      visualDesc: "Viên bi thủy tinh trong suốt tròn xoe lấp lánh phản chiếu ánh nắng."
    }
  },
  "久": {
    components: ["𠂊", "人"],
    equation: "Người chống gậy bước chậm dãi dầu qua thời gian",
    mnemonic: "Dấu ấn bước chân bền bỉ đi qua năm rộng tháng dài không đổi thay, biểu thị sự vĩnh cửu, lâu dài.",
    illustration: {
      badge: "⏳",
      concept: "Vĩnh cửu ngàn năm",
      visualDesc: "Cây tùng bách ngàn năm cổ kính xanh tươi đứng vững giữa sương gió."
    }
  },
  "乱": {
    components: ["舌", "乚"],
    equation: "Lưỡi nói thị phi (舌) + cuộn dây rối móc (乚)",
    mnemonic: "Chiếc lưỡi buông lời gièm pha (舌) làm mọi việc rối tung rối mù như cuộn tơ vướng (乚), hỗn loạn rối ren.",
    illustration: {
      badge: "🌪️",
      concept: "Cơn lốc hỗn loạn",
      visualDesc: "Cơn lốc xoáy cuốn bay lá cây tạo nên khung cảnh hỗn loạn mịt mù."
    }
  },
  "乳": {
    components: ["爫", "子", "乚"],
    equation: "Bàn tay mẹ (爫) bế đứa con thơ (子) bú dòng sữa mẹ ngọt lành (乚)",
    mnemonic: "Người mẹ âu yếm bế bồng đứa con thơ (子) cho bú dòng sữa ngọt ngào (乚), nguồn dinh dưỡng nuôi lớn sinh mệnh.",
    illustration: {
      badge: "🥛",
      concept: "Ly sữa ngọt lành",
      visualDesc: "Ly sữa tươi trắng ngần bốc khói nhẹ nhàng thơm ngậy bổ dưỡng."
    }
  },
  "乾": {
    components: ["十", "日", "十", "乞"],
    equation: "Mặt trời sớm ló rạng làm hơi ẩm bốc hơi bay biến lên trời",
    mnemonic: "Mặt trời ban mai rực rỡ tỏa hơi ấm xua tan sương giá ẩm ướt, làm vạn vật trở nên khô ráo, khô cằn.",
    illustration: {
      badge: "☀️",
      concept: "Khô ráo tinh tươm",
      visualDesc: "Tấm áo phơi dưới nắng vàng rực rỡ bay nhẹ thơm mùi nắng khô ráo."
    }
  },
  "了": {
    components: ["了"],
    equation: "Nét móc cong khép lại dấu chấm hết trọn vẹn",
    mnemonic: "Nét bút uốn móc dứt khoát kết thúc bài thơ, biểu thị sự xong xuôi, liễu giải, hoàn tất.",
    illustration: {
      badge: "🏁",
      concept: "Khép lại trọn vẹn",
      visualDesc: "Trang sách cuối cùng khép lại câu chuyện đẹp trọn vẹn và viên mãn."
    }
  },
  "介": {
    components: ["人", "丿", "丨"],
    equation: "Người dang chân đứng chính giữa hai bên phân chia",
    mnemonic: "Người đứng ở vị trí trung gian làm cầu nối bắc nhịp cho đôi bên gặp gỡ, biểu thị giới thiệu, môi giới.",
    illustration: {
      badge: "🤝",
      concept: "Cầu nối trung gian",
      visualDesc: "Người môi giới nhiệt tình kết nối hai đối tác bắt tay hợp tác vui vẻ."
    }
  },
  "仏": {
    components: ["亻", "厶"],
    equation: "亻 (Nhân - con người) + 厶 (tọa thiền bắt ấn thanh tịnh)",
    mnemonic: "Con người (亻) rũ bỏ bụi trần tọa thiền đắc đạo giác ngộ (厶), đó chính là Đức Phật từ bi, nước Pháp.",
    illustration: {
      badge: "🧘",
      concept: "Đức Phật từ bi",
      visualDesc: "Bức tượng Phật bằng đồng uy nghiêm thanh tịnh tọa đài sen dưới bóng bồ đề."
    }
  },
  "令": {
    components: ["亼", "卩"],
    equation: "Mái công đình (亼) ban chiếu chỉ + người quỳ nhận mệnh (卩)",
    mnemonic: "Dưới mái công đường, người hầu quỳ gối lắng nghe chiếu chỉ truyền ban, biểu thị mệnh lệnh, hiệu lệnh.",
    illustration: {
      badge: "📜",
      concept: "Chiếu chỉ điều lệnh",
      visualDesc: "Bản chiếu chỉ cuộn gấm vàng đóng dấu ngọc ấn ban bố hiệu lệnh."
    }
  },
  "仲": {
    components: ["亻", "中"],
    equation: "亻 (Nhân - con người) + 中 (Trung - ở giữa, trung gian)",
    mnemonic: "Người đứng ở giữa kết nối tình bạn bè (亻 中), tạo nên mối quan hệ thân thiết gắn bó, tình bạn.",
    illustration: {
      badge: "👯‍♂️",
      concept: "Đôi bạn tri kỷ",
      visualDesc: "Đôi bạn thân khoác vai nhau mỉm cười cùng bước trên con đường hoa đào."
    }
  },
  "伸": {
    components: ["亻", "申"],
    equation: "亻 (Nhân - người) + 申 (duỗi thẳng tắp như tia chớp)",
    mnemonic: "Người vươn vai duỗi thẳng đôi tay (亻 申) sau giấc ngủ dài, biểu thị sự vươn dài, duỗi thẳng, phát triển.",
    illustration: {
      badge: "🙆",
      concept: "Vươn vai sảng khoái",
      visualDesc: "Người đứng trên mỏm núi vươn vai hít căng lồng ngực đón bình minh."
    }
  },
  "伺": {
    components: ["亻", "司"],
    equation: "亻 (Nhân - người hầu cận) + 司 (chờ lệnh người điều hành)",
    mnemonic: "Người hầu cận (亻) đứng bên cạnh cẩn trọng lắng nghe ý tứ người chỉ huy (司), thăm hỏi dò ý, kính thăm.",
    illustration: {
      badge: "🙇",
      concept: "Cung kính thăm hỏi",
      visualDesc: "Vị khách cúi đầu cung kính thăm hỏi sức khỏe bậc trưởng bối."
    }
  },
  "低": {
    components: ["亻", "氐"],
    equation: "亻 (Nhân - người) + 氐 (cúi mình chạm gốc rễ đất)",
    mnemonic: "Người (亻) cúi gập mình thấp xuống sát tận nền đất (氐), biểu thị tầm vóc thấp bé, hạ thấp giá trị.",
    illustration: {
      badge: "📉",
      concept: "Hạ thấp mức độ",
      visualDesc: "Mũi tên biểu đồ chúc xuống biểu thị nhiệt độ hạ thấp vào mùa đông."
    }
  },
  "依": {
    components: ["亻", "衣"],
    equation: "亻 (Nhân - người) + 衣 (chiếc áo che chở thân mình)",
    mnemonic: "Con người (亻) mặc chiếc áo ấm (衣) nương tựa vào lớp vải giữ ấm, biểu thị sự ỷ lại, dựa dẫm, nương tựa.",
    illustration: {
      badge: "🧥",
      concept: "Nương tựa áo ấm",
      visualDesc: "Chiếc áo khoác dạ ấm áp che chở cho người bộ hành trước gió lạnh."
    }
  },
  "個": {
    components: ["亻", "固"],
    equation: "亻 (Nhân - con người) + 固 (khung thành vuông vức độc lập)",
    mnemonic: "Mỗi một con người (亻) là một cá thể độc lập có bản sắc riêng biệt kiên định (固), cá nhân, từng cái.",
    illustration: {
      badge: "👤",
      concept: "Cá nhân độc lập",
      visualDesc: "Hình bóng một cá nhân kiên định bước trên con đường riêng của mình."
    }
  },
  "倍": {
    components: ["亻", "咅"],
    equation: "亻 (Nhân - người) + 咅 (chia tách nhân bản)",
    mnemonic: "Con người tăng thêm gấp bội phần sức lực (亻 咅) để hoàn thành khối lượng công việc, nhân đôi, bội số.",
    illustration: {
      badge: "✖️2️⃣",
      concept: "Gấp đôi năng suất",
      visualDesc: "Hai thỏi vàng đặt cạnh nhau biểu thị tài lộc gia tăng gấp đôi."
    }
  },
  "停": {
    components: ["亻", "亭"],
    equation: "亻 (Nhân - người đi đường) + 亭 (quán đình dừng chân)",
    mnemonic: "Người đi đường mỏi mệt (亻) dừng bước ghé vào ngôi đình cổ ven đường (亭) nghỉ ngơi, dừng lại, đình chỉ.",
    illustration: {
      badge: "🛑",
      concept: "Dừng bước tạm thời",
      visualDesc: "Biển báo dừng đỗ an toàn trước trạm dừng chân xe buýt ven đường."
    }
  },
  "傾": {
    components: ["亻", "匕", "頁"],
    equation: "亻 (Nhân - người) + nghiêng đầu (頁) lắng nghe",
    mnemonic: "Người (亻) nghiêng đầu về một phía (頃) chăm chú quan sát, biểu thị sự nghiêng ngả, khuynh hướng.",
    illustration: {
      badge: "🗼",
      concept: "Tháp nghiêng Pisa",
      visualDesc: "Tòa tháp nghiêng cổ kính nghiêng một góc độc đáo giữa quảng trường."
    }
  },
  "像": {
    components: ["亻", "象"],
    equation: "亻 (Nhân - thợ tạc tượng) + 象 (hình dáng to lớn uy nghiêm)",
    mnemonic: "Nghệ nhân (亻) khéo léo đục đẽo tạc nên bức tượng uy nghi như con voi lớn (象), hình ảnh, pho tượng.",
    illustration: {
      badge: "🗿",
      concept: "Pho tượng đá tạc",
      visualDesc: "Bức tượng đá điêu khắc tinh xảo đứng trầm ngâm bên hoa viên tĩnh mịch."
    }
  },
  "億": {
    components: ["亻", "意"],
    equation: "亻 (Nhân - con người) + 意 (ý nghĩ về con số vĩ đại)",
    mnemonic: "Trí óc con người (亻) vươn tới con số khổng lồ ngoài sức tưởng tượng (意), con số một trăm triệu to lớn.",
    illustration: {
      badge: "💯",
      concept: "Con số trăm triệu",
      visualDesc: "Dãy số hiển thị trên sàn giao dịch tài chính biểu thị nguồn vốn trăm triệu."
    }
  },
  "兆": {
    components: ["儿", "冫"],
    equation: "Những vết nứt chân chim rẽ ngang dọc trên mai rùa bói toán",
    mnemonic: "Vết nứt trên mai rùa rẽ ra các nhánh hé lộ điềm báo tương lai, đồng thời là con số ngàn tỷ cực lớn.",
    illustration: {
      badge: "🔮",
      concept: "Điềm báo trước",
      visualDesc: "Vết nứt ánh sáng phát quang trên viên pha lê báo hiệu bước ngoặt mới."
    }
  },
  "児": {
    components: ["旧", "儿"],
    equation: "Hài nhi có thóp đầu mềm + đôi chân nhỏ (儿) chập chững",
    mnemonic: "Đứa bé sơ sinh có chiếc đầu tròn và đôi chân nhỏ xíu (儿) tập đi những bước đầu đời, cô nhi, hài nhi.",
    illustration: {
      badge: "👶",
      concept: "Đứa trẻ sơ sinh",
      visualDesc: "Em bé sơ sinh đáng yêu cuộn tròn ngủ say trong nôi êm."
    }
  },
  "党": {
    components: ["⺌", "冖", "口", "儿"],
    equation: "Những người cùng chung chí hướng cao đẹp (尚) kết thành khối anh em (儿)",
    mnemonic: "Những người cùng chung một lý tưởng cao đẹp tề tựu gắn bó như ruột thịt, hình thành chính đảng, đảng phái.",
    illustration: {
      badge: "🏛️",
      concept: "Đảng phái đoàn kết",
      visualDesc: "Hội trường đại hội đảng với những biểu ngữ cờ hiệu rực rỡ trang nghiêm."
    }
  },
  "兵": {
    components: ["丘", "八"],
    equation: "Hai tay (八) cầm chắc cây rìu chiến trên đỉnh đồi",
    mnemonic: "Người chiến sĩ hai tay nắm chắc vũ khí rìu chiến sẵn sàng nghênh địch, biểu thị người lính, binh lính.",
    illustration: {
      badge: "💂",
      concept: "Người lính bảo vệ",
      visualDesc: "Người lính đứng gác trang nghiêm trong quân phục chỉnh tề bảo vệ bình yên."
    }
  },
  "冊": {
    components: ["冂", "卄"],
    equation: "Các thanh thẻ tre xếp đều được dây luồn ngang buộc thành tập",
    mnemonic: "Nhiều thẻ tre ghi chép được xâu dây nối lại thành cuộn sách cổ, dùng làm đơn vị đếm quyển sách, cuốn sách.",
    illustration: {
      badge: "📚",
      concept: "Tập sách cổ kính",
      visualDesc: "Tập sách thẻ tre cổ xưa được cuộn tròn gọn gàng đặt trên bàn trà."
    }
  },
  "再": {
    components: ["一", "冂", "土"],
    equation: "Gõ lại một nhát búa thứ hai lên chiếc giá nung",
    mnemonic: "Lặp lại hành động lần thứ hai thêm một lần nữa (一), biểu thị sự tái diễn, tái sinh, bắt đầu lại.",
    illustration: {
      badge: "🔄",
      concept: "Bắt đầu lại tái sinh",
      visualDesc: "Mũi tên xoay tròn biểu tượng cho chu kỳ lặp lại và sự tái sinh tươi mới."
    }
  },
  "凍": {
    components: ["冫", "東"],
    equation: "冫 (băng giá buốt) + 東 (ngọn gió đông lạnh giá)",
    mnemonic: "Gió đông buốt giá thổi về biến từng giọt nước thành khối băng tuyết cứng đờ (冫 東), đóng băng đông đá.",
    illustration: {
      badge: "🧊",
      concept: "Khối băng đông cứng",
      visualDesc: "Khối băng trong suốt lạnh buốt đọng sương đóng băng trên cành lá."
    }
  },
  "刊": {
    components: ["干", "刂"],
    equation: "干 (tấm bản gỗ san phẳng) + 刂 (mũi dao khắc chữ in)",
    mnemonic: "Dùng mũi dao (刂) đục khắc từng chữ lên tấm bản gỗ phẳng (干) để in ấn sách báo, san hành xuất bản.",
    illustration: {
      badge: "📰",
      concept: "Xuất bản ấn phẩm",
      visualDesc: "Tạp chí in bìa màu rực rỡ vừa xuất bản phát hành thơm phức mùi mực in."
    }
  },
  "刷": {
    components: ["尸", "巾", "刂"],
    equation: "Khay mực (尸 巾) + lưỡi dao lăn quét mực in phẳng phiu (刂)",
    mnemonic: "Dùng con lăn quét đều lớp mực lên bản khắc gỗ rồi áp giấy in ra trang sách, in ấn và bàn chải quét.",
    illustration: {
      badge: "🪥",
      concept: "Bàn chải quét sạch",
      visualDesc: "Cây cọ quét mực in trải đều lớp sơn bóng mượt trên bề mặt."
    }
  },
  "券": {
    components: ["龹", "刀"],
    equation: "Hai nửa khế ước ghép răng cưa (龹) bị dao xẻ đôi (刀) mỗi bên giữ một nửa",
    mnemonic: "Cắt đôi mảnh giấy khế ước (刀) giao cho hai bên làm bằng chứng đối chiếu, tạo thành vé tàu, chứng khoán.",
    illustration: {
      badge: "🎟️",
      concept: "Tấm vé xem hòa nhạc",
      visualDesc: "Tấm vé ca nhạc in hoa văn sắc nét có mã vạch sẵn sàng qua cửa soát vé."
    }
  },
  "刺": {
    components: ["朿", "刂"],
    equation: "朿 (cành gai nhọn hoắt) + 刂 (mũi dao bén đâm xiên)",
    mnemonic: "Gai nhọn của cành cây (朿) sắc bén như lưỡi dao (刂) đâm xuyên vào da thịt, biểu thị châm chích, đâm thích.",
    illustration: {
      badge: "🌵",
      concept: "Gai xương rồng nhọn",
      visualDesc: "Những chiếc gai nhọn hoắt của cây xương rồng biểu thị sự sắc bén châm chích."
    }
  },
  "則": {
    components: ["貝", "刂"],
    equation: "貝 (báu vật định giá) + 刂 (dao khắc khuôn mẫu điều khoản)",
    mnemonic: "Dùng dao (刂) khắc các điều khoản chuẩn mực phân định của cải (貝) lên vạc đồng, tạo thành nguyên tắc, quy tắc.",
    illustration: {
      badge: "📜",
      concept: "Quy tắc chuẩn mực",
      visualDesc: "Bảng quy tắc đạo đức nghề nghiệp in chữ vàng đóng khung trang trọng."
    }
  },
  "副": {
    components: ["畐", "刂"],
    equation: "畐 (bình của cải trọn vẹn) + 刂 (xẻ thêm một phần phụ bên cạnh)",
    mnemonic: "Xẻ thêm một phần bên cạnh chiếc bình chính (畐 刂) để dự phòng hỗ trợ, biểu thị cấp phó, bản phụ tá.",
    illustration: {
      badge: "🥈",
      concept: "Vị trí phó tá",
      visualDesc: "Huy hiệu phó chỉ huy sáng bóng thể hiện vai trò đắc lực bên cạnh cấp trưởng."
    }
  },
  "劇": {
    components: ["虍", "豕", "刂"],
    equation: "Hổ dữ (虍) giao đấu kịch liệt với lợn rừng (豕) bằng vũ khí sắc bén (刂)",
    mnemonic: "Cuộc đọ sức gay cấn nảy lửa giữa hổ dữ và lợn lòi như một màn kịch kịch tính nghẹt thở, kịch nghệ tuồng chèo.",
    illustration: {
      badge: "🎭",
      concept: "Màn kịch kịch tính",
      visualDesc: "Hai chiếc mặt nạ kịch vui buồn tương phản trên sân khấu kịch nghệ rực sáng."
    }
  },
  "効": {
    components: ["交", "力"],
    equation: "交 (tác động qua lại) + 力 (sức mạnh bộc phát)",
    mnemonic: "Sức mạnh (力) được vận dụng đúng chỗ và tương tác nhịp nhàng (交), tạo nên công hiệu và hiệu quả bất ngờ.",
    illustration: {
      badge: "🎯",
      concept: "Công hiệu chuẩn xác",
      visualDesc: "Mũi tên trúng đích đem lại hiệu quả trọn vẹn và niềm hân hoan chiến thắng."
    }
  },
  "勇": {
    components: ["マ", "男"],
    equation: "Dũng khí bừng bừng ngân vang + 力 (sức mạnh không sợ hãi)",
    mnemonic: "Dồn toàn bộ sức mạnh cơ bắp và ý chí can trường (力) tiến lên không lùi bước, biểu thị lòng dũng cảm phi thường.",
    illustration: {
      badge: "🦁",
      concept: "Sư tử dũng mãnh",
      visualDesc: "Chú sư tử bờm vàng gầm vang hiên ngang trên đỉnh tảng đá thảo nguyên."
    }
  },
  "募": {
    components: ["艹", "日", "大", "力"],
    equation: "Kêu gọi mọi người cùng chung tay góp sức (力) lúc gian nan",
    mnemonic: "Kêu gọi mọi người cùng dốc sức lực và của cải (力) chung tay vượt qua nghịch cảnh, chiêu mộ quyên mộ.",
    illustration: {
      badge: "🤝",
      concept: "Chiêu mộ hiền tài",
      visualDesc: "Bảng thông báo tuyển dụng chiêu mộ nhân tài mở ra cơ hội tương lai."
    }
  },
  "勢": {
    components: ["土", "丸", "艹", "力"],
    equation: "Tích tụ nguồn lực vững chãi + 力 (sức mạnh phóng phát uy thế)",
    mnemonic: "Nắm chắc quyền bính trong tay kết hợp sức mạnh bùng nổ (力), tạo nên thanh thế, tư thế và thế lực hùng cường.",
    illustration: {
      badge: "⚡",
      concept: "Thế lực uy phong",
      visualDesc: "Ngọn sóng thần cuồn cuộn dâng cao thể hiện sức mạnh và tư thế áp đảo."
    }
  },
  "包": {
    components: ["勹", "巳"],
    equation: "Bọc vải mềm (勹) gói trọn sinh linh bé bỏng bên trong",
    mnemonic: "Gói ghém bảo bọc cẩn thận như người mẹ ấp ủ đứa con thơ trong bụng, bao bọc, gói ghém, bưu kiện.",
    illustration: {
      badge: "📦",
      concept: "Gói quà bọc kín",
      visualDesc: "Gói quà xinh xắn bọc giấy hoa thắt nơ cẩn thận trao gửi yêu thương."
    }
  },
  "匹": {
    components: ["匚", "儿"],
    equation: "匚 (khung chuồng ngựa/vải cuộn) + 儿 (chân thú bước vào chuồng)",
    mnemonic: "Nhốt từng con thú nhỏ vào từng ô chuồng riêng biệt (匚 儿), dùng làm đơn vị đếm loài thú nhỏ, một con.",
    illustration: {
      badge: "🐎",
      concept: "Một chú thú cưng",
      visualDesc: "Chú ngựa con đáng yêu đứng thong dong bên hàng rào trang trại."
    }
  },
  "区": {
    components: ["匚", "乂"],
    equation: "Chiếc hộp (匚) được chia ranh giới thành các ô nhỏ (乂)",
    mnemonic: "Chiếc hộp ngăn kéo được phân chia thành từng ngăn rạch ròi bằng dấu chéo (乂), tạo nên khu vực, quận hạt.",
    illustration: {
      badge: "🗺️",
      concept: "Phân chia khu vực",
      visualDesc: "Bản đồ thành phố chia màu rõ ràng thành từng khu vực hành chính riêng."
    }
  },
  "卒": {
    components: ["亠", "从", "十"],
    equation: "Áo lính buộc đai chỉnh tề (亠 从) hoàn tất chặng đường (十)",
    mnemonic: "Người lính mặc quân phục chỉnh tề hoàn thành trọn vẹn khóa rèn luyện, tốt nghiệp và trở thành quân tốt dũng cảm.",
    illustration: {
      badge: "🎓",
      concept: "Mũ tốt nghiệp cử nhân",
      visualDesc: "Chiếc mũ cử nhân tung bay trong ngày lễ tốt nghiệp rạng rỡ tiếng cười."
    }
  },
  "協": {
    components: ["十", "力", "力", "力"],
    equation: "Mười người (十) cùng dốc ba nguồn sức lực (力 力 力) chung một chí hướng",
    mnemonic: "Mười người chung tay dồn ba nguồn sức mạnh cơ bắp lại làm một, tạo nên sự hiệp lực đoàn kết vĩ đại.",
    illustration: {
      badge: "🤝",
      concept: "Chung tay hiệp lực",
      visualDesc: "Nhiều bàn tay cùng chồng lên nhau thể hiện tinh thần đoàn kết đồng lòng."
    }
  },
  "占": {
    components: ["卜", "口"],
    equation: "卜 (vết nứt bói toán) + 口 (miệng phán định lãnh thổ)",
    mnemonic: "Nhìn vết nứt bói toán (卜) rồi mở miệng phán định vùng đất thuộc về ai (口), bói toán và chiếm đóng lãnh thổ.",
    illustration: {
      badge: "🔮",
      concept: "Bói toán chiêm nghiệm",
      visualDesc: "Thẻ bài bói toán mở ra hé lộ những thông điệp kỳ diệu của tương lai."
    }
  },
  "印": {
    components: ["爫", "卩"],
    equation: "Bàn tay ấn mạnh xuống (phần trên) đóng dấu lên chiếu chỉ",
    mnemonic: "Đưa bàn tay ấn mạnh con dấu son xuống mặt giấy phê chuẩn, tạo nên con dấu ấn tín, ấn tượng sâu sắc.",
    illustration: {
      badge: "💮",
      concept: "Con dấu son đỏ Hanko",
      visualDesc: "Con dấu Hanko bằng ngà khắc tinh xảo in dấu son đỏ tươi trên trang giấy Washi."
    }
  },
  "卵": {
    components: ["卯", "丶", "丶"],
    equation: "Hai vỏ trứng tròn nằm cạnh nhau có hai chấm lòng đỏ bên trong",
    mnemonic: "Hình hai quả trứng tròn đều nằm gọn trong tổ êm ấm với chấm lòng đỏ bổ dưỡng, quả trứng noãn bào.",
    illustration: {
      badge: "🥚",
      concept: "Quả trứng ấp ủ",
      visualDesc: "Quả trứng tròn xoe nằm êm ái trên ổ rơm chuẩn bị ấp nở mầm sống non."
    }
  },
  "压": {
    components: ["厂", "土", "丶"],
    equation: "Vách núi đá khổng lồ (厂) đè nặng lên nền đất (土)",
    mnemonic: "Tảng đá từ vách núi cao (厂) rơi đè nặng lên mảnh đất bên dưới (土), tạo nên sức nén nghẹt thở, áp lực.",
    illustration: {
      badge: "🏋️",
      concept: "Sức nặng áp lực",
      visualDesc: "Quả tạ nặng đè lên lò xo nén chặt thể hiện áp lực dồn nén cao độ."
    }
  },
  "厚": {
    components: ["厂", "日", "子"],
    equation: "Dưới vách đá che chắn, người được sưởi ấm qua bao lớp bảo bọc",
    mnemonic: "Lớp chăn bông dày dặn che chắn gió lạnh dưới vách đá, tạo nên sự dày cộm và tấm lòng nồng hậu ấm áp.",
    illustration: {
      badge: "📖",
      concept: "Cuốn sách dày cộm",
      visualDesc: "Cuốn từ điển dày dặn lưu giữ kho tàng tri thức phong phú qua năm tháng."
    }
  },
  "双": {
    components: ["又", "又"],
    equation: "Hai bàn tay (又 + 又) cùng chìa ra sánh bước bên nhau",
    mnemonic: "Hai bàn tay cùng vươn ra nắm lấy nhau sóng đôi thành một cặp, biểu thị sự song đôi, một cặp đôi hoàn hảo.",
    illustration: {
      badge: "👯‍♀️",
      concept: "Cặp đôi song sinh",
      visualDesc: "Hai chú chim bồ câu trắng đậu sát bên nhau trên cành hoa biểu tượng tình song đôi."
    }
  },
  "叫": {
    components: ["口", "丩"],
    equation: "口 (Khẩu - miệng ngoác rộng) + 丩 (tiếng thét ngân dài kéo cong)",
    mnemonic: "Mở toang khuôn miệng (口) cất tiếng kêu la gào thét thất thanh vang dội (丩), la hét kêu gọi.",
    illustration: {
      badge: "🗣️",
      concept: "Cất tiếng hét vang",
      visualDesc: "Người đứng trên đỉnh đồi ngoác miệng hét vang dội giải tỏa tâm tư."
    }
  },
  "召": {
    components: ["刀", "口"],
    equation: "Khẩu (miệng vua ban chỉ dụ) có uy lực dứt khoát như đao kiếm (刀)",
    mnemonic: "Miệng ban bố điều lệnh uy nghiêm như lưỡi đao sắc bén (刀 口), truyền lệnh triệu tập mọi người hội họp.",
    illustration: {
      badge: "📢",
      concept: "Triệu tập quan quân",
      visualDesc: "Chiếc kèn đồng thổi vang triệu tập các tướng sĩ tề tựu trước sân rồng."
    }
  },
  "史": {
    components: ["口", "又"],
    equation: "Bàn tay (又) cầm chắc cuộn sách sử (口) ghi chép trung thực",
    mnemonic: "Bàn tay sử quan cầm chắc cuốn sổ sách ghi chép công minh từng biến cố thăng trầm, tạo nên trang sử lịch sử.",
    illustration: {
      badge: "📜",
      concept: "Trang sử ngàn năm",
      visualDesc: "Cuộn thư tịch cổ nhuốm màu thời gian lưu giữ những mốc son lịch sử hào hùng."
    }
  },
  "各": {
    components: ["夂", "口"],
    equation: "夂 (bàn chân từ muôn ngả) + 口 (bước tới từng ngưỡng cửa khác nhau)",
    mnemonic: "Mỗi bàn chân (夂) rẽ bước về một ngưỡng cửa riêng biệt (口), biểu thị từng người, mỗi người, các vị.",
    illustration: {
      badge: "👥",
      concept: "Mỗi người một vẻ",
      visualDesc: "Những cánh hoa muôn màu khoe sắc rực rỡ mỗi bông một vẻ đẹp riêng."
    }
  },
  "含": {
    components: ["今", "口"],
    equation: "今 (giữ lại ngay lúc này) + 口 (trong khuôn miệng khép)",
    mnemonic: "Ngậm viên kẹo ngọt giữ chặt trong miệng (口) tận hưởng hương vị ngay lúc này (今), ngậm vào và bao hàm dung chứa.",
    illustration: {
      badge: "🍬",
      concept: "Ngậm kẹo ngọt ngào",
      visualDesc: "Viên kẹo hoa quả ngọt ngào tan dần trong miệng mang lại cảm giác thích thú."
    }
  },
  "周": {
    components: ["冂", "土", "口"],
    equation: "Khung bờ rào bao quanh (冂) khép kín toàn bộ thửa đất (土 口)",
    mnemonic: "Đi tuần tra một vòng khép kín quanh bờ rào bảo vệ chu vi ngôi làng, biểu thị sự chu đáo, tuần hoàn chu kỳ.",
    illustration: {
      badge: "⭕",
      concept: "Vòng tròn chu toàn",
      visualDesc: "Vòng tròn ánh sáng liền mạch không góc khuyết biểu thị sự chu đáo trọn vẹn."
    }
  },
  "咲": {
    components: ["口", "关"],
    equation: "口 (hé mở khuôn miệng) + đón nắng xòe cánh tươi vui",
    mnemonic: "Búp hoa hé miệng mỉm cười đón ánh nắng sớm mai bung nở từng cánh rực rỡ, hoa nở khoe sắc.",
    illustration: {
      badge: "🌸",
      concept: "Hoa anh đào nở rộ",
      visualDesc: "Cành hoa anh đào bung nở rộ sắc hồng phấn mỏng manh tuyệt đẹp trong gió xuân."
    }
  },
  "喫": {
    components: ["口", "契"],
    equation: "口 (Khẩu - miệng) + 契 (thưởng thức cảm nhận dư vị)",
    mnemonic: "Miệng (口) chậm rãi nhấp từng ngụm nước trà thơm tận hưởng hương vị tinh tế, ăn uống, quán trà giải khát.",
    illustration: {
      badge: "☕",
      concept: "Quán cà phê thư giãn",
      visualDesc: "Tách cà phê thơm lừng bốc khói nhẹ nhàng bên khung cửa sổ quán nhỏ tĩnh lặng."
    }
  },
  "営": {
    components: ["⺍", "冖", "口", "口"],
    equation: "Đèn đuốc sáng trưng thâu đêm trên mái hiên hai gian phòng (呂) buôn bán",
    mnemonic: "Đèn đuốc thắp sáng thâu đêm tại các gian phòng họp bàn buôn bán sinh lời, tạo nên doanh nghiệp, kinh doanh.",
    illustration: {
      badge: "🏢",
      concept: "Tòa nhà doanh nghiệp",
      visualDesc: "Tòa cao ốc văn phòng rực sáng ánh đèn đêm thể hiện hoạt động kinh doanh sôi động."
    }
  },
  "団": {
    components: ["囗", "寸"],
    equation: "囗 (vòng tròn bao quanh) + 寸 (bàn tay nắm chặt kết đoàn)",
    mnemonic: "Mọi người nắm chặt tay nhau đứng quây thành vòng tròn khép kín (囗 寸), tạo nên đoàn thể vững mạnh, đoàn viên.",
    illustration: {
      badge: "🤝",
      concept: "Đoàn thể gắn kết",
      visualDesc: "Vòng tròn những bàn tay nắm chặt thể hiện tinh thần đoàn kết keo sơn."
    }
  },
  "囲": {
    components: ["囗", "井"],
    equation: "囗 (bức tường thành rào quanh) + 井 (miệng giếng nước bên trong)",
    mnemonic: "Dựng hàng rào kiên cố (囗) bao bọc quanh giếng nước ngọt của làng (井), bảo vệ nguồn sống, vây quanh bao vây.",
    illustration: {
      badge: "🛡️",
      concept: "Hàng rào bao bọc",
      visualDesc: "Hàng rào gỗ trắng xinh xắn bao quanh vườn hoa rực rỡ bảo vệ khu vườn."
    }
  },
  "固": {
    components: ["囗", "古"],
    equation: "囗 (bức tường thành dày) + 古 (khối đá cổ xưa ngàn năm không lay chuyển)",
    mnemonic: "Thành đá ngàn năm kiên vững (古) bao bọc kín bốn bề (囗), vững như bàn thạch không thể công phá, kiên cố.",
    illustration: {
      badge: "🏰",
      concept: "Thành trì kiên cố",
      visualDesc: "Tường thành đá cổ sừng sững qua bao phong ba bão táp vẫn kiên cố uy nghiêm."
    }
  },
  "坂": {
    components: ["土", "反"],
    equation: "土 (Thổ - nền đất) + 反 (dốc nghiêng thoai thoải)",
    mnemonic: "Nền đất (土) thoải nghiêng theo sườn đồi uốn lượn (反), tạo thành con dốc thoai thoải dẫn lên đỉnh núi.",
    illustration: {
      badge: "🚵",
      concept: "Con dốc quanh co",
      visualDesc: "Con đường dốc thoai thoải lát đá quanh co rợp bóng cây phong mùa thu."
    }
  },
  "均": {
    components: ["土", "勹", "二"],
    equation: "土 (Thổ - đống đất phù sa) + gạt phẳng chia đều thành các phần cân đối",
    mnemonic: "Dùng bàn gạt san phẳng đống đất chia đều cho mọi luống rau (土), bình quân san bằng không chênh lệch.",
    illustration: {
      badge: "⚖️",
      concept: "Quân bình cán cân",
      visualDesc: "Hai đĩa cân đồng thăng bằng tuyệt đối biểu thị sự quân bình hoàn hảo."
    }
  },
  "型": {
    components: ["刑", "土"],
    equation: "刑 (khung cắt chuẩn xác) + 土 (đất sét nặn thành khuôn)",
    mnemonic: "Dùng đất sét (土) đổ vào khung chuẩn mực (刑) nung thành sản phẩm đồng đều hàng loạt, tạo thành khuôn hình mẫu.",
    illustration: {
      badge: "📐",
      concept: "Khuôn đúc chuẩn mực",
      visualDesc: "Khuôn đúc kim loại sáng bóng định hình nên những chi tiết máy chuẩn xác."
    }
  },
  "埋": {
    components: ["土", "里"],
    equation: "土 (Thổ - lớp đất bùn) + 里 (vùi sâu vào lòng đất)",
    mnemonic: "Đào hố chôn sâu đồ vật dưới lớp đất mẹ phù sa (土 里), vùi lấp kín mít không để lộ ra ngoài, chôn vùi.",
    illustration: {
      badge: "🌱",
      concept: "Chôn hạt giống xuống đất",
      visualDesc: "Hạt giống được chôn êm ái dưới luống đất tơi xốp chờ ngày đâm chồi."
    }
  },
  "城": {
    components: ["土", "成"],
    equation: "土 (Thổ - đất đá đắp cao) + 成 (hoàn thành tòa lũy kiên cố)",
    mnemonic: "Đắp đất đá cao ngất (土) tạo thành bức tường thành lũy kiên cố bảo vệ bá tính, lâu đài tòa thành uy nghi.",
    illustration: {
      badge: "🏯",
      concept: "Lâu đài Himeji uy nghiêm",
      visualDesc: "Tòa lâu đài Himeji trắng muốt soi bóng xuống hào nước trong vắt."
    }
  },
  "域": {
    components: ["土", "或"],
    equation: "土 (Thổ - đất đai quê hương) + 或 (cầm giáo canh giữ bờ cõi)",
    mnemonic: "Cầm ngọn giáo tuần tra bảo vệ mảnh đất có phân định ranh giới (土 或), hình thành khu vực cương vực.",
    illustration: {
      badge: "🌐",
      concept: "Khu vực biên giới",
      visualDesc: "Vòng tròn ranh giới phân chia rõ ràng khu vực an toàn trên bản đồ định vị."
    }
  },
  "塔": {
    components: ["土", "艹", "合"],
    equation: "Đắp nền đất cao (土) + dựng công trình nhiều tầng mái nhô vút lên trời",
    mnemonic: "Dựng móng đất kiên cố (土) xây ngọn bảo tháp nhiều tầng mái cong vươn thẳng lên bầu trời xanh, ngọn tháp uy nghiêm.",
    illustration: {
      badge: "🗼",
      concept: "Bảo tháp nhiều tầng",
      visualDesc: "Ngọn tháp năm tầng chùa cổ soi bóng bên hồ nước rực rỡ hoa anh đào."
    }
  },
  "塗": {
    components: ["氵", "土", "余"],
    equation: "Nước sơn màu (氵) pha bột khoáng đất (土) dùng cọ quét đều khắp bề mặt",
    mnemonic: "Pha sơn với nước (氵) rồi dùng chổi quét đều lớp men lên tường đất (土), tô vẽ quét sơn tinh tươm.",
    illustration: {
      badge: "🖌️",
      concept: "Cọ quét sơn bóng",
      visualDesc: "Cây cọ quét lớp sơn mài bóng bẩy đỏ thắm lên chiếc khay gỗ thủ công."
    }
  },
  "塩": {
    components: ["土", "人", "口", "皿"],
    equation: "Dẫn nước biển lên ruộng đất (土) hứng nắng kết tinh thành muối trắng trên đĩa (皿)",
    mnemonic: "Nắng rọi trên ruộng đất (土) làm nước biển bốc hơi để lại những hạt muối trắng tinh khiết đựng trong đĩa (皿).",
    illustration: {
      badge: "🧂",
      concept: "Hạt muối trắng tinh",
      visualDesc: "Lọ muối thủy tinh rắc những hạt muối biển trắng ngần tinh khiết vào món ăn."
    }
  },
  "境": {
    components: ["土", "竟"],
    equation: "土 (Thổ - cột mốc đất) + 竟 (điểm kết thúc tận cùng lãnh thổ)",
    mnemonic: "Cắm cột mốc đất (土) đánh dấu điểm kết thúc của một vùng lãnh thổ (竟), tạo nên biên cảnh, hoàn cảnh ranh giới.",
    illustration: {
      badge: "⛩️",
      concept: "Cột mốc biên cương",
      visualDesc: "Cột mốc đá rêu phong sừng sững phân định ranh giới giữa hai ngọn đồi."
    }
  },
  "央": {
    components: ["大", "冂"],
    equation: "Người dang tay đứng ngay tâm điểm chính giữa",
    mnemonic: "Đứng sừng sững ngay vị trí trung tâm nổi bật nhất của quảng trường, biểu thị trung ương, chính giữa.",
    illustration: {
      badge: "🎯",
      concept: "Tâm điểm chính giữa",
      visualDesc: "Hồng tâm vòng tròn đỏ rực rỡ nằm ngay chính giữa bia ngắm bắn."
    }
  },
  "奥": {
    components: ["丿", "冂", "米", "大"],
    equation: "Gian phòng sâu kín nhất dưới mái nhà nơi cất giữ báu vật",
    mnemonic: "Bước sâu vào gian phòng kín đáo tận cùng của ngôi nhà, nơi tĩnh lặng sâu thẳm và cất giữ những điều huyền bí.",
    illustration: {
      badge: "🚪",
      concept: "Góc sâu tĩnh mịch",
      visualDesc: "Căn phòng trà đạo nhỏ nằm sâu bên trong khu vườn rêu phong tĩnh lặng."
    }
  },
  "姓": {
    components: ["女", "生"],
    equation: "女 (Nữ - chế độ mẫu hệ thời cổ) + 生 (sinh con đẻ cái lưu truyền dòng họ)",
    mnemonic: "Người mẹ (女) sinh ra con cái (生) truyền lại dòng dõi họ tộc từ thuở sơ khai, biểu thị họ tên dòng họ.",
    illustration: {
      badge: "📜",
      concept: "Gia phả dòng họ",
      visualDesc: "Cuộn gia phả ghi chép danh tính tổ tiên dòng họ qua bao thế hệ hào hùng."
    }
  },
  "委": {
    components: ["禾", "女"],
    equation: "禾 (bông lúa chín trĩu cúi đầu) + 女 (người phụ nữ dịu dàng)",
    mnemonic: "Giao phó công việc thu hoạch lúa chín (禾) cho người phụ nữ đảm đang (女), giao phó, ủy thác ủy quyền.",
    illustration: {
      badge: "🤝",
      concept: "Ủy thác tin cậy",
      visualDesc: "Bức thư ủy nhiệm có con dấu đóng trang trọng giao phó trọng trách."
    }
  },
  "季": {
    components: ["禾", "子"],
    equation: "禾 (cây lúa sinh sôi) + 子 (đứa con non nớt theo chu kỳ)",
    mnemonic: "Cây lúa nảy mầm đơm hạt như đứa trẻ lớn lên (禾 子) theo vòng xoay bốn mùa thiên nhiên, các mùa trong năm.",
    illustration: {
      badge: "🍂",
      concept: "Bốn mùa chuyển dịch",
      visualDesc: "Bức tranh bốn mùa luân chuyển với sắc hoa xuân và lá vàng mùa thu."
    }
  },
  "孫": {
    components: ["子", "系"],
    equation: "子 (Tử - con trẻ) + 系 (sợi dây huyết thống nối dài tiếp tục)",
    mnemonic: "Sợi dây huyết thống (系) nối tiếp từ đời cha sang đời con cháu bé bỏng (子), đó là thế hệ cháu chắt nối dõi.",
    illustration: {
      badge: "👶",
      concept: "Đứa cháu đáng yêu",
      visualDesc: "Cậu bé cháu nhỏ tươi cười chạy ào vào vòng tay yêu thương của ông bà."
    }
  },
  "宇": {
    components: ["宀", "于"],
    equation: "宀 (mái vòm trời bao la) + 于 (trải rộng không gian khắp bốn cõi)",
    mnemonic: "Mái vòm bầu trời che chở khắp không gian vô tận bốn phương tám hướng, tạo nên vũ trụ bao la.",
    illustration: {
      badge: "🌌",
      concept: "Dải ngân hà vũ trụ",
      visualDesc: "Bầu trời đêm đầy sao lấp lánh với dải ngân hà huyền ảo bao la vô tận."
    }
  },
  "宝": {
    components: ["宀", "玉"],
    equation: "宀 (mái nhà kho an toàn) + 玉 (viên ngọc bích sáng ngời)",
    mnemonic: "Dưới mái nhà an toàn (宀) nâng niu cất giữ viên ngọc bích quý giá (玉), biểu thị báu vật, bảo bối trân quý.",
    illustration: {
      badge: "💎",
      concept: "Viên ngọc báu vật",
      visualDesc: "Chiếc rương báu mở ra để lộ viên ngọc bích tỏa ánh hào quang rực rỡ."
    }
  },
  "寺": {
    components: ["土", "寸"],
    equation: "Thổ (đất thiêng non cao) + Thốn (bàn tay tu tập giữ giới quy)",
    mnemonic: "Mảnh đất thanh tịnh nơi núi cao (土) người tu hành giữ gìn nề nếp thiền môn trang nghiêm, đó là ngôi chùa cổ kính.",
    illustration: {
      badge: "🛕",
      concept: "Ngôi chùa cổ kính",
      visualDesc: "Mái chùa cong rêu phong tĩnh lặng giữa rừng thông rì rào tiếng chuông ngân."
    }
  },
  "封": {
    components: ["土", "土", "寸"],
    equation: "Đắp hai gò đất ranh giới (圭) + tay (寸) cắm mốc niêm phong phân định",
    mnemonic: "Đắp đất cắm mốc phân định lãnh thổ ban cấp (圭 寸), niêm phong kín phong thư và phong kiến.",
    illustration: {
      badge: "✉️",
      concept: "Bao thư niêm phong sáp",
      visualDesc: "Phong bì thư thắt dải ruy băng gắn con dấu sáp niêm phong trang trọng."
    }
  },
  "専": {
    components: ["十", "日", "寸"],
    equation: "Bàn tay (寸) miệt mài xoay con thoi dệt suốt ngày (十 日) không xao nhãng",
    mnemonic: "Bàn tay ngày đêm dồn trọn tâm trí vào guồng tơ duy nhất (寸), biểu thị sự chuyên tâm, chuyên môn sâu rộng.",
    illustration: {
      badge: "🎯",
      concept: "Chuyên tâm một mục tiêu",
      visualDesc: "Đôi bàn tay nghệ nhân tập trung cao độ chạm khắc từng chi tiết tinh xảo."
    }
  },
  "将": {
    components: ["丬", "夕", "寸"],
    equation: "Tay cầm kiếm lệnh (寸) trước bàn cúng tế chuẩn bị xuất quân",
    mnemonic: "Vị dũng tướng đưa tay nhận kiếm lệnh xuất chinh dẫn dắt đại quân, nắm giữ vận mệnh và tương lai phía trước.",
    illustration: {
      badge: "🎖️",
      concept: "Đại tướng oai nghiêm",
      visualDesc: "Vị tướng lĩnh mặc áo giáp oai phong chỉ huy đoàn quân tiến bước."
    }
  },
  "尊": {
    components: ["丷", "酉", "寸"],
    equation: "Bình rượu ủ men thượng hạng (酉) được hai tay (寸) cung kính dâng lên",
    mnemonic: "Hai tay nâng bình rượu quý dâng lên bậc tiền bối đáng kính trọng (酉 寸), biểu thị sự tôn sùng, tôn kính.",
    illustration: {
      badge: "👑",
      concept: "Bậc tôn quý đáng kính",
      visualDesc: "Hình ảnh cúi mình thành kính dâng trà thơm tôn vinh bậc hiền triết."
    }
  },
  "導": {
    components: ["道", "寸"],
    equation: "Đạo (道 con đường sáng) + 寸 (bàn tay ân cần dẫn dắt)",
    mnemonic: "Bàn tay ân cần (寸) chỉ lối dẫn dắt bước đi đúng trên con đường chân chính (道), chỉ bảo và hướng đạo.",
    illustration: {
      badge: "🧭",
      concept: "Dẫn đường chỉ lối",
      visualDesc: "Ngọn hải đăng soi luồng sáng rực rỡ dẫn lối con tàu cập bến an toàn."
    }
  },
  "届": {
    components: ["尸", "由"],
    equation: "Hành trình từ nơi xuất phát (由) đã đến đích ngồi ngả lưng (尸)",
    mnemonic: "Gói bưu phẩm đi từ nơi xuất phát (由) đã chuyển đến tận ngưỡng cửa nhà người nhận an toàn, giao đến, gửi tới.",
    illustration: {
      badge: "📦",
      concept: "Giao hàng tận nơi",
      visualDesc: "Bưu tá tươi cười trao tận tay khách hàng gói bưu kiện nguyên vẹn."
    }
  },
  "層": {
    components: ["尸", "丷", "日", "日"],
    equation: "尸 (ngôi nhà) + 曽 (chồng chất từng tầng lớp lên cao)",
    mnemonic: "Ngôi nhà cao ốc xây chồng chất từng tầng lầu vững chãi lên cao, biểu thị tầng lớp xã hội, nhiều tầng.",
    illustration: {
      badge: "🏢",
      concept: "Tòa cao ốc nhiều tầng",
      visualDesc: "Tòa cao ốc hiện đại với nhiều tầng kính sáng bóng soi bóng mây trời."
    }
  },
  "岩": {
    components: ["山", "石"],
    equation: "山 (núi non trùng điệp) + 石 (tảng đá hoa cương rắn chắc)",
    mnemonic: "Trên sườn ngọn núi cao (山) nhô ra những khối đá tảng khổng lồ vững chãi (石), đó là vách đá nham thạch.",
    illustration: {
      badge: "🪨",
      concept: "Vách đá sừng sững",
      visualDesc: "Vách đá nham thạch sừng sững dựng đứng bên bờ biển sóng vỗ tung bọt trắng."
    }
  },
  "岸": {
    components: ["山", "厂", "干"],
    equation: "Núi đá ven nước (山) + dải đất bằng phẳng cắm cọc neo thuyền (干)",
    mnemonic: "Nơi núi đá và đất liền tiếp giáp với mặt nước mênh mông, nơi neo thuyền cập bến bờ sông, bờ biển.",
    illustration: {
      badge: "🏖️",
      concept: "Bờ biển thanh bình",
      visualDesc: "Bờ cát trắng mịn thoai thoải bên làn nước biển xanh trong gợn sóng êm."
    }
  },
  "島": {
    components: ["鳥", "山"],
    equation: "Chú chim biển mỏi cánh đáp xuống ngọn núi (山) nhô lên giữa đại dương",
    mnemonic: "Chim hải âu bay mỏi cánh giữa biển khơi tìm thấy ngọn núi xanh (山) nhô lên giữa muôn trùng sóng, đó là hòn đảo.",
    illustration: {
      badge: "🏝️",
      concept: "Hòn đảo xanh ngát",
      visualDesc: "Hòn đảo xanh biếc rợp bóng dừa nổi bật giữa làn nước đại dương xanh ngọc."
    }
  },
  "州": {
    components: ["州"],
    equation: "Ba dòng nước sông chảy quanh những dải cồn cát bồi đắp",
    mnemonic: "Dòng nước sông chia nhánh bồi đắp nên những doi đất phù sa trù phú giữa sông, hình thành vùng đất châu hạt.",
    illustration: {
      badge: "🗺️",
      concept: "Vùng đất châu hạt",
      visualDesc: "Vùng đồng bằng phù sa màu mỡ chia cắt bởi những nhánh sông êm đềm."
    }
  }
};

const rootJsonPath = path.join(__dirname, '../kanji_full_database.json');
const publicJsonPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootJsPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicJsonPath, 'utf8'));

let count = 0;
for (const [char, patch] of Object.entries(n2aData)) {
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

console.log(`[Batch 4A - N2 Part 1] Đã cập nhật thành công ${count} / ${Object.keys(n2aData).length} chữ Kanji N2.`);

fs.writeFileSync(publicJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsPath, 'window.KANJI_FULL_DATABASE = ' + JSON.stringify(db, null, 2) + ';\n', 'utf8');
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
