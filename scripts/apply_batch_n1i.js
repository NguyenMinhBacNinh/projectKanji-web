/**
 * Batch 5I: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 95 chữ Kanji N1 tiếp theo (từ 硝 đến 締)
 */

const fs = require('fs');
const path = require('path');

const n1iData = {
  "硝": {
    "components": ["石", "肖"],
    "equation": "石 (Khoáng chất đá) có hạt tinh thể nhỏ li ti giống như hạt cát (肖)",
    "mnemonic": "Khoáng chất đá dùng chế thuốc súng phát nổ sáng lòa như tia chớp, diêm sinh, thuốc súng, tiêu toan axít.",
    "illustration": {
      "badge": "💥",
      "concept": "Tinh thể tiêu thạch chế thuốc nổ",
      "visualDesc": "Hạt khoáng thạch lấp lánh phản ứng phát sáng mạnh mẽ khi tiếp xúc nhiệt."
    }
  },
  "硫": {
    "components": ["石", "㐬"],
    "equation": "石 (Khoáng chất đá) nung chảy thành dòng lưu huỳnh vàng rực (㐬)",
    "mnemonic": "Chất khoáng đá màu vàng đặc trưng quanh miệng núi lửa bốc mùi nồng nặc, lưu huỳnh (lưu huỳnh onsen).",
    "illustration": {
      "badge": "🌋",
      "concept": "Mỏ lưu huỳnh vàng núi lửa",
      "visualDesc": "Những vỉa quặng lưu huỳnh vàng rực bốc khói nghi ngút quanh miệng suối khoáng nóng."
    }
  },
  "碁": {
    "components": ["其", "石"],
    "equation": "其 (Bàn cờ có các ô vuông vức ngay ngắn) + 石 (Những quân cờ bằng đá đen trắng)",
    "mnemonic": "Trò chơi trí tuệ đỉnh cao dùng các quân đá tròn đen trắng tranh giành lãnh thổ, cờ vây (igo).",
    "illustration": {
      "badge": "⚪",
      "concept": "Ván cờ vây đen trắng cân não",
      "visualDesc": "Bàn cờ vây bằng gỗ cây dâu với các quân cờ đá đen bóng và đá trắng tinh tươm."
    }
  },
  "碑": {
    "components": ["石", "卑"],
    "equation": "石 (Tảng đá phẳng) dựng thấp bên đường (卑) khắc chữ lưu danh",
    "mnemonic": "Tảng đá lớn dựng đứng khắc sâu chiến công và tên tuổi người xưa cho ngàn đời sau tưởng nhớ, bia đá, văn bia.",
    "illustration": {
      "badge": "🗿",
      "concept": "Tấm bia đá khắc chữ cổ",
      "visualDesc": "Tấm bia đá rêu phong khắc những hàng chữ cổ kính sừng sững bên cổng thành xưa."
    }
  },
  "碧": {
    "components": ["王", "白", "石"],
    "equation": "Khối đá (石) kết tinh giữa ngọc quý (王) và ánh sáng trắng tinh khiết (白)",
    "mnemonic": "Màu ngọc bích xanh biếc sâu thẳm tựa làn nước mùa thu hay bầu trời sau cơn mưa, xanh ngọc bích, xanh biếc.",
    "illustration": {
      "badge": "💎",
      "concept": "Viên đá ngọc bích xanh thẳm",
      "visualDesc": "Viên đá ngọc bích bóng bẩy trong veo tỏa sắc xanh thẳm huyền bí hút hồn người xem."
    }
  },
  "碩": {
    "components": ["石", "頁"],
    "equation": "石 (Khối đá vững chãi) sánh ngang với chiếc đầu thông thái uyên bác (頁)",
    "mnemonic": "Tài trí uyên bác và nhân cách vững chãi như núi đá được mọi người tôn kính, thạc sĩ, to lớn uyên bác.",
    "illustration": {
      "badge": "🎓",
      "concept": "Học vị thạc sĩ uyên bác",
      "visualDesc": "Chiếc mũ thạc sĩ đặt trang trọng trên chồng sách dày thể hiện vốn tri thức sâu rộng."
    }
  },
  "磁": {
    "components": ["石", "兹"],
    "equation": "石 (Khoáng đá) có năng lực sinh sôi hút dính lấy kim loại (兹)",
    "mnemonic": "Hòn đá kỳ lạ có lực hút sắt thép và chỉ hướng bắc nam chuẩn xác, nam châm, từ tính, đồ gốm sứ từ khí.",
    "illustration": {
      "badge": "🧲",
      "concept": "Thanh nam châm từ tính hai cực",
      "visualDesc": "Thanh nam châm hình móng ngựa hút chặt những chiếc đinh sắt thể hiện lực từ trường mạnh mẽ."
    }
  },
  "磯": {
    "components": ["石", "幾"],
    "equation": "石 (Bãi đá ngầm) nhấp nhô vô số không đếm xuể (幾) ven bờ biển",
    "mnemonic": "Bãi đá gồ ghề ven bờ biển nơi từng con sóng vỗ tung bọt trắng xóa và tôm cá ẩn mình, bờ đá ven biển (isobe).",
    "illustration": {
      "badge": "🌊",
      "concept": "Bãi đá ngầm sóng vỗ rì rào",
      "visualDesc": "Những tảng đá ngầm nhô lên khỏi mép nước biển xanh ngắt nơi chim biển đậu kiếm mồi."
    }
  },
  "礁": {
    "components": ["石", "焦"],
    "equation": "石 (Tảng đá ngầm) ngập trong nước biển rạn nứt như bị nung cháy (焦)",
    "mnemonic": "Rạn đá ngầm hiểm trở nằm ẩn mình ngay sát mặt nước làm nguy hiểm tàu bè qua lại, rạn đá ngầm, rạn san hô.",
    "illustration": {
      "badge": "🪸",
      "concept": "Rạn san hô ngầm dưới biển",
      "visualDesc": "Rạn đá ngầm phủ đầy san hô rực rỡ sắc màu ẩn hiện dưới làn nước biển trong vắt."
    }
  },
  "礎": {
    "components": ["石", "楚"],
    "equation": "石 (Tảng đá tảng) kê dưới chân những bụi cây rừng dựng cột nhà (楚)",
    "mnemonic": "Tảng đá khối dày vững chãi đặt dưới chân cột trụ chịu toàn bộ sức nặng ngôi nhà, đá tảng chân cột, nền tảng cơ sở.",
    "illustration": {
      "badge": "🏛️",
      "concept": "Tảng đá chân cột móng nhà",
      "visualDesc": "Khối đá móng tạc vuông vức gánh trọn vẹn sức nặng của cả tòa lầu nguy nga."
    }
  },
  "祉": {
    "components": ["礻", "止"],
    "equation": "礻 (Thần linh ban phúc) dừng lại (止) đọng lại nơi mái ấm",
    "mnemonic": "Phước lành của trời đất dừng lại che chở giúp cuộc sống muôn dân an vui no ấm, phúc lợi, an lành, hạnh phúc.",
    "illustration": {
      "badge": "🕊️",
      "concept": "Phúc lợi xã hội an bình",
      "visualDesc": "Bàn tay nâng niu mầm sống mang lại an sinh phúc lợi ấm êm cho mọi mái nhà."
    }
  },
  "祐": {
    "components": ["礻", "右"],
    "equation": "礻 (Thần linh chứng giám) đưa cánh tay phải (右) che chở phù trợ",
    "mnemonic": "Được thần linh giơ tay nâng đỡ phù hộ vượt qua mọi giông bão thử thách, phù hộ, thần hựu, che chở.",
    "illustration": {
      "badge": "🙏",
      "concept": "Thần linh chở che phù hộ",
      "visualDesc": "Ánh sáng dịu dàng từ trời cao bao bọc che chở bình an cho người lữ hành."
    }
  },
  "祥": {
    "components": ["礻", "羊"],
    "equation": "礻 (Bàn thờ tế lễ) dâng con dê hiền lành thuần khiết (羊) cầu điềm may",
    "mnemonic": "Lễ vật thanh tịnh mang lại dấu hiệu cát tường báo trước những điều tốt lành, cát tường, điềm lành, tường thụy.",
    "illustration": {
      "badge": "🍀",
      "concept": "Cát tường như ý đón bình an",
      "visualDesc": "Họa tiết mây lành cát tường uốn lượn mang lại may mắn và phước đức tròn đầy."
    }
  },
  "票": {
    "components": ["覀", "示"],
    "equation": "覀 (Tấm bao phủ che kín) + 示 (Hiển thị thông tin dâng lên bàn thờ)",
    "mnemonic": "Mảnh giấy nhỏ ghi tên ý kiến kín đáo thả vào hòm để quyết định việc chung, lá phiếu bầu, tấm vé, tem phiếu.",
    "illustration": {
      "badge": "🗳️",
      "concept": "Bỏ phiếu vào hòm phiếu bầu",
      "visualDesc": "Bàn tay cẩn thận thả lá phiếu bầu cử vào thùng phiếu thể hiện quyền công dân."
    }
  },
  "禄": {
    "components": ["礻", "录"],
    "equation": "礻 (Trời đất ban tặng) nguồn bổng lộc dồi dào như dòng nước trong xanh rỉ chảy (录)",
    "mnemonic": "Bổng lộc và tiền lương triều đình ban thưởng cho vị quan thanh liêm vì dân vì nước, bổng lộc, phúc lộc.",
    "illustration": {
      "badge": "💰",
      "concept": "Bổng lộc quan lại ban thưởng",
      "visualDesc": "Rương tiền vàng và gạo trắng triều đình ban thưởng cho công trạng xuất sắc."
    }
  },
  "禅": {
    "components": ["礻", "単"],
    "equation": "礻 (Tâm hướng về cõi thiêng) trong sự giản đơn tĩnh lặng duy nhất (単)",
    "mnemonic": "Ngồi tĩnh tọa buông bỏ mọi tạp niệm để tâm hồn lắng đọng trở về sự thanh tịnh giản đơn, thiền định, tọa thiền, nhường ngôi.",
    "illustration": {
      "badge": "🧘",
      "concept": "Tọa thiền trong vườn đá Zen",
      "visualDesc": "Vị thiền sư tĩnh tọa an nhiên bên vườn đá cào cát thanh tịnh chốn thiền môn."
    }
  },
  "禍": {
    "components": ["礻", "咼"],
    "equation": "礻 (Thần linh giáng trừng phạt) vì những lời nói lệch lạc méo mó uốn vẹo (咼)",
    "mnemonic": "Tai ương ập xuống do lời nói thất thốt hoặc thói xấu gây nên, tai họa, hiểm họa, mầm họa.",
    "illustration": {
      "badge": "⚡",
      "concept": "Tai họa bất ngờ ập đến",
      "visualDesc": "Tia sét xé toạc bầu trời giáng xuống nhắc nhở con người cẩn trọng lời ăn tiếng nói."
    }
  },
  "禎": {
    "components": ["礻", "貞"],
    "equation": "礻 (Thần linh ban phúc) cho người giữ lòng trinh bạch chính đính (貞)",
    "mnemonic": "Người giữ lòng trung trinh son sắt ắt được trời đất ban điềm lành phước đức, điềm lành, phúc đức trời ban.",
    "illustration": {
      "badge": "✨",
      "concept": "Ánh sáng phúc đức cát tường",
      "visualDesc": "Vòng hào quang chiếu rọi bảo bọc người đức hạnh giữ trọn chữ trinh."
    }
  },
  "秀": {
    "components": ["禾", "乃"],
    "equation": "禾 (Cây lúa) uốn mình vươn lên vượt trội hơn hẳn các cây khác (乃)",
    "mnemonic": "Bông lúa trổ đòng vươn cao nổi bật vượt trội trong cả cánh đồng, ưu tú, xuất chúng, tài hoa tài giỏi.",
    "illustration": {
      "badge": "🌟",
      "concept": "Bông lúa vàng vươn cao xuất chúng",
      "visualDesc": "Bông lúa vàng óng ả vươn cao rực rỡ giữa muôn vàn ngọn lúa xanh tươi."
    }
  },
  "秘": {
    "components": ["禾", "必"],
    "equation": "禾 (Giống lúa quý hiếm) tất yếu (必) phải được cất giấu kín đáo",
    "mnemonic": "Hạt giống cây quý cất kỹ trong kho không để lộ ra ngoài, bí mật, bí quyết gia truyền, kín đáo.",
    "illustration": {
      "badge": "🔒",
      "concept": "Chiếc khóa bảo vệ bí mật",
      "visualDesc": "Cuộn bí kíp gia truyền được niêm phong bằng sáp đỏ và ổ khóa vàng chắc chắn."
    }
  },
  "租": {
    "components": ["禾", "且"],
    "equation": "禾 (Lúa thóc thu hoạch) xếp thành từng chồng ngay ngắn trên bàn tế (且)",
    "mnemonic": "Trích một phần hoa màu thu hoạch nộp cho quan cai quản ruộng đất, tô thuế, thuế ruộng đất, cho thuê mướn.",
    "illustration": {
      "badge": "📜",
      "concept": "Sổ bộ thu tô thuế mùa gặt",
      "visualDesc": "Quan thu thuế kiểm đếm những bao thóc vàng nộp tô sau mùa gặt bội thu."
    }
  },
  "秦": {
    "components": ["三", "人", "禾"],
    "equation": "Ba người (三人) cùng chung sức giã gạo lúa (禾) trên vùng đất màu mỡ",
    "mnemonic": "Vùng đất trù phú nơi nhân dân đoàn kết canh tác ngũ cốc lập nên đế chế hùng mạnh, nước Tần, triều Tần.",
    "illustration": {
      "badge": "🐎",
      "concept": "Đội quân đất nung thời nhà Tần",
      "visualDesc": "Chiến binh đất nung uy nghiêm đứng hàng ngũ chỉnh tề của hoàng đế Tần Thủy Hoàng."
    }
  },
  "秩": {
    "components": ["禾", "失"],
    "equation": "禾 (Chia đều phần lúa thóc) không để ai bị thất thoát thiệt thòi (失)",
    "mnemonic": "Phân chia lương thực theo từng thứ bậc quy củ ngay ngắn công bằng, trật tự, thứ tự ngay ngắn, quy củ.",
    "illustration": {
      "badge": "📏",
      "concept": "Hàng lối trật tự kỷ cương",
      "visualDesc": "Những hàng lúa trồng thẳng tắp ngăn nắp thể hiện tính kỷ luật và trật tự cao."
    }
  },
  "称": {
    "components": ["禾", "尔"],
    "equation": "禾 (Lúa thóc) đưa lên bàn cân đong đo đếm chính xác (尔)",
    "mnemonic": "Cân đo đong đếm rồi cất tiếng khen ngợi xưng tụng công lao xứng đáng, xưng hô, ca ngợi, cân đo đong đếm.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Chiếc cân đo lường chuẩn xác",
      "visualDesc": "Chiếc cân đồng cổ thăng bằng đang cân đo chuẩn xác từng lượng ngũ cốc quý."
    }
  },
  "稀": {
    "components": ["禾", "希"],
    "equation": "禾 (Cây lúa trên đồng) mọc thưa thớt như sợi vải dệt mỏng (希)",
    "mnemonic": "Hiếm khi mới thấy được một vài cây lúa trổ bông khác lạ độc đáo, hiếm có, thưa thớt, quý hiếm vô song.",
    "illustration": {
      "badge": "💎",
      "concept": "Bảo vật quý hiếm trên đời",
      "visualDesc": "Bông hoa tuyết liên ngàn năm nở một lần trên đỉnh núi băng giá hiếm có khó tìm."
    }
  },
  "稔": {
    "components": ["禾", "念"],
    "equation": "禾 (Cây lúa ngoài đồng) trổ bông chín vàng đúng như tâm niệm mong mỏi cả năm (念)",
    "mnemonic": "Một năm lao động miệt mài gặt hái mùa màng chín rộ đơm hoa kết trái, lúa chín, một năm bội thu, quen thuộc.",
    "illustration": {
      "badge": "🌾",
      "concept": "Cánh đồng lúa chín vàng ươm",
      "visualDesc": "Biển lúa vàng trĩu hạt dập dềnh theo làn gió thu sau một năm chăm sóc chu đáo."
    }
  },
  "稚": {
    "components": ["禾", "隹"],
    "equation": "禾 (Mầm lúa non tơ) bé bỏng như chú chim con mới nở (隹)",
    "mnemonic": "Tính cách còn non nớt thơ ngây như mầm non vừa nhú và chim non chưa đủ lông cánh, ấu trĩ, non nớt, thơ ngây (yōchi).",
    "illustration": {
      "badge": "🐣",
      "concept": "Chú chim non ngây thơ trong tổ",
      "visualDesc": "Chú chim non há mỏ tròn xoe ngây thơ đón giọt sương mai đầu đời ấm áp."
    }
  },
  "稜": {
    "components": ["禾", "夌"],
    "equation": "禾 (Bông lúa) có những hạt mọc nhô cao sắc nhọn như gờ đồi dốc (夌)",
    "mnemonic": "Gờ mép góc cạnh sắc sảo của tinh thể hoặc uy thế góc cạnh của người thủ lĩnh, góc cạnh, gờ mép, uy lăng.",
    "illustration": {
      "badge": "📐",
      "concept": "Khối lăng kính góc cạnh sắc nét",
      "visualDesc": "Khối pha lê lăng trụ sắc nét khúc xạ ánh sáng qua từng đường gờ cạnh tinh xảo."
    }
  },
  "稲": {
    "components": ["禾", "爫", "旧"],
    "equation": "禾 (Cây lúa chín vàng) được bàn tay (爫) thoăn thoắt gặt hái cho vào cối (旧)",
    "mnemonic": "Hạt ngọc trời ban nuôi sống con người qua bao thế hệ, cây lúa, bông lúa, đạo mễ (ine).",
    "illustration": {
      "badge": "🌾",
      "concept": "Bó lúa vàng trĩu hạt mùa thu",
      "visualDesc": "Bó lúa vàng óng ả buộc lạt rơm thơm phưng phức sau ngày gặt rộn rã tiếng cười."
    }
  },
  "稼": {
    "components": ["禾", "家"],
    "equation": "禾 (Gieo trồng lúa thóc) để nuôi sống cả gia đình ấm no (家)",
    "mnemonic": "Lao động chăm chỉ ngoài đồng ruộng để kiếm thu nhập nuôi sống mái ấm, làm lụng kiếm tiền, trồng trọt (kasegu).",
    "illustration": {
      "badge": "💼",
      "concept": "Chăm chỉ làm lụng kiếm sống",
      "visualDesc": "Người lao động cần cù mỉm cười đón nhận thành quả lao động xứng đáng sau chuỗi ngày vất vả."
    }
  },
  "稿": {
    "components": ["禾", "高"],
    "equation": "禾 (Cọng rơm khô) được dựng thành đụn cao (高) hong gió viết chữ",
    "mnemonic": "Từng trang bản thảo xếp chồng cao chất chứa bao tâm huyết của người viết văn, bản thảo, bài viết thảo cảo.",
    "illustration": {
      "badge": "📝",
      "concept": "Tập bản thảo viết tay công phu",
      "visualDesc": "Xấp giấy thảo cảo viết bằng bút mực chỉnh chu từng con chữ trên bàn làm việc."
    }
  },
  "穀": {
    "components": ["禾", "士", "冖", "殳"],
    "equation": "Dùng chày (殳) đập lớp vỏ bọc bên ngoài (壳) để tách lấy hạt ngũ cốc thơm ngon (禾)",
    "mnemonic": "Các loại hạt lương thực thiết yếu nuôi sống con người như lúa gạo kê bắp, ngũ cốc, hoa màu cốc vật.",
    "illustration": {
      "badge": "🥣",
      "concept": "Bát ngũ cốc dinh dưỡng thơm ngon",
      "visualDesc": "Bát sứ đựng đầy các loại hạt ngũ cốc vàng ruộm bổ dưỡng khởi đầu ngày mới tràn năng lượng."
    }
  },
  "穂": {
    "components": ["禾", "恵"],
    "equation": "禾 (Cây lúa) được ơn huệ của trời đất (恵) kết tinh thành chùm hạt nặng trĩu",
    "mnemonic": "Phần đầu của cành lúa nơi tập trung những hạt ngọc trời no tròn trĩu hạt, bông lúa, đầu ngòi bút (ho).",
    "illustration": {
      "badge": "🌾",
      "concept": "Bông lúa vàng uốn cong trĩu hạt",
      "visualDesc": "Bông lúa chín uốn cong duyên dáng dưới nắng thu báo hiệu một mùa màng bội thu viên mãn."
    }
  },
  "穏": {
    "components": ["禾", "爫", "心"],
    "equation": "Bàn tay vuốt ve nhánh lúa (禾 爫) mang lại cảm giác bình yên trong tâm hồn (心)",
    "mnemonic": "Tâm trí nhẹ nhàng thư thái không chút gợn sóng như mặt hồ phẳng lặng, yên ổn, ôn hòa, dịu dàng điềm tĩnh.",
    "illustration": {
      "badge": "☕",
      "concept": "Tâm hồn an yên tĩnh lặng",
      "visualDesc": "Tách trà nóng bốc khói nhẹ nhàng bên khung cửa sổ chiều thu yên ả thanh bình."
    }
  },
  "穣": {
    "components": ["禾", "襄"],
    "equation": "禾 (Lúa thóc) trổ bông đầy ắp hỗ trợ bao bọc (襄) cả đất nước no ấm",
    "mnemonic": "Mùa màng bội thu lúa gạo chất đầy kho mang lại sự trù phú sung túc, được mùa bội thu, số lượng cực lớn tỉ tỉ.",
    "illustration": {
      "badge": "🌾",
      "concept": "Vụ mùa bội thu lúa ngập tràn kho",
      "visualDesc": "Kho thóc bằng gỗ đầy ắp những hạt lúa vàng óng ả tràn cả ra bậc thềm."
    }
  },
  "穫": {
    "components": ["禾", "蒦"],
    "equation": "禾 (Lúa thóc trên đồng) dùng tay (又) gặt lấy những chùm hạt chín vàng (蒦)",
    "mnemonic": "Đến mùa thu hoạch rộn ràng cắt lúa mang về tích trữ cho mùa đông, gặt hái, thu hoạch, đắc hoạch.",
    "illustration": {
      "badge": "🚜",
      "concept": "Mùa gặt rộn ràng trên cánh đồng",
      "visualDesc": "Chiếc máy gặt lúa hối hả chạy trên đồng vàng rực dưới ánh hoàng hôn mùa gặt."
    }
  },
  "穴": {
    "components": ["宀", "八"],
    "equation": "宀 (Mái vòm đất đá) mở rộng ra hai bên (八) thành cái hốc sâu",
    "mnemonic": "Hốc đất khoét sâu vào vách núi làm nơi trú ẩn tránh mưa nắng thú dữ, hang hốc, lỗ hổng, huyệt đạo.",
    "illustration": {
      "badge": "🕳️",
      "concept": "Miệng hang đá sâu thẳm",
      "visualDesc": "Cửa hang động vòm đá bí ẩn dẫn lối vào lòng núi thạch nhũ lung linh."
    }
  },
  "窃": {
    "components": ["穴", "切"],
    "equation": "穴 (Nấp trong hang tối) dùng dao sắc (切) cắt trộm của cải mang đi",
    "mnemonic": "Lén lút chui vào chỗ tối khoét ngạch lấy cắp tài sản của người khác, trộm cắp, lén lút, thiết đạo ăn trộm.",
    "illustration": {
      "badge": "🥷",
      "concept": "Kẻ trộm lén lút trong bóng đêm",
      "visualDesc": "Bóng đen lén lút lẻn qua cửa sổ trong đêm tối không gây ra một tiếng động."
    }
  },
  "窑": {
    "components": ["穴", "缶"],
    "equation": "穴 (Khoét hầm đất sâu) xếp đầy các bình vò đất nung (缶) để đốt lò",
    "mnemonic": "Hầm đất kín giữ nhiệt cực cao dùng để nung gạch ngói và bát đĩa sứ, lò nung gốm sứ, lò gạch.",
    "illustration": {
      "badge": "🏺",
      "concept": "Lò nung gốm đỏ rực lửa",
      "visualDesc": "Lò gốm nung bậc thang truyền thống rực lửa nung những chiếc bình men lam tuyệt hảo."
    }
  },
  "窒": {
    "components": ["穴", "至"],
    "equation": "穴 (Cửa hang động) bị đất đá lấp kín tới nơi (至) không còn chỗ thở",
    "mnemonic": "Cửa hầm bị bít kín nghẹt thở không khí không lưu thông được, nghẹt thở, ngột ngạt, khí nitơ (chisso).",
    "illustration": {
      "badge": "💨",
      "concept": "Cảm giác ngột ngạt nghẹt thở",
      "visualDesc": "Căn phòng kín mít không có cửa sổ bí bách cần được mở toang đón gió trời."
    }
  },
  "窮": {
    "components": ["穴", "身", "弓"],
    "equation": "穴 (Chui vào hang cụt) uốn còng lưng thân mình (身) như cánh cung (弓)",
    "mnemonic": "Rơi vào bước đường cùng không lối thoát phải dốc hết sức nghiên cứu tìm lối ra, khốn cùng, cùng cực, nghiên cứu sâu.",
    "illustration": {
      "badge": "🧗",
      "concept": "Vượt qua nghịch cảnh bước đường cùng",
      "visualDesc": "Người leo núi kiên cường bám vách đá hiểm trở tìm lối vươn lên từ thế hiểm nghèo."
    }
  },
  "竜": {
    "components": ["立", "月"],
    "equation": "Thần thú đứng thẳng (立) uy nghiêm với thân hình uốn khúc vảy rồng sáng như trăng (月)",
    "mnemonic": "Loài linh vật thiêng liêng bay lượn trên mây mang lại mưa thuận gió hòa, con rồng thần, long vương (tatsu).",
    "illustration": {
      "badge": "🐉",
      "concept": "Rồng thiêng uốn lượn cưỡi mây",
      "visualDesc": "Con rồng xanh uy dũng uốn lượn giữa những tầng mây sấm chớp phun mưa lành xuống trần gian."
    }
  },
  "竣": {
    "components": ["立", "夋"],
    "equation": "立 (Công trình đứng vững) người thợ chậm rãi thu dọn đồ nghề lui gót (夋)",
    "mnemonic": "Công trình to lớn đã hoàn thành trọn vẹn đứng vững chãi chuẩn bị bàn giao đưa vào sử dụng, khánh thành, hoàn tất.",
    "illustration": {
      "badge": "🏗️",
      "concept": "Lễ cắt băng khánh thành công trình",
      "visualDesc": "Dải ruy băng đỏ được cắt trong lễ khánh thành cây cầu mới nguy nga nối hai bờ sông."
    }
  },
  "端": {
    "components": ["立", "山", "而"],
    "equation": "Đứng thẳng (立) ngay ngắn trên đỉnh núi cao (山) râu tóc bay trong gió (而)",
    "mnemonic": "Tư thế ngay thẳng đàng hoàng ở vị trí tận cùng mép biên giới, mép rìa, đoan chính, cực đoan, điểm đầu mút.",
    "illustration": {
      "badge": "📐",
      "concept": "Đoan chính ngay thẳng chuẩn mực",
      "visualDesc": "Tấm thước kẻ đặt thẳng tắp đo đạc chính xác từng góc cạnh ngay ngắn thẳng hàng."
    }
  },
  "笙": {
    "components": ["竹", "生"],
    "equation": "竹 (Những ống trúc nhỏ ghép lại) tấu lên âm thanh sinh động (生) của đất trời",
    "mnemonic": "Nhạc cụ cổ xưa gồm nhiều ống trúc ghép tròn thổi lên những nốt nhạc vi vu thần tiên, khèn trúc shō, kèn sênh.",
    "illustration": {
      "badge": "🎶",
      "concept": "Chiếc khèn trúc shō tấu nhã nhạc",
      "visualDesc": "Chiếc khèn shō mười bảy ống trúc tinh xảo trong dàn nhã nhạc cung đình gagaku."
    }
  },
  "笛": {
    "components": ["竹", "由"],
    "equation": "竹 (Ống trúc rỗng) phát ra âm thanh từ hơi thở tự do thổi qua các lỗ (由)",
    "mnemonic": "Ống tre khoét các lỗ nhỏ thổi bằng miệng tạo nên giai điệu réo rắt du dương, cây sáo trúc, tiếng còi tàu (fue).",
    "illustration": {
      "badge": "🪈",
      "concept": "Cây sáo trúc du dương réo rắt",
      "visualDesc": "Cây sáo trúc thắt chỉ đỏ thổi lên giai điệu thanh thoát êm ái giữa rừng tre xanh."
    }
  },
  "第": {
    "components": ["竹", "弟"],
    "equation": "竹 (Thẻ tre ghi sổ) sắp xếp thứ tự từng người như thứ bậc anh em trong nhà (弟)",
    "mnemonic": "Thẻ tre đánh số thứ tự từ lớn đến nhỏ để phân định thứ bậc rõ ràng, thứ tự, cấp bậc, đệ nhất số một.",
    "illustration": {
      "badge": "🥇",
      "concept": "Huy chương vàng vị trí đệ nhất",
      "visualDesc": "Tấm huy chương vàng khắc số một chói lọi vinh danh người đứng đầu cuộc thi."
    }
  },
  "笹": {
    "components": ["竹", "世"],
    "equation": "竹 (Họ nhà trúc) sống bền bỉ trải qua bao thế hệ (世) xanh tốt",
    "mnemonic": "Loài trúc lùn lá xanh mướt mọc từng khóm nhỏ dùng gói bánh và trang trí ngày lễ Tanabata, lá tre sasa, trúc lùn.",
    "illustration": {
      "badge": "🎋",
      "concept": "Cành trúc treo dải điều ước Tanabata",
      "visualDesc": "Cành trúc nhỏ treo những dải giấy ngũ sắc ghi điều ước phấp phới trong gió đêm hè."
    }
  },
  "筋": {
    "components": ["竹", "月", "力"],
    "equation": "Những thớ thịt (月) dai dẻo như nan tre (竹) tạo nên sức mạnh cơ bắp (力)",
    "mnemonic": "Bó cơ thớ thịt dẻo dai giúp cơ thể vận động khỏe khoắn theo mạch lạc rõ ràng, gân cốt, cơ bắp, cốt truyện tình tiết.",
    "illustration": {
      "badge": "💪",
      "concept": "Bắp tay gân guốc khỏe khoắn",
      "visualDesc": "Bắp tay săn chắc nổi rõ những đường cơ gân khỏe khoắn trong buổi tập thể thao."
    }
  },
  "策": {
    "components": ["竹", "朿"],
    "equation": "Thẻ tre (竹) viết những mưu kế sắc bén gai góc như gai nhọn (朿)",
    "mnemonic": "Những mưu kế mưu lược ghi trên thẻ tre giúp định hướng thành công kế sách lớn, sách lược, mưu kế, chính sách.",
    "illustration": {
      "badge": "💡",
      "concept": "Bản kế hoạch chính sách chiến lược",
      "visualDesc": "Tấm bản đồ vạch rõ các bước hành động chiến lược thông minh để đạt mục tiêu."
    }
  },
  "箇": {
    "components": ["竹", "固"],
    "equation": "竹 (Ống trúc) đóng chặt kiên cố (固) bảo vệ từng đơn vị riêng rẽ",
    "mnemonic": "Đếm từng món đồ riêng biệt độc lập rõ ràng một cách chuẩn xác, từng cái một, địa điểm, cá thể.",
    "illustration": {
      "badge": "📦",
      "concept": "Từng kiện hàng riêng biệt",
      "visualDesc": "Những chiếc hộp vuông vức đánh số thứ tự đếm từng cái một trên băng chuyền."
    }
  },
  "節": {
    "components": ["竹", "即"],
    "equation": "竹 (Cây tre thân rỗng) có những ngấn đốt ngăn cách vừa khít (即)",
    "mnemonic": "Từng đốt tre chia thân cây thành các đoạn vững chãi, tiết chế chi tiêu và phân định thời tiết, đốt tre, tiết kiệm, giai điệu.",
    "illustration": {
      "badge": "🎋",
      "concept": "Đốt tre xanh ngắt cứng cáp",
      "visualDesc": "Thân cây tre xanh bóng với những ngấn đốt chắc nịch kiên cường trước bão gió."
    }
  },
  "範": {
    "components": ["竹", "車", "卩"],
    "equation": "Khuôn nan tre (竹) uốn nắn thành vành bánh xe (車) theo quy chuẩn khuôn mẫu (卩)",
    "mnemonic": "Khuôn mẫu chuẩn mực định hình ranh giới không được vượt quá giới hạn, phạm vi, khuôn mẫu, gương mẫu.",
    "illustration": {
      "badge": "📐",
      "concept": "Khung phạm vi giới hạn chuẩn mực",
      "visualDesc": "Vòng tròn compa vẽ nên ranh giới phạm vi rõ ràng chuẩn xác từng mi-li-mét."
    }
  },
  "篤": {
    "components": ["竹", "馬"],
    "equation": "竹 (Nan tre làm roi) thúc chú ngựa (馬) trung thành tiến bước vững vàng",
    "mnemonic": "Tấm lòng trung thành sâu nặng tận tụy hết lòng với người khác, đôn hậu, nhiệt thành, bệnh tình nguy kịch.",
    "illustration": {
      "badge": "❤️",
      "concept": "Tấm lòng tận tụy đôn hậu",
      "visualDesc": "Bác sĩ tận tình chăm sóc bệnh nhân thâu đêm với tấm lòng đôn hậu ấm áp."
    }
  },
  "簿": {
    "components": ["竹", "溥"],
    "equation": "竹 (Tập thẻ tre) ghi chép rộng khắp bao quát muôn nơi (溥)",
    "mnemonic": "Cuốn sổ bìa tre dùng ghi chép lưu trữ đầy đủ sổ sách danh sách quan trọng, sổ ghi chép, sổ bộ, sổ cái.",
    "illustration": {
      "badge": "📒",
      "concept": "Cuốn sổ cái ghi chép sổ sách",
      "visualDesc": "Cuốn sổ cái dày dặn ghi chép tỉ mỉ từng danh sách và số liệu rõ ràng ngăn nắp."
    }
  },
  "粋": {
    "components": ["米", "卒"],
    "equation": "米 (Hạt gạo) được xay xát sàng sảy kỹ lưỡng đến tận cùng (卒)",
    "mnemonic": "Chắt lọc những gì tinh hoa tinh khiết nhất tạo nên phong cách thanh lịch tao nhã, tinh túy, thanh lịch sành điệu (iki).",
    "illustration": {
      "badge": "👘",
      "concept": "Phong thái thanh lịch tao nhã iki",
      "visualDesc": "Người mặc kimono họa tiết sọc giản dị mà toát lên khí chất phong lưu sành điệu iki."
    }
  },
  "粗": {
    "components": ["米", "且"],
    "equation": "米 (Hạt gạo lúa) còn để nguyên trên thớt đá (且) chưa xay giã kỹ",
    "mnemonic": "Hạt ngũ cốc chưa qua sàng lọc còn lợn cợn thô ráp vụng về, thô ráp, xơ sài, hàng thô thô thiển.",
    "illustration": {
      "badge": "🪵",
      "concept": "Mặt gỗ thô ráp chưa mài nhẵn",
      "visualDesc": "Tấm ván gỗ mộc còn nguyên thớ xơ ráp tự nhiên chưa qua lớp sơn đánh bóng."
    }
  },
  "粘": {
    "components": ["米", "占"],
    "equation": "米 (Hạt nếp dẻo quánh) dính chặt lấy muỗng bói quẻ (占)",
    "mnemonic": "Hạt gạo nếp nấu chín giã thành bánh mochi dẻo quánh dính chặt không rời, dính dớp, dẻo dai, kiên trì bám dính.",
    "illustration": {
      "badge": "🍡",
      "concept": "Bánh mochi dẻo quánh thơm ngon",
      "visualDesc": "Khối bột nếp mochi dẻo thơm đang được kéo dài thể hiện độ dính dẻo tuyệt vời."
    }
  },
  "粛": {
    "components": ["聿", "𣶒"],
    "equation": "Cầm bút (聿) cẩn trọng ghi chép bên bờ vực sâu thăm thẳm (𣶒)",
    "mnemonic": "Thái độ cẩn trọng trang nghiêm giữ gìn trật tự không dám lơ là, nghiêm túc, thanh trừng, yên lặng tĩnh mịch.",
    "illustration": {
      "badge": "🤫",
      "concept": "Không khí trang nghiêm thanh tịnh",
      "visualDesc": "Hội trường im phăng phắc trong không khí trang nghiêm lắng nghe lời tuyên thệ."
    }
  },
  "糖": {
    "components": ["米", "唐"],
    "equation": "米 (Chất bột ngũ cốc) lên men từ thời nhà Đường (唐) tạo vị ngọt ngào",
    "mnemonic": "Chất bột hạt gạo chưng cất tạo thành những hạt tinh thể ngọt lịm như mật ong, chất đường, đường ăn, đường cát.",
    "illustration": {
      "badge": "🍬",
      "concept": "Những viên kẹo đường ngọt ngào",
      "visualDesc": "Những viên đường phèn trắng tinh khiết ngọt ngào óng ánh như thủy tinh."
    }
  },
  "糧": {
    "components": ["米", "量"],
    "equation": "米 (Gạo thóc) được đo lường cẩn thận (量) cấp phát cho quân sĩ",
    "mnemonic": "Nguồn lương thực thực phẩm dự trữ quý giá cung cấp năng lượng sống cho con người, lương thực, đồ ăn nuôi dưỡng.",
    "illustration": {
      "badge": "🌾",
      "concept": "Kho lương thực dự trữ đầy ắp",
      "visualDesc": "Những bao gạo trắng tinh được xếp ngay ngắn trong kho lương thực sẵn sàng phục vụ."
    }
  },
  "系": {
    "components": ["丿", "糸"],
    "equation": "Từng sợi chỉ tơ (糸) nối tiếp từ đầu mối phía trên (丿) tạo thành chuỗi liên kết",
    "mnemonic": "Các mắt xích gắn kết bền chặt tạo nên hệ thống phả hệ truyền đời, hệ thống, huyết thống, dòng dõi liên quan.",
    "illustration": {
      "badge": "🧬",
      "concept": "Cây phả hệ huyết thống gia đình",
      "visualDesc": "Sơ đồ phả hệ với các nhánh nối kết nhau thể hiện sự tiếp nối giữa các thế hệ."
    }
  },
  "糾": {
    "components": ["糸", "丩"],
    "equation": "糸 (Những sợi tơ) xoắn bện đan cài chằng chịt vào nhau (丩)",
    "mnemonic": "Bện chặt các sợi dây lại để tra xét vạch trần điều mập mờ uốn nắn sai sót, xoắn bện, tra xét, vướng mắc bất hòa.",
    "illustration": {
      "badge": "🔍",
      "concept": "Tra xét uốn nắn sai sót",
      "visualDesc": "Sợi dây bện xoắn chặt chẽ được kiểm tra từng gút thắt để tìm ra điểm rạn nứt."
    }
  },
  "紀": {
    "components": ["糸", "己"],
    "equation": "糸 (Sợi dây mối chốt) tự mình (己) nắm giữ để ghi nhớ thời gian",
    "mnemonic": "Sợi dây chính nắm giềng mối ghi chép lại các cột mốc lịch sử hào hùng, kỷ nguyên, kỷ luật, nhật ký thế kỷ.",
    "illustration": {
      "badge": "📅",
      "concept": "Cuốn biên niên sử ghi mốc thời gian",
      "visualDesc": "Cuốn sách bìa da cổ ghi lại từng mốc thế kỷ vàng son của lịch sử nhân loại."
    }
  },
  "紋": {
    "components": ["糸", "文"],
    "equation": "糸 (Sợi chỉ tơ ngũ sắc) dệt thêu nên những hoa văn tuyệt mỹ (文)",
    "mnemonic": "Đường nét hoa văn tinh xảo thêu trên áo giáp và áo lễ của dòng tộc, hoa văn, gia huy (kamon), vân tay.",
    "illustration": {
      "badge": "🏵️",
      "concept": "Gia huy hoa cúc tinh xảo kamon",
      "visualDesc": "Huy hiệu hoa văn gia tộc hình đóa cúc thêu bằng chỉ vàng trên nền gấm đen."
    }
  },
  "納": {
    "components": ["糸", "内"],
    "equation": "糸 (Cuộn tơ tằm quý) được mang cất vào bên trong kho kín (内)",
    "mnemonic": "Thu gom sản vật nộp vào kho triều đình cất giữ an toàn, nạp vào, nộp thuế, cất giữ, tiếp nhận thấu hiểu.",
    "illustration": {
      "badge": "📥",
      "concept": "Nộp thuế tiếp nhận vào kho",
      "visualDesc": "Bàn tay nộp kiện hàng thuế vào quầy tiếp nhận đóng dấu hoàn tất thủ tục."
    }
  },
  "紗": {
    "components": ["糸", "少"],
    "equation": "糸 (Sợi tơ mỏng mảnh) dệt thưa thớt với mật độ ít ỏi (少)",
    "mnemonic": "Tấm vải lụa tơ tằm dệt mỏng tang như sương sớm nhẹ tênh thoáng mát, vải sa mỏng, lụa the trong suốt.",
    "illustration": {
      "badge": "🧣",
      "concept": "Dải lụa sa mỏng manh bay trong gió",
      "visualDesc": "Chiếc khăn lụa the mỏng tang màu hồng nhạt bay bồng bềnh trong làn gió nhẹ."
    }
  },
  "紘": {
    "components": ["糸", "厷"],
    "equation": "糸 (Sợi dây thừng) giang rộng hai cánh tay đo đạc bao la (厷)",
    "mnemonic": "Sợi dây đai nón thắt chặt bờ cõi giang sơn rộng lớn bao la bốn phương, bao la rộng lớn, dây nón hoành đại.",
    "illustration": {
      "badge": "🌏",
      "concept": "Bầu trời bao la rộng lớn bốn phương",
      "visualDesc": "Quả địa cầu được bao quanh bởi dải băng sáng tượng trưng cho sự rộng lớn bao la."
    }
  },
  "級": {
    "components": ["糸", "及"],
    "equation": "糸 (Sợi tơ chỉ đường) từng bước vươn tới chạm tới nấc thang tiếp theo (及)",
    "mnemonic": "Từng bậc thang cấp độ thăng tiến theo trình độ và nỗ lực bền bỉ, cấp bậc, đẳng cấp, cấp học lớp học.",
    "illustration": {
      "badge": "📶",
      "concept": "Từng bậc thang cấp độ tăng dần",
      "visualDesc": "Bậc thang đá dẫn lên cao từng nấc tượng trưng cho các cấp bậc trình độ."
    }
  },
  "紛": {
    "components": ["糸", "分"],
    "equation": "糸 (Những sợi chỉ tơ) bị chia cắt tung tóe phân tán khắp nơi (分)",
    "mnemonic": "Cuộn chỉ tơ bị xé nhỏ bay lả tả làm rối rắm trật tự ban đầu, rối ren, phân tán, hỗn loạn phân tranh.",
    "illustration": {
      "badge": "🌀",
      "concept": "Cơn lốc chỉ rối ren hỗn loạn",
      "visualDesc": "Đám chỉ ngũ sắc bị gió cuốn tung bay rối bời cần được gỡ từng nút thắt."
    }
  },
  "素": {
    "components": ["龶", "糸"],
    "equation": "Chùm sợi tơ mộc mạc (糸) vừa kéo ra từ kén tằm còn giữ nguyên màu trắng sơ khai",
    "mnemonic": "Bản chất nguyên sơ ban đầu chưa qua nhuộm màu tô vẽ, nguyên tố, mộc mạc, chất liệu, tố chất.",
    "illustration": {
      "badge": "🧵",
      "concept": "Cuộn tơ tằm trắng nguyên sơ",
      "visualDesc": "Cuộn tơ tằm trắng ngần mộc mạc chưa qua nhuộm màu đặt trên bàn dệt gỗ."
    }
  },
  "紡": {
    "components": ["糸", "方"],
    "equation": "糸 (Sợi bông tơ) được guồng quay theo mọi phương hướng (方) để xe thành sợi chỉ",
    "mnemonic": "Đôi bàn tay quay guồng xe sợi bông thành những cuộn chỉ dài bền chặt, kéo sợi, dệt sợi, dệt may.",
    "illustration": {
      "badge": "🧶",
      "concept": "Con thoi kéo sợi dệt vải",
      "visualDesc": "Guồng quay sợi gỗ đang xoay đều đặn kéo từng sợi chỉ trắng bóng mượt mà."
    }
  },
  "索": {
    "components": ["十", "冖", "糸"],
    "equation": "Bện mười (十) sợi dây tơ (糸) lại dưới mái nhà (冖) thành sợi dây thừng chắc chắn",
    "mnemonic": "Lần theo sợi dây lần mò từng manh mối để tìm kiếm lời giải đáp, dây thừng lớn, tìm kiếm, tìm tòi tra khảo.",
    "illustration": {
      "badge": "🔍",
      "concept": "Lần theo sợi dây tìm kiếm manh mối",
      "visualDesc": "Kính lúp soi theo sợi dây đỏ lần tìm manh mối trong mê cung bí ẩn."
    }
  },
  "紫": {
    "components": ["此", "糸"],
    "equation": "糸 (Sợi tơ nhuộm màu) từ loại cỏ củ tử thảo này đây (此)",
    "mnemonic": "Sợi tơ nhuộm sắc tím hoa tử đằng vương giả cao quý chốn hoàng cung, màu tím, sắc tím tử thảo.",
    "illustration": {
      "badge": "💜",
      "concept": "Giàn hoa tử đằng tím ngát",
      "visualDesc": "Giàn hoa tử đằng fuji rủ từng chùm tím biếc thơ mộng đung đưa trong nắng sớm."
    }
  },
  "紬": {
    "components": ["糸", "由"],
    "equation": "糸 (Sợi tơ tằm vụn) rút ra từ (由) những kén tằm lỗi vỏ dày",
    "mnemonic": "Rút sợi tơ thô dệt nên tấm vải lụa tsumugi mộc mạc ấm áp bền bỉ trứ danh, rút tơ, vải lụa tsumugi.",
    "illustration": {
      "badge": "👘",
      "concept": "Tấm vải lụa tsumugi mộc mạc",
      "visualDesc": "Xấp vải lụa tsumugi dệt thủ công với những đường vân tơ tự nhiên mộc mạc ấm áp."
    }
  },
  "累": {
    "components": ["田", "糸"],
    "equation": "糸 (Sợi dây buộc) nối kết từng thửa ruộng này sang thửa ruộng khác (田) chồng chất",
    "mnemonic": "Gánh nặng và công việc cứ dồn dập tích tụ thêm từng ngày, tích lũy, liên lụy, mệt mỏi chồng chất.",
    "illustration": {
      "badge": "🧱",
      "concept": "Từng viên gạch xếp chồng chất",
      "visualDesc": "Những viên gạch xây được xếp chồng cao kiên cố biểu trưng cho sự tích lũy bền bỉ."
    }
  },
  "紳": {
    "components": ["糸", "申"],
    "equation": "糸 (Dải thắt lưng gấm dài) buông thẳng đứng ngay ngắn đoan trang (申)",
    "mnemonic": "Dải thắt lưng rộng thêu hoa văn của bậc quý tộc lịch thiệp phong nhã, thân sĩ, quý ông hào hoa lịch thiệp.",
    "illustration": {
      "badge": "🎩",
      "concept": "Quý ông lịch lãm đội mũ dạ",
      "visualDesc": "Hình ảnh quý ông thắt nơ thanh lịch cầm gậy chống cúi chào tao nhã chuẩn mực."
    }
  },
  "紺": {
    "components": ["糸", "柑"],
    "equation": "糸 (Sợi vải tơ) được nhuộm bằng thuốc nhuộm thảo mộc màu xanh lam đậm",
    "mnemonic": "Sắc xanh lam sẫm màu nước biển sâu truyền thống của trang phục võ sĩ samurai, màu xanh lam sẫm (kon).",
    "illustration": {
      "badge": "💙",
      "concept": "Tấm áo hakama màu xanh lam sẫm",
      "visualDesc": "Bộ võ phục hakama màu xanh chàm sẫm truyền thống toát lên vẻ trang nghiêm mạnh mẽ."
    }
  },
  "絃": {
    "components": ["糸", "玄"],
    "equation": "糸 (Sợi tơ bện chặt) có màu đen huyền bí sâu thẳm (玄) căng trên phím đàn",
    "mnemonic": "Sợi dây tơ bện chặt gảy lên những thanh âm du dương trầm bổng, dây đàn, tiếng đàn huyền ca.",
    "illustration": {
      "badge": "🎻",
      "concept": "Dây đàn tấu khúc nhạc huyền diệu",
      "visualDesc": "Cây đàn dây với những sợi tơ căng thẳng tắp rung lên khúc nhạc du dương êm đềm."
    }
  },
  "結": {
    "components": ["糸", "吉"],
    "equation": "糸 (Sợi dây thừng) buộc nút thắt thắt chặt lời chúc tốt lành (吉)",
    "mnemonic": "Thắt chặt hai đầu sợi dây gắn kết mối nhân duyên bền chặt mãi mãi, buộc thắt, kết quả, kết nối đoàn kết.",
    "illustration": {
      "badge": "🎀",
      "concept": "Nút thắt may mắn mizuhiki",
      "visualDesc": "Nút thắt dây gấm đỏ trắng mizuhiki truyền thống chúc mừng mối duyên lành trăm năm."
    }
  },
  "絞": {
    "components": ["糸", "交"],
    "equation": "糸 (Sợi vải) bị vắt chéo tréo vào nhau (交) để ép kiệt nước",
    "mnemonic": "Dùng hai tay vặn xoắn tấm khăn ướt để vắt kiệt từng giọt nước ra ngoài, vắt khăn, siết chặt, thắt cổ.",
    "illustration": {
      "badge": "🧺",
      "concept": "Vắt kiệt nước tấm khăn ướt",
      "visualDesc": "Đôi bàn tay xoắn vặn tấm khăn bông ướt làm những giọt nước bắn tung tóe."
    }
  },
  "絢": {
    "components": ["糸", "旬"],
    "equation": "糸 (Sợi chỉ màu) dệt thành hoa văn rực rỡ trọn vẹn cả chu kỳ (旬)",
    "mnemonic": "Tấm lụa gấm dệt chỉ vàng lộng lẫy xa hoa chói lọi muôn sắc màu, rực rỡ gấm hoa, lộng lẫy huyến lệ.",
    "illustration": {
      "badge": "👘",
      "concept": "Tấm áo kimono gấm hoa lộng lẫy",
      "visualDesc": "Tấm áo cưới furisode thêu kim tuyến lấp lánh rực rỡ sắc màu hoa lá mùa xuân."
    }
  },
  "統": {
    "components": ["糸", "充"],
    "equation": "糸 (Sợi dây dẫn lối) tập hợp đầy đủ sung túc mọi mối dây về một mối (充)",
    "mnemonic": "Nắm trọn các đầu mối dây chỉ huy gom giang sơn về một mối quy củ, thống nhất, hệ thống, cai quản truyền thống.",
    "illustration": {
      "badge": "🌐",
      "concept": "Sự thống nhất toàn vẹn giang sơn",
      "visualDesc": "Bản đồ đất nước liền một dải với các tuyến đường huyết mạch kết nối thông suốt."
    }
  },
  "絹": {
    "components": ["糸", "口", "月"],
    "equation": "糸 (Sợi tơ óng ả) nhả ra từ miệng (口) chú tằm béo tròn như trăng khuyết (月)",
    "mnemonic": "Chất liệu vải may dệt từ tơ tằm tự nhiên mềm mại mượt mà như làn da em bé, lụa tơ tằm, vải lụa tơ (kinu).",
    "illustration": {
      "badge": "🐛",
      "concept": "Kén tằm nhả sợi tơ vàng",
      "visualDesc": "Chiếc kén tằm tròn xinh đang nhả ra những sợi tơ vàng óng ả óng ánh dưới nắng mai."
    }
  },
  "継": {
    "components": ["糸", "㡭"],
    "equation": "糸 (Sợi chỉ đứt) được chắp nối lại với các đoạn tơ ngắn liên tục",
    "mnemonic": "Nối liền dòng chảy sự nghiệp và truyền thống của cha ông cho thế hệ mai sau, kế thừa, tiếp nối, kế tục.",
    "illustration": {
      "badge": "🏃",
      "concept": "Trao gậy tiếp sức trong cuộc đua",
      "visualDesc": "Vận động viên trao thanh gậy tiếp sức cho đồng đội lao nhanh về đích trong tiếng reo hò."
    }
  },
  "綜": {
    "components": ["糸", "宗"],
    "equation": "糸 (Muôn sợi tơ dệt) cùng quy tụ về một khung cửi tôn giáo cốt lõi (宗)",
    "mnemonic": "Thu gom muôn mối tơ về cùng một chỗ để đan dệt nên bức tranh toàn cảnh, tổng hợp, bao quát tổng thể.",
    "illustration": {
      "badge": "🧩",
      "concept": "Tổng hợp các mảnh ghép lại",
      "visualDesc": "Bức tranh toàn cảnh hoàn chỉnh được tạo nên từ việc tổng hợp hài hòa các mảnh ghép nhỏ."
    }
  },
  "維": {
    "components": ["糸", "隹"],
    "equation": "糸 (Dây thừng bền chắc) buộc giữ chú chim nhỏ (隹) đứng vững trên cành",
    "mnemonic": "Dây chão giằng giữ cho khung nhà vững chãi bảo vệ giềng mối xã hội, duy trì, duy tân Minh Trị, bảo dưỡng.",
    "illustration": {
      "badge": "⚙️",
      "concept": "Bảo dưỡng duy trì cỗ máy",
      "visualDesc": "Người kỹ sư tra dầu bảo dưỡng các bánh răng giúp cỗ máy vận hành trơn tru bền bỉ."
    }
  },
  "綱": {
    "components": ["糸", "岡"],
    "equation": "糸 (Dây thừng bện) to lớn chắc chắn như sống lưng gò đồi vững chãi (岡)",
    "mnemonic": "Sợi dây thừng khổng lồ làm giềng mối neo giữ con tàu lớn trước bão dông, dây chão lớn, giềng mối, cương lĩnh.",
    "illustration": {
      "badge": "⚓",
      "concept": "Dây thừng khổng lồ neo tàu",
      "visualDesc": "Cuộn dây thừng bện to như bắp chân giữ chặt con tàu viễn dương kiên cố bên cầu cảng."
    }
  },
  "網": {
    "components": ["糸", "罔"],
    "equation": "糸 (Những sợi dây dù) đan cài vào nhau tạo thành mắt lưới bao vây (罔)",
    "mnemonic": "Tấm lưới đan mắt cáo thả xuống biển vây bắt đàn cá bạc, tấm lưới đánh cá, mạng lưới internet, võng mạc.",
    "illustration": {
      "badge": "🕸️",
      "concept": "Tấm lưới đánh cá tung trên biển",
      "visualDesc": "Ngư dân tung mẻ lưới tròn xòe rộng trên sóng nước đón trọn luồng cá trĩu nặng."
    }
  },
  "綸": {
    "components": ["糸", "侖"],
    "equation": "糸 (Sợi chỉ tơ xanh cao quý) buộc cuộn chiếu chỉ có trật tự quy củ của thiên tử (侖)",
    "mnemonic": "Sợi tơ xanh dùng buộc chiếu chỉ vua ban mang lời dạy bảo khuôn vàng thước ngọc, chiếu dụ của vua, luân lý, sợi cước câu.",
    "illustration": {
      "badge": "📜",
      "concept": "Chiếu chỉ buộc dải lụa xanh",
      "visualDesc": "Cuộn thánh chỉ lụa thêu rồng buộc dây tơ xanh trang trọng mang mệnh lệnh triều đình."
    }
  },
  "綺": {
    "components": ["糸", "奇"],
    "equation": "糸 (Sợi tơ) dệt nên những hoa văn kỳ diệu lạ lùng đẹp mắt (奇)",
    "mnemonic": "Tấm lụa gấm hoa dệt tinh xảo đẹp đẽ tuyệt trần hút hồn người ngắm, gấm lụa đẹp đẽ, diễm lệ, xinh đẹp (kirei).",
    "illustration": {
      "badge": "✨",
      "concept": "Vẻ đẹp kiều diễm rạng ngời",
      "visualDesc": "Đóa hoa mẫu đơn nở rộ khoe sắc rực rỡ lộng lẫy tựa gấm hoa kiều diễm."
    }
  },
  "綾": {
    "components": ["糸", "夌"],
    "equation": "糸 (Sợi tơ) dệt bắt chéo nổi gờ thành hình quả trám như sườn đồi dốc (夌)",
    "mnemonic": "Kỹ thuật dệt tơ lụa hoa văn chéo quả trám hoặc trò chơi luồn dây đan hình khéo léo, lụa vân chéo, trò luồn dây ayatori.",
    "illustration": {
      "badge": "🪢",
      "concept": "Trò chơi luồn dây khéo léo ayatori",
      "visualDesc": "Đôi bàn tay nhỏ khéo léo luồn sợi dây len tạo thành hình tháp Tokyo đẹp mắt trong trò ayatori."
    }
  },
  "緊": {
    "components": ["臣", "又", "糸"],
    "equation": "Bàn tay vị quan (臣 又) siết chặt sợi dây thừng (糸) không chút lơi lỏng",
    "mnemonic": "Siết chặt sợi dây buộc tạo nên trạng thái cấp bách đòi hỏi hành động tức thì, thắt chặt, khẩn cấp, căng thẳng.",
    "illustration": {
      "badge": "🚨",
      "concept": "Còi báo động tình huống khẩn cấp",
      "visualDesc": "Đèn xoay đỏ rực rỡ nhấp nháy báo động tình huống khẩn cấp cần xử lý ngay lập tức."
    }
  },
  "緋": {
    "components": ["糸", "非"],
    "equation": "糸 (Sợi tơ tằm) nhuộm sắc đỏ rực khác hẳn mọi màu thường (非)",
    "mnemonic": "Sợi tơ nhuộm sắc đỏ tươi rực lửa của ánh hoàng hôn và cá chép koi, màu đỏ thắm, đỏ tươi rực rỡ (ake).",
    "illustration": {
      "badge": "🎏",
      "concept": "Chú cá chép đỏ thắm rực rỡ",
      "visualDesc": "Chú cá chép koi vảy đỏ thắm rực rỡ bơi lội uyển chuyển dưới làn nước trong veo."
    }
  },
  "締": {
    "components": ["糸", "帝"],
    "equation": "糸 (Dây buộc) được thắt chặt uy nghiêm theo khuôn phép hoàng đế (帝)",
    "mnemonic": "Thắt chặt nút dây đai kết thúc công việc và đặt bút ký kết hợp đồng chính thức, thắt chặt, ký kết, kết thúc (shimeru).",
    "illustration": {
      "badge": "✍️",
      "concept": "Đặt bút ký kết hợp đồng",
      "visualDesc": "Cây bút máy sang trọng ký chữ ký sắc nét khép lại bản thỏa thuận hợp tác thành công."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n1iData)) {
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

console.log(`[Batch 5I - N1 Part 9] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n1iData).length} chữ Kanji N1.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
