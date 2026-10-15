const fs = require('fs');
const path = require('path');

const n4aData = {
  "不": {
    components: ["一", "丿", "丨"],
    equation: "Nét ngang (mặt đất) + mầm cây bị chặn dưới đất",
    mnemonic: "Chữ chỉ sự: Mầm cây bị vướng chưa trồi lên khỏi mặt đất, biểu thị sự phủ định: không, chưa được.",
    illustration: {
      badge: "🚫",
      concept: "Phủ định không được",
      visualDesc: "Mầm xanh bị giữ lại dưới lớp sỏi đá chưa thể vươn lên, biểu thị sự phủ định."
    }
  },
  "世": {
    components: ["十", "十", "十"],
    equation: "Ba chữ Thập (十) nối liền nhau",
    mnemonic: "Chữ chỉ sự: Ba con số mười (10x3 = 30 năm) tượng trưng cho một thế hệ, cuộc đời thế gian.",
    illustration: {
      badge: "🌍",
      concept: "Thế gian ba mươi năm",
      visualDesc: "Ba cột mốc thời gian nối tiếp nhau qua các thế hệ tạo nên dòng chảy thế gian."
    }
  },
  "主": {
    components: ["丶", "王"],
    equation: "Điểm (丶 ngọn lửa) + Vương (王 chân đế đèn)",
    mnemonic: "Chữ tượng hình: Đĩa đèn đốt ngọn lửa sáng ở chính giữa, tượng trưng cho vị trí chủ nhân soi sáng.",
    illustration: {
      badge: "👑",
      concept: "Chủ nhân ngọn đèn",
      visualDesc: "Ngọn nến rực sáng trên chân đế đèn bằng đồng biểu thị người làm chủ ngôi nhà."
    }
  },
  "事": {
    components: ["一", "口", "彐", "亅"],
    equation: "Bàn tay cầm bút ghi chép việc công",
    mnemonic: "Chữ tượng hình: Vị quan tay cầm chắc cây bút ghi lại sổ sách sự việc trong triều đình.",
    illustration: {
      badge: "📋",
      concept: "Ghi chép sự việc",
      visualDesc: "Cuộn giấy ghi chép cẩn thận từng đầu việc quan trọng cần giải quyết."
    }
  },
  "京": {
    components: ["亠", "口", "小"],
    equation: "Đầu (亠) + Khẩu (口) + Tiểu (小)",
    mnemonic: "Chữ tượng hình: Tòa vọng lâu cao chót vót uy nghiêm dựng trên gò đất nơi kinh thành tráng lệ.",
    illustration: {
      badge: "🏯",
      concept: "Kinh đô tráng lệ",
      visualDesc: "Tòa thành lầu kinh đô nguy nga soi bóng rực rỡ dưới ánh hoàng hôn."
    }
  },
  "仕": {
    components: ["亻", "士"],
    equation: "亻 (Nhân đứng) + 士 (Sĩ - quan viên)",
    mnemonic: "Chữ hội ý: Con người (亻) đem tài năng phụng sự kẻ sĩ (士), làm việc quan, phục vụ.",
    illustration: {
      badge: "👔",
      concept: "Phụng sự công việc",
      visualDesc: "Người quan chức tận tụy cống hiến sức lực hoàn thành nhiệm vụ phụng sự."
    }
  },
  "代": {
    components: ["亻", "弋"],
    equation: "亻 (Nhân đứng) + 弋 (Dặc - cọc đánh dấu)",
    mnemonic: "Chữ hội ý: Người (亻) cắm cọc mốc (弋) thay thế vị trí cho người đi trước -> thời đại, thay thế.",
    illustration: {
      badge: "🔄",
      concept: "Thay thế thời đại",
      visualDesc: "Chiếc cọc mốc chuyển giao qua từng thế hệ biểu thị sự kế thừa tiếp nối."
    }
  },
  "以": {
    components: ["人(dạng cổ)", "丶"],
    equation: "Dáng người dùng công cụ làm mốc",
    mnemonic: "Chữ tượng hình: Người cầm công cụ nâng lên làm mốc chuẩn để so sánh: lấy đó làm mốc, dĩ.",
    illustration: {
      badge: "📐",
      concept: "Lấy đó làm mốc",
      visualDesc: "Cây thước đo đặt chuẩn tại một điểm mốc để so sánh trước sau."
    }
  },
  "会": {
    components: ["人", "二", "厶"],
    equation: "Tập (人 mái che) + các tầng lớp gom lại",
    mnemonic: "Chữ hội ý: Mọi người quây quần dưới một mái nhà chung để gặp gỡ, họp mặt trao đổi.",
    illustration: {
      badge: "🤝",
      concept: "Hội ngộ gặp gỡ",
      visualDesc: "Mọi người tề tựu đông vui trong phòng họp rôm rả tiếng cười chào hỏi."
    }
  },
  "住": {
    components: ["亻", "主"],
    equation: "亻 (Nhân đứng) + 主 (Chủ - chủ nhân)",
    mnemonic: "Chữ hội ý: Người (亻) an cư làm chủ (主) ngôi nhà của mình, biểu thị việc sinh sống, cư trú.",
    illustration: {
      badge: "🏡",
      concept: "An cư sinh sống",
      visualDesc: "Ngôi nhà gỗ ấm cúng rực rỡ ánh đèn nơi con người an cư lạc nghiệp."
    }
  },
  "体": {
    components: ["亻", "本"],
    equation: "亻 (Nhân đứng) + 本 (Bản - gốc rễ)",
    mnemonic: "Chữ hội ý: Gốc rễ nền tảng (本) quý giá nhất của con người (亻) chính là thể xác, thân thể.",
    illustration: {
      badge: "🧘‍♂️",
      concept: "Thân thể khỏe mạnh",
      visualDesc: "Vóc dáng con người rắn rỏi tráng kiện như thân cây vững chãi."
    }
  },
  "作": {
    components: ["亻", "乍"],
    equation: "亻 (Nhân đứng) + 乍 (Sạ - thoăn thoắt)",
    mnemonic: "Chữ hội ý: Con người (亻) thoăn thoắt đôi tay (乍) gọt đẽo khéo léo để chế tác, làm ra đồ vật.",
    illustration: {
      badge: "🔨",
      concept: "Chế tác sáng tạo",
      visualDesc: "Đôi bàn tay khéo léo gọt đẽo từng thanh gỗ tạo nên tác phẩm tinh xảo."
    }
  },
  "使": {
    components: ["亻", "吏"],
    equation: "亻 (Nhân đứng) + 吏 (Lại - quan viên thi hành việc)",
    mnemonic: "Chữ hội ý: Cử người (亻) mang chiếu chỉ quan lại (吏) đi thi hành nhiệm vụ, sử dụng sứ giả.",
    illustration: {
      badge: "✉️",
      concept: "Sử dụng sứ giả",
      visualDesc: "Sứ giả phi ngựa mang thư lệnh quan trọng đi thi hành nhiệm vụ."
    }
  },
  "借": {
    components: ["亻", "昔"],
    equation: "亻 (Nhân đứng) + 昔 (Tích - ngày xưa)",
    mnemonic: "Chữ hình thanh hội ý: Con người (亻) tìm đến người quen từ ngày xưa (昔) để vay mượn giúp đỡ.",
    illustration: {
      badge: "🤝",
      concept: "Vay mượn bạn xưa",
      visualDesc: "Hai bàn tay trao nhau cuốn sách quý với lời hứa gửi trả đúng hẹn."
    }
  },
  "元": {
    components: ["一", "儿"],
    equation: "Nhất (一 trên đỉnh) + Nhi (儿 hai chân người)",
    mnemonic: "Chữ tượng hình: Phần đầu người vươn cao trên đôi chân, biểu thị cội nguồn, khởi đầu nguyên thủy.",
    illustration: {
      badge: "🌱",
      concept: "Cội nguồn khởi đầu",
      visualDesc: "Mầm cây đầu tiên nảy mầm từ cội nguồn đất mẹ tinh khôi."
    }
  },
  "兄": {
    components: ["口", "儿"],
    equation: "Khẩu (口 lời nói) + Nhi (儿 người)",
    mnemonic: "Chữ hội ý: Người anh cả đứng vững trên đôi chân (儿) dùng lời lẽ (口) chỉ bảo dẫn dắt các em.",
    illustration: {
      badge: "👦",
      concept: "Người anh gương mẫu",
      visualDesc: "Người anh lớn dắt tay em nhỏ vững bước trên con đường tới trường."
    }
  },
  "公": {
    components: ["八", "厶"],
    equation: "Bát (八 mở ra) + Tư (厶 riêng tư)",
    mnemonic: "Chữ hội ý: Mở rộng chia tách (八) khỏi cái ích kỷ cá nhân (厶) để chăm lo việc công cộng, công bằng.",
    illustration: {
      badge: "⚖️",
      concept: "Công bằng chính trực",
      visualDesc: "Chiếc cân công lý cân bằng giữa lợi ích chung của toàn thể cộng đồng."
    }
  },
  "写": {
    components: ["冖", "与"],
    equation: "Mịch (冖 khung trùm) + Dữ (与 đặt vào)",
    mnemonic: "Chữ tượng hình: Đặt khung hình (冖) bao bọc lại để sao chép nguyên mẫu cảnh vật, chụp ảnh.",
    illustration: {
      badge: "📷",
      concept: "Sao chép chụp hình",
      visualDesc: "Ống kính máy ảnh bắt trọn khung cảnh rực rỡ lưu giữ vào bức ảnh."
    }
  },
  "冬": {
    components: ["夂", "冫"],
    equation: "Tuy (夂 bước chân chậm) + Băng (冫 sương tuyết)",
    mnemonic: "Chữ hội ý: Bước chân (夂) đi chậm rãi thận trọng trên mặt băng tuyết (冫) giá lạnh mùa đông.",
    illustration: {
      badge: "❄️",
      concept: "Mùa đông băng giá",
      visualDesc: "Những bông tuyết trắng rơi nhẹ trên cành cây khô giữa mùa đông lạnh giá."
    }
  },
  "切": {
    components: ["七", "刀"],
    equation: "Thất (七 nhát cắt ngang) + Đao (刀 con dao)",
    mnemonic: "Chữ hội ý: Dùng con dao (刀) rạch dứt khoát một nhát ngang (七) để cắt rời đồ vật.",
    illustration: {
      badge: "✂️",
      concept: "Cắt đứt dứt khoát",
      visualDesc: "Lưỡi kéo sắc bén cắt rời dải ruy băng khánh thành công trình mới."
    }
  },
  "別": {
    components: ["另", "刂"],
    equation: "Lánh (另 tách ra) + Đao (刂 lưỡi dao)",
    mnemonic: "Chữ hội ý: Dùng dao (刂) xẻ tách các phần xương khớp ra riêng biệt, chia tay tạm biệt.",
    illustration: {
      badge: "👋",
      concept: "Phân chia tạm biệt",
      visualDesc: "Bàn tay vẫy chào tạm biệt nhau nơi sân ga khi tàu chuẩn bị lăn bánh."
    }
  },
  "力": {
    components: ["力"],
    equation: "Bộ Lực (力)",
    mnemonic: "Chữ tượng hình: Cánh tay gân guốc bắp thịt cuồn cuộn hoặc cán cày biểu thị sức mạnh cơ bắp.",
    illustration: {
      badge: "💪",
      concept: "Sức mạnh cơ bắp",
      visualDesc: "Cánh tay rắn rỏi gân guốc nâng bổng vật nặng biểu thị sức mạnh phi thường."
    }
  },
  "勉": {
    components: ["免", "力"],
    equation: "Miễn (免 thoát khổ) + Lực (力 gắng sức)",
    mnemonic: "Chữ hội ý: Dốc hết sức lực (力) học tập miệt mài để thoát khỏi (免) sự dốt nát nghèo khó.",
    illustration: {
      badge: "📚",
      concept: "Cố gắng nỗ lực",
      visualDesc: "Ngọn đèn dầu thắp sáng thâu đêm bên bàn học của người học trò chuyên cần."
    }
  },
  "動": {
    components: ["重", "力"],
    equation: "Trọng (重 gánh nặng) + Lực (力 sức mạnh)",
    mnemonic: "Chữ hội ý: Phải dồn sức lực (力) to lớn mới có thể chuyển dịch gánh nặng (重) chuyển động.",
    illustration: {
      badge: "⚙️",
      concept: "Chuyển động không ngừng",
      visualDesc: "Bánh răng cơ khí quay đều chuyển động nhịp nhàng kéo theo cỗ máy vận hành."
    }
  },
  "医": {
    components: ["匚", "矢"],
    equation: "Phương (匚 hòm chứa) + Thỉ (矢 mũi tên)",
    mnemonic: "Chữ hội ý: Thầy thuốc rút mũi tên (矢) khỏi vết thương rồi bỏ vào hòm (匚) để chữa trị vết thương.",
    illustration: {
      badge: "🩺",
      concept: "Thầy thuốc chữa bệnh",
      visualDesc: "Ống nghe y tế bên hộp cứu thương của người bác sĩ nhân từ."
    }
  },
  "去": {
    components: ["土", "厶"],
    equation: "Thổ (土 đất cũ) + Khứ (厶 rời hang)",
    mnemonic: "Chữ hội ý: Con người bước ra khỏi mảnh đất cũ (土), biểu thị việc rời đi, quá khứ trôi qua.",
    illustration: {
      badge: "🚪",
      concept: "Rời đi quá khứ",
      visualDesc: "Bóng lưng người cất bước rời đi để lại dấu chân mờ dần theo thời gian."
    }
  },
  "口": {
    components: ["口"],
    equation: "Bộ Khẩu (口)",
    mnemonic: "Chữ tượng hình: Chiếc miệng mở tròn vành rõ chữ dùng để ăn uống và phát âm nói cười.",
    illustration: {
      badge: "👄",
      concept: "Chiếc miệng nói cười",
      visualDesc: "Khuôn miệng tươi cười cất lên những lời nói dịu dàng thân thiện."
    }
  },
  "古": {
    components: ["十", "口"],
    equation: "Thập (十 mười đời) + Khẩu (口 miệng truyền tụng)",
    mnemonic: "Chữ hội ý: Câu chuyện được truyền miệng (口) qua mười (十) thế hệ chính là nét đẹp xưa cổ.",
    illustration: {
      badge: "🏺",
      concept: "Cổ kính xưa cũ",
      visualDesc: "Chiếc bình gốm cổ rêu phong lưu giữ dấu tích văn hóa từ nghìn năm trước."
    }
  },
  "台": {
    components: ["厶", "口"],
    equation: "Tư (厶 dụng cụ) + Khẩu (口 cái bục)",
    mnemonic: "Chữ tượng hình: Chiếc bục cao kê chân vững chãi để đứng lên phát biểu hoặc kê đặt đồ vật.",
    illustration: {
      badge: "🏛️",
      concept: "Bục đài nâng cao",
      visualDesc: "Bục diễn đàn bằng đá hoa cương nâng cao vị thế người đứng chia sẻ."
    }
  },
  "同": {
    components: ["冂", "一", "口"],
    equation: "Quynh (冂 khung nhà) + Khẩu (口 một tiếng nói)",
    mnemonic: "Chữ hội ý: Cùng sống dưới một mái nhà (冂) cùng chung một tiếng nói (口), đó là sự đồng lòng, giống nhau.",
    illustration: {
      badge: "👥",
      concept: "Đồng lòng nhất trí",
      visualDesc: "Nhiều người cùng chung một nhịp đập và hướng ánh mắt về cùng một mục tiêu."
    }
  },
  "味": {
    components: ["口", "未"],
    equation: "Khẩu (口 cái miệng) + Vị (未 mầm non cây chưa nếm)",
    mnemonic: "Chữ hình thanh hội ý: Dùng miệng (口) nếm thử quả non trên cây (未) để cảm nhận hương vị ngọt ngào.",
    illustration: {
      badge: "🍜",
      concept: "Hương vị đậm đà",
      visualDesc: "Tô mì thơm phức bốc khói kích thích vị giác đầu lưỡi."
    }
  },
  "品": {
    components: ["口", "口", "口"],
    equation: "Ba chữ Khẩu (口) kết hợp",
    mnemonic: "Chữ hội ý: Ba cái miệng (口) cùng thưởng thức và tấm tắc khen ngợi, đó là sản phẩm phẩm chất cao cấp.",
    illustration: {
      badge: "🎁",
      concept: "Sản phẩm hảo hạng",
      visualDesc: "Hộp quà thủ công tinh tế với chất lượng hảo hạng được nhiều người tin dùng."
    }
  },
  "員": {
    components: ["口", "貝"],
    equation: "Khẩu (口 con người) + Bối (貝 tiền lương bổng)",
    mnemonic: "Chữ hội ý: Những người (口) được ghi tên trên danh sách để nhận lương vỏ sò (貝), thành viên, nhân viên.",
    illustration: {
      badge: "🪪",
      concept: "Thành viên nhân viên",
      visualDesc: "Chiếc thẻ nhân viên gắn huy hiệu khẳng định vai trò thành viên trong tổ chức."
    }
  },
  "問": {
    components: ["門", "口"],
    equation: "Môn (門 cánh cổng) + Khẩu (口 cái miệng)",
    mnemonic: "Chữ hội ý: Đến trước cánh cổng (門) cất tiếng miệng (口) hỏi han xem chủ nhà có ở nhà không.",
    illustration: {
      badge: "❓",
      concept: "Hỏi han thăm dò",
      visualDesc: "Khách đứng trước cổng gõ cửa cất tiếng hỏi thăm người thân bên trong."
    }
  },
  "図": {
    components: ["囗", "冬(dạng cổ biến thể nét vẽ)"],
    equation: "Vi (囗 khung bản đồ) + các nét vẽ địa hình",
    mnemonic: "Chữ hội ý: Khung vuông bao quanh (囗) những đường nét đồ họa biểu diễn địa thế, bản đồ.",
    illustration: {
      badge: "🗺️",
      concept: "Bản đồ sơ đồ",
      visualDesc: "Tấm bản đồ chỉ dẫn đường đi rõ ràng từng ngả rẽ và địa danh."
    }
  },
  "地": {
    components: ["土", "也"],
    equation: "Thổ (土 đất đai) + Dã (也 rắn uốn quanh bờ nước)",
    mnemonic: "Chữ hình thanh hội ý: Mảnh đất (土) phù sa màu mỡ trải dài uốn lượn ven sông suối (也) -> đất đai, địa phận.",
    illustration: {
      badge: "🏞️",
      concept: "Mảnh đất quê hương",
      visualDesc: "Đất đai bờ bãi màu mỡ phì nhiêu nuôi dưỡng mùa màng xanh tốt."
    }
  },
  "堂": {
    components: ["尚", "土"],
    equation: "Thượng (cao ráo) + Thổ (土 nền đất)",
    mnemonic: "Chữ hình thanh hội ý: Tòa nhà tôn nghiêm cao ráo dựng trên nền đất (土) bằng phẳng vững chãi -> đại sảnh.",
    illustration: {
      badge: "🏛️",
      concept: "Đại sảnh tôn nghiêm",
      visualDesc: "Chính điện nguy nga tráng lệ với hàng cột đá đứng sừng sững."
    }
  },
  "場": {
    components: ["土", "昜"],
    equation: "Thổ (土 mặt đất) + Dịch (昜 ánh nắng chiếu rọi)",
    mnemonic: "Chữ hình thanh hội ý: Mảnh đất bằng phẳng (土) chan hòa ánh nắng mặt trời (昜) rọi sáng làm nơi tụ hội, quảng trường.",
    illustration: {
      badge: "🏟️",
      concept: "Quảng trường tụ hội",
      visualDesc: "Quảng trường rộng thênh thang ngập tràn ánh nắng nơi mọi người sum vầy."
    }
  },
  "売": {
    components: ["士", "冖", "儿"],
    equation: "Sĩ (士 người bán) + Mịch (冖 bao hàng) + Nhi (儿 chân bước)",
    mnemonic: "Chữ hội ý: Kẻ sĩ mang giỏ hàng (冖) bước chân (儿) đi khắp phố xá để giao thương bán buôn.",
    illustration: {
      badge: "🏷️",
      concept: "Giao thương bán buôn",
      visualDesc: "Quầy hàng chợ phiên tấp nập khách mua người bán vui vẻ trao đổi."
    }
  },
  "夏": {
    components: ["一", "自", "夊"],
    equation: "Mũ lễ đội đầu + đôi chân nhảy múa (夊)",
    mnemonic: "Chữ tượng hình: Người đội mũ lễ vũ hội dang chân (夊) nhảy múa rộn ràng đón mùa hè sôi động.",
    illustration: {
      badge: "🌻",
      concept: "Mùa hè rực rỡ",
      visualDesc: "Đóa hoa hướng dương nở rộ rực rỡ dưới ánh nắng hè vàng ruộm."
    }
  },
  "夕": {
    components: ["夕"],
    equation: "Bộ Tịch (夕)",
    mnemonic: "Chữ tượng hình: Vầng trăng khuyết lưỡi liềm vừa nhú lên lúc chiều tà, hoàng hôn buông xuống.",
    illustration: {
      badge: "🌇",
      concept: "Hoàng hôn chiều tà",
      visualDesc: "Ánh hoàng hôn tím biếc rọi bóng vầng trăng non vừa nhú bên sườn đồi."
    }
  },
  "多": {
    components: ["夕", "夕"],
    equation: "Tịch (夕 đêm) + Tịch (夕 đêm)",
    mnemonic: "Chữ hội ý: Đêm (夕) này qua đêm (夕) khác trôi qua tầng tầng lớp lớp, biểu thị số lượng nhiều, dồi dào.",
    illustration: {
      badge: "✨",
      concept: "Vô số nhiều đếm",
      visualDesc: "Vô vàn vì sao đêm lấp lánh đan kết thành dải ngân hà rực sáng."
    }
  },
  "夜": {
    components: ["亠", "亻", "夕"],
    equation: "Mái nhà (亠) + Nhân (亻 bóng người) + Tịch (夕 màn đêm)",
    mnemonic: "Chữ hội ý: Đêm tối (夕) buông xuống dưới mái nhà (亠), bóng người (亻) bước đi trong đêm khuya tĩnh mịch.",
    illustration: {
      badge: "🌃",
      concept: "Màn đêm tĩnh mịch",
      visualDesc: "Khu phố chìm vào giấc ngủ yên bình dưới ánh trăng khuya êm đềm."
    }
  },
  "妹": {
    components: ["女", "未"],
    equation: "Nữ (女 người phụ nữ) + Mùi (未 còn non trẻ)",
    mnemonic: "Chữ hình thanh hội ý: Người con gái (女) còn non nớt tuổi đời (未) trong gia đình, đó là em gái.",
    illustration: {
      badge: "👧",
      concept: "Cô em gái nhỏ",
      visualDesc: "Bé gái ngây thơ thắt bím tóc xinh xắn mỉm cười nép sau lưng anh chị."
    }
  },
  "姉": {
    components: ["女", "市"],
    equation: "Nữ (女 người phụ nữ) + Thị (市 chợ búa / người đi trước)",
    mnemonic: "Chữ hình thanh hội ý: Người phụ nữ (女) quán xuyến đi chợ búa (市) lo toan bữa ăn cho gia đình, chị gái.",
    illustration: {
      badge: "👩",
      concept: "Người chị đảm đang",
      visualDesc: "Người chị dịu dàng chu đáo cài nơ áo ấm cho đàn em nhỏ."
    }
  },
  "始": {
    components: ["女", "台"],
    equation: "Nữ (女 người mẹ) + Thai (台 cái mầm nhú)",
    mnemonic: "Chữ hình thanh hội ý: Người phụ nữ (女) bắt đầu mang thai nghén mầm sống (台), biểu thị sự khởi đầu.",
    illustration: {
      badge: "🏁",
      concept: "Khởi đầu xuất phát",
      visualDesc: "Tiếng còi hiệu vang lên mở đầu cho chặng hành trình chinh phục mới."
    }
  },
  "字": {
    components: ["宀", "子"],
    equation: "Miên (宀 mái nhà) + Tử (子 đứa trẻ)",
    mnemonic: "Chữ hội ý: Dưới mái ấm gia đình (宀), dạy dỗ đứa con thơ (子) uốn nắn từng con chữ đầu đời.",
    illustration: {
      badge: "✍️",
      concept: "Nét chữ vuông vức",
      visualDesc: "Từng chữ viết mực tàu ngay ngắn ngay ngắn hiện lên trên tờ giấy học trò."
    }
  },
  "安": {
    components: ["宀", "女"],
    equation: "Miên (宀 mái nhà) + Nữ (女 phụ nữ)",
    mnemonic: "Chữ hội ý: Người phụ nữ (女) an yên chăm sóc dưới mái ấm gia đình (宀) tạo nên sự bình an, an lòng.",
    illustration: {
      badge: "🛡️",
      concept: "Bình an yên ấm",
      visualDesc: "Ngọn đèn dầu ấm áp tỏa sáng căn nhà bình an giữa đêm mưa bão."
    }
  },
  "室": {
    components: ["宀", "至"],
    equation: "Miên (宀 mái nhà) + Chí (至 bước chân tới)",
    mnemonic: "Chữ hội ý: Con người bước chân tới (至) nơi chốn có mái che chắn (宀) để dừng chân nghỉ ngơi, căn phòng.",
    illustration: {
      badge: "🚪",
      concept: "Căn phòng ấm cúng",
      visualDesc: "Căn phòng sạch sẽ ngăn nắp đón bước chân người trở về sau ngày dài."
    }
  },
  "家": {
    components: ["宀", "豕"],
    equation: "Miên (宀 mái nhà) + Thỉ (豕 bầy lợn)",
    mnemonic: "Chữ hội ý: Dưới mái nhà (宀) chăn nuôi bầy lợn (豕) béo tròn tượng trưng cho sự no ấm, mái ấm gia đình.",
    illustration: {
      badge: "🏡",
      concept: "Mái ấm gia đình",
      visualDesc: "Tổ ấm bình yên rộn vang tiếng cười vui sum họp bên mâm cơm tối."
    }
  },
  "少": {
    components: ["小", "丿"],
    equation: "Tiểu (小 nhỏ bé) + nét phẩy (丿 gạt bớt)",
    mnemonic: "Chữ chỉ sự: Đã nhỏ bé (小) lại còn bị gạt bớt (丿) đi một phần, biểu thị số lượng ít ỏi, một chút.",
    illustration: {
      badge: "🤏",
      concept: "Một chút ít ỏi",
      visualDesc: "Một vài giọt sương mai đọng khẽ khàng trên đầu ngọn cỏ biếc."
    }
  },
  "屋": {
    components: ["尸", "至"],
    equation: "Thi (尸 vách nhà) + Chí (至 bước đến)",
    mnemonic: "Chữ hội ý: Bước chân đến (至) nơi có vách che chắn (尸) để trú ngụ và kinh doanh, mái nhà, cửa tiệm.",
    illustration: {
      badge: "🏠",
      concept: "Mái nhà cửa tiệm",
      visualDesc: "Mái ngói cong cổ kính của cửa hàng đón khách ghé thăm dừng chân."
    }
  },
  "工": {
    components: ["工"],
    equation: "Bộ Công (工)",
    mnemonic: "Chữ tượng hình: Chiếc thước vuông của người thợ mộc dùng để đo góc thẳng, công trình, người thợ.",
    illustration: {
      badge: "📐",
      concept: "Thước thợ công trình",
      visualDesc: "Thước vuông thẳng thớm đặt trên bản vẽ thi công công trình thế kỷ."
    }
  },
  "帰": {
    components: ["刂", "彐", "巾"],
    equation: "Bó chổi dọn dẹp + bước chân trở về",
    mnemonic: "Chữ hội ý: Người vợ cầm chổi dọn dẹp nhà cửa gọn gàng đón người thân trở về sum họp gia đình.",
    illustration: {
      badge: "🏡",
      concept: "Quay về tổ ấm",
      visualDesc: "Cánh chim chiều bay về tổ ấm ríu rít chào đón hoàng hôn buông."
    }
  },
  "広": {
    components: ["广", "厶"],
    equation: "Quảng (广 mái nhà rộng) + Tư (厶 khoảng không)",
    mnemonic: "Chữ hội ý: Mái nhà lớn tựa vách núi (广) mở ra không gian thoáng đạt khoáng đạt -> rộng lớn, bao la.",
    illustration: {
      badge: "🏞️",
      concept: "Rộng lớn bao la",
      visualDesc: "Thảo nguyên bao la ngút tầm mắt trải dài tít tắp đến tận chân trời."
    }
  },
  "店": {
    components: ["广", "占"],
    equation: "Quảng (广 mái che) + Chiêm (占 treo biển)",
    mnemonic: "Chữ hình thanh hội ý: Dưới mái hiên (广) dựng biển hiệu trưng bày hàng quán (占) buôn bán, cửa hàng.",
    illustration: {
      badge: "🏬",
      concept: "Cửa hàng quán xá",
      visualDesc: "Tấm rèm Noren truyền thống đung đưa trước cửa tiệm ramen thơm lừng."
    }
  },
  "度": {
    components: ["广", "廿", "又"],
    equation: "Quảng (广) + tay cầm thước đo (又)",
    mnemonic: "Chữ hội ý: Dưới mái nhà (广), bàn tay (又) cầm thước căng dây đo đạc chuẩn xác -> mức độ, lần lượt.",
    illustration: {
      badge: "🌡️",
      concept: "Đo lường mức độ",
      visualDesc: "Cây nhiệt kế thủy ngân đo lường chính xác từng độ ấm áp của tiết trời."
    }
  },
  "建": {
    components: ["廴", "聿"],
    equation: "Dẫn (廴 bước chân dài) + Duật (聿 cây bút vẽ)",
    mnemonic: "Chữ hội ý: Cầm bút (聿) vẽ bản đồ quy hoạch từng bước (廴) xây dựng nên những công trình vĩ đại.",
    illustration: {
      badge: "🏗️",
      concept: "Xây dựng công trình",
      visualDesc: "Những cần cẩu vươn cao dựng xây những tòa nhà chọc trời hiện đại."
    }
  },
  "弟": {
    components: ["弓", "丨", "丿"],
    equation: "Cung (dây quấn quanh cọc) + nét sổ",
    mnemonic: "Chữ tượng hình: Dây da quấn quanh cọc gỗ theo thứ tự, biểu thị người em trai thứ bậc nương tựa anh.",
    illustration: {
      badge: "👦",
      concept: "Người em trai ngoan",
      visualDesc: "Cậu em trai nhỏ nhanh nhẹn phụ giúp gia đình với nụ cười rạng rỡ."
    }
  },
  "強": {
    components: ["弓", "虫"],
    equation: "Cung (弓 cánh cung) + Trùng (虫 loài bọ cánh cứng)",
    mnemonic: "Chữ hình thanh hội ý: Loài bọ cánh cứng (虫) có sức bật mạnh mẽ và dẻo dai như cánh cung (弓) căng dây.",
    illustration: {
      badge: "💪",
      concept: "Mạnh mẽ kiên cường",
      visualDesc: "Chú bọ cánh cứng giương đôi sừng dũng mãnh khẳng định sức mạnh kiên cường."
    }
  },
  "待": {
    components: ["彳", "寺"],
    equation: "Xích (彳 bước đi) + Tự (寺 ngôi chùa)",
    mnemonic: "Chữ hình thanh hội ý: Dừng bước chân (彳) trước cổng chùa (寺) thanh tịnh đứng đợi chờ người thân.",
    illustration: {
      badge: "⏳",
      concept: "Kiên nhẫn chờ đợi",
      visualDesc: "Người đứng dưới mái hiên chùa kiên nhẫn đợi hạt mưa ngớt rơi."
    }
  },
  "心": {
    components: ["心"],
    equation: "Bộ Tâm (心)",
    mnemonic: "Chữ tượng hình: Trái tim với các tâm thất tâm nhĩ đang đập nhịp nhàng, cội nguồn tình cảm suy nghĩ.",
    illustration: {
      badge: "❤️",
      concept: "Trái tim chân thành",
      visualDesc: "Trái tim rực đỏ nồng ấm đong đầy yêu thương và trắc ẩn chân thành."
    }
  },
  "思": {
    components: ["田", "心"],
    equation: "Điền (田 bộ não) + Tâm (心 trái tim)",
    mnemonic: "Chữ hội ý: Dùng cả trí não (田) và trái tim (心) rung động để suy tư, tưởng nhớ, chiêm nghiệm.",
    illustration: {
      badge: "🤔",
      concept: "Suy tư sâu lắng",
      visualDesc: "Người ngồi bên cửa sổ thả hồn suy tư về những kỷ niệm dấu yêu xưa cũ."
    }
  },
  "急": {
    components: ["勹", "彐", "心"],
    equation: "Thúc giục gấp rút + Tâm (心 trái tim)",
    mnemonic: "Chữ hội ý: Trái tim (心) đập thình thịch vội vã giục giã bước chân phải nhanh chóng khẩn cấp.",
    illustration: {
      badge: "⚡",
      concept: "Khẩn cấp vội vã",
      visualDesc: "Chuông báo thức reo rộn rã hối hả bước chân cho kịp chuyến tàu sớm."
    }
  },
  "悪": {
    components: ["亜", "心"],
    equation: "Á (亜 méo mó lệch lạc) + Tâm (心 tấm lòng)",
    mnemonic: "Chữ hình thanh hội ý: Tấm lòng (心) sinh thói lệch lạc méo mó (亜) sẽ dẫn tới hành vi sai trái, độc ác.",
    illustration: {
      badge: "😈",
      concept: "Lệch lạc xấu xa",
      visualDesc: "Chiếc gương làm biến dạng méo mó hình ảnh cảnh tỉnh điều xấu xa tội lỗi."
    }
  },
  "意": {
    components: ["音", "心"],
    equation: "Âm (音 thanh âm tiếng lòng) + Tâm (心 trái tim)",
    mnemonic: "Chữ hội ý: Thanh âm tiếng lòng (音) thốt ra từ tận đáy trái tim (心) chính là ý nguyện, ý chí.",
    illustration: {
      badge: "💡",
      concept: "Ý chí tâm nguyện",
      visualDesc: "Bóng đèn ý tưởng bừng sáng phản ánh ý chí kiên định nơi đáy lòng."
    }
  },
  "手": {
    components: ["手"],
    equation: "Bộ Thủ (手)",
    mnemonic: "Chữ tượng hình: Bàn tay năm ngón xòe ra khéo léo lao động và tạo dựng cuộc sống.",
    illustration: {
      badge: "🖐️",
      concept: "Bàn tay khéo léo",
      visualDesc: "Bàn tay mở rộng nâng niu những mầm xanh đâm chồi hy vọng."
    }
  },
  "持": {
    components: ["扌", "寺"],
    equation: "Thủ (扌 bàn tay) + Tự (寺 ngôi chùa)",
    mnemonic: "Chữ hình thanh hội ý: Bàn tay (扌) thành kính cầm nén hương thơm trước sân chùa (寺) thanh tịnh.",
    illustration: {
      badge: "🤲",
      concept: "Cầm nắm giữ gìn",
      visualDesc: "Hai bàn tay cẩn trọng nâng niu và nắm giữ báu vật thiêng liêng."
    }
  },
  "教": {
    components: ["孝", "攵"],
    equation: "Hiếu (孝 lòng hiếu thảo) + Phộc (攵 roi nhẹ răn dạy)",
    mnemonic: "Chữ hội ý: Thầy gõ roi nhẹ (攵) uốn nắn học trò rèn luyện chữ hiếu (孝) thành tài, giáo dục.",
    illustration: {
      badge: "👨‍🏫",
      concept: "Giáo dục truyền dạy",
      visualDesc: "Người thầy giáo tận tâm giảng giải từng bài học khai sáng trí tuệ cho học sinh."
    }
  },
  "文": {
    components: ["文"],
    equation: "Bộ Văn (文)",
    mnemonic: "Chữ tượng hình: Những đường nét hoa văn xăm trên thân người cổ xưa, phát triển thành văn tự, văn chương.",
    illustration: {
      badge: "📜",
      concept: "Văn chương tao nhã",
      visualDesc: "Bản thảo thư pháp uyển chuyển từng nét hoa văn thanh tao quý phái."
    }
  },
  "料": {
    components: ["米", "斗"],
    equation: "Mễ (米 lúa gạo) + Đẩu (斗 chiếc đấu đong)",
    mnemonic: "Chữ hội ý: Dùng chiếc đấu (斗) đong đo chuẩn xác từng bát gạo (米) làm nguyên liệu nấu nướng.",
    illustration: {
      badge: "🥗",
      concept: "Nguyên liệu đong đo",
      visualDesc: "Những nguyên liệu tươi ngon đong đo chuẩn xác chuẩn bị cho món ăn ngon."
    }
  },
  "新": {
    components: ["亲", "斤"],
    equation: "Tân (cây non nhú) + Cân (斤 chiếc rìu tỉa cành)",
    mnemonic: "Chữ hình thanh hội ý: Dùng rìu (斤) đốn tỉa cành cây già cỗi để chồi non xanh mọc ra mới mẻ, tươi mới.",
    illustration: {
      badge: "✨",
      concept: "Tươi mới khởi sắc",
      visualDesc: "Những mầm chồi non mọc lên tràn trề nhựa sống sau nhát tỉa cành đầu xuân."
    }
  },
  "方": {
    components: ["方"],
    equation: "Bộ Phương (方)",
    mnemonic: "Chữ tượng hình: Hai chiếc thuyền buộc song song thẳng hàng rẽ sóng định hướng đi, phương hướng.",
    illustration: {
      badge: "🧭",
      concept: "Phương hướng chỉ lối",
      visualDesc: "Mũi tên định hướng chỉ rõ bốn phương tám hướng giữa biển khơi mênh mông."
    }
  },
  "旅": {
    components: ["方", "𠂉", "氏(dạng cổ)"],
    equation: "Phương (lá cờ lệnh) + đoàn người bước đi",
    mnemonic: "Chữ hội ý: Đoàn người quân ngũ giương cao lá cờ hiệu (方) cất bước lữ hành xa xôi, du lịch.",
    illustration: {
      badge: "🧳",
      concept: "Lữ hành du lịch",
      visualDesc: "Chiếc vali hành lý cùng cuốn sổ tay lữ hành chu du khám phá miền đất mới."
    }
  },
  "族": {
    components: ["方", "矢"],
    equation: "Phương (lá cờ hiệu) + Thỉ (矢 mũi tên gia huy)",
    mnemonic: "Chữ hội ý: Những chiến binh tụ hội dưới cùng một lá cờ lệnh (方) và bắn chung mũi tên (矢) dòng họ, gia tộc.",
    illustration: {
      badge: "👨‍👩‍👧‍👦",
      concept: "Gia tộc gắn kết",
      visualDesc: "Cây phả hệ đại gia đình gắn kết triệu con tim chung dòng máu thiêng liêng."
    }
  },
  "早": {
    components: ["日", "十"],
    equation: "Nhật (日 mặt trời) + Thập (十 vượt đỉnh)",
    mnemonic: "Chữ chỉ sự: Mặt trời (日) vừa nhô lên khỏi đường chân trời (十) báo hiệu buổi sớm mai tinh mơ.",
    illustration: {
      badge: "🌅",
      concept: "Sớm mai thức giấc",
      visualDesc: "Bình minh rạng sáng đánh thức muôn loài cất tiếng hót đón chào ngày mới."
    }
  },
  "明": {
    components: ["日", "月"],
    equation: "Nhật (日 mặt trời) + Nguyệt (月 mặt trăng)",
    mnemonic: "Chữ hội ý: Ánh dương của mặt trời (日) hội tụ cùng ánh trăng (月) đêm rằm, tỏa sáng quang minh rực rỡ.",
    illustration: {
      badge: "💡",
      concept: "Quang minh rực rỡ",
      visualDesc: "Vầng hào quang nhật nguyệt giao hòa chiếu sáng bừng bừng gian phòng ấm áp."
    }
  },
  "映": {
    components: ["日", "央"],
    equation: "Nhật (日 ánh nắng) + Ương (央 chính giữa)",
    mnemonic: "Chữ hình thanh hội ý: Mặt trời (日) chiếu rọi thẳng chính giữa (央) mặt hồ nước phẳng lặng phản chiếu bóng hình.",
    illustration: {
      badge: "🪞",
      concept: "Soi bóng phản chiếu",
      visualDesc: "Mặt hồ phẳng lặng như gương soi bóng ngọn núi Phú Sĩ tuyết phủ lung linh."
    }
  },
  "春": {
    components: ["三", "人", "日"],
    equation: "Tam (ba tháng xuân) + người đón nắng (日)",
    mnemonic: "Chữ hội ý: Ánh nắng ấm áp (日) xua tan giá lạnh, cây cỏ đâm chồi đón chào mùa xuân rộn ràng.",
    illustration: {
      badge: "🌸",
      concept: "Mùa xuân đâm chồi",
      visualDesc: "Hoa anh đào rực rỡ sắc hồng tung bay trong làn gió xuân ấm áp ngọt ngào."
    }
  },
  "昼": {
    components: ["尺(dạng cổ)", "日"],
    equation: "Xích (cây thước đo) + Nhật (日 mặt trời)",
    mnemonic: "Chữ hội ý: Mặt trời (日) lên tới đỉnh điểm đo đạc chiếc bóng ngắn nhất lúc giữa trưa, ban ngày.",
    illustration: {
      badge: "☀️",
      concept: "Ban ngày rực nắng",
      visualDesc: "Mặt trời rọi ánh nắng vàng rực rỡ giữa bầu trời trưa trong xanh không một gợn mây."
    }
  }
};

const rootJsonPath = path.join(__dirname, '../kanji_full_database.json');
const publicJsonPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootJsPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicJsonPath, 'utf8'));

let count = 0;
for (const [char, patch] of Object.entries(n4aData)) {
  if (db[char]) {
    db[char].components = patch.components;
    db[char].equation = patch.equation;
    db[char].mnemonic = patch.mnemonic;
    db[char].illustration = patch.illustration;
    count++;
  }
}

console.log(`[Batch 2A - N4 Part 1] Đã cập nhật thành công ${count} / 80 chữ Kanji N4.`);

fs.writeFileSync(publicJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsPath, 'window.KANJI_FULL_DATABASE = ' + JSON.stringify(db, null, 2) + ';\n', 'utf8');
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
