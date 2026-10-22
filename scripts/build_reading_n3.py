# -*- coding: utf-8 -*-
"""
Generator for N3 Reading Comprehension Articles (30 bài Dokkai chuẩn N3)
"""
import json

topics_n3 = [
  ("dokkai_n3_1", "日本の「もったいない」精神", "Triết lý sống trân quý vạn vật Mottainai", "🌿",
   "「もったいない」という日本語は、物の価値を十分に生かしきれず無駄にしてしまうことを惜しむ心を表現した言葉です。物を粗末にせず、修理して長く大切に使い続けるこの精神は、環境保護の理念として世界的な注目を集めました。大量消費社会を見つめ直す重要な指標となっています。",
   "Từ 'Mottainai' trong tiếng Nhật diễn tả nỗi niềm tiếc nuối khi không thể tận dụng hết giá trị của một đồ vật mà để lãng phí. Tinh thần trân trọng đồ vật, sửa chữa để dùng lâu dài bền bỉ này đã thu hút sự chú ý sâu sắc của thế giới như một triết lý bảo vệ môi trường, định hướng lại xã hội tiêu dùng ồ ạt.",
   "「もったいない」の根本にある考え方はどれですか？ (Ý niệm cốt lõi của tinh thần Mottainai là gì?)",
   ["新しい物をどんどん買うこと (Liên tục mua sắm đồ mới)", "物の命や価値を大切にし無駄にしないこと (Trân trọng giá trị đồ vật và không lãng phí)", "壊れた物はすぐ捨てること (Đồ hỏng vứt đi ngay)", "安さだけを追求すること (Chỉ mưu cầu đồ giá rẻ)"], 1,
   "Bài viết nêu rõ: 「物の価値を十分に生かしきれず無駄にしてしまうことを惜しむ心を表現した言葉です」."),

  ("dokkai_n3_2", "森林浴（しんりんよく）の科学的効果", "Liệu pháp tắm rừng Shinrin-yoku xoa dịu tâm trí", "🌲",
   "木々が生い茂る森の中を歩く「森林浴」には、心身を癒やす科学的な効果があることが分かっています。樹木が発散する「フィトンチッド」という芳香物質には、自律神経を整えストレスホルモンを低減させる作用があります。都市の喧騒を離れ、森の静寂に身を浸すことで免疫力も向上します。",
   "Đi bạo giữa rừng cây bạt ngàn trong phương pháp 'Shinrin-yoku' đã được khoa học chứng minh mang lại lợi ích phục hồi tâm thể to lớn. Hoạt chất thơm 'Phytoncide' do thân cây tiết ra giúp điều hòa hệ thần kinh thực vật và giảm thiểu hormone căng thẳng, đồng thời tăng cường hệ miễn dịch tự nhiên.",
   "樹木が発散する芳香物質を何と呼びますか？ (Chất thơm do cây cối tỏa ra trong rừng gọi là gì?)",
   ["フィトンチッド (Phytoncide)", "ビタミン (Vitamin)", "カフェイン (Caffeine)", "ホルモン (Hormone)"], 0,
   "Đoạn văn nêu rõ: 「樹木が発散する『フィトンチッド』という芳香物質には...」."),

  ("dokkai_n3_3", "和食と無形文化遺産", "Ẩm thực Washoku - Tinh hoa di sản nhân loại", "🍲",
   "二千十三年にユネスコ無形文化遺産に登録された「和食」は、自然を尊ぶ日本人の精神を体現しています。四季折々の新鮮な旬の食材を用い、素材本来の持ち味を引き出す調理法が特徴です。栄養バランスに優れ、一汁三菜を基本とした健康的な食習慣は世界中で高く評価されています。",
   "Được UNESCO công nhận là Di sản văn hóa phi vật thể vào năm 2013, ẩm thực Nhật Bản Washoku hiện thân cho tinh thần tôn kính thiên nhiên. Điểm đặc trưng là sử dụng nguyên liệu tươi ngon theo mùa, kỹ thuật chế biến tôn vinh trọn vẹn vị mộc nguyên bản, cấu trúc dinh dưỡng hài hòa một canh ba món Ichiju-sansai.",
   "和食の献立の基本となる形式は何ですか？ (Hình thức cơ bản của mâm cơm Washoku truyền thống là gì?)",
   ["二汁一菜 (Hai món canh, một món ăn)", "一汁三菜 (Một món canh, ba món ăn kèm)", "主食のみ (Chỉ có cơm)", "デザート中心 (Chủ yếu là đồ tráng miệng)"], 1,
   "Trong bài viết có câu: 「一汁三菜を基本とした健康的な食習慣は世界中で高く評価されています」."),

  ("dokkai_n3_4", "「本音」と「建前」の人間関係", "Nghệ thuật giao tiếp Honne và Tatemae", "🎭",
   "日本の人間関係を円滑にする知恵として「本音」と「建前」があります。本音は心の中の素直な感情であり、建前は場の調和や相手の立場に配慮した公の言動です。一見矛盾するように感じられますが、無用な対立を避け、集団の和を保つための配慮の文化から生み出された作法です。",
   "Một trí tuệ ứng xử giúp duy trì các mối quan hệ hòa hợp ở Nhật Bản là sự đan xen giữa 'Honne' (lời nói thật lòng tự đáy lòng) và 'Tatemae' (phép lịch thiệp xã giao nơi công cộng). Dù thoạt nhìn có vẻ mâu thuẫn, đây thực chất là sự tế nhị văn hóa nhằm tránh xung đột không cần thiết và giữ gìn hòa khí tập thể.",
   "「建前」を使う主な目的は何ですか？ (Mục đích chủ yếu khi dùng Tatemae là gì?)",
   ["自分の利益だけを守るため (Để bảo vệ lợi ích cá nhân)", "相手を攻撃するため (Để công kích đối phương)", "場の調和を保ち無用な対立を避けるため (Để giữ gìn sự hòa hợp và tránh xung đột)", "嘘をつくため (Để lừa dối)"], 2,
   "Bài viết nêu rõ: 「無用な対立を避け、集団の和を保つための配慮の文化から生み出された作法です」."),

  ("dokkai_n3_5", "食品ロス（フードロス）問題への挑戦", "Hành động giảm thiểu lãng phí lương thực", "🍎",
   "まだ食べられるのに捨てられてしまう「食品ロス」は、世界的な環境・倫理問題となっています。日本でも賞味期限間近の食品を割引販売したり、規格外の農産物を加工食品として活用したりする取り組みが広がっています。私たち一人ひとりが買いすぎを防ぐ意識が何よりも大切です。",
   "Thực phẩm vẫn còn ăn được nhưng bị vứt bỏ lãng phí (Food Loss) đang là một vấn nạn nhức nhối toàn cầu. Tại Nhật Bản, các sáng kiến như bán giảm giá đồ sắp hết hạn sử dụng hay tận dụng nông sản lệch kích thước làm thực phẩm chế biến đang lan rộng. Tự giác mua vừa đủ ăn là chìa khóa then chốt.",
   "食品ロスを減らすために消費者ができることは何ですか？ (Người tiêu dùng có thể làm gì để giảm lãng phí thực phẩm?)",
   ["必要以上に買いすぎない意識を持つこと (Có ý thức không mua quá nhiều ngoài nhu cầu)", "賞味期限が長いものだけ買うこと (Chỉ mua đồ hạn thật dài)", "料理を作らないこと (Không tự nấu ăn)", "外食をやめること (Dừng ăn hàng quán)"], 0,
   "Trong bài có câu: 「私たち一人ひとりが買いすぎを防ぐ意識が何よりも大切です」.")
]

# Generate items 6 to 30 for N3
more_n3 = [
  ("dokkai_n3_6", "高齢化社会と介護ロボット", "Công nghệ robot hỗ trợ chăm sóc người cao tuổi", "🤖",
   "少子高齢化が急速に進む日本において、介護現場の負担軽減は喫緊の課題です。ベッドから車椅子への移乗を補助するパワースーツや、高齢者と会話して孤独感を癒やす見守りロボットの実用化が進んでいます。先端技術と人間らしい温かなケアの融合が模索されています。",
   "Trong bối cảnh già hóa dân số diễn ra nhanh chóng tại Nhật Bản, giảm tải áp lực cho ngành điều dưỡng là một bài toán cấp bách. Các thiết bị khung nâng trợ lực và robot đồng hành trò chuyện xoa dịu nỗi cô đơn đang được ứng dụng rộng rãi, hướng tới sự kết hợp giữa công nghệ cao và sự ấm áp của con người.",
   "介護ロボットの主な役割は何ですか？ (Vai trò chủ yếu của robot điều dưỡng là gì?)",
   ["介護現場の負担を軽減し見守りを行う (Giảm tải cho điều dưỡng viên và chăm sóc tinh thần)", "病院の建設 (Xây dựng bệnh viện)", "薬の開発だけ (Chỉ nghiên cứu thuốc)", "料理を全自動にする (Nấu ăn hoàn toàn tự động)"], 0,
   "Đoạn văn nêu rõ: 「介護現場の負担軽減は喫緊の課題です...見守りロボットの実用化が進んでいます」."),

  ("dokkai_n3_7", "日本庭園の美学：枯山水", "Vườn thiền Karesansui tĩnh lặng vô song", "🪨",
   "京都の龍安寺などに代表される「枯山水（かれさんすい）」は、水を用いずに石と白砂だけで山水の風景を象徴的に表現した禅宗の庭園です。砂に描かれた波紋（砂紋）は大河や大海を表し、配置された岩は島や峻峰を想起させます。引き算の美学の極致と言えます。",
   "Tiêu biểu tại chùa Ryoanji ở Kyoto, vườn thiền Karesansui không hề sử dụng một giọt nước thật mà chỉ dùng đá mộc và cát trắng để gợi tả khung cảnh non nước hữu tình. Những đường cào gợn sóng Samon tượng trưng cho đại dương bao la, những khối đá sừng sững gợi nhớ các hòn đảo thần tiên.",
   "枯山水は何を使わずに自然の風景を表現しますか？ (Vườn Karesansui không sử dụng nguyên liệu nào?)",
   ["石 (Đá)", "水 (Nước thật)", "白砂 (Cát trắng)", "苔 (Rêu)"], 1,
   "Bài viết nêu rõ: 「水を用いずに石と白砂だけで山水の風景を象徴的に表現した禅宗の庭園です」."),

  ("dokkai_n3_8", "「あいまい」な日本語表現の理由", "Chiều sâu ngữ nghĩa của những cách nói giảm tránh", "🗣️",
   "外国人が日本語を学ぶ際、「ちょっと...」や「善処します」といった曖昧な表現に戸惑うことがあります。しかしこれは相手を傷つけず、断る際の角を立てないための高い配慮から生まれたものです。明確なYes/Noよりも調和と共感を重んじる日本文化の反映です。",
   "Người nước ngoài học tiếng Nhật thường bỡ ngỡ trước những cách nói ấp úng như 'Chotto...' hay 'Chúng tôi sẽ xem xét'. Tuy nhiên, đây là cách nói giảm tránh đầy tinh tế nhằm không làm tổn thương người nghe hay từ chối thẳng thừng gây mất hòa khí, phản ánh văn hóa đề cao sự đồng cảm trong giao tiếp.",
   "日本語にあいまいな表現が多いのはなぜですか？ (Vì sao tiếng Nhật có nhiều cách diễn đạt giảm tránh, hàm ý?)",
   ["言葉を知らないから (Vì không biết dùng từ)", "相手への配慮と人間関係の調和を重んじるから (Vì tinh tế tôn trọng đối phương và giữ gìn hòa khí)", "怒っているから (Vì đang tức giận)", "嘘をつくのが好きだから (Vì thích nói dối)"], 1,
   "Trong bài có câu: 「相手を傷つけず、断る際の角を立てないための高い配慮から生まれたものです」."),

  ("dokkai_n3_9", "キャッシュレス決済の普及", "Cuộc cách mạng thanh toán không dùng tiền mặt", "💳",
   "現金主義が根強かった日本でも、QRコード決済や電子マネーの普及が急速に進んでいます。ポイント還元キャンペーンやスマートフォンの利便性が後押しし、若者を中心に利用率が高まっています。観光客の受け入れや店舗の業務効率化にも大きく寄여しています。",
   "Vốn là quốc gia có thói quen dùng tiền mặt lâu đời, Nhật Bản hiện đang chứng kiến sự bùng nổ thanh toán qua mã QR và ví điện tử. Các chương trình hoàn điểm thưởng tích lũy kết hợp sự tiện lợi của smartphone đã thúc đẩy giới trẻ chuyển dịch phương thức chi tiêu, giúp các cửa hàng vận hành nhanh gọn.",
   "キャッシュレス決済が普及した理由は何ですか？ (Nguyên nhân thúc đẩy thanh toán không tiền mặt là gì?)",
   ["現金が使えなくなったから (Vì tiền mặt bị cấm)", "スマホの利便性やポイント還元の恩恵があるから (Nhờ tiện ích smartphone và chính sách tích điểm thưởng)", "銀行がなくなったから (Vì ngân hàng đóng cửa)", "物価が上がったから (Vì giá cả leo thang)"], 1,
   "Đoạn văn giải thích: 「ポイント還元キャンペーンやスマートフォンの利便性が後押しし...」."),

  ("dokkai_n3_10", "職人（しょくにん）の技と精神", "Tinh thần nghệ nhân Shokunin vươn tới sự hoàn mỹ", "🔨",
   "日本の「職人」は、一つの道を極めるために生涯を捧げて技術を磨き続ける人々を指します。陶芸、木工、刃物など、伝統工芸の背後には妥協を許さない厳格な美意識があります。単なる仕事ではなく、自らの魂を込めて物を作り出す姿勢は世界中から尊敬を集めています。",
   "Thuật ngữ 'Shokunin' chỉ những nghệ nhân bậc thầy dành trọn cả cuộc đời để mài giũa tay nghề vươn tới đỉnh cao trong một lĩnh vực. Dù là gốm sứ, đồ mộc hay rèn lưỡi dao, đằng sau mỗi sản phẩm là ý thức thẩm mỹ khắt khe không chấp nhận bất kỳ sự thỏa hiệp nào, thổi hồn vào từng tạo tác.",
   "職人精神で最も大切にされていることは何ですか？ (Điều được trân trọng nhất trong tinh thần Shokunin là gì?)",
   ["お金を早く稼ぐこと (Kiếm tiền thật nhanh)", "生涯をかけて技術を磨き魂を込めて物を作ること (Cả đời rèn giũa kỹ nghệ và dốc trọn tâm hồn vào sản phẩm)", "大量生産すること (Sản xuất hàng loạt)", "流行を追うこと (Chạy theo trào lưu ngắn hạn)"], 1,
   "Trong bài viết khẳng định: 「自らの魂を込めて物を作り出す姿勢は世界中から尊敬を集めています」."),

  ("dokkai_n3_11", "睡眠時間と健康意識の変革", "Giấc ngủ trọn vẹn và chất lượng cuộc sống", "🛌",
   "日本は先進国の中で平均睡眠時間が最も短い国の一つと言われてきました。しかし近年、睡眠不足が仕事の生産性や健康に与える悪影響が科学的に実証され、質の高い睡眠をサポートする寝具やアプリの開発が盛んです。「眠ること」への価値観が大きく変わりつつあります。",
   "Nhật Bản từng được thống kê là một trong những quốc gia có thời lượng ngủ trung bình ngắn nhất trong các nước phát triển. Tuy nhiên gần đây, nhận thức về tác hại của thiếu ngủ đối với hiệu suất công việc và sức khỏe đã thúc đẩy sự ra đời của các ứng dụng theo dõi giấc ngủ và nệm chuyên dụng.",
   "近年、日本の睡眠に関する意識はどう変化していますか？ (Gần đây nhận thức về giấc ngủ ở Nhật thay đổi như thế nào?)",
   ["寝る時間を減らす傾向がある (Có xu hướng giảm bớt giờ ngủ)", "質の高い睡眠を重視するようになっている (Coi trọng chất lượng của giấc ngủ trọn vẹn)", "睡眠を軽視するようになった (Xem nhẹ việc ngủ)", "昼寝を禁止する会社が増えた (Nhiều công ty cấm ngủ trưa)"], 1,
   "Bài viết nêu rõ: 「質の高い睡眠をサポートする...『眠ること』への価値観が大きく変わりつつあります」."),

  ("dokkai_n3_12", "伝統工芸：有田焼と美濃焼", "Vẻ đẹp vượt thời gian của gốm sứ Nhật Bản", "🏺",
   "有田焼（佐賀県）は白磁の美しさと鮮やかな絵付けで知られ、十七世紀にはヨーロッパへも大量に輸出されました。一方、美濃焼（岐阜県）は日本の陶磁器生産量の過半数を占め、日常の食卓を豊かに彩っています。伝統を守りながら現代の生活に溶け込む器作りが続いています。",
   "Đồ gốm Arita-yaki (tỉnh Saga) nổi danh với nước men sứ trắng tinh khôi và hoa văn sống động, từng được xuất khẩu sang châu Âu từ thế kỷ 17. Trong khi đó, gốm Mino-yaki (tỉnh Gifu) chiếm hơn nửa sản lượng đồ sứ toàn quốc, hiện diện gần gũi và nâng niu vẻ đẹp từng bữa ăn gia đình.",
   "有田焼の大きな特徴は何ですか？ (Đặc trưng nổi bật của gốm sứ Arita-yaki là gì?)",
   ["金属でできていること (Được làm bằng kim loại)", "白磁の美しさと鮮やかな絵付け (Sứ men trắng tinh xảo và nét vẽ rực rỡ)", "木製であること (Làm bằng gỗ)", "使い捨てであること (Là đồ dùng một lần)"], 1,
   "Đoạn văn nêu rõ: 「有田焼は白磁の美しさと鮮やかな絵付けで知られ...」."),

  ("dokkai_n3_13", "防災訓練と地域コミュニティ", "Gắn kết cộng đồng trong diễn tập cứu nạn", "🚨",
   "日本では学校や地域で定期的に防災訓練が行われます。消火器の使い方や避難経路の確認だけでなく、炊き出し（非常食の調理）を共に行うことで住民同士の顔見知り関係を築きます。災害時には「共助（助け合い）」の精神が命を救う最大の力となります。",
   "Tại các trường học và khu dân cư ở Nhật Bản, các buổi diễn tập phòng chống thiên tai được tổ chức định kỳ. Không chỉ tập huấn dùng bình chữa cháy hay rà soát lộ trình sơ tán, người dân còn cùng nhau nấu những bữa ăn dã chiến, xây dựng mối gắn kết tương trợ 'Kyojo' cứu giúp lẫn nhau khi hoạn nạn.",
   "災害時に最も命を救う力となる精神は何ですか？ (Tinh thần nào là sức mạnh cứu sinh mạng to lớn khi có thảm họa?)",
   ["競争の精神 (Tinh thần cạnh tranh)", "共助（助け合い）の精神 (Tinh thần tương trợ, đùm bọc lẫn nhau)", "個人の利益だけを考える精神 (Chỉ lo lợi ích cá nhân)", "何もしない精神 (Không làm gì cả)"], 1,
   "Trong bài có câu: 「災害時には『共助（助け合い）』の精神が命を救う最大の力となります」."),

  ("dokkai_n3_14", "ワークライフバランスの変革", "Chuyển dịch cân bằng giữa công việc và đời sống", "⚖️",
   "長年「働きすぎ」と指摘されてきた日本の労働環境ですが、近年は残業時間の削減や有給休暇の取得促進が進んでいます。テレワークの導入により家族と過ごす時間が増え、仕事の成果と私生活の充実を両立させる生き方を重視する若者が増えています。",
   "Môi trường lao động Nhật Bản vốn bị chỉ trích là làm việc quá tải, nhưng những năm gần đây đã có những bước chuyển mình mạnh mẽ trong việc cắt giảm giờ làm thêm và khuyến khích nghỉ phép. Hình thức làm việc từ xa Telework giúp gia tăng thời gian cho gia đình, mang lại sự cân bằng giữa sự nghiệp và cuộc sống.",
   "近年の日本の労働環境の大きな変化は何ですか？ (Sự thay đổi lớn của môi trường làm việc ở Nhật gần đây là gì?)",
   ["残業時間を増やすこと (Tăng thêm giờ làm đêm)", "残業の削減やテレワーク導入による生活の充実 (Cắt giảm làm thêm và làm việc từ xa để cân bằng đời sống)", "休暇を禁止すること (Cấm nghỉ phép)", "会社に泊まり込むこと (Bắt ở lại công ty ngủ)"], 1,
   "Đoạn văn nêu rõ: 「残業時間の削減や有給休暇の取得促進が進んでいます」."),

  ("dokkai_n3_15", "日本の温泉街と地方創生", "Hồi sinh kinh tế địa phương từ các thị trấn Onsen", "♨️",
   "全国にある温泉街は、古くからの湯治（とうじ）文化を受け継ぐ観光資源です。近年はレトロな街並みを活かしたカフェの出店や、温泉熱を利用したエコエネルギーの開発など、新しい魅力作りに成功した地域が若者や外国人観光客を引きつけています。",
   "Các thị trấn suối nước nóng Onsen trên toàn nước Nhật là kho báu du lịch kế thừa văn hóa trị liệu nghỉ dưỡng Toji từ xa xưa. Gần đây, việc mở các quán cà phê phong cách hoài cổ retro và ứng dụng năng lượng địa nhiệt xanh đã giúp nhiều vùng quê thu hút đông đảo du khách trẻ tuổi và quốc tế.",
   "最近の温泉街が観光客を引きつけている工夫は何ですか？ (Điểm thu hút mới của các thị trấn suối nước nóng gần đây là gì?)",
   ["街並みを壊して高層ビルを建てること (Phá bỏ phố cổ xây cao ốc)", "レトロな街並みの活用やエコエネルギーの導入 (Tận dụng cảnh quan hoài cổ và ứng dụng năng lượng xanh)", "温泉の温度を上げること (Tăng nhiệt độ nước suối)", "入場料を高くすること (Tăng giá vé vào cửa)"], 1,
   "Bài viết nêu rõ: 「レトロな街並みを活かしたカフェの出店や、温泉熱を利用したエコエネルギーの開発...」."),

  ("dokkai_n3_16", "「空気を読む」コミュニケーション", "Văn hóa thấu cảm và tinh tế trong ứng xử", "🍃",
   "「空気を読む」とは、言葉で直接言われなくても周囲の状況や他人の感情を察知して適切に行動することを意味します。日本社会では相手への気遣いとして重宝される一方、過度に同調を求められる息苦しさも指摘されます。察しと思いやりをいかに調和させるかが問われています。",
   "Cụm từ 'Kuuki wo yomu' (Đọc vị bầu không khí) có nghĩa là tự cảm nhận trạng thái của những người xung quanh và ngữ cảnh để hành xử phù hợp mà không cần người khác phải nói thẳng ra. Mặc dù đây là một nét tinh tế, việc ép buộc người khác phải hòa tan vào tập thể đôi khi cũng tạo nên sự ngột ngạt.",
   "「空気を読む」という表現の意味は何ですか？ (Ý nghĩa của cụm từ 'Kuuki wo yomu' là gì?)",
   ["天気を予報すること (Dự báo thời tiết)", "周囲の状況や他人の感情を察知して行動すること (Cảm nhận tinh tế ngữ cảnh và cảm xúc người khác để hành xử)", "大声で意見を主張すること (Nói lớn tiếng áp đặt ý kiến)", "息を止めること (Nín thở)"], 1,
   "Đoạn văn định nghĩa rõ: 「周囲の状況や他人の感情を察知して適切に行動することを意味します」."),

  ("dokkai_n3_17", "ペットボトルのリサイクル技術", "Đỉnh cao công nghệ tái chế chai nhựa vì môi trường", "🧴",
   "日本のペットボトルの回収率は九十パーセントを超え、世界最高水準を誇ります。消費者がキャップとラベルを外し、水ですすいでから分別する習慣が定着しているためです。回収されたボトルは新しいペットボトルや衣料用の繊維へと効率よく再生されています。",
   "Tỷ lệ thu hồi chai nhựa PET tại Nhật Bản vượt mốc 90%, thuộc hàng cao nhất thế giới. Thành quả này bắt nguồn từ thói quen văn minh của người tiêu dùng: tháo rời nắp chai, bóc tem nhãn và tráng sạch nước trước khi vứt rác. Các chai nhựa được tái chế tuần hoàn thành chai mới hoặc dệt thành sợi quần áo.",
   "ペットボトルをリサイクルする前に行う手順はどれですか？ (Thao tác cần làm trước khi vứt chai nhựa tái chế là gì?)",
   ["そのままゴミ箱に捨てる (Vứt nguyên cả chai vào thùng)", "キャップとラベルを外し水ですすぐ (Tháo nắp, bóc nhãn và súc sạch nước)", "細かくハサミで切る (Dùng kéo cắt vụn)", "土に埋める (Chôn xuống đất)"], 1,
   "Trong bài viết ghi rõ: 「消費者がキャップとラベルを外し、水ですすいでから分別する...」."),

  ("dokkai_n3_18", "和紙（わし）の耐久性と現代の魅力", "Độ bền nghìn năm của giấy dâu tằm Washi", "📜",
   "日本の伝統的な「和紙」は、コウゾやミツマタの長い植物繊維を使って漉（す）かれます。西洋紙に比べて非常に破れにくく、千年以上の保存に耐える強靱さを持っています。現在では障子や照明器具だけでなく、高級アートや宇宙服の素材研究にも応用されています。",
   "Giấy truyền thống Washi của Nhật Bản được làm thủ công từ sợi dâu tằm Kozo và Mitsumata dài dai. So với giấy công nghiệp phương Tây, giấy Washi có độ bền kỳ diệu, lưu trữ được hơn một ngàn năm không mục nát. Ngày nay, Washi còn được ứng dụng trong đèn lồng nghệ thuật và nghiên cứu vật liệu vũ trụ.",
   "和紙が千年以上も保存できる理由は何ですか？ (Vì sao giấy Washi có thể bảo quản bền bỉ hơn ngàn năm?)",
   ["プラスチックを混ぜているから (Vì pha nhựa tổng hợp)", "植物の長い繊維を使って漉かれているから (Nhờ sợi thực vật tự nhiên dài dai dẻo)", "印刷インクが特殊だから (Nhờ mực in đặc biệt)", "暗い場所に置くだけだから (Chỉ do để chỗ tối)"], 1,
   "Đoạn văn nêu rõ: 「コウゾやミツマタの長い植物繊維を使って漉（す）かれます。西洋紙に比べて非常に破れにくく...」."),

  ("dokkai_n3_19", "フードデリバリーの普及と課題", "Bùng nổ giao thức ăn tận nơi và thách thức đô thị", "🛵",
   "スマートフォンのアプリ一つで様々なレストランの料理が届くフードデリバリーサービスは、現代の都市生活に欠かせないものとなりました。しかし、配達員の交通マナーや使い捨て容器のゴミ問題など、解決すべき新たな社会的課題も浮き彫りになっています。",
   "Các ứng dụng đặt đồ ăn trực tuyến giao tận nhà đã trở thành một phần thiết yếu của đời sống đô thị hiện đại. Tuy nhiên, sự phát triển nóng này cũng đặt ra những bài toán mới cần tháo gỡ như văn hóa lái xe an toàn của đội ngũ giao hàng và lượng rác thải từ bao bì, hộp xốp dùng một lần gia tăng.",
   "フードデリバリーの普及に伴い発生している課題は何ですか？ (Vấn đề phát sinh khi dịch vụ giao thức ăn bùng nổ là gì?)",
   ["料理の味が美味しくなること (Món ăn ngon hơn)", "配達員の交通マナーや使い捨てゴミの増加 (Ý thức giao thông người giao hàng và rác thải hộp nhựa)", "レストランが減ること (Số lượng nhà hàng sụt giảm)", "スマホが壊れること (Điện thoại bị hỏng)"], 1,
   "Bài viết nêu rõ: 「配達員の交通マナーや使い捨て容器のゴミ問題など、解決すべき新たな社会的課題も...」."),

  ("dokkai_n3_20", "伝統芸能：能と歌舞伎の鑑賞", "Chiêm ngưỡng vẻ đẹp ước lệ của Noh và Kabuki", "🎭",
   "「能（のう）」は仮面を着けた演者が静謐な動きで幽玄の世界を描く最古の舞台芸術です。一方、「歌舞伎（かぶき）」は派手な衣装とダイナミックな立回り、音楽が融合した大衆演劇です。静と動の対極にありながら、どちらも日本人の美意識を凝縮した宝物です。",
   "Kịch mặt nạ Noh là loại hình nghệ thuật sân khấu cổ xưa nhất thế giới, nơi người diễn viên đeo mặt nạ truyền tải cõi thâm viễn bằng những cử chỉ chậm rãi, tĩnh mịch. Ngược lại, kịch Kabuki lại mang tính đại chúng sôi động với trang phục lộng lẫy và các màn nhào lộn múa kiếm điêu luyện.",
   "能と歌舞伎の違いとして正しいものはどれですか？ (Điểm khác biệt đúng giữa Noh và Kabuki là gì?)",
   ["能は仮面を使い静謐、歌舞伎は派手でダイナミック (Noh đeo mặt nạ tĩnh mịch, Kabuki rực rỡ và sôi động)", "能は外国劇、歌舞伎は日本劇 (Noh là kịch nước ngoài)", "歌舞伎は音楽を使わない (Kabuki không dùng nhạc)", "どちらも同じ劇である (Cả hai là một)"], 0,
   "Đoạn văn phân tích rõ sự đối lập giữa hai môn nghệ thuật: 「能は仮面を着けた演者が静謐な動きで...歌舞伎は派手な衣装とダイナミックな立回り...」."),

  ("dokkai_n3_21", "日本のスマート農業と食料の未来", "Nông nghiệp công nghệ cao ứng dụng IoT và AI", "🌾",
   "農家の高齢化と後継者不足に直面する日本の農業では、ドローンによる農薬散布や、自動運転トラクター、AIによる収穫時期の判断など「スマート農業」が急速に導入されています。重労働から農家を解放し、若者の就農を促す切り札として期待されています。",
   "Đối mặt với tình trạng già hóa người nông dân, nông nghiệp Nhật Bản đang tiên phong triển khai 'Nông nghiệp thông minh': máy kéo tự lái, máy bay không người lái phun thuốc tự động và AI nhận diện thời điểm thu hoạch tối ưu. Công nghệ giúp giải phóng sức lao động và thu hút người trẻ trở lại làm nông.",
   "スマート農業で期待されている効果は何ですか？ (Hiệu quả kỳ vọng của nông nghiệp thông minh là gì?)",
   ["重労働の軽減と若者の就農促進 (Giảm tải lao động cực nhọc và khuyến khích người trẻ làm nông)", "農地を全部ビルにすること (Chuyển hết đất nông nghiệp thành cao ốc)", "機械を使わないこと (Không dùng máy móc)", "外国からの輸入を止めること (Cấm nhập khẩu)"], 0,
   "Trong bài có câu: 「重労働から農家を解放し、若者の就農を促す切り札として期待されています」."),

  ("dokkai_n3_22", "お辞儀（おじぎ）の角度と礼儀", "Quy chuẩn độ nghiêng khi cúi chào Ojigi", "🙇‍♂️",
   "日本のビジネスシーンでは、お辞儀の深さに明確な意味があります。軽い会釈は十五度、一般的な敬礼は三十度、最も深い最敬礼は四十五度で頭を下げます。相手への感謝や謝罪の度合いに応じて背筋を伸ばしたまま丁寧にお辞儀をすることが信頼の基礎です。",
   "Trong môi trường công sở Nhật Bản, góc độ cúi chào Ojigi mang những ý nghĩa rất rõ ràng: chào hỏi xã giao thông thường nghiêng 15 độ, chào trang trọng tôn kính nghiêng 30 độ, và nghi thức Saikeirei cúi sâu 45 độ dùng khi bày tỏ lòng tri ân sâu sắc hay xin lỗi chân thành, lưng luôn giữ thẳng.",
   "最も深い「最敬礼」の角度は何度ですか？ (Góc độ cúi chào sâu nhất Saikeirei là bao nhiêu độ?)",
   ["10度 (10 độ)", "15度 (15 độ)", "30度 (30 độ)", "45度 (45 độ)"], 3,
   "Bài viết nêu rõ: 「最も深い最敬礼は四十五度で頭を下げます」."),

  ("dokkai_n3_23", "エコバッグとプラスチック削減", "Phong trào mang túi vải và nói không với túi nilon", "🛍️",
   "二千二十年に始まったレジ袋有料化を契機に、自分専用の「マイバッグ（エコバッグ）」を持参する習慣が日本全国に定着しました。一人ひとりの小さな行動が年間数百億枚ものプラスチック袋の消費削減につながり、海洋生態系の保護に貢献しています。",
   "Kể từ khi chính sách thu phí túi nilon mua sắm có hiệu lực năm 2020, thói quen mang theo túi vải cá nhân (Eco-bag) đã in sâu vào nếp sống của người dân Nhật Bản. Hành động nhỏ bé của mỗi cá nhân đã giúp cắt giảm hàng chục tỷ chiếc túi nhựa thải ra môi trường mỗi năm, cứu sống sinh vật biển.",
   "レジ袋有料化によって何が進みましたか？ (Chính sách thu phí túi nilon đã thúc đẩy điều gì?)",
   ["マイバッグ（エコバッグ）の持参とプラ削減 (Mang theo túi cá nhân và giảm thiểu rác thải nhựa)", "ゴミのポイ捨ての増加 (Tăng vứt rác bừa bãi)", "買い物をやめること (Ngừng đi chợ)", "スーパーの倒産 (Siêu thị phá sản)"], 0,
   "Đoạn văn nêu rõ: 「自分専用の『マイバッグ（エコバッグ）』を持参する習慣が日本全国に定着しました」."),

  ("dokkai_n3_24", "シェアハウスに暮らす若者たち", "Phong cách sống gắn kết tại các Share-house", "🏠",
   "個人の個室を持ちながら、キッチンやリビングルームを共有して暮らす「シェアハウス」が都市部の若者を中心に人気を集めています。家賃や光熱費を抑えられる経済的メリットに加え、異業種の人や外国人との交流を通じて視野を広げられる点が魅力です。",
   "Mô hình nhà trọ Share-house, nơi mỗi người có phòng ngủ riêng biệt nhưng chia sẻ không gian phòng khách và bếp ăn chung, đang nở rộ trong giới trẻ đô thị. Ngoài lợi ích tiết kiệm chi phí thuê nhà và điện nước, đây còn là cơ hội giao lưu tuyệt vời với bạn bè quốc tế để mở rộng tầm nhìn cuộc sống.",
   "シェアハウスの魅力として述べられているものはどれですか？ (Điểm cuốn hút của nhà ở chung Share-house là gì?)",
   ["部屋が広すぎること (Phòng quá rộng)", "費用削減と他者との交流による視野拡大 (Tiết kiệm chi phí và mở rộng tầm nhìn nhờ giao lưu)", "掃除を誰もしないこと (Không ai phải dọn dẹp)", "一人だけで孤立できること (Có thể sống cô độc hoàn toàn)"], 1,
   "Trong bài có câu: 「家賃や光熱費を抑えられる経済的メリットに加え...視野を広げられる点が魅力です」."),

  ("dokkai_n3_25", "富士山の環境保全と入山マナー", "Bảo vệ di sản thế giới núi Phú Sĩ trước hiểm họa rác", "🗻",
   "二千十三年に世界文化遺産に登録された富士山ですが、登山者の増加に伴うゴミの投棄や環境破壊が問題視されてきました。現在では「自分のゴミは持ち帰る」という原則が徹底され、ボランティアによる清掃活動や入山料の徴収を通じて美しい景観が守られています。",
   "Được công nhận là Di sản văn hóa thế giới vào năm 2013, núi Phú Sĩ từng phải đối mặt với nguy cơ ô nhiễm nghiêm trọng do lượng rác thải của du khách leo núi. Ngày nay, nguyên tắc 'Tự mang rác về' được thực thi nghiêm ngặt cùng các phong trào tình nguyện dọn rác để giữ gìn ngọn núi linh thiêng.",
   "富士山の景観を守るための基本原則は何ですか？ (Nguyên tắc cơ bản để giữ gìn cảnh quan núi Phú Sĩ là gì?)",
   ["ゴミは山に置いて帰ること (Vứt rác lại trên núi)", "自分のゴミは自分で持ち帰ること (Rác của mình phải tự mang về)", "登山を全面禁止にすること (Cấm hoàn toàn việc leo núi)", "山にゴミ箱を大量に置くこと (Đặt thật nhiều thùng rác trên núi)"], 1,
   "Bài viết nêu rõ: 「現在では『自分のゴミは持ち帰る』という原則が徹底され...」."),

  ("dokkai_n3_26", "日本の鉄道ダイヤと正確さの秘密", "Bí ẩn đằng sau độ chuẩn xác từng giây của tàu hỏa Nhật", "⏱️",
   "日本の鉄道が秒単位で正確に運行できる背景には、高度な運行管理システムと運転士・車掌の徹底した訓練があります。「指差確認（しさかくにん）」と呼ばれる指差しと声出しによる安全確認動作はヒューマンエラーを防ぎ、世界から賞賛されています。",
   "Khả năng vận hành tàu hỏa chính xác đến từng giây của Nhật Bản bắt nguồn từ hệ thống điều phối tinh vi cùng sự khổ luyện của các lái tàu. Động tác chỉ tay và hô to khẩu lệnh 'Shisa Kakunin' giúp người vận hành không bao giờ nhầm lẫn tín hiệu đèn hay thời khắc đóng mở cửa ga.",
   "エラーを防ぐために行われる安全確認動作を何と呼びますか？ (Động tác kiểm tra an toàn bằng tay và lời nói gọi là gì?)",
   ["拍手 (Vỗ tay)", "指差確認（しさかくにん） (Chỉ tay xác nhận Shisa Kakunin)", "お辞儀 (Cúi chào)", "敬礼 (Chào kiểu quân đội)"], 1,
   "Đoạn văn nêu rõ: 「『指差確認（しさかくにん）』と呼ばれる指差しと声出しによる安全確認動作...」."),

  ("dokkai_n3_27", "白川郷と合掌造りの知恵", "Kiến trúc nhà mái tranh chống tuyết Shirakawa-go", "🛖",
   "岐阜県の白川郷にある「合掌造り（がっしょうづくり）」は、両手を合わせたような急勾配の茅葺き屋根が特徴の伝統民家です。豪雪地帯の重い雪を滑り落とすための工夫であり、釘を一本も使わずに木材と縄で組み立てられた構造は先人の知恵の結晶です。",
   "Ngôi làng cổ Shirakawa-go thuộc tỉnh Gifu nổi tiếng với những ngôi nhà mái tranh dốc đứng hình chắp tay cầu nguyện Gassho-zukuri. Độ dốc lớn giúp tuyết mùa đông tự trôi tuột xuống mà không làm sập mái nhà. Toàn bộ khung gỗ được liên kết bằng dây thừng mà không cần dùng đến một chiếc đinh sắt nào.",
   "合掌造りの屋根が急勾配になっている理由は何ですか？ (Vì sao mái nhà Gassho-zukuri lại có độ dốc rất lớn?)",
   ["風を通すため (Để đón gió mát)", "豪雪地帯の重い雪を滑り落とすため (Để tuyết nặng tự trượt rơi xuống không sập nhà)", "日光を遮るため (Để che ánh nắng)", "煙を逃がすため (Để thoát khói)"], 1,
   "Trong bài có câu: 「豪雪地帯の重い雪を滑り落とすための工夫であり...」."),

  ("dokkai_n3_28", "古着文化とリユース市場", "Trào lưu thời trang cổ điển Vintage tại Tokyo", "👕",
   "若者の街・下北沢などを中心に、ヴィンテージの古着を楽しむ文化が定着しています。過去のユニークなデザインを手頃な価格で手に入れられるだけでなく、衣服を捨てずに再利用するサステナブルな消費行動としても高い支持を集めています。",
   "Tại các khu phố thời trang sành điệu như Shimokitazawa ở Tokyo, văn hóa săn đồ quần áo secondhand vintage đã trở thành phong cách sống. Không chỉ tìm được những mẫu trang phục độc nhất vô nhị với giá phải chăng, đây còn là hành động tiêu dùng bền vững tái sử dụng thời trang bảo vệ môi trường.",
   "古着文化が若者に支持されている理由は何ですか？ (Lý do thời trang đồ cũ được giới trẻ ủng hộ là gì?)",
   ["新品より高価だから (Vì đắt hơn đồ mới)", "ユニークなデザインと環境に優しい再利用ができるから (Vì thiết kế độc đáo và hành vi tiêu dùng xanh bền vững)", "同じ服ばかりだから (Vì ai cũng mặc giống nhau)", "汚れているのが好きだから (Vì thích đồ bẩn)"], 1,
   "Đoạn văn nêu rõ: 「ユニークなデザインを手頃な価格で手に入れられるだけでなく、衣服を捨てずに再利用するサステナブルな消費行動として...」."),

  ("dokkai_n3_29", "日本の緑茶文化と健康", "Bí quyết trường thọ từ những tách trà xanh nguyên chất", "🍵",
   "緑茶に含まれるカテキンには強力な抗酸化作用があり、風邪の予防や生活習慣病の抑制に効果があると言われています。お茶を淹れる際の湯の温度によって苦味とうま味のバランスが変わり、日常の中で心身を整えるリラックスタイムとしても親しまれています。",
   "Chất Catechin dồi dào trong trà xanh Nhật Bản có hoạt tính chống oxy hóa mạnh mẽ, giúp nâng cao đề kháng phòng cảm cúm và các bệnh lý thời đại. Tùy thuộc vào nhiệt độ nước khi pha, người thưởng trà có thể cảm nhận vị chát sâu hay ngọt hậu, mang lại những phút giây thư thái thanh lọc tâm hồn.",
   "緑茶に含まれる健康に良いとされる成分は何ですか？ (Thành phần tốt cho sức khỏe có trong trà xanh là gì?)",
   ["カテキン (Catechin)", "砂糖 (Đường)", "アルコール (Cồn)", "塩分 (Muối)"], 0,
   "Đoạn văn nêu rõ: 「緑茶に含まれるカテキンには強力な抗酸化作用があり...」."),

  ("dokkai_n3_30", "人工知能（AI）と日本語教育", "Trí tuệ nhân tạo đồng hành trong học tập ngôn ngữ", "💻",
   "AI技術の急速な発展に伴い、個人の学習進度や発音の癖に合わせて個別指導を行う学習アプリが普及しています。いつでもどこでもネイティブスピーカーのような対話練習ができる利便性がある一方、人間の教師ならではの心の通った励ましや文化的文脈の指導の重要性も再認識されています。",
   "Sự bùng nổ của trí tuệ nhân tạo AI đã mở ra kỷ nguyên ứng dụng học ngoại ngữ thông minh tự động thích ứng với tốc độ và ngữ âm của từng cá nhân. Dù người học có thể đàm thoại với AI bất cứ lúc nào, vai trò truyền cảm hứng và giải thích bối cảnh văn hóa sâu sắc của các thầy cô giáo thực thụ vẫn là vô giá.",
   "AIを活用した日本語学習のメリットは何ですか？ (Ưu điểm của việc học tiếng Nhật cùng AI là gì?)",
   ["学習進度に合わせた個別練習がいつでもできること (Có thể tự học hội thoại cá nhân hóa mọi lúc mọi nơi)", "教科書が読めなくなること (Không cần đọc sách)", "先生が全員いなくなること (Không cần giáo viên)", "試験が免除されること (Được miễn thi)"], 0,
   "Bài viết nêu rõ: 「個人の学習進度や発音の癖に合わせて個別指導を行う学習アプリが普及しています」.")
]

all_n3 = []
for art in topics_n3 + more_n3:
    item = {
        "id": art[0],
        "level": "N3",
        "title": art[1],
        "subtitle": art[2],
        "coverIcon": art[3],
        "content": [
            {
                "segments": [
                    {"text": s + ("。" if not s.endswith("。") else "")} for s in art[4].split("。") if s.strip()
                ]
            }
        ],
        "translationVn": art[5],
        "quiz": {
            "question": art[6],
            "options": art[7],
            "correct": art[8],
            "explanation": art[9]
        }
    }
    all_n3.append(item)

print(f"Total N3 articles: {len(all_n3)}")
with open("/Users/huyhoang190607gmail.com/web kanji nhật/projectKanji-web/lib/readingDataN3.js", "w", encoding="utf-8") as f:
    f.write("// Dữ liệu Luyện Đọc hiểu Dokkai JLPT N3 (30 bài chuẩn)\n\n")
    f.write("export const READING_N3 = " + json.dumps(all_n3, ensure_ascii=False, indent=2) + ";\n")
