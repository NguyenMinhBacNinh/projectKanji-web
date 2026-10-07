[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$batchData = [ordered]@{
    "与" = @{
        sentence = "子供の頃の経験は、人の成長に大きな影響を与えます。"
        reading = "こどものころのけいけんは、ひとのせいちょうにおおきなえいきょうをあたえます。"
        translation = "Những trải nghiệm thời thơ ấu đem lại ảnh hưởng rất lớn đối với sự trưởng thành của con người."
    }
    "両" = @{
        sentence = "日本へ留学することを決めたとき、両親は心から応援してくれました。"
        reading = "にほんへりゅうがくすることをきめたとき、りょうしんはこころからおうえんしてくれました。"
        translation = "Khi tôi quyết định sang Nhật Bản du học, bố mẹ đã hết lòng ủng hộ tôi."
    }
    "乗" = @{
        sentence = "出勤ラッシュの時間帯は、電車に乗るのも一苦労です。"
        reading = "しゅっきんらっしゅのじかんたいは、でんしゃにのるのもひとくろうです。"
        translation = "Vào khung giờ cao điểm đi làm, việc chen lên được tàu điện cũng là cả một sự vất vả."
    }
    "予" = @{
        sentence = "天気予報によると、明日は午後から激しい雨が降るそうです。"
        reading = "てんきよほうによると、あしたはごごからはげしいあめがふるそうです。"
        translation = "Theo dự báo thời tiết, nghe nói từ buổi chiều mai trời sẽ có mưa rất to."
    }
    "争" = @{
        sentence = "兄弟で些細なことで争うのはやめて、仲良く話し合いましょう。"
        reading = "きょうだいでささいなことであらそうのはやめて、なかよくはなしあいましょう。"
        translation = "Anh em trong nhà hãy dừng việc tranh cãi vì những chuyện vặt vãnh lại và cùng nhau hòa thuận nói chuyện nhé."
    }
    "互" = @{
        sentence = "チームの仲間がお互いに助け合って、困難なプロジェクトを成功させました。"
        reading = "ちーむのなかまがおたがいにたすけあって、こんなんなぷろじぇくとをせいこうさせました。"
        translation = "Các đồng đội trong nhóm đã tương trợ giúp đỡ lẫn nhau để đưa dự án đầy khó khăn đến thành công."
    }
    "亡" = @{
        sentence = "祖父が亡くなってからもう三年が経ちましたが、今でも温かい笑顔を思い出します。"
        reading = "そふがなくなってからもうさんねんがたちましたが、いまでもあたたかいえがおをおもいだします。"
        translation = "Kể từ khi ông nội qua đời thấm thoát đã ba năm trôi qua, nhưng tôi vẫn luôn nhớ nụ cười ấm áp của ông."
    }
    "交" = @{
        sentence = "地域のイベントに参加して、近所の人たちと楽しく交流を深めました。"
        reading = "ちいきのいべんとにさんかして、きんじょのひとたちとたのしくこうりゅうをふかめました。"
        translation = "Tham gia sự kiện của địa phương, tôi đã vui vẻ giao lưu gắn kết thêm tình làng nghĩa xóm."
    }
    "他" = @{
        sentence = "他人の意見を否定する前に、まず相手の立場になって考えてみることが大切です。"
        reading = "たにんのいけんをひていするまえに、まずあいてのたちばになってかんがえてみることがたいせつです。"
        translation = "Trước khi phủ định ý kiến của người khác, điều quan trọng là hãy thử đặt mình vào lập trường của họ để suy nghĩ."
    }
    "付" = @{
        sentence = "新しいアパートの付近には、スーパーや郵便局があってとても便利です。"
        reading = "あたらしいあぱーとのふきんには、すーぱーやゆうびんきょくがあってとてもべんりです。"
        translation = "Quanh khu vực gần căn hộ mới có cả siêu thị và bưu điện nên rất tiện lợi."
    }
    "件" = @{
        sentence = "先ほどお話しした新しい企画の件について、詳しい資料をお送りしました。"
        reading = "さきほどおはなししたあたらしいきかくのけんについて、くわしいしりょうをおおくりしました。"
        translation = "Về vụ việc liên quan đến bản kế hoạch mới mà chúng ta vừa trao đổi, tôi đã gửi tài liệu chi tiết cho bạn rồi."
    }
    "任" = @{
        sentence = "責任感を持って引き受けた仕事は、最後までやり遂げるべきです。"
        reading = "せきにんかんをもってひきうけたしごとは、さいごまでやりとげるべきです。"
        translation = "Công việc đã nhận bằng tinh thần trách nhiệm thì nên kiên trì hoàn thành đến cùng."
    }
    "伝" = @{
        sentence = "電話で伝言を頼むときは、要点を分かりやすく伝えるようにしています。"
        reading = "でんわででんごんをたのむときは、ようてんをわかりやすくつたえるようにしています。"
        translation = "Khi nhờ nhắn lại lời nhắn qua điện thoại, tôi luôn chú ý truyền đạt các ý chính sao cho thật dễ hiểu."
    }
    "似" = @{
        sentence = "弟は父親によく似ていて、話し方や歩き方までそっくりです。"
        reading = "おとうとはちちおやによくにていて、はなしかたやあるきかたまでそっくりです。"
        translation = "Cậu em trai rất giống bố tôi, từ cách nói năng cho đến dáng điệu bước đi đều giống hệt."
    }
    "位" = @{
        sentence = "地道な努力を続けた結果、スピーチコンテストで第一位に選ばれました。"
        reading = "じみちなどりょくをつづけたけっか、すぴーちこんてすとでだいいちいにえらばれました。"
        translation = "Nhờ kiên trì nỗ lực bền bỉ, tôi đã được chọn đạt vị trí thứ nhất trong cuộc thi hùng biện."
    }
    "余" = @{
        sentence = "時間に十分な余裕を持って空港へ向かったので、焦らずに出発できました。"
        reading = "じかんにじゅうぶんなよゆうをもってくうこうへむかったので、あせらずにしゅっぱつできました。"
        translation = "Vì chủ động dành nhiều thời gian dư dả để ra sân bay nên tôi đã có thể lên đường mà không bị cập rập."
    }
    "例" = @{
        sentence = "先生は難しい文法のルールを、身近な例を挙げて分かりやすく説明してくれました。"
        reading = "せんせいはむずかしいぶんぽうのるーるを、みぢかなれいをあげてわかりやすくせつめいしてくれました。"
        translation = "Thầy giáo đã đưa ra những ví dụ gần gũi thực tế để giải thích thật dễ hiểu các quy tắc ngữ pháp phức tạp."
    }
    "供" = @{
        sentence = "近所の公園では、夕方になると子供たちが元気に遊んでいます。"
        reading = "きんじょのこうえんでは、ゆうがたになるとこどもたちがげんきにあそんでいます。"
        translation = "Ở công viên gần nhà, cứ đến chiều muộn là lũ trẻ con lại nô đùa hăng say."
    }
    "便" = @{
        sentence = "インターネットのおかげで、いつでもどこでも買い物ができる便利な世の中になりました。"
        reading = "いんたーねっとのおかげで、いつでもどこでもかいものができるべんりなよのなかになりました。"
        translation = "Nhờ có mạng Internet, thế giới đã trở nên vô cùng tiện lợi khi có thể mua sắm ở mọi lúc mọi nơi."
    }
    "係" = @{
        sentence = "人間関係の悩みを一人で抱え込まずに、信頼できる先輩に相談してみました。"
        reading = "にんげんかんけいのなやみをひとりでかかえこまずに、しんらいできるせんぱいにそうだんしてみました。"
        translation = "Thay vì giữ kín những phiền muộn trong mối quan hệ con người một mình, tôi đã thử tâm sự với người tiền bối đáng tin cậy."
    }
    "信" = @{
        sentence = "毎日の練習を積み重ねていくうちに、少しずつ自分に自信が持てるようになりました。"
        reading = "まいにちのれんしゅうをつみかさねていくうちに、すこしずつじぶんにじしんがもてるようになりました。"
        translation = "Qua quá trình tích lũy luyện tập mỗi ngày, tôi đã dần dần có thêm sự tự tin vào chính bản thân mình."
    }
    "倒" = @{
        sentence = "昨夜の強い台風によって、道路沿いの大きな木が何本も倒れてしまいました。"
        reading = "ゆうべのつよいたいふうによって、どうろぞいのおおきなきがなんぼんもたおれてしまいました。"
        translation = "Do cơn bão dữ dội tối qua mà rất nhiều cây to ven đường đã bị quật đổ gãy."
    }
    "候" = @{
        sentence = "日本は四季がはっきりしていて、地域によって気候が大きく異なります。"
        reading = "にほんはしきがはっきりしていて、ちいきによってきこうがおおきくことなります。"
        translation = "Nhật Bản có bốn mùa rõ rệt và khí hậu có sự khác biệt rất lớn tùy theo từng vùng miền."
    }
    "値" = @{
        sentence = "最近は物価が上がって、食料品や日用品の値段が高くなっています。"
        reading = "さいきんはぶっかがあがって、しょくりょうひんやにちようひんのねだんがたかくなっています。"
        translation = "Dạo gần đây vật giá leo thang nên giá cả của thực phẩm và đồ dùng sinh hoạt hàng ngày đều tăng cao."
    }
    "偉" = @{
        sentence = "失敗を恐れずに挑戦し続けた偉人たちの生き方に、深く感銘を受けました。"
        reading = "しっぱいをおそれずにちょうせんしつづけたいじんたちのいきかたに、ふかくかんめいをうけました。"
        translation = "Tôi vô cùng cảm phục trước lẽ sống của những bậc vĩ nhân đã không sợ thất bại mà kiên trì đương đầu thử thách."
    }
    "側" = @{
        sentence = "駅の改札を出て右側に進むと、大きなショッピングモールが見えてきます。"
        reading = "えきのかいさつをでてみぎがわにすすむと、おおきなしょっぴんぐもーるがみえてきます。"
        translation = "Bước ra khỏi cửa soát vé ga rẽ sang phía bên phải, bạn sẽ nhìn thấy một trung tâm thương mại lớn."
    }
    "偶" = @{
        sentence = "街のカフェで偶然高校時代の親友と再会して、懐かしい話で盛り上がりました。"
        reading = "まちのかふぇでぐうぜんこうこうじだいのしんゆうとさいかいして、なつかしいはなしでもりあがりました。"
        translation = "Tình cờ gặp lại người bạn thân thời cấp ba ở một quán cà phê trong phố, chúng tôi đã rôm rả ôn lại những kỷ niệm xưa."
    }
    "備" = @{
        sentence = "自然災害に備えて、水や非常食をあらかじめ準備しておくことが大切です。"
        reading = "しぜんさいがいにそなえて、みずやひじょうしょくをあらかじめじゅんびしておくことがたいせつです。"
        translation = "Để phòng ngừa thiên tai tự nhiên, việc chuẩn bị sẵn nước và thực phẩm khẩn cấp từ trước là vô cùng quan trọng."
    }
    "働" = @{
        sentence = "日本の企業で働きながら、ビジネス日本語やビジネスマナーを身につけています。"
        reading = "にほんのきぎょうではたらきながら、びじねすにほんごやびじねすまなーをみにつけています。"
        translation = "Vừa làm việc tại doanh nghiệp Nhật Bản, tôi vừa trau dồi tiếng Nhật thương mại và tác phong công sở."
    }
    "優" = @{
        sentence = "困っているときに優しく声をかけてくれた人の温かさは、一生忘れられません。"
        reading = "こまっているときにやさしくこえをかけてくれたひとのあたたかさは、いっしょうわすれられません。"
        translation = "Sự ấm áp của người đã ân cần hỏi han động viên khi tôi gặp khó khăn là điều cả đời này tôi không bao giờ quên."
    }
}

Write-Host "Batch 1 N3: $($batchData.Count) Kanji"

$jsonPath = "kanji_full_database.json"
$jsPath = "kanji_full_database.js"

$raw = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

# 1. Validation trước khi ghi
$errors = @()
$seen = @{}
$tplRegex = 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

foreach ($k in $batchData.Keys) {
    $info = $batchData[$k]
    $s = $info.sentence
    $t = $info.translation
    
    if (-not $s.Contains($k)) {
        $errors += "Kanji $k không có trong sentence: $s"
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

# 2. Ghi vào DB
$updatedCount = 0
foreach ($k in $batchData.Keys) {
    $val = $db.psobject.Properties[$k].Value
    $val.example = [PSCustomObject]@{
        sentence = $batchData[$k].sentence
        reading = $batchData[$k].reading
        translation = $batchData[$k].translation
    }
    $updatedCount++
}

# 3. SAVE FILE
$outJson = $db | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($jsonPath, $outJson, [System.Text.Encoding]::UTF8)
Write-Host "Đã lưu vào $jsonPath" -ForegroundColor Green

$jsContent = "window.KANJI_FULL_DATABASE = $outJson;"
[System.IO.File]::WriteAllText($jsPath, $jsContent, [System.Text.Encoding]::UTF8)
Write-Host "Đã lưu vào $jsPath" -ForegroundColor Green

# 4. READ-BACK VALIDATION TỪ FILE
$readRaw = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$readDb = $readRaw | ConvertFrom-Json

$postErrors = @()
foreach ($k in $batchData.Keys) {
    $val = $readDb.psobject.Properties[$k].Value
    $ex = $val.example
    if (-not $ex -or -not $ex.sentence) {
        $postErrors += "Record $k bị thiếu example sau khi ghi!"
        continue
    }
    $s = $ex.sentence
    if ($s -match $tplRegex) {
        $postErrors += "Record $k trong file vẫn còn template: $s"
    }
    if (-not $s.Contains($k)) {
        $postErrors += "Record $k trong file không chứa Kanji mục tiêu: $s"
    }
}

if ($postErrors.Count -gt 0) {
    Write-Host "KIỂM TRA SAU GHI THẤT BẠI:" -ForegroundColor Red
    $postErrors | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
    exit 1
}

Write-Host "KIỂM TRA SAU GHI: 100% PASS!" -ForegroundColor Green
Write-Host "Đã hoàn thành Batch 1 N3 ($updatedCount Kanji)!"
