[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$data = [ordered]@{
    "掛" = @{
        sentence = "急な雨が降ってきたので、近くの店の軒下で雨宿りをしながら電話を掛けました。"
        reading = "きゅうなあめがふってきたので、ちかくのみせののきしたであまやどりをしながらでんわをかけました。"
        translation = "Cơn mưa rào bất chợt đổ xuống nên tôi ghé vào mái hiên cửa hàng gần đó vừa trú mưa vừa gọi điện thoại."
    }
    "探" = @{
        sentence = "新しいアパートに引っ越すため、インターネットで駅から近い物件を探しています。"
        reading = "あたらしいあぱーとにひっこすため、いんたーねっとでえきからちかいぶっけんをさがしています。"
        translation = "Để chuyển sang căn hộ mới, tôi đang tìm kiếm trên mạng những căn nhà gần ga."
    }
    "支" = @{
        sentence = "困難な状況に直面したとき、家族や友達の温かい支えに心から感謝しました。"
        reading = "こんなんなじょうきょうにちょくめんしたとき、かぞくやともだちのあたたかいささえにこころからかんしゃしました。"
        translation = "Khi đối mặt với hoàn cảnh khó khăn, tôi thật lòng biết ơn sự ủng hộ ấm áp từ gia đình và bạn bè."
    }
    "放" = @{
        sentence = "授業が終わって放課後になると、グラウンドから生徒たちの元気な声が聞こえてきます。"
        reading = "じゅぎょうがおわってほうかごになると、ぐらうんどからせいとたちのげんきなこえがきこえてきます。"
        translation = "Khi buổi học kết thúc và giờ tan trường đến, tiếng reo hò sôi nổi của học sinh lại vang lên từ sân bóng."
    }
    "政" = @{
        sentence = "国民の生活をより豊かにするために、政府は新しい経済政策を発表しました。"
        reading = "こくみんのせいかつをよりゆたかにするために、せいふはあたらしいけいざいせいさくをはっぴょうしました。"
        translation = "Để đời sống người dân thêm ấm no, chính phủ đã công bố những chính sách kinh tế mới."
    }
    "敗" = @{
        sentence = "一度の失敗で落ち込まずに、反省点を活かして次の挑戦に備えましょう。"
        reading = "いちどのしっぱいでおちこまずに、はんせいてんをいかしてつぎのちょうせんにそなえましょう。"
        translation = "Đừng nản lòng chỉ vì một lần thất bại, hãy rút kinh nghiệm để chuẩn bị cho lần thử thách kế tiếp."
    }
    "散" = @{
        sentence = "天気の良い日曜日の朝は、近所の緑豊かな公園をゆっくり散歩するのが日課です。"
        reading = "てんきのよいにちようびのあさは、きんじょのみどりゆたかなこうえんをゆっくりさんぽするのがにっかです。"
        translation = "Vào sáng chủ nhật đẹp trời, thong thả đi dạo ở công viên nhiều cây xanh gần nhà là thói quen của tôi."
    }
    "数" = @{
        sentence = "日本を訪れる外国人観光客の数は、年々急速に増加しています。"
        reading = "にほんをおとずれるがいこくじんかんこうきゃくのかずは、ねんねんきゅうそくにぞうかしています。"
        translation = "Số lượng khách du lịch nước ngoài đến tham quan Nhật Bản đang tăng lên nhanh chóng qua từng năm."
    }
    "断" = @{
        sentence = "せっかくのお誘いでしたが、どうしても外せない用事があったため丁重にお断りしました。"
        reading = "せっかくのおさそいでしたが、どうしてもはずせないようじがあったためていちょうにおことわりしました。"
        translation = "Dù rất tiếc lời mời nhiệt tình, nhưng vì có việc bận không thể bỏ được nên tôi đành lịch sự từ chối."
    }
    "易" = @{
        sentence = "難しい専門用語を使わずに、初心者にも分かり易い言葉で説明してください。"
        reading = "むずかしいせんもんようごをつかわずに、しょしんしゃにもわかりやすいことばでせつめいしてください。"
        translation = "Xin đừng dùng các thuật ngữ chuyên ngành phức tạp, mà hãy giải thích bằng từ ngữ dễ hiểu cho người mới bắt đầu."
    }
    "昔" = @{
        sentence = "祖母は縁側に座りながら、昔の町の様子や思い出話を懐かしそうに語ってくれました。"
        reading = "そぼはえんがわにすわりながら、むかしのまちのようすやおもいでばなしをなつかしそうにかたってくれました。"
        translation = "Bà ngồi ngoài hiên nhà và bồi hồi kể cho tôi nghe về cảnh sắc khu phố và những kỷ niệm ngày xưa."
    }
    "昨" = @{
        sentence = "昨日は一日中強い雨が降り続いていたので、家から一歩も出ずに読書をして過ごしました。"
        reading = "きのうはいちにちじゅうつよいあめがふりつづいていたので、いえからいっぽもでずにどくしょをしてすごしました。"
        translation = "Hôm qua trời mưa to suốt cả ngày nên tôi không bước chân ra khỏi nhà mà ở nhà đọc sách."
    }
    "晩" = @{
        sentence = "週末は家族みんなで食卓を囲んで、温かい手作りの晩ご飯を食べました。"
        reading = "しゅうまつはかぞくみんなでしょくたくをかこんで、あたたかいてづくりのばんごはんをたべました。"
        translation = "Cuối tuần cả gia đình quây quần bên bàn ăn thưởng thức bữa cơm tối tự nấu ấm cúng."
    }
    "景" = @{
        sentence = "山の頂上から見下ろす街の夜景は、息をのむほど美しかったです。"
        reading = "やまのちょうじょうからみおろすまちのやけいは、いきをのむほどうつくしかったです。"
        translation = "Cảnh đêm của thành phố nhìn từ trên đỉnh núi xuống đẹp đến nghẹt thở."
    }
    "晴" = @{
        sentence = "何日も続いた雨がようやく上がり、今日は朝から気持ちよく晴れ渡っています。"
        reading = "なんにちもつづいたあめがようやくあがり、きょうはあさからきもちよくはれわたっています。"
        translation = "Cơn mưa dai dẳng nhiều ngày cuối cùng cũng tạnh, hôm nay từ sáng sớm bầu trời đã nắng đẹp rực rỡ."
    }
    "暗" = @{
        sentence = "冬は日の入りが早いので、夕方五時を過ぎると外はもうすっかり暗くなります。"
        reading = "ふゆはひのいりがはやいので、ゆうがたごじをすぎるとそとはもうすっかりくらくなります。"
        translation = "Mùa đông mặt trời lặn sớm nên vừa quá 5 giờ chiều là bên ngoài trời đã tối mịt."
    }
    "暮" = @{
        sentence = "夕暮れ時になると、空が美しい茜色に染まり始めました。"
        reading = "ゆうぐれどきになると、そらがうつくしいあかねいろにそまりはじめました。"
        translation = "Cứ đến độ chiều tà chạng vạng là bầu trời lại bắt đầu nhuốm một màu đỏ hoàng hôn tuyệt mỹ."
    }
    "曲" = @{
        sentence = "次の交差点を右に曲がると、目の前に大きな郵便局が見えてきます。"
        reading = "つぎのこうさてんをみぎにまがると、めのまえにおおきなゆうびんきょくがみえてきます。"
        translation = "Rẽ phải ở ngã tư tiếp theo, bạn sẽ nhìn thấy một bưu điện lớn ngay trước mắt."
    }
    "更" = @{
        sentence = "日本語能力試験に合格したことで、日本文化への興味が更に深まりました。"
        reading = "にほんごのうりょくしけんにごうかくしたことで、にほんぶんかへのきょうみがさらにふかまりました。"
        translation = "Việc thi đỗ kỳ thi năng lực tiếng Nhật khiến niềm hứng thú của tôi với văn hóa Nhật Bản càng thêm sâu sắc."
    }
    "最" = @{
        sentence = "大切な試合の前日は、十分な睡眠を取って最高の体調で臨むようにしています。"
        reading = "たいせつなしあいのぜんじつは、じゅうぶんなすいみんをとってさいこうのたいちょうでのぞむようにしています。"
        translation = "Trước hôm thi đấu quan trọng, tôi luôn ngủ đủ giấc để bước vào trận đấu với thể trạng tốt nhất."
    }
    "望" = @{
        sentence = "どんなに厳しい状況であっても、未来への希望を失わずに前進し続けましょう。"
        reading = "どんなにきびしいじょうきょうであっても、みらいへのきぼうをうしなわずにぜんしんしつづけましょう。"
        translation = "Dù trong hoàn cảnh khắc nghiệt đến đâu, chúng ta hãy không đánh mất niềm hy vọng vào tương lai mà tiếp tục tiến bước."
    }
    "期" = @{
        sentence = "新学期が始まると、教室は新しい友達との出会いに胸を弾ませる学生たちで溢れました。"
        reading = "しんがっきがはじまると、きょうしつはあたらしいともだちとのであいにむねをはずませるがくせいたちであふれました。"
        translation = "Khi học kỳ mới bắt đầu, lớp học tràn ngập các bạn học sinh náo nức với những cuộc gặp gỡ bạn bè mới."
    }
    "未" = @{
        sentence = "未来の自分のために、今できる勉強や経験に全力で取り組んでいます。"
        reading = "みらいのじぶんのために、いまできるべんきょうやけいけんにぜんりょくでとりくんでいます。"
        translation = "Vì bản thân trong tương lai, tôi đang dốc toàn lực cho việc học hành và trải nghiệm những điều có thể làm lúc này."
    }
    "末" = @{
        sentence = "今週末は特に予定がないので、家で撮りためたドラマを一気に見るつもりです。"
        reading = "こんしゅうまつはとくによていがないので、いえでとりためたどらまをいっきにみるつもりです。"
        translation = "Cuối tuần này không có lịch trình gì đặc biệt nên tôi dự định ở nhà cày trọn bộ phim truyền hình đã lưu."
    }
    "束" = @{
        sentence = "大切な友人との約束は、どんなに忙しくても必ず守るように心がけています。"
        reading = "たいせつなゆうじんとのやくそくは、どんなにいそがしくてもかならずまもるようにこころがけています。"
        translation = "Lời hứa với người bạn thân thiết, dù có bận rộn đến mấy tôi cũng luôn cố gắng giữ đúng lời."
    }
    "杯" = @{
        sentence = "朝起きたら、まず冷たい水を一杯飲んで体をシャキッと目覚めさせます。"
        reading = "あさおきたら、まずつめたいみずをいっぱいのんでからだをしゃきっとめざめさせます。"
        translation = "Sáng thức dậy, trước tiên tôi uống một cốc nước mát để đánh thức cơ thể tỉnh táo."
    }
    "果" = @{
        sentence = "毎日の地道な練習を積み重ねた結果、大会で見事に優勝することができました。"
        reading = "まいにちのじみちなれんしゅうをつみかさねたけっか、たいかいで見事にゆうしょうすることができました。"
        translation = "Nhờ kiên trì tích lũy luyện tập mỗi ngày, tôi đã xuất sắc giành ngôi vị quán quân trong đại hội."
    }
    "格" = @{
        sentence = "毎晩遅くまで復習を重ねてきたので、第一志望の大学に合格することができました。"
        reading = "まいばんおそくまでふくしゅうをかさねてきたので、だいいちしぼうのだいがくにlookかくすることができました。"
        translation = "Nhờ ôn tập miệt mài mỗi tối đến tận khuya, tôi đã đỗ vào trường đại học nguyện vọng một."
    }
    "構" = @{
        sentence = "論文を書く前に、全体の構成をしっかり考えてアウトラインを作成しました。"
        reading = "ろんぶんをかくまえに、ぜんたいのこうせいをしっかりかんがえてあうとらいんをさくせいしました。"
        translation = "Trước khi viết luận văn, tôi đã suy nghĩ kỹ về bố cục tổng thể và lập dàn ý chi tiết."
    }
    "様" = @{
        sentence = "季節の移り変わりとともに、窓から見える木々の様子も少しずつ変化していきます。"
        reading = "きせつのうつりかわりとともに、まどからみえるきぎのようすもすこしずつへんかしていきます。"
        translation = "Cùng với sự chuyển giao của các mùa, dáng vẻ những hàng cây nhìn qua khung cửa sổ cũng dần thay đổi."
    }
    "権" = @{
        sentence = "すべての国民には、法の下で平等に自分の意見を述べる権利があります。"
        reading = "すべてのごくみんには、ほうのもとでびょうどうにじぶんのいけんをのべるけんりがあります。"
        translation = "Mọi người dân đều có quyền bình đẳng bày tỏ ý kiến của mình dưới sự bảo hộ của pháp luật."
    }
    "横" = @{
        sentence = "信号が青に変わるのを待ってから、安全に横断歩道を渡りました。"
        reading = "しんごうがあおにかわるのをまってから、あんぜんにおうだんほどうをわたしました。"
        translation = "Chờ đèn tín hiệu chuyển sang màu xanh, tôi mới an toàn bước qua vạch sang đường."
    }
    "機" = @{
        sentence = "日本へ留学に来たこの貴重な機会を活かして、多くの人と交流したいです。"
        reading = "にほんへりゅうがくにきたこのきちょうなきかいをいかして、おおくのひととこうりゅうしたいです。"
        translation = "Tranh thủ cơ hội quý báu sang Nhật du học này, tôi muốn giao lưu với thật nhiều người."
    }
    "欠" = @{
        sentence = "健康な体を維持するためには、栄養バランスの良い食事と十分な睡眠が欠かせません。"
        reading = "けんこうなからだをいじするためには、えいようばらんすのよいしょくじとじゅうぶんなすいみんがかかせません。"
        translation = "Để duy trì một cơ thể khỏe mạnh thì bữa ăn cân bằng dinh dưỡng và giấc ngủ đủ là không thể thiếu."
    }
    "次" = @{
        sentence = "電車の車内アナウンスで「次は新宿駅に停車いたします」と案内がありました。"
        reading = "でんしゃのしゃないあなうんすで「つぎはしんじゅくえきにていしゃいたします」とあんないがありました。"
        translation = 'Trên loa phát thanh tàu điện có thông báo: "Ga tiếp theo tàu dừng là ga Shinjuku".'
    }
    "欲" = @{
        sentence = "本屋の棚で見かけた新しい日本語の参考書がとても分かりやすそうで、欲しくなりました。"
        reading = "ほんやのたなでみかけたあたらしいにほんごのさんこうしょがとてもわかりやすそうで、ほしくなりました。"
        translation = "Cuốn sách tham khảo tiếng Nhật mới nhìn thấy trên giá sách trông rất dễ hiểu khiến tôi muốn mua ngay."
    }
    "歯" = @{
        sentence = "健康な歯を保つために、毎食後必ず丁寧に歯磨きをするようにしています。"
        reading = "けんこうなはをたもつために、まいしょくごかならずていねいにはみがきをするようにしています。"
        translation = "Để giữ gìn hàm răng chắc khỏe, sau mỗi bữa ăn tôi đều chú ý đánh răng cẩn thận."
    }
    "歳" = @{
        sentence = "二十歳を迎えた記念に、両親へ感謝の気持ちを込めて手紙を書きました。"
        reading = "はたちをむかえたきねんに、りょうしんへかんしゃのきもちをこめててがみをかきました。"
        translation = "Kỷ niệm tuổi 20, tôi đã viết một bức thư gửi trọn lòng biết ơn tới cha mẹ."
    }
    "残" = @{
        sentence = "仕事がまだ少し残っているので、今日は三十分ほど残業してから帰ります。"
        reading = "しごとがまだすこしのこっているので、きょうはさんじゅっぷんほどざんぎょうしてからかえります。"
        translation = "Vì công việc vẫn còn sót lại một chút nên hôm nay tôi sẽ tăng ca khoảng 30 phút rồi mới về."
    }
    "段" = @{
        sentence = "駅の長い階段を登るときは、無理をせずに一段ずつゆっくり歩きます。"
        reading = "えきのながいかいだんをのぼるときは、むりをせずについちだんずつゆっくりあるきます。"
        translation = "Khi leo chiếc cầu thang dài của nhà ga, tôi thong thả bước từng bậc một mà không vội vàng."
    }
    "殺" = @{
        sentence = "連休の初日は空港が観光客で混雑を極め、ごった返して殺気立っていました。"
        reading = "れんきゅうのしょにちはくうこうがかんこうきゃくでこんざつをきわめ、ごったかえしてさっきだっていました。"
        translation = "Ngày đầu kỳ nghỉ lễ, sân bay chật ních khách du lịch chen lấn vô cùng căng thẳng."
    }
    "民" = @{
        sentence = "地域住民の安全を守るために、夜間も警察官がパトロールを行っています。"
        reading = "ちいきじゅうみんのあんぜんをまもるために、やかんもけいさつかんがぱとろーるをおこなっています。"
        translation = "Để bảo vệ an toàn cho cư dân địa phương, cảnh sát vẫn tiến hành tuần tra cả vào ban đêm."
    }
    "求" = @{
        sentence = "就職活動のために求人情報を詳しく調べ、希望する企業に応募書類を送りました。"
        reading = "しゅうしょくかつどうのためにきゅうじんじょうほうをくわしくしらべ、きぼうするきぎょうにおうぼしょるいをおくりました。"
        translation = "Để tìm việc, tôi tìm hiểu kỹ thông tin tuyển dụng và gửi hồ sơ ứng tuyển tới các doanh nghiệp mong muốn."
    }
    "決" = @{
        sentence = "来週の旅行の行き先について友達と話し合い、京都へ行くことに決定しました。"
        reading = "らいしゅうのりょこうのいきさきについてともだちとはなしあい、きょうとへいくことにけっていしました。"
        translation = "Thảo luận với bạn bè về điểm đến của chuyến du lịch tuần tới, chúng tôi đã quyết định sẽ đi Kyoto."
    }
    "治" = @{
        sentence = "医師の指示通りに薬を飲んでしっかり休んだら、風邪がすっかり治りました。"
        reading = "いしのしじどおりにくすりをのんでしっかりやすんだら、かぜがすっかりなおりました。"
        translation = "Uống thuốc đúng theo chỉ dẫn của bác sĩ và nghỉ ngơi đầy đủ, tôi đã khỏi hẳn bệnh cảm cúm."
    }
    "法" = @{
        sentence = "新しいパソコンの操作方法がよく分からないので、詳しい同僚に教えてもらいました。"
        reading = "あたらしいぱそこんのそうさほうほうがよくわからないので、くわしいどうりょうにおしえてもらいました。"
        translation = "Không rành cách thao tác chiếc máy tính mới nên tôi đã nhờ người đồng nghiệp thành thạo chỉ giúp."
    }
    "泳" = @{
        sentence = "夏休みになると、近所の市民プールへ行って友達と楽しく水泳をします。"
        reading = "なつやすみになると、きんじょのしみんぷーるへいってともだちとたのしくすいえいをします。"
        translation = "Cứ đến kỳ nghỉ hè là tôi lại ra hồ bơi công cộng gần nhà cùng bạn bè bơi lội thỏa thích."
    }
    "洗" = @{
        sentence = "感染症を予防するために、帰宅したらまず石鹸で丁寧に手を洗うことが大切です。"
        reading = "かんせんしょうをよぼうするために、きたくしたらまずせっけんでていねいにてをあらうことがたいせつです。"
        translation = "Để phòng ngừa bệnh truyền nhiễm, khi về đến nhà việc rửa tay kỹ bằng xà phòng là vô cùng quan trọng."
    }
    "活" = @{
        sentence = "休みの日は家でじっとしていないで、外へ出てスポーツなどの活動を楽しんでいます。"
        reading = "やすみのひはいえでじっとしていないで、そとへでてすぽーつなどのかつどうをたのしんでいます。"
        translation = "Vào ngày nghỉ tôi không ngồi yên trong nhà mà ra ngoài tham gia các hoạt động thể thao vui vẻ."
    }
    "流" = @{
        sentence = "山奥の谷を流れる川の水は透き通るほど清らかで、とても冷たかったです。"
        reading = "やまおくのたにをながれるかわのみずはすきとおるほどきよらかで、とてもつめたかったです。"
        translation = "Dòng nước suối chảy qua thung lũng sâu trong núi trong vắt nhìn thấy đáy và mát lạnh buốt người."
    }
    "浮" = @{
        sentence = "秋の静かな池の表面に、色鮮やかな紅葉の落ち葉が何枚も浮いています。"
        reading = "あきのしずかないけのひょうめんに、いろあざやかなこうようのおちばがなんまいもういています。"
        translation = "Trên mặt hồ mùa thu tĩnh mịch, những chiếc lá phong đổi màu sặc sỡ đang lững lờ trôi nổi."
    }
    "消" = @{
        sentence = "外出するときは、部屋の電気やエアコンのスイッチを必ず消すようにしています。"
        reading = "がいしゅつするときは、へやのでんきやえあこんのすいっちをかならずけすようにしています。"
        translation = "Mỗi khi đi ra ngoài, tôi luôn chú ý tắt hẳn đèn điện và công tắc máy điều hòa trong phòng."
    }
}

Write-Host "Group 2 count: $($data.Count) Kanji"

$jsonPath = "kanji_full_database.json"
$jsPath = "kanji_full_database.js"

$raw = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$tplRegex = 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

# Validation
foreach ($k in $data.Keys) {
    $info = $data[$k]
    if (-not $info.sentence.Contains($k)) {
        Write-Error "Lỗi: Kanji $k không có trong sentence: $($info.sentence)"
        exit 1
    }
    if ($info.sentence -match $tplRegex) {
        Write-Error "Lỗi: Kanji $k chứa template"
        exit 1
    }
    if (-not $db.psobject.Properties[$k]) {
        Write-Error "Lỗi: Không tìm thấy $k trong DB"
        exit 1
    }
}

# Update DB
foreach ($k in $data.Keys) {
    $val = $db.psobject.Properties[$k].Value
    $val.example = [PSCustomObject]@{
        sentence = $data[$k].sentence
        reading = $data[$k].reading
        translation = $data[$k].translation
    }
}

$outJson = $db | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($jsonPath, $outJson, [System.Text.Encoding]::UTF8)
$jsContent = "window.KANJI_FULL_DATABASE = $outJson;"
[System.IO.File]::WriteAllText($jsPath, $jsContent, [System.Text.Encoding]::UTF8)

Write-Host "Group 2 (52 Kanji: 掛 .. 消) đã lưu thành công!" -ForegroundColor Green
