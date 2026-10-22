/**
 * Batch 5A: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 95 chữ Kanji N1 đầu tiên (từ 丁 đến 凡)
 */

const fs = require('fs');
const path = require('path');

const n1aData = {
  "丁": {
    "components": ["丁"],
    "equation": "丁 (Tượng hình chiếc đinh đầu phẳng cắm thẳng xuống đất)",
    "mnemonic": "Hình chiếc đinh thẳng tắp với mũ đinh ngang bằng, can Đinh, tráng đinh, đinh ninh.",
    "illustration": {
      "badge": "📌",
      "concept": "Chiếc đinh ghim",
      "visualDesc": "Chiếc đinh thép nhỏ gọn đóng chắc chắn trên mặt phẳng."
    }
  },
  "丑": {
    "components": ["丑"],
    "equation": "丑 (Tượng hình bàn tay co lại nắm giữ công cụ, chi Sửu cầm tinh con trâu)",
    "mnemonic": "Bàn tay khép chặt cầm dây thừng dắt trâu cày bừa đầu xuân, chi Sửu, con trâu.",
    "illustration": {
      "badge": "🐂",
      "concept": "Con trâu chi Sửu",
      "visualDesc": "Chú trâu đực khỏe khoắn thong dong gặm cỏ trên bờ đê."
    }
  },
  "且": {
    "components": ["且"],
    "equation": "且 (Tượng hình chiếc bàn tế hoặc bia tổ tiên dựng nhiều tầng nghi lễ)",
    "mnemonic": "Chiếc bàn thờ cúng xếp chồng tầng tầng lớp lớp (且), hơn nữa, vả lại, tạm thời.",
    "illustration": {
      "badge": "➕",
      "concept": "Thêm vào đó hơn nữa",
      "visualDesc": "Từng tầng bậc đá xếp cao biểu trưng cho sự bồi đắp nâng cao."
    }
  },
  "丘": {
    "components": ["斤", "一"],
    "equation": "斤 (Hình hai sườn dốc) vươn lên từ mặt đất phẳng (一)",
    "mnemonic": "Mặt đất bằng phẳng (一) nhô lên hai mỏm gò đất thoai thoải, gò đồi, gò Khâu.",
    "illustration": {
      "badge": "⛰️",
      "concept": "Gò đồi thoai thoải",
      "visualDesc": "Ngọn đồi cỏ xanh ngắt nhấp nhô dưới bầu trời trong vắt."
    }
  },
  "丙": {
    "components": ["一", "内"],
    "equation": "丙 (Tượng hình bệ đỡ vững chắc dưới chân vạc tế, can Bính thứ 3 thiên can)",
    "mnemonic": "Cái đuôi chân bệ đỡ kiên cố dưới đáy vạc thờ thần linh, can Bính trong hàng can.",
    "illustration": {
      "badge": "🥉",
      "concept": "Bậc ba can Bính",
      "visualDesc": "Huy hiệu xếp hạng thứ ba với chữ C hoặc Bính trang trọng."
    }
  },
  "丞": {
    "components": ["了", "山", "一"],
    "equation": "Hai bàn tay đưa xuống hố sâu nâng người gặp nạn lên mặt đất phẳng",
    "mnemonic": "Đưa đôi tay xuống hố kéo người hoạn nạn thoát hiểm, cứu giúp, phò tá, quan Thừa tướng.",
    "illustration": {
      "badge": "🤝",
      "concept": "Đưa tay cứu giúp",
      "visualDesc": "Bàn tay vươn ra nâng đỡ người khác vượt qua bờ vực hiểm trở."
    }
  },
  "丹": {
    "components": ["冂", "丶", "一"],
    "equation": "冂 (Hầm mỏ sâu trong lòng núi) + 丶 (Quặng chu sa đỏ thắm)",
    "mnemonic": "Đào sâu vào giếng mỏ (冂) tìm thấy hạt chu sa đỏ thắm óng ánh (丶), thuốc đan, tấm lòng son.",
    "illustration": {
      "badge": "🔴",
      "concept": "Viên chu sa đỏ",
      "visualDesc": "Hòn ngọc đan sa màu đỏ thắm lấp lánh như ngọn lửa nhỏ."
    }
  },
  "乃": {
    "components": ["乃"],
    "equation": "乃 (Tượng hình luồng hơi thở uốn lượn thoát ra từ lồng ngực)",
    "mnemonic": "Hơi thở uốn lượn buông nhẹ thốt ra lời khẳng định dứt khoát, bèn, mới là, chính là.",
    "illustration": {
      "badge": "💨",
      "concept": "Làn hơi uốn lượn",
      "visualDesc": "Làn khói mềm mại lượn sóng biểu tượng cho sự chuyển tiếp nhịp nhàng."
    }
  },
  "之": {
    "components": ["之"],
    "equation": "之 (Tượng hình bàn chân bước ra từ một điểm khởi hành hướng về phía trước)",
    "mnemonic": "Dấu chân bước đi tiến tới đích đến định sẵn, đi đến, sở hữu của, này.",
    "illustration": {
      "badge": "👣",
      "concept": "Bước chân tiến tới",
      "visualDesc": "Dấu chân rảo bước trên con đường dài hướng về vùng đất mới."
    }
  },
  "乏": {
    "components": ["丿", "之"],
    "equation": "之 (Bước chân tiến tới) bị bẻ cong lệch hướng (丿)",
    "mnemonic": "Bước chân muốn bước đi (之) nhưng bị cản trở ngoặt hướng (丿) vì kiệt sức, thiếu thốn, mệt mỏi.",
    "illustration": {
      "badge": "🪫",
      "concept": "Cạn kiệt năng lượng",
      "visualDesc": "Biểu tượng pin báo vạch đỏ cạn kiệt cần được nạp lại năng lượng."
    }
  },
  "乙": {
    "components": ["乙"],
    "equation": "乙 (Tượng hình mầm cây non còn uốn cong mình trồi lên khỏi mặt đất)",
    "mnemonic": "Mầm cây uốn cong thân mình chờ ngày vươn thẳng đón nắng, can Ất, hạng nhì.",
    "illustration": {
      "badge": "🌱",
      "concept": "Mầm cây uốn lượn",
      "visualDesc": "Chồi non xanh uốn lượn vươn mình tách lớp đất mỏng nảy mầm."
    }
  },
  "也": {
    "components": ["也"],
    "equation": "也 (Tượng hình chiếc ấm đất nung có vòi rót hoặc loài rắn nước uốn lượn)",
    "mnemonic": "Hình chiếc ấm đất với quai và vòi nước uốn lượn hài hòa, cũng là, trợ từ ngữ khí.",
    "illustration": {
      "badge": "🫖",
      "concept": "Ấm gốm cổ",
      "visualDesc": "Chiếc ấm gốm tử sa với đường cong uyển chuyển rót trà ấm nóng."
    }
  },
  "亀": {
    "components": ["⺈", "日", "丨"],
    "equation": "⺈ (Đầu rùa) + 日 (Mai rùa vân ô vuông) + 丨 (Đuôi rùa và chân)",
    "mnemonic": "Hình chú rùa với cái đầu ngẩng cao, mai cứng cáp hoa văn ô vuông và cái đuôi nhỏ, con rùa.",
    "illustration": {
      "badge": "🐢",
      "concept": "Chú rùa trường thọ",
      "visualDesc": "Chú rùa biển bơi lội ung dung giữa rạn san hô rực rỡ."
    }
  },
  "井": {
    "components": ["井"],
    "equation": "井 (Tượng hình khung gỗ hình chữ tỉnh che miệng giếng nước)",
    "mnemonic": "Bốn thanh gỗ ghép đan chéo thành miệng giếng nước ngọt lành thời xưa, cái giếng.",
    "illustration": {
      "badge": "🪵",
      "concept": "Miệng giếng khơi",
      "visualDesc": "Miệng giếng xây đá cổ kính rêu phong với gàu múc nước gỗ."
    }
  },
  "亘": {
    "components": ["二", "日"],
    "equation": "二 (Trời và đất) + 日 (Mặt trời di chuyển liên tục từ chân trời đông sang tây)",
    "mnemonic": "Mặt trời (日) vận hành liên tục giữa khoảng trời và đất (二), trải dài, liên tục ngút ngàn.",
    "illustration": {
      "badge": "🌅",
      "concept": "Mặt trời trải dài chân trời",
      "visualDesc": "Ánh mặt trời trải tia sáng rực rỡ nối liền bầu trời và mặt biển."
    }
  },
  "亜": {
    "components": ["一", "口", "凵"],
    "equation": "亜 (Tượng hình mặt cắt móng nền lăng mộ hình chữ á thời cổ)",
    "mnemonic": "Khung nền lăng mộ bốn góc vuông vức thời cổ, sau dùng chỉ châu Á, vị trí thứ nhì (á quân).",
    "illustration": {
      "badge": "🌏",
      "concept": "Bản đồ châu Á",
      "visualDesc": "Địa cầu xoay về hướng lục địa châu Á với màu xanh ngắt trù phú."
    }
  },
  "亥": {
    "components": ["亠", "厶", "人"],
    "equation": "亥 (Tượng hình con lợn rừng nái đang chửa, chi Hợi cuối 12 địa chi)",
    "mnemonic": "Hình vẽ con heo rừng béo tròn với 4 chân và chiếc đuôi ngắn, chi Hợi, con heo.",
    "illustration": {
      "badge": "🐗",
      "concept": "Heo rừng chi Hợi",
      "visualDesc": "Chú heo rừng con lông đốm hoa tinh nghịch chạy nhảy trên cỏ rơm."
    }
  },
  "亦": {
    "components": ["亠", "八"],
    "equation": "亠 (Phần đầu ngực con người) + 八 (Hai nách hai bên đánh dấu cân đối)",
    "mnemonic": "Chỉ vào hai bên nách cân xứng của con người, cái này cũng giống như cái kia, cũng vậy.",
    "illustration": {
      "badge": "👥",
      "concept": "Hai bên cân xứng",
      "visualDesc": "Hai cán cân đối xứng nhau biểu thị ý nghĩa đồng dạng cũng thế."
    }
  },
  "亨": {
    "components": ["亠", "口", "了"],
    "equation": "亠 (Mái đình tế lễ) + 口 (Miệng cầu nguyện) + 了 (Hoàn tất thông suốt)",
    "mnemonic": "Nghi lễ tế tự dâng lên trời đất được chấp thuận trọn vẹn, mọi sự thuận buồm xuôi gió, hanh thông.",
    "illustration": {
      "badge": "✨",
      "concept": "Mọi sự hanh thông",
      "visualDesc": "Con đường thẳng tắp rộng mở thênh thang đón ánh nắng ban mai rạng rỡ."
    }
  },
  "享": {
    "components": ["亠", "口", "子"],
    "equation": "亠 (Mái nhà) + 口 (Miệng nếm vị ngon) + 子 (Con cháu sum vầy)",
    "mnemonic": "Dưới mái nhà ấm cúng (亠), con cháu sum vầy (子) quây quần thưởng thức món ngon (口), thụ hưởng.",
    "illustration": {
      "badge": "🍵",
      "concept": "Tận hưởng trà chiều",
      "visualDesc": "Tách trà nghi ngút khói thơm mang lại cảm giác bình yên thư thái."
    }
  },
  "亭": {
    "components": ["亠", "口", "冖", "丁"],
    "equation": "亠-口 (Mái lầu nhô cao) + 冖 (Hiên che mát) + 丁 (Cột trụ vững vàng cắm đất)",
    "mnemonic": "Lầu gác có mái nhọn đứng trên các cột trụ vững chãi bên đường cho khách nghỉ chân, đình quán, hoa đình.",
    "illustration": {
      "badge": "🏯",
      "concept": "Đình nghỉ mát bên hồ",
      "visualDesc": "Ngôi đình mái cong cổ kính soi bóng lung linh xuống mặt hồ phẳng lặng."
    }
  },
  "亮": {
    "components": ["亠", "口", "冖", "儿"],
    "equation": "亠-口-冖 (Lầu cao đón ánh sáng) + 儿 (Người đứng ngẩng cao đầu quang minh)",
    "mnemonic": "Đứng trên đỉnh lầu cao đón nhận ánh sáng rạng rỡ của đất trời, sáng tỏ, quang minh, Gia Cát Lượng.",
    "illustration": {
      "badge": "💡",
      "concept": "Ánh sáng soi tỏ",
      "visualDesc": "Vầng sáng quang minh tỏa rộng xua tan bóng tối quanh ngọn hải đăng."
    }
  },
  "仁": {
    "components": ["亻", "二"],
    "equation": "亻 (Nhân - con người) + 二 (Nhị - hai người đối xử tử tế với nhau)",
    "mnemonic": "Mối quan hệ chan hòa, bao dung và tôn trọng giữa người với người (亻-二), lòng nhân từ, nhân ái.",
    "illustration": {
      "badge": "🕊️",
      "concept": "Trái tim nhân ái",
      "visualDesc": "Hai bàn tay che chở nhành lá non biểu trưng cho lòng nhân hậu ấm áp."
    }
  },
  "仙": {
    "components": ["亻", "山"],
    "equation": "亻 (Nhân - người tu luyện) + 山 (Sơn - non cao thanh tịnh)",
    "mnemonic": "Người lánh đời lên non cao tĩnh tâm tu luyện đắc đạo thoát tục (亻-山), thần tiên, tiên nhân.",
    "illustration": {
      "badge": "🧙‍♂️",
      "concept": "Tiên ông trên đỉnh núi",
      "visualDesc": "Vị tiên râu tóc bạc phơ đứng trên mỏm núi mây ngàn bồng bềnh phiêu lãng."
    }
  },
  "仮": {
    "components": ["亻", "反"],
    "equation": "亻 (Nhân - con người) + 反 (Phản - lật ngược, thay đổi tạm thời)",
    "mnemonic": "Con người (亻) mượn một thân phận đảo ngược khác để đóng vai tạm thời (反), giả định, tạm thời.",
    "illustration": {
      "badge": "🎭",
      "concept": "Mặt nạ giả định",
      "visualDesc": "Chiếc mặt nạ kịch nghệ mang hai sắc thái vui buồn đại diện cho vai diễn."
    }
  },
  "仰": {
    "components": ["亻", "卬"],
    "equation": "亻 (Nhân - con người) + 卬 (Ngang - người ngẩng cao đầu hướng mắt lên)",
    "mnemonic": "Con người (亻) ngẩng cao đầu thành kính hướng mắt nhìn lên bậc bề trên (卬), ngước nhìn, ngưỡng mộ.",
    "illustration": {
      "badge": "🌌",
      "concept": "Ngước nhìn trời sao",
      "visualDesc": "Người đứng ngẩng đầu ngắm nhìn bầu trời đêm đầy sao lấp lánh kỳ vĩ."
    }
  },
  "企": {
    "components": ["人", "止"],
    "equation": "人 (Nhân - con người) + 止 (Chỉ - bàn chân kiễng gót nhìn xa)",
    "mnemonic": "Người kiễng chân vươn mắt nhìn về tương lai để lên kế hoạch mưu sự, xí nghiệp, mưu tính.",
    "illustration": {
      "badge": "🏢",
      "concept": "Tòa nhà xí nghiệp",
      "visualDesc": "Tòa nhà văn phòng hiện đại biểu trưng cho doanh nghiệp và kế hoạch phát triển."
    }
  },
  "伊": {
    "components": ["亻", "尹"],
    "equation": "亻 (Nhân - con người) + 尹 (Doãn - vị quan cầm bút phán xử công minh)",
    "mnemonic": "Người cầm thước ngọc trị vì đức độ được mọi người kính cẩn nhắc đến (亻-尹), người ấy, nước Ý (Italia).",
    "illustration": {
      "badge": "🏛️",
      "concept": "Đấu trường La Mã",
      "visualDesc": "Kiến trúc cổ đại nước Ý với các mái vòm tráng lệ uy nghiêm."
    }
  },
  "伍": {
    "components": ["亻", "五"],
    "equation": "亻 (Nhân - binh lính) + 五 (Ngũ - số năm người một nhóm)",
    "mnemonic": "Cứ năm người lính (五) hợp lại thành một tiểu đội chiến đấu kề vai (亻), hàng ngũ, đội ngũ.",
    "illustration": {
      "badge": "5️⃣",
      "concept": "Đội ngũ năm thành viên",
      "visualDesc": "Nhóm năm người đồng đội cùng kề vai sát cánh bước đều tăm tắp."
    }
  },
  "伎": {
    "components": ["亻", "支"],
    "equation": "亻 (Nhân - nghệ sĩ biểu diễn) + 支 (Chi - bàn tay cầm đạo cụ uyển chuyển)",
    "mnemonic": "Người nghệ sĩ (亻) dùng đôi tay khéo léo điều khiển đạo cụ múa lượn (支), tài nghệ biểu diễn, ca vũ kỹ.",
    "illustration": {
      "badge": "🪭",
      "concept": "Chiếc quạt múa truyền thống",
      "visualDesc": "Chiếc quạt xòe lụa đào rực rỡ trong điệu múa kịch Kabuki cổ điển."
    }
  },
  "伏": {
    "components": ["亻", "犬"],
    "equation": "亻 (Nhân - người chủ) + 犬 (Khuyển - chú chó ngoan ngoãn nép bên chân)",
    "mnemonic": "Chú chó (犬) nằm phục rạp sát đất chờ lệnh của chủ nhân (亻), cúi mình, phục tùng, phục kích.",
    "illustration": {
      "badge": "🐕",
      "concept": "Chú chó nằm ngoan nép sát",
      "visualDesc": "Chú chó trung thành nằm rạp mình phủ phục bảo vệ chủ nhân."
    }
  },
  "伐": {
    "components": ["亻", "戈"],
    "equation": "亻 (Nhân - con người, quân thù) + 戈 (Qua - ngọn giáo sắc nhọn đâm tới)",
    "mnemonic": "Cầm ngọn giáo (戈) vung tới tấn công quân thù hoặc đốn ngã cây rừng (亻), thảo phạt, đốn hạ.",
    "illustration": {
      "badge": "🪓",
      "concept": "Chiếc rìu đốn cây",
      "visualDesc": "Lưỡi rìu bổ mạnh vào thân cây gỗ lớn mở đường khai hoang."
    }
  },
  "伯": {
    "components": ["亻", "白"],
    "equation": "亻 (Nhân - người trưởng tộc) + 白 (Bạch - mái tóc hoa râm uy nghiêm)",
    "mnemonic": "Người đàn ông mái tóc đã bạc (白) giữ trọng trách đứng đầu dòng họ (亻), bác cả, bá tước.",
    "illustration": {
      "badge": "👑",
      "concept": "Vị bá tước tôn nghiêm",
      "visualDesc": "Quý ông trung niên mặc áo choàng bá tước với huy hiệu danh giá."
    }
  },
  "伴": {
    "components": ["亻", "半"],
    "equation": "亻 (Nhân - con người) + 半 (Bán - một nửa tri kỷ của mình)",
    "mnemonic": "Người luôn sẻ chia cùng mình một nửa niềm vui nỗi buồn cuộc đời (亻-半), bạn đồng hành, bồi bạn.",
    "illustration": {
      "badge": "👫",
      "concept": "Đôi bạn đồng hành",
      "visualDesc": "Hai người bạn cùng rảo bước thảnh thơi trên con đường ngập lá vàng rơi."
    }
  },
  "伶": {
    "components": ["亻", "令"],
    "equation": "亻 (Nhân - con người) + 令 (Lệnh - ban bố mệnh lệnh, thanh âm lanh lảnh)",
    "mnemonic": "Người (亻) có phản xạ nhạy bén thấu hiểu ngay từng mệnh lệnh (令), lanh lợi, thông minh, đào kép.",
    "illustration": {
      "badge": "🧠",
      "concept": "Trí tuệ lanh lợi",
      "visualDesc": "Ánh mắt sáng ngời lanh lợi thể hiện sự nhạy bén và thông tuệ."
    }
  },
  "伽": {
    "components": ["亻", "加"],
    "equation": "亻 (Nhân - người bên cạnh) + 加 (Gia - thêm vào sự chăm lo săn sóc)",
    "mnemonic": "Thêm một người (亻-加) túc trực đêm ngày săn sóc lúc ốm đau, bầu bạn trông nom, phiên âm phạn ngữ Phật giáo.",
    "illustration": {
      "badge": "🍵",
      "concept": "Trông nom bầu bạn",
      "visualDesc": "Chén trà thơm ấm áp bên cuốn cổ thư mang lại sự an lạc tịnh tâm."
    }
  },
  "但": {
    "components": ["亻", "旦"],
    "equation": "亻 (Nhân - con người chờ đợi) + 旦 (Đán - bình minh mặt trời vừa ló rạng)",
    "mnemonic": "Người (亻) đứng đợi mặt trời vừa ló dạng (旦) nhưng lại có điều bất trắc xảy đến, nhưng mà, tuy nhiên.",
    "illustration": {
      "badge": "⛅",
      "concept": "Bình minh hé rạng",
      "visualDesc": "Mặt trời vừa ló rạng sau rặng mây hé mở một ngày mới đầy biến chuyển."
    }
  },
  "佐": {
    "components": ["亻", "左"],
    "equation": "亻 (Nhân - người đồng hành) + 左 (Tả - tay trái hỗ trợ tay mặt)",
    "mnemonic": "Người đứng bên tay trái (左) nâng đỡ đắc lực cho chủ tướng (亻), cánh tay đắc lực, phò tá, trợ tá.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Trợ thủ đắc lực",
      "visualDesc": "Cố vấn trung thành đứng cạnh phò tá lãnh đạo ra quyết sách quan trọng."
    }
  },
  "佑": {
    "components": ["亻", "右"],
    "equation": "亻 (Nhân - con người thành tâm) + 右 (Hựu - tay phải làm dấu cầu chúc tốt lành)",
    "mnemonic": "Bàn tay phải chở che giơ lên ban phước lành cho con người (亻-右), thần linh phù hộ, độ trì.",
    "illustration": {
      "badge": "🙏",
      "concept": "Phù hộ độ trì",
      "visualDesc": "Đôi bàn tay chắp lại cầu nguyện đón nhận ánh sáng ấm áp ban phước."
    }
  },
  "佳": {
    "components": ["亻", "圭"],
    "equation": "亻 (Nhân - con người) + 圭 (Khuê - miếng ngọc quý thanh khiết)",
    "mnemonic": "Người phụ nữ có phẩm hạnh thanh tao và nét đẹp thuần khiết tựa ngọc bích (亻-圭), giai nhân, tốt lành.",
    "illustration": {
      "badge": "💎",
      "concept": "Viên ngọc giai nhân",
      "visualDesc": "Viên ngọc bích tỏa ánh sáng xanh dịu dàng quý phái vô ngần."
    }
  },
  "併": {
    "components": ["亻", "并"],
    "equation": "亻 (Nhân - con người) + 并 (Tinh - hai người song hành gắn kết lại làm một)",
    "mnemonic": "Hai người (亻) bước đi song hành cùng gộp sức mạnh làm một thể thống nhất (并), sáp nhập, kiêm nhiệm.",
    "illustration": {
      "badge": "🔗",
      "concept": "Sáp nhập gộp lại",
      "visualDesc": "Hai dòng chảy hòa vào làm một con sông lớn cuồn cuộn sức mạnh."
    }
  },
  "侃": {
    "components": ["亻", "口", "川"],
    "equation": "亻 (Nhân - con người) + 口 (Miệng nói) + 川 (Dòng chảy ngay thẳng không quanh co)",
    "mnemonic": "Người (亻) ăn nói bộc trực ngay thẳng tuôn trào như dòng suối không hề quanh co, cương trực, khảng khái.",
    "illustration": {
      "badge": "🗣️",
      "concept": "Lời nói ngay thẳng khảng khái",
      "visualDesc": "Người đứng thẳng lưng dõng dạc trình bày chân lý trước đám đông."
    }
  },
  "侍": {
    "components": ["亻", "寺"],
    "equation": "亻 (Nhân - người trung nghĩa) + 寺 (Tự - chốn công đường phủ đệ)",
    "mnemonic": "Người (亻) túc trực bảo vệ chốn quan quyền hay phủ chủ tướng bằng thanh kiếm báu (寺), kiếm sĩ samurai, thị vệ.",
    "illustration": {
      "badge": "⚔️",
      "concept": "Kiếm sĩ Samurai",
      "visualDesc": "Võ sĩ samurai trong bộ giáp truyền thống với thanh katana đeo bên hông."
    }
  },
  "侑": {
    "components": ["亻", "有"],
    "equation": "亻 (Nhân - người chủ tiệc ân cần) + 有 (Hữu - có thức ăn ngon trên tay)",
    "mnemonic": "Người chủ tiệc (亻) có mâm rượu thịt thịnh soạn (有) niềm nở mời mọc khách quý, thết đãi, trợ giúp.",
    "illustration": {
      "badge": "🥂",
      "concept": "Mời nâng ly chúc tụng",
      "visualDesc": "Chủ nhà tươi cười nâng ly rượu ấm chúc mừng khách quý đến thăm."
    }
  },
  "価": {
    "components": ["亻", "覀"],
    "equation": "亻 (Nhân - con người định đoạt) + 覀 (Tây/Giản thể của 賈 - buôn bán đánh giá món hàng)",
    "mnemonic": "Con người (亻) dựa trên độ hiếm và công sức để ấn định mức trao đổi cho món hàng (覀), giá cả, giá trị.",
    "illustration": {
      "badge": "🏷️",
      "concept": "Thẻ gắn giá trị",
      "visualDesc": "Chiếc thẻ treo đề mức giá rõ ràng gắn trên món đồ cao cấp."
    }
  },
  "侮": {
    "components": ["亻", "毎"],
    "equation": "亻 (Nhân - người kiêu căng) + 毎 (Mỗi - coi ai cũng tầm thường như nhau)",
    "mnemonic": "Kẻ kiêu ngạo (亻) nhìn ai xung quanh (毎) cũng cảm thấy thấp kém hơn mình, coi khinh, lăng mạ, vũ nhục.",
    "illustration": {
      "badge": "😒",
      "concept": "Ánh mắt coi thường",
      "visualDesc": "Khuôn mặt quay đi với ánh nhìn hờ hững khinh mạn."
    }
  },
  "侯": {
    "components": ["亻", "矢"],
    "equation": "亻 (Nhân - cung thủ bắn bia) + 矢 (Thỉ - mũi tên nhắm trúng bia đích)",
    "mnemonic": "Người xạ thủ thiện nghệ (亻) bắn tên trúng bia đích (矢) được triều đình ban phong tước vị, tước Hầu, chư hầu.",
    "illustration": {
      "badge": "🎯",
      "concept": "Bắn trúng bia đích phong tước",
      "visualDesc": "Mũi tên cắm phập vào hồng tâm chiếc bia vinh danh tài ba xuất chúng."
    }
  },
  "侵": {
    "components": ["亻", "帚", "又"],
    "equation": "亻 (Nhân - kẻ lạ mặt) + 帚-又 (Cầm chổi quét sạch, lấn tới từng bước)",
    "mnemonic": "Kẻ xấu (亻) từng bước lấn dần bờ cõi tựa như đưa chổi quét dọn chiếm đoạt đất đai, xâm lăng, xâm lấn.",
    "illustration": {
      "badge": "⚔️",
      "concept": "Quân xâm lấn biên cương",
      "visualDesc": "Bàn cờ chiến lược với mũi tên tấn công tràn qua đường ranh giới."
    }
  },
  "促": {
    "components": ["亻", "足"],
    "equation": "亻 (Nhân - người hối hả) + 足 (Túc - đôi chân bước dồn dập)",
    "mnemonic": "Người (亻) giậm chân liên tục (足) giục giã mọi người phải nhanh tay khẩn trương, thúc giục, xúc tiến.",
    "illustration": {
      "badge": "⏱️",
      "concept": "Đồng hồ bấm giờ hối thúc",
      "visualDesc": "Chiếc đồng hồ cát đang chảy vội từng hạt giục giã thời gian."
    }
  },
  "俊": {
    "components": ["亻", "夋"],
    "equation": "亻 (Nhân - con người) + 夋 (Thuấn - dáng đi đĩnh đạc phi phàm, vượt lên trên)",
    "mnemonic": "Người (亻) có khí chất đĩnh đạc và tài ba nổi trội vượt bậc hơn người bình thường (夋), tuấn tú, tuấn kiệt.",
    "illustration": {
      "badge": "🌟",
      "concept": "Nhân tài tuấn kiệt",
      "visualDesc": "Ngôi sao sáng lấp lánh trên vương miện của bậc tài năng xuất chúng."
    }
  },
  "俗": {
    "components": ["亻", "谷"],
    "equation": "亻 (Nhân - cư dân sinh sống) + 谷 (Cốc - thung lũng thôn làng)",
    "mnemonic": "Lối sống và thói quen bình dị của những người (亻) cùng chung sống trong một thung lũng (谷), phong tục, trần tục.",
    "illustration": {
      "badge": "🏮",
      "concept": "Lễ hội phong tục làng",
      "visualDesc": "Lồng đèn lễ hội truyền thống thắp sáng khắp các nẻo đường thôn xóm."
    }
  },
  "保": {
    "components": ["亻", "呆"],
    "equation": "亻 (Nhân - người mẹ) ôm ấp che chở đứa con thơ trên lưng (呆)",
    "mnemonic": "Người lớn (亻) ôm bế chở che cho em bé thơ ngây trong vòng tay ấm áp, bảo vệ, bảo hộ, gìn giữ.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Vòng tay che chở",
      "visualDesc": "Vòng tay ôm trọn nâng niu mầm non nhỏ bảo vệ trước giông bão."
    }
  },
  "修": {
    "components": ["亻", "攸", "彡"],
    "equation": "亻 (Nhân - con người) + 攸 (Bàn tay lau rửa nước) + 彡 (Nét vuốt óng ả trau chuốt)",
    "mnemonic": "Con người (亻) rửa sạch bụi bẩn và trau chuốt từng đường nét (彡) cho hoàn mỹ, tu sửa, tu dưỡng tâm tính.",
    "illustration": {
      "badge": "🧘",
      "concept": "Tu dưỡng tâm tính",
      "visualDesc": "Người ngồi thiền tĩnh tọa dưới tán thông xanh thanh tịnh rèn giũa nội tâm."
    }
  },
  "俳": {
    "components": ["亻", "非"],
    "equation": "亻 (Nhân - nghệ sĩ biểu diễn) + 非 (Phi - khác thường, cánh bay ngược hướng tạo tiếng cười)",
    "mnemonic": "Người nghệ sĩ (亻) dùng những câu chữ độc đáo khác lạ (非) tạo nên thể thơ thâm thúy dí dỏm, thơ Haiku, bài kịch.",
    "illustration": {
      "badge": "📜",
      "concept": "Thơ Haiku truyền thống",
      "visualDesc": "Bản thư pháp thơ Haiku ba câu ngắn gọn bên đóa hoa trà đỏ thắm."
    }
  },
  "俵": {
    "components": ["亻", "表"],
    "equation": "亻 (Nhân - người nông dân) + 表 (Biểu - phô bày ra bên ngoài lớp vỏ rơm)",
    "mnemonic": "Người nông dân (亻) bện lớp rơm rạ bên ngoài (表) thành bao tròn để đóng kiện lúa gạo đem nộp, bao rơm đựng thóc.",
    "illustration": {
      "badge": "🌾",
      "concept": "Bao thóc bện rơm",
      "visualDesc": "Những bao thóc rơm tròn truyền thống xếp ngay ngắn trong kho chứa thóc."
    }
  },
  "俸": {
    "components": ["亻", "奉"],
    "equation": "亻 (Nhân - viên quan cống hiến) + 奉 (Phụng - hai tay kính cẩn dâng lên lễ vật)",
    "mnemonic": "Khoản đãi ngộ triều đình hai tay ban tặng (奉) cho viên quan mẫn cán (亻), bổng lộc, tiền lương.",
    "illustration": {
      "badge": "💰",
      "concept": "Bổng lộc triều đình",
      "visualDesc": "Túi gấm thêu vàng đựng tiền thưởng bổng lộc triều đình ban thưởng."
    }
  },
  "倉": {
    "components": ["人", "𠮤", "口"],
    "equation": "Tượng hình nhà kho có mái nhọn che mưa gió (人), cửa thông gió và cửa ra vào lấy thóc (口)",
    "mnemonic": "Ngôi nhà kiên cố có mái che và cửa kín gió để cất trữ ngũ cốc ấm no qua mùa đông, kho thóc, thương khố.",
    "illustration": {
      "badge": "🌾",
      "concept": "Kho thóc nhà nông",
      "visualDesc": "Nhà kho gỗ kiên cố chứa đầy các bao thóc vàng óng sau mùa gặt."
    }
  },
  "倖": {
    "components": ["亻", "幸"],
    "equation": "亻 (Nhân - người may mắn) + 幸 (Hạnh - niềm hạnh phúc ngập tràn)",
    "mnemonic": "Người (亻) được thần may mắn mỉm cười ban cho vận tốt bất ngờ (幸), may mắn, hãnh diện, sủng hạnh.",
    "illustration": {
      "badge": "🍀",
      "concept": "Cỏ bốn lá may mắn",
      "visualDesc": "Nhành cỏ bốn lá xanh biếc đem lại vận may ngập tràn cho người tìm thấy."
    }
  },
  "倣": {
    "components": ["亻", "放"],
    "equation": "亻 (Nhân - người học việc) + 放 (Phóng - phỏng theo phương hướng của bậc thầy)",
    "mnemonic": "Người học việc (亻) làm theo đúng từng động tác mẫu mực mà người thầy chỉ dẫn (放), mô phỏng, noi gương.",
    "illustration": {
      "badge": "🪞",
      "concept": "Hình ảnh phản chiếu mô phỏng",
      "visualDesc": "Gương soi phản chiếu từng động tác chuẩn xác giúp người tập noi theo."
    }
  },
  "倫": {
    "components": ["亻", "侖"],
    "equation": "亻 (Nhân - con người trong xã hội) + 侖 (Lôn - sắp xếp các thẻ tre trật tự ngăn nắp)",
    "mnemonic": "Mối quan hệ giữa con người (亻) được xếp đặt chuẩn mực, trật tự như từng thanh thẻ sách (侖), luân lý, đạo đức.",
    "illustration": {
      "badge": "📜",
      "concept": "Cuộn sách luân lý đạo đức",
      "visualDesc": "Cuốn sách đạo đức thẻ tre mở ra ghi chép các chuẩn mực ứng xử con người."
    }
  },
  "倭": {
    "components": ["亻", "委"],
    "equation": "亻 (Nhân - người dân phương đông) + 委 (Ủy - cúi mình mềm dẻo như lúa chín)",
    "mnemonic": "Những con người (亻) có phong thái mềm mỏng, cúi chào khiêm nhường (委), nước Oa (Nhật Bản thời cổ).",
    "illustration": {
      "badge": "🗾",
      "concept": "Quần đảo Oa quốc thời cổ",
      "visualDesc": "Bản đồ cổ quần đảo Nhật Bản thời sơ khai trong sương mờ biển đông."
    }
  },
  "倹": {
    "components": ["亻", "僉"],
    "equation": "亻 (Nhân - con người) + 僉 (Thiêm - tập hợp gom góp mọi thứ nhỏ lại)",
    "mnemonic": "Người (亻) biết gom góp chắt chiu từng đồng tiền hạt thóc không phung phí (僉), tiết kiệm, cần kiệm.",
    "illustration": {
      "badge": "👛",
      "concept": "Chiếc ví tiết kiệm",
      "visualDesc": "Chiếc ví tiền nhỏ xinh được quản lý chi tiêu cẩn thận và chừng mực."
    }
  },
  "偏": {
    "components": ["亻", "扁"],
    "equation": "亻 (Nhân - người thiếu công tâm) + 扁 (Biển - tấm biển nghiêng lệch một bên)",
    "mnemonic": "Con người (亻) có cái nhìn nghiêng ngả về một phía như tấm biển lệch (扁), thiên lệch, thiên vị.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Cán cân bị lệch",
      "visualDesc": "Cán cân nghiêng hẳn về một phía thể hiện sự bất công thiếu cân bằng."
    }
  },
  "健": {
    "components": ["亻", "建"],
    "equation": "亻 (Nhân - con người) + 建 (Kiến - dựng xây vững chãi)",
    "mnemonic": "Người (亻) có thể lực và ý chí vững vàng tựa công trình được xây dựng kiên cố (建), khỏe mạnh, tráng kiện.",
    "illustration": {
      "badge": "💪",
      "concept": "Cánh tay khỏe khoắn",
      "visualDesc": "Cơ bắp cánh tay rắn chắc thể hiện sức khỏe dồi dào và bền bỉ."
    }
  },
  "偲": {
    "components": ["亻", "思"],
    "equation": "亻 (Nhân - con người lắng đọng) + 思 (Tư - suy nghĩ sâu lắng từ đáy lòng)",
    "mnemonic": "Con người (亻) lắng lòng chìm đắm trong những hoài niệm và suy tư sâu sắc (思), hoài nhớ, tưởng nhớ.",
    "illustration": {
      "badge": "💭",
      "concept": "Ký ức hoài niệm",
      "visualDesc": "Bóng người ngồi bên ô cửa sổ mưa rơi ngẫm về những kỷ niệm êm đềm xưa."
    }
  },
  "偵": {
    "components": ["亻", "貞"],
    "equation": "亻 (Nhân - người theo dõi) + 貞 (Trinh - chăm chú bói toán quan sát điềm triệu)",
    "mnemonic": "Người (亻) âm thầm chăm chú quan sát mọi động tĩnh để tìm kiếm sự thật (貞), trinh thám, do thám.",
    "illustration": {
      "badge": "🔍",
      "concept": "Kính lúp thám tử",
      "visualDesc": "Chiếc kính lúp soi rọi từng manh mối tinh vi trên hiện trường."
    }
  },
  "偽": {
    "components": ["亻", "為"],
    "equation": "亻 (Nhân - con người làm ra) + 為 (Vi - hành vi nhân tạo gượng ép)",
    "mnemonic": "Hành vi do con người cố ý làm ra giả tạo (亻-為) chứ không phải tự nhiên vốn có, ngụy tạo, đồ giả.",
    "illustration": {
      "badge": "🎭",
      "concept": "Mặt nạ ngụy tạo",
      "visualDesc": "Khuôn mặt tươi cười bằng thạch cao bóc ra làm lộ sự thật đằng sau."
    }
  },
  "傍": {
    "components": ["亻", "旁"],
    "equation": "亻 (Nhân - người đứng bên) + 旁 (Bàng - bốn phía xung quanh)",
    "mnemonic": "Người (亻) đứng ngay sát bên cạnh quan sát sự việc (旁), bên cạnh, đứng ngoài bàng quan.",
    "illustration": {
      "badge": "🧍",
      "concept": "Người đứng bên cạnh",
      "visualDesc": "Bóng người đứng tựa lan can bên hè phố ngắm dòng đời xuôi ngược."
    }
  },
  "傑": {
    "components": ["亻", "桀"],
    "equation": "亻 (Nhân - con người) + 桀 (Kiệt - con chim đậu trên cành cây cao nhất)",
    "mnemonic": "Người (亻) đứng ở đỉnh cao vút trội hơn muôn người xung quanh (桀), kiệt xuất, hào kiệt.",
    "illustration": {
      "badge": "🏆",
      "concept": "Ngọn đuốc anh kiệt",
      "visualDesc": "Ngọn cờ tung bay trên đỉnh núi tuyết cao nhất ghi dấu bước chân anh kiệt."
    }
  },
  "傘": {
    "components": ["人", "𠈌", "十"],
    "equation": "人 (Mái ô cong) che chở cho nhiều người bên dưới (𠈌) cắm trên thân cán ô (十)",
    "mnemonic": "Mái vải rộng xòe ra che mát cho cả gia đình gắn trên cán cầm thẳng đứng, chiếc dù, cái ô.",
    "illustration": {
      "badge": "☂️",
      "concept": "Chiếc ô che mưa",
      "visualDesc": "Chiếc ô trong suốt mở ra che chở giọt mưa tí tách rơi trên phố."
    }
  },
  "催": {
    "components": ["亻", "崔"],
    "equation": "亻 (Nhân - người điều hành) + 崔 (Thôi - vách núi cao nhô lên thôi thúc)",
    "mnemonic": "Người đứng ra (亻) kêu gọi và thúc giục mọi người tề tựu tổ chức sự kiện lớn (崔), tổ chức, thôi thúc.",
    "illustration": {
      "badge": "🎪",
      "concept": "Sân khấu tổ chức sự kiện",
      "visualDesc": "Hội chợ rực rỡ sắc màu được chuẩn bị công phu sẵn sàng đón khách."
    }
  },
  "債": {
    "components": ["亻", "責"],
    "equation": "亻 (Nhân - con người) + 責 (Trách - trách nhiệm tiền bạc phải hoàn trả)",
    "mnemonic": "Trách nhiệm tiền bạc (責) mà một người (亻) vay mượn phải gánh vác chi trả sòng phẳng, nợ nần, trái phiếu.",
    "illustration": {
      "badge": "📜",
      "concept": "Tờ giấy ghi nợ",
      "visualDesc": "Hợp đồng vay vốn được đóng dấu niêm phong cam kết thanh toán."
    }
  },
  "傷": {
    "components": ["亻", "𥏫"],
    "equation": "亻 (Nhân - cơ thể con người) + 𥏫 (Thương - mũi tên bắn trúng làm xây xát)",
    "mnemonic": "Cơ thể con người (亻) bị vật nhọn va chạm để lại vết rách đau đớn, vết thương, tổn thương.",
    "illustration": {
      "badge": "🩹",
      "concept": "Băng dán vết thương",
      "visualDesc": "Miếng băng y tế dán nhẹ nhàng lên vết trầy xước đang hồi phục."
    }
  },
  "僕": {
    "components": ["亻", "菐"],
    "equation": "亻 (Nhân - người hầu việc) + 菐 (Bộc - cầm bó chổi quét dọn trong nhà)",
    "mnemonic": "Người cầm chổi làm công việc quét dọn khiêm nhường (亻-菐), xưng hô khiêm tốn 'tôi', nô bộc.",
    "illustration": {
      "badge": "🙋‍♂️",
      "concept": "Chàng trai xưng tôi",
      "visualDesc": "Chàng trai trẻ tươi cười giơ tay xưng 'boku' trong giao tiếp thân thiện."
    }
  },
  "僚": {
    "components": ["亻", "尞"],
    "equation": "亻 (Nhân - người đồng sự) + 尞 (Liêu - ngọn lửa thắp sáng làm việc thâu đêm)",
    "mnemonic": "Những người (亻) cùng nhau thắp đèn làm việc sát cánh thâu đêm suốt sáng (尞), đồng nghiệp, quan liêu.",
    "illustration": {
      "badge": "💼",
      "concept": "Đồng nghiệp công sở",
      "visualDesc": "Hai đồng nghiệp đang hào hứng thảo luận dự án bên bàn làm việc văn phòng."
    }
  },
  "僧": {
    "components": ["亻", "曽"],
    "equation": "亻 (Nhân - con người tu hành) + 曽 (Tăng - chồng chất công đức theo năm tháng)",
    "mnemonic": "Người (亻) tích lũy công đức tu tập ngày một dày dặn (曽) để cứu độ chúng sinh, tăng lữ, nhà sư.",
    "illustration": {
      "badge": "🧘‍♂️",
      "concept": "Nhà sư thiền hành",
      "visualDesc": "Vị hòa thượng khoác áo cà sa ung dung thiền hành nơi cửa chùa thanh tịnh."
    }
  },
  "儀": {
    "components": ["亻", "義"],
    "equation": "亻 (Nhân - con người) + 義 (Nghĩa - đạo lý mẫu mực, chính trực)",
    "mnemonic": "Phong thái cử chỉ chuẩn mực và đàng hoàng của con người (亻) biểu đạt đạo nghĩa sáng ngời (義), lễ nghi, nghi thức.",
    "illustration": {
      "badge": "🎎",
      "concept": "Nghi lễ truyền thống",
      "visualDesc": "Buổi lễ trà đạo trang nghiêm với từng bước cử chỉ chuẩn mực thanh cao."
    }
  },
  "儒": {
    "components": ["亻", "需"],
    "equation": "亻 (Nhân - học giả uyên thâm) + 需 (Nhu - cơn mưa tri thức nhân gian cần đón nhận)",
    "mnemonic": "Người học rộng tài cao (亻) đem nguồn tri thức như mưa tưới mát lòng người (需), nhà nho, Nho giáo.",
    "illustration": {
      "badge": "📜",
      "concept": "Thư tịch Nho gia",
      "visualDesc": "Cuốn sách cổ Nho gia với bút lông nghiên mực của bậc túc nho."
    }
  },
  "償": {
    "components": ["亻", "賞"],
    "equation": "亻 (Nhân - con người) + 賞 (Thưởng - tiền của trao thưởng đền đáp)",
    "mnemonic": "Con người (亻) trao trả vật phẩm tiền bạc xứng đáng (賞) để bù đắp thiệt hại đã gây ra, bồi thường, đền bù.",
    "illustration": {
      "badge": "🤝",
      "concept": "Bồi thường thỏa đáng",
      "visualDesc": "Việc trao trả khoản bồi thường minh bạch giúp hàn gắn sự cố."
    }
  },
  "允": {
    "components": ["厶", "儿"],
    "equation": "厶 (Khí chất công minh) + 儿 (Con người hành động quang minh chính đại)",
    "mnemonic": "Lời nói và hành động thỏa đáng hợp lý được mọi người gật đầu phê chuẩn, chấp thuận, chuẩn doãn.",
    "illustration": {
      "badge": "✅",
      "concept": "Dấu ấn chấp thuận",
      "visualDesc": "Con dấu đỏ son phê chuẩn văn bản được đóng dứt khoát trên trang giấy."
    }
  },
  "充": {
    "components": ["亠", "厶", "儿"],
    "equation": "Đứa trẻ sơ sinh lớn lên đầy đặn da thịt khỏe mạnh phát triển toàn diện",
    "mnemonic": "Được nuôi dưỡng đầy đặn trọn vẹn từ nhỏ đến lớn, ngập tràn, sung túc, nạp đầy pin điện.",
    "illustration": {
      "badge": "🔋",
      "concept": "Nạp đầy năng lượng",
      "visualDesc": "Cột pin hiển thị 100% màu xanh lá biểu thị dung lượng tràn đầy."
    }
  },
  "克": {
    "components": ["古", "儿"],
    "equation": "古 (Mũ giáp nặng nề của chiến binh) đội trên đôi chân vững vàng của con người (儿)",
    "mnemonic": "Người chiến binh đội chiếc mũ giáp sắt nặng nề vẫn kiên cường vững bước chiến thắng gian nguy, khắc phục.",
    "illustration": {
      "badge": "🧗",
      "concept": "Khắc phục đỉnh cao",
      "visualDesc": "Vận động viên leo núi bền bỉ chinh phục mỏm đá dựng đứng hiểm trở."
    }
  },
  "免": {
    "components": ["免"],
    "equation": "免 (Tượng hình người cởi bỏ chiếc mũ giáp sắt nặng nề giải phóng gánh nặng)",
    "mnemonic": "Cởi bỏ mũ giáp và gánh nặng ràng buộc trên người để được tự do thanh thản, miễn trừ, tránh khỏi.",
    "illustration": {
      "badge": "🎫",
      "concept": "Vé miễn phí ưu đãi",
      "visualDesc": "Tấm vé miễn trừ vé vào cổng đặc cách cho khách danh dự."
    }
  },
  "典": {
    "components": ["曲", "一", "八"],
    "equation": "曲 (Những cuộn sách thẻ tre quý) đặt trang trọng trên bàn đỡ hai chân (一-八)",
    "mnemonic": "Những bộ sách cổ thẻ tre quý giá được đặt trang trọng trên bệ thờ để lưu truyền muôn đời, kinh điển, tự điển.",
    "illustration": {
      "badge": "📚",
      "concept": "Bộ sách kinh điển",
      "visualDesc": "Bộ đại từ điển bìa da mạ vàng đứng kiêu hãnh trên giá sách gỗ."
    }
  },
  "兼": {
    "components": ["兼"],
    "equation": "兼 (Một bàn tay nắm giữ cùng lúc hai bông lúa trĩu hạt)",
    "mnemonic": "Một tay nắm trọn hai bó lúa cùng một lúc, gánh vác cả hai việc song hành, kiêm nhiệm, gồm cả.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Đảm đương hai vai",
      "visualDesc": "Chiếc cặp xách và tập hồ sơ biểu trưng cho người đảm đương nhiều trọng trách."
    }
  },
  "冒": {
    "components": ["日", "目"],
    "equation": "日 (Chiếc mũ trùm kín mắt) + 目 (Đôi mắt nhìn xuyên qua để tiến tới)",
    "mnemonic": "Đội mũ che khuất mắt vẫn dấn thân lao về phía trước bất chấp hiểm nguy, mạo hiểm, mạo muội.",
    "illustration": {
      "badge": "🧗‍♂️",
      "concept": "Dấn thân mạo hiểm",
      "visualDesc": "Nhà thám hiểm bước qua cầu dây treo bắc ngang vực thẳm cheo leo."
    }
  },
  "冗": {
    "components": ["冖", "几"],
    "equation": "冖 (Dưới mái nhà trống) + 几 (Bàn ghế trống không có việc gì làm)",
    "mnemonic": "Ngồi không nhàn rỗi dưới mái nhà (冖-几) không tạo ra giá trị, thừa thãi, rườm rà vô bổ.",
    "illustration": {
      "badge": "🗑️",
      "concept": "Cắt bỏ chi tiết thừa",
      "visualDesc": "Cây bút gạch đi những câu chữ rườm rà giúp bài văn súc tích gãy gọn."
    }
  },
  "冠": {
    "components": ["冖", "元", "寸"],
    "equation": "冖 (Mũ che đầu) + 元 (Đầu người) + 寸 (Bàn tay tự tay đội mũ làm lễ trưởng thành)",
    "mnemonic": "Bàn tay trịnh trọng đặt chiếc mũ lễ lên đầu chàng trai trong lễ thành nhân, mũ miện, đứng đầu, quán quân.",
    "illustration": {
      "badge": "👑",
      "concept": "Vương miện quán quân",
      "visualDesc": "Chiếc vương miện vàng nạm đá quý lấp lánh trao cho người chiến thắng số một."
    }
  },
  "冴": {
    "components": ["冫", "牙"],
    "equation": "冫 (Băng - giá lạnh thấu xương) + 牙 (Nha - chiếc răng sắc nhọn nghiến lại)",
    "mnemonic": "Gió lạnh buốt giá (冫) làm người ta run rẩy nghiến chặt răng (牙) nhưng đầu óc lại tỉnh táo lạ thường, sắc sảo, lạnh buốt.",
    "illustration": {
      "badge": "❄️",
      "concept": "Bông tuyết lạnh sắc",
      "visualDesc": "Tinh thể băng trong veo lấp lánh phản chiếu ánh sáng sắc lẹm."
    }
  },
  "冶": {
    "components": ["冫", "台"],
    "equation": "冫 (Băng lạnh tôi nguội kim loại) + 台 (Bệ lò nung đúc kim loại)",
    "mnemonic": "Kim loại nóng chảy từ lò đúc (台) được tôi qua nước lạnh (冫) để trở nên cứng cáp bền bỉ, rèn đúc, luyện kim.",
    "illustration": {
      "badge": "🔥",
      "concept": "Lò rèn luyện kim",
      "visualDesc": "Búa nện chan chát lên thanh sắt đỏ rực tạo tia lửa tung tóe trong lò rèn."
    }
  },
  "准": {
    "components": ["冫", "隹"],
    "equation": "冫 (Băng giá giữ nguyên độ phẳng lạnh) + 隹 (Chim nhạn bay theo hàng lối trật tự)",
    "mnemonic": "Giữ chuẩn mực vững chãi như băng (冫) và bay đúng hàng lối như đàn chim (隹), chuẩn y, phê chuẩn.",
    "illustration": {
      "badge": "📑",
      "concept": "Phê chuẩn giấy tờ",
      "visualDesc": "Hồ sơ được ký duyệt và đóng dấu phê chuẩn hợp lệ."
    }
  },
  "凌": {
    "components": ["冫", "夌"],
    "equation": "冫 (Băng tuyết lạnh giá) + 夌 (Lăng - trèo lên ngọn đồi dốc đứng)",
    "mnemonic": "Bất chấp băng tuyết trơn trượt (冫) vẫn kiên cường trèo vượt qua đỉnh núi hiểm trở (夌), lấn át, vượt qua.",
    "illustration": {
      "badge": "🏔️",
      "concept": "Vượt đỉnh núi tuyết",
      "visualDesc": "Người leo núi cắm cờ chiến thắng trên mỏm núi tuyết sừng sững."
    }
  },
  "凜": {
    "components": ["冫", "稟"],
    "equation": "冫 (Băng - giá lạnh) + 稟 (Lẫm - kho thóc đóng cửa kiểm kê nghiêm ngặt)",
    "mnemonic": "Khí trời rét buốt như băng (冫) khiến người đứng nghiêm trang canh gác trước kho lương (稟), lẫm liệt, uy nghiêm.",
    "illustration": {
      "badge": "⚔️",
      "concept": "Tướng quân lẫm liệt",
      "visualDesc": "Vị dũng tướng đứng hiên ngang trong bão tuyết với phong thái uy nghi."
    }
  },
  "凝": {
    "components": ["冫", "疑"],
    "equation": "冫 (Băng giá đông cứng) + 疑 (Nghi - đứng sững lại ngẫm nghĩ do dự)",
    "mnemonic": "Đứng sững người chăm chú suy ngẫm (疑) như dòng nước bị đóng băng ngưng đọng lại một chỗ (冫), ngưng tụ, tập trung.",
    "illustration": {
      "badge": "🧊",
      "concept": "Giọt sương ngưng tụ",
      "visualDesc": "Giọt nước trong suốt đọng lại trên đầu nhọn chiếc lá mùa thu."
    }
  },
  "凡": {
    "components": ["凡"],
    "equation": "凡 (Tượng hình cánh buồm đón gió bao trùm gom lại mọi thứ)",
    "mnemonic": "Cánh buồm mở rộng hứng trọn mọi làn gió thổi qua, nói chung, tất cả, người bình thường, phàm nhân.",
    "illustration": {
      "badge": "⛵",
      "concept": "Cánh buồm đón gió",
      "visualDesc": "Cánh buồm trắng căng gió lướt đi trên mặt biển thanh bình."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n1aData)) {
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

console.log(`[Batch 5A - N1 Part 1] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n1aData).length} chữ Kanji N1.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
