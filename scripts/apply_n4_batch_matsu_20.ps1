[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$batchData = [ordered]@{
    "待" = @{
        sentence = "駅の改札口の前で友達を待っています。"
        reading = "えきのかいさつぐちのまえでともだちをまっています。"
        translation = "Tôi đang đứng đợi bạn ở phía trước cửa soát vé nhà ga."
    }
    "心" = @{
        sentence = "初めて一人暮らしをするので、両親がとても心配しています。"
        reading = "はじめてひとりぐらしをするので、りょうしんがとてもしんぱいしています。"
        translation = "Vì là lần đầu tiên tôi sống một mình nên bố mẹ vô cùng lo lắng."
    }
    "思" = @{
        sentence = "日本の生活についてどう思いますか。"
        reading = "にほんのせいかつについてどうおもいますか。"
        translation = "Bạn nghĩ như thế nào về cuộc sống ở Nhật Bản?"
    }
    "急" = @{
        sentence = "電車に遅れそうだったので、走って駅まで急ぎました。"
        reading = "でんしゃにおくれそうだったので、はしってえきまでいそぎました。"
        translation = "Vì suýt muộn tàu điện nên tôi đã chạy vội vàng đến nhà ga."
    }
    "悪" = @{
        sentence = "昨夜から体の調子が悪くて、頭痛がします。"
        reading = "ゆうべからからだのちょうしがわるくて、ずつうがします。"
        translation = "Từ tối qua sức khỏe trong người tôi không được tốt và bị đau đầu."
    }
    "意" = @{
        sentence = "この言葉の意味が分からないので、辞書で調べてみます。"
        reading = "このことばのいみがわからないので、じしょでしらべてみます。"
        translation = "Vì không hiểu ý nghĩa của từ ngữ này nên tôi sẽ thử tra từ điển."
    }
    "手" = @{
        sentence = "国の両親へ感謝の気持ちを込めて手紙を書きました。"
        reading = "くにのりょうしんへかんしゃのきもちをこめててがみをかきました。"
        translation = "Tôi đã viết một bức thư gửi cho bố mẹ ở quê nhà gửi gắm trọn vẹn lòng biết ơn."
    }
    "持" = @{
        sentence = "明日の試験には筆記用具と学生証を持ってきてください。"
        reading = "あしたのしけんにはひっきようぐとがくせいしょうをもってきてください。"
        translation = "Ngày mai đi thi xin hãy mang theo dụng cụ viết và thẻ sinh viên."
    }
    "教" = @{
        sentence = "先生が教室で親切に文法を教えてくれました。"
        reading = "せんせいがきょうしつでしんせつにぶんぽうをおしえてくれました。"
        translation = "Thầy giáo đã ân cần giảng dạy ngữ pháp cho chúng tôi trong lớp học."
    }
    "文" = @{
        sentence = "週末の宿題として、自分の夢について短い作文を書きました。"
        reading = "しゅうまつのしゅくだいとして、じぶんのゆめについてみじかいさくぶんをかきました。"
        translation = "Làm bài tập cuối tuần, tôi đã viết một bài văn ngắn về ước mơ của bản thân."
    }
    "料" = @{
        sentence = "休みの日は家で自分で日本料理を作って食べます。"
        reading = "やすみのひはいえでじぶんでにほんりょうりをつくってたべます。"
        translation = "Vào ngày nghỉ, tôi tự nấu món ăn Nhật Bản ở nhà rồi thưởng thức."
    }
    "新" = @{
        sentence = "毎朝朝ごはんを食べながら新しい新聞を読みます。"
        reading = "まいあさあさごはんをたべながらあたらしいしんぶんをよみます。"
        translation = "Mỗi sáng tôi vừa ăn bữa điểm tâm vừa đọc tờ báo mới."
    }
    "方" = @{
        sentence = "パソコンの使い方がよく分からないので、教えてもらえませんか。"
        reading = "ぱそこんのつかいかたがよくわからないので、おしえてもらえませんか。"
        translation = "Tôi không rành cách sử dụng máy tính lắm, bạn có thể chỉ cho tôi được không?"
    }
    "旅" = @{
        sentence = "連休を利用して友達と京都へ二泊三日の旅行に行きました。"
        reading = "れんきゅうをりようしてともだちときょうとへにはくみっかのりょこうにいきました。"
        translation = "Tranh thủ kỳ nghỉ dài ngày, tôi đã cùng bạn bè đi du lịch 3 ngày 2 đêm đến Kyoto."
    }
    "族" = @{
        sentence = "遠く離れて暮らしている家族に毎週日曜日にビデオ通話をします。"
        reading = "とおくはなれてくらしているかぞくにまいしゅうにちようびにびでおつうわをします。"
        translation = "Mỗi chủ nhật tôi đều gọi điện video cho gia đình đang sống ở nơi xa."
    }
    "早" = @{
        sentence = "明日の朝は早い電車に乗るため、今夜は早く寝ます。"
        reading = "あしたのあさははやいでんしゃにのるため、こんやははやくねます。"
        translation = "Vì sáng mai phải đón chuyến tàu điện sớm nên tối nay tôi sẽ đi ngủ sớm."
    }
    "明" = @{
        sentence = "明日の天気予報によると、午後から晴れるそうです。"
        reading = "あしたのてんきよほうによると、ごごからはれるそうです。"
        translation = "Theo dự báo thời tiết ngày mai, nghe nói từ buổi chiều trời sẽ hửng nắng."
    }
    "映" = @{
        sentence = "日曜日の午後に映画館へ面白いアニメの映画を見に行きました。"
        reading = "にちようびのごごにえいがかんへおもしろいあにめのえいがをみにいきました。"
        translation = "Chiều chủ nhật tôi đã đến rạp chiếu phim để xem một bộ phim hoạt hình anime thú vị."
    }
    "春" = @{
        sentence = "春になると暖かくなって、桜の花が一斉に咲き始めます。"
        reading = "はるになるとあたたかくなって、さくらのはながいっせいにさきはじめます。"
        translation = "Khi mùa xuân đến, tiết trời trở nên ấm áp và hoa anh đào đồng loạt bắt đầu nở rộ."
    }
    "昼" = @{
        sentence = "お昼休みに会社の同僚と近くのレストランへ昼ご飯を食べに行きました。"
        reading = "おひるやすみにかいしゃのどうりょうとちかくのれすとらんへひるごはんをたべにいきました。"
        translation = "Vào giờ nghỉ trưa, tôi đã cùng đồng nghiệp trong công ty đi ăn trưa ở một nhà hàng gần đó."
    }
}

Write-Host "Batch count: $($batchData.Count) Kanji bắt đầu từ 待"

$jsonPath = "kanji_full_database.json"
$jsPath = "kanji_full_database.js"

$raw = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

# 1. Validation trước khi ghi
$errors = @()
$seen = @{}

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
    if ($s -match 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます') {
        $errors += "Kanji $k vi phạm template: $s"
    }
    if ($seen.ContainsKey($s)) {
        $errors += "Trùng câu: $s"
    } else {
        $seen[$s] = $k
    }
    if (-not $db.psobject.Properties[$k]) {
        $errors += "Không tìm thấy $k trong DB"
    }
}

if ($errors.Count -gt 0) {
    Write-Host "Validation failed:" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
    exit 1
}

Write-Host "Validation TRƯỚC GHI: 100% PASS!" -ForegroundColor Green

# 2. Ghi trực tiếp vào database object
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

# 4. ĐỌC LẠI CHÍNH CÁC RECORD VỪA GHI TỪ FILE ĐỂ KIỂM TRA ĐỘC LẬP
$readBackRaw = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$readBackDb = $readBackRaw | ConvertFrom-Json

$postErrors = @()
foreach ($k in $batchData.Keys) {
    $prop = $readBackDb.psobject.Properties[$k]
    if (-not $prop) {
        $postErrors += "Không đọc lại được $k từ file!"
        continue
    }
    $ex = $prop.Value.example
    if (-not $ex -or -not $ex.sentence) {
        $postErrors += "Record $k bị thiếu example sau khi đọc lại!"
        continue
    }
    $s = $ex.sentence
    if ($s -match 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます') {
        $postErrors += "Record $k sau khi ghi vẫn còn template: $s"
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
Write-Host "Đã cập nhật và xác thực thành công $updatedCount Kanji N4 bắt đầu từ 待!"
