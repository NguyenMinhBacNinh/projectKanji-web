// Bảng chữ cái tiếng Nhật Hiragana & Katakana chuẩn

export const HIRAGANA_SEION = [
  { kana: 'あ', kata: 'ア', romaji: 'a', example: '朝 (asa - buổi sáng)', tip: 'Giống chữ A mềm mại' },
  { kana: 'い', kata: 'イ', romaji: 'i', example: '犬 (inu - con chó)', tip: 'Hai nét như hai chữ I song song' },
  { kana: 'う', kata: 'ウ', romaji: 'u', example: '海 (umi - biển)', tip: 'Một nét cong như lưng người gập' },
  { kana: 'え', kata: 'エ', romaji: 'e', example: '駅 (eki - nhà ga)', tip: 'Một người đang tập thể dục' },
  { kana: 'お', kata: 'オ', romaji: 'o', example: 'お茶 (ocha - trà)', tip: 'Hình tròn quả bóng lượn' },

  { kana: 'か', kata: 'カ', romaji: 'ka', example: '傘 (kasa - cái ô)', tip: 'Lực sĩ giơ tay cầm gậy' },
  { kana: 'き', kata: 'キ', romaji: 'ki', example: '木 (ki - cái cây)', tip: 'Hình chiếc chìa khóa (key)' },
  { kana: 'く', kata: 'ク', romaji: 'ku', example: '車 (kuruma - ô tô)', tip: 'Chiếc mỏ chim cúc cu' },
  { kana: 'け', kata: 'ケ', romaji: 'ke', example: '煙 (kemuri - khói)', tip: 'Vò rượu sake' },
  { kana: 'こ', kata: 'コ', romaji: 'ko', example: '声 (koe - giọng nói)', tip: 'Hai nét như hai lát bánh' },

  { kana: 'さ', kata: 'サ', romaji: 'sa', example: '桜 (sakura - hoa anh đào)', tip: 'Chiếc đĩa bay nghiêng' },
  { kana: 'し', kata: 'シ', romaji: 'shi', example: '白 (shiro - màu trắng)', tip: 'Cần câu cá câu lên biển' },
  { kana: 'す', kata: 'ス', romaji: 'su', example: '寿司 (sushi - sushi)', tip: 'Cọng mì xuyến xoắn' },
  { kana: 'せ', kata: 'セ', romaji: 'se', example: '世界 (sekai - thế giới)', tip: 'Hai người ngồi trên ghế' },
  { kana: 'そ', kata: 'ソ', romaji: 'so', example: '空 (sora - bầu trời)', tip: 'Đường zigzag may vá' },

  { kana: 'た', kata: 'タ', romaji: 'ta', example: '卵 (tamago - quả trứng)', tip: 'Giống chữ ta trong tiếng anh' },
  { kana: 'ち', kata: 'チ', romaji: 'chi', example: '父 (chichi - bố)', tip: 'Số 5 vui nhộn' },
  { kana: 'つ', kata: 'ツ', romaji: 'tsu', example: '月 (tsuki - mặt trăng)', tip: 'Ngọn sóng thần tsunami' },
  { kana: 'て', kata: 'テ', romaji: 'te', example: '手 (te - bàn tay)', tip: 'Cánh tay uốn lượn' },
  { kana: 'と', kata: 'ト', romaji: 'to', example: '友達 (tomodachi - bạn bè)', tip: 'Ngón chân cái bị gai đâm' },

  { kana: 'な', kata: 'ナ', romaji: 'na', example: '夏 (natsu - mùa hè)', tip: 'Người quỳ cầu nguyện' },
  { kana: 'に', kata: 'ニ', romaji: 'ni', example: '肉 (niku - thịt)', tip: 'Kim may và cuộn chỉ' },
  { kana: 'ぬ', kata: 'ヌ', romaji: 'nu', example: 'ぬいぐるみ (nuigurumi - gấu bông)', tip: 'Bát mì ramen có đũa' },
  { kana: 'ね', kata: 'ネ', romaji: 'ne', example: '猫 (neko - con mèo)', tip: 'Con mèo cuộn tròn đuôi' },
  { kana: 'の', kata: 'ノ', romaji: 'no', example: '飲み物 (nomimono - đồ uống)', tip: 'Biển báo cấm (NO)' },

  { kana: 'は', kata: 'ハ', romaji: 'ha', example: '花 (hana - bông hoa)', tip: 'Chữ H kèm nét cong' },
  { kana: 'ひ', kata: 'ヒ', romaji: 'hi', example: '人 (hito - con người)', tip: 'Nụ cười toe toét' },
  { kana: 'ふ', kata: 'フ', romaji: 'fu', example: '富士山 (fujisan - núi Phú Sĩ)', tip: 'Ngọn núi Phú Sĩ với mây' },
  { kana: 'へ', kata: 'ヘ', romaji: 'he', example: '部屋 (heya - căn phòng)', tip: 'Đỉnh đồi dốc đứng' },
  { kana: 'ほ', kata: 'ホ', romaji: 'ho', example: '星 (hoshi - ngôi sao)', tip: 'Cột buồm tàu lượn' },

  { kana: 'ま', kata: 'マ', romaji: 'ma', example: '町 (machi - thị trấn)', tip: 'Tấm biển mặt quỷ' },
  { kana: 'み', kata: 'ミ', romaji: 'mi', example: '水 (mizu - nước)', tip: 'Nốt nhạc Mi may mắn' },
  { kana: 'む', kata: 'ム', romaji: 'mu', example: '虫 (mushi - côn trùng)', tip: 'Đầu chú bò gặm cỏ (Moo)' },
  { kana: 'め', kata: 'メ', romaji: 'me', example: '目 (me - con mắt)', tip: 'Sợi mì udon cuộn lại' },
  { kana: 'も', kata: 'モ', romaji: 'mo', example: '森 (mori - rừng cây)', tip: 'Chiếc móc câu bắt thêm nhiều cá' },

  { kana: 'や', kata: 'ヤ', romaji: 'ya', example: '山 (yama - ngọn núi)', tip: 'Mỏ neo tàu kéo lên' },
  { kana: '', kata: '', romaji: '', example: '', tip: '' },
  { kana: 'ゆ', kata: 'ユ', romaji: 'yu', example: '雪 (yuki - tuyết)', tip: 'Chú cá bơi lội dưới nước' },
  { kana: '', kata: '', romaji: '', example: '', tip: '' },
  { kana: 'よ', kata: 'ヨ', romaji: 'yo', example: '夜 (yoru - ban đêm)', tip: 'Người chơi yo-yo' },

  { kana: 'ら', kata: 'ラ', romaji: 'ra', example: '桜 (sakura)', tip: 'Con lạc đà ngẩng đầu' },
  { kana: 'り', kata: 'リ', romaji: 'ri', example: '林檎 (ringo - quả táo)', tip: 'Hai dải ruy băng nhẹ bay' },
  { kana: 'る', kata: 'ル', romaji: 'ru', example: '留守 (rusu - vắng nhà)', tip: 'Viên ngọc tròn cuộn mối' },
  { kana: 'れ', kata: 'レ', romaji: 're', example: '歴史 (rekishi - lịch sử)', tip: 'Người ngồi nghỉ chân' },
  { kana: 'ろ', kata: 'ロ', romaji: 'ro', example: '廊下 (rouka - hành lang)', tip: 'Đường uốn giống Ru nhưng ko cuộn' },

  { kana: 'わ', kata: 'ワ', romaji: 'wa', example: '私 (watashi - tôi)', tip: 'Vòng tròn hòa bình' },
  { kana: '', kata: '', romaji: '', example: '', tip: '' },
  { kana: '', kata: '', romaji: '', example: '', tip: '' },
  { kana: '', kata: '', romaji: '', example: '', tip: '' },
  { kana: 'を', kata: 'ヲ', romaji: 'wo', example: '〜を見る (-wo miru)', tip: 'Trợ từ chỉ đối tượng' },

  { kana: 'ん', kata: 'ン', romaji: 'n', example: '日本 (nihon - Nhật Bản)', tip: 'Chữ n cách điệu' },
];

export const KANA_DAKUON = [
  // G-line (Âm đục K -> G)
  { kana: 'が', kata: 'ガ', romaji: 'ga', example: '学生 (gakusei - học sinh)' },
  { kana: 'ぎ', kata: 'ギ', romaji: 'gi', example: '銀行 (ginkou - ngân hàng)' },
  { kana: 'ぐ', kata: 'グ', romaji: 'gu', example: '軍手 (gunte - găng tay)' },
  { kana: 'げ', kata: 'ゲ', romaji: 'ge', example: '元気 (genki - khỏe mạnh)' },
  { kana: 'ご', kata: 'ゴ', romaji: 'go', example: 'ご飯 (gohan - cơm)' },

  // Z-line (Âm đục S -> Z/J)
  { kana: 'ざ', kata: 'ザ', romaji: 'za', example: '雑誌 (zasshi - tạp chí)' },
  { kana: 'じ', kata: 'ジ', romaji: 'ji', example: '時間 (jikan - thời gian)' },
  { kana: 'ず', kata: 'ズ', romaji: 'zu', example: 'ずっと (zutto - suốt/mãi)' },
  { kana: 'ぜ', kata: 'ゼ', romaji: 'ze', example: '全部 (zenbu - toàn bộ)' },
  { kana: 'ぞ', kata: 'ゾ', romaji: 'zo', example: '家族 (kazoku - gia đình)' },

  // D-line (Âm đục T -> D)
  { kana: 'だ', kata: 'ダ', romaji: 'da', example: '大学 (daigaku - đại học)' },
  { kana: 'ぢ', kata: 'ヂ', romaji: 'ji', example: '鼻血 (hanaji - chảy máu cam)' },
  { kana: 'づ', kata: 'ヅ', romaji: 'zu', example: '続く (tsudzuku - tiếp tục)' },
  { kana: 'で', kata: 'デ', romaji: 'de', example: '電話 (denwa - điện thoại)' },
  { kana: 'ど', kata: 'ド', romaji: 'do', example: '何処 (doko - ở đâu)' },

  // B-line (Âm đục H -> B)
  { kana: 'ば', kata: 'バ', romaji: 'ba', example: '場所 (basho - địa điểm)' },
  { kana: 'び', kata: 'ビ', romaji: 'bi', example: '病院 (byouin - bệnh viện)' },
  { kana: 'ぶ', kata: 'ブ', romaji: 'bu', example: '豚肉 (butaniku - thịt lợn)' },
  { kana: 'べ', kata: 'ベ', romaji: 'be', example: '勉強 (benkyou - học tập)' },
  { kana: 'ぼ', kata: 'ボ', romaji: 'bo', example: '僕 (boku - tôi)' },

  // P-line (Âm bán đục H -> P Handakuon)
  { kana: 'ぱ', kata: 'パ', romaji: 'pa', example: 'パン (pan - bánh mì)' },
  { kana: 'ぴ', kata: 'ピ', romaji: 'pi', example: 'ピカピカ (pikapika - lấp lánh)' },
  { kana: 'ぷ', kata: 'プ', romaji: 'pu', example: '天ぷら (tempura - món chiên tẩm)' },
  { kana: 'ぺ', kata: 'ペ', romaji: 'pe', example: 'ペラペラ (perapera - lưu loát)' },
  { kana: 'ぽ', kata: 'ポ', romaji: 'po', example: '散歩 (sampo - đi dạo)' },
];

export const KANA_YOON = [
  { kana: 'きゃ', kata: 'キャ', romaji: 'kya', example: '客 (kyaku - khách)' },
  { kana: 'きゅ', kata: 'キュ', romaji: 'kyu', example: '牛乳 (gyuunyuu - sữa)' },
  { kana: 'きょ', kata: 'キョ', romaji: 'kyo', example: '今日 (kyou - hôm nay)' },

  { kana: 'しゃ', kata: 'シャ', romaji: 'sha', example: '写真 (shashin - bức ảnh)' },
  { kana: 'しゅ', kata: 'シュ', romaji: 'shu', example: '趣味 (shumi - sở thích)' },
  { kana: 'しょ', kata: 'ショ', romaji: 'sho', example: '食堂 (shokudou - nhà ăn)' },

  { kana: 'ちゃ', kata: 'チャ', romaji: 'cha', example: 'お茶 (ocha - trà)' },
  { kana: 'ちゅ', kata: 'チュ', romaji: 'chu', example: '注意 (chuui - chú ý)' },
  { kana: 'ちょ', kata: 'チョ', romaji: 'cho', example: 'ちょっと (chotto - một chút)' },

  { kana: 'にゃ', kata: 'ニャ', romaji: 'nya', example: 'にゃー (tiếng mèo kêu)' },
  { kana: 'にゅ', kata: 'ニュ', romaji: 'nyu', example: '牛乳 (gyuunyuu)' },
  { kana: 'にょ', kata: 'ニョ', romaji: 'nyo', example: '女房 (nyoubou - vợ)' },

  { kana: 'ひゃ', kata: 'ヒャ', romaji: 'hya', example: '百 (hyaku - một trăm)' },
  { kana: 'ひゅ', kata: 'ヒュ', romaji: 'hyu', example: 'ヒュー (vèo)' },
  { kana: 'ひょ', kata: 'ヒョ', romaji: 'hyo', example: '表情 (hyoujou - nét mặt)' },

  { kana: 'りゃ', kata: 'リャ', romaji: 'rya', example: '略 (ryaku - tóm lược)' },
  { kana: 'りゅ', kata: 'リュ', romaji: 'ryu', example: '留学 (ryuugaku - du học)' },
  { kana: 'りょ', kata: 'リョ', romaji: 'ryo', example: '旅行 (ryokou - du lịch)' },
];
