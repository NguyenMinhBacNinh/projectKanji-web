/**
 * Batch 5H: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 95 chữ Kanji N1 tiếp theo (từ 災 đến 砲)
 */

const fs = require('fs');
const path = require('path');

const n1hData = {
  "災": {
    "components": ["巛", "火"],
    "equation": "巛 (Dòng nước lũ cuồn cuộn) + 火 (Ngọn lửa thiêu đốt dữ dội)",
    "mnemonic": "Nước lũ dâng cao cùng lửa dữ thiêu rụi là hai mối hiểm họa khôn lường của thiên nhiên, tai họa, thiên tai, hỏa tai.",
    "illustration": {
      "badge": "🌋",
      "concept": "Thiên tai bão lửa cuồng nộ",
      "visualDesc": "Cảnh tượng đất trời chao đảo trước sức tàn phá của bão lũ và hỏa hoạn."
    }
  },
  "炉": {
    "components": ["火", "戸"],
    "equation": "火 (Ngọn lửa hồng ấm áp) giữ kín bên trong cánh cửa nhà (戸)",
    "mnemonic": "Ngọn lửa sưởi ấm được che chắn cẩn thận sau cánh cửa lò không để tàn lửa bay ra ngoài, lò sưởi, lò luyện kim (iroko).",
    "illustration": {
      "badge": "🔥",
      "concept": "Lò sưởi củi đỏ rực trong nhà",
      "visualDesc": "Bếp lửa sưởi ấm cúng bằng gạch đỏ đang cháy tí tách trong đêm đông lạnh giá."
    }
  },
  "炊": {
    "components": ["火", "欠"],
    "equation": "火 (Bếp lửa) + 欠 (Há miệng thổi bùng ngọn lửa)",
    "mnemonic": "Há miệng thổi bùng ngọn lửa củi để nấu sôi nồi cơm trắng thơm dẻo, thổi cơm, nấu nướng, nấu ăn.",
    "illustration": {
      "badge": "🍚",
      "concept": "Nồi cơm trắng nghi ngút khói",
      "visualDesc": "Nồi cơm nấu bằng nồi gang cổ truyền vừa chín tới thơm lừng hạt gạo dẻo."
    }
  },
  "炎": {
    "components": ["火", "火"],
    "equation": "Hai ngọn lửa (火 + 火) chồng lên nhau bùng cháy rực rỡ",
    "mnemonic": "Lửa chồng thêm lửa bốc cao ngùn ngụt tỏa hơi nóng thiêu đốt làm sưng tấy, ngọn lửa bốc cao, viêm nhiễm.",
    "illustration": {
      "badge": "🔥",
      "concept": "Ngọn lửa đôi bùng cháy ngút trời",
      "visualDesc": "Cột lửa rực rỡ bùng lên dữ dội chiếu sáng rực cả một góc trời đêm."
    }
  },
  "為": {
    "components": ["為"],
    "equation": "Hình tượng bàn tay đang dắt và thuần dưỡng chú voi để bắt tay vào làm việc lớn",
    "mnemonic": "Bàn tay khéo léo bắt tay vào hành động vì mục đích cao đẹp, hành vi, làm nên, vì ai đó.",
    "illustration": {
      "badge": "🤝",
      "concept": "Hành động vì lợi ích chung",
      "visualDesc": "Đôi bàn tay cùng chung sức dựng xây công trình mang lại hạnh phúc cho mọi người."
    }
  },
  "烈": {
    "components": ["列", "灬"],
    "equation": "列 (Hàng ngũ binh sĩ chỉnh tề) hừng hực ngọn lửa nhiệt huyết (灬)",
    "mnemonic": "Khí thế hừng hực như ngọn lửa bốc cháy trong hàng ngũ chiến binh dũng cảm, mãnh liệt, oanh liệt, nồng nhiệt.",
    "illustration": {
      "badge": "⚡",
      "concept": "Khí phách mãnh liệt oanh liệt",
      "visualDesc": "Ngọn đuốc cháy rực sáng ngời soi đường cho đạo quân xung trận đầy hào khí."
    }
  },
  "焦": {
    "components": ["隹", "灬"],
    "equation": "隹 (Con chim nhỏ) bị nướng xém trên ngọn lửa bừng cháy (灬)",
    "mnemonic": "Con chim bị hơ trên lửa khiến lông cháy sém đen, lòng người nôn nóng sốt ruột như lửa đốt, cháy sém, sốt ruột.",
    "illustration": {
      "badge": "🍳",
      "concept": "Miếng bánh cháy sém trên chảo",
      "visualDesc": "Lớp vỏ bánh nướng vàng ruộm hơi xém cạnh tỏa hương thơm bùi đặc trưng."
    }
  },
  "煩": {
    "components": ["火", "頁"],
    "equation": "火 (Ngọn lửa bốc nóng) xông thẳng lên đầu mặt (頁)",
    "mnemonic": "Bao nhiêu chuyện rắc rối khiến đầu óc bốc hỏa nóng ran như có lửa đốt, phiền não, phiền toái, quấy rầy.",
    "illustration": {
      "badge": "🤯",
      "concept": "Cơn đau đầu phiền não bốc hỏa",
      "visualDesc": "Người ôm đầu thở dài trước đống giấy tờ hồ sơ hỗn độn cần giải quyết."
    }
  },
  "煮": {
    "components": ["者", "灬"],
    "equation": "者 (Người đầu bếp bỏ đồ ăn vào nồi) bắc lên bếp lửa than hồng (灬)",
    "mnemonic": "Đặt nồi thức ăn lên ngọn lửa liu riu đun sôi cho các nguyên liệu ngấm đượm gia vị, ninh nhừ, hầm chín, nấu canh.",
    "illustration": {
      "badge": "🍲",
      "concept": "Nồi lẩu oden sôi sùng sục",
      "visualDesc": "Nồi súp oden ngập tràn củ cải, chả cá đang sôi nhẹ bốc hơi thơm nghi ngút."
    }
  },
  "熊": {
    "components": ["能", "灬"],
    "equation": "能 (Con gấu với sức mạnh phi thường và bộ móng sắc nhọn) + 灬 (Bàn chân múp míp lông lá)",
    "mnemonic": "Loài mãnh thú có sức mạnh vô song với bàn chân móng vuốt lực lưỡng nơi rừng rậm, con gấu (kuma).",
    "illustration": {
      "badge": "🐻",
      "concept": "Chú gấu nâu dũng mãnh",
      "visualDesc": "Chú gấu nâu to lớn đứng uy nghiêm bên bờ suối rình bắt cá hồi vượt thác."
    }
  },
  "熙": {
    "components": ["巸", "灬"],
    "equation": "巸 (Ánh sáng rộng lớn) bừng lên từ ngọn lửa hồng rạng rỡ (灬)",
    "mnemonic": "Ánh dương rạng ngời sưởi ấm muôn dân mang lại cảnh thái bình an lạc, sáng sủa, hòa vui, hưng thịnh Khang Hy.",
    "illustration": {
      "badge": "☀️",
      "concept": "Ánh sáng chan hòa ấm áp",
      "visualDesc": "Mặt trời rạng rỡ tỏa muôn luồng ánh sáng ấm áp xuống cung điện nguy nga."
    }
  },
  "熟": {
    "components": ["孰", "灬"],
    "equation": "孰 (Nguyên liệu được ủ kỹ) gặp ngọn lửa vừa đủ (灬) làm chín tới",
    "mnemonic": "Thức ăn đun nấu đủ lửa chín mềm thơm ngon, kỹ năng rèn luyện lâu ngày thành thục, chín muồi, thành thạo.",
    "illustration": {
      "badge": "🍎",
      "concept": "Quả táo chín đỏ mọng ngọt ngào",
      "visualDesc": "Quả táo trên cành căng mọng màu đỏ tươi tỏa hương thơm ngọt ngào mùa thu hoạch."
    }
  },
  "燎": {
    "components": ["火", "尞"],
    "equation": "火 (Ngọn lửa thiêu đốt) + 尞 (Đốt củi trên giàn cao dâng lễ tế trời)",
    "mnemonic": "Đốt đuốc sáng rực dâng lễ tế trời đêm, ngọn lửa cháy lan thiêu rụi đồng cỏ khô, rực sáng, lửa cháy lan.",
    "illustration": {
      "badge": "🔥",
      "concept": "Đuốc lửa sáng rực đêm hội",
      "visualDesc": "Ngọn đuốc khổng lồ bừng cháy sáng rực xua tan màn đêm tĩnh mịch chốn rừng thiêng."
    }
  },
  "燦": {
    "components": ["火", "粲"],
    "equation": "火 (Ánh lửa bừng sáng) soi rọi những hạt gạo trắng tinh tuyển chọn (粲)",
    "mnemonic": "Ánh sáng rực rỡ lấp lánh như sao sa chiếu sáng tương lai phía trước, xán lạn, chói lọi, rực rỡ.",
    "illustration": {
      "badge": "✨",
      "concept": "Ánh hào quang rực rỡ xán lạn",
      "visualDesc": "Muôn ngàn tia sáng lấp lánh như viên kim cương tỏa sáng rạng ngời."
    }
  },
  "燿": {
    "components": ["火", "翟"],
    "equation": "火 (Ngọn lửa) rực rỡ như lông chim trĩ muôn màu sặc sỡ (翟)",
    "mnemonic": "Ánh lửa chói lòa tỏa chiếu rạng rỡ làm sáng bừng muôn phương trời, chiếu diệu, lấp lánh rực rỡ.",
    "illustration": {
      "badge": "🌟",
      "concept": "Ánh sáng chói lọi rực rỡ",
      "visualDesc": "Ngôi sao băng vụt sáng chói lòa trên bầu trời đêm để lại vệt sáng lung linh."
    }
  },
  "爵": {
    "components": ["爫", "鬯", "寸"],
    "equation": "Bàn tay (爫/寸) nâng chiếc chén rót rượu thơm (鬯) trong nghi lễ phong quan",
    "mnemonic": "Chiếc chén rượu hình chim sẻ dùng trong nghi lễ phong thưởng ngôi thứ cho bậc đại thần, tước vị, tước hiệu.",
    "illustration": {
      "badge": "🏆",
      "concept": "Chén rượu đồng phong tước",
      "visualDesc": "Chiếc chén rượu bằng đồng cổ ba chân tinh xảo dùng trong đại lễ triều đình."
    }
  },
  "爽": {
    "components": ["大", "爻", "爻"],
    "equation": "Đứng dang rộng hai tay (大) đón làn gió mát len qua các ô rèm cửa sổ (爻 爻)",
    "mnemonic": "Đứng giữa thiên nhiên hít căng lồng ngực làn gió sớm mai mát lành tinh khiết, sảng khoái, thoáng đãng.",
    "illustration": {
      "badge": "🍃",
      "concept": "Làn gió sớm mát lành sảng khoái",
      "visualDesc": "Người đứng trên đỉnh đồi dang tay đón làn gió mát rượi ban mai trong lành."
    }
  },
  "爾": {
    "components": ["一", "冂", "爻"],
    "equation": "Hình tượng khung cửi đan các sợi tơ bắt chéo vào nhau (爻)",
    "mnemonic": "Nhìn thẳng vào người đối diện đang cùng dệt nên câu chuyện với mình, ngươi, mày, như thế (nhĩ lôi).",
    "illustration": {
      "badge": "🪞",
      "concept": "Tấm gương soi phản chiếu bạn",
      "visualDesc": "Gương soi cổ kính phản chiếu hình ảnh chân thực của chính bản thân."
    }
  },
  "牧": {
    "components": ["牛", "攵"],
    "equation": "牛 (Con trâu bò) + 攵 (Bàn tay cầm roi lùa gia súc ăn cỏ)",
    "mnemonic": "Cầm roi nhẹ nhàng lùa đàn bò ra đồng cỏ xanh mướt kiếm ăn, chăn nuôi, đồng cỏ mục đồng, mục sư.",
    "illustration": {
      "badge": "🐄",
      "concept": "Mục đồng chăn bò trên đồng cỏ",
      "visualDesc": "Chú mục đồng ngồi thổi sáo trên lưng trâu giữa thảo nguyên bao la xanh ngát."
    }
  },
  "牲": {
    "components": ["牛", "生"],
    "equation": "牛 (Con bò thuần khiết) được nuôi dưỡng còn sống nguyên (生) để dâng tế thần linh",
    "mnemonic": "Con bò khỏe mạnh toàn vẹn dâng lên trời đất cầu mưa thuận gió hòa, vật hiến tế, sinh linh, hy sinh.",
    "illustration": {
      "badge": "🕯️",
      "concept": "Vật hiến tế dâng lên thần linh",
      "visualDesc": "Lễ vật trang trọng thanh tịnh được dâng lên trước bệ thờ đền cổ."
    }
  },
  "犠": {
    "components": ["牛", "義"],
    "equation": "牛 (Con trâu bò) dâng lên vì đạo nghĩa cao thượng (義)",
    "mnemonic": "Sẵn sàng dâng hiến mạng sống và lợi ích cá nhân vì sự nghiệp chính nghĩa cao cả, hy sinh, con vật tế lễ.",
    "illustration": {
      "badge": "🕊️",
      "concept": "Tinh thần xả thân vì đại nghĩa",
      "visualDesc": "Bức tượng đài tưởng niệm ghi ơn những người đã dâng trọn đời mình vì đất nước."
    }
  },
  "狂": {
    "components": ["犭", "王"],
    "equation": "犭 (Con chó hoang) lồng lộn hung hãn tự phong mình làm chúa tể vương giả (王)",
    "mnemonic": "Hành vi mất kiểm soát điên cuồng như chó dại chạy rông sủa vang rừng, điên cuồng, cuồng nhiệt, kịch cuồng.",
    "illustration": {
      "badge": "🌪️",
      "concept": "Cơn lốc cuồng phong dữ dội",
      "visualDesc": "Cơn lốc xoáy quét qua cuồn cuộn thể hiện sức mạnh điên cuồng không thể ngăn cản."
    }
  },
  "狙": {
    "components": ["犭", "且"],
    "equation": "犭 (Con thú săn) nấp sau tảng đá phẳng (且) chờ thời cơ",
    "mnemonic": "Nấp kín kiên nhẫn ngắm thẳng vào hồng tâm chuẩn bị hạ gục mục tiêu, rình rập, nhắm bắn, xạ thủ bắn tỉa.",
    "illustration": {
      "badge": "🎯",
      "concept": "Tầm ngắm bắn tỉa chuẩn xác",
      "visualDesc": "Hồng tâm ống ngắm chữ thập khóa chặt mục tiêu chuẩn bị khai hỏa."
    }
  },
  "狩": {
    "components": ["犭", "守"],
    "equation": "犭 (Chó săn) hỗ trợ người canh gác (守) lần theo dấu vết con thú",
    "mnemonic": "Dẫn theo đàn chó săn đi sâu vào rừng sâu giương cung bắn thú hoang, săn bắn, săn lùng, hái lượm.",
    "illustration": {
      "badge": "🏹",
      "concept": "Thợ săn giương cung giữa rừng thu",
      "visualDesc": "Người thợ săn cùng chú chó trung thành giương cung nhắm vào sâu trong rừng lá đỏ."
    }
  },
  "独": {
    "components": ["犭", "虫"],
    "equation": "犭 (Loài thú hoang dã) chỉ sống thui thủi một mình như sâu bọ cô đơn (虫)",
    "mnemonic": "Một mình lẻ bóng bước đi trên con đường riêng không cần bầy đàn phụ thuộc, cô độc, độc lập, độc nhất.",
    "illustration": {
      "badge": "🐺",
      "concept": "Chú sói cô độc dưới trăng",
      "visualDesc": "Chú sói đơn độc đứng trên đỉnh núi tuyết ngước nhìn vầng trăng khuyết tĩnh lặng."
    }
  },
  "狭": {
    "components": ["犭", "夾"],
    "equation": "犭 (Con chó) bị kẹp ép chặt giữa hai người áp sát hai bên (夾)",
    "mnemonic": "Lối đi nhỏ bé bị ép chặt hai bên vách đá chật chội không vừa người qua, chật hẹp, eo hẹp, nhỏ hẹp.",
    "illustration": {
      "badge": "🚪",
      "concept": "Lối ngõ hẻm chật hẹp",
      "visualDesc": "Con ngõ nhỏ hẹp sâu hút giữa hai bức tường rêu phong chỉ vừa một người đi."
    }
  },
  "猛": {
    "components": ["犭", "孟"],
    "equation": "犭 (Chó săn hung dữ) + 孟 (Con cả đầu đàn đầy uy lực và sức mạnh)",
    "mnemonic": "Sức mạnh dũng mãnh hung bạo của loài thú dữ đầu đàn xông pha trận mạc, dũng mãnh, hung dữ, mãnh liệt.",
    "illustration": {
      "badge": "🐅",
      "concept": "Chúa sơn lâm dũng mãnh gầm vang",
      "visualDesc": "Mãnh hổ vằn vện gầm vang uy dũng trên mỏm đá chúa tể rừng xanh."
    }
  },
  "猟": {
    "components": ["犭", "鼡"],
    "equation": "犭 (Chó săn đánh hơi) truy đuổi dấu vết đàn thú ẩn nấp trong bụi rậm (鼡)",
    "mnemonic": "Cuộc rượt đuổi truy tìm muông thú trong rừng sâu của người thợ săn, săn bắt, săn bắn, săn lùng tin tức.",
    "illustration": {
      "badge": "🐕",
      "concept": "Chó săn đánh hơi đuổi mồi",
      "visualDesc": "Chú chó săn tinh khôn đang lần theo dấu vết chân hươu trên thảm lá rụng mùa đông."
    }
  },
  "猪": {
    "components": ["犭", "者"],
    "equation": "犭 (Loài dã thú lông bờm) lao thẳng về phía trước không sợ người (者)",
    "mnemonic": "Con lợn rừng có đôi nanh cong vút dũng mãnh húc tung mọi rào cản, heo rừng, lợn lòi (inoshishi).",
    "illustration": {
      "badge": "🐗",
      "concept": "Heo rừng lao vút dũng mãnh",
      "visualDesc": "Chú heo rừng dũng cảm với cặp nanh sắc nhọn lao đi vun vút qua cánh rừng rậm."
    }
  },
  "献": {
    "components": ["南", "犬"],
    "equation": "Dâng chiếc đỉnh lễ tế đựng thịt thơm cùng chú chó tế lễ (犬) lên bàn thờ",
    "mnemonic": "Hai tay nâng đồ quý giá dâng lên phục vụ cộng đồng và đất nước, cống hiến, hiến dâng, thực đơn (kondate).",
    "illustration": {
      "badge": "🎁",
      "concept": "Hai tay trân trọng dâng tặng",
      "visualDesc": "Đôi bàn tay kính cẩn dâng món quà tinh thần quý giá đóng góp cho cộng đồng."
    }
  },
  "猶": {
    "components": ["犭", "酋"],
    "equation": "犭 (Loài vượn nghi ngờ đa đoan) bên cạnh vò rượu ủ lâu năm (酋)",
    "mnemonic": "Tính hay nghi hoặc cứ dùng dằng suy nghĩ mãi chưa dám quyết định ngay, do dự, vẫn còn, giống như.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Cân nhắc do dự đắn đo",
      "visualDesc": "Chiếc cân thăng bằng nghiêng qua lại thể hiện sự đắn đo suy nghĩ trước lựa chọn lớn."
    }
  },
  "猿": {
    "components": ["犭", "袁"],
    "equation": "犭 (Loài linh trưởng) mặc chiếc áo choàng dài thùng thình bắt chước con người (袁)",
    "mnemonic": "Chú khỉ thông minh leo trèo thoăn thoắt trên cành cây bắt chước điệu bộ con người, con khỉ, vượn (saru).",
    "illustration": {
      "badge": "🐒",
      "concept": "Chú khỉ tuyết ngâm onsen",
      "visualDesc": "Chú khỉ tuyết Nhật Bản gối đầu thư giãn trong hồ nước khoáng nóng bốc hơi sương."
    }
  },
  "獄": {
    "components": ["犭", "言", "犬"],
    "equation": "Hai con chó dữ (犭 và 犬) gầm gừ canh giữ nơi tra hỏi lời khai phạm nhân (言)",
    "mnemonic": "Nơi nhốt kẻ tội đồ có chó dữ canh gác nghiêm ngặt bốn phía không lối thoát, ngục tù, nhà tù, địa ngục.",
    "illustration": {
      "badge": "⛓️",
      "concept": "Song sắt nhà giam kiên cố",
      "visualDesc": "Cánh cổng ngục sắt kiên cố với ổ khóa dày then cài chặn đứng mọi nẻo tự do."
    }
  },
  "獣": {
    "components": ["嘼", "犬"],
    "equation": "Đàn thú nuôi có miệng kêu (嘼) cùng chú chó giữ nhà canh phòng (犬)",
    "mnemonic": "Muông thú hoang dã sinh sống trong rừng sâu với bản năng tự nhiên hoang dại, dã thú, muông thú, thú y.",
    "illustration": {
      "badge": "🦁",
      "concept": "Muông thú tự do chốn sơn lâm",
      "visualDesc": "Đàn muông thú sải bước tự do trên đồng cỏ bao la dưới bóng cây cổ thụ."
    }
  },
  "獲": {
    "components": ["犭", "艹", "隻"],
    "equation": "犭 (Chó săn bắt lấy) con chim rừng (隻) đang lẩn trốn trong bụi cỏ rậm (艹)",
    "mnemonic": "Sau chuyến đi săn vất vả bắt được chiến lợi phẩm mang về nhà, thu hoạch, bắt được thú, đắc hoạch.",
    "illustration": {
      "badge": "🌾",
      "concept": "Bắt được chiến lợi phẩm",
      "visualDesc": "Chiếc giỏ đầy ắp hoa quả và cá tươi thu hoạch sau một ngày lao động chăm chỉ."
    }
  },
  "玄": {
    "components": ["亠", "幺"],
    "equation": "亠 (Mũ đội che khuất) + 幺 (Sợi tơ nhỏ nhuộm màu tối sâu thẳm)",
    "mnemonic": "Sợi tơ đen nhuộm màu tối thăm thẳm mở ra cánh cửa vào thế giới tri thức sâu kín, huyền bí, màu đen, huyền quan (genkan).",
    "illustration": {
      "badge": "🚪",
      "concept": "Huyền quan tiền sảnh genkan",
      "visualDesc": "Tiền sảnh genkan thanh lịch của ngôi nhà Nhật Bản với sàn gỗ bóng loáng và đôi guốc mộc."
    }
  },
  "率": {
    "components": ["玄", "十", "冫"],
    "equation": "Sợi dây bện chặt (玄) buộc thắt các điểm giọt nước (冫) chia đều thành từng phần mười (十)",
    "mnemonic": "Dẫn dắt đoàn quân đi đầu theo tỉ lệ đội hình tính toán chu đáo, dẫn đầu, suất lĩnh, tỉ lệ phần trăm.",
    "illustration": {
      "badge": "📊",
      "concept": "Biểu đồ tỉ lệ phần trăm",
      "visualDesc": "Biểu đồ thanh mảnh hiển thị tỷ lệ chính xác tăng trưởng theo từng mốc thời gian."
    }
  },
  "玖": {
    "components": ["王", "久"],
    "equation": "王 (Viên ngọc quý) giữ được vẻ sáng đẹp bền vững qua thời gian lâu dài (久)",
    "mnemonic": "Viên đá đen nhánh quý giá tựa ngọc bích trường tồn vĩnh cửu, số 9 viết trang trọng, đá ngọc quý đen.",
    "illustration": {
      "badge": "🖤",
      "concept": "Viên ngọc đen quý giá huyền bí",
      "visualDesc": "Viên đá đen óng ả bóng bẩy tỏa ra vẻ đẹp quyền quý trường tồn cùng thời gian."
    }
  },
  "玲": {
    "components": ["王", "令"],
    "equation": "王 (Ngọc quý) va chạm phát ra mệnh lệnh âm thanh trong trẻo (令)",
    "mnemonic": "Tiếng ngọc va chạm leng keng phát ra giai điệu thanh thoát êm tai, linh lung, ngọc trong trẻo.",
    "illustration": {
      "badge": "🎐",
      "concept": "Tiếng chuông gió ngọc leng keng",
      "visualDesc": "Chiếc chuông gió bằng đá ngọc đung đưa phát ra tiếng reo leng keng thanh thoát trong gió."
    }
  },
  "珠": {
    "components": ["王", "朱"],
    "equation": "王 (Viên ngọc bích tròn) tỏa sắc đỏ chu sa rực rỡ óng ánh (朱)",
    "mnemonic": "Hạt ngọc trai tròn trịa hình thành từ giọt nước mắt của biển cả, ngọc trai, hạt châu, chân châu.",
    "illustration": {
      "badge": "🦪",
      "concept": "Viên ngọc trai tròn xoe lấp lánh",
      "visualDesc": "Vỏ sò hé mở để lộ viên ngọc trai tròn vo ánh xà cừ lấp lánh tuyệt mỹ."
    }
  },
  "班": {
    "components": ["王", "刀", "王"],
    "equation": "Dùng dao (刀) cắt đôi khối ngọc quý (王 王) chia đều cho hai nhóm",
    "mnemonic": "Chia ngọc đều cho từng người rồi phân chia thành các tổ nhóm phối hợp công việc, ban đội, phân ban, nhóm lớp.",
    "illustration": {
      "badge": "👥",
      "concept": "Phân chia đội nhóm làm việc",
      "visualDesc": "Các bạn học sinh cùng ngồi thảo luận vui vẻ trong ban phụ trách hoạt động nhóm."
    }
  },
  "琉": {
    "components": ["王", "㐬"],
    "equation": "王 (Đá ngọc) được nung chảy dòng lỏng như nước (㐬) rồi đúc thành hình",
    "mnemonic": "Chất thủy tinh màu xanh biếc óng ánh như ngọc nước biển vùng phương Nam, lưu ly, quần đảo Ryukyu.",
    "illustration": {
      "badge": "💎",
      "concept": "Khối thủy tinh lưu ly xanh biếc",
      "visualDesc": "Món đồ trang trí bằng thủy tinh màu xanh ngọc bích Ryukyu lung linh dưới ánh mặt trời."
    }
  },
  "琢": {
    "components": ["王", "豕"],
    "equation": "王 (Khối ngọc thô) được kiên nhẫn đục đẽo tỉ mỉ từng chút như dáng lợn béo (豕)",
    "mnemonic": "Ngọc bất trác bất thành khí, phải mài giũa tôi luyện mới trở thành bảo vật vô giá, mài giũa ngọc, trác tuyệt.",
    "illustration": {
      "badge": "✨",
      "concept": "Mài giũa viên ngọc sáng ngời",
      "visualDesc": "Nghệ nhân dùng bàn xoay mài dũa góc cạnh cho khối ngọc thô trở nên sáng lấp lánh."
    }
  },
  "琳": {
    "components": ["王", "林"],
    "equation": "王 (Ngọc bội) treo san sát như rừng cây (林) va vào nhau ngân vang",
    "mnemonic": "Viên ngọc đẹp phát ra âm thanh trong vắt khi va chạm tựa tiếng suối reo giữa rừng, ngọc lâm, âm ngọc trong vắt.",
    "illustration": {
      "badge": "💎",
      "concept": "Dây chuyền chuỗi ngọc biếc",
      "visualDesc": "Chuỗi ngọc bội xanh biếc đung đưa tỏa ánh sáng lộng lẫy thanh tao."
    }
  },
  "琴": {
    "components": ["王", "王", "今"],
    "equation": "Hai phím ngọc (王 王) cùng hòa nhịp dưới đôi tay hiện tại (今) gảy đàn",
    "mnemonic": "Cung đàn mười ba dây gảy lên những thanh âm trầm bổng rung động lòng người, đàn koto, đàn cầm, đàn piano.",
    "illustration": {
      "badge": "🎵",
      "concept": "Cây đàn tranh koto truyền thống",
      "visualDesc": "Cây đàn koto dài bằng gỗ tùng với những phím ngọc trắng đang tấu khúc nhạc xuân."
    }
  },
  "瑚": {
    "components": ["王", "胡"],
    "equation": "王 (Viên ngọc biển) có hình cành nhánh như râu ria người phương Bắc (胡)",
    "mnemonic": "Những nhánh ngọc quý đỏ thắm mọc lên từ đáy biển sâu ngàn năm, san hô, rạn san hô biển.",
    "illustration": {
      "badge": "🪸",
      "concept": "Rạn san hô đỏ rực dưới đáy biển",
      "visualDesc": "Rạn san hô rực rỡ muôn màu đung đưa theo dòng hải lưu ấm áp nơi đáy đại dương."
    }
  },
  "瑛": {
    "components": ["王", "英"],
    "equation": "王 (Viên ngọc quý) tỏa ánh hào quang tinh anh tài ba (英)",
    "mnemonic": "Ánh sáng tinh hoa lấp lánh phản chiếu từ viên ngọc trong suốt không tì vết, ánh ngọc sáng, ngọc anh.",
    "illustration": {
      "badge": "💎",
      "concept": "Ánh hào quang của viên ngọc trong vắt",
      "visualDesc": "Viên pha lê ngọc anh khúc xạ ánh sáng mặt trời thành dải cầu vồng bảy sắc lung linh."
    }
  },
  "瑞": {
    "components": ["王", "耑"],
    "equation": "王 (Tấm ngọc bội làm tin) mang lại khởi đầu tốt lành từ mầm non nhú lên (耑)",
    "mnemonic": "Dấu hiệu cát tường mang lại may mắn và phước lành cho muôn dân, điềm lành, thụy tường, Thụy Sĩ.",
    "illustration": {
      "badge": "🍀",
      "concept": "Điềm lành mây ngũ sắc báo tin",
      "visualDesc": "Đám mây ngũ sắc cát tường lơ lửng trên đỉnh núi Phú Sĩ báo hiệu điềm lành đại cát."
    }
  },
  "瑠": {
    "components": ["王", "留"],
    "equation": "王 (Viên ngọc quý) lưu giữ (留) lại sắc xanh biếc thẳm sâu của bầu trời đêm",
    "mnemonic": "Viên đá ngọc xanh biếc giữ trọn vẻ đẹp lộng lẫy huyền bí của trời sao, ngọc lưu ly, lapis lazuli.",
    "illustration": {
      "badge": "🔷",
      "concept": "Viên đá lưu ly xanh biếc ngàn sao",
      "visualDesc": "Viên đá lapis lazuli xanh thẳm điểm những chấm vàng óng như bầu trời sao lấp lánh."
    }
  },
  "瑳": {
    "components": ["王", "差"],
    "equation": "王 (Viên ngọc bích) được gọt giũa tỉ mỉ từng chi tiết sai khác (差)",
    "mnemonic": "Khối ngọc trắng muốt được mài nhẵn bóng loáng trắng tinh tinh khôi, ngọc trắng bóng, mài ngọc.",
    "illustration": {
      "badge": "⚪",
      "concept": "Viên bạch ngọc tròn nhẵn bóng",
      "visualDesc": "Khối bạch ngọc trắng ngần được nghệ nhân đánh bóng trơn láng không tì vết."
    }
  },
  "瑶": {
    "components": ["王", "䍃"],
    "equation": "王 (Đá ngọc) sáng bóng mịn màng như chiếc bình gốm tráng men tuyệt hảo (䍃)",
    "mnemonic": "Viên ngọc bích tuyệt mỹ nơi hồ Dao Trì chốn bồng lai tiên cảnh, ngọc dao, dao trì bồng lai.",
    "illustration": {
      "badge": "🏝️",
      "concept": "Hồ Dao Trì chốn bồng lai",
      "visualDesc": "Mặt hồ tiên cảnh mây sương bao phủ với những bông sen ngọc lung linh huyền ảo."
    }
  },
  "璃": {
    "components": ["王", "离"],
    "equation": "王 (Đá ngọc) trong suốt nhìn xuyên qua tách biệt không tạp chất (离)",
    "mnemonic": "Chất liệu trong suốt phản chiếu sắc màu kỳ ảo như ngọc lưu ly, thủy tinh trong suốt, ngọc pha lê.",
    "illustration": {
      "badge": "🔮",
      "concept": "Quả cầu pha lê trong suốt",
      "visualDesc": "Quả cầu thủy tinh trong suốt phản chiếu ánh sáng huyền ảo lung linh tuyệt đẹp."
    }
  },
  "環": {
    "components": ["王", "睘"],
    "equation": "王 (Miếng ngọc bích) được tiện rỗng tròn trịa bao quanh đôi mắt chăm chú nhìn (睘)",
    "mnemonic": "Chiếc vòng ngọc tròn khép kín quay tròn tuần hoàn tạo thành không gian sống, vòng tròn, tuần hoàn, môi trường.",
    "illustration": {
      "badge": "🔄",
      "concept": "Vòng tròn tuần hoàn vô tận",
      "visualDesc": "Mũi tên tròn khép kín biểu trưng cho sự tái sinh tuần hoàn hài hòa với môi trường tự nhiên."
    }
  },
  "甚": {
    "components": ["甘", "匹"],
    "equation": "甘 (Vị ngọt ngào say đắm) được ôm ấp trọn vẹn trong lòng (匹)",
    "mnemonic": "Say mê đắm chìm vào cảm giác ngọt ngào đến mức tột cùng quá đỗi, rất đỗi, thậm chí, vô cùng.",
    "illustration": {
      "badge": "💥",
      "concept": "Mức độ tột cùng vô cùng",
      "visualDesc": "Đỉnh núi chọc trời chạm đến tầng mây cao thể hiện mức độ tột cùng vượt bậc."
    }
  },
  "甫": {
    "components": ["十", "用"],
    "equation": "Mầm cây có chồi nhú lên khỏi mặt đất màu mỡ có rãnh (用)",
    "mnemonic": "Mầm non vừa mới nhú lên bắt đầu một chu kỳ sinh trưởng mới, vừa mới, bắt đầu, người đàn ông đức độ.",
    "illustration": {
      "badge": "🌱",
      "concept": "Mầm non vừa mới nhú",
      "visualDesc": "Hai lá mầm xanh non tơ vừa vươn mình tách khỏi lớp vỏ hạt dưới sương sớm."
    }
  },
  "甲": {
    "components": ["甲"],
    "equation": "Hình tượng chiếc mai rùa cứng cáp hoặc lớp vỏ hạt mầm sắp nứt ra",
    "mnemonic": "Chiếc mai rùa cứng cáp bảo vệ thân mình, đứng đầu trong bảng can chi, áo giáp, mai rùa, giáp bảng số một.",
    "illustration": {
      "badge": "🐢",
      "concept": "Chiếc mai rùa cứng cáp",
      "visualDesc": "Mai rùa hoa văn lục giác cứng cáp che chở an toàn cho chú rùa biển ngàn năm."
    }
  },
  "畔": {
    "components": ["田", "半"],
    "equation": "田 (Thửa ruộng) phân chia một nửa ranh giới (半)",
    "mnemonic": "Bờ đất nhỏ đắp nổi phân chia ranh giới giữa hai thửa ruộng ngập nước, bờ ruộng, ven bờ hồ.",
    "illustration": {
      "badge": "🌾",
      "concept": "Bờ ruộng xanh mướt uốn lượn",
      "visualDesc": "Lối mòn nhỏ chạy dọc theo bờ ruộng bậc thang ngập tràn sắc lúa trĩu hạt."
    }
  },
  "畝": {
    "components": ["亠", "田", "久"],
    "equation": "Đắp đất (亠) trên ruộng (田) thành từng gò luống dài lâu năm (久)",
    "mnemonic": "Vun đất thành từng luống dài thẳng tắp để trồng rau màu tươi tốt, luống cày, mẫu đất (se).",
    "illustration": {
      "badge": "🚜",
      "concept": "Những luống cày thẳng tắp",
      "visualDesc": "Cánh đồng màu mỡ được vun thành những luống thẳng tắp chuẩn bị cho vụ mùa mới."
    }
  },
  "異": {
    "components": ["田", "共"],
    "equation": "Người mang chiếc mặt nạ quỷ dữ quái lạ (田) hai tay giơ cao nhảy múa (共)",
    "mnemonic": "Khuôn mặt đeo mặt nạ kỳ dị khác hẳn người thường trong lễ hội đuổi tà, khác lạ, dị thường, quái dị.",
    "illustration": {
      "badge": "🎭",
      "concept": "Mặt nạ nhảy múa kỳ dị",
      "visualDesc": "Chiếc mặt nạ gỗ hình thù kỳ dị bí hiểm trong vũ điệu thần đạo cổ xưa."
    }
  },
  "疎": {
    "components": ["疋", "束"],
    "equation": "疋 (Bàn chân bước đi) tách rời khỏi bó buộc gắn kết (束)",
    "mnemonic": "Khoảng cách bước chân ngày càng xa khiến mối quan hệ trở nên thưa thớt nhạt nhòa, sơ sài, xa cách, thưa thớt.",
    "illustration": {
      "badge": "🌿",
      "concept": "Hàng rào thưa thớt xa cách",
      "visualDesc": "Hàng rào cọc tre thưa thớt để gió lùa qua giữa hai khoảng sân rộng thênh thang."
    }
  },
  "疫": {
    "components": ["疒", "殳"],
    "equation": "疒 (Căn bệnh nằm liệt giường) lây lan đánh tới tấp như bị gậy quất (殳)",
    "mnemonic": "Căn bệnh truyền nhiễm nguy hiểm ập đến tấn công hàng loạt người dân cùng lúc, bệnh dịch, dịch hạch, dịch bệnh.",
    "illustration": {
      "badge": "🦠",
      "concept": "Đại dịch lây lan nguy hiểm",
      "visualDesc": "Hình ảnh kính hiển vi soi mầm bệnh vi khuẩn cần được phòng ngừa và cách ly y tế."
    }
  },
  "疾": {
    "components": ["疒", "矢"],
    "equation": "疒 (Cơn đau ốm) phóng tới bất thình lình nhanh như mũi tên bắn (矢)",
    "mnemonic": "Cơn đau bệnh đột ngột ập đến nhanh như tên bắn khiến người ta ngã quỵ, tật bệnh, ốm đau, phi nhanh tật phong.",
    "illustration": {
      "badge": "🏹",
      "concept": "Mũi tên lao đi vun vút",
      "visualDesc": "Mũi tên sắc bén lao đi vun vút trong không trung xé toạc làn gió lạnh."
    }
  },
  "症": {
    "components": ["疒", "正"],
    "equation": "疒 (Căn bệnh) biểu hiện chính xác thực tế ra ngoài (正)",
    "mnemonic": "Các dấu hiệu thực tế bộc lộ trên cơ thể giúp thầy thuốc chẩn đoán đúng bệnh trạng, triệu chứng, bệnh chứng.",
    "illustration": {
      "badge": "🩺",
      "concept": "Bác sĩ chẩn đoán triệu chứng",
      "visualDesc": "Chiếc ống nghe y tế đang kiểm tra nhịp đập cơ thể để xác định chính xác triệu chứng bệnh."
    }
  },
  "痘": {
    "components": ["疒", "豆"],
    "equation": "疒 (Bệnh nổi nốt) sưng tròn mọng nước như những hạt đậu (豆)",
    "mnemonic": "Căn bệnh làm nổi những nốt mụn tròn như hạt đậu trên khắp da thịt, bệnh đậu mùa, trái rạ.",
    "illustration": {
      "badge": "💉",
      "concept": "Tiêm vắc xin phòng bệnh đậu mùa",
      "visualDesc": "Mũi tiêm phòng vắc xin giúp cơ thể miễn dịch hoàn toàn trước virus đậu mùa."
    }
  },
  "痢": {
    "components": ["疒", "利"],
    "equation": "疒 (Bệnh đau bụng) làm phân tuôn ra nhanh buốt như dao sắc chém (利)",
    "mnemonic": "Cơn đau bụng quặn thắt gây đi ngoài xối xả kiệt sức, bệnh kiết lị, tiêu chảy cấp tính.",
    "illustration": {
      "badge": "💊",
      "concept": "Viên thuốc điều trị kiết lị",
      "visualDesc": "Hộp thuốc men tiêu hóa và nước bù điện giải hồi phục sức khỏe sau cơn đau bụng."
    }
  },
  "痴": {
    "components": ["疒", "知"],
    "equation": "疒 (Căn bệnh tâm trí) làm suy giảm mất đi nhận thức hiểu biết (知)",
    "mnemonic": "Tâm trí u mê đờ đẫn mất đi khả năng phân biệt đúng sai, si mê, si ngốc, chứng suy giảm trí nhớ.",
    "illustration": {
      "badge": "🧩",
      "concept": "Mảnh ghép trí nhớ bị khuyết",
      "visualDesc": "Bức tranh ghép hình thiếu mất một mảnh tượng trưng cho sự suy giảm nhận thức."
    }
  },
  "癒": {
    "components": ["疒", "兪"],
    "equation": "疒 (Vết thương đau đớn) được xoa dịu bằng dòng thuốc êm ái chảy vào (兪)",
    "mnemonic": "Vết thương trên thân xác và tâm hồn dần dần hồi phục lấy lại bình yên, chữa lành, bình phục, trị dũ.",
    "illustration": {
      "badge": "🌿",
      "concept": "Bàn tay xoa dịu chữa lành",
      "visualDesc": "Bàn tay ấm áp nhẹ nhàng chạm vào mầm lá xanh tỏa ra năng lượng hồi phục diệu kỳ."
    }
  },
  "癖": {
    "components": ["疒", "辟"],
    "equation": "疒 (Tật nghiêng lệch) đã bám rễ sâu như thói riêng khó dẹp bỏ (辟)",
    "mnemonic": "Cái tật xấu lặp đi lặp lại nhiều lần trở thành thói quen khó sửa, thói quen khó bỏ, tật xấu bẩm sinh.",
    "illustration": {
      "badge": "🔄",
      "concept": "Thói quen lặp đi lặp lại",
      "visualDesc": "Động tác xoay bút trên tay lặp đi lặp lại thành một thói quen vô thức khi suy nghĩ."
    }
  },
  "皇": {
    "components": ["白", "王"],
    "equation": "白 (Ánh hào quang trắng sáng rực rỡ) tỏa ra từ đỉnh đầu vị vua tôn quý (王)",
    "mnemonic": "Bậc thiên tử đứng đầu muôn dân tỏa ánh hào quang chiếu rọi khắp giang sơn, hoàng đế, hoàng tộc, hoàng gia.",
    "illustration": {
      "badge": "👑",
      "concept": "Chiếc vương miện hoàng đế uy nghiêm",
      "visualDesc": "Vương miện vàng nạm ngọc quý tỏa ánh hào quang rực rỡ tượng trưng quyền uy hoàng gia."
    }
  },
  "皐": {
    "components": ["白", "夲"],
    "equation": "Bờ đất nhô cao (夲) đón ánh sáng ban mai trắng xóa (白) ven dòng sông",
    "mnemonic": "Bờ đầm cao ráo đón ánh nắng đầu hạ nơi hoa diên vĩ nở rộ rực rỡ, bờ nước cao, tháng năm âm lịch (satsuki).",
    "illustration": {
      "badge": "🪷",
      "concept": "Đầm hoa diên vĩ tháng năm",
      "visualDesc": "Bờ đầm nước nở đầy những đóa hoa diên vĩ tím ngát dưới nắng đầu mùa hạ satsuki."
    }
  },
  "皓": {
    "components": ["白", "告"],
    "equation": "白 (Màu trắng tinh khiết) tỏa sáng rực rỡ công khai cho mọi người biết (告)",
    "mnemonic": "Màu trắng tinh khiết rực rỡ như hàm răng ngọc hay ánh trăng vằng vặc ban đêm, trắng muốt, sáng sủa rực rỡ.",
    "illustration": {
      "badge": "🌕",
      "concept": "Vầng trăng hạo nguyệt vằng vặc",
      "visualDesc": "Vầng trăng tròn vành vạnh trắng sáng ngời soi bóng xuống mặt hồ nước phẳng lặng."
    }
  },
  "盆": {
    "components": ["分", "皿"],
    "equation": "分 (Phân chia đồ lễ thành nhiều phần) đặt ngay ngắn trong chiếc đĩa sâu lòng (皿)",
    "mnemonic": "Chiếc khay nông đáy đựng đồ lễ dâng cúng tổ tiên ngày hội rằm tháng bảy, chậu hoa, mâm lễ, lễ hội Obon.",
    "illustration": {
      "badge": "🏮",
      "concept": "Lễ hội Vu lan Obon ấm áp",
      "visualDesc": "Những ngọn đèn lồng giấy Obon thả trôi lung linh trên mặt sông tưởng nhớ tổ tiên."
    }
  },
  "益": {
    "components": ["皿", "水"],
    "equation": "Nước đầy ắp tràn trề (水) ra khỏi miệng chiếc đĩa đựng (皿)",
    "mnemonic": "Nước trong đĩa đầy tràn trề mang lại sự dư dả giàu có cho muôn nhà, lợi ích, có ích, tăng thêm hữu ích.",
    "illustration": {
      "badge": "📈",
      "concept": "Sự gia tăng lợi ích dồi dào",
      "visualDesc": "Mầm cây xanh tươi trổ nhánh trĩu quả tượng trưng cho lợi ích và mùa màng bội thu."
    }
  },
  "盛": {
    "components": ["成", "皿"],
    "equation": "Thành quả viên mãn (成) được chất đầy vun ngọn trên chiếc đĩa dâng tiệc (皿)",
    "mnemonic": "Đồ ăn thức uống chất đầy ăm ắp trên khay mâm thể hiện sự phồn hoa sung túc, thịnh vượng, thịnh soạn, hưng thịnh.",
    "illustration": {
      "badge": "🍇",
      "concept": "Mâm hoa quả thịnh soạn đầy ắp",
      "visualDesc": "Chiếc đĩa bạc chất đầy các loại trái cây căng mọng trong yến tiệc cung đình."
    }
  },
  "盟": {
    "components": ["明", "皿"],
    "equation": "Dưới ánh sáng trăng rằm minh bạch (明), uống rượu thề trong chiếc chén quý (皿)",
    "mnemonic": "Cắt máu ăn thề trước thần linh chứng giám lập lời hẹn ước đồng lòng, minh ước, liên minh, đồng minh.",
    "illustration": {
      "badge": "🤝",
      "concept": "Cái bắt tay thắt chặt liên minh",
      "visualDesc": "Đôi bàn tay siết chặt thề ước chung lòng dưới ánh trăng soi sáng niềm tin sắt son."
    }
  },
  "監": {
    "components": ["臣", "人", "皿"],
    "equation": "Vị quan (臣) cúi mình nhìn sát xuống chiếc chậu nước (皿) để soi rõ từng chi tiết",
    "mnemonic": "Cúi đầu quan sát kỹ lưỡng hình ảnh phản chiếu trong chậu nước để phát hiện sai sót, giám sát, thanh tra, cai quản.",
    "illustration": {
      "badge": "🔍",
      "concept": "Quan viên giám sát công trình",
      "visualDesc": "Viên thanh tra mang bảng kiểm tra kỹ lưỡng từng quy trình thi công nghiêm ngặt."
    }
  },
  "盤": {
    "components": ["般", "皿"],
    "equation": "般 (Chiếc thuyền xoay chuyển đa năng) đặt trên chiếc mâm phẳng rộng đáy (皿)",
    "mnemonic": "Mặt phẳng rộng lớn bằng gỗ hay đá dùng làm khay đỡ hoặc nơi bày trận cờ, khay đĩa lớn, bàn cờ, địa bàn.",
    "illustration": {
      "badge": "♟️",
      "concept": "Bàn cờ vây bằng gỗ cổ",
      "visualDesc": "Bàn cờ vây bằng gỗ dầy dặn với các quân cờ đen trắng đang tranh đấu quyết liệt."
    }
  },
  "盲": {
    "components": ["亡", "目"],
    "equation": "亡 (Mất đi, biến mất) + 目 (Đôi mắt nhìn thấu ánh sáng)",
    "mnemonic": "Đôi mắt bị tổn thương mất đi thị lực chìm vào bóng tối mịt mùng, mù lòa, manh quáng, mù quáng.",
    "illustration": {
      "badge": "🦯",
      "concept": "Cây gậy trắng dẫn đường",
      "visualDesc": "Cây gậy chỉ đường bằng xúc giác hỗ trợ người khiếm thị bước đi tự tin trên vỉa hè."
    }
  },
  "盾": {
    "components": ["厂", "十", "目"],
    "equation": "Tấm khiên bằng gỗ chắc chắn che chắn trước mặt để bảo vệ đôi mắt (目)",
    "mnemonic": "Chiếc khiên vững chãi giơ lên che chở thân mình trước giáo mác của kẻ thù, cái khiên chắn, mâu thuẫn.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Chiếc khiên hộ thân vững chãi",
      "visualDesc": "Chiếc khiên thép mạ đồng kiên cố chống đỡ mọi mũi tên và gươm giáo đối phương."
    }
  },
  "眉": {
    "components": ["厂", "目"],
    "equation": "Dải lông tơ uốn lượn như mái hiên cong (厂) che chở phía trên đôi mắt (目)",
    "mnemonic": "Hàng lông mày thanh tú cong vút điểm tô nét đẹp khuôn mặt trên đôi mắt sáng, lông mày, chân mày, mi mắt.",
    "illustration": {
      "badge": "👁️",
      "concept": "Hàng lông mày thanh tú lá liễu",
      "visualDesc": "Đôi lông mày lá liễu mềm mại duyên dáng làm nổi bật ánh mắt trong veo hiền dịu."
    }
  },
  "看": {
    "components": ["手", "目"],
    "equation": "手 (Bàn tay khum lại đặt lên trán) che bớt ánh nắng để đôi mắt (目) nhìn xa",
    "mnemonic": "Đưa bàn tay lên trán che nắng phóng tầm mắt chăm chú quan sát mọi vật phía xa, nhìn ngắm, chăm sóc khán hộ.",
    "illustration": {
      "badge": "👀",
      "concept": "Đưa tay lên trán nhìn xa",
      "visualDesc": "Người lính trinh sát đứng trên đỉnh tháp khum bàn tay lên trán ngắm nhìn đường chân trời."
    }
  },
  "眸": {
    "components": ["目", "牟"],
    "equation": "目 (Đôi mắt) trong veo như tiếng thở dài dịu dàng của chú bò hiền (牟)",
    "mnemonic": "Con ngươi đen láy sâu thẳm phản chiếu tâm hồn thánh thiện trong trẻo, con ngươi mắt, đồng tử, ánh mắt.",
    "illustration": {
      "badge": "👁️",
      "concept": "Ánh mắt đen láy sâu thẳm",
      "visualDesc": "Đôi mắt đen láy trong veo phản chiếu bầu trời ngập tràn sao sáng."
    }
  },
  "眺": {
    "components": ["目", "兆"],
    "equation": "目 (Mắt) phóng nhìn ra xa ngút ngàn triệu dặm (兆) tới tận chân trời",
    "mnemonic": "Đứng từ trên đỉnh núi cao đưa mắt phóng tầm nhìn bao quát toàn bộ phong cảnh đất trời, ngắm cảnh, trông xa.",
    "illustration": {
      "badge": "🔭",
      "concept": "Phóng tầm mắt ngắm cảnh non sông",
      "visualDesc": "Khách du lịch đứng trên đài quan sát ngắm toàn cảnh thành phố rực rỡ ánh đèn đêm."
    }
  },
  "眼": {
    "components": ["目", "艮"],
    "equation": "目 (Đôi mắt) xoay lại nhìn kiên định dừng lại tại một điểm vững chãi (艮)",
    "mnemonic": "Cửa sổ tâm hồn giúp ta quan sát thế giới và nhận định chân tướng vạn vật, con mắt, nhãn quan, điểm mấu chốt.",
    "illustration": {
      "badge": "👓",
      "concept": "Cặp mắt kính hỗ trợ thị lực",
      "visualDesc": "Chiếc kính cận thanh lịch gài trên cuốn sách giúp đôi mắt đọc rõ từng trang chữ."
    }
  },
  "睡": {
    "components": ["目", "垂"],
    "equation": "目 (Đôi mắt) trĩu nặng rủ xuống (垂) vì cơn buồn ngủ ập đến",
    "mnemonic": "Mí mắt nặng trĩu rủ xuống khép lại đưa ta vào giấc ngủ say êm đềm, giấc ngủ, buồn ngủ, thùy miên.",
    "illustration": {
      "badge": "😴",
      "concept": "Giấc ngủ say êm đềm ngon giấc",
      "visualDesc": "Em bé ngủ say giấc nồng ôm chú gấu bông nhỏ trên chiếc giường êm ái."
    }
  },
  "督": {
    "components": ["叔", "目"],
    "equation": "叔 (Bậc chú bác chú quản) đưa đôi mắt nghiêm khắc (目) dõi theo từng cử chỉ",
    "mnemonic": "Đưa ánh mắt nghiêm cẩn theo dõi nhắc nhở mọi người hoàn thành tốt nhiệm vụ, đốc thúc, giám sát, tổng đốc.",
    "illustration": {
      "badge": "📋",
      "concept": "Người quản lý đốc thúc tiến độ",
      "visualDesc": "Viên quản đốc cầm bảng công việc cẩn thận kiểm tra từng khâu sản xuất trong nhà máy."
    }
  },
  "睦": {
    "components": ["目", "坴"],
    "equation": "目 (Ánh mắt chan hòa) trao nhau trên vùng đất đắp cao màu mỡ (坴)",
    "mnemonic": "Những ánh mắt ấm áp nhìn nhau thắm thiết chan hòa tình thân ái, hòa mục, thân thiết, tháng giêng mutsukizuki.",
    "illustration": {
      "badge": "🤝",
      "concept": "Gia đình sum vầy hòa thuận",
      "visualDesc": "Cả gia đình quây quần ấm cúng bên bàn ăn ngày Tết tràn ngập tiếng cười hạnh phúc."
    }
  },
  "瞬": {
    "components": ["目", "舜"],
    "equation": "目 (Đôi mắt) chớp nhẹ nhanh như đóa hoa dâm bụt sớm nở tối tàn (舜)",
    "mnemonic": "Chỉ một cái chớp mắt nhẹ nhàng trong tích tắc thời gian đã trôi vụt qua, chớp mắt, khoảnh khắc, trong nháy mắt.",
    "illustration": {
      "badge": "⚡",
      "concept": "Khoảnh khắc chớp mắt thoáng qua",
      "visualDesc": "Vệt pháo hoa vụt lóe sáng rực rỡ chỉ trong tích tắc ngắn ngủi trên nền trời đen."
    }
  },
  "瞭": {
    "components": ["目", "尞"],
    "equation": "目 (Đôi mắt) nhìn rõ ràng dưới ánh lửa đuốc sáng rực soi rọi (尞)",
    "mnemonic": "Đôi mắt nhìn thấu suốt mọi điều sáng rõ mười mươi không chút hoài nghi, sáng sủa, rõ ràng, liễu nhiên.",
    "illustration": {
      "badge": "💡",
      "concept": "Hiểu thấu sáng rõ mười mươi",
      "visualDesc": "Bóng đèn sáng bừng lên trong tâm trí khi tìm ra lời giải đáp rõ ràng cho câu hỏi khó."
    }
  },
  "瞳": {
    "components": ["目", "童"],
    "equation": "目 (Đôi mắt) phản chiếu hình bóng đứa trẻ nhỏ xíu (童) trong con ngươi",
    "mnemonic": "Nhìn sâu vào tròng đen mắt thấy bóng hình em bé nhỏ tí hon phản chiếu, đồng tử, con ngươi mắt trong veo.",
    "illustration": {
      "badge": "👁️",
      "concept": "Đồng tử mắt trong veo",
      "visualDesc": "Đồng tử mắt đen tròn lấp lánh phản chiếu ánh nắng lung linh của ngày mới."
    }
  },
  "矛": {
    "components": ["矛"],
    "equation": "Hình tượng ngọn giáo cổ với mũi nhọn sắc bén gắn trên cán gỗ dài có móc",
    "mnemonic": "Ngọn giáo nhọn hoắt dùng để đâm xuyên qua mọi tấm giáp của kẻ địch, ngọn giáo, mâu thuẫn.",
    "illustration": {
      "badge": "🗡️",
      "concept": "Mũi giáo nhọn đâm thủng giáp",
      "visualDesc": "Mũi giáo đồng sắc bén vút thẳng về phía trước tượng trưng cho sức tấn công mạnh mẽ."
    }
  },
  "矢": {
    "components": ["矢"],
    "equation": "Hình tượng mũi tên có đầu nhọn bằng kim loại, thân thẳng và cánh lông vũ ở đuôi",
    "mnemonic": "Mũi tên lắp vào cánh cung bay thẳng tắp tới đích không hề lệch hướng, mũi tên, thỉ chí như tên bay.",
    "illustration": {
      "badge": "🏹",
      "concept": "Mũi tên bay thẳng trúng đích",
      "visualDesc": "Mũi tên vút bay xuyên qua làn gió cắm thẳng vào tâm vòng tròn bia tập bắn."
    }
  },
  "矯": {
    "components": ["矢", "喬"],
    "equation": "矢 (Mũi tên bị cong) được đặt vào khung gỗ cao (喬) nung lửa uốn thẳng lại",
    "mnemonic": "Uốn nắn lại mũi tên bị cong cho thẳng thắn chuẩn xác, sửa chữa thói hư tật xấu, uốn thẳng, chỉnh hình.",
    "illustration": {
      "badge": "📐",
      "concept": "Khung nẹp chỉnh hình răng",
      "visualDesc": "Niềng chỉnh nha nẹp lại những chiếc răng lệch lạc trở nên đều đặn ngay ngắn."
    }
  },
  "砕": {
    "components": ["石", "卒"],
    "equation": "石 (Hòn đá tảng) bị người lính (卒) dùng búa tạ đập vỡ tan tành",
    "mnemonic": "Tảng đá cứng cáp bị búa nện vỡ vụn thành trăm ngàn mảnh đá dăm nhỏ, đập vỡ vụn, nát vụn, toái thạch.",
    "illustration": {
      "badge": "🔨",
      "concept": "Tảng đá bị đập vỡ tan tành",
      "visualDesc": "Nhát búa giáng mạnh làm tảng đá nứt toác bắn tung tóe những viên đá nhỏ vụn."
    }
  },
  "砲": {
    "components": ["石", "包"],
    "equation": "石 (Hòn đá đạn tròn) được bọc kín (包) nhồi vào nòng súng bắn đi",
    "mnemonic": "Bọc khối đá nén thuốc nổ bắn vút ra từ nòng súng đại bác phá tan đồn lũy, khẩu pháo, đại pháo, pháo hoa.",
    "illustration": {
      "badge": "💥",
      "concept": "Khẩu thần công đại pháo khạc lửa",
      "visualDesc": "Khẩu pháo đồng cổ kính khạc ra quả cầu lửa rền vang rung chuyển cả mặt đất."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n1hData)) {
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

console.log(`[Batch 5H - N1 Part 8] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n1hData).length} chữ Kanji N1.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
