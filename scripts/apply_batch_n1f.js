/**
 * Batch 5F: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 95 chữ Kanji N1 tiếp theo (từ 敷 đến 楓)
 */

const fs = require('fs');
const path = require('path');

const n1fData = {
  "敷": {
    "components": ["攴", "方", "金"],
    "equation": "Bàn tay cầm công cụ (攵) trải đều các tấm vật liệu phẳng ra khắp bề mặt sàn (方)",
    "mnemonic": "Dùng tay trải phẳng tấm nệm futon hoặc lát các viên gạch đều tăm tắp khắp sàn nhà, trải ra, lát sàn.",
    "illustration": {
      "badge": "🛏️",
      "concept": "Trải nệm futon êm ái",
      "visualDesc": "Tấm nệm futon truyền thống trải phẳng phiu trên sàn chiếu tatami thơm ngát."
    }
  },
  "斉": {
    "components": ["斉"],
    "equation": "斉 (Ba bông lúa vươn lên cao ngang bằng tăm tắp không chênh lệch)",
    "mnemonic": "Ba bông lúa chín trổ bông đều tăm tắp thẳng hàng ngay ngắn, chỉnh tề, tề tựu, nước Tề.",
    "illustration": {
      "badge": "🌾",
      "concept": "Đồng lúa trổ đều tăm tắp",
      "visualDesc": "Những bông lúa thẳng hàng cao bằng nhau trổ bông vàng rực dưới nắng."
    }
  },
  "斎": {
    "components": ["斉", "示"],
    "equation": "斉 (Giữ mình ngay ngắn tề chỉnh) trước bàn thờ thần linh (示)",
    "mnemonic": "Thanh tẩy thân tâm tề chỉnh sạch sẽ trước khi bước vào dâng lễ đàn tế, trai giới, thư phòng thanh tịnh.",
    "illustration": {
      "badge": "🕯️",
      "concept": "Thư phòng trai giới thanh tịnh",
      "visualDesc": "Căn phòng tĩnh tọa với ngọn đèn dầu và lư hương trầm nghi ngút khói."
    }
  },
  "斐": {
    "components": ["非", "文"],
    "equation": "非 (Đôi cánh đối xứng xòe rộng) + 文 (Những đường hoa văn văn chương tuyệt mỹ)",
    "mnemonic": "Đôi cánh xòe rộng mang những hoa văn văn chương rực rỡ muôn màu tuyệt đẹp, phỉ nhiên rực rỡ.",
    "illustration": {
      "badge": "🦋",
      "concept": "Cánh bướm hoa văn rực rỡ",
      "visualDesc": "Đôi cánh bướm mang họa tiết hoa văn sặc sỡ lộng lẫy dưới nắng sớm."
    }
  },
  "斗": {
    "components": ["斗"],
    "equation": "斗 (Tượng hình chiếc gáo dài có miệng vuông để múc rượu hoặc đong hạt)",
    "mnemonic": "Chiếc gáo múc rượu cán dài có miệng đấu, cái đấu, chòm sao Bắc Đẩu bảy ngôi sáng.",
    "illustration": {
      "badge": "✨",
      "concept": "Chòm sao Bắc Đẩu",
      "visualDesc": "Bảy ngôi sao Bắc Đẩu hình chiếc gáo sáng rực rỡ trên bầu trời phương bắc."
    }
  },
  "斜": {
    "components": ["余", "斗"],
    "equation": "余 (Dư dôi, nghiêng ngả) + 斗 (Chiếc đấu đong rượu bị nghiêng)",
    "mnemonic": "Nghiêng chiếc đấu đong (斗) để rót nốt những giọt rượu thơm sóng sánh, nghiêng chéo, tà dốc.",
    "illustration": {
      "badge": "📐",
      "concept": "Đường thẳng nghiêng dốc",
      "visualDesc": "Con dốc nghiêng thoai thoải rợp bóng mát dẫn lối lên sườn đồi."
    }
  },
  "斤": {
    "components": ["斤"],
    "equation": "斤 (Tượng hình lưỡi rìu nhỏ có cán cầm chặt gỗ)",
    "mnemonic": "Hình chiếc rìu nhỏ đẽo gỗ thời xưa dùng làm đơn vị trọng lượng cân đo, cái rìu, một cân.",
    "illustration": {
      "badge": "🪓",
      "concept": "Lưỡi rìu đẽo gỗ",
      "visualDesc": "Chiếc rìu thép nhỏ cắm trên khúc gỗ sồi bên xưởng mộc."
    }
  },
  "斥": {
    "components": ["斤", "丶"],
    "equation": "斤 (Chiếc rìu) vung lên một nhát (丶) xua đuổi kẻ xấu lui xa",
    "mnemonic": "Vung nhát rìu dứt khoát đẩy lùi quân địch hay tà kiến ra xa, bài xích, xua đuổi, trinh sát xích hầu.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Đẩy lùi xua đuổi",
      "visualDesc": "Lá chắn và lưỡi rìu đẩy lùi đối phương giữ vững phòng tuyến an toàn."
    }
  },
  "於": {
    "components": ["方", "𠂉"],
    "equation": "方 (Phương hướng vị trí) + 𠂉 (Mũi tên chỉ đúng điểm tọa lạc)",
    "mnemonic": "Chỉ đúng vị trí không gian và thời gian sự việc đang diễn ra, ở tại, đối với, than ôi (ư hý).",
    "illustration": {
      "badge": "📍",
      "concept": "Điểm định vị ở tại",
      "visualDesc": "Ghim định vị màu đỏ cắm chuẩn xác lên bản đồ đánh dấu vị trí tọa lạc."
    }
  },
  "施": {
    "components": ["方", "𠂉", "也"],
    "equation": "Lá cờ lệnh tung bay theo gió (方-𠂉) ban phát ân huệ cứu giúp muôn dân (也)",
    "mnemonic": "Phất cờ mở kho lương thực thi chính sách ban phát ân huệ cho muôn dân ấm no, thực thi, bố thí.",
    "illustration": {
      "badge": "🌾",
      "concept": "Phát chẩn cứu tế",
      "visualDesc": "Bát cháo nóng và bao gạo cứu trợ được tận tay trao tặng người nghèo."
    }
  },
  "旋": {
    "components": ["方", "𠂉", "疋"],
    "equation": "Bước chân xoay tròn (疋) theo nhịp phất của lá cờ bay (方-𠂉)",
    "mnemonic": "Đôi chân nhún nhảy xoay tròn theo nhịp điệu cờ hoa rộn rã trong lễ hội, xoay tròn, quay cuồng, chu toàn.",
    "illustration": {
      "badge": "🔄",
      "concept": "Vòng xoay uyển chuyển",
      "visualDesc": "Vũ công xoay tròn tà váy mềm mại tạo nên những vòng sóng nhịp nhàng."
    }
  },
  "旗": {
    "components": ["方", "𠂉", "其"],
    "equation": "Lá cờ lớn tung bay trước gió (方-𠂉) cắm trên bệ đỡ uy nghiêm (其)",
    "mnemonic": "Ngọn cờ chỉ huy phấp phới tung bay trên đỉnh đài thúc giục sĩ khí quân vương, lá cờ, quốc kỳ.",
    "illustration": {
      "badge": "🚩",
      "concept": "Lá cờ tung bay trước gió",
      "visualDesc": "Lá cờ đỏ thắm tung bay kiêu hãnh trên đỉnh cột cờ giữa quảng trường."
    }
  },
  "既": {
    "components": ["艮", "旡"],
    "equation": "Người ăn xong mâm cơm no nê ngoảnh mặt quay đi (艮-旡)",
    "mnemonic": "Ăn xong bữa cơm no nê ngoảnh mặt rời đi đánh dấu việc đã hoàn tất, đã rồi, dĩ vãng, đã qua.",
    "illustration": {
      "badge": "⏳",
      "concept": "Chuyện đã qua đã rồi",
      "visualDesc": "Đồng hồ cát đã chảy hết cát xuống đáy báo hiệu việc đã khép lại."
    }
  },
  "旦": {
    "components": ["日", "一"],
    "equation": "日 (Mặt trời đỏ rực) nhô lên trên đường chân trời phẳng (一)",
    "mnemonic": "Vầng thái dương vừa ló dạng nhô lên khỏi đường chân trời trong sớm mai, bình minh, rạng đông, nguyên đán.",
    "illustration": {
      "badge": "🌅",
      "concept": "Mặt trời mọc bình minh",
      "visualDesc": "Mặt trời đỏ rực vừa nhô lên từ đường chân trời nhuộm hồng mặt biển."
    }
  },
  "旨": {
    "components": ["匕", "日"],
    "equation": "匕 (Chiếc thìa nếm thức ăn) múc vị ngọt lành ấm áp như ánh nắng (日)",
    "mnemonic": "Dùng thìa nếm món ăn ngon tuyệt thốt lên ý chỉ sâu xa, ý chỉ, tôn chỉ, thơm ngon (umai).",
    "illustration": {
      "badge": "🍲",
      "concept": "Món ngon đậm vị umami",
      "visualDesc": "Bát súp nghi ngút khói thơm lừng đánh thức vị giác ngon miệng."
    }
  },
  "旬": {
    "components": ["勹", "日"],
    "equation": "勹 (Vòng bao bọc trọn vẹn) gom mười ngày mặt trời vận hành (日)",
    "mnemonic": "Chu kỳ mười ngày mặt trời mọc lặn gom thành một tuần (thượng/trung/hạ tuần), mười ngày, mùa tươi ngon (shun).",
    "illustration": {
      "badge": "📅",
      "concept": "Tuần lễ mười ngày",
      "visualDesc": "Tờ lịch đánh dấu khoảng thời gian mười ngày tươi đẹp nhất của mùa quả chín."
    }
  },
  "旭": {
    "components": ["九", "日"],
    "equation": "九 (Cửu - vươn cao tột đỉnh) + 日 (Mặt trời ban mai rực rỡ)",
    "mnemonic": "Mặt trời rạng sáng tỏa muôn ngàn tia nắng ấm áp vươn cao chiếu rọi thế gian, ánh húc, mặt trời ban mai.",
    "illustration": {
      "badge": "☀️",
      "concept": "Mặt trời ban mai rực rỡ",
      "visualDesc": "Mặt trời ban mai tỏa những tia sáng vàng ấm áp xua tan sương lạnh."
    }
  },
  "旺": {
    "components": ["日", "王"],
    "equation": "日 (Mặt trời rạng ngời) + 王 (Bậc đế vương uy nghiêm)",
    "mnemonic": "Ánh mặt trời soi chiếu rực rỡ giang sơn của bậc đế vương hưng thịnh, thịnh vượng, phát vượng.",
    "illustration": {
      "badge": "📈",
      "concept": "Khí thế thịnh vượng vươn lên",
      "visualDesc": "Đường biểu đồ kinh tế vươn cao đón ánh nắng rực rỡ của sự phồn thịnh."
    }
  },
  "昂": {
    "components": ["日", "卬"],
    "equation": "日 (Ánh mặt trời chiếu sáng) + 卬 (Ngẩng cao đầu đón nhận)",
    "mnemonic": "Ngẩng cao đầu tự tin dưới ánh mặt trời rạng rỡ đầy khí phách, hiên ngang, sục sôi, ngẩng đầu.",
    "illustration": {
      "badge": "🦁",
      "concept": "Hiên ngang ngẩng cao đầu",
      "visualDesc": "Người đứng trên đỉnh đồi ngẩng cao đầu đón gió lộng với khí thế ngút trời."
    }
  },
  "昆": {
    "components": ["日", "比"],
    "equation": "日 (Dưới ánh mặt trời) muôn loài cùng sánh vai sinh sôi đông đúc (比)",
    "mnemonic": "Dưới ánh nắng ấm áp muôn loài sâu bọ cùng kề vai sinh sôi rộn rã, côn trùng, Côn Lôn.",
    "illustration": {
      "badge": "🐞",
      "concept": "Chú bọ rùa côn trùng",
      "visualDesc": "Chú bọ rùa đỏ chấm đen leo trên chiếc lá xanh dưới ánh nắng ấm áp."
    }
  },
  "昌": {
    "components": ["日", "日"],
    "equation": "Hai mặt trời (日-日) xếp chồng tỏa ánh sáng nhân đôi rực rỡ",
    "mnemonic": "Hai vầng thái dương cùng bừng sáng nhân đôi sự thịnh vượng ấm no cho muôn nhà, hưng xương, thịnh vượng.",
    "illustration": {
      "badge": "✨",
      "concept": "Hào quang hưng thịnh",
      "visualDesc": "Cung điện cổ kính rực sáng trong ánh bình minh chan hòa biểu trưng hưng thịnh."
    }
  },
  "昭": {
    "components": ["日", "召"],
    "equation": "日 (Ánh mặt trời) + 召 (Chiếu rọi khắp nơi xa xôi vẫy gọi)",
    "mnemonic": "Ánh mặt trời chiếu rọi làm sáng tỏ mọi ngóc ngách không còn bóng tối, sáng tỏ, minh bạch, Chiêu Hòa (Showa).",
    "illustration": {
      "badge": "🏮",
      "concept": "Hoài niệm thời Showa",
      "visualDesc": "Góc phố cổ ấm cúng thời kỳ Chiêu Hòa Showa với ánh đèn vàng hoài niệm."
    }
  },
  "是": {
    "components": ["日", "疋"],
    "equation": "日 (Mặt trời ngay thẳng soi rọi) + 疋/正 (Bước chân đi đúng đường ngay thẳng)",
    "mnemonic": "Bước chân bước đi ngay thẳng dưới ánh sáng chân lý soi rọi của mặt trời, đúng đắn, thị phi, chính là.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Cán cân thị phi đúng sai",
      "visualDesc": "Cán cân công lý phân định rõ ràng lẽ đúng sai thị phi dưới ánh sáng."
    }
  },
  "昴": {
    "components": ["日", "卯"],
    "equation": "日 (Ánh sao tinh tú) lấp lánh lúc rạng đông chi Mão (卯)",
    "mnemonic": "Chùm sao tinh tú lấp lánh hội tụ đẹp đẽ trên bầu trời sớm mai, chòm sao Mão (Pleiades/Subaru).",
    "illustration": {
      "badge": "✨",
      "concept": "Chòm sao Subaru rực rỡ",
      "visualDesc": "Cụm sáu ngôi sao xanh lấp lánh biểu tượng thương hiệu ô tô Subaru Nhật Bản."
    }
  },
  "晃": {
    "components": ["日", "光"],
    "equation": "日 (Mặt trời) + 光 (Ánh quang tỏa rạng ngời muôn phương)",
    "mnemonic": "Mặt trời tỏa luồng ánh sáng chói lọi rạng ngời khắp nhân gian, sáng lóa, chói lòa, rực rỡ.",
    "illustration": {
      "badge": "💫",
      "concept": "Ánh hào quang chói lọi",
      "visualDesc": "Tia nắng vàng rực rỡ xuyên qua tán lá cây rừng tỏa ánh hào quang lung linh."
    }
  },
  "晋": {
    "components": ["日", "一"],
    "equation": "Hai mũi tên song hành cùng cắm thẳng tiến lên hướng về mặt trời (日)",
    "mnemonic": "Hai mũi tên cắm thẳng về phía trước đón ánh mặt trời ngày một thăng hoa, tiến lên, thăng tiến, triều Tấn.",
    "illustration": {
      "badge": "🏹",
      "concept": "Mũi tên thăng tiến vươn lên",
      "visualDesc": "Mũi tên vút bay lên bầu trời cao biểu thị sự thăng tiến không ngừng nghỉ."
    }
  },
  "晏": {
    "components": ["日", "安"],
    "equation": "日 (Ánh nắng ngày) chan hòa ấm áp bên người phụ nữ an nhiên (安)",
    "mnemonic": "Ánh nắng dịu êm sưởi ấm gian phòng bình yên thanh thản không chút âu lo, an tĩnh, bình an, muộn.",
    "illustration": {
      "badge": "🍵",
      "concept": "Buổi chiều êm ả bình an",
      "visualDesc": "Góc hiên nhà ngập nắng ấm buổi chiều bên tách trà xanh thanh tịnh êm đềm."
    }
  },
  "晟": {
    "components": ["日", "成"],
    "equation": "日 (Mặt trời soi rọi) + 成 (Gặt hái thành công trọn vẹn)",
    "mnemonic": "Ánh mặt trời soi chiếu cho mọi kế hoạch đều đơm hoa kết trái thành công rực rỡ, sáng sủa, thịnh vượng.",
    "illustration": {
      "badge": "🏆",
      "concept": "Thành công rực rỡ",
      "visualDesc": "Chiếc cúp vàng lấp lánh dưới ánh nắng chan hòa chúc mừng thắng lợi vinh quang."
    }
  },
  "晨": {
    "components": ["日", "辰"],
    "equation": "日 (Mặt trời) mọc đúng thời khắc chuyển giao buổi sớm mai (辰)",
    "mnemonic": "Mặt trời vừa ló rạng đánh thức vạn vật cựa mình bắt đầu ngày mới tinh khôi, sáng sớm, sớm mai.",
    "illustration": {
      "badge": "🐓",
      "concept": "Tiếng gà gáy rạng đông",
      "visualDesc": "Chú gà trống đứng trên bờ rào cất tiếng gáy vang đón chào ngày mới bắt đầu."
    }
  },
  "晶": {
    "components": ["日", "日", "日"],
    "equation": "Ba mặt trời (ba chữ 日) hội tụ tạo nên ánh sáng phản chiếu đa chiều",
    "mnemonic": "Ba mặt trời cùng chiếu sáng phản quang qua mặt cắt khối đá quý lấp lánh trong veo, tinh thể, thủy tinh.",
    "illustration": {
      "badge": "💎",
      "concept": "Khối tinh thể thạch anh",
      "visualDesc": "Khối thạch anh trong suốt lấp lánh phản chiếu bảy sắc cầu vồng rực rỡ."
    }
  },
  "智": {
    "components": ["知", "日"],
    "equation": "知 (Tri thức hiểu biết sâu rộng) soi rọi sáng rõ như mặt trời (日)",
    "mnemonic": "Tri thức hiểu biết được soi tỏ sáng ngời như ánh thái dương xua tan bóng tối, trí tuệ, mưu trí.",
    "illustration": {
      "badge": "🦉",
      "concept": "Cú mèo thông thái mưu trí",
      "visualDesc": "Chú cú mèo thông thái đeo kính đọc cuốn sách tri thức dưới ánh trăng sáng."
    }
  },
  "暁": {
    "components": ["日", "尭"],
    "equation": "日 (Mặt trời) nhô lên trên đỉnh núi cao chót vót (尭)",
    "mnemonic": "Mặt trời vừa ló dạng trên đỉnh núi cao ngút ngàn báo hiệu trời hửng sáng, rạng đông, hiểu tường (akatsuki).",
    "illustration": {
      "badge": "🌄",
      "concept": "Bình minh Akatsuki rực rỡ",
      "visualDesc": "Bầu trời ửng hồng màu bình minh akatsuki kỳ ảo phía chân trời xa."
    }
  },
  "暇": {
    "components": ["日", "叚"],
    "equation": "日 (Ngày) mượn được khoảng thời gian trống thảnh thơi (叚)",
    "mnemonic": "Những ngày có thời gian trống thong thả không bị công việc bận rộn ràng buộc, rảnh rỗi, nhàn hạ, kỳ nghỉ.",
    "illustration": {
      "badge": "🏖️",
      "concept": "Kỳ nghỉ thảnh thơi",
      "visualDesc": "Chiếc ghế bãi biển dưới bóng dù râm mát hướng ra mặt biển trong xanh."
    }
  },
  "暉": {
    "components": ["日", "軍"],
    "equation": "日 (Mặt trời) tỏa hào quang bao bọc rực rỡ như chiến xa bao quanh doanh trại (軍)",
    "mnemonic": "Ánh sáng mặt trời tỏa rộng bao la hùng vĩ như đoàn quân uy dũng, hào quang, ánh huy hoàng.",
    "illustration": {
      "badge": "🌅",
      "concept": "Vầng hào quang thái dương",
      "visualDesc": "Vầng hào quang mặt trời tỏa sáng rực rỡ bao trùm cả bầu trời buổi sớm."
    }
  },
  "暑": {
    "components": ["日", "者"],
    "equation": "日 (Mặt trời chói chang) thiêu đốt người đứng bên dưới (者)",
    "mnemonic": "Mặt trời mùa hè gay gắt thiêu đốt như nung khiến người ta đổ mồ hôi nhễ nhại, nóng nực, nắng nóng.",
    "illustration": {
      "badge": "🌡️",
      "concept": "Cột nhiệt kế báo nóng",
      "visualDesc": "Cột nhiệt kế dâng cao chạm vạch đỏ báo hiệu đợt nắng nóng đỉnh điểm."
    }
  },
  "暖": {
    "components": ["日", "爰"],
    "equation": "日 (Ánh nắng mặt trời) chìa bàn tay ấm áp xoa dịu cái lạnh (爰)",
    "mnemonic": "Ánh nắng mặt trời xua tan giá rét mùa đông đem lại hơi ấm êm dịu cho muôn loài, ấm áp, sưởi ấm.",
    "illustration": {
      "badge": "🧣",
      "concept": "Khăn len ấm áp ngày đông",
      "visualDesc": "Chiếc khăn len đỏ choàng ấm cổ bên tách sô-cô-la nóng thơm lừng."
    }
  },
  "暢": {
    "components": ["申", "日", "一", "勹"],
    "equation": "Hơi thở vươn dài thông suốt (申) dưới ánh mặt trời rạng rỡ (日)",
    "mnemonic": "Ánh nắng sưởi ấm làm dòng sinh khí lưu thông thông suốt nhẹ nhõm khắp châu thân, sảng khoái, trôi chảy.",
    "illustration": {
      "badge": "🍃",
      "concept": "Gió mát sảng khoái",
      "visualDesc": "Cơn gió trong lành thổi bay làn sương mang lại cảm giác sảng khoái tuyệt vời."
    }
  },
  "暦": {
    "components": ["厂", "林", "日"],
    "equation": "Dưới vách đá mái hiên (厂), quan sát sự biến chuyển của cây rừng (林) và mặt trời (日)",
    "mnemonic": "Ghi chép quy luật chuyển vần của mặt trời qua các mùa thay lá của cây rừng, cuốn lịch, niên lịch.",
    "illustration": {
      "badge": "🗓️",
      "concept": "Cuốn lịch để bàn",
      "visualDesc": "Cuốn lịch bàn mở ra tháng mới với các ngày được đánh dấu gọn gàng."
    }
  },
  "暫": {
    "components": ["斬", "日"],
    "equation": "斬 (Nhát chém nhanh gọn trong chớp mắt) + 日 (Khoảng thời gian ngắn)",
    "mnemonic": "Khoảng thời gian ngắn ngủi trôi qua nhanh như một nhát chém chớp mắt, tạm thời, một lát, tạm nghỉ.",
    "illustration": {
      "badge": "⏱️",
      "concept": "Đồng hồ cát một lát",
      "visualDesc": "Đồng hồ cát đo khoảng thời gian ngắn tạm dừng nghỉ chân."
    }
  },
  "曙": {
    "components": ["日", "署"],
    "equation": "日 (Mặt trời) bố trí ánh sáng đỏ hồng nơi chân trời xa xôi (署)",
    "mnemonic": "Những tia nắng đầu tiên của mặt trời rọi mở chân trời xua tan bóng tối đêm đông, rạng đông akebono.",
    "illustration": {
      "badge": "🌄",
      "concept": "Rạng đông Akebono",
      "visualDesc": "Đường chân trời ửng sắc tím hồng lung linh trong áng văn rạng đông Akebono."
    }
  },
  "曹": {
    "components": ["曲", "日"],
    "equation": "Hai bên cùng dâng lời phân xử trước mặt trời công minh soi rọi",
    "mnemonic": "Các quan chức cùng ngồi bên nhau tại công đường xử lý việc quan, quan lại, bạn đồng liêu, họ Tào.",
    "illustration": {
      "badge": "👥",
      "concept": "Các vị quan đồng triều",
      "visualDesc": "Các vị quan lại ngồi họp bàn chính sự trang nghiêm chốn công đường."
    }
  },
  "朋": {
    "components": ["月", "月"],
    "equation": "Hai chuỗi sò biển tiền cổ song hành / hai vầng trăng sáng chiếu soi nhau",
    "mnemonic": "Hai chuỗi ngọc sò quý giá song hành cùng nhau như đôi bạn tri kỷ gắn bó, bạn bè, bằng hữu.",
    "illustration": {
      "badge": "👫",
      "concept": "Đôi bạn bằng hữu tri kỷ",
      "visualDesc": "Hai người bạn cùng khoác vai nhau ngắm vầng trăng tròn êm đềm buổi tối."
    }
  },
  "朔": {
    "components": ["屰", "月"],
    "equation": "屰 (Ngược lại, trăng ẩn giấu) + 月 (Mặt trăng khép lại chu kỳ cũ mở ra chu kỳ mới)",
    "mnemonic": "Mặt trăng khép lại chu kỳ cũ để tái sinh thành vầng trăng non mới toanh đầu tháng, ngày mồng một, sóc nhật.",
    "illustration": {
      "badge": "🌑",
      "concept": "Trăng non đầu tháng",
      "visualDesc": "Bầu trời đêm tĩnh mịch đón chào sự khởi đầu chu kỳ trăng non mới."
    }
  },
  "朕": {
    "components": ["月", "关"],
    "equation": "Hình người cầm công cụ trét kín mạch ghép thuyền độc mộc, sau dùng làm từ xưng hô tôn quý",
    "mnemonic": "Từ tự xưng tôn quý độc quyền của bậc hoàng đế đứng đầu thiên hạ, Trẫm, ngôi đế vương.",
    "illustration": {
      "badge": "👑",
      "concept": "Ngôi vị hoàng đế xưng Trẫm",
      "visualDesc": "Ấn ngọc tỷ khắc chữ hoàng gia dùng đóng dấu chiếu chỉ của đấng hoàng đế."
    }
  },
  "朗": {
    "components": ["良", "月"],
    "equation": "良 (Lương - tốt đẹp, trong sáng) + 月 (Ánh trăng vằng vặc soi sáng)",
    "mnemonic": "Ánh trăng trong sáng vằng vặc (月) chiếu rọi làm tâm hồn cảm thấy tươi vui trong trẻo (良), sáng tỏ, rạng rỡ.",
    "illustration": {
      "badge": "🌕",
      "concept": "Ánh trăng rằm sáng tỏ",
      "visualDesc": "Vầng trăng tròn vành vạnh tỏa ánh sáng trong veo xua tan bóng đêm."
    }
  },
  "朱": {
    "components": ["木", "一"],
    "equation": "Cắt ngang thân cây gỗ quý (木) lộ ra lõi gỗ màu đỏ thắm tự nhiên (一)",
    "mnemonic": "Vết cắt ngang thân cây gỗ sưa để lộ thớ gỗ màu đỏ son tươi tắn óng ả, màu đỏ son, chu sa.",
    "illustration": {
      "badge": "🔴",
      "concept": "Màu đỏ chu sa son thắm",
      "visualDesc": "Vệt mực son đỏ thắm trên cổng đền Torii truyền thống rực rỡ."
    }
  },
  "朴": {
    "components": ["木", "卜"],
    "equation": "木 (Cây gỗ tự nhiên) + 卜 (Những đường vân nứt mộc mạc nguyên sơ)",
    "mnemonic": "Khúc gỗ thô mộc còn nguyên vết nứt tự nhiên chưa qua đẽo gọt giả tạo, chất phác, mộc mạc.",
    "illustration": {
      "badge": "🪵",
      "concept": "Khúc gỗ mộc mạc",
      "visualDesc": "Bàn trà làm từ thân cây gỗ nguyên khối mộc mạc giữ trọn vân gỗ tự nhiên."
    }
  },
  "朽": {
    "components": ["木", "丂"],
    "equation": "木 (Cây gỗ) uốn cong mình gãy mục rỗng ruột theo năm tháng (丂)",
    "mnemonic": "Cây gỗ già mục nát theo năm tháng gãy đổ chìm vào lòng đất mẹ, mục nát, bất hủ, hủ bại.",
    "illustration": {
      "badge": "🍂",
      "concept": "Thân cây gỗ mục nát",
      "visualDesc": "Thân cây đổ rêu phong mục rữa theo thời gian nơi góc rừng ẩm ướt."
    }
  },
  "杉": {
    "components": ["木", "彡"],
    "equation": "木 (Cây gỗ) + 彡 (Những tầng tán lá kim rủ xuống thẳng tắp thon dài)",
    "mnemonic": "Loài cây thân gỗ thẳng tắp chọc trời với những tán lá kim xanh mát đặc trưng xứ Phù Tang, cây tuyết tùng sugi.",
    "illustration": {
      "badge": "🌲",
      "concept": "Cây tuyết tùng Sugi Nhật Bản",
      "visualDesc": "Rừng cây tuyết tùng sugi thẳng tắp vươn cao trong sương sớm vùng núi Yakushima."
    }
  },
  "李": {
    "components": ["木", "子"],
    "equation": "木 (Cây ăn quả) kết trái sum suê trĩu hạt như bầy con cháu (子)",
    "mnemonic": "Cây ăn quả sum suê nuôi nấng biết bao chùm quả ngọt lành mọng nước, cây mận, họ Lý.",
    "illustration": {
      "badge": "🫐",
      "concept": "Trái mận tím ngọt lành",
      "visualDesc": "Những quả mận chín mọng tím sẫm đọng phấn trắng trên cành cây lá xanh."
    }
  },
  "杏": {
    "components": ["木", "口"],
    "equation": "木 (Cây ăn quả) + 口 (Miệng thưởng thức vị ngọt ngào chua dịu)",
    "mnemonic": "Quả thơm hái từ trên cây (木) cho vào miệng (口) nếm vị chua ngọt thanh tao, quả hạnh, mơ anzu.",
    "illustration": {
      "badge": "🍑",
      "concept": "Quả mơ Anzu vàng óng",
      "visualDesc": "Quả mơ vàng ươm mọng nước tỏa hương thơm ngát nơi góc vườn quê."
    }
  },
  "杜": {
    "components": ["木", "土"],
    "equation": "木 (Cây cối xanh tươi) mọc vững chãi trên đất đai linh thiêng (土)",
    "mnemonic": "Rừng cây cổ thụ mọc trên đất đền thờ linh thiêng che chở chốn tôn nghiêm, rừng thiêng mori, cây đỗ quyên.",
    "illustration": {
      "badge": "🌳",
      "concept": "Rừng cây đền thờ linh thiêng",
      "visualDesc": "Rừng cây cổ thụ xanh um râm mát bao quanh ngôi đền cổ kính ở Sendai."
    }
  },
  "条": {
    "components": ["夂", "木"],
    "equation": "夂 (Cành cây uốn dài mềm mại) buông rủ trên thân gỗ (木)",
    "mnemonic": "Cành cây dài thẳng tắp vươn ra được dùng làm hình ảnh cho từng điều khoản luật pháp mạch lạc, điều khoản, cành cây.",
    "illustration": {
      "badge": "📜",
      "concept": "Các điều khoản pháp luật",
      "visualDesc": "Bản hợp đồng với các điều khoản phân mục rõ ràng từng mục một."
    }
  },
  "松": {
    "components": ["木", "公"],
    "equation": "木 (Cây thân gỗ) + 公 (Đứng đầu hàng các loài cây, uy nghi như bậc công hầu)",
    "mnemonic": "Loài cây gỗ uy nghi xanh tươi bất chấp mùa đông tuyết trắng, biểu tượng trường thọ, cây thông matsu.",
    "illustration": {
      "badge": "🌲",
      "concept": "Cây thông bách trường thọ",
      "visualDesc": "Cây thông bonsai cổ thụ dáng rồng uốn lượn hiên ngang giữa trời đông."
    }
  },
  "析": {
    "components": ["木", "斤"],
    "equation": "木 (Khúc gỗ lớn) + 斤 (Chiếc rìu sắc bén bổ đôi làm củi)",
    "mnemonic": "Dùng rìu bổ khúc gỗ ra thành từng mảnh nhỏ để khám phá cấu trúc bên trong, phân tích, bóc tách.",
    "illustration": {
      "badge": "📊",
      "concept": "Biểu đồ phân tích dữ liệu",
      "visualDesc": "Biểu đồ dữ liệu phân tích từng phần trăm chi tiết hiển thị trên màn hình."
    }
  },
  "枠": {
    "components": ["木", "九", "十"],
    "equation": "木 (Thanh gỗ) ghép vuông vức chín mươi độ tạo thành khung viền",
    "mnemonic": "Chữ thuần Nhật (Kokuji): Bốn thanh gỗ ghép lại thành khung cửa sổ hoặc viền tranh vuông vắn, chiếc khung, giới hạn waku.",
    "illustration": {
      "badge": "🖼️",
      "concept": "Chiếc khung gỗ viền tranh",
      "visualDesc": "Khung tranh gỗ vuông vức mộc mạc đóng viền quanh bức họa phong cảnh."
    }
  },
  "枢": {
    "components": ["木", "区"],
    "equation": "木 (Thanh gỗ cắm vào trục) + 区 (Góc then cài đóng mở xoay chuyển)",
    "mnemonic": "Trục gỗ xoay quanh then cửa giúp cánh cổng đóng mở vận hành trơn tru, then chốt, trục xu, cơ cấu.",
    "illustration": {
      "badge": "⚙️",
      "concept": "Trục then chốt xoay vần",
      "visualDesc": "Bánh răng trục xoay cơ khí then chốt điều khiển cả cỗ máy hoạt động."
    }
  },
  "架": {
    "components": ["加", "木"],
    "equation": "加 (Gia tăng lực nâng đỡ) + 木 (Thanh gỗ bắc ngang qua sông)",
    "mnemonic": "Ghép thêm các thanh gỗ (加-木) bắc thành cây cầu vượt qua vực thẳm hoặc làm giá treo đồ, giá treo, bắc cầu.",
    "illustration": {
      "badge": "🌉",
      "concept": "Cây cầu gỗ bắc ngang sông",
      "visualDesc": "Cây cầu gỗ mái cong bắc ngang dòng suối trong vắt thơ mộng."
    }
  },
  "柄": {
    "components": ["木", "丙"],
    "equation": "木 (Thanh gỗ) + 丙 (Bệ đỡ chắc chắn làm điểm tựa cầm nắm)",
    "mnemonic": "Khúc gỗ tiện tròn chắc chắn gắn vào lưỡi dao làm cán cầm, chuôi dao, cán chảo, hoa văn họa tiết.",
    "illustration": {
      "badge": "🔪",
      "concept": "Chuôi dao bằng gỗ mun",
      "visualDesc": "Chiếc chuôi dao bếp bằng gỗ mun tiện tròn vừa vặn bàn tay người đầu bếp."
    }
  },
  "柊": {
    "components": ["木", "冬"],
    "equation": "木 (Cây gỗ) xanh tươi trổ hoa thơm ngát giữa mùa đông giá rét (冬)",
    "mnemonic": "Loài cây có lá viền gai nhọn vẫn kiên cường xanh biếc nở hoa trắng thơm ngát giữa mùa đông giá lạnh (冬), cây hiiragi.",
    "illustration": {
      "badge": "🌿",
      "concept": "Cây lá gai Hiiragi mùa đông",
      "visualDesc": "Nhành lá gai hiiragi xanh bóng đính những chùm quả đỏ rực trong tuyết đông."
    }
  },
  "某": {
    "components": ["甘", "木"],
    "equation": "甘 (Quả ngọt thơm ngon) giấu kín trên cành cây rậm rạp (木)",
    "mnemonic": "Một loại quả ngọt nào đó ẩn hiện trên cây chưa tiện gọi tên cụ thể, mỗ, kẻ mỗ, người nào đó.",
    "illustration": {
      "badge": "❓",
      "concept": "Ẩn danh mỗ người",
      "visualDesc": "Bóng người mờ ảo che mặt biểu thị danh tính một người nào đó chưa rõ."
    }
  },
  "染": {
    "components": ["氵", "九", "木"],
    "equation": "Nước thuốc màu (氵) nhúng qua chín lần (九) cho ngấm sâu vào sợi vải cây bông (木)",
    "mnemonic": "Nhúng cuộn vải vào bồn nước thuốc màu nhiều lần để màu ngấm sâu vào từng thớ sợi, nhuộm màu, truyền nhiễm.",
    "illustration": {
      "badge": "🧣",
      "concept": "Tấm lụa nhuộm chàm aizome",
      "visualDesc": "Dải lụa nhuộm màu chàm truyền thống Nhật Bản phơi bay phấp phới trong gió."
    }
  },
  "柚": {
    "components": ["木", "由"],
    "equation": "木 (Cây thân gỗ) + 由 (Quả tròn chứa tinh dầu thơm ngát tự nhiên)",
    "mnemonic": "Cây ăn quả chi cam chanh kết những trái tròn màu vàng thơm nồng đượm vị thanh yên, quả yuzu, thanh yên.",
    "illustration": {
      "badge": "🍋",
      "concept": "Quả thanh yên Yuzu vàng óng",
      "visualDesc": "Những quả thanh yên yuzu vàng tươi tỏa hương thơm sảng khoái bên bồn tắm onsen."
    }
  },
  "柳": {
    "components": ["木", "卯"],
    "equation": "木 (Cây thân gỗ) + 卯 (Cành nhánh rủ tha thướt hé mở hai bên bờ nước)",
    "mnemonic": "Cây thân gỗ mềm dẻo với những dải cành lá dài buông rủ tha thướt ven bờ hồ soi bóng, cây liễu rủ.",
    "illustration": {
      "badge": "🌿",
      "concept": "Cành liễu rủ ven hồ",
      "visualDesc": "Rặng liễu xanh mềm mại buông tơ tha thướt soi bóng xuống mặt nước êm đềm."
    }
  },
  "柾": {
    "components": ["木", "正"],
    "equation": "木 (Cây gỗ) có những đường vân chạy thẳng tắp ngay ngắn (正)",
    "mnemonic": "Chữ thuần Nhật (Kokuji): Thớ gỗ xẻ dọc có đường vân chạy thẳng tắp tăm tắp tuyệt mỹ, vân gỗ masame thẳng tắp.",
    "illustration": {
      "badge": "🪵",
      "concept": "Thớ gỗ vân thẳng Masame",
      "visualDesc": "Mặt bàn gỗ hinoki xẻ vân thẳng tắp mịn màng không tỳ vết."
    }
  },
  "栓": {
    "components": ["木", "全"],
    "equation": "木 (Mẩu gỗ tiện tròn) bịt kín hoàn toàn lỗ hổng (全)",
    "mnemonic": "Mẩu gỗ tiện tròn vừa khít nút chặt miệng bình ngăn không cho giọt nước nào rò rỉ, nút chai, van khóa.",
    "illustration": {
      "badge": "🍾",
      "concept": "Nút bần nút chai rượu",
      "visualDesc": "Chiếc nút bần gỗ ép chặt miệng chai rượu vang giữ trọn hương vị nồng nàn."
    }
  },
  "栗": {
    "components": ["西", "木"],
    "equation": "Những chùm quả vỏ gai nhọn xù xì bọc quả ngọt treo trĩu trên cây gỗ (木)",
    "mnemonic": "Quả có lớp vỏ gai nhọn xù xì rơi rụng hé lộ hạt dẻ thơm bùi bên trong, hạt dẻ kuri.",
    "illustration": {
      "badge": "🌰",
      "concept": "Hạt dẻ Kuri nâu bóng",
      "visualDesc": "Những hạt dẻ nâu bóng bùi béo hé nở từ lớp vỏ gai nướng thơm lừng."
    }
  },
  "栞": {
    "components": ["幵", "木"],
    "equation": "幵 (Bẻ gãy hai cành cây bằng nhau) cắm xuống làm dấu đường đi trong rừng (木)",
    "mnemonic": "Bẻ cành cây làm dấu lối đi trong rừng, sau dùng chỉ dải ruy băng kẹp trang sách, thẻ đánh dấu sách shiori.",
    "illustration": {
      "badge": "🔖",
      "concept": "Thẻ kẹp sách Shiori",
      "visualDesc": "Chiếc thẻ kẹp sách bằng gỗ mỏng chạm hoa văn anh đào kẹp vào trang sách mở."
    }
  },
  "株": {
    "components": ["木", "朱"],
    "equation": "木 (Thân cây gỗ) bị đốn hạ để lại phần gốc lộ lõi đỏ son (朱)",
    "mnemonic": "Phần gốc rễ cây cổ thụ còn lại trên mặt đất tiếp tục đâm chồi mới, gốc cây, cổ phiếu (kabushiki).",
    "illustration": {
      "badge": "📈",
      "concept": "Cổ phiếu thị trường Kabu",
      "visualDesc": "Bảng điện tử chứng khoán hiển thị các mã cổ phiếu tăng trưởng xanh rực rỡ."
    }
  },
  "核": {
    "components": ["木", "亥"],
    "equation": "木 (Quả cây thân gỗ) bao bọc lấy phần hạt cứng cáp bên trong (亥)",
    "mnemonic": "Phần lõi hạt cứng cáp chứa mầm sống ẩn giấu sâu bên trong quả ngọt, hạt nhân, cốt lõi.",
    "illustration": {
      "badge": "⚛️",
      "concept": "Mô hình hạt nhân nguyên tử",
      "visualDesc": "Mô hình hạt nhân nguyên tử phát sáng với các electron xoay tròn quanh tâm."
    }
  },
  "栽": {
    "components": ["十", "戈", "木"],
    "equation": "Dùng công cụ xới đất (戈) rồi cẩn thận cắm cây con vào luống trồng (木)",
    "mnemonic": "Cuốc đất vun xới chăm bón từng mầm cây non đơm hoa kết trái xanh tốt, trồng trọt, cây cảnh bonsai.",
    "illustration": {
      "badge": "🪴",
      "concept": "Cây cảnh Bonsai tỉa tót",
      "visualDesc": "Chậu cây cảnh bonsai thông xanh được chăm chút uốn tỉa công phu."
    }
  },
  "桂": {
    "components": ["木", "圭"],
    "equation": "木 (Cây gỗ thơm) quý giá thanh khiết tựa ngọc khuê (圭)",
    "mnemonic": "Cây thân gỗ quý vỏ thơm ngào ngạt tựa khối ngọc bội chốn cung đình, cây quế, cây katsura.",
    "illustration": {
      "badge": "🍂",
      "concept": "Thanh vỏ quế thơm nồng",
      "visualDesc": "Những thanh vỏ quế cuộn tròn tỏa hương thơm nồng nàn ấm áp bên cối xay."
    }
  },
  "桃": {
    "components": ["木", "兆"],
    "equation": "木 (Cây ăn quả) kết những quả mọng nứt rãnh đôi như điềm triệu lành (兆)",
    "mnemonic": "Cây kết những quả má hồng rẽ đôi căng mọng ngọt lịm xua đuổi tà khí, quả đào, hoa đào.",
    "illustration": {
      "badge": "🍑",
      "concept": "Quả đào hồng căng mọng",
      "visualDesc": "Quả đào tiên hồng hào căng mọng nước đọng giọt sương mai ngọt ngào."
    }
  },
  "案": {
    "components": ["安", "木"],
    "equation": "安 (Yên tĩnh, an tâm) ngồi bên chiếc bàn gỗ suy nghĩ kế sách (木)",
    "mnemonic": "Ngồi tĩnh tâm bên chiếc bàn gỗ nghiên cứu lên phương án tối ưu giải quyết công việc, phương án, bản án.",
    "illustration": {
      "badge": "📋",
      "concept": "Bản kế hoạch phương án",
      "visualDesc": "Tập tài liệu đề xuất phương án kinh doanh bài bản mở trên bàn gỗ."
    }
  },
  "桐": {
    "components": ["木", "同"],
    "equation": "木 (Cây gỗ) có thớ gỗ nhẹ xốp màu sắc đồng nhất thanh nhã (同)",
    "mnemonic": "Cây gỗ ngô đồng nhẹ xốp không ẩm mốc chuyên dùng đóng hòm rương quý báu, cây ngô đồng kiri.",
    "illustration": {
      "badge": "🪵",
      "concept": "Hộp gỗ ngô đồng Kiri",
      "visualDesc": "Chiếc hộp gỗ kiri màu sáng nhạt thơm dịu đựng chén trà đạo quý báu."
    }
  },
  "桑": {
    "components": ["又", "又", "又", "木"],
    "equation": "Nhiều bàn tay thoăn thoắt (ba chữ 又) hái lá xanh trên cành cây (木)",
    "mnemonic": "Những bàn tay thoăn thoắt hái lá dâu tươi non về nuôi nong tằm nhả tơ dệt lụa, cây dâu tằm.",
    "illustration": {
      "badge": "🐛",
      "concept": "Lá dâu nuôi tằm nhả tơ",
      "visualDesc": "Những chú tằm trắng đang miệt mài gặm lá dâu xanh tươi chuẩn bị nhả tơ."
    }
  },
  "桜": {
    "components": ["木", "ツ", "女"],
    "equation": "木 (Cây gỗ) rộ nở những chùm hoa dịu dàng như thiếu nữ cài hoa lên tóc (女)",
    "mnemonic": "Loài cây mùa xuân bung nở muôn ngàn cánh hoa hồng phớt tinh khôi lay động lòng người, hoa anh đào sakura.",
    "illustration": {
      "badge": "🌸",
      "concept": "Hoa anh đào Sakura nở rộ",
      "visualDesc": "Những chùm hoa anh đào sakura hồng phớt bồng bềnh dưới bầu trời xuân trong xanh."
    }
  },
  "桟": {
    "components": ["木", "戔"],
    "equation": "木 (Các thanh gỗ) ghép liên tiếp nhau thành lối đi nhỏ bắc qua sông (戔)",
    "mnemonic": "Các thanh ván gỗ ghép lại thành lối đi bắc ngang bờ nước đón khách lên thuyền, cầu ván, bến tàu.",
    "illustration": {
      "badge": "🪵",
      "concept": "Cầu gỗ bến tàu Sanbashi",
      "visualDesc": "Cầu gỗ nhỏ vươn ra mặt nước trong xanh nơi bến đò thuyền neo đậu."
    }
  },
  "梅": {
    "components": ["木", "毎"],
    "equation": "木 (Cây thân gỗ) nở hoa sớm nhất mỗi độ xuân về (毎)",
    "mnemonic": "Cây nở hoa trắng muốt báo hiệu mùa xuân đến và kết những quả mơ chua giòn muối dưa, cây mai, quả mơ ume.",
    "illustration": {
      "badge": "🍙",
      "concept": "Quả mơ muối Umeboshi",
      "visualDesc": "Quả mơ muối umeboshi đỏ au đặt chính giữa bát cơm trắng thơm ngút."
    }
  },
  "梓": {
    "components": ["木", "辛"],
    "equation": "木 (Cây gỗ dẻo dai) dùng làm cung tên và bản khắc chữ sắc bén (辛)",
    "mnemonic": "Loài gỗ dẻo dai dùng làm thân cung tên azusa và ván khắc in sách lưu truyền muôn đời, cây tử, bản in.",
    "illustration": {
      "badge": "🏹",
      "concept": "Cánh cung gỗ Azusa",
      "visualDesc": "Chiếc cung thần gỗ azusa truyền thống đặt cạnh cuộn sách in mộc bản cổ."
    }
  },
  "梢": {
    "components": ["木", "肖"],
    "equation": "木 (Cây) vươn những nhánh cành thon nhỏ dần lên ngọn (肖)",
    "mnemonic": "Phần cành nhánh thon nhỏ nhất vươn lên cao tít đón ánh nắng trên đỉnh vòm cây, ngọn cây, cành sao.",
    "illustration": {
      "badge": "🌿",
      "concept": "Ngọn cây đón nắng mai",
      "visualDesc": "Đầu ngọn cây thon mảnh đung đưa đón những tia nắng ban mai đầu tiên."
    }
  },
  "梧": {
    "components": ["木", "吾"],
    "equation": "木 (Cây thân gỗ lớn) khẳng định phong thái đĩnh đạc kiêu hãnh của chính mình (吾)",
    "mnemonic": "Loài cây gỗ quý cao vút nơi chim phượng hoàng tìm về đậu che chở điềm lành, cây ngô đồng, ngô thê.",
    "illustration": {
      "badge": "🌳",
      "concept": "Cây ngô đồng xanh biếc",
      "visualDesc": "Cây ngô đồng tán lá xòe rộng bóng mát bên bờ tường cung điện."
    }
  },
  "梨": {
    "components": ["利", "木"],
    "equation": "利 (Lưỡi dao sắc ngọt cắt ra) từ cây ăn quả chứa nước ngọt mát (木)",
    "mnemonic": "Dùng dao gọt vỏ quả chín mọng nước giòn ngọt thanh mát giải khát ngày hè, quả lê, cây lê.",
    "illustration": {
      "badge": "🍐",
      "concept": "Quả lê vàng mọng nước",
      "visualDesc": "Quả lê tròn vàng ươm mọng nước đọng sương mai giòn ngọt."
    }
  },
  "棄": {
    "components": ["育", "木"],
    "equation": "Đứa con bị bỏ rơi trong chiếc sọt gỗ thả trôi / bàn tay vứt bỏ đồ vật (木)",
    "mnemonic": "Vứt bỏ những thứ hư hỏng cặn bã không còn dùng được vào góc thùng gỗ, vứt bỏ, từ bỏ, ruồng bỏ.",
    "illustration": {
      "badge": "🗑️",
      "concept": "Bỏ rác vào thùng",
      "visualDesc": "Thùng rác tái chế đựng những vật dụng cũ được phân loại sạch sẽ."
    }
  },
  "棋": {
    "components": ["木", "其"],
    "equation": "木 (Quân cờ bằng gỗ mộc) bày trên bàn cờ kẻ ô vuông vức (其)",
    "mnemonic": "Những quân cờ hình nêm bằng gỗ mộc mạc dàn trận so tài trí tuệ trên bàn cờ, cờ vây, cờ tướng shogi.",
    "illustration": {
      "badge": "♟️",
      "concept": "Quân cờ tướng Shogi gỗ",
      "visualDesc": "Quân cờ vua tướng shogi bằng gỗ khắc chữ đen đặt trên bàn cờ mộc."
    }
  },
  "棚": {
    "components": ["木", "朋"],
    "equation": "木 (Thanh gỗ) ghép song hành bằng phẳng cạnh nhau nâng đỡ đồ đạc (朋)",
    "mnemonic": "Những thanh gỗ đóng song hành vững chãi thành từng tầng để sách và đồ đạc ngăn nắp, giá đỡ, kệ sách, giàn hoa.",
    "illustration": {
      "badge": "📚",
      "concept": "Kệ giá sách gỗ ngăn nắp",
      "visualDesc": "Kệ gỗ nhiều tầng xếp đầy những cuốn sách bìa màu ngăn nắp gọn gàng."
    }
  },
  "棟": {
    "components": ["木", "東"],
    "equation": "木 (Thanh xà gỗ lớn nhất) gối lên cột trụ hướng đông đón mặt trời (東)",
    "mnemonic": "Thanh gỗ đòn nóc lớn nhất gánh đỡ toàn bộ sức nặng của mái nhà, xà nóc, nóc nhà, tòa nhà.",
    "illustration": {
      "badge": "🏢",
      "concept": "Tòa nhà cao tầng đồ sộ",
      "visualDesc": "Tòa chung cư hiện đại sừng sững đếm theo từng tòa nhà to lớn."
    }
  },
  "棺": {
    "components": ["木", "官"],
    "equation": "木 (Hộp gỗ kiên cố) dành cho viên quan an nghỉ nghìn thu (官)",
    "mnemonic": "Cỗ áo quan bằng gỗ thơm kiên cố đưa tiễn người quá cố về nơi an nghỉ vĩnh hằng, quan tài, áo quan.",
    "illustration": {
      "badge": "⚰️",
      "concept": "Cỗ quan tài bằng gỗ",
      "visualDesc": "Cỗ quan tài bằng gỗ trang nghiêm đặt hoa cúc trắng tưởng niệm."
    }
  },
  "椋": {
    "components": ["木", "京"],
    "equation": "木 (Cây thân gỗ lớn) nơi bầy chim sáo tụ tập ríu rít chốn kinh đô (京)",
    "mnemonic": "Loài cây thân gỗ lớn với những chùm quả mọng ngọt nơi chim sáo muku bay về làm tổ, cây muku, chim sáo.",
    "illustration": {
      "badge": "🐦",
      "concept": "Chú chim sáo đá Muku",
      "visualDesc": "Chú chim sáo đá đậu trên cành cây muku ríu rít hót vang đón nắng."
    }
  },
  "椎": {
    "components": ["木", "隹"],
    "equation": "木 (Cây gỗ sồi) nơi chim nhỏ tìm về nhặt quả dẻ (隹)",
    "mnemonic": "Loài cây gỗ sồi dẻ thơm nơi ươm mầm loài nấm hương bổ dưỡng shiitake, cây sồi shii, đốt sống (chùy).",
    "illustration": {
      "badge": "🍄",
      "concept": "Nấm hương Shiitake thơm ngon",
      "visualDesc": "Những tai nấm hương shiitake nâu bóng mọc trên khúc gỗ sồi ẩm mục."
    }
  },
  "検": {
    "components": ["木", "僉"],
    "equation": "木 (Thẻ sách gỗ ghi quy chuẩn) đối chiếu gom góp mọi chi tiết (僉)",
    "mnemonic": "Cầm sổ kiểm tra đối chiếu từng chi tiết mộc bản bảo đảm không có sai sót, kiểm tra, kiểm định.",
    "illustration": {
      "badge": "🔍",
      "concept": "Kiểm tra xét nghiệm",
      "visualDesc": "Kính hiển vi và phiếu kiểm tra đánh dấu tích hoàn thành tiêu chuẩn."
    }
  },
  "椰": {
    "components": ["木", "耶"],
    "equation": "木 (Cây thân gỗ cao) + 耶 (Vươn cao đón gió biển đảo phương nam)",
    "mnemonic": "Cây thân gỗ cao vút nghiêng mình đón gió biển mang những chùm quả dừa ngọt lành, cây dừa yashi.",
    "illustration": {
      "badge": "🥥",
      "concept": "Trái dừa mát lạnh bên bờ biển",
      "visualDesc": "Quả dừa tươi cắm ống hút bên bờ cát trắng và rặng dừa đu đưa."
    }
  },
  "椿": {
    "components": ["木", "春"],
    "equation": "木 (Cây gỗ) trổ những đóa hoa đỏ rực rỡ đón mùa xuân sang (春)",
    "mnemonic": "Cây hoa sơn trà cánh đỏ nhụy vàng trổ hoa rực rỡ giữa tuyết trắng báo hiệu mùa xuân sang, hoa tsubaki.",
    "illustration": {
      "badge": "🌺",
      "concept": "Hoa sơn trà Tsubaki đỏ thắm",
      "visualDesc": "Bông hoa tsubaki đỏ thắm rơi trên thảm rêu xanh ngập tràn sức xuân."
    }
  },
  "楊": {
    "components": ["木", "昜"],
    "equation": "木 (Cây gỗ) vươn cành lá mềm mại tắm mình trong ánh nắng rực rỡ (昜)",
    "mnemonic": "Cành dương liễu mềm mại lấp lánh phản chiếu ánh nắng mặt trời rực rỡ, cây dương liễu, bạch dương.",
    "illustration": {
      "badge": "🌿",
      "concept": "Cành dương liễu đón nắng",
      "visualDesc": "Cành cây dương liễu đung đưa trong nắng mai soi bóng xuống dòng sông."
    }
  },
  "楓": {
    "components": ["木", "風"],
    "equation": "木 (Cây gỗ) có những chiếc lá hình bàn tay xào xạc trong ngọn gió thu (風)",
    "mnemonic": "Những tán lá phong chuyển màu đỏ rực xào xạc bay theo làn gió thu mát rượi, cây phong, lá phong momiji.",
    "illustration": {
      "badge": "🍁",
      "concept": "Lá phong đỏ mùa thu Momiji",
      "visualDesc": "Chiếc lá phong đỏ tươi hình năm ngón tay rực rỡ nổi bật giữa sắc trời thu."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n1fData)) {
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

console.log(`[Batch 5F - N1 Part 6] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n1fData).length} chữ Kanji N1.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
