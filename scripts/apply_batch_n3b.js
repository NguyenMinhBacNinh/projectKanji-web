const fs = require('fs');
const path = require('path');

const n3bData = {
  "婦": {
    components: ["女", "帚"],
    equation: "女 (Nữ - người phụ nữ) + 帚 (cây chổi dọn dẹp tổ ấm)",
    mnemonic: "Người phụ nữ (女) tay cầm cây chổi (帚) quét dọn giữ gìn nhà cửa êm ấm, nghĩa là thê phụ, đàn bà.",
    illustration: {
      badge: "🧹",
      concept: "Chăm sóc tổ ấm",
      visualDesc: "Cây chổi rơm truyền thống quét sạch lá rụng trước hiên nhà ấm cúng."
    }
  },
  "存": {
    components: ["𠂇", "子"],
    equation: "Bàn tay che chở bảo bọc + 子 (Tử - đứa trẻ thơ)",
    mnemonic: "Đôi bàn tay ân cần che chở bảo bọc cho đứa con thơ (子), giữ gìn sinh tồn và tồn tại qua năm tháng.",
    illustration: {
      badge: "🌱",
      concept: "Sinh tồn mãnh liệt",
      visualDesc: "Mầm cây nhỏ kiên cường vươn lên giữa kẽ đá cheo leo tồn tại cùng năm tháng."
    }
  },
  "宅": {
    components: ["宀", "乇"],
    equation: "宀 (Miên - mái nhà) + 乇 (mầm bén rễ an cư)",
    mnemonic: "Dưới mái nhà che mưa nắng (宀), cả gia đình cùng an cư bén rễ sinh sống, đó là dinh trạch, nhà ở.",
    illustration: {
      badge: "🏡",
      concept: "Ngôi nhà an cư",
      visualDesc: "Ngôi nhà xinh xắn với mái ngói đỏ bên rặng cây xanh rợp bóng bình yên."
    }
  },
  "守": {
    components: ["宀", "寸"],
    equation: "宀 (Miên - mái nhà) + 寸 (Thốn - bàn tay canh giữ nề nếp)",
    mnemonic: "Dưới mái nhà (宀), bàn tay luôn trông nom giữ gìn (寸) trật tự và quy củ, bảo vệ gia phong.",
    illustration: {
      badge: "🛡️",
      concept: "Canh giữ bình yên",
      visualDesc: "Chiếc khiên vững chãi bảo vệ ngôi nhà trước giông bão."
    }
  },
  "完": {
    components: ["宀", "元"],
    equation: "宀 (Miên - nóc nhà xây xong) + 元 (đứng thẳng vẹn toàn)",
    mnemonic: "Ngôi nhà đã cất xong nóc (宀) vững chãi vẹn toàn từ đầu đến cuối (元), biểu thị sự hoàn tất, trọn vẹn.",
    illustration: {
      badge: "✅",
      concept: "Hoàn tất trọn vẹn",
      visualDesc: "Ngôi nhà vừa khánh thành lộng lẫy đánh dấu công trình hoàn thành mĩ mãn."
    }
  },
  "官": {
    components: ["宀", "𠂤"],
    equation: "宀 (Miên - tòa công đường) + 𠂤 (nơi tập hợp bá quan)",
    mnemonic: "Tòa công đường mái ngói uy nghiêm (宀) nơi bá quan văn võ hội họp bàn việc nước, chỉ quan lại chính quyền.",
    illustration: {
      badge: "🏛️",
      concept: "Tòa công đường",
      visualDesc: "Tòa công đường cổ kính với biển hiệu sơn son thếp vàng uy nghiêm."
    }
  },
  "定": {
    components: ["宀", "疋"],
    equation: "宀 (Miên - trong nhà) + 疋 (bàn chân đứng yên ngay ngắn)",
    mnemonic: "Bước chân vào nhà (宀) đứng yên vị trí ngay ngắn (疋), quyết định dừng chân an định cuộc đời.",
    illustration: {
      badge: "⚓",
      concept: "Mỏ neo an định",
      visualDesc: "Chiếc mỏ neo cắm chặt vào lòng biển sâu giữ cho con tàu đứng yên vững chãi."
    }
  },
  "実": {
    components: ["宀", "二", "大"],
    equation: "Dưới mái nhà (宀) chứa đầy ắp hoa trái và của cải dồi dào",
    mnemonic: "Trong kho nhà (宀) tích lũy đầy ắp hoa trái quả ngọt trĩu hạt, mang lại giá trị chân thực và hiện thực.",
    illustration: {
      badge: "🍎",
      concept: "Trái ngọt trĩu cành",
      visualDesc: "Cây táo trĩu quả chín mọng đỏ rực biểu thị hoa trái bội thu."
    }
  },
  "客": {
    components: ["宀", "各"],
    equation: "宀 (Miên - mái nhà) + 各 (Các - người từ muôn ngả bước vào)",
    mnemonic: "Người từ khắp các ngả đường (各) ghé thăm bước vào ngưỡng cửa nhà (宀), đó là vị khách quý.",
    illustration: {
      badge: "🛎️",
      concept: "Đón tiếp khách quý",
      visualDesc: "Chuông reo cửa mừng đón vị khách quý ghé thăm căn nhà ấm cúng."
    }
  },
  "害": {
    components: ["宀", "丰", "口"],
    equation: "Trong nhà (宀) mọc đầy gai nhọn và lời lẽ cay độc (口)",
    mnemonic: "Những lời nói cay độc (口) như mũi gai đâm xé tan sự hòa thuận trong nhà (宀), gây tổn hại sâu sắc.",
    illustration: {
      badge: "⚡",
      concept: "Hiểm họa tổn hại",
      visualDesc: "Tia sét đánh rách tơ trời tượng trưng cho hiểm họa bất ngờ ập đến."
    }
  },
  "容": {
    components: ["宀", "谷"],
    equation: "宀 (Miên - mái nhà) + 谷 (Cốc - thung lũng sâu chứa nước)",
    mnemonic: "Ngôi nhà rộng lớn như thung lũng (谷) có thể bao dung chứa đựng muôn vật, chỉ dung tích và dung mạo.",
    illustration: {
      badge: "🏺",
      concept: "Bình gốm dung chứa",
      visualDesc: "Chiếc bình gốm dung tích lớn chứa đựng dòng nước trong vắt mát lành."
    }
  },
  "宿": {
    components: ["宀", "亻", "百"],
    equation: "Dưới mái nhà (宀) người (亻) nằm ngả lưng trên chiếc chiếu êm",
    mnemonic: "Người bộ hành (亻) tìm đến mái nhà ven đường (宀) trải chiếu nghỉ ngơi qua đêm, gọi là ngủ trọ túc xá.",
    illustration: {
      badge: "🏨",
      concept: "Nhà trọ dừng chân",
      visualDesc: "Lữ quán thắp đèn lồng vàng ấm cúng đón người lữ khách dừng chân tá túc."
    }
  },
  "寄": {
    components: ["宀", "奇"],
    equation: "宀 (Miên - hiên nhà) + 奇 (người khách lạ ghé qua)",
    mnemonic: "Người khách cưỡi ngựa lạ (奇) ghé dừng chân trước mái hiên nhà (宀) gửi gắm hành lý và tin tức.",
    illustration: {
      badge: "📦",
      concept: "Gửi gắm bưu kiện",
      visualDesc: "Gói hàng niêm phong cẩn thận gửi trao tận tay người nhận."
    }
  },
  "富": {
    components: ["宀", "一", "口", "田"],
    equation: "Dưới mái nhà (宀) có một vò của cải (畐: 一+口+田)",
    mnemonic: "Dưới mái ấm (宀), miệng ăn đầy đủ (口) lại có ruộng đất mênh mông (田), cuộc sống sung túc giàu phú quý.",
    illustration: {
      badge: "💰",
      concept: "Kho báu giàu sang",
      visualDesc: "Rương chứa vàng bạc châu báu lấp lánh tượng trưng cho sự phú quý dư dả."
    }
  },
  "寒": {
    components: ["宀", "艹", "人", "冫"],
    equation: "Trong nhà (宀) người (人) phải vùi mình trong rơm rạ (艹) vì băng tuyết (冫)",
    mnemonic: "Mùa đông buốt giá băng tuyết phủ đầy (冫), người trong nhà phải vùi thân vào rơm rạ tránh rét mướt căm căm.",
    illustration: {
      badge: "🥶",
      concept: "Mùa đông băng giá",
      visualDesc: "Mái nhà phủ tầng tuyết dày trắng xóa giữa trời đông giá lạnh."
    }
  },
  "寝": {
    components: ["宀", "爿", "彐"],
    equation: "宀 (Miên - gian phòng) + chiếc giường gỗ (爿) quét dọn tinh tươm",
    mnemonic: "Gian phòng ngủ ấm áp (宀) có chiếc giường gỗ sạch sẽ tinh tươm, ngả lưng chìm vào giấc ngủ an lành.",
    illustration: {
      badge: "🛏️",
      concept: "Giấc ngủ êm ái",
      visualDesc: "Chiếc giường êm ái đắp chăn ấm áp trong căn phòng ngủ tĩnh lặng."
    }
  },
  "察": {
    components: ["宀", "祭"],
    equation: "宀 (Miên - trong phòng xét xử) + 祭 (lễ bái soi xét tỏ tường)",
    mnemonic: "Dưới mái công đường (宀) quan sát tỉ mỉ như lúc hành lễ tế thần (祭), xem xét cẩn trọng thấu đáo.",
    illustration: {
      badge: "🔍",
      concept: "Quan sát tỉ mỉ",
      visualDesc: "Vị quan sát viên dùng kính lúp xem xét từng manh mối sự việc."
    }
  },
  "対": {
    components: ["文", "寸"],
    equation: "Cầm văn bản khế ước (phần trái) + đối chiếu bằng tay (寸)",
    mnemonic: "Hai người cầm hai nửa mảnh khế ước đưa tay (寸) ghép đối chiếu lại với nhau, biểu thị đối xứng, đối phó.",
    illustration: {
      badge: "🆚",
      concept: "Đối kháng so tài",
      visualDesc: "Hai đấu thủ mặt đối mặt so tài công bằng trên võ đài."
    }
  },
  "局": {
    components: ["尸", "勹", "口"],
    equation: "Người ngồi cúi mình (尸) bên bàn chia từng ô ngăn nắp (口)",
    mnemonic: "Ngồi khom lưng chăm chú trước bàn cờ chia từng ô ngăn nắp (口), chỉ từng cục diện, cơ quan chuyên trách.",
    illustration: {
      badge: "♟️",
      concept: "Thế trận ván cờ",
      visualDesc: "Bàn cờ vây với các quân đen trắng giằng co tạo nên cục diện cân não."
    }
  },
  "居": {
    components: ["尸", "古"],
    equation: "尸 (người ngồi an vị) + 古 (Cổ - tháng năm lâu dài)",
    mnemonic: "Ngồi an cư vững vàng (尸) qua bao năm tháng tháng ngày (古), tạo dựng nơi cư ngụ, sinh sống lâu bền.",
    illustration: {
      badge: "🛋️",
      concept: "Ngồi nghỉ an cư",
      visualDesc: "Góc phòng khách ấm cúng nơi gia chủ thảnh thơi ngồi đọc sách."
    }
  },
  "差": {
    components: ["羊", "工"],
    equation: "Bó lúa/con cừu (羊) đo đạc không đồng đều (工)",
    mnemonic: "Cân đo đàn cừu (羊) thấy con lớn con bé không đồng đều, tạo nên khoảng cách sai lệch, sai biệt.",
    illustration: {
      badge: "📏",
      concept: "Khoảng cách sai biệt",
      visualDesc: "Thước đo chỉ ra độ chênh lệch rõ ràng giữa hai cột mốc."
    }
  },
  "市": {
    components: ["亠", "巾"],
    equation: "Cột cờ hiệu (亠) + dải vải căng quầy bán hàng (巾)",
    mnemonic: "Dựng cột cờ hiệu (亠) treo dải băng rôn quầy hàng (巾), nơi tụ họp người mua bán đông đúc thành phố thị.",
    illustration: {
      badge: "🏙️",
      concept: "Thành phố sầm uất",
      visualDesc: "Đường phố đô thị nhộn nhịp xe cộ và những tòa nhà chọc trời rực rỡ ánh đèn."
    }
  },
  "師": {
    components: ["𠂤", "巾"],
    equation: "Đoàn quân tập hợp nề nếp dưới sự chỉ huy của bậc thầy",
    mnemonic: "Người đứng đầu dẫn dắt đoàn quân rèn luyện nghiêm minh, người thầy truyền dạy đạo lý làm người.",
    illustration: {
      badge: "👨‍🏫",
      concept: "Người thầy tôn kính",
      visualDesc: "Thầy giáo ân cần giảng giải bài học bổ ích cho học sinh bên bảng đen."
    }
  },
  "席": {
    components: ["广", "廿", "巾"],
    equation: "Dưới mái hiên (广) trải tấm chiếu cói (巾) phẳng phiu",
    mnemonic: "Dưới mái hiên râm mát (广) trải tấm thảm dệt tinh tươm (巾) làm chỗ ngồi trang trọng cho tân khách.",
    illustration: {
      badge: "🪑",
      concept: "Ghế ngồi trang trọng",
      visualDesc: "Chiếc ghế bọc nhung êm ái đặt ngay ngắn tại hàng ghế danh dự."
    }
  },
  "常": {
    components: ["⺌", "冖", "口", "巾"],
    equation: "Thượng (尚 nếp sống thanh cao) + Cân (巾 chiếc áo y phục mặc đều đặn)",
    mnemonic: "Chiếc áo mặc bền bỉ hàng ngày (巾) giữ gìn thanh sạch, tượng trưng cho nếp sống bình thường, thường lệ.",
    illustration: {
      badge: "🗓️",
      concept: "Nếp sống thường ngày",
      visualDesc: "Tách cà phê nóng bên tờ báo sáng tạo thói quen thư thái thường nhật."
    }
  },
  "平": {
    components: ["一", "丷", "十"],
    equation: "Mặt nước phẳng lặng (一) chia đều hai giọt nước đối xứng",
    mnemonic: "Mặt nước phẳng lặng trải rộng sang hai bên bằng phẳng không gợn sóng, mang lại cảm giác bình yên.",
    illustration: {
      badge: "🕊️",
      concept: "Mặt hồ phẳng lặng",
      visualDesc: "Mặt hồ gương phẳng lặng soi bóng mây trời trong xanh không một gợn sóng."
    }
  },
  "幸": {
    components: ["土", "丷", "干"],
    equation: "Còng tay được tháo bỏ thoát khỏi cảnh ngục tù hiểm nguy",
    mnemonic: "Thoát khỏi hiểm họa và xiềng xích tai ương bình an vô sự, quả là niềm may mắn hạnh phúc lớn lao.",
    illustration: {
      badge: "🍀",
      concept: "Cỏ bốn lá may mắn",
      visualDesc: "Nhánh cỏ bốn lá xanh biếc đem lại niềm may mắn và nụ cười rạng rỡ."
    }
  },
  "幾": {
    components: ["幺", "幺", "戈", "人"],
    equation: "Hai búi tơ nhỏ li ti (幺 幺) + binh khí canh chừng từng biến động nhỏ",
    mnemonic: "Cầm ngọn giáo canh phòng từng sợi tơ nhỏ manh nha biến chuyển, hỏi xem còn bao nhiêu mối nguy cơ.",
    illustration: {
      badge: "🔢",
      concept: "Bao nhiêu con số",
      visualDesc: "Những con số đếm tăng dần trên bảng điện tử đo lường chính xác."
    }
  },
  "座": {
    components: ["广", "土", "人", "人"],
    equation: "Dưới mái nhà lớn (广) hai người (人人) ngồi trên nền đất (土)",
    mnemonic: "Trong phòng ốc rộng lớn (广), mọi người an vị ngồi trên đệm êm (坐), biểu thị chỗ ngồi, tòa vị.",
    illustration: {
      badge: "💺",
      concept: "Ghế đệm êm ái",
      visualDesc: "Chiếc ghế sofa êm ái đặt ngay ngắn trong phòng khách ấm áp."
    }
  },
  "庭": {
    components: ["广", "廴", "壬"],
    equation: "Dưới mái hiên (广) mở ra khoảng sân thênh thang có lối đi (廷)",
    mnemonic: "Trước hiên nhà (广) có khoảng sân rộng thênh thang lát đá bước chân đi dạo (廷), chính là khu vườn, sân đình.",
    illustration: {
      badge: "🏡",
      concept: "Sân vườn thoáng đãng",
      visualDesc: "Khu vườn nhỏ trước sân nhà với thảm cỏ xanh mướt và khóm hoa rực rỡ."
    }
  },
  "式": {
    components: ["弋", "工"],
    equation: "Cọc tiêu chuẩn định (弋) + Thước thợ đo góc vuông chuẩn mực (工)",
    mnemonic: "Dùng thước đo (工) cắm cọc chuẩn mực (弋) làm khuôn mẫu đúng phép tắc, định hình phong cách, nghi thức.",
    illustration: {
      badge: "📐",
      concept: "Khuôn mẫu nghi thức",
      visualDesc: "Chiếc thước e-ke bằng gỗ đo góc vuông chuẩn xác cho bản vẽ kiến trúc."
    }
  },
  "引": {
    components: ["弓", "丨"],
    equation: "Cung tên (弓) + ngón tay kéo căng dây cung (丨)",
    mnemonic: "Dùng ngón tay kéo căng sợi dây cung (弓) lùi về sau chuẩn bị phóng tên, nghĩa là kéo, dẫn dắt.",
    illustration: {
      badge: "🏹",
      concept: "Kéo căng dây cung",
      visualDesc: "Cung thủ kéo căng dây cung tập trung cao độ nhắm thẳng hồng tâm."
    }
  },
  "当": {
    components: ["⺌", "彐"],
    equation: "Tia sáng soi rõ (⺌) bàn tay nắm bắt chuẩn xác (彐)",
    mnemonic: "Bàn tay nắm chuẩn xác vào trọng tâm vấn đề dưới ánh sáng rõ ràng, đánh trúng đích, đương nhiên.",
    illustration: {
      badge: "🎯",
      concept: "Đánh trúng đích",
      visualDesc: "Mũi phi tiêu cắm chuẩn xác vào tâm vòng tròn đem lại điểm tuyệt đối."
    }
  },
  "形": {
    components: ["开", "彡"],
    equation: "Khung sườn gỗ (开) + nét cọ phác họa sắc màu (彡)",
    mnemonic: "Dựng khung sườn gỗ rồi dùng bút cọ vẽ thêm đường nét sinh động (彡), tạo nên hình dáng hoàn chỉnh.",
    illustration: {
      badge: "🔷",
      concept: "Hình khối rõ nét",
      visualDesc: "Khối pha lê lục giác đa chiều phản chiếu ánh sáng sắc nét tuyệt đẹp."
    }
  },
  "役": {
    components: ["彳", "殳"],
    equation: "彳 (bước chân tuần tra) + 殳 (tay cầm vũ khí bảo vệ)",
    mnemonic: "Người lính cầm gậy bước tuần tra ngoài chiến hào làm tròn trách nhiệm, chỉ nghĩa vụ, vai diễn.",
    illustration: {
      badge: "🎭",
      concept: "Vai diễn ấn tượng",
      visualDesc: "Chiếc mặt nạ kịch nghệ biểu cảm sống động cho một vai diễn tài ba."
    }
  },
  "彼": {
    components: ["彳", "皮"],
    equation: "彳 (bước chân đi xa) + 皮 (bên ngoài, cách biệt)",
    mnemonic: "Người bước đi ở phía xa bên kia con đường (彳), chính là anh ấy, người đó.",
    illustration: {
      badge: "🚶‍♂️",
      concept: "Bóng dáng phương xa",
      visualDesc: "Bóng dáng một chàng trai bước đi trên con đường rợp bóng cây phong đỏ."
    }
  },
  "徒": {
    components: ["彳", "土", "疋"],
    equation: "彳 (bước chân) + bàn chân đạp trên nền đất (土)",
    mnemonic: "Tự mình dùng hai bàn chân bước đi trên nền đất bụi (土), chỉ người đi bộ, môn đồ theo học.",
    illustration: {
      badge: "🎒",
      concept: "Học trò tản bộ",
      visualDesc: "Cậu học trò đeo ba lô tản bộ vui vẻ trên con đường tới trường."
    }
  },
  "得": {
    components: ["彳", "旦", "寸"],
    equation: "彳 (bước đi tìm kiếm) + tay (寸) nhặt được báu vật sáng sớm (旦)",
    mnemonic: "Bước đi săn lùng rồi đưa tay (寸) chộp được báu vật quý giá, biểu thị đạt được, đắc lợi.",
    illustration: {
      badge: "🎁",
      concept: "Gặt hái thành quả",
      visualDesc: "Đôi bàn tay nâng niu phần thưởng xứng đáng sau bao nỗ lực bền bỉ."
    }
  },
  "御": {
    components: ["彳", "卸"],
    equation: "Cầm dây cương điều khiển cỗ xe ngựa tiến bước uy nghiêm",
    mnemonic: "Tay cầm chắc dây cương điều khiển cỗ xe ngựa tiến bước đĩnh đạc, từ tôn xưng kính trọng ngự ban.",
    illustration: {
      badge: "⛩️",
      concept: "Uy nghiêm cung kính",
      visualDesc: "Ngự điện hoàng gia tráng lệ biểu trưng cho sự tôn quý và uy nghiêm."
    }
  },
  "必": {
    components: ["心", "丿"],
    equation: "Nhát gươm (丿) vạch dứt khoát xuyên qua trái tim kiên định",
    mnemonic: "Một nhát vạch dứt khoát quyết định không thể lay chuyển, ắt hẳn, nhất định, tất yếu.",
    illustration: {
      badge: "🎯",
      concept: "Nhất định hoàn thành",
      visualDesc: "Mũi tên phóng thẳng một đường không đổi hướng về mục tiêu chắc chắn."
    }
  },
  "忘": {
    components: ["亡", "心"],
    equation: "亡 (Vong - biến mất) + 心 (Tâm - ký ức trong lòng)",
    mnemonic: "Ký ức trôi biến mất (亡) khỏi trái tim khối óc (心), biểu thị sự quên lãng, quên mất.",
    illustration: {
      badge: "💭",
      concept: "Ký ức nhạt nhòa",
      visualDesc: "Bong bóng ký ức bay dần lên cao rồi tan biến vào khoảng không mây mù."
    }
  },
  "忙": {
    components: ["忄", "亡"],
    equation: "忄 (Tâm - tâm trí) + 亡 (mất hết thời gian thảnh thơi)",
    mnemonic: "Tâm trí (忄) quay cuồng như mất hết cả sự thong dong (亡), bận rộn tối mắt tối mũi.",
    illustration: {
      badge: "🏃‍♂️💨",
      concept: "Hối hả bận rộn",
      visualDesc: "Người nhân viên hối hả tay cầm tập hồ sơ rảo bước giữa giờ làm việc."
    }
  },
  "念": {
    components: ["今", "心"],
    equation: "今 (Kim - ngay khoảnh khắc này) + 心 (Tâm - trái tim khắc ghi)",
    mnemonic: "Ngay lúc này đây (今) trong tim luôn khắc sâu hình bóng người xưa (心), tạo thành ý niệm, kỷ niệm.",
    illustration: {
      badge: "💭",
      concept: "Khắc ghi ý niệm",
      visualDesc: "Trái tim lưu giữ ký ức ngọt ngào tỏa ánh sáng ấm áp trong đêm."
    }
  },
  "怒": {
    components: ["奴", "心"],
    equation: "Nô (tấm thân chịu áp bức) + 心 (Tâm - ngọn lửa giận bùng cháy)",
    mnemonic: "Cơn uất ức dồn nén bùng phát từ tận đáy lòng (心), biến thành cơn thịnh nộ, phẫn nộ dữ dội.",
    illustration: {
      badge: "😡",
      concept: "Cơn lôi đình giận dữ",
      visualDesc: "Ngọn núi lửa phun trào dung nham đỏ rực thể hiện cơn thịnh nộ bùng phát."
    }
  },
  "怖": {
    components: ["忄", "布"],
    equation: "忄 (Tâm - trái tim run rẩy) + 布 (tấm vải che khuất bóng đen)",
    mnemonic: "Trong lòng (忄) run rẩy khi bóng đen trùm tấm vải trắng (布) xuất hiện trong đêm tối, sợ hãi khiếp sợ.",
    illustration: {
      badge: "😨",
      concept: "Nỗi sợ đêm tối",
      visualDesc: "Đôi mắt tròn xoe ánh lên sự hoảng sợ trước bóng tối ma mị."
    }
  },
  "性": {
    components: ["忄", "生"],
    equation: "忄 (Tâm - tâm tính) + 生 (Sinh - bẩm sinh từ lúc chào đời)",
    mnemonic: "Tâm tính (忄) vốn có sẵn từ khi sinh ra đời (生), biểu thị bản tính tự nhiên và tính cách con người.",
    illustration: {
      badge: "🌱",
      concept: "Bản tính tự nhiên",
      visualDesc: "Hạt giống mầm non mang bản năng tự nhiên vươn về phía ánh sáng mặt trời."
    }
  },
  "恐": {
    components: ["工", "凡", "心"],
    equation: "Chênh vênh lo sợ sụp đổ + 心 (Tâm - tim đập liên hồi)",
    mnemonic: "Trái tim (心) thắt lại hoảng hốt trước mối nguy lớn lao có thể ập đến, biểu thị khủng hoảng, khiếp hãi.",
    illustration: {
      badge: "😱",
      concept: "Khủng hoảng âu lo",
      visualDesc: "Cơn bão sấm chớp giáng xuống khiến bầu trời chìm trong kinh hoàng."
    }
  },
  "恥": {
    components: ["耳", "心"],
    equation: "耳 (Nhĩ - vành tai đỏ ửng) + 心 (Tâm - xấu hổ trong lòng)",
    mnemonic: "Khi trong lòng (心) thấy hổ thẹn có lỗi, vành tai (耳) liền đỏ ửng bừng nóng, đó là sự xấu hổ, sỉ nhục.",
    illustration: {
      badge: "😳",
      concept: "Đỏ mặt xấu hổ",
      visualDesc: "Khuôn mặt đỏ ửng hai má đưa tay che mặt ngượng ngùng."
    }
  },
  "息": {
    components: ["自", "心"],
    equation: "Tự (自 chiếc mũi hít thở) + 心 (Tâm - trái tim phập phồng)",
    mnemonic: "Không khí từ mũi (自) đi thẳng vào nuôi dưỡng trái tim nhịp đập (心), duy trì từng hơi thở sự sống.",
    illustration: {
      badge: "🫁",
      concept: "Hơi thở nhịp nhàng",
      visualDesc: "Làn sương mờ trắng nhẹ nhàng bay ra từ hơi thở ấm áp trong mùa đông."
    }
  },
  "悲": {
    components: ["非", "心"],
    equation: "非 (đôi cánh rẽ lìa chia ly) + 心 (Tâm - đáy lòng tan nát)",
    mnemonic: "Đôi cánh rẽ lìa chia đôi ngả đường (非), để lại nỗi xót xa tan nát nơi đáy lòng (心), đó là nỗi đau bi thương.",
    illustration: {
      badge: "😢",
      concept: "Giọt lệ bi ai",
      visualDesc: "Giọt nước mắt lăn dài trên gò má dưới cơn mưa chiều u buồn."
    }
  },
  "情": {
    components: ["忄", "青"],
    equation: "忄 (Tâm - cảm xúc trong tim) + 青 (Thanh - tinh khiết trong lành)",
    mnemonic: "Trái tim rung cảm chân thành (忄) trong sáng như sắc xanh thanh xuân (青), tạo nên tình cảm gắn bó tha thiết.",
    illustration: {
      badge: "💙",
      concept: "Tình cảm chân thành",
      visualDesc: "Trái tim màu xanh ngọc bích tỏa ánh sáng ấm áp dịu dàng."
    }
  },
  "想": {
    components: ["相", "心"],
    equation: "相 (nhìn ngắm tương quan) + 心 (Tâm - tấm lòng chiêm nghiệm)",
    mnemonic: "Đôi mắt dõi nhìn vạn vật xung quanh rồi gửi gắm cảm xúc vào đáy lòng (心), tưởng tượng và mong nhớ.",
    illustration: {
      badge: "💭",
      concept: "Tưởng tượng bay bổng",
      visualDesc: "Đám mây suy tưởng lung linh hình ảnh những vì sao lấp lánh."
    }
  },
  "愛": {
    components: ["爫", "冖", "心", "夂"],
    equation: "Bàn tay vuốt ve + ôm ấp trái tim (心) + bước chân quyến luyến không rời (夂)",
    mnemonic: "Trái tim rung động trao đi (心) dang tay ôm ấp che chở không nỡ rời bước (夂), đó chính là tình yêu thương tha thiết.",
    illustration: {
      badge: "❤️",
      concept: "Tình yêu nồng ấm",
      visualDesc: "Trái tim đỏ thắm rực rỡ tỏa ra những ánh hào quang ấm áp yêu thương."
    }
  },
  "感": {
    components: ["咸", "心"],
    equation: "Hàm (tất cả cùng rung động) + 心 (Tâm - trái tim thấu cảm)",
    mnemonic: "Tất cả mọi người cùng chung một nhịp đập nơi trái tim (心), xúc động nghẹn ngào cảm kích.",
    illustration: {
      badge: "🥺",
      concept: "Rung động cảm kích",
      visualDesc: "Đôi bàn tay đặt lên ngực thể hiện lòng biết ơn sâu sắc và xúc động."
    }
  },
  "慣": {
    components: ["忄", "貫"],
    equation: "忄 (Tâm - tâm trí) + 貫 (xâu chuỗi lặp đi lặp lại thành xâu tiền)",
    mnemonic: "Việc làm được xâu chuỗi lặp đi lặp lại đều đặn (貫) khắc sâu vào tâm trí (忄), hình thành thói quen tập quán.",
    illustration: {
      badge: "🔄",
      concept: "Thói quen nề nếp",
      visualDesc: "Vòng chuông báo thức quen thuộc mỗi sáng tạo dựng nếp sống lành mạnh."
    }
  },
  "成": {
    components: ["戊", "𠃌"],
    equation: "Vung cây rìu chiến hoàn thành công trình phòng thủ",
    mnemonic: "Rèn xong lưỡi rìu chiến vững chãi sẵn sàng xuất trận, việc lớn đã hoàn tất, thành công mĩ mãn.",
    illustration: {
      badge: "🏆",
      concept: "Thành công trọn vẹn",
      visualDesc: "Chiếc cúp vàng lấp lánh vinh danh sự nghiệp thành công rực rỡ."
    }
  },
  "戦": {
    components: ["単", "戈"],
    equation: "単 (bẫy săn đón bắt) + 戈 (ngọn giáo sắt xông pha)",
    mnemonic: "Cầm ngọn giáo bén (戈) giáp lá cà xông pha trận mạc, bước vào cuộc chiến đấu bảo vệ quê hương.",
    illustration: {
      badge: "⚔️",
      concept: "Trận chiến nảy lửa",
      visualDesc: "Hai thanh kiếm chéo nhau rực lửa trong trận quyết đấu dũng mãnh."
    }
  },
  "戻": {
    components: ["戸", "犬"],
    equation: "戸 (cánh cửa khép) + 犬 (chú chó trung thành tìm về)",
    mnemonic: "Chú chó cưng (犬) chạy chơi xa cuối ngày lại quay trở về gõ cánh cửa nhà quen thuộc (戸), quay trở lại.",
    illustration: {
      badge: "🔙",
      concept: "Quay về chốn xưa",
      visualDesc: "Chú cún mừng rỡ cào chân vào cánh cửa gỗ ấm cúng khi trở về nhà."
    }
  },
  "所": {
    components: ["戸", "斤"],
    equation: "戸 (cánh cửa gỗ) + 斤 (chiếc rìu đẽo cột dựng nhà)",
    mnemonic: "Dùng rìu đẽo gỗ (斤) dựng nên cánh cửa (戸) che chắn gian phòng, tạo nên nơi chốn sinh hoạt, cơ sở.",
    illustration: {
      badge: "🏠",
      concept: "Nơi chốn bình yên",
      visualDesc: "Căn phòng gỗ ấm áp sáng ánh đèn lồng là nơi chốn trở về sau ngày dài."
    }
  },
  "才": {
    components: ["才"],
    equation: "Chữ tượng hình chồi non xanh bung hạt đâm chồi",
    mnemonic: "Chồi non tràn đầy sức sống đâm thủng mặt đất vươn lên đón nắng, tượng trưng cho hạt giống tài năng nảy nở.",
    illustration: {
      badge: "🌱",
      concept: "Mầm non tài ba",
      visualDesc: "Chồi mầm xanh vươn thẳng mãnh liệt biểu tượng cho tài năng bừng nở."
    }
  },
  "打": {
    components: ["扌", "丁"],
    equation: "扌 (Thủ - bàn tay vung búa) + 丁 (Đinh - đinh cọc cắm xuống)",
    mnemonic: "Bàn tay vung búa gõ côm cốp vào cây đinh (丁), tạo nên động tác đánh, gõ, đập nhịp nhàng.",
    illustration: {
      badge: "🔨",
      concept: "Vung búa gõ đinh",
      visualDesc: "Chiếc búa gõ vang nhát đóng dứt khoát đưa chiếc đinh cắm ngập vào thanh gỗ."
    }
  },
  "払": {
    components: ["扌", "厶"],
    equation: "扌 (Thủ - bàn tay xua đi) + 厶 (góc nhỏ xua bụi)",
    mnemonic: "Bàn tay (扌) gạt sạch bụi bẩn vương vãi, hoặc đưa tay chi trả tiền bạc để giải quyết xong xuôi.",
    illustration: {
      badge: "💳",
      concept: "Chi trả nhanh chóng",
      visualDesc: "Chiếc thẻ thanh toán chạm nhẹ hoàn tất việc chi trả một cách tiện lợi."
    }
  },
  "投": {
    components: ["扌", "殳"],
    equation: "扌 (Thủ - bàn tay cầm bóng) + 殳 (hành động vung tay phóng mạnh)",
    mnemonic: "Bàn tay nắm chắc đồ vật (扌) lấy đà vung hết sức ném vút ra xa, động tác ném bóng, đầu tư.",
    illustration: {
      badge: "⚾",
      concept: "Ném bóng điêu luyện",
      visualDesc: "Cầu thủ bóng chày lấy đà vung cánh tay ném quả bóng bay vút với vận tốc cực nhanh."
    }
  },
  "折": {
    components: ["扌", "斤"],
    equation: "扌 (Thủ - bàn tay giữ cành) + 斤 (chiếc rìu chém gãy)",
    mnemonic: "Dùng rìu (斤) và đôi bàn tay (扌) bẻ cong cành cây thành hai khúc, biểu thị bẻ gãy, gấp xếp giấy Origami.",
    illustration: {
      badge: "🦢",
      concept: "Gấp hạc giấy Origami",
      visualDesc: "Chú hạc giấy origami xinh xắn được gấp tinh xảo từng nếp gấp chuẩn xác."
    }
  },
  "抜": {
    components: ["扌", "友"],
    equation: "扌 (Thủ - bàn tay nắm rễ) + dốc lực kéo mạnh bung lên",
    mnemonic: "Bàn tay (扌) nắm chắc gốc củ cải dốc sức nhổ mạnh bật cả gốc rễ lên khỏi luống đất, nghĩa là rút, nhổ.",
    illustration: {
      badge: "🥕",
      concept: "Nhổ bật gốc rễ",
      visualDesc: "Bàn tay nhổ củ cà rốt tươi ngon bật khỏi luống đất phù sa màu mỡ."
    }
  },
  "抱": {
    components: ["扌", "包"],
    equation: "扌 (Thủ - đôi cánh tay) + 包 (Bao - gói trọn vào lòng)",
    mnemonic: "Đôi tay dang rộng (扌) ôm trọn đứa con thơ bọc trong tấm khăn êm (包), ấp ủ tình cảm thiêng liêng.",
    illustration: {
      badge: "🤗",
      concept: "Vòng tay ôm ấm áp",
      visualDesc: "Vòng tay ấm áp ôm siết yêu thương trao gửi niềm an ủi ngọt ngào."
    }
  },
  "押": {
    components: ["扌", "甲"],
    equation: "扌 (Thủ - ngón tay ấn mạnh) + 甲 (mặt phẳng cứng/con dấu)",
    mnemonic: "Dùng đầu ngón tay (扌) ấn mạnh lên mặt con dấu hoặc phím bấm (甲), nhấn xuống đóng dấu xác nhận.",
    illustration: {
      badge: "🔘",
      concept: "Ấn nút khởi động",
      visualDesc: "Ngón tay nhấn nút tròn phát sáng kích hoạt cỗ máy vận hành."
    }
  },
  "招": {
    components: ["扌", "召"],
    equation: "扌 (Thủ - bàn tay vẫy chào) + 召 (Triệu - lời triệu mời)",
    mnemonic: "Đưa bàn tay lên vẫy vẫy (扌) kèm theo nụ cười rạng rỡ cất tiếng mời gọi quan khách (召), chiêu đãi tân khách.",
    illustration: {
      badge: "🙋",
      concept: "Vẫy tay chào đón",
      visualDesc: "Chú mèo thần tài Maneki-neko vẫy bàn tay đón chào khách hàng may mắn."
    }
  },
  "指": {
    components: ["扌", "旨"],
    equation: "扌 (Thủ - bàn tay) + 旨 (thìa múc nếm món ngon)",
    mnemonic: "Đưa ngón tay (扌) chỉ thẳng vào món ngon trên bàn tiệc (旨), biểu thị ngón tay và hành động chỉ trỏ hướng dẫn.",
    illustration: {
      badge: "👉",
      concept: "Ngón tay chỉ lối",
      visualDesc: "Ngón tay chỉ chuẩn xác theo tấm biển hướng dẫn bên ngã rẽ con đường."
    }
  },
  "捕": {
    components: ["扌", "甫"],
    equation: "扌 (Thủ - bàn tay truy bắt) + 甫 (truy đuổi bắt kẻ trộm)",
    mnemonic: "Bàn tay vươn nhanh tóm gọn lấy kẻ phạm tội (甫), bắt giữ lại quy phục trước pháp luật.",
    illustration: {
      badge: "🎣",
      concept: "Bắt giữ chuẩn xác",
      visualDesc: "Vợt lưới quăng ra bắt trọn chú cá bạc đang quẫy sóng dưới nước."
    }
  },
  "掛": {
    components: ["扌", "圭", "卜"],
    equation: "扌 (Thủ - bàn tay nâng) + quẻ bói khắc trên thẻ tre (卦)",
    mnemonic: "Bàn tay (扌) cẩn thận móc chiếc áo hoặc tấm biển quẻ bói (卦) lên chiếc đinh trên tường, treo lên mắc áo.",
    illustration: {
      badge: "🧥",
      concept: "Treo áo lên móc",
      visualDesc: "Chiếc áo khoác mùa đông treo gọn gàng trên chiếc móc áo bằng gỗ cạnh cửa ra vào."
    }
  },
  "探": {
    components: ["扌", "穴", "木"],
    equation: "扌 (Thủ - bàn tay mò mẫm) + 罙 (hang sâu hun hút 穴)",
    mnemonic: "Đưa bàn tay (扌) thò vào kẽ hang đá sâu thăm thẳm (穴) để lần mò tìm kiếm kho báu, thám hiểm khám phá.",
    illustration: {
      badge: "🔦",
      concept: "Thám hiểm tìm kiếm",
      visualDesc: "Chiếc đèn pin rọi luồng sáng xuyên qua hang động bí ẩn tìm lối đi."
    }
  },
  "支": {
    components: ["十", "又"],
    equation: "Bàn tay (又) cầm cành tre thẳng (十) chống đỡ",
    mnemonic: "Bàn tay cầm cành cây vững chắc chống đỡ cho mái lều không bị sụp, biểu thị chi viện, chi nhánh.",
    illustration: {
      badge: "🪵",
      concept: "Cột trụ chống đỡ",
      visualDesc: "Thanh gỗ chống đỡ vững chãi giữ cho cành cây trĩu quả không bị gãy."
    }
  },
  "放": {
    components: ["方", "攵"],
    equation: "方 (chiếc thuyền bè) + 攵 (bàn tay đẩy bè trôi xuôi dòng)",
    mnemonic: "Dùng cây sào đẩy chiếc bè (方) trôi tự do xuôi theo dòng nước, thả tự do, phóng thích.",
    illustration: {
      badge: "🕊️",
      concept: "Thả chim tự do",
      visualDesc: "Đôi bàn tay mở rộng phóng sinh chú chim bồ câu bay vút vào nền trời xanh."
    }
  },
  "政": {
    components: ["正", "攵"],
    equation: "正 (Chính - điều ngay thẳng đúng đắn) + 攵 (tay cầm roi đốc thúc kỷ cương)",
    mnemonic: "Dùng pháp luật và kỷ cương (攵) giữ cho đất nước đi vào con đường ngay thẳng công bằng (正), đó là chính trị.",
    illustration: {
      badge: "🏛️",
      concept: "Chính quyền công minh",
      visualDesc: "Tòa nghị viện uy nghiêm biểu tượng cho nền chính trị pháp quyền vững mạnh."
    }
  },
  "敗": {
    components: ["貝", "攵"],
    equation: "貝 (tiền tài vỏ sò bảo vật) + 攵 (nhát gậy đập vỡ nát)",
    mnemonic: "Chiếc bình báu vỏ sò (貝) bị nhát gậy đập vỡ tan tành (攵), trắng tay nhận lấy kết cục thất bại cay đắng.",
    illustration: {
      badge: "💔",
      concept: "Vỡ tan thất bại",
      visualDesc: "Mảnh gốm quý vỡ tan trên nền đá để lại bài học kinh nghiệm sâu sắc."
    }
  },
  "散": {
    components: ["艹", "一", "月", "攵"],
    equation: "Cầm gậy đập bó cỏ khô hoa lá tung bay tứ tán",
    mnemonic: "Gió thổi nhát gậy gõ tung bay những cánh hoa tản mác khắp bốn phương trời, giải tán, tản bộ thong dong.",
    illustration: {
      badge: "🍃",
      concept: "Lá hoa tung bay",
      visualDesc: "Những cánh hoa bồ công anh rực rỡ phân tán bay theo chiều gió lộng."
    }
  },
  "数": {
    components: ["米", "女", "攵"],
    equation: "Gạo (米) + phụ nữ (女) + tay cầm que tính đếm (攵)",
    mnemonic: "Người phụ nữ (女) cầm que tính (攵) cẩn thận đếm từng thúng hạt gạo (米) thu hoạch, tạo thành các con số toán học.",
    illustration: {
      badge: "🔢",
      concept: "Tính toán con số",
      visualDesc: "Bàn tính gẩy Soroban với những hạt gỗ xếp hàng tính toán chuẩn xác."
    }
  },
  "断": {
    components: ["米", "乚", "斤"],
    equation: "Bó dây tơ chằng chịt bị chiếc rìu sắc (斤) chặt đứt lìa",
    mnemonic: "Vung chiếc rìu sắc bén (斤) chém đứt lìa mối tơ vướng víu, đưa ra quyết định đoạn tuyệt dứt khoát.",
    illustration: {
      badge: "✂️",
      concept: "Chặt đứt dứt khoát",
      visualDesc: "Nhát cắt dứt khoát chia đôi sợi dây thừng giải phóng sự vướng bận."
    }
  },
  "易": {
    components: ["日", "勿"],
    equation: "Nhật (mặt trời) + chân con tắc kè hoa đổi màu thoăn thoắt",
    mnemonic: "Con tắc kè hoa biến đổi màu da thoăn thoắt dưới nắng trời, biểu thị sự thay đổi linh hoạt và dễ dàng.",
    illustration: {
      badge: "🦎",
      concept: "Tắc kè đổi màu",
      visualDesc: "Chú tắc kè hoa đổi sắc uyển chuyển thích nghi hoàn hảo với màu cành lá."
    }
  },
  "昔": {
    components: ["艹", "一", "日"],
    equation: "Lớp cỏ rêu phong phủ dày lên bao ngày tháng đã qua (日)",
    mnemonic: "Bao nhiêu ngày nắng tháng mưa (日) đã trôi qua lớp rêu phong phủ mờ, gợi nhớ về thời xa xưa cổ tích.",
    illustration: {
      badge: "⏳",
      concept: "Dấu ấn ngày xưa",
      visualDesc: "Đồng hồ cát cổ kính chảy chậm rãi đong đếm những ký ức xa xưa."
    }
  },
  "昨": {
    components: ["日", "乍"],
    equation: "日 (Nhật - ngày mặt trời) + 乍 (vừa mới trôi qua chốc lát)",
    mnemonic: "Vầng mặt trời của một ngày (日) vừa mới khuất bóng thoắt qua đây (乍), chính là ngày hôm qua.",
    illustration: {
      badge: "📆",
      concept: "Tờ lịch hôm qua",
      visualDesc: "Tờ lịch ngày hôm qua vừa được lật mở sang trang ghi lại bao việc đã qua."
    }
  },
  "晩": {
    components: ["日", "免"],
    equation: "日 (Nhật - mặt trời) + 免 (buông bỏ công việc về nhà nghỉ ngơi)",
    mnemonic: "Mặt trời lặn bóng (日), người lao động trút bỏ hết gánh nặng việc làm (免) về bên mâm cơm tối ấm cúng.",
    illustration: {
      badge: "🌆",
      concept: "Hoàng hôn buông xuống",
      visualDesc: "Ánh hoàng hôn ráng chiều nhuộm tím rực rỡ góc trời lúc chiều tối."
    }
  },
  "景": {
    components: ["日", "京"],
    equation: "日 (Nhật - ánh mặt trời chan hòa) + 京 (Kinh - kinh thành lầu cao)",
    mnemonic: "Ánh mặt trời rực rỡ (日) chiếu rọi lên các tòa lầu cao nơi kinh thành tráng lệ (京), tạo nên bức tranh phong cảnh tuyệt mỹ.",
    illustration: {
      badge: "🌄",
      concept: "Phong cảnh tuyệt mỹ",
      visualDesc: "Ngọn núi Phú Sĩ soi bóng xuống mặt hồ lung linh dưới ánh ban mai tuyệt đẹp."
    }
  },
  "晴": {
    components: ["日", "青"],
    equation: "日 (Nhật - mặt trời rạng rỡ) + 青 (Thanh - bầu trời trong xanh)",
    mnemonic: "Mặt trời (日) ló rạng xua tan mây mù, để lộ khoảng trời xanh biếc tinh khôi (青), thời tiết tạnh ráo nắng đẹp.",
    illustration: {
      badge: "☀️",
      concept: "Trời quang mây tạnh",
      visualDesc: "Bầu trời trong xanh không một bóng mây với ánh nắng vàng ấm áp rực rỡ."
    }
  },
  "暗": {
    components: ["日", "音"],
    equation: "日 (Nhật - mặt trời bị che khuất) + 音 (chỉ còn nghe tiếng động)",
    mnemonic: "Mặt trời (日) đã lặn khuất bóng chỉ còn nghe thấy tiếng động âm vang (音) mơ hồ trong đêm tối tăm mịt mờ.",
    illustration: {
      badge: "🌑",
      concept: "Màn đêm tối tăm",
      visualDesc: "Màn đêm u tịch bao trùm cảnh vật chỉ le lói ánh đom đóm lập lòe."
    }
  },
  "暮": {
    components: ["艹", "日", "大", "日"],
    equation: "Mặt trời (日) chìm dần sau rặng cây cỏ lau rậm rạp (艹...大)",
    mnemonic: "Vầng dương (日) từ từ khuất dạng sau ngọn cỏ lau chiều hôm, báo hiệu buổi hoàng hôn chiều tà buông xuống.",
    illustration: {
      badge: "🌇",
      concept: "Ánh chiều tà buông",
      visualDesc: "Mặt trời đỏ ối dần chìm lấp sau rặng cây khi đàn chim ríu rít bay về tổ."
    }
  },
  "曲": {
    components: ["曲"],
    equation: "Chữ tượng hình thanh tre uốn cong tạo thành chiếc giỏ",
    mnemonic: "Những thanh tre uốn cong nhịp nhàng đan thành chiếc làn, ví như giai điệu khúc nhạc uốn lượn trầm bổng.",
    illustration: {
      badge: "🎵",
      concept: "Giai điệu khúc nhạc",
      visualDesc: "Dòng khuông nhạc uốn lượn với những nốt nhạc nhảy múa rộn ràng."
    }
  },
  "更": {
    components: ["一", "日", "乂"],
    equation: "Gẩy bấc đèn dầu lúc canh khuya sang canh mới",
    mnemonic: "Đêm khuya cầm que khêu bấc ngọn đèn dầu đổi sang canh giờ mới, tượng trưng cho sự đổi mới, canh tân.",
    illustration: {
      badge: "🔄",
      concept: "Đổi mới canh tân",
      visualDesc: "Mầm xanh đâm chồi từ thân cây cũ biểu thị sự đổi mới tràn đầy sức sống."
    }
  },
  "最": {
    components: ["日", "取"],
    equation: "日 (Nhật - vị trí cao nhất như mặt trời) + 取 (Thủ - đoạt lấy hạng nhất)",
    mnemonic: "Đoạt lấy chiến công đứng đầu sáng chói như mặt trời (日 取), biểu thị mức độ cao nhất, tối thượng.",
    illustration: {
      badge: "🥇",
      concept: "Huy chương vàng quán quân",
      visualDesc: "Tấm huy chương vàng khắc số một chói lọi dành cho người xuất sắc nhất."
    }
  },
  "望": {
    components: ["亡", "月", "王"],
    equation: "Đứng kiễng chân (𡈼) ngước mắt ngắm vầng trăng sáng (月) xa xôi",
    mnemonic: "Đứng kiễng chân trên đỉnh đồi dõi mắt trông ngóng vầng trăng sáng trên bầu trời cao, gửi gắm niềm hy vọng bao la.",
    illustration: {
      badge: "🔭",
      concept: "Kính viễn vọng nhìn xa",
      visualDesc: "Chiếc kính thiên văn ngắm nhìn các vì sao lấp lánh và vầng trăng ước vọng."
    }
  },
  "期": {
    components: ["其", "月"],
    equation: "其 (khuôn phân định) + 月 (chu kỳ tuần trăng tròn khuyết)",
    mnemonic: "Chu kỳ mặt trăng tròn rồi lại khuyết (月) định ra từng mốc thời gian rõ ràng, tạo nên kỳ hạn và thời kỳ.",
    illustration: {
      badge: "📅",
      concept: "Mốc hạn chu kỳ",
      visualDesc: "Tờ lịch khoanh tròn một ngày kỷ niệm quan trọng đánh dấu đúng kỳ hạn."
    }
  }
};

const rootJsonPath = path.join(__dirname, '../kanji_full_database.json');
const publicJsonPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootJsPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicJsonPath, 'utf8'));

let count = 0;
for (const [char, patch] of Object.entries(n3bData)) {
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

console.log(`[Batch 3B - N3 Part 2] Đã cập nhật thành công ${count} / ${Object.keys(n3bData).length} chữ Kanji N3.`);

fs.writeFileSync(publicJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsPath, 'window.KANJI_FULL_DATABASE = ' + JSON.stringify(db, null, 2) + ';\n', 'utf8');
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
