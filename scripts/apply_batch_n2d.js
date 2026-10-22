/**
 * Batch 4D: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 92 chữ Kanji N2 cuối cùng (từ 膚 đến 齢)
 * Hoàn thành 100% cấp độ N2 (368/368 chữ)
 */

const fs = require('fs');
const path = require('path');

const n2dData = {
  "膚": {
    "components": ["虍", "胃"],
    "equation": "虍 (Hổ - da hổ vằn vện) + 胃 (Vị - dạ dày, cơ thể bằng thịt)",
    "mnemonic": "Lớp da bên ngoài cơ thể (胃) có vân mềm mại như da hổ (虍), làn da, bì phu.",
    "illustration": {
      "badge": "🧴",
      "concept": "Làn da mịn màng",
      "visualDesc": "Bàn tay đang thoa lớp kem dưỡng mềm mượt lên bề mặt da khỏe khoắn."
    }
  },
  "臓": {
    "components": ["月", "蔵"],
    "equation": "月 (Nhục - cơ quan thịt trong cơ thể) + 蔵 (Tàng - cất giấu sâu bên trong)",
    "mnemonic": "Những khối thịt (月) được cất giấu kín đáo và bảo bọc sâu bên trong lồng ngực (蔵) chính là nội tạng.",
    "illustration": {
      "badge": "🫀",
      "concept": "Nội tạng cơ thể",
      "visualDesc": "Mô hình giải phẫu y khoa hiển thị trái tim và các cơ quan nội tạng quan trọng."
    }
  },
  "臣": {
    "components": ["臣"],
    "equation": "臣 (Tượng hình con mắt cúi gằm xuống quy phục trước đấng quân vương)",
    "mnemonic": "Hình ảnh một vị quan cúi đầu rạp mình, mắt nhìn xuống bày tỏ lòng trung thành tận tụy, bề tôi, bầy tôi.",
    "illustration": {
      "badge": "🙇",
      "concept": "Bề tôi trung nghĩa",
      "visualDesc": "Vị đại thần mặc áo triều phục quỳ gối cúi mình bẩm tấu trước ngai vàng."
    }
  },
  "舟": {
    "components": ["舟"],
    "equation": "舟 (Tượng hình chiếc thuyền nan độc mộc với hai bên mạn thuyền và mái chèo)",
    "mnemonic": "Hình vẽ chiếc thuyền nan nhỏ bằng gỗ đang bập bềnh rẽ sóng trên mặt nước, con thuyền.",
    "illustration": {
      "badge": "🛶",
      "concept": "Thuyền nan độc mộc",
      "visualDesc": "Chiếc thuyền gỗ nhỏ trôi lững lờ trên dòng sông êm đềm buổi sớm."
    }
  },
  "航": {
    "components": ["舟", "亢"],
    "equation": "舟 (Chu - thuyền bè) + 亢 (Kháng - vươn cao, vượt qua bão táp)",
    "mnemonic": "Con thuyền (舟) vươn cao vượt qua muôn trùng sóng gió (亢) để mở đường hàng hải, du hành.",
    "illustration": {
      "badge": "🚢",
      "concept": "Tàu viễn dương vượt biển",
      "visualDesc": "Con tàu lớn rẽ sóng đại dương bao la tiến về phía chân trời rạng rỡ."
    }
  },
  "般": {
    "components": ["舟", "殳"],
    "equation": "舟 (Chu - thuyền) + 殳 (Thù - gậy xoay chuyển, thao tác)",
    "mnemonic": "Dùng cây sào (殳) điều khiển thuyền (舟) quay đầu lặp đi lặp lại tạo thành thói quen thông thường, phổ biến.",
    "illustration": {
      "badge": "🔄",
      "concept": "Chuyển động xoay chuyển thông thường",
      "visualDesc": "Bánh lái xoay vần nhịp nhàng điều hướng cho vạn vật vận hành tuần tự."
    }
  },
  "芸": {
    "components": ["艹", "云"],
    "equation": "艹 (Thảo - mầm cây nghệ thuật) + 云 (Vân - mây trôi bồng bềnh uốn lượn)",
    "mnemonic": "Tài năng vun trồng như mầm non (艹) nở rộ bay bổng tựa tầng mây (云), nghệ thuật, tài nghệ.",
    "illustration": {
      "badge": "🎭",
      "concept": "Nghệ thuật trình diễn",
      "visualDesc": "Mặt nạ nghệ thuật kịch Noh truyền thống bên nhành hoa anh đào tinh tế."
    }
  },
  "荒": {
    "components": ["艹", "亡", "川"],
    "equation": "艹 (Thảo - cây cỏ) + 亡 (Vong - tiêu tan, chết chóc) + 川 (Xuyên - sông nước cạn kiệt)",
    "mnemonic": "Cỏ cây (艹) lụi tàn tiêu vong (亡), dòng sông (川) cạn trơ đáy tạo nên cảnh tượng hoang tàn, hoang vu.",
    "illustration": {
      "badge": "🏜️",
      "concept": "Vùng đất hoang mạc",
      "visualDesc": "Cảnh hoang mạc khô cằn với cành cây khô trơ trụi dưới ánh hoàng hôn đỏ rực."
    }
  },
  "荷": {
    "components": ["艹", "何"],
    "equation": "艹 (Thảo - bọc bằng rơm rạ) + 何 (Hà - vác trên vai gánh nặng)",
    "mnemonic": "Đồ đạc bọc trong bao rơm (艹) vác trĩu nặng trên vai (何), kiện hàng, hành lý mang theo.",
    "illustration": {
      "badge": "📦",
      "concept": "Kiện hàng hành lý",
      "visualDesc": "Hộp bưu kiện đóng gói cẩn thận được xếp ngay ngắn trên kệ vận chuyển."
    }
  },
  "菓": {
    "components": ["艹", "果"],
    "equation": "艹 (Thảo - thảo mộc thơm lành) + 果 (Quả - trái cây chín mọng)",
    "mnemonic": "Vị ngọt từ trái cây chín mọng (果) kết hợp bột cỏ cây (艹) làm nên món bánh kẹo ngọt ngào.",
    "illustration": {
      "badge": "🍡",
      "concept": "Bánh wagashi truyền thống",
      "visualDesc": "Đĩa bánh wagashi đủ sắc thái tinh tế đặt cạnh chén trà xanh thanh nhã."
    }
  },
  "菜": {
    "components": ["艹", "采"],
    "equation": "艹 (Thảo - cây rau cỏ) + 采 (Thải - bàn tay vươn ra hái lượm)",
    "mnemonic": "Bàn tay thoăn thoắt hái lượm (采) những nhánh rau cỏ tươi ngon (艹) trong vườn, rau củ.",
    "illustration": {
      "badge": "🥗",
      "concept": "Rau xanh tươi ngon",
      "visualDesc": "Rổ rau củ quả tươi mát còn đọng sương mai xanh mướt mát mắt."
    }
  },
  "著": {
    "components": ["艹", "者"],
    "equation": "艹 (Thảo - ngòi bút nở hoa thảo mộc) + 者 (Giả - người tài năng)",
    "mnemonic": "Người (者) mài giũa ngòi bút viết nên những áng văn tươi mới như ngọn cỏ (艹), nhà văn, trứ danh, nổi bật.",
    "illustration": {
      "badge": "✍️",
      "concept": "Tác gia viết sách",
      "visualDesc": "Cuốn sách mở ra bên cây bút mực cổ điển với những dòng chữ trang nhã."
    }
  },
  "蒸": {
    "components": ["艹", "氶", "灬"],
    "equation": "艹 (Thảo - thảo mộc tạo hương) + 氶 (Thừa - khay đón nước) + 灬 (Hỏa - ngọn lửa bùng cháy)",
    "mnemonic": "Lửa cháy bập bùng bên dưới (灬) làm nước bốc hơi nấu chín thức ăn cùng thảo mộc (艹), chưng cất, hấp chín.",
    "illustration": {
      "badge": "🥟",
      "concept": "Xửng hấp bốc khói",
      "visualDesc": "Xửng tre hấp há cảo nghi ngút khói thơm lừng lan tỏa."
    }
  },
  "蔵": {
    "components": ["艹", "厂", "臧"],
    "equation": "艹 (Thảo - rơm rạ che chắn) + 厂 (Hán - mái kho kiên cố) + 臧 (Tang - đồ quý giá cất giấu)",
    "mnemonic": "Bảo vật quý giá (臧) được cất giấu kỹ dưới mái nhà kho (厂) phủ rơm rạ che chắn (艹), tàng trữ, kho báu.",
    "illustration": {
      "badge": "🏯",
      "concept": "Kho chứa cổ kura",
      "visualDesc": "Gian nhà kho kiểu kura truyền thống Nhật Bản xây tường trắng kiên cố."
    }
  },
  "薄": {
    "components": ["艹", "氵", "尃"],
    "equation": "艹 (Thảo - cây cỏ mép nước) + 氵 (Thủy - nước hồ) + 尃 (Phổ - trải rộng ra)",
    "mnemonic": "Cỏ dại (艹) mọc thưa thớt trải mỏng bên mép nước (氵-尃), mỏng manh, vị nhạt nhẽo.",
    "illustration": {
      "badge": "📄",
      "concept": "Tấm giấy mỏng manh",
      "visualDesc": "Tờ giấy mỏng manh bay nhẹ trong làn gió sớm mai trong trẻo."
    }
  },
  "虫": {
    "components": ["虫"],
    "equation": "虫 (Tượng hình loài bò sát uốn mình ngóc đầu, sau phiếm chỉ sâu bọ côn trùng)",
    "mnemonic": "Hình vẽ chú sâu nhỏ uốn éo thân mình bò trên mặt đất, sâu bọ, côn trùng.",
    "illustration": {
      "badge": "🐛",
      "concept": "Côn trùng sâu bọ",
      "visualDesc": "Chú bọ cánh cứng màu xanh ngọc bích đậu trên chiếc lá còn đọng hạt sương."
    }
  },
  "血": {
    "components": ["丿", "皿"],
    "equation": "皿 (Mãnh - chiếc đĩa tế lễ bằng đồng) + 丿 (Giọt máu nhỏ vào dâng tế)",
    "mnemonic": "Giọt máu tươi (丿) nhỏ vào đĩa tế đàn (皿) thể hiện lòng thành kính tuyên thệ, dòng máu, huyết quản.",
    "illustration": {
      "badge": "🩸",
      "concept": "Giọt máu đỏ tươi",
      "visualDesc": "Giọt máu hình cầu óng ánh biểu tượng cho sinh mệnh và sự sống."
    }
  },
  "衣": {
    "components": ["衣"],
    "equation": "衣 (Tượng hình tà áo cổ chéo và hai vạt buông rủ thời xưa)",
    "mnemonic": "Hình vẽ chiếc áo vạt chéo với cổ áo và hai tà dài rủ xuống che thân, y phục, áo quần.",
    "illustration": {
      "badge": "👘",
      "concept": "Trang phục truyền thống",
      "visualDesc": "Chiếc áo kimono truyền thống dệt hoa văn tỉ mỉ treo trên giá gỗ."
    }
  },
  "袋": {
    "components": ["代", "衣"],
    "equation": "代 (Đại - thay đổi, mang theo bên mình) + 衣 (Y - vải vóc may vá)",
    "mnemonic": "Mảnh vải (衣) được may khéo léo để chứa đồ đạc mang theo mọi lúc (代), túi xách, bao bì.",
    "illustration": {
      "badge": "🛍️",
      "concept": "Túi xách đựng đồ",
      "visualDesc": "Chiếc túi vải tote thân thiện môi trường đựng đầy đồ đạc gọn gàng."
    }
  },
  "被": {
    "components": ["衤", "皮"],
    "equation": "衤 (Y - tấm chăn bằng vải) + 皮 (Bì - lớp da phủ bên ngoài)",
    "mnemonic": "Tấm chăn vải (衤) phủ lên tấm da ngoài (皮) vừa để đắp ủ ấm vừa che phủ, bị bao trùm, gánh chịu.",
    "illustration": {
      "badge": "🛏️",
      "concept": "Tấm chăn phủ ấm",
      "visualDesc": "Chiếc chăn ấm áp trùm kín người nằm nghỉ ngơi giữa ngày đông lạnh."
    }
  },
  "装": {
    "components": ["壮", "衣"],
    "equation": "壮 (Tráng - tráng kiện, bệ vệ uy nghi) + 衣 (Y - xiêm y, trang phục)",
    "mnemonic": "Khoác lên người bộ y phục (衣) để toát lên vẻ ngoài mạnh mẽ, đĩnh đạc (壮), trang phục, trang bị.",
    "illustration": {
      "badge": "👔",
      "concept": "Trang phục chỉnh tề",
      "visualDesc": "Bộ âu phục lịch lãm được ủi phẳng phiu treo ngay ngắn."
    }
  },
  "裏": {
    "components": ["衣", "里"],
    "equation": "衣 (Y - lớp vải áo bên ngoài) bao bọc lấy 里 (Lý - lớp lót sâu bên trong)",
    "mnemonic": "Mặt lót sâu bên trong (里) của tà áo y phục (衣) chính là mặt trái, mặt sau.",
    "illustration": {
      "badge": "🔄",
      "concept": "Mặt trái mặt sau",
      "visualDesc": "Tấm danh thiếp lật ra mặt sau hiển thị những thông tin chi tiết."
    }
  },
  "補": {
    "components": ["衤", "甫"],
    "equation": "衤 (Y - áo quần thủng rách) + 甫 (Phủ - mảnh vải vá vừa khít đắp lên)",
    "mnemonic": "Dùng mảnh vải (衤) đắp vào chỗ sứt rách vừa khít (甫) để vá lành, bù đắp, bổ sung khiếm khuyết.",
    "illustration": {
      "badge": "🩹",
      "concept": "Bổ sung bù đắp",
      "visualDesc": "Mảnh ghép cuối cùng được khớp vừa in vào bức tranh xếp hình hoàn chỉnh."
    }
  },
  "複": {
    "components": ["衤", "复"],
    "equation": "衤 (Y - vạt áo) + 复 (Phức - lặp đi lặp lại, xếp lớp)",
    "mnemonic": "Tà áo (衤) xếp chồng nhiều lớp lớp qua lại (复), nhiều tầng lớp, phức tạp, kép.",
    "illustration": {
      "badge": "🧩",
      "concept": "Mạng lưới phức tạp",
      "visualDesc": "Nhiều bánh răng cơ khí lồng ghép đan xen chuyển động nhịp nhàng."
    }
  },
  "角": {
    "components": ["角"],
    "equation": "角 (Tượng hình chiếc sừng thú nhọn hoắt với những đường vân khía góc cạnh)",
    "mnemonic": "Hình vẽ chiếc sừng thú vươn nhọn đầy góc cạnh sắc sảo, góc, sừng hươu nai.",
    "illustration": {
      "badge": "📐",
      "concept": "Góc nhọn thước kẻ",
      "visualDesc": "Chiếc thước đo góc vuông vức hiển thị góc nhọn chuẩn xác."
    }
  },
  "触": {
    "components": ["角", "虫"],
    "equation": "角 (Giác - sừng nhọn cảm ứng) + 虫 (Trùng - côn trùng sâu bọ)",
    "mnemonic": "Côn trùng (虫) dùng chiếc sừng râu (角) chạm nhẹ dò đường xung quanh, tiếp xúc, sờ mó.",
    "illustration": {
      "badge": "👆",
      "concept": "Chạm đầu ngón tay",
      "visualDesc": "Đầu ngón tay chạm nhẹ lên màn hình tinh thể lỏng phát ra vòng sóng lan tỏa."
    }
  },
  "訓": {
    "components": ["言", "川"],
    "equation": "言 (Ngôn - lời dạy bảo) + 川 (Xuyên - dòng nước chảy thuận tự nhiên)",
    "mnemonic": "Lời nói (言) khuyên răn xuôi theo lẽ phải tựa dòng nước chảy tự nhiên (川), răn dạy, huấn thị.",
    "illustration": {
      "badge": "👨‍🏫",
      "concept": "Thầy giáo chỉ dẫn",
      "visualDesc": "Bậc thầy ân cần giảng giải đạo lý chuẩn mực bên bục giảng."
    }
  },
  "設": {
    "components": ["言", "殳"],
    "equation": "言 (Ngôn - lời bàn bạc, bản vẽ) + 殳 (Thù - bàn tay cầm dụng cụ xây dựng)",
    "mnemonic": "Bàn bạc phương án (言) rồi bắt tay cầm dụng cụ xây dựng nên (殳), thiết kế, thiết lập.",
    "illustration": {
      "badge": "🏗️",
      "concept": "Bản vẽ thiết kế",
      "visualDesc": "Bản vẽ kỹ thuật kiến trúc với các khối hình dựng 3D sắc sảo."
    }
  },
  "詞": {
    "components": ["言", "司"],
    "equation": "言 (Ngôn - lời nói phát ra) + 司 (Ty - quản lý, điều hành chuẩn mực)",
    "mnemonic": "Những lời nói (言) được quản lý và sắp đặt trật tự chuẩn mực (司) tạo thành từ ngữ, ca từ.",
    "illustration": {
      "badge": "📖",
      "concept": "Từ điển từ vựng",
      "visualDesc": "Trang từ điển mở rộng với các mục từ định nghĩa rõ ràng."
    }
  },
  "詰": {
    "components": ["言", "吉"],
    "equation": "言 (Ngôn - lời tra hỏi gay gắt) + 吉 (Cát - kiên định, dứt khoát)",
    "mnemonic": "Dùng lời lẽ (言) dồn ép người khác đến cùng để truy tìm chân tướng (吉), chất vấn, nhồi nhét.",
    "illustration": {
      "badge": "📦",
      "concept": "Đóng gói chật kín",
      "visualDesc": "Chiếc vali được xếp đầy đồ đạc gọn gàng, chật kín không còn kẽ hở."
    }
  },
  "誌": {
    "components": ["言", "志"],
    "equation": "言 (Ngôn - câu chữ ghi chép) + 志 (Chí - ý chí, tâm tư nguyện vọng)",
    "mnemonic": "Dùng câu từ (言) để ghi chép lại những ý chí, sự kiện tâm huyết (志), tạp chí, biên niên ký.",
    "illustration": {
      "badge": "📰",
      "concept": "Tạp chí in ấn",
      "visualDesc": "Cuốn tạp chí bóng bẩy với hình ảnh bìa và bài viết chuyên đề."
    }
  },
  "課": {
    "components": ["言", "果"],
    "equation": "言 (Ngôn - lời giao việc) + 果 (Quả - kết quả thu hoạch)",
    "mnemonic": "Giao việc bằng lời (言) và kiểm tra kết quả hoàn thành (果), khóa mục, phòng ban, bài học.",
    "illustration": {
      "badge": "📋",
      "concept": "Phòng ban phân công",
      "visualDesc": "Bảng phân công nhiệm vụ chi tiết cho từng phòng ban trong công ty."
    }
  },
  "諸": {
    "components": ["言", "者"],
    "equation": "言 (Ngôn - lời truyền đạt) + 者 (Giả - mọi người, tập thể)",
    "mnemonic": "Lời nói (言) truyền đạt đến đông đảo mọi người (者) cùng nghe, chư vị, các, nhiều.",
    "illustration": {
      "badge": "👥",
      "concept": "Chư vị quan khách",
      "visualDesc": "Đông đảo cử tọa đang lắng nghe bài diễn thuyết tại hội trường."
    }
  },
  "講": {
    "components": ["言", "冓"],
    "equation": "言 (Ngôn - lời nói) + 冓 (Cấu - kết cấu chặt chẽ, lồng ghép)",
    "mnemonic": "Lời nói (言) được lập luận đan cài kết cấu logic chặt chẽ (冓), giảng dạy, diễn giảng.",
    "illustration": {
      "badge": "🏛️",
      "concept": "Hội trường giảng bài",
      "visualDesc": "Giảng đường đại học bậc thang với bảng đen và bục giảng trang trọng."
    }
  },
  "谷": {
    "components": ["谷"],
    "equation": "谷 (Tượng hình dòng suối từ hai sườn dốc đổ vào lòng vực sâu)",
    "mnemonic": "Nước từ hai vách núi rẽ dòng chảy tụ vào khe sâu bên dưới, thung lũng, khe núi.",
    "illustration": {
      "badge": "🏞️",
      "concept": "Thung lũng xanh ngắt",
      "visualDesc": "Thung lũng lòng chảo xanh tươi nằm lọt thỏm giữa hai dãy núi non trùng điệp."
    }
  },
  "豊": {
    "components": ["曲", "豆"],
    "equation": "豆 (Đậu - chiếc mâm lễ) + 曲 (Tượng hình ngũ cốc hoa quả chất đầy ắp)",
    "mnemonic": "Mâm lễ vật (豆) chất đầy hoa trái tốt tươi ngọn ngút (曲) tạ ơn trời đất mùa màng bội thu, trù phú.",
    "illustration": {
      "badge": "🌾",
      "concept": "Mùa màng bội thu",
      "visualDesc": "Bó lúa mì vàng óng trĩu hạt tượng trưng cho sự sung túc no ấm."
    }
  },
  "象": {
    "components": ["象"],
    "equation": "象 (Tượng hình toàn thân chú voi với chiếc vòi dài uốn cong và đôi tai to)",
    "mnemonic": "Hình vẽ chú voi to lớn với chiếc vòi cong dài đặc trưng, con voi, hình tượng.",
    "illustration": {
      "badge": "🐘",
      "concept": "Chú voi to lớn",
      "visualDesc": "Chú voi điềm đạm bước đi giữa đồng cỏ mênh mông dưới ráng chiều."
    }
  },
  "貝": {
    "components": ["貝"],
    "equation": "貝 (Tượng hình con sò biển đang mở hé hai mảnh vỏ lộ chân mềm)",
    "mnemonic": "Hình vẽ vỏ sò quý thời cổ đại dùng làm đơn vị tiền tệ trao đổi, con sò, vỏ ốc, tiền của.",
    "illustration": {
      "badge": "🐚",
      "concept": "Vỏ sò biển óng ánh",
      "visualDesc": "Vỏ sò biển lấp lánh xà cừ nằm bên bờ cát trắng mịn màng."
    }
  },
  "貨": {
    "components": ["化", "貝"],
    "equation": "化 (Hóa - biến hóa, chuyển đổi qua lại) + 貝 (Bối - tiền vỏ sò, của cải)",
    "mnemonic": "Tiền của (貝) lưu thông biến đổi luân chuyển (化) thành các loại vật phẩm trao đổi, hàng hóa.",
    "illustration": {
      "badge": "🪙",
      "concept": "Tiền tệ lưu thông",
      "visualDesc": "Các đồng tiền vàng óng xếp chồng bên cạnh kiện hàng lưu thông."
    }
  },
  "販": {
    "components": ["貝", "反"],
    "equation": "貝 (Bối - tiền của trao đổi) + 反 (Phản - lật qua lật lại, chuyển giao)",
    "mnemonic": "Dùng tiền bạc (貝) để sang tay chuyển nhượng hàng hóa qua lại (反), buôn bán, phân phối.",
    "illustration": {
      "badge": "🏪",
      "concept": "Cửa hàng bán lẻ",
      "visualDesc": "Máy bán hàng tự động sáng đèn bên hè phố tấp nập khách mua."
    }
  },
  "貯": {
    "components": ["貝", "宁"],
    "equation": "貝 (Bối - tiền của quý giá) + 宁 (Trữ - cất giấu kín trong rương hòm)",
    "mnemonic": "Tiền bạc của cải (貝) được gom cất cẩn thận vào hòm bảo mật (宁), tích trữ, để dành.",
    "illustration": {
      "badge": "🐖",
      "concept": "Ống heo tiết kiệm",
      "visualDesc": "Ống heo tiết kiệm màu hồng đựng những đồng xu tích lũy từng ngày."
    }
  },
  "貿": {
    "components": ["卯", "貝"],
    "equation": "卯 (Mão - mở rộng cánh cửa hai bên) + 貝 (Bối - tiền của hàng hóa)",
    "mnemonic": "Mở toang cánh cổng biên cương (卯) để dòng hàng hóa và tiền của (貝) thông thương qua lại, mậu dịch.",
    "illustration": {
      "badge": "🌐",
      "concept": "Giao thương quốc tế",
      "visualDesc": "Bản đồ địa cầu với các tuyến luồng vận tải hàng hải quốc tế kết nối các cảng biển."
    }
  },
  "賞": {
    "components": ["尚", "貝"],
    "equation": "尚 (Thượng - tôn vinh, đề cao) + 貝 (Bối - ban tặng tiền của bảo vật)",
    "mnemonic": "Tôn vinh chiến tích xứng đáng (尚) bằng cách ban tặng tiền thưởng quý giá (貝), khen thưởng, giải thưởng.",
    "illustration": {
      "badge": "🏆",
      "concept": "Cúp vàng khen thưởng",
      "visualDesc": "Chiếc cúp vàng sáng loáng đặt trên bục danh dự vinh danh người chiến thắng."
    }
  },
  "賢": {
    "components": ["臤", "貝"],
    "equation": "臤 (Khiên - người có bàn tay nắm giữ vững vàng tri thức) + 貝 (Bối - phẩm chất quý giá)",
    "mnemonic": "Người có bản lĩnh nắm giữ đạo lý (臤) và tích lũy phẩm hạnh quý hơn ngọc ngà (貝), hiền tài, thông thái.",
    "illustration": {
      "badge": "🦉",
      "concept": "Cú mèo thông thái",
      "visualDesc": "Chú cú mèo thông thái đậu trên chồng sách cổ dày dặn tri thức."
    }
  },
  "贈": {
    "components": ["貝", "曽"],
    "equation": "貝 (Bối - quà tặng quý giá) + 曽 (Tăng - chồng chất, tăng thêm tình cảm)",
    "mnemonic": "Trao tặng vật phẩm quý báu (貝) để bồi đắp nhân đôi mối thân tình thêm gắn bó (曽), tặng quà.",
    "illustration": {
      "badge": "🎁",
      "concept": "Hộp quà thắt nơ",
      "visualDesc": "Hộp quà tặng thắt nơ ruy băng màu đỏ trang trọng và tinh tế."
    }
  },
  "超": {
    "components": ["走", "召"],
    "equation": "走 (Tẩu - chạy nhanh) + 召 (Triệu - vẫy gọi từ phía trước xa xôi)",
    "mnemonic": "Chạy thật nhanh (走) vượt xa tầm vẫy gọi bình thường (召), siêu việt, vượt quá mức quy định.",
    "illustration": {
      "badge": "🚀",
      "concept": "Tên lửa vượt âm",
      "visualDesc": "Tên lửa phóng vút lên tầng khí quyển vượt qua mọi rào cản tốc độ."
    }
  },
  "跡": {
    "components": ["足", "亦"],
    "equation": "足 (Túc - bàn chân dẫm xuống) + 亦 (Diệc - lặp lại dấu vết)",
    "mnemonic": "Bàn chân bước đi (足) để lại từng vết hằn in sâu trên mặt đất mềm (亦), dấu vết, di tích.",
    "illustration": {
      "badge": "👣",
      "concept": "Dấu chân trên cát",
      "visualDesc": "Dãy dấu chân in đều đặn trên bãi cát mịn màng bên mép nước biển."
    }
  },
  "踊": {
    "components": ["足", "甬"],
    "equation": "足 (Túc - đôi bàn chân) + 甬 (Dũng - cái chuông ngân vang, bật nhảy)",
    "mnemonic": "Tiếng nhạc vang lên, đôi chân (足) nhún nhảy tung tăng theo giai điệu rộn ràng (甬), khiêu vũ, nhảy múa.",
    "illustration": {
      "badge": "💃",
      "concept": "Vũ điệu uyển chuyển",
      "visualDesc": "Vũ công đang xoay mình duyên dáng trong điệu múa rộn rã sắc màu."
    }
  },
  "軍": {
    "components": ["冖", "車"],
    "equation": "冖 (Mịch - vành đai bao bọc lều trại) + 車 (Xa - xe chiến mã trận)",
    "mnemonic": "Những chiếc xe chiến trận (車) tập kết bố trí bao quanh doanh trại (冖), quân đội, binh lính.",
    "illustration": {
      "badge": "🎖️",
      "concept": "Doanh trại quân đội",
      "visualDesc": "Đoàn quân kiên cố đứng trang nghiêm bảo vệ biên cương vững chắc."
    }
  },
  "軒": {
    "components": ["車", "干"],
    "equation": "車 (Xa - xe cộ có mái che) + 干 (Can - cột chống dựng thẳng)",
    "mnemonic": "Cột dựng đứng chống đỡ (干) phần mái che chở cho xe cộ đỗ bên dưới (車), mái hiên, căn nhà.",
    "illustration": {
      "badge": "🏡",
      "concept": "Mái hiên nhà gỗ",
      "visualDesc": "Mái hiên ngói lợp cong truyền thống che mát khoảng sân trước nhà."
    }
  },
  "軟": {
    "components": ["車", "欠"],
    "equation": "車 (Xa - khung xe) + 欠 (Khiếm - uốn cong người, co giãn đàn hồi)",
    "mnemonic": "Khung xe uốn lượn co giãn nhịp nhàng không bị gãy cứng (欠) khi chịu tải (車), mềm dẻo, uyển chuyển.",
    "illustration": {
      "badge": "🧸",
      "concept": "Gối bông mềm mại",
      "visualDesc": "Chiếc đệm bông xốp êm ái đàn hồi nhẹ nhàng khi chạm tay vào."
    }
  },
  "軽": {
    "components": ["車", "圣"],
    "equation": "車 (Xa - cỗ xe) + 圣 (Thánh/Kinh - khung dệt sợi thanh mảnh thẳng tắp)",
    "mnemonic": "Chiếc xe (車) được chế tạo tinh gọn bằng vật liệu nhẹ chạy vun vút trên đường (圣), nhẹ nhàng.",
    "illustration": {
      "badge": "🪶",
      "concept": "Lông vũ nhẹ bay",
      "visualDesc": "Chiếc lông chim trắng muốt trôi bềnh bồng nhẹ tênh trong không trung."
    }
  },
  "輪": {
    "components": ["車", "侖"],
    "equation": "車 (Xa - cỗ xe lăn bánh) + 侖 (Lôn - xếp các thanh nan tròn đều quanh trục)",
    "mnemonic": "Các nan hoa được xếp đều đặn tròn xoe (侖) để cỗ xe lăn tròn mượt mà (車), bánh xe, vòng tròn.",
    "illustration": {
      "badge": "🎡",
      "concept": "Bánh xe quay tròn",
      "visualDesc": "Vòng đu quay khổng lồ với các nan tỏa đều đang quay tròn êm ả."
    }
  },
  "輸": {
    "components": ["車", "俞"],
    "equation": "車 (Xa - xe cộ vận tải) + 俞 (Du - thông suốt, đưa thuyền qua kênh nước)",
    "mnemonic": "Xe cộ (車) vận hành liên tục đưa hàng hóa lưu thông thông suốt đến nơi cần (俞), vận tải, xuất nhập khẩu.",
    "illustration": {
      "badge": "🚚",
      "concept": "Xe tải vận chuyển hàng",
      "visualDesc": "Chiếc xe tải chở đầy hàng hóa lăn bánh nhanh trên đường cao tốc."
    }
  },
  "辛": {
    "components": ["辛"],
    "equation": "辛 (Tượng hình con dao khắc hình phạt khắc dấu xăm thời cổ đại)",
    "mnemonic": "Mũi dao nhọn thời cổ khắc lên da thịt gây cảm giác đau rát tột cùng, vị cay nồng, gian truân, cay đắng.",
    "illustration": {
      "badge": "🌶️",
      "concept": "Quả ớt đỏ cay nồng",
      "visualDesc": "Quả ớt đỏ rực tươi rói mang vị cay xé nồng đượm đặc trưng."
    }
  },
  "農": {
    "components": ["曲", "辰"],
    "equation": "辰 (Thần - nông cụ cày bừa theo thời vụ) + 曲 (Tượng hình hoa màu mọc lên)",
    "mnemonic": "Dùng nông cụ cày cuốc theo đúng mùa vụ thiên văn (辰) để cây trái đơm hoa kết quả (曲), làm nông nghiệp.",
    "illustration": {
      "badge": "🚜",
      "concept": "Cánh đồng nông nghiệp",
      "visualDesc": "Bác nông dân cần mẫn chăm sóc luống lúa xanh bát ngát dưới nắng ấm."
    }
  },
  "辺": {
    "components": ["辶", "刀"],
    "equation": "辶 (Sước - bước đi, ranh giới) + 刀 (Đao - nhát cắt phân định ranh giới)",
    "mnemonic": "Bước đi (辶) dọc theo lằn ranh được vạch rõ (刀) để quan sát khu vực lân cận, xung quanh, bờ mép.",
    "illustration": {
      "badge": "📍",
      "concept": "Vùng lân cận xung quanh",
      "visualDesc": "Vòng tròn định vị hiển thị bán kính các địa điểm xung quanh điểm hẹn."
    }
  },
  "述": {
    "components": ["辶", "朮"],
    "equation": "辶 (Sước - bước theo dấu chân) + 朮 (Thuật - con đường mòn thẳng tắp)",
    "mnemonic": "Lần theo đúng con đường từng bước diễn ra (辶-朮) để kể lại chân thực không sai lệch, trần thuật.",
    "illustration": {
      "badge": "🎙️",
      "concept": "Phát biểu tường thuật",
      "visualDesc": "Người phát ngôn đứng trước micro trình bày rõ ràng từng chi tiết bản tin."
    }
  },
  "逆": {
    "components": ["辶", "屰"],
    "equation": "辶 (Sước - bước đi) + 屰 (Nghịch - người lộn ngược đầu xuống)",
    "mnemonic": "Bước đi (辶) ngược chiều với dòng người bình thường (屰), đi ngược lại, nghịch lý, chống đối.",
    "illustration": {
      "badge": "🔄",
      "concept": "Mũi tên đảo ngược",
      "visualDesc": "Biển báo giao thông có hai mũi tên chỉ chiều ngược nhau đối lập rõ rệt."
    }
  },
  "造": {
    "components": ["辶", "告"],
    "equation": "辶 (Sước - hành động bắt tay thực hiện) + 告 (Cáo - báo cáo, công bố hoàn thành)",
    "mnemonic": "Bắt tay vào hành động chế tác (辶) rồi tự hào công bố tác phẩm hoàn tất (告), sáng tạo, chế tạo.",
    "illustration": {
      "badge": "🛠️",
      "concept": "Chế tác thủ công",
      "visualDesc": "Người thợ khéo léo dùng công cụ gọt giũa tạo nên bức tượng gỗ tinh xảo."
    }
  },
  "郊": {
    "components": ["交", "阝"],
    "equation": "交 (Giao - nơi giao cắt tiếp giáp) + 阝 (Ấp - thành trì, đô thị)",
    "mnemonic": "Vùng đất nằm ngay nơi giao thoa tiếp giáp (交) ở rìa ngoài thành thị (阝), vùng ngoại ô ven đô.",
    "illustration": {
      "badge": "🏡",
      "concept": "Vùng ngoại ô yên bình",
      "visualDesc": "Khu dân cư ngoại ô ngập tràn bóng cây xanh mát và thoáng đãng."
    }
  },
  "郵": {
    "components": ["垂", "阝"],
    "equation": "垂 (Thùy - trạm dừng nghỉ ngơi buông cương) + 阝 (Ấp - thôn xóm biên ải)",
    "mnemonic": "Trạm dịch trạm ven thôn (阝) nơi người đưa thư thay ngựa dừng chân buông cương (垂), bưu chính, thư tín.",
    "illustration": {
      "badge": "📮",
      "concept": "Hòm thư bưu điện",
      "visualDesc": "Hòm thư màu đỏ cổ điển nổi bật nơi góc phố yên bình."
    }
  },
  "量": {
    "components": ["旦", "里"],
    "equation": "旦 (Đán - mặt trời mọc rạng sáng) + 里 (Lý - mẫu ruộng đo đạc)",
    "mnemonic": "Từ lúc mặt trời vừa ló rạng (旦) người ta đã ra đồng đo đạc từng mẫu đất (里), đo lường, khối lượng.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Cán cân đo lường",
      "visualDesc": "Chiếc cân đĩa thăng bằng đo đạc chính xác trọng lượng của vật thể."
    }
  },
  "針": {
    "components": ["金", "十"],
    "equation": "金 (Kim - mẩu kim loại nhỏ) + 十 (Thập - cây kim có mắt xỏ chỉ thẳng đứng)",
    "mnemonic": "Mẩu kim loại nhỏ (金) được mài mảnh mai thon dài có lỗ xỏ chỉ (十), cây kim khâu, mũi châm.",
    "illustration": {
      "badge": "🪡",
      "concept": "Cây kim sợi chỉ",
      "visualDesc": "Cây kim thép sáng loáng với sợi chỉ luồn qua mắt kim khéo léo."
    }
  },
  "鈍": {
    "components": ["金", "屯"],
    "equation": "金 (Kim - lưỡi kim loại) + 屯 (Truân - khó khăn, ngập ngừng đâm thủng)",
    "mnemonic": "Lưỡi kim loại (金) bị mòn vẹt gặp vật gì cũng trơ ra khó cắt thủng (屯), cùn rỉ, đần độn, chậm chạp.",
    "illustration": {
      "badge": "🔪",
      "concept": "Lưỡi dao bị cùn",
      "visualDesc": "Lưỡi dao cùn mẻ cạnh không còn độ sắc bén để gọt vỏ trái cây."
    }
  },
  "鉄": {
    "components": ["金", "失"],
    "equation": "金 (Kim - kim loại) + 失 (Thất - dạng giản thể của chữ sắt cổ)",
    "mnemonic": "Thứ kim loại (金) phổ biến làm khung nhà, thanh ray kiên cố chống chịu va đập (失), kim loại sắt.",
    "illustration": {
      "badge": "🔩",
      "concept": "Đinh ốc bằng sắt",
      "visualDesc": "Những thanh ray và bu lông bằng sắt thép cứng cáp công trình."
    }
  },
  "鉱": {
    "components": ["金", "広"],
    "equation": "金 (Kim - kim loại quý hiếm) + 広 (Quảng - trải rộng mênh mông trong lòng đất)",
    "mnemonic": "Kim loại và đá quý (金) phân bố trải rộng khắp trong lòng núi sâu (広), khoáng sản, quặng mỏ.",
    "illustration": {
      "badge": "⛏️",
      "concept": "Mỏ quặng khoáng sản",
      "visualDesc": "Khối quặng thô lấp lánh tinh thể kim loại dưới ánh đèn hầm mỏ."
    }
  },
  "銅": {
    "components": ["金", "同"],
    "equation": "金 (Kim - kim loại) + 同 (Đồng - âm đọc Đồng và màu sắc đồng nhất)",
    "mnemonic": "Thứ kim loại (金) có màu đỏ ánh kim đồng nhất (同) rất dễ dát mỏng làm chuông đúc tượng, chất đồng.",
    "illustration": {
      "badge": "🥉",
      "concept": "Huy chương đồng",
      "visualDesc": "Chiếc huy chương đồng sáng ánh đỏ ấm áp thắt dây ruy băng danh dự."
    }
  },
  "鋭": {
    "components": ["金", "兌"],
    "equation": "金 (Kim - mũi kim loại) + 兌 (Đoái - vui mừng, biến hóa nhanh nhẹn)",
    "mnemonic": "Lưỡi kim loại (金) được mài sắc ngọt lướt đi nhẹ nhàng khiến người thợ đắc ý (兌), sắc bén, tinh nhuệ.",
    "illustration": {
      "badge": "🗡️",
      "concept": "Mũi giáo sắc bén",
      "visualDesc": "Đầu mũi giáo kim loại sáng loáng phản chiếu ánh hào quang sắc lẹm."
    }
  },
  "録": {
    "components": ["金", "录"],
    "equation": "金 (Kim - đỉnh đồng kim loại) + 录 (Lục - chắt lọc điều tinh túy)",
    "mnemonic": "Chắt lọc những điều quý báu (录) rồi khắc bền vững lên đỉnh đồng kim loại (金), ghi chép, lưu trữ.",
    "illustration": {
      "badge": "📼",
      "concept": "Băng ghi âm ký lục",
      "visualDesc": "Cuộn băng cassette quay đều đang ghi lại những âm thanh trung thực."
    }
  },
  "門": {
    "components": ["門"],
    "equation": "門 (Tượng hình hai cánh cửa cổng lớn có then cài đóng mở)",
    "mnemonic": "Hình vẽ hai cánh cổng gỗ uy nghi mở ra đón khách vào dinh thự, cổng chào, cửa ngõ.",
    "illustration": {
      "badge": "⛩️",
      "concept": "Cổng Torii truyền thống",
      "visualDesc": "Cổng đền Torii đỏ rực sừng sững dẫn lối vào chốn thanh tịnh linh thiêng."
    }
  },
  "防": {
    "components": ["阝", "方"],
    "equation": "阝 (Phụ - gò đắp đất lũy cao) + 方 (Phương - bốn phương tám hướng)",
    "mnemonic": "Đắp đê lũy đất kiên cố (阝) ngăn chặn giặc tràn vào từ bốn phương (方), phòng thủ, ngăn ngừa hiểm họa.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Lá chắn phòng vệ",
      "visualDesc": "Chiếc khiên kiên cố che chắn bảo vệ trước mọi đợt tấn công hiểm hóc."
    }
  },
  "陸": {
    "components": ["阝", "坴"],
    "equation": "阝 (Phụ - sườn đồi gò cao) + 坴 (Lục - đất tụ lại tầng tầng lớp lớp)",
    "mnemonic": "Những dải đất đồi nhô cao (阝) bồi tụ thành vùng đất khô ráo rộng lớn (坴), đất liền, lục địa.",
    "illustration": {
      "badge": "🏝️",
      "concept": "Bờ cõi đất liền",
      "visualDesc": "Đất liền xanh mát trải dài ngút ngàn đối lập với đại dương mênh mông."
    }
  },
  "隅": {
    "components": ["阝", "禺"],
    "equation": "阝 (Phụ - vách tường, đồi dốc) + 禺 (Ngu - bóng con vật nép vào)",
    "mnemonic": "Chỗ vách tường gấp khúc (阝) khuất nẻo nơi con vật tìm chỗ ẩn nấp (禺), góc tường, xó xỉnh.",
    "illustration": {
      "badge": "📐",
      "concept": "Góc phòng yên tĩnh",
      "visualDesc": "Góc phòng nhỏ ấm cúng đặt một chiếc ghế tựa và ngọn đèn đọc sách."
    }
  },
  "階": {
    "components": ["阝", "皆"],
    "equation": "阝 (Phụ - bờ dốc thoai thoải) + 皆 (Giai - tất cả đều đặn bằng nhau)",
    "mnemonic": "Sườn dốc (阝) được đẽo gọt thành các bậc bước đều tăm tắp (皆), bậc thang, tầng lầu, thứ bậc.",
    "illustration": {
      "badge": "🪜",
      "concept": "Bậc cầu thang xoắn",
      "visualDesc": "Những bậc cầu thang gỗ dẫn lối đều đặn từng bước lên tầng cao hơn."
    }
  },
  "隻": {
    "components": ["隹", "又"],
    "equation": "隹 (Chuy - con chim nhỏ) + 又 (Hựu - bàn tay tóm lấy)",
    "mnemonic": "Bàn tay (又) chỉ chộp giữ được đúng một con chim nhỏ (隹), đơn độc, một chiếc đơn lẻ.",
    "illustration": {
      "badge": "🚢",
      "concept": "Một chiếc tàu đơn lẻ",
      "visualDesc": "Một chiếc tàu buồm đơn độc lướt sóng giữa không gian biển trời bao la."
    }
  },
  "雇": {
    "components": ["戸", "隹"],
    "equation": "戸 (Hộ - cánh cửa gia đình) + 隹 (Chuy - chim yến làm tổ theo mùa)",
    "mnemonic": "Mở cửa đón chim bay về trú ngụ theo mùa (戸-隹), như chủ nhà đón người giúp việc theo thời vụ, thuê mướn.",
    "illustration": {
      "badge": "🤝",
      "concept": "Hợp đồng tuyển dụng",
      "visualDesc": "Hai bàn tay bắt chặt nhau biểu trưng cho việc ký kết hợp đồng tuyển dụng thành công."
    }
  },
  "雲": {
    "components": ["雨", "云"],
    "equation": "雨 (Vũ - mưa gió ẩm ướt) + 云 (Vân - hơi nước bốc lên cuộn tròn)",
    "mnemonic": "Hơi ẩm bốc lên cuộn tròn (云) ngưng tụ thành từng đám tích nước chuẩn bị đổ mưa (雨), đám mây.",
    "illustration": {
      "badge": "☁️",
      "concept": "Đám mây bồng bềnh",
      "visualDesc": "Đám mây trắng xốp trôi bồng bềnh trên bầu trời trong xanh lộng gió."
    }
  },
  "零": {
    "components": ["雨", "令"],
    "equation": "雨 (Vũ - mưa nhẹ rơi) + 令 (Linh - âm thanh thánh thót từng giọt tí tách)",
    "mnemonic": "Cơn mưa nhỏ rả rích rụng từng giọt nước tí tách rời rạc (雨-令), số không tròn trĩnh, nhỏ giọt.",
    "illustration": {
      "badge": "0️⃣",
      "concept": "Con số không tròn trĩnh",
      "visualDesc": "Con số 0 phát sáng biểu tượng cho điểm khởi đầu của mọi đo lường."
    }
  },
  "震": {
    "components": ["雨", "辰"],
    "equation": "雨 (Vũ - sấm sét mây giông) + 辰 (Thần - rồng cựa quẫy rung chuyển trời đất)",
    "mnemonic": "Mây giông kéo đến cùng lúc rồng đất cựa mình (雨-辰) khiến cả mặt đất rung chuyển dữ dội, địa chấn, chấn động.",
    "illustration": {
      "badge": "📈",
      "concept": "Máy đo địa chấn",
      "visualDesc": "Kim đo địa chấn rung lắc vẽ nên những đường sóng dao động mạnh mẽ."
    }
  },
  "革": {
    "components": ["革"],
    "equation": "革 (Tượng hình tấm da thú vừa lột được căng phẳng cạo sạch lông để biến thành da thuộc)",
    "mnemonic": "Lột bỏ lớp lông cũ kỹ để biến tấm da sống thành da thuộc bền đẹp, thay cũ đổi mới, cải cách.",
    "illustration": {
      "badge": "👞",
      "concept": "Đôi giày da thuộc",
      "visualDesc": "Đôi giày da thuộc bóng bẩy thể hiện sự tinh xảo trong gia công chất liệu."
    }
  },
  "順": {
    "components": ["川", "頁"],
    "equation": "川 (Xuyên - dòng nước chảy xuôi êm ả) + 頁 (Hiệt - cái đầu suy nghĩ)",
    "mnemonic": "Đầu óc (頁) luôn nghĩ theo lẽ phải và thuận theo chiều dòng chảy tự nhiên (川), thuận lợi, thứ tự tuần tự.",
    "illustration": {
      "badge": "➡️",
      "concept": "Theo dòng thứ tự",
      "visualDesc": "Mũi tên chỉ hướng trôi chảy êm ái thuận theo dòng nước hiền hòa."
    }
  },
  "預": {
    "components": ["予", "頁"],
    "equation": "予 (Dữ/Dư - trao cho trước) + 頁 (Hiệt - người nhận ngẩng đầu đối chiếu)",
    "mnemonic": "Trao trước tài sản (予) vào tay người tin cậy rồi kiểm đếm kỹ càng (頁), gửi gắm, trông nom hộ.",
    "illustration": {
      "badge": "🏦",
      "concept": "Gửi tiền ngân hàng",
      "visualDesc": "Quyển sổ tiết kiệm mở ra bên quầy giao dịch ngân hàng uy tín."
    }
  },
  "領": {
    "components": ["令", "頁"],
    "equation": "令 (Lệnh - ban hành mệnh lệnh chỉ huy) + 頁 (Hiệt - đầu não, phần cổ ngẩng cao)",
    "mnemonic": "Người đứng đầu giữ cương vị then chốt (頁) ban bố mệnh lệnh điều hành một vùng đất (令), thống lĩnh, lãnh thổ.",
    "illustration": {
      "badge": "🗺️",
      "concept": "Bản đồ cương vực lãnh thổ",
      "visualDesc": "Bản đồ hiển thị đường biên cương lãnh thổ được đánh dấu rõ ràng."
    }
  },
  "額": {
    "components": ["客", "頁"],
    "equation": "客 (Khách - khách đến trước hiên nhà) + 頁 (Hiệt - khuôn mặt, vầng trán)",
    "mnemonic": "Khách bước vào ngẩng vầng trán sáng (頁) diện kiến trước cửa nhà (客), vầng trán, khung bảng, hạn mức số tiền.",
    "illustration": {
      "badge": "🖼️",
      "concept": "Khung tranh đóng vách",
      "visualDesc": "Khung tranh mạ vàng tinh tế đóng khung một bức họa danh tiếng."
    }
  },
  "香": {
    "components": ["禾", "日"],
    "equation": "禾 (Hòa - bông lúa chín vàng) + 日 (Nhật - ánh nắng mặt trời hong ấm)",
    "mnemonic": "Bông lúa vàng ươm (禾) phơi dưới ánh nắng mặt trời (日) bốc lên mùi thơm ngào ngạt của rơm mới, hương thơm.",
    "illustration": {
      "badge": "🌸",
      "concept": "Hương hoa ngát bay",
      "visualDesc": "Làn khói hương trầm tỏa làn sóng thơm nhè nhẹ bên bình hoa anh đào."
    }
  },
  "駐": {
    "components": ["馬", "主"],
    "equation": "馬 (Mã - ngựa chiến) + 主 (Chủ - dừng lại đứng yên một chỗ như ngọn đèn vững chãi)",
    "mnemonic": "Ngựa đi đường xa dừng chân (馬) tại trạm dừng theo lệnh của người chỉ huy (主), tạm trú, đỗ xe.",
    "illustration": {
      "badge": "🅿️",
      "concept": "Bãi đỗ xe",
      "visualDesc": "Biển báo đỗ xe chữ P xanh nổi bật bên bãi đỗ xe trật tự."
    }
  },
  "骨": {
    "components": ["冎", "月"],
    "equation": "冎 (Quải - khung xương sườn nối vào nhau) + 月 (Nhục - thịt bám quanh xương)",
    "mnemonic": "Khung xương nâng đỡ (冎) được bao bọc bởi các khối cơ thịt (月) tạo nên khung hình cơ thể, xương cốt.",
    "illustration": {
      "badge": "🦴",
      "concept": "Khúc xương trắng",
      "visualDesc": "Khúc xương sạch sẽ tượng trưng cho cấu trúc khung sườn vững chãi."
    }
  },
  "麦": {
    "components": ["麦"],
    "equation": "麦 (Tượng hình cây lúa mì trĩu hạt với rễ bám sâu và đôi lá vươn lên)",
    "mnemonic": "Cây lúa mạch với những chùm bông hạt dài đung đưa trên cánh đồng lúa vàng óng ả.",
    "illustration": {
      "badge": "🌾",
      "concept": "Bông lúa mạch vàng",
      "visualDesc": "Những bông lúa mạch vàng ruộm đung đưa trong ngọn gió thu mát rượi."
    }
  },
  "黄": {
    "components": ["黄"],
    "equation": "黄 (Tượng hình miếng ngọc bội màu vàng tươi đeo trước ngực)",
    "mnemonic": "Miếng ngọc bội màu vàng đất sáng rực đeo trên trang phục vương giả thời xưa, sắc vàng tươi.",
    "illustration": {
      "badge": "🟡",
      "concept": "Màu vàng rực rỡ",
      "visualDesc": "Vòng tròn màu vàng tươi sáng ngập tràn năng lượng ấm áp như nắng mai."
    }
  },
  "鼻": {
    "components": ["自", "畀"],
    "equation": "自 (Tự - chiếc mũi tự chỉ vào mình) + 畀 (Tí - ống dẫn khí thở nối xuống phế quản)",
    "mnemonic": "Chiếc mũi nguyên thủy (自) nối liền các đường thở dẫn khí vào lồng ngực (畀), cái mũi khứu giác.",
    "illustration": {
      "badge": "👃",
      "concept": "Chiếc mũi con người",
      "visualDesc": "Chiếc mũi thon gọn hít thở không khí trong lành thoang thoảng mùi hoa cỏ."
    }
  },
  "齢": {
    "components": ["歯", "令"],
    "equation": "歯 (Xỉ - hàm răng mọc rụng theo thời gian) + 令 (Linh - âm đọc Linh và mệnh lệnh thời gian)",
    "mnemonic": "Quan sát số lượng và sự thay đổi của hàm răng (歯) để đoán biết năm tháng cuộc đời (令), tuổi tác, tuổi thọ.",
    "illustration": {
      "badge": "🎂",
      "concept": "Tuổi tác sinh nhật",
      "visualDesc": "Chiếc bánh sinh nhật thắp nến lung linh kỷ niệm thêm một tuổi đời ý nghĩa."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n2dData)) {
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

console.log(`[Batch 4D - N2 Part 4] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n2dData).length} chữ Kanji N2.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
