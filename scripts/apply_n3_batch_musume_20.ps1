[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$batchData = [ordered]@{
    "娘" = @{
        sentence = "私の一人娘は今年小学校に入学し、毎日楽しそうに通っています。"
        reading = "わたしのひとりむすめはことししょうがっこうににゅうがくし、まいにちたのしそうにかよっています。"
        translation = "Con gái một của tôi năm nay vào lớp một và mỗi ngày cháu đều vui vẻ đi học."
    }
    "婚" = @{
        sentence = "親友の結婚式に出席するために、週末に京都へ行ってきました。"
        reading = "しんゆうのけっこんしきにしゅっせきするために、しゅうまつにきょうとへいってきました。"
        translation = "Để tham dự lễ cưới của người bạn thân, cuối tuần tôi đã đi đến Kyoto."
    }
    "婦" = @{
        sentence = "あのご夫婦はいつも仲良く並んで近所の公園を散歩しています。"
        reading = "あのごふうふはいつもなかよくならんできんじょのこうえんをさんぽしています。"
        translation = "Đôi vợ chồng ấy lúc nào cũng hòa thuận cùng nhau sánh bước đi dạo ở công viên gần nhà."
    }
    "存" = @{
        sentence = "この地方には、何百年も前から大切に受け継がれてきた伝統文化が存在しています。"
        reading = "このちほうには、なんびゃくねんもまえからたいせつにうけつがれてきたでんとうぶんかがそんざいしています。"
        translation = "Ở địa phương này tồn tại một nền văn hóa truyền thống được gìn giữ và truyền thừa cẩn thận từ hàng trăm năm trước."
    }
    "宅" = @{
        sentence = "今夜は仕事が終わったらまっすぐ自宅へ帰って、ゆっくり休むつもりです。"
        reading = "こんやはしごとがおわったらまっすぐにじたくへかえって、ゆっくりやすむつもりです。"
        translation = "Tối nay sau khi xong việc, tôi dự định sẽ về thẳng nhà riêng và nghỉ ngơi thong thả."
    }
    "守" = @{
        sentence = "信頼関係を築くためには、相手と交わした約束をしっかり守ることが何よりも大切です。"
        reading = "しんらいかんけいをきずくためには、あいてとかわしたやくそくをしっかりまもることがなによりもたいせつです。"
        translation = "Để xây dựng mối quan hệ tin cậy, việc nghiêm túc giữ đúng lời hứa với đối phương là quan trọng hơn cả."
    }
    "完" = @{
        sentence = "三ヶ月にわたるチームでの開発作業を経て、ついに新しいアプリケーションが完成しました。"
        reading = "さんかげつにわたるちーむでのかいはつさぎょうをへて、ついにあたらしいあぷりけーしょんがかんせいしました。"
        translation = "Trải qua ba tháng cùng nhau phát triển trong nhóm, cuối cùng ứng dụng mới cũng đã hoàn thành."
    }
    "官" = @{
        sentence = "道に迷って困っていたとき、交番の警察官が地図を見せて丁寧に案内してくれました。"
        reading = "みちにまよってこまっていたとき、こうばんのけいさつかんがちずをみせてていねいにあんないしてくれました。"
        translation = "Khi tôi bị lạc đường, người cảnh sát ở đồn đã chỉ bản đồ và nhiệt tình hướng dẫn cho tôi."
    }
    "定" = @{
        sentence = "明日の会議の予定が決まり次第、参加者全員にメールでご連絡いたします。"
        reading = "あしたのかいぎのよていがきまりしだい、さんかしゃぜんいんにめーるでごれんらくいたします。"
        translation = "Ngay khi lịch trình cuộc họp ngày mai được ấn định, tôi sẽ liên hệ thông báo qua email cho toàn thể người tham dự."
    }
    "実" = @{
        sentence = "実際に現地へ足を運んで自分の目で見てみると、写真とは全く違う感動がありました。"
        reading = "じっさいにげんちへあしをはこんでじぶんのめでみてみると、しゃしんとはまったくちがうかんどうがありました。"
        translation = "Khi thực tế đích thân đặt chân đến tận nơi và nhìn tận mắt, tôi cảm nhận được sự xúc động hoàn toàn khác biệt so với khi xem ảnh."
    }
    "客" = @{
        sentence = "週末のショッピングモールは、大勢の買い物客で朝から晩まで賑わっていました。"
        reading = "しゅうまつのしょっぴんぐもーるは、おおぜいのかいものきゃくであさからばんまでにぎわっていました。"
        translation = "Trung tâm thương mại vào dịp cuối tuần luôn nhộn nhịp từ sáng đến tối với đông đảo lượng khách mua sắm."
    }
    "害" = @{
        sentence = "先日の大型台風による被害を調べるため、自治体の担当者が現場を調査しています。"
        reading = "せんじつのおおがたたいふうによるひがいをしらべるため、じちたいのたんとうしゃがげんばをちょうさしています。"
        translation = "Để kiểm tra thiệt hại do cơn bão lớn gây ra hôm trước, cán bộ chính quyền địa phương đang điều tra hiện trường."
    }
    "容" = @{
        sentence = "契約書にサインをする前に、書かれている内容を一言一句しっかりと確認してください。"
        reading = "けいやくしょにさいんをするまえに、かかれているないようをひとこといっくしっかりとかくにんしてください。"
        translation = "Trước khi ký vào bản hợp đồng, bạn hãy nhớ kiểm tra kỹ từng câu từng chữ trong nội dung được ghi nhé."
    }
    "宿" = @{
        sentence = "温泉街の古い旅館に一泊二日で宿泊し、日頃の疲れを癒やしました。"
        reading = "おんせんがいのふるいりょかんにいっぱくふつかでしゅくはくし、ひごろのつかれをいやしました。"
        translation = "Nghỉ lại 2 ngày 1 đêm tại một quán trọ cổ kính ở phố suối nước nóng, tôi đã xua tan đi bao mệt mỏi thường nhật."
    }
    "寄" = @{
        sentence = "被災地の人々を少しでも支援したいと思い、わずかですが募金箱に寄付をしました。"
        reading = "ひさいちのひとびとをすこしでもしえんしたいとおもい、わずかですがぼきんばこにきふをしました。"
        translation = "Mong muốn góp phần nhỏ hỗ trợ người dân vùng thiên tai, tôi đã quyên góp một chút vào hòm từ thiện."
    }
    "富" = @{
        sentence = "この島は手つかずの自然が豊富に残っており、珍しい動植物がたくさん生息しています。"
        reading = "このしまはてつかずのしぜんがほうふにのこっており、めずらしいどうしょくぶつがたくさんせいそくしています。"
        translation = "Hòn đảo này vẫn còn lưu giữ phong phú thiên nhiên hoang sơ, và là nơi sinh sống của rất nhiều loài động thực vật quý hiếm."
    }
    "寒" = @{
        sentence = "今朝は今シーズン一番の厳しい寒さとなり、道路の水たまりに氷が張っていました。"
        reading = "けさはこんしーずんいちばんのきびしいさむさとなり、どうろのみずたまりにこおりがはっていました。"
        translation = "Sáng nay tiết trời trở lạnh buốt kỷ lục của mùa này, trên các vũng nước ven đường đã đóng một lớp băng mỏng."
    }
    "寝" = @{
        sentence = "明日は朝早い飛行機に乗る予定なので、今夜は余計なことをせず早く寝ることにします。"
        reading = "あしたはあさはやいひこうきにのるよていなので、こんやはよけいなことをせずはやくねることにします。"
        translation = "Ngày mai tôi có chuyến bay sáng sớm nên tối nay tôi sẽ không làm việc linh tinh mà đi ngủ sớm."
    }
    "察" = @{
        sentence = "体調が何日も優れなかったので、近くの総合病院へ行って内科で診察を受けました。"
        reading = "たいちょうがなんにちもすぐれなかったので、ちかくのそうごうびょういんへいってないかでしんさつをうけました。"
        translation = "Mấy ngày liền cơ thể cảm thấy không khỏe nên tôi đã đến bệnh viện đa khoa gần nhà để bác sĩ khoa nội khám bệnh."
    }
    "対" = @{
        sentence = "異なる意見に対して頭ごなしに反対せず、まず相手の考えをよく聞くべきです。"
        reading = "ことなるいけんにたいしてあたまごなしにはんたいせず、まずあいてのかんがえをよくきくべきです。"
        translation = "Đối với những ý kiến bất đồng, chúng ta không nên phản đối ngay tức khắc mà trước tiên nên lắng nghe kỹ suy nghĩ của họ."
    }
}

Write-Host "Batch count: $($batchData.Count) Kanji (娘 .. 対)"

$jsonPath = "kanji_full_database.json"
$jsPath = "kanji_full_database.js"

$raw = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$tplRegex = 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

# 1. Validation trước khi ghi
foreach ($k in $batchData.Keys) {
    $info = $batchData[$k]
    if (-not $info.sentence.Contains($k)) {
        Write-Error "Lỗi: Kanji $k không có trong sentence: $($info.sentence)"
        exit 1
    }
    if ($info.sentence -match $tplRegex) {
        Write-Error "Lỗi: Kanji $k chứa template: $($info.sentence)"
        exit 1
    }
    if (-not $db.psobject.Properties[$k]) {
        Write-Error "Lỗi: Không tìm thấy $k trong DB"
        exit 1
    }
}

Write-Host "Validation TRƯỚC GHI: 100% PASS!" -ForegroundColor Green

# 2. Update DB
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
    $prop = $readDb.psobject.Properties[$k]
    if (-not $prop) {
        $postErrors += "Không đọc lại được $k từ file!"
        continue
    }
    $ex = $prop.Value.example
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

Write-Host "KIỂM TRA SAU GHI (READ-BACK): 100% PASS!" -ForegroundColor Green
Write-Host "Đã hoàn thành cập nhật $updatedCount Kanji N4 (娘 .. 対)!"
