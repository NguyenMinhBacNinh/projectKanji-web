[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$items = [ordered]@{
    "曜" = @{
        sentence = "今日は何曜日ですか。"
        reading = "きょうはなんようびですか。"
        translation = "Hôm nay là thứ mấy thế bạn?"
    }
    "有" = @{
        sentence = "京都には有名な神社やお寺がたくさんあります。"
        reading = "きょうとにはゆうめいなじんじゃやおてらがたくさんあります。"
        translation = "Ở Kyoto có rất nhiều đền thờ và chùa chiền nổi tiếng."
    }
    "服" = @{
        sentence = "デパートへ行って新しい冬の服を買いに行きました。"
        reading = "でぱーとへいってあたらしいふゆのふくをかいにいきました。"
        translation = "Tôi đã đến trung tâm thương mại để mua quần áo mùa đông mới."
    }
    "朝" = @{
        sentence = "毎朝六時に起きて近くの公園を散歩しています。"
        reading = "まいあさろくじにおきてちかくのこうえんをさんぽしています。"
        translation = "Mỗi sáng tôi thức dậy lúc 6 giờ và đi dạo ở công viên gần nhà."
    }
    "業" = @{
        sentence = "大学を卒業した後は日系企業でITの仕事をする予定です。"
        reading = "だいがくをそつぎょうしたあとはにっけいきぎょうであいてぃーのしごとをするよていです。"
        translation = "Sau khi tốt nghiệp đại học, tôi dự định sẽ làm công việc IT tại một doanh nghiệp Nhật Bản."
    }
    "楽" = @{
        sentence = "休みの日は部屋で好きな音楽を聴きながらリラックスします。"
        reading = "やすみのひはいえですきなおんがくをききながらりらっくすします。"
        translation = "Vào ngày nghỉ, tôi vừa nghe bản nhạc yêu thích trong phòng vừa thư giãn."
    }
    "歌" = @{
        sentence = "週末に友達とカラオケへ行って日本の歌をたくさん歌いました。"
        reading = "しゅうまつにともだちとからおけへいってにほんのうたをたくさんうたいました。"
        translation = "Cuối tuần tôi đã cùng bạn bè đi hát karaoke và hát rất nhiều bài hát tiếng Nhật."
    }
    "止" = @{
        sentence = "赤い信号の前で車が静かに止まりました。"
        reading = "あかいしんごうのまえでくるまがしずかにとまりました。"
        translation = "Chiếc xe ô tô đã dừng lại nhẹ nhàng trước cột đèn tín hiệu màu đỏ."
    }
    "正" = @{
        sentence = "問題をよく読んで正しい答えを一つ選んでください。"
        reading = "もんだいをよくよんでただしいこたえをひとつえらんでください。"
        translation = "Hãy đọc kỹ câu hỏi và chọn lấy một câu trả lời chính xác nhé."
    }
    "歩" = @{
        sentence = "駅から家まで歩いて十五分くらいかかります。"
        reading = "えきからいえまであるいてじゅうごふんくらいかかります。"
        translation = "Từ nhà ga đi bộ về nhà tôi mất khoảng mười lăm phút."
    }
    "死" = @{
        sentence = "水をやるのを忘れてしまい、ベランダの花が枯れて死んでしまいました。"
        reading = "みずをやるのをわすれてしまい、べらんだのはながかれてしんでしまいました。"
        translation = "Vì tôi quên tưới nước nên luống hoa ngoài ban công đã bị khô héo úa tàn."
    }
    "注" = @{
        sentence = "レストランの店員さんを呼んで温かいラーメンを注文しました。"
        reading = "れすとらんのてんいんさんをよんであたたかいらーめんをちゅうもんしました。"
        translation = "Tôi gọi nhân viên phục vụ của nhà hàng lại và gọi một bát mì ramen nóng hổi."
    }
    "洋" = @{
        sentence = "今日のパーティーには清潔な洋服を着て参加します。"
        reading = "きょうのぱーてぃーにはせいけつなようふくをきてさんかします。"
        translation = "Hôm nay tôi sẽ mặc bộ trang phục phương Tây tươm tất để tham gia bữa tiệc."
    }
    "海" = @{
        sentence = "夏休みに家族と一緒に沖縄の青い海へ泳ぎに行きました。"
        reading = "なつやすみにかぞくといっしょにおきなわのあおいうみへおよぎにいきました。"
        translation = "Kỳ nghỉ hè tôi đã cùng gia đình đi tắm biển xanh ngắt ở Okinawa."
    }
    "漢" = @{
        sentence = "毎晩寝る前に漢字の練習帳を一ページ書くようにしています。"
        reading = "まいばんねるまえにかんじのれんしゅうちょうをいちぺーじかくようにしています。"
        translation = "Mỗi tối trước khi đi ngủ, tôi đều cố gắng viết một trang vở luyện chữ Hán."
    }
    "牛" = @{
        sentence = "毎朝朝食のときに冷たい牛乳を一杯飲んでいます。"
        reading = "まいあさちょうしょくのときにつめたいぎゅうにゅうをいっぱいのんでいます。"
        translation = "Mỗi sáng vào bữa điểm tâm tôi đều uống một ly sữa bò mát lạnh."
    }
    "物" = @{
        sentence = "日本のスーパーは新鮮な食べ物や果物が豊富に揃っています。"
        reading = "にほんのすーぱーはしんせんなたべものやくだものがほうふにそろっています。"
        translation = "Các siêu thị ở Nhật Bản bày bán rất phong phú các loại đồ ăn và hoa quả tươi ngon."
    }
    "特" = @{
        sentence = "週末は特別な用事がないので、家でゆっくり休むつもりです。"
        reading = "しゅうまつはとくべつなようじがないので、いえでゆっくりやすむつもりです。"
        translation = "Cuối tuần vì không có việc bận gì đặc biệt nên tôi dự định sẽ nghỉ ngơi thong thả ở nhà."
    }
    "犬" = @{
        sentence = "夕方になると近所の人たちが犬を連れて公園を散歩しています。"
        reading = "ゆうがたになるときんじょのひとたちがいぬをつれてこうえんをさんぽしています。"
        translation = "Cứ đến chiều muộn là bà con quanh xóm lại dắt chó cưng đi dạo ở công viên."
    }
    "理" = @{
        sentence = "母が作ってくれた手料理は世界で一番美味しいと思います。"
        reading = "ははがつくってくれたてりょうりはせかいでいちばんおいしいとおもいます。"
        translation = "Tôi thấy những món ăn ngon mẹ nấu ở nhà là tuyệt vời nhất trên đời."
    }
    "用" = @{
        sentence = "急な用事ができたので、今日の午後の約束をキャンセルしました。"
        reading = "きゅうなようじができたので、きょうのごごのやくそくをきゃんせるしました。"
        translation = "Do có việc bận đột xuất nên tôi đành phải hủy buổi hẹn chiều nay."
    }
    "田" = @{
        sentence = "私の田舎には広々とした水田がどこまでも広がっています。"
        reading = "わたしのいなかにはひろびろとしたすいでんがどこまでもひろがっています。"
        translation = "Ở quê hương tôi có những cánh đồng lúa nước bao la bát ngát trải dài tít tắp."
    }
    "町" = @{
        sentence = "私が住んでいる町は緑が多くてとても静かなところです。"
        reading = "わたしがすんでいるまちはみどりがおおくてとてもしずかなところです。"
        translation = "Thị trấn nơi tôi đang sinh sống có rất nhiều cây xanh và là một nơi vô cùng yên bình."
    }
    "画" = @{
        sentence = "友達と一緒に映画館で話題のアニメ映画を見ました。"
        reading = "ともだちといっしょにえいがかんでわだいのあにめえいがをみました。"
        translation = "Tôi cùng bạn bè đã xem bộ phim hoạt hình anime đang gây sốt tại rạp chiếu phim."
    }
    "界" = @{
        sentence = "将来は世界中を旅していろいろな文化を体験してみたいです。"
        reading = "しょうらいはせかいじゅうをたびしていろいろなぶんかをたいけんしてみたいです。"
        translation = "Sau này tôi muốn đi du lịch khắp thế giới để trải nghiệm nhiều nền văn hóa khác nhau."
    }
    "病" = @{
        sentence = "昨日はひどい風邪を引いたので、近くの病院へ行きました。"
        reading = "きのうはひどいかぜをひいたので、ちかくのびょういんへいきました。"
        translation = "Hôm qua tôi bị cảm lạnh khá nặng nên đã đi đến bệnh viện gần nhà."
    }
    "発" = @{
        sentence = "東京行きの新幹線は午前九時に一番ホームを出発します。"
        reading = "とうきょういきのしんかんせんはごぜんくじにいちばんほーむをしゅっぱつします。"
        translation = "Chuyến tàu Shinkansen đi Tokyo sẽ khởi hành từ sân ga số 1 vào lúc 9 giờ sáng."
    }
    "的" = @{
        sentence = "来年の試験に合格することを目標にして、毎日計画的に勉強しています。"
        reading = "らいねんのしけんにごうかくすることをもくひょうにして、まいにちけいかくてきにべんきょうしています。"
        translation = "Lấy mục tiêu đỗ kỳ thi năm tới, mỗi ngày tôi đều học tập theo kế hoạch rõ ràng."
    }
    "目" = @{
        sentence = "パソコンを長時間使った後は目を閉じて少し休ませます。"
        reading = "ぱそこんをちょうじかんつかったあとはめをとじてすこしやすませます。"
        translation = "Sau khi sử dụng máy tính nhiều giờ, tôi thường nhắm mắt lại để nghỉ ngơi một chút."
    }
    "真" = @{
        sentence = "旅先で綺麗な景色に出会ったので、たくさん写真を撮りました。"
        reading = "たびさきできれいなけしきにであったので、たくさんしゃしんをとりました。"
        translation = "Khi bắt gặp phong cảnh tuyệt đẹp trong chuyến du lịch, tôi đã chụp rất nhiều bức ảnh."
    }
    "着" = @{
        sentence = "予定より少し遅れて、夜の八時に京都駅に到着しました。"
        reading = "よていよりすこしおくれて、よるのはちじにきょうとえきにとうちゃくしました。"
        translation = "Muộn hơn dự kiến một chút, tôi đã đến ga Kyoto lúc 8 giờ tối."
    }
    "知" = @{
        sentence = "親しい友達から結婚の知らせを聞いて、とても嬉しかったです。"
        reading = "したしいともだちからけっこんのしらせをきいて、とてもうれしかったです。"
        translation = "Nhận được tin báo kết hôn từ người bạn thân thiết, tôi thấy vô cùng vui mừng."
    }
    "研" = @{
        sentence = "大学の大学院で日本の近現代文学について研究しています。"
        reading = "だいがくのだいがくいんでにほんのきんげんだいぶんがくについてけんきゅうしています。"
        translation = "Tôi đang nghiên cứu về văn học cận hiện đại Nhật Bản tại trường cao học."
    }
    "社" = @{
        sentence = "来月から新しい日系IT会社でエンジニアとして働きます。"
        reading = "らいげつからあたらしいにっけいあいてぃーかいしゃでえんじにあとしてはたらきます。"
        translation = "Từ tháng sau tôi sẽ bắt đầu làm kỹ sư tại một công ty IT Nhật Bản mới."
    }
    "私" = @{
        sentence = "私はベトナムから日本へ留学に来た大学二年生です。"
        reading = "わたしはべとなむからにほんへりゅうがくにきただいがくにねんせいです。"
        translation = "Tôi là sinh viên năm thứ hai từ Việt Nam sang Nhật Bản du học."
    }
    "秋" = @{
        sentence = "秋になると木々の葉が赤や黄色に美しく紅葉します。"
        reading = "あきになるときぎのはがあかやきいろにうつくしくこうようします。"
        translation = "Khi mùa thu tới, lá cây đổi màu sang sắc đỏ vàng rực rỡ tuyệt đẹp."
    }
    "究" = @{
        sentence = "放課後は研究室に残って、教授と一緒に実験のデータをまとめました。"
        reading = "ほうかごはけんきゅうしつにのこって、きょうじゅといっしょにじっけんのでーたをまとめました。"
        translation = "Sau giờ học tôi ở lại phòng nghiên cứu để cùng giáo sư tổng hợp số liệu thí nghiệm."
    }
    "空" = @{
        sentence = "雨が上がった後、青い空に大きくて綺麗な虹がかかりました。"
        reading = "あめがあがったあと、あおいそらにおおきくてきれいなにじがかかりました。"
        translation = "Sau cơn mưa tạnh, một chiếc cầu vồng lớn rực rỡ đã vắt ngang qua bầu trời xanh."
    }
    "立" = @{
        sentence = "電車がとても混んでいたので、終点までずっと立ったままでした。"
        reading = "でんしゃがとてもこんでいたので、しゅうてんまでずっとたったままでした。"
        translation = "Vì trên tàu điện rất đông đúc nên tôi đành phải đứng suốt cho tới tận ga cuối."
    }
    "答" = @{
        sentence = "先生の質問に対して、手を挙げてはっきりと答えました。"
        reading = "せんせいのしつもんにたいして、てをあげてはっきりとこたえました。"
        translation = "Đối với câu hỏi của thầy giáo, tôi đã giơ tay và dõng dạc trả lời."
    }
    "紙" = @{
        sentence = "国の両親へ感謝の気持ちを伝えるために長い手紙を書きました。"
        reading = "くにのりょうしんへかんしゃのきもちをつたえるためにながいてがみをかきました。"
        translation = "Tôi đã viết một bức thư dài để bày tỏ lòng biết ơn tới bố mẹ ở quê nhà."
    }
    "終" = @{
        sentence = "今日の仕事が全部終わったら、みんなで飲みに行きましょう。"
        reading = "きょうのしごとがぜんぶおわったら、みんなでのみにいきましょう。"
        translation = "Khi xong xuôi hết công việc của ngày hôm nay, chúng ta cùng nhau đi uống nhé."
    }
    "習" = @{
        sentence = "毎日授業で習った新しい文法を復習しています。"
        reading = "まいにちじゅぎょうでならったあたらしいぶんぽうをふくしゅうしています。"
        translation = "Mỗi ngày tôi đều ôn tập lại những ngữ pháp mới đã học trên lớp."
    }
    "考" = @{
        sentence = "将来の進路について、両親や先生とよく相談して考えています。"
        reading = "しょうらいのしんろについて、りょうしんやせんせいとよくそうだんしてかんがえています。"
        translation = "Về định hướng tương lai, tôi đang trao đổi kỹ với bố mẹ và thầy cô để suy nghĩ cẩn thận."
    }
    "者" = @{
        sentence = "高熱が出たので病院へ行って、お医者さんに診てもらいました。"
        reading = "こうねつがでたのでびょういんへいって、おいしゃさんにみてもらいました。"
        translation = "Vì bị sốt cao nên tôi đã đến bệnh viện và nhờ bác sĩ khám bệnh."
    }
    "肉" = @{
        sentence = "スーパーで新鮮な牛肉と野菜を買ってすき焼きを作りました。"
        reading = "すーぱーでしんせんなぎゅうにくとやさいをかってすきやきをつくりました。"
        translation = "Tôi đã mua thịt bò tươi và rau ở siêu thị để nấu món lẩu Sukiyaki."
    }
    "自" = @{
        sentence = "天気がいい日は駅まで自転車に乗って通勤しています。"
        reading = "てんきがいいひはえきまでじてんしゃにのってつうきんしています。"
        translation = "Những ngày thời tiết đẹp, tôi thường đạp xe đạp ra ga để đi làm."
    }
    "色" = @{
        sentence = "彼女は明るい色の服を着ているのがとてもよく似合います。"
        reading = "かのじょはあかるいいろのふくをきているのがとてもよくにあいます。"
        translation = "Cô ấy mặc những bộ trang phục màu sắc tươi sáng trông rất hợp."
    }
    "花" = @{
        sentence = "春になると公園いっぱいにきれいな桜の花が咲きます。"
        reading = "はるになるとこうえんいっぱいにきれいなさくらのはながさきます。"
        translation = "Khi mùa xuân đến, khắp cả công viên hoa anh đào tuyệt đẹp nở rộ."
    }
    "英" = @{
        sentence = "大学では英語と日本語の両方を真剣に勉強しています。"
        reading = "だいがくではえいごとにほんごのりょうほうをしんけんにべんきょうしています。"
        translation = "Ở trường đại học tôi chăm chỉ học cả hai thứ tiếng là tiếng Anh và tiếng Nhật."
    }
    "茶" = @{
        sentence = "食事の後に温かい緑茶を一杯飲むと気持ちが落ち着きます。"
        reading = "しょくじのあとにあたたかいりょくちゃをいっぱいのむときもちがおちつきます。"
        translation = "Sau bữa ăn, uống một tách trà xanh ấm nóng giúp lòng mình thấy thư thái lạ kỳ."
    }
    "親" = @{
        sentence = "道に迷っていたとき、親切な人が駅まで案内してくれました。"
        reading = "みちにまよっていたとき、しんせつなひとがえきまであんないしてくれました。"
        translation = "Khi tôi đang bị lạc đường, một người tốt bụng đã nhiệt tình chỉ đường ra tận nhà ga."
    }
    "言" = @{
        sentence = "先生がおっしゃったアドバイスの言葉を心に留めておきます。"
        reading = "せんせいがおっしゃったあどばいすのことばをこころにとめておきます。"
        translation = "Tôi luôn ghi nhớ trong lòng những lời khuyên bổ ích mà thầy giáo đã dạy bảo."
    }
    "計" = @{
        sentence = "夏休みに北海道へ行く旅行の計画を友達と一緒に立てました。"
        reading = "なつやすみにほっかいどうへいくりょこうのけいかくをともだちといっしょにたてました。"
        translation = "Tôi đã cùng bạn bè lên kế hoạch cho chuyến đi du lịch Hokkaido vào kỳ nghỉ hè."
    }
    "試" = @{
        sentence = "日本語能力試験に合格するために毎日夜遅くまで復習しています。"
        reading = "にほんごのうりょくしけんにごうかくするためにまいにちよるおそくまでふくしゅうしています。"
        translation = "Để thi đỗ kỳ thi năng lực tiếng Nhật, ngày nào tôi cũng ôn bài đến tận đêm muộn."
    }
    "買" = @{
        sentence = "週末に家族と一緒にスーパーへ一週間分の買い出しに行きました。"
        reading = "しゅうまつにかぞくといっしょにすーぱーへいっしゅうかんぶんのかいだしにいきました。"
        translation = "Vào cuối tuần tôi cùng gia đình đến siêu thị mua sắm đồ ăn dùng cho cả tuần."
    }
    "貸" = @{
        sentence = "傘を忘れて困っていたら、親切な同僚が自分の傘を貸してくれました。"
        reading = "かさをわすれてこまっていたら、しんせつなどうりょうがじぶんのかさをかしてくれました。"
        translation = "Đang lúc bối rối vì quên ô thì một đồng nghiệp tốt bụng đã cho tôi mượn chiếc ô của anh ấy."
    }
    "質" = @{
        sentence = "授業で分からないところがあれば、遠慮せずに先生に質問してください。"
        reading = "じゅぎょうでわからないところがあれば、えんりょせずにせんせいにしつもんしてください。"
        translation = "Trong giờ học nếu có chỗ nào không hiểu, bạn cứ tự nhiên đặt câu hỏi cho thầy giáo nhé."
    }
    "赤" = @{
        sentence = "信号が赤に変わったので、横断歩道の前で立ち止まりました。"
        reading = "しんごうがあかにかわったので、おうだんほどうのまえでたちどまりました。"
        translation = "Vì đèn tín hiệu chuyển sang màu đỏ nên tôi đã dừng lại trước vạch sang đường."
    }
    "走" = @{
        sentence = "電車の発車時刻に間に合うように駅の階段を急いで走りました。"
        reading = "でんしゃのはっしゃじこくにまにあうようにえきのかいだんをいそいではしりました。"
        translation = "Để kịp giờ tàu chạy, tôi đã vội vàng chạy thục mạng lên cầu thang nhà ga."
    }
    "起" = @{
        sentence = "毎朝六時半に起きて、朝ご飯を作ってから出勤します。"
        reading = "まいあさろくじはんにおきて、あさごはんをつくってからしゅっきんします。"
        translation = "Mỗi sáng tôi thức dậy lúc 6 rưỡi, nấu bữa sáng rồi mới đi làm."
    }
    "足" = @{
        sentence = "一日中観光地を歩き回ったので、足がとても疲れました。"
        reading = "いちにちじゅうかんこうちをあるきまわったので、あしがとてもつかれました。"
        translation = "Cả ngày đi bộ tham quan khắp nơi nên hai chân tôi vô cùng mỏi rã rời."
    }
    "転" = @{
        sentence = "会社へ行くときは電車よりも自転車のほうが便利です。"
        reading = "かいしゃへいくときはでんしゃよりもじてんしゃのほうがべんりです。"
        translation = "Khi đi làm, đi xe đạp còn thuận tiện hơn là đi tàu điện."
    }
    "近" = @{
        sentence = "私の家は駅の近くにあるので、買い物にもとても便利です。"
        reading = "わたしのいえはえきのちかくにあるので、かいものにもとてもべんりです。"
        translation = "Nhà tôi ở gần ga nên việc đi lại mua sắm cũng vô cùng thuận tiện."
    }
    "送" = @{
        sentence = "誕生日のプレゼントを国にいる母に国際郵便で送りました。"
        reading = "たんじょうびのぷれぜんとをくににいるははにこくさいゆうびんでおくりました。"
        translation = "Tôi đã gửi quà sinh nhật cho mẹ ở quê nhà qua đường bưu điện quốc tế."
    }
    "通" = @{
        sentence = "毎朝ラッシュ時の満員電車に乗って大学へ通っています。"
        reading = "まいあさらっしゅじのまんいんでんしゃにのってだいがくへかよっています。"
        translation = "Mỗi sáng tôi đều đi tàu điện chật kín người vào giờ cao điểm để đến trường đại học."
    }
    "週" = @{
        sentence = "来週の月曜日に大切な日本語の試験があるので、週末に復習します。"
        reading = "らいしゅうのげつようびにたいせつなにほんごのしけんがあるので、しゅうまつにふくしゅうします。"
        translation = "Thứ hai tuần tới có bài thi tiếng Nhật quan trọng nên cuối tuần tôi sẽ ôn tập."
    }
    "運" = @{
        sentence = "健康のために毎朝近くの公園で軽く運動するようにしています。"
        reading = "けんこうのためにまいあさちかくのこうえんでかるくうんどうするようにしています。"
        translation = "Vì sức khỏe, mỗi sáng tôi đều cố gắng vận động nhẹ nhàng ở công viên gần nhà."
    }
    "道" = @{
        sentence = "この道をまっすぐ五分ほど歩くと、右手に郵便局が見えます。"
        reading = "このみちをまっすぐごふんほどあるくと、みぎてにゆうびんきょくがみえます。"
        translation = "Cứ đi thẳng con đường này chừng năm phút, bạn sẽ thấy bưu điện nằm ở bên tay phải."
    }
    "重" = @{
        sentence = "重い荷物を運ぶのを手伝ってくれて本当に助かりました。"
        reading = "おもいにもつをはこぶのをてつだってくれてほんとうにたすかりました。"
        translation = "Bạn đã giúp tôi khuân vác đống đồ đạc nặng nhọc này, thật lòng cảm ơn bạn rất nhiều."
    }
    "野" = @{
        sentence = "毎日の食事で新鮮な野菜をたっぷり食べるように心がけています。"
        reading = "まいにちのしょくじでしんせんなやさいをたっぷりたべるようにこころがけています。"
        translation = "Trong bữa ăn hàng ngày, tôi luôn chú ý ăn thật nhiều rau củ tươi xanh."
    }
    "銀" = @{
        sentence = "駅前の銀行へ行って、国への送金の手続きをしてきました。"
        reading = "えきまえのぎんこうへいって、くにへのそうきんのてつづきをしてきました。"
        translation = "Tôi đã đến ngân hàng trước nhà ga để làm thủ tục gửi tiền về nước."
    }
    "開" = @{
        sentence = "部屋の空気が少し重いので、窓を開けて換気しましょう。"
        reading = "へやのくうきがすこしおもいので、まどをあけてかんきしましょう。"
        translation = "Không khí trong phòng hơi ngột ngạt một chút, chúng ta mở cửa sổ ra đón gió cho thoáng nhé."
    }
    "院" = @{
        sentence = "風邪がなかなか治らないので、明日の朝病院へ行くつもりです。"
        reading = "かぜがなかなかなおらないので、あしたのあさびょういんへいくつもりです。"
        translation = "Bệnh cảm cúm mãi chẳng khỏi nên sáng mai tôi dự định sẽ đi đến bệnh viện."
    }
    "集" = @{
        sentence = "週末は広場にたくさんの人が集まってイベントを楽しみました。"
        reading = "しゅうまつはひろばにたくさんのひとがあつまっていべんとをたのしみました。"
        translation = "Cuối tuần có rất đông người tụ tập ở quảng trường vui chơi lễ hội."
    }
    "青" = @{
        sentence = "雲一つない青い空がどこまでも広がっていて気持ちがいいです。"
        reading = "くもひとつないあおいそらがどこまでもひろがっていてきもちがいいです。"
        translation = "Bầu trời xanh biếc không một gợn mây trải dài bát ngát tạo cảm giác thật khoan khoái."
    }
    "音" = @{
        sentence = "図書館の中では携帯電話の音が出ないようにマナーモードにしてください。"
        reading = "としょかんのなかではけいたいでんわのおとがでないようにまなーもーどにしてください。"
        translation = "Trong thư viện xin hãy chuyển điện thoại sang chế độ rung để không phát ra âm thanh."
    }
    "題" = @{
        sentence = "試験の問題用紙をよく読んでから鉛筆で答えを書き始めました。"
        reading = "しけんのもんだいようしをよくよんでからえんぴつでこたえをかきはじめました。"
        translation = "Sau khi đọc kỹ tờ đề thi, tôi mới bắt đầu dùng bút chì điền câu trả lời."
    }
    "風" = @{
        sentence = "窓を開けると心地よい春の風が部屋の中に吹き込んできました。"
        reading = "まどをあけるとここちよいはるのかぜがへやのなかにふきこんできました。"
        translation = "Vừa mở cửa sổ ra, một làn gió xuân êm đềm dễ chịu đã ùa vào căn phòng."
    }
    "飯" = @{
        sentence = "家族みんなで食卓を囲んで温かい晩ご飯を食べました。"
        reading = "かぞくみんなでしょくたくをかこんであたたかいばんごはんをたべました。"
        translation = "Cả gia đình quây quần bên mâm cơm cùng nhau thưởng thức bữa cơm tối ấm cúng."
    }
    "飲" = @{
        sentence = "暑い日に冷たいお茶を飲むと体がすっきりします。"
        reading = "あついひにつめたいおちゃをのむとからだがすっきりします。"
        translation = "Vào ngày trời nắng nóng, uống một ngụm trà lạnh khiến cả người thấy sảng khoái."
    }
    "館" = @{
        sentence = "静かな図書館で試験の勉強に集中して取り組みました。"
        reading = "しずかなとしょかんでしけんのべんきょうにしゅうちゅうしてとりくみました。"
        translation = "Ở không gian yên tĩnh của thư viện, tôi đã tập trung cao độ để học bài thi."
    }
    "駅" = @{
        sentence = "毎朝八時ちょうどに駅に着くように家を出ています。"
        reading = "まいあさはちじちょうどにえきにつくようにいえをでています。"
        translation = "Mỗi sáng tôi rời khỏi nhà sao cho vừa đúng 8 giờ có mặt ở nhà ga."
    }
    "験" = @{
        sentence = "来月の日本語能力試験に向けて毎日練習問題を解いています。"
        reading = "らいげつのにほんごのうりょくしけんにむけてまいにちれんしゅうもんだいをといています。"
        translation = "Hướng tới kỳ thi năng lực tiếng Nhật vào tháng tới, mỗi ngày tôi đều giải các bài tập luyện thi."
    }
    "魚" = @{
        sentence = "新鮮な魚がたくさん並んでいる市場へ朝早く買い物に行きました。"
        reading = "しんせんなさかながたくさんならんでいるいちばへあさはやくかいものにいきました。"
        translation = "Sáng sớm tôi đã đi chợ nơi bày bán rất nhiều cá tươi ngon để mua sắm."
    }
    "鳥" = @{
        sentence = "朝の静かな森の中で小さな小鳥が心地よく鳴いています。"
        reading = "あさのしずかなもりのなかでちいさなことりがここちよくないています。"
        translation = "Giữa khu rừng ban mai tĩnh mịch, những chú chim non đang cất tiếng hót véo von dễ chịu."
    }
    "黒" = @{
        sentence = "面接試験には清潔な黒いスーツを着て出席しました。"
        reading = "めんせつしけんにはせいけつなくろいすーつをきてしゅっせきしました。"
        translation = "Đi phỏng vấn, tôi đã mặc một bộ vest màu đen tươm tất chỉn chu."
    }
}

Write-Host "Tổng số item sửa: $($items.Count) Kanji"

$jsonPath = "kanji_full_database.json"
$jsPath = "kanji_full_database.js"

$raw = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

# Validation trước khi cập nhật
$errors = @()
$seen = @{}
$tplRegex = 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

foreach ($k in $items.Keys) {
    $info = $items[$k]
    $s = $info.sentence
    $t = $info.translation
    
    if (-not $s.Contains($k)) {
        $errors += "Kanji $k không có trong câu: $s"
    }
    if ([string]::IsNullOrWhiteSpace($t)) {
        $errors += "Kanji $k thiếu translation"
    }
    if ($s -match $tplRegex) {
        $errors += "Kanji $k vi phạm template: $s"
    }
    if ($seen.ContainsKey($s)) {
        $errors += "Trùng câu giữa $k và $($seen[$s]): $s"
    } else {
        $seen[$s] = $k
    }
    if (-not $db.psobject.Properties[$k]) {
        $errors += "Không tìm thấy $k trong DB"
    }
}

if ($errors.Count -gt 0) {
    Write-Host "VALIDATION TRƯỚC GHI THẤT BẠI:" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
    exit 1
}

Write-Host "VALIDATION TRƯỚC GHI: 100% PASS!" -ForegroundColor Green

# Cập nhật vào DB
$updatedCount = 0
foreach ($k in $items.Keys) {
    $val = $db.psobject.Properties[$k].Value
    $val.example = [PSCustomObject]@{
        sentence = $items[$k].sentence
        reading = $items[$k].reading
        translation = $items[$k].translation
    }
    $updatedCount++
}

# SAVE FILE
$outJson = $db | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($jsonPath, $outJson, [System.Text.Encoding]::UTF8)
Write-Host "Đã lưu vào $jsonPath" -ForegroundColor Green

$jsContent = "window.KANJI_FULL_DATABASE = $outJson;"
[System.IO.File]::WriteAllText($jsPath, $jsContent, [System.Text.Encoding]::UTF8)
Write-Host "Đã lưu vào $jsPath" -ForegroundColor Green

# READ-BACK VALIDATION TRỰC TIẾP TỪ FILE MỚI LƯU
$readRaw = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$readDb = $readRaw | ConvertFrom-Json

$postErrors = @()
$n4RemainingBad = @()
$n4Total = 0
$n4Good = 0

foreach ($p in $readDb.psobject.Properties) {
    if ($p.Value.level -eq 'N4') {
        $n4Total++
        $s = if ($p.Value.example) { $p.Value.example.sentence } else { '' }
        if ([string]::IsNullOrWhiteSpace($s) -or ($s -match $tplRegex)) {
            $n4RemainingBad += $p.Name
        } else {
            $n4Good++
        }
    }
}

Write-Host "`n=== KẾT QUẢ QUÉT LẠI N4 TỪ FILE ==="
Write-Host "Tổng số Kanji N4: $n4Total"
Write-Host "Hợp lệ: $n4Good"
Write-Host "Còn template sai: $($n4RemainingBad.Count)"

if ($n4RemainingBad.Count -gt 0) {
    Write-Host "CÁC CHỮ VẪN BỊ TEMPLATE: $($n4RemainingBad -join ' ')" -ForegroundColor Red
    exit 1
}

Write-Host "XÁC NHẬN: 100% KANJI N4 ($n4Good/$n4Total) ĐÃ CÓ CÂU VÍ DỤ TỰ NHIÊN, KHÔNG CÒN BẤT KỲ CÂU TEMPLATE NÀO!" -ForegroundColor Green
