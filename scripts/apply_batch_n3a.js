const fs = require('fs');
const path = require('path');

const n3aData = {
  "与": {
    components: ["一", "丂"],
    equation: "Bàn tay đưa đồ vật trao cho người khác",
    mnemonic: "Bàn tay dang ra trao món quà quý cho người khác, nghĩa là trao tặng, ban cho.",
    illustration: {
      badge: "🎁",
      concept: "Trao tặng sẻ chia",
      visualDesc: "Đôi bàn tay trân trọng trao gói quà thắt nơ lụa thắm thiết."
    }
  },
  "両": {
    components: ["一", "冂", "山"],
    equation: "Chiếc cân thăng bằng hai bên đầu",
    mnemonic: "Chiếc đòn gánh thăng bằng chia đều gánh nặng sang hai bên, biểu thị cả hai, hai phía.",
    illustration: {
      badge: "⚖️",
      concept: "Hai đầu cân xứng",
      visualDesc: "Cán cân thăng bằng đồng đều hai đĩa cân đối xứng."
    }
  },
  "乗": {
    components: ["丿", "木"],
    equation: "Người trèo lên cành cây cao (木) ngắm cảnh",
    mnemonic: "Hai chân leo lên đứng vững chãi trên cành cây hoặc cỗ xe, nghĩa là cưỡi xe, leo lên tàu.",
    illustration: {
      badge: "🚆",
      concept: "Bước lên chuyến tàu",
      visualDesc: "Hành khách bước chân lên toa tàu cao tốc bắt đầu chuyến du hành."
    }
  },
  "予": {
    components: ["予"],
    equation: "Chữ tượng hình con thoi dệt lướt đi thoăn thoắt",
    mnemonic: "Con thoi đưa đường luồn sợi trước khi dệt tấm vải, biểu thị sự chuẩn bị trước, dự báo.",
    illustration: {
      badge: "🔮",
      concept: "Dự báo tương lai",
      visualDesc: "Quả cầu pha lê phản chiếu những tia sáng báo trước tương lai."
    }
  },
  "争": {
    components: ["⺈", "彐", "亅"],
    equation: "Hai bàn tay trên dưới cùng giằng một chiếc gậy",
    mnemonic: "Hai bàn tay cùng lúc nắm chặt giằng co chiếc que, biểu thị sự tranh giành, thi đua.",
    illustration: {
      badge: "🤼",
      concept: "Tranh đấu thi tài",
      visualDesc: "Hai võ sĩ thi đấu dốc hết sức mình trong trận tranh tài quyết liệt."
    }
  },
  "互": {
    components: ["一", "彑"],
    equation: "Hai ngàm móc lồng xoắn khít vào nhau",
    mnemonic: "Hai chiếc móc cài khít vào nhau không rời, biểu thị sự tương trợ, hỗ trợ lẫn nhau.",
    illustration: {
      badge: "🤝",
      concept: "Hỗ trợ lẫn nhau",
      visualDesc: "Hai bàn tay siết chặt thể hiện tinh thần đoàn kết giúp đỡ nhau."
    }
  },
  "亡": {
    components: ["亠", "𠃊"],
    equation: "Người bước vào góc khuất bóng tối",
    mnemonic: "Bóng người khuất dần sau góc tối không còn trông thấy nữa, biểu thị sự mất mát, qua đời.",
    illustration: {
      badge: "🕯️",
      concept: "Ngọn nến tàn khuất",
      visualDesc: "Ngọn nến lung linh dần tắt để lại làn khói mỏng hòa vào bóng tối."
    }
  },
  "交": {
    components: ["亠", "父"],
    equation: "Đầu (亠) + đôi chân bắt chéo qua lại",
    mnemonic: "Đôi chân bắt chéo nhau nhịp nhàng lúc giao hòa, biểu thị sự giao lưu, gặp gỡ, giao nhau.",
    illustration: {
      badge: "🔀",
      concept: "Giao thoa kết nối",
      visualDesc: "Hai dòng suối giao nhau hòa thành một dòng sông êm ả chảy ra biển."
    }
  },
  "他": {
    components: ["亻", "也"],
    equation: "亻 (Nhân - người) + 也 (Dã - con vật/cái khác lạ)",
    mnemonic: "Người (亻) xa lạ không cùng hội với mình (也), chính là người khác, kẻ khác.",
    illustration: {
      badge: "👥",
      concept: "Người khác phương xa",
      visualDesc: "Vị khách từ phương xa bước đến với hành trang lạ lẫm."
    }
  },
  "付": {
    components: ["亻", "寸"],
    equation: "亻 (Nhân - con người) + 寸 (Thốn - bàn tay trao tận nơi)",
    mnemonic: "Đưa tận tay (寸) người khác (亻) và đính kèm cẩn thận, biểu thị việc gắn vào, giao phó.",
    illustration: {
      badge: "🏷️",
      concept: "Dán nhãn đính kèm",
      visualDesc: "Tấm nhãn xinh xắn được đính kèm cẩn thận vào gói bưu kiện."
    }
  },
  "件": {
    components: ["亻", "牛"],
    equation: "亻 (Nhân - người) + 牛 (Ngưu - con trâu/phân chia đồ vật)",
    mnemonic: "Người (亻) đứng phân định từng con trâu bò (牛), chia rõ từng hạng mục sự việc, vụ án kiện.",
    illustration: {
      badge: "📁",
      concept: "Hồ sơ vụ việc",
      visualDesc: "Tập hồ sơ lưu trữ từng tài liệu vụ việc được xếp gọn gàng."
    }
  },
  "任": {
    components: ["亻", "壬"],
    equation: "亻 (Nhân - con người) + 壬 (Nhâm - gánh vác trọng trách)",
    mnemonic: "Con người (亻) đứng thẳng ghé vai gánh vác trọng trách lớn lao (壬), gánh vác nhiệm vụ.",
    illustration: {
      badge: "🎖️",
      concept: "Trọng trách nhiệm vụ",
      visualDesc: "Huy hiệu trách nhiệm trao cho người sẵn sàng gánh vác trọng trách."
    }
  },
  "伝": {
    components: ["亻", "云"],
    equation: "亻 (Nhân - người) + 云 (Vân - lời nói lan tỏa như mây)",
    mnemonic: "Người này (亻) truyền miệng cho người kia như mây gió lan xa (云), lưu truyền câu chuyện.",
    illustration: {
      badge: "📜",
      concept: "Lưu truyền sử sách",
      visualDesc: "Cuộn thư cổ truyền tay qua bao đời con cháu giữ trọn giá trị."
    }
  },
  "似": {
    components: ["亻", "以"],
    equation: "亻 (Nhân - con người) + 以 (Dĩ - lấy làm khuôn mẫu)",
    mnemonic: "Con người (亻) soi theo một khuôn thước chuẩn mực sẵn có (以) nên trông rất tương tự, giống nhau.",
    illustration: {
      badge: "👯",
      concept: "Hai nét tương đồng",
      visualDesc: "Hai bức tượng gốm đúc từ một khuôn giống hệt nhau từng đường nét."
    }
  },
  "位": {
    components: ["亻", "立"],
    equation: "亻 (Nhân - con người) + 立 (Lập - đứng thẳng)",
    mnemonic: "Chỗ con người (亻) đứng vững chãi trên mặt đất (立), biểu thị vị trí, chức vị và địa vị.",
    illustration: {
      badge: "📍",
      concept: "Vị trí chuẩn xác",
      visualDesc: "Ghim định vị màu đỏ cắm chuẩn xác ngay tâm điểm bản đồ."
    }
  },
  "余": {
    components: ["人", "一", "朩"],
    equation: "Mái nhà rơm trên chiếc cột trụ vững vàng",
    mnemonic: "Ngôi nhà có mái che cao ráo tích trữ lúa gạo đầy bồ, dư dả không lo thiếu thốn.",
    illustration: {
      badge: "🌾",
      concept: "Thóc gạo dư dả",
      visualDesc: "Kho thóc đầy ắp hạt vàng trĩu nặng biểu thị cuộc sống no đủ dư thừa."
    }
  },
  "例": {
    components: ["亻", "列"],
    equation: "亻 (Nhân - con người) + 列 (Liệt - xếp thành hàng lối)",
    mnemonic: "Con người (亻) xếp hàng lối ngay ngắn theo thứ tự mẫu mực (列), dùng làm tiền lệ, ví dụ chuẩn.",
    illustration: {
      badge: "💡",
      concept: "Ví dụ minh họa",
      visualDesc: "Biểu đồ trực quan sinh động minh họa rõ ràng cho một khái niệm mẫu."
    }
  },
  "供": {
    components: ["亻", "共"],
    equation: "亻 (Nhân - con người) + 共 (Cộng - hai tay cùng nâng lễ vật)",
    mnemonic: "Người (亻) hai tay thành kính nâng mâm lễ vật (共) dâng lên bàn thờ, cung phụng và chu cấp.",
    illustration: {
      badge: "🍱",
      concept: "Cung cấp bữa ăn",
      visualDesc: "Mâm cơm tươm tất được đôi tay chu đáo chuẩn bị cung cấp đầy đủ."
    }
  },
  "便": {
    components: ["亻", "更"],
    equation: "亻 (Nhân - con người) + 更 (Canh - cải cách, thay đổi)",
    mnemonic: "Con người (亻) biết sửa đổi lề lối cho ngày một tiện lợi, dễ dàng (更), mang lại sự tiện ích.",
    illustration: {
      badge: "🛵",
      concept: "Nhanh chóng tiện lợi",
      visualDesc: "Chiếc xe giao hàng luồn lách nhanh nhẹn đem lại sự thuận tiện tức thì."
    }
  },
  "係": {
    components: ["亻", "系"],
    equation: "亻 (Nhân - con người) + 系 (Hệ - mối dây tơ gắn kết)",
    mnemonic: "Sợi dây ràng buộc (系) nối kết giữa người với người (亻), chỉ sự liên hệ, người phụ trách.",
    illustration: {
      badge: "🔗",
      concept: "Mối nối liên kết",
      visualDesc: "Mắt xích sáng loáng gắn kết chặt chẽ hai đầu dây cáp bền bỉ."
    }
  },
  "信": {
    components: ["亻", "言"],
    equation: "亻 (Nhân - con người) + 言 (Ngôn - lời nói thốt ra)",
    mnemonic: "Lời nói (言) của một người chân chính (亻) phải giữ chữ tín hàng đầu, tạo sự tin cậy.",
    illustration: {
      badge: "✉️",
      concept: "Lá thư gửi trọn niềm tin",
      visualDesc: "Lá thư dán con tem trang nhã gửi gắm niềm tin yêu chân thành."
    }
  },
  "倒": {
    components: ["亻", "到"],
    equation: "亻 (Nhân - người) + 到 (Đáo - ngã chạm đến đất)",
    mnemonic: "Người (亻) bước hụt chân ngã nhào chạm đất (到), ngã đổ, đảo ngược tình thế.",
    illustration: {
      badge: "🎳",
      concept: "Con ki ngã đổ",
      visualDesc: "Những con ki bowling nghiêng ngả đổ rạp dưới cú ném chuẩn xác."
    }
  },
  "候": {
    components: ["亻", "丨", "矢"],
    equation: "亻 (Nhân - người lính gác) + rình mũi tên (矢) ngóng đợi",
    mnemonic: "Người lính (亻) giương cung ngóng trông từng cơn gió chuyển mùa và đợi lệnh (矢), chính là khí hậu, đợi chờ.",
    illustration: {
      badge: "🌦️",
      concept: "Khí hậu giao mùa",
      visualDesc: "Đám mây vừa buông cơn mưa rào lất phất vừa ló rạng ánh cầu vồng."
    }
  },
  "値": {
    components: ["亻", "直"],
    equation: "亻 (Nhân - người) + 直 (Trực - mắt nhìn ngay thẳng)",
    mnemonic: "Người (亻) công tâm nhìn thẳng thắn chính trực (直) để định mức giá thành, tạo nên giá trị đích thực.",
    illustration: {
      badge: "🏷️",
      concept: "Giá trị đích thực",
      visualDesc: "Bảng giá bằng gỗ mộc mạc khắc số thể hiện giá trị xứng đáng của món đồ."
    }
  },
  "偉": {
    components: ["亻", "韋"],
    equation: "亻 (Nhân - con người) + 韋 (Vi - sải bước bảo vệ quanh tường thành)",
    mnemonic: "Con người (亻) có tầm nhìn rộng mở che chở bảo bọc muôn dân khắp bốn cõi (韋), đó là bậc vĩ đại.",
    illustration: {
      badge: "🗽",
      concept: "Bậc vĩ nhân kiệt xuất",
      visualDesc: "Tượng đài nhân vật vĩ đại vươn cao sừng sững giữa bầu trời xanh."
    }
  },
  "側": {
    components: ["亻", "則"],
    equation: "亻 (Nhân - người) + 則 (Tắc - thước đo, lưỡi dao xẻ mép)",
    mnemonic: "Người (亻) đứng ở phần mép cạnh bên có vạch phân ranh (則), biểu thị phía bên, bên hông.",
    illustration: {
      badge: "📐",
      concept: "Góc nghiêng phía bên",
      visualDesc: "Góc nghiêng chiếc bàn gỗ lộ rõ đường viền tinh xảo ở phía bên."
    }
  },
  "偶": {
    components: ["亻", "禺"],
    equation: "亻 (Nhân - con người) + 禺 (pho tượng hình dáng người)",
    mnemonic: "Tạc bức tượng người (亻) trông giống người thật như ngẫu nhiên bắt gặp ngoài đời, tượng trưng cho ngẫu nhiên, số chẵn.",
    illustration: {
      badge: "🎲",
      concept: "Ngẫu nhiên kỳ ngộ",
      visualDesc: "Hai viên xúc xắc lăn dừng lại ở cùng một mặt điểm đầy kỳ ngộ."
    }
  },
  "備": {
    components: ["亻", "艹", "厂", "用"],
    equation: "亻 (Nhân - người lính) + bao tên đã xếp đủ để ứng chiến",
    mnemonic: "Người (亻) chuẩn bị đầy đủ các mũi tên và trang bị phòng vệ chu đáo, sẵn sàng cho mọi tình huống.",
    illustration: {
      badge: "🛡️",
      concept: "Chuẩn bị phòng bị",
      visualDesc: "Tấm khiên vững chắc và chiếc túi cứu hộ trang bị đầy đủ sẵn sàng."
    }
  },
  "働": {
    components: ["亻", "動"],
    equation: "亻 (Nhân - con người) + 動 (Động - hoạt động hăng say)",
    mnemonic: "Con người (亻) vận động tay chân làm việc hăng say (動), tạo ra của cải bằng sức lao động.",
    illustration: {
      badge: "👷",
      concept: "Lao động miệt mài",
      visualDesc: "Người công nhân chăm chú vận hành máy móc trong xưởng sản xuất hiện đại."
    }
  },
  "優": {
    components: ["亻", "憂"],
    equation: "亻 (Nhân - người diễn viên) + 憂 (tâm tư sâu lắng tinh tế)",
    mnemonic: "Người diễn viên (亻) biểu đạt cảm xúc tinh tế chạm tới lòng người (憂), biểu thị sự dịu dàng, ưu tú vượt bậc.",
    illustration: {
      badge: "🌟",
      concept: "Ưu tú xuất chúng",
      visualDesc: "Ngôi sao vàng rạng rỡ tỏa sáng trên đỉnh bảng vinh danh xuất sắc."
    }
  },
  "光": {
    components: ["⺌", "兀"],
    equation: "Đốm lửa sáng rực (⺌) trên đầu người dang chân (兀)",
    mnemonic: "Ngọn đuốc rực lửa nâng cao trên đầu người soi rọi bừng sáng không gian xung quanh.",
    illustration: {
      badge: "✨",
      concept: "Tia sáng rực rỡ",
      visualDesc: "Luồng sáng mặt trời chiếu xuyên qua kẽ lá lấp lánh như hạt pha lê."
    }
  },
  "全": {
    components: ["人", "王"],
    equation: "Mái che kín (人) giữ gìn viên ngọc bích (王) nguyên vẹn",
    mnemonic: "Bảo quản viên ngọc bích (王) kín kẽ dưới mái che (人), giữ trọn vẹn hoàn toàn không sứt mẻ.",
    illustration: {
      badge: "🌐",
      concept: "Toàn vẹn hoàn hảo",
      visualDesc: "Vòng tròn ngọc bích liền mạch không một vết nứt biểu thị sự toàn vẹn."
    }
  },
  "共": {
    components: ["艹", "八"],
    equation: "Hai bàn tay chụm lại cùng dâng món đồ",
    mnemonic: "Nhiều bàn tay chụm lại cùng nhau nâng một gánh nặng, chia sẻ cộng đồng cùng làm.",
    illustration: {
      badge: "🤝",
      concept: "Chung tay góp sức",
      visualDesc: "Những bàn tay nắm chặt kết thành vòng tròn đoàn kết gắn bó."
    }
  },
  "具": {
    components: ["目", "一", "八"],
    equation: "Đôi mắt quan sát (目) + dụng cụ nâng bằng hai tay (八)",
    mnemonic: "Đôi mắt tinh tường (目) kiểm tra kỹ lưỡng các dụng cụ cầm trên tay (八) xem đã đầy đủ đồ nghề chưa.",
    illustration: {
      badge: "🧰",
      concept: "Hộp đồ nghề đầy đủ",
      visualDesc: "Hộp đồ nghề bằng thép sáng bóng sắp xếp ngăn nắp từng chiếc kìm cờ lê."
    }
  },
  "内": {
    components: ["冂", "人"],
    equation: "Bước vào (人/入) bên dưới khung cửa (冂)",
    mnemonic: "Bước chân bước qua khung cửa (冂) tiến vào gian phòng, biểu thị phía bên trong, nội bộ.",
    illustration: {
      badge: "🏠",
      concept: "Bên trong gian phòng",
      visualDesc: "Căn phòng tatami ấm cúng nhìn từ khung cửa trượt gỗ mở hé."
    }
  },
  "冷": {
    components: ["冫", "令"],
    equation: "冫 (Băng - bông tuyết đóng băng) + 令 (tiếng gọi âm thanh lạnh lẽo)",
    mnemonic: "Từng giọt nước ngưng tụ thành tảng băng buốt giá (冫) trong tiếng gió rít từng hồi, lạnh buốt thấu xương.",
    illustration: {
      badge: "❄️",
      concept: "Băng tuyết lạnh giá",
      visualDesc: "Bông tuyết trắng tinh khôi kết tinh thành hoa băng trên mặt kính mờ sương."
    }
  },
  "処": {
    components: ["夂", "几"],
    equation: "Bàn chân bước tới (夂) chiếc ghế tựa (几) ngồi xuống",
    mnemonic: "Bước chân mỏi mệt tìm đến chiếc ghế gỗ (几) ngồi xuống định thần giải quyết công việc, an xử thỏa đáng.",
    illustration: {
      badge: "🪑",
      concept: "Ngồi xuống xử lý",
      visualDesc: "Chiếc ghế gỗ thanh tịnh bên bàn làm việc tĩnh tâm suy xét giải pháp."
    }
  },
  "列": {
    components: ["歹", "刂"],
    equation: "Mẩu xương dải thẳng (歹) + Dao rạch phân dòng (刂)",
    mnemonic: "Dùng dao (刂) phân chia các hàng thẻ xếp thẳng tắp ngay ngắn, tạo thành hàng lối, hàng ngũ.",
    illustration: {
      badge: "🧍‍♂️🧍‍♀️",
      concept: "Xếp hàng ngay ngắn",
      visualDesc: "Dòng người trật tự xếp hàng ngay ngắn bên thềm đón xe buýt."
    }
  },
  "初": {
    components: ["衤", "刀"],
    equation: "衤 (Y - sấp vải dệt) + 刀 (Đao - mũi kéo nhát cắt đầu tiên)",
    mnemonic: "Nhát kéo đầu tiên (刀) đặt lên sấp vải mới (衤) để may áo, biểu thị khởi đầu sơ khai.",
    illustration: {
      badge: "🌱",
      concept: "Khởi đầu sơ khai",
      visualDesc: "Mầm cây non vừa tách vỏ hạt hé lộ chiếc lá đầu tiên đón nắng mai."
    }
  },
  "判": {
    components: ["半", "刂"],
    equation: "半 (Bán - một nửa rõ ràng) + 刂 (Đao - nhát dao phân xử)",
    mnemonic: "Dùng nhát dao sắc bén (刂) rạch ròi đôi bên trắng đen (半), phân xử công minh và phán đoán.",
    illustration: {
      badge: "👨‍⚖️",
      concept: "Phán quyết công minh",
      visualDesc: "Chiếc búa thẩm phán gõ vang trên bục gỗ ban bố phán quyết rõ ràng."
    }
  },
  "利": {
    components: ["禾", "刂"],
    equation: "禾 (Hòa - bông lúa trĩu hạt) + 刂 (Đao - lưỡi liềm sắc bén)",
    mnemonic: "Lưỡi liềm sắc bén (刂) gặt nhanh những bông lúa chín vàng (禾), mang lại mùa màng bội thu có lợi.",
    illustration: {
      badge: "🌾",
      concept: "Thu hoạch có lợi",
      visualDesc: "Bó lúa vàng ươm thu hoạch rộn ràng mang về nguồn lợi kinh tế ấm no."
    }
  },
  "到": {
    components: ["至", "刂"],
    equation: "至 (Chí - mũi tên cắm đích) + 刂 (Đao - vạch đích sắc gọn)",
    mnemonic: "Mũi tên bay vút tới cắm phập vào vạch đích đến (至), biểu thị sự đến nơi, đạt tới đích.",
    illustration: {
      badge: "🎯",
      concept: "Đến đích thành công",
      visualDesc: "Bước chân chạm qua vạch đích đón nhận tràng pháo tay cổ vũ rộn ràng."
    }
  },
  "制": {
    components: ["未", "刂"],
    equation: "Cầm dao kéo (刂) cắt tỉa cành nhánh rậm rạp vào khuôn phép",
    mnemonic: "Dùng kéo sắt (刂) uốn tỉa cành cây theo khuôn mẫu nề nếp, định hình chế độ và quy chế.",
    illustration: {
      badge: "📜",
      concept: "Quy chế khuôn phép",
      visualDesc: "Bản hiệp ước in con dấu son đỏ quy định các điều khoản chế độ rõ ràng."
    }
  },
  "刻": {
    components: ["亥", "刂"],
    equation: "亥 (xương mai rùa dày) + 刂 (Đao - mũi dao trổ nét)",
    mnemonic: "Dùng mũi dao bén (刂) trổ từng nét chữ lên mai rùa xương thú (亥), ghi lại dấu ấn thời khắc.",
    illustration: {
      badge: "🕰️",
      concept: "Thời khắc quý giá",
      visualDesc: "Mũi đục tinh xảo chạm khắc hoa văn từng tích tắc trên mặt đồng hồ gỗ."
    }
  },
  "割": {
    components: ["害", "刂"],
    equation: "害 (chia vỡ) + 刂 (Đao - lưỡi dao xẻ đôi)",
    mnemonic: "Vung lưỡi dao bén (刂) xẻ chiếc bánh làm nhiều phần nhỏ, phân chia tỉ lệ rõ ràng.",
    illustration: {
      badge: "✂️",
      concept: "Cắt chia tỉ lệ",
      visualDesc: "Chiếc kéo cắt rời từng mảnh ghép theo đường nét đứt chuẩn xác."
    }
  },
  "加": {
    components: ["力", "口"],
    equation: "力 (Lực - sức lao động) + 口 (Khẩu - tiếng hô hào trợ lực)",
    mnemonic: "Miệng hò reo cổ vũ (口) tiếp thêm sức lực (力) cho nhau, gia tăng thêm sức mạnh to lớn.",
    illustration: {
      badge: "➕",
      concept: "Gia tăng thêm sức",
      visualDesc: "Dấu cộng rực rỡ tượng trưng cho sự gia tăng tích lũy và phát triển."
    }
  },
  "助": {
    components: ["且", "力"],
    equation: "且 (bệ đá nâng đỡ) + 力 (Lực - dốc sức tương trợ)",
    mnemonic: "Góp thêm sức mạnh (力) cùng kê bệ đá vững chãi (且), biểu thị sự giúp đỡ, viện trợ lẫn nhau.",
    illustration: {
      badge: "🆘",
      concept: "Giúp đỡ kịp thời",
      visualDesc: "Bàn tay dang rộng kéo người bạn vượt qua dốc đá gập ghềnh."
    }
  },
  "努": {
    components: ["奴", "力"],
    equation: "奴 (tận tâm miệt mài) + 力 (Lực - sức lực dồi dào)",
    mnemonic: "Dốc hết toàn bộ tâm sức và cơ bắp (力) không quản ngại gian khó, nỗ lực hết mình đạt mục tiêu.",
    illustration: {
      badge: "💪",
      concept: "Nỗ lực vươn lên",
      visualDesc: "Vận động viên dồn toàn bộ sức mạnh nâng bổng tạ sắt trong tiếng reo hò."
    }
  },
  "労": {
    components: ["冖", "火", "力"],
    equation: "Thắp đèn (đốm lửa) trong đêm thức khuya dốc sức lực (力)",
    mnemonic: "Dưới ánh đèn khuya chong sáng, người cần mẫn dốc sức lực (力) làm việc, tạo nên công lao to lớn.",
    illustration: {
      badge: "🛠️",
      concept: "Công lao cần cù",
      visualDesc: "Bàn tay thô ráp của người thợ cần mẫn chế tác từng chi tiết tinh xảo."
    }
  },
  "務": {
    components: ["矛", "攵", "力"],
    equation: "Cầm ngọn giáo (矛) luyện tập (攵) dùng hết sức lực (力)",
    mnemonic: "Cầm chắc ngọn giáo (矛) luyện binh nghiêm ngặt dốc sức (力) bảo vệ đất nước, tròn nghĩa vụ thiêng liêng.",
    illustration: {
      badge: "🛡️",
      concept: "Nghĩa vụ thiêng liêng",
      visualDesc: "Người lính đứng gác trang nghiêm bồng súng bảo vệ bình yên biên cương."
    }
  },
  "勝": {
    components: ["月", "龹", "力"],
    equation: "Nâng cao uy thế (phần trái và trên) + 力 (Lực - sức mạnh bứt phá)",
    mnemonic: "Dốc toàn bộ sức mạnh bứt phá (力) vượt lên dẫn đầu đoàn thuyền, giành chiến thắng vinh quang.",
    illustration: {
      badge: "🏆",
      concept: "Chiến thắng vang dội",
      visualDesc: "Chiếc cúp vàng rực rỡ giơ cao trong khúc ca chiến thắng huy hoàng."
    }
  },
  "勤": {
    components: ["堇", "力"],
    equation: "Đất bùn nhọc nhằn (堇) + 力 (Lực - sức lực không ngừng nghỉ)",
    mnemonic: "Không ngại bùn đất khó nhọc (堇), ngày ngày dốc sức lực (力) cày bừa làm việc cần cù, chuyên cần.",
    illustration: {
      badge: "🐝",
      concept: "Con ong chăm chỉ",
      visualDesc: "Chú ong mật cần mẫn gom từng giọt mật hoa ngọt ngào về tổ ấm."
    }
  },
  "化": {
    components: ["亻", "匕"],
    equation: "Người đứng thẳng (亻) đổi tư thế quay ngược đầu (匕)",
    mnemonic: "Hai người một đứng một lộn ngược, tượng trưng cho sự thay đổi biến hóa diệu kỳ của vạn vật.",
    illustration: {
      badge: "🦋",
      concept: "Biến hóa cánh bướm",
      visualDesc: "Kén tằm biến hóa lột xác thành chú bướm rực rỡ sắc màu bay lượn."
    }
  },
  "単": {
    components: ["丷", "日", "十"],
    equation: "Chiếc vợt bắt thú cán đơn sơ cầm một tay",
    mnemonic: "Chỉ cầm một chiếc vợt đơn sơ (丷 日 十) đi săn thú trong rừng, mộc mạc đơn thuần và đơn chiếc.",
    illustration: {
      badge: "1️⃣",
      concept: "Đơn thuần mộc mạc",
      visualDesc: "Một chiếc lá duy nhất trôi êm đềm trên mặt nước phẳng lặng."
    }
  },
  "危": {
    components: ["⺈", "厂", "厄"],
    equation: "Vách núi cheo leo (厂) + người ngồi run sợ (卩)",
    mnemonic: "Ngồi cheo leo sát mép vực thẳm đá dốc (厂) trong tư thế run sợ (卩), tình thế vô cùng nguy hiểm.",
    illustration: {
      badge: "⚠️",
      concept: "Hiểm nguy cận kề",
      visualDesc: "Biển cảnh báo tam giác vàng dựng bên bờ vực dốc đứng cheo leo."
    }
  },
  "原": {
    components: ["厂", "白", "小"],
    equation: "厂 (Vách núi dựng đứng) + 泉 (dòng suối nguồn trong vắt 白+小)",
    mnemonic: "Từ kẽ vách núi đá (厂) tuôn trào dòng suối nguồn trong vắt (泉), cội nguồn nguyên bản của vạn vật.",
    illustration: {
      badge: "💧",
      concept: "Suối nguồn tinh khiết",
      visualDesc: "Dòng suối nguồn trong vắt róc rách tuôn ra từ khe núi đá phủ rêu xanh."
    }
  },
  "参": {
    components: ["厶", "大", "彡"],
    equation: "Ba người tụ hội lại (厶 大) rực rỡ sắc màu (彡)",
    mnemonic: "Tề tựu đông đủ ba bên bốn bề cùng góp mặt chung vui, tham gia lễ hội rộn ràng.",
    illustration: {
      badge: "🎉",
      concept: "Tham gia hội ngộ",
      visualDesc: "Mọi người cùng hòa mình tham gia vào đêm hội hoa đăng rực rỡ sắc màu."
    }
  },
  "反": {
    components: ["厂", "又"],
    equation: "厂 (Vách núi) + 又 (Bàn tay lật ngược chiều)",
    mnemonic: "Bàn tay (又) bám vào vách núi rồi lật ngược úp lại, thể hiện sự quay lại, phản đối, phản xạ.",
    illustration: {
      badge: "↩️",
      concept: "Quay ngược đối kháng",
      visualDesc: "Mũi tên uốn cong quay ngược chiều lại với dòng chảy thông thường."
    }
  },
  "収": {
    components: ["丩", "攵"],
    equation: "丩 (dây buộc thắt gom bó) + 攵 (bàn tay gom lại)",
    mnemonic: "Bàn tay (攵) gom từng bó lúa rồi thắt dây buộc chặt (丩), thu hoạch mùa màng vào kho cất giữ.",
    illustration: {
      badge: "📥",
      concept: "Thu nhận gom góp",
      visualDesc: "Chiếc giỏ mây đầy ắp những trái chín mọng được thu hái cẩn thận."
    }
  },
  "取": {
    components: ["耳", "又"],
    equation: "耳 (Nhĩ - vành tai) + 又 (Hựu - bàn tay nắm lấy)",
    mnemonic: "Bàn tay (又) túm lấy vành tai (耳) của con thú săn được, biểu thị việc nắm lấy, thủ đắc.",
    illustration: {
      badge: "🤲",
      concept: "Nắm lấy thời cơ",
      visualDesc: "Đôi bàn tay nhanh nhạy nắm giữ lấy viên ngọc quý tỏa sáng."
    }
  },
  "受": {
    components: ["爫", "冖", "又"],
    equation: "Bàn tay trao xuống (爫) + bàn tay đón lấy (又)",
    mnemonic: "Bàn tay trên đưa món quà xuống, bàn tay dưới (又) dang ra đón nhận một cách ân cần, thụ nhận.",
    illustration: {
      badge: "📬",
      concept: "Đón nhận thư mừng",
      visualDesc: "Bàn tay vui mừng đón nhận phong bao thư chúc phúc từ phương xa."
    }
  },
  "可": {
    components: ["丁", "口"],
    equation: "Đinh (丁 nhát búa đóng cọc chuẩn) + Khẩu (口 lời tán thành)",
    mnemonic: "Lời nói thốt ra (口) chắc nịch như đóng đinh cọc gỗ (丁), biểu thị sự tán thành, có thể làm được.",
    illustration: {
      badge: "👌",
      concept: "Khả thi chấp thuận",
      visualDesc: "Cái gật đầu và dấu hiệu đồng ý biểu thị mọi việc đều khả thi tốt đẹp."
    }
  },
  "号": {
    components: ["口", "丂"],
    equation: "口 (Khẩu - miệng cất tiếng) + 丂 (âm vang uốn khúc dài)",
    mnemonic: "Miệng (口) thổi tiếng kèn tù và vang dội truyền hiệu lệnh (丂), đặt tên số hiệu cho từng đội.",
    illustration: {
      badge: "🎺",
      concept: "Tiếng kèn hiệu lệnh",
      visualDesc: "Chiếc kèn đồng sáng bóng cất vang tiếng hiệu lệnh triệu tập rộn ràng."
    }
  },
  "合": {
    components: ["人", "一", "口"],
    equation: "Chiếc nắp chụp (亼) đậy vừa khít miệng hũ (口)",
    mnemonic: "Chiếc nắp đậy vừa khít khìn khịt với miệng bình trà (口), tạo nên sự hài hòa phù hợp trọn vẹn.",
    illustration: {
      badge: "🧩",
      concept: "Mảnh ghép ăn khớp",
      visualDesc: "Hai mảnh ghép xếp hình ăn khớp hoàn hảo không một kẽ hở."
    }
  },
  "向": {
    components: ["丿", "冂", "口"],
    equation: "Khung vách nhà có ô cửa sổ đón gió (口) trông ra",
    mnemonic: "Từ ô cửa sổ nhỏ (口) trên vách nhà trông ra bốn phía chân trời, xác định phương hướng rõ ràng.",
    illustration: {
      badge: "🧭",
      concept: "La bàn chỉ hướng",
      visualDesc: "Kim la bàn xoay nhẹ rồi chỉ chuẩn xác về hướng Bắc trong hành trình."
    }
  },
  "君": {
    components: ["尹", "口"],
    equation: "Tay cầm quyền trượng chỉ huy + Khẩu (口 ban bố chỉ dụ)",
    mnemonic: "Người tay nắm quyền trượng miệng (口) ban bố điều lệnh công bằng, xưng hiệu quân vương, tôn kính gọi bạn.",
    illustration: {
      badge: "👑",
      concept: "Quân vương đạo mạo",
      visualDesc: "Vương miện vàng nạm ngọc uy nghiêm biểu tượng cho bậc minh quân."
    }
  },
  "否": {
    components: ["不", "口"],
    equation: "不 (Bất - chữ không) + 口 (Khẩu - miệng nói từ chối)",
    mnemonic: "Mở miệng (口) nói lời không chấp thuận (不), dứt khoát phủ định bác bỏ điều sai trái.",
    illustration: {
      badge: "❌",
      concept: "Bác bỏ phủ định",
      visualDesc: "Dấu gạch chéo đỏ dứt khoát từ chối phương án không hợp lệ."
    }
  },
  "吸": {
    components: ["口", "及"],
    equation: "口 (Khẩu - miệng ngậm) + 及 (vươn theo đón lấy luồng hơi)",
    mnemonic: "Mở miệng (口) hít một hơi thật sâu đón lấy sinh khí trong lành (及), hấp thụ năng lượng.",
    illustration: {
      badge: "🌬️",
      concept: "Hít thở dưỡng khí",
      visualDesc: "Lồng ngực hít căng luồng dưỡng khí trong lành giữa rừng thông bạt ngàn."
    }
  },
  "吹": {
    components: ["口", "欠"],
    equation: "口 (Khẩu - miệng chụm lại) + 欠 (hơi thở phì ra mạnh)",
    mnemonic: "Chụm đôi môi lại (口) lấy hơi thổi mạnh (欠) tắt ngọn nến mừng sinh nhật, làn gió mát thổi bay.",
    illustration: {
      badge: "💨",
      concept: "Thổi tắt ngọn nến",
      visualDesc: "Làn hơi ấm thổi bùng làm bay những cánh hoa bồ công anh lơ lửng."
    }
  },
  "告": {
    components: ["牛", "口"],
    equation: "Cặp sừng trâu gắn thanh chắn ngang + Khẩu (口 lời cảnh báo)",
    mnemonic: "Buộc thanh gỗ ngang sừng trâu (牛) rồi mở miệng báo cáo (口) cho mọi người biết để tránh nguy hiểm.",
    illustration: {
      badge: "📢",
      concept: "Thông cáo rộng rãi",
      visualDesc: "Chiếc loa phát thanh vang lên bản tin thông báo tin vui tới dân làng."
    }
  },
  "呼": {
    components: ["口", "乎"],
    equation: "口 (Khẩu - miệng) + 乎 (hơi thở cất tiếng vang xa)",
    mnemonic: "Mở rộng khuôn miệng (口) cất tiếng kêu gọi lớn ngân vang khắp núi đồi (乎), hô hào mọi người tề tựu.",
    illustration: {
      badge: "🗣️",
      concept: "Cất tiếng gọi to",
      visualDesc: "Người đứng trên đỉnh đồi đưa tay làm loa cất tiếng gọi vang dội."
    }
  },
  "命": {
    components: ["亼", "卩", "口"],
    equation: "Lệnh (lời vua ban) khắc ghi vào từng số phận con người (卩/口)",
    mnemonic: "Lời mệnh lệnh thiêng liêng (令) truyền qua miệng (口) quyết định sinh mệnh và sứ mệnh đời người.",
    illustration: {
      badge: "📜",
      concept: "Chiếu chỉ sứ mệnh",
      visualDesc: "Chiếu chỉ cuộn lụa vàng khắc chữ son giao phó sứ mệnh cao cả."
    }
  },
  "和": {
    components: ["禾", "口"],
    equation: "禾 (Hòa - cây lúa vàng) + 口 (Khẩu - miệng ấm no sum vầy)",
    mnemonic: "Mọi người đều có lúa gạo (禾) nuôi sống miệng ăn (口), thiên hạ ấm no ắt thái bình hòa hợp.",
    illustration: {
      badge: "🕊️",
      concept: "Chim bồ câu hòa bình",
      visualDesc: "Cánh chim bồ câu trắng ngậm cành ô liu chao lượn trên nền trời thanh bình."
    }
  },
  "商": {
    components: ["亠", "丷", "冂", "口"],
    equation: "Gian hàng lều chợ (亠 冂) bên dưới có miệng trả giá (口)",
    mnemonic: "Dưới mái quầy hàng chợ (亠 冂), người mua kẻ bán mở miệng trả giá (口), tấp nập giao thương.",
    illustration: {
      badge: "🏪",
      concept: "Giao thương phố chợ",
      visualDesc: "Phố buôn bán sầm uất với các quầy hàng rực rỡ lồng đèn chào mời khách."
    }
  },
  "喜": {
    components: ["士", "口", "䒑", "口"],
    equation: "Trống gõ tưng bừng mừng điềm lành cát tường (吉) + miệng cười rạng rỡ (口)",
    mnemonic: "Tiếng trống hội rộn rã bên miệng cười toe toét (口) đón chào ngày vui hân hoan, đại hỷ.",
    illustration: {
      badge: "🎉",
      concept: "Hân hoan ngày hỷ",
      visualDesc: "Pháo hoa giấy bung tỏa rực rỡ chào đón tin mừng đại hỷ."
    }
  },
  "回": {
    components: ["囗", "口"],
    equation: "Vòng vuông lớn bao bọc vòng vuông nhỏ bên trong",
    mnemonic: "Dòng nước xoáy tròn cuộn vòng quay lại nơi khởi phát, biểu thị sự luân hồi, trở về chốn xưa.",
    illustration: {
      badge: "🔄",
      concept: "Vòng xoay trở lại",
      visualDesc: "Chiếc boomerang bay một vòng cung ngoạn mục rồi quay về đúng tay người ném."
    }
  },
  "因": {
    components: ["囗", "大"],
    equation: "Người nằm duỗi chân (大) trọn vẹn trên chiếc đệm (囗)",
    mnemonic: "Người dựa vào chiếc chiếu êm (囗 大) làm chỗ nương tựa, biểu thị duyên cớ nảy sinh, nguyên nhân.",
    illustration: {
      badge: "🌱",
      concept: "Hạt mầm căn nguyên",
      visualDesc: "Hạt mầm nằm sâu trong lòng đất ủ ấm chính là nguyên nhân đâm chồi xanh biếc."
    }
  },
  "困": {
    components: ["囗", "木"],
    equation: "Cây xanh (木) bị nhốt kín trong bốn bức tường ngột ngạt (囗)",
    mnemonic: "Cây lớn (木) bị vây kín mít trong bốn bức tường chật hẹp (囗) không cất nhánh được, lâm vào cảnh khốn đốn.",
    illustration: {
      badge: "😣",
      concept: "Bế tắc khốn khó",
      visualDesc: "Cành cây vươn tìm ánh sáng qua kẽ hẹp của bức tường rào đá kiên cố."
    }
  },
  "園": {
    components: ["囗", "土", "口", "𧘇"],
    equation: "Hàng rào bao quanh (囗) che chắn mảnh đất hoa cỏ tốt tươi",
    mnemonic: "Hàng rào (囗) bao bọc mảnh vườn hoa trái xum xuê có lối đi uốn lượn, chính là hoa viên, công viên.",
    illustration: {
      badge: "🏡",
      concept: "Khu vườn hoa trái",
      visualDesc: "Khu vườn kiểu Nhật với thảm rêu xanh, hòn non bộ và hoa anh đào nở rộ."
    }
  },
  "在": {
    components: ["𠂇", "丨", "土"],
    equation: "Mầm xanh cắm rễ vào mảnh đất mẹ (土)",
    mnemonic: "Mầm cây bén rễ sâu vững chắc trên nền đất phì nhiêu (土), khẳng định sự sống đang hiện hữu, tồn tại.",
    illustration: {
      badge: "📍",
      concept: "Hiện diện tại đây",
      visualDesc: "Dấu ghim xanh đánh dấu vị trí đang có mặt hiện tại trên bản đồ du lịch."
    }
  },
  "報": {
    components: ["幸", "𠬝"],
    equation: "Bàn tay cầm hồ sơ xử tội (phần phải) + tuyên bố trước phạm nhân (幸)",
    mnemonic: "Tuyên đọc bản phán quyết rõ ràng trước phạm nhân, từ đó mở rộng nghĩa thành báo cáo tin tức, báo đáp ơn nghĩa.",
    illustration: {
      badge: "📰",
      concept: "Bản tin thời sự",
      visualDesc: "Tờ báo in thơm mùi mực mới đưa tin tức thời sự sốt dẻo mỗi buổi sáng."
    }
  },
  "増": {
    components: ["土", "曽"],
    equation: "土 (Thổ - mô đất) + 曽 (chồng chất từng tầng lớp)",
    mnemonic: "Đắp thêm đất (土) tầng tầng lớp lớp lên cao (曽), làm cho bờ đê ngày một dày dặn và gia tăng.",
    illustration: {
      badge: "📈",
      concept: "Đồ thị tăng trưởng",
      visualDesc: "Đường biểu đồ dốc lên thẳng đứng biểu thị đà tăng trưởng mạnh mẽ vượt bậc."
    }
  },
  "声": {
    components: ["士", "冖", "𠮛"],
    equation: "Chiếc khánh đá treo vang lên âm hưởng khi gõ",
    mnemonic: "Gõ vào chiếc khánh đá treo phát ra tiếng ngân trong trẻo, biểu thị thanh âm, giọng nói con người.",
    illustration: {
      badge: "🔊",
      concept: "Âm thanh trong trẻo",
      visualDesc: "Chiếc loa phát ra những làn sóng âm thanh rộn ràng lan tỏa khắp không gian."
    }
  },
  "変": {
    components: ["亠", "丷", "冖", "夂"],
    equation: "Đầu óc suy nghĩ rối ren + 夂 (bàn chân bước biến đổi)",
    mnemonic: "Bàn chân cất bước (夂) đổi hướng sang ngả đường mới khác lạ, tạo nên sự biến hóa, thay đổi.",
    illustration: {
      badge: "🔀",
      concept: "Chuyển mình biến đổi",
      visualDesc: "Con đường rẽ nhánh dẫn sang cảnh sắc thiên nhiên biến chuyển kỳ thú."
    }
  },
  "夢": {
    components: ["艹", "罒", "冖", "夕"],
    equation: "Mắt lim dim khép rèm mi khi hoàng hôn buông xuống (夕)",
    mnemonic: "Chiều muộn (夕) khép chặt rèm mi chìm vào giấc ngủ say, chắp cánh cho những giấc mộng tuyệt đẹp bay xa.",
    illustration: {
      badge: "🌙",
      concept: "Giấc mộng đêm hè",
      visualDesc: "Vầng trăng lưỡi liềm soi bóng người ngủ say với đám mây giấc mơ lung linh sắc màu."
    }
  },
  "太": {
    components: ["大", "丶"],
    equation: "Đại (大 người to lớn) + chấm (丶 nhấn mạnh độ đẫy đà)",
    mnemonic: "Chữ Đại đã to lớn rồi lại thêm một chấm phía dưới, càng thêm đẫy đà, béo tốt và thái bình.",
    illustration: {
      badge: "🌕",
      concept: "Trăng rằm tròn trịa",
      visualDesc: "Vầng trăng rằm tròn vành vạnh và rực rỡ tỏa sáng khắp bầu trời đêm."
    }
  },
  "夫": {
    components: ["一", "大"],
    equation: "Người đàn ông (大) cắm cây trâm cài tóc (一) đánh dấu tuổi trưởng thành",
    mnemonic: "Người nam nhi (大) đến tuổi trưởng thành cài trâm lên búi tóc (一), làm trụ cột gia đình, bậc trượng phu.",
    illustration: {
      badge: "🧔",
      concept: "Bậc trượng phu đĩnh đạc",
      visualDesc: "Người đàn ông đạo mạo khoác áo choàng truyền thống đứng vững chãi."
    }
  },
  "失": {
    components: ["丿", "夫"],
    equation: "Bàn tay mở ra để tuột mất đồ vật rơi xuống đất",
    mnemonic: "Vật báu tuột khỏi kẽ tay rơi biến mất tăm, biểu thị sự đánh mất, thất lạc.",
    illustration: {
      badge: "💨",
      concept: "Tuột khỏi tầm tay",
      visualDesc: "Chiếc bong bóng bay tuột khỏi sợi dây bay vút lên bầu trời cao mất hút."
    }
  },
  "好": {
    components: ["女", "子"],
    equation: "女 (Nữ - người mẹ hiền) + 子 (Tử - đứa con bé bỏng)",
    mnemonic: "Mẹ hiền (女) ôm ấp đứa con thơ (子) vào lòng yêu thương nâng niu, hình ảnh thật tốt lành và đáng yêu thích.",
    illustration: {
      badge: "🥰",
      concept: "Mẹ con yêu thương",
      visualDesc: "Người mẹ tươi cười bế bồng đứa con thơ chan chứa niềm hạnh phúc ngọt ngào."
    }
  },
  "妻": {
    components: ["十", "⺕", "女"],
    equation: "Cầm chổi quét dọn thu vén tổ ấm + 女 (Nữ - phụ nữ đảm đang)",
    mnemonic: "Người phụ nữ (女) vén khéo tay cầm chổi chăm sóc tổ ấm gia đình chu toàn, đó chính là người vợ hiền.",
    illustration: {
      badge: "👰",
      concept: "Người vợ hiền thục",
      visualDesc: "Cô dâu rạng rỡ trong chiếc váy cưới tinh khôi bên bó hoa tươi thắm."
    }
  },
  "娘": {
    components: ["女", "良"],
    equation: "女 (Nữ - thiếu nữ) + 良 (Lương - dịu dàng nết na)",
    mnemonic: "Cô gái trẻ (女) mang tính tình đoan trang hiền dịu (良), chính là cô con gái yêu quý trong gia đình.",
    illustration: {
      badge: "👧",
      concept: "Cô con gái nết na",
      visualDesc: "Bé gái thắt bím tóc tươi cười cài chiếc nơ đỏ xinh xắn trên mái tóc."
    }
  },
  "婚": {
    components: ["女", "昏"],
    equation: "女 (Nữ - nàng dâu) + 昏 (Hôn - buổi lễ rước dâu lúc hoàng hôn)",
    mnemonic: "Người con gái (女) lên kiệu hoa rước về nhà chồng vào buổi chiều tà hoàng hôn (昏), ngày trọng đại kết hôn.",
    illustration: {
      badge: "💍",
      concept: "Nhẫn cưới hẹn ước",
      visualDesc: "Cặp nhẫn cưới bằng vàng sáng bóng lồng vào nhau trên chiếc gối nhung."
    }
  }
};

const rootJsonPath = path.join(__dirname, '../kanji_full_database.json');
const publicJsonPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootJsPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicJsonPath, 'utf8'));

let count = 0;
for (const [char, patch] of Object.entries(n3aData)) {
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

console.log(`[Batch 3A - N3 Part 1] Đã cập nhật thành công ${count} / ${Object.keys(n3aData).length} chữ Kanji N3.`);

fs.writeFileSync(publicJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsPath, 'window.KANJI_FULL_DATABASE = ' + JSON.stringify(db, null, 2) + ';\n', 'utf8');
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
