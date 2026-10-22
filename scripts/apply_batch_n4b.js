const fs = require('fs');
const path = require('path');

const n4bData = {
  "曜": {
    components: ["日", "羽", "隹"],
    equation: "日 (Mặt trời) + 翟 (Địch - cánh chim sặc sỡ bay cao)",
    mnemonic: "Mặt trời (日) chiếu rọi đàn chim trĩ (翟) dang rộng cánh rực rỡ, biểu thị các ngày tinh tú soi sáng trong tuần.",
    illustration: {
      badge: "☀️",
      concept: "Ánh dương tinh tú",
      visualDesc: "Ánh mặt trời lấp lánh soi bóng đôi cánh chim sặc sỡ bay qua bầu trời."
    }
  },
  "有": {
    components: ["𠂇", "月"],
    equation: "𠂇 (Bàn tay) + 月 (Nhục - miếng thịt cầm trong tay)",
    mnemonic: "Bàn tay (𠂇) cầm chắc miếng thịt (月/肉), có của ăn của để trong tay nghĩa là có, sở hữu.",
    illustration: {
      badge: "🍖",
      concept: "Có thịt trong tay",
      visualDesc: "Bàn tay nắm giữ phần thức ăn dồi dào, biểu thị sự sở hữu dư dả."
    }
  },
  "服": {
    components: ["月", "卩", "又"],
    equation: "Nguyệt (月 thân thể/nhục) + 𠬝 (người quỳ vâng phục tùng)",
    mnemonic: "Quần áo mặc vừa vặn ôm lấy thân thể (月), người mặc cảm thấy thoải mái và thuần phục nề nếp.",
    illustration: {
      badge: "👘",
      concept: "Trang phục chỉnh tề",
      visualDesc: "Bộ yukata truyền thống trang nhã ôm vừa vặn thân mình."
    }
  },
  "朝": {
    components: ["十", "日", "十", "月"],
    equation: "Thập (十) + Nhật (日) + Thập (十) + Nguyệt (月)",
    mnemonic: "Mặt trời (日) nhô lên giữa những ngọn cỏ (十...十) trong khi vầng trăng (月) còn lờ mờ chưa lặn: buổi sáng sớm.",
    illustration: {
      badge: "🌅",
      concept: "Bình minh rạng rỡ",
      visualDesc: "Mặt trời sớm ló rạng sau rặng cỏ lau khi trăng tàn còn in bóng."
    }
  },
  "業": {
    components: ["业", "䒑", "木"],
    equation: "Giá chuông khánh chạm khắc lớn thời cổ",
    mnemonic: "Giá treo dàn chuông khánh đồ sộ thời xưa, dựng nên cơ nghiệp và sự nghiệp vẻ vang.",
    illustration: {
      badge: "💼",
      concept: "Sự nghiệp cơ đồ",
      visualDesc: "Giá nhạc cụ bằng gỗ chạm khắc hoa văn uy nghiêm biểu tượng cho cơ nghiệp."
    }
  },
  "楽": {
    components: ["白", "丷", "木"],
    equation: "Tiểu bạch (chuông hạt ngọc) đặt trên giá gỗ đàn (木)",
    mnemonic: "Nhạc cụ gõ bằng gỗ (木) ngân vang âm thanh trong trẻo, mang lại niềm vui vẻ hân hoan và âm nhạc.",
    illustration: {
      badge: "🎵",
      concept: "Âm nhạc vui tươi",
      visualDesc: "Cây đàn gỗ phát ra những nốt nhạc réo rắt mang lại nụ cười rạng rỡ."
    }
  },
  "歌": {
    components: ["哥", "欠"],
    equation: "哥 (Khả + Khả: giọng ngân vang) + 欠 (Khiếm: há miệng)",
    mnemonic: "Mở rộng miệng (欠) ngân vang từng khúc hát điệp khúc (哥), tạo nên bài ca du dương.",
    illustration: {
      badge: "🎤",
      concept: "Cất cao tiếng hát",
      visualDesc: "Ca sĩ cất cao giọng hát say sưa ngân nga giai điệu ngọt ngào."
    }
  },
  "止": {
    components: ["止"],
    equation: "Chữ tượng hình bàn chân dừng bước",
    mnemonic: "Hình ảnh bàn chân chạm đất đứng im không bước tiếp, nghĩa là dừng lại, đình chỉ.",
    illustration: {
      badge: "🛑",
      concept: "Dừng lại đứng yên",
      visualDesc: "Bàn chân dừng bước bên vệ đường vạch kẻ an toàn."
    }
  },
  "正": {
    components: ["一", "止"],
    equation: "Nhất (一 ranh giới chuẩn mực) + Chỉ (止 bàn chân bước)",
    mnemonic: "Bàn chân (止) bước đi ngay ngắn theo đúng ranh giới chuẩn mực (一), thẳng thắn, chính xác.",
    illustration: {
      badge: "⚖️",
      concept: "Chính trực đúng đắn",
      visualDesc: "Bàn cân thăng bằng tuyệt đối biểu thị sự công chính, chuẩn xác."
    }
  },
  "歩": {
    components: ["止", "少"],
    equation: "Chỉ (止 chân trước) + bàn chân sau bước tiếp",
    mnemonic: "Hai bàn chân lần lượt nhấc lên bước tới trước, tạo thành từng bước chân đi bộ.",
    illustration: {
      badge: "🚶",
      concept: "Từng bước tản bộ",
      visualDesc: "Dấu chân đều đặn in trên lối mòn con đường rợp bóng cây."
    }
  },
  "死": {
    components: ["歹", "匕"],
    equation: "Đãi (歹 mảnh xương cốt còn lại) + 匕 (người cúi mình)",
    mnemonic: "Người thân quỳ gối gục đầu (匕) thương tiếc bên đống tro tàn xương cốt (歹), biểu thị cái chết.",
    illustration: {
      badge: "🍂",
      concept: "Lá rụng về cội",
      visualDesc: "Chiếc lá vàng khô héo lìa cành bay trong chiều thu quạnh quẽ."
    }
  },
  "注": {
    components: ["氵", "主"],
    equation: "氵 (Thủy - dòng nước) + 主 (Chủ - ngọn đèn/tập trung)",
    mnemonic: "Rót dòng nước (氵) thẳng vào ngọn đèn (主), chú ý dồn hết tâm trí vào một điểm.",
    illustration: {
      badge: "🫖",
      concept: "Rót nước tập trung",
      visualDesc: "Dòng nước trà rót cẩn thận chuẩn xác vào giữa lòng chén gốm."
    }
  },
  "洋": {
    components: ["氵", "羊"],
    equation: "氵 (Thủy - nước biển lớn) + 羊 (Dương - con cừu hiền hòa)",
    mnemonic: "Vùng biển nước (氵) rộng mênh mông bát ngát như đồng cỏ cừu (羊), chỉ đại dương bao la phương Tây.",
    illustration: {
      badge: "🌊",
      concept: "Đại dương mênh mông",
      visualDesc: "Những con sóng bạc đầu cuồn cuộn trên đại dương xanh thẳm vô tận."
    }
  },
  "海": {
    components: ["氵", "每"],
    equation: "氵 (Thủy - nước) + 每 (Mỗi - mẹ hiền bú sữa/nơi sinh sôi)",
    mnemonic: "Đại dương (氵) như người mẹ vĩ đại (每) dung chứa trăm sông đổ về và nuôi dưỡng muôn loài sinh vật biển.",
    illustration: {
      badge: "🏖️",
      concept: "Biển cả bao la",
      visualDesc: "Bờ biển xanh biếc dập dềnh sóng vỗ rì rào bên bãi cát trắng."
    }
  },
  "漢": {
    components: ["氵", "廿", "口", "夫"],
    equation: "氵 (Thủy - dòng sông Hán Thủy) + 堇 (đất đai bờ bãi sấy khô)",
    mnemonic: "Dòng sông Hán Thủy (氵) nơi các đấng nam nhi quật cường gầy dựng nên triều Hán và chữ Hán.",
    illustration: {
      badge: "📜",
      concept: "Chữ Hán ngàn năm",
      visualDesc: "Cuộn thẻ tre khắc chữ Hán cổ kính bên bờ sông lịch sử."
    }
  },
  "牛": {
    components: ["牛"],
    equation: "Chữ tượng hình cặp sừng và đầu con trâu bò",
    mnemonic: "Hai sừng nhọn uốn cong cùng chiếc mũi thẳng thắn, tượng trưng cho loài trâu bò cày bừa chăm chỉ.",
    illustration: {
      badge: "🐂",
      concept: "Con bò chăm chỉ",
      visualDesc: "Chú bò lực lưỡng thong dong gặm cỏ trên đồng cỏ xanh mướt."
    }
  },
  "物": {
    components: ["牛", "勿"],
    equation: "牛 (Ngưu - con bò) + 勿 (Vật - hoa văn cờ sọc)",
    mnemonic: "Con bò (牛) khoác lên mình tấm khăn có dải màu (勿), dùng để phân định muôn loài vật thể.",
    illustration: {
      badge: "📦",
      concept: "Vạn vật đồ đạc",
      visualDesc: "Chiếc hộp chứa đựng nhiều đồ vật phong phú đa dạng được xếp gọn."
    }
  },
  "特": {
    components: ["牛", "寺"],
    equation: "牛 (Ngưu - con bò lớn) + 寺 (Tự - đền chùa lễ hội)",
    mnemonic: "Con bò đực dũng mãnh (牛) được tuyển chọn đưa vào chùa (寺) tế lễ, quả là đặc biệt hiếm có.",
    illustration: {
      badge: "⭐",
      concept: "Đặc biệt xuất sắc",
      visualDesc: "Ngôi sao sáng lấp lánh nổi bật giữa hàng vạn vì sao bình thường."
    }
  },
  "犬": {
    components: ["犬"],
    equation: "Đại (大 người dang tay) + chấm (丶 đuôi cún vẫy mừng)",
    mnemonic: "Chữ Đại thêm một dấu chấm ở góc trên giống chú chó trung thành ngoe nguẩy chiếc đuôi nhỏ.",
    illustration: {
      badge: "🐕",
      concept: "Chú chó trung thành",
      visualDesc: "Chú chó Shiba tinh khôn vẫy đuôi đứng đón chủ về trước thềm nhà."
    }
  },
  "理": {
    components: ["王", "里"],
    equation: "王 (Ngọc - thỏi ngọc quý) + 里 (Lý - ranh giới đường vân thớ ngọc)",
    mnemonic: "Gọt giũa khối ngọc quý (王) nương theo từng đường vân thớ (里) rõ ràng, tạo nên đạo lý và chân lý.",
    illustration: {
      badge: "💎",
      concept: "Mài dũa lý lẽ",
      visualDesc: "Viên ngọc bích tỏa sáng rực rỡ với từng đường cắt giác tinh xảo hợp lý."
    }
  },
  "用": {
    components: ["用"],
    equation: "Chữ tượng hình chiếc xô gáo đựng đồ dùng gia đình",
    mnemonic: "Chiếc giỏ đan hoặc xô nước có quai xách tiện lợi dùng cho sinh hoạt hàng ngày.",
    illustration: {
      badge: "🔧",
      concept: "Sử dụng đắc lực",
      visualDesc: "Hộp công cụ đa năng sẵn sàng ứng dụng cho mọi công việc."
    }
  },
  "田": {
    components: ["田"],
    equation: "Chữ tượng hình ô ruộng bờ ngang dọc vuông vắn",
    mnemonic: "Thửa ruộng vuông vức với các bờ rãnh ngang dọc dẫn nước tưới tiêu tốt tươi.",
    illustration: {
      badge: "🌾",
      concept: "Ruộng lúa trĩu hạt",
      visualDesc: "Thửa ruộng bậc thang chia ô xanh ngát tỏa hương lúa thơm ngào ngạt."
    }
  },
  "町": {
    components: ["田", "丁"],
    equation: "田 (Điền - cánh đồng) + 丁 (Đinh - ngã tư/con đường)",
    mnemonic: "Con đường ngã tư (丁) chạy xuyên qua bờ ruộng (田), nơi hình thành nên xóm phố, thị trấn sầm uất.",
    illustration: {
      badge: "🏘️",
      concept: "Khu phố xóm làng",
      visualDesc: "Khu phố nhỏ yên bình với những ngôi nhà mái ngói bên con đường thẳng tắp."
    }
  },
  "画": {
    components: ["一", "由", "凵"],
    equation: "Cầm bút vạch nên ranh giới và bức tranh (田/由)",
    mnemonic: "Cầm bút vẽ vạch nên từng nét ranh giới ô ruộng vuông vức trên khung giấy, tạo thành bức họa.",
    illustration: {
      badge: "🎨",
      concept: "Họa sĩ vẽ tranh",
      visualDesc: "Bảng pha màu rực rỡ và cây cọ đang điểm tô cho bức tranh phong cảnh."
    }
  },
  "界": {
    components: ["田", "介"],
    equation: "田 (Điền - ruộng đất) + 介 (Giới - người đứng phân giới)",
    mnemonic: "Người đứng ở giữa (介) giăng dây chia ranh giới rõ ràng cho từng mảnh ruộng (田), hình thành thế giới và ranh giới.",
    illustration: {
      badge: "🌐",
      concept: "Ranh giới thế giới",
      visualDesc: "Quả địa cầu với các đường kinh tuyến vĩ tuyến phân định rõ ranh giới."
    }
  },
  "病": {
    components: ["疒", "丙"],
    equation: "疒 (Nạch - bệnh tật nằm liệt) + 丙 (Bính - hỏa nóng rực)",
    mnemonic: "Nằm mệt mỏi trên giường bệnh (疒) với cơn sốt nóng ran (丙) bốc hỏa, thể hiện nỗi đau ốm bệnh tật.",
    illustration: {
      badge: "🤒",
      concept: "Ốm sốt bệnh tật",
      visualDesc: "Người đắp chăn nằm nghỉ trên giường với nhiệt kế đo thân nhiệt bên cạnh."
    }
  },
  "発": {
    components: ["癶", "一", "厶"],
    equation: "癶 (Bát - hai chân mở rộng) + nỏ tên giương bắn bung ra",
    mnemonic: "Hai chân đứng vững dang rộng (癶) buông dây nỏ cho mũi tên phát bay vút ra ngoài.",
    illustration: {
      badge: "🚀",
      concept: "Phát nổ xuất phát",
      visualDesc: "Tàu vũ trụ khai hỏa động cơ vút bay thẳng lên bầu trời xanh."
    }
  },
  "的": {
    components: ["白", "勺"],
    equation: "白 (Bạch - tâm điểm tròn màu trắng) + 勺 (Chước - chiếc muỗng ngắm)",
    mnemonic: "Nhắm thẳng vào điểm chấm trắng (白) chính giữa hồng tâm bia bắn, đánh trúng mục đích.",
    illustration: {
      badge: "🎯",
      concept: "Hồng tâm mục đích",
      visualDesc: "Mũi tên cắm thẳng vào vòng tròn đỏ hồng tâm trên tấm bia bắn cung."
    }
  },
  "目": {
    components: ["目"],
    equation: "Chữ tượng hình viền mắt và con ngươi",
    mnemonic: "Mắt mở to với đôi mí và hai đồng tử tinh tường quan sát vạn vật.",
    illustration: {
      badge: "👁️",
      concept: "Ánh mắt tinh tường",
      visualDesc: "Ánh mắt sáng ngời chăm chú quan sát thế giới xung quanh."
    }
  },
  "真": {
    components: ["十", "目", "八"],
    equation: "Thập (十 toàn diện) + Mục (目 con mắt) + Bát (八 bệ đỡ chân thật)",
    mnemonic: "Mười hướng (十) dùng đôi mắt sáng (目) nhìn nhận chân thật vững như kiềng ba chân (八), không dối trá.",
    illustration: {
      badge: "🔍",
      concept: "Chân lý thuần khiết",
      visualDesc: "Kính lúp soi rõ từng chi tiết chân thực dưới ánh sáng rạng ngời."
    }
  },
  "着": {
    components: ["䒑", "丿", "目"],
    equation: "Dương (biến thể áo lông cừu) + 目 (Mục - chú mục ngắm nhìn)",
    mnemonic: "Mặc chiếc áo lông cừu ấm áp lên người rồi liếc mắt (目) soi gương xem đã đến nơi tươm tất chưa.",
    illustration: {
      badge: "🧥",
      concept: "Mặc áo ấm áp",
      visualDesc: "Chiếc áo khoác dạ ấm áp tinh tươm được treo cẩn thận trên móc áo."
    }
  },
  "知": {
    components: ["矢", "口"],
    equation: "矢 (Thỉ - mũi tên bén) + 口 (Khẩu - lời nói ra)",
    mnemonic: "Hiểu biết thông suốt như tên bắn (矢), mở miệng (口) nói năng trôi chảy rành mạch, tỏ tường tri thức.",
    illustration: {
      badge: "💡",
      concept: "Tri thức sáng suốt",
      visualDesc: "Bóng đèn bật sáng rực rỡ tượng trưng cho ý tưởng và tri thức bừng nở."
    }
  },
  "研": {
    components: ["石", "开"],
    equation: "石 (Thạch - hòn đá mài) + 开 (Khai - mở rộng/san phẳng)",
    mnemonic: "Dùng tảng đá mài (石) chà xát thật phẳng (开) để chế tác đá quý, biểu thị sự nghiên cứu miệt mài.",
    illustration: {
      badge: "🔬",
      concept: "Nghiên cứu miệt mài",
      visualDesc: "Kính hiển vi soi rõ các mẫu vật trong phòng thí nghiệm khoa học."
    }
  },
  "社": {
    components: ["礻", "土"],
    equation: "礻 (Thị - lễ cúng thần linh) + 土 (Thổ - đất đai quê hương)",
    mnemonic: "Lập bàn thờ tế thần (礻) cầu phúc cho mảnh đất mùa màng (土), nơi dân chúng tụ họp thành xã hội, công ty.",
    illustration: {
      badge: "⛩️",
      concept: "Đền chùa xã hội",
      visualDesc: "Cổng Torii đỏ rực rỡ đứng uy nghiêm bên tán cây cổ thụ của ngôi đền làng."
    }
  },
  "私": {
    components: ["禾", "厶"],
    equation: "禾 (Hòa - cây lúa gặt hái) + 厶 (Khư - vòng tay ôm thu vén vào mình)",
    mnemonic: "Gặt được bó lúa chín vàng (禾) liền vòng tay ôm gọn vào lòng (厶), của riêng tư cá nhân mình.",
    illustration: {
      badge: "🔒",
      concept: "Riêng tư cá nhân",
      visualDesc: "Quyển nhật ký bí mật có ổ khóa nhỏ cài trang trọng trên bàn học."
    }
  },
  "秋": {
    components: ["禾", "火"],
    equation: "禾 (Hòa - bông lúa chín vàng) + 火 (Hỏa - lửa đốt rơm rạ)",
    mnemonic: "Lúa gặt xong (禾), nông dân nổi lửa đốt rơm rạ (火) ấm áp xua gió lạnh mùa thu sang.",
    illustration: {
      badge: "🍁",
      concept: "Mùa thu rực rỡ",
      visualDesc: "Rừng phong nhuộm sắc lá đỏ thắm bên cánh đồng lúa chín vàng ươm."
    }
  },
  "究": {
    components: ["穴", "九"],
    equation: "穴 (Huyệt - cửa hang sâu thẳm) + 九 (Cửu - con số tột cùng chín tầng)",
    mnemonic: "Lần tìm vào tận đáy sâu hang động (穴) đến tận chín tầng (九), truy cứu đến ngọn ngành tri thức.",
    illustration: {
      badge: "🧭",
      concept: "Thám hiểm cứu xét",
      visualDesc: "Nhà thám hiểm cầm la bàn soi đèn vào hang sâu tìm kiếm kho báu tri thức."
    }
  },
  "空": {
    components: ["穴", "工"],
    equation: "穴 (Huyệt - vòm hang rỗng) + 工 (Công - dụng cụ thợ)",
    mnemonic: "Vòm hang đá (穴) đục rỗng qua bàn tay thợ (工), tạo nên khoảng không gian trống rỗng, bầu trời bao la.",
    illustration: {
      badge: "☁️",
      concept: "Bầu trời trong xanh",
      visualDesc: "Mây trắng bồng bềnh trôi giữa bầu trời cao xanh thẳm lộng gió."
    }
  },
  "立": {
    components: ["立"],
    equation: "Chữ tượng hình người đứng vững trên mặt đất",
    mnemonic: "Dang hai chân bám chắc trên mặt đất phẳng, đứng thẳng hiên ngang độc lập giữa đất trời.",
    illustration: {
      badge: "🧍",
      concept: "Đứng thẳng hiên ngang",
      visualDesc: "Tượng đài dũng mãnh đứng sừng sững trên đỉnh đồi lộng gió."
    }
  },
  "答": {
    components: ["竹", "合"],
    equation: "竹 (Trúc - thẻ tre thư từ) + 合 (Hợp - ăn khớp, chuẩn xác)",
    mnemonic: "Viết lời giải lên thẻ tre (竹) vừa khít hợp lý (合) với câu hỏi, đó chính là câu trả lời đáp án.",
    illustration: {
      badge: "✅",
      concept: "Đáp án chuẩn xác",
      visualDesc: "Dấu tích xanh nổi bật bên cạnh câu trả lời chính xác trọn vẹn."
    }
  },
  "紙": {
    components: ["糸", "氏"],
    equation: "糸 (Mịch - sợi tơ sợi bông) + 氏 (Thị - phiến phẳng cán mỏng)",
    mnemonic: "Những sợi tơ (糸) nghiền mịn cán phẳng mỏng như bản gỗ (氏) tạo thành tờ giấy viết êm ái.",
    illustration: {
      badge: "📄",
      concept: "Trang giấy trắng tinh",
      visualDesc: "Trang giấy Washi truyền thống mềm mịn sẵn sàng cho nét mực mài thơm."
    }
  },
  "終": {
    components: ["糸", "冬"],
    equation: "糸 (Mịch - sợi chỉ quấn nút thắt) + 冬 (Đông - mùa kết thúc năm)",
    mnemonic: "Sợi chỉ (糸) đã thắt nút lại sau cùng như mùa đông (冬) khép lại một năm dài, biểu thị sự kết thúc trọn vẹn.",
    illustration: {
      badge: "🏁",
      concept: "Vạch đích kết thúc",
      visualDesc: "Lá cờ ca-rô tung bay bên vạch đích kết thúc chặng đua rực rỡ."
    }
  },
  "習": {
    components: ["羽", "白"],
    equation: "羽 (Vũ - đôi cánh chim con) + 白 (Bạch - vươn thẳng bay lên)",
    mnemonic: "Chim non ngày ngày vỗ đôi cánh mềm (羽) tập bay dưới bầu trời trong sáng (白), biểu thị sự học tập, luyện tập.",
    illustration: {
      badge: "🐣",
      concept: "Chim con tập bay",
      visualDesc: "Chú chim non rèn luyện đôi cánh nhỏ sải bước bay vào bầu trời tự do."
    }
  },
  "考": {
    components: ["耂", "丂"],
    equation: "耂 (Lão - cụ già tóc dài) + 丂 (hơi thở suy ngẫm uốn khúc)",
    mnemonic: "Cụ già thông thái (耂) chống gậy trầm ngâm suy nghĩ đắn đo (丂), suy xét khảo nghiệm mọi sự đời.",
    illustration: {
      badge: "🤔",
      concept: "Trầm ngâm suy xét",
      visualDesc: "Nhà thông thái vuốt râu suy ngẫm sâu xa bên cuốn cổ thư."
    }
  },
  "者": {
    components: ["耂", "日"],
    equation: "耂 (Lão - người có tuổi tác) + 日 (Nhật - ngày tháng kinh nghiệm)",
    mnemonic: "Người từng trải (耂) qua bao năm tháng ngày (日) kinh nghiệm, biểu thị nhân vật, kẻ hành động.",
    illustration: {
      badge: "👤",
      concept: "Nhân vật người tài",
      visualDesc: "Bóng dáng một nhân sĩ phong thái đĩnh đạc tự tin giữa dòng người."
    }
  },
  "肉": {
    components: ["肉"],
    equation: "Chữ tượng hình miếng thịt cắt lát có thớ nạc mỡ",
    mnemonic: "Miếng thịt tươi xắt lát để lộ những thớ thịt đan chéo rõ ràng trên thớt bếp.",
    illustration: {
      badge: "🥩",
      concept: "Miếng thịt tươi ngon",
      visualDesc: "Lát thịt bò wagyu với những vân mỡ hoa cẩm thạch tuyệt đẹp."
    }
  },
  "自": {
    components: ["自"],
    equation: "Chữ tượng hình sống mũi người",
    mnemonic: "Hình chiếc mũi ngay giữa khuôn mặt: trỏ tay vào mũi mình để biểu thị bản thân, tự mình.",
    illustration: {
      badge: "🪞",
      concept: "Tự soi bản thân",
      visualDesc: "Người tự tin nhìn vào hình ảnh phản chiếu của chính mình trong gương."
    }
  },
  "色": {
    components: ["⺈", "巴"],
    equation: "⺈ (dao mài/người cúi) + 巴 (con rắn đuôi uốn lượn/người)",
    mnemonic: "Khuôn mặt biến chuyển cảm xúc ửng hồng đỏ tía, tạo nên đủ muôn màu sắc thế gian.",
    illustration: {
      badge: "🌈",
      concept: "Muôn màu sắc rực rỡ",
      visualDesc: "Bảy sắc cầu vồng rực rỡ tỏa sáng lung linh sau cơn mưa rào."
    }
  },
  "花": {
    components: ["艹", "化"],
    equation: "艹 (Thảo - cành cỏ non) + 化 (Hóa - biến đổi nảy nở)",
    mnemonic: "Cành cỏ non (艹) trải qua thời gian biến hóa (化) kỳ diệu bỗng bung nở đóa hoa rực rỡ ngát hương.",
    illustration: {
      badge: "🌺",
      concept: "Đóa hoa bung nở",
      visualDesc: "Bông hoa anh đào nở rộ từng cánh mỏng manh ngát hương thơm."
    }
  },
  "英": {
    components: ["艹", "央"],
    equation: "艹 (Thảo - hoa cỏ) + 央 (Ương - vị trí trung tâm nổi bật)",
    mnemonic: "Bông hoa cỏ (艹) đứng ngay chính giữa rực rỡ nhất (央), biểu thị bậc tinh anh tài giỏi, nước Anh.",
    illustration: {
      badge: "🏆",
      concept: "Tinh anh tài giỏi",
      visualDesc: "Chiếc cúp vàng sáng chói tôn vinh tài năng xuất chúng đứng đầu."
    }
  },
  "茶": {
    components: ["艹", "人", "木"],
    equation: "艹 (Thảo - lá trà xanh) + 人 (Nhân - con người thưởng thức) + 木 (Mộc - gốc cây)",
    mnemonic: "Búp lá non (艹) hái từ cây cổ thụ (木) được người (人) pha thành ấm trà thơm nồng tinh khiết.",
    illustration: {
      badge: "🍵",
      concept: "Chén trà thanh tịnh",
      visualDesc: "Chén trà xanh matcha bốc khói nhẹ nhàng mang lại cảm giác an yên."
    }
  },
  "親": {
    components: ["立", "木", "見"],
    equation: "立 (Lập - đứng) + 木 (Mộc - cây cao) + 見 (Kiến - trông ngóng)",
    mnemonic: "Cha mẹ đứng (立) tựa ngọn cây (木) mỏi mắt trông ngóng (見) con trở về, tình thân thiết thiêng liêng.",
    illustration: {
      badge: "👨‍👩‍👧",
      concept: "Cha mẹ yêu thương",
      visualDesc: "Vòng tay cha mẹ ôm ấp đứa con bé bỏng chan chứa tình thương ấm áp."
    }
  },
  "言": {
    components: ["言"],
    equation: "Miệng (口) thốt ra từng đợt sóng âm thanh (các nét ngang)",
    mnemonic: "Từng vạch âm thanh thoát ra từ khuôn miệng thành câu từ rõ ràng, biểu thị lời nói, ngôn ngữ.",
    illustration: {
      badge: "💬",
      concept: "Lời nói chân thành",
      visualDesc: "Bong bóng thoại rạng rỡ trao nhau những câu chúc tốt lành."
    }
  },
  "計": {
    components: ["言", "十"],
    equation: "言 (Ngôn - tính đếm bằng lời) + 十 (Thập - tính đến con số mười)",
    mnemonic: "Đọc to từng lời (言) đếm đủ đến con số mười (十), vạch ra kế hoạch rõ ràng và đo đếm chính xác.",
    illustration: {
      badge: "⏱️",
      concept: "Đồng hồ tính kế",
      visualDesc: "Chiếc đồng hồ bấm giờ chuẩn xác ghi nhận từng tích tắc kế hoạch."
    }
  },
  "試": {
    components: ["言", "式"],
    equation: "言 (Ngôn - lời vấn đáp) + 式 (Thức - quy chuẩn bài bản)",
    mnemonic: "Dùng lời hỏi đáp (言) theo đúng nghi thức khuôn phép (式) để thử thách kiểm tra năng lực, thí nghiệm.",
    illustration: {
      badge: "📝",
      concept: "Kiểm tra thử tài",
      visualDesc: "Bút lông hoàn thành bài thi trên giấy với kết quả hoàn hảo."
    }
  },
  "買": {
    components: ["罒", "貝"],
    equation: "罒 (Võng - lưới giăng đón) + 貝 (Bối - tiền vỏ sò quý)",
    mnemonic: "Giăng tấm lưới (罒) đổi lấy tiền vỏ sò (貝), mang hàng hóa về cho mình: hành động mua sắm.",
    illustration: {
      badge: "🛍️",
      concept: "Mua sắm chợ phiên",
      visualDesc: "Túi đồ đầy ắp những món quà mua được từ phiên chợ nhộn nhịp."
    }
  },
  "貸": {
    components: ["代", "貝"],
    equation: "代 (Đại - trao đổi tạm thời) + 貝 (Bối - tiền tài vỏ sò)",
    mnemonic: "Đưa số tiền vỏ sò (貝) cho người khác đại diện giữ tạm (代), biểu thị sự cho vay, cho mượn.",
    illustration: {
      badge: "🤝",
      concept: "Cho mượn sẻ chia",
      visualDesc: "Hai bàn tay trao nhau đồng xu quý với sự tin cậy chân thành."
    }
  },
  "質": {
    components: ["斤", "斤", "貝"],
    equation: "Hai chiếc rìu (斤+斤) đặt cạnh vỏ sò tiền bạc (貝)",
    mnemonic: "Dùng hai chiếc rìu (斤 斤) cân đo kỹ lưỡng món tiền vỏ sò quý (貝) để xác định phẩm chất và cầm cố.",
    illustration: {
      badge: "🏆",
      concept: "Chất lượng thượng hạng",
      visualDesc: "Huy hiệu vàng lấp lánh bảo chứng chất lượng hoàn hảo tuyệt đối."
    }
  },
  "赤": {
    components: ["土", "灬"],
    equation: "Thổ (đất nung) + Hỏa (ngọn lửa hồng rực rỡ)",
    mnemonic: "Ngọn lửa bốc lên trên nền đất hồng rực (灬), tỏa ra sắc màu đỏ chói chang ấm áp.",
    illustration: {
      badge: "🔴",
      concept: "Màu đỏ rực rỡ",
      visualDesc: "Mặt trời đỏ rực lúc chiều tà buông sắc thắm khắp chân trời."
    }
  },
  "走": {
    components: ["土", "龰"],
    equation: "Người vung tay (phần trên) + bước chân thoan thoắt (止)",
    mnemonic: "Người nhoài mình về phía trước, hai chân (止) thoăn thoắt đạp đất phóng vụt đi như bay, nghĩa là chạy.",
    illustration: {
      badge: "🏃",
      concept: "Chạy nhanh bứt phá",
      visualDesc: "Vận động viên điền kinh sải bước chạy thần tốc về đích."
    }
  },
  "起": {
    components: ["走", "己"],
    equation: "走 (Tẩu - chạy bước rộn rã) + 己 (Kỷ - tấm thân cuộn dậy)",
    mnemonic: "Bản thân (己) thức giấc liền cất bước chạy (走) đón ngày mới, khởi đầu mọi việc hăng say.",
    illustration: {
      badge: "⏰",
      concept: "Thức dậy khởi hành",
      visualDesc: "Tiếng chuông báo thức vang lên, người vươn vai khởi đầu ngày mới năng động."
    }
  },
  "足": {
    components: ["口", "止"],
    equation: "Khẩu (đầu khớp gối tròn) + Chỉ (bàn chân)",
    mnemonic: "Hình đôi chân từ khớp gối (口) đến bàn chân (止) vững chãi; bước đi khắp nơi đầy đủ trọn vẹn.",
    illustration: {
      badge: "🦶",
      concept: "Đôi chân vững vàng",
      visualDesc: "Bàn chân vững chãi bước đều trên con đường hoa cỏ mùa xuân."
    }
  },
  "転": {
    components: ["車", "云"],
    equation: "車 (Xa - bánh xe gỗ) + 云 (Vân - đám mây xoay chuyển)",
    mnemonic: "Bánh xe (車) lăn tròn xoay tít như làn mây cuộn (云), chuyển động lăn bánh đi xa.",
    illustration: {
      badge: "🔄",
      concept: "Xoay chuyển đổi dời",
      visualDesc: "Bánh xe quay tít đưa hành trình luân chuyển khắp muôn phương."
    }
  },
  "近": {
    components: ["辶", "斤"],
    equation: "辶 (Sước - bước chân đi lại) + 斤 (Cân - chiếc rìu ngắn)",
    mnemonic: "Cầm chiếc rìu (斤) chặt cây vừa vài sải chân đi (辶), khoảng cách rất gần gũi trong tầm với.",
    illustration: {
      badge: "📍",
      concept: "Gần gũi trong gang tấc",
      visualDesc: "Cột mốc chỉ khoảng cách ngay trước mắt chỉ vài bước chân."
    }
  },
  "送": {
    components: ["辶", "关"],
    equation: "辶 (Sước - con đường đưa tiễn) + 关 (hai tay dâng quà tặng)",
    mnemonic: "Cầm món quà bằng hai tay bước ra đường (辶) tiễn đưa người bạn thân lên đường bình an, gửi gắm tâm tình.",
    illustration: {
      badge: "👋",
      concept: "Tiễn đưa gửi gắm",
      visualDesc: "Bàn tay vẫy chào tạm biệt đoàn tàu khởi hành trong ánh hoàng hôn."
    }
  },
  "通": {
    components: ["辶", "甬"],
    equation: "辶 (Sước - bước đi) + 甬 (lối đi có mái che/ống rỗng suốt)",
    mnemonic: "Bước đi trên con đường (辶) thông thoáng rỗng suốt (甬) không vật cản trở, thông suốt mọi nẻo đường.",
    illustration: {
      badge: "🚇",
      concept: "Thông thoáng hanh thông",
      visualDesc: "Tàu điện xuyên qua đường hầm rực sáng tiến về ga trung tâm."
    }
  },
  "週": {
    components: ["辶", "周"],
    equation: "辶 (Sước - dòng bước đi) + 周 (Chu - một vòng khép kín)",
    mnemonic: "Thời gian bước đi (辶) quay đều đúng một vòng tròn giáp hạt (周) bảy ngày, tạo nên một tuần lễ.",
    illustration: {
      badge: "📅",
      concept: "Chu kỳ tuần lễ",
      visualDesc: "Tờ lịch tuần lật mở bảy ô ngày xếp ngay ngắn sắc màu tươi sáng."
    }
  },
  "運": {
    components: ["辶", "軍"],
    equation: "辶 (Sước - chuyển động) + 軍 (Quân - cỗ xe quân lữ uy dũng)",
    mnemonic: "Đoàn xe quân đội (軍) rầm rộ lăn bánh trên đường thiên lý (辶), tạo nên vận mệnh và vận tải chuyển động.",
    illustration: {
      badge: "🚚",
      concept: "Vận chuyển đường dài",
      visualDesc: "Đoàn xe tải hiện đại nối đuôi nhau vận chuyển hàng hóa trên xa lộ."
    }
  },
  "道": {
    components: ["辶", "首"],
    equation: "辶 (Sước - bước chân đi) + 首 (Thủ - chiếc đầu suy nghĩ dẫn lối)",
    mnemonic: "Dùng trí tuệ cái đầu (首) dẫn dắt từng bước chân (辶) đi đúng phương hướng, chính là con đường đạo đức.",
    illustration: {
      badge: "🛣️",
      concept: "Con đường quang đãng",
      visualDesc: "Con đường thênh thang lát đá dẫn tới đỉnh núi quang đãng."
    }
  },
  "重": {
    components: ["千", "里"],
    equation: "Chữ tượng hình bao tải nặng gánh trên lưng người bước đi ngàn dặm (里)",
    mnemonic: "Gánh bao đồ nặng trĩu đi ngàn dặm (千里), sức nặng đè lên vai nhưng ý chí vô cùng quan trọng.",
    illustration: {
      badge: "🏋️",
      concept: "Sức nặng ngàn cân",
      visualDesc: "Quả tạ sắt đúc uy lực biểu thị trọng lượng lớn và sự vững chãi."
    }
  },
  "野": {
    components: ["里", "予"],
    equation: "里 (Lý - xóm thôn) + 予 (Dư - vươn rộng rãi)",
    mnemonic: "Phía ngoài thôn xóm (里) trải rộng ra khoảng đất thênh thang bát ngát (予), chính là đồng nội hoang dã.",
    illustration: {
      badge: "🏞️",
      concept: "Đồng quê bát ngát",
      visualDesc: "Thảo nguyên xanh mướt trải dài tít tắp dưới chân dãy núi xa xa."
    }
  },
  "銀": {
    components: ["金", "艮"],
    equation: "金 (Kim - kim loại quý) + 艮 (Cấn - ánh nhìn cứng cỏi/âm Cấn)",
    mnemonic: "Thứ kim loại quý (金) lấp lánh ánh sáng trắng kiên cố không gỉ sét (艮), chính là bạc trắng tinh khiết.",
    illustration: {
      badge: "🥈",
      concept: "Bạc trắng sáng ngời",
      visualDesc: "Thỏi bạc nguyên chất ánh lên sắc trắng ánh kim lấp lánh sang trọng."
    }
  },
  "開": {
    components: ["門", "开"],
    equation: "門 (Môn - hai cánh cổng thành) + 开 (rút then cài cửa)",
    mnemonic: "Hai tay đẩy then cài giữa hai cánh cổng (門), mở toang lối đi đón ánh sáng ngập tràn.",
    illustration: {
      badge: "🚪",
      concept: "Mở toang cánh cửa",
      visualDesc: "Cánh cửa gỗ mở rộng đón chào làn gió mát rượi và ánh dương."
    }
  },
  "院": {
    components: ["阝", "完"],
    equation: "阝 (Phụ - bờ tường thành) + 完 (Hoàn - ngôi nhà hoàn chỉnh)",
    mnemonic: "Ngôi nhà xây hoàn chỉnh kiên cố (完) có tường thành bao bọc (阝), nơi viện dưỡng đường, bệnh viện uy nghiêm.",
    illustration: {
      badge: "🏥",
      concept: "Khuôn viên bệnh viện",
      visualDesc: "Tòa viện khang trang tĩnh lặng giữa khuôn viên rợp bóng cây xanh."
    }
  },
  "集": {
    components: ["隹", "木"],
    equation: "隹 (Truy - đàn chim nhỏ) + 木 (Mộc - cành cây)",
    mnemonic: "Đàn chim ríu rít (隹) cùng bay về tụ tập sum vầy trên một cành cây râm mát (木).",
    illustration: {
      badge: "🐦",
      concept: "Đàn chim sum họp",
      visualDesc: "Đàn chim ríu rít đậu chen chúc trên cành cây xanh trong ánh bình minh."
    }
  },
  "青": {
    components: ["龶", "月"],
    equation: "Cỏ cây mọc non tơ bên giếng khoáng sản xanh ngắt",
    mnemonic: "Mầm xanh đâm chồi vươn lên tươi tốt, tỏa sắc xanh thanh xuân tràn đầy sức sống của đất trời.",
    illustration: {
      badge: "🌿",
      concept: "Sắc xanh thanh xuân",
      visualDesc: "Chồi non xanh biếc vươn mình tắm nắng sớm mai tươi mát."
    }
  },
  "音": {
    components: ["立", "日"],
    equation: "Chữ tượng hình âm điệu phát ra từ khuôn miệng có tiết tấu",
    mnemonic: "Đứng thẳng (立) cất tiếng hát vang theo từng nhịp ngày tháng (日), tạo nên những âm hưởng tuyệt vời.",
    illustration: {
      badge: "🎶",
      concept: "Giai điệu âm vang",
      visualDesc: "Những nốt nhạc bay bổng uốn lượn mang theo giai điệu du dương êm ái."
    }
  },
  "題": {
    components: ["是", "頁"],
    equation: "是 (Thị - điều đúng đắn căn bản) + 頁 (Hiệt - đầu trang sách)",
    mnemonic: "Điểm cốt lõi chuẩn xác nhất (是) được viết ngay trên đỉnh đầu trang sách (頁), tạo thành tiêu đề chủ đề.",
    illustration: {
      badge: "📑",
      concept: "Tiêu đề đầu trang",
      visualDesc: "Dòng tiêu đề in đậm trang trọng nổi bật ở vị trí cao nhất của trang sách."
    }
  },
  "風": {
    components: ["几", "虫"],
    equation: "Vòm trời giăng gió cuốn theo côn trùng sâu bọ (虫) bay rợp",
    mnemonic: "Làn gió thổi cuốn vòm mây, đàn sâu bọ côn trùng (虫) cảm nhận hơi gió chuyển mình bay khắp không gian.",
    illustration: {
      badge: "🍃",
      concept: "Gió cuốn lá bay",
      visualDesc: "Làn gió mát lành cuốn những chiếc lá xanh xoay tít trên bầu trời."
    }
  },
  "飯": {
    components: ["飠", "反"],
    equation: "飠 (Thực - đồ ăn gạo nếp) + 反 (Phản - lật xới tơi xốp)",
    mnemonic: "Món ăn chính (飠) được người nội trợ xới lật nhẹ tay (反) cho hạt cơm chín đều thơm lừng dẻo ngọt.",
    illustration: {
      badge: "🍚",
      concept: "Bát cơm trắng dẻo",
      visualDesc: "Bát cơm trắng xới đầy bốc khói nghi ngút thơm hương lúa mới."
    }
  },
  "飲": {
    components: ["飠", "欠"],
    equation: "飠 (Thực - đồ uống nước trà) + 欠 (Khiếm - há miệng ngửa cổ)",
    mnemonic: "Há miệng ngửa cổ (欠) nuốt ừng ực ngụm nước trà thanh mát (飠) làm đã cơn khát khô họng.",
    illustration: {
      badge: "🥤",
      concept: "Ngụm nước mát lành",
      visualDesc: "Ly nước hoa quả mát lạnh đọng sương giải tỏa cơn khát mùa hè."
    }
  },
  "館": {
    components: ["飠", "官"],
    equation: "飠 (Thực - phục vụ ăn uống) + 官 (Quan - dinh phủ lớn)",
    mnemonic: "Tòa nhà lớn như dinh quan (官) phục vụ nơi ăn chốn ở (飠) cho tân khách, thành lữ quán, bảo tàng.",
    illustration: {
      badge: "🏛️",
      concept: "Tòa bảo tàng lớn",
      visualDesc: "Tòa bảo tàng uy nghi với hàng cột trắng bề thế tráng lệ."
    }
  },
  "駅": {
    components: ["馬", "尺"],
    equation: "馬 (Mã - ngựa trạm bưu chính) + 尺 (Xích - thước đo chặng đường)",
    mnemonic: "Nơi ngựa trạm (馬) dừng chân sau mỗi chặng dặm đường (尺) đổi ngựa tiếp sức, nay là nhà ga xe lửa.",
    illustration: {
      badge: "🚉",
      concept: "Nhà ga xe lửa",
      visualDesc: "Đoàn tàu Shinkansen sáng bóng dừng đỗ bên sân ga sạch đẹp tấp nập."
    }
  },
  "験": {
    components: ["馬", "僉"],
    equation: "馬 (Mã - giống ngựa chiến) + 僉 (tất cả cùng quan sát kỹ)",
    mnemonic: "Mọi người cùng tập trung xem xét phẩm chất ngựa chiến (馬), từ đó nghiệm chứng và kiểm nghiệm thực tế.",
    illustration: {
      badge: "🧪",
      concept: "Kiểm nghiệm chuẩn xác",
      visualDesc: "Ống nghiệm thủy tinh phản chiếu ánh sáng trong phòng thí nghiệm khoa học."
    }
  },
  "魚": {
    components: ["魚"],
    equation: "Chữ tượng hình đầu cá, thân vảy (田) và bốn giọt nước/đuôi cá (灬)",
    mnemonic: "Đầu nhọn bơi rẽ sóng, thân phủ vảy bạc lấp lánh (田) cùng chiếc đuôi (灬) quẫy nhịp nhàng bơi lội dưới nước.",
    illustration: {
      badge: "🐟",
      concept: "Chú cá bơi lội",
      visualDesc: "Đàn cá chép Koi sặc sỡ tung tăng bơi lội trong làn nước suối trong vắt."
    }
  },
  "鳥": {
    components: ["鳥"],
    equation: "Chữ tượng hình đầu mỏ, mắt, cánh lông và bàn chân chim",
    mnemonic: "Đầu nhỏ có mắt tinh anh, đôi cánh xếp gọn gàng và đôi chân (灬) bám chắc vào cành cây hót véo von.",
    illustration: {
      badge: "🐦",
      concept: "Cánh chim chao lượn",
      visualDesc: "Chú chim nhỏ hót véo von trên cành cây rực rỡ nắng ban mai."
    }
  },
  "黒": {
    components: ["里", "灬"],
    equation: "Lò đốt khói bốc (里) + Lửa than đỏ rực (灬)",
    mnemonic: "Ngọn lửa than (灬) đốt trong lò kín hun bồ hóng bám đen kịt quanh vách tường (里), tạo thành sắc đen tuyền.",
    illustration: {
      badge: "⬛",
      concept: "Màn đêm huyền bí",
      visualDesc: "Màn đêm huyền bí sâu thẫm lấp lánh một vài vì sao bạc tinh tú."
    }
  }
};

const rootJsonPath = path.join(__dirname, '../kanji_full_database.json');
const publicJsonPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootJsPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicJsonPath, 'utf8'));

let count = 0;
for (const [char, patch] of Object.entries(n4bData)) {
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

console.log(`[Batch 2B - N4 Part 2] Đã cập nhật thành công ${count} / ${Object.keys(n4bData).length} chữ Kanji N4.`);

fs.writeFileSync(publicJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsPath, 'window.KANJI_FULL_DATABASE = ' + JSON.stringify(db, null, 2) + ';\n', 'utf8');
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
