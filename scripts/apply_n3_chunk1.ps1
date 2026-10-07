[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$data = [ordered]@{
    "光" = @{
        sentence = "朝のカーテンを開けると、部屋に明るい日光が差し込んできました。"
        reading = "あさのかーてんをあけると、へやにあかるい日光がさしこんできました。"
        translation = "Vừa mở rèm cửa ban mai, ánh nắng ban mai rực rỡ đã chiếu rọi vào khắp căn phòng."
    }
    "全" = @{
        sentence = "明日からの旅行に備えて、必要な荷物は全てスーツケースに詰めました。"
        reading = "あしたからのりょこうにそなえて、ひつようなにもつはすべてすーつけーすにつめました。"
        translation = "Để chuẩn bị cho chuyến du lịch từ ngày mai, tôi đã xếp toàn bộ hành lý cần thiết vào vali."
    }
    "共" = @{
        sentence = "困難な課題に直面したときこそ、仲間と共に協力して乗り越えることが大切です。"
        reading = "こんなんなかだいにちょくめんしたときこそ、なかまとともにきょうりょくしてのりこえることがたいせつです。"
        translation = "Chính vào những lúc đối mặt với thử thách gian nan thì việc cùng chung sức với đồng đội vượt qua là điều quan trọng."
    }
    "具" = @{
        sentence = "棚を自分で組み立てるために、必要な工具をホームセンターで買ってきました。"
        reading = "たなをじぶんでくみたてるために、ひつようなこうぐをほーむせんたーでかってきました。"
        translation = "Để tự mình lắp ráp chiếc kệ sách, tôi đã mua các dụng cụ cần thiết ở cửa hàng đồ gia dụng."
    }
    "内" = @{
        sentence = "海外からのお客様に、古い歴史を持つ京都の市内を案内しました。"
        reading = "かいがいからのおきゃくさまに、ふるいれきしをもつきょうとのしないをあんないしました。"
        translation = "Tôi đã dẫn những vị khách đến từ nước ngoài đi tham quan khu nội thành Kyoto cổ kính."
    }
    "冷" = @{
        sentence = "暑い夏の日には、冷蔵庫で冷やした麦茶を飲むのが一番です。"
        reading = "あついなつのひには、れいぞうこでひやしたむぎちゃをのむのがいちばんです。"
        translation = "Vào những ngày hè oi bức, uống trà lúa mạch ướp lạnh trong tủ lạnh là tuyệt vời nhất."
    }
    "処" = @{
        sentence = "トラブルが発生したときは、落ち着いて冷静に処理しなければなりません。"
        reading = "とらぶるがはっせいしたときは、おちついてれいせいにしょりしなければなりません。"
        translation = "Khi sự cố phát sinh, bạn phải giữ bình tĩnh để xử lý một cách thấu đáo."
    }
    "列" = @{
        sentence = "新しくオープンした人気のパン屋の前に、長い行列ができていました。"
        reading = "あたらしくおーぷんしたにんきのぱんやのまえに、ながいぎょうれつができていました。"
        translation = "Phía trước tiệm bánh mì nổi tiếng vừa mới khai trương, một hàng dài người xếp hàng đang chờ đợi."
    }
    "初" = @{
        sentence = "初めて一人で海外へ行く前夜は、不安と期待でなかなか眠れませんでした。"
        reading = "はじめてひとりでかいがいへいくぜんやは、ふあんときたいでなかなかねむれませんでした。"
        translation = "Đêm trước ngày đầu tiên ra nước ngoài một mình, tôi trằn trọc mãi chẳng ngủ được vì vừa lo vừa mong chờ."
    }
    "判" = @{
        sentence = "噂話だけを信じないで、自分の目で確かめて冷静に判断してください。"
        reading = "うわさばなしだけをしんじないで、じぶんのめでたしかめてれいせいにはんだんしてください。"
        translation = "Đừng chỉ tin vào những lời đồn thổi, hãy tự mình kiểm chứng bằng mắt và phán đoán thật bình tĩnh."
    }
    "利" = @{
        sentence = "週末の連休を利用して、静かな温泉旅館へリフレッシュしに行きました。"
        reading = "しゅうまつのれんきゅうをりようして、しずかなおんせんりょかんへりふれっしゅしにいきました。"
        translation = "Tranh thủ kỳ nghỉ dài cuối tuần, tôi đã đi đến một nhà trọ suối nước nóng yên tĩnh để thư giãn nạp lại năng lượng."
    }
    "到" = @{
        sentence = "長時間のフライトを終えて、ようやく目的地へ無事に到着しました。"
        reading = "ちょうじかんのふらいとをおえて、ようやくもくてきちへぶじにとうちゃくしました。"
        translation = "Sau chuyến bay dài nhiều giờ đồng hồ, cuối cùng tôi cũng đã đến nơi an toàn."
    }
    "制" = @{
        sentence = "学校の校則や社会の制度は、時代に合わせて見直されることがあります。"
        reading = "がっこうのこうそくやしゃかいのせいどは、じだいにあわせてみなおされることがあります。"
        translation = "Nội quy trường học hay các chế độ xã hội đôi khi được xem xét điều chỉnh lại cho phù hợp với thời đại."
    }
    "刻" = @{
        sentence = "電車の発車時刻が近づいてきたので、急いでホームへ向かいました。"
        reading = "でんしゃのはっしゃじこくがちかづいてきたので、いそいでほーむへむかいました。"
        translation = "Vì đã cận kề giờ khởi hành của tàu điện nên tôi đã rảo bước vội vã lên sân ga."
    }
    "割" = @{
        sentence = "夕方のスーパーでは、惣菜やお弁当が二割引で売られていてお得です。"
        reading = "ゆうがたのすーぱーでは、そうざい衰やおべんとうがにわりびきでうられていておとくです。"
        translation = "Vào chiều muộn ở siêu thị, đồ ăn sẵn và cơm hộp được giảm giá 20% nên mua rất hời."
    }
    "加" = @{
        sentence = "来週の日曜日に開催されるボランティア活動に、積極的に参加する予定です。"
        reading = "らいしゅうのにちようびにかいさいされるぼらんてぃあかつどうに、せっきょくてきにさんかするよていです。"
        translation = "Tôi dự định sẽ tích cực tham gia vào hoạt động tình nguyện được tổ chức vào chủ nhật tuần tới."
    }
    "助" = @{
        sentence = "道に迷って困っていたとき、地元の方が親切に助けてくれました。"
        reading = "みちにまよってこまっていたとき、じもとのほうがおやせつにたすけてくれました。"
        translation = "Khi tôi bị lạc đường và đang bối rối, người dân địa phương đã ân cần giúp đỡ tôi."
    }
    "努" = @{
        sentence = "夢を叶えるためには、毎日諦めずに努力を積み重ねることが欠かせません。"
        reading = "ゆめをかなえるためには、まいにちあきらめずにどりょくをつみかさねることがかかせません。"
        translation = "Để biến ước mơ thành hiện thực thì việc không từ bỏ mà nỗ lực từng ngày là điều không thể thiếu."
    }
    "労" = @{
        sentence = "長年会社のために一生懸命働いてくれた父の苦労に、心から感謝しています。"
        reading = "ながねんかいしゃのためにいっしょうけんめいはたらいてくれたちちのくろうに、こころからかんしゃしています。"
        translation = "Tôi chân thành cảm ơn những nỗi nhọc nhằn của người cha đã tận tụy cống hiến vì công ty suốt nhiều năm qua."
    }
    "務" = @{
        sentence = "新しい部署に異動してから、毎日の業務を覚えるのに必死です。"
        reading = "あたらしいぶしょにいどうしてから、まいにちのぎょうむをおぼえるのにひっしです。"
        translation = "Kể từ khi chuyển sang bộ phận mới, tôi dốc hết sức để học và nắm bắt công việc chuyên môn hàng ngày."
    }
    "勝" = @{
        sentence = "厳しい練習を耐え抜いた末に、昨日の試合で強敵に勝利することができました。"
        reading = "きびしいれんしゅうをたえぬいたすえに、きのうのしあいできょうてきにしょうりすることができました。"
        translation = "Sau khi kiên trì vượt qua những buổi tập luyện khắc nghiệt, chúng tôi đã giành chiến thắng trước đối thủ mạnh trong trận hôm qua."
    }
    "勤" = @{
        sentence = "大学を卒業した後は、大手の貿易会社に勤務することが決まりました。"
        reading = "だいがくをそつぎょうしたあとは、おおてのぼうえきかいしゃにきんむすることがきまりました。"
        translation = "Sau khi tốt nghiệp đại học, tôi đã được nhận vào làm việc tại một công ty thương mại lớn."
    }
    "化" = @{
        sentence = "スマートフォンの普及によって、私たちの生活環境は大きく変化しました。"
        reading = "すまーとふぉんのふきゅうによって、わたしたちのせいかつかんきょうはおおきくへんかしました。"
        translation = "Nhờ sự phổ biến của điện thoại thông minh, môi trường sống của chúng ta đã biến chuyển rất lớn."
    }
    "単" = @{
        sentence = "複雑に見える問題でも、小さな部分に分ければ簡単に解決できることがあります。"
        reading = "ふくざつにみえるもんだいでも、ちいさなぶぶんにわければかんたんにかいけつできることがあります。"
        translation = "Ngay cả những vấn đề trông có vẻ phức tạp nhưng nếu chia nhỏ ra từng phần thì đôi khi có thể giải quyết rất đơn giản."
    }
    "危" = @{
        sentence = "夜遅くに人通りの少ない暗い道を一人で歩くのは非常に危険です。"
        reading = "よるおそくにひとどおりのすくないくらいみちをひとりであるくのはひじょうにきけんです。"
        translation = "Đi bộ một mình trên con đường tối tăm vắng bóng người qua lại vào đêm muộn là vô cùng nguy hiểm."
    }
    "原" = @{
        sentence = "機械が急に動かなくなった原因を、技術者が詳しく調べています。"
        reading = "きかいがきゅうにうごかなくなったげんいんを、ぎじゅつしゃがくわしくしらべています。"
        translation = "Người kỹ thuật viên đang điều tra kỹ lưỡng nguyên nhân khiến cỗ máy đột nhiên ngừng hoạt động."
    }
    "参" = @{
        sentence = "来月の日本語スピーチ大会に参加するために、毎日原稿の練習をしています。"
        reading = "らいげつのにほんごすぴーちたいかいにさんかするために、まいにちげんこうのれんしゅうをしています。"
        translation = "Để tham gia cuộc thi hùng biện tiếng Nhật vào tháng tới, mỗi ngày tôi đều luyện đọc bản thảo."
    }
    "反" = @{
        sentence = "新しい提案について会議で話し合いましたが、予想以上に反対意見が多く出ました。"
        reading = "あたらしいていあんについてかいぎではなしあいましたが、よそういじょうにはんたいいけんがおおくでました。"
        translation = "Chúng tôi đã thảo luận về đề xuất mới trong cuộc họp, nhưng có nhiều ý kiến phản đối xuất hiện hơn dự kiến."
    }
    "収" = @{
        sentence = "秋の季節になると、農家の人たちは忙しくお米の収穫を行います。"
        reading = "あきのきせつになると、のうかのひとたちはいそがしくおこめのしゅうかくをおこないます。"
        translation = "Cứ đến độ mùa thu là những người nông dân lại tất bật thu hoạch lúa mùa."
    }
    "取" = @{
        sentence = "棚の一番上にある分厚い辞書を取ろうとして、背伸びをしました。"
        reading = "たなのいちばんうえにあるぶあついじしょをとろうとして、せのびをしました。"
        translation = "Tôi kiễng chân lên để với lấy cuốn từ điển dày cộp nằm ở ngăn trên cùng của chiếc giá sách."
    }
    "受" = @{
        sentence = "大学の入学試験を受けるために、過去の問題集を何冊も解きました。"
        reading = "だいがくのにゅうがくしけんをうけるために、かこのもんだいしゅうをなんさつもときました。"
        translation = "Để dự kỳ thi tuyển sinh đại học, tôi đã giải không biết bao nhiêu cuốn sách đề thi của các năm trước."
    }
    "可" = @{
        sentence = "どれほど困難な状況であっても、諦めない限り成功の可能性は残っています。"
        reading = "どれほどこんなんなじょうきょうであっても、あきらめないかぎりせいこうのかのうせいはのこっています。"
        translation = "Cho dù hoàn cảnh có khó khăn đến mức nào đi nữa, chỉ cần không bỏ cuộc thì khả năng thành công vẫn luôn còn đó."
    }
    "号" = @{
        sentence = "部屋の番号を確認してから、ホテルのフロントで鍵を受け取りました。"
        reading = "へやのばんごうをかくにんしてから、ほてるのふろんとでかぎをうけとりました。"
        translation = "Sau khi kiểm tra số phòng, tôi đã nhận chìa khóa ở quầy lễ tân của khách sạn."
    }
    "合" = @{
        sentence = "明日の夕方に駅前のカフェで待ち合わせをすることにしました。"
        reading = "あしたのゆうがたにえきまえのかふぇでまちあわせをすることにしました。"
        translation = "Chúng tôi đã quyết định sẽ hẹn gặp nhau tại quán cà phê phía trước nhà ga vào chiều mai."
    }
    "向" = @{
        sentence = "困難に直面しても立ち止まらず、前を向いて一歩ずつ進んでいきましょう。"
        reading = "こんなんにちょくめんしてもたちどまらず、まえをむいていっぽずつすすんでいきましょう。"
        translation = "Dẫu đối mặt với chông gai cũng đừng chùn bước, hãy nhìn về phía trước và tiến bước từng bước một."
    }
    "君" = @{
        sentence = "大学時代からの親しい友人である田中君と、久しぶりに居酒屋でお酒を飲みました。"
        reading = "だいがくじだいからのしたしいゆうじんであるたなかくんと、ひさしぶりにいざかやおさけをのみました。"
        translation = "Tôi đã cùng cậu bạn thân Tanaka từ thời đại học đi uống rượu ở quán nhậu sau một thời gian dài xa cách."
    }
    "否" = @{
        sentence = "他人の価値観を一方的に否定するのではなく、互いに理解し合う姿勢が必要です。"
        reading = "たにんのかちかんをいっぽうてきにひていするのではなく、たがいにりかいしあうしせいがひつようです。"
        translation = "Thay vì phủ định phiến diện quan điểm của người khác, chúng ta cần có thái độ thấu hiểu lẫn nhau."
    }
    "吸" = @{
        sentence = "早朝の澄んだ森の中で、思い切り新鮮な空気を深く吸い込みました。"
        reading = "そうちょうのすんだもりのなかで、おもいきりしんせんなくうきをふかくすいこみました。"
        translation = "Giữa khu rừng ban mai trong lành, tôi đã hít thở thật sâu luồng không khí tinh khôi sảng khoái."
    }
    "吹" = @{
        sentence = "春が訪れると、心地よい暖かい南風が街中をやさしく吹き抜けていきます。"
        reading = "はるがおとずれると、ここちよいあたたかいみなみかぜがまちじゅうをやさしくふきぬけていきます。"
        translation = "Khi mùa xuân chạm ngõ, làn gió nam ấm áp dễ chịu nhẹ nhàng thổi bay qua khắp phố phường."
    }
    "告" = @{
        sentence = "駅の大きな電子掲示板で、電車の運転見合わせを知らせる広告が表示されていました。"
        reading = "えきのおおきなでんしけいじばんで、でんしゃのうんてんみあわせをしらせるこうこくがひょうじされていました。"
        translation = "Trên bảng điện tử lớn ở nhà ga đang hiển thị thông báo tin tức tạm ngừng chạy tàu."
    }
    "呼" = @{
        sentence = "レストランで注文が決まったので、店員さんを大きな声で呼びました。"
        reading = "れすとらんでちゅうもんがきまったので、てんいんさんをおおきなこえでよびました。"
        translation = "Vì đã chọn xong món ở nhà hàng nên tôi đã cất tiếng gọi người nhân viên phục vụ."
    }
    "命" = @{
        sentence = "いかなる時であっても、地球上のすべての生き物の命は尊く守られるべきです。"
        reading = "いかなるときであっても、ちきゅうじょうのすべてのいきもののいのちはとうとくまもられるべきです。"
        translation = "Dù trong bất kỳ hoàn cảnh nào, sinh mạng của muôn loài trên Trái Đất đều đáng quý và cần được chở che."
    }
    "和" = @{
        sentence = "日本へ留学に来てから、伝統的な和食の奥深い味わいに魅了されました。"
        reading = "にほんへりゅうがくにきてから、でんとうてきなわしょくのおくぶかいあじわいにみりょうされました。"
        translation = "Kể từ khi sang Nhật Bản du học, tôi đã bị mê hoặc bởi hương vị đậm đà tinh tế của những món ăn truyền thống Nhật Bản."
    }
    "商" = @{
        sentence = "駅前の賑やかな商店街には、昔ながらの個人商店がたくさん立ち並んでいます。"
        reading = "えきまえのにぎやかなしょうてんがいには、むかしながらのこじんしょうてんがたくさんたちならんでいます。"
        translation = "Trên con phố mua sắm sầm uất trước nhà ga, rất nhiều tiệm buôn cá nhân từ thuở xưa san sát nối tiếp nhau."
    }
    "喜" = @{
        sentence = "家族に合格の知らせを伝えたら、涙を流して心から喜んでくれました。"
        reading = "かぞくにごうかくのしらせをつたえたら、なみだをながしてこころからよろこんでくれました。"
        translation = "Khi tôi báo tin thi đỗ cho gia đình, cả nhà đã rơi nước mắt mừng rỡ khôn xiết."
    }
    "回" = @{
        sentence = "大切な用事があるため、今日は仕事を終えたら寄り道せずに家に帰回します。"
        reading = "たいせつなようじがあるため、きょうはしごとをおえたらよりみちせずにいえにかいかいします。"
        translation = "Do có việc bận quan trọng nên hôm nay sau khi xong việc tôi sẽ quay về thẳng nhà."
    }
    "因" = @{
        sentence = "事故の直接の原因を究明するために、警察が現場検証を行っています。"
        reading = "じこのちょくせつのげんいんをきゅうめいするために、けいさつがげんばけんしょうをおこなっています。"
        translation = "Để điều tra làm sáng tỏ nguyên nhân trực tiếp của vụ tai nạn, cảnh sát đang tiến hành khám nghiệm hiện trường."
    }
    "困" = @{
        sentence = "言葉が通じなくて困っていた私に、地元の人が身振り手振りで親切に教えてくれました。"
        reading = "ことばがつうじなくてこまっていたわたしに、じもとのひとがみぶりてぶりでしんせつにおしえてくれました。"
        translation = "Khi tôi đang bối rối vì rào cản ngôn ngữ, người bản xứ đã nhiệt tình dùng cử chỉ tay chỉ dẫn cho tôi."
    }
    "園" = @{
        sentence = "週末の晴れた日に、家族みんなで上野の動物園へパンダを見に行きました。"
        reading = "しゅうまつのはれたひに、かぞくみんなでうえののどうぶつえんへぱんだをみにいきました。"
        translation = "Vào ngày cuối tuần nắng đẹp, cả gia đình tôi đã cùng nhau đi đến sở thú Ueno để ngắm gấu trúc."
    }
    "在" = @{
        sentence = "現在は東京のIT企業でウェブエンジニアとして毎日元気に働いています。"
        reading = "げんざいはとうきょうのあいてぃーきぎょうでうぇぶえんじにあとしてまいにちげんきにはたらいています。"
        translation = "Hiện tại tôi đang hăng say làm việc mỗi ngày với tư cách là kỹ sư web tại một công ty công nghệ ở Tokyo."
    }
    "報" = @{
        sentence = "毎朝出勤する前に、テレビのニュースや天気予報を確認するのが日課です。"
        reading = "まいあさしゅっきんするまえに、てれびのにゅーすやてんきよほうをかくにんするのがにっかです。"
        translation = "Trước khi đi làm mỗi sáng, xem tin tức thời sự và dự báo thời tiết trên tivi là thói quen thường nhật của tôi."
    }
    "増" = @{
        sentence = "日本を訪れる外国人観光客の数は、ここ数年で急激に増加しています。"
        reading = "にほんをおとずれるがいこくじんかんこうきゃくのかずは、ここすうねんできゅうげきにぞうかしています。"
        translation = "Lượng khách du lịch nước ngoài đến tham quan Nhật Bản đã gia tăng nhanh chóng trong vài năm trở lại đây."
    }
    "声" = @{
        sentence = "朝の散歩中に木々の間から美しい鳥の鳴き声が心地よく聞こえてきました。"
        reading = "あさのさんぽちゅうにきぎのあいだからうつくしいとりのなきごえがここちよくきこえてきました。"
        translation = "Trong lúc đi dạo buổi sáng, tiếng chim hót véo von trong vắt vang lại êm ái từ những rặng cây."
    }
    "変" = @{
        sentence = "季節の変わり目は体調を崩しやすいので、十分な睡眠を取るようにしてください。"
        reading = "きせつのかわりめはたいちょうをくずしやすいので、じゅうぶんなすいみんをとるようにしてください。"
        translation = "Thời điểm giao mùa rất dễ bị mệt ốm trong người, bạn hãy nhớ ngủ nghỉ thật đầy đủ nhé."
    }
    "夢" = @{
        sentence = "子供の頃からの夢だった通訳の仕事に就くために、毎日日本語を猛勉強しています。"
        reading = "こどものころからのゆめだったつうやくのしごとにつくために、まいにちにほんごをもうべんきょうしています。"
        translation = "Để có thể chạm tới ước mơ làm phiên dịch viên từ thuở ấu thơ, ngày nào tôi cũng miệt mài dùi mài tiếng Nhật."
    }
    "太" = @{
        sentence = "公園の真ん中には、樹齢数百年を超える太い幹のクスノキがそびえ立っています。"
        reading = "こうえんのまんなかには、じゅれいすうひゃくねんをこえるふといみきのくすのきがそびえたっています。"
        translation = "Ở chính giữa công viên, một cây long não cổ thụ với thân cây to lớn vững chãi vươn cao sừng sững."
    }
    "夫" = @{
        sentence = "狭い部屋を広く使えるように、家具の配置を工夫して模様替えをしました。"
        reading = "せまいへやをひろくつかえるように、かぐのはいちをくふうしてもようがえをしました。"
        translation = "Để căn phòng nhỏ có thể sử dụng rộng rãi hơn, tôi đã dày công sắp đặt bài trí lại đồ đạc."
    }
    "失" = @{
        sentence = "誰でも失敗することはあるので、落ち込まずに次の機会へ向けて前を向きましょう。"
        reading = "だれでもしっぱいすることはあるので、おちこまずにつぎのきかいへむけてまえをむきましょう。"
        translation = "Ai cũng có lúc thất bại nên bạn đừng chán nản mà hãy nhìn về phía trước để hướng tới cơ hội tiếp theo nhé."
    }
    "好" = @{
        sentence = "休日の午後には、お気に入りのカフェで好きな本を読みながらのんびり過ごします。"
        reading = "きゅうじつのごごには、おきにいりのかふぇですきなほんをよみながらのんびりすごします。"
        translation = "Vào chiều ngày nghỉ, tôi thảnh thơi vừa đọc cuốn sách yêu thích vừa nhâm nhi đồ uống tại quán cà phê quen thuộc."
    }
    "妻" = @{
        sentence = "休みの日は妻と一緒に近所のスーパーへ行って、夕食の買い出しをします。"
        reading = "やすみのひはつまいっしょにきんじょのすーぱーへいって、ゆうしょくのかいだしをします。"
        translation = "Vào ngày nghỉ, tôi cùng vợ đi siêu thị gần nhà để mua thực phẩm cho bữa tối."
    }
}

Write-Host "Chunk 1 count: $($data.Count) Kanji"

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

Write-Host "Chunk 1 (60 Kanji: 光 .. 妻) đã lưu thành công!" -ForegroundColor Green
