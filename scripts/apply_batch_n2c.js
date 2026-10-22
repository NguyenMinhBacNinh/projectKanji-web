const fs = require('fs');
const path = require('path');

const n2cData = {
  "液": {
    components: ["氵", "夜"],
    equation: "氵 (Thủy - nước) + 夜 (Dạ - đêm khuya ngưng tụ giọt sương)",
    mnemonic: "Màn đêm buông xuống (夜) hơi ẩm ngưng tụ thành từng giọt sương lỏng sóng sánh (氵), chất lỏng, dung dịch.",
    illustration: {
      badge: "🧪",
      concept: "Dung dịch trong suốt",
      visualDesc: "Ống nghiệm thủy tinh chứa dung dịch màu xanh ngọc bích phát sáng nhẹ nhàng."
    }
  },
  "涼": {
    components: ["氵", "京"],
    equation: "氵 (nước mát) + 京 (lầu cao kinh thành đón gió thoáng)",
    mnemonic: "Đứng trên lầu cao kinh thành (京) đón làn gió mát rượi mang hơi nước trong lành (氵), cảm giác mát mẻ sảng khoái.",
    illustration: {
      badge: "🎐",
      concept: "Chuông gió mùa hè Furin",
      visualDesc: "Chiếc chuông gió thủy tinh đung đưa dưới hiên nhà tạo tiếng kêu thanh mát."
    }
  },
  "混": {
    components: ["氵", "日", "比"],
    equation: "氵 (Thủy - nước) + 昆 (đông đúc chen chúc dưới nắng trời)",
    mnemonic: "Đổ nhiều thứ chất lỏng hòa chung vào một dòng nước (氵 昆) khuấy đều lên, pha trộn, hỗn hợp, chen chúc.",
    illustration: {
      badge: "🥣",
      concept: "Khuấy trộn hỗn hợp",
      visualDesc: "Chiếc phới lồng đánh tan bột và sữa hòa quyện mịn màng trong âu trộn."
    }
  },
  "清": {
    components: ["氵", "青"],
    equation: "氵 (Thủy - nước suối nguồn) + 青 (Thanh - trong suốt xanh biếc)",
    mnemonic: "Dòng nước suối đầu nguồn (氵) trong veo xanh biếc nhìn thấu tận đáy sỏi (青), thanh khiết tinh tươm.",
    illustration: {
      badge: "💎",
      concept: "Dòng suối trong vắt",
      visualDesc: "Dòng suối trong veo như pha lê lượn qua những viên đá phủ rêu xanh."
    }
  },
  "減": {
    components: ["氵", "咸"],
    equation: "氵 (Thủy - dòng nước) + 咸 (ngăn bớt đắp đê san sẻ)",
    mnemonic: "Khơi bớt dòng nước lũ (氵) xả qua các kênh mương để giảm bớt áp lực nguy hiểm, giảm bớt, thuyên giảm.",
    illustration: {
      badge: "📉",
      concept: "Mức nước hạ giảm",
      visualDesc: "Vạch đo mực nước báo hiệu con số đang hạ dần về mức an toàn."
    }
  },
  "温": {
    components: ["氵", "日", "皿"],
    equation: "氵 (nước ấm) + 日 (mặt trời tỏa nhiệt) vào chiếc đĩa đựng (皿)",
    mnemonic: "Ánh nắng mặt trời (日) sưởi ấm chén nước trà (皿 氵) tạo nên hơi ấm dịu dàng lan tỏa, ấm áp, ôn hòa.",
    illustration: {
      badge: "☕",
      concept: "Tách trà ấm áp",
      visualDesc: "Tách trà gốm bốc làn hơi ấm áp mang lại sự dễ chịu trong ngày đông."
    }
  },
  "測": {
    components: ["氵", "貝", "刂"],
    equation: "氵 (Thủy - độ sâu của nước) + 則 (thước đo chuẩn mực chia vạch)",
    mnemonic: "Cắm cây thước đo tiêu chuẩn (則) xuống dòng nước (氵) để đo đạc độ sâu và lưu lượng, trắc nghiệm, đo lường.",
    illustration: {
      badge: "📏",
      concept: "Đo đạc chuẩn xác",
      visualDesc: "Thước đo độ sâu cắm xuống dòng nước ghi nhận thông số chính xác."
    }
  },
  "湖": {
    components: ["氵", "古", "月"],
    equation: "氵 (Thủy - làn nước phẳng lặng) + 古 (ngàn năm) + 月 (vầng trăng soi bóng)",
    mnemonic: "Mặt nước phẳng lặng (氵) ngàn năm soi bóng vầng trăng rằm cổ kính (古 月), cảnh hồ nước thanh bình.",
    illustration: {
      badge: "🏞️",
      concept: "Mặt hồ soi trăng",
      visualDesc: "Mặt hồ phẳng lặng như gương phản chiếu bóng núi Phú Sĩ và vầng trăng rằm."
    }
  },
  "湾": {
    components: ["氵", "弯"],
    equation: "氵 (Thủy - nước biển) + 弯 (bờ đất uốn cong hình cánh cung 弓)",
    mnemonic: "Bờ biển uốn cong cong như cánh cung (弯) ôm trọn vùng nước êm đềm chắn sóng gió, vịnh biển cảng biển.",
    illustration: {
      badge: "🏖️",
      concept: "Vịnh biển cánh cung",
      visualDesc: "Bờ vịnh biển xanh ngọc bích uốn cong hình bán nguyệt thanh bình tuyệt đẹp."
    }
  },
  "湿": {
    components: ["氵", "日", "业"],
    equation: "氵 (Thủy - hơi nước) + đọng lại dưới nắng ấm ẩm thấp",
    mnemonic: "Hơi nước ẩm ướt (氵) bám đọng quanh mặt đất và đồ vật tạo nên không khí ẩm thấp, độ ẩm ướt át.",
    illustration: {
      badge: "💧",
      concept: "Hơi sương ẩm ướt",
      visualDesc: "Những giọt sương mai đọng trĩu hạt trên phiến lá xanh mướt mát lành."
    }
  },
  "準": {
    components: ["氵", "隹", "十"],
    equation: "Mặt nước phẳng lặng (氵) làm mốc cân bằng chuẩn xác không lệch",
    mnemonic: "Lấy mực nước phẳng lặng (氵) làm thước đo thăng bằng chuẩn mực cho xây dựng, tiêu chuẩn, chuẩn bị chu đáo.",
    illustration: {
      badge: "🎯",
      concept: "Tiêu chuẩn hoàn hảo",
      visualDesc: "Chiếc thước thủy đo thăng bằng giọt bọt khí nằm ngay tâm điểm chuẩn xác."
    }
  },
  "溶": {
    components: ["氵", "容"],
    equation: "氵 (Thủy - dòng nước ấm) + 容 (dung nạp hòa tan chất tan vào mình)",
    mnemonic: "Thả đường vào nước (氵) chất rắn hòa tan dung nạp hoàn toàn vào làn nước ngọt ngào (容), hòa tan, tan chảy.",
    illustration: {
      badge: "🧊",
      concept: "Khối đá tan chảy",
      visualDesc: "Viên đường ngọt tan dần tạo nên những gợn sóng lăn tăn trong ly trà."
    }
  },
  "滴": {
    components: ["氵", "啇"],
    equation: "氵 (Thủy - nước) + 啇 (từng giọt nước nhỏ từ đầu cành lá)",
    mnemonic: "Từng giọt sương mai tí tách rơi từ kẽ lá xuống mặt hồ (氵 啇), nhỏ giọt, giọt nước tinh khôi.",
    illustration: {
      badge: "💧",
      concept: "Giọt nước rơi tí tách",
      visualDesc: "Giọt nước tròn xoe rơi xuống mặt nước phẳng tạo nên những vòng sóng đồng tâm."
    }
  },
  "漁": {
    components: ["氵", "魚"],
    equation: "氵 (Thủy - sóng nước biển khơi) + 魚 (đàn cá bơi lội)",
    mnemonic: "Thả lưới trên muôn trùng sóng nước (氵) đánh bắt những mẻ cá tươi ngon (魚), nghề chài lưới ngư nghiệp.",
    illustration: {
      badge: "🎣",
      concept: "Lưới đánh cá ra khơi",
      visualDesc: "Đoàn thuyền đánh cá giăng lưới rực rỡ đón bình minh trên biển khơi."
    }
  },
  "濃": {
    components: ["氵", "農"],
    equation: "氵 (Thủy - dòng nước) + 農 (tích tụ tinh hoa đất trời như mùa vụ)",
    mnemonic: "Nước dùng được ninh hầm kỹ lưỡng tích tụ bao tinh hoa ngọt ngào (氵 農), đậm đà thơm nồng, nồng độ đậm đặc.",
    illustration: {
      badge: "☕",
      concept: "Cà phê đậm đà",
      visualDesc: "Tách cà phê espresso đen sánh đậm đà tỏa hương thơm nồng nàn quyến rũ."
    }
  },
  "濯": {
    components: ["氵", "羽", "隹"],
    equation: "氵 (Thủy - dòng nước trong) + chim trĩ vỗ cánh tắm rửa sạch bộ lông sặc sỡ",
    mnemonic: "Đưa quần áo xuống dòng nước chảy (氵) giũ sạch bụi bẩn như cánh chim đập nước làm sạch lông, giặt giũ tinh tươm.",
    illustration: {
      badge: "🧺",
      concept: "Giỏ đồ giặt phơi nắng",
      visualDesc: "Quần áo trắng tinh khôi phơi bay nhẹ nhàng trong gió sau khi giặt sạch."
    }
  },
  "灯": {
    components: ["火", "丁"],
    equation: "火 (Hỏa - ngọn lửa sáng rực) + 丁 (chân cột đèn đóng đứng)",
    mnemonic: "Ngọn lửa ấm áp (火) thắp sáng trên chiếc cột đèn đầu ngõ (丁), ngọn đèn hải đăng soi đường đêm tối.",
    illustration: {
      badge: "🏮",
      concept: "Đèn lồng đỏ ấm áp",
      visualDesc: "Chiếc đèn lồng đỏ truyền thống tỏa ánh sáng vàng ấm áp trước hiên nhà."
    }
  },
  "灰": {
    components: ["𠂇", "火"],
    equation: "Bàn tay (𠂇) bới trong đống than củi tàn (火)",
    mnemonic: "Đống lửa than (火) cháy hết chỉ còn lại lớp bột màu xám nguội lạnh dưới tay bới, biểu thị tro tàn, màu xám tro.",
    illustration: {
      badge: "🌫️",
      concept: "Lớp tro tàn nguội",
      visualDesc: "Làn khói mỏng bốc lên từ lớp tro tàn màu xám sau đêm lửa trại ấm áp."
    }
  },
  "炭": {
    components: ["山", "厂", "火"],
    equation: "Khai thác từ lòng vách núi sâu (山 厂) chất đốt bốc lửa hồng (火)",
    mnemonic: "Khúc gỗ chôn vùi trong lòng núi sâu (山 厂) cháy yếm khí tạo thành thỏi than đen rực lửa hồng, than củi than đá.",
    illustration: {
      badge: "⬛",
      concept: "Thỏi than đen óng",
      visualDesc: "Thỏi than củi Binchotan cao cấp nứt vân ánh hồng tỏa nhiệt lượng tinh khiết."
    }
  },
  "無": {
    components: ["一", "𠂉", "灬"],
    equation: "Ngọn lửa thiêu rụi đốt sạch tan biến thành hư không (灬)",
    mnemonic: "Ngọn lửa bốc cháy thiêu rụi mọi vật tan biến thành mây khói hư vô, biểu thị sự không có, trống rỗng, vô hạn.",
    illustration: {
      badge: "⚪",
      concept: "Vòng tròn vô cực Zen",
      visualDesc: "Vòng tròn Enso mực tàu vẽ một nét khoáng đạt biểu trưng cho tính Không."
    }
  },
  "焼": {
    components: ["火", "土", "兀"],
    equation: "火 (Hỏa - ngọn lửa than đỏ) + nướng thực phẩm trên gò bếp cao",
    mnemonic: "Đặt xiên thịt nướng trên ngọn lửa than hồng rực rỡ (火), nướng chín thơm phức vàng ươm, thiêu đốt nướng bánh.",
    illustration: {
      badge: "🍢",
      concept: "Xiên gà nướng Yakitori",
      visualDesc: "Những xiên thịt gà nướng Yakitori xèo xèo thơm nức trên bếp than hồng."
    }
  },
  "照": {
    components: ["日", "刀", "口", "灬"],
    equation: "Ánh mặt trời tỏ tường (昭) + bốn đốm lửa bừng sáng soi rọi (灬)",
    mnemonic: "Ngọn lửa sáng rực soi rọi tỏ tường từng ngóc ngách như ánh thái dương, chiếu sáng, soi gương, đối chiếu.",
    illustration: {
      badge: "🔦",
      concept: "Luồng sáng soi rọi",
      visualDesc: "Ngọn đèn pha chiếu luồng ánh sáng rực rỡ xua tan bóng đêm u tối."
    }
  },
  "燃": {
    components: ["火", "月", "犬", "灬"],
    equation: "火 (Hỏa - mồi lửa) + 然 (bắt lửa bùng cháy tự nhiên)",
    mnemonic: "Châm ngọn lửa đỏ (火) vào bó củi khô khiến lửa bùng cháy ngùn ngụt tỏa nhiệt, bốc cháy, nhiên liệu chất đốt.",
    illustration: {
      badge: "🔥",
      concept: "Ngọn lửa bùng cháy",
      visualDesc: "Ngọn lửa đỏ vàng rực rỡ bùng lên từ thanh củi khô sưởi ấm đêm đông."
    }
  },
  "燥": {
    components: ["火", "口", "口", "口", "木"],
    equation: "火 (Hỏa - sức nóng lò than) + ba miệng chim kêu khát trên cây gỗ (木)",
    mnemonic: "Lửa hun nóng rát (火) làm cây cối khô kiệt cạn kiệt từng giọt nước, thời tiết khô hanh, sấy khô ráo.",
    illustration: {
      badge: "🏜️",
      concept: "Mảnh đất khô nứt nẻ",
      visualDesc: "Vùng đất khô cằn nứt nẻ dưới ánh nắng gay gắt thiếu vắng giọt mưa."
    }
  },
  "爆": {
    components: ["火", "日", "共", "氺"],
    equation: "火 (ngòi nổ bốc lửa) + 暴 (sức mạnh bạo liệt tung tóe)",
    mnemonic: "Mồi lửa bén vào thuốc pháo giải phóng sức ép khủng khiếp bùng phát dữ dội (火 暴), phát nổ, bùng nổ dân số.",
    illustration: {
      badge: "💥",
      concept: "Phát nổ bùng cháy",
      visualDesc: "Chùm pháo hoa bung tỏa rực rỡ muôn màu ánh sáng trên bầu trời đêm hội."
    }
  },
  "片": {
    components: ["片"],
    equation: "Một nửa tấm ván gỗ chẻ dọc làm đôi",
    mnemonic: "Thanh gỗ xẻ đôi thành một mảnh duy nhất, dùng làm đơn vị đếm mảnh giấy, một phía, phiến diện.",
    illustration: {
      badge: "🧩",
      concept: "Một mảnh ghép rời",
      visualDesc: "Một mảnh ghép bằng gỗ xinh xắn nằm riêng lẻ chờ tìm mảnh khớp."
    }
  },
  "版": {
    components: ["片", "反"],
    equation: "片 (phiến ván gỗ mỏng) + 反 (lật mặt quét mực in ép giấy)",
    mnemonic: "Tấm ván gỗ mỏng (片) khắc chữ lật úp mặt lăn mực in ra trang sách (反), bản khắc in, xuất bản ấn bản.",
    illustration: {
      badge: "📰",
      concept: "Bản khắc in gỗ Ukiyo-e",
      visualDesc: "Bản khắc gỗ in tranh sóng lừng Kanagawa với từng đường nét tinh xảo."
    }
  },
  "玉": {
    components: ["王", "丶"],
    equation: "Vương (chữ 王 vương giả) + dấu chấm (丶 giọt ngọc phát sáng)",
    mnemonic: "Thỏi đá quý của bậc đế vương phát ra ánh sáng lung linh thuần khiết (丶), viên ngọc bích quý giá trân bảo.",
    illustration: {
      badge: "💎",
      concept: "Viên ngọc bích xanh",
      visualDesc: "Viên ngọc bích tròn nhẵn bóng mượt tỏa ánh hào quang xanh dịu dàng."
    }
  },
  "珍": {
    components: ["王", "㐱"],
    equation: "王 (viên ngọc bích) + 㐱 (những đường vân thớ tơ óng ả tuyệt đẹp)",
    mnemonic: "Viên ngọc bích (王) có những đường vân hoa văn óng ả tinh tế hiếm có khó tìm, trân trọng, trân quý kỳ trân.",
    illustration: {
      badge: "🦪",
      concept: "Viên ngọc trai trân quý",
      visualDesc: "Vỏ trai hé mở để lộ viên ngọc trai ánh xà cừ tuyệt đẹp quý hiếm."
    }
  },
  "瓶": {
    components: ["并", "瓦"],
    equation: "并 (hai quai bình cân xứng) + 瓦 (chất liệu đất nung gốm sứ)",
    mnemonic: "Chiếc bình đun bằng gốm nung (瓦) có hai quai đối xứng (并) dùng đựng nước và cắm hoa, cái chai, bình gốm.",
    illustration: {
      badge: "🏺",
      concept: "Bình hoa gốm sứ",
      visualDesc: "Chiếc bình gốm men lam thanh nhã cắm cành hoa mận trắng hé nở."
    }
  },
  "甘": {
    components: ["甘"],
    equation: "Chiếc miệng ngậm giữ trọn vẹn miếng kẹo mật ngọt lịm",
    mnemonic: "Miếng mật ngọt ngào tan dần đọng lại nơi đầu lưỡi mang lại dư vị dịu êm, ngọt ngào, cam chịu nuốt đắng.",
    illustration: {
      badge: "🍯",
      concept: "Hũ mật ong ngọt lịm",
      visualDesc: "Muỗng gỗ múc dòng mật ong vàng óng sánh mịn ngọt ngào thơm lừng."
    }
  },
  "畜": {
    components: ["亠", "丷", "田"],
    equation: "Đồng cỏ chia ô (田) quây rào chăn nuôi đàn gia súc",
    mnemonic: "Đàn gia súc trâu bò được quây nuôi dưỡng trên những bãi cỏ đồng quê phì nhiêu (田), súc vật, gia súc.",
    illustration: {
      badge: "🐄",
      concept: "Đàn gia súc gặm cỏ",
      visualDesc: "Đàn bò sữa nhởn nhơ gặm cỏ trên đồng cỏ xanh mướt dưới chân dãy Alps."
    }
  },
  "略": {
    components: ["田", "各"],
    equation: "田 (ranh giới ruộng đất) + 各 (vạch kế hoạch phân định các ô)",
    mnemonic: "Vạch kế hoạch phân chia từng vùng đất quy hoạch rõ ràng, tóm tắt điều cốt lõi, chiến lược giản lược.",
    illustration: {
      badge: "🗺️",
      concept: "Bản đồ chiến lược",
      visualDesc: "Bản đồ sa bàn vạch rõ các mũi tên chiến lược hành động hiệu quả."
    }
  },
  "畳": {
    components: ["田", "冖", "且"],
    equation: "Những ô cói vuông vức (田) đan cài xếp khít lên khung sàn nhà",
    mnemonic: "Tấm chiếu đan bằng sợi cói xanh thơm mùi đồng nội xếp vuông vức trên sàn nhà, chiếu Tatami truyền thống.",
    illustration: {
      badge: "🟩",
      concept: "Chiếu Tatami thơm cỏ",
      visualDesc: "Căn phòng trải những tấm chiếu tatami viền vải đen tinh tươm thơm mùi cói."
    }
  },
  "療": {
    components: ["疒", "尞"],
    equation: "疒 (bệnh nhân ốm yếu) + 尞 (hơ đuốc sưởi ấm cứu chữa)",
    mnemonic: "Chăm sóc sưởi ấm cho người bệnh trên giường bệnh xua tan đau đớn (疒), chữa trị, trị liệu y liệu.",
    illustration: {
      badge: "🏥",
      concept: "Điều trị bình phục",
      visualDesc: "Bác sĩ ân cần kiểm tra sức khỏe giúp bệnh nhân nhanh chóng bình phục."
    }
  },
  "皮": {
    components: ["皮"],
    equation: "Bàn tay cầm dao bóc tách lớp da thú dẻo dai",
    mnemonic: "Bàn tay khéo léo lột tách lớp da bao bọc bên ngoài cơ thể, biểu thị lớp da, vỏ hoa quả, bì phu.",
    illustration: {
      badge: "🍊",
      concept: "Bóc vỏ quả cam",
      visualDesc: "Bàn tay bóc tách lớp vỏ cam mọng nước thơm nồng hương tinh dầu."
    }
  },
  "皿": {
    components: ["皿"],
    equation: "Chữ tượng hình chiếc đĩa sứ có lòng nông và chân đế phẳng",
    mnemonic: "Chiếc đĩa gốm sứ trắng tinh đựng đồ ăn ngon bày biện trên bàn tiệc, khay đĩa, đồ đựng thức ăn.",
    illustration: {
      badge: "🍽️",
      concept: "Chiếc đĩa sứ trắng",
      visualDesc: "Chiếc đĩa sứ tròn tinh khôi bày biện món ăn sushi tươi ngon đẹp mắt."
    }
  },
  "省": {
    components: ["少", "目"],
    equation: "Thiểu (少 nheo nhỏ) + Mục (目 đôi mắt soi xét nội tâm)",
    mnemonic: "Nheo mắt xem xét lại từng việc nhỏ nhặt của bản thân (少 目), tự kiểm điểm nhìn nhận và tiết kiệm chi tiêu.",
    illustration: {
      badge: "🧘",
      concept: "Tĩnh tâm phản tỉnh",
      visualDesc: "Người ngồi thiền nhắm nghiền mắt suy ngẫm soi chiếu lại tâm hồn mình."
    }
  },
  "県": {
    components: ["目", "木"],
    equation: "Quan sát trông nom (目) địa hạt được nối kết với triều đình",
    mnemonic: "Mắt quan sát cai quản từng vùng địa hạt gắn kết với trung ương, cấp tỉnh của Nhật Bản, huyện hạt.",
    illustration: {
      badge: "🗾",
      concept: "Bản đồ các tỉnh hạt",
      visualDesc: "Bản đồ đất nước Nhật Bản phân chia ranh giới 47 tỉnh hạt rực rỡ sắc màu."
    }
  },
  "短": {
    components: ["矢", "豆"],
    equation: "矢 (mũi tên đo kích thước) + 豆 (chiếc bát đậu thấp nhỏ)",
    mnemonic: "Mũi tên ngắn đặt cạnh chiếc bát đậu nhỏ bé (矢 豆), so đo thấy chiều dài khiêm tốn, ngắn ngủi đoản hạn.",
    illustration: {
      badge: "📏",
      concept: "Đoạn thước ngắn",
      visualDesc: "Cây bút chì gọt ngắn cũn đáng yêu nằm cạnh cuốn sổ tay nhỏ."
    }
  },
  "砂": {
    components: ["石", "少"],
    equation: "石 (Thạch - tảng đá lớn) + 少 (vỡ vụn thành muôn hạt nhỏ xíu)",
    mnemonic: "Tảng đá lớn (石) bị sóng gió bào mòn vỡ vụn thành hàng triệu hạt li ti (少), những hạt cát vàng trên bãi biển.",
    illustration: {
      badge: "⏳",
      concept: "Hạt cát đồng hồ",
      visualDesc: "Dòng cát vàng mịn màng chảy đều đặn trong chiếc đồng hồ cát thủy tinh."
    }
  },
  "硬": {
    components: ["石", "更"],
    equation: "石 (tảng đá) + 更 (được tôi luyện dãi dầu nắng mưa càng thêm rắn chắc)",
    mnemonic: "Khối đá hoa cương (石) qua bao phong ba bão táp ngày đêm tôi luyện càng thêm rắn chắc, cứng rắn ngạnh cỏi.",
    illustration: {
      badge: "💎",
      concept: "Khối đá cứng rắn",
      visualDesc: "Viên kim cương sắc bén cắt ngọt qua phiến kính thể hiện độ cứng tuyệt đối."
    }
  },
  "磨": {
    components: ["广", "林", "石"],
    equation: "Dưới mái hiên dùng sợi gai cọ xát vào tảng đá mài (石)",
    mnemonic: "Dùng tảng đá mài (石) chà xát gọt giũa khối ngọc cho sáng bóng lộng lẫy, mài dũa rèn luyện tài năng.",
    illustration: {
      badge: "🪞",
      concept: "Mài gương sáng bóng",
      visualDesc: "Mặt gương đồng cổ được mài giũa sáng bóng phản chiếu ánh mặt trời rực rỡ."
    }
  },
  "祈": {
    components: ["礻", "斤"],
    equation: "礻 (Thị - bàn thờ thần) + 斤 (vật phẩm dâng lên lòng thành)",
    mnemonic: "Đứng trước đền thờ thần linh (礻) dâng lễ vật chắp tay cúi đầu tha thiết ước nguyện, cầu nguyện cầu chúc.",
    illustration: {
      badge: "🙏",
      concept: "Thành tâm cầu nguyện",
      visualDesc: "Đôi bàn tay chắp thành kính trước cổng đền Thần đạo gửi gắm ước nguyện bình an."
    }
  },
  "祝": {
    components: ["礻", "兄"],
    equation: "礻 (bàn thờ linh thiêng) + 兄 (người chủ lễ quỳ cất lời khấn điềm lành)",
    mnemonic: "Người đại diện quỳ trước bàn thờ thần linh cất lời cầu chúc phúc lành cho muôn dân, chúc mừng chúc thọ.",
    illustration: {
      badge: "🎉",
      concept: "Chúc mừng tin vui",
      visualDesc: "Pháo hoa giấy rực rỡ tung bay chúc mừng ngày vui đại hỷ thành công."
    }
  },
  "祭": {
    components: ["月", "又", "示"],
    equation: "Bàn tay (又) dâng miếng thịt tươi (月) lên bàn thờ thần (示)",
    mnemonic: "Hai tay thành kính dâng lễ vật lên bàn thờ tế lễ trời đất (示), mở hội tưng bừng cầu mùa màng bội thu, lễ tế lễ hội.",
    illustration: {
      badge: "🏮",
      concept: "Lễ hội mùa hè Matsuri",
      visualDesc: "Đoàn rước kiệu lễ hội Matsuri rực rỡ lồng đèn truyền thống tưng bừng phố xóm."
    }
  },
  "禁": {
    components: ["木", "木", "示"],
    equation: "Lâm (khu rừng thiêng) + Thị (bàn thờ thần linh cấm xâm phạm)",
    mnemonic: "Dựng biển cúng thần linh trước cửa khu rừng thiêng cấm không ai được chặt phá bừa bãi, nghiêm cấm cấm đoán.",
    illustration: {
      badge: "🚫",
      concept: "Biển cấm xâm phạm",
      visualDesc: "Biển tròn viền đỏ gạch chéo cấm đỗ xe bảo đảm trật tự an toàn."
    }
  },
  "秒": {
    components: ["禾", "少"],
    equation: "禾 (sợi râu nhọn đầu bông lúa) + 少 (khoảng khắc cực kỳ ngắn ngủi)",
    mnemonic: "Sợi râu li ti trên đầu bông lúa lay động trong tích tắc ngắn ngủi, đơn vị đo thời gian một giây đồng hồ.",
    illustration: {
      badge: "⏱️",
      concept: "Tích tắc từng giây",
      visualDesc: "Kim giây mỏng manh của đồng hồ bấm giờ nhảy từng tích tắc chuẩn xác."
    }
  },
  "移": {
    components: ["禾", "夕", "夕"],
    equation: "禾 (mạ non cây lúa) + 多 (chuyển nhiều đợt sang thửa ruộng mới)",
    mnemonic: "Nhổ từng bó mạ non (禾) di dời sang cấy trên mảnh ruộng mới rộng rãi hơn, di chuyển dời chỗ.",
    illustration: {
      badge: "📦",
      concept: "Chuyển dọn nhà cửa",
      visualDesc: "Xe tải chở đồ chuyển dọn nhà cửa bon bon trên đường đến tổ ấm mới."
    }
  },
  "税": {
    components: ["禾", "兌"],
    equation: "禾 (thóc lúa mùa màng) + 兌 (đem nộp vào kho lương nhà nước)",
    mnemonic: "Trích một phần thóc lúa thu hoạch được (禾) nộp vào kho lương quốc gia theo quy định, tiền thuế thuế khóa.",
    illustration: {
      badge: "🧾",
      concept: "Tờ khai nộp thuế",
      visualDesc: "Biên lai nộp thuế hoàn tất đóng dấu đỏ hoàn thành nghĩa vụ công dân."
    }
  },
  "章": {
    components: ["立", "日", "十"],
    equation: "Âm thanh giai điệu (音) tấu trọn vẹn mười nhịp khép lại một đoạn",
    mnemonic: "Giai điệu tấu trọn vẹn mười nhịp tạo thành một chương nhạc, bài văn chia từng chương, huy chương danh dự.",
    illustration: {
      badge: "🎖️",
      concept: "Huy chương danh dự",
      visualDesc: "Chiếc huy chương vàng khắc hoa văn hoa cúc sáng chói lọi đeo trên ngực áo."
    }
  },
  "童": {
    components: ["立", "里"],
    equation: "Đứa trẻ đứng ngây thơ nô đùa trên bờ ruộng thôn làng (里)",
    mnemonic: "Đứa trẻ hồn nhiên tung tăng chân sáo đứng hát ca giữa đường làng thôn xóm, nhi đồng đồng dao trẻ thơ.",
    illustration: {
      badge: "🧒",
      concept: "Em bé ngây thơ",
      visualDesc: "Cậu bé mỉm cười rạng rỡ thả cánh diều no gió bay cao trên triền đê."
    }
  },
  "競": {
    components: ["立", "兄", "立", "兄"],
    equation: "Hai người anh hào (兄 兄) cùng đứng hiên ngang (立 立) tranh tài cao thấp",
    mnemonic: "Hai người dốc hết tài năng và sức lực đọ sức công bằng trên đấu trường, cạnh tranh thi đua tài ba.",
    illustration: {
      badge: "🏁",
      concept: "Cuộc đua nước rút",
      visualDesc: "Hai vận động viên điền kinh sải bước nước rút tranh nhau cán đích đầu tiên."
    }
  },
  "竹": {
    components: ["竹"],
    equation: "Chữ tượng hình hai nhánh tre xanh với những chiếc lá nhọn thon dài",
    mnemonic: "Những đốt tre thẳng tắp vươn cao với lá xanh nhọn rủ bóng mát rượi, cây tre cây trúc dẻo dai.",
    illustration: {
      badge: "🎋",
      concept: "Rừng trúc xanh mát",
      visualDesc: "Con đường rừng trúc xanh ngắt rì rào tiếng gió vi vu ở Arashiyama Kyoto."
    }
  },
  "符": {
    components: ["竹", "付"],
    equation: "竹 (thẻ tre gọt phẳng) + 付 (khắc dấu trao tay làm mật hiệu)",
    mnemonic: "Mảnh thẻ tre khắc mật mã chia đôi giao cho người thi hành (竹 付), dấu hiệu, ký hiệu, lá bùa hộ thân.",
    illustration: {
      badge: "🔖",
      concept: "Tấm bùa hộ mệnh Omamori",
      visualDesc: "Túi gấm bùa hộ mệnh Omamori thêu chỉ vàng mang lại may mắn bình an."
    }
  },
  "筆": {
    components: ["竹", "聿"],
    equation: "竹 (cán bút bằng đốt tre thanh nhã) + 聿 (ngòi lông cọ mềm mại)",
    mnemonic: "Cán bút bằng cành trúc nhỏ gắn chùm lông tơ chấm mực tàu viết chữ Hán, cây bút lông thư pháp.",
    illustration: {
      badge: "🖌️",
      concept: "Cây bút lông thư pháp",
      visualDesc: "Cây bút lông tre thanh nhã chấm mực tàu đen lánh mài thơm sẵn sàng phóng bút."
    }
  },
  "筒": {
    components: ["竹", "同"],
    equation: "竹 (đốt tre) + 同 (thông suốt tròn đều rỗng lòng)",
    mnemonic: "Đốt tre nứa cưa hai đầu rỗng lòng tròn đều tăm tắp (竹 同), tạo thành chiếc ống nước, ống tròn hình trụ.",
    illustration: {
      badge: "🎋",
      concept: "Ống tre đựng bút",
      visualDesc: "Chiếc ống cắm bút bằng đốt tre tự nhiên khắc hoa văn phong cảnh thanh nhã."
    }
  },
  "算": {
    components: ["竹", "目", "廾"],
    equation: "Hai tay (廾) thoăn thoắt gẩy que tính tre (竹) dưới sự quan sát của mắt (目)",
    mnemonic: "Đôi mắt chăm chú nhìn đôi tay thoăn thoắt gẩy các thanh thẻ tre đếm số lượng, tính toán số học, toán học.",
    illustration: {
      badge: "🧮",
      concept: "Bàn tính Soroban",
      visualDesc: "Bàn tính gẩy Soroban gỗ với những hàng hạt chuyển động tính toán chuẩn xác."
    }
  },
  "管": {
    components: ["竹", "官"],
    equation: "竹 (ống trúc đục lỗ) + 官 (quan coi việc dùng để thổi hiệu lệnh điều hành)",
    mnemonic: "Ống trúc khoét lỗ thổi ra âm thanh điều phối mọi việc, tạo thành ống sáo dẫn khí và việc quản lý.",
    illustration: {
      badge: "🎶",
      concept: "Cây sáo trúc du dương",
      visualDesc: "Cây sáo trúc thắt dây đỏ phát ra âm thanh du dương trong trẻo giữa núi rừng."
    }
  },
  "築": {
    components: ["竹", "工", "凡", "木"],
    equation: "Giàn giáo tre (竹) kết hợp gỗ cột (木) bàn tay thợ dựng nên lâu đài",
    mnemonic: "Dựng giàn tre đắp đất dựng cột gỗ tạo nên công trình đồ sộ kiên cố, xây dựng công trình, kiến trúc.",
    illustration: {
      badge: "🏗️",
      concept: "Công trình xây dựng",
      visualDesc: "Cần cẩu vươn cao xây dựng tòa nhà kiến trúc hiện đại vươn lên bầu trời."
    }
  },
  "簡": {
    components: ["竹", "間"],
    equation: "竹 (thẻ tre viết sách) + 間 (khoảng cách thông thoáng không rườm rà)",
    mnemonic: "Viết vài dòng cốt lõi ngắn gọn lên chiếc thẻ tre (竹 間) không rườm rà dài dòng, đơn giản giản dị.",
    illustration: {
      badge: "📄",
      concept: "Bản tóm tắt ngắn gọn",
      visualDesc: "Tờ giấy ghi chú những gạch đầu dòng súc tích ngắn gọn dễ hiểu."
    }
  },
  "籍": {
    components: ["竹", "耒", "昔"],
    equation: "竹 (thẻ tre đóng thành tập) + ghi danh dân cày ruộng đất qua bao đời (昔)",
    mnemonic: "Tập thẻ tre ghi rõ tên tuổi gốc tích từng gia đình cày bừa đất đai, tạo nên sổ hộ tịch, quốc tịch danh bạ.",
    illustration: {
      badge: "🛂",
      concept: "Cuốn hộ chiếu quốc tịch",
      visualDesc: "Cuốn hộ chiếu bìa đỏ in hoa cúc vàng khẳng định quốc tịch công dân."
    }
  },
  "粉": {
    components: ["米", "分"],
    equation: "米 (hạt gạo trắng) + 分 (xay nghiền nhỏ mịn li ti)",
    mnemonic: "Hạt gạo trắng ngần (米) được cối đá nghiền nát tan thành lớp bột trắng mịn màng (分), bột mì bột phấn.",
    illustration: {
      badge: "🌾",
      concept: "Bột mì trắng mịn",
      visualDesc: "Chiếc rây rắc lớp bột mì mịn màng trắng tinh phủ lên mặt bánh nướng."
    }
  },
  "粒": {
    components: ["米", "立"],
    equation: "米 (hạt gạo) + 立 (đứng riêng rẽ tròn trĩnh từng hạt)",
    mnemonic: "Từng hạt gạo trắng ngần tròn mẩy đứng độc lập không dính bết vào nhau, đơn vị đếm hạt, viên nhỏ.",
    illustration: {
      badge: "🍚",
      concept: "Hạt cơm trắng ngần",
      visualDesc: "Từng hạt cơm dẻo thơm óng ánh như hạt ngọc tròn đầy trong bát gốm."
    }
  },
  "糸": {
    components: ["糸"],
    equation: "Búi tơ nhỏ se sợi thành cuộn chỉ mềm dai",
    mnemonic: "Những sợi tơ tằm óng ả mềm mại se chặt lại thành sợi chỉ bền dẻo, sợi chỉ đường tơ.",
    illustration: {
      badge: "🧵",
      concept: "Cuộn chỉ tơ óng ả",
      visualDesc: "Cuộn chỉ thêu màu đỏ thắm mềm mại luồn qua lỗ kim bé xíu."
    }
  },
  "紅": {
    components: ["糸", "工"],
    equation: "糸 (sợi tơ tằm) + 工 (công phu thợ nhuộm lên màu đỏ tươi)",
    mnemonic: "Sợi tơ mềm (糸) qua bàn tay công phu của người thợ nhuộm (工) khoác lên sắc đỏ thắm tươi rực rỡ, màu hồng thắm.",
    illustration: {
      badge: "🌺",
      concept: "Sắc đỏ son rực rỡ",
      visualDesc: "Tấm lụa nhuộm sắc đỏ thắm bay nhẹ nhàng trong làn gió ấm áp."
    }
  },
  "純": {
    components: ["糸", "屯"],
    equation: "糸 (sợi tơ tằm nguyên bản) + 屯 (chưa pha tạp màu sắc nhân tạo)",
    mnemonic: "Sợi tơ tằm nguyên sơ trắng ngần chưa hề nhuộm màu sắc nào, biểu thị sự thuần khiết, đơn thuần trong sáng.",
    illustration: {
      badge: "💧",
      concept: "Giọt sương thuần khiết",
      visualDesc: "Giọt nước trong veo tinh khiết không tì vết đọng trên cánh hoa sen."
    }
  },
  "細": {
    components: ["糸", "田"],
    equation: "糸 (sợi tơ mảnh) + chia nhỏ li ti như từng kẽ ô ruộng (田)",
    mnemonic: "Sợi tơ mảnh mai tinh xảo như đường chỉ thêu len lỏi qua từng ô nhỏ, biểu thị sự tỉ mỉ, nhỏ bé, chi tiết.",
    illustration: {
      badge: "🔍",
      concept: "Chi tiết tinh xảo",
      visualDesc: "Mũi kim thêu tỉ mỉ từng đường chỉ siêu nhỏ tạo nên bức tranh thêu lụa."
    }
  },
  "紹": {
    components: ["糸", "召"],
    equation: "糸 (sợi dây kết nối) + 召 (mời gọi làm quen giới thiệu)",
    mnemonic: "Dùng sợi dây tơ duyên (糸) bắc cầu kết nối hai người xa lạ làm quen thân thiết (召), giới thiệu kết bạn.",
    illustration: {
      badge: "🤝",
      concept: "Bắt tay giới thiệu",
      visualDesc: "Hai người trao nhau tấm danh thiếp trang trọng mỉm cười chào làm quen."
    }
  },
  "絡": {
    components: ["糸", "各"],
    equation: "糸 (sợi dây thông tin) + 各 (nối thông tới mọi ngóc ngách)",
    mnemonic: "Giăng sợi dây kết nối (糸) tỏa đi khắp mọi ngả đường (各) để truyền tin tức, liên lạc, quấn quanh ràng buộc.",
    illustration: {
      badge: "📞",
      concept: "Liên lạc thông suốt",
      visualDesc: "Tín hiệu sóng điện thoại kết nối liền mạch qua các trạm viễn thông."
    }
  },
  "綿": {
    components: ["糸", "白", "巾"],
    equation: "Sợi tơ (糸) dệt từ những quả bông gòn trắng muốt (白 巾)",
    mnemonic: "Những quả bông gòn trắng tinh xốp mềm (白 巾) se thành sợi dệt may áo ấm (糸), cây bông vải, sợi bông.",
    illustration: {
      badge: "☁️",
      concept: "Quả bông gòn xốp mềm",
      visualDesc: "Nhánh bông vải nở xòe những búi bông trắng muốt mềm mại êm ái."
    }
  },
  "総": {
    components: ["糸", "八", "厶", "心"],
    equation: "Gom tất cả mọi sợi chỉ rời rạc lại thành một khối thống nhất bao quát",
    mnemonic: "Gom tất cả các mối tơ nhỏ lại thành một bó lớn trọn vẹn, bao quát toàn diện, tổng cộng, tổng quản.",
    illustration: {
      badge: "📊",
      concept: "Tổng kết toàn diện",
      visualDesc: "Bảng tổng kết tài chính gom đầy đủ mọi chỉ số phát triển toàn diện."
    }
  },
  "緑": {
    components: ["糸", "彐", "氺"],
    equation: "糸 (sợi tơ) + nhuộm màu mạ non tươi của đồng cỏ xanh mát",
    mnemonic: "Sợi tơ (糸) được nhuộm sắc xanh non mướt mát của chồi cây mùa xuân, tạo nên màu xanh lục mát lành.",
    illustration: {
      badge: "🌿",
      concept: "Lá xanh mướt mát",
      visualDesc: "Những tán lá xanh mướt tràn đầy nhựa sống tắm dưới ánh nắng sớm."
    }
  },
  "線": {
    components: ["糸", "泉"],
    equation: "糸 (sợi chỉ) + 泉 (chảy thẳng một mạch như dòng suối nguồn)",
    mnemonic: "Kéo căng sợi chỉ tơ (糸) thẳng tắp không gấp khúc như vệt suối nguồn tuôn chảy (泉), đường thẳng, tuyến đường sắt.",
    illustration: {
      badge: "📏",
      concept: "Đường kẻ thẳng tắp",
      visualDesc: "Đường ray xe lửa thẳng tắp kéo dài tít tắp đến chân trời bao la."
    }
  },
  "編": {
    components: ["糸", "扁"],
    equation: "糸 (sợi chỉ luồn) + 扁 (xâu các thẻ tre phẳng thành cuốn sách)",
    mnemonic: "Dùng sợi chỉ (糸) xâu kết các thẻ tre phẳng lại thành tập sách hoàn chỉnh, đan áo len, biên soạn sách vở.",
    illustration: {
      badge: "🧶",
      concept: "Đan khăn len ấm",
      visualDesc: "Đôi que đan thoăn thoắt đan từng mũi len tạo thành chiếc khăn quàng ấm áp."
    }
  },
  "練": {
    components: ["糸", "柬"],
    equation: "糸 (sợi tơ tằm thô) + 柬 (gột rửa luộc chín cho mềm óng ả)",
    mnemonic: "Gột rửa tôi luyện sợi tơ thô trở nên óng ả bền chắc, giống như con người qua rèn luyện ngày càng tinh nhuệ.",
    illustration: {
      badge: "🥋",
      concept: "Khổ luyện võ công",
      visualDesc: "Võ sĩ đai đen miệt mài luyện quyền dưới thác nước hùng vĩ."
    }
  },
  "績": {
    components: ["糸", "責"],
    equation: "糸 (sợi tơ dệt nên tấm vải) + 責 (công sức kiên trì miệt mài tạo ra)",
    mnemonic: "Kiên trì cần mẫn xe từng sợi tơ dệt nên tấm vải quý lộng lẫy, gặt hái thành quả xứng đáng, thành tích rực rỡ.",
    illustration: {
      badge: "🏆",
      concept: "Bảng vàng thành tích",
      visualDesc: "Tấm bằng khen vàng óng ánh ghi nhận thành tích xuất sắc vượt bậc."
    }
  },
  "缶": {
    components: ["缶"],
    equation: "Chữ tượng hình chiếc vò gốm đậy nắp kín mít",
    mnemonic: "Chiếc hũ gốm có nắp đậy kín giữ đồ ăn tươi ngon, ngày nay chuyển thành lon nước ngọt, đồ hộp kim loại.",
    illustration: {
      badge: "🥫",
      concept: "Hộp lon đồ hộp",
      visualDesc: "Chiếc lon nước ngọt kim loại mát lạnh đọng những giọt sương sảng khoái."
    }
  },
  "署": {
    components: ["罒", "耂", "日"],
    equation: "Lưới pháp luật (罒) + 者 (vị quan thi hành công vụ ký tên)",
    mnemonic: "Nơi quan lại thực thi lưới luật pháp giữ trật tự xã hội và ký tên phê duyệt văn bản, đồn cảnh sát, công thự.",
    illustration: {
      badge: "🚓",
      concept: "Trụ sở cảnh sát",
      visualDesc: "Tòa nhà trụ sở cảnh sát uy nghiêm bảo vệ an ninh trật tự khu phố."
    }
  },
  "群": {
    components: ["君", "羊"],
    equation: "君 (người chăn dắt) + 羊 (đàn cừu đông đúc đi theo)",
    mnemonic: "Đàn cừu đông đảo (羊) ngoan ngoãn nối đuôi nhau bước đi theo hiệu lệnh người chăn dắt (君), bầy đàn, quần chúng.",
    illustration: {
      badge: "🐑",
      concept: "Đàn cừu trên thảo nguyên",
      visualDesc: "Đàn cừu trắng như những đám mây nhỏ thung thăng gặm cỏ trên đồi xanh."
    }
  },
  "羽": {
    components: ["羽"],
    equation: "Hai chiếc lông vũ chim xòe đều đối xứng hai bên",
    mnemonic: "Đôi cánh chim lông vũ nhẹ tênh giúp chim sải cánh chao lượn trên bầu trời, lông vũ, chiếc lông chim.",
    illustration: {
      badge: "🪶",
      concept: "Chiếc lông vũ nhẹ tênh",
      visualDesc: "Chiếc lông vũ trắng tinh khôi nhẹ nhàng trôi bồng bềnh trong làn gió."
    }
  },
  "翌": {
    components: ["羽", "立"],
    equation: "Đứng dậy (立) vỗ đôi cánh mềm (羽) đón ngày mới ló rạng",
    mnemonic: "Chú chim đứng dậy vỗ đôi cánh đón bình minh vừa hé rạng, báo hiệu ngày mới bắt đầu, ngày hôm sau.",
    illustration: {
      badge: "🌅",
      concept: "Bình minh ngày hôm sau",
      visualDesc: "Mặt trời sớm mai nhô lên chiếu tia nắng đầu tiên của ngày kế tiếp."
    }
  },
  "耕": {
    components: ["耒", "井"],
    equation: "耒 (cái bắp cày đất) + 井 (thửa ruộng bờ ngăn nắp)",
    mnemonic: "Dắt trâu kéo chiếc cày gỗ (耒) xới tơi từng luống đất vuông vức ngăn nắp (井), cày cấy đất đai, canh tác.",
    illustration: {
      badge: "🚜",
      concept: "Cày bừa đồng ruộng",
      visualDesc: "Chiếc máy cày hiện đại xới từng luống đất màu mỡ chuẩn bị cho mùa gieo hạt."
    }
  },
  "肌": {
    components: ["月", "几"],
    equation: "月 (phần thân thể) + 几 (mịn màng nhẵn bóng như gỗ tiện)",
    mnemonic: "Lớp da bao bọc ngoài thân thể (月) mềm mại mịn màng nhẵn nhụi (几), làn da, da dẻ khỏe khoắn.",
    illustration: {
      badge: "✨",
      concept: "Làn da mịn màng",
      visualDesc: "Làn da trắng hồng rạng rỡ biểu thị nét thanh xuân tươi trẻ đầy sức sống."
    }
  },
  "肩": {
    components: ["戸", "月"],
    equation: "Phần thân thể (月) có khớp xương nhô ngang vững chãi như then cửa (戸)",
    mnemonic: "Khớp xương nhô ngang vững chãi nâng đỡ hai cánh tay trên thân thể (月), đôi bờ vai ghé gánh vác việc đời.",
    illustration: {
      badge: "💪",
      concept: "Bờ vai vững chãi",
      visualDesc: "Bờ vai vạm vỡ kiên cường gánh vác trọng trách gia đình và xã hội."
    }
  },
  "肯": {
    components: ["止", "月"],
    equation: "Chỉ (止 đứng yên chuẩn mực) + Nhục (khớp xương thịt vừa khít)",
    mnemonic: "Khớp xương ăn khớp trơn tru vừa vặn không cọ xát, biểu thị sự tán thành, ưng thuận, khẳng định điều đúng.",
    illustration: {
      badge: "✅",
      concept: "Khẳng định chuẩn xác",
      visualDesc: "Dấu tích xanh nổi bật biểu thị sự đồng thuận và khẳng định tuyệt đối."
    }
  },
  "胃": {
    components: ["田", "月"],
    equation: "田 (ô túi chứa đầy ngũ cốc) + 月 (cơ quan trong cơ thể)",
    mnemonic: "Cơ quan nội tạng hình túi (月) chứa đầy thức ăn ngũ cốc để tiêu hóa nuôi thân, dạ dày bao tử.",
    illustration: {
      badge: "🫁",
      concept: "Dạ dày tiêu hóa",
      visualDesc: "Hình ảnh trực quan mô phỏng chiếc dạ dày tiêu hóa thức ăn khỏe mạnh."
    }
  },
  "胸": {
    components: ["月", "勹", "凶"],
    equation: "月 (thân thể) + khoang ngực bảo bọc ôm trọn trái tim và buồng phổi",
    mnemonic: "Phần thân thể phía trước (月) bao bọc nhịp đập thổn thức của trái tim, lồng ngực tấm lòng.",
    illustration: {
      badge: "🫀",
      concept: "Lồng ngực trái tim",
      visualDesc: "Bàn tay đặt lên ngực cảm nhận từng nhịp đập tha thiết của con tim."
    }
  },
  "脂": {
    components: ["月", "旨"],
    equation: "月 (Nhục - thịt) + 旨 (vị béo ngậy ngào ngạt thơm lừng)",
    mnemonic: "Lớp mỡ trắng ngần béo ngậy xen kẽ trong thớ thịt tạo nên hương vị thơm ngon đậm đà, mỡ động vật chất béo.",
    illustration: {
      badge: "🥩",
      concept: "Vân mỡ cẩm thạch",
      visualDesc: "Miếng thịt bò Kobe với những vân mỡ hoa cẩm thạch đan xen tuyệt mỹ."
    }
  },
  "脳": {
    components: ["月", "亠", "凵", "乂"],
    equation: "月 (bộ phận thân thể) + mạng lưới nơ-ron tư duy đa tầng trong hộp sọ",
    mnemonic: "Khối óc nằm trong hộp sọ với muôn triệu nếp gấp tư duy điều khiển toàn bộ cơ thể, bộ não trí tuệ.",
    illustration: {
      badge: "🧠",
      concept: "Bộ não tư duy sáng tạo",
      visualDesc: "Mô hình bộ não phát sáng các liên kết nơ-ron sáng tạo ý tưởng mới."
    }
  },
  "腕": {
    components: ["月", "宀", "夕", "卩"],
    equation: "月 (thân thể) + uốn cong xoay chuyển linh hoạt khéo léo",
    mnemonic: "Bộ phận cơ thể xoay chuyển linh hoạt mềm dẻo vung bắt đồ vật, cánh tay cổ tay và tay nghề tài ba.",
    illustration: {
      badge: "💪",
      concept: "Cánh tay rắn rỏi",
      visualDesc: "Cánh tay rắn rỏi khéo léo điều khiển cọ vẽ phóng tác bức tranh."
    }
  },
  "腰": {
    components: ["月", "覀", "女"],
    equation: "月 (thân thể) + 要 (vị trí then chốt trọng yếu ở giữa thân)",
    mnemonic: "Vị trí trọng yếu nhất ở giữa thân mình (月 要) nâng đỡ toàn bộ cột sống, chiếc thắt lưng, eo hông.",
    illustration: {
      badge: "🧘",
      concept: "Eo thon thẳng thắn",
      visualDesc: "Tư thế ngồi thẳng lưng vững chãi trong bài tập yoga giữ gìn sức khỏe."
    }
  }
};

const rootJsonPath = path.join(__dirname, '../kanji_full_database.json');
const publicJsonPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootJsPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicJsonPath, 'utf8'));

let count = 0;
for (const [char, patch] of Object.entries(n2cData)) {
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

console.log(`[Batch 4C - N2 Part 3] Đã cập nhật thành công ${count} / ${Object.keys(n2cData).length} chữ Kanji N2.`);

fs.writeFileSync(publicJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsPath, 'window.KANJI_FULL_DATABASE = ' + JSON.stringify(db, null, 2) + ';\n', 'utf8');
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
