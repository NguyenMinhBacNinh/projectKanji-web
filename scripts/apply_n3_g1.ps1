[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$data = [ordered]@{
    "局" = @{
        sentence = "駅の近くの薬局で風邪薬とマスクを買って帰りました。"
        reading = "えきのちかくのやっきょくでかぜぐすりとますくをかってかえりました。"
        translation = "Tôi đã mua thuốc cảm và khẩu trang ở hiệu thuốc gần nhà ga rồi về nhà."
    }
    "居" = @{
        sentence = "夕食の後、家族みんなで居間に集まってテレビを見ました。"
        reading = "ゆうしょくのあと、かぞくみんなでいまにあつまっててれびをみました。"
        translation = "Sau bữa tối, cả gia đình cùng quây quần ở phòng khách xem tivi."
    }
    "差" = @{
        sentence = "この二つの製品は値段に大きな差がありますが、性能はほぼ同じです。"
        reading = "このふたつのせいひんはねだんにおおきなさがありますが、せいのうはほぼおなじです。"
        translation = "Hai sản phẩm này có sự chênh lệch lớn về giá cả, nhưng tính năng thì gần như tương đương."
    }
    "市" = @{
        sentence = "週末に友達と賑やかな朝市へ行って、新鮮な野菜を買いました。"
        reading = "しゅうまつにともだちとにぎやかなあさいちへいって、しんせんなやさいをかいました。"
        translation = "Cuối tuần tôi cùng bạn bè đi chợ phiên buổi sáng nhộn nhịp để mua rau củ tươi ngon."
    }
    "師" = @{
        sentence = "熱が下がらないので病院へ行き、医師に診てもらいました。"
        reading = "ねつがさがらないのでびょういんへいき、いしにみてもらいました。"
        translation = "Vì cơn sốt mãi không dứt nên tôi đã đến bệnh viện để bác sĩ khám bệnh."
    }
    "席" = @{
        sentence = "電車の中で、お年寄りに席を譲ってあげました。"
        reading = "でんしゃのなかで、おとしよりにせきをゆずってあげました。"
        translation = "Ở trên tàu điện, tôi đã nhường ghế ngồi cho một cụ già."
    }
    "常" = @{
        sentence = "日本へ留学に来てから、日常生活の中で敬語を使う機会が増えました。"
        reading = "にほんへりゅうがくにきてから、にちじょうせいかつのなかでけいごをつかうきかいがふえました。"
        translation = "Kể từ khi sang Nhật du học, cơ hội sử dụng kính ngữ trong đời sống hàng ngày của tôi tăng lên."
    }
    "平" = @{
        sentence = "世界中の人々が平和に暮らせる社会になることを心から願っています。"
        reading = "せかいじゅうのひとびとがへいわにくらせるしゃかいになることをこころからねがっています。"
        translation = "Tôi thành tâm mong ước một xã hội nơi mọi người trên khắp thế giới có thể sống trong hòa bình."
    }
    "幸" = @{
        sentence = "家族みんなが健康で毎日元気に過ごせるのが、何よりの幸せです。"
        reading = "かぞくみんながけんこうでまいにちげんきにすごせるのが、なによりのしあわせです。"
        translation = "Cả gia đình đều mạnh khỏe và mỗi ngày trôi qua tràn đầy sức sống là niềm hạnh phúc lớn nhất."
    }
    "幾" = @{
        sentence = "この古いお寺は幾多の困難を乗り越えて、現代まで残されてきました。"
        reading = "このふるいおてらはいくたのこんなんをのりこえて、げんだいまでのこされてきました。"
        translation = "Ngôi chùa cổ kính này đã vượt qua biết bao gian nan thử thách để lưu giữ cho tới ngày nay."
    }
    "座" = @{
        sentence = "劇場の前列の座席に座って、迫力ある舞台を鑑賞しました。"
        reading = "げきじょうのぜんれつのざせきにすわって、はくりょくあるぶたいをかんしょうしました。"
        translation = "Ngồi ở hàng ghế phía trước của nhà hát, tôi đã thưởng thức một vở diễn sân khấu đầy lôi cuốn."
    }
    "庭" = @{
        sentence = "祖父は毎朝早く起きて、自宅の庭の手入れを楽しそうにしています。"
        reading = "そふはまいあさはやくおきて、じたくのにわのていれをたのしそうにしています。"
        translation = "Ông nội mỗi sáng đều dậy sớm và vui vẻ chăm sóc khu vườn của ngôi nhà."
    }
    "式" = @{
        sentence = "来週の月曜日に、大学の体育館で厳粛な入学式が行われます。"
        reading = "らいしゅうのげつようびに、だいがくのたいいくかんでげんしゅくなにゅうがくしきがおこなわれます。"
        translation = "Vào thứ hai tuần tới, lễ nhập học trang trọng sẽ được tổ chức tại nhà thi đấu của trường đại học."
    }
    "引" = @{
        sentence = "駅前のスーパーでは、夜八時を過ぎると惣菜が三割引になります。"
        reading = "えきまえのすーぱーでは、よるはちじをすぎるとそうざいがさんわりびきになります。"
        translation = "Ở siêu thị trước ga, sau 8 giờ tối các món ăn sẵn sẽ được giảm giá 30%."
    }
    "当" = @{
        sentence = "困っているときに親切にしてくれた友達に、本当に感謝しています。"
        reading = "こまっているときにしんせつにしてくれたともだちに、ほんとうにかんしゃしています。"
        translation = "Tôi thực sự biết ơn người bạn đã đối xử tốt bụng khi tôi gặp khó khăn."
    }
    "形" = @{
        sentence = "粘土を指で丁寧にこねて、かわいい動物の形を作りました。"
        reading = "ねんどをゆびでていねいにこねて、かわいいどうぶつのかたちをつくりました。"
        translation = "Tôi dùng ngón tay nhào nặn đất sét thật khéo léo để tạo thành hình những con vật đáng yêu."
    }
    "役" = @{
        sentence = "大学で学んだITの知識が、現在の仕事でとても役に立っています。"
        reading = "だいがくでまなんだあいてぃーのちしきが、げんざいのしごとでとてもやくにたっています。"
        translation = "Những kiến thức công nghệ thông tin học được ở trường đại học đang rất hữu ích cho công việc hiện tại của tôi."
    }
    "彼" = @{
        sentence = "休みの日に彼女と一緒に話題のカフェへ行きました。"
        reading = "やすみのひにかのじょといっしょにわだいのかふぇへいきました。"
        translation = "Vào ngày nghỉ, tôi đã cùng bạn gái đến quán cà phê đang được nhiều người nhắc tới."
    }
    "徒" = @{
        sentence = "先生は放課後、教室に残った生徒たちに熱心に勉強を教えていました。"
        reading = "せんせいはほうかご、きょうしつにのこったせいとたちにねっしんにべんきょうをおしえていました。"
        translation = "Sau giờ học, thầy giáo đã ân cần hướng dẫn bài vở cho các bạn học sinh ở lại lớp."
    }
    "得" = @{
        sentence = "何度も失敗を重ねて試行錯誤した末に、貴重な経験を得ることができました。"
        reading = "なんどもしっぱいをかさねてしこうさくごしたすえに、きちょうなけいけんをえることができました。"
        translation = "Sau bao phen thất bại và mày mò thử nghiệm, cuối cùng tôi đã có được những kinh nghiệm vô cùng quý báu."
    }
    "御" = @{
        sentence = "お忙しいところ恐れ入りますが、メールの御確認をお願い申し上げます。"
        reading = "おいそがしいところおそれいりますが、めーるのごかくにんをおねがいもうしあげます。"
        translation = "Dẫu biết bạn đang bận rộn nhưng xin phiền bạn kiểm tra lại hòm thư email giúp tôi."
    }
    "必" = @{
        sentence = "海外へ旅行するときは、パスポートを必ず持って行かなければなりません。"
        reading = "かいがいへりょこうするときは、ぱすぽーとをかならずもっていかなければなりません。"
        translation = "Khi đi du lịch nước ngoài, bạn nhất định phải mang theo hộ chiếu bên mình."
    }
    "忘" = @{
        sentence = "出かける直前に鍵をテーブルの上に置き忘れてしまい、慌てて戻りました。"
        reading = "でかけるちょくぜんにかぎをてーぶるのうえにおきわすれてしまい、あわててもどりました。"
        translation = "Ngay trước khi ra khỏi nhà tôi đã để quên chìa khóa trên bàn nên vội vàng quay lại lấy."
    }
    "忙" = @{
        sentence = "年末は仕事が非常に忙しくて、毎日残業が続いています。"
        reading = "ねんまつはしごとがひじょうにいそがしくて、まいにちざんぎょうがつづいています。"
        translation = "Dịp cuối năm công việc vô cùng bận rộn nên ngày nào tôi cũng phải tăng ca liên tục."
    }
    "念" = @{
        sentence = "一生懸命準備したのに雨でイベントが中止になり、とても残念でした。"
        reading = "いっしょうけんめいじゅんびしたのにあめでいべんとがちゅうしになり、とてもざんねんでした。"
        translation = "Dù đã chuẩn bị hết sức chu đáo nhưng sự kiện lại bị hủy vì mưa, thật là đáng tiếc."
    }
    "怒" = @{
        sentence = "普段はとても穏やかな父が、約束を破った私に対して珍しく怒りました。"
        reading = "ふだんはとてもおだやかなちちが、やくそくをやぶったわたしにたいしてめずらしくおこりました。"
        translation = "Người bố thường ngày vốn rất hiền từ nay lại giận dữ với tôi vì tôi thất hứa."
    }
    "怖" = @{
        sentence = "子供の頃は暗い夜道を一人で歩くのがとても怖かったです。"
        reading = "こどものころはくらいよみちをひとりであるくのがとてもこわかったです。"
        translation = "Hồi còn nhỏ, tôi rất sợ hãi khi phải đi bộ một mình trên con đường đêm tối tăm."
    }
    "性" = @{
        sentence = "最後まで諦めずに挑戦を続ければ、成功の可能性は十分にあります。"
        reading = "さいごまであきらめずにちょうせんをつづければ、せいこうのかのうせいはじゅうぶんにあります。"
        translation = "Chỉ cần kiên trì thử thách tới cùng mà không bỏ cuộc thì khả năng thành công là hoàn toàn có."
    }
    "恐" = @{
        sentence = "失敗を恐れずに新しいプロジェクトに挑戦することが、成長への近道です。"
        reading = "しっぱいをおそれずにあたらしいぷろじぇくとにちょうせんすることが、せいちょうへのちかみちです。"
        translation = "Không sợ thất bại mà can đảm dấn thân vào dự án mới chính là con đường ngắn nhất để trưởng thành."
    }
    "恥" = @{
        sentence = "大勢の人の前で名前を間違えてしまい、顔が真っ赤になるほど恥ずかしかったです。"
        reading = "おおぜいのひとのまえでなまえをまちがえてしまい、かおがまっかになるほどはずかしかったです。"
        translation = "Gọi nhầm tên trước đông đảo mọi người khiến tôi ngượng ngùng đến đỏ cả mặt."
    }
    "息" = @{
        sentence = "急な階段を一気に駆け上がったので、息が切れてしまいました。"
        reading = "きゅうなかいだんをいっきにかけあがったので、いきがきれてしまいました。"
        translation = "Vì chạy một mạch lên bậc thang dốc đứng nên tôi thở không ra hơi."
    }
    "悲" = @{
        sentence = "大切にしていたペットが亡くなって、家族全員が深い悲しみに包まれました。"
        reading = "たいせつにしていたぺっとがなくなって、かぞくぜんいんがふかいかなしみにつつまれました。"
        translation = "Chú thú cưng yêu quý qua đời khiến cả gia đình chìm trong nỗi đau buồn sâu sắc."
    }
    "情" = @{
        sentence = "旅行を計画する前に、インターネットで現地の最新の情報を詳しく調べました。"
        reading = "りょこうをけいかくするまえに、いんたーねっとでげんちのさいしんのじょうほうをくわしくしらべました。"
        translation = "Trước khi lên kế hoạch du lịch, tôi đã tìm hiểu kỹ những thông tin mới nhất về điểm đến trên mạng."
    }
    "想" = @{
        sentence = "自分の未来の理想的な姿を想像しながら、日々の勉強に励んでいます。"
        reading = "じぶんのみらいのりそうてきなすがたをそうぞうしながら、ひびのべんきょうにはげんでいます。"
        translation = "Vừa tưởng tượng về hình ảnh lý tưởng trong tương lai của bản thân, tôi vừa miệt mài học tập mỗi ngày."
    }
    "愛" = @{
        sentence = "長年地元の人々に愛されてきた古い喫茶店が、今月で閉店することになりました。"
        reading = "ながねんじもとのひとびとにあいされてきたふるいきっさてんが、こんげつでへいてんすることになりました。"
        translation = "Quán cà phê cổ kính gắn bó và được người dân địa phương yêu mến suốt bao năm qua sẽ đóng cửa trong tháng này."
    }
    "感" = @{
        sentence = "お世話になった先生に、心からの感謝の気持ちを手紙に書いて伝えました。"
        reading = "おせわになったせんせいに、こころからのかんしゃのきもちをとてがみにかいてつたえました。"
        translation = "Tôi đã viết thư để bày tỏ lòng biết ơn chân thành nhất tới người thầy đã luôn giúp đỡ mình."
    }
    "慣" = @{
        sentence = "日本に来たばかりの頃は大変でしたが、三ヶ月経って生活にもすっかり慣れました。"
        reading = "にほんにきたばかりのころはたいへんでしたが、さんかげつたってせいかつにもすっかりなれました。"
        translation = "Thời gian đầu mới sang Nhật tuy có vất vả, nhưng sau ba tháng tôi đã hoàn toàn quen với nếp sống nơi đây."
    }
    "成" = @{
        sentence = "毎日地道な努力を積み重ねた結果、目標の資格試験に見事成功しました。"
        reading = "まいにちじみちなどりょくをつみかさねたけっか、もくひょうのしかくしけんにみごとせいこうしました。"
        translation = "Nhờ kiên trì tích lũy nỗ lực mỗi ngày, tôi đã thành công rực rỡ vượt qua kỳ thi chứng chỉ mục tiêu."
    }
    "戦" = @{
        sentence = "決勝戦では両チームが最後まで全力を尽くして素晴らしい戦いを見せてくれました。"
        reading = "けっしょうせんではりょうちーむがさいごまでぜんりょくをつくしてすばらしいたたかいをみせてくれました。"
        translation = "Trong trận chung kết, cả hai đội đều dốc toàn lực đến phút chót và cống hiến một trận đấu mãn nhãn."
    }
    "戻" = @{
        sentence = "忘れ物に気づいたので、急いで家に戻ってカバンを取りに行きました。"
        reading = "わすれものにきづいたので、いそいでいえにもどってかばんをとりにいきました。"
        translation = "Nhận ra mình để quên đồ, tôi đã vội vàng quay về nhà để lấy chiếc túi xách."
    }
    "所" = @{
        sentence = "駅から歩いて五分ほどの静かな場所に、お気に入りの本屋があります。"
        reading = "えきからあるいてごふんほどのしずかなばしょに、おきにいりのほんやがあります。"
        translation = "Ở một nơi yên tĩnh cách nhà ga chừng năm phút đi bộ có tiệm sách mà tôi yêu thích."
    }
    "才" = @{
        sentence = "彼女は子供の頃からピアノの才能を発揮し、数々のコンクールで優勝しています。"
        reading = "かのじょはこどものころからぴあののさいのうをはっきし、かずかずのこんくーるでゆうしょうしています。"
        translation = "Cô ấy đã bộc lộ tài năng piano từ thuở nhỏ và giành chiến thắng ở nhiều cuộc thi lớn nhỏ."
    }
    "打" = @{
        sentence = "キーボードを素早く打ちながら、明日の会議で使う資料を作成しました。"
        reading = "きーぼーどをすばやくうちながら、あしたのかいぎでつかうしりょうをさくせいしました。"
        translation = "Tôi vừa thoăn thoắt gõ bàn phím vừa soạn thảo tài liệu dùng cho cuộc họp ngày mai."
    }
    "払" = @{
        sentence = "レジでお金を支払うときに、小銭を落としてしまい慌てました。"
        reading = "れじでおかねをしはらうときに、こぜにをおとしてしまいあわてました。"
        translation = "Lúc thanh toán tiền ở quầy thu ngân, tôi lóng ngóng làm rơi tiền lẻ xuống đất."
    }
    "投" = @{
        sentence = "駅のホームにゴミを投げ捨てないように、ゴミ箱へ分別して捨てましょう。"
        reading = "えきのほーむにごみをなげすてないように、ごみばこへぶんべつしてすてましょう。"
        translation = "Xin đừng vứt rác bừa bãi ở sân ga mà hãy phân loại và bỏ rác đúng nơi quy định."
    }
    "折" = @{
        sentence = "強風によって街路樹の大きな枝が折れて、道路を塞いでしまいました。"
        reading = "きょうふうによってがいろじゅのおおきなえだがおれて、どうろをふさいでしまいました。"
        translation = "Cơn gió giật mạnh đã làm gãy một cành cây lớn ven đường và chắn ngang lối đi."
    }
    "抜" = @{
        sentence = "毎日の厳しい練習を耐え抜いた末に、ついに全国大会への出場権を手にしました。"
        reading = "まいにちのきびしいれんしゅうをたえぬいたすえに、ついにぜんこくたいかいへのしゅつじょうけんをてにしました。"
        translation = "Kiên cường vượt qua chuỗi ngày tập luyện gian khổ, cuối cùng chúng tôi đã giành vé tham dự giải đấu toàn quốc."
    }
    "抱" = @{
        sentence = "大きな夢と希望を胸に抱いて、故郷を離れて日本へ留学に来ました。"
        reading = "おおきなゆめときぼうをむねにいだい、こきょうをはなれてにほんへりゅうがくにきました。"
        translation = "Ôm ấp trong tim những hoài bão và ước mơ lớn, tôi rời quê hương sang Nhật du học."
    }
    "押" = @{
        sentence = "非常ベルのボタンを間違えて押さないように注意してください。"
        reading = "ひじょうべるのぼたんをまちがえておさないようにちゅういしてください。"
        translation = "Xin chú ý không bấm nhầm vào nút chuông báo động khẩn cấp."
    }
    "招" = @{
        sentence = "今度の週末に、親しい友人たちを自宅に招待して手料理を振る舞う予定です。"
        reading = "こんどのしゅうまつに、したしいゆうじんたちをじたくにしょうたいしててりょうりをふるまうよていです。"
        translation = "Vào cuối tuần này, tôi dự định mời những người bạn thân đến nhà và chiêu đãi những món tự nấu."
    }
    "指" = @{
        sentence = "先生の熱心な指導のおかげで、苦手だった日本語の文法がよく分かるようになりました。"
        reading = "せんせいのねっしんなしどうのおかげで、にがてだったにほんごのぶんぽうがよくわかるようになりました。"
        translation = "Nhờ sự chỉ bảo tận tình của thầy giáo, tôi đã hiểu rõ những ngữ pháp tiếng Nhật từng thấy khó."
    }
    "捕" = @{
        sentence = "警察官が素早く犯人を追いかけて、駅前で無事に逮捕しました。"
        reading = "けいさつかんがすばやくはんにんをおいかけて、えきまえでぶじにたいほしました。"
        translation = "Người cảnh sát nhanh chóng đuổi theo kẻ phạm tội và đã bắt giữ thành công trước nhà ga."
    }
}

Write-Host "Group 1 count: $($data.Count) Kanji"

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

Write-Host "Group 1 (52 Kanji: 局 .. 捕) đã lưu thành công!" -ForegroundColor Green
