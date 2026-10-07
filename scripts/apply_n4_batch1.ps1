[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$batchData = [ordered]@{
    "不" = @{
        sentence = "初めて一人で海外へ行くので少し不安です。"
        reading = "はじめてひとりでかいがいへいくのですこしふあんです。"
        translation = "Lần đầu tiên đi ra nước ngoài một mình nên tôi hơi cảm thấy lo lắng."
    }
    "世" = @{
        sentence = "いつか世界中を旅行してみたいと思っています。"
        reading = "いつかせかいじゅうをりょこうしてみたいとおもっています。"
        translation = "Tôi mong muốn một ngày nào đó được đi du lịch vòng quanh thế giới."
    }
    "主" = @{
        sentence = "この町の主な産業は農業と観光業です。"
        reading = "このまちのおもなさんぎょうはのうぎょうとかんこうぎょうです。"
        translation = "Các ngành công nghiệp chính của thị trấn này là nông nghiệp và du lịch."
    }
    "事" = @{
        sentence = "最近は仕事が忙しくてなかなか休めません。"
        reading = "さいきんはしごとがいそがしくてなかなかやすめません。"
        translation = "Dạo gần đây công việc bận rộn nên tôi mãi chẳng thể nghỉ ngơi được."
    }
    "京" = @{
        sentence = "秋になったら古いお寺を見に京都へ行く予定です。"
        reading = "あきになったらふるいおてらをみにきょうとへいくよていです。"
        translation = "Khi mùa thu đến, tôi dự định sẽ đi Kyoto để ngắm những ngôi chùa cổ kính."
    }
    "仕" = @{
        sentence = "電車が止まってしまったので、歩いて帰るしか仕方がありません。"
        reading = "でんしゃがとまってしまったので、あるいてかえるしかしかたがありません。"
        translation = "Vì tàu điện đã ngừng chạy nên tôi đành chẳng còn cách nào khác ngoài việc đi bộ về."
    }
    "代" = @{
        sentence = "学生の時代は毎日のように友達と遊んでいました。"
        reading = "がくせいのじだいはまいにちのようにともだちとあそんでいました。"
        translation = "Thời còn là học sinh sinh viên, ngày nào tôi cũng đi chơi với bạn bè."
    }
    "以" = @{
        sentence = "この映画は十二歳以上でなければ見ることができません。"
        reading = "このえいがはじゅうにさいいじょうでなければみることができません。"
        translation = "Bộ phim này nếu không từ 12 tuổi trở lên thì không thể xem được."
    }
    "会" = @{
        sentence = "将来は日系会社で通訳として働きたいです。"
        reading = "しょうらいはにっけいかいしゃでつうやくとしてはたらきたいです。"
        translation = "Trong tương lai tôi muốn làm việc tại một công ty Nhật Bản với tư cách là phiên dịch viên."
    }
    "住" = @{
        sentence = "今は静かで緑が多い郊外のアパートに住んでいます。"
        reading = "いまはしずかでみどりがおおいこうがいのあぱーとにすんでいます。"
        translation = "Hiện tại tôi đang sống ở một căn hộ chung cư vùng ngoại ô yên tĩnh và nhiều cây xanh."
    }
    "体" = @{
        sentence = "毎日野菜をたくさん食べて体を大切にしています。"
        reading = "まいにちやさいをたくさんたべてからだをたいせつにしています。"
        translation = "Mỗi ngày tôi ăn nhiều rau củ để giữ gìn và chăm sóc sức khỏe cơ thể."
    }
    "作" = @{
        sentence = "日曜日の午後に家族のためにケーキを作りました。"
        reading = "にちようびのごごにかぞくのためにけーきをつくりました。"
        translation = "Chiều chủ nhật tôi đã làm bánh ngọt cho cả gia đình."
    }
    "使" = @{
        sentence = "このアプリを使えば電車の乗り換えが簡単に調べられます。"
        reading = "このあぷりをつかえばでんしゃののりかえがかんたんにしらべられます。"
        translation = "Nếu dùng ứng dụng này, bạn có thể tra cứu việc đổi tàu điện một cách dễ dàng."
    }
    "借" = @{
        sentence = "駅の近くの店で自転車を一日借りて観光しました。"
        reading = "えきのちかくのみせでじてんしゃをいちにちかりてかんこうしました。"
        translation = "Tôi đã thuê một chiếc xe đạp trong một ngày ở cửa hàng gần ga để đi tham quan."
    }
    "元" = @{
        sentence = "風邪を引いていましたが、薬を飲んで元気になりました。"
        reading = "かぜをひいていましたが、くすりをのんでげんきになりました。"
        translation = "Tôi từng bị cảm nhưng sau khi uống thuốc đã khỏe mạnh trở lại."
    }
    "兄" = @{
        sentence = "私の兄は大学で経済学を専攻しています。"
        reading = "わたしのあにはだいがくでけいざいがくをせんこうしています。"
        translation = "Anh trai tôi theo học chuyên ngành kinh tế học ở trường đại học."
    }
    "公" = @{
        sentence = "天気がいいので近くの公園へ散歩に行きましょう。"
        reading = "てんきがいいのでちかくのこうえんへさんぽにいきましょう。"
        translation = "Thời tiết đẹp nên chúng ta hãy cùng đi dạo đến công viên gần đây nhé."
    }
    "写" = @{
        sentence = "桜が満開の場所で友達と記念写真を撮りました。"
        reading = "さくらがまんかいのばしょでともだちときねんしゃしんをとりました。"
        translation = "Tôi đã cùng bạn bè chụp một bức ảnh kỷ niệm ở nơi hoa anh đào nở rộ."
    }
    "冬" = @{
        sentence = "冬休みには北海道へスキーをしに行こうと考えています。"
        reading = "ふゆやすみにはほっかいどうへすきーをしにいこうとかんがえています。"
        translation = "Vào kỳ nghỉ đông tôi đang tính sẽ đi Hokkaido để trượt tuyết."
    }
    "切" = @{
        sentence = "道に迷ったとき、通りすがりの人がとても親切に教えてくれました。"
        reading = "みちにまよったとき、とおりすがりのひとがとてもしんせつにおしえてくれました。"
        translation = "Khi tôi bị lạc đường, một người đi ngang qua đã rất tốt bụng chỉ đường cho tôi."
    }
    "別" = @{
        sentence = "駅の改札口で「また会いましょう」と言って友達と別れました。"
        reading = "えきのかいさつぐちで「またあいましょう」といってともだちとわかれました。"
        translation = 'Ở cửa soát vé nhà ga, tôi nói "Hẹn gặp lại nhé" rồi chia tay người bạn.'
    }
    "力" = @{
        sentence = "重い荷物を一人で運ぶにはかなりの力が必要です。"
        reading = "おもいにもつをひとりではこぶにはかなりのちからがひつようです。"
        translation = "Để tự mình mang vác đồ đạc nặng nề thì cần khá nhiều sức lực."
    }
    "勉" = @{
        sentence = "試験に合格できるように毎晩遅くまで勉強しています。"
        reading = "しけんにごうかくできるようにまいばんおそくまでべんきょうしています。"
        translation = "Để có thể thi đỗ, mỗi tối tôi đều học bài đến tận khuya."
    }
    "動" = @{
        sentence = "休みの日は家でじっとしていないで、外で軽く運動するようにしています。"
        reading = "やすみのひはいえでじっとしていないで、そとでかるくうんどうするようにしています。"
        translation = "Vào ngày nghỉ, thay vì cứ ngồi yên trong nhà, tôi cố gắng ra ngoài vận động nhẹ nhàng."
    }
    "医" = @{
        sentence = "熱が下がらなかったので、病院へ行って医者に診てもらいました。"
        reading = "ねつがさがらなかったので、びょういんへいっていしゃにみてもらいました。"
        translation = "Vì cơn sốt mãi không hạ nên tôi đã đến bệnh viện để bác sĩ khám bệnh."
    }
    "去" = @{
        sentence = "去年日本へ留学に来てから、もう一年が経ちました。"
        reading = "きょねんにほんへりゅうがくにきてから、もういちねんがたちました。"
        translation = "Kể từ khi tôi sang Nhật du học vào năm ngoái, thấm thoát đã một năm trôi qua."
    }
    "口" = @{
        sentence = "駅の東口を出たところに待ち合わせのカフェがあります。"
        reading = "えきのひがしぐちをでたところにまちあわせのかふぇがあります。"
        translation = "Quán cà phê hẹn gặp nằm ngay chỗ bước ra từ cửa đông của nhà ga."
    }
    "古" = @{
        sentence = "この町には百年前から残っている古い建物がたくさん並んでいます。"
        reading = "このまちにはひゃくねんまえからのこっているふるいたてものがたくさんならんでいます。"
        translation = "Ở thị trấn này san sát rất nhiều công trình kiến trúc cổ kính còn lưu giữ từ 100 năm trước."
    }
    "台" = @{
        sentence = "明日は強い台風が近づいてくるので、外出を控えてください。"
        reading = "あしたはつよいたいふうがちかづいてくるので、がいしゅつをひかえてください。"
        translation = "Ngày mai một cơn bão mạnh sắp tiến lại gần, xin hãy hạn chế ra ngoài."
    }
    "同" = @{
        sentence = "私と田中さんは同じ高校を卒業した親しい友人です。"
        reading = "わたしとたなかさんはおなじこうこうをそつぎょうしたしたしいゆうじんです。"
        translation = "Tôi và anh Tanaka là những người bạn thân thiết cùng tốt nghiệp chung một trường trung học."
    }
}

Write-Host "Batch 1 N4 count: $($batchData.Count) Kanji"

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

Write-Host "Validation passed 100%! Đang cập nhật N4 vào database..." -ForegroundColor Green

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

Write-Host "`nĐã cập nhật thành công $updatedCount Kanji N4!"
