/**
 * Batch 5D: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 95 chữ Kanji N1 tiếp theo (từ 峡 đến 愉)
 */

const fs = require('fs');
const path = require('path');

const n1dData = {
  "峡": {
    "components": ["山", "夹"],
    "equation": "山 (Núi non) + 夹 (Kẹp - hai vách đá kẹp ép chặt vào nhau)",
    "mnemonic": "Dòng sông bị kẹp chặt giữa hai vách núi đá dựng đứng cheo leo (山-夹), hẻm núi, eo biển.",
    "illustration": {
      "badge": "🏞️",
      "concept": "Hẻm núi sâu hun hút",
      "visualDesc": "Dòng sông xanh biếc len lỏi giữa hai bờ vách đá hẻm núi sừng sững."
    }
  },
  "峰": {
    "components": ["山", "夆"],
    "equation": "山 (Ngọn núi) + 夆 (Phùng - mũi nhọn vươn lên cao chạm đỉnh)",
    "mnemonic": "Ngọn núi (山) vươn mũi chóp nhọn hoắt chạm đến từng tầng mây xanh (夆), đỉnh núi, ngọn phong.",
    "illustration": {
      "badge": "🏔️",
      "concept": "Đỉnh núi tuyết nhọn",
      "visualDesc": "Chóp núi tuyết nhọn hoắt phát sáng dưới ánh bình minh rạng rỡ."
    }
  },
  "峻": {
    "components": ["山", "夋"],
    "equation": "山 (Vách núi) + 夋 (Thuấn - dốc cao cheo leo khó bước chân)",
    "mnemonic": "Vách núi dựng đứng cheo leo hiểm hóc không một lối mòn (山-夋), hiểm trở, nghiêm nghị khắt khe.",
    "illustration": {
      "badge": "🧗",
      "concept": "Vách núi dốc đứng hiểm trở",
      "visualDesc": "Mỏm đá dựng đứng 90 độ thử thách lòng can đảm của nhà leo núi."
    }
  },
  "崇": {
    "components": ["山", "宗"],
    "equation": "山 (Núi cao vòi vọi) + 宗 (Tông miếu tổ tiên linh thiêng)",
    "mnemonic": "Đặt tông miếu trên đỉnh non cao thanh tịnh để muôn dân chiêm bái ngưỡng mộ (山-宗), tôn sùng, sùng kính.",
    "illustration": {
      "badge": "⛩️",
      "concept": "Ngôi đền trên đỉnh núi sùng kính",
      "visualDesc": "Đền thờ linh thiêng ẩn hiện trong sương mờ trên đỉnh núi cao thiêng liêng."
    }
  },
  "崎": {
    "components": ["山", "奇"],
    "equation": "山 (Mỏm núi) + 奇 (Kỳ lạ, nhô ra bất thường)",
    "mnemonic": "Mỏm núi đá (山) uốn lượn nhô ra biển với hình thế hiểm trở kỳ lạ (奇), mũi đất ven biển, tỉnh Nagasaki.",
    "illustration": {
      "badge": "🌊",
      "concept": "Mũi đá Nagasaki nhô ra biển",
      "visualDesc": "Vách đá nhấp nhô nhô hẳn ra làn sóng biển xanh biếc tung bọt trắng xóa."
    }
  },
  "崚": {
    "components": ["山", "夌"],
    "equation": "山 (Núi) + 夌 (Lăng - trèo lên các bờ dốc gồ ghề)",
    "mnemonic": "Núi non lớp lớp gập ghềnh hiểm trở nối tiếp nhau đến chân trời, núi cao trùng điệp.",
    "illustration": {
      "badge": "⛰️",
      "concept": "Dãy núi trùng điệp",
      "visualDesc": "Dãy núi điệp trùng sắc lam mờ ảo trải dài ngút ngàn về phía hoàng hôn."
    }
  },
  "崩": {
    "components": ["山", "朋"],
    "equation": "山 (Núi đá) bị nứt đôi thành hai nửa (朋) sụp đổ ầm ầm",
    "mnemonic": "Ngọn núi đá kiên cố bị nứt toác đổ sập từng mảng lớn xuống vực, sụp lở, đổ vỡ, vua băng hà.",
    "illustration": {
      "badge": "💥",
      "concept": "Vách núi sạt lở sụp đổ",
      "visualDesc": "Từng tảng đá lớn sạt lở bụi cuốn mịt mù từ vách núi dốc đứng."
    }
  },
  "嵐": {
    "components": ["山", "風"],
    "equation": "山 (Dãy núi cao) + 風 (Gió gầm rít dữ dội)",
    "mnemonic": "Cơn gió lốc dữ dội (風) càn quét dữ dội qua những rặng núi cao (山), bão tố, cơn giông arashi.",
    "illustration": {
      "badge": "🌪️",
      "concept": "Cơn bão giông tố gầm rít",
      "visualDesc": "Cơn lốc xoáy với mây đen cuồn cuộn quét qua sườn núi mù mịt."
    }
  },
  "嵩": {
    "components": ["山", "高"],
    "equation": "山 (Ngọn núi) + 高 (Cao vút ngút ngàn)",
    "mnemonic": "Ngọn núi cao sừng sững đồ sộ chạm trời xanh (山-高), đồ sộ, cồng kềnh, núi Tung Sơn.",
    "illustration": {
      "badge": "🏔️",
      "concept": "Ngọn Tung Sơn hùng vĩ",
      "visualDesc": "Đỉnh Tung Sơn sừng sững với các tầng mây trắng lượn quanh chân núi."
    }
  },
  "嵯": {
    "components": ["山", "差"],
    "equation": "山 (Núi non) + 差 (Sai lệch, cao thấp không đều nhau)",
    "mnemonic": "Dãy núi có các chóp đá nhấp nhô cao thấp chênh lệch gồ ghề (山-差), lởm chởm, vùng Saga ở Kyoto.",
    "illustration": {
      "badge": "🎋",
      "concept": "Rừng trúc Sagano Kyoto",
      "visualDesc": "Rừng tre xanh mướt uốn lượn dưới chân sườn núi Saga tĩnh mịch."
    }
  },
  "嶺": {
    "components": ["山", "領"],
    "equation": "山 (Núi) + 領 (Cổ áo, đỉnh chóp cao nhất thống lĩnh)",
    "mnemonic": "Dải đỉnh núi chạy dài như đường viền cổ áo của dải non sông (山-領), rặng núi, dải núi cao.",
    "illustration": {
      "badge": "🌄",
      "concept": "Dãy rặng núi cao trùng điệp",
      "visualDesc": "Đường sống núi uốn lượn như dải lụa mềm mại giữa đại ngàn bao la."
    }
  },
  "巌": {
    "components": ["山", "敢"],
    "equation": "山 (Núi non) + 敢 (Dũng cảm, trơ gan cùng tuế nguyệt)",
    "mnemonic": "Tảng đá hoa cương khổng lồ trơ gan cùng mưa nắng bão táp trên sườn non, tảng đá lớn, vách nham.",
    "illustration": {
      "badge": "🪨",
      "concept": "Tảng đá nham thạch sừng sững",
      "visualDesc": "Khối đá tảng rêu phong khổng lồ đứng hiên ngang giữa dòng thác xiết."
    }
  },
  "巡": {
    "components": ["巛", "辶"],
    "equation": "辶 (Bước chân đi lại) men theo dòng chảy uốn lượn của dòng sông (巛)",
    "mnemonic": "Bước chân rảo bước tuần tra theo dọc con sông uốn khúc quanh thành lũy, tuần tra, tuần hoàn.",
    "illustration": {
      "badge": "🚔",
      "concept": "Xe cảnh sát tuần tra",
      "visualDesc": "Đèn tuần tra chớp sáng khi xe đi kiểm tra trật tự từng góc phố ban đêm."
    }
  },
  "巣": {
    "components": ["巛", "田", "木"],
    "equation": "Cành cây trên cao (木) đan thành chiếc tổ có ba chú chim non mở miệng đón mồi (巛-田)",
    "mnemonic": "Những chú chim non há mỏ chờ mồi trong chiếc tổ rơm đan ấm áp trên cành cây cao, tổ chim, sào huyệt.",
    "illustration": {
      "badge": "🪺",
      "concept": "Tổ chim ấm áp trên cây",
      "visualDesc": "Chiếc tổ chim bện bằng cọng rơm khô ấp ủ những quả trứng nhỏ xinh xắn."
    }
  },
  "巧": {
    "components": ["工", "丂"],
    "equation": "工 (Thợ thủ công) + 丂 (Uốn lượn đường nét tinh vi)",
    "mnemonic": "Đôi tay người thợ (工) chạm trổ uốn lượn từng chi tiết tinh vi điêu luyện (丂), khéo léo, tinh xảo.",
    "illustration": {
      "badge": "🎨",
      "concept": "Bàn tay khéo léo tinh xảo",
      "visualDesc": "Nghệ nhân dùng dao khắc từng đường nét tinh xảo lên vỏ trứng mỏng."
    }
  },
  "己": {
    "components": ["己"],
    "equation": "己 (Tượng hình sợi dây uốn lượn đánh dấu bản thân, can Kỷ)",
    "mnemonic": "Sợi dây buộc gọn gàng nhắc nhở bản thân luôn biết tự chủ tu dưỡng, chính mình, bản thân, can Kỷ.",
    "illustration": {
      "badge": "🪞",
      "concept": "Tự soi mình sửa mình",
      "visualDesc": "Gương soi phản chiếu bản thân nhắc nhở việc tự rèn giũa mỗi ngày."
    }
  },
  "巳": {
    "components": ["巳"],
    "equation": "巳 (Tượng hình thai nhi co mình hoặc loài rắn cuộn khúc ngóc đầu)",
    "mnemonic": "Hình con rắn cuộn khúc mình ngóc đầu canh giữ, chi Tỵ (9h-11h sáng), cầm tinh con rắn.",
    "illustration": {
      "badge": "🐍",
      "concept": "Chú rắn chi Tỵ",
      "visualDesc": "Chú rắn hoa cuộn mình êm đềm trên nhánh cây rừng nhiệt đới."
    }
  },
  "巴": {
    "components": ["巴"],
    "equation": "巴 (Tượng hình con trăn cuộn khúc hoặc hình vòng xoáy tomoe truyền thống)",
    "mnemonic": "Hình xoáy nước hoặc giọt nước tròn uốn đuôi đặc trưng trên trống hội, hình tomoe, xứ Ba Thục.",
    "illustration": {
      "badge": "🌀",
      "concept": "Họa tiết vòng xoáy Tomoe",
      "visualDesc": "Biểu tượng ba giọt nước xoay tròn mitsu-tomoe trên mặt trống Taiko truyền thống."
    }
  },
  "巽": {
    "components": ["巳", "巳", "共"],
    "equation": "Hai người cùng quỳ gối kính cẩn (巳-巳) nâng chiếc mâm lễ vật (共)",
    "mnemonic": "Kính cẩn nhún nhường dâng mâm lễ vật tạ ơn trời đất, quẻ Tốn trong bát quái, hướng Đông Nam.",
    "illustration": {
      "badge": "🧭",
      "concept": "La bàn chỉ hướng Tốn",
      "visualDesc": "Mặt la bàn bát quái cổ hiển thị quẻ Tốn hướng đông nam thanh phong."
    }
  },
  "帆": {
    "components": ["巾", "凡"],
    "equation": "巾 (Tấm vải bạt) + 凡 (Hứng trọn luồng gió bao trùm)",
    "mnemonic": "Tấm vải bạt lớn (巾) căng gió đón lấy động lực đẩy thuyền lao nhanh trên sóng (凡), cánh buồm.",
    "illustration": {
      "badge": "⛵",
      "concept": "Thuyền buồm căng gió",
      "visualDesc": "Con thuyền buồm trắng lướt đi dũng mãnh giữa đại dương sóng vỗ."
    }
  },
  "帝": {
    "components": ["亠", "䒑", "冖", "巾"],
    "equation": "Đấng tối cao mặc áo tế lễ uy nghi đầu đội vương miện thống lĩnh thiên hạ",
    "mnemonic": "Đấng quân vương đứng đầu thiên hạ với áo mũ trang nghiêm cai quản muôn dân, hoàng đế, Thượng đế.",
    "illustration": {
      "badge": "👑",
      "concept": "Ngai vàng hoàng đế",
      "visualDesc": "Chiếc ngai vàng chạm rồng uy nghiêm đặt giữa đại điện hoàng cung."
    }
  },
  "帥": {
    "components": ["𠂤", "巾"],
    "equation": "𠂤 (Đoàn quân kiên cố) + 巾 (Lá cờ lệnh chỉ huy tung bay)",
    "mnemonic": "Vị chỉ huy phất cờ lệnh (巾) điều binh khiển tướng hàng vạn chiến binh (𠂤), nguyên soái, thống soái.",
    "illustration": {
      "badge": "🎖️",
      "concept": "Cờ lệnh nguyên soái",
      "visualDesc": "Vị dũng tướng đứng trên đài chỉ huy phất cờ lệnh điều động binh mã."
    }
  },
  "帳": {
    "components": ["巾", "長"],
    "equation": "巾 (Mảnh vải, trang giấy) + 長 (Dài dằng dặc, lâu dài)",
    "mnemonic": "Tập giấy dài dằng dặc (長) ghi chép chi thu tiền bạc cẩn thận bằng vải/bìa (巾), sổ sách, màn trướng.",
    "illustration": {
      "badge": "📒",
      "concept": "Quyển sổ ghi chép chi thu",
      "visualDesc": "Cuốn sổ tay bìa da mở ra với các dòng ghi chép chi tiêu rõ ràng."
    }
  },
  "幕": {
    "components": ["巾", "莫"],
    "equation": "莫 (Mặt trời lặn sau đồng cỏ tối tăm) buông tấm vải rèm che lại (巾)",
    "mnemonic": "Tấm rèm vải lớn buông xuống khép lại vở kịch như màn đêm bao phủ, bức màn, Mạc phủ samurai.",
    "illustration": {
      "badge": "🎭",
      "concept": "Bức màn sân khấu nhung đỏ",
      "visualDesc": "Bức màn nhung đỏ sân khấu từ từ khép lại trong tràng pháo tay giòn giã."
    }
  },
  "幣": {
    "components": ["敝", "巾"],
    "equation": "敝 (Tấm vải quý giá được cắt tỉa dâng tế) + 巾 (Dải lụa thờ thần linh)",
    "mnemonic": "Dải lụa trắng linh thiêng dâng cúng thần đền, sau dùng chỉ vật phẩm giá trị trao đổi, tiền tệ, tiền giấy.",
    "illustration": {
      "badge": "💵",
      "concept": "Tiền tệ lưu thông",
      "visualDesc": "Xấp tiền giấy mới tinh được in ấn sắc nét dùng trong lưu thông tài chính."
    }
  },
  "幹": {
    "components": ["十", "日", "十", "人", "干"],
    "equation": "Thân cây vươn thẳng vững vàng dưới ánh mặt trời nâng đỡ tán lá xum xuê",
    "mnemonic": "Thân cây to lớn vững chãi nâng đỡ toàn bộ cành lá xum xuê, thân cây, cán bộ nòng cốt.",
    "illustration": {
      "badge": "🌳",
      "concept": "Thân cây cổ thụ vững chắc",
      "visualDesc": "Thân cây sồi khổng lồ xù xì bám rễ sâu vào lòng đất nâng đỡ cả tán rừng."
    }
  },
  "幻": {
    "components": ["幺", "一"],
    "equation": "Sợi tơ nhỏ uốn lượn mờ ảo biến hóa khôn lường khó nắm bắt",
    "mnemonic": "Sợi tơ mờ mờ ảo ảo thoắt ẩn thoắt hiện như màn sương khói, huyền ảo, ảo tưởng, huyễn mộng.",
    "illustration": {
      "badge": "🪄",
      "concept": "Ảo ảnh huyền ảo",
      "visualDesc": "Cánh bướm phát sáng lập lòe chao lượn trong làn sương đêm kỳ ảo."
    }
  },
  "幽": {
    "components": ["山", "幺", "幺"],
    "equation": "Hai cuộn tơ nhỏ (幺-幺) ẩn sâu trong lòng hang núi hẻo lánh (山)",
    "mnemonic": "Hai sợi tơ mảnh mai lẩn khuất sâu trong thung lũng núi non tối tăm, u tối, u uất, u tịch.",
    "illustration": {
      "badge": "🕯️",
      "concept": "Ánh nến trong hang u tối",
      "visualDesc": "Ngọn nến leo lét soi bóng thạch nhũ trong hang động u tịch thâm sâu."
    }
  },
  "庄": {
    "components": ["广", "土"],
    "equation": "广 (Mái nhà) + 土 (Đất đai ruộng vườn trồng trọt)",
    "mnemonic": "Ngôi nhà rộng lớn (广) gắn liền với đất đai nông trang trù phú (土), thôn trang, trang trại.",
    "illustration": {
      "badge": "🏡",
      "concept": "Trang trại đồng quê",
      "visualDesc": "Ngôi nhà gỗ mộc mạc bên luống rau xanh và hàng rào hoa đồng nội."
    }
  },
  "序": {
    "components": ["广", "予"],
    "equation": "广 (Mái sảnh đường) + 予 (Trao cho vị trí tuần tự theo phép tắc)",
    "mnemonic": "Trong sảnh đường trang trọng (广) mọi người được xếp chỗ ngồi theo đúng ngôi thứ phân minh (予), thứ tự, tự ngôn.",
    "illustration": {
      "badge": "📑",
      "concept": "Trang lời tựa mở đầu",
      "visualDesc": "Trang đầu cuốn sách in dòng chữ 'Lời nói đầu' trang nhã khai mở tác phẩm."
    }
  },
  "庶": {
    "components": ["广", "廿", "灬"],
    "equation": "Dưới mái nhà (广), bếp lửa ấm cúng (灬) nấu chín bữa ăn cho đông đảo con cháu quây quần",
    "mnemonic": "Bếp lửa sưởi ấm cho đông đảo mọi người bình dân cùng sinh sống dưới mái nhà, thứ dân, bình dân.",
    "illustration": {
      "badge": "👥",
      "concept": "Đông đảo thứ dân",
      "visualDesc": "Người dân phố thị tấp nập mua bán vui vẻ trên hè phố phồn hoa."
    }
  },
  "康": {
    "components": ["广", "隶"],
    "equation": "Dưới mái nhà (广) hai tay cầm sàng sẩy thóc gạo (隶) no đủ không lo ốm đau",
    "mnemonic": "Cuộc sống dưới mái nhà ấm êm đủ lúa gạo ăn giúp cơ thể khỏe mạnh an vui, an khang, khang kiện.",
    "illustration": {
      "badge": "🌾",
      "concept": "An khang thịnh vượng",
      "visualDesc": "Bát cơm trắng dẻo thơm bên cành hoa mai đón xuân an khang."
    }
  },
  "庸": {
    "components": ["广", "庚"],
    "equation": "Dưới mái nhà (广) cầm búa rìu gõ nhịp điệu quen thuộc lặp đi lặp lại (庚)",
    "mnemonic": "Làm những việc quen thuộc lặp đi lặp lại dưới mái nhà không có gì đột phá, bình thường, tầm thường, trung dung.",
    "illustration": {
      "badge": "😐",
      "concept": "Bình thường trung dung",
      "visualDesc": "Cán cân thăng bằng ở mức giữa biểu thị trạng thái trung dung bình dị."
    }
  },
  "廃": {
    "components": ["广", "発"],
    "equation": "广 (Mái nhà xưởng) + 発 (Bắn tên/đưa đi hết không còn ai sử dụng)",
    "mnemonic": "Ngôi nhà bỏ hoang đồ đạc đã dọn đi hết (广-発) để mặc thời gian làm mục nát, hoang phế, tàn phế.",
    "illustration": {
      "badge": "🏚️",
      "concept": "Ngôi nhà hoang phế",
      "visualDesc": "Tòa lâu đài đổ nát phủ đầy dây leo xanh bên sườn đồi vắng lặng."
    }
  },
  "廉": {
    "components": ["广", "兼"],
    "equation": "广 (Chốn quan phủ) + 兼 (Kiêm toàn, trong sạch vẹn toàn)",
    "mnemonic": "Viên quan sống dưới mái nhà thanh bạch giữ lòng ngay thẳng không tơ hào tham nhũng, thanh liêm, liêm giá (giá rẻ).",
    "illustration": {
      "badge": "⚖️",
      "concept": "Bậc quan thanh liêm",
      "visualDesc": "Bàn làm việc mộc mạc thanh bần của vị quan thanh liêm vì dân."
    }
  },
  "廊": {
    "components": ["广", "郎"],
    "equation": "广 (Mái nhà) + 郎 (Lang - chàng trai bước đi qua dãy lầu)",
    "mnemonic": "Lối đi dài có mái che nối liền các gian nhà trong phủ viện (广-郎), hành lang.",
    "illustration": {
      "badge": "⛩️",
      "concept": "Hành lang gỗ đền chùa",
      "visualDesc": "Dãy hành lang gỗ đỏ cong cong dẫn lối quanh khu vườn thiền thanh tịnh."
    }
  },
  "廷": {
    "components": ["廴", "壬"],
    "equation": "廴 (Bước chân dài trang nghiêm) + 壬 (Người đứng thẳng hàng lối bẩm tấu)",
    "mnemonic": "Nơi bá quan văn võ tề tựu đứng thẳng hàng ngũ uy nghiêm bẩm tấu việc nước, triều đình, pháp đình.",
    "illustration": {
      "badge": "🏛️",
      "concept": "Sân triều đình uy nghiêm",
      "visualDesc": "Bậc thềm đá dẫn lên cung điện triều đình với hai hàng quan đứng trang nghiêm."
    }
  },
  "弁": {
    "components": ["厶", "廾"],
    "equation": "Hai bàn tay đưa lên chỉnh lại chiếc mũ miện / miệng lưỡi sắc sảo biện giải",
    "mnemonic": "Hai tay nâng chỉnh chiếc mũ đội đầu đĩnh đạc cất lời tranh biện sắc bén, biện luận, van khóa, hộp cơm bento.",
    "illustration": {
      "badge": "🍱",
      "concept": "Hộp cơm Bento Nhật Bản",
      "visualDesc": "Hộp cơm bento truyền thống bài trí màu sắc ngon mắt và cân đối dinh dưỡng."
    }
  },
  "弊": {
    "components": ["敝", "廾"],
    "equation": "敝 (Rách nát, hư hỏng) + 廾 (Hai tay giơ lên bất lực trước tổn thất)",
    "mnemonic": "Hai tay giơ lên trước những điều sai trái làm hư hỏng nát bấy nề nếp, tệ hại, thói tệ, tệ nạn.",
    "illustration": {
      "badge": "📉",
      "concept": "Tổn hại tiêu cực",
      "visualDesc": "Bức tường nứt nẻ đổ nát biểu thị sự suy đồi và thói hư tật xấu."
    }
  },
  "弐": {
    "components": ["弋", "二"],
    "equation": "Biến thể chữ Hán phồn tạp trang trọng của chữ 二 (Nhị) chống sửa chữa gian lận",
    "mnemonic": "Cách viết số hai (2) trang trọng trong hợp đồng tài chính ngân hàng để bảo đảm tính pháp lý, số hai đại tự.",
    "illustration": {
      "badge": "2️⃣",
      "concept": "Số hai đại tự pháp lý",
      "visualDesc": "Con dấu khắc chữ Nhị đại tự trang trọng đóng trên văn bản khế ước."
    }
  },
  "弓": {
    "components": ["弓"],
    "equation": "弓 (Tượng hình thân cây cung bằng gỗ uốn cong với dây cung căng thẳng)",
    "mnemonic": "Hình cánh cung uốn cong đàn hồi sẵn sàng bắn mũi tên vút bay, cây cung.",
    "illustration": {
      "badge": "🏹",
      "concept": "Cánh cung uốn cong",
      "visualDesc": "Cây cung gỗ truyền thống của cung thủ kyudo uốn cong tuyệt mỹ."
    }
  },
  "弔": {
    "components": ["弓", "丨"],
    "equation": "弓 (Cây cung mang trên vai) + 丨 (Mũi tên đi săn bảo vệ xác người thân)",
    "mnemonic": "Thời cổ người ta mang cung tên đi bảo vệ thi thể người thân khỏi dã thú, viếng tang, phúng điếu.",
    "illustration": {
      "badge": "💐",
      "concept": "Bó hoa phúng điếu",
      "visualDesc": "Bó hoa cúc trắng thắt nơ đen trang nghiêm bày tỏ lòng tiếc thương vô hạn."
    }
  },
  "弘": {
    "components": ["弓", "厶"],
    "equation": "弓 (Cánh cung) giương căng hết cỡ phát ra âm thanh vang dội (厶)",
    "mnemonic": "Kéo căng cánh cung hết mức mở rộng tầm bắn xa muôn dặm, rộng lớn, phát dương hoằng đại.",
    "illustration": {
      "badge": "🌐",
      "concept": "Rộng mở bao la",
      "visualDesc": "Đường chân trời mở rộng ngút tầm mắt đón ánh hào quang rực rỡ."
    }
  },
  "弥": {
    "components": ["弓", "尔"],
    "equation": "弓 (Cánh cung buông lỏng) + 尔 (Lan tỏa nhẹ nhàng khắp nơi)",
    "mnemonic": "Cánh cung buông lơi để năng lượng hòa bình lan tỏa ngập tràn khắp muôn nơi, tràn ngập, càng ngày càng, tháng ba.",
    "illustration": {
      "badge": "🌸",
      "concept": "Mùa xuân Yayoi tháng ba",
      "visualDesc": "Hoa anh đào nở rộ ngập tràn báo hiệu mùa xuân tháng ba Yayoi tươi thắm."
    }
  },
  "弦": {
    "components": ["弓", "玄"],
    "equation": "弓 (Cánh cung) + 玄 (Huyền - sợi tơ màu đen ánh chắc chắn làm dây)",
    "mnemonic": "Sợi tơ bền chắc nhuộm sẫm (玄) căng lên cánh cung làm dây bật tiếng vang (弓), dây cung, dây đàn, trăng huyền.",
    "illustration": {
      "badge": "🎸",
      "concept": "Dây đàn căng thẳng",
      "visualDesc": "Những sợi dây đàn guitar mảnh mai rung lên ngân vang giai điệu ngọt ngào."
    }
  },
  "弧": {
    "components": ["弓", "瓜"],
    "equation": "弓 (Cánh cung uốn lượn) + 瓜 (Dưa - quả dưa có đường cong mượt mà)",
    "mnemonic": "Đường cong tròn trịa mềm mại như quả dưa uốn theo cánh cung, vòng cung, cung tròn.",
    "illustration": {
      "badge": "🌈",
      "concept": "Cầu vồng hình vòng cung",
      "visualDesc": "Dải cầu vồng bảy sắc uốn cong mềm mại bắc ngang qua bầu trời sau cơn mưa."
    }
  },
  "張": {
    "components": ["弓", "長"],
    "equation": "弓 (Cánh cung) + 長 (Kéo dài ra hết cỡ)",
    "mnemonic": "Kéo dài sợi dây cung (長) để giương cánh cung căng tràn sức mạnh (弓), căng ra, giương cung, phô trương.",
    "illustration": {
      "badge": "🎪",
      "concept": "Căng bạt lều rạp",
      "visualDesc": "Tấm bạt lều rạp được kéo căng bốn góc tạo không gian che mát rộng lớn."
    }
  },
  "弾": {
    "components": ["弓", "単"],
    "equation": "弓 (Cánh cung bắn đi) + 単 (Viên đạn tròn đơn độc bay vun vút)",
    "mnemonic": "Cánh cung bật mạnh (弓) phóng viên đạn tròn vút đi trong chớp mắt (単), viên đạn, đàn hồi, gảy đàn.",
    "illustration": {
      "badge": "🎯",
      "concept": "Viên đạn lao trúng đích",
      "visualDesc": "Đường đạn xé gió lao nhanh về phía hồng tâm bia tập bắn."
    }
  },
  "彗": {
    "components": ["丰", "丰", "彐"],
    "equation": "Bó cành trúc chụm lại buộc chặt thành cây chổi quét sân sạch sẽ",
    "mnemonic": "Bó cỏ chổi quét qua để lại vệt đuôi dài như ngôi sao chổi quét ngang trời đêm, sao chổi, tuệ tinh.",
    "illustration": {
      "badge": "☄️",
      "concept": "Ngôi sao chổi quét ngang trời",
      "visualDesc": "Ngôi sao chổi rực sáng với dải đuôi dài lấp lánh băng qua bầu trời sao."
    }
  },
  "彦": {
    "components": ["文", "厂", "彡"],
    "equation": "Vầng trán sáng sủa học thức (文) với những đường nét khôi ngô tuấn tú (彡)",
    "mnemonic": "Chàng trai khôi ngô có học vấn và tài năng sáng ngời từ thuở trẻ, chàng trai tài hoa, hiko.",
    "illustration": {
      "badge": "👦",
      "concept": "Chàng trai tuấn tú tài năng",
      "visualDesc": "Chàng thiếu niên khôi ngô với ánh mắt kiên định và phong thái đĩnh đạc."
    }
  },
  "彩": {
    "components": ["采", "彡"],
    "equation": "采 (Bàn tay hái hoa cỏ) + 彡 (Nét cọ vuốt màu sắc sặc sỡ)",
    "mnemonic": "Hái các loại hoa cỏ tự nhiên (采) chiết xuất thành những vệt màu rực rỡ muôn sắc thái (彡), sắc màu, rực rỡ.",
    "illustration": {
      "badge": "🎨",
      "concept": "Bảng màu rực rỡ",
      "visualDesc": "Bảng pha màu nghệ thuật ngập tràn những dải màu nước tươi tắn bắt mắt."
    }
  },
  "彪": {
    "components": ["虎", "彡"],
    "equation": "虎 (Con hổ dũng mãnh) + 彡 (Những đường vân vằn vện nổi bật)",
    "mnemonic": "Những sọc vằn vện tuyệt mỹ (彡) trên bộ lông của chú cọp chúa sơn lâm oai vệ (虎), vằn hổ, bưu bính.",
    "illustration": {
      "badge": "🐅",
      "concept": "Vân vằn chúa sơn lâm",
      "visualDesc": "Bộ lông vằn vện sắc vàng đen uy dũng của chú hổ dũng mãnh bước đi."
    }
  },
  "彫": {
    "components": ["周", "彡"],
    "equation": "周 (Khắc vòng quanh chu vi) + 彡 (Từng nhát đục tạo đường vân tinh xảo)",
    "mnemonic": "Dùng dao đục chạm trổ tỉ mỉ từng đường nét hoa văn chung quanh bức tượng (周-彡), điêu khắc, chạm khắc.",
    "illustration": {
      "badge": "🗿",
      "concept": "Tác phẩm điêu khắc gỗ",
      "visualDesc": "Nghệ nhân dùng dùi đục từng đường nét sắc sảo trên pho tượng gỗ cổ."
    }
  },
  "彬": {
    "components": ["林", "彡"],
    "equation": "林 (Rừng cây xanh tươi rậm rạp) + 彡 (Đường nét trau chuốt trang nhã)",
    "mnemonic": "Tài năng phong phú như rừng cây (林) kết hợp cùng cốt cách nhã nhặn trau chuốt (彡), lịch thiệp, nho nhã.",
    "illustration": {
      "badge": "🎋",
      "concept": "Cốt cách nho nhã",
      "visualDesc": "Góc thư phòng thanh nhã với khóm trúc bên cửa sổ và ấm trà thơm."
    }
  },
  "彰": {
    "components": ["章", "彡"],
    "equation": "章 (Huy chương, bài văn xuất sắc) + 彡 (Hào quang tỏa sáng rực rỡ)",
    "mnemonic": "Thành tích rạng ngời (章) tỏa hào quang sáng rõ cho muôn người cùng chiêm ngưỡng (彡), biểu dương, rõ rệt.",
    "illustration": {
      "badge": "🏅",
      "concept": "Biểu dương khen thưởng",
      "visualDesc": "Tấm huân chương vàng tỏa sáng vinh danh người có thành tích vẻ vang."
    }
  },
  "影": {
    "components": ["景", "彡"],
    "equation": "景 (Cảnh sắc dưới ánh nắng mặt trời) + 彡 (Chiếc bóng đổ dài trên mặt đất)",
    "mnemonic": "Ánh mặt trời chiếu vào cảnh vật (景) hắt xuống mặt đất thành chiếc bóng đen đổ dài (彡), bóng hình, ảnh hưởng.",
    "illustration": {
      "badge": "👤",
      "concept": "Bóng người đổ dài dưới nắng",
      "visualDesc": "Bóng người in dài trên bãi cát vàng dưới ánh hoàng hôn rực rỡ."
    }
  },
  "往": {
    "components": ["彳", "主"],
    "equation": "彳 (Bước đi trên đường) + 主 (Cột mốc ngọn đèn định hướng tiến tới)",
    "mnemonic": "Bước chân cất bước trên đường lớn hướng về phía ngọn hải đăng dẫn lối (彳-主), đi tới, dĩ vãng, vãng lai.",
    "illustration": {
      "badge": "🚶‍♂️",
      "concept": "Rảo bước đi tới",
      "visualDesc": "Bóng người rảo bước trên con đường dài hướng về vùng đất mới."
    }
  },
  "征": {
    "components": ["彳", "正"],
    "equation": "彳 (Hành quân trên đường) + 正 (Chính - danh nghĩa chính nghĩa dẹp loạn)",
    "mnemonic": "Đoàn quân lên đường hành quân xa (彳) mang danh nghĩa chính nghĩa đi dẹp loạn biên ải (正), viễn chinh, chinh phục.",
    "illustration": {
      "badge": "🚩",
      "concept": "Đoàn quân xuất chinh",
      "visualDesc": "Cờ lệnh tung bay theo đoàn quân xuất phát tiến ra chiến trường."
    }
  },
  "径": {
    "components": ["彳", "圣"],
    "equation": "彳 (Con đường đi) + 圣 (Kinh - đường chỉ thẳng tắp xuyên qua tâm)",
    "mnemonic": "Con đường mòn đi thẳng tắp xuyên qua trung tâm cắt ngắn khoảng cách (彳-圣), đường kính, lối tắt.",
    "illustration": {
      "badge": "⭕",
      "concept": "Đường kính hình tròn",
      "visualDesc": "Đoạn thẳng đỏ cắt ngang qua tâm hình tròn chia đôi vòng tròn hoàn hảo."
    }
  },
  "徐": {
    "components": ["彳", "余"],
    "equation": "彳 (Bước chân) + 余 (Thảnh thơi, ung dung dư dả thời gian)",
    "mnemonic": "Bước chân bước đi thong thả ung dung vì có dư dả thời gian (彳-余), từ tốn, chậm rãi, từ từ.",
    "illustration": {
      "badge": "🚶",
      "concept": "Bước đi thong thả",
      "visualDesc": "Người dạo bước khoan thai ngắm cảnh hoa anh đào rơi trong gió nhẹ."
    }
  },
  "従": {
    "components": ["彳", "从"],
    "equation": "彳 (Bước chân trên đường) + 从 (Hai người bước nối đuôi đi theo nhau)",
    "mnemonic": "Bước chân theo sau gót người đi trước một cách ngoan ngoãn, phục tùng, tòng phục, tuân theo.",
    "illustration": {
      "badge": "👣",
      "concept": "Bước theo sau",
      "visualDesc": "Dấu chân người sau bước khít khao theo vết chân người dẫn đường."
    }
  },
  "循": {
    "components": ["彳", "盾"],
    "equation": "彳 (Bước đi) men theo vành tròn của chiếc khiên chắn (盾)",
    "mnemonic": "Bước đi vòng quanh đều đặn men theo vành khiên khép kín lặp lại tuần tự, tuần hoàn, tuần hoàn máu.",
    "illustration": {
      "badge": "🔄",
      "concept": "Vòng tuần hoàn khép kín",
      "visualDesc": "Mũi tên xoay vòng tròn tượng trưng cho chu trình tuần hoàn không ngừng."
    }
  },
  "微": {
    "components": ["彳", "山", "一", "攵"],
    "equation": "Chân bước rón rén (彳), tay nhẹ nhàng gẩy từng hạt bụi nhỏ li ti (攵)",
    "mnemonic": "Hành động cực kỳ khẽ khàng tác động lên những vật thể nhỏ li ti mắt thường khó thấy, vi mô, nhỏ bé.",
    "illustration": {
      "badge": "🔬",
      "concept": "Kính hiển vi soi vi mô",
      "visualDesc": "Kính hiển vi quang học soi rõ từng tế bào sinh học siêu nhỏ."
    }
  },
  "徳": {
    "components": ["彳", "十", "罒", "心"],
    "equation": "彳 (Bước đi ngay thẳng) + 十-罒 (Mười con mắt nhìn vào) + 心 (Tấm lòng trong sạch)",
    "mnemonic": "Bước đi ngay thẳng trước muôn mắt nhìn đời mà đáy lòng vẫn thanh cao trong sáng, đạo đức, ân đức.",
    "illustration": {
      "badge": "🕊️",
      "concept": "Trái tim đức hạnh",
      "visualDesc": "Ánh sáng ấm áp tỏa ra từ trái tim từ bi thuần khiết của con người."
    }
  },
  "徴": {
    "components": ["彳", "山", "王", "攵"],
    "equation": "Bước đi tìm kiếm các manh mối dấu vết (彳-攵) để chứng minh sự thật",
    "mnemonic": "Tìm kiếm các dấu hiệu rõ nét để nhận diện bản chất sự việc, đặc trưng, triệu chứng, tượng trưng.",
    "illustration": {
      "badge": "🔍",
      "concept": "Dấu vết đặc trưng",
      "visualDesc": "Kính lúp phóng to dấu vân tay độc nhất vô nhị để nhận diện."
    }
  },
  "徹": {
    "components": ["彳", "育", "攵"],
    "equation": "彳 (Con đường) + 育-攵 (Rèn giũa quyết liệt từ đầu đến đuôi thông suốt)",
    "mnemonic": "Đi hết con đường làm đến nơi đến chốn không bỏ dở nửa chừng, triệt để, thức thâu đêm.",
    "illustration": {
      "badge": "💡",
      "concept": "Ánh đèn học thâu đêm",
      "visualDesc": "Bàn học sáng đèn giữa đêm khuya miệt mài ôn luyện triệt để."
    }
  },
  "忌": {
    "components": ["己", "心"],
    "equation": "己 (Bản thân giữ mình) + 心 (Tâm trí luôn nhắc nhở cảnh giác)",
    "mnemonic": "Trong lòng (心) luôn ghi nhớ tự nhắc nhở bản thân (己) phải tránh xa những điều cấm kỵ, kiêng kỵ, ngày kỵ.",
    "illustration": {
      "badge": "🚫",
      "concept": "Biển cấm kiêng kỵ",
      "visualDesc": "Vòng tròn đỏ gạch chéo nhắc nhở những điều cấm kỵ cần tránh."
    }
  },
  "忍": {
    "components": ["刃", "心"],
    "equation": "刃 (Lưỡi dao sắc bén nhọn) đè lên 心 (Trái tim chịu đựng)",
    "mnemonic": "Dù mũi dao nhọn kề sát trái tim (刃-心) vẫn cắn răng kiên cường chịu đựng không kêu than, kiên nhẫn, ninja.",
    "illustration": {
      "badge": "🥷",
      "concept": "Ninja ẩn mình nhẫn nại",
      "visualDesc": "Bóng chàng ninja ẩn mình tĩnh lặng trên cành thông trong đêm trăng."
    }
  },
  "志": {
    "components": ["士", "心"],
    "equation": "士 (Bậc trượng phu kẻ sĩ) + 心 (Tấm lòng nung nấu ước mơ)",
    "mnemonic": "Tấm lòng của kẻ sĩ (士-心) luôn ấp ủ những hoài bão lớn lao vì lý tưởng cao đẹp, ý chí, chí hướng.",
    "illustration": {
      "badge": "🎯",
      "concept": "Ngắm đích chí hướng",
      "visualDesc": "Mũi tên nhắm thẳng hồng tâm với ý chí sắt đá không lay chuyển."
    }
  },
  "応": {
    "components": ["广", "心"],
    "equation": "广 (Dưới mái nhà) + 心 (Lòng mở ra lắng nghe và đáp lại lời gọi)",
    "mnemonic": "Mở lòng mình (心) hồi đáp nhiệt tình trước tiếng gọi từ bên ngoài mái nhà (广), đáp ứng, phản ứng, ứng phó.",
    "illustration": {
      "badge": "📞",
      "concept": "Nhấc máy phản hồi",
      "visualDesc": "Chiếc điện thoại bàn nhấc lên hồi đáp chuông gọi kịp thời."
    }
  },
  "忠": {
    "components": ["中", "心"],
    "equation": "中 (Ngay chính giữa, ngay thẳng không lệch) + 心 (Trái tim son sắt)",
    "mnemonic": "Trái tim son sắt đặt ngay chính giữa lẽ phải (中-心) trước sau như một không đổi dời, trung thành, tận trung.",
    "illustration": {
      "badge": "🐕",
      "concept": "Chú chó Hachiko trung thành",
      "visualDesc": "Tượng chú chó Hachiko kiên nhẫn chờ đợi chủ nhân suốt mười năm ròng."
    }
  },
  "怜": {
    "components": ["忄", "令"],
    "equation": "忄 (Tâm hồn) + 令 (Lệnh - lanh lảnh, phản ứng nhạy bén)",
    "mnemonic": "Tâm trí nhạy bén thấu hiểu ngay từng sự tình trong chớp mắt (忄-令), lanh lợi, thông minh, thương xót.",
    "illustration": {
      "badge": "💡",
      "concept": "Tâm trí lanh lợi thông tuệ",
      "visualDesc": "Bóng đèn bật sáng trên đầu thể hiện phản xạ tư duy nhanh nhạy."
    }
  },
  "怠": {
    "components": ["台", "心"],
    "equation": "台 (Bệ đỡ vững chãi) + 心 (Lòng sinh ra ỷ lại nằm ườn)",
    "mnemonic": "Có chỗ dựa sẵn sàng nên trong lòng (心) nảy sinh thói quen ỷ lại lười nhác buông trôi (台), lười biếng, trễ nải.",
    "illustration": {
      "badge": "🦥",
      "concept": "Chú lười biếng nhác",
      "visualDesc": "Chú lười treo mình đủng đỉnh trên cành cây chậm chạp lim dim ngủ."
    }
  },
  "怪": {
    "components": ["忄", "又", "土"],
    "equation": "忄 (Tâm trạng) + 圣 (Bàn tay chạm phải vật kỳ dị từ dưới đất)",
    "mnemonic": "Trong lòng (忄) kinh ngạc hoang mang khi nhìn thấy hiện tượng kỳ dị khác thường, kỳ quái, quái vật.",
    "illustration": {
      "badge": "👾",
      "concept": "Sinh vật kỳ quái",
      "visualDesc": "Hình bóng sinh vật kỳ lạ ẩn hiện trong bóng tối làm ai nấy kinh ngạc."
    }
  },
  "恒": {
    "components": ["忄", "亘"],
    "equation": "忄 (Trái tim kiên định) + 亘 (Cẳng - trải dài miệt mài theo năm tháng)",
    "mnemonic": "Trái tim giữ trọn một lời nguyền bền bỉ trải dài qua muôn trùng năm tháng (忄-亘), vĩnh hằng, thường hằng.",
    "illustration": {
      "badge": "♾️",
      "concept": "Biểu tượng vô cực vĩnh hằng",
      "visualDesc": "Vòng lặp vô cực phát sáng biểu trưng cho sự trường tồn mãi mãi."
    }
  },
  "恕": {
    "components": ["如", "心"],
    "equation": "如 (Như - đặt mình vào vị trí của người khác) + 心 (Trái tim thấu cảm)",
    "mnemonic": "Trái tim biết đặt mình vào hoàn cảnh của người khác (如-心) để thấu hiểu và tha thứ, khoan thứ, thứ lỗi.",
    "illustration": {
      "badge": "🤝",
      "concept": "Bắt tay tha thứ lỗi lầm",
      "visualDesc": "Hai bàn tay bắt chặt nhau xua tan hiểu lầm hàn gắn tình bạn."
    }
  },
  "恨": {
    "components": ["忄", "艮"],
    "equation": "忄 (Trái tim) + 艮 (Cấn - nghẽn lại, ngoảnh mặt căm hờn)",
    "mnemonic": "Trong lòng (忄) chất chứa nỗi uất ức dồn nén mắt trừng trừng không nguôi (艮), căm hận, oán hận.",
    "illustration": {
      "badge": "😠",
      "concept": "Ánh mắt căm hờn",
      "visualDesc": "Khuôn mặt nghẹn ngào ấm ức với ánh nhìn hờn giận sâu sắc."
    }
  },
  "恩": {
    "components": ["因", "心"],
    "equation": "因 (Nhân duyên nguồn cội giúp đỡ mình) ghi tạc vào 心 (Trái tim)",
    "mnemonic": "Trái tim (心) luôn ghi nhớ cội nguồn ơn nghĩa và sự giúp đỡ của người khác (因), ân nghĩa, biết ơn.",
    "illustration": {
      "badge": "🙏",
      "concept": "Chắp tay cảm tạ ân nghĩa",
      "visualDesc": "Đôi bàn tay chắp lại thành kính tri ân công đức dưỡng dục sinh thành."
    }
  },
  "恭": {
    "components": ["共", "心"],
    "equation": "共 (Hai tay nâng lễ vật) xuất phát từ chân thành nơi đáy lòng (心/㣺)",
    "mnemonic": "Hai tay nâng lễ vật với tất cả sự thành tâm kính cẩn từ tận đáy lòng, cung kính, khiêm tốn.",
    "illustration": {
      "badge": "🙇‍♂️",
      "concept": "Cung kính cúi chào",
      "visualDesc": "Học trò cúi đầu 90 độ cung kính chào thầy giáo trong ngày lễ."
    }
  },
  "恵": {
    "components": ["十", "日", "心"],
    "equation": "Ánh nắng mặt trời (日) chan hòa chiếu khắp nơi cùng trái tim nhân ái (心) ban phát quà tặng",
    "mnemonic": "Tấm lòng nhân ái rộng mở ban phát phúc lành và may mắn cho mọi người xung quanh, ân huệ, huệ tặng.",
    "illustration": {
      "badge": "🎁",
      "concept": "Món quà ân huệ phúc lành",
      "visualDesc": "Hộp quà buộc nơ vàng óng biểu trưng cho ân huệ ấm áp được trao tặng."
    }
  },
  "悌": {
    "components": ["忄", "弟"],
    "equation": "忄 (Tấm lòng hiếu thảo) + 弟 (Người em nhỏ kính trọng anh lớn)",
    "mnemonic": "Tấm lòng hiếu đễ hòa thuận kính trọng anh chị trong gia đình (忄-弟), tình huynh đệ, đễ.",
    "illustration": {
      "badge": "👦🧒",
      "concept": "Anh em hòa thuận yêu thương",
      "visualDesc": "Hai anh em nắm tay nhau vui vẻ cùng đến trường dưới nắng ấm."
    }
  },
  "悔": {
    "components": ["忄", "毎"],
    "equation": "忄 (Trái tim) + 毎 (Mỗi ngày trôi qua đều dằn vặt vì sai lầm)",
    "mnemonic": "Mỗi ngày trôi qua trong lòng (忄-毎) đều cắn rứt vì những quyết định sai lầm trong quá khứ, hối hận, ăn năn.",
    "illustration": {
      "badge": "🤦‍♂️",
      "concept": "Ôm trán hối hận",
      "visualDesc": "Người ngồi ôm trán dằn vặt tiếc nuối trước những sai sót đã qua."
    }
  },
  "悟": {
    "components": ["忄", "吾"],
    "equation": "忄 (Trái tim tâm trí) + 吾 (Bản thân ta thấu tỏ chân lý)",
    "mnemonic": "Tâm trí mở toang thấu hiểu rõ bản thân ta và quy luật vũ trụ (忄-吾), giác ngộ, tỉnh ngộ.",
    "illustration": {
      "badge": "🧘",
      "concept": "Khoảnh khắc đại ngộ",
      "visualDesc": "Thiền giả tĩnh tọa dưới cội bồ đề bừng sáng vầng hào quang giác ngộ."
    }
  },
  "悠": {
    "components": ["攸", "心"],
    "equation": "攸 (Dòng nước êm đềm chảy trôi) + 心 (Lòng thảnh thơi không vướng bận)",
    "mnemonic": "Lòng thanh thản trôi nhẹ như dòng nước êm đềm qua năm tháng xa xăm, ung dung, du dương, nhàn du.",
    "illustration": {
      "badge": "⛵",
      "concept": "Thuyền thong dong trôi nhẹ",
      "visualDesc": "Chiếc thuyền con lững lờ trôi trên dòng sông êm đềm buổi chiều tà."
    }
  },
  "悦": {
    "components": ["忄", "兌"],
    "equation": "忄 (Trong lòng) + 兌 (Đoái - hân hoan rạng rỡ nét cười)",
    "mnemonic": "Trong lòng tràn ngập cảm giác hân hoan mãn nguyện nở nụ cười rạng rỡ (忄-兌), vui thích, hoan duyệt.",
    "illustration": {
      "badge": "😊",
      "concept": "Nụ cười mãn nguyện",
      "visualDesc": "Khuôn mặt rạng rỡ nụ cười hạnh phúc mãn nguyện với kết quả đạt được."
    }
  },
  "悼": {
    "components": ["忄", "卓"],
    "equation": "忄 (Trái tim) + 卓 (Trác - chiếc bàn đặt di ảnh người quá cố)",
    "mnemonic": "Đứng trước bàn thờ di ảnh dâng trào niềm đau xót nhớ thương khôn xiết (忄-卓), tưởng niệm, truy điệu.",
    "illustration": {
      "badge": "🕯️",
      "concept": "Lễ truy điệu tưởng niệm",
      "visualDesc": "Bông cúc trắng đặt trước ngọn nến lung linh tưởng niệm người đã khuất."
    }
  },
  "惇": {
    "components": ["忄", "享"],
    "equation": "忄 (Tấm lòng) + 享 (Chia sẻ niềm vui thụ hưởng với mọi người)",
    "mnemonic": "Tấm lòng đôn hậu ấm áp luôn muốn sẻ chia phước lành cho người xung quanh (忄-享), đôn hậu, thuần hậu.",
    "illustration": {
      "badge": "🤗",
      "concept": "Vòng tay đôn hậu",
      "visualDesc": "Bác hàng xóm hiền từ trao tặng giỏ trái cây thơm ngon cho lũ trẻ."
    }
  },
  "惑": {
    "components": ["或", "心"],
    "equation": "或 (Hoặc là cái này hoặc là cái kia do dự) + 心 (Trái tim băn khoăn)",
    "mnemonic": "Trong lòng (心) do dự không biết chọn hướng này hay hướng nọ (或), phân vân, mê hoặc, bối rối.",
    "illustration": {
      "badge": "❓",
      "concept": "Dấu hỏi bối rối",
      "visualDesc": "Người đứng trước ngã ba đường phân vân chưa biết chọn lối đi nào."
    }
  },
  "惜": {
    "components": ["忄", "昔"],
    "equation": "忄 (Trong lòng) + 昔 (Tích - những kỷ niệm êm đềm ngày xưa)",
    "mnemonic": "Trong lòng (忄) luôn vương vấn nuối tiếc những tháng ngày tươi đẹp thuở xưa (昔), nuối tiếc, trân quý.",
    "illustration": {
      "badge": "⌛",
      "concept": "Tiếc nuối thời gian",
      "visualDesc": "Bàn tay muốn giữ lại từng hạt cát thời gian đang rơi xuống kẽ ngón tay."
    }
  },
  "惟": {
    "components": ["忄", "隹"],
    "equation": "忄 (Tâm trí) + 隹 (Con chim nhỏ ngước mắt quan sát xa xăm)",
    "mnemonic": "Trầm ngâm suy ngẫm sâu xa thấu hiểu lẽ trời đất (忄-隹), suy ngẫm, duy chỉ, duy nghĩ.",
    "illustration": {
      "badge": "💭",
      "concept": "Trầm ngâm suy tưởng",
      "visualDesc": "Bóng người ngồi bên bờ hồ ngẫm nghĩ về những lẽ sống nhân sinh."
    }
  },
  "惣": {
    "components": ["物", "心"],
    "equation": "物 (Vật phẩm thức ăn) + 心 (Tâm tình chu đáo gom góp đủ món)",
    "mnemonic": "Gom góp mọi thứ nguyên liệu chu đáo tạo nên các món ăn kèm phong phú mỗi ngày, toàn bộ, món phụ souzai.",
    "illustration": {
      "badge": "🥗",
      "concept": "Đĩa thức ăn kèm Souzai",
      "visualDesc": "Đĩa thức ăn kèm rau củ hầm kiểu Nhật souzai thơm ngon trong bữa cơm."
    }
  },
  "惨": {
    "components": ["忄", "参"],
    "equation": "忄 (Trái tim) + 参 (Tham - chịu đựng bao sóng gió dập vùi)",
    "mnemonic": "Trái tim đau xót đến tột cùng trước cảnh tượng thương tâm tan hoang (忄-参), thảm khốc, bi thảm.",
    "illustration": {
      "badge": "🌧️",
      "concept": "Cảnh tượng bi thảm sau bão",
      "visualDesc": "Cơn mưa tầm tã trút xuống khu phố tan hoang gợi nỗi xót xa vô bờ."
    }
  },
  "惰": {
    "components": ["忄", "左", "月"],
    "equation": "忄 (Tâm trí) + 左-月 (Thịt bắp tay buông xuôi không muốn động đậy)",
    "mnemonic": "Tâm trí buông xuôi mặc cho cơ thể nằm ỳ một chỗ không chịu vận động, lười nhác, sức ỳ, quán tính.",
    "illustration": {
      "badge": "🛋️",
      "concept": "Sức ỳ lười biếng",
      "visualDesc": "Chiếc đồng hồ báo thức reo vang nhưng người vẫn nằm trùm chăn lười nhác."
    }
  },
  "愁": {
    "components": ["秋", "心"],
    "equation": "秋 (Mùa thu lá rụng se lạnh) đè nặng lên 心 (Trái tim ưu tư)",
    "mnemonic": "Gió thu se lạnh lá vàng rụng gợi lên trong lòng nỗi niềm man mác buồn (秋-心), âu sầu, u sầu.",
    "illustration": {
      "badge": "🍂",
      "concept": "Nỗi sầu mùa thu lá rụng",
      "visualDesc": "Lá phong đỏ rơi rụng trên ghế đá công viên trong buổi chiều thu u buồn."
    }
  },
  "愉": {
    "components": ["忄", "兪"],
    "equation": "忄 (Trong lòng) + 兪 (Du - thông suốt mọi bế tắc, êm dịu)",
    "mnemonic": "Mọi khúc mắc trong lòng (忄) được giải tỏa thông suốt đem lại niềm vui khoan khoái (兪), vui vẻ, du khoái.",
    "illustration": {
      "badge": "😃",
      "concept": "Niềm vui khoan khoái",
      "visualDesc": "Nụ cười rạng rỡ hân hoan khi vừa hoàn thành xuất sắc một mục tiêu lớn."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n1dData)) {
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

console.log(`[Batch 5D - N1 Part 4] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n1dData).length} chữ Kanji N1.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
