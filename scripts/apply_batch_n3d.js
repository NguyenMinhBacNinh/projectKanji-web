const fs = require('fs');
const path = require('path');

const n3dData = {
  "職": {
    components: ["耳", "音", "戈"],
    equation: "耳 (Nhĩ - tai lắng nghe) + 音 (tiếng hiệu lệnh) + 戈 (vũ khí chấp pháp)",
    mnemonic: "Lắng tai nghe lệnh (耳) rồi cầm ngọn giáo (戈) chu toàn nhiệm vụ được giao, đảm nhiệm chức trách, chức nghiệp.",
    illustration: {
      badge: "💼",
      concept: "Chức vụ trọng trách",
      visualDesc: "Cặp da công sở và bảng tên chức vụ đặt trang trọng trên bàn làm việc."
    }
  },
  "育": {
    components: ["亠", "厶", "月"],
    equation: "Đứa con thơ mới chào đời + 月 (Nhục - dòng sữa mẹ ngọt lành)",
    mnemonic: "Đứa con thơ chào đời được nuôi nấng bằng dòng sữa mẹ ngọt lành (月) và dạy dỗ nên người, giáo dục dưỡng dục.",
    illustration: {
      badge: "🌱",
      concept: "Ươm mầm nuôi dưỡng",
      visualDesc: "Bàn tay ân cần tưới nước cho mầm cây nhỏ lớn lên từng ngày xanh tốt."
    }
  },
  "背": {
    components: ["北", "月"],
    equation: "北 (hai người xoay lưng ngược nhau) + 月 (phần thân xác)",
    mnemonic: "Hai người tựa lưng vào nhau (北) trên phần thân thể (月), biểu thị tấm lưng, phía sau lưng.",
    illustration: {
      badge: "🧗",
      concept: "Tấm lưng vững chãi",
      visualDesc: "Người leo núi quay lưng nhìn về biển mây bao la hùng vĩ."
    }
  },
  "能": {
    components: ["厶", "月", "匕", "匕"],
    equation: "Hình tượng chú gấu lực lưỡng đầy sức mạnh và kỹ năng",
    mnemonic: "Con gấu rừng vạm vỡ sở hữu sức mạnh và kỹ năng săn mồi phi thường, biểu thị bản lĩnh tài năng, năng lực.",
    illustration: {
      badge: "⚡",
      concept: "Năng lực xuất chúng",
      visualDesc: "Tia chớp hội tụ nguồn năng lượng mạnh mẽ bứt phá giới hạn."
    }
  },
  "腹": {
    components: ["月", "𠂉", "日", "夂"],
    equation: "月 (thân thể) + 复 (chiếc vò chứa thức ăn)",
    mnemonic: "Phần cơ thể (月) như chiếc bình lớn dung nạp thức ăn tiêu hóa rồi tuần hoàn, đó chính là chiếc bụng.",
    illustration: {
      badge: "🤰",
      concept: "Chiếc bụng ấm no",
      visualDesc: "Bàn tay vỗ nhẹ lên bụng sau bữa cơm ngon lành no ấm."
    }
  },
  "舞": {
    components: ["𠂉", "一", "夕", "舛"],
    equation: "Hai tay vung dải lụa hoa + 舛 (hai bàn chân xoay bước nhịp nhàng)",
    mnemonic: "Tay vung tà áo lụa tha thướt, hai chân (舛) xoay lướt uyển chuyển theo điệu nhạc, khiêu vũ nhảy múa.",
    illustration: {
      badge: "💃",
      concept: "Vũ điệu uyển chuyển",
      visualDesc: "Vũ công xòe tà váy lụa rực rỡ xoay tròn trong điệu múa truyền thống."
    }
  },
  "船": {
    components: ["舟", "八", "口"],
    equation: "舟 (Chu - con thuyền gỗ) + khoang thuyền thông suốt chứa người hàng hóa",
    mnemonic: "Con thuyền gỗ lớn (舟) có nhiều khoang lái chứa hàng trăm người rẽ sóng ra khơi, con tàu thuyền buồm.",
    illustration: {
      badge: "🚢",
      concept: "Con tàu vượt sóng",
      visualDesc: "Con tàu lớn rẽ sóng trắng xóa lướt đi giữa đại dương bao la xanh thẳm."
    }
  },
  "良": {
    components: ["丶", "艮"],
    equation: "Máng sàng sảy giữ lại những hạt thóc gạo tinh khiết nhất",
    mnemonic: "Sàng sảy bỏ đi cặn bã bụi bẩn, giữ lại những gì thanh khiết thơm ngon nhất, biểu thị sự tốt lành, lương thiện.",
    illustration: {
      badge: "✨",
      concept: "Tâm hồn lương thiện",
      visualDesc: "Trái tim thuần khiết phát ra ánh sáng lung linh ấm áp lan tỏa."
    }
  },
  "若": {
    components: ["艹", "右"],
    equation: "艹 (Thảo - cọng cỏ non mềm) + 右 (tay vuốt tóc thướt tha)",
    mnemonic: "Mềm mại như cọng cỏ non (艹), cử chỉ nhẹ nhàng như làn gió thoảng, biểu thị sự trẻ trung, như là.",
    illustration: {
      badge: "🌿",
      concept: "Tuổi trẻ mơn mởn",
      visualDesc: "Chồi cỏ non mơn mởn đọng giọt sương mai tinh khôi đón ngày mới."
    }
  },
  "苦": {
    components: ["艹", "古"],
    equation: "艹 (Thảo - lá cỏ vị đắng ngắt) + 古 (Cổ - cằn cỗi)",
    mnemonic: "Nếm phải vị lá cây dại đắng ngắt đầu lưỡi (艹 古), biểu thị nỗi đắng cay, nhọc nhằn gian khổ.",
    illustration: {
      badge: "☕",
      concept: "Vị đắng nhọc nhằn",
      visualDesc: "Tách cà phê đen đặc sánh đắng đót nhưng mang lại sự tỉnh táo sau gian nan."
    }
  },
  "草": {
    components: ["艹", "早"],
    equation: "艹 (Thảo - ngọn cỏ non) + 早 (Tảo - ánh nắng sớm mai)",
    mnemonic: "Những ngọn cỏ non (艹) tắm mình dưới ánh nắng sớm mai (早) đọng sương lấp lánh, cây cỏ thảo mộc.",
    illustration: {
      badge: "🌱",
      concept: "Đồng cỏ xanh tươi",
      visualDesc: "Thảm cỏ xanh mướt đẫm sương mai trải dài dưới nắng ban mai rực rỡ."
    }
  },
  "落": {
    components: ["艹", "氵", "各"],
    equation: "艹 (lá cây vàng) + 氵 (nước sông) + 各 (rơi rụng từng chiếc)",
    mnemonic: "Lá vàng lìa cành (艹) rụng rơi lả tả cuốn trôi theo dòng nước biếc (氵 各), biểu thị rơi rụng, sa sút.",
    illustration: {
      badge: "🍂",
      concept: "Lá vàng rơi rụng",
      visualDesc: "Chiếc lá phong đỏ lìa cành nhẹ nhàng đáp xuống mặt nước phẳng lặng."
    }
  },
  "葉": {
    components: ["艹", "世", "木"],
    equation: "艹 (Thảo - ngọn cỏ lá cây) + 世 (các thế hệ) + 木 (cành cây)",
    mnemonic: "Trên cành cây (木), từng thế hệ lá xanh (世) nối tiếp nhau bung nở đón nắng (艹), tạo thành muôn ngàn chiếc lá.",
    illustration: {
      badge: "🍃",
      concept: "Chiếc lá xanh biếc",
      visualDesc: "Chiếc lá xanh với những đường gân lá tinh xảo đón giọt sương mai lung linh."
    }
  },
  "薬": {
    components: ["艹", "楽"],
    equation: "艹 (Thảo - cây cỏ thảo dược) + 楽 (Lạc - hồi phục sức khỏe vui vẻ)",
    mnemonic: "Cây thảo mộc quý (艹) sắc nước uống vào xua tan bệnh tật khiến lòng người an vui thanh thản (楽), thuốc men thang dược.",
    illustration: {
      badge: "💊",
      concept: "Viên thuốc thần kỳ",
      visualDesc: "Viên thuốc thảo dược tinh chế mang lại sức khỏe và nụ cười rạng rỡ."
    }
  },
  "術": {
    components: ["行", "木", "丶"],
    equation: "Đi giữa con đường (行) với tài nghệ tỉ mỉ chế tác tinh hoa",
    mnemonic: "Bước đi trên con đường chuyên sâu (行) với kỹ năng tinh xảo tuyệt luân, tạo nên mỹ thuật, kỹ thuật.",
    illustration: {
      badge: "🎨",
      concept: "Bàn tay nghệ thuật",
      visualDesc: "Bàn tay khéo léo của nghệ nhân nặn ra bình gốm tinh xảo tuyệt mỹ."
    }
  },
  "表": {
    components: ["土", "二", "衣"],
    equation: "Lớp lông thú xù lộ ra bên ngoài chiếc áo choàng",
    mnemonic: "Lớp lông nhung lót áo lộn ra ngoài cho mọi người cùng chiêm ngưỡng, biểu thị bề mặt bên ngoài, biểu diễn.",
    illustration: {
      badge: "📊",
      concept: "Biểu đồ trực quan",
      visualDesc: "Biểu đồ cột sắc màu hiển thị rõ ràng các số liệu kết quả."
    }
  },
  "要": {
    components: ["覀", "女"],
    equation: "Người phụ nữ (女) thắt dải đai lưng (覀) điểm nút trọng yếu",
    mnemonic: "Thắt dải đai ngay eo lưng (phần cốt tủy nâng đỡ thân người), biểu thị điểm trọng yếu, cốt lõi cần thiết.",
    illustration: {
      badge: "🔑",
      concept: "Chìa khóa then chốt",
      visualDesc: "Chiếc chìa khóa vàng then chốt mở ra cánh cửa thành công."
    }
  },
  "規": {
    components: ["夫", "見"],
    equation: "Người thợ (夫) dùng mắt (見) ngắm compa vẽ đường tròn chuẩn xác",
    mnemonic: "Mắt dõi nhìn (見) theo chiếc compa quay một vòng tròn chuẩn không lệch milimet, định ra quy chuẩn, quy tắc.",
    illustration: {
      badge: "📐",
      concept: "Compa vẽ đường tròn",
      visualDesc: "Chiếc compa bằng đồng vẽ nên vòng tròn hoàn hảo trên bản thiết kế."
    }
  },
  "覚": {
    components: ["⺍", "冖", "見"],
    equation: "Mắt mở to bừng tỉnh (見) sau bức rèm che bóng tối",
    mnemonic: "Đôi mắt mở to bừng tỉnh (見) nhìn thấy ánh sáng xua tan bóng đêm u tối, thức giấc và cảm giác tỏ tường.",
    illustration: {
      badge: "💡",
      concept: "Bừng tỉnh giác ngộ",
      visualDesc: "Bóng đèn bật sáng rực rỡ tượng trưng cho sự bừng tỉnh nhận thức."
    }
  },
  "観": {
    components: ["雚", "見"],
    equation: "Đôi mắt tinh tường như cú vọ + 見 (nhìn ngắm sâu rộng)",
    mnemonic: "Đôi mắt tinh anh (見) phóng tầm nhìn bao quát vạn vật từ trên cao, quan sát chiêm ngưỡng phong cảnh.",
    illustration: {
      badge: "🔭",
      concept: "Ngắm nhìn phong cảnh",
      visualDesc: "Người đứng trên đài vọng cảnh phóng tầm mắt ngắm toàn cảnh thung lũng."
    }
  },
  "解": {
    components: ["角", "刀", "牛"],
    equation: "Dùng dao bén (刀) tháo rời chiếc sừng (角) khỏi đầu con trâu (牛)",
    mnemonic: "Dùng nhát dao chuẩn xác (刀) tách rời sừng nhọn (角) của trâu (牛), tháo gỡ từng nút thắt, giải quyết bài toán.",
    illustration: {
      badge: "🧩",
      concept: "Tháo gỡ nút thắt",
      visualDesc: "Hai mảnh ghép móc nối được tháo rời nhẹ nhàng gỡ xong câu đố hóc búa."
    }
  },
  "記": {
    components: ["言", "己"],
    equation: "言 (Ngôn - câu chữ) + 己 (Kỷ - bản thân khắc ghi cẩn thận)",
    mnemonic: "Dùng lời văn con chữ (言) nắn nót ghi lại câu chuyện của chính bản thân mình (己), lưu vào sổ ký sự, nhật ký.",
    illustration: {
      badge: "📓",
      concept: "Cuốn sổ nhật ký",
      visualDesc: "Cuốn sổ tay bìa da cài bút mực trang nhã ghi chép từng kỷ niệm đẹp."
    }
  },
  "訪": {
    components: ["言", "方"],
    equation: "言 (Ngôn - lời thăm hỏi ân cần) + 方 (tìm đến phương xa viếng thăm)",
    mnemonic: "Cất bước tìm đến phương xa (方) mang theo lời chào hỏi ân cần thắm thiết (言), viếng thăm và thăm dò.",
    illustration: {
      badge: "🚪",
      concept: "Ghé thăm bạn hiền",
      visualDesc: "Tiếng gõ cửa vui mừng ghé thăm người bạn tri kỷ sau bao ngày cách xa."
    }
  },
  "許": {
    components: ["言", "午"],
    equation: "言 (Ngôn - lời nói thốt ra) + 午 (ngay thẳng rõ ràng như chính ngọ)",
    mnemonic: "Lời nói thốt ra rõ ràng thẳng thắn (言 午) biểu thị sự đồng ý ưng thuận, cho phép và hứa hẹn.",
    illustration: {
      badge: "🤝",
      concept: "Chấp thuận cho phép",
      visualDesc: "Cái bắt tay nồng ấm thể hiện sự tha thứ và chấp thuận chân thành."
    }
  },
  "認": {
    components: ["言", "忍"],
    equation: "言 (Ngôn - lời tuyên bố) + 忍 (Nhẫn - lòng kiên nhẫn xem xét tỏ tường)",
    mnemonic: "Sau khi kiên nhẫn xem xét tỏ tường (忍), cất lời tuyên bố xác nhận công bằng (言), công nhận và nhận diện.",
    illustration: {
      badge: "🎖️",
      concept: "Công nhận thành tích",
      visualDesc: "Tấm bằng khen đóng dấu son đỏ công nhận nỗ lực xuất sắc."
    }
  },
  "誤": {
    components: ["言", "呉"],
    equation: "言 (Ngôn - lời nói) + 呉 (nói quanh co sai lệch)",
    mnemonic: "Lời nói bất cẩn (言) truyền đạt sai lệch thông tin, gây nên sự hiểu lầm và sai lầm đáng tiếc.",
    illustration: {
      badge: "⚠️",
      concept: "Cảnh báo sai sót",
      visualDesc: "Dấu chấm than vàng cảnh báo để kịp thời chỉnh sửa sai sót trước khi gửi đi."
    }
  },
  "説": {
    components: ["言", "兌"],
    equation: "言 (Ngôn - lời lẽ thấu tình đạt lý) + 兌 (người nghe mỉm cười đồng thuận)",
    mnemonic: "Dùng lời lẽ thấu tình đạt lý (言) khiến người nghe mỉm cười gật đầu tâm phục khẩu phục (兌), thuyết phục giải thích.",
    illustration: {
      badge: "🗣️",
      concept: "Thuyết trình lôi cuốn",
      visualDesc: "Diễn giả tự tin thuyết trình bài giảng lôi cuốn trước khán phòng chăm chú."
    }
  },
  "調": {
    components: ["言", "周"],
    equation: "言 (Ngôn - lời vấn đáp) + 周 (Chu - rà soát chu đáo bốn bề)",
    mnemonic: "Dùng lời hỏi han (言) rà soát chu đáo khắp mọi ngóc ngách (周), điều tra cặn kẽ và hòa điệu ăn khớp.",
    illustration: {
      badge: "🔎",
      concept: "Điều tra cặn kẽ",
      visualDesc: "Kính lúp soi rõ từng dòng tài liệu điều tra thu thập thông tin."
    }
  },
  "談": {
    components: ["言", "炎"],
    equation: "言 (Ngôn - lời trao đổi) + 炎 (ngồi bên bếp lửa hồng rực rỡ trò chuyện)",
    mnemonic: "Quây quần bên đống lửa hồng ấm áp (炎) mở lòng trò chuyện rôm rả (言), cùng nhau bàn bạc đàm đạo thân mật.",
    illustration: {
      badge: "☕",
      concept: "Đàm đạo bên chén trà",
      visualDesc: "Hai người bạn thảnh thơi ngồi đối ẩm đàm đạo việc đời bên chén trà ấm."
    }
  },
  "論": {
    components: ["言", "侖"],
    equation: "言 (Ngôn - ngôn từ) + 侖 (thẻ tre xếp theo thứ tự mạch lạc)",
    mnemonic: "Dùng câu chữ (言) sắp xếp chặt chẽ theo trình tự logic lớp lang (侖), tạo thành bài luận thuyết phục.",
    illustration: {
      badge: "📚",
      concept: "Luận án logic",
      visualDesc: "Tập luận văn đóng bìa trang trọng với những lập luận sắc bén thuyết phục."
    }
  },
  "識": {
    components: ["言", "音", "戈"],
    equation: "言 (Ngôn - ngôn ngữ khái niệm) + khắc sâu ghi dấu vào tâm trí",
    mnemonic: "Hiểu sâu từng câu chữ khái niệm (言) và khắc ghi trong tâm khảm, hình thành tri thức và nhận thức uyên bác.",
    illustration: {
      badge: "🧠",
      concept: "Tri thức uyên bác",
      visualDesc: "Hình ảnh bộ não tỏa sáng với những kết nối tư duy tri thức sâu rộng."
    }
  },
  "警": {
    components: ["敬", "言"],
    equation: "敬 (cẩn trọng nghiêm túc) + 言 (Ngôn - lời hô cảnh báo)",
    mnemonic: "Cất lời nhắc nhở nghiêm túc (言) khiến mọi người phải cẩn trọng đề phòng (敬), cảnh sát tuần tra cảnh giác.",
    illustration: {
      badge: "🚨",
      concept: "Còi đèn cảnh báo",
      visualDesc: "Đèn còi xe cảnh sát xoay sáng cảnh báo giữ gìn trật tự an toàn."
    }
  },
  "議": {
    components: ["言", "義"],
    equation: "言 (Ngôn - lời đóng góp ý kiến) + 義 (Nghĩa - hướng về điều chính nghĩa)",
    mnemonic: "Mọi người cùng cất tiếng nói (言) hướng về lợi ích chung công bằng chính trực (義), tạo nên hội nghị, bàn nghị.",
    illustration: {
      badge: "🏛️",
      concept: "Hội nghị bàn tròn",
      visualDesc: "Bàn hội nghị trang nghiêm nơi các đại biểu cùng thảo luận kế sách."
    }
  },
  "负": {
    components: ["⺈", "贝"],
    equation: "Gánh trên lưng (⺈) bao tiền tài bảo vật (贝)",
    mnemonic: "Ghé vai gánh vác bao hàng hóa nặng nề, biểu thị sự mang vác gánh nặng, chịu thua.",
    illustration: {
      badge: "🎒",
      concept: "Gánh vác trọng trách",
      visualDesc: "Người dốc sức gánh vác bao tải nặng vượt qua dốc đèo hiểm trở."
    }
  },
  "财": {
    components: ["贝", "才"],
    equation: "贝 (tiền của châu báu) + 才 (tài năng khéo léo tạo ra)",
    mnemonic: "Dùng tài năng và trí tuệ (才) tạo ra tiền của cải dồi dào (贝), hình thành gia tài, tài sản.",
    illustration: {
      badge: "💰",
      concept: "Tiền tài của cải",
      visualDesc: "Túi gấm chứa những đồng tiền vàng óng ả biểu thị tài lộc sung túc."
    }
  },
  "责": {
    components: ["龶", "贝"],
    equation: "Ghi sổ nợ tiền vỏ sò (贝) phải hoàn trả chu toàn",
    mnemonic: "Ghi nhận số tiền tài đã nhận (贝) phải gánh vác bồi hoàn sòng phẳng, biểu thị chức trách, trách nhiệm.",
    illustration: {
      badge: "📋",
      concept: "Trách nhiệm gánh vác",
      visualDesc: "Bản cam kết trách nhiệm có chữ ký xác nhận thực hiện trọn vẹn nghĩa vụ."
    }
  },
  "贫": {
    components: ["分", "贝"],
    equation: "分 (chia nhỏ phân tán) + 贝 (chút tiền ít ỏi vơi cạn)",
    mnemonic: "Chút tiền vỏ sò ít ỏi (贝) lại bị chia năm xẻ bảy (分) thành vụn vặt, cảnh bần cùng nghèo khó.",
    illustration: {
      badge: "🍂",
      concept: "Gian nan bần khó",
      visualDesc: "Chiếc túi vải mộc mạc trống trải biểu thị hoàn cảnh bần hàn gian khó."
    }
  },
  "费": {
    components: ["弗", "贝"],
    equation: "弗 (dây trói thắt / tiêu xài) + 贝 (tiền của chi ra)",
    mnemonic: "Mở hầu bao chi những đồng tiền vỏ sò (贝) chi trả cho sinh hoạt hàng ngày, tạo thành chi phí, học phí.",
    illustration: {
      badge: "🧾",
      concept: "Hóa đơn chi phí",
      visualDesc: "Tờ biên lai hóa đơn liệt kê rõ ràng các khoản chi tiêu minh bạch."
    }
  },
  "资": {
    components: ["次", "贝"],
    equation: "次 (tích lũy nối tiếp nhau) + 贝 (tiền của gom góp)",
    mnemonic: "Tích cóp tiền tài vỏ sò (贝) lần lượt qua từng đợt (次), tạo nên nguồn vốn tư bản đầu tư kinh doanh.",
    illustration: {
      badge: "📈",
      concept: "Nguồn vốn đầu tư",
      visualDesc: "Đồng tiền ươm mầm sinh sôi nảy nở thành cây tài chính xanh tốt."
    }
  },
  "赞": {
    components: ["先", "先", "贝"],
    equation: "Tiên Tiên (những người tiên phong dẫn đầu) + 贝 (trao thưởng tiền tài)",
    mnemonic: "Hai tay dâng phần thưởng xứng đáng (贝) tôn vinh những người tiên phong xuất sắc nhất, khen ngợi tán thưởng.",
    illustration: {
      badge: "👏",
      concept: "Vỗ tay tán thưởng",
      visualDesc: "Tràng pháo tay giòn giã rộ lên chúc mừng thành tích xuất sắc của người chiến thắng."
    }
  },
  "越": {
    components: ["走", "戉"],
    equation: "走 (cất bước chạy) + 戉 (cầm lưỡi rìu mở lối vượt rào)",
    mnemonic: "Vác rìu mở lối cất bước phi nhanh (走) băng qua chông gai chướng ngại, vượt qua mọi ranh giới thử thách.",
    illustration: {
      badge: "🧗",
      concept: "Vượt qua thử thách",
      visualDesc: "Vận động viên bật nhảy vút qua thanh xà ngang vượt qua kỷ lục cũ."
    }
  },
  "路": {
    components: ["足", "各"],
    equation: "足 (bàn chân đạp đất) + 各 (mọi người bước tới tấp nập)",
    mnemonic: "Nhiều bàn chân (足) của muôn người (各) cùng dẫm bước qua lại tạo nên lối mòn, hình thành con đường lộ trình.",
    illustration: {
      badge: "🛣️",
      concept: "Con đường trải dài",
      visualDesc: "Con đường nhựa phẳng lì thênh thang uốn lượn giữa những đồi hoa xanh mát."
    }
  },
  "身": {
    components: ["身"],
    equation: "Chữ tượng hình toàn bộ thân thể con người",
    mnemonic: "Đầu mình tứ chi đầy đủ trọn vẹn, nuôi dưỡng tấm thân khỏe mạnh, biểu thị thân thể và bản thân.",
    illustration: {
      badge: "🧍",
      concept: "Thân hình khỏe khoắn",
      visualDesc: "Hình ảnh người đứng thẳng vươn vai khỏe khoắn tràn đầy sức sống."
    }
  },
  "辞": {
    components: ["舌", "辛"],
    equation: "舌 (chiếc lưỡi nói năng giãi bày) + 辛 (hình phạt cay đắng)",
    mnemonic: "Dùng lời lẽ giãi bày rành mạch (舌) để thoát khỏi hình phạt oan ức (辛), từ đó mang nghĩa từ ngữ, cáo từ từ chức.",
    illustration: {
      badge: "📖",
      concept: "Từ điển tra cứu",
      visualDesc: "Cuốn từ điển dày dặn giải nghĩa cặn kẽ từng câu chữ phong phú."
    }
  },
  "込": {
    components: ["辶", "入"],
    equation: "辶 (chuyển động bước đi) + 入 (chui tọt vào bên trong)",
    mnemonic: "Bước chân rảo bước chui tọt sâu vào bên trong không gian chật hẹp, dồn nén, nhồi nhét, chen chúc.",
    illustration: {
      badge: "📥",
      concept: "Chen chúc dồn vào",
      visualDesc: "Hành khách trật tự bước chen chân vào toa tàu điện đông đúc giờ cao điểm."
    }
  },
  "迎": {
    components: ["辶", "卬"],
    equation: "辶 (bước ra tận cổng) + 卬 (ngước mắt trông ngóng khách quý)",
    mnemonic: "Rảo bước chân ra tận cổng làng (辶) ngước mắt đón chào khách quý tới thăm, nghênh đón nồng nhiệt.",
    illustration: {
      badge: "🤝",
      concept: "Niềm nở nghênh đón",
      visualDesc: "Nụ cười rạng rỡ và cái cúi chào niềm nở đón tiếp khách quý vào nhà."
    }
  },
  "返": {
    components: ["辶", "反"],
    equation: "辶 (con đường đi) + 反 (lộn ngược hướng quay đầu)",
    mnemonic: "Bước chân đi tới rồi lộn ngược hướng quay trở về chốn cũ (反), đem đồ vật trả lại cho chủ cũ.",
    illustration: {
      badge: "↩️",
      concept: "Gửi trả lại đồ",
      visualDesc: "Mũi tên uốn cong gửi bưu kiện hoàn trả nguyên vẹn về địa chỉ gửi."
    }
  },
  "迷": {
    components: ["辶", "米"],
    equation: "辶 (bước chân đi) + 米 (tám hướng rối bời như hoa gạo)",
    mnemonic: "Đi giữa ngã đường tỏa ra nhiều hướng rối bời (米) không biết lối nào thoát ra, lạc đường, mê muội.",
    illustration: {
      badge: "🌀",
      concept: "Lạc vào mê cung",
      visualDesc: "Bức tường mê cung uốn lượn thách thức người tìm lối ra chính xác."
    }
  },
  "追": {
    components: ["辶", "阜"],
    equation: "辶 (bước chạy dồn dập) + bám sát sau lưng đối phương qua gò đất",
    mnemonic: "Chân sải bước rượt đuổi dồn dập qua các gò đồi không buông tha, truy bắt đối tượng.",
    illustration: {
      badge: "🏃‍♂️💨",
      concept: "Rượt đuổi thần tốc",
      visualDesc: "Vận động viên dốc sức chạy rượt đuổi bám sát đối thủ trên đường đua."
    }
  },
  "退": {
    components: ["辶", "艮"],
    equation: "辶 (bước đi) + 艮 (mắt nhìn lại phía sau lùi bước)",
    mnemonic: "Bàn chân thoái lui bước giật lùi về phía sau (辶) để bảo toàn lực lượng, rút lui, thoái thác.",
    illustration: {
      badge: "🔙",
      concept: "Rút lui an toàn",
      visualDesc: "Đoàn thuyền xuôi dòng lùi về căn cứ an toàn tránh cơn giông bão."
    }
  },
  "逃": {
    components: ["辶", "兆"],
    equation: "辶 (cất bước chạy thục mạng) + 兆 (nhìn thấy điềm nguy hiểm nứt toác)",
    mnemonic: "Thấy điềm gở nguy hiểm liền co cẳng phóng chạy thục mạng (辶 兆) thoát thân, đào tẩu, chạy trốn.",
    illustration: {
      badge: "🏃💨",
      concept: "Chạy trốn hiểm nguy",
      visualDesc: "Chú thỏ nhanh thoăn thoắt phóng vụt vào bụi rậm trốn thoát khỏi móng vuốt đại bàng."
    }
  },
  "途": {
    components: ["辶", "余"],
    equation: "辶 (con đường thiên lý) + 余 (quán trọ dừng chân nghỉ giữa đường)",
    mnemonic: "Bước đi trên con đường dài ngàn dặm (辶) dừng chân ghé quán trọ bên đường (余), dọc đường, tiền đồ.",
    illustration: {
      badge: "🛤️",
      concept: "Dọc đường hành trình",
      visualDesc: "Con đường dài thẳng tắp dẫn tới chân trời rực nắng trong chuyến hành trình."
    }
  },
  "速": {
    components: ["辶", "束"],
    equation: "辶 (bước chân lướt gió) + 束 (buộc gọn hành lý không vướng víu)",
    mnemonic: "Gói ghém hành lý buộc gọn gàng gạt bỏ vướng bận (束), cất bước chân phóng nhanh thoăn thoắt (辶), tốc độ nhanh chóng.",
    illustration: {
      badge: "⚡",
      concept: "Tốc độ phi thường",
      visualDesc: "Tàu cao tốc Shinkansen lướt như tia chớp xuyên qua các cánh đồng hoa."
    }
  },
  "連": {
    components: ["辶", "車"],
    equation: "辶 (chuyển động di chuyển) + 車 (đoàn xe nối đuôi nhau rầm rộ)",
    mnemonic: "Đoàn xe ngựa (車) nối đuôi nhau lăn bánh dài dằng dặc trên đường thiên lý (辶), liên kết, liên tiếp không đứt đoạn.",
    illustration: {
      badge: "🔗",
      concept: "Nối liền mắt xích",
      visualDesc: "Chuỗi mắt xích liên kết bền chặt tạo nên sự gắn bó không thể tách rời."
    }
  },
  "進": {
    components: ["辶", "隹"],
    equation: "辶 (bước chân đi) + 隹 (loài chim luôn sải cánh bay thẳng tới)",
    mnemonic: "Như cánh chim nhỏ (隹) chỉ biết lao mình bay thẳng về phía trước (辶), không bao giờ lùi bước, tiến bộ tiến lên.",
    illustration: {
      badge: "⏩",
      concept: "Tiến bước về phía trước",
      visualDesc: "Mũi tên kép tiến lên phía trước biểu thị đà tiến bộ không ngừng."
    }
  },
  "遅": {
    components: ["辶", "尸", "羊"],
    equation: "辶 (bước đi lững thững) + dáng điệu chậm chạp nặng nề",
    mnemonic: "Bước chân đi chậm chạp lề mề từng bước một trên đường (辶), đến nơi trễ hẹn muộn màng, trì trệ.",
    illustration: {
      badge: "🐢",
      concept: "Rùa bò chậm chạp",
      visualDesc: "Chú rùa chậm rãi thong dong bò từng bước nhỏ trên bãi cát."
    }
  },
  "遊": {
    components: ["辶", "方", "𠂉", "子"],
    equation: "Cầm lá cờ phất phới dẫn đầu đứa trẻ (子) rong chơi khắp ngả đường (辶)",
    mnemonic: "Cầm lá cờ dẫn đoàn trẻ thơ thảnh thơi dạo bước ngắm cảnh sông núi (辶), ngao du vui chơi thỏa thích.",
    illustration: {
      badge: "🎡",
      concept: "Khu vui chơi rực rỡ",
      visualDesc: "Vòng đu quay khổng lồ rực rỡ sắc màu trong công viên giải trí tràn ngập tiếng cười."
    }
  },
  "過": {
    components: ["辶", "咼"],
    equation: "辶 (bước chân đi lướt qua) + 咼 (cửa ải quanh co hiểm trở)",
    mnemonic: "Bước chân băng qua khỏi cửa ải hiểm trở (咼), để lại chặng đường phía sau lưng, quá khứ trôi qua, vượt quá.",
    illustration: {
      badge: "⏳",
      concept: "Thời gian trôi qua",
      visualDesc: "Dòng cát chảy êm đềm qua cổ hẹp đồng hồ cát biểu thị thời gian trôi qua."
    }
  },
  "達": {
    components: ["辶", "土", "羊"],
    equation: "辶 (con đường hanh thông) + cừu con sinh nở suôn sẻ thuận lợi",
    mnemonic: "Con đường bước đi hanh thông không trắc trở, vươn tới chạm tay vào thành công rực rỡ, thành đạt, đạt được.",
    illustration: {
      badge: "🎯",
      concept: "Đạt tới mục tiêu",
      visualDesc: "Mũi tên cắm thẳng hồng tâm vỡ òa niềm vui đạt được thành tích mơ ước."
    }
  },
  "違": {
    components: ["辶", "韋"],
    equation: "辶 (bước chân đi) + 韋 (hai chân bước ngược chiều nhau)",
    mnemonic: "Bước chân đi chệch khỏi con đường quy định (韋), tạo nên sự sai lệch, khác biệt và vi phạm.",
    illustration: {
      badge: "🔀",
      concept: "Khác biệt rẽ lối",
      visualDesc: "Hai mũi tên rẽ sang hai hướng ngược nhau biểu thị sự khác biệt rõ rệt."
    }
  },
  "遠": {
    components: ["辶", "土", "口", "𧘇"],
    equation: "辶 (bước chân ngàn dặm) + tà áo dài phủ bước đường thiên lý",
    mnemonic: "Khoác áo dài dấn bước chân đi mãi về phía chân trời mờ ảo xa xăm (辶), khoảng cách xa xôi diệu vợi.",
    illustration: {
      badge: "🏔️",
      concept: "Dãy núi xa xăm",
      visualDesc: "Dãy núi phủ tuyết trắng xóa mờ ảo ẩn hiện ở tận chân trời xa tít tắp."
    }
  },
  "適": {
    components: ["辶", "啇"],
    equation: "辶 (bước chân tìm đến) + nơi đất lành chim đậu thích hợp",
    mnemonic: "Bước chân tìm đến đúng mảnh đất màu mỡ phù hợp để an cư, vừa vặn thích hợp và thích ứng mọi hoàn cảnh.",
    illustration: {
      badge: "🧩",
      concept: "Khớp vừa vặn thích hợp",
      visualDesc: "Mảnh ghép xếp hình đặt vừa khít vào vị trí trống tạo nên bức tranh trọn vẹn."
    }
  },
  "選": {
    components: ["辶", "巳", "巳", "共"],
    equation: "辶 (bước tới xem xét) + hai bên đối sánh tuyển chọn người ưu tú",
    mnemonic: "Bước tới xem xét tỉ mỉ từng đối tượng ứng tuyển (巽), chọn lọc ra người xuất sắc nhất, tuyển chọn tuyển cử.",
    illustration: {
      badge: "🗳️",
      concept: "Hòm phiếu tuyển cử",
      visualDesc: "Lá phiếu bầu cử được bỏ ngay ngắn vào hòm phiếu chọn người tài đức."
    }
  },
  "部": {
    components: ["立", "口", "阝"],
    equation: "咅 (phân định ranh giới) + 阝 (vùng đất thị trấn riêng biệt)",
    mnemonic: "Phân chia ranh giới thị trấn thành từng khu vực quản lý riêng biệt (阝), tạo thành từng phòng ban, bộ phận.",
    illustration: {
      badge: "🧩",
      concept: "Bộ phận cấu thành",
      visualDesc: "Từng mảnh ghép khối lego gắn kết lại tạo nên mô hình hoàn chỉnh."
    }
  },
  "都": {
    components: ["耂", "日", "阝"],
    equation: "者 (muôn dân người tài tề tựu) + 阝 (tòa thành lũy nguy nga)",
    mnemonic: "Tòa thành lũy kiên cố (阝) nơi nhân tài bốn phương tề tựu đông đúc sinh sống (者), chính là thủ đô, đô thị.",
    illustration: {
      badge: "🏙️",
      concept: "Đô thị phồn hoa",
      visualDesc: "Toàn cảnh thủ đô hiện đại với tháp Tokyo rực sáng lung linh giữa trời đêm."
    }
  },
  "配": {
    components: ["酉", "己"],
    equation: "酉 (vò rượu ngon) + 己 (người chia đều từng chén cho mọi người)",
    mnemonic: "Mở vò rượu quý (酉) nghiêng bình rót chia đều cho từng tân khách trong bữa tiệc, phân phối, phối hợp.",
    illustration: {
      badge: "🚚",
      concept: "Giao hàng phân phối",
      visualDesc: "Xe tải giao hàng tỏa đi khắp các nẻo đường phân phối hàng hóa kịp thời."
    }
  },
  "酒": {
    components: ["氵", "酉"],
    equation: "氵 (những giọt rượu nồng) + 酉 (vò gốm ủ men gạo)",
    mnemonic: "Từ chiếc vò ủ men gạo lâu năm (酉) cất ra những giọt rượu thơm nồng sóng sánh (氵), chén rượu nồng ấm.",
    illustration: {
      badge: "🍶",
      concept: "Bình rượu Sake",
      visualDesc: "Bình gốm rượu sake thanh nhã bên cạnh hai chén nhỏ đặt trên khay gỗ."
    }
  },
  "閉": {
    components: ["門", "才"],
    equation: "門 (hai cánh cửa lớn) + 才 (cài then chốt chắn ngang)",
    mnemonic: "Khép chặt hai cánh cửa lớn (門) rồi cài then chốt ngang lại, đóng kín cổng, bế mạc an toàn.",
    illustration: {
      badge: "🔒",
      concept: "Cánh cổng khép chặt",
      visualDesc: "Cánh cổng gỗ đồ sộ cài then then sắt khép chặt bảo vệ an toàn."
    }
  },
  "関": {
    components: ["門", "关"],
    equation: "門 (hai cánh cổng thành ải) + 关 (hai then chốt cài chéo giữ chặt)",
    mnemonic: "Cửa ải kiên cố nơi cổng thành (門) có chốt then cài chắc chắn, kiểm soát lối qua lại và mối liên quan.",
    illustration: {
      badge: "⛩️",
      concept: "Cửa ải biên cương",
      visualDesc: "Cửa ải thành quách cổ kính sừng sững trên đỉnh đèo lộng gió."
    }
  },
  "阪": {
    components: ["阝", "反"],
    equation: "阝 (sườn núi đồi đất) + 反 (dốc thoai thoải nghiêng nghiêng)",
    mnemonic: "Con dốc đất thoai thoải men theo sườn đồi (阝 反), nơi hình thành vùng đất Osaka (大阪) sầm uất.",
    illustration: {
      badge: "🏯",
      concept: "Thành cổ Osaka",
      visualDesc: "Lâu đài thành cổ Osaka uy nghiêm trên gò đất cao rực rỡ hoa anh đào."
    }
  },
  "降": {
    components: ["阝", "夅"],
    equation: "阝 (bậc thang đồi cao) + 夅 (hai bàn chân từng bước bước xuống thấp)",
    mnemonic: "Từng bước chân bước xuống từ vách đồi dốc cao (阝), tuyết mưa rơi xuống đất, bước xuống xe.",
    illustration: {
      badge: "🌧️",
      concept: "Cơn mưa rào trút xuống",
      visualDesc: "Những hạt mưa rào trong veo tuôn rơi từ tầng mây mát rượi xuống cỏ cây."
    }
  },
  "限": {
    components: ["阝", "艮"],
    equation: "阝 (bờ tường rào ngăn cách) + 艮 (dừng bước kiên định không vượt qua)",
    mnemonic: "Bờ rào thành lũy dựng lên (阝) buộc người bộ hành phải dừng bước không được vượt qua, ranh giới hạn mức.",
    illustration: {
      badge: "🛑",
      concept: "Vạch mức giới hạn",
      visualDesc: "Vạch kẻ đỏ ranh giới quy định dừng chân an toàn không vượt mức."
    }
  },
  "除": {
    components: ["阝", "余"],
    equation: "阝 (bậc thềm cửa) + quét dọn những thứ dư thừa (余) ra khỏi nhà",
    mnemonic: "Quét sạch rác rưởi đồ vật dư thừa (余) xuống khỏi bậc thềm hiên nhà (阝), loại bỏ, trừ khử điều phiền toái.",
    illustration: {
      badge: "🧹",
      concept: "Quét dọn trừ bỏ",
      visualDesc: "Cây chổi quét sạch lá rụng bụi bẩn mang lại sự thanh tịnh cho khuôn viên."
    }
  },
  "険": {
    components: ["阝", "僉"],
    equation: "阝 (sườn dốc núi đá) + mọi người cùng bước rón rén cẩn trọng",
    mnemonic: "Đoạn đường núi đá cheo leo dựng đứng bên mép vực (阝), hiểm trở gập ghềnh chứa đầy nguy hiểm.",
    illustration: {
      badge: "⚠️",
      concept: "Vực sâu hiểm trở",
      visualDesc: "Vách đá dựng đứng cheo leo hiểm trở thách thức mọi tay leo núi dũng cảm."
    }
  },
  "陽": {
    components: ["阝", "日", "一", "勿"],
    equation: "阝 (sườn đồi) + 昜 (mặt trời rọi muôn tia nắng ấm áp xuống)",
    mnemonic: "Sườn đồi thoai thoải (阝) đón trọn ánh nắng mặt trời rực rỡ ấm áp chiếu soi (昜), biểu thị thái dương, ánh sáng.",
    illustration: {
      badge: "☀️",
      concept: "Ánh nắng thái dương",
      visualDesc: "Ánh nắng mặt trời vàng rực chan hòa xua tan sương giá khắp thung lũng."
    }
  },
  "際": {
    components: ["阝", "祭"],
    equation: "阝 (vách thành biên giới) + 祭 (lập bàn thờ tế lễ kết nối giao hảo)",
    mnemonic: "Lập đàn tế thần (祭) ngay tại ranh giới biên cương (阝) giao hảo hai nước, tạo nên mối quan hệ quốc tế, nhân dịp.",
    illustration: {
      badge: "🌐",
      concept: "Giao hảo quốc tế",
      visualDesc: "Cờ các nước tung bay bên bờ biên giới giao thoa văn hóa hữu nghị."
    }
  },
  "雑": {
    components: ["九", "木", "隹"],
    equation: "Đàn chim sẻ đủ mọi loài (隹) đậu ríu rít xôn xao trên chín cành cây (九 木)",
    mnemonic: "Đủ mọi giống loài chim (隹) cùng đậu chen chúc hót líu lo trên cành cây (木), tạo nên khung cảnh hỗn tạp, phức tạp.",
    illustration: {
      badge: "🎨",
      concept: "Muôn màu phức tạp",
      visualDesc: "Bảng pha trộn nhiều gam màu phong phú tạo nên bức tranh đa sắc thái."
    }
  },
  "難": {
    components: ["廿", "口", "夫", "隹"],
    equation: "Chú chim nhỏ (隹) mắc kẹt trong vùng đất bùn khô cằn (堇) khó vỗ cánh",
    mnemonic: "Chú chim (隹) sa vào bãi đất sình lầy khó lòng cất cánh bay lên, tình thế vô cùng khó khăn gian nan.",
    illustration: {
      badge: "🧗",
      concept: "Vượt qua gian nan",
      visualDesc: "Vận động viên kiên cường bám trụ vượt qua đoạn dốc đá nan giải."
    }
  },
  "雪": {
    components: ["雨", "ヨ"],
    equation: "雨 (Vũ - mưa đông lạnh) + ヨ (bàn tay nắm bông xốp trắng ngần)",
    mnemonic: "Cơn mưa đông lạnh giá ngưng tụ thành từng bông tuyết trắng xốp (雨) rơi đầy có thể dùng tay vốc lại (ヨ).",
    illustration: {
      badge: "❄️",
      concept: "Bông tuyết trắng tinh",
      visualDesc: "Bông hoa tuyết lục giác trắng tinh khôi lấp lánh rơi trên bàn tay ấm."
    }
  },
  "静": {
    components: ["青", "争"],
    equation: "青 (Thanh - màu xanh trong trẻo) + chấm dứt mọi tranh giành (争)",
    mnemonic: "Giữ tâm hồn trong sáng xanh biếc (青) không màng tranh đua thị phi (争), trả lại không gian yên tĩnh thanh tịnh.",
    illustration: {
      badge: "🤫",
      concept: "Thanh tịnh an yên",
      visualDesc: "Mặt hồ tĩnh lặng soi bóng ngôi chùa cổ giữa rừng trúc xanh rì rào."
    }
  },
  "非": {
    components: ["非"],
    equation: "Hai hàng lông cánh dang ngược chiều nhau rẽ đôi ngả",
    mnemonic: "Hai cánh chim rẽ ngược chiều đối nghịch không cùng chung chí hướng, biểu thị sự sai trái, phi thường, bất đồng.",
    illustration: {
      badge: "❌",
      concept: "Phi lý sai lệch",
      visualDesc: "Dấu gạch chéo đỏ biểu thị điều phi lý cần được loại trừ sửa chữa."
    }
  },
  "面": {
    components: ["一", "自", "囗"],
    equation: "Khung mặt tròn viền quanh sống mũi (自) và đôi mắt",
    mnemonic: "Đường viền khuôn mặt bao quanh chiếc mũi (自) ngay chính diện, biểu thị gương mặt và bề mặt tiếp xúc.",
    illustration: {
      badge: "🎭",
      concept: "Mặt nạ diện mạo",
      visualDesc: "Chiếc mặt nạ kịch nghệ Noh Nhật Bản khắc họa diện mạo thanh tao tinh tế."
    }
  },
  "靴": {
    components: ["革", "化"],
    equation: "革 (tấm da bò thuộc dẻo dai) + 化 (bàn tay thợ biến hóa thành hình)",
    mnemonic: "Tấm da thuộc dẻo dai (革) qua bàn tay người thợ đóng giày biến hóa (化) thành đôi giày da êm ái nâng niu bàn chân.",
    illustration: {
      badge: "👞",
      concept: "Đôi giày da bóng loáng",
      visualDesc: "Đôi giày da Oxford buộc dây sang trọng đặt trên thềm gỗ sáng bóng."
    }
  },
  "頂": {
    components: ["丁", "頁"],
    equation: "Đinh (丁 điểm cao nhất chóp nhọn) + Hiệt (頁 cái đầu)",
    mnemonic: "Điểm chóp nhọn cao nhất nằm ngay trên đỉnh đầu (頁), biểu thị đỉnh núi, đỉnh cao chót vót và xin nhận.",
    illustration: {
      badge: "⛰️",
      concept: "Chóp đỉnh Phú Sĩ",
      visualDesc: "Đỉnh ngọn núi Phú Sĩ tuyết phủ trắng xóa vươn cao chạm tới tầng mây."
    }
  },
  "頭": {
    components: ["豆", "頁"],
    equation: "豆 (chiếc bình gốm tròn chứa trí tuệ) + 頁 (khuôn mặt và đỉnh đầu)",
    mnemonic: "Chiếc đầu tròn trịa (頁) như bình ngọc chứa đựng trí tuệ vô biên (豆), chỉ cái đầu và người dẫn đầu.",
    illustration: {
      badge: "🧠",
      concept: "Bộ óc thông thái",
      visualDesc: "Cái đầu ngẩng cao với vầng sáng trí tuệ tỏa rạng rỡ suy nghĩ sáng tạo."
    }
  },
  "頼": {
    components: ["束", "頁"],
    equation: "Bó chặt mối liên kết tin cậy (束) + 頁 (khuôn mặt hướng về)",
    mnemonic: "Gửi gắm niềm tin bền chặt như dây buộc (束) hướng về người đáng kính (頁), nương tựa và cậy nhờ giúp đỡ.",
    illustration: {
      badge: "🤝",
      concept: "Trông cậy gửi gắm",
      visualDesc: "Hai bàn tay nắm chặt trao gửi niềm tin tưởng và sự trông cậy vững chắc."
    }
  },
  "顔": {
    components: ["彦", "頁"],
    equation: "Ngạn (người tài hoa rạng ngời) + 頁 (khuôn mặt)",
    mnemonic: "Khuôn mặt rạng rỡ phong thái đĩnh đạc (頁) của bậc tài hoa tuấn tú, biểu thị gương mặt và nét nhan sắc.",
    illustration: {
      badge: "😊",
      concept: "Nụ cười rạng rỡ nhan sắc",
      visualDesc: "Khuôn mặt thanh tú nở nụ cười rạng rỡ tươi tắn như đóa hoa mai."
    }
  },
  "願": {
    components: ["原", "頁"],
    equation: "Nguyên (tâm nguyện từ đáy lòng chân thật) + 頁 (cúi đầu chắp tay cầu xin)",
    mnemonic: "Cúi đầu thành kính (頁) gửi gắm ước nguyện chân thành từ tận đáy lòng sâu kín (原), cầu mong điều tốt lành.",
    illustration: {
      badge: "🎋",
      concept: "Thẻ ước nguyện Tanabata",
      visualDesc: "Tấm thẻ giấy ngũ sắc ghi điều ước treo rung rinh trên cành trúc ngày lễ Tanabata."
    }
  },
  "類": {
    components: ["米", "犬", "頁"],
    equation: "Quan sát từng hạt lúa (米) và muôn thú (犬) để đầu óc (頁) phân loại rõ ràng",
    mnemonic: "Dùng trí tuệ (頁) phân định tỉ mỉ từng giống lúa (米) và từng loài thú (犬) theo chủng loại rành mạch.",
    illustration: {
      badge: "🏷️",
      concept: "Phân loại ngăn nắp",
      visualDesc: "Những chiếc nhãn màu phân chia các tài liệu vào từng ngăn loại chuẩn xác."
    }
  },
  "飛": {
    components: ["飞", "飞"],
    equation: "Chữ tượng hình đôi cánh chim sải dài lượn trong gió",
    mnemonic: "Đôi cánh lông vũ dang rộng đón luồng gió nâng bổng thân mình bay vút vào nền trời xanh, bay lượn phi hành.",
    illustration: {
      badge: "✈️",
      concept: "Chiếc máy bay sải cánh",
      visualDesc: "Chiếc máy bay sải rộng đôi cánh bạc bay vút qua biển mây trắng bồng bềnh."
    }
  },
  "首": {
    components: ["首"],
    equation: "Chữ tượng hình chiếc đầu với mái tóc bờm và phần cổ nâng đỡ",
    mnemonic: "Chiếc đầu vươn cao trên cổ quan sát bốn phương, biểu thị chiếc cổ và người đứng đầu, thủ đô.",
    illustration: {
      badge: "🦒",
      concept: "Chiếc cổ cao kiêu hãnh",
      visualDesc: "Bức tượng chú hươu vươn cao cổ kiêu hãnh ngắm nhìn bình minh."
    }
  },
  "馬": {
    components: ["馬"],
    equation: "Chữ tượng hình đầu ngựa, bờm tung gió và bốn vó ngựa phi nhanh (灬)",
    mnemonic: "Bờm dài tung bay trong gió, bốn móng guốc (灬) đạp đất phi nước đại thần tốc trên thảo nguyên bao la.",
    illustration: {
      badge: "🐎",
      concept: "Ngựa phi nước đại",
      visualDesc: "Chú tuấn mã phi nước đại dũng mãnh tung vó trên thảo nguyên xanh rực nắng."
    }
  },
  "髪": {
    components: ["髟", "犮"],
    equation: "Tiêu (chùm tóc đen mượt dài tha thướt) + tay chải chuốt gọn gàng",
    mnemonic: "Mái tóc dài óng ả mềm mại buông lơi qua vai được chải chuốt nâng niu, tạo nên suối tóc óng ả.",
    illustration: {
      badge: "💇",
      concept: "Mái tóc mượt mà",
      visualDesc: "Lược gỗ chải mượt mà trên suối tóc đen óng ả cài đóa hoa trà đỏ thắm."
    }
  }
};

const rootJsonPath = path.join(__dirname, '../kanji_full_database.json');
const publicJsonPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootJsPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicJsonPath, 'utf8'));

let count = 0;
for (const [char, patch] of Object.entries(n3dData)) {
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

console.log(`[Batch 3D - N3 Part 4] Đã cập nhật thành công ${count} / ${Object.keys(n3dData).length} chữ Kanji N3.`);

fs.writeFileSync(publicJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsPath, 'window.KANJI_FULL_DATABASE = ' + JSON.stringify(db, null, 2) + ';\n', 'utf8');
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
