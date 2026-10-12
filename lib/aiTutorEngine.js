// Kenji Sensei (賢治先生) - Hệ thống Gia sư AI tiếng Nhật thông minh
// Kết hợp: Động cơ Tri thức Nội bộ phản xạ siêu tốc + Từ điển Đời sống 2.219 chữ Hán
// Tự động kết nối Cloud Generative AI khi khả dụng.

import { GRAMMAR_DATA } from './grammarData.js';

export const AI_SYSTEM_PROMPT = `
Bạn là Kenji Sensei (賢治先生) - Gia sư AI tiếng Nhật uyên bác, ân cần và giàu kinh nghiệm trong ứng dụng "Học Kanji Nhật Bản | 漢字学習帳 (Kanji Gakushūchō)".

PHONG CÁCH GIẢNG DẠY:
1. Luôn trả lời đúng trọng tâm câu hỏi của học viên (nếu hỏi từ vựng gì thì trả lời chính xác từ vựng đó kèm Kanji, Hiragana, âm Hán Việt và ví dụ, tuyệt đối không lạc đề sang chữ khác).
2. Xưng hô thân thiện: gọi người học là "bạn" hoặc "em", xưng "thầy" hoặc "Kenji Sensei".
3. Trình bày ngắn gọn, dễ hiểu, dùng Markdown đẹp mắt (gạch đầu dòng, in đậm từ khóa).
`;

// Từ điển bỏ túi thông dụng hàng ngày (Common Daily Japanese Vocabulary Map)
const COMMON_VOCAB_DICTIONARY = [
  // 1. Động vật (Animals)
  { keywords: ['bò', 'con bò', 'thịt bò'], kanji: '牛', kana: 'うし (ushi)', hv: 'NGƯU', meaning: 'Con bò', compounds: ['牛肉 (ぎゅうにく): Thịt bò', '牛乳 (ぎゅうにゅう): Sữa bò', '子牛 (こうし): Bê con'], exJp: '牧場に牛がたくさんいます。', exVn: 'Ở trang trại có rất nhiều con bò.' },
  { keywords: ['mèo', 'con mèo'], kanji: '猫', kana: 'ねこ (neko)', hv: 'MIÊU', meaning: 'Con mèo', compounds: ['子猫 (こねこ): Mèo con', '野良猫 (のらねこ): Mèo hoang'], exJp: '猫が日向で気持ちよさそうに寝ています。', exVn: 'Chú mèo đang ngủ khoan khoái dưới ánh nắng.' },
  { keywords: ['chó', 'con chó', 'cún'], kanji: '犬', kana: 'いぬ (inu)', hv: 'KHUYỂN', meaning: 'Con chó', compounds: ['子犬 (こいぬ): Chó con', '番犬 (ばんけん): Chó giữ nhà'], exJp: '毎朝、公園で犬の散歩をしています。', exVn: 'Mỗi sáng tôi đều dắt chó đi dạo ở công viên.' },
  { keywords: ['chim', 'con chim'], kanji: '鳥', kana: 'とり (tori)', hv: 'ĐIỂU', meaning: 'Con chim', compounds: ['小鳥 (ことり): Chim non', '焼き鳥 (やきとり): Gà nướng xiên'], exJp: '青空を小鳥が楽しそうに飛んでいます。', exVn: 'Những chú chim nhỏ đang bay lượn vui vẻ giữa trời xanh.' },
  { keywords: ['cá', 'con cá'], kanji: '魚', kana: 'さかな (sakana)', hv: 'NGƯ', meaning: 'Con cá', compounds: ['金魚 (きんぎょ): Cá vàng', '焼き魚 (やきざかな): Cá nướng'], exJp: '池で綺麗な魚が泳いでいます。', exVn: 'Dưới ao có đàn cá tuyệt đẹp đang bơi lội.' },
  { keywords: ['ngựa', 'con ngựa'], kanji: '馬', kana: 'うま (uma)', hv: 'MÃ', meaning: 'Con ngựa', compounds: ['競馬 (けいば): Đua ngựa', '乗馬 (じょうば): Cưỡi ngựa'], exJp: '草原を走る馬の姿はとても美しいです。', exVn: 'Dáng vẻ chú ngựa phi trên thảo nguyên thật đẹp đẽ.' },
  { keywords: ['heo', 'lợn', 'thịt heo', 'thịt lợn'], kanji: '豚', kana: 'ぶた (buta)', hv: 'ĐỒN', meaning: 'Con lợn / Con heo', compounds: ['豚肉 (ぶたにく): Thịt lợn', 'とんかつ: Thịt cốt lết chiên xù'], exJp: '今晩のメニューは豚肉の生姜焼きです。', exVn: 'Thực đơn tối nay là món thịt lợn xào gừng.' },
  { keywords: ['gà', 'con gà', 'thịt gà'], kanji: '鶏', kana: 'にわとり (niwatori)', hv: 'KÊ', meaning: 'Con gà', compounds: ['鶏肉 (とりにく): Thịt gà', '卵 (たまご): Trứng gà'], exJp: '朝早くから鶏が元気に鳴いています。', exVn: 'Từ sáng sớm chú gà đã gáy vang rộn rã.' },
  { keywords: ['thỏ', 'con thỏ'], kanji: '兎', kana: 'うさぎ (usagi)', hv: 'THỎ', meaning: 'Con thỏ', compounds: ['野兎 (のうさぎ): Thỏ hoang', '白兎 (しろうさぎ): Thỏ trắng'], exJp: '庭で白い兎が飛び跳ねています。', exVn: 'Trong vườn có chú thỏ trắng đang nhảy nhót.' },
  { keywords: ['hổ', 'con hổ', 'cọp'], kanji: '虎', kana: 'とら (tora)', hv: 'HỔ', meaning: 'Con hổ / Cọp', compounds: ['虎の子 (とらのこ): Vật báu quý giá', '白虎 (びゃっこ): Bạch hổ'], exJp: '動物園で大きな虎を見ました。', exVn: 'Tôi đã nhìn thấy chú hổ to lớn ở vườn thú.' },
  { keywords: ['khỉ', 'con khỉ'], kanji: '猿', kana: 'さる (saru)', hv: 'VIÊN', meaning: 'Con khỉ', compounds: ['猿も木から落ちる: Nhân vô thập toàn', '小猿 (こざる): Khỉ con'], exJp: '山で野生の猿に出会いました。', exVn: 'Tôi đã gặp một chú khỉ hoang dã trên núi.' },
  { keywords: ['gấu', 'con gấu'], kanji: '熊', kana: 'くま (kuma)', hv: 'HÙNG', meaning: 'Con gấu', compounds: ['白熊 (しろくま): Gấu Bắc Cực', '小熊 (こぐま): Gấu con'], exJp: '森の中に熊の足跡がありました。', exVn: 'Trong rừng có dấu chân của một con gấu.' },
  { keywords: ['voi', 'con voi'], kanji: '象', kana: 'ぞう (zou)', hv: 'TƯỢNG', meaning: 'Con voi', compounds: ['象牙 (ぞうげ): Ngà voi', '子象 (こぞう): Voi con'], exJp: '象は長い鼻を使って水を飲みます。', exVn: 'Voi dùng chiếc vòi dài để uống nước.' },
  { keywords: ['rồng', 'con rồng'], kanji: '竜 / 龍', kana: 'りゅう (ryuu)', hv: 'LONG', meaning: 'Con rồng', compounds: ['竜巻 (たつまき): Cơn lốc xoáy', '昇り竜: Rồng bay lên'], exJp: 'お寺の天井に力強い龍の絵が描かれています。', exVn: 'Trên trần chùa vẽ bức tranh rồng dũng mãnh.' },
  { keywords: ['chuột', 'con chuột'], kanji: '鼠', kana: 'ねずみ (nezumi)', hv: 'THỬ', meaning: 'Con chuột', compounds: ['ねずみ色 (Màu xám chuột)', 'ハリネズミ (Nhím gai)'], exJp: '屋根裏で小さな鼠が走る音がしました。', exVn: 'Nghe thấy tiếng chuột nhỏ chạy trên gác xép.' },
  { keywords: ['rắn', 'con rắn'], kanji: '蛇', kana: 'へび (hebi)', hv: 'XÀ', meaning: 'Con rắn', compounds: ['蛇口 (じゃぐち): Vòi nước', '毒蛇 (どくへび): Rắn độc'], exJp: '草むらに蛇がいるので気をつけてください。', exVn: 'Có rắn trong bụi cỏ nên hãy cẩn thận nhé.' },
  { keywords: ['bướm', 'con bướm'], kanji: '蝶', kana: 'ちょう (chou)', hv: 'ĐIỆP', meaning: 'Con bướm', compounds: ['胡蝶蘭 (こちょうらん): Hoa lan hồ điệp', '蝶ネクタイ: Nơ đeo cổ'], exJp: '色鮮やかな蝶が花の上を舞っています。', exVn: 'Chú bướm rực rỡ sắc màu đang lượn quanh đóa hoa.' },

  // 2. Giao tiếp & Chào hỏi (Greetings)
  { keywords: ['xin chào', 'chào buổi trưa', 'chào bạn'], kanji: '—', kana: 'こんにちは (Konnichiwa)', hv: '—', meaning: 'Xin chào (buổi sáng/trưa đến chiều)', compounds: ['おはようございます (Chào buổi sáng)', 'こんばんは (Chào buổi tối)'], exJp: '皆さん、こんにちは！今日も頑張りましょう。', exVn: 'Xin chào mọi người! Hôm nay chúng ta cùng cố gắng nhé.' },
  { keywords: ['cảm ơn', 'cám ơn'], kanji: '有難う', kana: 'ありがとうございます (Arigatou gozaimasu)', hv: 'HỮU NAN', meaning: 'Xin cảm ơn bạn rất nhiều', compounds: ['どうもありがとう (Cảm ơn nhiều)', '心から感謝します (Cảm ơn tự đáy lòng)'], exJp: '手伝っていただき、誠にありがとうございます。', exVn: 'Rất cảm ơn bạn vì đã nhiệt tình giúp đỡ tôi.' },
  { keywords: ['tạm biệt', 'hẹn gặp lại'], kanji: '—', kana: 'さようなら (Sayounara) / またね (Mata ne)', hv: '—', meaning: 'Tạm biệt', compounds: ['じゃあ、また明日 (Hẹn gặp lại ngày mai)', 'お気をつけて (Đi cẩn thận nhé)'], exJp: 'それでは皆さん、また来週お会いしましょう。さようなら！', exVn: 'Vậy hẹn gặp lại mọi người tuần sau nhé. Tạm biệt!' },
  { keywords: ['xin lỗi', 'làm phiền'], kanji: '—', kana: 'すみません (Sumimasen) / ごめんなさい (Gomennasai)', hv: '—', meaning: 'Xin lỗi / Làm ơn / Cảm phiền', compounds: ['失礼します (Xin phép thất lễ)', '申し訳ありません (Thành thật xin lỗi lịch sự)'], exJp: 'すみません、この近くにコンビニはありますか。', exVn: 'Xin lỗi, ở gần đây có cửa hàng tiện lợi nào không ạ?' },
  { keywords: ['chúc ngủ ngon'], kanji: '—', kana: 'おやすみなさい (Oyasuminasai)', hv: '—', meaning: 'Chúc ngủ ngon', compounds: ['おやすみ (Chúc ngủ ngon thân mật)', 'いい夢を (Mơ đẹp nhé)'], exJp: 'もう夜遅いので、そろそろ寝ますね。おやすみなさい！', exVn: 'Đã khuya rồi, tôi chuẩn bị ngủ đây. Chúc bạn ngủ ngon!' },

  // 3. Thiên nhiên & Thời tiết (Nature & Weather)
  { keywords: ['hoa anh đào', 'anh đào', 'sakura'], kanji: '桜', kana: 'さくら (sakura)', hv: 'ANH', meaning: 'Hoa anh đào (Quốc hoa Nhật Bản)', compounds: ['お花見 (おはなみ): Ngắm hoa anh đào', '桜前線 (さくらぜんせん): Biểu đồ hoa nở'], exJp: '春になると、公園の桜が一斉に満開になります。', exVn: 'Vào mùa xuân, hoa anh đào trong công viên đồng loạt nở rộ.' },
  { keywords: ['hoa', 'bông hoa'], kanji: '花', kana: 'はな (hana)', hv: 'HOA', meaning: 'Bông hoa', compounds: ['花火 (はなび): Pháo hoa', '花屋 (はなや): Cửa hàng hoa'], exJp: '庭に色とりどりの花が綺麗に咲いています。', exVn: 'Trong vườn những đóa hoa muôn sắc đang nở tuyệt đẹp.' },
  { keywords: ['cây', 'cây cối'], kanji: '木', kana: 'き (ki)', hv: 'MỘC', meaning: 'Cây cối / Gỗ', compounds: ['木曜日 (もくようび): Thứ năm', '大木 (たいぼく): Cây cổ thụ'], exJp: '大きな木の下で涼しい風を感じました。', exVn: 'Dưới gốc cây to tôi cảm nhận được làn gió mát lành.' },
  { keywords: ['mặt trời'], kanji: '太陽 / 日', kana: 'たいよう (taiyou) / ひ (hi)', hv: 'THÁI DƯƠNG / NHẬT', meaning: 'Mặt trời', compounds: ['日の出 (ひので): Mặt trời mọc', '朝日 (あさひ): Nắng sớm'], exJp: '東の空から太陽が昇ってきました。', exVn: 'Mặt trời đã bắt đầu nhô lên từ phía chân trời đông.' },
  { keywords: ['mặt trăng'], kanji: '月', kana: 'つき (tsuki)', hv: 'NGUYỆT', meaning: 'Mặt trăng / Tháng', compounds: ['満月 (まんげつ): Trăng tròn', '三日月 (みかづき): Trăng lưỡi liềm'], exJp: '今夜は夜空に綺麗な月が出ています。', exVn: 'Tối nay trên bầu trời đêm có vầng trăng tuyệt đẹp.' },
  { keywords: ['ngôi sao', 'sao trời', 'bầu trời sao'], kanji: '星', kana: 'ほし (hoshi)', hv: 'TINH', meaning: 'Ngôi sao', compounds: ['星空 (ほしぞら): Bầu trời sao', '流れ星 (ながれぼし): Sao băng'], exJp: '満天の星空を見上げると心が癒やされます。', exVn: 'Ngắm nhìn bầu trời đầy sao khiến lòng cảm thấy an yên.' },
  { keywords: ['núi phú sĩ'], kanji: '富士山', kana: 'ふじさん (fujisan)', hv: 'PHÚ SĨ SƠN', meaning: 'Núi Phú Sĩ', compounds: ['富士登山口 (Cửa leo núi)', '日本一の山 (Ngọn núi cao nhất Nhật Bản)'], exJp: '新幹線の車窓から富士山が綺麗に見えました。', exVn: 'Từ cửa sổ tàu Shinkansen tôi đã ngắm nhìn núi Phú Sĩ rất rõ.' },
  { keywords: ['núi', 'ngọn núi'], kanji: '山', kana: 'やま (yama)', hv: 'SƠN', meaning: 'Ngọn núi', compounds: ['登山 (とざん): Leo núi', '火山 (かざん): Núi lửa'], exJp: '週末に友達と一緒に山登りをしました。', exVn: 'Cuối tuần tôi đã cùng bạn bè đi leo núi.' },
  { keywords: ['sông', 'dòng sông'], kanji: '川', kana: 'かわ (kawa)', hv: 'XUYÊN', meaning: 'Dòng sông', compounds: ['河川 (かせん): Sông ngòi', '小川 (おがわ): Con suối nhỏ'], exJp: '川沿いの道をのんびり散歩しました。', exVn: 'Tôi đã đi dạo thong thả dọc theo bờ sông.' },
  { keywords: ['biển', 'đại dương'], kanji: '海', kana: 'うみ (umi)', hv: 'HẢI', meaning: 'Biển cả', compounds: ['海外 (かいがい): Nước ngoài', '海水浴 (かいすいよく): Tắm biển'], exJp: '夏休みに家族と海へ泳ぎに行きました。', exVn: 'Nghỉ hè tôi đã cùng gia đình đi bơi ở biển.' },
  { keywords: ['trời mưa', 'mưa'], kanji: '雨', kana: 'あめ (ame)', hv: 'VŨ', meaning: 'Cơn mưa', compounds: ['大雨 (おおあめ): Mưa to', '雨傘 (あまがさ): Ô đi mưa'], exJp: '午後から雨が降り始めたので、傘を差しました。', exVn: 'Từ chiều trời bắt đầu đổ mưa nên tôi đã che ô.' },
  { keywords: ['tuyết'], kanji: '雪', kana: 'ゆき (yuki)', hv: 'TUYẾT', meaning: 'Tuyết rơi', compounds: ['大雪 (おおゆき): Tuyết rơi dày', '雪だるま (ゆきだるま): Người tuyết'], exJp: '北海道の冬は白い雪が一面に積もります。', exVn: 'Mùa đông ở Hokkaido tuyết trắng tích tụ phủ kín khắp nơi.' },
  { keywords: ['gió', 'cơn gió'], kanji: '風', kana: 'かぜ (kaze)', hv: 'PHONG', meaning: 'Cơn gió', compounds: ['台風 (たいふう): Bão nhiệt đới', '心地よい風: Gió mát dễ chịu'], exJp: '窓を開けると心地よい風が入ってきました。', exVn: 'Mở cửa sổ ra là làn gió mát mẻ ùa vào phòng.' },
  { keywords: ['thời tiết'], kanji: '天気', kana: 'てんき (tenki)', hv: 'THIÊN KHÍ', meaning: 'Thời tiết', compounds: ['いい天気 (Thời tiết đẹp)', '天気予報 (Dự báo thời tiết)'], exJp: '今日はとても気持ちのいい天気ですね。', exVn: 'Hôm nay thời tiết thật là dễ chịu nhỉ.' },

  // 4. Ăn uống & Thực phẩm (Food & Drinks)
  { keywords: ['nước', 'nước uống'], kanji: '水', kana: 'みず (mizu) / お水 (omizu)', hv: 'THỦY', meaning: 'Nước lã / Nước uống', compounds: ['ミネラルウォーター: Nước khoáng', '冷水 (れいすい): Nước lạnh'], exJp: '喉が渇いたので、冷たい水を一杯飲みました。', exVn: 'Vì khát nước nên tôi đã uống một cốc nước mát lạnh.' },
  { keywords: ['cơm', 'bữa ăn'], kanji: 'ご飯', kana: 'ごはん (gohan)', hv: 'PHẠN', meaning: 'Cơm / Bữa ăn', compounds: ['朝ご飯 (Bữa sáng)', '昼ご飯 (Bữa trưa)', '晩ご飯 (Bữa tối)'], exJp: '家族と一緒に温かい晩ご飯を食べました。', exVn: 'Tôi đã cùng gia đình ăn bữa tối ấm cúng.' },
  { keywords: ['trà', 'trà xanh'], kanji: 'お茶 / 抹茶', kana: 'おちゃ (ocha) / まっちゃ (matcha)', hv: 'TRÀ / MẠT TRÀ', meaning: 'Trà / Trà xanh Nhật Bản', compounds: ['緑茶 (りょくちゃ): Lục trà', '茶道 (さどう): Trà đạo Nhật Bản'], exJp: '食後に温かい緑茶を飲むのが好きです。', exVn: 'Sau bữa ăn tôi rất thích nhâm nhi một tách trà xanh ấm.' },
  { keywords: ['cà phê'], kanji: '珈琲', kana: 'コーヒー (koohii)', hv: 'GIA PHI', meaning: 'Cà phê', compounds: ['アイスコーヒー: Cà phê đá', 'カフェラテ: Cà phê sữa latte'], exJp: '毎朝起きたら、まずコーヒーを一杯淹れます。', exVn: 'Mỗi sáng thức dậy, việc đầu tiên của tôi là pha một tách cà phê.' },
  { keywords: ['bánh mì'], kanji: '—', kana: 'パン (pan)', hv: '—', meaning: 'Bánh mì', compounds: ['食パン (Bánh mì gối)', 'パン屋 (Tiệm bánh mì)'], exJp: '朝食に焼きたてのパンを食べました。', exVn: 'Tôi đã ăn chiếc bánh mì mới nướng vào bữa sáng.' },
  { keywords: ['sữa', 'sữa bò', 'sữa tươi'], kanji: '牛乳', kana: 'ぎゅうにゅう (gyuunyuu)', hv: 'NGƯU NHŨ', meaning: 'Sữa bò', compounds: ['温かい牛乳: Sữa ấm', '乳製品 (にゅうせいひん): Chế phẩm sữa'], exJp: '健康のために毎朝牛乳を飲んでいます。', exVn: 'Để giữ gìn sức khỏe, mỗi sáng tôi đều uống sữa.' },
  { keywords: ['rượu', 'sake'], kanji: 'お酒', kana: 'おさけ (osake)', hv: 'TỬU', meaning: 'Rượu / Rượu Sake Nhật', compounds: ['日本酒 (にほんしゅ): Rượu gạo Nhật Bản', '乾杯 (かんぱい): Cạn ly!'], exJp: '居酒屋で美味しい日本酒を味わいました。', exVn: 'Tôi đã thưởng thức món rượu Sake thơm ngon tại quán nhậu.' },
  { keywords: ['bia'], kanji: '麦酒', kana: 'ビール (biiru)', hv: 'MẠCH TỬU', meaning: 'Bia', compounds: ['生ビール (なまビール): Bia tươi', '缶ビール: Bia lon'], exJp: '仕事の後に飲む冷たいビールは最高です。', exVn: 'Uống một cốc bia lạnh sau giờ làm việc thật là tuyệt vời.' },
  { keywords: ['thịt'], kanji: '肉', kana: 'にく (niku)', hv: 'NHỤC', meaning: 'Thịt', compounds: ['牛肉 (Thịt bò)', '豚肉 (Thịt lợn)', '鶏肉 (Thịt gà)'], exJp: '週末に友達と焼肉を食べに行きました。', exVn: 'Cuối tuần tôi đã cùng bạn bè đi ăn thịt nướng yakiniku.' },

  // 5. Cảm xúc & Tâm trạng (Feelings & Adjectives)
  { keywords: ['yêu', 'tình yêu', 'yêu thích'], kanji: '愛 / 好き', kana: 'あい (ai) / すき (suki)', hv: 'ÁI / HẢO', meaning: 'Yêu / Tình yêu', compounds: ['愛する (あいする): Yêu thương', '大好き (だいすき): Rất thích / Yêu thích'], exJp: '私は日本のアニメと文化が大好きです。', exVn: 'Tôi rất yêu thích anime và văn hóa Nhật Bản.' },
  { keywords: ['thích'], kanji: '好き', kana: 'すき (suki)', hv: 'HẢO', meaning: 'Thích thú', compounds: ['好物 (こうぶつ): Món khoái khẩu', '大好き (Rất thích)'], exJp: '日本語を勉強することが大好きです。', exVn: 'Tôi rất thích việc học tiếng Nhật.' },
  { keywords: ['ghét'], kanji: '嫌い', kana: 'きらい (kirai)', hv: 'HIỀM', meaning: 'Ghét / Không thích', compounds: ['大嫌い (だいきらい): Cực kỳ ghét'], exJp: '野菜が嫌いでしたが、今は食べられます。', exVn: 'Hồi trước tôi ghét rau nhưng giờ thì ăn được rồi.' },
  { keywords: ['vui', 'vui vẻ', 'hạnh phúc'], kanji: '嬉しい / 楽しい', kana: 'うれしい (ureshii) / たのしい (tanoshii)', hv: 'LẠC / HY', meaning: 'Vui vẻ / Hạnh phúc', compounds: ['楽しみ (Mong đợi)', '楽しい思い出 (Kỷ niệm vui vẻ)'], exJp: '日本語で会話ができるようになって、本当に楽しいです。', exVn: 'Khi có thể trò chuyện bằng tiếng Nhật, tôi cảm thấy thật là vui.' },
  { keywords: ['buồn', 'đau buồn'], kanji: '悲しい', kana: 'かなしい (kanashii)', hv: 'BI', meaning: 'Buồn bã', compounds: ['悲劇 (ひげき): Bi kịch', '悲しみ (Nỗi buồn)'], exJp: '悲しい映画を見て涙が出ました。', exVn: 'Xem bộ phim buồn tôi đã rơi nước mắt.' },
  { keywords: ['đẹp', 'xinh đẹp'], kanji: '綺麗 / 美しい', kana: 'きれい (kirei) / うつくしい (utsukushii)', hv: 'KHỈ LỆ / MỸ', meaning: 'Đẹp đẽ / Xinh đẹp / Sạch sẽ', compounds: ['美人 (びじん): Mỹ nhân', '景色が綺麗 (Cảnh sắc tươi đẹp)'], exJp: '京都の紅葉は息をのむほど美しいです。', exVn: 'Mùa lá đỏ ở Kyoto đẹp đến nín thở.' },
  { keywords: ['dễ thương', 'đáng yêu'], kanji: '可愛い', kana: 'かわいい (kawaii)', hv: 'KHẢ ÁI', meaning: 'Dễ thương / Đáng yêu', compounds: ['可愛らしい: Trông rất đáng yêu', 'カワイイ文化: Văn hóa Kawaii'], exJp: 'その子犬はとても小さくて可愛いです。', exVn: 'Chú cún con đó trông thật nhỏ nhắn và dễ thương.' },

  // 6. Hành động & Động từ (Verbs)
  { keywords: ['ăn', 'ăn cơm'], kanji: '食べる', kana: 'たべる (taberu)', hv: 'THỰC', meaning: 'Ăn uống', compounds: ['食べ物 (たべもの): Đồ ăn', '朝食を食べる: Ăn sáng'], exJp: '日本のおいしいラーメンを食べたいです。', exVn: 'Tôi muốn thưởng thức món mì ramen ngon tuyệt của Nhật.' },
  { keywords: ['uống'], kanji: '飲む', kana: 'のむ (nomu)', hv: 'ẨM', meaning: 'Uống', compounds: ['飲み物 (のみもの): Đồ uống', 'お茶を飲む: Uống trà'], exJp: '毎朝、温かいお茶を飲んでいます。', exVn: 'Mỗi sáng tôi đều uống một tách trà ấm.' },
  { keywords: ['đi'], kanji: '行く', kana: 'いく (iku)', hv: 'HÀNH', meaning: 'Đi', compounds: ['旅行に行く: Đi du lịch', '学校へ行く: Đến trường'], exJp: '来年、日本へ留学に行きます。', exVn: 'Năm sau tôi sẽ đi du học Nhật Bản.' },
  { keywords: ['đến'], kanji: '来る', kana: 'くる (kuru)', hv: 'LAI', meaning: 'Đến nơi', compounds: ['やって来る: Kéo đến', '春が来る: Mùa xuân đến'], exJp: '先生が教室にやって来ました。', exVn: 'Thầy giáo đã bước vào phòng học.' },
  { keywords: ['về', 'trở về'], kanji: '帰る', kana: 'かえる (kaeru)', hv: 'QUY', meaning: 'Trở về (nhà/nước)', compounds: ['帰国 (きこく): Về nước', '家に帰る: Về nhà'], exJp: '夕方六時に家に帰ります。', exVn: 'Lúc 6 giờ chiều tôi sẽ trở về nhà.' },
  { keywords: ['ngủ', 'đi ngủ'], kanji: '寝る', kana: 'ねる (neru)', hv: 'TẨM', meaning: 'Đi ngủ', compounds: ['早寝早起き: Ngủ sớm dậy sớm', '寝坊 (ねぼう): Ngủ nướng'], exJp: '明日は早いので、もう寝ます。', exVn: 'Mai phải dậy sớm nên tôi đi ngủ đây.' },
  { keywords: ['học', 'học tập', 'học bài'], kanji: '勉強 / 学ぶ', kana: 'べんきょう (benkyou) / まなぶ (manabu)', hv: 'MIỄN CƯỜNG / HỌC', meaning: 'Học tập', compounds: ['日本語を勉強する: Học tiếng Nhật', '学習 (がくしゅう): Ôn luyện học tập'], exJp: '毎日コツコツと漢字を勉強しています。', exVn: 'Mỗi ngày tôi đều kiên trì học từng chữ Hán.' },

  // 7. Gia đình & Con người (Family & People)
  { keywords: ['gia đình'], kanji: '家族', kana: 'かぞく (kazoku)', hv: 'GIA TỘC', meaning: 'Gia đình', compounds: ['家族写真 (Ảnh gia đình)', '大家族 (Gia đình đông người)'], exJp: '私の家族は両親と私の三人です。', exVn: 'Gia đình tôi gồm ba người: bố mẹ và tôi.' },
  { keywords: ['bố', 'ba', 'cha'], kanji: 'お父さん / 父', kana: 'おとうさん (otousan) / ちち (chichi)', hv: 'PHỤ', meaning: 'Bố / Cha', compounds: ['父親 (ちちおや): Thân phụ', '父の日: Ngày của Cha'], exJp: '父は毎朝早くから働いています。', exVn: 'Bố tôi đi làm từ sáng sớm mỗi ngày.' },
  { keywords: ['mẹ', 'má'], kanji: 'お母さん / 母', kana: 'おかあさん (okaasan) / はは (haha)', hv: 'MẪU', meaning: 'Mẹ', compounds: ['母親 (ははおや): Thân mẫu', '母の日: Ngày của Mẹ'], exJp: '母が作ってくれた料理は世界一美味しいです。', exVn: 'Món ăn mẹ nấu là ngon nhất trên đời.' },
  { keywords: ['bạn bè', 'bạn thân'], kanji: '友達', kana: 'ともだち (tomodachi)', hv: 'HỮU ĐẠT', meaning: 'Bạn bè', compounds: ['親友 (しんゆう): Bạn thân', 'クラスメイト: Bạn cùng lớp'], exJp: '休日に親しい友達とカフェへ行きました。', exVn: 'Vào ngày nghỉ tôi đã đi cà phê cùng người bạn thân.' },
  { keywords: ['người', 'con người'], kanji: '人', kana: 'ひと (hito)', hv: 'NHÂN', meaning: 'Con người / Người', compounds: ['日本人 (Người Nhật)', 'ベトナム人 (Người Việt Nam)'], exJp: '親切な人が道を教えてくれました。', exVn: 'Một người tốt bụng đã chỉ đường giúp tôi.' },
  { keywords: ['thầy giáo', 'cô giáo', 'giáo viên'], kanji: '先生', kana: 'せんせい (sensei)', hv: 'TIÊN SINH', meaning: 'Thầy cô giáo', compounds: ['日本語の先生: Giáo viên tiếng Nhật', '恩師 (おんし): Thầy cô kính mến'], exJp: '先生、いつも親切に教えていただきありがとうございます。', exVn: 'Thưa thầy, cảm ơn thầy vì đã luôn ân cần chỉ bảo em.' },
  { keywords: ['học sinh', 'sinh viên'], kanji: '学生', kana: 'がくせい (gakusei)', hv: 'HỌC SINH', meaning: 'Học sinh / Sinh viên', compounds: ['留学生 (りゅうがくせい): Du học sinh', '大学生: Sinh viên đại học'], exJp: '多くの留学生が日本で一生懸命学んでいます。', exVn: 'Rất nhiều du học sinh đang miệt mài học tập tại Nhật Bản.' },

  // 8. Đời sống & Xã hội (Daily Life & Places)
  { keywords: ['nhà', 'ngôi nhà'], kanji: '家', kana: 'いえ (ie) / うち (uchi)', hv: 'GIA', meaning: 'Ngôi nhà', compounds: ['我が家 (わがや): Nhà của chúng tôi', '家族の家: Nhà gia đình'], exJp: 'ただいま！家に帰ってきました。', exVn: 'Tôi đã về đến nhà rồi đây!' },
  { keywords: ['trường học'], kanji: '学校', kana: 'がっこう (gakkou)', hv: 'HỌC HIỆU', meaning: 'Trường học', compounds: ['小学校 (Tiểu học)', '中学校 (THCS)', '高校 (THPT)', '大学 (Đại học)'], exJp: '毎朝八時に自転車で学校へ通っています。', exVn: 'Mỗi sáng lúc 8 giờ tôi đều đạp xe đến trường.' },
  { keywords: ['công ty'], kanji: '会社', kana: 'かいしゃ (kaisha)', hv: 'HỘI XÃ', meaning: 'Công ty / Nơi làm việc', compounds: ['会社員 (Nhân viên công ty)', '本社 (Trụ sở chính)'], exJp: '東京のIT会社でエンジニアとして働いています。', exVn: 'Tôi đang làm kỹ sư tại một công ty IT ở Tokyo.' },
  { keywords: ['tiền', 'tiền bạc'], kanji: 'お金', kana: 'おかね (okane)', hv: 'KIM', meaning: 'Tiền bạc', compounds: ['小銭 (こぜに): Tiền lẻ', '日本円 (にほんえん): Đồng Yên Nhật'], exJp: 'お釣りのお金を財布にしまいました。', exVn: 'Tôi cất số tiền thối lại vào trong ví.' },
  { keywords: ['thời gian', 'giờ giấc'], kanji: '時間', kana: 'じかん (jikan)', hv: 'THỜI GIAN', meaning: 'Thời gian / Giờ giấc', compounds: ['時間通り (Đúng giờ)', '自由時間 (Thời gian rảnh rỗi)'], exJp: '約束の時間をしっかりと守りましょう。', exVn: 'Chúng ta hãy giữ đúng giờ hẹn nhé.' },
  { keywords: ['hôm nay'], kanji: '今日', kana: 'きょう (kyou)', hv: 'KIM NHẬT', meaning: 'Hôm nay', compounds: ['今日の予定 (Kế hoạch hôm nay)', '今日中 (Trong hôm nay)'], exJp: '今日も一日元気に頑張りましょう！', exVn: 'Hôm nay chúng ta cũng hãy tràn đầy năng lượng và cố gắng nhé!' },
  { keywords: ['ngày mai'], kanji: '明日', kana: 'あした (ashita)', hv: 'MINH NHẬT', meaning: 'Ngày mai', compounds: ['明日の朝 (Sáng mai)', '明日また会いましょう (Mai gặp lại nhé)'], exJp: '明日から新しい一週間が始まります。', exVn: 'Từ ngày mai một tuần mới lại bắt đầu.' },
  { keywords: ['hôm qua'], kanji: '昨日', kana: 'きのう (kinou)', hv: 'TÁC NHẬT', meaning: 'Hôm qua', compounds: ['昨日の晩 (Tối hôm qua)', '昨日のこと (Chuyện hôm qua)'], exJp: '昨日は一日中家で本を読んでいました。', exVn: 'Hôm qua tôi ở nhà cả ngày đọc sách.' },
  { keywords: ['nhật bản'], kanji: '日本', kana: 'にほん (Nihon)', hv: 'NHẬT BẢN', meaning: 'Đất nước Nhật Bản', compounds: ['日本語 (Tiếng Nhật)', '日本食 (Món ăn Nhật)'], exJp: '日本は四季折々の美しい自然があります。', exVn: 'Nhật Bản có thiên nhiên tươi đẹp qua bốn mùa.' },
  { keywords: ['việt nam'], kanji: '越 / 越南', kana: 'ベトナム (Betonamu)', hv: 'VIỆT NAM', meaning: 'Việt Nam', compounds: ['ベトナム語 (Tiếng Việt)', 'ベトナム料理 (Ẩm thực Việt Nam)'], exJp: 'ベトナムと日本の友好関係はますます深まっています。', exVn: 'Mối quan hệ hữu nghị Việt Nam - Nhật Bản ngày càng sâu sắc.' },
  { keywords: ['học tiếng nhật', 'ngôn ngữ nhật', 'tiếng nhật bản'], kanji: '日本語', kana: 'にほんご (Nihongo)', hv: 'NHẬT BẢN NGỮ', meaning: 'Tiếng Nhật', compounds: ['日本語能力試験 (Kỳ thi JLPT)', '日本語会話 (Hội thoại tiếng Nhật)'], exJp: '日本語を流暢に話せるようになりたいです。', exVn: 'Tôi muốn có thể nói tiếng Nhật thật lưu loát.' },
];

// Hàm chuẩn hóa câu hỏi: loại bỏ các câu hỏi đệm tiếng Việt
function normalizeUserQuery(query) {
  return (query || '')
    .toLowerCase()
    .replace(/(?:trong\s+)?tiếng\s+nhật(?:\s+(?:là\s+gì|đọc\s+là\s+gì|dịch\s+là\s+gì|nói\s+sao|viết\s+thế\s+nào))?/gi, '')
    .replace(/(?:là\s+gì|nghĩa\s+là\s+gì|như\s+thế\s+nào|viết\s+sao|đọc\s+sao)\??/gi, '')
    .replace(/(?:thầy\s+ơi|cho\s+em\s+hỏi|hỏi\s+thầy|kenji\s+sensei)/gi, '')
    .trim();
}

// Hàm tìm kiếm Kanji thông minh từ Database 2.219 chữ Hán
function findKanjiInDbByQuery(cleanQ, fullDb) {
  if (!fullDb || typeof fullDb !== 'object') return null;

  // 1. Kiểm tra chữ Hán cụ thể xuất hiện trong câu
  const kanjiMatch = cleanQ.match(/[\u4e00-\u9faf]/);
  if (kanjiMatch && kanjiMatch[0] && fullDb[kanjiMatch[0]]) {
    return { kanji: kanjiMatch[0], ...fullDb[kanjiMatch[0]] };
  }

  // 2. Tìm kiếm theo cụm Hán Việt ("chữ tâm", "chữ học", "chữ nhật"...)
  const prefixMatch = cleanQ.match(/(?:chữ|hán tự|kanji|chữ hán)\s+([a-zà-ỹ]+)/i);
  const keyword = prefixMatch ? prefixMatch[1].trim().toLowerCase() : null;

  if (keyword) {
    for (const [k, v] of Object.entries(fullDb)) {
      if (v.hanViet && v.hanViet.toLowerCase() === keyword) {
        return { kanji: k, ...v };
      }
    }
  }

  // 3. Quét toàn bộ Hán Việt trong từ điển (ưu tiên từ đơn Hán Việt chính xác)
  const words = cleanQ.split(/\s+/);
  for (const w of words) {
    if (w.length >= 2) {
      for (const [k, v] of Object.entries(fullDb)) {
        if (v.hanViet && v.hanViet.toLowerCase() === w) {
          return { kanji: k, ...v };
        }
      }
    }
  }

  return null;
}

// Động cơ phản hồi thông minh nội bộ đa chiều
export function generateLocalSenseiResponse(query, context = {}, fullDb = {}) {
  const { currentChar = '', currentLevel = 'N5', cardInfo = null } = context;
  const q = (query || '').trim().toLowerCase();
  const cleanQ = normalizeUserQuery(query);

  // 1. Chào hỏi ban đầu
  const isPureGreeting = (
    q === 'chào' ||
    q === 'chào thầy' ||
    q === 'chào thầy ạ' ||
    q === 'chào sensei' ||
    q === 'xin chào' ||
    q === 'konnichiwa' ||
    q === 'hi' ||
    q === 'hello' ||
    q === 'thầy ơi' ||
    q === 'ơi' ||
    q === 'alo' ||
    q === 'chào bạn'
  );

  if (isPureGreeting) {
    return `Konnichiwa! Thầy là **Kenji Sensei (賢治先生)** đây. 
Rất vui được đồng hành cùng bạn trên con đường chinh phục tiếng Nhật!

Hôm nay bạn muốn thầy hỗ trợ điều gì?
- 📖 **Tra cứu từ vựng & chữ Hán** bất kỳ trong đời sống (ví dụ: *con bò, con mèo, hoa anh đào, núi phú sĩ...*).
- 💡 **Mẹo nhớ chiết tự chữ Hán** theo bộ thủ sinh động.
- ✍️ **Đặt câu ví dụ thực tế theo cấp độ JLPT ${currentLevel}**.
- ⚖️ **Phân biệt các cặp chữ Hán dễ nhầm lẫn**.
- 📖 **Giải đáp ngữ pháp & cách chia thể động từ**.

*Hiện tại bạn đang học chữ Hán **「${currentChar || '一'}」** (${cardInfo?.hanViet || ''}). Bạn có thắc mắc gì không?*`;
  }

  // 2. Kiểm tra xem người học có đang hỏi cụ thể về Chữ Hán đang xem trên màn hình không
  const isExplicitlyAskingAboutCurrent =
    q.includes('chữ này') ||
    q.includes('chữ đang học') ||
    (currentChar && q.includes(currentChar));

  // 3. Nếu người học hỏi về Chữ Hán cụ thể (ví dụ: "chữ tâm", "chữ học", "chữ ái", "kanji của...")
  const isAskingKanjiLetter =
    /(?:^|\s)(?:chữ|hán tự|kanji|chữ hán)\s+/i.test(cleanQ) ||
    /(?:^|\s)(?:chữ|hán tự|kanji|chữ hán)\s+/i.test(q);

  let foundKanjiData = null;
  if (isAskingKanjiLetter && !isExplicitlyAskingAboutCurrent) {
    foundKanjiData = findKanjiInDbByQuery(cleanQ, fullDb) || findKanjiInDbByQuery(q, fullDb);
  }

  // 4. Tra cứu Từ điển Đời sống thông dụng (Từ vựng tiếng Việt -> tiếng Nhật)
  if (!foundKanjiData) {
    for (const item of COMMON_VOCAB_DICTIONARY) {
      const matched = item.keywords.some((kw) => cleanQ.includes(kw) || q.includes(kw));
      if (matched) {
        const compoundsList = item.compounds.map((c) => `- **${c}**`).join('\n');
        return `### 💡 Từ vựng tiếng Nhật: "${item.meaning}"

- **Chữ Hán**: **${item.kanji !== '—' ? item.kanji : '（Từ viết bằng Kana）'}**
- **Cách đọc (Furigana)**: **${item.kana}**
${item.hv !== '—' ? `- **Âm Hán Việt**: **${item.hv}**` : ''}

**Các từ ghép thông dụng mở rộng:**
${compoundsList}

**Câu ví dụ thực tế:**
- 🇯🇵 **${item.exJp}**
- 🇻🇳 *${item.exVn}*

**Lời khuyên của Kenji Sensei**:
Bạn có thể bấm vào biểu tượng **Loa (🔊)** ở góc trên để nghe máy phát âm chuẩn từ này nhé!`;
      }
    }
  }

  // 5. Nếu vẫn chưa có kết quả từ vựng, thử quét Kanji trong câu hỏi hoặc database 2.219 chữ
  if (!foundKanjiData && !isExplicitlyAskingAboutCurrent) {
    foundKanjiData = findKanjiInDbByQuery(cleanQ, fullDb) || findKanjiInDbByQuery(q, fullDb);
  }

  let targetChar = foundKanjiData ? foundKanjiData.kanji : (isExplicitlyAskingAboutCurrent ? currentChar : null);
  let targetData = foundKanjiData || (targetChar && targetChar === currentChar ? cardInfo : null);

  if (targetChar && !targetData && fullDb && fullDb[targetChar]) {
    targetData = fullDb[targetChar];
  }

  // 5. Nếu người học hỏi về mẹo nhớ / chiết tự của chữ Hán
  if (targetData && (q.includes('mẹo nhớ') || q.includes('chiết tự') || q.includes('câu chuyện') || q.includes('nhớ chữ') || q.includes('cách nhớ') || q.includes('làm sao nhớ'))) {
    const hv = targetData.hanViet || targetData.hv || 'Hán tự';
    const mnemonic = targetData.mnemonic || 'Nhìn kỹ các nét bút và bộ thủ cấu thành chữ để tạo liên tưởng ghi nhớ.';
    const on = targetData.on || '—';
    const kun = targetData.kun || '—';
    const topWord = targetData.vocab?.[0]?.word || targetChar;
    const topMeaning = targetData.vocab?.[0]?.meaning_vi || targetData.meaning || '';

    return `### 💡 Bí quyết chiết tự & Mẹo nhớ chữ 「${targetChar}」 (${hv})

**1. Chiết tự cốt lõi:**
> "${mnemonic}"

**2. Góc nhìn trực quan:**
- Chữ **「${targetChar}」** mang âm Hán Việt là **${hv}**, ý nghĩa: *${targetData.meaning || 'Chữ Hán'}*.
- Âm đọc: On \`${on}\` | Kun \`${kun}\`.
- Gắn liền với từ vựng tiêu biểu: **${topWord}** (${topMeaning}).

**3. Lời khuyên sư phạm của Kenji Sensei:**
- **Không chép phạt máy móc**: Nhắm mắt lại và hình dung cấu trúc bộ thủ xuất hiện trong tâm trí trong 5 giây.
- **Tập vẽ 3 lần kết hợp phát âm**: Dùng ngón tay vẽ nét bút lên mặt bàn kết hợp đọc to âm **${hv}** và từ **${topWord}** để kích thích trí nhớ dài hạn!`;
  }

  // 6. Nếu người học yêu cầu giải thích chữ Hán cụ thể hoặc hỏi về chữ đang học
  if (targetData && (q.includes('giải thích') || q.includes('ý nghĩa') || q.includes('nghĩa là gì') || q.includes('phân tích') || isExplicitlyAskingAboutCurrent || foundKanjiData)) {
    const hv = targetData.hanViet || targetData.hv || 'Hán tự';
    const on = targetData.on || '—';
    const kun = targetData.kun || '—';
    const meaning = targetData.meaning || 'Chữ Hán';
    const exampleJp = targetData.example?.sentence || targetData.exampleJp || '';
    const exampleVn = targetData.example?.translation || targetData.exampleVn || '';

    let vocabSection = '';
    if (targetData.vocab && Array.isArray(targetData.vocab) && targetData.vocab.length > 0) {
      vocabSection = targetData.vocab.slice(0, 4).map(v => `  - **${v.word || v.jp?.replace(/<[^>]+>/g, '')}** (${v.reading || ''}): *${v.meaning_vi || v.vn || ''}*`).join('\n');
    }

    return `### ⛩️ Phân tích chữ Hán 「${targetChar}」 (${hv})

- **Cấp độ**: JLPT **${targetData.level || currentLevel}**
- **Âm Hán Việt**: **${hv}**
- **Nghĩa cốt lõi**: ${meaning}
- **Âm On (Onyomi)**: \`${on}\` *(Dùng khi ghép thành từ Hán)*
- **Âm Kun (Kunyomi)**: \`${kun}\` *(Dùng khi đứng độc lập)*

${vocabSection ? `**Từ vựng ghép thông dụng**:\n${vocabSection}\n` : ''}
${exampleJp ? `**Ví dụ thực tế**:\n- 🇯🇵 **${exampleJp.replace(/<[^>]+>/g, '')}**\n- 🇻🇳 *${exampleVn}*\n` : ''}`;
  }

  // 7. Hỏi về Ngữ pháp
  if (q.includes('ngữ pháp') || q.includes('cấu trúc') || q.includes('grammar') || q.includes('thể động từ') || q.includes('chia thể')) {
    const levelKey = ['N5', 'N4', 'N3', 'N2', 'N1'].includes(currentLevel) ? currentLevel : 'N5';
    const levelGrammar = GRAMMAR_DATA[levelKey] || GRAMMAR_DATA.N5 || [];
    const sampleGrammar = levelGrammar.slice(0, 3);
    const grammarList = sampleGrammar.map(g => `- **${g.title}**: *${g.meaning}*\n  ➜ Cấu trúc: \`${g.structure}\``).join('\n');

    return `### 📖 Tư vấn Ngữ pháp JLPT ${levelKey} từ Kenji Sensei

Trong cấp độ **${levelKey}**, một số điểm ngữ pháp cốt lõi bạn cần ghi nhớ:
${grammarList}

*Gợi ý: Bạn có thể bấm vào thẻ **"Bài học ➔ Ngữ pháp"** trên thanh menu chính để luyện tập các bài chia thể động từ nhé!*`;
  }

  // 8. Hỏi về phương pháp học / ôn thi
  if (q.includes('lộ trình') || q.includes('cách học') || q.includes('kinh nghiệm') || q.includes('ôn thi') || q.includes('nhớ lâu') || q.includes('thi đậu')) {
    return `### 🌸 Phương pháp học tiếng Nhật hiệu quả từ Kenji Sensei

1. **Lặp lại ngắt quãng (Spaced Repetition)**: Học 10-15 chữ mỗi ngày và dùng tính năng **Sổ tay ôn tập (Notebook)** của ứng dụng để ôn lại vào ngày 1 – ngày 3 – ngày 7.
2. **Học theo bộ thủ**: Nắm vững 214 bộ thủ Khang Hy để giải mã mọi chữ Hán phức tạp.
3. **Luyện phát âm Shadowing**: Bật tính năng **AI Shadowing** ở thanh công cụ để nhại lại các câu nói mẫu, rèn phản xạ phát âm chuẩn Tokyo Pitch Accent.`;
  }

  // 9. Phản hồi chung cho các câu hỏi mở khác (Không bao giờ tự ý gắn chữ Hán khác vào)
  return `### ⛩️ Kenji Sensei lắng nghe câu hỏi của bạn

Về câu hỏi: *"**${query}**"*

**Lời giải đáp từ Sensei**:
- Khi học tiếng Nhật, bạn hãy cố gắng gắn từ vựng và mẫu câu vào các tình huống giao tiếp đời sống cụ thể.
- Nếu bạn cần tra từ vựng tiếng Nhật của một đồ vật hoặc con vật nào (ví dụ: *con bò, con mèo, hoa anh đào, núi phú sĩ...*), hãy nhắn tên từ đó cho thầy nhé!
- Nếu bạn muốn tìm hiểu về chữ Hán đang học **「${currentChar}」**, hãy chọn các nút gợi ý nhanh bên dưới.

Thầy luôn sẵn sàng hỗ trợ bạn!`;
}
