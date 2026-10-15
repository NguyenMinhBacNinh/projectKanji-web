/**
 * Batch 5L: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 95 chữ Kanji N1 tiếp theo (từ 貴 đến 鏡)
 */

const fs = require('fs');
const path = require('path');

const n1lData = {
  "貴": {
    "components": ["中", "一", "貝"],
    "equation": "Vỏ sò ngọc quý (貝) được cất giữ trang trọng ở trung tâm (中 一)",
    "mnemonic": "Món đồ quý giá vô song và người có nhân phẩm cao thượng được muôn người tôn kính, cao quý, quý giá, quý tộc.",
    "illustration": {
      "badge": "👑",
      "concept": "Viên bảo ngọc cao quý",
      "visualDesc": "Viên bảo ngọc tỏa ánh sáng lộng lẫy đặt trên đệm nhung đỏ quyền quý."
    }
  },
  "賀": {
    "components": ["加", "貝"],
    "equation": "Thêm vào (加) những món quà và tiền mừng quý báu (貝) gửi tới gia chủ",
    "mnemonic": "Gửi lời chúc mừng và quà tặng chung vui ngày cưới hỏi hay mừng thọ, chúc tụng, chúc mừng, hạ thọ khánh hạ.",
    "illustration": {
      "badge": "🎊",
      "concept": "Thiệp chúc mừng khánh hạ tươi vui",
      "visualDesc": "Tấm thiệp mừng thắt nơ đỏ vàng gửi lời chúc phúc cát tường nhân dịp hỷ sự."
    }
  },
  "賃": {
    "components": ["任", "貝"],
    "equation": "Giao phó trách nhiệm làm việc (任) kèm theo tiền công thù lao xứng đáng (貝)",
    "mnemonic": "Tiền trả cho việc thuê nhà hay thuê sức lao động theo thỏa thuận, tiền thuê, tiền công, giá thuê mướn.",
    "illustration": {
      "badge": "💵",
      "concept": "Thanh toán tiền thuê nhà hàng tháng",
      "visualDesc": "Phong bì đựng tiền thuê nhà gửi cho chủ nhà với sự hài lòng của hai bên."
    }
  },
  "賄": {
    "components": ["貝", "有"],
    "equation": "Dùng tiền bạc của cải (貝) có sẵn trong tay (有) ngấm ngầm mua chuộc quan lại",
    "mnemonic": "Hành vi lén lút đút lót tiền của bẻ cong luật pháp hoặc chu cấp bữa ăn, hối lộ, đút lót, chu cấp bữa ăn.",
    "illustration": {
      "badge": "🤫",
      "concept": "Lên án hành vi hối lộ đút lót",
      "visualDesc": "Chiếc phong bì đen dưới gầm bàn bị gạch chéo cảnh báo tệ nạn tham nhũng tiêu cực."
    }
  },
  "賊": {
    "components": ["貝", "戎"],
    "equation": "Cầm vũ khí giáo mác (戎) cướp bóc tiền của tài sản (貝) của người dân",
    "mnemonic": "Kẻ cướp dùng vũ lực cướp bóc của cải gây hiểm họa cho xóm làng, giặc cướp, hải tặc, đạo tặc trộm cướp.",
    "illustration": {
      "badge": "🏴‍☠️",
      "concept": "Lá cờ đầu lâu của hải tặc",
      "visualDesc": "Con tàu cướp biển giương buồm đen lướt sóng gieo rắc nỗi khiếp sợ trên biển khơi."
    }
  },
  "賓": {
    "components": ["宀", "兵", "貝"],
    "equation": "Vị khách quý bước vào mái nhà (宀) được đón tiếp trân trọng bằng lễ vật quý (貝)",
    "mnemonic": "Khách quý phương xa đến thăm được chủ nhà ân cần đón tiếp nồng hậu, khách quý, tân khách, quý tân.",
    "illustration": {
      "badge": "🛎️",
      "concept": "Đón tiếp khách quý tại sảnh",
      "visualDesc": "Nhân viên sảnh cúi chào lịch thiệp đón tiếp vị khách quý bước vào khách sạn sang trọng."
    }
  },
  "賜": {
    "components": ["貝", "易"],
    "equation": "Tiền bạc của quý (貝) được bề trên dễ dàng cởi mở ban phát (易) cho kẻ dưới",
    "mnemonic": "Vua chúa hay bề trên rộng lòng ban tặng phần thưởng cao quý cho người có công, ban thưởng, ban cho, ơn tứ.",
    "illustration": {
      "badge": "🎁",
      "concept": "Bề trên ban thưởng ơn lộc",
      "visualDesc": "Chiếc hộp gấm đựng bảo kiếm triều đình ân tứ ban thưởng cho dũng tướng."
    }
  },
  "賠": {
    "components": ["貝", "咅"],
    "equation": "Dùng tiền của (貝) bồi đắp vào chỗ tổn thất cho đối phương (咅)",
    "mnemonic": "Đền bù tiền bạc để khắc phục những thiệt hại mà mình đã gây ra cho người khác, bồi thường, đền bù bồi hoàn.",
    "illustration": {
      "badge": "🤝",
      "concept": "Ký kết thỏa thuận bồi thường thiệt hại",
      "visualDesc": "Bản thỏa thuận bồi thường được ký kết thiện chí khắc phục tổn thất sau sự cố."
    }
  },
  "賦": {
    "components": ["貝", "武"],
    "equation": "Thu tiền bạc của cải (貝) để duy trì lực lượng quân sự võ bị (武)",
    "mnemonic": "Khoản thuế nộp nuôi quân đội và tài năng thiên phú do trời đất ban tặng bẩm sinh, thuế khóa, bài phú, phú bẩm thiên phú.",
    "illustration": {
      "badge": "🎨",
      "concept": "Tài năng thiên phú trời ban",
      "visualDesc": "Họa sĩ nhí vẽ nên bức tranh tuyệt mỹ thể hiện tài năng thiên phú bẩm sinh diệu kỳ."
    }
  },
  "購": {
    "components": ["貝", "冓"],
    "equation": "Dùng tiền bạc của cải (貝) kết nối trao đổi (冓) lấy hàng hóa cần thiết",
    "mnemonic": "Bỏ tiền ra mua sắm vật phẩm phục vụ cuộc sống và sản xuất, mua sắm, thu mua, cấu mãi đặt mua hàng.",
    "illustration": {
      "badge": "🛒",
      "concept": "Xe đẩy mua sắm hàng hóa siêu thị",
      "visualDesc": "Chiếc xe đẩy chất đầy hàng hóa tươi ngon trong siêu thị hiện đại tiện nghi."
    }
  },
  "赦": {
    "components": ["赤", "攵"],
    "equation": "Tấm lòng trong sáng đỏ thắm (赤) giơ tay khoan dung (攵) tha bổng cho người lầm lỗi",
    "mnemonic": "Mở lượng hải hà tha thứ tội lỗi cho người biết ăn năn hối cải quay đầu, xá tội, tha thứ, đại xá thiên hạ.",
    "illustration": {
      "badge": "🕊️",
      "concept": "Thả chim bồ câu biểu trưng đại xá",
      "visualDesc": "Đôi bồ câu trắng tung cánh bay lên bầu trời xanh biểu trưng lệnh đại xá xua tan tội lỗi."
    }
  },
  "赳": {
    "components": ["走", "丩"],
    "equation": "Chạy nhanh sải bước (走) với khí thế hiên ngang xoắn bện lực lưỡng (丩)",
    "mnemonic": "Dáng điệu hùng dũng hiên ngang kiên cường của người tráng sĩ dấn thân vì nước, hùng dũng, hiên ngang, dũng cảm.",
    "illustration": {
      "badge": "🦸",
      "concept": "Tướng sĩ hùng dũng xông pha",
      "visualDesc": "Vị tráng sĩ dáng dấp oai phong lẫm liệt sải bước tiến về phía trước đầy hào khí."
    }
  },
  "赴": {
    "components": ["走", "卜"],
    "equation": "Chạy nhanh sải bước (走) đi theo tiếng gọi chỉ đường của quẻ bói (卜)",
    "mnemonic": "Lên đường nhận nhiệm vụ mới hoặc dấn thân vào chốn hiểm nguy không chút do dự, đi tới, phó nhậm, dấn thân.",
    "illustration": {
      "badge": "🧳",
      "concept": "Lên đường đi nhận nhiệm vụ mới",
      "visualDesc": "Người cán bộ xách vali bước lên chuyến tàu đi tới vùng đất mới nhận công tác."
    }
  },
  "趣": {
    "components": ["走", "取"],
    "equation": "Chạy đuổi theo (走) để đón lấy (取) những phong vị thanh nhã của cuộc đời",
    "mnemonic": "Niềm say mê tao nhã và phong vị đượm chất nghệ thuật làm say lòng người, sở thích, hứng thú, tao nhã (omomuki).",
    "illustration": {
      "badge": "🍵",
      "concept": "Không gian trà đạo tao nhã omomuki",
      "visualDesc": "Phòng trà đạo nhìn ra góc vườn rêu phong toát lên phong vị tao nhã u hoài omomuki."
    }
  },
  "距": {
    "components": ["足", "巨"],
    "equation": "Đôi chân (足) đo đạc khoảng cách giữa hai điểm khổng lồ (巨)",
    "mnemonic": "Khoảng cách đo được giữa hai địa điểm hoặc sự cách biệt giữa hai trình độ, cự ly, khoảng cách cự ly.",
    "illustration": {
      "badge": "📏",
      "concept": "Thước đo cự ly khoảng cách",
      "visualDesc": "Đường đo cự ly nối hai điểm mốc trên bản đồ chỉ rõ khoảng cách chính xác."
    }
  },
  "跳": {
    "components": ["足", "兆"],
    "equation": "Đôi chân (足) bật nhảy vọt lên cao nhanh như tia chớp báo hiệu (兆)",
    "mnemonic": "Nhún chân bật nhảy vút lên cao vượt qua mọi chướng ngại vật phía trước, nhảy vọt, nhảy cao, khiêu vũ.",
    "illustration": {
      "badge": "🦘",
      "concept": "Chú chuột túi bật nhảy vọt cao",
      "visualDesc": "Vận động viên bật nhảy cao qua xà ngang nhẹ nhàng thanh thoát như cánh chim bay."
    }
  },
  "践": {
    "components": ["足", "戔"],
    "equation": "Đôi chân (足) từng bước giẫm đạp lên những mảnh đá sỏi gai góc (戔) tiến về phía trước",
    "mnemonic": "Biến lý thuyết thành hành động thực tế bằng việc bắt tay vào làm việc ngay, thực tiễn, thực hành, giẫm lên.",
    "illustration": {
      "badge": "👣",
      "concept": "Dấu chân thực tiễn trên con đường",
      "visualDesc": "Từng bước chân vững chãi in dấu trên đường biến ước mơ thành hiện thực sống động."
    }
  },
  "踏": {
    "components": ["足", "沓"],
    "equation": "Đôi chân (足) giẫm dồn dập nhiều lần (沓) lên mặt đất",
    "mnemonic": "Đặt chân vững chãi bước lên bậc thềm mới và xem xét kỹ lưỡng tình hình, giẫm chân, dậm chân, bước lên (fumu).",
    "illustration": {
      "badge": "👟",
      "concept": "Bước chân giẫm lên bậc thềm mới",
      "visualDesc": "Đôi giày thể thao bước lên nấc thang mới thể hiện sự vững vàng tự tin tiến bước."
    }
  },
  "躍": {
    "components": ["足", "翟"],
    "equation": "Đôi chân (足) tung mình bay nhảy nhẹ nhàng như chim trĩ lộng gió (翟)",
    "mnemonic": "Bật nhảy vươn mình tạo nên bước phát triển nhảy vọt vượt bậc rực rỡ, nhảy vọt, vươn mình, nhảy múa sôi nổi.",
    "illustration": {
      "badge": "🤸",
      "concept": "Vũ công nhảy vọt vươn mình trên không",
      "visualDesc": "Vũ công ballet tung mình bay lượn nhẹ tênh trên sân khấu rực rỡ ánh đèn."
    }
  },
  "軌": {
    "components": ["車", "九"],
    "equation": "Cỗ xe (車) uốn lượn chạy theo chín khúc đường ray kiên cố (九)",
    "mnemonic": "Vệt bánh xe lăn trên đường đất và đường ray định sẵn cho tàu hỏa chạy băng băng, quỹ đạo, đường ray xe lửa.",
    "illustration": {
      "badge": "🛤️",
      "concept": "Đường ray xe lửa thẳng tắp",
      "visualDesc": "Hai thanh ray thép song song chạy tít tắp về phía chân trời dẫn lối đoàn tàu."
    }
  },
  "軸": {
    "components": ["車", "由"],
    "equation": "Thanh trụ kim loại xuyên qua trung tâm bánh xe (車) làm điểm tựa tự do xoay chuyển (由)",
    "mnemonic": "Trục quay chính tâm giữ cho cỗ máy vận hành nhịp nhàng và cuộn tranh treo tường kakejiku, trục xe, trục quay, trục cuộn.",
    "illustration": {
      "badge": "🖼️",
      "concept": "Cuộn tranh thư pháp kakejiku",
      "visualDesc": "Cuộn tranh thủy mặc kakejiku mở rộng cuộn quanh trục gỗ mun đen bóng thanh tao."
    }
  },
  "較": {
    "components": ["車", "交"],
    "equation": "Đặt hai cỗ xe (車) đan chéo kề sát nhau (交) để đo đạc kích thước",
    "mnemonic": "Đặt hai vật thể bên cạnh nhau để tìm ra điểm giống và khác biệt, so sánh, đối chiếu, tương đối so đo.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Đặt lên bàn cân so sánh",
      "visualDesc": "Hai vật phẩm được đặt song song để người xem so sánh chi tiết từng ưu thế vượt trội."
    }
  },
  "載": {
    "components": ["𢦏", "車"],
    "equation": "Chất hàng hóa vũ khí (𢦏) lên đầy thùng cỗ xe (車) chở đi xa",
    "mnemonic": "Chất kiện hàng nặng lên xe vận tải hoặc đăng tải bài viết lên trang báo, chở hàng, chất lên xe, đăng tải thông tin.",
    "illustration": {
      "badge": "🚚",
      "concept": "Xe tải chở hàng hóa lên đường",
      "visualDesc": "Xe container chở đầy ắp các kiện hàng xuất khẩu chuẩn bị xuất hành ra cảng biển."
    }
  },
  "輔": {
    "components": ["車", "甫"],
    "equation": "Gắn thêm thanh gỗ phụ vào hai bên càng xe (車) để hỗ trợ nâng đỡ vững vàng (甫)",
    "mnemonic": "Đóng vai trò trợ thủ đắc lực bên cạnh nâng đỡ thủ lĩnh hoàn thành đại sự, phụ tá, nâng đỡ, trợ thủ phò tá.",
    "illustration": {
      "badge": "🤝",
      "concept": "Người phụ tá đắc lực phò tá",
      "visualDesc": "Vị quân sư tài ba đứng bên cạnh bàn mưu tính kế phò tá vị lãnh tụ lập nên nghiệp lớn."
    }
  },
  "輝": {
    "components": ["光", "軍"],
    "equation": "Ánh hào quang rực rỡ (光) tỏa sáng từ đoàn quân chiến thắng khải hoàn (軍)",
    "mnemonic": "Tỏa ra ánh sáng lấp lánh chói lòa làm rạng rỡ không gian và tiền đồ xán lạn, tỏa sáng, huy hoàng, rực rỡ lấp lánh (kagayaku).",
    "illustration": {
      "badge": "✨",
      "concept": "Ngôi sao sáng lấp lánh trên đỉnh núi",
      "visualDesc": "Ngôi sao mai rực sáng trên nền trời rạng đông tỏa muôn ngàn tia hào quang huy hoàng."
    }
  },
  "輩": {
    "components": ["非", "車"],
    "equation": "Hàng loạt cỗ xe (車) xếp nối đuôi nhau hai bên đối xứng (非)",
    "mnemonic": "Những người cùng lứa tuổi và các bậc đàn anh đàn em trong một tập thể, tiền bối, hậu bối, cùng hàng ngũ lứa bạn.",
    "illustration": {
      "badge": "👥",
      "concept": "Tiền bối dìu dắt hậu bối",
      "visualDesc": "Đàn anh khóa trên mỉm cười ân cần hướng dẫn cho các em khóa dưới trong câu lạc bộ."
    }
  },
  "轄": {
    "components": ["車", "害"],
    "equation": "Chiếc chốt then cài trục xe (車) ngăn ngừa tai họa bánh xe tuột ra ngoài (害)",
    "mnemonic": "Cái chốt giữ cho bánh xe không văng ra và phạm vi quyền hạn cai quản hành chính, then chốt, quản hạt, cai quản.",
    "illustration": {
      "badge": "🗺️",
      "concept": "Bản đồ phân vùng quản hạt hành chính",
      "visualDesc": "Bản đồ thành phố khoanh vùng ranh giới rõ ràng khu vực quản hạt của từng cơ quan."
    }
  },
  "辰": {
    "components": ["厂", "𧘇"],
    "equation": "Hình tượng con ốc biển thò đầu móng vuốt ra khỏi vỏ đá xới tung đất đai",
    "mnemonic": "Con rồng đứng hàng thứ năm trong bảng thập nhị địa chi tượng trưng sức sống vươn dậy, chi Thìn, giờ Thìn, con rồng.",
    "illustration": {
      "badge": "🐉",
      "concept": "Rồng thiêng can chi Thìn",
      "visualDesc": "Bức tranh cuộn vẽ chú rồng vàng uốn khúc đạp mây đón ánh dương rạng ngời."
    }
  },
  "辱": {
    "components": ["辰", "寸"],
    "equation": "Bị bàn tay (寸) trừng phạt bắt phải làm cỏ ngoài đồng dưới nắng gắt (辰)",
    "mnemonic": "Cảm giác hổ thẹn đau đớn khi danh dự và nhân phẩm bị chà đạp xúc phạm, nhục nhã, sỉ nhục, làm nhục ô nhục.",
    "illustration": {
      "badge": "😔",
      "concept": "Cúi đầu nuốt nỗi sỉ nhục rèn ý chí",
      "visualDesc": "Người cúi đầu nhẫn nại nuốt nỗi cay đắng để tôi luyện ý chí chờ ngày quật khởi."
    }
  },
  "迅": {
    "components": ["辶", "卂"],
    "equation": "Bước chân lướt đi (辶) bay nhanh vun vút như cánh chim chao lượn (卂)",
    "mnemonic": "Hành động mau lẹ nhanh như chớp giải quyết công việc trong tích tắc, nhanh chóng, mau lẹ, tấn tốc.",
    "illustration": {
      "badge": "⚡",
      "concept": "Tia chớp tấn tốc lao đi",
      "visualDesc": "Tàu siêu tốc Shinkansen lao đi vun vút như tia chớp xé toạc làn sương sớm."
    }
  },
  "迪": {
    "components": ["辶", "由"],
    "equation": "Bước đi theo con đường chính đạo (辶) bắt nguồn từ lòng hướng thiện (由)",
    "mnemonic": "Dẫn lối chỉ đường soi sáng cho người đi sau noi theo đạo lý đúng đắn, dẫn lối, soi sáng, noi theo bước chân.",
    "illustration": {
      "badge": "💡",
      "concept": "Ngọn đèn dẫn lối trong đêm",
      "visualDesc": "Ngọn hải đăng tỏa luồng sáng xuyên qua màn đêm dẫn lối tàu bè đi đúng hướng an toàn."
    }
  },
  "迫": {
    "components": ["辶", "白"],
    "equation": "Bước chân đuổi sát nút (辶) làm mặt đối phương tái mét trắng bệch (白)",
    "mnemonic": "Tiến sát lại gần gây áp lực căng thẳng nghẹt thở dồn vào chân tường, bức bách, áp sát, khẩn cấp nguy cấp.",
    "illustration": {
      "badge": "⏰",
      "concept": "Đồng hồ đếm ngược giờ chót",
      "visualDesc": "Chiếc đồng hồ tích tắc chỉ còn vài giây cuối cùng gây áp lực thời gian bức bách nghẹt thở."
    }
  },
  "迭": {
    "components": ["辶", "失"],
    "equation": "Bước chân đi lại (辶) thay phiên nhau không để vị trí bị gián đoạn thất thoát (失)",
    "mnemonic": "Lần lượt thay phiên nhau đổi chỗ đảm nhiệm công việc đều đặn nhịp nhàng, thay phiên, luân phiên, điệt biến đổi thay.",
    "illustration": {
      "badge": "🔄",
      "concept": "Vòng quay luân phiên ca làm việc",
      "visualDesc": "Hai mũi tên xoay tròn biểu trưng cho các ca trực thay phiên nhau liên tục không ngắt quãng."
    }
  },
  "透": {
    "components": ["辶", "秀"],
    "equation": "Tia sáng xuyên thấu qua (辶) tạo nên vẻ đẹp trong veo thanh tú ưu việt (秀)",
    "mnemonic": "Ánh sáng chiếu xuyên qua tấm kính trong suốt nhìn rõ mồn một không gợn đục, xuyên thấu, trong suốt, thấu suốt thông suốt.",
    "illustration": {
      "badge": "🔮",
      "concept": "Khối pha lê trong suốt nhìn thấu",
      "visualDesc": "Khối pha lê trong suốt như giọt nước tinh khiết để ánh sáng xuyên qua lấp lánh."
    }
  },
  "逐": {
    "components": ["辶", "豕"],
    "equation": "Đuổi theo bước chân (辶) của con heo rừng (豕) đang tháo chạy",
    "mnemonic": "Lần lượt xua đuổi quân địch ra khỏi bờ cõi hoặc tiến bước theo từng giai đoạn, xua đuổi, lần lượt, trục xuất trục tiến.",
    "illustration": {
      "badge": "🏃",
      "concept": "Cuộc rượt đuổi lần lượt theo dấu",
      "visualDesc": "Người thợ săn đuổi theo dấu vết con thú hoang lần lượt qua từng cánh rừng."
    }
  },
  "逓": {
    "components": ["辶", "疌"],
    "equation": "Người giao liên chạy nhanh (辶) mang thư từ chuyển tiếp qua từng trạm ngựa (疌)",
    "mnemonic": "Chuyển phát thư từ bưu phẩm lần lượt qua các bưu cục trạm chuyển tiếp, chuyển tiếp, bưu điện đệ tín, tuần tự đệ tăng.",
    "illustration": {
      "badge": "📮",
      "concept": "Hòm thư bưu điện chuyển phát thư từ",
      "visualDesc": "Chiếc hòm thư bưu điện đỏ tươi truyền thống nơi tiếp nhận thư từ chuyển phát đi muôn nơi."
    }
  },
  "逝": {
    "components": ["辶", "折"],
    "equation": "Bước đi xa mãi không về (辶) như cành cây bị bẻ gãy đứt lìa (折)",
    "mnemonic": "Thời gian trôi đi vùn vụt và người thân lặng lẽ tạ thế rời xa cõi đời, trôi đi, tạ thế, qua đời thệ khứ.",
    "illustration": {
      "badge": "🕊️",
      "concept": "Cánh chim bay về miền cực lạc",
      "visualDesc": "Cánh chim bồ câu trắng thanh thản bay về phía ráng chiều hoàng hôn an yên."
    }
  },
  "逮": {
    "components": ["辶", "隶"],
    "equation": "Đuổi theo kịp bước chân (辶) rồi giơ tay túm chặt lấy kẻ trộm (隶)",
    "mnemonic": "Cảnh sát đuổi theo tra còng số tám bắt giữ tội phạm đưa về đồn xử lý, bắt giữ, tóm lấy, đãi bắt tống giam.",
    "illustration": {
      "badge": "🚔",
      "concept": "Xe cảnh sát thi hành lệnh bắt giữ",
      "visualDesc": "Chiếc còng số tám sáng loáng biểu trưng lệnh bắt giữ kẻ phạm pháp của pháp luật."
    }
  },
  "逸": {
    "components": ["辶", "兔"],
    "equation": "Bước chân chạy thoát biến (辶) nhanh nhẹn như chú thỏ rừng thoắt ẩn thoắt hiện (兔)",
    "mnemonic": "Chạy thoát khỏi cạm bẫy và tài năng xuất chúng vượt trội hơn người, thoát ẩn, tài năng xuất chúng, nhàn hạ an dật.",
    "illustration": {
      "badge": "🐇",
      "concept": "Chú thỏ trắng thoăn thoắt chạy thoát",
      "visualDesc": "Chú thỏ rừng trắng nhảy vọt thoăn thoắt qua bãi cỏ xanh thoát khỏi móng vuốt đại bàng."
    }
  },
  "遂": {
    "components": ["辶", "豕"],
    "equation": "Dẫn đường lùa đàn heo (辶 豕) về đến tận chuồng an toàn trọn vẹn",
    "mnemonic": "Kiên trì theo đuổi mục tiêu đến cùng cho tới ngày gặt hái thành công trọn vẹn, hoàn thành, toại nguyện, đạt được công toại.",
    "illustration": {
      "badge": "🏆",
      "concept": "Toại nguyện ước mơ chạm đỉnh vinh quang",
      "visualDesc": "Vận động viên giơ cao cúp vô địch mỉm cười rạng rỡ khi đạt được ước mơ ấp ủ bấy lâu."
    }
  },
  "遇": {
    "components": ["辶", "禺"],
    "equation": "Bước chân đi lại (辶) tình cờ chạm mặt chú khỉ nhỏ trong rừng (禺)",
    "mnemonic": "Cuộc hội ngộ bất ngờ tình cờ trên đường đời và cách đối đãi ứng xử với người khác, gặp gỡ tình cờ, đãi ngộ, tao ngộ.",
    "illustration": {
      "badge": "🤝",
      "concept": "Cuộc kỳ ngộ tao ngộ trên đường đời",
      "visualDesc": "Hai người bạn cũ tình cờ gặp lại nhau nơi đất khách tay bắt mặt mừng xúc động nghẹn ngào."
    }
  },
  "遍": {
    "components": ["辶", "扁"],
    "equation": "Bước chân đi khắp (辶) từng ngõ ngách treo tấm biển hiệu nhỏ (扁)",
    "mnemonic": "Đi khắp cùng trời cuối đất trải nghiệm một vòng trọn vẹn không sót chỗ nào, khắp nơi, một lượt, phổ biến cùng khắp.",
    "illustration": {
      "badge": "🗺️",
      "concept": "Đi khắp muôn nẻo đất nước",
      "visualDesc": "Bản đồ với những dấu chân đỏ trải khắp các tỉnh thành biểu trưng chuyến đi phổ biến muôn nơi."
    }
  },
  "遣": {
    "components": ["辶", "𠳋"],
    "equation": "Ra lệnh bước đi (辶) buộc đồ đạc cẩn thận xuất hành làm nhiệm vụ (𠳋)",
    "mnemonic": "Cử phái người đi làm nhiệm vụ phương xa hoặc điều khiển tâm trạng giải tỏa phiền muộn, phái đi, sai khiến, tiêu khiển giải khuây.",
    "illustration": {
      "badge": "📨",
      "concept": "Phái sứ giả mang thư lên đường",
      "visualDesc": "Sứ giả cưỡi ngựa mang chiếu thư khẩn trương lên đường thực hiện sứ mệnh quốc gia."
    }
  },
  "遥": {
    "components": ["辶", "䍃"],
    "equation": "Con đường dài dằng dặc (辶) xoay tít tắp mù xa như bàn xoay gốm (䍃)",
    "mnemonic": "Khoảng cách không gian và thời gian xa xôi tít tắp tận chân trời góc bể, xa xôi tít tắp, xa xăm, dao viễn (haruka).",
    "illustration": {
      "badge": "🔭",
      "concept": "Đường chân trời xa xôi tít tắp haruka",
      "visualDesc": "Con đường mòn hun hút dẫn về phía dãy núi tuyết mờ ảo xa xăm tận chân trời."
    }
  },
  "遭": {
    "components": ["辶", "曹"],
    "equation": "Bước chân đi lại (辶) gặp phải đám đông ồn ào rắc rối tụ tập (曹)",
    "mnemonic": "Chẳng may gặp phải tai nạn rủi ro hay hoạn nạn bất ngờ trên đường đời, gặp phải rủi ro, tao ngộ, gặp nạn.",
    "illustration": {
      "badge": "⛈️",
      "concept": "Gặp cơn bão tuyết bất ngờ trên núi",
      "visualDesc": "Đoàn leo núi bình tĩnh kết dây hỗ trợ nhau khi bất ngờ gặp phải cơn dông tuyết dữ dội."
    }
  },
  "遮": {
    "components": ["辶", "庶"],
    "equation": "Bước đi ngăn chặn (辶) đám đông dân chúng (庶) không cho tràn vào",
    "mnemonic": "Dựng rào chắn kiên cố chặn đứng luồng gió hay tầm nhìn phía trước, che chắn, ngăn cản, cản trở, rào chắn.",
    "illustration": {
      "badge": "🚧",
      "concept": "Thanh chắn gác chắn tàu hỏa",
      "visualDesc": "Cần barie hạ xuống với đèn đỏ nhấp nháy che chắn an toàn trước khi đoàn tàu chạy qua."
    }
  },
  "遵": {
    "components": ["辶", "尊"],
    "equation": "Bước đi theo con đường chuẩn mực (辶) tôn kính pháp luật bề trên (尊)",
    "mnemonic": "Nghiêm chỉnh tuân theo pháp luật và các nguyên tắc đạo đức xã hội đã đề ra, tuân thủ, tuân theo, phụng tuân.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Nghiêm chỉnh tuân thủ luật lệ giao thông",
      "visualDesc": "Dòng người chấp hành nghiêm túc tín hiệu đèn xanh vạch qua đường thể hiện ý thức thượng tôn pháp luật."
    }
  },
  "遷": {
    "components": ["辶", "䙴"],
    "equation": "Bước chân dời chuyển (辶) mang theo hành lý nhà cửa lên vùng đất cao ráo mới (䙴)",
    "mnemonic": "Chuyển dời nơi ở đô thành sang vùng đất mới và dòng thời gian biến chuyển khôn lường, dời đô, biến chuyển, thiên di.",
    "illustration": {
      "badge": "🚚",
      "concept": "Chuyến xe chuyển nhà sang vùng đất mới",
      "visualDesc": "Đoàn xe dời đô cắm cờ hoa chuyển dời kinh thành về vùng đất mới phồn thịnh."
    }
  },
  "遺": {
    "components": ["辶", "貴"],
    "equation": "Để lại của cải quý báu (貴) cho người đi sau trên đường đời tiếp bước (辶)",
    "mnemonic": "Những báu vật lời dặn dò và văn hóa cha ông để lại cho con cháu muôn đời sau, để lại, di chúc, di sản, di tích.",
    "illustration": {
      "badge": "🏛️",
      "concept": "Di sản thế giới ngàn năm tuổi",
      "visualDesc": "Ngôi đền gỗ cổ kính rêu phong được UNESCO công nhận là di sản văn hóa thế giới trường tồn."
    }
  },
  "遼": {
    "components": ["辶", "尞"],
    "equation": "Con đường bước đi (辶) xa xăm đến tận nơi ánh đuốc tế trời cháy sáng (尞)",
    "mnemonic": "Vùng đất mênh mông xa xôi tít tắp nơi biên thùy phía bắc ngút tầm mắt, xa xôi ngút ngàn, tỉnh Liêu Ninh.",
    "illustration": {
      "badge": "🌌",
      "concept": "Vùng thảo nguyên bao la ngút ngàn",
      "visualDesc": "Thảo nguyên bao la bát ngát trải dài vô tận chạm tới đường chân trời xanh ngắt."
    }
  },
  "避": {
    "components": ["辶", "辟"],
    "equation": "Nhanh chân bước lánh xa (辶) nơi quan hình phạt đao phủ thị uy (辟)",
    "mnemonic": "Khéo léo né tránh nơi nguy hiểm tìm chốn an toàn trú ẩn bảo toàn tính mạng, tránh né, tị nạn, lánh nạn sơ tán.",
    "illustration": {
      "badge": "🏃",
      "concept": "Sơ tán lánh nạn khẩn cấp an toàn",
      "visualDesc": "Biển báo màu xanh hướng dẫn lối thoát hiểm sơ tán lánh nạn an toàn khi có động đất."
    }
  },
  "還": {
    "components": ["辶", "睘"],
    "equation": "Bước chân đi trọn một vòng tròn (辶) rồi quay về điểm xuất phát ban đầu (睘)",
    "mnemonic": "Đi xa khắp bốn phương trời rồi cũng quay về đoàn tụ với quê hương cội nguồn, trở về, hoàn trả, hoàn nguyên tuần hoàn.",
    "illustration": {
      "badge": "🔄",
      "concept": "Trở về cội nguồn quê hương",
      "visualDesc": "Con thuyền rẽ sóng quay trở về bến cảng quê hương thanh bình sau chuyến hải trình dài ngày."
    }
  },
  "邑": {
    "components": ["口", "巴"],
    "equation": "Vùng đất có người sinh sống quây quần (口) cùng con người ngồi nghỉ ngơi an cư (巴)",
    "mnemonic": "Vùng đất làng mạc thôn xóm nơi dân chúng quần cư sinh sống bình yên, thôn ấp, thành ấp, đất phong.",
    "illustration": {
      "badge": "🏘️",
      "concept": "Làng quê thôn ấp thanh bình",
      "visualDesc": "Ngôi làng nhỏ bình yên nép mình dưới rặng tre xanh với những mái nhà ngói đỏ quần cư."
    }
  },
  "那": {
    "components": ["𠀆", "阝"],
    "equation": "Thôn ấp xa xôi (阝) có cành lá đu đưa trong gió (𠀆)",
    "mnemonic": "Địa danh phương xa tươi đẹp nơi xứ đảo chan hòa nắng gió, xa xôi, tươi đẹp, thành phố Naha Okinawa.",
    "illustration": {
      "badge": "🌺",
      "concept": "Vẻ đẹp rực rỡ vùng biển Naha Okinawa",
      "visualDesc": "Cổng thành Shuri đỏ thắm rực rỡ dưới nắng ấm chan hòa của vùng đất Naha Okinawa."
    }
  },
  "邦": {
    "components": ["丰", "阝"],
    "equation": "Cây cỏ sum sê tốt tươi (丰) bao quanh vùng lãnh thổ thôn ấp (阝)",
    "mnemonic": "Quốc gia lãnh thổ có chủ quyền và mối quan hệ bang giao hữu hảo hòa bình, đất nước, quốc gia, bang giao liên bang.",
    "illustration": {
      "badge": "🗺️",
      "concept": "Bản đồ đất nước liền một dải",
      "visualDesc": "Bản đồ tổ quốc xanh tươi rạng rỡ biểu trưng cho nền độc lập và chủ quyền bang quốc vững bền."
    }
  },
  "邪": {
    "components": ["牙", "阝"],
    "equation": "Răng nanh hiểm ác (牙) thọc vào phá hoại sự bình yên của thôn ấp (阝)",
    "mnemonic": "Những ý nghĩ xấu xa gian dối trái với đạo lý hoặc luồng gió độc gây cảm cúm, gian tà, tà ma, cảm lạnh phong tà.",
    "illustration": {
      "badge": "👺",
      "concept": "Mặt nạ xua đuổi tà ma quỷ dữ",
      "visualDesc": "Chiếc mặt nạ gỗ Tengu đỏ rực uy nghiêm xua tan mọi tà khí xấu xa đem lại an lành."
    }
  },
  "邸": {
    "components": ["氐", "阝"],
    "equation": "Gốc rễ vững chắc sâu bám rễ (氐) nơi đất phong thôn ấp phồn hoa (阝)",
    "mnemonic": "Dinh thự sang trọng to lớn của bậc quan lớn và quý tộc danh gia, dinh thự, phủ đệ, quan đệ.",
    "illustration": {
      "badge": "🏛️",
      "concept": "Tòa dinh thự cổ kính sang trọng",
      "visualDesc": "Tòa biệt phủ trang nhã với cổng đá uy nghi và khu vườn cây cảnh cắt tỉa công phu."
    }
  },
  "郁": {
    "components": ["有", "阝"],
    "equation": "Thôn ấp (阝) sở hữu nền văn hóa rực rỡ và muôn loài hoa cỏ thơm ngát (有)",
    "mnemonic": "Hương thơm ngào ngạt lan tỏa và nền văn hóa phát triển rực rỡ thịnh vượng, hương thơm ngào ngạt, rực rỡ văn minh.",
    "illustration": {
      "badge": "🌸",
      "concept": "Hương hoa ngào ngạt lan tỏa khắp thôn",
      "visualDesc": "Cả ngôi làng bừng sáng sắc hoa đào nở rộ ngào ngạt hương thơm mùa xuân."
    }
  },
  "郎": {
    "components": ["良", "阝"],
    "equation": "Người thanh niên tốt lành tuấn tú (良) của thôn ấp quê nhà (阝)",
    "mnemonic": "Chàng trai trẻ khôi ngô tuấn tú tài đức vẹn toàn chuẩn bị cưới vợ, chàng trai trẻ, tân lang chú rể, tên đàn ông (Tarō).",
    "illustration": {
      "badge": "🤵",
      "concept": "Chú rể tân lang khôi ngô tuấn tú",
      "visualDesc": "Chú rể mặc lễ phục montsuki hakama trang trọng tươi cười rạng rỡ trong ngày cưới tân lang."
    }
  },
  "郡": {
    "components": ["君", "阝"],
    "equation": "Vùng lãnh thổ thôn ấp (阝) do vị quân vương cử quan cai quản (君)",
    "mnemonic": "Đơn vị hành chính tập hợp nhiều làng xã nông thôn dưới thời xưa và nay, quận huyện, đơn vị quận hạt.",
    "illustration": {
      "badge": "🏘️",
      "concept": "Địa hạt quận huyện nông thôn",
      "visualDesc": "Tấm biển chỉ dẫn ranh giới quận hạt hành chính đặt bên con đường làng thanh bình."
    }
  },
  "郭": {
    "components": ["享", "阝"],
    "equation": "Xây lũy thành cao lớn để dân chúng thụ hưởng an lạc (享) nơi đô ấp (阝)",
    "mnemonic": "Bức tường thành bằng đá bao bọc ngoài cùng bảo vệ kinh thành khỏi kẻ thù, thành quách, tường thành bao bọc.",
    "illustration": {
      "badge": "🏯",
      "concept": "Tường đá kiên cố của thành quách",
      "visualDesc": "Bức tường đá thành quách vững chãi bao quanh tòa lâu đài cổ sừng sững bên hào nước."
    }
  },
  "郷": {
    "components": ["幺", "皀", "阝"],
    "equation": "Hai người ngồi đối diện thưởng thức mâm cơm thơm dẻo (皀) nơi thôn xóm ấp quê (阝)",
    "mnemonic": "Mảnh đất chôn nhau cắt rốn nơi có gia đình và những kỷ niệm ấu thơ êm đềm, quê hương, làng quê, hương lý cội nguồn.",
    "illustration": {
      "badge": "🏡",
      "concept": "Mái nhà quê hương yêu dấu",
      "visualDesc": "Khói lam chiều bay lên từ mái nhà tranh bên cánh đồng lúa quê hương thanh bình."
    }
  },
  "酉": {
    "components": ["酉"],
    "equation": "Hình tượng chiếc bình gốm ủ rượu với men rượu cay nồng đang lên men",
    "mnemonic": "Chiếc bình rượu ủ thơm nức và vị trí thứ mười trong bảng mười hai con giáp, chi Dậu, con gà, bình rượu ủ.",
    "illustration": {
      "badge": "🍶",
      "concept": "Bình rượu sake gốm nung cổ truyền",
      "visualDesc": "Chiếc bình rượu sake bằng gốm mộc mạc đặt cạnh chiếc chén sứ vẽ hoa văn truyền thống."
    }
  },
  "酌": {
    "components": ["酉", "勺"],
    "equation": "Dùng chiếc muỗng nhỏ gáo múc (勺) múc rượu ngon từ bình rượu (酉) rót vào chén",
    "mnemonic": "Rót rượu mời bạn nâng ly và cân nhắc suy xét tình cảm thấu đáo cho hợp lý, rót rượu, châm rượu, châm chước xem xét.",
    "illustration": {
      "badge": "🍶",
      "concept": "Rót rượu sake nồng ấm ân cần",
      "visualDesc": "Đôi tay ân cần nâng bình gốm rót từng dòng rượu sake ấm áp vào chén rượu của bạn hữu."
    }
  },
  "酔": {
    "components": ["酉", "卒"],
    "equation": "Uống cạn sạch rượu trong bình (酉) đến giọt cuối cùng (卒) khiến đầu óc quay cuồng",
    "mnemonic": "Men rượu cay ngấm vào người làm bước chân xiêu vẹo say đắm say sưa, say rượu, say mê, say sóng say xe (yoi).",
    "illustration": {
      "badge": "🍷",
      "concept": "Say sưa với men nồng chếnh choáng",
      "visualDesc": "Gương mặt ửng hồng mỉm cười thư thái sau khi thưởng thức ly rượu vang nồng đượm."
    }
  },
  "酢": {
    "components": ["酉", "乍"],
    "equation": "Rượu lên men (酉) đột ngột chuyển vị chua gắt (乍) thành giấm thanh",
    "mnemonic": "Gia vị chua thanh làm từ rượu lên men dùng trộn cơm sushi thơm ngon trứ danh, giấm chua, chất toan giấm (su).",
    "illustration": {
      "badge": "🍣",
      "concept": "Chai giấm gạo làm cơm sushi thơm ngon",
      "visualDesc": "Chai giấm gạo truyền thống đang được rưới nhẹ lên khay cơm nếp dẻo làm món sushi."
    }
  },
  "酪": {
    "components": ["酉", "各"],
    "equation": "Sữa ủ lên men tựa như rượu (酉) chia thành từng loại sản phẩm béo ngậy khác nhau (各)",
    "mnemonic": "Nguồn sữa bò béo ngậy chế biến thành bơ sữa phô mai thơm ngon bổ dưỡng, bơ sữa, chế phẩm từ sữa nông nghiệp.",
    "illustration": {
      "badge": "🧀",
      "concept": "Miếng phô mai béo ngậy bơ sữa",
      "visualDesc": "Miếng phô mai vàng ruộm cùng ly sữa tươi thơm mát trên bàn ăn nông trại trù phú."
    }
  },
  "酬": {
    "components": ["酉", "州"],
    "equation": "Rót rượu mời lại (酉) chúc nhau dạt dào ân tình như muôn dòng sông chảy (州)",
    "mnemonic": "Rót chén rượu đáp lễ và trả công lao xứng đáng cho người đã nhọc lòng giúp đỡ, thù lao, trả ơn, đáp lễ đền ơn.",
    "illustration": {
      "badge": "💰",
      "concept": "Phong bì thù lao xứng đáng công sức",
      "visualDesc": "Bao thư thù lao trang trọng trao tận tay người hoàn thành xuất sắc công việc."
    }
  },
  "酵": {
    "components": ["酉", "孝"],
    "equation": "Ủ rượu trong bình (酉) cần sự kiên nhẫn chăm sóc hiếu thuận chu đáo (孝)",
    "mnemonic": "Vi sinh vật lên men bột mì làm bánh mì phồng xốp và ủ men nấu rượu bia, lên men, men bia kōbo, nấm men.",
    "illustration": {
      "badge": "🍞",
      "concept": "Bột bánh mì nở phồng nhờ nấm men",
      "visualDesc": "Khối bột bánh mì lên men nở căng tròn xốp mềm chuẩn bị đưa vào lò nướng thơm lừng."
    }
  },
  "酷": {
    "components": ["酉", "告"],
    "equation": "Men rượu ủ quá độ cay nồng (酉) phát ra lời thông cáo gay gắt (告)",
    "mnemonic": "Thời tiết quá đỗi gay gắt khắc nghiệt và hành động nhẫn tâm tàn bạo, tàn khốc, gay gắt, khắc nghiệt hà khốc.",
    "illustration": {
      "badge": "☀️",
      "concept": "Nắng hè gay gắt tàn khốc",
      "visualDesc": "Mặt trời chói chang nung đốt mặt đường nhựa thể hiện cái nóng gay gắt tàn khốc của mùa hè."
    }
  },
  "酸": {
    "components": ["酉", "夋"],
    "equation": "Rượu để lâu ngày (酉) người thợ chậm rãi nếm thử (夋) thấy vị chua nhăn mặt",
    "mnemonic": "Vị chua thanh mát của chanh quả và cảm giác mỏi nhừ cơ bắp sau ngày vận động, vị chua, chất axit, toan tính mỏi toan.",
    "illustration": {
      "badge": "🍋",
      "concept": "Trái chanh vàng mọng nước chua thanh",
      "visualDesc": "Lát chanh vàng ươm mọng nước nhỏ từng giọt nước cốt chua thanh mát lạnh sảng khoái."
    }
  },
  "醜": {
    "components": ["酉", "鬼"],
    "equation": "Uống say khướt rượu men (酉) mặt mũi biến dạng gớm ghiếc như con ma quỷ (鬼)",
    "mnemonic": "Hình thù xấu xí đáng sợ và những hành vi đáng xấu hổ bị người đời chê cười, xấu xí, xấu hổ, tai tiếng xú văn.",
    "illustration": {
      "badge": "🙈",
      "concept": "Lấy tay che mắt trước điều xấu hổ",
      "visualDesc": "Chú khỉ nhỏ lấy hai tay che mắt xấu hổ trước trò hề lố bịch đáng chê cười."
    }
  },
  "醸": {
    "components": ["酉", "襄"],
    "equation": "Ủ rượu trong bình (酉) được bọc ấm chu đáo (襄) đợi ngày men chín thơm nồng",
    "mnemonic": "Kỹ thuật ủ men nấu rượu truyền thống và mầm mống nảy sinh ra biến chuyển lớn, ủ rượu, ủ men, nảy sinh mầm mống.",
    "illustration": {
      "badge": "🍶",
      "concept": "Hầm ủ rượu sake thùng gỗ tuyết tùng",
      "visualDesc": "Những thùng gỗ tuyết tùng khổng lồ đang ủ men cho ra những mẻ rượu sake thượng hạng."
    }
  },
  "采": {
    "components": ["爫", "木"],
    "equation": "Bàn tay (爫) thoăn thoắt vươn lên cành cây (木) hái những quả chín mọng",
    "mnemonic": "Đưa tay hái lượm hoa quả đầu mùa và toát lên phong thái cử chỉ tao nhã, hái lượm, phong thái, sắc thái phong độ.",
    "illustration": {
      "badge": "🍎",
      "concept": "Bàn tay hái quả táo chín trên cành",
      "visualDesc": "Bàn tay nâng niu hái quả táo đỏ tươi trĩu cành dưới ánh nắng mùa thu hoạch."
    }
  },
  "釈": {
    "components": ["釆", "尺"],
    "equation": "Phân biệt rành mạch từng chi tiết (釆) đo đạc bằng thước tấc rõ ràng (尺)",
    "mnemonic": "Giải thích rõ ràng khúc mắc và mở lòng buông bỏ thả tự do cho muôn loài, giải thích, phóng thích thả ra, Phật Thích Ca.",
    "illustration": {
      "badge": "🧘",
      "concept": "Đức Phật Thích Ca từ bi khoan dung",
      "visualDesc": "Bức tượng Phật Thích Ca mâu ni mỉm cười an nhiên soi sáng con đường từ bi giải thoát."
    }
  },
  "釣": {
    "components": ["金", "勺"],
    "equation": "Lưỡi câu bằng kim loại (金) uốn cong như chiếc thìa múc (勺)",
    "mnemonic": "Cầm cần câu buông dây cước câu cá thư giãn bên hồ và tiền thối thừa trả lại, câu cá, cần câu cá, tiền lẻ thừa (tsuri).",
    "illustration": {
      "badge": "🎣",
      "concept": "Cần câu uốn cong kéo chú cá bạc",
      "visualDesc": "Người câu cá vui sướng kéo chiếc cần câu uốn cong tóm được chú cá bạc quẫy nước tung tóe."
    }
  },
  "鈴": {
    "components": ["金", "令"],
    "equation": "Kim loại (金) đúc thành chiếc chuông nhỏ rung lên âm thanh trong vắt theo lệnh gió (令)",
    "mnemonic": "Chiếc chuông đồng nhỏ lắc lên phát ra tiếng kêu leng keng vui tai trước đền Thần đạo, chiếc chuông nhỏ, chuông gió (suzu).",
    "illustration": {
      "badge": "🔔",
      "concept": "Chiếc chuông vàng leng keng trước đền",
      "visualDesc": "Chiếc chuông đồng mạ vàng buộc dây thừng ngũ sắc rung lên âm thanh trong trẻo trừ tà."
    }
  },
  "鉛": {
    "components": ["金", "㕣"],
    "equation": "Kim loại màu xám mềm (金) dễ chảy trôi theo dòng khe núi mở miệng (㕣)",
    "mnemonic": "Kim loại màu xám mềm mại dùng làm ruột cây bút chì đen viết chữ học trò, kim loại chì, bút chì đen (enpitsu).",
    "illustration": {
      "badge": "✏️",
      "concept": "Cây bút chì gỗ gọt nhọn",
      "visualDesc": "Cây bút chì gỗ màu vàng ngòi chì đen bóng viết nên những nét chữ nắn nót đầu đời."
    }
  },
  "鉢": {
    "components": ["金", "本"],
    "equation": "Chiếc bát đĩa kim loại hoặc gốm sứ (金) vững chãi bám chắc vào gốc rễ (本)",
    "mnemonic": "Chiếc bát lớn sâu lòng đựng thức ăn thơm ngon hoặc chậu đất trồng cây cảnh bonsai, bát đĩa sứ, chậu cây cảnh bachi.",
    "illustration": {
      "badge": "🪴",
      "concept": "Chậu cây cảnh bonsai tinh xảo",
      "visualDesc": "Cây tùng bonsai trăm tuổi uốn lượn uy nghiêm trong chiếc chậu gốm men lam cổ kính."
    }
  },
  "銃": {
    "components": ["金", "充"],
    "equation": "Ống kim loại (金) nhồi nhét nạp đầy thuốc súng đạn dược (充)",
    "mnemonic": "Khẩu súng kim loại nhồi đạn bắn hạ mục tiêu từ xa trên trận địa chiến trường, khẩu súng, súng lục súng trường.",
    "illustration": {
      "badge": "🎯",
      "concept": "Môn bắn súng thể thao chuẩn xác",
      "visualDesc": "Vận động viên ngắm súng thể thao chuẩn xác vào tâm bia tròn trong thế đứng vững vàng."
    }
  },
  "銑": {
    "components": ["金", "先"],
    "equation": "Kim loại sắt (金) được luyện thô sơ giai đoạn đầu tiên (先) từ lò cao",
    "mnemonic": "Sắt thô vừa luyện từ quặng sắt chưa qua tinh chế loại bỏ tạp chất, gang đúc, sắt thô sơ (sen).",
    "illustration": {
      "badge": "🔩",
      "concept": "Thỏi gang đúc sắt thô từ lò cao",
      "visualDesc": "Thỏi gang đúc đen nhánh vừa ra lò chuẩn bị đưa vào tôi luyện thành thép thành phẩm."
    }
  },
  "銘": {
    "components": ["金", "名"],
    "equation": "Khắc tên tuổi và danh xưng (名) sâu vào chuông đồng kiếm báu kim loại (金)",
    "mnemonic": "Khắc sâu ghi tạc công ơn vào lòng và thương hiệu trà bánh danh tiếng trứ danh, khắc chữ kim loại, khắc cốt ghi tâm, danh trà meicha.",
    "illustration": {
      "badge": "🍵",
      "concept": "Hộp danh trà thượng hạng meicha",
      "visualDesc": "Hộp trà xanh khắc chữ vàng danh trà meicha thượng hạng làm quà biếu trang trọng."
    }
  },
  "銭": {
    "components": ["金", "戔"],
    "equation": "Mảnh kim loại mỏng tròn (金) đục lỗ nhỏ như vảy giáo mác (戔) dùng trao đổi buôn bán",
    "mnemonic": "Đồng xu kim loại nhỏ giòn tan trong túi dùng trả tiền tắm suối sentō và mua quà bánh, đồng tiền xu, tiền lẻ bạc (zeni, sentō).",
    "illustration": {
      "badge": "🪙",
      "concept": "Đồng xu may mắn năm yên go-en",
      "visualDesc": "Đồng xu năm yên bằng đồng vàng đục lỗ tròn ở giữa mang lại nhân duyên may mắn tốt lành."
    }
  },
  "鋳": {
    "components": ["金", "寿"],
    "equation": "Kim loại nung chảy (金) rót vào khuôn tạo hình bảo vật trường thọ ngàn năm (寿)",
    "mnemonic": "Nung chảy đồng sắt rót vào khuôn đúc nên những chiếc chuông chùa ngân vang ngàn năm, đúc chuông, đúc tượng đúc kim loại.",
    "illustration": {
      "badge": "🔔",
      "concept": "Đúc đại hồng chung chuông chùa",
      "visualDesc": "Chiếc chuông đồng chùa khổng lồ vừa được đúc xong với hoa văn rồng chạm trổ tinh xảo."
    }
  },
  "鋼": {
    "components": ["金", "岡"],
    "equation": "Kim loại (金) được tôi luyện cứng rắn như sống đồi gò đá sừng sững (岡)",
    "mnemonic": "Kim loại tôi luyện loại bỏ tạp chất đạt độ cứng cáp và dẻo dai phi thường làm kiếm báu, thép tôi luyện, thép cứng (hagane).",
    "illustration": {
      "badge": "⚔️",
      "concept": "Lưỡi gươm katana thép tôi luyện sắc bén",
      "visualDesc": "Thanh bảo kiếm katana rèn bằng thép gấp ngàn lớp sáng lóa đường vân sóng sắc lạnh."
    }
  },
  "錘": {
    "components": ["金", "垂"],
    "equation": "Khối kim loại nặng (金) treo thẳng thớm rủ xuống dưới (垂)",
    "mnemonic": "Quả dọi kim loại buộc dây treo thẳng đứng giúp người thợ xây đo độ thẳng bức tường, quả dọi kim loại, quả lắc chùy thau.",
    "illustration": {
      "badge": "📐",
      "concept": "Quả dọi kim loại cân chỉnh độ thẳng",
      "visualDesc": "Quả dọi đồng nhọn đầu rủ thẳng tắp đo đạc độ thẳng đứng hoàn hảo của bức tường xây."
    }
  },
  "錠": {
    "components": ["金", "定"],
    "equation": "Miếng kim loại (金) cố định then cài chắc chắn (定) bảo vệ cửa nhà",
    "mnemonic": "Ổ khóa bằng thép giữ chặt an toàn cửa nẻo và viên thuốc nén tròn trịa chữa bệnh, ổ khóa kim loại, viên thuốc nén định liều.",
    "illustration": {
      "badge": "🔒",
      "concept": "Ổ khóa đồng kiên cố bảo vệ",
      "visualDesc": "Chiếc ổ khóa đồng cổ điển khóa chặt cánh cổng sắt kiên cố bảo vệ ngôi nhà an toàn."
    }
  },
  "錦": {
    "components": ["金", "帛"],
    "equation": "Tấm vải lụa trắng mịn (帛) được dệt thêu bằng sợi chỉ kim tuyến vàng bạc lộng lẫy (金)",
    "mnemonic": "Tấm vải gấm dệt kim tuyến muôn màu rực rỡ lộng lẫy áo gấm về làng vinh quy bái tổ, gấm hoa rực rỡ, lụa cẩm nishiki.",
    "illustration": {
      "badge": "👘",
      "concept": "Tấm gấm dệt chỉ vàng lộng lẫy nishiki",
      "visualDesc": "Tấm lụa gấm nishiki rực rỡ sắc màu thêu chim phượng hoàng tung cánh bằng kim tuyến."
    }
  },
  "錬": {
    "components": ["金", "東"],
    "equation": "Kim loại (金) được nung đỏ rực dưới ánh mặt trời mọc phương đông (東) đập rèn",
    "mnemonic": "Đun nấu tôi luyện kim loại và rèn giũa ý chí tinh thần ngày càng sắc bén kiên cường, tôi luyện, rèn luyện, thuật giả kim.",
    "illustration": {
      "badge": "🔨",
      "concept": "Nghệ nhân đập búa rèn kim loại đỏ rực",
      "visualDesc": "Bác thợ rèn quai búa giáng mạnh lên thanh thép nung đỏ tóe lên ngàn tia lửa sáng rực."
    }
  },
  "錯": {
    "components": ["金", "昔"],
    "equation": "Các thỏi kim loại quý (金) tích tụ từ ngày xưa (昔) xếp chồng chéo đan xen",
    "mnemonic": "Nhiều yếu tố đan xen lẫn lộn vào nhau tạo nên sự phức tạp dễ sinh nhầm lẫn, lẫn lộn, đan xen, sai sót phức tạp sai thác.",
    "illustration": {
      "badge": "🧩",
      "concept": "Mê cung đan xen phức tạp",
      "visualDesc": "Những đường nét đan xen chéo nhau như mê cung đòi hỏi sự phân tích sáng suốt rõ ràng."
    }
  },
  "鍛": {
    "components": ["金", "段"],
    "equation": "Thanh kim loại (金) trải qua từng công đoạn (段) đập búa nung lửa liên tục",
    "mnemonic": "Nung đỏ đập búa tôi luyện sắt thép thành kiếm báu và rèn luyện thân thể cường tráng, rèn kiếm, tôi luyện, rèn luyện thân thể.",
    "illustration": {
      "badge": "💪",
      "concept": "Rèn luyện thể lực cường tráng",
      "visualDesc": "Thanh niên chăm chỉ rèn luyện thể hình nâng tạ tôi rèn cơ bắp săn chắc khỏe mạnh."
    }
  },
  "鎌": {
    "components": ["金", "兼"],
    "equation": "Lưỡi thép kim loại (金) kiêm luôn việc (兼) cắt cỏ và gặt lúa mùa thu",
    "mnemonic": "Lưỡi liềm thép cong vút sắc bén dùng gặt lúa trên đồng và tên thành phố lịch sử Kamakura, lưỡi liềm gặt lúa, liêm đao (kama).",
    "illustration": {
      "badge": "🌾",
      "concept": "Lưỡi liềm cong vút mùa gặt kama",
      "visualDesc": "Lưỡi liềm thép sáng loáng cán gỗ thoăn thoắt gặt những bó lúa vàng trĩu hạt trên đồng."
    }
  },
  "鎖": {
    "components": ["金", "𧴪"],
    "equation": "Kim loại (金) đúc thành những mắt xích nhỏ bé (𧴪) móc nối chặt chẽ vào nhau",
    "mnemonic": "Dây xích sắt buộc khóa chặt cánh cổng phong tỏa không cho ai ra vào, dây xích sắt, phong tỏa, đóng cửa bế quan tỏa cảng.",
    "illustration": {
      "badge": "⛓️",
      "concept": "Sợi xích sắt kiên cố khóa cổng",
      "visualDesc": "Sợi dây xích sắt to bản quấn quanh cánh cổng sắt khóa chặt bằng ổ khóa dày dặn."
    }
  },
  "鎮": {
    "components": ["金", "真"],
    "equation": "Khối kim loại nặng chân chính (金 真) đè chặn giữ cho mọi vật đứng yên thăng bằng",
    "mnemonic": "Tảng kim loại nặng giữ yên tờ giấy và trấn an lòng người xoa dịu nỗi đau, trấn giữ, làm dịu, trấn tĩnh, thị trấn chấn tọa.",
    "illustration": {
      "badge": "⛩️",
      "concept": "Ngôi đền trấn giữ bình an chốn thị trấn",
      "visualDesc": "Cổng Torii đỏ uy nghiêm che chở trấn giữ bình an và tài lộc cho cả thị trấn thanh bình."
    }
  },
  "鏡": {
    "components": ["金", "竟"],
    "equation": "Tấm đồng kim loại (金) mài bóng loáng đến tận cùng (竟) soi rõ dung nhan",
    "mnemonic": "Tấm gương đồng soi sáng dung nhan chân thực và là bảo vật thiêng liêng chốn Thần đạo, chiếc gương soi, kính ngọc soi bóng (kagami).",
    "illustration": {
      "badge": "🪞",
      "concept": "Chiếc gương đồng cổ tròn xoe kagami",
      "visualDesc": "Chiếc gương đồng cổ tròn bóng loáng soi bóng đóa hoa anh đào e ấp nở ban mai."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n1lData)) {
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

console.log(`[Batch 5L - N1 Part 12] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n1lData).length} chữ Kanji N1.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
