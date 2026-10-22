/**
 * Batch 5G: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 95 chữ Kanji N1 tiếp theo (từ 楠 đến 瀬)
 */

const fs = require('fs');
const path = require('path');

const n1gData = {
  "楠": {
    "components": ["木", "南"],
    "equation": "木 (Cây gỗ) sinh trưởng tươi tốt ở vùng phương Nam (南)",
    "mnemonic": "Cây gỗ quý tỏa hương thơm ngát tỏa bóng mát ở phương nam ấm áp chính là cây long não (nam mộc).",
    "illustration": {
      "badge": "🌳",
      "concept": "Cây long não cổ thụ phương nam",
      "visualDesc": "Cây long não ngàn năm sum sê cành lá tỏa hương thơm ngát xua tan côn trùng."
    }
  },
  "楼": {
    "components": ["木", "米", "女"],
    "equation": "木 (Gỗ dựng khung) + 婁 (Nhiều tầng chồng lớp, nhiều phòng ốc liên tiếp)",
    "mnemonic": "Công trình khung gỗ cao nhiều tầng nguy nga tráng lệ dành cho mỹ nữ ngắm cảnh, lầu gác cao tầng.",
    "illustration": {
      "badge": "🏯",
      "concept": "Lầu gác cao tầng bằng gỗ",
      "visualDesc": "Tòa lầu nhiều tầng mái cong vút vươn cao kiêu hãnh giữa trời mây."
    }
  },
  "概": {
    "components": ["木", "既"],
    "equation": "木 (Thanh gạt bằng gỗ) gạt phẳng hạt ngũ cốc đã đong đầy (既) trong đấu",
    "mnemonic": "Thanh gỗ gạt ngang miệng đấu đong thóc cho bằng phẳng đại khái, khái quát, tổng quan.",
    "illustration": {
      "badge": "📏",
      "concept": "Thanh gỗ gạt phẳng miệng đấu",
      "visualDesc": "Thanh gỗ thẳng tắp lướt qua miệng đấu thóc làm phẳng bề mặt hạt ngũ cốc."
    }
  },
  "榛": {
    "components": ["木", "秦"],
    "equation": "木 (Cây rừng) mọc rậm rạp um tùm ở vùng đất Tần (秦)",
    "mnemonic": "Cây bụi rậm rạp mọc ven sườn đồi cho ra những hạt phỉ thơm bùi giòn rụm, cây phỉ (hazelnut).",
    "illustration": {
      "badge": "🌰",
      "concept": "Hạt phỉ dại thơm bùi",
      "visualDesc": "Chùm hạt phỉ tròn trịa nép mình dưới những tán lá cây xanh mát."
    }
  },
  "槙": {
    "components": ["木", "真"],
    "equation": "木 (Cây gỗ) sống ngay thẳng chân chính (真) qua ngàn năm gió sương",
    "mnemonic": "Loài cây thông ngay thẳng vươn cao với lớp lá xanh biếc quanh năm, cây hoàng đàn (thông maki).",
    "illustration": {
      "badge": "🌲",
      "concept": "Cây hoàng đàn kiên trinh",
      "visualDesc": "Cây hoàng đàn dáng thẳng đứng kiêu hãnh trên đỉnh núi đá tuyết phủ."
    }
  },
  "槻": {
    "components": ["木", "規"],
    "equation": "木 (Thân cây gỗ) có thớ gỗ thẳng ngay chuẩn mực làm thước đo quy củ (規)",
    "mnemonic": "Cây gỗ du gai thân thẳng tắp thường dùng làm vật liệu quy chuẩn trong mộc cổ truyền, cây du gai Nhật (keyaki).",
    "illustration": {
      "badge": "🪵",
      "concept": "Thớ gỗ du gai chuẩn mực",
      "visualDesc": "Cây du gai cổ thụ với tán tròn xòe rộng và thân thẳng tắp như cột trụ trời."
    }
  },
  "槽": {
    "components": ["木", "曹"],
    "equation": "木 (Ván gỗ ghép lại) + 曹 (Đông đúc, hội tụ nhiều ngăn)",
    "mnemonic": "Những tấm ván gỗ ghép thành bồn lớn chứa nước tắm hoặc máng ăn cho gia súc, bồn tắm, máng chứa.",
    "illustration": {
      "badge": "🛁",
      "concept": "Bồn tắm gỗ truyền thống",
      "visualDesc": "Chiếc bồn tắm hinoki bằng gỗ bốc hơi nước ấm áp thơm mùi hương rừng."
    }
  },
  "標": {
    "components": ["木", "票"],
    "equation": "木 (Cột mốc bằng gỗ) + 票 (Tấm thẻ bay phấp phới báo hiệu rõ ràng)",
    "mnemonic": "Cột gỗ cắm trên đường gắn biển báo nổi bật để mọi người nhận biết phương hướng, biển chỉ dẫn, mục tiêu.",
    "illustration": {
      "badge": "🎯",
      "concept": "Cột mốc chỉ dẫn phương hướng",
      "visualDesc": "Cọc gỗ chỉ đường cắm tại ngã ba núi rừng với tấm bảng mũi tên rõ ràng."
    }
  },
  "模": {
    "components": ["木", "莫"],
    "equation": "木 (Cây gỗ làm cốt) + 莫 (Bao trùm, khuôn mẫu định hình mọi thứ)",
    "mnemonic": "Khuôn đúc bằng gỗ dùng để sao chép hàng loạt mẫu vật phẩm chuẩn xác, mô hình, khuôn mẫu.",
    "illustration": {
      "badge": "📐",
      "concept": "Khuôn đúc mẫu vật phẩm",
      "visualDesc": "Khuôn gỗ tinh xảo đang tạo hình cho tác phẩm đất sét đồng đều hoàn hảo."
    }
  },
  "樹": {
    "components": ["木", "壴", "寸"],
    "equation": "木 (Cây cối) + 尌 (Trồng thẳng đứng, bàn tay 寸 vun đắp dựng đứng cái trống 壴)",
    "mnemonic": "Bàn tay cắm cây con xuống đất vun đắp cho nó mọc thẳng đứng thành cổ thụ rợp bóng, cây cối, thụ lập.",
    "illustration": {
      "badge": "🌳",
      "concept": "Cổ thụ vươn cành đón nắng",
      "visualDesc": "Thân cây đại thụ lực lưỡng vươn tán lá xanh ngút ngàn che chở cho muôn loài."
    }
  },
  "樺": {
    "components": ["木", "華"],
    "equation": "木 (Cây rừng) có lớp vỏ trắng sáng rực rỡ như hoa nở (華)",
    "mnemonic": "Loài cây thân gỗ có lớp vỏ lụa trắng muốt tinh khôi như hoa mùa tuyết, cây bạch dương (bulô).",
    "illustration": {
      "badge": "🌲",
      "concept": "Rừng cây bạch dương vỏ trắng",
      "visualDesc": "Khu rừng bạch dương mùa đông với những thân cây trắng muốt thanh tao."
    }
  },
  "橘": {
    "components": ["木", "矞"],
    "equation": "木 (Cây ăn quả) có quả tròn mọng xuyên qua gai nhọn (矞) tỏa sắc vàng",
    "mnemonic": "Cây ăn quả có gai nhọn mang những trái tròn vàng ươm thơm mát, biểu tượng vương giả, cây quýt Nhật.",
    "illustration": {
      "badge": "🍊",
      "concept": "Cây quýt trĩu quả vàng",
      "visualDesc": "Cây quýt xum xuê với những chùm quả vàng óng nổi bật trên nền lá xanh biếc."
    }
  },
  "檀": {
    "components": ["木", "亶"],
    "equation": "木 (Cây gỗ quý) thành thật trọn vẹn (亶) với hương thơm ngát muôn đời",
    "mnemonic": "Cây gỗ quý phương đông tỏa hương thanh tịnh dùng làm tượng Phật và chuỗi hạt thiêng, cây đàn hương.",
    "illustration": {
      "badge": "🪵",
      "concept": "Khúc gỗ đàn hương ngát hương",
      "visualDesc": "Thanh gỗ đàn hương mịn màng tỏa khói trầm hương thơm ngát lòng người."
    }
  },
  "欄": {
    "components": ["木", "闌"],
    "equation": "木 (Thanh gỗ ghép) tạo thành hàng rào ngăn cách lối đi (闌)",
    "mnemonic": "Thanh gỗ uốn lượn làm hàng rào chắn an toàn hoặc dóng kẻ chia cột trang báo, lan can, cột mục báo chí.",
    "illustration": {
      "badge": "🚧",
      "concept": "Hàng lan can gỗ đỏ cầu kiều",
      "visualDesc": "Cây cầu gỗ với dãy lan can uốn lượn duyên dáng bắc qua dòng suối mát."
    }
  },
  "欣": {
    "components": ["斤", "欠"],
    "equation": "斤 (Cái rìu bổ củi nhẹ nhõm) + 欠 (Há to miệng cười vui sướng)",
    "mnemonic": "Lòng nhẹ nhõm há to miệng cười sảng khoái đón chào tin mừng, hân hoan, hoan hỉ.",
    "illustration": {
      "badge": "😄",
      "concept": "Nụ cười rạng rỡ hân hoan",
      "visualDesc": "Gương mặt tươi cười rạng ngời ngẩng cao đầu há miệng reo vui hân hoan."
    }
  },
  "欺": {
    "components": ["其", "欠"],
    "equation": "其 (Chiếc sảy thóc chọn lọc) + 欠 (Há miệng thở dài thất vọng vì bị gạt)",
    "mnemonic": "Bị kẻ xấu dùng thủ đoạn xảo trá lọc lừa khiến ta phải há miệng thở dài uất nghẹn, khi trá, lừa dối.",
    "illustration": {
      "badge": "🎭",
      "concept": "Mặt nạ lừa dối xảo trá",
      "visualDesc": "Khuôn mặt giấu sau lớp mặt nạ hai mặt xảo quyệt lừa gạt lòng tin."
    }
  },
  "欽": {
    "components": ["金", "欠"],
    "equation": "金 (Vàng bạc quý báu) khiến lòng người há miệng kinh ngạc cúi đầu (欠)",
    "mnemonic": "Nhìn thấy đức hạnh sáng ngời như vàng ròng khiến ai cũng cúi đầu kính phục khôn xiết, khâm phục, khâm kính.",
    "illustration": {
      "badge": "🙇",
      "concept": "Kính cẩn khâm phục bái tạ",
      "visualDesc": "Vị tướng sĩ cúi đầu kính cẩn tiếp nhận chiếu chỉ vàng của hoàng đế."
    }
  },
  "款": {
    "components": ["士", "示", "欠"],
    "equation": "Dâng đồ lễ tế (示) lên trước thần linh với lòng thành khẩn há miệng cầu chúc (欠)",
    "mnemonic": "Tấm lòng thành khẩn bày tỏ từng điều khoản cam kết rõ ràng trước bàn thờ, điều khoản, khoản đãi.",
    "illustration": {
      "badge": "📜",
      "concept": "Văn bản các điều khoản ký kết",
      "visualDesc": "Cuộn thư tịch ghi rõ ràng từng điều khoản cam kết giữa hai bên đối tác."
    }
  },
  "歓": {
    "components": ["隹", "欠"],
    "equation": "隹 (Chim nhỏ ríu rít) + 欠 (Người há to miệng hát ca reo mừng)",
    "mnemonic": "Người người há miệng cất tiếng reo vang vui như đàn chim ríu rít ngày hội lớn, hoan hô, hoan hỷ.",
    "illustration": {
      "badge": "🎉",
      "concept": "Tiếng reo mừng rộn rã",
      "visualDesc": "Pháo hoa bừng nở trên bầu trời giữa tiếng hoan hô chào mừng vang dội."
    }
  },
  "殉": {
    "components": ["歹", "旬"],
    "equation": "歹 (Bộ ngạt - chết chóc, thân xác tàn) theo trọn một tuần hương/chu kỳ (旬)",
    "mnemonic": "Chết theo nghĩa vụ và lý tưởng cao cả không màng thân xác mình, tuẫn tiết, tuẫn nạn vì phận sự.",
    "illustration": {
      "badge": "🕯️",
      "concept": "Ngọn nến hy sinh vì đại nghĩa",
      "visualDesc": "Ngọn nến lặng lẽ cháy hết mình để soi sáng lý tưởng cao thượng."
    }
  },
  "殊": {
    "components": ["歹", "朱"],
    "equation": "歹 (Thịt xương tách lìa) nhuốm sắc chu sa đỏ rực (朱) khác hẳn bình thường",
    "mnemonic": "Nổi bật khác biệt hẳn so với phần còn lại như màu đỏ chu sa rực rỡ, đặc thù, thù biệt, vô cùng.",
    "illustration": {
      "badge": "💎",
      "concept": "Viên ngọc đỏ thù biệt độc nhất",
      "visualDesc": "Viên bảo ngọc đỏ rực rỡ tỏa ánh hào quang khác lạ giữa muôn vàn sỏi đá."
    }
  },
  "殖": {
    "components": ["歹", "直"],
    "equation": "歹 (Từ phần gốc rễ tàn úa) tiếp tục mọc thẳng đứng (直) sinh sôi nảy nở",
    "mnemonic": "Từ mầm mống cũ tái sinh nảy nở vươn thẳng sinh sôi không ngừng nghỉ, sinh sản, nhân giống, thực dân.",
    "illustration": {
      "badge": "🌱",
      "concept": "Mầm cây nảy nở sinh sôi",
      "visualDesc": "Các mầm non xanh tươi đâm chồi thẳng tắp nhân rộng khắp khu vườn."
    }
  },
  "殴": {
    "components": ["区", "殳"],
    "equation": "区 (Dồn vào một góc nhỏ) + 殳 (Cầm gậy gộc đánh tới tấp)",
    "mnemonic": "Dồn đối phương vào góc khuất rồi giơ gậy thụi túi bụi, ẩu đả, ẩu kích, đánh đập.",
    "illustration": {
      "badge": "🥊",
      "concept": "Cú đấm vung gậy ẩu đả",
      "visualDesc": "Nắm đấm giơ cao trong vụ xung đột ẩu đả trên đường phố."
    }
  },
  "殻": {
    "components": ["士", "冖", "殳"],
    "equation": "Dùng gậy (殳) đập vào vật cứng có lớp mái che (冖) để làm bật lớp vỏ bảo vệ",
    "mnemonic": "Lớp vỏ cứng cáp bao bọc quả trứng hay thân ốc ngăn ngừa va chạm từ bên ngoài, vỏ trứng, vỏ sò, giáp xác.",
    "illustration": {
      "badge": "🥚",
      "concept": "Vỏ trứng giòn cứng",
      "visualDesc": "Vỏ quả trứng nứt ra để lộ mầm sống chuẩn bị chào đời."
    }
  },
  "毅": {
    "components": ["豕", "殳"],
    "equation": "豕 (Con heo rừng bờm dựng đứng hung tợn) đối mặt trước ngọn giáo đòn đánh (殳)",
    "mnemonic": "Khí phách dũng cảm kiên cường không nao núng như heo rừng nghênh chiến, quả nghị, kiên nghị.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Ý chí kiên nghị sắt đá",
      "visualDesc": "Chiến binh đứng vững chãi với ánh mắt kiên định trước phong ba bão táp."
    }
  },
  "毬": {
    "components": ["毛", "求"],
    "equation": "毛 (Lông thú, sợi len bện chặt) + 求 (Tập trung co cuộn tròn trịa lại)",
    "mnemonic": "Cuộn lông hoặc sợi len bện tròn vo dùng để đá và ném vui đùa, quả cầu, quả bóng len (kemari).",
    "illustration": {
      "badge": "🧶",
      "concept": "Quả cầu gấm đan sợi hoa",
      "visualDesc": "Quả cầu gấm temari Nhật Bản rực rỡ hoa văn đan bằng các sợi chỉ màu."
    }
  },
  "氏": {
    "components": ["氏"],
    "equation": "氏 (Hình tượng chiếc thìa múc rượu tế tổ tiên truyền đời hoặc cành nhánh gia tộc)",
    "mnemonic": "Nhánh rễ gốc tích gia đình truyền đời qua nhiều thế hệ tôn quý, họ thị, dòng dõi, ngài/ông họ.",
    "illustration": {
      "badge": "🏛️",
      "concept": "Gia huy biểu trưng thị tộc",
      "visualDesc": "Gia huy truyền thống khắc sâu trên cổng dinh thự dòng họ danh gia vọng tộc."
    }
  },
  "汁": {
    "components": ["氵", "十"],
    "equation": "氵 (Nước, chất lỏng) chiết xuất từ mười (十) phần tinh hoa cây cỏ",
    "mnemonic": "Nước cốt ngưng đọng từ mười phần nguyên liệu nấu sôi sùng sục, nước canh, nước ép, trấp dịch.",
    "illustration": {
      "badge": "🥣",
      "concept": "Bát canh súp miso bốc khói",
      "visualDesc": "Bát súp miso thanh ngọt ấm nóng nghi ngút khói thơm lừng bữa cơm."
    }
  },
  "汐": {
    "components": ["氵", "夕"],
    "equation": "氵 (Dòng nước biển dâng lên) khi ánh chiều tà hoàng hôn (夕) buông xuống",
    "mnemonic": "Sóng nước thủy triều dâng cao tràn bờ lúc bóng chiều tà hoàng hôn, triều tịch, thủy triều chiều tối.",
    "illustration": {
      "badge": "🌅",
      "concept": "Thủy triều dâng lúc hoàng hôn",
      "visualDesc": "Dòng nước triều dâng nhẹ nhàng tràn bờ cát óng ánh dưới ánh hoàng hôn đỏ rực."
    }
  },
  "江": {
    "components": ["氵", "工"],
    "equation": "氵 (Dòng nước lớn) cuồn cuộn chảy qua công trình kè đắp vĩ đại (工)",
    "mnemonic": "Dòng sông lớn mênh mông nước chảy cuồn cuộn ra cửa biển, giang hà, sông lớn, vịnh Edo.",
    "illustration": {
      "badge": "🌊",
      "concept": "Dòng sông lớn cuộn sóng",
      "visualDesc": "Dòng sông rộng lớn mênh mông uốn lượn qua những ngọn núi xanh biếc."
    }
  },
  "汰": {
    "components": ["氵", "太"],
    "equation": "氵 (Dòng nước chảy xiết) đãi lọc những phần quá lớn hoặc cặn bã thừa thãi (太)",
    "mnemonic": "Dùng dòng nước mạnh để cuốn trôi cặn bã giữ lại vàng ròng quý giá, đào thải, đãi cát tìm vàng.",
    "illustration": {
      "badge": "🌾",
      "concept": "Sàng lọc đào thải trong nước",
      "visualDesc": "Chiếc sàng đãi kim loại cuốn trôi bùn đất giữ lại những hạt vàng lấp lánh."
    }
  },
  "汽": {
    "components": ["氵", "气"],
    "equation": "氵 (Nước sôi bốc hơi) tạo thành luồng hơi khí nóng cuồn cuộn (气)",
    "mnemonic": "Nước đun sôi sùng sục bốc thành hơi nước phụt mạnh đẩy đầu máy xe lửa chuyển bánh, hơi nước, tàu thủy hơi nước.",
    "illustration": {
      "badge": "🚂",
      "concept": "Đầu máy hơi nước xả khói",
      "visualDesc": "Đầu máy xe lửa cổ kính đang xả luồng hơi nước trắng xóa lao nhanh trên đường ray."
    }
  },
  "沖": {
    "components": ["氵", "中"],
    "equation": "氵 (Mặt nước biển) ở ngay giữa (中) khoảng cách xa xôi ngoài khơi",
    "mnemonic": "Vùng biển sâu thẳm nằm giữa đại dương cách xa bờ cát đất liền, ngoài khơi, biển khơi, Okinawa.",
    "illustration": {
      "badge": "🌊",
      "concept": "Biển khơi xa ngút ngàn",
      "visualDesc": "Con thuyền buồm đơn độc rẽ sóng lướt đi giữa biển khơi xanh thẳm ngút ngàn tầm mắt."
    }
  },
  "沙": {
    "components": ["氵", "少"],
    "equation": "氵 (Nước sông biển lắng đọng) lại những hạt đất đá nhỏ li ti (少)",
    "mnemonic": "Bờ nước bồi đắp bởi vô số những hạt đá nhỏ mịn li ti lấp lánh, hạt cát mịn, sa mạc, cát vàng.",
    "illustration": {
      "badge": "🏖️",
      "concept": "Bãi cát mịn màng ven sóng",
      "visualDesc": "Bờ cát vàng óng ả trải dài tít tắp đón từng đợt sóng vỗ rì rào."
    }
  },
  "没": {
    "components": ["氵", "殳"],
    "equation": "氵 (Dòng nước cuốn trôi) + 殳 (Bàn tay dìm xuống dưới đáy sâu)",
    "mnemonic": "Bị dìm sâu xuống làn nước lạnh giá biến mất tăm không còn dấu vết, chìm đắm, tịch thu, mai một.",
    "illustration": {
      "badge": "⚓",
      "concept": "Con tàu chìm sâu dưới đáy biển",
      "visualDesc": "Chiếc mỏ neo cùng con thuyền cổ dần dần chìm sâu vào lòng biển cả bao la."
    }
  },
  "沢": {
    "components": ["氵", "尺"],
    "equation": "氵 (Nước dồi dào) đo được từng tấc từng thước (尺) trù phú",
    "mnemonic": "Vùng đất trũng ngập nước màu mỡ mang lại nguồn sống trù phú cho mùa màng, đầm lầy, ân trạch, dồi dào.",
    "illustration": {
      "badge": "🌿",
      "concept": "Vùng đầm lầy sinh thái dồi dào",
      "visualDesc": "Vùng đầm lầy xanh mướt chim chóc bay lượn sinh sôi trong làn nước trong vắt."
    }
  },
  "沼": {
    "components": ["氵", "召"],
    "equation": "氵 (Vũng nước sâu) như mời gọi lôi cuốn (召) mọi vật lún vào",
    "mnemonic": "Vũng bùn lầy sâu nông mời gọi chân bước vào là hút chặt khó dứt ra, ao đầm, đầm lầy nông.",
    "illustration": {
      "badge": "🦆",
      "concept": "Mặt ao đầm phẳng lặng",
      "visualDesc": "Đầm nước tĩnh lặng phủ đầy hoa súng trắng và đàn vịt trời bơi lội."
    }
  },
  "沿": {
    "components": ["氵", "㕣"],
    "equation": "氵 (Dòng nước chảy) men theo sườn khe núi dốc mở miệng (㕣)",
    "mnemonic": "Con đường nhỏ men sát theo dòng chảy uốn lượn của bờ sông, ven theo, men theo bờ cõi.",
    "illustration": {
      "badge": "🛤️",
      "concept": "Con đường men theo bờ sông",
      "visualDesc": "Hàng cây hoa anh đào nở rộ dọc theo hai bên con đường men bờ sông."
    }
  },
  "泌": {
    "components": ["氵", "必"],
    "equation": "氵 (Dịch lỏng trong cơ thể) tất yếu (必) phải rỉ chảy thoát ra ngoài",
    "mnemonic": "Dòng dịch lỏng ắt phải thẩm thấu và rỉ chảy ra từ các tuyến cơ thể, bài tiết, tiết dịch, tiết niệu.",
    "illustration": {
      "badge": "💧",
      "concept": "Giọt dịch tiết nhỏ giọt",
      "visualDesc": "Những giọt dịch trong suốt chắt lọc rỉ ra từ kẽ lá cây rừng."
    }
  },
  "泡": {
    "components": ["氵", "包"],
    "equation": "氵 (Nước mỏng manh) bao bọc (包) lấy khối không khí tròn xoe bên trong",
    "mnemonic": "Lớp màng nước mỏng bao bọc một túi khí nổi bập bềnh rồi vỡ tan, bọt nước, bong bóng xà phòng.",
    "illustration": {
      "badge": "🫧",
      "concept": "Bong bóng nước lung linh",
      "visualDesc": "Những quả bong bóng xà phòng ngũ sắc bay lơ lửng trong không gian."
    }
  },
  "泣": {
    "components": ["氵", "立"],
    "equation": "氵 (Giọt nước mắt tuôn rơi) trong khi đứng lặng (立) một mình",
    "mnemonic": "Đứng lặng người nghẹn ngào để mặc hai hàng lệ tuôn rơi ướt má, khóc lóc, rơi lệ, tiếng khóc.",
    "illustration": {
      "badge": "😢",
      "concept": "Giọt nước mắt nghẹn ngào",
      "visualDesc": "Giọt lệ trong suốt lăn dài trên khóe mi trong nỗi niềm xúc động nghẹn ngào."
    }
  },
  "泰": {
    "components": ["𡗗", "水"],
    "equation": "Bàn tay xoa dịu đôi chân trần trong làn nước mát (水) bình yên",
    "mnemonic": "Tâm hồn thư thái rộng mở như dòng nước êm đềm bình yên giữa đất trời, thái bình, thư thái, Thái Lan.",
    "illustration": {
      "badge": "🕊️",
      "concept": "Bầu trời thái bình an yên",
      "visualDesc": "Đôi bồ câu trắng sải cánh lượn qua dãy núi Thái Sơn hùng vĩ an bình."
    }
  },
  "洞": {
    "components": ["氵", "同"],
    "equation": "氵 (Nước róc rách chảy xuyên qua) hang sâu cùng thông nhau một lòng (同)",
    "mnemonic": "Lòng hang đá sâu thẳm có dòng suối ngầm cùng thông ra vách núi, hang động, động quật, thấu suốt.",
    "illustration": {
      "badge": "🕳️",
      "concept": "Hang động thạch nhũ róc rách suối",
      "visualDesc": "Cửa hang đá cổ xưa với thạch nhũ lung linh soi bóng dòng suối ngầm trong vắt."
    }
  },
  "津": {
    "components": ["氵", "聿"],
    "equation": "氵 (Dòng nước sông biển) nơi tay cầm bút (聿) ghi sổ sách tàu bè cập bến",
    "mnemonic": "Bến đò nơi quan dịch ghi chép tàu bè cập bến đón đưa hành khách, bến cảng, bến đò, tân dịch.",
    "illustration": {
      "badge": "⚓",
      "concept": "Bến thuyền tấp nập giao thương",
      "visualDesc": "Bến đò nhộn nhịp thuyền gỗ neo đậu cùng những kiện hàng chuẩn bị bốc dỡ."
    }
  },
  "洪": {
    "components": ["氵", "共"],
    "equation": "氵 (Dòng nước dâng cao) do muôn vàn nhánh suối cùng hợp lại (共)",
    "mnemonic": "Muôn dòng nước cùng hòa vào nhau dâng lên thành trận đại hồng thủy cuồn cuộn, nước lũ, hồng thủy.",
    "illustration": {
      "badge": "🌊",
      "concept": "Dòng nước lũ cuồn cuộn dâng cao",
      "visualDesc": "Dòng nước lũ trắng xóa cuồn cuộn tràn qua đê đập gầm thét dữ dội."
    }
  },
  "洲": {
    "components": ["氵", "州"],
    "equation": "氵 (Dòng nước bao quanh) + 州 (Vùng đất chia cắt giữa các dòng sông)",
    "mnemonic": "Bãi bồi đất nổi lên giữa muôn trùng sóng nước bao quanh, cồn cát, bãi bồi ven sông, châu lục.",
    "illustration": {
      "badge": "🏝️",
      "concept": "Bãi bồi xanh giữa lòng sông",
      "visualDesc": "Bãi bồi cồn cát phù sa xanh mướt nổi bật giữa hai nhánh sông hiền hòa."
    }
  },
  "洵": {
    "components": ["氵", "旬"],
    "equation": "氵 (Nước mắt tuôn rơi đều đặn) suốt trọn mười ngày trong tuần (旬)",
    "mnemonic": "Nước mắt cảm động tuôn rơi chân thành từ tận đáy lòng, quả thực, đúng thực là, chân thật.",
    "illustration": {
      "badge": "✨",
      "concept": "Sự chân thật từ đáy lòng",
      "visualDesc": "Ánh mắt chân thành lấp lánh như hạt sương mai phản chiếu sự thật không tì vết."
    }
  },
  "洸": {
    "components": ["氵", "光"],
    "equation": "氵 (Mặt nước gợn sóng) phản chiếu ánh sáng mặt trời lấp lánh (光)",
    "mnemonic": "Mặt nước biển gợn sóng tỏa ánh hào quang sáng lòa dũng mãnh, ánh nước lấp lánh, quang dũng.",
    "illustration": {
      "badge": "✨",
      "concept": "Mặt sóng lấp lánh ánh kim",
      "visualDesc": "Từng làn sóng biếc phản chiếu ánh nắng trưa lấp lánh như dát vàng dát bạc."
    }
  },
  "派": {
    "components": ["氵", "𠂆", "氏"],
    "equation": "氵 (Dòng nước nguồn) rẽ nhánh chảy dài theo các chi tộc phân tán (氏)",
    "mnemonic": "Dòng sông chia thành nhiều nhánh nhỏ tỏa đi khắp ngả, môn phái, phe phái, phái cử.",
    "illustration": {
      "badge": "🌿",
      "concept": "Dòng sông chia nhánh tỏa đi",
      "visualDesc": "Từ một con sông chính phân tách thành nhiều nhánh rẽ mát lành nuôi dưỡng đồng bằng."
    }
  },
  "浄": {
    "components": ["氵", "争"],
    "equation": "氵 (Nước mát trong lành) gột rửa đi mọi tranh chấp vẩn đục (争) nơi cõi trần",
    "mnemonic": "Dùng dòng nước thanh khiết để gột rửa bụi trần cho tâm hồn thanh thản trong trẻo, thanh tịnh, làm sạch.",
    "illustration": {
      "badge": "🧘",
      "concept": "Tẩy rửa thanh tịnh tâm hồn",
      "visualDesc": "Bồn nước đá thanh tẩy nơi cổng đền thờ Thần đạo Nhật Bản trong veo không một gợn bụi."
    }
  },
  "浜": {
    "components": ["氵", "兵"],
    "equation": "氵 (Nước biển) nơi binh lính (兵) dựng trại tập kết ven bờ",
    "mnemonic": "Bờ biển nơi sóng vỗ rì rào có bãi cát phẳng để ghe thuyền cập bến, bãi biển, bờ biển, Yokohama.",
    "illustration": {
      "badge": "🏖️",
      "concept": "Bãi biển đầy cát vàng",
      "visualDesc": "Bãi biển dài thoai thoải với rặng thông đón gió biển mát rượi ven bờ cảng."
    }
  },
  "浦": {
    "components": ["氵", "甫"],
    "equation": "氵 (Vùng nước biển) ăn sâu vào bờ đất rộng lớn màu mỡ (甫)",
    "mnemonic": "Cửa biển nơi vịnh nước lặng gió là chốn ghe thuyền dừng chân trú ngụ, bến nước, cửa biển vịnh.",
    "illustration": {
      "badge": "⛵",
      "concept": "Cửa vịnh biển êm sóng",
      "visualDesc": "Vịnh biển kín gió với mặt nước phẳng như gương che chở cho những chiếc thuyền nan."
    }
  },
  "浩": {
    "components": ["氵", "告"],
    "equation": "氵 (Sóng nước dâng cao) gầm vang như tiếng hịch truyền thông cáo (告)",
    "mnemonic": "Nguồn nước mênh mông dạt dào nuôi dưỡng ý chí khoáng đạt ngút trời, hạo nhiên, rộng lớn mênh mông.",
    "illustration": {
      "badge": "🌊",
      "concept": "Khí phách hạo nhiên mênh mông",
      "visualDesc": "Bầu trời và biển cả bao la tiếp giáp nhau chân trời khoáng đạt vô bờ."
    }
  },
  "浪": {
    "components": ["氵", "良"],
    "equation": "氵 (Nước dâng trào) tự do xô đẩy nhịp nhàng tốt lành (良)",
    "mnemonic": "Sóng biển nhấp nhô trôi dạt tự do khắp bốn phương trời, sóng biển, lãng tử phiêu lãng, lãng mạn.",
    "illustration": {
      "badge": "🌊",
      "concept": "Cơn sóng biển nhấp nhô vỗ bờ",
      "visualDesc": "Ngọn sóng trắng nhấp nhô cuộn trào rồi tan thành bọt mịn trên bờ cát."
    }
  },
  "浸": {
    "components": ["氵", "𠬶"],
    "equation": "氵 (Nước ngập tràn) + 𠬶 (Bàn tay cầm chổi quét dọn trong làn nước)",
    "mnemonic": "Nhúng chìm sâu vật thể vào nước để chất lỏng từ từ ngấm sâu vào trong, ngâm nước, thẩm thấu, tiệm tẩm.",
    "illustration": {
      "badge": "🫖",
      "concept": "Ngâm lá trà trong ấm nước sôi",
      "visualDesc": "Những búp trà xanh ngâm mình trong làn nước nóng đang dần bung nở tỏa hương."
    }
  },
  "涯": {
    "components": ["氵", "厂", "圭"],
    "equation": "氵 (Sóng nước) xô vào vách đá dựng đứng (厂) tầng tầng lớp lớp đất ngọc (圭)",
    "mnemonic": "Bờ đá hiểm trở nơi sóng biển vỗ vào tạo nên giới hạn tận cùng của đất liền, bờ bến, chân trời góc bể, sinh nhai.",
    "illustration": {
      "badge": "🧗",
      "concept": "Vách đá ven biển vô tận",
      "visualDesc": "Vách đá sừng sững bên bờ đại dương nơi những con sóng bạc đầu vỗ bờ không dứt."
    }
  },
  "淑": {
    "components": ["氵", "叔"],
    "equation": "氵 (Làn nước trong) phản chiếu nét đoan trang hiền dịu của người em gái nhỏ (叔)",
    "mnemonic": "Nét đẹp trong sáng dịu dàng như dòng nước suối hiền hòa thuần khiết, hiền thục, thục nữ.",
    "illustration": {
      "badge": "🌸",
      "concept": "Thục nữ đoan trang nết na",
      "visualDesc": "Thiếu nữ dịu dàng trong tà áo kimono truyền thống mỉm cười e ấp."
    }
  },
  "淡": {
    "components": ["氵", "炎"],
    "equation": "氵 (Dòng nước mát) làm dịu đi hai ngọn lửa bùng cháy dữ dội (炎)",
    "mnemonic": "Thêm nước vào nồi canh nóng làm vị bớt gắt trở nên dịu nhẹ thanh tao, nhạt nhẽo, thanh đạm, thoang thoảng.",
    "illustration": {
      "badge": "🍵",
      "concept": "Chén trà thanh đạm tao nhã",
      "visualDesc": "Chén trà sen màu nước xanh nhạt trong veo mang hương vị thanh tao dịu nhẹ."
    }
  },
  "淳": {
    "components": ["氵", "享"],
    "equation": "氵 (Dòng nước lành) dâng lên hương vị thơm ngon thanh khiết đáng tận hưởng (享)",
    "mnemonic": "Bản tính mộc mạc chân phương như dòng suối trong vắt nguyên sơ từ cội nguồn, thuần khiết, mộc mạc.",
    "illustration": {
      "badge": "🌾",
      "concept": "Vẻ đẹp thuần phác nguyên sơ",
      "visualDesc": "Ngôi làng cổ thanh bình bên dòng suối với những con người mộc mạc chất phác."
    }
  },
  "添": {
    "components": ["氵", "忝"],
    "equation": "氵 (Thêm chút giọt nước) vào bên cạnh tâm lòng e thẹn khiêm nhường (忝)",
    "mnemonic": "Thêm một chút nước gia vị để món ăn thêm phần đậm đà trọn vị, thêm vào, đính kèm, phụ thêm.",
    "illustration": {
      "badge": "📎",
      "concept": "Đính kèm thêm phụ kiện",
      "visualDesc": "Chiếc kẹp ghim giấy đính kèm thêm lá thư tay đầy ân tình vào gói quà."
    }
  },
  "渇": {
    "components": ["氵", "曷"],
    "equation": "氵 (Thiếu vắng nước) dưới cái nắng chói chang thiêu đốt của mặt trời (曷)",
    "mnemonic": "Mặt trời thiêu đốt khô cạn hết nước khiến cổ họng khô khát cháy bỏng, khát khô, khao khát.",
    "illustration": {
      "badge": "🏜️",
      "concept": "Cổ họng khô khát giữa sa mạc",
      "visualDesc": "Người lữ hành trên đồi cát nắng gắt nâng bầu nước rỗng khao khát từng giọt mưa."
    }
  },
  "渉": {
    "components": ["氵", "歩"],
    "equation": "氵 (Làn nước cạn ven bờ) nơi từng bước chân (歩) lội qua",
    "mnemonic": "Từng bước chân bì bõm lội qua dòng nước nông để sang bờ bên kia, lội nước, can thiệp, giao thiệp.",
    "illustration": {
      "badge": "🚶",
      "concept": "Từng bước chân lội qua dòng suối",
      "visualDesc": "Người leo núi cẩn thận từng bước chân lội qua dòng suối đá mát rượi."
    }
  },
  "渋": {
    "components": ["氵", "歰"],
    "equation": "氵 (Dòng nước) gặp chướng ngại đứng khựng lại (止) không thông suốt",
    "mnemonic": "Vị chát nơi đầu lưỡi làm se lại nước bọt, cũng như xe cộ ứ nghẽn chậm chạp trên đường, vị chát, tắc đường, điềm đạm.",
    "illustration": {
      "badge": "🛑",
      "concept": "Ùn tắc giao thông giờ cao điểm",
      "visualDesc": "Dòng xe cộ nối đuôi nhau chậm rãi di chuyển trên đường phố lúc tan tầm."
    }
  },
  "渓": {
    "components": ["氵", "奚"],
    "equation": "氵 (Dòng nước róc rách) luồn lách qua hẻm núi sâu thung lũng (奚)",
    "mnemonic": "Dòng suối trong vắt len lỏi uốn lượn qua các khe hẹp giữa hai vách núi đá, suối khe, thung lũng khe suối.",
    "illustration": {
      "badge": "🏞️",
      "concept": "Khe suối trong veo giữa hẻm núi",
      "visualDesc": "Dòng suối reo róc rách róc rách len lỏi qua thung lũng rực rỡ sắc lá đỏ mùa thu."
    }
  },
  "渚": {
    "components": ["氵", "者"],
    "equation": "氵 (Sóng nước vỗ về) nơi có người (者) ngắm nhìn bãi cát bồi",
    "mnemonic": "Bờ bãi thoai thoải nơi mép nước biển xô vào dải cát êm đềm, bãi cát ven biển, bờ nước.",
    "illustration": {
      "badge": "🌊",
      "concept": "Bãi biển thoai thoải sóng xô",
      "visualDesc": "Bờ biển hiền hòa với từng con sóng nhẹ vỗ vào dải cát mịn màng lúc hoàng hôn."
    }
  },
  "渥": {
    "components": ["氵", "屋"],
    "equation": "氵 (Nước mưa thấm đượm) róc rách bao phủ che chở cả mái nhà (屋)",
    "mnemonic": "Mưa lành thấm đượm khắp mái nhà như ân huệ to lớn ấm áp bao trùm, thấm nhuần, thâm hậu, ân huệ dày đặc.",
    "illustration": {
      "badge": "🌧️",
      "concept": "Cơn mưa rào thấm đượm mái hiên",
      "visualDesc": "Mưa rào tưới mát cả mái ngói rêu phong xua tan cái nóng oi ả."
    }
  },
  "渦": {
    "components": ["氵", "咼"],
    "equation": "氵 (Dòng nước xiết) cuộn tròn vặn vẹo quanh hốc rỗng (咼)",
    "mnemonic": "Dòng nước xoáy cuộn tròn hút mọi thứ vào lòng hố sâu giữa biển, xoáy nước, lốc xoáy lốc cuộn.",
    "illustration": {
      "badge": "🌀",
      "concept": "Vòng xoáy nước Naruto dữ dội",
      "visualDesc": "Xoáy nước khổng lồ cuộn tròn dữ dội ở eo biển Naruto tạo nên cảnh tượng kỳ thú."
    }
  },
  "湧": {
    "components": ["氵", "勇"],
    "equation": "氵 (Nước ngầm) mạnh mẽ dũng mãnh (勇) phun trào từ lòng đất",
    "mnemonic": "Nguồn nước ngọt ngào dũng mãnh phun trào cuồn cuộn từ kẽ đá sâu, phun trào, dâng trào cảm xúc.",
    "illustration": {
      "badge": "⛲",
      "concept": "Mạch nước ngầm phun trào",
      "visualDesc": "Mạch nước khoáng nóng onsen dâng trào sùng sục giữa lớp đá núi lửa."
    }
  },
  "源": {
    "components": ["氵", "原"],
    "equation": "氵 (Giọt nước đầu tiên) rỉ ra từ vách đá nơi đồng cỏ nguyên sơ (原)",
    "mnemonic": "Nơi những giọt nước đầu tiên khởi phát tạo nên dòng sông lớn cuộn chảy, nguồn cội, suối nguồn, căn nguyên.",
    "illustration": {
      "badge": "⛰️",
      "concept": "Khởi nguồn con sông trên đỉnh núi",
      "visualDesc": "Giọt nước trong vắt tí tách chảy ra từ khe đá trên đỉnh núi cao khởi nguồn cho đại giang."
    }
  },
  "溝": {
    "components": ["氵", "冓"],
    "equation": "氵 (Nước dẫn lưu) qua các rãnh đất đan xen kết cấu nhau (冓)",
    "mnemonic": "Rãnh nước đào thẳng tắp phân chia ranh giới và thoát nước cho ruộng đồng, rãnh nước, mương máng, khoảng cách.",
    "illustration": {
      "badge": "🛣️",
      "concept": "Mương nước thủy lợi ruộng đồng",
      "visualDesc": "Mương nước nhỏ bằng đá trong veo dẫn nước từ suối về tưới tiêu cho đồng lúa."
    }
  },
  "滅": {
    "components": ["氵", "戌", "火"],
    "equation": "氵 (Nước dập tắt) ngọn lửa chiến tranh (火) của binh khí giáo mác (戌)",
    "mnemonic": "Dội gáo nước dập tắt hoàn toàn tàn lửa thiêu rụi mọi mầm mống hủy hoại, tiêu diệt, diệt vong, tắt ngấm.",
    "illustration": {
      "badge": "💨",
      "concept": "Ngọn lửa bị dập tắt lụi tàn",
      "visualDesc": "Ngọn đuốc bị nước dập tắt chỉ còn lại làn khói xám mỏng manh tan vào hư không."
    }
  },
  "滉": {
    "components": ["氵", "晃"],
    "equation": "氵 (Biển nước mênh mông) tỏa ánh sáng chói lọi rạng ngời (晃)",
    "mnemonic": "Vùng biển sâu thẳm rộng lớn vô bờ tỏa ánh sáng lấp lánh rực rỡ, mênh mông, sâu thẳm sáng ngời.",
    "illustration": {
      "badge": "🌅",
      "concept": "Vùng nước sâu lấp lánh ban mai",
      "visualDesc": "Đại dương sâu thẳm trải dài bất tận lấp lánh ánh hào quang lúc bình minh."
    }
  },
  "滋": {
    "components": ["氵", "兹"],
    "equation": "氵 (Nước tưới tắm) cho cây cỏ đôi nhánh (兹) đâm chồi sum sê",
    "mnemonic": "Nguồn nước màu mỡ nuôi dưỡng vạn vật phát triển béo tốt dồi dào dinh dưỡng, tư dưỡng, phì nhiêu, bổ dưỡng.",
    "illustration": {
      "badge": "🍲",
      "concept": "Món ăn bổ dưỡng bồi bổ cơ thể",
      "visualDesc": "Bát canh hầm thảo mộc thơm lừng dồi dào chất bổ giúp cơ thể tràn đầy sinh lực."
    }
  },
  "滑": {
    "components": ["氵", "骨"],
    "equation": "氵 (Lớp nước mỏng bôi trơn) lên khúc xương tròn nhẵn (骨)",
    "mnemonic": "Mặt băng ướt nước trơn tuột khiến bàn chân dễ trượt té nhào, trơn trượt, lướt trượt, mượt mà.",
    "illustration": {
      "badge": "⛸️",
      "concept": "Đôi giày lướt trên sân băng",
      "visualDesc": "Vận động viên trượt băng uyển chuyển lướt đi trên mặt băng trơn láng phẳng lì."
    }
  },
  "滝": {
    "components": ["氵", "竜"],
    "equation": "氵 (Dòng nước đổ ầm ầm từ trên cao) tựa như rồng thiêng uốn lượn giáng trần (竜)",
    "mnemonic": "Dòng nước khổng lồ đổ từ vách đá dựng đứng xuống bọt tung trắng xóa như rồng uốn lượn, thác nước.",
    "illustration": {
      "badge": "🌊",
      "concept": "Ngọn thác đổ trắng xóa ầm ầm",
      "visualDesc": "Thác nước Nachi hùng vĩ đổ thẳng từ vách núi cao xuống mặt hồ xanh ngắt bốc hơi sương."
    }
  },
  "滞": {
    "components": ["氵", "帯"],
    "equation": "氵 (Nước ứ đọng) do dải dây đai thắt chặt (帯) nghẽn lối thoát",
    "mnemonic": "Nước bị thắt nghẽn ứ đọng không chảy được dẫn tới mọi việc bị ngưng trệ, đình trệ, ứ đọng, lưu trú.",
    "illustration": {
      "badge": "⏳",
      "concept": "Đình trệ tắc nghẽn công việc",
      "visualDesc": "Chiếc đồng hồ cát dừng lại với dòng cát nghẽn tại cổ chai chưa thông suốt."
    }
  },
  "漂": {
    "components": ["氵", "票"],
    "equation": "氵 (Nước biển) cuốn trôi tấm thẻ nhẹ tênh (票) bập bềnh theo sóng",
    "mnemonic": "Chiếc lá nhỏ hay mảnh gỗ nhẹ nổi trên mặt nước trôi dạt vô định theo ngọn sóng, phiêu bạt, trôi dạt, tẩy trắng.",
    "illustration": {
      "badge": "⛵",
      "concept": "Chiếc thuyền trôi dạt trên biển",
      "visualDesc": "Chiếc chai thủy tinh chứa bức thư tình trôi dạt bập bềnh giữa đại dương bao la."
    }
  },
  "漆": {
    "components": ["氵", "木", "人", "氺"],
    "equation": "Chất nhựa lỏng (氵) rỉ ra từ vết rạch trên thân cây (木) giọt từng giọt (氺)",
    "mnemonic": "Nhựa cây sơn rỉ ra quét lên đồ gỗ tạo lớp bóng đen tuyền huyền bí bền bỉ trăm năm, cây sơn, sơn mài (urushi).",
    "illustration": {
      "badge": "🥢",
      "concept": "Bát sơn mài đen bóng urushi",
      "visualDesc": "Bát gỗ sơn mài truyền thống Nhật Bản đen tuyền bóng bẩy viền chỉ vàng sang trọng."
    }
  },
  "漏": {
    "components": ["氵", "尸", "雨"],
    "equation": "氵 (Nước mưa 雨 dột qua mái nhà 尸) rơi tí tách xuống sàn",
    "mnemonic": "Nước mưa rỉ qua lỗ hổng trên mái nhà rơi tí tách làm lộ ra sơ hở, rò rỉ, lọt ra, dột nát, sơ lậu.",
    "illustration": {
      "badge": "🪣",
      "concept": "Nước dột tí tách qua mái ngói",
      "visualDesc": "Chiếc chậu hứng từng giọt nước mưa rò rỉ rớt xuống từ kẽ hở trên trần nhà."
    }
  },
  "漠": {
    "components": ["氵", "莫"],
    "equation": "氵 (Nước biến mất) mịt mù tăm tối dưới ánh mặt trời hoang vu (莫)",
    "mnemonic": "Vùng đất cạn kiệt nguồn nước cát bay mù trời hoang vu mênh mông vô tận, sa mạc, mênh mông, mờ mịt.",
    "illustration": {
      "badge": "🏜️",
      "concept": "Sa mạc cát trải dài tít tắp",
      "visualDesc": "Đoàn lạc đà chậm rãi bước đi trên triền cát sa mạc mênh mông dưới ráng chiều."
    }
  },
  "漫": {
    "components": ["氵", "曼"],
    "equation": "氵 (Nước tràn trề) tự do lan tỏa dài bất tận không câu thúc (曼)",
    "mnemonic": "Dòng nước tràn lan chảy tự do phóng túng vẽ nên những bức họa không gò bó, tràn lan, tản mạn, mạn họa manga.",
    "illustration": {
      "badge": "🎨",
      "concept": "Trang truyện tranh manga tản mạn",
      "visualDesc": "Trang truyện tranh vẽ nét bút lông phóng khoáng tự do kể câu chuyện kỳ thú."
    }
  },
  "漬": {
    "components": ["氵", "責"],
    "equation": "氵 (Nước muối ngập tràn) đè nén sức nặng chịu đựng (責) lên rau củ",
    "mnemonic": "Đặt tảng đá nặng đè rau củ ngập trong vại nước muối để lên men chua giòn thơm ngon, ngâm muối, dưa chua tsukemono.",
    "illustration": {
      "badge": "🥒",
      "concept": "Món dưa muối tsukemono giòn ngon",
      "visualDesc": "Đĩa dưa leo cà tím ngâm muối dầm giòn tan ngon miệng trong bữa cơm Nhật Bản."
    }
  },
  "漱": {
    "components": ["氵", "束", "欠"],
    "equation": "氵 (Nước súc họng) ngậm chặt từng bó (束) rồi há miệng phun ra (欠)",
    "mnemonic": "Ngậm một ngụm nước trong miệng súc sạch cổ họng rồi nhổ cặn bẩn ra ngoài, súc miệng, súc họng.",
    "illustration": {
      "badge": "🚰",
      "concept": "Súc miệng nhổ bọt nước sạch sẽ",
      "visualDesc": "Người cúi mình súc miệng bên vòi nước sạch bảo vệ răng miệng thơm tho."
    }
  },
  "漸": {
    "components": ["氵", "斬"],
    "equation": "氵 (Dòng nước xói mòn) từng chút từng chút như lưỡi rìu chém phạt chậm rãi (斬)",
    "mnemonic": "Nước chảy đá mòn từng chút một theo thời gian chậm mà chắc chắn, dần dần, tiệm tiến, từng bước.",
    "illustration": {
      "badge": "📈",
      "concept": "Từng bậc thang tiến bộ chậm rãi",
      "visualDesc": "Con đường dốc thoai thoải với từng bậc thang dẫn dần dần lên đỉnh núi mây phủ."
    }
  },
  "潔": {
    "components": ["氵", "吉", "糸"],
    "equation": "氵 (Nước sạch) giặt sạch cuộn chỉ tơ (糸) tốt lành tinh tươm (吉)",
    "mnemonic": "Dòng nước trong rửa sạch tấm vải tơ không còn vết nhơ bẩn, thanh khiết, liêm khiết, tinh khôi.",
    "illustration": {
      "badge": "🧼",
      "concept": "Tấm vải tơ tinh khiết trắng ngần",
      "visualDesc": "Tấm lụa trắng tinh khôi phơi dưới nắng ấm không vướng một hạt bụi trần."
    }
  },
  "潜": {
    "components": ["氵", "朁"],
    "equation": "氵 (Làn nước sâu) lặn ngụp ẩn mình kín đáo dưới tầng nước",
    "mnemonic": "Hít sâu một hơi rồi lặn sâu xuống đáy nước ẩn mình không ai trông thấy, lặn sâu, tiềm ẩn, tiềm thức.",
    "illustration": {
      "badge": "🤿",
      "concept": "Thợ lặn bơi sâu dưới rạn san hô",
      "visualDesc": "Người thợ lặn bơi lội nhẹ nhàng khám phá thế giới bí ẩn sâu dưới đáy đại dương."
    }
  },
  "潟": {
    "components": ["氵", "舄"],
    "equation": "氵 (Nước thủy triều mặn) rút đi để lại bãi đất đầm phá ven biển (舄)",
    "mnemonic": "Vùng nước cạn ven biển ngăn cách bởi dải cát bồi tạo thành đầm nước lợ trù phú, đầm phá, Niigata.",
    "illustration": {
      "badge": "🌊",
      "concept": "Đầm phá ven biển Niigata",
      "visualDesc": "Đầm nước lợ mênh mông phẳng lặng với những cánh cò trắng chao liệng ven vịnh biển."
    }
  },
  "潤": {
    "components": ["氵", "閏"],
    "equation": "氵 (Mưa ẩm dồi dào) thấm qua cánh cổng hoàng gia trong năm nhuận (閏)",
    "mnemonic": "Làn mưa xuân thấm đẫm đất đai khô cằn làm màu mỡ sinh lợi ích tài lộc dồi dào, ẩm ướt, nhuận tràng, lợi nhuận.",
    "illustration": {
      "badge": "💧",
      "concept": "Giọt sương ẩm mượt trên cánh hoa",
      "visualDesc": "Những giọt sương mai đọng trên cánh hoa mềm mại dưỡng ẩm cho đất trời tươi tốt."
    }
  },
  "潮": {
    "components": ["氵", "朝"],
    "equation": "氵 (Dòng nước biển dâng lên) đón ánh bình minh buổi sáng sớm (朝)",
    "mnemonic": "Dòng nước biển dâng cao cuồn cuộn vào buổi sáng sớm đón ánh bình minh rạng rỡ, thủy triều buổi sớm, trào lưu.",
    "illustration": {
      "badge": "🌊",
      "concept": "Dòng thủy triều sớm đón bình minh",
      "visualDesc": "Từng lớp sóng bạc đầu dâng cao tràn ngập bờ cảng dưới ánh mặt trời rực đỏ mọc lên từ biển."
    }
  },
  "澄": {
    "components": ["氵", "登"],
    "equation": "氵 (Dòng nước) cặn bã chìm lắng xuống để phần nước trong vắt dâng lên cao (登)",
    "mnemonic": "Nước để lắng hết cặn bã trở nên trong suốt nhìn thấu tận đáy sâu, trong trẻo, trong vắt, thanh trừng.",
    "illustration": {
      "badge": "💎",
      "concept": "Mặt hồ phẳng lặng trong vắt như gương",
      "visualDesc": "Mặt hồ trên núi cao trong vắt không một gợn sóng soi bóng bầu trời xanh thẳm."
    }
  },
  "澪": {
    "components": ["氵", "零"],
    "equation": "氵 (Làn nước) với những cọc tiêu chỉ đường như hạt mưa rơi (零)",
    "mnemonic": "Luồng lạch nước sâu an toàn giữa bãi cạn được cắm cọc tiêu dẫn lối tàu bè ra vào cảng, luồng lạch thuyền đi.",
    "illustration": {
      "badge": "⛵",
      "concept": "Lạch nước sâu cho tàu bè đi lại",
      "visualDesc": "Hai hàng cọc tiêu cắm dọc lạch nước xanh dẫn lối con thuyền rẽ sóng vào bờ an toàn."
    }
  },
  "激": {
    "components": ["氵", "敫"],
    "equation": "氵 (Dòng nước chảy xiết) va đập vào vách đá tung bọt trắng xóa (敫)",
    "mnemonic": "Dòng nước hung dữ đập mạnh vào ghềnh đá cuộn trào sôi sục dữ dội, kịch liệt, kích thích, dữ dội.",
    "illustration": {
      "badge": "⚡",
      "concept": "Cơn sóng xô bờ dữ dội kịch liệt",
      "visualDesc": "Những ngọn sóng thần dội vào ghềnh đá bắn tung bọt nước trắng xóa lên trời cao."
    }
  },
  "濁": {
    "components": ["氵", "蜀"],
    "equation": "氵 (Dòng nước đục ngầu) có ấu trùng sâu bọ lúc nhúc khuấy đảo (蜀)",
    "mnemonic": "Nước mưa cuốn theo bùn đất đục ngầu mất đi vẻ trong trẻo ban đầu, vẩn đục, ô trọc, âm đục (dakuten).",
    "illustration": {
      "badge": "☕",
      "concept": "Dòng nước lũ vẩn đục bùn lầy",
      "visualDesc": "Dòng suối sau cơn mưa rào cuộn chảy đục ngầu phù sa đất đỏ."
    }
  },
  "濫": {
    "components": ["氵", "監"],
    "equation": "氵 (Dòng nước vượt quá mức) chiếc chậu soi gương giám sát (監) có thể chứa đựng",
    "mnemonic": "Nước dâng quá nhiều tràn cả bờ bao gây lụt lội hủy hoại muôn nơi, tràn lan, lạm dụng, lạm phát.",
    "illustration": {
      "badge": "🌊",
      "concept": "Nước tràn bờ đê lạm ngập",
      "visualDesc": "Dòng nước tràn qua bờ kè đổ ào ạt vào đồng ruộng vì vượt quá sức chứa."
    }
  },
  "瀬": {
    "components": ["氵", "頼"],
    "equation": "氵 (Dòng nước suối chảy xiết) nơi khách bộ hành phải nương tựa (頼) vào gậy đá để bước qua",
    "mnemonic": "Khúc suối nông nhiều ghềnh đá nước chảy cuồn cuộn xiết mạnh nơi lòng sông, vũng cạn, ghềnh đá, thác ghềnh.",
    "illustration": {
      "badge": "🏞️",
      "concept": "Khúc suối ghềnh đá nước chảy xiết",
      "visualDesc": "Dòng nước trong veo chảy xiết qua bãi đá cuội nhấp nhô giữa lòng suối mát."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n1gData)) {
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

console.log(`[Batch 5G - N1 Part 7] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n1gData).length} chữ Kanji N1.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
