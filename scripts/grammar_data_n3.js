// Dữ liệu 50 mẫu ngữ pháp JLPT N3 chuẩn quốc tế đầy đủ phiên âm furigana và giải nghĩa chi tiết
module.exports = [
  {
    id: 'n3_1',
    level: 'N3',
    title: '〜に関して',
    meaning: 'Liên quan đến... / Về vấn đề...',
    structure: 'Danh từ + に関して / に関する + Danh từ',
    explanation: 'Dùng trong ngữ cảnh trang trọng, phát biểu, nghiên cứu để diễn tả chủ đề liên quan.',
    examples: [
      { jp: '環境問題に関してレポートを書きました。', vn: 'Tôi đã viết báo cáo liên quan đến vấn đề môi trường.', furigana: 'かんきょう もんだい に かんして レポート を かきました。' },
      { jp: '事件に関する詳しい情報はまだありません。', vn: 'Chưa có thông tin chi tiết liên quan đến vụ việc.', furigana: 'じけん に かんする くわしい じょうほう は まだ ありません。' }
    ]
  },
  {
    id: 'n3_2',
    level: 'N3',
    title: '〜に対して',
    meaning: 'Đối với... / Trái ngược với...',
    structure: 'Danh từ + に対して / に対する + Danh từ (hoặc Mệnh đề thể thường + のに対して)',
    explanation: 'Chỉ đối tượng hướng đến hoặc dùng để so sánh hai vế có tính chất tương phản rõ rệt.',
    examples: [
      { jp: '目上の人に対して敬語を使います。', vn: 'Dùng kính ngữ đối với người bề trên.', furigana: 'めうえ の ひと に たいして けいご を つかいます。' },
      { jp: '兄が無口なのに対して、弟はとてもおしゃべりだ。', vn: 'Trái ngược với người anh ít nói, cậu em lại rất thích nói chuyện.', furigana: 'あに が むくち な の に たいして、おとうと は とても おしゃべり だ。' }
    ]
  },
  {
    id: 'n3_3',
    level: 'N3',
    title: '〜について',
    meaning: 'Về... (nội dung chủ đề)',
    structure: 'Danh từ + について / についての + Danh từ',
    explanation: 'Nêu lên đối tượng, chủ đề mà người nói đang suy nghĩ, nghiên cứu hoặc thảo luận.',
    examples: [
      { jp: '日本の歴史について勉強しています。', vn: 'Tôi đang tìm hiểu về lịch sử Nhật Bản.', furigana: 'にほん の れきし について べんきょう しています。' },
      { jp: '将来の進路について先生と相談した。', vn: 'Tôi đã trao đổi với thầy giáo về định hướng tương lai.', furigana: 'しょうらい の しんろ について せんせい と そうだん した。' }
    ]
  },
  {
    id: 'n3_4',
    level: 'N3',
    title: '〜にとって',
    meaning: 'Đối với... (dưới góc nhìn, lập trường đánh giá)',
    structure: 'Danh từ (chỉ người/tổ chức) + にとって / にとっての + Danh từ',
    explanation: 'Đưa ra nhận xét, đánh giá từ góc độ, lập trường của một đối tượng cụ thể.',
    examples: [
      { jp: '私にとって家族が一番大切です。', vn: 'Đối với tôi, gia đình là điều quan trọng nhất.', furigana: 'わたし にとって かぞく が いちばん たいせつ です。' },
      { jp: '留学生にとってビザの更新はとても重要な問題だ。', vn: 'Đối với du học sinh, việc gia hạn visa là một vấn đề cực kỳ quan trọng.', furigana: 'りゅうがくせい にとって ビザ の こうしん は とても じゅうよう な もんだい だ。' }
    ]
  },
  {
    id: 'n3_5',
    level: 'N3',
    title: '〜によって／による',
    meaning: 'Do... / Bằng cách... / Tùy theo...',
    structure: 'Danh từ + によって / により / による + Danh từ',
    explanation: 'Chỉ nguyên nhân, phương tiện cách thức thực hiện hoặc sự khác biệt tùy theo đối tượng.',
    examples: [
      { jp: '台風によって電車が止まりました。', vn: 'Do bão nên tàu điện đã ngừng hoạt động.', furigana: 'たいふう によって でんしゃ が とまりました。' },
      { jp: '人によって考え方が違います。', vn: 'Tùy theo mỗi người mà cách suy nghĩ sẽ khác nhau.', furigana: 'ひと によって かんがえかた が ちがいます。' }
    ]
  },
  {
    id: 'n3_6',
    level: 'N3',
    title: '〜によると／によれば',
    meaning: 'Theo như... (trích dẫn nguồn tin)',
    structure: 'Danh từ (chỉ nguồn tin) + によると / によれば + ...そうだ / ということだ',
    explanation: 'Dùng để dẫn nguồn thông tin nghe được hoặc đọc được từ báo đài, người khác.',
    examples: [
      { jp: '天気予報によると、明日は雨が降るそうです。', vn: 'Theo dự báo thời tiết thì ngày mai trời sẽ mưa.', furigana: 'てんきよほう によると、あした は あめ が ふる そう です。' },
      { jp: '友達の話によれば、あのレストランはおいしいらしい。', vn: 'Theo lời bạn tôi thì nghe nói nhà hàng đó ngon lắm.', furigana: 'ともだち の はなし によれば、あの レストラン は おいしい らしい。' }
    ]
  },
  {
    id: 'n3_7',
    level: 'N3',
    title: '〜を通じて／を通して',
    meaning: 'Thông qua... / Suốt cả...',
    structure: 'Danh từ + を通じて (をつうじて) / を通して (をとおして)',
    explanation: 'Chỉ phương tiện gián tiếp để đạt mục đích, hoặc khoảng thời gian kéo dài suốt một quá trình.',
    examples: [
      { jp: 'インターネットを通じて世界中のニュースを知ることができる。', vn: 'Thông qua Internet, ta có thể biết tin tức trên toàn thế giới.', furigana: 'インターネット を つうじて せかいじゅう の ニュース を しる こと が できる。' },
      { jp: 'この地域は四季を通じて暖かい気候です。', vn: 'Khu vực này có khí hậu ấm áp suốt bốn mùa.', furigana: 'この ちいき は しき を とおして あたたかい きこう です。' }
    ]
  },
  {
    id: 'n3_8',
    level: 'N3',
    title: '〜を中心に',
    meaning: 'Lấy... làm trung tâm / Trọng tâm là...',
    structure: 'Danh từ + を中心に / を中心として / を中心にした + Danh từ',
    explanation: 'Chỉ đối tượng, khu vực, vấn đề quan trọng cốt lõi nhất được đưa ra làm điểm quy tụ.',
    examples: [
      { jp: '駅前を中心に新しい商店街が開発されている。', vn: 'Khu phố mua sắm mới đang được phát triển với trọng tâm là quanh ga.', furigana: 'えきまえ を ちゅうしん に あたらしい しょうてんがい が かいはつ されている。' },
      { jp: '文法を中心に対策を進めます。', vn: 'Chúng tôi sẽ đẩy mạnh ôn thi với ngữ pháp làm trọng tâm.', furigana: 'ぶんぽう を ちゅうしん に たいさく を すすめます。' }
    ]
  },
  {
    id: 'n3_9',
    level: 'N3',
    title: '〜をはじめ',
    meaning: 'Trước tiên phải kể đến... / Tiêu biểu là...',
    structure: 'Danh từ + をはじめ / をはじめとして / をはじめとする + Danh từ',
    explanation: 'Đưa ra một ví dụ điển hình nhất trong một nhóm tập hợp.',
    examples: [
      { jp: '富士山をはじめ、日本には美しい山がたくさんあります。', vn: 'Trước tiên phải kể đến núi Phú Sĩ, Nhật Bản có rất nhiều ngọn núi đẹp.', furigana: 'ふじさん を はじめ、にほん に は うつくしい やま が たくさん あります。' },
      { jp: '校長先生をはじめ、先生方に感謝申し上げます。', vn: 'Tôi xin cảm ơn các thầy cô giáo, tiêu biểu là thầy hiệu trưởng.', furigana: 'こうちょう せんせい を はじめ、せんせいがた に かんしゃ もうしあげます。' }
    ]
  },
  {
    id: 'n3_10',
    level: 'N3',
    title: '〜にわたって',
    meaning: 'Suốt / Trải dài khắp (thời gian, không gian, quy mô)',
    structure: 'Danh từ (thời gian, địa điểm, số lượng) + にわたって / にわたり / にわたる + Danh từ',
    explanation: 'Nhấn mạnh quy mô lớn, kéo dài liên tục về không gian hoặc thời gian.',
    examples: [
      { jp: '会議は３日間にわたって行われました。', vn: 'Cuộc họp đã diễn ra kéo dài suốt 3 ngày.', furigana: 'かいぎ は みっかかん に わたって おこなわれました。' },
      { jp: '台風は広い範囲にわたって被害を与えた。', vn: 'Cơn bão đã gây thiệt hại trên một phạm vi rất rộng lớn.', furigana: 'たいふう は ひろい はんい に わたって ひがい を あたえた。' }
    ]
  },
  {
    id: 'n3_11',
    level: 'N3',
    title: '〜おきに',
    meaning: 'Cứ cách... lại...',
    structure: 'Từ chỉ số lượng / thời gian + おきに',
    explanation: 'Chỉ khoảng cách đều đặn lặp đi lặp lại về thời gian hoặc không gian.',
    examples: [
      { jp: 'このバスは１５分おきに出発します。', vn: 'Chuyến xe buýt này cứ cách 15 phút lại xuất phát một chuyến.', furigana: 'この バス は じゅうごふん おき に しゅっぱつ します。' },
      { jp: '道路には５メートルおきに街灯が並んでいる。', vn: 'Trên đường, cứ cách 5 mét lại có một cột đèn đường.', furigana: 'どうろ に は ごメートル おき に がいとう が ならんでいる。' }
    ]
  },
  {
    id: 'n3_12',
    level: 'N3',
    title: '〜たびに',
    meaning: 'Mỗi lần... lại...',
    structure: 'Động từ thể từ điển / Danh từ + の + たびに',
    explanation: 'Mỗi khi có một sự việc A xảy ra thì việc B luôn luôn diễn ra theo cùng.',
    examples: [
      { jp: 'この曲を聴くたびに、故郷を思い出します。', vn: 'Mỗi lần nghe ca khúc này, tôi lại nhớ về quê hương.', furigana: 'この きょく を きく たび に、こきょう を おもいだします。' },
      { jp: '母は旅行のたびに、お土産をたくさん買ってきます。', vn: 'Mỗi lần đi du lịch mẹ tôi đều mua rất nhiều quà lưu niệm về.', furigana: 'はは は りょこう の たび に、おみやげ を たくさん かってきます。' }
    ]
  },
  {
    id: 'n3_13',
    level: 'N3',
    title: '〜ついでに',
    meaning: 'Nhân tiện... / Tiện thể...',
    structure: 'Động từ thể từ điển/thể た / Danh từ + の + ついでに',
    explanation: 'Tận dụng khi đang thực hiện việc chính A để kết hợp làm luôn việc phụ B.',
    examples: [
      { jp: '買い物のついでに、郵便局へ寄りました。', vn: 'Tiện thể đi mua sắm, tôi đã ghé vào bưu điện.', furigana: 'かいもの の ついで に、ゆうびんきょく へ よりました。' },
      { jp: 'コンビニへ行くなら、ついでにお茶を買ってきて。', vn: 'Nếu cậu đi cửa hàng tiện lợi thì tiện thể mua giúp chai trà nhé.', furigana: 'コンビニ へ いく なら、ついで に おちゃ を かってきて。' }
    ]
  },
  {
    id: 'n3_14',
    level: 'N3',
    title: '〜最中に',
    meaning: 'Đang giữa lúc... thì bất ngờ xảy ra chuyện',
    structure: 'Động từ thể ている / Danh từ + の + 最中に (さいちゅうに)',
    explanation: 'Một hành động bất ngờ xen ngang vào đúng lúc đang cao trào làm gián đoạn.',
    examples: [
      { jp: '食事の最中に電話がかかってきた。', vn: 'Đúng lúc đang ăn cơm thì điện thoại reo.', furigana: 'しょくじ の さいちゅう に でんわ が かかってきた。' },
      { jp: 'スピーチをしている最中に、マイクが壊れてしまった。', vn: 'Đang giữa lúc phát biểu thì mic bỗng nhiên bị hỏng.', furigana: 'スピーチ を している さいちゅう に、マイク が こわれて しまった。' }
    ]
  },
  {
    id: 'n3_15',
    level: 'N3',
    title: '〜うちに',
    meaning: 'Trong lúc còn... / Trong khi đang... thì biến chuyển',
    structure: 'Động từ thể từ điển/thể ない/thể ている / Tính từ / Danh từ + の + うちに',
    explanation: 'Tranh thủ làm việc gì trước khi điều kiện thay đổi, hoặc sự thay đổi diễn ra tự nhiên trong khoảng thời gian đó.',
    examples: [
      { jp: '温かいうちに召し上がってください。', vn: 'Xin mời dùng bữa trong lúc đồ ăn còn nóng.', furigana: 'あたたかい うち に めしあがってください。' },
      { jp: '本を読んでいるうちに、眠くなってしまった。', vn: 'Trong lúc đang đọc sách thì tôi buồn ngủ lúc nào không hay.', furigana: 'ほん を よんでいる うち に、ねむく なって しまった。' }
    ]
  },
  {
    id: 'n3_16',
    level: 'N3',
    title: '〜から〜にかけて',
    meaning: 'Từ... đến khoảng... (ước chừng)',
    structure: 'Danh từ 1 + から + Danh từ 2 + にかけて',
    explanation: 'Biểu thị khoảng thời gian hoặc không gian có ranh giới đầu cuối tương đối mờ nhạt, ước chừng.',
    examples: [
      { jp: '今夜から明日の朝にかけて大雨になるでしょう。', vn: 'Từ đêm nay đến khoảng sáng mai có khả năng sẽ có mưa to.', furigana: 'こんや から あした の あさ に かけて おおあめ に なる でしょう。' },
      { jp: '九州から四国にかけて台風が接近しています。', vn: 'Cơn bão đang tiếp cận vùng từ Kyushu tới Shikoku.', furigana: 'きゅうしゅう から しこく に かけて たいふう が せっきん しています。' }
    ]
  },
  {
    id: 'n3_17',
    level: 'N3',
    title: '〜において／における',
    meaning: 'Tại / Ở / Trong (thời điểm, địa điểm, lĩnh vực)',
    structure: 'Danh từ + において / における + Danh từ',
    explanation: 'Diễn đạt trang trọng tương đương trợ từ で, dùng nhiều trong văn viết và phát biểu.',
    examples: [
      { jp: '東京ドームにおいてコンサートが開催された。', vn: 'Buổi hòa nhạc đã được tổ chức tại Tokyo Dome.', furigana: 'とうきょう ドーム において コンサート が かいさい された。' },
      { jp: '現代社会におけるインターネットの役割は大きい。', vn: 'Vai trò của Internet trong xã hội hiện đại là vô cùng lớn.', furigana: 'げんだい しゃかい における インターネット の やくわり は おおきい。' }
    ]
  },
  {
    id: 'n3_18',
    level: 'N3',
    title: '〜に沿って',
    meaning: 'Dọc theo... / Men theo... / Tuân theo...',
    structure: 'Danh từ + に沿って (にそって) / に沿う + Danh từ',
    explanation: 'Hành động đi theo tuyến đường, bờ sông hoặc thực hiện bám sát theo kế hoạch, tiêu chuẩn.',
    examples: [
      { jp: '川に沿って散歩するのが好きです。', vn: 'Tôi thích đi dạo men theo bờ sông.', furigana: 'かわ に そって さんぽ する の が すき です。' },
      { jp: 'マニュアルに沿って作業を進めてください。', vn: 'Hãy tiến hành công việc tuân theo sách hướng dẫn.', furigana: 'マニュアル に そって さぎょう を すすめて ください。' }
    ]
  },
  {
    id: 'n3_19',
    level: 'N3',
    title: '〜に基づいて',
    meaning: 'Dựa trên... / Căn cứ vào...',
    structure: 'Danh từ + に基づいて (にもとづいて) / に基づく + Danh từ',
    explanation: 'Lấy dữ liệu, thực tế, pháp luật hoặc kinh nghiệm làm cơ sở vững chắc để hành động.',
    examples: [
      { jp: '実際のデータに基づいて計画を立てました。', vn: 'Tôi đã lập kế hoạch dựa trên dữ liệu thực tế.', furigana: 'じっさい の データ に もとづいて けいかく を たてました。' },
      { jp: '法律に基づいて正しく処理してください。', vn: 'Hãy xử lý đúng đắn căn cứ theo quy định của pháp luật.', furigana: 'ほうりつ に もとづいて ただしく しょり して ください。' }
    ]
  },
  {
    id: 'n3_20',
    level: 'N3',
    title: '〜のもとで／のもとに',
    meaning: 'Dưới sự hướng dẫn... / Dưới điều kiện...',
    structure: 'Danh từ + のもとで / のもとに',
    explanation: 'Dưới sự bao bọc, dạy dỗ của thầy cô, cha mẹ hoặc dưới một điều kiện danh nghĩa nào đó.',
    examples: [
      { jp: '厳しい指導のもとで練習に励んでいます。', vn: 'Chúng tôi đang nỗ lực luyện tập dưới sự chỉ dẫn nghiêm khắc.', furigana: 'きびしい しどう の もと で れんしゅう に はげんで います。' },
      { jp: '青空のもとでピクニックを楽しんだ。', vn: 'Chúng tôi đã tận hưởng buổi dã ngoại dưới bầu trời trong xanh.', furigana: 'あおぞら の もと で ピクニック を たのしんだ。' }
    ]
  },
  {
    id: 'n3_21',
    level: 'N3',
    title: '〜に応えて',
    meaning: 'Đáp lại... / Hưởng ứng...',
    structure: 'Danh từ + に応えて (にこたえて) / に応える + Danh từ',
    explanation: 'Hành động nhằm đáp ứng mong đợi, nguyện vọng, kỳ vọng của người khác.',
    examples: [
      { jp: 'ファンの期待に応えて、アンコール曲を歌った。', vn: 'Đáp lại sự kỳ vọng của người hâm mộ, ca sĩ đã hát bài hát encore.', furigana: 'ファン の きたい に こたえて、アンコール きょく を うたった。' },
      { jp: '市民の要望に応えて、新しい図書館が建てられた。', vn: 'Đáp ứng nguyện vọng của người dân, một thư viện mới đã được xây dựng.', furigana: 'しみん の ようぼう に こたえて、あたらしい としょかん が たてられた。' }
    ]
  },
  {
    id: 'n3_22',
    level: 'N3',
    title: '〜向けに／向きだ',
    meaning: 'Dành riêng cho... / Phù hợp với...',
    structure: 'Danh từ + 向け (むけ) / 向き (むき)',
    explanation: '向け là thiết kế chủ ý nhắm vào đối tượng đó; 向き là ngẫu nhiên có tính chất thích hợp.',
    examples: [
      { jp: 'この本は初心者向けに書かれています。', vn: 'Cuốn sách này được viết dành riêng cho người mới bắt đầu.', furigana: 'この ほん は しんしんしゃ むけ に かかれて います。' },
      { jp: 'この部屋は日当たりがいいので、植物を育てる向きだ。', vn: 'Phòng này nhiều ánh sáng nên rất phù hợp để trồng cây cảnh.', furigana: 'この へや は ひあたり が いい ので、しょくぶつ を そだてる むき だ。' }
    ]
  },
  {
    id: 'n3_23',
    level: 'N3',
    title: '〜わけだ',
    meaning: 'Thảo nào mà... / Đương nhiên là thế',
    structure: 'Thể thông thường (Naな/Nである) + わけだ',
    explanation: 'Hiểu ra nguyên nhân vì sao sự việc lại diễn ra như vậy ("À, hóa ra là như thế").',
    examples: [
      { jp: '気温が３５度もあるのか。暑いわけだ。', vn: 'Nhiệt độ tận 35 độ cơ à? Thảo nào mà nóng thế.', furigana: 'きおん が さんじゅうご ど も ある の か。あつい わけ だ。' },
      { jp: '彼は日本に５年も住んでいるから、日本語が上手なわけだ。', vn: 'Anh ấy sống ở Nhật tận 5 năm rồi, thảo nào giỏi tiếng Nhật thế.', furigana: 'かれ は にほん に ごねん も すんでいる から、にほんご が じょうず な わけ だ。' }
    ]
  },
  {
    id: 'n3_24',
    level: 'N3',
    title: '〜わけがない',
    meaning: 'Không có lý nào... / Tuyệt đối không thể...',
    structure: 'Thể thông thường (Naな/Nの) + わけがない',
    explanation: 'Khẳng định mạnh mẽ dựa trên lý lẽ logic rằng việc đó hoàn toàn không thể xảy ra.',
    examples: [
      { jp: '彼が嘘をつくわけがありません。', vn: 'Không có lý nào anh ấy lại nói dối đâu.', furigana: 'かれ が うそ を つく わけ が ありません。' },
      { jp: 'こんなに難しい試験に一日で合格できるわけがない。', vn: 'Một kỳ thi khó thế này thì không có lý nào đỗ chỉ trong một ngày học.', furigana: 'こんな に むずかしい しけん に いちにち で ごうかく できる わけ が ない。' }
    ]
  },
  {
    id: 'n3_25',
    level: 'N3',
    title: '〜わけではない',
    meaning: 'Không hẳn là... / Không nhất thiết là...',
    structure: 'Thể thông thường (Naな/Nの) + わけではない',
    explanation: 'Phủ định một phần, làm giảm tính khẳng định tuyệt đối để tránh hiểu lầm.',
    examples: [
      { jp: '嫌いなわけではないが、あまり食べたくない。', vn: 'Không hẳn là tôi ghét, nhưng tôi không muốn ăn lắm.', furigana: 'きらい な わけ ではない が、あまり たべたくない。' },
      { jp: '高いものが必ずしも良いわけではない。', vn: 'Đồ đắt tiền không hẳn lúc nào cũng là đồ tốt.', furigana: 'たかい もの が かならずしも よい わけ ではない。' }
    ]
  },
  {
    id: 'n3_26',
    level: 'N3',
    title: '〜わけにはいかない',
    meaning: 'Không thể (vì đạo đức, trách nhiệm, áp lực tâm lý)',
    structure: 'Động từ thể từ điển / thể ない + わけにはいかない',
    explanation: 'Về mặt khả năng thì làm được, nhưng do bổn phận hoặc lương tâm cấm cản nên không thể làm.',
    examples: [
      { jp: '明日は大事な試験があるので、休むわけにはいかない。', vn: 'Mai có bài thi quan trọng nên tôi không thể nghỉ được.', furigana: 'あした は だいじ な しけん が ある ので、やすむ わけ に は いかない。' },
      { jp: '約束したからには、行かないわけにはいかない。', vn: 'Một khi đã hứa rồi thì tôi không thể không đi.', furigana: 'やくそく した から に は、いかない わけ に は いかない。' }
    ]
  },
  {
    id: 'n3_27',
    level: 'N3',
    title: '〜どころではない',
    meaning: 'Không phải lúc... / Đâu có tâm trí đâu mà...',
    structure: 'Danh từ / Động từ thể từ điển/thể ている + どころではない',
    explanation: 'Tình thế quá bận rộn, căng thẳng khiến bản thân không thể thực hiện hành động kia.',
    examples: [
      { jp: '忙しくて、旅行どころではありません。', vn: 'Bận rộn quá chừng, lúc này không phải lúc nghĩ đến chuyện đi du lịch.', furigana: 'いそがしくて、りょこう どころ ではありません。' },
      { jp: '風邪で熱があって、勉強どころじゃないよ。', vn: 'Tôi đang bị sốt vì cảm cúm, tâm trí đâu mà học hành nữa chứ.', furigana: 'かぜ で ねつ が あって、べんきょう どころ じゃ ない よ。' }
    ]
  },
  {
    id: 'n3_28',
    level: 'N3',
    title: '〜ものだ',
    meaning: 'Là thứ hiển nhiên / Thường hay... (hoài niệm)',
    structure: 'Động từ thể từ điển / thể た + ものだ',
    explanation: 'Nói về chân lý quy luật tự nhiên, hoặc nhớ lại thói quen sâu sắc trong quá khứ.',
    examples: [
      { jp: '子供の頃はよくこの川で泳いだものだ。', vn: 'Hồi bé tôi thường hay bơi ở khúc sông này.', furigana: 'こども の ころ は よく この かわ で およいだ もの だ。' },
      { jp: '親はいつでも子供を心配するものだ。', vn: 'Cha mẹ thì lúc nào cũng lo lắng cho con cái, đó là lẽ tự nhiên.', furigana: 'おや は いつでも こども を しんぱい する もの だ。' }
    ]
  },
  {
    id: 'n3_29',
    level: 'N3',
    title: '〜ものではない',
    meaning: 'Không nên... / Đừng có... (lời khuyên đạo đức)',
    structure: 'Động từ thể từ điển + ものではない',
    explanation: 'Khuyên nhủ hoặc răn đe chuẩn mực xã hội không nên làm một điều gì đó.',
    examples: [
      { jp: '人の悪口を言うものではありません。', vn: 'Không nên nói xấu sau lưng người khác.', furigana: 'ひと の わるくち を いう もの ではありません。' },
      { jp: 'そんな失礼な態度は取るものではない。', vn: 'Không được tỏ thái độ thất lễ như vậy.', furigana: 'そんな しつれい な たいど は とる もの ではない。' }
    ]
  },
  {
    id: 'n3_30',
    level: 'N3',
    title: '〜ことにしている',
    meaning: 'Tự mình duy trì thói quen...',
    structure: 'Động từ thể từ điển / thể ない + ことにしている',
    explanation: 'Biểu thị một nguyên tắc, thói quen do chính bản thân tự giác quyết định và duy trì.',
    examples: [
      { jp: '健康のために、毎朝ジョギングすることにしている。', vn: 'Vì sức khỏe, tôi tự đặt thói quen chạy bộ mỗi buổi sáng.', furigana: 'けんこう の ため に、まいあさ ジョギング する こと に している。' },
      { jp: '夜遅くには甘いものを食べないことにしています。', vn: 'Tôi giữ thói quen không ăn đồ ngọt vào đêm muộn.', furigana: 'よる おそく に は あまい もの を たべない こと に しています。' }
    ]
  },
  {
    id: 'n3_31',
    level: 'N3',
    title: '〜ことになっている',
    meaning: 'Quy định là... / Được sắp đặt là...',
    structure: 'Động từ thể từ điển / thể ない + ことになっている',
    explanation: 'Quy tắc tổ chức, luật lệ, thỏa thuận hoặc lịch trình do tập thể ấn định mà cá nhân phải tuân theo.',
    examples: [
      { jp: '法律で二十歳未満はお酒を飲んではいけないことになっている。', vn: 'Theo luật thì người dưới 20 tuổi không được phép uống rượu.', furigana: 'ほうりつ で はたち みまん は おさけ を のんでは いけない こと に なっている。' },
      { jp: '来週の月曜日に社長と面談することになっています。', vn: 'Tôi đã có lịch hẹn phỏng vấn với giám đốc vào thứ Hai tuần tới.', furigana: 'らいしゅう の げつようび に しゃちょう と めんだん する こと に なっている。' }
    ]
  },
  {
    id: 'n3_32',
    level: 'N3',
    title: '〜ことはない',
    meaning: 'Không cần thiết phải...',
    structure: 'Động từ thể từ điển + ことはない',
    explanation: 'Đưa ra lời khuyên người nghe không cần phải quá lo lắng hay cố sức làm điều đó.',
    examples: [
      { jp: 'そんなに心配することはありませんよ。', vn: 'Cậu không cần phải lo lắng thái quá như vậy đâu.', furigana: 'そんな に しんぱい する こと は ありません よ。' },
      { jp: '時間はまだ十分あるから、急ぐことはない。', vn: 'Vẫn còn thừa thời gian nên không cần phải vội vã đâu.', furigana: 'じかん は まだ じゅうぶん ある から、いそぐ こと は ない。' }
    ]
  },
  {
    id: 'n3_33',
    level: 'N3',
    title: '〜たとたん',
    meaning: 'Vừa mới... thì ngay lập tức...',
    structure: 'Động từ thể た + とたん（に）',
    explanation: 'Hành động A vừa dứt thì biến cố B bất ngờ ập đến ngay sau đó, nằm ngoài dự liệu.',
    examples: [
      { jp: '窓を開けたとたん、冷たい風が入ってきた。', vn: 'Vừa mới mở cửa sổ ra thì ngay lập tức một luồng gió lạnh lùa vào.', furigana: 'まど を あけた とたん、つめたい かぜ が はいってきた。' },
      { jp: '薬を飲んだとたんに、痛みが消えました。', vn: 'Vừa uống viên thuốc xong thì cơn đau lập tức biến mất.', furigana: 'くすり を のんだ とたん に、いたみ が きえました。' }
    ]
  },
  {
    id: 'n3_34',
    level: 'N3',
    title: '〜たきり',
    meaning: 'Kể từ sau khi... thì bặt vô âm tín / mãi chưa...',
    structure: 'Động từ thể た + きり',
    explanation: 'Sau một hành động ban đầu, trạng thái không hề thay đổi hoặc không có hành động tiếp diễn nào sau đó.',
    examples: [
      { jp: '彼は「ちょっと出かける」と言ったきり、帰ってこない。', vn: 'Anh ấy chỉ nói "ra ngoài chút" rồi từ đó đến giờ mãi chưa thấy về.', furigana: 'かれ は 「ちょっと でかける」 と いった きり、かえってこない。' },
      { jp: '一度会ったきり、その後連絡を取っていない。', vn: 'Kể từ sau một lần gặp gỡ đó, tôi bặt tin tức không liên lạc gì nữa.', furigana: 'いちど あった きり、その ご れんらく を とっていない。' }
    ]
  },
  {
    id: 'n3_35',
    level: 'N3',
    title: '〜ふりをする',
    meaning: 'Giả vờ như...',
    structure: 'Thể thông thường (Naな/Nの) + ふりをする',
    explanation: 'Cố tình biểu hiện cử chỉ, hành vi bề ngoài khác hẳn với bản chất hoặc sự thật bên trong.',
    examples: [
      { jp: '聞こえないふりをして、通り過ぎた。', vn: 'Tôi giả vờ như không nghe thấy rồi bước qua luôn.', furigana: 'きこえない ふり を して、とおりすぎた。' },
      { jp: '彼女は知っているのに、知らないふりをした。', vn: 'Cô ấy biết rõ mười mươi nhưng lại giả vờ như không biết gì.', furigana: 'かのじょ は しっている のに、しらない ふり を した。' }
    ]
  },
  {
    id: 'n3_36',
    level: 'N3',
    title: '〜っぽい',
    meaning: 'Có vẻ... / Hơi có tính chất...',
    structure: 'Danh từ / Động từ thể ます (bỏ ます) / Tính từ い (bỏ い) + っぽい',
    explanation: 'Mang đặc tính, khuynh hướng thiên về một trạng thái nào đó (thường mang sắc thái tiêu cực nhẹ).',
    examples: [
      { jp: 'あの人は怒りっぽい性格です。', vn: 'Người đó tính tình rất dễ nổi nóng.', furigana: 'あの ひと は おこりっぽい せいかく です。' },
      { jp: 'このスープは少し水っぽいですね。', vn: 'Món súp này hơi có vẻ loãng nhờ nhờ như nước nhỉ.', furigana: 'この スープ は すこし みずっぽい です ね。' }
    ]
  },
  {
    id: 'n3_37',
    level: 'N3',
    title: '〜気味',
    meaning: 'Có cảm giác hơi... / Có triệu chứng...',
    structure: 'Danh từ / Động từ thể ます (bỏ ます) + 気味 (ぎみ)',
    explanation: 'Chỉ trạng thái có một chút biểu hiện, dấu hiệu không tốt (ốm sốt, căng thẳng).',
    examples: [
      { jp: '風邪気味なので、今夜は早く寝ます。', vn: 'Tôi cảm giác hơi có dấu hiệu cảm cúm nên tối nay sẽ đi ngủ sớm.', furigana: 'かぜぎみ なので、こんや は はやく ねます。' },
      { jp: '最近、仕事が忙しくて寝不足気味だ。', vn: 'Dạo này công việc bận rộn nên tôi hơi có cảm giác thiếu ngủ.', furigana: 'さいきん、しごと が いそがしくて ねぶそくぎみ だ。' }
    ]
  },
  {
    id: 'n3_38',
    level: 'N3',
    title: '〜がち',
    meaning: 'Thường hay... / Dễ có xu hướng... (xấu)',
    structure: 'Danh từ / Động từ thể ます (bỏ ます) + がち',
    explanation: 'Diễn tả tần suất thường xuyên xảy ra một hiện tượng tiêu cực hoặc tật xấu.',
    examples: [
      { jp: '冬は風邪を引きがちです。', vn: 'Mùa đông người ta thường hay bị cảm lạnh.', furigana: 'ふゆ は かぜ を ひきがち です。' },
      { jp: '一人暮らしの若者は野菜が不足しがちだ。', vn: 'Thanh niên sống một mình thường hay bị thiếu rau củ.', furigana: 'ひとりぐらし の わかもの は やさい が ふそく しがち だ。' }
    ]
  },
  {
    id: 'n3_39',
    level: 'N3',
    title: '〜だらけ',
    meaning: 'Toàn là... / Đầy rẫy...',
    structure: 'Danh từ + だらけ',
    explanation: 'Bao phủ khắp bề mặt hoặc ngập tràn toàn những thứ bẩn thỉu, lỗi lầm, khó chịu.',
    examples: [
      { jp: 'この作文は間違いだらけです。', vn: 'Bài văn này đầy rẫy lỗi sai.', furigana: 'この さくぶん は まちがい だらけ です。' },
      { jp: '雨の中を走ったので、泥だらけになった。', vn: 'Vì chạy trong mưa nên người tôi dính đầy bùn đất.', furigana: 'あめ の なか を はしった ので、どろ だらけ に なった。' }
    ]
  },
  {
    id: 'n3_40',
    level: 'N3',
    title: '〜きれない',
    meaning: 'Không thể hết được / Quá nhiều không xuể',
    structure: 'Động từ thể ます (bỏ ます) + きれない',
    explanation: 'Số lượng quá nhiều hoặc mức độ quá lớn khiến không thể hoàn thành trọn vẹn tới cùng.',
    examples: [
      { jp: '料理が多すぎて、全部は食べきれません。', vn: 'Món ăn nhiều quá, tôi không thể nào ăn hết được.', furigana: 'りょうり が おおすぎて、ぜんぶ は たべきれません。' },
      { jp: '数えきれないほどの星が夜空に輝いている。', vn: 'Vô số vì sao không thể đếm xuể đang tỏa sáng trên bầu trời đêm.', furigana: 'かぞえきれない ほど の ほし が よぞら に かがやいている。' }
    ]
  },
  {
    id: 'n3_41',
    level: 'N3',
    title: '〜抜く',
    meaning: 'Làm đến cùng / Kiên trì vượt qua gian khổ',
    structure: 'Động từ thể ます (bỏ ます) + 抜く (ぬく)',
    explanation: 'Nỗ lực phi thường vượt qua muôn vàn trắc trở để hoàn tất hành động.',
    examples: [
      { jp: '最後までフルマラソンを走り抜いた。', vn: 'Tôi đã kiên trì chạy đến cùng hết chặng full marathon.', furigana: 'さいご まで フルマラソン を はしりぬいた。' },
      { jp: '悩み抜いて、会社を辞める決心をした。', vn: 'Sau khi trăn trở suy nghĩ đến cùng, tôi đã quyết định nghỉ việc.', furigana: 'なやみぬいて、かいしゃ を やめる けっしん を した。' }
    ]
  },
  {
    id: 'n3_42',
    level: 'N3',
    title: '〜かけ／かける',
    meaning: 'Đang dở dang... / Chưa xong',
    structure: 'Động từ thể ます (bỏ ます) + かけ / かける',
    explanation: 'Hành động đang diễn ra giữa chừng thì dừng lại, chưa hoàn tất trọn vẹn.',
    examples: [
      { jp: 'テーブルの上に飲みかけのコーヒーがある。', vn: 'Trên bàn có cốc cà phê đang uống dở.', furigana: 'テーブル の うえ に のみかけ の コーヒー が ある。' },
      { jp: '手紙を書きかけたまま、出かけてしまった。', vn: 'Tôi bỏ dở bức thư đang viết dở mà đi ra ngoài.', furigana: 'てがみ を かきかけた まま、でかけて しまった。' }
    ]
  },
  {
    id: 'n3_43',
    level: 'N3',
    title: '〜さえ',
    meaning: 'Thậm chí... / Ngay cả...',
    structure: 'Danh từ + さえ',
    explanation: 'Lấy ra một trường hợp cực đoan điển hình nhất để ngụ ý các trường hợp khác cũng như vậy.',
    examples: [
      { jp: 'ひらがなさえ読めないのに、漢字は無理です。', vn: 'Ngay cả hiragana còn chưa đọc được thì chữ Hán là bất khả thi.', furigana: 'ひらがな さえ よめない のに、かんじ は むり です。' },
      { jp: '忙しすぎて、昼ご飯を食べる時間さえなかった。', vn: 'Tôi bận đến mức thậm chí còn chẳng có thời gian ăn bữa trưa.', furigana: 'いそがしすぎて、ひるごはん を たべる じかん さえ なかった。' }
    ]
  },
  {
    id: 'n3_44',
    level: 'N3',
    title: '〜さえ〜ば',
    meaning: 'Chỉ cần... là đủ',
    structure: 'Danh từ + さえ + Động từ thể điều kiện (ば)',
    explanation: 'Nhấn mạnh điều kiện tối thiểu duy nhất, nếu đạt được điều đó thì mọi chuyện đều ổn thỏa.',
    examples: [
      { jp: '薬を飲みさえすれば、すぐに治りますよ。', vn: 'Chỉ cần uống thuốc là cậu sẽ khỏi ngay thôi.', furigana: 'くすり を のみ さえ すれば、すぐ に なおります よ。' },
      { jp: 'お金さえあれば何でも買えるというわけではない。', vn: 'Không hẳn là chỉ cần có tiền thì thứ gì cũng mua được.', furigana: 'おかね さえ あれば なんでも かえる という わけ ではない。' }
    ]
  },
  {
    id: 'n3_45',
    level: 'N3',
    title: '〜こそ',
    meaning: 'Chính là... (nhấn mạnh cao độ)',
    structure: 'Danh từ + こそ / Động từ thể て + こそ',
    explanation: 'Dùng để nhấn mạnh dứt khoát vào một đối tượng hoặc lý do cụ thể.',
    examples: [
      { jp: '今年こそ絶対にJLPTに合格してみせる。', vn: 'Chính năm nay tôi nhất định sẽ đỗ JLPT cho xem.', furigana: 'ことし こそ ぜったい に JLPT に ごうかく してみせる。' },
      { jp: 'こちらこそ、どうぞよろしくお願いします。', vn: 'Chính tôi mới là người phải nhờ cậy sự giúp đỡ của quý vị.', furigana: 'こちら こそ、どうぞ よろしく おねがいします。' }
    ]
  },
  {
    id: 'n3_46',
    level: 'N3',
    title: '〜なんか／なんて',
    meaning: 'Mấy thứ như là... / Cỡ như... (hạ thấp, coi nhẹ)',
    structure: 'Danh từ / Động từ thể từ điển + なんか / なんて',
    explanation: 'Biểu thị sự coi nhẹ, khiêm tốn hoặc ngạc nhiên trước một sự việc bất ngờ.',
    examples: [
      { jp: 'お化けなんか怖くないよ。', vn: 'Mấy thứ như ma quỷ tớ chẳng sợ đâu.', furigana: 'おばけ なんか こわくない よ。' },
      { jp: '彼が結婚するなんて信じられない。', vn: 'Cái chuyện cậu ấy lấy vợ quả thật không thể tin nổi.', furigana: 'かれ が けっこん する なんて しんじられない。' }
    ]
  },
  {
    id: 'n3_47',
    level: 'N3',
    title: '〜おかげで',
    meaning: 'Nhờ có... (kết quả tích cực)',
    structure: 'Thể thông thường (Naな/Nの) + おかげで',
    explanation: 'Bày tỏ lòng biết ơn đối với sự giúp đỡ hoặc nguyên nhân dẫn tới thành quả tốt đẹp.',
    examples: [
      { jp: '先生のおかげで、試験に合格できました。', vn: 'Nhờ có thầy cô mà em đã thi đỗ kỳ thi.', furigana: 'せんせい の おかげ で、しけん に ごうかく できました。' },
      { jp: '薬を飲んだおかげで、熱が下がった。', vn: 'Nhờ uống thuốc mà cơn sốt đã hạ.', furigana: 'くすり を のんだ おかげ で、ねつ が さがった。' }
    ]
  },
  {
    id: 'n3_48',
    level: 'N3',
    title: '〜せいで',
    meaning: 'Do... / Tại vì... (kết quả tiêu cực)',
    structure: 'Thể thông thường (Naな/Nの) + せいで / せいだ',
    explanation: 'Đổ lỗi, quy trách nhiệm cho một nguyên nhân nào đó gây ra hậu quả xấu xí.',
    examples: [
      { jp: '夜更かしをしたせいで、今朝寝坊してしまった。', vn: 'Tại vì thức khuya nên sáng nay tôi đã ngủ quên.', furigana: 'よふかし を した せい で、けさ ねぼう して しまった。' },
      { jp: '雨のせいで、サッカーの試合が中止になった。', vn: 'Do trời mưa nên trận đấu bóng đá đã bị hủy.', furigana: 'あめ の せい で、サッカー の しあい が ちゅうし に なった。' }
    ]
  },
  {
    id: 'n3_49',
    level: 'N3',
    title: '〜とおりに／どおりに',
    meaning: 'Đúng theo như...',
    structure: 'Động từ thể từ điển/thể た / Danh từ + どおりに / のとおりに',
    explanation: 'Hành động mô phỏng hoặc tuân thủ chính xác theo những gì nhìn thấy, nghe thấy hoặc kế hoạch đã định.',
    examples: [
      { jp: 'レシピのとおりに料理を作ったら、美味しくできた。', vn: 'Làm đúng theo sách công thức thì món ăn ra rất ngon.', furigana: 'レシピ の とおり に りょうり を つくったら、おいしく できた。' },
      { jp: '計画どおりに工事が進んでいます。', vn: 'Công trình đang tiến triển đúng theo như kế hoạch.', furigana: 'けいかく どおり に こうじ が すすんで います。' }
    ]
  },
  {
    id: 'n3_50',
    level: 'N3',
    title: '〜一方だ',
    meaning: 'Càng ngày càng có chiều hướng... (một chiều)',
    structure: 'Động từ thể từ điển + 一方だ (いっぽうだ)',
    explanation: 'Diễn tả một sự biến đổi đang tiếp tục diễn ra không ngừng theo một chiều hướng (thường là xấu đi).',
    examples: [
      { jp: '物価は上がる一方だ。', vn: 'Giá cả hàng hóa thì càng ngày càng leo thang một chiều.', furigana: 'ぶっか は あがる いっぽう だ。' },
      { jp: '祖父の病状は悪化する一方です。', vn: 'Bệnh tình của ông tôi cứ ngày một chuyển biến xấu đi.', furigana: 'そふ の びょうじょう は あっか する いっぽう です。' }
    ]
  }
];
