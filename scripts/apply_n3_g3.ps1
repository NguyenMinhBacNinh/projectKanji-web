$dbJsonPath = "c:\Users\admin\Kanji-web\kanji_full_database.json"
$dbJsPath = "c:\Users\admin\Kanji-web\kanji_full_database.js"

$g3 = [ordered]@{
    "深" = @{
        sentence = "夜が深く静まり返った頃、遠くから列車の走る音がかすかに聞こえた。"
        reading = "よるがふかくしずまりかえったころ、とおくかられっしゃのはしるおとがかすかにきこえた。"
        translation = "Vào lúc đêm đã về khuya tĩnh mịch, từ phía xa nghe thấy tiếng đoàn tàu chạy thoang thoảng."
    }
    "済" = @{
        sentence = "市役所で必要な手続きを全て済ませてから、近くのカフェで一息ついた。"
        reading = "しやくしょでひつようなてつづきをすべてすませてから、ちかくのかふぇでひといきついた。"
        translation = "Sau khi hoàn tất mọi thủ tục cần thiết ở tòa thị chính, tôi ghé quán cà phê gần đó nghỉ ngơi một chút."
    }
    "渡" = @{
        sentence = "信号が青に変わるのを確認してから、横断歩道を急いで渡った。"
        reading = "しんごうがあおにかわるのをかくにんしてから、おうだんほどうをいそいでわたった。"
        translation = "Sau khi xác nhận đèn tín hiệu đã chuyển sang màu xanh, tôi vội vã băng qua vạch sang đường."
    }
    "港" = @{
        sentence = "横浜の港からは、夕暮れ時に美しい客船の明かりが見えます。"
        reading = "よこはまのみなとからは、ゆうぐれときにうつくしいきゃくせんのあかりがみえます。"
        translation = "Từ cảng Yokohama, vào lúc hoàng hôn có thể nhìn thấy ánh đèn tuyệt đẹp của tàu du lịch."
    }
    "満" = @{
        sentence = "平日の朝の通勤電車はいつも超満員で、息をするのも苦しいほどだ。"
        reading = "へいじつのあさのつうきんでんしゃはいつもちょうまんいんで、いきをするのもくるしいほどだ。"
        translation = "Chuyến tàu đi làm vào buổi sáng ngày thường lúc nào cũng chật kín người đến mức nghẹt thở."
    }
    "演" = @{
        sentence = "世界的に有名な指揮者が率いるオーケストラの素晴らしい演奏に感動した。"
        reading = "せかいてきにゆうめいなしきしゃがひきいるおーけすとらのすばらしいえんそうにかんどうした。"
        translation = "Tôi rất xúc động trước màn trình diễn tuyệt vời của dàn nhạc giao hưởng do vị nhạc trưởng nổi tiếng thế giới chỉ huy."
    }
    "点" = @{
        sentence = "毎日の復習を欠かさなかったおかげで、今回の期末テストで満点を取ることができた。"
        reading = "まいにちのふくしゅうをかかさなかったおかげで、こんかいのきまつてすとでまんてんをとることができた。"
        translation = "Nhờ không bỏ sót ngày ôn tập nào mà tôi đã đạt điểm tuyệt đối trong bài kiểm tra cuối kỳ lần này."
    }
    "然" = @{
        sentence = "静かだった教室で、突然誰かのスマートフォンが大きな音で鳴り響いた。"
        reading = "しずかだったきょうしつで、とつぜんだれかのすまーとふぉんがおおきなおとなのりひびいた。"
        translation = "Trong phòng học đang yên tĩnh, đột nhiên điện thoại của ai đó reo vang thành tiếng lớn."
    }
    "煙" = @{
        sentence = "火災報知器が激しく鳴り響き、廊下の奥から白い煙が立ち込めてきた。"
        reading = "かさいほうちきがはげしくなりひびき、ろうかのおくからしろいけむりがたちこめてきた。"
        translation = "Chuông báo cháy reo vang dữ dội, và khói trắng bốc lên mù mịt từ phía cuối hành lang."
    }
    "熱" = @{
        sentence = "昨晩から急に高い熱が出たので、会社を休んで病院へ行くことにした。"
        reading = "さくばんからきゅうにたかいねつがでたので、かいしゃをやすんでびょういんへいくことにした。"
        translation = "Từ tối qua tôi bỗng nhiên bị sốt cao nên đã xin nghỉ làm để đến bệnh viện khám."
    }
    "犯" = @{
        sentence = "警察は防犯カメラの映像を手がかりにして、逃走した犯人の行方を追っている。"
        reading = "けいさつはぼうはんかめらのえいぞうをてがかりにして、とうそうしたはんにんのゆくえをおっている。"
        translation = "Cảnh sát đang lần theo hình ảnh camera an ninh để truy tìm tung tích tên tội phạm đã bỏ trốn."
    }
    "状" = @{
        sentence = "患者の健康状態は落ち着いており、医師からも順調に回復していると説明を受けた。"
        reading = "かんじゃのけんこうじょうたいはおちついており、いしからもじゅんちょうにかいふくしているとせつめいをうけた。"
        translation = "Tình trạng sức khỏe của bệnh nhân đã ổn định và bác sĩ giải thích rằng đang hồi phục rất tốt."
    }
    "猫" = @{
        sentence = "祖母の家で飼っている白猫は、日当たりの良い縁側で気持ちよさそうに昼寝をしている。"
        reading = "そぼのいえでかっているしろねこは、ひあたりのよいえんがわできもちよさそうにひるねをしている。"
        translation = "Chú mèo trắng nuôi ở nhà bà đang nằm ngủ trưa rất khoan khoái bên hiên nhà nhiều nắng."
    }
    "王" = @{
        sentence = "古代の王が住んでいた巨大な城の遺跡には、毎年世界中から多くの観光客が訪れる。"
        reading = "こだいのおうがすんでいたきょだいなしろのいせきには、まいとしせかいじゅうからおおくのかんこうきゃくがおとずれる。"
        translation = "Tàn tích tòa thành khổng lồ nơi vị vua thời cổ đại từng sinh sống mỗi năm đều đón nhiều du khách khắp nơi đến tham quan."
    }
    "現" = @{
        sentence = "山の頂上付近に霧が晴れると、目の前に雄大な富士山の姿が現れた。"
        reading = "やまのちょうじょうふきんにきりがはれると、めのまえにゆうだいなふじさんのすがたがあらわれた。"
        translation = "Khi sương mù quanh đỉnh núi tan đi, vẻ đẹp hùng vĩ của núi Phú Sĩ hiện ra ngay trước mắt."
    }
    "球" = @{
        sentence = "放課後になると、グラウンドから野球部の部員たちが元気に声を掛け合う声が聞こえる。"
        reading = "ほうかごになると、ぐらうんどからやきゅうぶのぶいんたちがげんきにこえをかけあうこえがきこえる。"
        translation = "Cứ sau giờ học, từ sân vận động lại nghe thấy tiếng các thành viên câu lạc bộ bóng chày hò reo cổ vũ nhau."
    }
    "産" = @{
        sentence = "北海道で生産された新鮮な乳製品は、風味が豊かで日本中で大人気です。"
        reading = "ほっかいどうでせいさんされたしんせんなにゅうせいひんは、ふうみがゆたかでにほんじゅうでだいにんきです。"
        translation = "Các sản phẩm từ sữa tươi sản xuất tại Hokkaido có hương vị đậm đà và vô cùng được ưa chuộng khắp Nhật Bản."
    }
    "由" = @{
        sentence = "何事にも縛られずに自分の好きな道を選べる自由は、何よりも代えがたいものだ。"
        reading = "なにごとにもしばられずにじぶんのすきなみちをえらべるじゆうは、なによりもかえがたいものだ。"
        translation = "Tự do được chọn con đường mình yêu thích mà không bị ràng buộc bởi điều gì là thứ quý giá hơn tất cả."
    }
    "申" = @{
        sentence = "海外旅行保険への加入を希望する場合は、出発前までにウェブサイトから申し込んでください。"
        reading = "かいがいりょこうほけんへのかにゅうをきぼうするばあいは、しゅっぱつまえまでにうぇぶさいとからもうしこんでください。"
        translation = "Nếu bạn muốn tham gia bảo hiểm du lịch nước ngoài, vui lòng đăng ký qua trang web trước khi khởi hành."
    }
    "留" = @{
        sentence = "大学を卒業した後は、日本の大学院へ留学してさらに専門知識を深めたいと考えています。"
        reading = "だいがくをそつぎょうしたあとは、にほんのだいがくいんへりゅうがくしてさらにせんもんちしきをふかめたいとかんがえています。"
        translation = "Sau khi tốt nghiệp đại học, tôi dự định đi du học tại một trường cao học ở Nhật Bản để nâng cao kiến thức chuyên ngành."
    }
    "番" = @{
        sentence = "銀行の窓口で受付番号のカードを受け取り、順番が呼ばれるまで静かに待った。"
        reading = "ぎんこうのまどぐちでうけつけばんごうのかーどをうけとり、じゅんばんがよばれるまでしずかにまった。"
        translation = "Tôi nhận thẻ số thứ tự tại quầy giao dịch ngân hàng rồi ngồi chờ yên lặng cho đến lượt mình được gọi."
    }
    "疑" = @{
        sentence = "どんなに魅力的な話であっても、すぐに信じ込まずに一度は疑ってみることが大切だ。"
        reading = "どんなにみりょくてきなはなしであっても、すぐにしんじこまずにいちどはうたがってみることがたいせつだ。"
        translation = "Dù câu chuyện có hấp dẫn đến đâu đi nữa thì điều quan trọng là không nên tin ngay mà cần hoài nghi kiểm chứng một lần."
    }
    "疲" = @{
        sentence = "長時間のパソコン作業で目がひどく疲れたので、遠くの緑を眺めて休ませた。"
        reading = "ちょうじかんのぱそこんさぎょうでめがひどくつかれたので、とおくのみどりをながめてやすませた。"
        translation = "Mắt tôi rất mệt mỏi sau nhiều giờ làm việc bên máy tính nên đã phóng tầm mắt nhìn cây xanh phía xa để nghỉ ngơi."
    }
    "痛" = @{
        sentence = "激しい運動を久しぶりにしたせいで、翌朝起きると足の筋肉が激しく痛んだ。"
        reading = "はげしいうんどうをひさしぶりにしたせいで、よくあさおきるとあしのきんにくがはげしくいたんだ。"
        translation = "Do lâu ngày mới vận động mạnh nên sáng hôm sau thức dậy bắp chân tôi đau nhức dữ dội."
    }
    "登" = @{
        sentence = "天気の良い週末に、初心者向けのコースを選んで友達と一緒に山へ登った。"
        reading = "てんきのよいしゅうまつに、しょしんしゃむけのこーすをえらんでともだちといっしょにやまへのぼった。"
        translation = "Vào một cuối tuần đẹp trời, tôi cùng bạn bè chọn cung đường dành cho người mới bắt đầu rồi leo lên ngọn núi."
    }
    "皆" = @{
        sentence = "会議の終わりに、部長は参加者全員に向けて「皆さんのご協力に感謝します」と述べた。"
        reading = "かいぎのおわりに、ぶちょうはさんかしゃぜんいんにむけて「みなさんのごきょうりょくにかんしゃします」とのべた。"
        translation = "Cuối cuộc họp, trưởng phòng đã nói với toàn thể người tham dự: Các bạn đã rất nhiệt tình hợp tác, tôi xin chân thành cảm ơn."
    }
    "盗" = @{
        sentence = "駅の駐輪場に鍵をかけずに自転車を停めておいたら、何者かに盗まれてしまった。"
        reading = "えきのちゅうりんじょうにかぎをかけずにじてんしゃをとめておいたら、なにものかにぬすまれてしまった。"
        translation = "Do dựng xe đạp ở bãi đỗ xe nhà ga mà không khóa nên đã bị kẻ nào đó trộm mất."
    }
    "直" = @{
        sentence = "提出したレポートにいくつか誤字が見つかったので、すぐに赤ペンで直した。"
        reading = "ていしゅつしたれぽーとにいくつかごじがみつかったので、すぐにあかぺんでなおした。"
        translation = "Vì tìm thấy vài lỗi chính tả trong báo cáo đã nộp nên tôi đã sửa lại ngay bằng bút đỏ."
    }
    "相" = @{
        sentence = "将来の進路について一人で悩まないで、信頼できる先輩に相談してみることにした。"
        reading = "しょうらいのしんろについてひとりでなやまないで、しんらいできるせんぱいにそうだんしてみることにした。"
        translation = "Thay vì một mình trăn trở về con đường tương lai, tôi quyết định trao đổi xin lời khuyên từ người tiền bối đáng tin cậy."
    }
    "眠" = @{
        sentence = "昨晩遅くまで試験勉強を続けていたため、昼下がりの講義中は眠くてたまらなかった。"
        reading = "さくばんおそくまでしけんべんきょうをつづけていたため、ひるさがりのこうぎちゅうはねむくてたまらなかった。"
        translation = "Vì thức khuya ôn thi đêm qua nên trong suốt giờ giảng buổi chiều tôi buồn ngủ không chịu nổi."
    }
    "石" = @{
        sentence = "川岸を歩きながら、水切り遊びにちょうど良さそうな平らな石を拾い集めた。"
        reading = "かわぎしをあるきながら、みずきりあそびにちょうどよさそうなたいらないしをひろいあつめた。"
        translation = "Vừa đi dạo dọc bờ sông, tôi vừa nhặt những hòn đá dẹt rất thích hợp để chơi ném đá lướt sóng."
    }
    "破" = @{
        sentence = "ポケットから鍵を取り出そうとした拍子に、お気に入りの上着の裏地が破れてしまった。"
        reading = "ぽけっとからかぎをとりだそうとしたひょうしに、おきにいりのうわぎのうらじがやぶれてしまった。"
        translation = "Đúng lúc định lấy chìa khóa từ túi áo ra thì lớp lót của chiếc áo khoác ưa thích bị rách toạc."
    }
    "確" = @{
        sentence = "重要な書類を郵送する前に、住所や宛名に誤りがないかを指差しで確認した。"
        reading = "じゅうようなしょるいをゆうそうするまえに、じゅうしょやあてなにあやまりがないかをゆびさしでかくにんした。"
        translation = "Trước khi gửi bưu điện tài liệu quan trọng, tôi đã dùng ngón tay chỉ để xác nhận kỹ xem địa chỉ và tên người nhận có sai sót gì không."
    }
    "示" = @{
        sentence = "調査の結果を分かりやすく伝えるために、データをグラフで示した資料を配った。"
        reading = "ちょうさのけっかをわかりやすくつたえるために、でーたをぐらふでしめしたしりょうをくばった。"
        translation = "Để truyền đạt kết quả khảo sát một cách dễ hiểu, tôi đã phát tài liệu biểu thị số liệu dưới dạng biểu đồ."
    }
    "礼" = @{
        sentence = "大変お世話になった恩師の先生に、心からの感謝を込めてお礼の手紙を送った。"
        reading = "たいへんおせわになったおんしのせんせいに、こころからのかんしゃをこめておれいのてがみをおくった。"
        translation = "Tôi đã gửi bức thư cảm ơn chứa chan sự biết ơn tận đáy lòng tới người thầy đã giúp đỡ tôi rất nhiều."
    }
    "祖" = @{
        sentence = "夏休みになると、毎年田舎にある祖父母の家へ遊びに行くのを楽しみにしている。"
        reading = "なつやすみになると、まいとしいなかにあるそふぼのいえへあそびにいくのをたのしみにしている。"
        translation = "Cứ đến kỳ nghỉ hè, tôi lại háo hức mong chờ được về quê thăm nhà ông bà như mọi năm."
    }
    "神" = @{
        sentence = "新年を迎えると、家族揃って近くの神社へ初詣に出かけて無病息災を祈る。"
        reading = "しんねんをむかえると、かぞくそろってちかくのじんじゃへはつもうでにでかけてむびょうそくさいをいのる。"
        translation = "Khi đón năm mới, cả gia đình tôi cùng nhau đến ngôi đền Thần đạo gần nhà viếng đầu năm để cầu sức khỏe bình an."
    }
    "福" = @{
        sentence = "家族みんなが健康で毎日笑顔で暮らせることが、何よりの幸福だと実感している。"
        reading = "かぞくみんながけんこうでまいにちえがおでくらせることが、なによりのこうふくだとじっかんしている。"
        translation = "Tôi thực sự cảm nhận rằng cả gia đình đều khỏe mạnh và sống mỗi ngày ngập tràn tiếng cười chính là niềm hạnh phúc lớn nhất."
    }
    "科" = @{
        sentence = "大学の理学部で最先端の科学技術について研究するのが幼い頃からの夢だった。"
        reading = "だいがくのりがくぶでさいせんたんのかがくぎじゅつについてけんきゅうするのがおさないころからのゆめだった。"
        translation = "Nghiên cứu về công nghệ khoa học tiên tiến tại khoa khoa học tự nhiên của trường đại học là ước mơ từ nhỏ của tôi."
    }
    "程" = @{
        sentence = "駅から会社までは徒歩で十分程度の距離なので、毎朝良い運動になっている。"
        reading = "えきからかいしゃまではとほでじゅっぷんていどのきょりなので、まいあさよいうんどうになっている。"
        translation = "Từ nhà ga đến công ty chỉ mất khoảng 10 phút đi bộ nên mỗi sáng đây là một bài tập thể dục rất tốt."
    }
    "種" = @{
        sentence = "春になったら庭の花壇に朝顔の種を蒔いて、綺麗な花を咲かせたい。"
        reading = "はるになったらにわのかだんにあさがおのたねをまいて、きれいなはなをさかせたい。"
        translation = "Khi mùa xuân đến, tôi muốn gieo hạt hoa bìm bìm vào bồn hoa trong sân để ngắm hoa nở rực rỡ."
    }
    "積" = @{
        sentence = "冬の寒さが厳しくなり、昨夜から降り続いた雪が屋根の上に深く積もった。"
        reading = "ふゆのさむさがきびしくなり、さくやからふりつづいたゆきがやねのうえにふかくつもった。"
        translation = "Cái lạnh mùa đông trở nên khắc nghiệt, và tuyết rơi suốt từ đêm qua đã chất thành lớp dày trên mái nhà."
    }
    "突" = @{
        sentence = "角を曲がったところで自転車と突然衝突しそうになり、思わず飛び退いた。"
        reading = "かどをまがったところでじてんしゃととつぜんしょうとつしそうになり、おもわずとびのいた。"
        translation = "Vừa rẽ qua góc cua thì suýt đâm sầm vào chiếc xe đạp, tôi giật mình nhảy lùi lại."
    }
    "窓" = @{
        sentence = "部屋の空気を入れ替えるために窓を全開にすると、心地よい春の風が吹き込んできた。"
        reading = "へやのくうきをいれかえるためにまどをぜんかいにすると、ここちよいはるのかぜがふきこんできた。"
        translation = "Khi mở toang cửa sổ để đổi gió cho căn phòng, làn gió xuân dễ chịu liền ùa vào."
    }
    "笑" = @{
        sentence = "友達が話してくれた面白い冗談を聞いて、お腹が痛くなるほど大声で笑った。"
        reading = "ともだちがはなしてくれたおもしろいじょうだんをきいて、おなかがいたくなるほどおおごえでわらった。"
        translation = "Nghe câu chuyện đùa thú vị mà người bạn kể, tôi đã cười lớn đến mức đau cả bụng."
    }
    "等" = @{
        sentence = "法律の前では、身分や性別に関係なく全ての国民が平等に扱われなければならない。"
        reading = "ほうりつのまえでは、みぶんやせいべつにかんけいなくすべてのこくみんがびょうどうにあつかわれなければならない。"
        translation = "Trước pháp luật, bất kể thân phận hay giới tính, mọi công dân đều phải được đối xử bình đẳng."
    }
    "箱" = @{
        sentence = "引っ越しの準備をするために、近所のスーパーから不要になった段ボール箱を譲り受けた。"
        reading = "ひっこしのじゅんびをするために、きんじょのすーぱーからふようになっただんぼーるばこをゆずりうけた。"
        translation = "Để chuẩn bị dọn nhà, tôi đã xin lại những chiếc thùng các-tông không dùng đến từ siêu thị gần nhà."
    }
    "米" = @{
        sentence = "実家の両親が丹精込めて作った新米が届いたので、さっそく炊いて味わった。"
        reading = "じっかのりょうしんがたんせいこめてつくったしんまいがとどいたので、さっそくたいてあじわった。"
        translation = "Gạo mới vụ này do bố mẹ ở quê dồn tâm huyết trồng gửi lên đã tới, tôi nấu ăn thử ngay."
    }
    "精" = @{
        sentence = "仕事に集中するためには、日頃から規則正しい生活を送って精神を安定させることが重要だ。"
        reading = "しごとにしゅうちゅうするためには、ひごろからきそくただしいせいかつをおくってせいしんをあんていさせることがじゅうようだ。"
        translation = "Để tập trung vào công việc, việc duy trì lối sống điều độ hằng ngày để tinh thần ổn định là rất quan trọng."
    }
    "約" = @{
        sentence = "大事な取引先との約束の時間を忘れないように、手帳に大きくメモしておいた。"
        reading = "だいじなとりひきさきとのやくそくのじかんをわすれないように、てちょうにおおきくめもしておいた。"
        translation = "Để không quên thời gian cuộc hẹn với đối tác quan trọng, tôi đã ghi chú cẩn thận vào sổ tay."
    }
    "組" = @{
        sentence = "家具の通信販売で買った木製の棚を、説明書を読みながら一人で組み立てた。"
        reading = "かぐのつうしんはんばいでかったもくせいのたなを、せつめいしょをよみながらひとりでくみたてた。"
        translation = "Tôi đã vừa đọc tờ hướng dẫn vừa tự tay một mình lắp ráp chiếc kệ gỗ mua qua bán hàng từ xa."
    }
    "経" = @{
        sentence = "若い頃に海外で様々なアルバイトをした経験が、今の仕事に大きく役立っている。"
        reading = "わかいころにかいがいでのさまざまなあるばいとをしたけいけんが、いまのしごとにおおきくやくだっている。"
        translation = "Kinh nghiệm làm nhiều công việc làm thêm ở nước ngoài thời trẻ đang giúp ích rất nhiều cho công việc hiện tại của tôi."
    }
}

Write-Host "Group 3 count: $($g3.Keys.Count) Kanji"

$jsonPath = "kanji_full_database.json"
$jsPath = "kanji_full_database.js"

$raw = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$tplRegex = 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

# Validation
foreach ($k in $g3.Keys) {
    $info = $g3[$k]
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
foreach ($k in $g3.Keys) {
    $val = $db.psobject.Properties[$k].Value
    $val.example = [PSCustomObject]@{
        sentence = $g3[$k].sentence
        reading = $g3[$k].reading
        translation = $g3[$k].translation
    }
}

$outJson = $db | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($jsonPath, $outJson, [System.Text.Encoding]::UTF8)
$jsContent = "window.KANJI_FULL_DATABASE = $outJson;"
[System.IO.File]::WriteAllText($jsPath, $jsContent, [System.Text.Encoding]::UTF8)

Write-Host "Group 3 (52 Kanji: 深 .. 経) đã lưu thành công!" -ForegroundColor Green
