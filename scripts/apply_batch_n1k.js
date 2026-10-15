/**
 * Batch 5K: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 95 chữ Kanji N1 tiếp theo (từ 蓄 đến 貫)
 */

const fs = require('fs');
const path = require('path');

const n1kData = {
  "蓄": {
    "components": ["艹", "畜"],
    "equation": "艹 (Cỏ khô dự trữ) cho đàn gia súc (畜) ăn qua mùa đông",
    "mnemonic": "Thu gom cỏ rơm và lương thực tích trữ dành dụm cho ngày mai cần dùng, tích trữ, tiết kiệm, súc tích súc sản.",
    "illustration": {
      "badge": "🏦",
      "concept": "Tích lũy tiền tiết kiệm",
      "visualDesc": "Chú heo đất tròn xinh được tích lũy từng đồng xu vàng óng ả."
    }
  },
  "蓉": {
    "components": ["艹", "容"],
    "equation": "艹 (Đóa hoa) có dung nhan bao dung tươi đẹp (容) tựa đóa sen ngọc",
    "mnemonic": "Đóa hoa phù dung thanh khiết kiêu sa hé nở khoe sắc trong sương sớm, hoa phù dung, sen thơm phù dung.",
    "illustration": {
      "badge": "🪷",
      "concept": "Đóa phù dung kiêu sa trong nắng",
      "visualDesc": "Đóa hoa phù dung hồng thắm bung nở mềm mại soi bóng trên mặt nước hồ thu."
    }
  },
  "蓮": {
    "components": ["艹", "連"],
    "equation": "艹 (Cây hoa) có ngó sen liên tục nối kết dài dưới lớp bùn lầy (連)",
    "mnemonic": "Gần bùn mà chẳng hôi tanh mùi bùn, đóa sen thơm ngát vươn lên đón nắng mai, hoa sen, liên hoa (renge).",
    "illustration": {
      "badge": "🪷",
      "concept": "Bông sen hồng thanh khiết",
      "visualDesc": "Đóa sen hồng tao nhã vươn cao trên chiếc lá sen xanh tròn mướt giữa đầm nước tĩnh lặng."
    }
  },
  "蔦": {
    "components": ["艹", "鳥"],
    "equation": "艹 (Cây leo có lá xanh) mọc leo thoăn thoắt trên cao tựa chim đậu (鳥)",
    "mnemonic": "Loài cây dây leo xanh mướt ôm chặt vách tường gạch cổ kính chuyển sắc đỏ khi thu sang, dây thường xuân, cây leo (tsuta).",
    "illustration": {
      "badge": "🌿",
      "concept": "Dây thường xuân leo tường gạch",
      "visualDesc": "Thảm lá thường xuân xanh biếc bò phủ kín bức tường đá cổ kính của ngôi biệt thự."
    }
  },
  "蕉": {
    "components": ["艹", "焦"],
    "equation": "艹 (Cây chuối) có phiến lá to bản cháy sém xơ xác sau cơn bão (焦)",
    "mnemonic": "Tán lá chuối đong đưa trong gió và bút danh của thi hào haiku vĩ đại Matsuo Bashō, cây chuối, thi nhân Bashō.",
    "illustration": {
      "badge": "🍌",
      "concept": "Tán lá chuối xanh ngắt trong mưa",
      "visualDesc": "Tàu lá chuối rộng lớn đọng từng giọt mưa long lanh gợi nguồn cảm hứng thơ haiku."
    }
  },
  "蕗": {
    "components": ["艹", "路"],
    "equation": "艹 (Cây thảo mộc) mọc hoang dại dọc theo lối đi con đường (路)",
    "mnemonic": "Cây bơ gai hoang dã mọc ven đường mùa xuân hái cuống nấu món luộc giòn ngọt, rau fuki, cây bơ gai (fuki).",
    "illustration": {
      "badge": "🥬",
      "concept": "Cây rau fuki mùa xuân xanh non",
      "visualDesc": "Búp non fukinotō nhú lên khỏi lớp tuyết tan báo hiệu mùa xuân ấm áp đang về."
    }
  },
  "薦": {
    "components": ["艹", "廌"],
    "equation": "艹 (Cỏ non tươi tốt) dâng lên loài linh thú công minh (廌) thưởng thức",
    "mnemonic": "Dốc lòng giới thiệu người tài đức cho trọng trách phụng sự xã hội, tiến cử, giới thiệu, đệm cỏ.",
    "illustration": {
      "badge": "📜",
      "concept": "Thư tiến cử người hiền tài",
      "visualDesc": "Bức thư giới thiệu trang trọng tiến cử ứng viên xuất sắc vào vị trí xứng đáng."
    }
  },
  "薪": {
    "components": ["艹", "新"],
    "equation": "艹 (Cành cây trong rừng) mới chặt về (新) phơi khô dùng làm chất đốt",
    "mnemonic": "Những khúc gỗ khô bó chặt thành từng bó củi dùng nhóm bếp sưởi ấm mùa đông, củi đốt, bó củi khô (maki).",
    "illustration": {
      "badge": "🪵",
      "concept": "Đống củi gỗ xếp ngay ngắn",
      "visualDesc": "Những khúc củi khô bổ đều tăm tắp được chất thành đống bên hiên nhà sưởi ấm."
    }
  },
  "薫": {
    "components": ["艹", "重", "灬"],
    "equation": "艹 (Cây thảo mộc) đốt trên bếp than hồng (灬) tỏa ra hương thơm nồng nàn tầng tầng lớp lớp (重)",
    "mnemonic": "Làn khói trầm thơm ngát lan tỏa làm dịu lắng tâm can và ướp hương đời sống, hương thơm ngào ngạt, hun khói, huân đào.",
    "illustration": {
      "badge": "🌿",
      "concept": "Làn khói trầm hương thơm ngát",
      "visualDesc": "Lư hương gốm tỏa làn khói trầm mỏng manh thơm ngát khắp gian phòng thanh tịnh."
    }
  },
  "藍": {
    "components": ["艹", "監"],
    "equation": "艹 (Cây chàm thảo dược) đem ngâm trong chậu lớn soi gương (監) để chiết xuất sắc xanh",
    "mnemonic": "Cây chàm cho ra thuốc nhuộm màu xanh thẫm truyền thống của xứ sở hoa anh đào, cây chàm, màu xanh lam chàm (ai).",
    "illustration": {
      "badge": "💙",
      "concept": "Màu xanh chàm truyền thống Aizome",
      "visualDesc": "Tấm vải lụa nhuộm màu xanh chàm Aizome sâu thẳm phơi bay bổng dưới nắng hè."
    }
  },
  "藤": {
    "components": ["艹", "月", "𣸞"],
    "equation": "艹 (Dây leo thân gỗ) uốn lượn phập phồng (月) buông chùm hoa tím biếc rủ xuống như dòng nước chảy",
    "mnemonic": "Giàn hoa tử đằng rủ từng chùm tím biếc thơ mộng biểu tượng danh gia quý tộc Fujiwara, hoa tử đằng (fuji).",
    "illustration": {
      "badge": "💜",
      "concept": "Giàn hoa tử đằng tím ngát fuji",
      "visualDesc": "Từng chùm hoa tử đằng tím biếc rủ dài thơ mộng đung đưa trong gió xuân ngát hương."
    }
  },
  "藩": {
    "components": ["艹", "潘"],
    "equation": "艹 (Hàng rào cây xanh che chắn) bảo vệ vùng đất màu mỡ có nguồn nước tưới tiêu (潘)",
    "mnemonic": "Lãnh địa phong kiến tự trị do các lãnh chúa Daimyo cai quản thời Edo, lãnh địa phiên bang, phiên chủ.",
    "illustration": {
      "badge": "🏯",
      "concept": "Lâu đài lãnh chúa thời phong kiến",
      "visualDesc": "Tòa thành cổ uy nghiêm trung tâm của phiên trấn thời kỳ Mạc phủ Edo."
    }
  },
  "藻": {
    "components": ["艹", "澡"],
    "equation": "艹 (Thực vật thủy sinh) dập dềnh tắm mình trong dòng nước mát lành sạch sẽ (澡)",
    "mnemonic": "Loài thực vật xanh mướt dập dềnh dưới đáy sông hồ và biển cả nuôi dưỡng tôm cá, tảo biển, rong rêu (mo).",
    "illustration": {
      "badge": "🌿",
      "concept": "Thảm rong tảo xanh dưới đáy biển",
      "visualDesc": "Những dải rong tảo xanh mềm mại đung đưa nhẹ nhàng theo dòng hải lưu trong vắt."
    }
  },
  "蘭": {
    "components": ["艹", "闌"],
    "equation": "艹 (Loài hoa quý) nở rộ bên trong cánh cổng lan can che chắn (闌)",
    "mnemonic": "Đóa hoa phong lan kiêu sa quý phái và tên gọi xứ sở hoa tulip Hà Lan, hoa phong lan, Hà Lan (ran).",
    "illustration": {
      "badge": "🌸",
      "concept": "Cành hoa phong lan quý phái",
      "visualDesc": "Cành phong lan trắng tinh khiết uốn lượn duyên dáng tỏa hương thơm tao nhã."
    }
  },
  "虎": {
    "components": ["虍", "儿"],
    "equation": "Đầu chúa sơn lâm vằn vện (虍) đứng vững trên hai chân sau lực lưỡng (儿)",
    "mnemonic": "Chúa sơn lâm dũng mãnh tiếng gầm vang dội làm kinh sợ muôn loài muông thú, con hổ, cọp dữ (tora).",
    "illustration": {
      "badge": "🐅",
      "concept": "Mãnh hổ vằn vàng uy dũng",
      "visualDesc": "Chú hổ dũng mãnh sải bước uy nghiêm giữa rừng già ánh mắt sáng quắc như đuốc."
    }
  },
  "虐": {
    "components": ["虍", "爪"],
    "equation": "Móng vuốt cọp dữ (虍) giáng đòn sắc bén (爪) xé nát con mồi",
    "mnemonic": "Hành vi tàn bạo độc ác dùng vũ lực chèn ép bắt nạt kẻ yếu thế, ngược đãi, tàn bạo, bạo ngược tàn nhẫn.",
    "illustration": {
      "badge": "⛓️",
      "concept": "Lên án hành vi ngược đãi tàn nhẫn",
      "visualDesc": "Dây xích bị bẻ gãy biểu trưng cho sự chấm dứt mọi hành vi áp bức ngược đãi."
    }
  },
  "虚": {
    "components": ["虍", "业"],
    "equation": "Bóng dáng con hổ (虍) đứng lẻ loi trên mỏm đồi trơ trọi trống không (业)",
    "mnemonic": "Khoảng không trống rỗng không có thực chất hoặc thái độ khiêm nhường lắng nghe, hư vô, trống rỗng, khiêm tốn hư tâm.",
    "illustration": {
      "badge": "🕳️",
      "concept": "Khoảng không gian hư vô trống rỗng",
      "visualDesc": "Căn phòng thiền trống trải tĩnh lặng giúp tâm trí trút bỏ mọi tạp niệm trở về hư không."
    }
  },
  "虜": {
    "components": ["虍", "男"],
    "equation": "Con hổ hung hãn (虍) quắp lấy người đàn ông lực lưỡng (男) bắt làm tù binh",
    "mnemonic": "Bị bắt giữ làm tù binh trong cuộc chiến hoặc bị vẻ đẹp làm say đắm ngây ngất, tù binh bị bắt, say đắm (toriko).",
    "illustration": {
      "badge": "⛓️",
      "concept": "Say đắm mê mẩn con tim",
      "visualDesc": "Trái tim bị cuốn hút say đắm trước vẻ đẹp tuyệt trần không thể rời mắt."
    }
  },
  "虞": {
    "components": ["虍", "呉"],
    "equation": "Nghe tiếng cọp gầm (虍) từ nước Ngô phương nam (呉) dấy lên mối lo ngại",
    "mnemonic": "Mối lo âu bất an sợ hãi nguy hiểm tiềm ẩn có thể xảy đến bất cứ lúc nào, lo sợ, e ngại, mối lo âu nguy hại.",
    "illustration": {
      "badge": "⚠️",
      "concept": "Mối lo ngại nguy cơ tiềm ẩn",
      "visualDesc": "Đám mây đen vần vũ nơi chân trời báo trước cơn bão sắp ập tới cần đề phòng."
    }
  },
  "虹": {
    "components": ["虫", "工"],
    "equation": "Con rồng rắn khổng lồ (虫) uốn mình bắc cây cầu vồng ngũ sắc (工) nối liền trời đất",
    "mnemonic": "Dải cầu vồng bảy sắc lung linh bắc ngang bầu trời sau cơn mưa rào mùa hạ, cầu vồng rực rỡ (niji).",
    "illustration": {
      "badge": "🌈",
      "concept": "Dải cầu vồng bảy sắc sau mưa",
      "visualDesc": "Cầu vồng bảy sắc rực rỡ uốn cong qua thung lũng xanh sau cơn mưa rào nắng ấm."
    }
  },
  "蚊": {
    "components": ["虫", "文"],
    "equation": "虫 (Con côn trùng nhỏ) bay vo ve phát ra âm thanh như đọc văn thơ (文)",
    "mnemonic": "Loài côn trùng nhỏ bé bay vo ve đốt đau nhói và hút máu trong đêm hè, con muỗi (ka).",
    "illustration": {
      "badge": "🦟",
      "concept": "Vòng hương muỗi đuổi côn trùng",
      "visualDesc": "Vòng hương muỗi katori senkō màu xanh tỏa làn khói nhẹ đuổi muỗi trong đêm hè thanh bình."
    }
  },
  "蚕": {
    "components": ["天", "虫"],
    "equation": "Loài côn trùng trời ban (天) thần kỳ (虫) ban tặng sợi tơ óng ả cho nhân gian",
    "mnemonic": "Chú tằm ăn lá dâu nhả ra những sợi tơ vàng quý giá dệt nên gấm vóc, con tằm dâu (kaiko).",
    "illustration": {
      "badge": "🐛",
      "concept": "Chú tằm xanh cần mẫn ăn lá dâu",
      "visualDesc": "Chú tằm béo tròn trắng muốt chăm chỉ gặm lá dâu xanh chuẩn bị nhả tơ kéo kén."
    }
  },
  "蛇": {
    "components": ["虫", "它"],
    "equation": "虫 (Loài bò sát) uốn lượn thân mình không chân trườn bò lẩn lút (它)",
    "mnemonic": "Loài bò sát thân dài uốn lượn di chuyển nhẹ nhàng trong bụi rậm, con rắn, xà vương (hebi).",
    "illustration": {
      "badge": "🐍",
      "concept": "Chú rắn xanh uốn lượn trên cành",
      "visualDesc": "Chú rắn lục xanh biếc uốn lượn thân mình mềm mại trên nhành cây rừng nhiệt đới."
    }
  },
  "蛍": {
    "components": ["艹", "冖", "虫"],
    "equation": "Loài côn trùng (虫) phát sáng lung linh dưới màn đêm (冖) như đóa hoa cỏ lấp lánh (艹)",
    "mnemonic": "Những đốm sáng lập lòe thần tiên bay lượn bên bờ suối trong đêm hè tĩnh mịch, đom đóm phát sáng (hotaru).",
    "illustration": {
      "badge": "✨",
      "concept": "Đom đóm lập lòe bên bờ suối hè",
      "visualDesc": "Bầy đom đóm thắp sáng màn đêm lung linh như ngàn vì sao sa bên dòng suối nhỏ."
    }
  },
  "蛮": {
    "components": ["亦", "虫"],
    "equation": "Tộc người thắt búi tóc đỏ (亦) tôn thờ rắn rết côn trùng (虫) chốn rừng sâu",
    "mnemonic": "Thói hung tợn thiếu văn minh của kẻ thích dùng vũ lực thô bạo, man rợ, dã man, man di mọi rợ.",
    "illustration": {
      "badge": "🪓",
      "concept": "Cảnh báo hành vi dã man thô bạo",
      "visualDesc": "Chiếc rìu đá thô sơ biểu trưng cho thời kỳ man rợ chưa được văn minh khai sáng."
    }
  },
  "蝶": {
    "components": ["虫", "枼"],
    "equation": "虫 (Loài côn trùng) có đôi cánh mỏng manh sặc sỡ như phiến lá cây (枼)",
    "mnemonic": "Đôi cánh rực rỡ muôn màu bay rập rờn hút mật từ nhụy hoa khoe sắc xuân, con bướm xinh đẹp (chōchō).",
    "illustration": {
      "badge": "🦋",
      "concept": "Cánh bướm ngũ sắc bay lượn bên hoa",
      "visualDesc": "Chú bướm xinh đẹp với đôi cánh rực rỡ sắc màu đang nhẹ nhàng đậu trên đóa hoa cúc vàng."
    }
  },
  "融": {
    "components": ["鬲", "虫"],
    "equation": "Đun nồi đồng ba chân (鬲) nung kim loại chảy mềm hòa quyện cuộn sóng như hơi thở (虫)",
    "mnemonic": "Nhiệt độ làm băng tuyết tan chảy hòa quyện vào nhau, dòng vốn tài chính lưu thông thông suốt, dung hòa, tan chảy, tài chính kin'yū.",
    "illustration": {
      "badge": "💳",
      "concept": "Dòng vốn tài chính dung thông lưu chuyển",
      "visualDesc": "Dòng chảy ánh sáng kết nối các tòa nhà ngân hàng biểu trưng cho hệ thống tài chính vững mạnh."
    }
  },
  "衆": {
    "components": ["血", "𧘇"],
    "equation": "Đông đảo muôn người (𧘇) cùng chung một dòng máu (血) đứng dưới ánh mặt trời",
    "mnemonic": "Đông đảo tầng lớp nhân dân cùng chung lòng chung sức xây dựng xã hội hòa bình, quần chúng, đại chúng, công chúng.",
    "illustration": {
      "badge": "👥",
      "concept": "Đông đảo quần chúng đoàn kết",
      "visualDesc": "Biển người chung tay vẫy cờ trong ngày hội lớn thể hiện sức mạnh đoàn kết của đại chúng."
    }
  },
  "街": {
    "components": ["彳", "圭", "亍"],
    "equation": "Hai bên bước chân đi lại (行) rộn ràng qua những mảnh đất san sát (圭)",
    "mnemonic": "Con đường phố tấp nập nhà cửa hàng quán nhộn nhịp người qua kẻ lại, đường phố, khu phố, thị trấn phồn hoa.",
    "illustration": {
      "badge": "🏙️",
      "concept": "Khu phố sầm uất rực rỡ ánh đèn",
      "visualDesc": "Con phố mua sắm rực rỡ biển hiệu ngập tràn người đi dạo trong buổi tối lung linh."
    }
  },
  "衛": {
    "components": ["行", "韋"],
    "equation": "Các đội tuần tra đi lại khắp lối (行) bọc ngoài vòng thành kiên cố (韋)",
    "mnemonic": "Canh gác cẩn mật bảo vệ an toàn cho lãnh thổ và giữ gìn thân thể sạch sẽ phòng bệnh, bảo vệ, phòng vệ, vệ sinh eisei.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Chiến binh bảo vệ cổng thành",
      "visualDesc": "Đội tuần tra trang phục chỉnh tề canh giữ bình yên cho nhân dân suốt ngày đêm."
    }
  },
  "衝": {
    "components": ["行", "重"],
    "equation": "Đi lại (行) với sức nặng ngàn cân lao tới (重) đâm sầm vào nhau",
    "mnemonic": "Hai luồng lực mạnh mẽ đâm sầm vào nhau tạo nên chấn động dữ dội, xung đột, va chạm, xung kích chấn động.",
    "illustration": {
      "badge": "💥",
      "concept": "Cú va chạm nảy lửa xung đột",
      "visualDesc": "Hai viên bi thép va chạm vào nhau bắn ra những tia sáng thể hiện lực xung kích mạnh."
    }
  },
  "衡": {
    "components": ["行", "⺈", "彑", "大"],
    "equation": "Thanh gỗ ngang bắc qua sừng bò (行) giữ cho hai bên cân bằng chuẩn xác",
    "mnemonic": "Chiếc đòn cân giữ thế thăng bằng không nghiêng lệch bên nào thể hiện sự công chính, cái cân thăng bằng, quân bình cân xứng.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Cán cân thăng bằng hoàn hảo",
      "visualDesc": "Chiếc cân đồng thăng bằng tuyệt đối hai bên đĩa biểu trưng cho sự hài hòa và công lý."
    }
  },
  "衰": {
    "components": ["衣", "𠀆"],
    "equation": "Chiếc áo tơi che mưa (衣) dùng lâu ngày xơ xác rách sờn từng mảnh",
    "mnemonic": "Sức lực và thời vận sau đỉnh cao dần dần suy giảm yếu ớt đi, suy tàn, suy giảm, sa sút suy vi.",
    "illustration": {
      "badge": "📉",
      "concept": "Đồ thị suy giảm sa sút",
      "visualDesc": "Chiếc lá vàng khô rụng khỏi cành mùa đông thể hiện quy luật suy tàn của vạn vật."
    }
  },
  "衷": {
    "components": ["衣", "中"],
    "equation": "Giấu kín tận đáy lòng sâu kín (中) sau lớp áo ấm (衣)",
    "mnemonic": "Tấm lòng chân thật xuất phát từ tận đáy con tim sâu thẳm, trong lòng, tâm can, chân thành tận đáy lòng.",
    "illustration": {
      "badge": "❤️",
      "concept": "Tấm lòng chân thành từ đáy tim",
      "visualDesc": "Bàn tay đặt lên ngực trái bày tỏ lời cảm ơn chân thành xuất phát từ tận đáy lòng."
    }
  },
  "衿": {
    "components": ["衤", "今"],
    "equation": "衤 (Vạt áo) khép lại ngay ngắn trang trọng ngay lúc này (今)",
    "mnemonic": "Cổ áo cài thẳng thớm ngay ngắn thể hiện phẩm giá thanh cao của người quân tử, cổ áo, tấm lòng trong sáng thanh bạch.",
    "illustration": {
      "badge": "👔",
      "concept": "Cổ áo sơ mi phẳng phiu chỉnh tề",
      "visualDesc": "Cổ áo sơ mi trắng tinh tươm thắt cà vạt chỉn chu toát lên vẻ đĩnh đạc tự tin."
    }
  },
  "袈": {
    "components": ["加", "衣"],
    "equation": "Thêm vào (加) nhiều mảnh vải vụn ghép lại thành chiếc áo nhà chùa (衣)",
    "mnemonic": "Tấm áo ghép từ nhiều mảnh vải nhạt màu đắp lên mình vị tu sĩ xuất gia, áo cà sa thanh tịnh (kesa).",
    "illustration": {
      "badge": "👘",
      "concept": "Tấm áo cà sa thanh tịnh kesa",
      "visualDesc": "Vị thiền sư khoác tấm áo cà sa màu vàng nâu giản dị bước đi trên con đường rợp bóng tùng."
    }
  },
  "裁": {
    "components": ["𢦏", "衣"],
    "equation": "Dùng kéo sắc (𢦏) cắt rời từng tấm vải may áo (衣) theo chuẩn kích thước",
    "mnemonic": "Cầm kéo đo cắt vải may áo và thẩm phán đưa ra phán quyết công bằng đúng luật, cắt may, phán xét, tài phán trọng tài.",
    "illustration": {
      "badge": "✂️",
      "concept": "Chiếc kéo vàng cắt may chuẩn xác",
      "visualDesc": "Chiếc kéo sắc bén lướt êm trên tấm vải lụa cắt theo đường phấn may chuẩn xác."
    }
  },
  "裂": {
    "components": ["列", "衣"],
    "equation": "列 (Tách rời thành từng hàng) làm tấm vải áo rách toạc ra (衣)",
    "mnemonic": "Tấm vải áo hoặc tảng đá bị lực giằng xé toác làm đôi nứt nẻ, xé rách, nứt toác, rạn nứt phân liệt.",
    "illustration": {
      "badge": "⚡",
      "concept": "Vết nứt toác xé rách mặt đất",
      "visualDesc": "Mặt đất nứt toác sau trận động đất chia đôi con đường thể hiện sức tàn phá dữ dội."
    }
  },
  "裕": {
    "components": ["衤", "谷"],
    "equation": "Áo quần may rộng rãi (衤) thênh thang như lòng thung lũng sâu (谷)",
    "mnemonic": "Áo quần rộng rãi thênh thang và cuộc sống đủ đầy không lo thiếu thốn, sung túc, dư dả, phong phú ung dung.",
    "illustration": {
      "badge": "🏡",
      "concept": "Cuộc sống ấm no sung túc dư dả",
      "visualDesc": "Căn nhà ấm cúng đầy ắp tiện nghi và nụ cười rạng rỡ của gia đình no đủ hạnh phúc."
    }
  },
  "裟": {
    "components": ["沙", "衣"],
    "equation": "Tấm áo may (衣) bằng lớp vải mộc mạc màu vàng cát đất (沙)",
    "mnemonic": "Chiếc áo cà sa nhuộm màu đất mộc mạc của bậc cao tăng buông bỏ bụi trần, chữ sa trong áo cà sa.",
    "illustration": {
      "badge": "🧘",
      "concept": "Chiếc áo sa nhuộm màu đất thanh đạm",
      "visualDesc": "Vạt áo cà sa màu nâu đất tung bay nhè nhẹ nơi cửa chùa cổ kính tĩnh mịch."
    }
  },
  "裸": {
    "components": ["衤", "果"],
    "equation": "衤 (Cởi bỏ toàn bộ áo xống) trần trụi trơn tuột như quả chín không vỏ (果)",
    "mnemonic": "Trút bỏ hết xiêm y để lộ thân thể nguyên sơ tự nhiên không chút che đậy, trần truồng, khỏa thân, trần trụi (hadaka).",
    "illustration": {
      "badge": "♨️",
      "concept": "Tắm suối nước nóng onsen trần trụi",
      "visualDesc": "Làn hơi nước onsen mờ ảo xoa dịu cơ thể thư giãn hoàn toàn hòa mình vào thiên nhiên."
    }
  },
  "製": {
    "components": ["制", "衣"],
    "equation": "Chế định khuôn khổ chuẩn mực (制) để cắt may hoàn thiện bộ y phục (衣)",
    "mnemonic": "Dùng bàn tay và máy móc tạo ra các sản phẩm hoàn chỉnh đạt tiêu chuẩn cao, chế tạo, sản xuất, hàng chế tác xuất xưởng.",
    "illustration": {
      "badge": "🏭",
      "concept": "Dây chuyền chế tạo hiện đại",
      "visualDesc": "Cánh tay robot chính xác từng mi-li-mét lắp ráp các linh kiện xe hơi cao cấp."
    }
  },
  "褐": {
    "components": ["衤", "曷"],
    "equation": "衤 (Áo vải dệt thô) phơi khô dưới ánh nắng mặt trời gay gắt (曷) ngả màu nâu đất",
    "mnemonic": "Màu nâu sẫm như vỏ hạt dẻ chín hay chiếc áo vải bố mộc mạc của người lao động, màu nâu hạt dẻ, áo vải thô nâu.",
    "illustration": {
      "badge": "🌰",
      "concept": "Màu nâu hạt dẻ ấm áp mùa thu",
      "visualDesc": "Những hạt dẻ nướng vỏ màu nâu bóng bẩy thơm lừng bốc khói trong ngày se lạnh."
    }
  },
  "褒": {
    "components": ["亠", "保", "衣"],
    "equation": "Khoác tấm áo choàng danh dự (衣) bảo bọc (保) khen ngợi người có công trạng",
    "mnemonic": "Trao tặng lời khen ngợi và phần thưởng xứng đáng động viên tinh thần tiến bộ, khen ngợi, khen thưởng, tán dương bao thưởng.",
    "illustration": {
      "badge": "🏆",
      "concept": "Cúp khen thưởng danh dự rực rỡ",
      "visualDesc": "Chiếc cúp vàng sáng loáng cùng dải ruy băng vinh danh nỗ lực vượt bậc của người chiến thắng."
    }
  },
  "襟": {
    "components": ["衤", "禁"],
    "equation": "衤 (Cổ áo) cài then cài kín nghiêm ngặt cấm kỵ hở hang (禁)",
    "mnemonic": "Cổ áo sơ mi cài kín ngay ngắn thể hiện phong thái đoan trang lịch lãm, cổ áo, ve áo sơ mi (eri).",
    "illustration": {
      "badge": "👔",
      "concept": "Cổ áo sơ mi thẳng tắp phẳng phiu",
      "visualDesc": "Chiếc áo sơ mi với ve cổ phẳng phiu không một nếp nhăn toát lên sự lịch thiệp."
    }
  },
  "襲": {
    "components": ["龍", "衣"],
    "equation": "Con rồng uy dũng (龍) khoác áo choàng mây gió (衣) lao xuống tấn công bất ngờ",
    "mnemonic": "Bất thình lình ập đến tấn công dồn dập hoặc kế thừa danh hiệu truyền đời, tập kích, tấn công, kế thừa tên tuổi (shūmei).",
    "illustration": {
      "badge": "⚡",
      "concept": "Đòn tập kích bất ngờ sấm sét",
      "visualDesc": "Tia chớp rạch ngang trời đánh sập pháo đài biểu trưng đòn tấn công bất ngờ thần tốc."
    }
  },
  "覆": {
    "components": ["覀", "復"],
    "equation": "覀 (Tấm vải phủ kín lên trên) + 復 (Lật ngược trở lại hoàn toàn)",
    "mnemonic": "Tấm bạt trùm kín che phủ bề mặt hoặc con sóng lớn lật úp con thuyền, che phủ, bao trùm, lật đổ lật úp.",
    "illustration": {
      "badge": "⛺",
      "concept": "Tấm bạt che phủ bảo vệ an toàn",
      "visualDesc": "Tấm bạt phủ chống thấm che chắn toàn bộ hàng hóa an toàn trước cơn mưa bão."
    }
  },
  "覇": {
    "components": ["覀", "革", "月"],
    "equation": "Đội mũ giáp bọc da (覀 革) dưới ánh trăng vằng vặc (月) xưng hùng xưng bá",
    "mnemonic": "Người đứng đầu dùng sức mạnh và mưu lược áp đảo muôn người giành ngôi vị quán quân, bá chủ, thống trị bá quyền.",
    "illustration": {
      "badge": "👑",
      "concept": "Ngôi vị bá chủ đứng đầu muôn người",
      "visualDesc": "Vị tướng quân dũng mãnh đứng trên đỉnh tường thành giương cờ bá chủ thiên hạ."
    }
  },
  "視": {
    "components": ["示", "見"],
    "equation": "示 (Mọi điềm báo hiển thị) đều được đôi mắt chăm chú nhìn thấy rõ (見)",
    "mnemonic": "Mở to mắt quan sát kỹ lưỡng để nhận định thấu đáo thực tế khách quan, nhìn, quan sát, thị lực, tầm nhìn thị giác.",
    "illustration": {
      "badge": "👀",
      "concept": "Ánh mắt tập trung quan sát",
      "visualDesc": "Đôi mắt sáng quắc chăm chú theo dõi từng chi tiết nhỏ qua thấu kính hiển vi."
    }
  },
  "覧": {
    "components": ["臣", "見"],
    "equation": "Vị quan (臣) đưa mắt chăm chú nhìn ngắm bao quát (見) mọi vật phẩm bày biện",
    "mnemonic": "Đưa mắt ngắm nhìn thưởng lãm các tác phẩm nghệ thuật trưng bày trong viện bảo tàng, xem xét, ngắm nhìn, triển lãm.",
    "illustration": {
      "badge": "🖼️",
      "concept": "Khách tham quan phòng triển lãm tranh",
      "visualDesc": "Khách thưởng lãm đi dạo ngắm nhìn những bức danh họa trưng bày trong phòng triển lãm."
    }
  },
  "訂": {
    "components": ["言", "丁"],
    "equation": "言 (Lời nói câu chữ) được đóng đinh chuẩn xác sửa lại cho ngay ngắn (丁)",
    "mnemonic": "Dùng bút đỏ rà soát sửa lại những chỗ sai sót trong văn bản cho chính xác, sửa chữa, chỉnh lý, đính chính bổ sung.",
    "illustration": {
      "badge": "✍️",
      "concept": "Bút đỏ đính chính sai sót trên bản in",
      "visualDesc": "Cây bút đỏ nhẹ nhàng gạch dưới và sửa lại từ ngữ chuẩn xác trên trang bản in thử."
    }
  },
  "討": {
    "components": ["言", "寸"],
    "equation": "言 (Lời bàn luận sắc bén) cân nhắc từng tấc một (寸) trước khi xuất binh",
    "mnemonic": "Bàn bạc kỹ lưỡng phương án tác chiến rồi xuất quân đánh dẹp kẻ phản loạn, thảo phạt, thảo luận, đánh dẹp.",
    "illustration": {
      "badge": "⚔️",
      "concept": "Thảo luận kế sách dẹp giặc",
      "visualDesc": "Các vị tướng lĩnh vây quanh bàn cát chỉ huy thảo luận kế sách xuất quân dẹp loạn."
    }
  },
  "託": {
    "components": ["言", "乇"],
    "equation": "言 (Gửi gắm lời dặn dò) nương tựa vào mầm rễ vững chãi (乇)",
    "mnemonic": "Gửi gắm tài sản và niềm tin nhờ người đáng tin cậy trông nom hộ, giao phó, ủy thác, thác tạ.",
    "illustration": {
      "badge": "🤝",
      "concept": "Giao phó trọng trách cho người tin cậy",
      "visualDesc": "Chiếc chìa khóa nhà được trao tận tay người bạn thân gửi gắm trông nom trong chuyến đi xa."
    }
  },
  "訟": {
    "components": ["言", "公"],
    "equation": "言 (Lời nói tranh cãi) mang ra công đường nhờ quan tòa công chính phân xử (公)",
    "mnemonic": "Đưa đơn kiện ra tòa án nhờ pháp luật phân xử đúng sai quyền lợi hai bên, kiện tụng, tranh tụng, khởi kiện.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Phiên tòa xét xử tranh tụng công bằng",
      "visualDesc": "Vị thẩm phán cầm búa công lý lắng nghe luật sư trình bày chứng cứ tại phiên tòa."
    }
  },
  "訳": {
    "components": ["言", "尺"],
    "equation": "言 (Lời nói) được đo đếm từng thước tấc (尺) cho thông suốt rành mạch",
    "mnemonic": "Giải thích rõ ràng nguyên nhân lý do và chuyển ngữ câu văn từ tiếng này sang tiếng khác, ý nghĩa, lý do, dịch thuật.",
    "illustration": {
      "badge": "🌐",
      "concept": "Chuyển ngữ dịch thuật thông suốt",
      "visualDesc": "Hai bong bóng thoại mang hai thứ tiếng khác nhau được kết nối thông qua dịch thuật chuẩn xác."
    }
  },
  "訴": {
    "components": ["言", "斥"],
    "equation": "言 (Lời kêu oan ức) gạt phăng sự bất công (斥) đòi lại công lý",
    "mnemonic": "Bày tỏ nỗi niềm oan ức gửi đơn khiếu nại lên cấp trên đòi bồi thường, khiếu nại, tố cáo, kiện tụng tố tụng.",
    "illustration": {
      "badge": "📢",
      "concept": "Cất tiếng tố cáo bất công",
      "visualDesc": "Người dân dũng cảm giơ cao lá đơn khiếu nại đòi lại quyền lợi chính đáng cho tập thể."
    }
  },
  "診": {
    "components": ["言", "㐱"],
    "equation": "言 (Lời hỏi han bệnh tình) được đối chiếu theo từng sợi tóc thớ da mượt mà (㐱)",
    "mnemonic": "Thầy thuốc thăm hỏi triệu chứng bắt mạch đo nhiệt độ chẩn đoán bệnh tật, chẩn đoán, khám bệnh, kiểm tra sức khỏe.",
    "illustration": {
      "badge": "🩺",
      "concept": "Bác sĩ ân cần chẩn đoán bệnh",
      "visualDesc": "Bác sĩ đeo ống nghe ân cần thăm khám nhịp tim cho bệnh nhân tại phòng khám khang trang."
    }
  },
  "証": {
    "components": ["言", "正"],
    "equation": "言 (Lời khai trung thực) xác nhận điều hoàn toàn chính xác ngay thẳng (正)",
    "mnemonic": "Bằng chứng xác thực và giấy tờ chứng nhận không thể chối cãi, bằng chứng, chứng chỉ, chứng thực chứng minh.",
    "illustration": {
      "badge": "📜",
      "concept": "Tấm giấy chứng nhận đóng dấu đỏ",
      "visualDesc": "Bản chứng chỉ tốt nghiệp viền hoa văn vàng đóng dấu đỏ chứng nhận năng lực xuất sắc."
    }
  },
  "詐": {
    "components": ["言", "乍"],
    "equation": "言 (Lời nói) ngụy tạo ra đột ngột bất thình lình để lừa gạt (乍)",
    "mnemonic": "Dùng lời đường mật gian xảo để lừa lọc chiếm đoạt tiền bạc lòng tin, gian lận, xảo trá, lừa đảo trá ngụy.",
    "illustration": {
      "badge": "🎭",
      "concept": "Mặt nạ lừa đảo xảo trá",
      "visualDesc": "Bàn tay giấu lá bài gian lận sau lưng cảnh báo các chiêu trò lừa đảo tinh vi."
    }
  },
  "詔": {
    "components": ["言", "召"],
    "equation": "言 (Lời phán truyền) triệu tập muôn dân (召) tuân theo mệnh lệnh hoàng đế",
    "mnemonic": "Lời huấn dụ thiêng liêng bằng văn bản của thiên tử ban bố cho toàn thể thần dân, chiếu chỉ của vua, chiếu dụ.",
    "illustration": {
      "badge": "📜",
      "concept": "Cuộn chiếu chỉ rồng vàng của hoàng đế",
      "visualDesc": "Cuộn chiếu chỉ lụa thêu chỉ vàng mang dấu ấn ngọc tỉ hoàng gia ban bố đại xá thiên hạ."
    }
  },
  "評": {
    "components": ["言", "平"],
    "equation": "言 (Lời nhận xét) dựa trên sự công bằng ngay thẳng bằng phẳng (平)",
    "mnemonic": "Đưa ra lời nhận xét đánh giá khách quan về một tác phẩm hay sự việc, phê bình, bình phẩm, đánh giá chấm điểm.",
    "illustration": {
      "badge": "⭐",
      "concept": "Đánh giá xếp hạng năm sao",
      "visualDesc": "Năm ngôi sao vàng lấp lánh biểu trưng cho lời đánh giá chất lượng xuất sắc nhất."
    }
  },
  "詠": {
    "components": ["言", "永"],
    "equation": "言 (Lời thơ) ngân nga trầm bổng vang mãi muôn đời vĩnh cửu (永)",
    "mnemonic": "Cất giọng trầm bổng ngâm những câu thơ tuyệt tác trước cảnh sắc trăng hoa, ngâm thơ, vịnh cảnh, ca vịnh.",
    "illustration": {
      "badge": "📜",
      "concept": "Thi sĩ ngâm thơ dưới trăng rằm",
      "visualDesc": "Thi sĩ nâng chén rượu ngâm khúc thơ tuyệt bút dưới ánh trăng vằng vặc soi bóng mặt hồ."
    }
  },
  "詢": {
    "components": ["言", "旬"],
    "equation": "言 (Lời tham vấn) được lắng nghe trọn vẹn thấu đáo cả tuần lễ (旬)",
    "mnemonic": "Hỏi han thăm dò ý kiến của các chuyên gia trước khi đưa ra quyết định trọng đại, hỏi ý kiến, trưng cầu, thẩm vấn.",
    "illustration": {
      "badge": "💬",
      "concept": "Họp bàn tham vấn ý kiến chuyên gia",
      "visualDesc": "Buổi tọa đàm tham vấn ý kiến diễn ra sôi nổi giữa các nhà khoa học đầu ngành."
    }
  },
  "該": {
    "components": ["言", "亥"],
    "equation": "言 (Lời phân định) chuẩn xác ứng với vị trí cuối cùng trọn vẹn (亥)",
    "mnemonic": "Khớp đúng hoàn toàn với tiêu chuẩn và quy định đã nêu ra, đúng với, tương ứng, thích đáng, đương sự.",
    "illustration": {
      "badge": "✅",
      "concept": "Khớp chuẩn xác tiêu chuẩn yêu cầu",
      "visualDesc": "Dấu tích xanh chuẩn xác xác nhận thông tin hoàn toàn tương ứng khớp với hồ sơ."
    }
  },
  "詳": {
    "components": ["言", "羊"],
    "equation": "言 (Lời giải thích) rành mạch rõ ràng như vẻ đẹp thuần khiết tốt lành (羊)",
    "mnemonic": "Trình bày cặn kẽ từng chi tiết ngọn ngành giúp ai cũng thấu hiểu rõ ràng, tường tận, chi tiết, rõ ràng rành mạch.",
    "illustration": {
      "badge": "🔍",
      "concept": "Bản báo cáo chi tiết rõ ràng",
      "visualDesc": "Trang tài liệu giải thích tỉ mỉ từng con số kèm sơ đồ phân tích chi tiết tường tận."
    }
  },
  "誇": {
    "components": ["言", "夸"],
    "equation": "言 (Lời nói) phóng đại to tát vượt quá tầm vóc bình thường (夸)",
    "mnemonic": "Nói to về thành tích của mình với niềm tự hào kiêu hãnh ngút trời, khoa trương, tự hào, kiêu hãnh (hokoru).",
    "illustration": {
      "badge": "🦚",
      "concept": "Chú công xòe đuôi kiêu hãnh",
      "visualDesc": "Chú công lộng lẫy xòe trọn bộ lông đuôi rực rỡ ngũ sắc kiêu hãnh khoe sắc."
    }
  },
  "誉": {
    "components": ["𦥑", "言"],
    "equation": "Mọi người chung tay (𦥑) cất tiếng đồng thanh ngợi ca khen thưởng (言)",
    "mnemonic": "Tiếng tăm tốt đẹp và vinh quang rực rỡ lưu truyền muôn đời sau, danh dự, vinh dự, uy tín tiếng thơm.",
    "illustration": {
      "badge": "🏅",
      "concept": "Huy chương danh dự chói lọi",
      "visualDesc": "Tấm huy chương danh dự bằng vàng chạm khắc hoa cúc trao tặng cho người có công trạng lớn."
    }
  },
  "誓": {
    "components": ["折", "言"],
    "equation": "Bẻ gãy cành cây làm dấu (折) kèm lời nói đanh thép không bao giờ nuốt lời (言)",
    "mnemonic": "Đặt tay lên ngực thề ước giữ trọn lời hứa sắt son dù trải qua muôn vàn gian khó, lời thề, tuyên thệ, thệ ước.",
    "illustration": {
      "badge": "✋",
      "concept": "Đặt tay lên ngực tuyên thệ trang nghiêm",
      "visualDesc": "Vị quan tân nhiệm giơ cao tay phải đặt tay lên hiến pháp tuyên thệ trung thành với tổ quốc."
    }
  },
  "誕": {
    "components": ["言", "延"],
    "equation": "言 (Lời chúc mừng) kéo dài vô tận (延) đón chào sinh linh mới cất tiếng khóc",
    "mnemonic": "Chào đón một sinh mệnh bé bỏng chào đời trong niềm hân hoan vô bờ của cha mẹ, sinh ra, ngày sinh nhật, đản sinh.",
    "illustration": {
      "badge": "🎂",
      "concept": "Chiếc bánh kem sinh nhật ấm áp",
      "visualDesc": "Chiếc bánh kem thắp nến lung linh trong tiệc sinh nhật rộn rã tiếng cười chúc mừng."
    }
  },
  "誘": {
    "components": ["言", "秀"],
    "equation": "言 (Lời nói) ngọt ngào hấp dẫn ưu tú xuất sắc (秀) lôi cuốn lòng người",
    "mnemonic": "Dùng lời ngọt ngào hấp dẫn mời gọi lôi cuốn đối phương cùng tham gia, mời gọi, dụ dỗ, quyến rũ lôi cuốn.",
    "illustration": {
      "badge": "💌",
      "concept": "Tấm thiệp mời tiệc trang trọng",
      "visualDesc": "Chiếc phong bì thắt nơ lụa chứa tấm thiệp mời dự tiệc dạ hội trang trọng tao nhã."
    }
  },
  "誠": {
    "components": ["言", "成"],
    "equation": "言 (Lời nói) đi đôi với hành động thành công trọn vẹn (成)",
    "mnemonic": "Nói lời nào là dốc sức làm tròn lời ấy với lòng thành thật không dối trá, thành thật, chân thành, chữ Thành (makoto).",
    "illustration": {
      "badge": "🚩",
      "concept": "Lá cờ chữ Thành của Shinsengumi",
      "visualDesc": "Lá cờ đỏ thêu chữ Thành trắng uy nghiêm kiên trinh của đội kiếm sĩ Shinsengumi."
    }
  },
  "誼": {
    "components": ["言", "宜"],
    "equation": "言 (Lời thăm hỏi chuyện trò) đúng lúc hợp tình hợp lý (宜) vun đắp tình thân",
    "mnemonic": "Tình bạn hữu gắn kết chân tình và mối bang giao hòa hảo giữa hai quốc gia, tình bạn hữu, giao nghị, tình thân.",
    "illustration": {
      "badge": "🤝",
      "concept": "Cái bắt tay hữu nghị thắm thiết",
      "visualDesc": "Đại sứ hai nước mỉm cười bắt tay siết chặt vun đắp tình hữu nghị bền lâu giữa hai dân tộc."
    }
  },
  "諄": {
    "components": ["言", "享"],
    "equation": "言 (Lời dạy bảo ân cần) chậm rãi để người nghe tiếp nhận tận hưởng trọn vẹn (享)",
    "mnemonic": "Cần mẫn ân cần căn dặn đi căn dặn lại từng chi tiết nhỏ cho con trẻ ghi nhớ, ân cần căn dặn, tỉ mỉ chu đáo.",
    "illustration": {
      "badge": "👵",
      "concept": "Người bà ân cần căn dặn cháu nhỏ",
      "visualDesc": "Người bà hiền từ xoa đầu nắm tay dặn dò đứa cháu nhỏ những điều hay lẽ phải trong cuộc sống."
    }
  },
  "請": {
    "components": ["言", "青"],
    "equation": "言 (Lời thỉnh cầu) trong sáng thanh khiết như sắc trời xanh biếc (青)",
    "mnemonic": "Kính cẩn cất lời xin phép cấp trên phê duyệt hoặc nhận lời thầu dự án lớn, thỉnh cầu, xin phép, yêu cầu thanh toán.",
    "illustration": {
      "badge": "📑",
      "concept": "Lá đơn thỉnh cầu gửi cấp trên",
      "visualDesc": "Tờ đơn thỉnh nguyện trình bày trang trọng đề đạt nguyện vọng chính đáng lên cơ quan chức năng."
    }
  },
  "諒": {
    "components": ["言", "京"],
    "equation": "言 (Lời giãi bày chân thành) cao đẹp như kinh đô sáng rực (京) làm tan biến hiểu lầm",
    "mnemonic": "Hiểu thấu hoàn cảnh khó khăn của đối phương mà mở lòng bao dung tha thứ, thấu hiểu, lượng thứ, thông cảm tha thứ.",
    "illustration": {
      "badge": "🤝",
      "concept": "Thấu hiểu lượng thứ bao dung",
      "visualDesc": "Hai người nhìn nhau mỉm cười xua tan mọi khúc mắc hiểu lầm nhờ sự thấu hiểu bao dung."
    }
  },
  "諭": {
    "components": ["言", "兪"],
    "equation": "言 (Lời khuyên bảo từ tâm) êm ái xoa dịu (兪) giúp người lạc lối tỉnh ngộ",
    "mnemonic": "Lời khuyên bảo ân cần của bậc bề trên chỉ rõ điều phải trái cho cấp dưới, khuyên răn, hiểu dụ, chỉ thị giáo dụ.",
    "illustration": {
      "badge": "📜",
      "concept": "Lời khuyên bảo vàng ngọc của thầy",
      "visualDesc": "Bức thư pháp khuyên răn đạo lý làm người treo trang trọng giữa thư phòng thanh tịnh."
    }
  },
  "諮": {
    "components": ["言", "咨"],
    "equation": "言 (Lời nói) cùng nhau bàn bạc thở dài tìm kế sách chu toàn (咨)",
    "mnemonic": "Hỏi xin ý kiến cố vấn của các nhà thông thái trước khi ban hành chính sách lớn, tư vấn, hỏi ý kiến, cố vấn tham vấn.",
    "illustration": {
      "badge": "🗣️",
      "concept": "Hội đồng cố vấn tham mưu chính sách",
      "visualDesc": "Các vị cố vấn ngồi thảo luận nghiêm túc quanh bàn tròn tham mưu cho chính phủ."
    }
  },
  "諾": {
    "components": ["言", "若"],
    "equation": "言 (Cất lời ưng thuận) ngoan ngoãn dịu dàng như cành cỏ non (若)",
    "mnemonic": "Gật đầu đồng ý nhận lời cam kết thực hiện đúng theo thỏa thuận, đồng ý, ưng thuận, cam kết cam nặc.",
    "illustration": {
      "badge": "✅",
      "concept": "Gật đầu đồng ý ưng thuận",
      "visualDesc": "Nút bấm chấp thuận màu xanh xác nhận đồng ý với mọi điều khoản quy ước."
    }
  },
  "謀": {
    "components": ["言", "某"],
    "equation": "言 (Lời bàn kín đáo) của một người giấu tên nào đó (某) dưới tán cây mận",
    "mnemonic": "Vạch định kế sách mưu lược sâu xa để đối phó quân địch trên chiến trường, mưu lược, mưu kế, mưu tính âm mưu.",
    "illustration": {
      "badge": "♟️",
      "concept": "Nước cờ mưu lược tính toán sâu xa",
      "visualDesc": "Quân cờ tướng được đặt xuống chuẩn xác thực hiện mưu kế vây bắt tướng địch."
    }
  },
  "謁": {
    "components": ["言", "曷"],
    "equation": "言 (Cất lời xin diện kiến) dưới ánh mặt trời rực rỡ của hoàng cung (曷)",
    "mnemonic": "Đến chốn cung điện trang nghiêm bái kiến bậc vua chúa hoặc lãnh đạo tối cao, yết kiến, diện kiến bề trên.",
    "illustration": {
      "badge": "🙇",
      "concept": "Kính cẩn yết kiến quân vương",
      "visualDesc": "Sứ thần cúi mình kính cẩn trước ngai vàng trong buổi đại yết kiến triều đình."
    }
  },
  "謄": {
    "components": ["月", "龹", "言"],
    "equation": "Dùng mực tươi (月) và đôi tay nâng niu (龹) cẩn thận sao chép lại từng lời văn tự (言)",
    "mnemonic": "Chép lại y nguyên từng dòng chữ của bản chính để lưu trữ hay cấp phát, sao chép lại, bản sao đằng bản công chứng.",
    "illustration": {
      "badge": "📋",
      "concept": "Bản sao công chứng giấy tờ chuẩn xác",
      "visualDesc": "Bản sao hộ tịch đằng bản được đóng dấu đỏ tròn xác nhận trùng khớp hoàn toàn với bản gốc."
    }
  },
  "謙": {
    "components": ["言", "兼"],
    "equation": "言 (Lời nói) luôn kiêm nhường bao quát công lao cho người khác (兼)",
    "mnemonic": "Dù tài cao đức trọng vẫn luôn khiêm nhường không khoe khoang tự mãn, khiêm tốn, nhún nhường, khiêm cung lễ độ.",
    "illustration": {
      "badge": "🙇",
      "concept": "Cúi đầu khiêm nhường chào hỏi",
      "visualDesc": "Người cúi mình góc bốn mươi lăm độ lễ phép chào hỏi thể hiện đức tính khiêm tốn chuẩn mực."
    }
  },
  "謝": {
    "components": ["言", "射"],
    "equation": "言 (Lời nói từ đáy lòng) bắn đi như mũi tên (射) xua tan mọi lỗi lầm hiềm khích",
    "mnemonic": "Nói lời chân thành bày tỏ lòng biết ơn sâu sắc hoặc nhận lỗi xin thứ tha, cảm ơn, xin lỗi, tạ lễ, cảm tạ (arigatō).",
    "illustration": {
      "badge": "🙏",
      "concept": "Chắp tay cảm ơn và xin lỗi chân thành",
      "visualDesc": "Đôi bàn tay chắp lại trước ngực cúi đầu cảm tạ ân tình sâu sắc của người giúp đỡ."
    }
  },
  "謡": {
    "components": ["言", "䍃"],
    "equation": "言 (Lời ca tiếng hát) bay bổng ngân nga theo nhịp xoay của chiếc bàn gốm (䍃)",
    "mnemonic": "Khúc hát dân gian mộc mạc và lời thoại ngân nga trong nghệ thuật kịch Noh cổ truyền, khúc hát, ca dao, tuồng Noh yōkyoku.",
    "illustration": {
      "badge": "🎭",
      "concept": "Nghệ sĩ kịch Noh cất giọng ngâm khúc dao",
      "visualDesc": "Diễn viên mang mặt nạ kịch Noh uy nghi cất giọng ngâm khúc ca dao trầm bổng cổ kính."
    }
  },
  "謹": {
    "components": ["言", "堇"],
    "equation": "言 (Lời nói) cẩn trọng giữ gìn như bước đi trên đất bùn trơn trượt (堇)",
    "mnemonic": "Hành vi và lời nói luôn thận trọng cung kính không một chút khinh suất lơ là, cẩn trọng, kính cẩn, cẩn thận (kintō).",
    "illustration": {
      "badge": "🎍",
      "concept": "Kính cẩn chúc mừng năm mới kanga shinnen",
      "visualDesc": "Thiệp chúc tết trang nhã in chữ Kính cẩn chúc mừng năm mới trao gửi đối tác."
    }
  },
  "譲": {
    "components": ["言", "襄"],
    "equation": "言 (Cất lời ân cần) sẵn lòng nhường lại chiếc áo ấm bao bọc (襄) cho người khác",
    "mnemonic": "Sẵn lòng nhường ghế hay chuyển nhượng quyền lợi cho người cần hơn với tấm lòng rộng mở, nhường nhịn, chuyển nhượng, khiêm nhường.",
    "illustration": {
      "badge": "🪑",
      "concept": "Nhường ghế cho người già trên tàu điện",
      "visualDesc": "Hành khách trẻ tuổi đứng lên mỉm cười nhường ghế ưu tiên cho cụ già trên chuyến tàu đông đúc."
    }
  },
  "護": {
    "components": ["言", "蒦"],
    "equation": "言 (Dùng lời hịch chỉ huy) bàn tay (又) che chắn bảo vệ chim non trong bụi cỏ (艹 隹)",
    "mnemonic": "Dang rộng vòng tay che chở chăm sóc người yếu thế vượt qua giông bão, bảo hộ, che chở, bảo vệ, hộ vệ y tá.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Vòng tay che chở bảo vệ mầm non",
      "visualDesc": "Đôi bàn tay ấm áp che chắn chở che cho ngọn nến nhỏ cháy sáng trước ngọn gió lạnh."
    }
  },
  "诗": {
    "components": ["讠", "寺"],
    "equation": "讠 (Lời nói thanh cao) ngân vang nơi chốn chùa chiền thanh tịnh (寺)",
    "mnemonic": "Những vần thơ trác tuyệt rung động lòng người dâng lên cõi thiêng (dạng giản thể của chữ 詩), thi ca, bài thơ, thi nhân.",
    "illustration": {
      "badge": "📜",
      "concept": "Cuộn thơ chữ tình thanh thoát",
      "visualDesc": "Cuộn giấy hoa sen viết bài thơ tứ tuyệt bằng nét mực tàu bay bổng thanh thoát."
    }
  },
  "谱": {
    "components": ["讠", "普"],
    "equation": "讠 (Ghi chép câu chữ) phổ biến rộng khắp cho muôn người cùng hòa ca (普)",
    "mnemonic": "Bản ký âm ghi lại các nốt nhạc giai điệu hoặc cuốn gia phả dòng tộc (dạng giản thể của chữ 譜), bản nhạc phổ, gia phổ, phổ biến.",
    "illustration": {
      "badge": "🎼",
      "concept": "Trang khuông nhạc giai điệu",
      "visualDesc": "Trang khuông nhạc năm dòng với những nốt nhạc đen trắng nhảy múa ngân nga khúc ca xuân."
    }
  },
  "豆": {
    "components": ["豆"],
    "equation": "Hình tượng chiếc chén đựng đồ tế lễ tròn trịa có chân đế cao và nắp đậy trang trọng",
    "mnemonic": "Hạt đậu nhỏ bé giàu dinh dưỡng dùng nấu chè xôi và làm tương miso thơm ngon, hạt đậu, chén đựng đồ tế (mame).",
    "illustration": {
      "badge": "🫘",
      "concept": "Quả đậu nành xanh tươi edamame",
      "visualDesc": "Trái đậu nành edamame luộc rắc muối hạt xanh mướt thơm bùi hấp dẫn."
    }
  },
  "豚": {
    "components": ["月", "豕"],
    "equation": "Khối thịt nạc mềm béo (月) của chú heo nuôi trong chuồng (豕)",
    "mnemonic": "Chú heo ủn ỉn cung cấp nguồn thịt thơm ngon giàu năng lượng cho bữa cơm, con heo, thịt lợn (buta, tonkatsu).",
    "illustration": {
      "badge": "🐖",
      "concept": "Chú heo hồng tròn xoe dễ thương",
      "visualDesc": "Chú heo con màu hồng xinh xắn vẫy đuôi tinh nghịch trên bãi cỏ trang trại."
    }
  },
  "豪": {
    "components": ["高", "豕"],
    "equation": "Con heo rừng lực lưỡng (豕) có bộ lông bờm dựng đứng cao vút kiêu hãnh (高)",
    "mnemonic": "Khí phách hiên ngang phóng khoáng của bậc anh hùng trượng phu dám làm việc lớn, hào hoa, hào kiệt, hào nhoáng, Australia.",
    "illustration": {
      "badge": "🏰",
      "concept": "Tòa lâu đài nguy nga hào hoa",
      "visualDesc": "Tòa lâu đài tráng lệ rực rỡ ánh đèn vàng toát lên vẻ hào hoa sang trọng tột bậc."
    }
  },
  "貞": {
    "components": ["卜", "貝"],
    "equation": "Bói quẻ bằng mai rùa (卜) để giữ gìn tài sản quý giá báu vật (貝) trong sạch",
    "mnemonic": "Giữ tấm lòng son sắt thủy chung chính đính không bao giờ nghiêng ngả, trinh bạch, trung trinh, bói toán cát tường.",
    "illustration": {
      "badge": "💎",
      "concept": "Viên kim cương trung trinh sáng ngời",
      "visualDesc": "Viên kim cương trong suốt không một tì vết biểu trưng cho lòng trung trinh son sắt."
    }
  },
  "貢": {
    "components": ["工", "貝"],
    "equation": "Dùng công sức lao động (工) làm ra của cải tiền của (貝) dâng lên cho đất nước",
    "mnemonic": "Dốc lòng cống hiến tài năng và của cải đóng góp vào sự phồn vinh của quê hương, cống hiến, cống nạp của quý, triều cống.",
    "illustration": {
      "badge": "🎁",
      "concept": "Cống hiến tài năng dựng xây đất nước",
      "visualDesc": "Bàn tay nâng đỡ đóa hoa cống hiến thể hiện tinh thần phụng sự hết lòng vì xã hội."
    }
  },
  "貫": {
    "components": ["毋", "貝"],
    "equation": "Xâu sợi dây xuyên qua lỗ tròn của hàng ngàn đồng tiền xu bằng vỏ ốc đồng (貝)",
    "mnemonic": "Sợi dây xâu suốt ngàn đồng xu kết thành một chuỗi vững vàng kiên định từ đầu tới cuối, xâu tiền xu, xuyên suốt, quán triệt (tsuranuku).",
    "illustration": {
      "badge": "🎯",
      "concept": "Mũi tên xuyên suốt hồng tâm",
      "visualDesc": "Mũi tên vàng xuyên thẳng qua tâm tấm bia thể hiện ý chí quán triệt kiên định một lòng."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n1kData)) {
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

console.log(`[Batch 5K - N1 Part 11] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n1kData).length} chữ Kanji N1.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
