// Thư viện hình ảnh tượng hình & Tranh minh họa ý nghĩa chữ Hán (Kanji Pictographs & Illustrations)
// Giúp người học ghi nhớ chữ Hán qua hình ảnh trực quan (Visual Mnemonic Learning)

export const KANJI_SPECIAL_ILLUSTRATIONS = {
  // === THIÊN NHIÊN & VŨ TRỤ ===
  '日': {
    image: '/illustrations/sun.jpg',
    badge: '☀️',
    concept: 'Mặt trời chiếu sáng',
    visualDesc: 'Mô phỏng hình ảnh ông mặt trời tròn trịa rạng ngời với vầng hào quang ở tâm, tượng trưng cho ban ngày và đất nước Mặt Trời mọc.',
    pictographType: 'sun',
    color: '#e11d48',
  },
  '月': {
    image: '/illustrations/moon.jpg',
    badge: '🌙',
    concept: 'Vầng trăng khuyết',
    visualDesc: 'Mô phỏng hình ảnh vầng trăng lưỡi liềm lấp lánh ban đêm trên bầu trời với hai đám mây nhẹ vắt ngang.',
    pictographType: 'moon',
    color: '#3b82f6',
  },
  '木': {
    image: '/illustrations/tree.jpg',
    badge: '🌳',
    concept: 'Cây cổ thụ vươn cành',
    visualDesc: 'Thân cây thẳng đứng vươn lên trời, hai cành xòe ra hai bên và rễ cây cắm sâu dưới lòng đất.',
    pictographType: 'tree',
    color: '#15803d',
  },
  '林': {
    image: '/illustrations/tree.jpg',
    badge: '🌲',
    concept: 'Rừng cây nhỏ',
    visualDesc: 'Hai cái cây (木) mọc cạnh nhau san sát tạo thành rừng cây, chòm cây rậm rạp.',
    pictographType: 'forest',
    color: '#16a34a',
  },
  '森': {
    image: '/illustrations/tree.jpg',
    badge: '🌲',
    concept: 'Đại ngàn rừng rậm',
    visualDesc: 'Ba cái cây (木) mọc tầng tầng lớp lớp tạo nên cánh rừng rậm rạp bao la đại ngàn.',
    pictographType: 'forest',
    color: '#14532d',
  },
  '山': {
    image: '/illustrations/fuji.jpg',
    badge: '⛰️',
    concept: 'Ba ngọn núi trùng điệp',
    visualDesc: 'Mô phỏng hình ảnh ba đỉnh núi nhấp nhô hùng vĩ nối tiếp nhau giữa đất trời, đỉnh cao nhất ở giữa.',
    pictographType: 'mountain',
    color: '#0284c7',
  },
  '川': {
    badge: '🌊',
    concept: 'Dòng sông uốn lượn',
    visualDesc: 'Ba nét uốn lượn tượng trưng cho dòng nước chảy êm đềm cuồn cuộn giữa hai bờ sông.',
    pictographType: 'river',
    color: '#06b6d4',
  },
  '水': {
    badge: '💧',
    concept: 'Giọt nước trong lành',
    visualDesc: 'Dòng nước chảy xiết cuồn cuộn ở giữa và các giọt nước bắn tung tóe sang hai bờ.',
    pictographType: 'water',
    color: '#0ea5e9',
  },
  '火': {
    badge: '🔥',
    concept: 'Ngọn lửa bốc cháy',
    visualDesc: 'Ngọn lửa bốc cháy phập phồng với những tia lửa phát sáng đỏ rực bắn ra xung quanh.',
    pictographType: 'fire',
    color: '#ea580c',
  },
  '土': {
    badge: '🪴',
    concept: 'Ụ đất phì nhiêu',
    visualDesc: 'Mầm cây nhú lên từ ụ đất màu mỡ trên mặt đất, tượng trưng cho Đất mẹ phì nhiêu.',
    pictographType: 'earth',
    color: '#a16207',
  },
  '金': {
    badge: '🪙',
    concept: 'Kho báu kim loại vàng',
    visualDesc: 'Dưới mái nhà che chở, sâu trong lòng đất chôn cất hai quặng vàng ròng lấp lánh.',
    pictographType: 'gold',
    color: '#d97706',
  },
  '雨': {
    badge: '🌧️',
    concept: 'Mây phủ mưa rơi',
    visualDesc: 'Mây trời đen đặc phủ bóng trên bầu trời và bốn giọt nước mưa rơi đều xuống mặt đất.',
    pictographType: 'rain',
    color: '#64748b',
  },
  '田': {
    badge: '🌾',
    concept: 'Thửa ruộng bốn bờ',
    visualDesc: 'Ô ruộng hình vuông được chia thành bốn mảnh bờ thẳng tắp để trồng trọt lúa nước.',
    pictographType: 'field',
    color: '#65a30d',
  },
  '天': {
    badge: '☁️',
    concept: 'Bầu trời bao la',
    visualDesc: 'Phía trên đầu con người (人) có một khoảng không bao la vô tận, đó chính là Trời (天).',
    pictographType: 'sky',
    color: '#0284c7',
  },
  '気': {
    badge: '💨',
    concept: 'Không khí & Khí chất',
    visualDesc: 'Luồng hơi nước bốc lên từ nồi cơm đang sôi, tượng trưng cho năng lượng và sinh khí.',
    pictographType: 'air',
    color: '#6366f1',
  },

  // === CON NGƯỜI & HÀNH ĐỘNG ===
  '人': {
    badge: '🚶',
    concept: 'Con người bước đi',
    visualDesc: 'Hai nét tựa vào nhau: con người luôn cần dựa vào nhau để cùng sẻ chia và nâng đỡ trong cuộc sống.',
    pictographType: 'person',
    color: '#b91c1c',
  },
  '男': {
    image: '/illustrations/sumo.jpg',
    badge: '💪',
    concept: 'Đấng nam nhi khỏe mạnh',
    visualDesc: 'Người dùng sức lực (力) cày bừa trên đồng ruộng (田) chính là người đàn ông, đấng nam nhi (男).',
    pictographType: 'man',
    color: '#b91c1c',
  },
  '女': {
    badge: '💃',
    concept: 'Người phụ nữ duyên dáng',
    visualDesc: 'Hình bóng người phụ nữ đang ngồi khoanh tay e ấp, biểu thị vẻ dịu dàng, đảm đang.',
    pictographType: 'woman',
    color: '#db2777',
  },
  '子': {
    badge: '👶',
    concept: 'Đứa trẻ sơ sinh',
    visualDesc: 'Em bé quấn trong tã lót dang hai tay nhỏ xíu vẫy chào thế giới.',
    pictographType: 'child',
    color: '#f59e0b',
  },
  '休': {
    image: '/illustrations/tree.jpg',
    badge: '🧘',
    concept: 'Người tựa gốc cây nghỉ ngơi',
    visualDesc: 'Bộ Nhân đứng (亻 - người) bên cạnh chữ Mộc (木 - cây): Người mệt mỏi tựa lưng vào bóng mát gốc cây to để nghỉ ngơi.',
    pictographType: 'rest',
    color: '#15803d',
  },
  '見': {
    badge: '👁️',
    concept: 'Mắt nhìn trông thấy',
    visualDesc: 'Đôi mắt (目) đứng trên đôi chân (儿) phóng tầm mắt ra xa để nhìn ngắm thế giới.',
    pictographType: 'eye',
    color: '#0284c7',
  },
  '聞': {
    badge: '👂',
    concept: 'Ghép tai vào cửa nghe',
    visualDesc: 'Ghé sát vành tai (耳) vào khe cánh cổng (門) để lắng nghe âm thanh từ bốn phương.',
    pictographType: 'ear',
    color: '#8b5cf6',
  },
  '言': {
    badge: '🗣️',
    concept: 'Lời nói thốt ra',
    visualDesc: 'Miệng thốt ra từng lời nói rõ ràng có lớp lang trật tự, biểu thị ngôn ngữ giao tiếp.',
    pictographType: 'speech',
    color: '#059669',
  },
  '話': {
    badge: '💬',
    concept: 'Nói chuyện đối thoại',
    visualDesc: 'Dùng cái lưỡi (舌) để uốn nắn phát ra lời nói (言), đó chính là đối thoại, trò chuyện.',
    pictographType: 'talk',
    color: '#10b981',
  },
  '語': {
    badge: '📚',
    concept: 'Ngôn ngữ dân tộc',
    visualDesc: 'Năm (五) cái miệng (口) cùng cất lên lời nói (言) để giao tiếp, đó chính là ngôn ngữ.',
    pictographType: 'language',
    color: '#0d9488',
  },
  '読': {
    badge: '📖',
    concept: 'Đọc sách nghiền ngẫm',
    visualDesc: 'Dùng lời nói (言) phát ra để bán (売) đi sự ngu dốt và thu nạp tri thức, đó là Đọc sách.',
    pictographType: 'read',
    color: '#4f46e5',
  },
  '書': {
    badge: '✍️',
    concept: 'Bút viết chữ lên giấy',
    visualDesc: 'Bàn tay cầm bút lông uyển chuyển vạch mực lên trang giấy để viết chữ.',
    pictographType: 'write',
    color: '#7c3aed',
  },
  '行': {
    badge: '🚶‍♂️',
    concept: 'Đi lại trên ngã tư',
    visualDesc: 'Mô phỏng ngã tư đường phố nơi mọi người bước chân qua lại tấp nập.',
    pictographType: 'walk',
    color: '#0891b2',
  },
  '来': {
    badge: '🌾',
    concept: 'Lúa mì từ xa đến',
    visualDesc: 'Cây lúa mì từ phương xa du nhập tới mang lại vụ mùa bội thu, đó là Đến.',
    pictographType: 'come',
    color: '#d97706',
  },
  '食': {
    badge: '🍱',
    concept: 'Bát cơm có nắp đậy',
    visualDesc: 'Bát cơm thơm dẻo có nắp đậy phía trên, tượng trưng cho bữa ăn nuôi sống con người.',
    pictographType: 'food',
    color: '#ea580c',
  },
  '飲': {
    badge: '🍵',
    concept: 'Uống ngụm trà ngon',
    visualDesc: 'Người há miệng nghiêng đầu uống bát nước thơm mát giải cơn khát.',
    pictographType: 'drink',
    color: '#059669',
  },

  // === ĐỒ VẬT & NƠI CHỐN ===
  '門': {
    image: '/illustrations/torii.jpg',
    badge: '⛩️',
    concept: 'Cánh cổng đền chùa',
    visualDesc: 'Hai cánh cổng gỗ khép mở đối xứng của ngôi nhà truyền thống và đền thờ Thần đạo.',
    pictographType: 'gate',
    color: '#b91c1c',
  },
  '車': {
    badge: '🚗',
    concept: 'Cỗ xe hai bánh',
    visualDesc: 'Nhìn từ trên cao xuống: cỗ xe ngựa cổ có trục xe và hai bánh xe lăn tròn.',
    pictographType: 'car',
    color: '#dc2626',
  },
  '電': {
    badge: '⚡',
    concept: 'Tia sét phát điện',
    visualDesc: 'Cơn mưa (雨) kèm theo tia chớp ngoằn ngoèo xé toạc bầu trời, tượng trưng cho dòng điện.',
    pictographType: 'lightning',
    color: '#f59e0b',
  },
  '駅': {
    badge: '🚉',
    concept: 'Nhà ga trạm dừng',
    visualDesc: 'Trạm dừng chân nơi ngựa (馬) dừng chân uống nước và người đổi xe đi tiếp.',
    pictographType: 'station',
    color: '#2563eb',
  },
  '道': {
    badge: '🛤️',
    concept: 'Con đường bước tới',
    visualDesc: 'Dẫn đầu (首) từng bước đi (辶) trên nẻo đường, đó chính là con đường, đạo lý.',
    pictographType: 'road',
    color: '#78716c',
  },
  '本': {
    badge: '📚',
    concept: 'Cuốn sách từ gốc cây',
    visualDesc: 'Chữ Mộc (木 - cây) thêm nét gạch ngang ở gốc chỉ cội nguồn, và từ thân cây làm ra sách.',
    pictographType: 'book',
    color: '#b45309',
  },
  '家': {
    badge: '🏡',
    concept: 'Mái nhà ấm cúng',
    visualDesc: 'Mái nhà che chở (宀) cho vật nuôi và gia đình cùng quây quần sinh sống hòa thuận.',
    pictographType: 'house',
    color: '#c2410c',
  },
  '花': {
    badge: '🌸',
    concept: 'Bông hoa anh đào',
    visualDesc: 'Bộ Thảo (艹) cỏ cây biến đổi (化) kỳ diệu thành bông hoa rực rỡ sắc hương.',
    pictographType: 'flower',
    color: '#ec4899',
  },
  '魚': {
    badge: '🐟',
    concept: 'Chú cá bơi lội',
    visualDesc: 'Con cá có đầu nhọn, thân mình vảy bóng loáng và đuôi quẫy dưới dòng nước biếc.',
    pictographType: 'fish',
    color: '#0284c7',
  },
  '鳥': {
    badge: '🕊️',
    concept: 'Chim hạc sải cánh',
    visualDesc: 'Hình chú chim có mỏ, đầu có mào, cánh xòe bay và bốn móng vuốt đậu trên cành.',
    pictographType: 'bird',
    color: '#0ea5e9',
  },
  '犬': {
    badge: '🐕',
    concept: 'Chú chó trung thành',
    visualDesc: 'Chữ Đại (大) thêm một dấu chấm ở tai, như chú chó trung thành vẫy đuôi mừng chủ.',
    pictographType: 'dog',
    color: '#b45309',
  },

  // === SỐ ĐẾM (NUMBERS) ===
  '一': {
    badge: '☝️',
    concept: 'Nét gạch khởi nguyên số 1',
    visualDesc: 'Một nét ngang duy nhất tượng trưng cho khởi đầu nguyên thủy, số một độc nhất vô nhị.',
    pictographType: 'one',
    color: '#b91c1c',
  },
  '二': {
    badge: '✌️',
    concept: 'Hai vạch song song số 2',
    visualDesc: 'Hai nét ngang song song cân xứng tượng trưng cho Trời và Đất, âm và dương.',
    pictographType: 'two',
    color: '#b91c1c',
  },
  '三': {
    badge: '🤟',
    concept: 'Tam tài Thiên Địa Nhân',
    visualDesc: 'Ba nét gạch ngang đại diện cho Thiên - Địa - Nhân (Trời, Đất, Con người) hòa hợp.',
    pictographType: 'three',
    color: '#b91c1c',
  },
  '四': {
    badge: '4️⃣',
    concept: 'Số bốn chia đôi',
    visualDesc: 'Khung bao quanh hai nét rẽ sang hai hướng, tượng trưng cho bốn phương trời rộng lớn.',
    pictographType: 'four',
    color: '#b91c1c',
  },
  '五': {
    badge: '5️⃣',
    concept: 'Bàn tính cổ số năm',
    visualDesc: 'Giao điểm của Trời và Đất nối kết lại, biểu thị số năm cân đối ngũ hành.',
    pictographType: 'five',
    color: '#b91c1c',
  },
  '六': {
    badge: '6️⃣',
    concept: 'Mái lều số sáu',
    visualDesc: 'Chiếc lều có mái che và hai chân đứng vững chãi, biểu thị số sáu vững vàng.',
    pictographType: 'six',
    color: '#b91c1c',
  },
  '七': {
    badge: '7️⃣',
    concept: 'Thanh kiếm chém số 7',
    visualDesc: 'Hình dáng thanh kiếm cắm xuống với vết chém ngang dứt khoát con số 7.',
    pictographType: 'seven',
    color: '#b91c1c',
  },
  '八': {
    badge: '8️⃣',
    concept: 'Hai nét mở rộng phát tài',
    visualDesc: 'Hai nét rẽ sang hai bên mở rộng xuống dưới như chiếc quạt xòe, biểu thị phát tài thịnh vượng.',
    pictographType: 'eight',
    color: '#b91c1c',
  },
  '九': {
    badge: '9️⃣',
    concept: 'Cánh tay vươn số 9',
    visualDesc: 'Cánh tay co lại gập khúc biểu thị con số 9 lớn nhất trong hàng đơn vị.',
    pictographType: 'nine',
    color: '#b91c1c',
  },
  '十': {
    badge: '🔟',
    concept: 'Giao thoa chữ thập số 10',
    visualDesc: 'Dọc ngang giao thoa vuông vức, tượng trưng cho sự thập toàn thập mỹ, trọn vẹn số mười.',
    pictographType: 'ten',
    color: '#b91c1c',
  },
  '百': {
    badge: '💯',
    concept: 'Trăm vạch sáng',
    visualDesc: 'Nét gạch trên chữ Bạch (白 - trắng sáng), tượng trưng cho một trăm điều tinh khôi.',
    pictographType: 'hundred',
    color: '#dc2626',
  },
  '千': {
    badge: '✨',
    concept: 'Một nghìn ngọn gió',
    visualDesc: 'Chữ Nhân (人) thêm một nét gạch, biểu thị một nghìn bước chân người đi qua.',
    pictographType: 'thousand',
    color: '#ea580c',
  },
  '万': {
    badge: '🪙',
    concept: 'Vạn vật mười nghìn',
    visualDesc: 'Móc khóa kho báu chứa mười nghìn (vạn) bảo vật vô giá.',
    pictographType: 'ten_thousand',
    color: '#d97706',
  },
  '円': {
    badge: '💴',
    concept: 'Đồng tiền Yên tròn',
    visualDesc: 'Hình dáng đồng tiền tròn trịa viên mãn, đơn vị tiền tệ Yên của đất nước Nhật Bản.',
    pictographType: 'yen',
    color: '#ca8a04',
  },

  // === CÁC TÍNH TỪ & KHÁI NIỆM ===
  '大': {
    badge: '🤼',
    concept: 'Người dang rộng tay to lớn',
    visualDesc: 'Hình dáng một con người dang rộng hai tay và hai chân hết cỡ để biểu thị sự To lớn.',
    pictographType: 'big',
    color: '#2563eb',
  },
  '小': {
    badge: '🤏',
    concept: 'Ba giọt nước nhỏ li ti',
    visualDesc: 'Nét sổ ở giữa và hai nét phẩy hai bên như những giọt nước nhỏ li ti, biểu thị sự Nhỏ bé.',
    pictographType: 'small',
    color: '#0284c7',
  },
  '高': {
    badge: '🏯',
    concept: 'Lâu đài cao vút chọc trời',
    visualDesc: 'Ngôi lầu gác cao tầng có mái vòm và cửa sổ lộng gió, biểu thị sự Cao lớn, đắt giá.',
    pictographType: 'high',
    color: '#7c3aed',
  },
  '安': {
    badge: '🕊️',
    concept: 'Phụ nữ an yên dưới mái nhà',
    visualDesc: 'Người phụ nữ (女) ở an yên dưới mái nhà ấm êm (宀) tạo nên bình an, an toàn.',
    pictographType: 'peace',
    color: '#059669',
  },
  '新': {
    badge: '🌱',
    concept: 'Đốn cành mới đâm chồi',
    visualDesc: 'Dùng rìu (斤) chặt cành cây (木) để cây non mới (新) đâm chồi nảy lộc tươi mới.',
    pictographType: 'new',
    color: '#10b981',
  },
  '古': {
    badge: '🏺',
    concept: 'Mười đời truyền lại đồ cổ',
    visualDesc: 'Mười (十) đời truyền miệng (口) cho nhau câu chuyện từ ngàn xưa, đó là Cổ kính.',
    pictographType: 'old',
    color: '#78716c',
  },
  '明': {
    image: '/illustrations/sun.jpg',
    badge: '🌟',
    concept: 'Mặt trời và trăng cùng sáng',
    visualDesc: 'Mặt trời (日) ban ngày kết hợp cùng Mặt trăng (月) ban đêm tỏa sáng quang minh rực rỡ.',
    pictographType: 'bright',
    color: '#f59e0b',
  },
  '愛': {
    badge: '💖',
    concept: 'Che chở trái tim yêu thương',
    visualDesc: 'Đôi bàn tay (爫) nâng niu che chở (冖) trái tim (心), đó chính là Tình yêu thương.',
    pictographType: 'love',
    color: '#e11d48',
  },
  '心': {
    badge: '❤️',
    concept: 'Trái tim nhịp đập',
    visualDesc: 'Hình dáng trái tim với các tâm thất tâm nhĩ đập rộn ràng đầy cảm xúc.',
    pictographType: 'heart',
    color: '#e11d48',
  },
};

/**
 * Hàm phân tích và lấy hình ảnh minh họa phù hợp cho BẤT KỲ chữ Kanji nào.
 * Ưu tiên:
 * 1. Khớp từ điển KANJI_SPECIAL_ILLUSTRATIONS
 * 2. Khớp theo bộ thủ thành phần (Semantic Radical fallback)
 * 3. Khớp theo ý nghĩa tổng quát
 */
export function getIllustrationForKanji(char, cardInfo = null) {
  if (!char) return null;

  // 1. Kiểm tra trực tiếp trong danh sách đặc biệt
  if (KANJI_SPECIAL_ILLUSTRATIONS[char]) {
    return KANJI_SPECIAL_ILLUSTRATIONS[char];
  }

  // 2. Tra cứu theo bộ thủ hoặc ý nghĩa trong cardInfo
  const meaning = (cardInfo?.meaning || '').toLowerCase();
  const hanViet = (cardInfo?.hanViet || '').toLowerCase();

  // Nước, sông, biển
  if (meaning.includes('nước') || meaning.includes('sông') || meaning.includes('biển') || hanViet.includes('thủy') || hanViet.includes('hải')) {
    return {
      badge: '🌊',
      concept: 'Dòng nước & Biển cả',
      visualDesc: 'Thuộc bộ Thủy (氵) - mô phỏng những giọt nước bắn tung tóe và sóng cuộn trào.',
      color: '#0284c7',
    };
  }

  // Cây cối, gỗ, hoa lá
  if (meaning.includes('cây') || meaning.includes('gỗ') || meaning.includes('hoa') || hanViet.includes('mộc') || hanViet.includes('thảo')) {
    return {
      image: '/illustrations/tree.jpg',
      badge: '🌿',
      concept: 'Cây cối & Thảo mộc',
      visualDesc: 'Thuộc bộ Mộc (木) hoặc Thảo (艹) - mô phỏng thân cây vươn cành và hoa cỏ tốt tươi.',
      color: '#15803d',
    };
  }

  // Lửa, ánh sáng, nhiệt độ
  if (meaning.includes('lửa') || meaning.includes('cháy') || meaning.includes('sáng') || hanViet.includes('hỏa') || hanViet.includes('quang')) {
    return {
      badge: '🔥',
      concept: 'Ngọn lửa nhiệt huyết',
      visualDesc: 'Thuộc bộ Hỏa (灬) - mô phỏng đống lửa bập bùng chiếu rọi ánh sáng ấm áp.',
      color: '#ea580c',
    };
  }

  // Kim loại, tiền, vàng
  if (meaning.includes('vàng') || meaning.includes('tiền') || meaning.includes('kim loại') || hanViet.includes('kim') || hanViet.includes('ngân')) {
    return {
      badge: '🪙',
      concept: 'Kim loại & Tiền tệ',
      visualDesc: 'Thuộc bộ Kim (金) - mô phỏng kho báu quặng vàng ròng chôn sâu dưới đất.',
      color: '#d97706',
    };
  }

  // Đất, đá, núi
  if (meaning.includes('đất') || meaning.includes('đá') || meaning.includes('núi') || hanViet.includes('thổ') || hanViet.includes('sơn')) {
    return {
      image: '/illustrations/fuji.jpg',
      badge: '⛰️',
      concept: 'Đất đá & Núi non',
      visualDesc: 'Thuộc bộ Thổ (土) hoặc Sơn (山) - mô phỏng núi non điệp trùng và mặt đất phì nhiêu.',
      color: '#78716c',
    };
  }

  // Con người, hành vi
  if (meaning.includes('người') || meaning.includes('nam') || meaning.includes('nữ') || hanViet.includes('nhân') || hanViet.includes('nam')) {
    return {
      badge: '🚶',
      concept: 'Con người & Hành động',
      visualDesc: 'Thuộc bộ Nhân (亻) - mô phỏng con người đang vững bước tự lập trong cuộc sống.',
      color: '#b91c1c',
    };
  }

  // Lời nói, tri thức, học tập
  if (meaning.includes('nói') || meaning.includes('học') || meaning.includes('sách') || hanViet.includes('ngôn') || hanViet.includes('học')) {
    return {
      badge: '📖',
      concept: 'Tri thức & Lời nói',
      visualDesc: 'Thuộc bộ Ngôn (言) - mô phỏng lời nói có lớp lang và trang sách khai mở tri thức.',
      color: '#4f46e5',
    };
  }

  // Mặc định: Huy hiệu chữ Hán truyền thống phong cách triện khắc Nhật Bản
  return {
    badge: '🎌',
    concept: `Chữ Hán ${cardInfo?.hanViet || char}`,
    visualDesc: cardInfo?.mnemonic || `Chữ ${char} mang ý nghĩa "${cardInfo?.meaning || 'truyền thống'}".`,
    color: '#b91c1c',
  };
}
