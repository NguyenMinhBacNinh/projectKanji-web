[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$batchData = [ordered]@{
    "味" = @{
        sentence = "この料理は少し辛い味がしますが、とても美味しいです。"
        reading = "このりょうりはすこしからいあじがしますが、とてもおいしいです。"
        translation = "Món ăn này có vị hơi cay một chút nhưng rất ngon."
    }
    "品" = @{
        sentence = "このスーパーでは新鮮な食品を安く買うことができます。"
        reading = "このすーぱーではしんせんなしょくひんをやすくかうことができます。"
        translation = "Ở siêu thị này bạn có thể mua các loại thực phẩm tươi ngon với giá rẻ."
    }
    "員" = @{
        sentence = "店員さんに親切に案内してもらって、欲しかった服が見つかりました。"
        reading = "てんいんさんにしんせつにあんないしてもらって、ほしかったふくがみつかりました。"
        translation = "Được nhân viên cửa hàng tận tình hướng dẫn nên tôi đã tìm thấy bộ quần áo mình muốn mua."
    }
    "問" = @{
        sentence = "テストで分からない問題があったら、先生に質問してください。"
        reading = "てすとでわからないもんだいがあったら、せんせいにしつもんしてください。"
        translation = "Nếu trong bài kiểm tra có câu hỏi không hiểu, bạn hãy hỏi thầy giáo nhé."
    }
    "図" = @{
        sentence = "放課後は静かな図書館で友達と一緒に宿題をします。"
        reading = "ほうかごはしずかなとしょかんでともだちといっしょにしゅくだいをします。"
        translation = "Sau giờ học tôi cùng bạn bè làm bài tập ở một thư viện yên tĩnh."
    }
    "地" = @{
        sentence = "初めての町を散歩するときは、スマートフォンの地図を見ながら歩きます。"
        reading = "はじめてのまちをさんぽするときは、すまーとふぉんのちずをみながらあるきます。"
        translation = "Khi đi dạo ở một thị trấn xa lạ lần đầu đến, tôi vừa đi vừa xem bản đồ trên điện thoại thông minh."
    }
    "堂" = @{
        sentence = "お昼休みになると、学生たちで大学の食堂がいっぱいになります。"
        reading = "おひるやすみになると、がくせいたちでだいがくのしょくどうがいっぱいになります。"
        translation = "Cứ hễ đến giờ nghỉ trưa là nhà ăn của trường đại học lại đông nghẹt sinh viên."
    }
    "場" = @{
        sentence = "駅前の広い広場で毎週日曜日にフリーマーケットが開かれます。"
        reading = "えきまえのひろいひろばでまいしゅうにちようびにふりーまーけっとがひらかれます。"
        translation = "Tại quảng trường rộng lớn trước nhà ga, chợ trời được tổ chức vào mỗi chủ nhật."
    }
    "売" = @{
        sentence = "駅の売店でお茶とお弁当を買ってから新幹線に乗りました。"
        reading = "えきのばいてんでおちゃとおべんとうをかってからしんかんせんにのりました。"
        translation = "Tôi mua trà và hộp cơm bento ở quầy bán hàng của nhà ga rồi mới bước lên tàu Shinkansen."
    }
    "夏" = @{
        sentence = "今年の夏休みは友達と一緒に海へ泳ぎに行く約束をしました。"
        reading = "ことしのなつやすみはともだちといっしょにうみへおよぎにいくやくそくをしました。"
        translation = "Vào kỳ nghỉ hè năm nay, tôi đã hẹn với bạn bè sẽ cùng nhau đi tắm biển."
    }
    "夕" = @{
        sentence = "夕方になると空がきれいなオレンジ色に染まります。"
        reading = "ゆうがたになるとそらがきれいなおれんじいろにそまります。"
        translation = "Cứ đến chiều tà là bầu trời lại nhuộm lên một màu cam tuyệt đẹp."
    }
    "多" = @{
        sentence = "日本へ旅行に来る外国人の観光客は年々多くなっています。"
        reading = "にほんへりょこうにくるがいこくじんのかんこうきゃくはねんねんおおくなっています。"
        translation = "Khách du lịch nước ngoài đến Nhật Bản du lịch đang ngày một nhiều hơn qua từng năm."
    }
    "夜" = @{
        sentence = "今夜は星がとても綺麗に見えるので、ベランダで夜風に当たっています。"
        reading = "こんやはほしがとてもきれいにみえるので、べらんだでよかぜにあたっています。"
        translation = "Tối nay các vì sao nhìn rất đẹp nên tôi đang hóng gió đêm ngoài ban công."
    }
    "妹" = @{
        sentence = "私の妹は絵を描くのがとても上手で、将来はイラストレーターになりたいそうです。"
        reading = "わたしのいもうとはえをかくのがとてもじょうずで、しょうらいはいらすとれーたーになりたいそうです。"
        translation = "Em gái tôi vẽ tranh rất giỏi và nghe nói sau này em muốn trở thành một họa sĩ minh họa."
    }
    "姉" = @{
        sentence = "姉は東京の会社で働いていて、週末によく電話をかけてくれます。"
        reading = "あねはとうきょうのかいしゃではたらいていて、しゅうまつによくでんわをかけてくれます。"
        translation = "Chị gái tôi đang làm việc ở một công ty tại Tokyo và thường hay gọi điện thoại cho tôi vào dịp cuối tuần."
    }
    "始" = @{
        sentence = "来週の月曜日から新しい日本語のクラスが始まります。"
        reading = "らいしゅうのげつようびからあたらしいにほんごのくらすがはじまります。"
        translation = "Từ thứ hai tuần tới, lớp học tiếng Nhật mới sẽ chính thức bắt đầu."
    }
    "字" = @{
        sentence = "漢字を覚えるときは、毎日ノートに何度も書いて練習しています。"
        reading = "かんじをおぼえるときは、まいにちのーとになんどもかいてれんしゅうしています。"
        translation = "Khi học nhớ chữ Hán, mỗi ngày tôi đều viết đi viết lại nhiều lần vào vở để luyện tập."
    }
    "安" = @{
        sentence = "飛行機が無事に目的地へ着いたと聞いて安心しました。"
        reading = "ひこうきがぶじにもくてきちへついたときいてあんしんしました。"
        translation = "Tôi đã thở phào an tâm khi nghe tin chuyến bay đã hạ cánh an toàn tới nơi."
    }
    "室" = @{
        sentence = "授業が終わった後、先生の部屋へ行って研究室を見学しました。"
        reading = "じゅぎょうがおわったあと、せんせいのへやへいってけんきゅうしつをけんがくしました。"
        translation = "Sau khi buổi học kết thúc, tôi đã đến phòng của thầy và đi tham quan phòng nghiên cứu."
    }
    "家" = @{
        sentence = "週末は家族みんなでリビングに集まって映画を見ます。"
        reading = "しゅうまつはかぞくみんなでりびんぐにあつまってえいがをみます。"
        translation = "Vào cuối tuần, cả gia đình tôi lại quây quần ở phòng khách cùng nhau xem phim."
    }
    "少" = @{
        sentence = "日本語を話す機会がまだ少ないので、もっと会話の練習がしたいです。"
        reading = "にほんごをはなすきかいがまだすくないので、もっとかいわのれんしゅうがしたいです。"
        translation = "Cơ hội nói tiếng Nhật của tôi vẫn còn ít nên tôi muốn luyện tập hội thoại nhiều hơn nữa."
    }
    "屋" = @{
        sentence = "天気がとても良いので、ビルの屋上に上がって街の景色を眺めました。"
        reading = "てんきがとてもよいので、びるのおくじょうにあがってまちのけしきをながめました。"
        translation = "Thời tiết rất đẹp nên tôi đã lên sân thượng của tòa nhà để ngắm nhìn toàn cảnh thành phố."
    }
    "工" = @{
        sentence = "道路の工事をしているため、この道は車が通ることができません。"
        reading = "どうろのこうじをしているため、このみちはくるまがとおることができません。"
        translation = "Vì đang thi công sửa chữa đường sá nên ô tô không thể đi qua con đường này."
    }
    "帰" = @{
        sentence = "仕事が終わったらまっすぐ家に帰って、温かいお風呂に入りたいです。"
        reading = "しごとがおわったらまっすぐにいえにかえって、あたたかいおふろにはいりたいです。"
        translation = "Sau khi tan làm, tôi chỉ muốn về thẳng nhà và ngâm mình trong bồn tắm nước ấm."
    }
    "広" = @{
        sentence = "引っ越した新しいアパートの部屋はとても広くて日当たりも良いです。"
        reading = "ひっこしたあたらしいあぱーとのへやはとてもひろくてひあたりもよいです。"
        translation = "Căn phòng ở chung cư mới chuyển đến rất rộng rãi và đón được nhiều ánh sáng tự nhiên."
    }
    "店" = @{
        sentence = "駅の近くにある小さな喫茶店で、コーヒーを飲みながら本を読みました。"
        reading = "えきのちかくにあるちいさなきっさてんで、こーひーをのみながらほんをよみました。"
        translation = "Tại một quán cà phê nhỏ gần nhà ga, tôi vừa nhâm nhi cà phê vừa đọc sách."
    }
    "度" = @{
        sentence = "日本の春は桜がとても綺麗なので、ぜひ一度見に来てください。"
        reading = "にほんのはるはさくらがとてもきれいなので、ぜひいちどみにきてください。"
        translation = "Mùa xuân ở Nhật hoa anh đào nở rất đẹp nên bạn nhất định hãy đến ngắm thử một lần nhé."
    }
    "建" = @{
        sentence = "駅から歩いて五分のところに新しい近代的な建物が建ちました。"
        reading = "えきからあるいてごふんのところにあたらしいきんだいてきなたてものがたちました。"
        translation = "Ở vị trí cách nhà ga năm phút đi bộ, một tòa nhà mới hiện đại vừa được xây dựng."
    }
    "弟" = @{
        sentence = "私には高校生の弟がいて、毎朝一緒に自転車で学校へ行きます。"
        reading = "わたしにはこうこうせいのおとうとがいて、まいあさいっしょにじてんしゃでがっこうへいきます。"
        translation = "Tôi có một cậu em trai học cấp ba, mỗi sáng hai anh em đều cùng nhau đạp xe đến trường."
    }
    "強" = @{
        sentence = "今日は風がとても強かったので、傘が飛ばされそうになりました。"
        reading = "きょうはかぜがとてもつよかったので、かさがとばされそうになりました。"
        translation = "Hôm nay gió thổi rất mạnh nên chiếc ô của tôi suýt nữa thì bị bay mất."
    }
}

Write-Host "Batch 2 N4 count: $($batchData.Count) Kanji"

$jsonPath = "kanji_full_database.json"
$jsPath = "kanji_full_database.js"

$raw = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

# Validation
$errors = @()
$seen = @{}

foreach ($k in $batchData.Keys) {
    $info = $batchData[$k]
    $s = $info.sentence
    $t = $info.translation
    
    if (-not $s.Contains($k)) {
        $errors += "Lỗi Kanji $k không có trong câu: $s"
    }
    if ([string]::IsNullOrWhiteSpace($t)) {
        $errors += "Lỗi Kanji $k thiếu translation"
    }
    if ($s -match 'この漢字|この字|という漢字|という意味|と読みます') {
        $errors += "Lỗi Kanji $k vi phạm template: $s"
    }
    if ($seen.ContainsKey($s)) {
        $errors += "Lỗi trùng câu: $s"
    } else {
        $seen[$s] = $k
    }
    if (-not $db.psobject.Properties[$k]) {
        $errors += "Lỗi không tìm thấy $k trong DB"
    }
}

if ($errors.Count -gt 0) {
    Write-Host "Validation failed:" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
    exit 1
}

Write-Host "Validation passed 100%! Đang cập nhật Batch 2 (từ 味 trở đi) vào database..." -ForegroundColor Green

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

# Write JSON
$outJson = $db | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($jsonPath, $outJson, [System.Text.Encoding]::UTF8)
Write-Host "Đã lưu vào $jsonPath" -ForegroundColor Green

# Write JS
$jsContent = "window.KANJI_FULL_DATABASE = $outJson;"
[System.IO.File]::WriteAllText($jsPath, $jsContent, [System.Text.Encoding]::UTF8)
Write-Host "Đã lưu vào $jsPath" -ForegroundColor Green

Write-Host "`nĐã cập nhật thành công $updatedCount Kanji N4 bắt đầu từ 味!"
