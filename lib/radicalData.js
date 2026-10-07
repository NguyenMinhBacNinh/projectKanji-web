// Cơ sở dữ liệu và thuật toán bóc tách 214 Bộ thủ Khang Hi (部首 - Kangxi Radicals)
// Cùng thư viện chiết tự thành phần cấu tạo chữ Kanji (Decomposition & Mnemonics)

/**
 * Danh mục 214 Bộ thủ Khang Hi chuẩn & các biến thể thường gặp trong tiếng Nhật
 */
export const RADICAL_DICT = {
  // 1 NÉT
  '一': { name: 'Nhất', jp: 'いち', meaning: 'Một, khởi đầu', strokes: 1, pos: 'Toàn thể / Ngang' },
  '丨': { name: 'Cổn', jp: 'ぼう', meaning: 'Nét sổ dọc, thông suốt', strokes: 1, pos: 'Chính giữa' },
  '丶': { name: 'Điểm', jp: 'てん', meaning: 'Dấu chấm, đốm lửa/nước', strokes: 1, pos: 'Trên / Điểm xuyết' },
  '丿': { name: 'Phiệt', jp: 'の', meaning: 'Nét phẩy, uốn lượn bên trái', strokes: 1, pos: 'Bên trái' },
  '乙': { name: 'Ất', jp: 'おつ', meaning: 'Can Ất, cong queo, mầm cây', strokes: 1, pos: 'Toàn thể / Dưới' },
  '亅': { name: 'Quyết', jp: 'はねぼう', meaning: 'Nét móc lên', strokes: 1, pos: 'Dọc móc' },

  // 2 NÉT
  '二': { name: 'Nhị', jp: 'に', meaning: 'Số hai (2), trời và đất', strokes: 2, pos: 'Toàn thể' },
  '亠': { name: 'Đầu', jp: 'なべぶた', meaning: 'Nắp đậy, mái chóp nhọn', strokes: 2, pos: 'Kanmuri (Đỉnh)' },
  '人': { name: 'Nhân', jp: 'ひと', meaning: 'Con người, dáng đứng hai chân', strokes: 2, pos: 'Toàn thể' },
  '亻': { name: 'Nhân đứng', jp: 'にんべん', meaning: 'Con người (dáng đứng bên cạnh)', strokes: 2, pos: 'Hen (Trái)' },
  '儿': { name: 'Nhi', jp: 'ひとあし', meaning: 'Đôi chân người, trẻ nhỏ', strokes: 2, pos: 'Ashi (Chân/Dưới)' },
  '入': { name: 'Nhập', jp: 'いりがしら', meaning: 'Vào trong, gia nhập', strokes: 2, pos: 'Toàn thể / Đỉnh' },
  '八': { name: 'Bát', jp: 'はち', meaning: 'Số tám (8), xòe ra hai bên', strokes: 2, pos: 'Đỉnh / Dưới' },
  '冂': { name: 'Quynh', jp: 'まきがまえ', meaning: 'Vùng biên cương, khung thành', strokes: 2, pos: 'Kamae (Khung bao)' },
  '冖': { name: 'Mịch', jp: 'わかんむり', meaning: 'Khăn trùm đầu, phủ kín', strokes: 2, pos: 'Kanmuri (Đỉnh)' },
  '冫': { name: 'Băng', jp: 'にすい', meaning: 'Băng tuyết, giá lạnh', strokes: 2, pos: 'Hen (Trái)' },
  '几': { name: 'Kỷ', jp: 'きにょう', meaning: 'Bàn con, ghế tựa thấp', strokes: 2, pos: 'Kamae (Bao quanh)' },
  '凵': { name: 'Khảm', jp: 'かんにょう', meaning: 'Hố trũng sâu, vật chứa', strokes: 2, pos: 'Ashi (Dưới)' },
  '刀': { name: 'Đao', jp: 'かたな', meaning: 'Con dao, thanh gươm', strokes: 2, pos: 'Toàn thể / Phải' },
  '刂': { name: 'Đao đứng', jp: 'りっとう', meaning: 'Con dao cắt, lưỡi kiếm nhọn', strokes: 2, pos: 'Tsukuri (Phải)' },
  '力': { name: 'Lực', jp: 'ちから', meaning: 'Sức mạnh, cơ bắp cuồn cuộn', strokes: 2, pos: 'Toàn thể / Phải' },
  '勹': { name: 'Bao', jp: 'つつみがまえ', meaning: 'Bao bọc, ôm lấy', strokes: 2, pos: 'Tare (Bao trên-trái)' },
  '匕': { name: 'Chủy', jp: 'さじ', meaning: 'Cái thìa múc, con dao găm', strokes: 2, pos: 'Phải / Dưới' },
  '匚': { name: 'Phương', jp: 'はこがまえ', meaning: 'Hộp chữ nhật đựng đồ', strokes: 2, pos: 'Kamae (Khung mở phải)' },
  '十': { name: 'Thập', jp: 'じゅう', meaning: 'Số mười (10), thập toàn thập mỹ', strokes: 2, pos: 'Toàn thể' },
  '卜': { name: 'Bốc', jp: 'ぼく', meaning: 'Bói toán, vết nứt trên mai rùa', strokes: 2, pos: 'Phải / Trên' },
  '卩': { name: 'Tiết', jp: 'ふしづくり', meaning: 'Đốt tre, người quỳ gối', strokes: 2, pos: 'Tsukuri (Phải)' },
  '厂': { name: 'Hán', jp: 'がんだれ', meaning: 'Sườn núi đá dốc đứng', strokes: 2, pos: 'Tare (Trùm trên-trái)' },
  '厶': { name: 'Khứ', jp: 'む', meaning: 'Riêng tư, bản thân, ích kỷ', strokes: 2, pos: 'Dưới / Phải' },
  '又': { name: 'Hựu', jp: 'また', meaning: 'Bàn tay phải, lại nữa, lặp lại', strokes: 2, pos: 'Dưới / Phải' },

  // 3 NÉT
  '口': { name: 'Khẩu', jp: 'くち', meaning: 'Cái miệng, lối vào, cửa khẩu', strokes: 3, pos: 'Toàn thể / Trái' },
  '囗': { name: 'Vi', jp: 'くにがまえ', meaning: 'Vây kín bốn phía, thành lũy', strokes: 3, pos: 'Kamae (Bao kín)' },
  '土': { name: 'Thổ', jp: 'つち', meaning: 'Đất cát, mặt đất trồng trọt', strokes: 3, pos: 'Hen (Trái) / Dưới' },
  '士': { name: 'Sĩ', jp: 'さむらい', meaning: 'Kẻ sĩ, quan văn, chiến binh', strokes: 3, pos: 'Đỉnh / Toàn thể' },
  '夂': { name: 'Tuy', jp: 'すいにょう', meaning: 'Đi chậm rãi, bước sau cùng', strokes: 3, pos: 'Ashi (Dưới)' },
  '夊': { name: 'Truy', jp: 'すいにょう', meaning: 'Đi lê bước, đến sau', strokes: 3, pos: 'Ashi (Dưới)' },
  '夕': { name: 'Tịch', jp: 'ゆうべ', meaning: 'Buổi chiều tà, hoàng hôn buông', strokes: 3, pos: 'Trái / Toàn thể' },
  '大': { name: 'Đại', jp: 'だい', meaning: 'To lớn, người dang rộng tay chân', strokes: 3, pos: 'Toàn thể / Đỉnh' },
  '女': { name: 'Nữ', jp: 'おんな', meaning: 'Phụ nữ, dáng người đoan trang', strokes: 3, pos: 'Hen (Trái) / Dưới' },
  '子': { name: 'Tử', jp: 'こ', meaning: 'Đứa con, trẻ nhỏ, mầm mống', strokes: 3, pos: 'Toàn thể / Trái' },
  '宀': { name: 'Miên', jp: 'うかんむり', meaning: 'Mái nhà che chở, tổ ấm', strokes: 3, pos: 'Kanmuri (Đỉnh)' },
  '寸': { name: 'Thốn', jp: 'すん', meaning: 'Tấc đo (đơn vị đo), bàn tay đo mạch', strokes: 3, pos: 'Tsukuri (Phải)' },
  '小': { name: 'Tiểu', jp: 'しょう', meaning: 'Nhỏ bé, vụn vặt', strokes: 3, pos: 'Đỉnh / Toàn thể' },
  '⺌': { name: 'Tiểu đầu', jp: 'しょうかんむり', meaning: 'Nhỏ bé (ở phía trên)', strokes: 3, pos: 'Kanmuri (Đỉnh)' },
  '尢': { name: 'Uông', jp: 'まげあし', meaning: 'Chân yếu, què quặt', strokes: 3, pos: 'Trái / Dưới' },
  '尸': { name: 'Thi', jp: 'しかばね', meaning: 'Thể xác, thân người nằm', strokes: 3, pos: 'Tare (Bao trên-trái)' },
  '屮': { name: 'Triệt', jp: 'てつ', meaning: 'Mầm non mới nhú khỏi mặt đất', strokes: 3, pos: 'Đỉnh' },
  '山': { name: 'Sơn', jp: 'やま', meaning: 'Ngọn núi, đỉnh non cao', strokes: 3, pos: 'Toàn thể / Trái / Đỉnh' },
  '巛': { name: 'Xuyên', jp: 'まがりがわ', meaning: 'Dòng sông uốn lượn', strokes: 3, pos: 'Trái / Đỉnh' },
  '川': { name: 'Xuyên', jp: 'かわ', meaning: 'Dòng sông chảy xiết', strokes: 3, pos: 'Toàn thể / Phải' },
  '工': { name: 'Công', jp: 'こう', meaning: 'Thợ thuyền, thước thợ, công trình', strokes: 3, pos: 'Trái / Dưới' },
  '己': { name: 'Kỷ', jp: 'おのれ', meaning: 'Bản thân mình, can Kỷ', strokes: 3, pos: 'Toàn thể / Dưới' },
  '巾': { name: 'Cân', jp: 'はば', meaning: 'Khăn vải, cờ treo, rèm che', strokes: 3, pos: 'Hen (Trái) / Dưới' },
  '干': { name: 'Can', jp: 'かん', meaning: 'Cái khiên chắn, can thiệp, phơi khô', strokes: 3, pos: 'Đỉnh / Toàn thể' },
  '幺': { name: 'Yêu', jp: 'いとがしら', meaning: 'Sợi tơ nhỏ xíu, nhỏ bé nhất', strokes: 3, pos: 'Đỉnh / Trái' },
  '广': { name: 'Quảng', jp: 'まだれ', meaning: 'Mái nhà lớn tựa vách núi', strokes: 3, pos: 'Tare (Bao trên-trái)' },
  '廴': { name: 'Dẫn', jp: 'えんにょう', meaning: 'Bước chân dài, đi xa, kéo dài', strokes: 3, pos: 'Nyo (Bao dưới-trái)' },
  '廾': { name: 'Củng', jp: 'にじゅうあし', meaning: 'Hai tay chắp lại dâng lên', strokes: 3, pos: 'Ashi (Dưới)' },
  '弋': { name: 'Dặc', jp: 'しきがまえ', meaning: 'Cọc cắm neo, mũi tên có dây', strokes: 3, pos: 'Phải' },
  '弓': { name: 'Cung', jp: 'ゆみ', meaning: 'Cánh cung cong bắn tên', strokes: 3, pos: 'Hen (Trái)' },
  '彐': { name: 'Kế', jp: 'けいがしら', meaning: 'Đầu con nhím, móng vuốt', strokes: 3, pos: 'Đỉnh / Giữa' },
  '彡': { name: 'Sâm', jp: 'さんづくり', meaning: 'Lông dài mượt mà, hoa văn đẹp', strokes: 3, pos: 'Tsukuri (Phải)' },
  '彳': { name: 'Xích', jp: 'ぎょうにんべん', meaning: 'Bước chân trái, ngã tư đường', strokes: 3, pos: 'Hen (Trái)' },

  // 4 NÉT
  '心': { name: 'Tâm', jp: 'こころ', meaning: 'Trái tim, tâm tư, tình cảm', strokes: 4, pos: 'Ashi (Dưới)' },
  '忄': { name: 'Tâm đứng', jp: 'りっしんべん', meaning: 'Trái tim, cảm xúc nội tâm', strokes: 3, pos: 'Hen (Trái)' },
  '戈': { name: 'Qua', jp: 'ほこ', meaning: 'Vũ khí cổ, cây giáo có ngạnh', strokes: 4, pos: 'Tsukuri (Phải)' },
  '戶': { name: 'Hộ', jp: 'と', meaning: 'Cánh cửa một cánh, hộ gia đình', strokes: 4, pos: 'Tare (Bao trên-trái)' },
  '手': { name: 'Thủ', jp: 'て', meaning: 'Bàn tay khéo léo', strokes: 4, pos: 'Toàn thể / Dưới' },
  '扌': { name: 'Thủ (gảy)', jp: 'てへん', meaning: 'Bàn tay thao tác, nắm bắt', strokes: 3, pos: 'Hen (Trái)' },
  '支': { name: 'Chi', jp: 'しにょう', meaning: 'Cành cây, chi nhánh, chống đỡ', strokes: 4, pos: 'Tsukuri (Phải)' },
  '攴': { name: 'Phộc', jp: 'ぼくづくり', meaning: 'Cầm gậy đánh nhẹ, hành động', strokes: 4, pos: 'Tsukuri (Phải)' },
  '攵': { name: 'Phộc (văn)', jp: 'のぶん', meaning: 'Đánh đòn, thúc ép, tác động', strokes: 4, pos: 'Tsukuri (Phải)' },
  '文': { name: 'Văn', jp: 'ぶん', meaning: 'Hoa văn, chữ nghĩa, văn chương', strokes: 4, pos: 'Đỉnh / Dưới' },
  '斗': { name: 'Đẩu', jp: 'とます', meaning: 'Cái đấu đong gạo, chòm sao Bắc Đẩu', strokes: 4, pos: 'Tsukuri (Phải)' },
  '斤': { name: 'Cân', jp: 'きん', meaning: 'Chiếc rìu chặt gỗ, cân nặng', strokes: 4, pos: 'Tsukuri (Phải)' },
  '方': { name: 'Phương', jp: 'ほう', meaning: 'Phương hướng, chiếc bè vuông', strokes: 4, pos: 'Hen (Trái)' },
  '无': { name: 'Vô', jp: 'むにょう', meaning: 'Không có, hư vô', strokes: 4, pos: 'Phải' },
  '日': { name: 'Nhật', jp: 'ひ', meaning: 'Mặt trời, ban ngày, ngày tháng', strokes: 4, pos: 'Trái / Đỉnh / Toàn thể' },
  '曰': { name: 'Viết', jp: 'ひらび', meaning: 'Mở miệng nói rằng, rằng là', strokes: 4, pos: 'Đỉnh / Toàn thể' },
  '月': { name: 'Nguyệt', jp: 'つき', meaning: 'Mặt trăng, tháng, ban đêm', strokes: 4, pos: 'Hen (Trái) / Phải' },
  '⺼': { name: 'Nhục', jp: 'にくづき', meaning: 'Thịt, các bộ phận thân thể người', strokes: 4, pos: 'Hen (Trái)' },
  '木': { name: 'Mộc', jp: 'き', meaning: 'Cây cối, gỗ rừng, thực vật', strokes: 4, pos: 'Hen (Trái) / Toàn thể' },
  '欠': { name: 'Khiếm', jp: 'あくび', meaning: 'Ngáp, thiếu thốn, khuyết điểm', strokes: 4, pos: 'Tsukuri (Phải)' },
  '止': { name: 'Chỉ', jp: 'とめる', meaning: 'Dừng lại, bàn chân đứng yên', strokes: 4, pos: 'Đỉnh / Trái' },
  '歹': { name: 'Đãi', jp: 'がつへん', meaning: 'Xương tàn, chết chóc, hủy hoại', strokes: 4, pos: 'Hen (Trái)' },
  '殳': { name: 'Thù', jp: 'ほこづくり', meaning: 'Gậy tre nhọn, đập đánh', strokes: 4, pos: 'Tsukuri (Phải)' },
  '毋': { name: 'Vô', jp: 'なかれ', meaning: 'Chớ, đừng, mẹ hiền', strokes: 4, pos: 'Toàn thể' },
  '比': { name: 'Tỷ', jp: 'くらべる', meaning: 'So sánh hai người cạnh nhau', strokes: 4, pos: 'Phải' },
  '毛': { name: 'Mao', jp: 'け', meaning: 'Lông tóc, cỏ cây mượt', strokes: 4, pos: 'Dưới / Phải' },
  '氏': { name: 'Thị', jp: 'うじ', meaning: 'Dòng họ, thị tộc, người uy tín', strokes: 4, pos: 'Toàn thể' },
  '气': { name: 'Khí', jp: 'きがまえ', meaning: 'Hơi nước bốc lên, không khí', strokes: 4, pos: 'Kamae (Khung bao)' },
  '水': { name: 'Thủy', jp: 'みず', meaning: 'Nước sông suối, chất lỏng', strokes: 4, pos: 'Toàn thể / Dưới' },
  '氵': { name: 'Ba chấm thủy', jp: 'さんずい', meaning: 'Giọt nước, sông biển, ẩm ướt', strokes: 3, pos: 'Hen (Trái)' },
  '火': { name: 'Hỏa', jp: 'ひ', meaning: 'Ngọn lửa bốc cháy, hơi nóng', strokes: 4, pos: 'Hen (Trái) / Toàn thể' },
  '灬': { name: 'Hỏa đốm', jp: 'れっか', meaning: 'Lửa đun nấu ở dưới đáy', strokes: 4, pos: 'Ashi (Dưới)' },
  '爪': { name: 'Trảo', jp: 'つめ', meaning: 'Móng vuốt muông thú, chộp lấy', strokes: 4, pos: 'Đỉnh / Toàn thể' },
  '爫': { name: 'Trảo đầu', jp: 'そうにょう', meaning: 'Móng vuốt chộp từ trên xuống', strokes: 4, pos: 'Kanmuri (Đỉnh)' },
  '父': { name: 'Phụ', jp: 'ちち', meaning: 'Người cha, trụ cột gia đình', strokes: 4, pos: 'Đỉnh' },
  '爻': { name: 'Hào', jp: 'こう', meaning: 'Đan chéo, hào trong kinh Dịch', strokes: 4, pos: 'Giữa' },
  '爿': { name: 'Tường', jp: 'しょうへん', meaning: 'Mảnh gỗ xẻ dọc bên trái', strokes: 4, pos: 'Hen (Trái)' },
  '片': { name: 'Phiến', jp: 'かた', meaning: 'Mảnh ván mỏng, một phía lẻ loi', strokes: 4, pos: 'Hen (Trái)' },
  '牙': { name: 'Nha', jp: 'きば', meaning: 'Răng nanh cắn khít nhau', strokes: 4, pos: 'Trái' },
  '牛': { name: 'Ngưu', jp: 'うし', meaning: 'Con trâu, con bò kéo cày', strokes: 4, pos: 'Toàn thể / Trái' },
  '牜': { name: 'Ngưu đứng', jp: 'うしへん', meaning: 'Trâu bò kéo cày', strokes: 4, pos: 'Hen (Trái)' },
  '犬': { name: 'Khuyển', jp: 'いぬ', meaning: 'Con chó trung thành', strokes: 4, pos: 'Toàn thể / Phải' },
  '犭': { name: 'Khuyển thú', jp: 'けものへん', meaning: 'Muông thú rừng rậm hung dữ', strokes: 3, pos: 'Hen (Trái)' },

  // 5 NÉT
  '玄': { name: 'Huyền', jp: 'げん', meaning: 'Màu đen huyền ảo, sâu thẳm', strokes: 5, pos: 'Đỉnh' },
  '玉': { name: 'Ngọc', jp: 'たま', meaning: 'Viên ngọc quý có chấm ngọc', strokes: 5, pos: 'Toàn thể / Trái' },
  '王': { name: 'Vương', jp: 'おうへん', meaning: 'Vị vua, ngọc bội quý báu', strokes: 4, pos: 'Hen (Trái)' },
  '瓜': { name: 'Qua', jp: 'うり', meaning: 'Quả dưa dây leo', strokes: 5, pos: 'Toàn thể' },
  '瓦': { name: 'Ngõa', jp: 'かわら', meaning: 'Ngói nung lợp mái nhà', strokes: 5, pos: 'Tsukuri (Phải)' },
  '甘': { name: 'Cam', jp: 'あまい', meaning: 'Vị ngọt thanh, thơm ngon', strokes: 5, pos: 'Toàn thể' },
  '生': { name: 'Sinh', jp: 'うまれる', meaning: 'Sinh sống, nảy mầm, cuộc đời', strokes: 5, pos: 'Toàn thể / Phải' },
  '用': { name: 'Dụng', jp: 'もちいる', meaning: 'Sử dụng, dùng đến có ích', strokes: 5, pos: 'Toàn thể' },
  '田': { name: 'Điền', jp: 'た', meaning: 'Thửa ruộng vuông vức bốn ô', strokes: 5, pos: 'Toàn thể / Dưới' },
  '疋': { name: 'Thất', jp: 'ひき', meaning: 'Đùi chân, cuộn vải lụa', strokes: 5, pos: 'Ashi / Hen' },
  '疒': { name: 'Nạch', jp: 'やまいだれ', meaning: 'Bệnh tật, ốm đau nằm liệt', strokes: 5, pos: 'Tare (Bao trên-trái)' },
  '癶': { name: 'Bát', jp: 'はつがしら', meaning: 'Đôi bàn chân hướng ngược nhau', strokes: 5, pos: 'Kanmuri (Đỉnh)' },
  '白': { name: 'Bạch', jp: 'しろ', meaning: 'Màu trắng muốt, sáng sủa', strokes: 5, pos: 'Hen (Trái) / Đỉnh' },
  '皮': { name: 'Bì', jp: 'けがわ', meaning: 'Lớp da lột, vỏ bọc ngoài', strokes: 5, pos: 'Phải / Toàn thể' },
  '皿': { name: 'Mãnh', jp: 'さら', meaning: 'Cái đĩa, bát đĩa đựng đồ ăn', strokes: 5, pos: 'Ashi (Dưới)' },
  '目': { name: 'Mục', jp: 'め', meaning: 'Con mắt nhìn thấu, mục tiêu', strokes: 5, pos: 'Hen (Trái) / Toàn thể' },
  '矛': { name: 'Mâu', jp: 'ほこ', meaning: 'Cây mâu đâm thủng giáo khiên', strokes: 5, pos: 'Hen (Trái)' },
  '矢': { name: 'Thỉ', jp: 'や', meaning: 'Mũi tên bay thẳng tắp', strokes: 5, pos: 'Hen (Trái)' },
  '石': { name: 'Thạch', jp: 'いし', meaning: 'Hòn đá cuội, tảng đá cứng', strokes: 5, pos: 'Hen (Trái)' },
  '示': { name: 'Thị', jp: 'しめす', meaning: 'Thần linh hiển linh chỉ bảo', strokes: 5, pos: 'Ashi (Dưới)' },
  '礻': { name: 'Kỳ / Thị', jp: 'しめすへん', meaning: 'Thần linh, đền thờ, phúc lộc', strokes: 4, pos: 'Hen (Trái)' },
  '禾': { name: 'Hòa', jp: 'のぎへん', meaning: 'Cây lúa trĩu bông mùa gặt', strokes: 5, pos: 'Hen (Trái)' },
  '穴': { name: 'Huyệt', jp: 'あなかんむり', meaning: 'Hang hốc trong lòng đất', strokes: 5, pos: 'Kanmuri (Đỉnh)' },
  '立': { name: 'Lập', jp: 'たつ', meaning: 'Đứng vững vàng trên mặt đất', strokes: 5, pos: 'Đỉnh / Trái' },

  // 6 NÉT
  '竹': { name: 'Trúc', jp: 'たけ', meaning: 'Cây tre, ống nứa', strokes: 6, pos: 'Toàn thể' },
  '⺮': { name: 'Trúc đầu', jp: 'たけかんむり', meaning: 'Tre trúc, đồ đan bằng tre', strokes: 6, pos: 'Kanmuri (Đỉnh)' },
  '米': { name: 'Mễ', jp: 'こめ', meaning: 'Hạt gạo trắng, ngũ cốc', strokes: 6, pos: 'Hen (Trái)' },
  '糸': { name: 'Mịch', jp: 'いと', meaning: 'Sợi chỉ tơ tằm mềm mại', strokes: 6, pos: 'Hen (Trái) / Dưới' },
  '缶': { name: 'Phẫu', jp: 'ほとぎ', meaning: 'Đồ sành sứ đựng nước', strokes: 6, pos: 'Hen (Trái)' },
  '网': { name: 'Võng', jp: 'あみがしら', meaning: 'Lưới đánh bắt cá', strokes: 6, pos: 'Kanmuri (Đỉnh)' },
  '羊': { name: 'Dương', jp: 'ひつじ', meaning: 'Con cừu, con dê hiền lành', strokes: 6, pos: 'Đỉnh / Trái' },
  '羽': { name: 'Vũ', jp: 'はね', meaning: 'Lông vũ cánh chim bay lượn', strokes: 6, pos: 'Đỉnh / Phải' },
  '老': { name: 'Lão', jp: 'おい', meaning: 'Người già cả, bậc cao niên', strokes: 6, pos: 'Kanmuri (Đỉnh)' },
  '而': { name: 'Nhi', jp: 'しこうして', meaning: 'Bộ râu cằm, mà, lại còn', strokes: 6, pos: 'Toàn thể' },
  '耒': { name: 'Lỗi', jp: 'らいすき', meaning: 'Cái cày vỡ đất ruộng', strokes: 6, pos: 'Hen (Trái)' },
  '耳': { name: 'Nhĩ', jp: 'みみ', meaning: 'Lỗ tai lắng nghe', strokes: 6, pos: 'Hen (Trái)' },
  '聿': { name: 'Duật', jp: 'ふでづくり', meaning: 'Cây bút lông viết chữ', strokes: 6, pos: 'Tsukuri (Phải)' },
  '肉': { name: 'Nhục', jp: 'にく', meaning: 'Miếng thịt súc vật', strokes: 6, pos: 'Toàn thể' },
  '臣': { name: 'Thần', jp: 'しん', meaning: 'Bầy tôi, quan thần trung nghĩa', strokes: 6, pos: 'Hen (Trái)' },
  '自': { name: 'Tự', jp: 'みずから', meaning: 'Tự bản thân, cái mũi', strokes: 6, pos: 'Đỉnh / Trái' },
  '至': { name: 'Chí', jp: 'いたる', meaning: 'Đến nơi, cùng cực, mũi tên chạm đất', strokes: 6, pos: 'Hen (Trái)' },
  '臼': { name: 'Cối', jp: 'うす', meaning: 'Cối đá giã gạo', strokes: 6, pos: 'Toàn thể' },
  '舌': { name: 'Thiệt', jp: 'した', meaning: 'Cái lưỡi nếm vị, phát âm', strokes: 6, pos: 'Hen (Trái)' },
  '舟': { name: 'Chu', jp: 'ふねへん', meaning: 'Con thuyền độc mộc lướt sóng', strokes: 6, pos: 'Hen (Trái)' },
  '艮': { name: 'Cấn', jp: 'うしとら', meaning: 'Quẻ Cấn, cứng cỏi, dừng lại', strokes: 6, pos: 'Tsukuri (Phải)' },
  '色': { name: 'Sắc', jp: 'いろ', meaning: 'Màu sắc rực rỡ, sắc đẹp', strokes: 6, pos: 'Phải / Toàn thể' },
  '艸': { name: 'Thảo', jp: 'くさ', meaning: 'Cỏ cây xanh tươi', strokes: 6, pos: 'Toàn thể' },
  '艹': { name: 'Thảo đầu', jp: 'くさかんむり', meaning: 'Cỏ hoa lá cành thực vật', strokes: 3, pos: 'Kanmuri (Đỉnh)' },
  '虍': { name: 'Hổ', jp: 'とらかんむり', meaning: 'Vằn da con hổ hung dữ', strokes: 6, pos: 'Tare (Bao trên-trái)' },
  '虫': { name: 'Trùng', jp: 'むし', meaning: 'Côn trùng, sâu bọ, rắn rết', strokes: 6, pos: 'Hen (Trái) / Dưới' },
  '血': { name: 'Huyết', jp: 'ち', meaning: 'Giọt máu đỏ tươi trong chén', strokes: 6, pos: 'Hen (Trái)' },
  '行': { name: 'Hành', jp: 'ぎょうがまえ', meaning: 'Ngã tư đường, đi lại, làm việc', strokes: 6, pos: 'Kamae (Tách đôi)' },
  '衣': { name: 'Y', jp: 'ころも', meaning: 'Áo quần mặc giữ ấm', strokes: 6, pos: 'Dưới / Toàn thể' },
  '衤': { name: 'Y (bộ)', jp: 'ころもへん', meaning: 'Quần áo, vải vóc may mặc', strokes: 5, pos: 'Hen (Trái)' },
  '西': { name: 'Tây', jp: 'にし', meaning: 'Phương tây mặt trời lặn', strokes: 6, pos: 'Đỉnh / Toàn thể' },

  // 7 NÉT
  '見': { name: 'Kiến', jp: 'みる', meaning: 'Trông thấy, con mắt trên đôi chân', strokes: 7, pos: 'Phải / Toàn thể' },
  '角': { name: 'Giác', jp: 'つの', meaning: 'Sừng hươu nai nhọn hoắt', strokes: 7, pos: 'Hen (Trái)' },
  '言': { name: 'Ngôn', jp: 'ことば', meaning: 'Lời nói, ngôn ngữ thốt ra', strokes: 7, pos: 'Hen (Trái) / Toàn thể' },
  '谷': { name: 'Cốc', jp: 'たに', meaning: 'Thung lũng sâu giữa hai sườn núi', strokes: 7, pos: 'Hen (Trái)' },
  '豆': { name: 'Đậu', jp: 'まめ', meaning: 'Hạt đậu, chiếc bình đựng đồ cúng', strokes: 7, pos: 'Hen (Trái)' },
  '豕': { name: 'Thỉ', jp: 'いのこ', meaning: 'Con heo rừng, con lợn mập', strokes: 7, pos: 'Tsukuri (Phải)' },
  '豸': { name: 'Trĩ', jp: 'むじなへん', meaning: 'Loài thú bò sát không chân', strokes: 7, pos: 'Hen (Trái)' },
  '貝': { name: 'Bối', jp: 'かい', meaning: 'Vỏ sò tiền tệ cổ, tiền của tài lộc', strokes: 7, pos: 'Hen (Trái) / Dưới' },
  '赤': { name: 'Xích', jp: 'あか', meaning: 'Màu đỏ thắm rực lửa', strokes: 7, pos: 'Hen (Trái)' },
  '走': { name: 'Tẩu', jp: 'はしる', meaning: 'Chạy nhanh vung tay sải bước', strokes: 7, pos: 'Nyo (Bao dưới-trái)' },
  '足': { name: 'Túc', jp: 'あし', meaning: 'Bàn chân bước đi, đầy đủ', strokes: 7, pos: 'Hen (Trái) / Dưới' },
  '身': { name: 'Thân', jp: 'み', meaning: 'Thân thể phụ nữ mang thai', strokes: 7, pos: 'Hen (Trái)' },
  '車': { name: 'Xa', jp: 'くるま', meaning: 'Cỗ xe ngựa kéo hai bánh', strokes: 7, pos: 'Hen (Trái)' },
  '辛': { name: 'Tân', jp: 'からい', meaning: 'Vị cay nồng, gian truân cay đắng', strokes: 7, pos: 'Phải / Trái' },
  '辰': { name: 'Thần', jp: 'しんのたつ', meaning: 'Can Chi Thìn, con rồng thần', strokes: 7, pos: 'Tare (Bao trên-trái)' },
  '辵': { name: 'Sước', jp: 'しんにょう', meaning: 'Vừa đi vừa dừng lại', strokes: 7, pos: 'Nyo (Bao dưới-trái)' },
  '辶': { name: 'Quai xước', jp: 'しんにょう', meaning: 'Đường đi, bước đi bộ, di chuyển', strokes: 3, pos: 'Nyo (Bao dưới-trái)' },
  '邑': { name: 'Ấp', jp: 'おおざと', meaning: 'Làng xóm, đô ấp vùng đất', strokes: 7, pos: 'Tsukuri (Bên phải 阝)' },
  '酉': { name: 'Dậu', jp: 'とりへん', meaning: 'Bình rượu ủ lên men, chi Dậu', strokes: 7, pos: 'Hen (Trái)' },
  '釆': { name: 'Biện', jp: 'のごめ', meaning: 'Móng vuốt phân biệt rõ ràng', strokes: 7, pos: 'Hen (Trái)' },
  '里': { name: 'Lý', jp: 'さと', meaning: 'Làng quê thanh bình, dặm đường', strokes: 7, pos: 'Dưới / Phải' },

  // 8 NÉT
  '金': { name: 'Kim', jp: 'かね', meaning: 'Vàng bạc, kim loại chôn trong đất', strokes: 8, pos: 'Hen (Trái) / Toàn thể' },
  '長': { name: 'Trường', jp: 'ながい', meaning: 'Dài ngoằng, người trưởng thành', strokes: 8, pos: 'Toàn thể' },
  '門': { name: 'Môn', jp: 'もんがまえ', meaning: 'Cổng lớn hai cánh uy nghiêm', strokes: 8, pos: 'Kamae (Bao ngoài)' },
  '阜': { name: 'Phụ', jp: 'こざとへん', meaning: 'Gò đất cao nhấp nhô', strokes: 8, pos: 'Hen (Bên trái 阝)' },
  '阝': { name: 'Phụ / Ấp', jp: 'こざと / おおざと', meaning: 'Bên trái là gò đất, bên phải là làng xóm', strokes: 3, pos: 'Trái (Gò) / Phải (Làng)' },
  '隹': { name: 'Chuy', jp: 'ふるとり', meaning: 'Chim non đuôi ngắn mập mạp', strokes: 8, pos: 'Tsukuri (Phải)' },
  '雨': { name: 'Vũ', jp: 'あめかんむり', meaning: 'Mưa từ mây trời rơi hạt', strokes: 8, pos: 'Kanmuri (Đỉnh)' },
  '青': { name: 'Thanh', jp: 'あお', meaning: 'Màu xanh biếc của cây cỏ mọc', strokes: 8, pos: 'Hen (Trái)' },
  '非': { name: 'Phi', jp: 'あらず', meaning: 'Sai trái, hai cánh chim ngược nhau', strokes: 8, pos: 'Toàn thể' },

  // 9 NÉT
  '面': { name: 'Diện', jp: 'めん', meaning: 'Khuôn mặt, mặt phẳng', strokes: 9, pos: 'Toàn thể' },
  '革': { name: 'Cách', jp: 'かわへん', meaning: 'Da thú thuộc căng phẳng, thay đổi', strokes: 9, pos: 'Hen (Trái)' },
  '音': { name: 'Âm', jp: 'おと', meaning: 'Âm thanh trong trẻo thốt ra', strokes: 9, pos: 'Hen (Trái) / Dưới' },
  '頁': { name: 'Hiệp', jp: 'おおがい', meaning: 'Trang giấy sách, cái đầu lớn', strokes: 9, pos: 'Tsukuri (Phải)' },
  '風': { name: 'Phong', jp: 'かぜ', meaning: 'Cơn gió thổi sâu bọ bay lượn', strokes: 9, pos: 'Kamae (Khung bao)' },
  '飛': { name: 'Phi', jp: 'とぶ', meaning: 'Bay lượn trên bầu trời cao', strokes: 9, pos: 'Toàn thể' },
  '食': { name: 'Thực', jp: 'しょく', meaning: 'Đồ ăn, lương thực, ăn uống', strokes: 9, pos: 'Hen (Trái) / Toàn thể' },
  '飠': { name: 'Thực (bộ)', jp: 'しょくへん', meaning: 'Ăn uống no đủ, món ăn', strokes: 8, pos: 'Hen (Trái)' },
  '首': { name: 'Thủ', jp: 'くび', meaning: 'Cái đầu, cổ, đứng đầu tối cao', strokes: 9, pos: 'Toàn thể' },
  '香': { name: 'Hương', jp: 'かおり', meaning: 'Hương thơm ngọt lúa nếp chín', strokes: 9, pos: 'Toàn thể' },

  // 10 NÉT TRỞ LÊN
  '馬': { name: 'Mã', jp: 'うま', meaning: 'Con ngựa dũng mãnh phi nước đại', strokes: 10, pos: 'Hen (Trái)' },
  '骨': { name: 'Cốt', jp: 'ほね', meaning: 'Khung xương cứng rắn cơ thể', strokes: 10, pos: 'Hen (Trái)' },
  '高': { name: 'Cao', jp: 'たかい', meaning: 'Lầu các cao vút ngắm cảnh', strokes: 10, pos: 'Toàn thể' },
  '髟': { name: 'Bưu', jp: 'かみがしら', meaning: 'Mái tóc dài thướt tha', strokes: 10, pos: 'Kanmuri (Đỉnh)' },
  '鬼': { name: 'Quỷ', jp: 'おに', meaning: 'Con quỷ đội mũ quái đản', strokes: 10, pos: 'Toàn thể / Phải' },
  '魚': { name: 'Ngư', jp: 'うお', meaning: 'Con cá bơi lội dưới làn nước', strokes: 11, pos: 'Hen (Trái)' },
  '鳥': { name: 'Điểu', jp: 'とり', meaning: 'Con chim đuôi dài hót líu lo', strokes: 11, pos: 'Tsukuri (Phải)' },
  '鹿': { name: 'Lộc', jp: 'しか', meaning: 'Con hươu sao hiền lành sừng đẹp', strokes: 11, pos: 'Tare (Bao trên-trái)' },
  '麦': { name: 'Mạch', jp: 'むぎ', meaning: 'Cây lúa mì, lúa mạch vàng ruộm', strokes: 11, pos: 'Toàn thể' },
  '麻': { name: 'Ma', jp: 'あさ', meaning: 'Cây gai dầu xe sợi dệt vải', strokes: 11, pos: 'Tare (Bao trên-trái)' },
  '黄': { name: 'Hoàng', jp: 'きいろ', meaning: 'Màu vàng đất đai phù sa', strokes: 12, pos: 'Toàn thể' },
  '黒': { name: 'Hắc', jp: 'くろ', meaning: 'Màu đen muội than bồ hóng', strokes: 11, pos: 'Toàn thể / Hen' },
  '齒': { name: 'Xỉ', jp: 'は', meaning: 'Hàm răng nhai cắn thức ăn', strokes: 15, pos: 'Toàn thể' },
  '龍': { name: 'Long', jp: 'りゅう', meaning: 'Con rồng thần bay lượn trên mây', strokes: 16, pos: 'Toàn thể' },
};

/**
 * Cơ sở dữ liệu Chiết tự (Decomposition) tuyển chọn chuyên sâu cho các chữ Kanji JLPT
 */
export const CURATED_KANJI_BREAKDOWN = {
  '休': {
    primaryRadical: '亻',
    components: ['亻', '木'],
    equation: '亻 (Nhân đứng) + 木 (Mộc)',
    mnemonic: 'Người (亻) tựa lưng vào gốc cây (木) râm mát để nghỉ ngơi (休) sau ngày dài lao động vất vả.',
  },
  '明': {
    primaryRadical: '日',
    components: ['日', '月'],
    equation: '日 (Nhật) + 月 (Nguyệt)',
    mnemonic: 'Mặt trời (日) của ban ngày hội tụ cùng Mặt trăng (月) của ban đêm tỏa sáng rực rỡ, tạo nên ánh sáng quang minh (明).',
  },
  '話': {
    primaryRadical: '言',
    components: ['言', '舌'],
    equation: '言 (Ngôn) + 舌 (Thiệt)',
    mnemonic: 'Dùng cái lưỡi (舌) để uốn nắn phát ra lời nói (言), đó chính là đối thoại, trò chuyện (話).',
  },
  '語': {
    primaryRadical: '言',
    components: ['言', '五', '口'],
    equation: '言 (Ngôn) + 五 (Ngũ) + 口 (Khẩu)',
    mnemonic: 'Năm (五) cái miệng (口) cùng cất lên lời nói (言) để giao tiếp, đó chính là ngôn ngữ (語).',
  },
  '男': {
    primaryRadical: '田',
    components: ['田', '力'],
    equation: '田 (Điền) + 力 (Lực)',
    mnemonic: 'Người dùng sức lực (力) cày bừa trên đồng ruộng (田) chính là người đàn ông, đấng nam nhi (男).',
  },
  '時': {
    primaryRadical: '日',
    components: ['日', '土', '寸'],
    equation: '日 (Nhật) + 寺 (Tự: 土 + 寸)',
    mnemonic: 'Mặt trời (日) chiếu bóng xuống thềm ngôi chùa (寺) từng tấc (寸) một giúp con người đo đếm thời gian (時).',
  },
  '愛': {
    primaryRadical: '心',
    components: ['爫', '冖', '心', '夂'],
    equation: '爫 (Trảo) + 冖 (Mịch) + 心 (Tâm) + 夂 (Tuy)',
    mnemonic: 'Dùng đôi bàn tay (爫) che chở (冖) cho trái tim (心), từng bước chậm rãi (夂) tiến tới tình yêu thương chân thành (愛).',
  },
  '健': {
    primaryRadical: '亻',
    components: ['亻', '廴', '聿'],
    equation: '亻 (Nhân đứng) + 廴 (Dẫn) + 聿 (Duật)',
    mnemonic: 'Con người (亻) bước đi vững chãi (廴) tay cầm chắc cây bút (聿) uy nghiêm, thể hiện thể chất khỏe mạnh, tráng kiện (健).',
  },
  '道': {
    primaryRadical: '辶',
    components: ['辶', '首'],
    equation: '辶 (Quai xước) + 首 (Thủ)',
    mnemonic: 'Dẫn đầu (首) từng bước đi (辶) trên nẻo đường, đó chính là con đường, đạo lý (道).',
  },
  '見': {
    primaryRadical: '見',
    components: ['目', '儿'],
    equation: '目 (Mục) + 儿 (Nhi)',
    mnemonic: 'Đôi mắt (目) đứng trên đôi chân (儿) phóng tầm mắt ra xa để nhìn ngắm, trông thấy (見).',
  },
  '聞': {
    primaryRadical: '耳',
    components: ['門', '耳'],
    equation: '門 (Môn) + 耳 (Nhĩ)',
    mnemonic: 'Ghé sát vành tai (耳) vào khe cửa (門) để nghe ngóng tin tức từ bốn phương (聞).',
  },
  '校': {
    primaryRadical: '木',
    components: ['木', '亠', '父'],
    equation: '木 (Mộc) + 交 (Giao: 亠 + 父)',
    mnemonic: 'Ngôi trường dựng bằng cột gỗ (木) râm mát, nơi thầy trò giao lưu (交) truyền dạy kiến thức (校).',
  },
  '林': {
    primaryRadical: '木',
    components: ['木', '木'],
    equation: '木 (Mộc) + 木 (Mộc)',
    mnemonic: 'Hai cái cây (木) mọc cạnh nhau san sát tạo thành rừng cây, chòm cây rậm rạp (林).',
  },
  '森': {
    primaryRadical: '木',
    components: ['木', '木', '木'],
    equation: '木 + 木 + 木',
    mnemonic: 'Ba cái cây (木) mọc tầng tầng lớp lớp tạo nên cánh rừng rậm rạp, bao la đại ngàn (森).',
  },
  '品': {
    primaryRadical: '口',
    components: ['口', '口', '口'],
    equation: '口 + 口 + 口',
    mnemonic: 'Ba cái miệng (口) cùng nếm thử và khen ngợi, đó chính là sản phẩm, phẩm chất hảo hạng (品).',
  },
  '晶': {
    primaryRadical: '日',
    components: ['日', '日', '日'],
    equation: '日 + 日 + 日',
    mnemonic: 'Ba mặt trời (日) cùng rọi sáng lấp lánh như viên pha lê, tinh thể trong suốt (晶).',
  },
  '岩': {
    primaryRadical: '山',
    components: ['山', '石'],
    equation: '山 (Sơn) + 石 (Thạch)',
    mnemonic: 'Những hòn đá (石) tảng nằm trên ngọn núi (山) cao hiểm trở chính là tảng đá ngầm, nham thạch (岩).',
  },
  '安': {
    primaryRadical: '宀',
    components: ['宀', '女'],
    equation: '宀 (Miên) + 女 (Nữ)',
    mnemonic: 'Người phụ nữ (女) ở an yên dưới mái ấm gia đình (宀) tạo nên sự bình an, an toàn (安).',
  },
  '家': {
    primaryRadical: '宀',
    components: ['宀', '豕'],
    equation: '宀 (Miên) + 豕 (Thỉ)',
    mnemonic: 'Dưới mái nhà (宀) có bầy lợn (豕) béo tốt chăn nuôi, đó là tổ ấm gia đình đầm ấm, no đủ (家).',
  },
  '花': {
    primaryRadical: '艹',
    components: ['艹', '亻', '匕'],
    equation: '艹 (Thảo đầu) + 化 (Hóa: 亻 + 匕)',
    mnemonic: 'Cây cỏ (艹) biến hóa (化) trổ bông rực rỡ sắc màu thành những bông hoa thơm ngát (花).',
  },
  '草': {
    primaryRadical: '艹',
    components: ['艹', '日', '十'],
    equation: '艹 (Thảo đầu) + 早 (Tảo)',
    mnemonic: 'Cây cỏ (艹) đọng những giọt sương mai lúc sáng sớm (早), đó là thảm cỏ xanh mướt (草).',
  },
  '海': {
    primaryRadical: '氵',
    components: ['氵', '每'],
    equation: '氵 (Thủy) + 每 (Mỗi)',
    mnemonic: 'Nước (氵) từ mỗi (每) con sông con suối đều đổ về hội tụ thành biển khơi đại dương (海).',
  },
  '池': {
    primaryRadical: '氵',
    components: ['氵', '也'],
    equation: '氵 (Thủy) + 也 (Dã)',
    mnemonic: 'Vũng nước (氵) đọng lại bên bờ dã ngoại, tạo thành ao hồ nhỏ nuôi cá (池).',
  },
  '洋': {
    primaryRadical: '氵',
    components: ['氵', '羊'],
    equation: '氵 (Thủy) + 羊 (Dương)',
    mnemonic: 'Dòng nước (氵) bao la ngút ngàn như đàn cừu (羊) chạy dài trên thảo nguyên, đó là đại dương (洋).',
  },
  '洗': {
    primaryRadical: '氵',
    components: ['氵', '先'],
    equation: '氵 (Thủy) + 先 (Tiên)',
    mnemonic: 'Trước tiên (先) phải dùng nước sạch (氵) để rửa ráy, tẩy sạch bụi bẩn (洗).',
  },
  '秋': {
    primaryRadical: '禾',
    components: ['禾', '火'],
    equation: '禾 (Hòa) + 火 (Hỏa)',
    mnemonic: 'Mùa mà lúa chín (禾) ngả màu vàng ươm như màu ngọn lửa (火) chính là mùa thu (秋).',
  },
  '私': {
    primaryRadical: '禾',
    components: ['禾', '厶'],
    equation: '禾 (Hòa) + 厶 (Khứ)',
    mnemonic: 'Thửa lúa (禾) của riêng bản thân mình (厶), biểu thị cái tôi, riêng tư, bản thân (私).',
  },
  '科': {
    primaryRadical: '禾',
    components: ['禾', '斗'],
    equation: '禾 (Hòa) + 斗 (Đẩu)',
    mnemonic: 'Dùng đấu (斗) để đong đo phân loại từng mớ thóc lúa (禾), tạo thành các chuyên khoa, phân khoa (科).',
  },
  '鉄': {
    primaryRadical: '金',
    components: ['金', '失'],
    equation: '金 (Kim) + 失 (Thất)',
    mnemonic: 'Thứ kim loại (金) để lâu ngày ngoài mưa gió sẽ bị rỉ sét đánh mất (失) độ bóng, đó là sắt thép (鉄).',
  },
  '銀': {
    primaryRadical: '金',
    components: ['金', '艮'],
    equation: '金 (Kim) + 艮 (Cấn)',
    mnemonic: 'Thứ kim loại (金) cứng cỏi và sáng chói (艮) quý giá sau vàng chính là bạc trắng (銀).',
  },
  '買': {
    primaryRadical: '貝',
    components: ['罒', '貝'],
    equation: '罒 (Võng) + 貝 (Bối)',
    mnemonic: 'Dùng tiền vỏ sò (貝) thu gom hàng hóa vào lưới (罒), đó là hành động mua sắm (買).',
  },
  '売': {
    primaryRadical: '士',
    components: ['士', '冖', '儿'],
    equation: '士 + 冖 + 儿',
    mnemonic: 'Kẻ sĩ (士) che chắn (冖) đưa hàng hóa bằng đôi chân (儿) đi khắp nơi để bán buôn (売).',
  },
  '読': {
    primaryRadical: '言',
    components: ['言', '売'],
    equation: '言 (Ngôn) + 売 (Mại)',
    mnemonic: 'Thốt ra lời nói (言) bán buôn chia sẻ tri thức qua từng trang sách (売), đó là việc đọc sách (読).',
  },
  '書': {
    primaryRadical: '曰',
    components: ['聿', '曰'],
    equation: '聿 (Duật: Bút) + 曰 (Viết)',
    mnemonic: 'Cầm cây bút lông (聿) để viết ra những lời (曰) muốn truyền đạt, đó là thư tịch, viết lách (書).',
  },
  '天': {
    primaryRadical: '大',
    components: ['一', '大'],
    equation: '一 (Nhất) + 大 (Đại)',
    mnemonic: 'Phía trên cao nhất (一) của con người to lớn (大) chính là bầu trời cao rộng, thiên đường (天).',
  },
  '赤': {
    primaryRadical: '赤',
    components: ['土', '灬'],
    equation: '土 (Thổ) + 灬 (Hỏa)',
    mnemonic: 'Đất nung (土) được nung trên ngọn lửa hồng (灬) chuyển sang màu đỏ gạch (赤).',
  },
  '黒': {
    primaryRadical: '黒',
    components: ['里', '灬'],
    equation: '里 (Lý) + 灬 (Hỏa)',
    mnemonic: 'Bếp lửa (灬) hun khói trong xóm làng (里) bám đầy muội than đen kịt (黒).',
  },
  '青': {
    primaryRadical: '青',
    components: ['生', '月'],
    equation: '生 (Sinh) + 月 (Nguyệt)',
    mnemonic: 'Mầm cây sinh sôi (生) dưới ánh trăng thanh (月) khoác lên mình màu xanh biếc thanh khiết (青).',
  },
  '白': {
    primaryRadical: '白',
    components: ['丿', '日'],
    equation: '丿 (Phiệt) + 日 (Nhật)',
    mnemonic: 'Tia sáng (丿) đầu tiên ló dạng từ mặt trời (日) mang màu trắng tinh khôi của bình minh (白).',
  },
};

/**
 * Trả về thông tin chi tiết của 1 bộ thủ bất kỳ
 */
export function getRadicalInfo(radicalChar) {
  if (!radicalChar) return null;
  const direct = RADICAL_DICT[radicalChar];
  if (direct) return { char: radicalChar, ...direct };

  // Thử tìm theo biến thể hoặc ký tự gốc
  const variants = {
    '亻': '人', '氵': '水', '扌': '手', '忄': '心', '灬': '火',
    '艹': '艸', '辶': '辵', '阝': '阜', '衤': '衣', '礻': '示',
    '犭': '犬', '飠': '食', '⺮': '竹', '⺕': '彐', '爫': '爪',
    '⺀': '冫', '⺌': '小', '⺼': '肉'
  };

  const mapped = variants[radicalChar];
  if (mapped && RADICAL_DICT[mapped]) {
    return {
      char: radicalChar,
      ...RADICAL_DICT[mapped],
      originalChar: mapped,
    };
  }

  // Tự động suy luận thông tin tối thiểu
  return {
    char: radicalChar,
    name: `Bộ ${radicalChar}`,
    jp: '',
    meaning: `Thành phần cấu thành '${radicalChar}'`,
    strokes: radicalChar.length || 1,
    pos: 'Thành phần cấu thành',
  };
}

/**
 * Thuật toán bóc tách thành phần cấu tạo & bộ thủ cho 1 chữ Kanji bất kỳ
 * @param {string} char - Chữ Kanji (vd: '休', '健')
 * @param {string} [svgText] - Chuỗi SVG từ KanjiVG (nếu có để bóc tách động)
 */
export function getKanjiDecomposition(char, svgText = null) {
  if (!char) return null;

  // 1. Kiểm tra kho dữ liệu tuyển chọn chuyên sâu
  const curated = CURATED_KANJI_BREAKDOWN[char];

  // 2. Nếu có SVG từ KanjiVG, trích xuất cấu trúc cây bộ thủ thực tế
  let svgComponents = [];
  if (svgText && typeof svgText === 'string') {
    try {
      // Regex trích xuất các thẻ <g kvg:element="...">
      const elemRegex = /<g[^>]*\bkvg:element="([^"]+)"[^>]*>/gi;
      let m;
      const seen = new Set([char]); // loại bỏ chính chữ đó
      while ((m = elemRegex.exec(svgText)) !== null) {
        const comp = m[1];
        if (comp && !seen.has(comp)) {
          seen.add(comp);
          svgComponents.push(comp);
        }
      }
    } catch (e) {
      console.warn('SVG decomposition parse error:', e);
    }
  }

  // Chọn danh sách thành phần: ưu tiên curated, kết hợp SVG
  let compChars = [];
  if (curated) {
    compChars = curated.components;
  } else if (svgComponents.length > 0) {
    compChars = svgComponents.slice(0, 4); // Lấy tối đa 4 thành phần chính
  } else {
    // Tự động phân tích các bộ thủ con thường gặp
    compChars = scanCommonRadicals(char);
  }

  // Lấy chi tiết thông tin cho từng bộ thủ thành phần
  const components = compChars.map((c) => {
    const info = getRadicalInfo(c);
    return {
      char: c,
      name: info ? info.name : `Bộ ${c}`,
      jp: info ? info.jp : '',
      meaning: info ? info.meaning : 'Thành phần cấu tạo',
      strokes: info ? info.strokes : 1,
      pos: info ? info.pos : 'Thành phần',
    };
  });

  // Xác định bộ thủ chính (Primary Radical)
  const primaryChar = curated?.primaryRadical || compChars[0] || char;
  const primaryInfo = getRadicalInfo(primaryChar);

  // Tạo câu chuyện chiết tự (Mnemonic)
  let mnemonic = curated?.mnemonic;
  if (!mnemonic) {
    if (components.length >= 2) {
      const partsStr = components.map((c) => `bộ ${c.name} (${c.meaning})`).join(' và ');
      mnemonic = `Chiết tự chữ '${char}': Kết hợp giữa ${partsStr} tạo nên ý nghĩa tổng thể độc đáo.`;
    } else {
      mnemonic = `Chữ '${char}' mang hình thái đơn nguyên hoặc biến thể độc lập của bộ ${primaryInfo?.name || char}.`;
    }
  }

  return {
    char,
    primaryRadical: {
      char: primaryChar,
      name: primaryInfo?.name || `Bộ ${primaryChar}`,
      jp: primaryInfo?.jp || '',
      meaning: primaryInfo?.meaning || '',
      strokes: primaryInfo?.strokes || 1,
      pos: primaryInfo?.pos || 'Bộ thủ chính',
    },
    components,
    equation: curated?.equation || components.map((c) => c.char).join(' + '),
    mnemonic,
  };
}

/**
 * Quét các bộ thủ phổ biến xuất hiện trong chữ nếu không có dữ liệu sẵn
 */
function scanCommonRadicals(char) {
  // Bảng tra nhanh các chữ ghép phổ biến nhất
  const COMMON_SUB_RADICALS = [
    '亻', '木', '氵', '口', '日', '月', '言', '心', '忄', '扌',
    '火', '灬', '土', '金', '糸', '女', '子', '艹', '辶', '門',
    '田', '力', '目', '耳', '車', '貝', '鳥', '魚', '竹', '雨'
  ];

  // Trả về mặc định bộ thủ chính nếu không quét được
  return [char];
}

/**
 * Tìm các chữ Kanji khác cùng chia sẻ chung 1 bộ thủ trong danh sách dữ liệu
 * @param {string} radicalChar - Bộ thủ cần tìm (vd: '亻', '木')
 * @param {Array<string>} allKanjiList - Danh sách chữ Kanji hiện tại
 * @param {number} [limit=12] - Số lượng chữ trả về tối đa
 */
export function findKanjiSharingRadical(radicalChar, allKanjiList = [], limit = 12) {
  if (!radicalChar || !Array.isArray(allKanjiList) || allKanjiList.length === 0) {
    return [];
  }

  const results = [];
  for (const k of allKanjiList) {
    if (k === radicalChar) continue;
    const decomp = CURATED_KANJI_BREAKDOWN[k];
    if (decomp && (decomp.components.includes(radicalChar) || decomp.primaryRadical === radicalChar)) {
      results.push(k);
      if (results.length >= limit) break;
    }
  }

  return results;
}
