/**
 * Batch 5M: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 95 chữ Kanji N1 CUỐI CÙNG (từ 鐘 đến 鼓) - Hoàn tất 100% toàn bộ N5-N1!
 */

const fs = require('fs');
const path = require('path');

const n1mData = {
  "鐘": {
    "components": ["金", "童"],
    "equation": "Kim loại (金) đúc thành chiếc chuông lớn ngân vang trong vắt như tiếng trẻ thơ (童)",
    "mnemonic": "Chiếc chuông đồng khổng lồ gióng lên từng hồi thanh tịnh xua tan 108 phiền não đêm giao thừa, chuông đồng, tiếng chuông chùa (kane).",
    "illustration": {
      "badge": "🔔",
      "concept": "Chuông đồng chùa ngân vang giao thừa",
      "visualDesc": "Chiếc đại hồng chung bằng đồng cổ chạm khắc tinh xảo rung lên tiếng chuông trầm ấm."
    }
  },
  "鑑": {
    "components": ["金", "監"],
    "equation": "Tấm đồng kim loại (金) soi rõ từng chân tơ kẽ tóc để giám sát kiểm tra (監)",
    "mnemonic": "Soi gương sáng nhận rõ đúng sai và chuyên gia thẩm định giá trị món đồ cổ, gương sáng soi xét, giám định, giám khảo.",
    "illustration": {
      "badge": "🔍",
      "concept": "Kính lúp giám định đồ cổ",
      "visualDesc": "Chuyên gia đeo găng tay trắng dùng kính lúp cẩn thận giám định vết nứt cổ vật quý."
    }
  },
  "閑": {
    "components": ["門", "木"],
    "equation": "Thanh gỗ chặn ngang cổng (門 木) ngăn khách khứa để giữ không gian thanh tịnh",
    "mnemonic": "Đóng cửa cài then để tận hưởng giây phút thảnh thơi yên tĩnh không vướng bận, thanh nhàn, rảnh rỗi, an nhàn tĩnh mịch.",
    "illustration": {
      "badge": "🍵",
      "concept": "Giây phút an nhàn ngắm hoa",
      "visualDesc": "Người ngồi tựa cửa ngắm cánh hoa anh đào khẽ rơi trong khu vườn tĩnh mịch an nhàn."
    }
  },
  "閣": {
    "components": ["門", "各"],
    "equation": "Cánh cổng uy nghiêm (門) nơi các vị đại thần tụ họp thảo luận việc quốc gia (各)",
    "mnemonic": "Tòa lầu cao sang trọng nơi các nguyên thủ quốc gia họp bàn chính sự, lầu gác, nội các chính phủ, tàng kinh các.",
    "illustration": {
      "badge": "🏛️",
      "concept": "Tòa nhà nội các chính phủ",
      "visualDesc": "Tòa nhà quốc hội uy nghi với các cột đá cẩm thạch trắng nơi nội các họp bàn chính sự."
    }
  },
  "閥": {
    "components": ["門", "伐"],
    "equation": "Bên ngoài cánh cổng danh gia (門) treo tấm biển ghi công trạng thảo phạt giặc thù (伐)",
    "mnemonic": "Nhóm quyền lực liên kết với nhau bằng danh thế gia tộc chi phối kinh tế chính trị, bè phái, tài phiệt zaibatsu, quân phiệt.",
    "illustration": {
      "badge": "💼",
      "concept": "Liên minh tài phiệt zaibatsu",
      "visualDesc": "Những tập đoàn tài chính hùng mạnh liên kết chặt chẽ chi phối các ngành công nghiệp."
    }
  },
  "閲": {
    "components": ["門", "兌"],
    "equation": "Đứng gác tại cổng thành (門) kiểm tra từng người qua lại trong niềm vui thỏa (兌)",
    "mnemonic": "Kiểm tra rà soát kỹ lưỡng từng trang sách bài viết trước khi xuất bản rộng rãi, kiểm duyệt, duyệt lãm, đọc sách xem xét.",
    "illustration": {
      "badge": "📑",
      "concept": "Kiểm duyệt văn bản xuất bản",
      "visualDesc": "Cây bút lông đóng dấu kiểm duyệt đạt chuẩn chất lượng trên trang bản thảo sách quý."
    }
  },
  "闘": {
    "components": ["門", "豆", "寸"],
    "equation": "Hai bên xông qua cánh cửa (門) giáp lá cà vung tay tấc gấc (寸) tranh giành hạt đậu (豆)",
    "mnemonic": "Dốc toàn bộ sức lực chiến đấu quật khởi chống lại áp bức bất công, chiến đấu, đấu tranh, thi đấu (tatakau).",
    "illustration": {
      "badge": "🥊",
      "concept": "Trận so găng thi đấu quyết liệt",
      "visualDesc": "Hai đấu thủ so tài dũng mãnh trên võ đài thể hiện tinh thần thượng võ kiên cường."
    }
  },
  "阻": {
    "components": ["阝", "且"],
    "equation": "Bức tường đất gò cao (阝) dựng đứng kiên cố như bàn đá (且) chặn lối",
    "mnemonic": "Dựng chướng ngại vật chặn đứng bước tiến quân thù bảo vệ an toàn hậu phương, ngăn cản, cản trở, hiểm trở trở ngại (habamu).",
    "illustration": {
      "badge": "🛑",
      "concept": "Biển báo chướng ngại vật ngăn lối",
      "visualDesc": "Tảng đá lớn chắn ngang đường đèo núi hiểm trở ngăn không cho xe cộ qua lại."
    }
  },
  "阿": {
    "components": ["阝", "可"],
    "equation": "Sườn đồi uốn cong (阝) theo dòng nước uốn lượn uốn khúc (可)",
    "mnemonic": "Dốc núi thoai thoải và lời khấn danh hiệu Đức Phật A-di-đà từ bi phổ độ, sườn dốc đồi, A-di-đà Phật, xu nịnh a dua.",
    "illustration": {
      "badge": "🙏",
      "concept": "Tượng Phật A-di-đà thanh tịnh",
      "visualDesc": "Bức tượng Phật A-di-đà tọa thiền trên đài sen thanh tịnh xoa dịu muôn nỗi thống khổ trần gian."
    }
  },
  "附": {
    "components": ["阝", "付"],
    "equation": "Gò đất cao (阝) được bàn tay đắp thêm vào gắn chặt (付) gia cố",
    "mnemonic": "Đính kèm thêm giấy tờ tài liệu vào hồ sơ chính theo quy định, đính kèm, phụ thêm, gắn vào phụ lục.",
    "illustration": {
      "badge": "📎",
      "concept": "Kẹp ghim đính kèm tài liệu",
      "visualDesc": "Chiếc kẹp giấy sáng bóng gắn kèm bảng phụ lục quan trọng vào tập tài liệu hợp đồng."
    }
  },
  "陛": {
    "components": ["阝", "坒"],
    "equation": "Những bậc thềm đất đá (阝) xếp thẳng hàng lớp lớp (坒) dẫn lên ngai vàng",
    "mnemonic": "Bậc thềm cung điện uy nghiêm nơi các thần dân quỳ dưới bệ cung kính bái lạy, bậc thềm, bệ hạ (heika).",
    "illustration": {
      "badge": "👑",
      "concept": "Bậc thềm điện rồng dẫn lên ngai vàng",
      "visualDesc": "Bậc thềm cẩm thạch chạm rồng uốn lượn dẫn lối lên ngai vàng tôn nghiêm của hoàng đế bệ hạ."
    }
  },
  "陣": {
    "components": ["阝", "車"],
    "equation": "Dàn cỗ xe chiến (車) tựa lưng vào sườn đồi hiểm trở (阝) bày binh bố trận",
    "mnemonic": "Sắp đặt đội hình binh sĩ và chiến xa vững vàng sẵn sàng nghênh chiến, trận địa, đội hình, trận thế bày binh.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Trận địa khiên giáp kiên cố",
      "visualDesc": "Đội hình lá chắn đồng và giáo nhọn xếp tầng tầng lớp lớp tạo nên trận thế bất khả xâm phạm."
    }
  },
  "陥": {
    "components": ["阝", "⺈", "臼"],
    "equation": "Bờ đất dốc (阝) bất thình lình sụt lở tạo thành hố sâu sụp xuống cối (臼)",
    "mnemonic": "Bị sụt lún rơi sâu vào cạm bẫy hố sâu nguy hiểm không lối thoát, sa vào, sụt lở, hãm hại sa hãm (ochīru).",
    "illustration": {
      "badge": "🕳️",
      "concept": "Hố sụt lún nguy hiểm trên đường",
      "visualDesc": "Hố sụt lún sâu trên mặt đường núi sau cơn bão nhắc nhở người đi đường cẩn trọng."
    }
  },
  "陪": {
    "components": ["阝", "咅"],
    "equation": "Đứng bên cạnh gò đất cao (阝) cất tiếng phụ họa tán thưởng (咅)",
    "mnemonic": "Đi theo phụ tá phục vụ bậc bề trên và tham gia bồi thẩm đoàn xét xử tại tòa, bồi thẩm đoàn, theo hầu bồi thần.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Bồi thẩm đoàn lắng nghe xét xử",
      "visualDesc": "Các thành viên bồi thẩm đoàn nghiêm túc lắng nghe tranh luận để đưa ra ý kiến công tâm."
    }
  },
  "陰": {
    "components": ["阝", "今", "云"],
    "equation": "Sườn núi khuất nắng (阝) bị mây mù bao phủ (云) trong lúc này (今)",
    "mnemonic": "Bóng râm mát rượi dưới tán cây hay sườn núi khuất ánh mặt trời, âm u, bóng râm, âm dương (kage).",
    "illustration": {
      "badge": "⛅",
      "concept": "Bóng râm mát rượi dưới vòm cây",
      "visualDesc": "Tán cây sum sê tỏa bóng râm xanh mát che chở cho chiếc ghế đá công viên trưa hè."
    }
  },
  "陳": {
    "components": ["阝", "東"],
    "equation": "Quân sĩ xếp hàng dài từ gò đất (阝) trải dài về phía mặt trời mọc phương đông (東)",
    "mnemonic": "Bày biện hàng hóa ra trưng bày và trình bày ý kiến rõ ràng rành mạch, trần thuật, bày biện, họ Trần, trần liệt.",
    "illustration": {
      "badge": "🏪",
      "concept": "Bày biện hàng hóa đẹp mắt trên kệ",
      "visualDesc": "Kệ hàng hóa trưng bày gọn gàng bắt mắt trong cửa tiệm đón chào khách vào mua sắm."
    }
  },
  "陵": {
    "components": ["阝", "夌"],
    "equation": "Vùng gò đồi đất đắp cao (阝) với các sườn dốc trùng điệp uy nghi (夌)",
    "mnemonic": "Khu lăng mộ bề thế của các bậc vua chúa xây dựng trên sườn đồi phong thủy, lăng mộ hoàng gia, đồi gò cao (ryō).",
    "illustration": {
      "badge": "🏛️",
      "concept": "Lăng mộ cổ hình chìa khóa Kofun",
      "visualDesc": "Khu lăng mộ cổ Kofun khổng lồ hình lỗ khóa xanh mướt cây cối nhìn từ trên cao."
    }
  },
  "陶": {
    "components": ["阝", "匋"],
    "equation": "Lấy đất sét từ gò đồi (阝) nặn thành bình vò nung lò (匋)",
    "mnemonic": "Nặn đất sét nung chín thành bát đĩa gốm sứ tinh xảo và đào tạo nhân tài, đồ gốm sứ, đồ sành sứ, đào tạo rèn luyện.",
    "illustration": {
      "badge": "🏺",
      "concept": "Chiếc bình gốm men lam tinh xảo",
      "visualDesc": "Nghệ nhân dùng đôi tay khéo léo xoay bàn gốm tạo hình chiếc bình đất sét duyên dáng."
    }
  },
  "隆": {
    "components": ["阝", "夂", "生"],
    "equation": "Gò đất (阝) đắp cao dần từng bước (夂) vươn lên sinh sôi phát triển mạnh mẽ (生)",
    "mnemonic": "Đất nước phát triển thịnh vượng vươn lên đỉnh cao và gò đất nhô cao hùng vĩ, hưng long, long thịnh, nhô cao.",
    "illustration": {
      "badge": "📈",
      "concept": "Kinh tế phát triển hưng long rực rỡ",
      "visualDesc": "Thành phố hiện đại với những tòa nhà chọc trời vươn cao biểu trưng thời kỳ hưng long thịnh vượng."
    }
  },
  "隊": {
    "components": ["阝", "豕"],
    "equation": "Đoàn binh sĩ đông đúc từ trên sườn núi (阝) ùa xuống dũng mãnh như bầy heo rừng (豕)",
    "mnemonic": "Hàng ngũ những người liên kết chặt chẽ cùng làm một nhiệm vụ chung, đội ngũ, quân đội, binh đoàn đoàn đội.",
    "illustration": {
      "badge": "🎖️",
      "concept": "Đội ngũ quân đội diễu hành trang nghiêm",
      "visualDesc": "Hàng quân chỉnh tề bước đều tăm tắp trong buổi lễ duyệt binh uy nghiêm của binh đoàn."
    }
  },
  "随": {
    "components": ["阝", "辶", "有"],
    "equation": "Bước chân đi theo sau (辶) men theo sườn đồi gồ ghề (阝) có bạn đồng hành (有)",
    "mnemonic": "Đi theo người dẫn đường hoặc hành động tùy theo hoàn cảnh tình huống thực tế, tuỳ tùng, đi theo, tùy ý tùy tiện (shitagau).",
    "illustration": {
      "badge": "🚶",
      "concept": "Người tùy tùng bước theo sau hộ vệ",
      "visualDesc": "Chú chó trung thành lặng lẽ bước theo sau từng bước chân của người chủ trên đường dạo mát."
    }
  },
  "隔": {
    "components": ["阝", "鬲"],
    "equation": "Gò núi cao (阝) ngăn đôi hai bên như chiếc nồi đồng ba chân có vách ngăn (鬲)",
    "mnemonic": "Dựng vách ngăn chia cắt không gian hoặc khoảng thời gian cách nhau, ngăn cách, khoảng cách, cách ly ly cách (hedateru).",
    "illustration": {
      "badge": "🚪",
      "concept": "Tấm vách ngăn cách hai căn phòng",
      "visualDesc": "Tấm vách trượt fusuma bằng giấy trắng trang nhã nhẹ nhàng ngăn cách hai không gian phòng trà."
    }
  },
  "障": {
    "components": ["阝", "章"],
    "equation": "Gò đất cao (阝) đứng sừng sững như tấm bia chương rực rỡ (章) chặn đứng lối đi",
    "mnemonic": "Vật cản trở lối đi hoặc cánh cửa trượt dán giấy ngăn gió trong nhà Nhật, chướng ngại, vách ngăn, cửa trượt shōji.",
    "illustration": {
      "badge": "🚪",
      "concept": "Cánh cửa trượt giấy shōji truyền thống",
      "visualDesc": "Cánh cửa kéo shōji khung gỗ nan vuông thanh lịch ngăn luồng gió lạnh mùa đông."
    }
  },
  "隠": {
    "components": ["阝", "𤔌", "心"],
    "equation": "Ẩn nấp sau gò đồi rậm rạp (阝) giữ kín tâm tư tình cảm trong lòng (心)",
    "mnemonic": "Giấu kín đồ vật hoặc ẩn mình vào bóng tối không để ai trông thấy, ẩn giấu, trốn nấp, ẩn dật che giấu (kakusu).",
    "illustration": {
      "badge": "🥷",
      "concept": "Ninja ẩn mình sau bóng tối",
      "visualDesc": "Chiến binh ninja mặc đồ đen thoắt ẩn thoắt hiện lẩn khuất sau rèm tre mờ ảo."
    }
  },
  "隣": {
    "components": ["阝", "粦"],
    "equation": "Thôn ấp (阝) sáng ánh lửa đom đóm lập lòe san sát kề bên (粦)",
    "mnemonic": "Ngôi nhà sát vách ngay bên cạnh sớm tối tắt lửa tối đèn có nhau, hàng xóm, láng giềng, bên cạnh lân cận (tonari).",
    "illustration": {
      "badge": "🏡",
      "concept": "Hai ngôi nhà hàng xóm kề sát nhau",
      "visualDesc": "Hai mái nhà xinh xắn cạnh nhau có hàng rào hoa hồng ngát hương chia sẻ tình làng nghĩa xóm."
    }
  },
  "隷": {
    "components": ["𧘇", "隶"],
    "equation": "Bị bàn tay túm lấy đuôi áo (隶) bắt quỳ gối phục tùng hầu hạ",
    "mnemonic": "Thân phận mất tự do phải phục dịch tuân lệnh kẻ khác và kiểu chữ thư pháp Lệ thư, nô lệ, lệ thuộc, chữ lệ thư.",
    "illustration": {
      "badge": "⛓️",
      "concept": "Bẻ gãy xiềng xích giải phóng nô lệ",
      "visualDesc": "Vòng xích sắt bị đập tan biểu trưng cho sự chấm dứt thân phận nô lệ giành lại tự do."
    }
  },
  "隼": {
    "components": ["隹", "十"],
    "equation": "隹 (Con chim) có mười phần vuốt nhọn (十) lao nhanh như tên bắn",
    "mnemonic": "Loài chim săn mồi có tốc độ bay bổ nhào nhanh nhất thế giới và tên tàu vũ trụ thám hiểm, chim cắt, chim ưng hayabusa.",
    "illustration": {
      "badge": "🦅",
      "concept": "Chim cắt hayabusa lao nhanh như chớp",
      "visualDesc": "Chú chim cắt hayabusa dang cánh nhọn lao vun vút từ bầu trời xanh thẳm săn mồi."
    }
  },
  "雄": {
    "components": ["厷", "隹"],
    "equation": "厷 (Cánh tay giang rộng uy lực) + 隹 (Loài chim đứng thẳng vươn cao)",
    "mnemonic": "Giống đực lực lưỡng và khí phách hiên ngang quật khởi của đấng mày râu, con trống, hùng vĩ, anh hùng hào kiệt.",
    "illustration": {
      "badge": "🦁",
      "concept": "Vị anh hùng sừng sững uy nghi",
      "visualDesc": "Bức tượng đồng vị anh hùng dân tộc giương cao ngọn cờ lãnh đạo muôn dân chiến thắng."
    }
  },
  "雅": {
    "components": ["牙", "隹"],
    "equation": "牙 (Tiếng nhạc tinh tế chuẩn mực) kết hợp tiếng hót chim nhỏ thanh thoát (隹)",
    "mnemonic": "Vẻ đẹp thanh tao nho nhã chuẩn mực của văn hóa cung đình truyền thống, tao nhã, thanh nhã, nhã nhạc gagaku (miyabi).",
    "illustration": {
      "badge": "🪭",
      "concept": "Chiếc quạt giấy xòe hoa tao nhã miyabi",
      "visualDesc": "Chiếc quạt giấy truyền thống vẽ hoa anh đào dát vàng toát lên phong thái tao nhã miyabi."
    }
  },
  "雌": {
    "components": ["此", "隹"],
    "equation": "此 (Dừng chân làm tổ nơi này) chăm sóc bảo bọc đàn chim con (隹)",
    "mnemonic": "Giống cái dịu dàng đẻ trứng ấp con duy trì nòi giống của muôn loài, con mái, giống cái, thư hùng phân tranh (mesu).",
    "illustration": {
      "badge": "🪺",
      "concept": "Chim mẹ ấp trứng trong tổ ấm",
      "visualDesc": "Chim mẹ lông tơ mịn màng che chở những quả trứng nhỏ xinh trong chiếc tổ ấm áp."
    }
  },
  "雛": {
    "components": ["芻", "隹"],
    "equation": "Chùm cỏ non mềm mại (芻) lót ổ cho chú chim non mới nở lông tơ (隹)",
    "mnemonic": "Chú chim non bé xíu và búp bê công chúa hoàng tử ngày hội búp bê mùng ba tháng ba, chim non, búp bê hina (hinamatsuri).",
    "illustration": {
      "badge": "🎎",
      "concept": "Búp bê truyền thống lễ hội Hinamatsuri",
      "visualDesc": "Cặp búp bê Hina mặc trang phục triều đình Heian lộng lẫy trong ngày hội tết bé gái mùng ba tháng ba."
    }
  },
  "離": {
    "components": ["㐫", "隹"],
    "equation": "Con chim nhỏ (隹) bay vút qua mắt lưới cạm bẫy (㐫) bay về phương trời xa",
    "mnemonic": "Tách rời nhau mỗi người một ngả và khoảng cách chia ly cách biệt, rời xa, tách rời, ly biệt phân ly (hanareru).",
    "illustration": {
      "badge": "🛫",
      "concept": "Chiếc máy bay cất cánh rời xa",
      "visualDesc": "Chiếc máy bay cất cánh vút lên bầu trời mang theo nỗi niềm tạm biệt chia xa lưu luyến."
    }
  },
  "雰": {
    "components": ["雨", "分"],
    "equation": "Mưa bụi nhỏ giọt (雨) phân tán mỏng manh khắp không gian (分)",
    "mnemonic": "Màn sương mù mỏng manh bao phủ tạo nên bầu không khí cảm xúc đặc trưng của căn phòng, bầu không khí, không khí (fun'iki).",
    "illustration": {
      "badge": "🕯️",
      "concept": "Bầu không khí ấm cúng lãng mạn",
      "visualDesc": "Ánh nến lung linh cùng tiếng nhạc du dương tạo nên bầu không khí ấm cúng ngập tràn cảm xúc."
    }
  },
  "雷": {
    "components": ["雨", "田"],
    "equation": "Mưa bão từ trời (雨) giáng sấm chớp ầm ầm rung chuyển khắp đồng ruộng (田)",
    "mnemonic": "Tiếng sấm rền vang rung chuyển đất trời kèm tia chớp lóe sáng trong cơn giông bão, sấm sét, thần lôi (kaminari).",
    "illustration": {
      "badge": "⚡",
      "concept": "Tia sét lóe sáng xé toạc màn đêm",
      "visualDesc": "Tia sét xanh biếc rạch ngang bầu trời đêm kèm tiếng sấm rền vang rung chuyển mặt đất."
    }
  },
  "需": {
    "components": ["雨", "而"],
    "equation": "Chờ đợi cơn mưa lành (雨) tưới tắm cho bộ râu cây cỏ khô khát (而)",
    "mnemonic": "Mong mỏi chờ đợi nguồn nước tưới và nhu cầu mua sắm thiết yếu của thị trường, nhu cầu, cần thiết, quân nhu tiêu dùng.",
    "illustration": {
      "badge": "📊",
      "concept": "Biểu đồ cán cân cung cầu thị trường",
      "visualDesc": "Biểu đồ đường cong cung cầu cân đối minh họa quy luật thị trường kinh tế."
    }
  },
  "霊": {
    "components": ["雨", "亚"],
    "equation": "Những hạt mưa lành từ cõi trời (雨) kết tinh trên đàn tế thiêng bốn phương (亚)",
    "mnemonic": "Linh hồn bất diệt và sức mạnh thần bí linh thiêng phù hộ độ trì, linh hồn, linh thiêng, vong linh thần linh.",
    "illustration": {
      "badge": "✨",
      "concept": "Đốm sáng linh thiêng huyền ảo",
      "visualDesc": "Đốm sáng xanh lung linh bay bổng mang năng lượng linh thiêng huyền bí chốn đền cổ."
    }
  },
  "霜": {
    "components": ["雨", "相"],
    "equation": "Hơi ẩm khí trời (雨) ngưng đọng trên từng cành cây tán lá (相) khi đông về",
    "mnemonic": "Những hạt băng trắng xóa kết tinh trên cỏ cây vào buổi sáng mùa đông giá lạnh, sương muối, hạt sương trắng (shimo).",
    "illustration": {
      "badge": "❄️",
      "concept": "Lớp sương muối trắng tinh trên lá",
      "visualDesc": "Lớp tinh thể băng tuyết sương muối óng ánh bám đều trên phiến lá phong mùa đông."
    }
  },
  "霞": {
    "components": ["雨", "叚"],
    "equation": "Hơi nước mưa trời (雨) nhuốm sắc ráng chiều ửng đỏ mờ ảo nơi chân trời (叚)",
    "mnemonic": "Làn sương mỏng huyền ảo buổi sớm mùa xuân và ráng mây ngũ sắc rực rỡ lúc hoàng hôn, ráng mây, sương mù mùa xuân (kasumi).",
    "illustration": {
      "badge": "🌄",
      "concept": "Ráng mây ửng hồng vờn đỉnh núi kasumi",
      "visualDesc": "Làn sương mờ ửng hồng kasumi bồng bềnh quấn quanh sườn núi Phú Sĩ buổi bình minh."
    }
  },
  "霧": {
    "components": ["雨", "務"],
    "equation": "Hạt mưa nước lơ lửng (雨) che mờ tầm nhìn như bức màn che phủ cả việc công (務)",
    "mnemonic": "Màn sương mù dày đặc buông xuống bao phủ lối đi mờ mịt trong thung lũng, sương mù dày đặc (kiri).",
    "illustration": {
      "badge": "🌫️",
      "concept": "Màn sương mù dày đặc thung lũng",
      "visualDesc": "Khu rừng thông mờ ảo ẩn hiện sau màn sương mù trắng xóa dày đặc buổi sớm."
    }
  },
  "露": {
    "components": ["雨", "路"],
    "equation": "Hơi ẩm mưa đêm (雨) ngưng tụ thành từng hạt nước long lanh ven đường đi (路)",
    "mnemonic": "Hạt sương mai đọng trên ngọn cỏ đón ánh bình minh và việc phơi bày sự thật ra ánh sáng, hạt sương, để lộ ra, lộ thiên (tsuyu).",
    "illustration": {
      "badge": "💧",
      "concept": "Giọt sương mai long lanh trên cỏ",
      "visualDesc": "Giọt sương mai tròn xoe trong suốt đọng trên ngọn cỏ non lấp lánh như viên kim cương."
    }
  },
  "靖": {
    "components": ["立", "青"],
    "equation": "Đứng thẳng hiên ngang (立) dưới bầu trời trong xanh thanh khiết (青)",
    "mnemonic": "Giữ gìn đất nước yên bình ổn định để muôn dân an cư lạc nghiệp, bình yên, yên ổn, đền Yasukuni.",
    "illustration": {
      "badge": "🕊️",
      "concept": "Đất nước bình yên an định",
      "visualDesc": "Bầu trời xanh trong vắt không một bóng mây biểu trưng cho nền thái bình yên ổn trường tồn."
    }
  },
  "鞠": {
    "components": ["革", "匊"],
    "equation": "Miếng da thú khâu lại (革) ôm bọc tròn trịa vừa vặn trong hai bàn tay (匊)",
    "mnemonic": "Quả bóng bọc da dùng đá bóng cung đình kemari và tấm lòng cúc cung tận tụy hết lòng, quả cầu da kemari, cúc cung tận tụy.",
    "illustration": {
      "badge": "⚽",
      "concept": "Quả bóng da kemari cung đình cổ",
      "visualDesc": "Quả bóng da hươu tròn xinh xắn dùng trong trò đá bóng thanh nhã kemari cung đình xưa."
    }
  },
  "韻": {
    "components": ["音", "員"],
    "equation": "Âm thanh thanh thoát (音) kết hợp hài hòa chuẩn mực trong khuôn khổ (員)",
    "mnemonic": "Vần thơ êm ái ngân vang và dư âm sâu lắng đọng lại sau tiếng đàn, vần điệu, vận luật, dư âm sâu lắng.",
    "illustration": {
      "badge": "🎶",
      "concept": "Vần điệu nhịp nhàng khúc nhạc",
      "visualDesc": "Nốt nhạc uốn lượn bay bổng thể hiện vần điệu trầm bổng tinh tế của bài thơ cổ."
    }
  },
  "響": {
    "components": ["郷", "音"],
    "equation": "Âm thanh (音) vang xa vọng lại khắp muôn nẻo làng quê thôn xóm (郷)",
    "mnemonic": "Âm thanh vang dội lan xa làm rung động tâm can và tạo sức ảnh hưởng sâu rộng, vang vọng, âm vang, ảnh hưởng (hibiki).",
    "illustration": {
      "badge": "🔊",
      "concept": "Âm vang dội lan tỏa khắp núi rừng",
      "visualDesc": "Sóng âm thanh đồng tâm lan tỏa ngân vang qua các dãy núi hùng vĩ."
    }
  },
  "項": {
    "components": ["工", "頁"],
    "equation": "Cột trụ thẳng tắp (工) nâng đỡ phần đầu gáy cổ (頁)",
    "mnemonic": "Phần gáy cổ sau đầu và từng mục điều khoản rành mạch trong danh mục văn bản, mục lục, điều khoản, gáy cổ (kōmoku).",
    "illustration": {
      "badge": "📋",
      "concept": "Danh mục các điều khoản rõ ràng",
      "visualDesc": "Bảng danh mục tài liệu với các dấu chấm đầu dòng liệt kê rành mạch từng điều khoản."
    }
  },
  "須": {
    "components": ["彡", "頁"],
    "equation": "Chòm râu dài uốn lượn (彡) mọc dài dưới cằm khuôn mặt (頁)",
    "mnemonic": "Điều kiện cốt yếu bắt buộc cần phải có không thể thiếu được, cần phải, nhất thiết, chòm râu cằm tu mi.",
    "illustration": {
      "badge": "❗",
      "concept": "Yêu cầu bắt buộc cần thiết",
      "visualDesc": "Dấu chấm than đỏ nổi bật nhắc nhở điều kiện tiên quyết cần phải hoàn thành."
    }
  },
  "頌": {
    "components": ["公", "頁"],
    "equation": "Nghiêng đầu kính cẩn (頁) cất lời ca ngợi công đức cao dày của quan lớn (公)",
    "mnemonic": "Khúc hát tụng ca ngợi khen công đức to lớn của các bậc tiền nhân, tụng ca, ca tụng, xưng tụng công đức.",
    "illustration": {
      "badge": "📜",
      "concept": "Bài văn tụng ca ngợi công đức",
      "visualDesc": "Cuộn thư tịch khắc chữ vàng dâng lên lời ca tụng chân thành ghi ơn tiền nhân."
    }
  },
  "頑": {
    "components": ["元", "頁"],
    "equation": "Chiếc đầu cứng cỏi (頁) giữ vững lập trường nguyên bản ban đầu (元) không lung lay",
    "mnemonic": "Ý chí kiên định cố gắng vượt qua mọi khó khăn không chịu bỏ cuộc giữa chừng, ngoan cường, bướng bỉnh, cố gắng (ganbaru).",
    "illustration": {
      "badge": "💪",
      "concept": "Cố gắng kiên cường hết mình ganbaru",
      "visualDesc": "Nắm đấm giơ cao cùng ánh mắt quyết tâm vượt qua mọi thử thách để chạm tới đích."
    }
  },
  "頒": {
    "components": ["分", "頁"],
    "equation": "Phân chia đều đặn (分) sách vở tài liệu trao tận đầu từng người (頁)",
    "mnemonic": "In ấn và phát hành rộng rãi tài liệu sách báo đến tay đông đảo độc giả, ban bố, phân phát, ban bố rộng rãi (hanpu).",
    "illustration": {
      "badge": "📰",
      "concept": "Phân phát tài liệu báo chí",
      "visualDesc": "Những tập báo mới thơm mùi mực in được phân phát tận tay cho mọi người trên phố."
    }
  },
  "頻": {
    "components": ["歩", "頁"],
    "equation": "Bước chân (歩) dồn dập bước tới mặt (頁) liên tục không ngừng",
    "mnemonic": "Sự việc xảy ra lặp đi lặp lại với tần suất dày đặc dồn dập, thường xuyên, dồn dập, tần suất liên tục.",
    "illustration": {
      "badge": "🔄",
      "concept": "Tần suất xảy ra thường xuyên",
      "visualDesc": "Biểu đồ cột nhấp nhô dày đặc minh họa tần suất các chuyến tàu chạy liên tục giờ cao điểm."
    }
  },
  "顕": {
    "components": ["日", "頁"],
    "equation": "Ánh mặt trời chói rọi (日) soi sáng rõ khuôn mặt đầu tóc (頁) không thể giấu giếm",
    "mnemonic": "Sự thật hiển hiện rõ ràng mười mươi dưới ánh sáng và kính hiển vi phóng to, hiển hiện, rõ ràng, hiển vi phóng đại.",
    "illustration": {
      "badge": "🔬",
      "concept": "Kính hiển vi soi rõ chi tiết vi mô",
      "visualDesc": "Ống kính hiển vi hiện đại phóng to giúp mắt nhìn thấy rõ ràng thế giới vi mô kỳ diệu."
    }
  },
  "顧": {
    "components": ["雇", "頁"],
    "equation": "Quay đầu lại (頁) ngắm nhìn người quen cũ được thuê mướn (雇)",
    "mnemonic": "Ngoái đầu nhìn lại chặng đường đã qua và vị khách hàng thân thiết quen thuộc, nhìn lại, cố vấn, khách quen (kokyaku).",
    "illustration": {
      "badge": "👥",
      "concept": "Khách hàng thân thiết quen thuộc",
      "visualDesc": "Chủ tiệm mỉm cười cúi chào vị khách hàng thân quen lâu năm ghé thăm cửa hàng."
    }
  },
  "颯": {
    "components": ["立", "風"],
    "equation": "Đứng sừng sững hiên ngang (立) đón luồng gió lớn thổi ào ạt qua (風)",
    "mnemonic": "Làn gió thổi ào ạt mát rượi và phong thái nhanh nhẹn hiên ngang dũng cảm, gió thổi ào ạt, hiên ngang (sassetsu, hayate).",
    "illustration": {
      "badge": "🍃",
      "concept": "Ngọn gió thổi hiên ngang hayate",
      "visualDesc": "Cơn gió lốc mát lành cuốn bay thảm lá vàng trong dáng đi hiên ngang của hiệp sĩ."
    }
  },
  "飢": {
    "components": ["飠", "几"],
    "equation": "Thiếu thốn đồ ăn thức uống (飠) chỉ còn trơ lại chiếc bàn trống trơn (几)",
    "mnemonic": "Cơn đói cồn cào xót ruột khi mùa màng thất bát thiếu thốn lương thực, đói kém, nạn đói, cơ hàn thiếu đói.",
    "illustration": {
      "badge": "🥣",
      "concept": "Chiếc bát rỗng trong mùa giáp hạt",
      "visualDesc": "Chiếc bát sứ rỗng không trên bàn gỗ mộc mạc nhắc nhở trân quý từng hạt gạo dẻo thơm."
    }
  },
  "飼": {
    "components": ["飠", "司"],
    "equation": "Quản lý chăm lo (司) khẩu phần thức ăn đồ uống (飠) cho gia súc thú cưng",
    "mnemonic": "Chăm sóc cho ăn mỗi ngày giúp vật nuôi mau lớn khỏe mạnh, chăn nuôi, nuôi thú cưng (kau).",
    "illustration": {
      "badge": "🐕",
      "concept": "Cho chú cún cưng ăn thức ăn",
      "visualDesc": "Em bé tươi cười đặt bát thức ăn thơm ngon cho chú cún con đang vẫy đuôi mừng rỡ."
    }
  },
  "飽": {
    "components": ["飠", "包"],
    "equation": "Thức ăn ngập tràn (飠) căng tròn bao bọc cả chiếc bụng no (包)",
    "mnemonic": "Ăn uống no căng đẫy bụng và cảm giác ngấy chán không còn muốn tiếp tục, no nê, chán ngấy, no đủ bão hòa (akiru).",
    "illustration": {
      "badge": "😋",
      "concept": "Xoa bụng no nê sau bữa tiệc ngon",
      "visualDesc": "Khuôn mặt thỏa mãn xoa chiếc bụng tròn sau bữa cơm ngon miệng no nê ấm cúng."
    }
  },
  "飾": {
    "components": ["飠", "巾"],
    "equation": "Dùng tấm khăn lụa đẹp (巾) bao bọc trang hoàng mâm cỗ thức ăn dâng cúng (飠)",
    "mnemonic": "Điểm tô trang hoàng thêm hoa nơ cho đồ vật trở nên lộng lẫy bắt mắt, trang sức, trang trí, điểm tô trang hoàng (kazaru).",
    "illustration": {
      "badge": "🎀",
      "concept": "Dải nơ ruy băng trang trí lộng lẫy",
      "visualDesc": "Chiếc nơ ruy băng kim tuyến đỏ vàng trang trí trên cây thông Noel lung linh ánh đèn."
    }
  },
  "養": {
    "components": ["羊", "食"],
    "equation": "Chăn nuôi đàn cừu béo tốt (羊) cung cấp nguồn thực phẩm nuôi sống con người (食)",
    "mnemonic": "Chăm sóc nuôi nấng con trẻ khôn lớn và phụng dưỡng cha mẹ già chu đáo, nuôi dưỡng, phụng dưỡng, bồi dưỡng dinh dưỡng.",
    "illustration": {
      "badge": "👨‍👩‍👧",
      "concept": "Cha mẹ nuôi dưỡng con cái khôn lớn",
      "visualDesc": "Người mẹ ân cần đút từng thìa cháo thơm ngon chăm sóc cho đứa con thơ khôn lớn."
    }
  },
  "餓": {
    "components": ["飠", "我"],
    "equation": "Bản thân mình (我) kiệt sức vì thiếu vắng thức ăn duy trì sự sống (飠)",
    "mnemonic": "Cơn đói lả người không còn chút sức lực vì bị bỏ đói nhiều ngày, đói lả, chết đói ngạ quỷ đói khát.",
    "illustration": {
      "badge": "💧",
      "concept": "Giọt nước và mẩu bánh mì cứu đói",
      "visualDesc": "Mẩu bánh mì khô cứu đói chia sẻ cho người lữ hành lả đi vì thiếu lương thực."
    }
  },
  "馨": {
    "components": ["殸", "香"],
    "equation": "Tiếng khánh đá ngân vang (殸) hòa cùng hương thơm ngạt ngào lan tỏa (香)",
    "mnemonic": "Làn hương thơm ngát bay xa dịu dàng làm đắm say lòng người, hương thơm bay xa, thanh hương ngát hương (kaori).",
    "illustration": {
      "badge": "🌸",
      "concept": "Làn hương thơm ngát thanh tao kaori",
      "visualDesc": "Những cánh hoa mộc lan trắng muốt hé nở tỏa làn hương thơm ngào ngạt khắp vườn."
    }
  },
  "駄": {
    "components": ["馬", "太"],
    "equation": "Chú ngựa chở hàng (馬) bị chất quá tải đồ đạc quá lớn nặng nề (太)",
    "mnemonic": "Chất hàng hóa lên lưng ngựa thồ và việc làm vô ích không mang lại kết quả, ngựa thồ hàng, vô ích, bánh kẹo rẻ tiền dagashi (muda).",
    "illustration": {
      "badge": "🍬",
      "concept": "Gói kẹo rẻ tiền tuổi thơ dagashi",
      "visualDesc": "Cửa tiệm bánh kẹo dagashi ngập tràn những gói kẹo tuổi thơ vui nhộn giá rẻ của trẻ em."
    }
  },
  "駆": {
    "components": ["馬", "区"],
    "equation": "Thúc ngựa (馬) chạy băng băng qua từng khu vực địa bàn (区)",
    "mnemonic": "Thúc ngựa phi nước đại lao nhanh về phía trước và vận dụng hết tài năng giải quyết việc, phi ngựa, chạy nhanh, xua đuổi (kakeru).",
    "illustration": {
      "badge": "🐎",
      "concept": "Chú ngựa dũng mãnh phi nước đại",
      "visualDesc": "Chú tuấn mã tung vó phi nước đại trên bờ biển lộng gió tung bọt cát vàng rực rỡ."
    }
  },
  "駒": {
    "components": ["馬", "句"],
    "equation": "Chú ngựa con (馬) uốn mình cong cong ngây thơ tròn trịa (句)",
    "mnemonic": "Chú ngựa con mới lớn tinh nghịch và quân cờ bằng gỗ trên bàn cờ tướng Shogi, ngựa con, quân cờ shogi (koma).",
    "illustration": {
      "badge": "☖",
      "concept": "Quân cờ tướng Nhật Shogi bằng gỗ",
      "visualDesc": "Quân cờ tướng ngũ giác bằng gỗ mun khắc chữ vàng đặt trên bàn cờ gỗ tinh xảo."
    }
  },
  "駿": {
    "components": ["馬", "夋"],
    "equation": "Chú ngựa (馬) có những bước chạy thanh thoát phi thường vượt trội (夋)",
    "mnemonic": "Con ngựa chạy nhanh ngàn dặm không mỏi và người tài giỏi xuất chúng phi thường, tuấn mã, ngựa hay, tuấn tú xuất chúng.",
    "illustration": {
      "badge": "🐎",
      "concept": "Tuấn mã ngàn dặm kiêu hãnh",
      "visualDesc": "Chú tuấn mã lông đen tuyền bóng mượt vươn mình phi qua thảo nguyên bao la."
    }
  },
  "騎": {
    "components": ["馬", "奇"],
    "equation": "Ngồi vững chãi trên lưng ngựa (馬) thể hiện tài nghệ cưỡi ngựa kỳ tài xuất chúng (奇)",
    "mnemonic": "Người chiến sĩ khoác áo giáp cưỡi trên lưng ngựa phi ra sa trường, cưỡi ngựa, kỵ sĩ, kỵ binh.",
    "illustration": {
      "badge": "🏇",
      "concept": "Kỵ sĩ cưỡi ngựa oai vệ",
      "visualDesc": "Kỵ sĩ giáp sắt uy phong cưỡi ngựa trắng phi nước kiệu bảo vệ lâu đài cổ."
    }
  },
  "騒": {
    "components": ["馬", "蚤"],
    "equation": "Chú ngựa (馬) bị bọ chét cắn (蚤) lồng lộn hí vang náo loạn cả chuồng",
    "mnemonic": "Tiếng la hét ồn ào hỗn loạn làm kinh động mọi người xung quanh, ồn ào, xao động, náo loạn náo động (sawagu).",
    "illustration": {
      "badge": "📢",
      "concept": "Đám đông ồn ào náo loạn",
      "visualDesc": "Khu chợ đông đúc tiếng còi xe và người mua kẻ bán ồn ào náo nhiệt giờ tan tầm."
    }
  },
  "騰": {
    "components": ["月", "龹", "馬"],
    "equation": "Đôi tay dắt ngựa (龹 馬) dưới ánh trăng (月) vọt nhảy lên dốc cao",
    "mnemonic": "Giá cả hàng hóa hay chứng khoán nhảy vọt vùn vụt tăng cao chóng mặt, tăng vọt, nhảy vọt, khao khát sôi sục.",
    "illustration": {
      "badge": "📈",
      "concept": "Cổ phiếu tăng vọt vùn vụt",
      "visualDesc": "Mũi tên xanh lá cây dựng đứng vọt lên trời cao minh họa giá trị cổ phiếu tăng phi mã."
    }
  },
  "驚": {
    "components": ["敬", "馬"],
    "equation": "Chú ngựa (馬) bắt gặp điều khác lạ giật mình kính cẩn dựng bờm đứng sững (敬)",
    "mnemonic": "Bất ngờ sửng sốt trước một sự việc kinh ngạc ngoài sức tưởng tượng, kinh ngạc, giật mình sửng sốt (odoroku).",
    "illustration": {
      "badge": "😲",
      "concept": "Mở to mắt kinh ngạc sửng sốt",
      "visualDesc": "Khuôn mặt mở to mắt và miệng kinh ngạc trước màn ảo thuật thần kỳ ngoạn mục."
    }
  },
  "髄": {
    "components": ["骨", "辶", "有"],
    "equation": "Chất dịch tủy quý giá chứa sâu bên trong khung xương cơ thể (骨 辶 有)",
    "mnemonic": "Chất dịch màu mỡ nằm sâu trong ống xương sinh ra tế bào máu và tinh hoa cốt lõi nhất, tủy xương, tinh túy, tủy sống.",
    "illustration": {
      "badge": "🦴",
      "concept": "Ống xương chứa chất tủy tinh túy",
      "visualDesc": "Mặt cắt ống xương chắc khỏe chứa chất tủy đỏ tươi sản sinh nguồn sinh lực dồi dào."
    }
  },
  "鬼": {
    "components": ["鬼"],
    "equation": "Hình tượng con ma có chiếc sừng nhọn trên đầu, khuôn mặt dữ tợn và đôi chân lơ lửng",
    "mnemonic": "Nhân vật ma quỷ trong truyền thuyết có sừng cầm chùy gai sắt và trò chơi trốn tìm, con quỷ, ma quỷ, trò đuổi bắt (oni).",
    "illustration": {
      "badge": "👹",
      "concept": "Mặt nạ quỷ đỏ Oni trong lễ Setsubun",
      "visualDesc": "Mặt nạ quỷ đỏ Oni hai sừng nhọn nhe nanh dữ tợn dùng trong nghi thức ném đậu xua tà Setsubun."
    }
  },
  "魁": {
    "components": ["鬼", "斗"],
    "equation": "Con quỷ dũng mãnh (鬼) tay vung chiếc đấu lớn (斗) xông pha đi đầu đoàn quân",
    "mnemonic": "Người dũng cảm đi đầu tiên phong mở đường cho sự nghiệp thành công, đứng đầu, thủ lĩnh, người tiên phong (sakigake).",
    "illustration": {
      "badge": "🚩",
      "concept": "Người tiên phong giương cờ mở đường",
      "visualDesc": "Chiến sĩ cầm cờ tiên phong vượt qua rào cản mở lối dẫn đường cho đồng đội tiến lên."
    }
  },
  "魂": {
    "components": ["云", "鬼"],
    "equation": "Làn mây khói linh thiêng (云) hóa thành hình bóng con ma quỷ lơ lửng (鬼)",
    "mnemonic": "Phần linh hồn cốt lõi bên trong tạo nên sinh khí và nhiệt huyết bùng cháy của con người, linh hồn, tâm hồn, linh phách (tamashii).",
    "illustration": {
      "badge": "🔥",
      "concept": "Ngọn lửa linh hồn rực cháy tamashii",
      "visualDesc": "Ngọn lửa xanh biếc bập bùng cháy sáng giữa màn đêm tượng trưng cho ngọn lửa linh hồn bất diệt."
    }
  },
  "魅": {
    "components": ["未", "鬼"],
    "equation": "Con quỷ tinh nghịch (鬼) ẩn nấp trong lùm cây non tơ chưa lớn (未) mê hoặc lòng người",
    "mnemonic": "Sức hấp dẫn quyến rũ kỳ diệu làm say mê đắm chìm trái tim người khác, quyến rũ, mê hoặc, mị lực hấp dẫn.",
    "illustration": {
      "badge": "✨",
      "concept": "Sức quyến rũ lôi cuốn mê hoặc",
      "visualDesc": "Ánh mắt long lanh tỏa ánh sáng nhiệm màu tạo nên sức hút quyến rũ lòng người khó cưỡng."
    }
  },
  "魔": {
    "components": ["广", "林", "鬼"],
    "equation": "Dưới mái nhà âm u (广) giữa rừng cây rậm rạp (林) có con quỷ ma thuật ẩn náu (鬼)",
    "mnemonic": "Thế lực ma quỷ thần bí có năng lực phép thuật biến hóa khôn lường, ma quỷ, ác ma, phép thuật ma thuật.",
    "illustration": {
      "badge": "🧙",
      "concept": "Pháp sư vung quyền trượng ma thuật",
      "visualDesc": "Quyền trượng ma thuật phát ra những ngôi sao sáng lấp lánh thi triển phép màu huyền bí."
    }
  },
  "鮎": {
    "components": ["魚", "占"],
    "equation": "魚 (Loài cá nước ngọt) độc chiếm một vùng lãnh thổ rêu đá (占)",
    "mnemonic": "Loài cá nước ngọt quý sống ở suối trong thơm mùi dưa leo nướng muối thơm ngon trứ danh, cá ayu nước ngọt (ayu).",
    "illustration": {
      "badge": "🐟",
      "concept": "Cá ayu nướng muối xiên que thơm lừng",
      "visualDesc": "Những xiên cá ayu tươi uốn cong nướng quanh bếp than hồng thơm phức vị ngọt của suối nguồn."
    }
  },
  "鮮": {
    "components": ["魚", "羊"],
    "equation": "Thịt cá tươi (魚) kết hợp vị thơm béo của thịt cừu (羊) tạo nên vị ngọt đậm đà",
    "mnemonic": "Hải sản tươi sống vừa đánh bắt từ biển lên và màu sắc rực rỡ bắt mắt, tươi ngon, tươi mát, rực rỡ (azayaka).",
    "illustration": {
      "badge": "🍣",
      "concept": "Đĩa sashimi cá tươi ngon óng ánh",
      "visualDesc": "Những lát cá hồi cá ngừ tươi roi rói xếp hình hoa hồng trên khay đá lạnh tinh khiết."
    }
  },
  "鯉": {
    "components": ["魚", "里"],
    "equation": "魚 (Loài cá lớn) bơi lội trong ao hồ đồng ruộng làng quê (里)",
    "mnemonic": "Loài cá chép vượt vũ môn hóa rồng biểu tượng cho lòng kiên trì dũng cảm của các bé trai, cá chép, cá chép koi (koi).",
    "illustration": {
      "badge": "🎏",
      "concept": "Cờ cá chép koinobori tung bay trong gió",
      "visualDesc": "Cờ cá chép vải ngũ sắc no gió bơi lượn trên bầu trời xanh ngày tết thiếu nhi mùng năm tháng năm."
    }
  },
  "鯛": {
    "components": ["魚", "周"],
    "equation": "魚 (Loài cá biển vảy đỏ) mang lại niềm vui trọn vẹn chu toàn (周) cho ngày hỷ sự",
    "mnemonic": "Con cá vảy đỏ tươi mang lại may mắn tốt lành trong các mâm tiệc chúc mừng của người Nhật, cá tráp biển, cá tai may mắn (tai).",
    "illustration": {
      "badge": "🐟",
      "concept": "Cá tráp biển đỏ tươi may mắn medetai",
      "visualDesc": "Chú cá tráp biển màu đỏ hồng tươi tắn vây giương cao biểu trưng cho sự chúc phúc may mắn medetai."
    }
  },
  "鯨": {
    "components": ["魚", "京"],
    "equation": "魚 (Loài sinh vật biển) to lớn khổng lồ như cả một tòa kinh đô tráng lệ (京)",
    "mnemonic": "Loài thú biển khổng lồ bơi lội uy nghi giữa đại dương phun cột nước trắng xóa lên trời, cá voi đại dương (kujira).",
    "illustration": {
      "badge": "🐳",
      "concept": "Chú cá voi xanh phun cột nước cao",
      "visualDesc": "Cá voi xanh khổng lồ nhô mình khỏi mặt biển phun cột nước trắng xóa rực rỡ dưới nắng."
    }
  },
  "鳩": {
    "components": ["九", "鳥"],
    "equation": "九 (Tiếng kêu gù gù cúc cu) của loài chim hiền hòa (鳥)",
    "mnemonic": "Loài chim bồ câu sải cánh bay lượn ngậm cành ô liu biểu tượng cho hòa bình thế giới, chim bồ câu (hato).",
    "illustration": {
      "badge": "🕊️",
      "concept": "Bồ câu trắng ngậm cành ô liu hòa bình",
      "visualDesc": "Chú bồ câu trắng muốt sải rộng đôi cánh bay lượn trên bầu trời xanh mang thông điệp hòa bình."
    }
  },
  "鳳": {
    "components": ["凡", "鳥"],
    "equation": "Loài chim thần kỳ xuất chúng (鳥) vượt trội hơn hẳn mọi loài chim tầm thường (凡)",
    "mnemonic": "Loài chim linh thiêng lông ngũ sắc chúa tể muôn loài chim trong truyền thuyết, chim phượng hoàng đực (hōō).",
    "illustration": {
      "badge": "🦚",
      "concept": "Tượng phượng hoàng vàng trên nóc chùa Byodoin",
      "visualDesc": "Tượng chim phượng hoàng mạ vàng kiêu hãnh giương cánh trên nóc sảnh Phượng Hoàng chùa Byodoin."
    }
  },
  "鴻": {
    "components": ["江", "鳥"],
    "equation": "Loài chim lớn (鳥) sải cánh bay qua dòng sông lớn mênh mông (江)",
    "mnemonic": "Loài chim nhạn to lớn bay cao mang theo chí lớn bao la ngút trời, chim hồng hộc, to lớn hùng vĩ, hồng ân.",
    "illustration": {
      "badge": "🦅",
      "concept": "Đàn chim hồng sải cánh vượt đại giang",
      "visualDesc": "Đàn chim lớn sải cánh bay lượn thẳng hàng vượt qua dòng sông rộng lớn mênh mông."
    }
  },
  "鵬": {
    "components": ["朋", "鳥"],
    "equation": "Loài chim khổng lồ (鳥) có sải cánh che rợp trời như hai vầng trăng bạn hữu (朋)",
    "mnemonic": "Loài đại bàng khổng lồ cưỡi gió bay vút chín vạn dặm biểu tượng cho chí lớn vươn xa, chim đại bằng, chim bằng vĩ đại.",
    "illustration": {
      "badge": "🦅",
      "concept": "Chim bằng cưỡi gió vút chín vạn dặm",
      "visualDesc": "Chim đại bàng khổng lồ rẽ mây cưỡi gió lượn qua những tầng mây cao vút kỳ vĩ."
    }
  },
  "鶏": {
    "components": ["奚", "鳥"],
    "equation": "Loài chim nhà (鳥) bị dây buộc chân (奚) cất tiếng gáy gọi mặt trời rạng đông",
    "mnemonic": "Chú gà trống oai vệ cất tiếng gáy vang báo hiệu bình minh xua tan bóng đêm tăm tối, con gà, thịt gà, kê minh (niwatori).",
    "illustration": {
      "badge": "🐓",
      "concept": "Chú gà trống gáy đón bình minh",
      "visualDesc": "Chú gà trống mào đỏ tươi rực rỡ vươn cổ cất tiếng gáy vang đón ánh bình minh rạng rỡ."
    }
  },
  "鶴": {
    "components": ["隺", "鳥"],
    "equation": "Loài chim cao quý (鳥) có đôi chân dài và bộ lông trắng muốt bay cao vút (隺)",
    "mnemonic": "Loài chim hạc thanh tao nghìn năm biểu tượng cho sự trường thọ và lòng chung thủy son sắt, chim hạc trắng (tsuru).",
    "illustration": {
      "badge": "🦩",
      "concept": "Hạc trắng đầu đỏ múa trên tuyết tsuru",
      "visualDesc": "Đôi chim hạc trắng đỉnh đầu đỏ thắm khiêu vũ duyên dáng trên cánh đồng tuyết trắng Hokkaido."
    }
  },
  "鷹": {
    "components": ["广", "亻", "隹", "鳥"],
    "equation": "Dưới mái hiên (广) người thợ huấn luyện (亻) nâng niu loài chim săn mồi móng sắc (隹 鳥)",
    "mnemonic": "Chúa tể bầu trời có đôi mắt tinh anh và móng vuốt sắc bén săn mồi chớp nhoáng, chim ưng, chim đại bàng (taka).",
    "illustration": {
      "badge": "🦅",
      "concept": "Chim ưng oai vệ đậu trên tay võ sĩ",
      "visualDesc": "Chú chim ưng uy phong mắt sắc như dao đậu trên bao tay da của võ sĩ săn chim truyền thống."
    }
  },
  "鹿": {
    "components": ["鹿"],
    "equation": "Hình tượng chú hươu có cặp sừng phân nhánh tuyệt đẹp và đôi mắt tròn xoe hiền lành",
    "mnemonic": "Loài thú hiền hòa linh thiêng thong dong đi lại trong công viên cố đô Nara, con hươu, con nai, lộc biếc (shika).",
    "illustration": {
      "badge": "🦌",
      "concept": "Chú hươu sao Nara cúi đầu chào khách",
      "visualDesc": "Chú hươu sao hiền từ trong công viên Nara cúi đầu nhận chiếc bánh senbei từ tay du khách."
    }
  },
  "麗": {
    "components": ["丽", "鹿"],
    "equation": "Chú hươu sao (鹿) có cặp sừng đối xứng nở hoa lộng lẫy (丽)",
    "mnemonic": "Vẻ đẹp kiều diễm rực rỡ làm say đắm lòng người tựa cành hoa khoe sắc, diễm lệ, xinh đẹp, lộng lẫy thanh tú (uruwashii).",
    "illustration": {
      "badge": "✨",
      "concept": "Cảnh sắc thiên nhiên diễm lệ tuyệt trần",
      "visualDesc": "Bức tranh sơn thủy hữu tình tráng lệ với thác nước đổ và cầu vồng lung linh diễm lệ."
    }
  },
  "麟": {
    "components": ["鹿", "粦"],
    "equation": "Loài linh thú họ hươu (鹿) tỏa ánh lân tinh rực rỡ lấp lánh (粦)",
    "mnemonic": "Linh vật thần kỳ mang lại điềm lành cát tường thái bình cho nhân gian, kỳ lân, tuấn kiệt xuất chúng (Kirin).",
    "illustration": {
      "badge": "🦄",
      "concept": "Linh thú Kỳ Lân đạp mây phun lửa",
      "visualDesc": "Kỳ Lân thần thú vảy rồng thân hươu đạp mây mang lại phước lành cát tường cho nhân gian."
    }
  },
  "麻": {
    "components": ["广", "林"],
    "equation": "Dưới mái nhà kho (广) phơi những bó cây sợi bện thành rừng (林)",
    "mnemonic": "Cây gai dầu lấy vỏ tước sợi dệt thành tấm vải lanh mát rượi và cảm giác tê rần đầu ngón tay, cây gai dầu, vải lanh, tê mê ma túy (asa).",
    "illustration": {
      "badge": "🌿",
      "concept": "Cây gai dầu tước sợi dệt vải lanh",
      "visualDesc": "Những sợi gai dầu vàng óng được tước mịn chuẩn bị dệt thành tấm vải lanh mùa hè mát rượi."
    }
  },
  "麿": {
    "components": ["麻", "呂"],
    "equation": "Mặc áo vải gai lanh (麻) cất giọng ngâm thơ nhịp nhàng từ chiếc miệng xướng âm (呂)",
    "mnemonic": "Từ cổ tự xưng tao nhã của các quý tộc triều đình và đuôi tên quen thuộc của đàn ông Nhật Bản xưa, tên đàn ông cổ (maro).",
    "illustration": {
      "badge": "🎎",
      "concept": "Quý tộc triều đình Heian tao nhã",
      "visualDesc": "Vị quan quý tộc triều đình Heian đội mũ eboshi khoác áo lụa ngâm thơ xưng là maro."
    }
  },
  "黎": {
    "components": ["黍", "勹", "刀"],
    "equation": "Dùng liềm dao (刀) gặt lấy những hạt kê nếp đen mọng (黍) trong bóng râm (勹)",
    "mnemonic": "Ánh sáng đầu tiên ló rạng xua tan màn đêm u tối mở ra một kỷ nguyên mới, bình minh, lê minh rạng đông, lê dân bách tính.",
    "illustration": {
      "badge": "🌅",
      "concept": "Bình minh lê minh ló rạng chân trời",
      "visualDesc": "Ánh rạng đông đầu tiên hé mở nơi chân trời xua tan màn đêm lạnh giá đón ngày mới tươi sáng."
    }
  },
  "黙": {
    "components": ["黑", "犬"],
    "equation": "Chú chó săn trung thành (犬) im lặng không sủa một tiếng nằm phục trong bóng tối đen (黑)",
    "mnemonic": "Giữ im lặng tuyệt đối không hé nửa lời lắng nghe và suy ngẫm, im lặng, trầm mặc, mặc niệm (damaru).",
    "illustration": {
      "badge": "🤫",
      "concept": "Giữ im lặng sâu lắng trong phút mặc niệm",
      "visualDesc": "Ngón tay khẽ đặt lên môi ra hiệu giữ yên lặng trong không gian thanh tịnh trang nghiêm."
    }
  },
  "黛": {
    "components": ["代", "黑"],
    "equation": "Chất bột khoáng màu đen tuyền (黑) dùng thay thế phấn sáp (代) điểm trang đôi lông mày",
    "mnemonic": "Chất chì màu xanh đen tuyền dùng tô điểm hàng chân mày lá liễu kiêu sa của thiếu nữ, chì kẻ lông mày xanh đen, mày ngài (mayuzumi).",
    "illustration": {
      "badge": "💄",
      "concept": "Hàng lông mày vẽ chì xanh đen mayuzumi",
      "visualDesc": "Cây bút chì kẻ mày bằng gốm vẽ nên đường chân mày cong vút thanh tú lá liễu."
    }
  },
  "鼓": {
    "components": ["士", "豆", "又"],
    "equation": "Bàn tay (又) cầm dùi gõ nhịp lên mặt trống da tròn trịa gắn trên giá đỡ chân cao (豆)",
    "mnemonic": "Tiếng trống rền vang giục giã cổ vũ tinh thần chiến đấu và không khí lễ hội tưng bừng, cái trống, đánh trống, cổ vũ khích lệ (tsuzumi).",
    "illustration": {
      "badge": "🥁",
      "concept": "Tiếng trống taiko rền vang lễ hội",
      "visualDesc": "Nghệ nhân đánh chiếc trống gỗ taiko khổng lồ gióng lên những hồi trống giòn giã rền vang khắp phố."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n1mData)) {
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

console.log(`[Batch 5M - N1 Final Batch] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n1mData).length} chữ Kanji N1 cuối cùng.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
