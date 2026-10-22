const fs = require('fs');
const path = require('path');

const n3cData = {
  "未": {
    components: ["木", "一"],
    equation: "Cây xanh (木) có cành ngọn non (nét ngang ngắn phía trên) chưa lớn hẳn",
    mnemonic: "Cành non trên ngọn cây (木) vẫn còn đang lớn chưa trưởng thành, biểu thị điều chưa tới, vị lai.",
    illustration: {
      badge: "🌱",
      concept: "Cành non chưa lớn",
      visualDesc: "Chồi búp non trên ngọn cây đón sương sớm chưa bung nở trọn vẹn."
    }
  },
  "末": {
    components: ["木", "一"],
    equation: "Cây xanh (木) có tán xòe rộng hết cỡ ở tận cùng ngọn (nét ngang dài phía trên)",
    mnemonic: "Nét ngang dài vươn ra ở tận chóp đỉnh ngọn cây (木), biểu thị điểm mút tận cùng, ngọn ngành, cuối thời.",
    illustration: {
      badge: "🔚",
      concept: "Ngọn cùng cuối chặng",
      visualDesc: "Đỉnh chóp của ngọn cây cao vút chạm tới tầng mây cuối trời."
    }
  },
  "束": {
    components: ["木", "口"],
    equation: "Bó củi cây (木) được sợi dây buộc chặt quanh thân (口)",
    mnemonic: "Gom các cành củi khô lại rồi lấy dây thừng thắt chặt quanh thân cây (木), tạo thành một bó củi chắc chắn.",
    illustration: {
      badge: "💐",
      concept: "Bó hoa thắt nơ",
      visualDesc: "Bó hoa tươi rực rỡ được quấn dây lụa thắt nơ xinh xắn."
    }
  },
  "杯": {
    components: ["木", "不"],
    equation: "木 (Mộc - gỗ tiện) + 不 (Bất - âm Bôi/dáng chén nhỏ)",
    mnemonic: "Chiếc chén tiện từ gỗ thơm (木) nhỏ nhắn cầm gọn lòng bàn tay, dùng để nâng ly chúc mừng.",
    illustration: {
      badge: "🍷",
      concept: "Ly rượu nâng chúc",
      visualDesc: "Ly rượu vang pha lê óng ánh nâng lên trong tiệc mừng rộn rã."
    }
  },
  "果": {
    components: ["田", "木"],
    equation: "Trái tròn trĩu nặng (田) trên ngọn cành cây (木)",
    mnemonic: "Hoa tàn nhường chỗ cho trái tròn căng mọng (田) lúc lỉu trên cành cây (木), đơm hoa kết quả tốt tươi.",
    illustration: {
      badge: "🍎",
      concept: "Trái ngọt trên cành",
      visualDesc: "Những quả táo đỏ ửng trĩu nặng trên cành cây dưới ánh nắng thu vàng."
    }
  },
  "格": {
    components: ["木", "各"],
    equation: "木 (Mộc - cọc gỗ tiêu chuẩn) + 各 (mọi người bước tới đối chiếu)",
    mnemonic: "Cọc gỗ thẳng đứng (木) làm thước đo tiêu chuẩn cho từng người (各) so chuẩn, tạo nên quy cách và phẩm cách.",
    illustration: {
      badge: "📏",
      concept: "Quy cách chuẩn mực",
      visualDesc: "Thanh gỗ chia vạch chuẩn xác kiểm định kích thước sản phẩm."
    }
  },
  "構": {
    components: ["木", "冓"],
    equation: "木 (gỗ xà nhà) + 冓 (khung rui mè đan cài mắt cáo)",
    mnemonic: "Các thanh gỗ xà gồ (木) được ghép mộng cài khít vào nhau (冓), dựng nên cấu trúc bộ khung ngôi nhà.",
    illustration: {
      badge: "🏗️",
      concept: "Khung cấu trúc vững chắc",
      visualDesc: "Bộ khung gỗ nhà truyền thống ghép mộng chuẩn xác không cần một chiếc đinh."
    }
  },
  "様": {
    components: ["木", "羊", "氺"],
    equation: "Cột gỗ tạc hình dê linh thiêng trang trọng bên suối nước",
    mnemonic: "Bức tượng gỗ (木) tạc hình thần dê hiền hòa trang nghiêm (羊), biểu thị dáng vẻ tôn kính, ngài/quý khách.",
    illustration: {
      badge: "👑",
      concept: "Dáng vẻ tôn kính",
      visualDesc: "Hình ảnh trang trọng đĩnh đạc cúi chào kính cẩn trong nghi thức trà đạo."
    }
  },
  "権": {
    components: ["木", "雚"],
    equation: "Cán cân gỗ (木) định đoạt sự cân bằng công lý",
    mnemonic: "Tay nắm chiếc cân bằng gỗ (木) cầm cân nảy mực phân xử việc công, nắm giữ quyền hạn và quyền lực.",
    illustration: {
      badge: "⚖️",
      concept: "Cán cân quyền lực",
      visualDesc: "Chiếc búa gỗ và cán cân đồng biểu tượng cho quyền năng và công lý."
    }
  },
  "横": {
    components: ["木", "黄"],
    equation: "木 (Mộc - thanh gỗ) + 黄 (màu vàng đất phẳng trải dài)",
    mnemonic: "Thanh gỗ dài (木) đặt nằm ngang chắn song song với mặt đất vàng (黄), tạo thành phương ngang, nằm ngang.",
    illustration: {
      badge: "↔️",
      concept: "Đường thẳng nằm ngang",
      visualDesc: "Thanh chắn gỗ nằm ngang kiên cố ngăn lối đi tại ngã rẽ đường sắt."
    }
  },
  "機": {
    components: ["木", "幾"],
    equation: "Khung gỗ (木) + bộ phận ròng rọc tơ chuyển động tinh vi (幾)",
    mnemonic: "Khung gỗ (木) gắn kết các chi tiết tinh vi (幾) vận hành nhịp nhàng dệt nên tấm vải, tạo nên máy móc và thời cơ.",
    illustration: {
      badge: "⚙️",
      concept: "Bánh răng cơ khí",
      visualDesc: "Hệ thống bánh răng cơ khí ăn khớp quay đều vận hành cỗ máy tinh xảo."
    }
  },
  "欠": {
    components: ["欠"],
    equation: "Chữ tượng hình người há miệng ngáp thiếu dưỡng khí",
    mnemonic: "Há to miệng ngáp vì thiếu ngủ, biểu thị sự thiếu hụt, khiếm khuyết cần bổ sung.",
    illustration: {
      badge: "🥱",
      concept: "Ngáp dài thiếu ngủ",
      visualDesc: "Người há miệng ngáp một hơi dài thể hiện sự mệt mỏi thiếu hụt năng lượng."
    }
  },
  "次": {
    components: ["冫", "欠"],
    equation: "Hai hàng người (冫) há miệng thở (欠) nối đuôi nhau chờ tới lượt",
    mnemonic: "Đứng xếp hàng thở dài đợi tới lượt mình bước lên, biểu thị thứ tự, người tiếp theo.",
    illustration: {
      badge: "⏭️",
      concept: "Tiếp theo kế tiếp",
      visualDesc: "Nút bấm chuyển tiếp sang trang tiếp theo trên màn hình điều khiển."
    }
  },
  "欲": {
    components: ["谷", "欠"],
    equation: "谷 (thung lũng sâu không đáy) + 欠 (há to miệng đón nhận)",
    mnemonic: "Lòng tham sâu như đáy thung lũng (谷) luôn há to miệng (欠) đòi hỏi không biết đủ, biểu thị dục vọng, mong muốn.",
    illustration: {
      badge: "🌟",
      concept: "Ước muốn cháy bỏng",
      visualDesc: "Ngôi sao ước nguyện lấp lánh phản chiếu khao khát vươn tới thành công."
    }
  },
  "歯": {
    components: ["止", "米", "凵"],
    equation: "Chỉ (止 chân cố định) + hàm răng xếp đều đặn trong khuôn miệng",
    mnemonic: "Những chiếc răng trắng xếp đều đặn ngay ngắn trong khuôn hàm dùng để nhai cơm (米), chiếc răng chắc khỏe.",
    illustration: {
      badge: "🦷",
      concept: "Chiếc răng chắc khỏe",
      visualDesc: "Chiếc răng trắng sáng bóng tinh khôi nở nụ cười rạng rỡ."
    }
  },
  "歳": {
    components: ["止", "弋", "小"],
    equation: "Bàn chân bước qua (止) một vòng chu kỳ sao Tuế Tinh (戌)",
    mnemonic: "Bàn chân bước đi (止) trọn vẹn một vòng quỹ đạo thiên thể trong một năm, đánh dấu thêm một tuổi đời.",
    illustration: {
      badge: "🎂",
      concept: "Bánh sinh nhật tuổi mới",
      visualDesc: "Chiếc bánh sinh nhật thắp nến lung linh chúc mừng tuổi mới an lành."
    }
  },
  "残": {
    components: ["歹", "戋"],
    equation: "歹 (mẩu xương cốt còn sót) + 戋 (vũ khí chém tàn)",
    mnemonic: "Sau trận chiến tàn khốc, chỉ còn sót lại vài mẩu xương tàn (歹) vương vãi nơi chiến địa, biểu thị sự còn lại, tàn dư.",
    illustration: {
      badge: "🍂",
      concept: "Tàn tích còn lại",
      visualDesc: "Chiếc lá cuối cùng còn đọng lại trên cành khẳng khiu sau cơn gió lạnh."
    }
  },
  "段": {
    components: ["𠂤", "殳"],
    equation: "Đục vách đá từng tầng + 殳 (tay vung búa tạo bậc)",
    mnemonic: "Dùng búa (殳) đục từng bậc đá thoai thoải men theo sườn đồi để bước lên, tạo thành từng bậc thang, giai đoạn.",
    illustration: {
      badge: "🪜",
      concept: "Từng bậc thang bước lên",
      visualDesc: "Cầu thang đá cổ kính dẫn từng bậc vững chãi lên ngôi đền trên đỉnh núi."
    }
  },
  "殺": {
    components: ["乂", "冖", "木", "殳"],
    equation: "Chém vung nhát gậy (殳) hạ gục dã thú",
    mnemonic: "Vung ngọn giáo nhọn (殳) đâm hạ dã thú hung dữ bảo vệ dân làng, biểu thị sự sát phạt, giết hại.",
    illustration: {
      badge: "⚔️",
      concept: "Sát phạt quyết đoán",
      visualDesc: "Thanh bảo kiếm thu vào bao dứt khoát kết thúc trận chiến hiểm nguy."
    }
  },
  "民": {
    components: ["民"],
    equation: "Chữ tượng hình con mắt bị che rèm của tầng lớp thứ dân thời cổ",
    mnemonic: "Đông đảo những người lao động mộc mạc làm ăn sinh sống chân lấm tay bùn, chính là muôn dân, nhân dân.",
    illustration: {
      badge: "👥",
      concept: "Quần chúng nhân dân",
      visualDesc: "Cộng đồng người dân thân thiện tươi cười chung tay xây dựng xóm làng."
    }
  },
  "求": {
    components: ["求"],
    equation: "Chữ tượng hình chiếc áo lông thú quý giá người người tìm kiếm",
    mnemonic: "Dang đôi tay tha thiết cầu mong có được chiếc áo ấm trong mùa đông giá lạnh, biểu thị yêu cầu, mong cầu.",
    illustration: {
      badge: "🙏",
      concept: "Cầu mong ước nguyện",
      visualDesc: "Đôi bàn tay chắp lại thành kính cầu nguyện những điều tốt lành."
    }
  },
  "決": {
    components: ["氵", "夬"],
    equation: "氵 (Thủy - dòng nước xiết) + 夬 (bật then chắn bờ đê)",
    mnemonic: "Khơi thông then chắn cho dòng nước lũ (氵) cuồn cuộn đổ về một hướng dứt khoát, nghĩa là quyết định, giải quyết.",
    illustration: {
      badge: "🎯",
      concept: "Quyết định dứt khoát",
      visualDesc: "Bút lông hạ bút ký nhát mực dứt khoát phê duyệt quyết định quan trọng."
    }
  },
  "治": {
    components: ["氵", "台"],
    equation: "氵 (Thủy - trị thủy dòng sông) + 台 (bệ đất kè đê vững chắc)",
    mnemonic: "Xây bệ đê vững chãi (台) ngăn nước lũ sông (氵) mang lại yên bình cho dân, mở rộng nghĩa thành cai trị, trị bệnh.",
    illustration: {
      badge: "🩺",
      concept: "Chữa trị an lành",
      visualDesc: "Ống nghe y tế bên toa thuốc biểu thị sự chữa lành và bình phục."
    }
  },
  "法": {
    components: ["氵", "去"],
    equation: "氵 (Thủy - mặt nước công bằng như mực) + 去 (rửa trôi điều bất chính)",
    mnemonic: "Pháp luật công bằng như mặt nước phẳng (氵), gột rửa xua tan mọi điều xấu xa bất chính (去) trong xã hội.",
    illustration: {
      badge: "⚖️",
      concept: "Cán cân pháp luật",
      visualDesc: "Bàn cân công lý bằng đồng sáng soi tỏ tường lẽ phải theo pháp luật."
    }
  },
  "泳": {
    components: ["氵", "永"],
    equation: "氵 (Thủy - làn nước mát) + 永 (Vĩnh - bơi dài theo dòng sông)",
    mnemonic: "Tung mình xuống làn nước mát (氵) bơi sải dài không mệt mỏi theo dòng nước (永), biểu thị bơi lội.",
    illustration: {
      badge: "🏊",
      concept: "Sải tay bơi lội",
      visualDesc: "Vận động viên rẽ làn sóng xanh biếc bơi sải mạnh mẽ về đích."
    }
  },
  "洗": {
    components: ["氵", "先"],
    equation: "氵 (Thủy - chậu nước) + 先 (bước chân trước rửa sạch đất cát)",
    mnemonic: "Dội dòng nước trong (氵) rửa sạch bàn chân đi đường trước khi bước vào thềm nhà (先), giặt giũ và tẩy rửa.",
    illustration: {
      badge: "🧼",
      concept: "Rửa sạch tinh tươm",
      visualDesc: "Bọt xà phòng trắng tinh bồng bềnh dưới vòi nước rửa trôi mọi vết bẩn."
    }
  },
  "活": {
    components: ["氵", "舌"],
    equation: "氵 (Thủy - nước bọt/nước nguồn) + 舌 (chiếc lưỡi ẩm ướt đầy sức sống)",
    mnemonic: "Chiếc lưỡi (舌) được tưới mát bằng dòng nước ngọt lành (氵), cơ thể tràn đầy sinh khí và hoạt bát.",
    illustration: {
      badge: "⚡",
      concept: "Năng động hoạt bát",
      visualDesc: "Tia chớp tràn đầy năng lượng tươi trẻ biểu thị sự sống động hoạt bát."
    }
  },
  "流": {
    components: ["氵", "川"],
    equation: "氵 (Thủy - nước sông) + 川 (ba dòng chảy uốn lượn xuôi dòng)",
    mnemonic: "Nước sông (氵) cuồn cuộn chảy xuôi theo dòng chảy tự nhiên (川), trôi êm đềm lưu thông khắp chốn.",
    illustration: {
      badge: "🌊",
      concept: "Dòng chảy êm đềm",
      visualDesc: "Dòng sông uốn lượn hiền hòa chảy qua thung lũng xanh ngát ra biển lớn."
    }
  },
  "浮": {
    components: ["氵", "爫", "子"],
    equation: "氵 (Thủy - mặt nước bồng bềnh) + 孚 (tay nâng đỡ con thơ nổi lên)",
    mnemonic: "Bàn tay ân cần nâng đỡ đứa bé trên mặt nước (氵), dập dềnh bồng bềnh trôi nổi nhẹ nhàng.",
    illustration: {
      badge: "🛟",
      concept: "Phao cứu sinh nổi bồng bềnh",
      visualDesc: "Chiếc phao cứu sinh tròn nổi bập bềnh trên mặt sóng biển trong xanh."
    }
  },
  "消": {
    components: ["氵", "肖"],
    equation: "氵 (Thủy - dội nước dập tắt) + 肖 (ngọn lửa nhỏ dần rồi biến mất)",
    mnemonic: "Dội gáo nước trong (氵) làm ngọn lửa tàn lụi nhỏ dần (肖) rồi biến mất hoàn toàn, tiêu tan dập tắt.",
    illustration: {
      badge: "🧯",
      concept: "Dập tắt tiêu tan",
      visualDesc: "Bình cứu hỏa phun bọt trắng dập tắt ngọn lửa tan biến vào không khí."
    }
  },
  "深": {
    components: ["氵", "冖", "木"],
    equation: "氵 (Thủy - vực nước thẳm) + thò cành cây (木) sâu không chạm đáy",
    mnemonic: "Cắm cành sào dài (木) xuống dòng nước (氵) mà vẫn chưa chạm tới đáy vực, biểu thị độ sâu thẳm, thâm sâu.",
    illustration: {
      badge: "🌊",
      concept: "Đáy biển sâu thẳm",
      visualDesc: "Đáy đại dương sâu thẳm xanh ngắt huyền bí với những luồng sáng le lói."
    }
  },
  "済": {
    components: ["氵", "斉"],
    equation: "氵 (Thủy - vượt qua dòng sông) + 斉 (sắp xếp ngay ngắn phẳng phiu)",
    mnemonic: "Đưa thuyền vượt qua bên kia bờ sông an toàn (氵 斉), mọi việc xong xuôi tề chỉnh, hoàn tất và cứu tế.",
    illustration: {
      badge: "🏁",
      concept: "Xong xuôi hoàn tất",
      visualDesc: "Bản danh sách công việc được tích dấu hoàn thành xong xuôi trọn vẹn."
    }
  },
  "渡": {
    components: ["氵", "度"],
    equation: "氵 (Thủy - bến sông) + 度 (từng chặng đo đạc bước qua)",
    mnemonic: "Cẩn thận từng bước đo đạc vượt qua dòng sông rộng (氵), sang sông an toàn và trao tận tay.",
    illustration: {
      badge: "🌉",
      concept: "Cây cầu bắc qua sông",
      visualDesc: "Cây cầu gỗ cong bắc qua dòng sông đưa dòng người qua bờ bên kia."
    }
  },
  "港": {
    components: ["氵", "巷"],
    equation: "氵 (Thủy - vịnh nước êm) + 巷 (ngõ phố tấp nập thuyền bè cập bến)",
    mnemonic: "Vùng nước lặng sóng (氵) mở ra phố xá tấp nập đón tàu bè ghé đỗ giao thương, đó là bến cảng hải cảng.",
    illustration: {
      badge: "⚓",
      concept: "Bến cảng tấp nập",
      visualDesc: "Những con tàu chở container sừng sững cập bến cảng rực rỡ ánh đèn đêm."
    }
  },
  "満": {
    components: ["氵", "艹", "两"],
    equation: "氵 (Thủy - dòng nước) + hai bên thùng cân bằng đầy tràn",
    mnemonic: "Nước đổ đầy ắp (氵) tràn trề cả hai thùng cân xứng, không còn thiếu một giọt nào, viên mãn tràn đầy.",
    illustration: {
      badge: "🌕",
      concept: "Trăng tròn viên mãn",
      visualDesc: "Ly nước thủy tinh đầy ắp nước mát tràn ngập niềm hân hoan thỏa mãn."
    }
  },
  "演": {
    components: ["氵", "寅"],
    equation: "氵 (Thủy - dòng suối tuôn trào) + 寅 (cung kính giương oai)",
    mnemonic: "Lời nói lưu loát tuôn trào như dòng nước (氵), cử chỉ đĩnh đạc trình bày trước công chúng, biểu diễn diễn xuất.",
    illustration: {
      badge: "🎭",
      concept: "Sân khấu biểu diễn",
      visualDesc: "Ánh đèn sân khấu rọi chiếu diễn viên cất tiếng ca say đắm lòng người."
    }
  },
  "点": {
    components: ["占", "灬"],
    equation: "Chiếc que nóng đỏ (灬) dí một chấm lên mai rùa bói toán (占)",
    mnemonic: "Dí tàn lửa (灬) tạo một vết chấm nhỏ li ti trên thẻ mai rùa, tạo nên điểm số và dấu chấm câu.",
    illustration: {
      badge: "🎯",
      concept: "Điểm số tuyệt đối",
      visualDesc: "Con số 100 điểm tròn trĩnh viết bằng mực đỏ trên trang bài thi xuất sắc."
    }
  },
  "然": {
    components: ["月", "犬", "灬"],
    equation: "Miếng thịt (月) nướng trên lửa than (灬) chín tự nhiên thơm nức",
    mnemonic: "Thịt nướng trên ngọn lửa hồng (灬) chín vàng thơm lừng đúng theo quy luật tự nhiên của đất trời.",
    illustration: {
      badge: "🍃",
      concept: "Thiên nhiên an lành",
      visualDesc: "Khung cảnh rừng cây xanh mát hòa hợp tự nhiên dưới ánh nắng ban mai."
    }
  },
  "煙": {
    components: ["火", "西", "土"],
    equation: "火 (Hỏa - bếp lửa) + 西 (lò kín) + 土 (đất đắp miệng lò nhả khói)",
    mnemonic: "Lửa cháy âm ỉ trong lò đất kín (火 土) nhả ra từng luồng khói xám bay nghi ngút lên trời cao.",
    illustration: {
      badge: "💨",
      concept: "Làn khói lam chiều",
      visualDesc: "Làn khói bếp mỏng manh uốn lượn bay lên từ mái tranh trong buổi chiều tà."
    }
  },
  "熱": {
    components: ["土", "丸", "灬"],
    equation: "Hạt đất nung nóng + 灬 (bốn đốm lửa than rực hồng)",
    mnemonic: "Ngọn lửa than hồng hực (灬) hun nóng bừng bừng mọi vật xung quanh, biểu thị sức nóng và nhiệt huyết.",
    illustration: {
      badge: "🔥",
      concept: "Ngọn lửa nhiệt huyết",
      visualDesc: "Ngọn lửa đỏ rực bốc cao tỏa hơi ấm nóng nồng nàn lan tỏa."
    }
  },
  "犯": {
    components: ["犭", "卩"],
    equation: "犭 (chó sói hung hãn xông vào cắn) + 卩 (người co rúm chịu tội)",
    mnemonic: "Lao vào tấn công như thú dữ (犭) rồi bị bắt quỳ trói chịu tội (卩), biểu thị kẻ phạm nhân, xâm phạm.",
    illustration: {
      badge: "⛓️",
      concept: "Gông cùm phạm tội",
      visualDesc: "Cánh cửa sắt nhà giam khép lại cảnh tỉnh kẻ vi phạm pháp luật."
    }
  },
  "状": {
    components: ["爿", "犬"],
    equation: "Tấm bảng gỗ chia ô (爿) + phác họa hình dáng chú chó (犬)",
    mnemonic: "Vẽ phác họa hình dáng chú chó (犬) lên tấm bảng gỗ (爿) để miêu tả rõ ràng, tạo thành trạng thái, hình trạng.",
    illustration: {
      badge: "📋",
      concept: "Báo cáo trạng thái",
      visualDesc: "Bảng kiểm tra ghi rõ từng mục trạng thái vận hành của cỗ máy."
    }
  },
  "猫": {
    components: ["犭", "艹", "田"],
    equation: "犭 (loài thú bốn chân) + 苗 (mầm lúa trên ruộng bắt chuột / âm Miêu)",
    mnemonic: "Chú thú cưng bốn chân (犭) lanh lợi rình bắt chuột bảo vệ ruộng lúa (苗) kêu meo meo, chính là con mèo.",
    illustration: {
      badge: "🐱",
      concept: "Chú mèo lười sưởi nắng",
      visualDesc: "Chú mèo tam thể cuộn tròn ngủ say sưa trên bậc thềm đầy nắng ấm."
    }
  },
  "王": {
    components: ["王"],
    equation: "Ba cõi Thiên - Địa - Nhân thông suốt bởi một nét dọc uy quyền",
    mnemonic: "Nét dọc uy nghiêm kết nối cả ba cõi Trời, Đất và Con người, tượng trưng cho đấng quân vương trị vì.",
    illustration: {
      badge: "👑",
      concept: "Vương miện hoàng gia",
      visualDesc: "Vương miện vàng nạm ngọc quý uy nghiêm biểu tượng cho ngôi vua."
    }
  },
  "現": {
    components: ["王", "見"],
    equation: "王 (viên ngọc bích sáng) + 見 (nhìn thấy tỏ tường ngay trước mắt)",
    mnemonic: "Viên ngọc bích sáng ngời (王) lộ ra trước mắt trông thấy tỏ tường (見), biểu thị sự xuất hiện, hiện diện.",
    illustration: {
      badge: "✨",
      concept: "Hiện diện rạng ngời",
      visualDesc: "Hộp quà mở ra để lộ viên ngọc bích phát sáng lung linh ngay trước mắt."
    }
  },
  "球": {
    components: ["王", "求"],
    equation: "王 (Ngọc - viên ngọc quý) + 求 (ôm tròn vẹn toàn)",
    mnemonic: "Viên ngọc quý mài tròn xoe nhẵn bóng không góc cạnh, tạo thành hình quả cầu, trái bóng tròn.",
    illustration: {
      badge: "⚽",
      concept: "Quả bóng tròn lăn",
      visualDesc: "Quả bóng đá tròn xoe lăn trên sân cỏ xanh mướt dưới ánh đèn sân vận động."
    }
  },
  "産": {
    components: ["立", "亠", "厂", "生"],
    equation: "Dưới mái nhà sinh nở mầm sống non tươi (生) vươn lên đứng thẳng (立)",
    mnemonic: "Mầm sống non mới chào đời (生) được nâng niu nuôi dưỡng lớn khôn đứng vững, biểu thị sản sinh, sản nghiệp.",
    illustration: {
      badge: "🏭",
      concept: "Nhà máy sản xuất",
      visualDesc: "Dây chuyền sản xuất hiện đại chế tạo ra những sản phẩm chất lượng cao."
    }
  },
  "由": {
    components: ["由"],
    equation: "Chồi mầm vươn thoát ra khỏi miệng củ hạt giống",
    mnemonic: "Mầm cây tự mình vươn thẳng thoát khỏi vỏ hạt bung nở tự do, biểu thị nguồn cội, duyên do.",
    illustration: {
      badge: "🕊️",
      concept: "Tự do cất cánh",
      visualDesc: "Cánh chim tự do chao lượn giữa bầu trời bao la không rào cản."
    }
  },
  "申": {
    components: ["申"],
    equation: "Tia sét thẳng đứng rạch xuyên qua tầng mây vuông vức",
    mnemonic: "Tia chớp vạch thẳng giữa trời truyền thông điệp rõ ràng, từ đó biểu thị sự bày tỏ, thưa gửi, trình báo.",
    illustration: {
      badge: "📝",
      concept: "Đơn thư thưa gửi",
      visualDesc: "Lá đơn thưa gửi viết nắn nót trình bày nguyện vọng chân thành."
    }
  },
  "留": {
    components: ["卯", "田"],
    equation: "卯 (buộc neo giữ) + 田 (ở lại chăm sóc đồng ruộng)",
    mnemonic: "Ở lại bám trụ canh tác trên mảnh đất ruộng quê hương (田), không rời đi đâu, biểu thị lưu giữ, ở lại.",
    illustration: {
      badge: "📌",
      concept: "Ghim giữ lưu lại",
      visualDesc: "Chiếc ghim giấy gắn chặt bức ảnh kỷ niệm lưu giữ khoảnh khắc đáng nhớ."
    }
  },
  "番": {
    components: ["釆", "田"],
    equation: "Dấu chân móng thú (釆) in lần lượt qua từng ô ruộng (田)",
    mnemonic: "Lần theo từng dấu chân thú in theo thứ tự từng thửa ruộng (田), phân định rõ ràng số thứ tự, lượt phiên.",
    illustration: {
      badge: "🔢",
      concept: "Số thứ tự bốc thăm",
      visualDesc: "Tấm phiếu in con số thứ tự may mắn chuẩn bị bước vào lượt gọi tên."
    }
  },
  "疑": {
    components: ["匕", "矢", "マ", "疋"],
    equation: "Người đứng ngơ ngác giương tên bàn chân ngập ngừng rẽ lối",
    mnemonic: "Đứng giữa ngã ba đường chân ngập ngừng không biết lối nào đúng (疋), trong lòng dấy lên nỗi hoài nghi.",
    illustration: {
      badge: "❓",
      concept: "Dấu hỏi nghi vấn",
      visualDesc: "Dấu chấm hỏi lớn phát sáng giữa ngã ba đường đang cân nhắc lựa chọn."
    }
  },
  "疲": {
    components: ["疒", "皮"],
    equation: "疒 (Nạch - thể trạng bệnh tật) + 皮 (da dẻ tái mét hốc hác)",
    mnemonic: "Nằm mệt rã rời trên giường bệnh (疒) với làn da xanh xao hốc hác (皮), mỏi mệt kiệt sức sau ngày dài.",
    illustration: {
      badge: "😫",
      concept: "Thở dài mệt mỏi",
      visualDesc: "Người ngả lưng tựa ghế thở phào buông lỏng sau ngày làm việc mệt nhoài."
    }
  },
  "痛": {
    components: ["疒", "甬"],
    equation: "疒 (Nạch - nằm trên giường bệnh) + 甬 (cơn đau nhói buốt chạy dọc thân)",
    mnemonic: "Nằm quằn quại trên giường bệnh (疒) với cơn đau nhói buốt thấu tận tâm can, biểu thị sự đau đớn, nhức nhối.",
    illustration: {
      badge: "🩹",
      concept: "Băng dán vết thương",
      visualDesc: "Miếng băng gạc dán nhẹ xoa dịu vết thương đang nhức buốt."
    }
  },
  "登": {
    components: ["癶", "豆"],
    equation: "癶 (hai bàn chân bước rảo) + 豆 (bưng mâm lễ leo lên đền cao)",
    mnemonic: "Hai chân vững chãi bước từng bước (癶) bưng mâm lễ leo lên đỉnh núi đền đài, leo núi, đăng nhập.",
    illustration: {
      badge: "🧗",
      concept: "Leo lên đỉnh núi",
      visualDesc: "Người leo núi cắm lá cờ chiến thắng trên đỉnh núi tuyết phủ rực nắng."
    }
  },
  "皆": {
    components: ["比", "白"],
    equation: "比 (hai người sánh vai nhau) + 白 (cùng hướng về ánh sáng)",
    mnemonic: "Mọi người đều sánh vai sát cánh bên nhau (比) cùng hướng về ánh sáng công lý (白), tất cả đồng lòng.",
    illustration: {
      badge: "👨‍👩‍👧‍👦",
      concept: "Tất cả sum vầy",
      visualDesc: "Mọi người cùng nắm tay nhau quây quần trong ngày hội đoàn viên ấm cúng."
    }
  },
  "盗": {
    components: ["冫", "欠", "皿"],
    equation: "Há miệng thèm thuồng (欠) rình rập chiếc đĩa báu vật người khác (皿)",
    mnemonic: "Nhìn chiếc đĩa báu của người khác (皿) mà thèm thuồng rắp tâm lén lút cuỗm đi, hành vi trộm cắp đạo tặc.",
    illustration: {
      badge: "🦹",
      concept: "Kẻ trộm lén lút",
      visualDesc: "Bóng đen lén lút rón rén bước đi trong đêm tìm cách lấy cắp kho báu."
    }
  },
  "直": {
    components: ["十", "目", "𠃊"],
    equation: "Mắt (目) nhìn thẳng tắp không thiên lệch theo góc thước vuông (𠃊)",
    mnemonic: "Mắt sáng (目) nhìn ngay thẳng trực diện không nghiêng lệch chút nào, thẳng thắn chính trực và sửa cho thẳng.",
    illustration: {
      badge: "📏",
      concept: "Thước kẻ ngay thẳng",
      visualDesc: "Chiếc thước kẻ đặt thẳng tắp vạch nên một đường nét chuẩn xác không tì vết."
    }
  },
  "相": {
    components: ["木", "目"],
    equation: "目 (đôi mắt quan sát) + 木 (cành cây tươi tốt đối diện)",
    mnemonic: "Dùng mắt (目) chăm chú quan sát thế đứng của cây (木), tương hỗ lẫn nhau và xem tướng mạo.",
    illustration: {
      badge: "🤝",
      concept: "Tương trợ giúp đỡ",
      visualDesc: "Hai bàn tay bắt chặt lấy nhau thể hiện sự hợp tác tương thân tương ái."
    }
  },
  "眠": {
    components: ["目", "民"],
    equation: "目 (Mục - đôi mắt) + 民 (buông rèm khép mí lịm đi)",
    mnemonic: "Đôi mắt mỏi mệt (目) khép rèm mi lại chìm sâu vào giấc ngủ êm đềm ngon giấc, giấc ngủ miên man.",
    illustration: {
      badge: "😴",
      concept: "Chìm vào giấc ngủ",
      visualDesc: "Khuôn mặt say sưa ngủ ngon lành trên chiếc gối êm ái dưới ánh trăng."
    }
  },
  "石": {
    components: ["石"],
    equation: "Vách núi đá nhô ra (厂) bên dưới có tảng đá tảng (口)",
    mnemonic: "Tảng đá rắn chắc (口) lăn từ trên vách núi dựng đứng xuống (厂), cứng cáp vững bền cùng thời gian.",
    illustration: {
      badge: "🪨",
      concept: "Hòn đá tảng vững chãi",
      visualDesc: "Khối đá hoa cương cổ kính rêu phong sừng sững bên dòng suối ngàn năm."
    }
  },
  "破": {
    components: ["石", "皮"],
    equation: "石 (Thạch - tảng đá va chạm) + 皮 (tấm da xé rách toạc)",
    mnemonic: "Ném tảng đá lớn (石) va mạnh làm rách toạc tấm da thuộc (皮), phá vỡ tan nát mọi khuôn mẫu cũ.",
    illustration: {
      badge: "💥",
      concept: "Phá vỡ giới hạn",
      visualDesc: "Vỏ trứng nứt toác để chú gà con phá vỏ chui ra chào thế giới mới."
    }
  },
  "確": {
    components: ["石", "角", "隹"],
    equation: "石 (Thạch - tảng đá vững chãi) + chú chim mỏ nhọn đậu chắc chắn",
    mnemonic: "Chân tảng đá tảng kiên cố (石) không gì lay chuyển nổi, biểu thị sự xác thực, vững chắc chắn chắn.",
    illustration: {
      badge: "🔒",
      concept: "Chắc chắn kiên cố",
      visualDesc: "Chiếc ổ khóa bằng đồng chắc nịch bảo vệ an toàn tuyệt đối."
    }
  },
  "示": {
    components: ["二", "小"],
    equation: "Bàn thờ tế trời đất (二) tỏa ba tia sáng điềm lành xuống (小)",
    mnemonic: "Bàn thờ tế trời đất hiện rõ các dấu hiệu điềm báo cho dân chúng trông thấy tỏ tường, biểu thị hiển thị, chỉ dẫn.",
    illustration: {
      badge: "💡",
      concept: "Hiển thị rõ ràng",
      visualDesc: "Bảng chỉ dẫn phát sáng hiện rõ mũi tên dẫn đường mạch lạc cho khách bộ hành."
    }
  },
  "礼": {
    components: ["礻", "乚"],
    equation: "礻 (Thị - bàn thờ thần) + 乚 (người cúi mình cung kính)",
    mnemonic: "Đứng trước đền thờ (礻) cúi mình thi lễ trang nghiêm (乚), giữ trọn lễ nghĩa và phong thái lịch sự.",
    illustration: {
      badge: "🙇",
      concept: "Cúi đầu chào kính cẩn",
      visualDesc: "Người mặc trang phục truyền thống cúi gập người chào cung kính trang nhã."
    }
  },
  "祖": {
    components: ["礻", "且"],
    equation: "礻 (Thị - bàn thờ hương khói) + 且 (bài vị tổ tiên truyền đời)",
    mnemonic: "Lập bàn thờ tôn nghiêm (礻) đặt bài vị tưởng nhớ công ơn cội nguồn (且), đó là tổ tiên dòng họ.",
    illustration: {
      badge: "🏛️",
      concept: "Nhà thờ tổ tiên",
      visualDesc: "Ngôi từ đường cổ kính rợp bóng cây nơi thờ phụng tổ tiên muôn đời."
    }
  },
  "神": {
    components: ["礻", "申"],
    equation: "礻 (Thị - bàn thờ linh thiêng) + 申 (tia chớp quyền uy bầu trời)",
    mnemonic: "Thế lực màu nhiệm như tia chớp giáng trần (申) được người dân kính cẩn lập đền thờ phụng (礻), thần linh trời đất.",
    illustration: {
      badge: "⛩️",
      concept: "Đền thờ thần đạo",
      visualDesc: "Cổng đền Torii đỏ rực uy nghiêm ẩn hiện giữa làn sương mờ trên núi cao."
    }
  },
  "福": {
    components: ["礻", "一", "口", "田"],
    equation: "礻 (thần linh phù hộ) + gia đình có miệng ăn (口) và ruộng đất đầy đủ (田)",
    mnemonic: "Trời ban phước lành (礻) cho gia đình ấm no có ruộng cày (田) có cơm ăn (口), hưởng trọn phúc lộc trường thọ.",
    illustration: {
      badge: "🧧",
      concept: "Phong bao phúc lộc",
      visualDesc: "Bao lì xì đỏ in chữ Phúc vàng ánh kim mang lại may mắn đầu năm."
    }
  },
  "科": {
    components: ["禾", "斗"],
    equation: "禾 (Hòa - bông lúa hạt ngũ cốc) + 斗 (Đẩu - chiếc đấu đong phân hạng)",
    mnemonic: "Dùng đấu đong (斗) cân đo phân loại từng hạt lúa giống (禾) theo tiêu chuẩn rành mạch, hình thành các môn khoa học.",
    illustration: {
      badge: "🔬",
      concept: "Nghiên cứu khoa học",
      visualDesc: "Kính hiển vi và ống nghiệm khoa học soi rõ thế giới vi mô kỳ thú."
    }
  },
  "程": {
    components: ["禾", "呈"],
    equation: "禾 (cây lúa lớn theo từng kỳ vụ) + 呈 (biểu hiện rõ từng chặng)",
    mnemonic: "Cây lúa (禾) trải qua từng chặng thời gian nảy mầm trổ bông đơm hạt (呈), tạo thành một quá trình lộ trình hoàn chỉnh.",
    illustration: {
      badge: "📈",
      concept: "Lộ trình tiến bước",
      visualDesc: "Bản đồ vạch rõ từng chặng lộ trình từng bước tiến tới đích thành công."
    }
  },
  "種": {
    components: ["禾", "重"],
    equation: "禾 (Hòa - cây giống mùa màng) + 重 (Trọng - hạt mẩy nặng trĩu quý giá)",
    mnemonic: "Tuyển chọn những hạt lúa mẩy nặng trĩu hạt (重) trên cành (禾) để làm hạt giống ươm mầm cho vụ sau, chủng loại.",
    illustration: {
      badge: "🌱",
      concept: "Hạt giống ươm mầm",
      visualDesc: "Hạt giống tròn mẩy nằm êm trên luống đất mùn chuẩn bị đâm chồi xanh."
    }
  },
  "積": {
    components: ["禾", "責"],
    equation: "禾 (lúa gạo mùa màng) + 責 (trách nhiệm tích góp tiền tài vỏ sò 貝)",
    mnemonic: "Gom từng bó lúa chín (禾) và tiền tài cất giữ vào kho qua năm tháng, tích lũy tạo nên cơ nghiệp bền vững.",
    illustration: {
      badge: "🧱",
      concept: "Tích lũy từng viên gạch",
      visualDesc: "Từng viên gạch đặt chồng khít lên nhau tạo nên tòa lâu đài đồ sộ kiên cố."
    }
  },
  "突": {
    components: ["穴", "犬"],
    equation: "穴 (Huyệt - cửa hang tối) + 犬 (chú chó lao vụt ra ngoài)",
    mnemonic: "Từ trong kẽ hang đá tối tăm (穴), chú chó (犬) bất ngờ lao vụt ra ngoài khiến mọi người giật mình, đột ngột, đột phá.",
    illustration: {
      badge: "💥",
      concept: "Đột phá bất ngờ",
      visualDesc: "Mũi tên xé gió phóng vụt qua hồng tâm tạo nên cú bứt phá bất ngờ."
    }
  },
  "窓": {
    components: ["穴", "厶", "心"],
    equation: "Khoét lỗ trên vách tường (穴) làm ô cửa chớp đón gió nhìn ngắm thảnh thơi",
    mnemonic: "Ô cửa nhỏ khoét trên vách nhà (穴) đón ánh nắng sớm mai và làn gió mát rượi, ngắm cảnh an yên lòng dạ.",
    illustration: {
      badge: "🪟",
      concept: "Khung cửa sổ đón nắng",
      visualDesc: "Khung cửa sổ gỗ mở hé với tấm rèm mỏng bay bay trong làn gió sớm."
    }
  },
  "笑": {
    components: ["竹", "夭"],
    equation: "Rặng tre (竹) nghiêng ngả reo vui trong gió như nụ cười duyên dáng",
    mnemonic: "Cành tre mềm đung đưa kẽo kẹt trong gió như tiếng cười giòn tan rạng rỡ của người thiếu nữ.",
    illustration: {
      badge: "😄",
      concept: "Nụ cười giòn tan",
      visualDesc: "Gương mặt tươi cười rạng rỡ với đôi mắt cong hình vầng trăng khuyết."
    }
  },
  "等": {
    components: ["竹", "寺"],
    equation: "竹 (thẻ tre cắt đều tăm tắp) + 寺 (nơi cửa chùa công bằng trang nghiêm)",
    mnemonic: "Những chiếc thẻ tre (竹) được cắt gọt chiều dài đều tăm tắp như nhau nơi chốn thiền môn, bình đẳng không phân biệt.",
    illustration: {
      badge: "⚖️",
      concept: "Bình đẳng ngang hàng",
      visualDesc: "Hai chiếc đĩa cân thăng bằng tuyệt đối biểu thị sự bình đẳng công bằng."
    }
  },
  "箱": {
    components: ["竹", "相"],
    equation: "竹 (Trúc - nan tre ken chặt) + 相 (nắp khớp thân hộp vừa khít)",
    mnemonic: "Dùng nan tre (竹) đan thành chiếc hộp vuông vức có nắp đậy vừa khít khìn khịt (相), cất giữ đồ đạc gọn gàng.",
    illustration: {
      badge: "📦",
      concept: "Chiếc hộp chứa đồ",
      visualDesc: "Chiếc hộp gỗ sơn mài tinh xảo cất giữ những kỷ vật gia truyền quý giá."
    }
  },
  "米": {
    components: ["米"],
    equation: "Chữ tượng hình các hạt gạo trắng chia đều quanh cuống hạt",
    mnemonic: "Những hạt gạo trắng ngần tỏa ra xung quanh, ngọc thực quý giá nuôi sống con người qua bao thế hệ.",
    illustration: {
      badge: "🌾",
      concept: "Hạt gạo trắng ngần",
      visualDesc: "Bát cơm trắng dẻo thơm nấu từ những hạt gạo tuyển chọn ngon nhất."
    }
  },
  "精": {
    components: ["米", "青"],
    equation: "米 (hạt gạo xay xát kỹ) + 青 (Thanh - tinh khiết thuần khiết)",
    mnemonic: "Hạt gạo được giã kỹ trắng ngần tinh khiết (米 青), biểu thị sự tinh hoa, tinh xảo và tinh thần minh mẫn.",
    illustration: {
      badge: "💎",
      concept: "Viên kim cương tinh xảo",
      visualDesc: "Viên kim cương cắt giác tinh xảo lấp lánh phản chiếu bảy sắc cầu vồng."
    }
  },
  "約": {
    components: ["糸", "勺"],
    equation: "糸 (sợi chỉ thắt nút giữ lời) + 勺 (muỗng đong chừng mực)",
    mnemonic: "Thắt nút sợi chỉ màu (糸) vào ngón tay nhắc nhở giữ trọn lời hẹn ước thiêng liêng, ước tính chừng mực.",
    illustration: {
      badge: "🤝",
      concept: "Ước hẹn ngón tay út",
      visualDesc: "Hai ngón tay út ngoéo vào nhau thực hiện lời ước hẹn chân thành."
    }
  },
  "組": {
    components: ["糸", "且"],
    equation: "糸 (sợi tơ dệt) + 且 (chồng ghép từng lớp liên kết)",
    mnemonic: "Bện các sợi chỉ tơ lại với nhau (糸) chồng thành từng khối vững chãi (且), tạo nên tổ đội, tổ chức gắn kết.",
    illustration: {
      badge: "🧩",
      concept: "Tổ chức gắn kết",
      visualDesc: "Những bánh răng nhiều màu ăn khớp nhau xoay chuyển nhịp nhàng theo nhóm."
    }
  },
  "経": {
    components: ["糸", "圣"],
    equation: "糸 (sợi tơ dọc) + đường đi xuyên suốt qua thời gian",
    mnemonic: "Sợi chỉ dọc căng thẳng tắp trên khung cửi (糸) dẫn dắt đường thoi luồn qua, trải qua thời gian tạo thành kinh nghiệm, kinh điển.",
    illustration: {
      badge: "📜",
      concept: "Kinh thư cổ truyền",
      visualDesc: "Cuộn kinh thư viết trên lụa mềm lưu giữ bao kinh nghiệm ngàn năm."
    }
  },
  "給": {
    components: ["糸", "合"],
    equation: "糸 (dây tơ nguồn hàng) + 合 (vừa đủ khít nhu cầu)",
    mnemonic: "Nối liền sợi dây chu cấp (糸) đầy đủ vừa vặn cho mọi người (合), phát lương bổng chu cấp ấm no.",
    illustration: {
      badge: "💵",
      concept: "Phát lương cấp dưỡng",
      visualDesc: "Phong bao tiền lương trao tận tay người lao động đền đáp công sức miệt mài."
    }
  },
  "絵": {
    components: ["糸", "会"],
    equation: "糸 (sợi chỉ màu tơ lụa) + 会 (hội tụ đường nét sắc màu)",
    mnemonic: "Những sợi chỉ tơ muôn màu (糸) hội tụ lại trên tấm lụa trắng (会), dệt thêu nên bức tranh vẽ tuyệt tác.",
    illustration: {
      badge: "🖼️",
      concept: "Bức tranh sơn mài",
      visualDesc: "Bức tranh phong cảnh vẽ ngọn núi Phú Sĩ lộng lẫy lồng trong khung gỗ mạ vàng."
    }
  },
  "絶": {
    components: ["糸", "刀", "巴"],
    equation: "糸 (sợi dây tơ mỏng) + 刀 (nhát dao chém đứt lìa)",
    mnemonic: "Lưỡi dao bén (刀) chém phập đứt lìa sợi tơ mỏng manh (糸), dứt khoát tuyệt đối không còn vương vấn.",
    illustration: {
      badge: "✂️",
      concept: "Cắt đứt dứt khoát",
      visualDesc: "Nhát kéo sắc bén cắt đôi sợi chỉ tơ dứt khoát kết thúc một chặng đường."
    }
  },
  "続": {
    components: ["糸", "売"],
    equation: "糸 (sợi tơ dài) + nối dài liên tiếp không ngừng nghỉ",
    mnemonic: "Nối tiếp mối chỉ này vào cuộn chỉ kia (糸) để dòng tơ tuôn chảy không ngừng nghỉ, tiếp tục hành trình.",
    illustration: {
      badge: "🔄",
      concept: "Liên tục không ngừng",
      visualDesc: "Mũi tên xoay tròn tuần hoàn biểu thị quá trình tiếp nối liên tục không dứt."
    }
  },
  "緒": {
    components: ["糸", "者"],
    equation: "糸 (sợi tơ rối) + 者 (người tìm ra đầu mối sợi chỉ)",
    mnemonic: "Lần tìm ra đầu mối sợi tơ mỏng (糸) để tháo gỡ cả cuộn chỉ rối, gỡ nút thắt tâm sự trong lòng.",
    illustration: {
      badge: "🧶",
      concept: "Đầu mối cuộn len",
      visualDesc: "Bàn tay khéo léo tìm ra đầu sợi dây len để đan dệt chiếc khăn ấm."
    }
  },
  "罪": {
    components: ["罒", "非"],
    equation: "罒 (Võng - lưới pháp luật) + 非 (hành vi sai trái phạm quy)",
    mnemonic: "Tấm lưới luật pháp (罒) giăng bắt kẻ có hành vi sai trái bất lương (非), định tội xử phạt nghiêm minh.",
    illustration: {
      badge: "⚖️",
      concept: "Tòa án phán quyết",
      visualDesc: "Búa thẩm phán gõ vang trên bục gỗ xử lý nghiêm minh mọi hành vi phạm tội."
    }
  },
  "置": {
    components: ["罒", "直"],
    equation: "罒 (tấm lưới) + 直 (đặt ngay ngắn đúng vị trí)",
    mnemonic: "Đặt đồ vật ngay ngắn thẳng hàng (直) vào đúng ô lưới quy định (罒), bài trí và bố trí ngăn nắp.",
    illustration: {
      badge: "📦",
      concept: "Sắp xếp bố trí",
      visualDesc: "Những chiếc hộp được sắp xếp ngay ngắn thẳng tắp trên kệ hàng."
    }
  },
  "美": {
    components: ["羊", "大"],
    equation: "羊 (Dương - con cừu lông trắng mượt) + 大 (to lớn tròn đầy)",
    mnemonic: "Chú cừu to lớn (大) có bộ lông trắng mướt mềm mại óng ả (羊), hình ảnh hài hòa đẹp đẽ tuyệt mỹ.",
    illustration: {
      badge: "🌸",
      concept: "Vẻ đẹp thuần khiết",
      visualDesc: "Đóa hoa sen hồng bung nở khoe sắc thanh tao giữa làn nước trong vắt."
    }
  },
  "老": {
    components: ["耂", "匕"],
    equation: "Chữ tượng hình cụ già tóc dài bạc phơ chống gậy bước đi",
    mnemonic: "Cụ già râu tóc bạc phơ chống gậy từng bước chậm rãi vững vàng, tượng trưng cho tuổi già và sự thông thái kính trọng.",
    illustration: {
      badge: "👴",
      concept: "Cụ già thông thái",
      visualDesc: "Cụ già nở nụ cười hiền hậu tay chống gậy tre thong dong ngắm cảnh."
    }
  },
  "耳": {
    components: ["耳"],
    equation: "Chữ tượng hình vành tai và nếp sụn đón âm thanh",
    mnemonic: "Vành tai mở rộng đón nhận mọi thanh âm du dương của cuộc sống, biểu thị cái tai và sự lắng nghe.",
    illustration: {
      badge: "👂",
      concept: "Lắng nghe thanh âm",
      visualDesc: "Đôi tai lắng nghe tiếng chim hót véo von trong sớm mai trong lành."
    }
  }
};

const rootJsonPath = path.join(__dirname, '../kanji_full_database.json');
const publicJsonPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootJsPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicJsonPath, 'utf8'));

let count = 0;
for (const [char, patch] of Object.entries(n3cData)) {
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

console.log(`[Batch 3C - N3 Part 3] Đã cập nhật thành công ${count} / ${Object.keys(n3cData).length} chữ Kanji N3.`);

fs.writeFileSync(publicJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsonPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootJsPath, 'window.KANJI_FULL_DATABASE = ' + JSON.stringify(db, null, 2) + ';\n', 'utf8');
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
