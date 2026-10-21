// Dữ liệu 50 mẫu ngữ pháp JLPT N1 thượng đỉnh chuẩn quốc tế đầy đủ phiên âm furigana và giải nghĩa chi tiết
module.exports = [
  {
    id: 'n1_1',
    level: 'N1',
    title: '〜であれ〜であれ',
    meaning: 'Dù là... hay là... (không phân biệt)',
    structure: 'Danh từ 1 + であれ + Danh từ 2 + であれ',
    explanation: 'Dù rơi vào trường hợp nào đi chăng nữa thì kết quả hay quy tắc vẫn áp dụng bình đẳng tuyệt đối.',
    examples: [
      { jp: '理由が何であれ、暴力を振るうことは許されない。', vn: 'Dù lý do có là gì đi nữa, hành vi bạo lực là không thể tha thứ.', furigana: 'りゆう が なん であれ、ぼうりょく を ふるう こと は ゆるされない。' },
      { jp: '大人であれ子供であれ、ルールは守らなければならない。', vn: 'Dù là người lớn hay trẻ nhỏ thì đều phải tuân thủ luật lệ.', furigana: 'おとな であれ こども であれ、ルール は まもらなければ ならない。' }
    ]
  },
  {
    id: 'n1_2',
    level: 'N1',
    title: '〜とあって',
    meaning: 'Chính vì hoàn cảnh đặc biệt đó nên...',
    structure: 'Thể thông thường (Na/N) + とあって',
    explanation: 'Bởi vì rơi vào một thời điểm, sự kiện đặc biệt hiếm có nên dẫn tới kết quả tất yếu tương ứng.',
    examples: [
      { jp: '人気アイドルのコンサートとあって、会場は満員だった。', vn: 'Chính vì là concert của thần tượng đình đám nên khán phòng chật kín không còn chỗ trống.', furigana: 'にんき アイドル の コンサート と あって、かいじょう は まんいん だった。' },
      { jp: '連休初日とあって、高速道路は大渋滞している。', vn: 'Đúng ngày đầu tiên của kỳ nghỉ lễ nên đường cao tốc tắc nghẽn nghiêm trọng.', furigana: 'れんきゅう しょにち と あって、こうそくどうろ は だいじゅうたい して いる。' }
    ]
  },
  {
    id: 'n1_3',
    level: 'N1',
    title: '〜とあれば',
    meaning: 'Nếu quả thực vì... thì sẵn lòng làm tất cả',
    structure: 'Thể thông thường (Na/N) + とあれば',
    explanation: 'Nếu rơi vào điều kiện hay yêu cầu cấp bách đó thì người nói sẵn sàng chấp nhận mọi gian khó để thực hiện.',
    examples: [
      { jp: '子供のためとあれば、どんな苦労もいとわない。', vn: 'Nếu là vì tương lai của con cái thì bất kể gian khổ nhường nào tôi cũng cam lòng.', furigana: 'こども の ため と あれば、どんな くろう も いとわない。' },
      { jp: '大統領の頼みとあれば、断るわけにはいかない。', vn: 'Nếu quả là lời nhờ cậy của Tổng thống thì không thể nào chối từ.', furigana: 'だいとうりょう の たのみ と あれば、ことわる わけ に は いかない。' }
    ]
  },
  {
    id: 'n1_4',
    level: 'N1',
    title: '〜ならでは／ならではの',
    meaning: 'Chỉ có ở... mới có được (Đặc quyền độc nhất)',
    structure: 'Danh từ + ならでは / ならではの + Danh từ',
    explanation: 'Đánh giá cao phẩm chất đặc thù độc nhất vô nhị mà chỉ riêng chủ thể đó mới sở hữu nổi.',
    examples: [
      { jp: 'これは京都ならではの伝統的なお菓子です。', vn: 'Đây là món bánh truyền thống mà chỉ có ở Kyoto mới thưởng thức được.', furigana: 'これ は きょうと ならでは の でんとうてき な おかし です。' },
      { jp: '一流のプロならではの素晴らしい技術に感動した。', vn: 'Tôi vô cùng xúc động trước kỹ nghệ tuyệt hảo chỉ có ở bậc thầy chuyên nghiệp đỉnh cao.', furigana: 'いちりゅう の プロ ならでは の すばらしい ぎじゅつ に かんどう した。' }
    ]
  },
  {
    id: 'n1_5',
    level: 'N1',
    title: '〜たるもの',
    meaning: 'Đã ở cương vị... thì phải xứng đáng với tư cách',
    structure: 'Danh từ (chỉ thân phận, chức vị xã hội) + たるもの',
    explanation: 'Nhắc nhở người đang nắm giữ một cương vị cao quý (bác sĩ, lãnh đạo, thầy giáo) phải có phong thái và trách nhiệm tương xứng.',
    examples: [
      { jp: '医者たるもの、患者の命を最優先に考えるべきだ。', vn: 'Đã là một người thầy thuốc thì phải đặt sinh mạng bệnh nhân lên ưu tiên hàng đầu.', furigana: 'いしゃ たる もの、かんじゃ の いのち を さいゆうせん に かんがえる べき だ。' },
      { jp: '国の指導者たる者は、私利私欲を捨てなければならない。', vn: 'Người ở cương vị lãnh đạo quốc gia thì phải biết gạt bỏ tư lợi cá nhân.', furigana: 'くに の しどうしゃ たる もの は、しりしよく を すてなければ ならない。' }
    ]
  },
  {
    id: 'n1_6',
    level: 'N1',
    title: '〜に至る／に至るまで',
    meaning: 'Đạt đến mức độ... / Trải dài cho tới tận...',
    structure: 'Danh từ / Động từ thể từ điển + に至る（にいたる） / に至るまで',
    explanation: 'Chỉ một tiến trình phát triển đạt đến quy mô đỉnh điểm, hoặc liệt kê chi tiết tới tận từng chân tơ kẽ tóc.',
    examples: [
      { jp: '服装から髪型に至るまで、校則で厳しく定められている。', vn: 'Từ trang phục cho đến tận kiểu tóc đều bị nội quy nhà trường siết chặt nghiêm ngặt.', furigana: 'ふくそう から かみがた に いたる まで、こうそく で きびしく さだめられて いる。' },
      { jp: '事態がここに至っては、警察に通報するしかない。', vn: 'Tình thế đã rơi vào bước đường cùng này rồi thì chỉ còn nước báo cảnh sát.', furigana: 'じたい が ここ に いたっては、けいさつ に つうほう する しか ない。' }
    ]
  },
  {
    id: 'n1_7',
    level: 'N1',
    title: '〜極まる／極まりない',
    meaning: 'Vô cùng... / Tột cùng (Bất bình, nguy hiểm)',
    structure: 'Tính từ な (bỏ な) + 極まる（きわまる） / 極まりない（きわまりない）',
    explanation: 'Nhấn mạnh một trạng thái tiêu cực đã chạm tới giới hạn tột cùng (vô lễ, nguy hiểm, thô thiển).',
    examples: [
      { jp: 'あのような不誠実な態度は、失礼極まりない。', vn: 'Thái độ vô trách nhiệm kiểu đó quả thật là thất lễ đến tột cùng.', furigana: 'あの ような ふせいじつ な たいど は、しつれい きわまりない。' },
      { jp: '命綱なしで高所に登るとは、危険極まる行為だ。', vn: 'Trèo lên nơi cao chót vót mà không có dây an toàn là một hành vi nguy hiểm tột độ.', furigana: 'いのちづな なし で こうしょ に のぼる と は、きけん きわまる こうい だ。' }
    ]
  },
  {
    id: 'n1_8',
    level: 'N1',
    title: '〜ごとき／ごとく',
    meaning: 'Như là... / Tựa như... (Văn viết cổ kính)',
    structure: 'Danh từ + の / Động từ thể từ điển/thể た + ごとき / ごとく',
    explanation: 'Cách so sánh ẩn dụ thi vị mang đậm phong vị cổ điển, tương đương với ような / ように.',
    examples: [
      { jp: '光陰矢のごとし。時間はあっという間に過ぎ去る。', vn: 'Thời gian thoăn thoắt tựa bóng câu qua cửa sổ, trôi qua trong chớp mắt.', furigana: 'こういん や の ごとし。じかん は あっというま に すぎさる。' },
      { jp: '私のごとき未熟者に、そのような大役は務まりません。', vn: 'Một kẻ non nớt kém cỏi như tôi thì khó lòng gánh vác nổi trọng trách to lớn ấy.', furigana: 'わたし の ごとき みじゅくもの に、その ような たいやく は つとまりません。' }
    ]
  },
  {
    id: 'n1_9',
    level: 'N1',
    title: '〜ずくめ',
    meaning: 'Toàn là... ngập tràn (Hạnh phúc hoặc toàn màu sắc)',
    structure: 'Danh từ + ずくめ',
    explanation: 'Chỉ sự việc ngập tràn toàn những điều cùng một màu sắc, tính chất (vui mừng hoặc bao trùm toàn đen).',
    examples: [
      { jp: '昇進して赤ちゃんも生まれ、今年はいいことずくめの一年だった。', vn: 'Vừa thăng chức lại vừa đón con chào đời, năm nay quả là một năm tràn ngập niềm vui.', furigana: 'しょうしん して あかちゃん も うまれ、ことし は いい こと ずくめ の いちねん だった。' },
      { jp: '彼女は黒ずくめの服を着て現れた。', vn: 'Cô ấy xuất hiện trong một bộ trang phục đen tuyền từ đầu đến chân.', furigana: 'かのじょ は くろずくめ の ふく を きて あらわれた。' }
    ]
  },
  {
    id: 'n1_10',
    level: 'N1',
    title: '〜まみれ',
    meaning: 'Bám dính đầy... (chất dơ bẩn, tiêu cực)',
    structure: 'Danh từ + まみれ',
    explanation: 'Khắp toàn bộ bề mặt cơ thể hoặc vật thể bị bao bọc nhơ nhớp bởi máu, bùn, bụi, mồ hôi hoặc nợ nần.',
    examples: [
      { jp: '子供たちが泥まみれになってサッカーをしている。', vn: 'Lũ trẻ đang đá bóng với người lấm lem đầy bùn đất.', furigana: 'こどもたち が どろまみれ に なって サッカー を して いる。' },
      { jp: '会社が倒産し、彼は借金まみれの生活を送っている。', vn: 'Công ty phá sản, anh ấy đang phải sống trong chuỗi ngày nợ nần bủa vây ngập đầu.', furigana: 'かいしゃ が とうさん し、かれ は しゃっきんまみれ の せいかつ を おくって いる。' }
    ]
  },
  {
    id: 'n1_11',
    level: 'N1',
    title: '〜きらいがある',
    meaning: 'Có khuynh hướng... (thói quen, tật xấu đáng lo ngại)',
    structure: 'Động từ thể từ điển/thể ない / Danh từ + の + きらいがある',
    explanation: 'Phê bình một tính cách tiêu cực hoặc khuynh hướng xấu lặp đi lặp lại ở một người hay tổ chức.',
    examples: [
      { jp: '彼は物事を一人で抱え込みすぎるきらいがある。', vn: 'Anh ấy có tật xấu là việc gì cũng hay ôm đồm một mình quá mức.', furigana: 'かれ は ものごと を ひとり で かかえこみすぎる きらい が ある。' },
      { jp: '若者は何でもネットの情報を鵜呑みにするきらいがある。', vn: 'Giới trẻ hiện nay có chiều hướng hay tin sái cổ mọi thông tin trên mạng.', furigana: 'わかもの は なんでも ネット の じょうほう を うのみ に する きらい が ある。' }
    ]
  },
  {
    id: 'n1_12',
    level: 'N1',
    title: '〜を皮切りに',
    meaning: 'Khởi đầu với... rồi liên tiếp lan rộng bùng nổ',
    structure: 'Danh từ + を皮切りに（をかわきりに） / を皮切りにして',
    explanation: 'Hành động mở màn đầu tiên châm ngòi cho một chuỗi các sự kiện cùng loại bùng nổ liên tiếp.',
    examples: [
      { jp: '東京公演を皮切りに、全国１０都市でツアーが開催される。', vn: 'Mở màn bằng đêm diễn ở Tokyo, chuyến lưu diễn sẽ lan rộng khắp 10 thành phố cả nước.', furigana: 'とうきょう こうえん を かわきり に、ぜんこく じゅっとし で ツアー が かいさい される。' },
      { jp: 'あの投手の好投を皮切りにして、チームの連勝が始まった。', vn: 'Bắt đầu từ màn ném bóng xuất sắc của cầu thủ đó, chuỗi trận toàn thắng của đội bắt đầu.', furigana: 'あの とうしゅ の こうとう を かわきり に して、チーム の れんしょう が はじまった。' }
    ]
  },
  {
    id: 'n1_13',
    level: 'N1',
    title: '〜をもって',
    meaning: 'Bằng... / Lấy thời điểm... làm mốc kết thúc',
    structure: 'Danh từ + をもって',
    explanation: 'Dùng trong thông báo chính thức để ấn định thời khắc kết thúc, hoặc phương thức tiến hành trang trọng.',
    examples: [
      { jp: '本日をもって、当店は閉店させていただきます。', vn: 'Kể từ ngày hôm nay, cửa hàng chúng tôi xin phép được chính thức đóng cửa.', furigana: 'ほんじつ を もって、とうてん は へいてん させていただきます。' },
      { jp: '持ち前の熱意をもって、困難を乗り越えた。', vn: 'Bằng chính nhiệt huyết vốn có, anh ấy đã vượt qua mọi khó khăn.', furigana: 'もちまえ の ねつい を もって、こんなん を のりこえた。' }
    ]
  },
  {
    id: 'n1_14',
    level: 'N1',
    title: '〜を限りに',
    meaning: 'Kể từ thời điểm này trở đi sẽ chấm dứt hẳn...',
    structure: 'Danh từ (thời gian) + を限りに（おかぎりに）',
    explanation: 'Tuyên bố dứt khoát chấm dứt một thói quen hoặc hoạt động kéo dài bấy lâu nay.',
    examples: [
      { jp: '今日を限りに、タバコをやめることに決めた。', vn: 'Chấm dứt kể từ ngày hôm nay, tôi quyết định sẽ bỏ hẳn thuốc lá.', furigana: 'きょう を かぎり に、タバコ を やめる こと に きめた。' },
      { jp: '今シーズンを限りに現役を引退することを表明した。', vn: 'Anh ấy đã tuyên bố sẽ chính thức giải nghệ sau mùa giải này.', furigana: 'こん シーズン を かぎり に げんえき を いんたい する こと を ひょうめい した。' }
    ]
  },
  {
    id: 'n1_15',
    level: 'N1',
    title: '〜をおいて〜ない',
    meaning: 'Ngoài đối tượng này ra thì không một ai khác có thể...',
    structure: 'Danh từ + をおいて〜ない',
    explanation: 'Tán dương đối tượng đó là lựa chọn duy nhất hoàn hảo, không có bất kỳ ai sánh bằng.',
    examples: [
      { jp: 'この難役を演じられる俳優は、彼をおいて他にはいない。', vn: 'Diễn viên có thể đảm nhận vai diễn gai góc này thì ngoài anh ấy ra chẳng còn ai khác.', furigana: 'この なんやく を えんじられる はいゆう は、かれ を おいて ほか に は いない。' },
      { jp: 'リーダーに適任な人物は、彼女をおいて考えられない。', vn: 'Người xứng đáng làm thủ lĩnh thì ngoài cô ấy ra tôi không thể nghĩ tới ai khác.', furigana: 'リーダー に てきにん な じんぶつ は、かのじょ を おいて かんがえられない。' }
    ]
  },
  {
    id: 'n1_16',
    level: 'N1',
    title: '〜をよそに',
    meaning: 'Mặc kệ... / Bỏ ngoài tai sự lo lắng, phản đối',
    structure: 'Danh từ + をよそに',
    explanation: 'Bất chấp dư luận, sự can ngăn hoặc ánh nhìn lo âu của người xung quanh để khăng khăng hành động.',
    examples: [
      { jp: '親の心配をよそに、息子は夜遅くまで遊び歩いている。', vn: 'Bỏ ngoài tai sự lo lắng thắt lòng của cha mẹ, đứa con trai vẫn đi chơi đàn đúm thâu đêm.', furigana: 'おや の しんぱい を よそに、むすこ は よる おそく まで あそびあるいて いる。' },
      { jp: '周囲の反対をよそに、二人は結婚を決行した。', vn: 'Mặc kệ sự phản đối quyết liệt của mọi người xung quanh, hai người vẫn tiến hành hôn lễ.', furigana: 'しゅうい の はんたい を よそに、ふたり は けっこん を けっこう した。' }
    ]
  },
  {
    id: 'n1_17',
    level: 'N1',
    title: '〜をものともせずに',
    meaning: 'Bất chấp hiểm nguy, gian lao... (Khí phách hiên ngang)',
    structure: 'Danh từ + をものともせずに',
    explanation: 'Ca ngợi lòng dũng cảm kiên cường không chịu lùi bước trước bão táp, bệnh tật hay gian khổ.',
    examples: [
      { jp: '消防士たちは猛烈な炎をものともせずに、救助活動を続けた。', vn: 'Những người lính cứu hỏa bất chấp ngọn lửa bùng cháy dữ dội, vẫn kiên cường cứu người.', furigana: 'しょうぼうしたち は もうれつ な ほのお を ものともせずに、きゅうじょ かつどう を つづけた。' },
      { jp: '彼は重い障害をものともせずに、世界記録を樹立した。', vn: 'Vượt qua khiếm khuyết nặng nề của thân thể, anh ấy đã xác lập kỷ lục thế giới.', furigana: 'かれ は おもい しょうがい を ものともせずに、せかい きろく を じゅりつ した。' }
    ]
  },
  {
    id: 'n1_18',
    level: 'N1',
    title: '〜なくしては／なしには',
    meaning: 'Nếu không có... thì tuyệt đối không thể thành công',
    structure: 'Danh từ + なくしては / なしには + ...ない',
    explanation: 'Khẳng định yếu tố trước là điều kiện tiên quyết cốt tử, thiếu nó thì vế sau hoàn toàn bất khả thi.',
    examples: [
      { jp: '皆様のご協力なくしては、この成功はあり得ませんでした。', vn: 'Nếu không có sự chung tay của quý vị thì thành công này tuyệt đối không thể có được.', furigana: 'みなさま の ごきょうりょく なくして は、この せいこう は ありえません でした。' },
      { jp: '不断の努力なしには、夢を実現することはできない。', vn: 'Nếu thiếu vắng sự nỗ lực không ngừng nghỉ thì không thể nào biến giấc mơ thành hiện thực.', furigana: 'ふだん の どりょく なし に は、ゆめ を じつげん する こと は できない。' }
    ]
  },
  {
    id: 'n1_19',
    level: 'N1',
    title: '〜ばこそ',
    meaning: 'Chính vì... nên mới dám làm thế',
    structure: 'Động từ thể điều kiện (ば) + こそ / Danh từ + であればこそ',
    explanation: 'Nhấn mạnh lý do sâu xa cao đẹp ẩn giấu đằng sau hành động nhìn có vẻ khắt khe bên ngoài.',
    examples: [
      { jp: '愛していればこそ、あえて厳しく叱るのです。', vn: 'Chính vì yêu thương con nên tôi mới nghiêm khắc răn dạy như vậy.', furigana: 'あいして いれば こそ、あえて きびしく しかる の です。' },
      { jp: '健康であればこそ、毎日仕事に打ち込むことができる。', vn: 'Chính vì có được sức khỏe dồi dào nên tôi mới có thể cống hiến hết mình cho công việc.', furigana: 'けんこう で あれば こそ、まいにち しごと に うちこむ こと が できる。' }
    ]
  },
  {
    id: 'n1_20',
    level: 'N1',
    title: '〜あっての',
    meaning: 'Chính nhờ có sự tồn tại của... thì mới có...',
    structure: 'Danh từ 1 + あっての + Danh từ 2',
    explanation: 'Nhấn mạnh Danh từ 1 là nền tảng sống còn, nếu không có nó thì Danh từ 2 hoàn toàn vô nghĩa.',
    examples: [
      { jp: 'お客様あっての我が社です。感謝の気持ちを忘れてはならない。', vn: 'Chính nhờ có khách hàng mà công ty chúng tôi mới tồn tại. Tuyệt đối không được quên ơn.', furigana: 'おきゃくさま あって の わがしゃ です。かんしゃ の きもち を わすれて は ならない。' },
      { jp: '命あっての物種だ。無理をして体を壊してはいけない。', vn: 'Còn nước còn tát, có mạng sống thì mới có tương lai. Đừng cố quá mà tổn hại thân thể.', furigana: 'いのち あって の ものだね だ。むり を して からだ を こわして は いけない。' }
    ]
  },
  {
    id: 'n1_21',
    level: 'N1',
    title: '〜からある／からする／からの',
    meaning: 'Lên tới hơn... / Đáng giá tới hơn... (Số lượng khủng)',
    structure: 'Số từ (khoảng cách, trọng lượng) + からある / (giá tiền) + からする / (số người) + からの',
    explanation: 'Nhấn mạnh con số hoặc quy mô khổng lồ vượt xa mức tưởng tượng thông thường.',
    examples: [
      { jp: '彼は重さ５０キロからある荷物を軽々と持ち上げた。', vn: 'Anh ấy nâng bổng hành lý nặng tới hơn 50kg một cách nhẹ tênh.', furigana: 'かれ は おもさ ごじゅっキロ から ある にもつ を かるがる と もちあげた。' },
      { jp: '一着１００万円からする高級ドレスを身にまとっている。', vn: 'Cô ấy khoác lên mình bộ đầm cao cấp trị giá lên tới hơn 1 triệu yên.', furigana: 'いっちゃく ひゃくまんえん から する こうきゅう ドレス を み に まとって いる。' }
    ]
  },
  {
    id: 'n1_22',
    level: 'N1',
    title: '〜だに',
    meaning: 'Thậm chí ngay cả trong suy nghĩ, tưởng tượng cũng...',
    structure: 'Động từ thể từ điển / Danh từ + だに',
    explanation: 'Chỉ nội việc nghĩ tới thôi đã thấy kinh hoàng, chưa nói gì đến việc trải nghiệm thực tế.',
    examples: [
      { jp: 'あのような大惨事は、想像するだに恐ろしい。', vn: 'Thảm họa kinh hoàng tầm cỡ ấy, chỉ mới tưởng tượng thôi đã thấy rùng mình sợ hãi.', furigana: 'あの ような だいさんじ は、そうぞう する だに おそろしい。' },
      { jp: 'まさか自分が選ばれるとは、夢にだに思わなかった。', vn: 'Chẳng ngờ bản thân lại được lựa chọn, ngay cả trong mơ tôi cũng chưa từng dám nghĩ tới.', furigana: 'まさか じぶん が えらばれる と は、ゆめ に だに おもわなかった。' }
    ]
  },
  {
    id: 'n1_23',
    level: 'N1',
    title: '〜すら',
    meaning: 'Đến cả... / Ngay cả... (Cách nói đanh thép của さえ)',
    structure: 'Danh từ + すら',
    explanation: 'Đưa ra ví dụ căn bản nhất mà còn không đạt được để nhấn mạnh sự bất khả thi toàn diện.',
    examples: [
      { jp: 'あまりのショックに、声すら出なかった。', vn: 'Vì quá bàng hoàng sốc nặng, ngay cả tiếng khóc tôi cũng không thốt ra nổi.', furigana: 'あまり の ショック に、こえ すら でなかった。' },
      { jp: '親友の名前すら忘れてしまうほど衰弱していた。', vn: 'Cơ thể suy nhược đến mức ngay cả tên người bạn thân nhất anh ấy cũng quên béng.', furigana: 'しんゆう の なまえ すら わすれて しまう ほど すいじゃく して いた。' }
    ]
  },
  {
    id: 'n1_24',
    level: 'N1',
    title: '〜たりとも〜ない',
    meaning: 'Dù chỉ một... cũng tuyệt đối không...',
    structure: 'Số đếm 1 (1 giây, 1 giọt, 1 xu) + たりとも + ...ない',
    explanation: 'Nhấn mạnh tính tuyệt đối khắt khe, không được lãng phí hay sai sót dẫu chỉ một đơn vị nhỏ nhất.',
    examples: [
      { jp: '試験終了まで、一分たりとも無駄にしてはならない。', vn: 'Cho đến khi hết giờ thi, dù chỉ một phút cũng tuyệt đối không được lãng phí.', furigana: 'しけん しゅうりょう まで、いっぷん たりとも むだ に して は ならない。' },
      { jp: '税金は一円たりとも無駄遣いすることは許されない。', vn: 'Tiền thuế của dân thì dẫu chỉ một yên cũng không được phép tiêu xài phung phí.', furigana: 'ぜいきん は いちえん たりとも むだづかい する こと は ゆるされない。' }
    ]
  },
  {
    id: 'n1_25',
    level: 'N1',
    title: '〜と相まって',
    meaning: 'Cùng hòa quyện với... tạo nên hiệu quả nhân đôi',
    structure: 'Danh từ + と相まって（とあいまって）',
    explanation: 'Hai nhân tố tuyệt vời kết hợp tương trợ lẫn nhau tạo nên một kết quả phi thường và ấn tượng.',
    examples: [
      { jp: '美しい歌声が照明の効果と相まって、幻想的な世界を作り出した。', vn: 'Giọng hát du dương hòa quyện cùng hiệu ứng ánh sáng đã tạo nên một không gian huyền ảo.', furigana: 'うつくしい うたごえ が しょうめい の こうか と あいまって、げんそうてき な せかい を つくりだした。' },
      { jp: '原料の良さが職人の技と相まって、極上の銘酒が完成した。', vn: 'Nguyên liệu hảo hạng quyện cùng tay nghề nghệ nhân đã tạo nên danh tửu tuyệt đỉnh.', furigana: 'げんりょう の よさ が しょくにん の わざ と あいまって、ごくじょう の めいしゅ が かんせい した。' }
    ]
  },
  {
    id: 'n1_26',
    level: 'N1',
    title: '〜にかこつけて',
    meaning: 'Lấy cớ là... để làm chuyện khác',
    structure: 'Danh từ + にかこつけて',
    explanation: 'Mượn danh nghĩa một lý do nghe có vẻ hợp lý để che đậy mục đích vụ lợi ngầm bên trong.',
    examples: [
      { jp: '出張にかこつけて、温泉旅行を満喫してきた。', vn: 'Lấy cớ là đi công tác, anh ta đã thỏa thuê tận hưởng chuyến du lịch suối nước nóng.', furigana: 'しゅっちょう に かこつけて、おんせん りょこう を まんきつ して きた。' },
      { jp: '病気にかこつけて、面倒な仕事をサボった。', vn: 'Lấy cớ ốm đau để trốn tránh đùn đẩy công việc phiền toái.', furigana: 'びょうき に かこつけて、めんどう な しごと を サボった。' }
    ]
  },
  {
    id: 'n1_27',
    level: 'N1',
    title: '〜にかかわる',
    meaning: 'Ảnh hưởng nghiêm trọng tới... (danh dự, sinh mạng)',
    structure: 'Danh từ + にかかわる',
    explanation: 'Chỉ mối nguy hại đe dọa trực tiếp tới những giá trị cốt lõi thiêng liêng nhất.',
    examples: [
      { jp: 'これは会社の信用にかかわる重大な問題だ。', vn: 'Đây là vấn đề trọng đại đe dọa trực tiếp tới uy tín sống còn của cả công ty.', furigana: 'これ は かいしゃ の しんよう に かかわる じゅうだい な もんだい だ。' },
      { jp: '人の命にかかわるミスを決して犯してはならない。', vn: 'Tuyệt đối không bao giờ được phép phạm phải sai sót nguy hiểm tới tính mạng con người.', furigana: 'ひと の いのち に かかわる ミス を けっして おかして は ならない。' }
    ]
  },
  {
    id: 'n1_28',
    level: 'N1',
    title: '〜にとどまらず',
    meaning: 'Không dừng lại ở... mà lan rộng toàn diện',
    structure: 'Danh từ / Động từ thể từ điển + にとどまらず',
    explanation: 'Sự việc không bị giới hạn trong phạm vi hẹp ban đầu mà bành trướng lan ra phạm vi lớn hơn nhiều.',
    examples: [
      { jp: 'アニメの人気は日本国内にとどまらず、世界中に広がっている。', vn: 'Sức hút của anime không chỉ dừng lại trong nước Nhật mà đã lan rộng khắp toàn cầu.', furigana: 'アニメ の にんき は にほん こくない に とどまらず、せかいじゅう に ひろがって いる。' },
      { jp: '被害は建物にとどまらず、人的被害にも及んだ。', vn: 'Thiệt hại không chỉ dừng lại ở nhà cửa vật chất mà còn lan sang cả thương vong về người.', furigana: 'ひがい は たてもの に とどまらず、じんてき ひがい に も およんだ。' }
    ]
  },
  {
    id: 'n1_29',
    level: 'N1',
    title: '〜に耐える／に耐えない',
    meaning: 'Đáng để... / Không nỡ nghe nhìn (đau đớn, thô bỉ)',
    structure: 'Động từ thể từ điển / Danh từ + に耐える（にたえる） / に耐えない',
    explanation: 'Có đủ giá trị thẩm mỹ để thưởng thức, hoặc ngược lại quá kinh khủng đến mức không đành lòng nghe nhìn.',
    examples: [
      { jp: 'この古典文学は、何度読んでも鑑賞に耐える名作だ。', vn: 'Tác phẩm văn học cổ điển này đọc bao nhiêu lần vẫn là kiệt tác bõ công thưởng thức.', furigana: 'この こてん ぶんがく は、なんど よんでも かんしょう に たえる めいさく だ。' },
      { jp: 'あまりの惨状に、目も当てられない、見るに耐えない光景だった。', vn: 'Cảnh tượng tan hoang quá thảm khốc, thực sự không nỡ nhìn nổi.', furigana: 'あまり の さんじょう に、め も あてられない、みる に たえない こうけい だった。' }
    ]
  },
  {
    id: 'n1_30',
    level: 'N1',
    title: '〜に堪えない',
    meaning: 'Vô cùng... khôn xiết (cảm kích, ân hận)',
    structure: 'Danh từ (cảm xúc: 感謝, 遺憾) + に堪えない（にたえない）',
    explanation: 'Cảm xúc quá dâng trào mãnh liệt đến mức tâm can không thể kiềm nén nổi.',
    examples: [
      { jp: '長年のご支援に対し、感謝の念に堪えません。', vn: 'Trước sự ủng hộ suốt bao năm qua, trong lòng tôi trào dâng niềm cảm kích khôn xiết.', furigana: 'ながねん の ごしえん に たいし、かんしゃ の ねん に たえません。' },
      { jp: 'このような不祥事を起こし、痛恨の極み、遺憾の念に堪えない。', vn: 'Để xảy ra sự cố đáng tiếc nhường này, tôi vô cùng ân hận đau xót khôn nguôi.', furigana: 'この ような ふしょうじ を おこし、つうこん の きわみ、いかん の ねん に たえない。' }
    ]
  },
  {
    id: 'n1_31',
    level: 'N1',
    title: '〜に足る',
    meaning: 'Đáng để... / Đủ tư cách để...',
    structure: 'Động từ thể từ điển / Danh từ + に足る（にたる）',
    explanation: 'Có đầy đủ phẩm chất, độ tin cậy để hoàn toàn xứng đáng nhận được sự tin tưởng hoặc khen ngợi.',
    examples: [
      { jp: '彼は信頼に足る誠実なビジネスパートナーだ。', vn: 'Anh ấy là đối tác làm ăn chân chính, hoàn toàn xứng đáng để đặt trọn niềm tin.', furigana: 'かれ は しんらい に たる せいじつ な ビジネス パートナー だ。' },
      { jp: '取るに足らない小さなミスだから、気にするな。', vn: 'Lỗi nhỏ nhặt chẳng đáng bận tâm đâu, đừng băn khoăn làm gì.', furigana: 'とる に たらない ちいさな ミス だから、き に する な。' }
    ]
  },
  {
    id: 'n1_32',
    level: 'N1',
    title: '〜に足らない',
    meaning: 'Không đáng để... / Chẳng bõ để bận tâm',
    structure: 'Động từ thể từ điển / Danh từ + に足らない（にたらない）',
    explanation: 'Giá trị quá nhỏ nhoi hoặc tầm thường đến mức không cần phải tốn công sức suy nghĩ hay nhắc tới.',
    examples: [
      { jp: 'そんなくだらない噂話など、聞くに足らない。', vn: 'Mấy chuyện tin đồn nhảm nhí tầm phào đó chẳng đáng để lắng tai nghe.', furigana: 'そんな くだらない うわさばなし など、きく に たらない。' },
      { jp: '恐れるに足らない相手だから、落ち着いて戦おう。', vn: 'Đối thủ không có gì đáng phải sợ hãi cả, hãy bình tĩnh thi đấu.', furigana: 'おそれる に たらない あいて だから、おちついて たたかおう。' }
    ]
  },
  {
    id: 'n1_33',
    level: 'N1',
    title: '〜まじき',
    meaning: 'Tuyệt đối không được phép có (Đối với cương vị đó)',
    structure: 'Động từ thể từ điển (する -> すまじき) + まじき + Danh từ',
    explanation: 'Đứng trên lập trường danh dự nghề nghiệp hoặc đạo đức, một hành vi bôi nhọ thanh danh là điều cấm kỵ.',
    examples: [
      { jp: '生徒を傷つけるとは、教師にあるまじき言動だ。', vn: 'Làm tổn thương học trò là hành vi lời nói không thể nào chấp nhận nổi ở một người giáo viên.', furigana: 'せいと を きずつける と は、きょうし に あるまじき げんどう だ。' },
      { jp: '賄賂を受け取るなど、公務員として許すまじき犯罪だ。', vn: 'Ăn hối lộ là một tội ác không thể dung thứ đối với người công chức nhà nước.', furigana: 'わいろ を うけとる など、こうむいん として ゆるすまじき はんざい だ。' }
    ]
  },
  {
    id: 'n1_34',
    level: 'N1',
    title: '〜べからず／べからざる',
    meaning: 'Cấm tuyệt đối / Điều không thể...',
    structure: 'Động từ thể từ điển (する -> すべからず) + べからず',
    explanation: 'Văn phong mệnh lệnh cấm chỉ cổ điển uy nghiêm xuất hiện trên biển hiệu công cộng hoặc giáo huấn.',
    examples: [
      { jp: '芝生に入るべからず。', vn: 'Cấm giẫm chân lên thảm cỏ.', furigana: 'しばふ に はいる べからず。' },
      { jp: '彼が残した功績は、決して欠くべからざるものだ。', vn: 'Chiến công mà ông để lại là thứ tuyệt đối không thể nào thiếu sót được.', furigana: 'かれ が のこした こうせき は、けっして かく べからざる もの だ。' }
    ]
  },
  {
    id: 'n1_35',
    level: 'N1',
    title: '〜べく',
    meaning: 'Với ý chí quyết tâm để... nên đã hành động',
    structure: 'Động từ thể từ điển (する -> すべく) + べく',
    explanation: 'Văn phong trang trọng, biểu thị ý chí và mục tiêu cháy bỏng thôi thúc thực hiện hành động lớn.',
    examples: [
      { jp: '優勝を果たすべく、チーム全員で厳しい特訓を重ねてきた。', vn: 'Với quyết tâm giành ngôi vô địch, toàn đội đã cùng nhau trải qua đợt tập huấn khắc nghiệt.', furigana: 'ゆうしょう を はたす べく、チーム ぜんいん で きびしい とっくん を かさねて きた。' },
      { jp: '真実を確かめるべく、現地へ向かった。', vn: 'Nhằm mục đích xác thực chân tướng sự thật, tôi đã đích thân lên đường tới hiện trường.', furigana: 'しんじつ を たしかめる べく、げんち へ むかった。' }
    ]
  },
  {
    id: 'n1_36',
    level: 'N1',
    title: '〜べくもない',
    meaning: 'Tuyệt đối không thể nào hy vọng nổi',
    structure: 'Động từ thể từ điển (する -> すべく) + べくもない',
    explanation: 'Trước hiện thực quá phũ phàng, hoàn toàn không có mảy may cơ hội để mơ tưởng hay so bì.',
    examples: [
      { jp: 'プロの選手に素人が敵うべくもない。', vn: 'Dân nghiệp dư thì tuyệt đối làm sao có cửa địch nổi vận động viên chuyên nghiệp.', furigana: 'プロ の せんしゅ に しろうと が かなう べく も ない。' },
      { jp: '当時の状況を今となっては知るべくもない。', vn: 'Tình cảnh của thời điểm đó thì đến tận bây giờ hoàn toàn chẳng thể nào hay biết nổi.', furigana: 'とうじ の じょうきょう を いま と なっては しる べく も ない。' }
    ]
  },
  {
    id: 'n1_37',
    level: 'N1',
    title: '〜んばかりに',
    meaning: 'Tựa như sắp sửa... đến nơi rồi',
    structure: 'Động từ thể ない (bỏ ない) + んばかりに (する -> せんばかりに)',
    explanation: 'Mô tả dáng vẻ, biểu cảm sinh động chân thực đến mức ngỡ như hành động sắp sửa phát tác ngay tức khắc.',
    examples: [
      { jp: '彼女は今にも泣き出さんばかりの顔をしていた。', vn: 'Khuôn mặt cô ấy méo mó tựa như sắp sửa bật khóc òa lên đến nơi.', furigana: 'かのじょ は いま に も なきださん ばかり の かお を して いた。' },
      { jp: '飛び上がらんばかりに喜んだ。', vn: 'Tôi mừng rỡ tột độ tựa như muốn nhảy cẫng lên tận trần nhà.', furigana: 'とびあがらん ばかり に よろこんだ。' }
    ]
  },
  {
    id: 'n1_38',
    level: 'N1',
    title: '〜んがために',
    meaning: 'Chính vì mục đích cao cả mà sẵn sàng dấn thân',
    structure: 'Động từ thể ない (bỏ ない) + んがために (する -> せんがために)',
    explanation: 'Mang sắc thái trang trọng, quyết tâm làm việc lớn dẫu có phải đánh đổi hay hy sinh.',
    examples: [
      { jp: '夢を実現せんがために、身を粉にして働いた。', vn: 'Chính là vì để hiện thực hóa ước mơ lớn lao, anh ấy đã làm việc không quản ngày đêm.', furigana: 'ゆめ を じつげん せん が ため に、み を こ に して はたらいた。' },
      { jp: '真実を明らかにせんがため、調査団が結成された。', vn: 'Nhằm mục đích tối thượng là làm sáng tỏ chân tướng, một đoàn điều tra đã được thành lập.', furigana: 'しんじつ を あきらか に せん が ため、ちょうさだん が けっせい された。' }
    ]
  },
  {
    id: 'n1_39',
    level: 'N1',
    title: '〜まいとする',
    meaning: 'Cố kìm nén không để lộ... ra ngoài',
    structure: 'Động từ nhóm 1: thể từ điển + まい / Nhóm 2, 3: bỏ ます + まい + とする',
    explanation: 'Nỗ lực gượng ép điều khiển cảm xúc bản thân để không bật khóc, không run rẩy trước mặt người khác.',
    examples: [
      { jp: '涙をこぼすまいと、必死に唇を噛みしめた。', vn: 'Cố nén giọt nước mắt không để rơi xuống, cô ấy đã cắn chặt bờ môi.', furigana: 'なみだ を こぼすまい と、ひっし に くちびる を かみしめた。' },
      { jp: '動揺を悟られまいとして、平気な顔を作った。', vn: 'Cố che giấu không để ai nhận ra sự hoang mang, anh ấy giả bộ làm mặt tỉnh bơ.', furigana: 'どうよう を さとられまい と して、へいき な かお を つくった。' }
    ]
  },
  {
    id: 'n1_40',
    level: 'N1',
    title: '〜を禁じ得ない',
    meaning: 'Không thể kiềm chế nổi dòng cảm xúc...',
    structure: 'Danh từ + を禁じ得ない（をきんじえない）',
    explanation: 'Cảm xúc căm phẫn, thương cảm, ngạc nhiên trỗi dậy quá đỗi mãnh liệt, không có cách nào ngăn lại được.',
    examples: [
      { jp: '犯人の身勝手な供述に、激しい怒りを禁じ得ない。', vn: 'Trước lời khai ích kỷ ngạo mạn của tên tội phạm, tôi không thể kìm nén nổi cơn thịnh nộ.', furigana: 'はんにん の みがって な きょうじゅつ に、はげしい いかり を きんじえない。' },
      { jp: '被害者たちの悲惨な境遇に、深い同情を禁じ得ない。', vn: 'Trước cảnh ngộ xót xa của các nạn nhân, tôi không nén nổi niềm trắc ẩn sâu sắc.', furigana: 'ひがいしゃたち の ひさん な きょうぐう に、ふかい どうじょう を きんじえない。' }
    ]
  },
  {
    id: 'n1_41',
    level: 'N1',
    title: '〜を余儀なくさせる',
    meaning: 'Đẩy vào tình thế buộc người khác phải...',
    structure: 'Danh từ + を余儀なくさせる（をよぎなくさせる）',
    explanation: 'Chủ ngữ thường là thiên tai, suy thoái kinh tế... đẩy con người vào nghịch cảnh ép buộc.',
    examples: [
      { jp: '突然の噴火が、住民たちに避難を余儀なくさせた。', vn: 'Vụ núi lửa phun trào bất ngờ đã buộc toàn bộ cư dân phải tức tốc sơ tán.', furigana: 'とつぜん の ふんか が、じゅうみんたち に ひなん を よぎなく させた。' },
      { jp: '不況が多くの企業にリストラを余儀なくさせている。', vn: 'Tình trạng suy thoái đang buộc hàng loạt doanh nghiệp phải cắt giảm nhân sự đau đớn.', furigana: 'ふきょう が おおく の きぎょう に リストラ を よぎなく させて いる。' }
    ]
  },
  {
    id: 'n1_42',
    level: 'N1',
    title: '〜といえども',
    meaning: 'Dẫu cho có là... đi chăng nữa thì cũng không ngoại lệ',
    structure: 'Danh từ / Thể thông thường + といえども',
    explanation: 'Dù là bậc vĩ nhân, cao thủ hay người thân tín thì các quy luật và đạo lý cuộc đời vẫn không thiên vị.',
    examples: [
      { jp: '親といえども、子供のプライバシーを侵害してはならない。', vn: 'Dẫu có là cha mẹ đi chăng nữa cũng không được phép xâm phạm quyền riêng tư của con cái.', furigana: 'おや と いえども、こども の プライバシー を しんがい して は ならない。' },
      { jp: '百戦錬磨の達人といえども、油断すれば敗北する。', vn: 'Dù là bậc cao thủ trăm trận trăm thắng nhưng nếu chủ quan khinh địch ắt sẽ bại trận.', furigana: 'ひゃくせんれんま の たつじん と いえども、ゆだん すれば はいぼく する。' }
    ]
  },
  {
    id: 'n1_43',
    level: 'N1',
    title: '〜なり〜なり',
    meaning: 'Hoặc là... hoặc là... (đưa ra các gợi ý lựa chọn)',
    structure: 'Danh từ / Động từ thể từ điển + なり ... なり',
    explanation: 'Gợi ý đưa ra một vài phương án khả thi để đối phương tự do chọn lấy một cách giải quyết.',
    examples: [
      { jp: '分からないことがあれば、電話するなりメールするなりしてください。', vn: 'Nếu có điều gì chưa rõ, anh hãy gọi điện thoại hoặc gửi email đều được.', furigana: 'わからない こと が あれば、でんわ する なり メール する なり して ください。' },
      { jp: 'お茶なりコーヒーなり、お好きなものをどうぞ。', vn: 'Hoặc là trà hoặc là cà phê, xin mời anh cứ dùng thứ mình thích.', furigana: 'おちゃ なり コーヒー なり、おすき な もの を どうぞ。' }
    ]
  },
  {
    id: 'n1_44',
    level: 'N1',
    title: '〜つ〜つ',
    meaning: 'Lúc thì... lúc lại... (hai hành động song hành đảo ngược)',
    structure: 'Động từ thể ます (bỏ ます) + つ ... + つ',
    explanation: 'Miêu tả hai trạng thái hoặc hành động đối lập liên tục đan xen qua lại (đuổi - bắt, nâng - hạ, chìm - nổi).',
    examples: [
      { jp: '二人のランナーは抜きつ抜かれつの大接戦を繰り広げた。', vn: 'Hai vận động viên đã tạo nên màn rượt đuổi nghẹt thở, lúc thì vượt lên, lúc lại bị tụt lại.', furigana: 'ふたり の ランナー は ぬきつ ぬかれつ の だいせっせん を くりひろげた。' },
      { jp: '押しつ押されつの満員電車で通勤する。', vn: 'Tôi đi làm trên chuyến tàu điện đông nghịt người, cảnh chen chúc xô đẩy nhau liên hồi.', furigana: 'おしつ おされつ の まんいんでんしゃ で つうきん する。' }
    ]
  },
  {
    id: 'n1_45',
    level: 'N1',
    title: '〜ともなく／ともなしに',
    meaning: 'Bâng quơ, vô thức không chủ đích cụ thể',
    structure: 'Động từ thể từ điển + ともなく / ともなしに',
    explanation: 'Hành động diễn ra một cách tình cờ tự nhiên trong vô thức, không hề có mục đích hoạch định từ trước.',
    examples: [
      { jp: '見るともなく窓の外を眺めていたら、虹が見えた。', vn: 'Tôi bâng quơ nhìn ra ngoài cửa sổ thì tình cờ thấy cầu vồng xuất hiện.', furigana: 'みる と も なく まど の そと を ながめて いたら、にじ が みえた。' },
      { jp: '聞くともなしに耳に入ってきた会話に驚いた。', vn: 'Vô tình nghe loáng thoáng câu chuyện người ta nói mà tôi giật cả mình.', furigana: 'きく と も なし に みみ に はいって きた かいわ に おどろいた。' }
    ]
  },
  {
    id: 'n1_46',
    level: 'N1',
    title: '〜ならいざ知らず',
    meaning: 'Nếu là ai khác thì còn hiểu được, đằng này lại là...',
    structure: 'Danh từ / Mệnh đề + ならいざ知らず（ならいざしらず）',
    explanation: 'So sánh tương phản để chê trách một đối tượng đáng lẽ phải làm tốt hơn nhưng lại làm đáng thất vọng.',
    examples: [
      { jp: '子供ならいざ知らず、大人がそんなわがままを言ってはいけない。', vn: 'Nếu là trẻ con thì còn châm chước được, đằng này người lớn mà vòi vĩnh ích kỷ thế là không nên.', furigana: 'こども なら いざ しらず、おとな が そんな わがまま を いって は いけない。' },
      { jp: '昔ならいざ知らず、現代ではそれは常識外れだ。', vn: 'Nếu là thời xưa thì không nói, chứ thời nay chuyện đó quả là phi lý lập dị.', furigana: 'むかし なら いざ しらず、げんだい では それ は じょうしきはずれ だ。' }
    ]
  },
  {
    id: 'n1_47',
    level: 'N1',
    title: '〜からといって',
    meaning: 'Không phải cứ bảo là... thì muốn sao cũng được',
    structure: 'Thể thông thường + からといって',
    explanation: 'Phủ định nhận định phiến diện; không thể vin vào lý do đó để biện minh cho hành vi sai trái.',
    examples: [
      { jp: 'お金持ちだからといって、幸せとは限らない。', vn: 'Không phải cứ giàu có thì nhất định sẽ hạnh phúc đâu.', furigana: 'おかねもち だからといって、しあわせ と は かぎらない。' },
      { jp: '忙しいからといって、連絡を怠っていいわけがない。', vn: 'Dẫu có bận rộn đến đâu chăng nữa cũng không có lý nào được phép lơ là việc liên lạc.', furigana: 'いそがしい からといって、れんらく を おこたって いい わけ が ない。' }
    ]
  },
  {
    id: 'n1_48',
    level: 'N1',
    title: '〜始末だ',
    meaning: 'Rốt cuộc lại trượt dài rơi vào kết cục thảm hại',
    structure: 'Động từ thể từ điển / thể た + 始末だ（しまつだ）',
    explanation: 'Sau một chuỗi những hành động sai lầm hoặc quản lý tồi tệ, cuối cùng đã chuốc lấy kết cục thảm hại.',
    examples: [
      { jp: '彼は浪費を重ねたあげく、借金取りに追われる始末だ。', vn: 'Sau chuỗi ngày tiêu xài hoang phí, rốt cuộc anh ta rơi vào cảnh bị chủ nợ rượt đuổi ráo riết.', furigana: 'かれ は ろうひ を かさねた あげく、しゃっきんとり に おわれる しまつ だ。' },
      { jp: '夜遅くまでゲームばかりして、朝は起きられない始末だ。', vn: 'Suốt ngày cày game thâu đêm, rốt cuộc sáng ra lại không tài nào dậy nổi.', furigana: 'よる おそく まで ゲーム ばかり して、あさ は おきられない しまつ だ。' }
    ]
  },
  {
    id: 'n1_49',
    level: 'N1',
    title: '〜が早いか',
    meaning: 'Vừa dứt hành động... là lập tức hành động khác ập tới như chớp',
    structure: 'Động từ thể từ điển / thể た + が早いか（がはやいか）',
    explanation: 'Khoảnh khắc hành động A vừa dứt điểm thì hành động B nối tiếp gần như đồng thời chớp nhoáng.',
    examples: [
      { jp: '終業のベルが鳴るが早いか、生徒たちは教室を飛び出していった。', vn: 'Chuông tan trường vừa dứt tiếng là lũ học sinh lập tức ùa ra khỏi lớp như bầy ong vỡ tổ.', furigana: 'しゅうぎょう の ベル が なる が はやい か、せいとたち は きょうしつ を とびだして いった。' },
      { jp: '彼はベッドに入るが早いか、ぐっすり眠りについた。', vn: 'Vừa ngả lưng xuống giường là anh ấy đã chìm ngay vào giấc ngủ say sưa.', furigana: 'かれ は ベッド に はいる が はやい か、ぐっすり ねむり に ついた。' }
    ]
  },
  {
    id: 'n1_50',
    level: 'N1',
    title: '〜そばから',
    meaning: 'Vừa mới làm xong vế trước thì vế sau lại tái diễn',
    structure: 'Động từ thể từ điển / thể た + そばから',
    explanation: 'Vừa mới tốn công sức hoàn thành xong thì sự việc lại bị đảo ngược hoặc lặp lại khiến uổng công.',
    examples: [
      { jp: '片付けるそばから、子供がおもちゃを散らかしてしまう。', vn: 'Vừa mới dọn dẹp xong thì đứa con lại bày bừa đồ chơi ra khắp nhà.', furigana: 'かたづける そば から、こども が おもちゃ を ちらかして しまう。' },
      { jp: '覚えるそばから、新しい単語を忘れてしまう。', vn: 'Vừa mới học thuộc xong thì tôi lại quên béng mất từ mới.', furigana: 'おぼえる そば から、あたらしい たんご を わすれて しまう。' }
    ]
  }
];
