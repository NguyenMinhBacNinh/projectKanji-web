[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$batchData = [ordered]@{
    "木" = @{
        sentence = "庭に大きな木があります。"
        reading = "にわにおおきなきがあります。"
        translation = "Trong vườn có một cái cây lớn."
    }
    "本" = @{
        sentence = "図書館で日本の本を借りました。"
        reading = "としょかんでにほんのほんをかりました。"
        translation = "Tôi đã mượn một cuốn sách Nhật ở thư viện."
    }
    "来" = @{
        sentence = "友達が私の家に遊びに来ました。"
        reading = "ともだちがわたしのいえにあそびにきました。"
        translation = "Bạn tôi đã đến nhà tôi chơi."
    }
    "東" = @{
        sentence = "太陽は東から昇ります。"
        reading = "たいようはひがしからのぼります。"
        translation = "Mặt trời mọc từ hướng đông."
    }
    "校" = @{
        sentence = "毎朝自転車で学校へ通っています。"
        reading = "まいあさじてんしゃでがっこうへかよっています。"
        translation = "Mỗi sáng tôi đều đạp xe đến trường."
    }
    "母" = @{
        sentence = "母が作ってくれた料理はとても美味しいです。"
        reading = "ははがつくってくれたりょうりはとてもおいしいです。"
        translation = "Món ăn mẹ nấu cho tôi rất ngon."
    }
    "毎" = @{
        sentence = "健康のために毎日ジョギングをしています。"
        reading = "けんこうのためにまいにちじょぎんぐをしています。"
        translation = "Để giữ gìn sức khỏe, mỗi ngày tôi đều chạy bộ."
    }
    "気" = @{
        sentence = "体に気をつけて元気に過ごしてください。"
        reading = "からだにきをつけてげんきにすごしてください。"
        translation = "Hãy giữ gìn sức khỏe và luôn sống vui khỏe nhé."
    }
    "水" = @{
        sentence = "朝起きてコップいっぱいの水を飲みます。"
        reading = "あさおきてこっぷいっぱいのみずをのみます。"
        translation = "Sáng thức dậy tôi uống một cốc nước đầy."
    }
    "火" = @{
        sentence = "火曜日は日本語のテストがあります。"
        reading = "かようびはにほんごのてすとがあります。"
        translation = "Thứ ba tôi có bài kiểm tra tiếng Nhật."
    }
    "父" = @{
        sentence = "父は毎朝仕事へ行く前に新聞を読みます。"
        reading = "ちちはまいあさしごとへいくまえにしんぶんをよみます。"
        translation = "Bố tôi mỗi sáng đều đọc báo trước khi đi làm."
    }
    "生" = @{
        sentence = "教室にたくさんの学生が集まっています。"
        reading = "きょうしつにたくさんのがくせいがあつまっています。"
        translation = "Trong lớp học có rất nhiều học sinh đang tập trung."
    }
    "男" = @{
        sentence = "あの男の子は元気に公園を走っています。"
        reading = "あのおとこのこはげんきにこうえんをはしっています。"
        translation = "Cậu bé kia đang chạy nhảy tung tăng trong công viên."
    }
    "白" = @{
        sentence = "妹は白いシャツを着ています。"
        reading = "いもうとはしろいしゃつをきています。"
        translation = "Em gái tôi đang mặc một chiếc áo sơ mi trắng."
    }
    "百" = @{
        sentence = "その店で百円のノートを買いました。"
        reading = "そのみせでひゃくえんののーとをかいました。"
        translation = "Tôi đã mua một cuốn vở giá một trăm yên ở cửa hàng đó."
    }
    "聞" = @{
        sentence = "電車の中でイヤホンでラジオを聞きます。"
        reading = "でんしゃのなかでいやほんでらじおをききます。"
        translation = "Trên tàu điện tôi đeo tai nghe để nghe radio."
    }
    "行" = @{
        sentence = "今年の夏休みに京都へ旅行に行きたいです。"
        reading = "ことしのなつやすみにきょうとへりょこうにいきたいです。"
        translation = "Kỳ nghỉ hè năm nay tôi muốn đi du lịch Kyoto."
    }
    "西" = @{
        sentence = "夕方になると西の空が赤くなります。"
        reading = "ゆうがたになるとにしのおそらがあかくなります。"
        translation = "Khi chiều tà buông xuống, bầu trời phía tây chuyển sang màu đỏ."
    }
    "見" = @{
        sentence = "週末に家族と一緒にテレビを見ました。"
        reading = "しゅうまつにかぞくといっしょにてれびをみました。"
        translation = "Cuối tuần tôi đã cùng gia đình xem tivi."
    }
    "話" = @{
        sentence = "困ったときは先生に日本語で相談して話します。"
        reading = "こまったときはせんせいににほんごでそうだんしてはなします。"
        translation = "Khi gặp khó khăn, tôi trao đổi và tâm sự với thầy giáo bằng tiếng Nhật."
    }
    "語" = @{
        sentence = "将来のために外国語をしっかり勉強しています。"
        reading = "しょうらいのためにがいこくごをしっかりべんきょうしています。"
        translation = "Tôi đang chăm chỉ học ngoại ngữ cho tương lai sau này."
    }
    "読" = @{
        sentence = "寝る前にベッドの中で小説を読みます。"
        reading = "ねるまえにべっどのなかでしょうせつをよみます。"
        translation = "Trước khi đi ngủ tôi đọc tiểu thuyết trên giường."
    }
    "车" = @{
        sentence = "车に乗って海へドライブに行きました。"
        reading = "くるまにのってうみへどらいぶにいきました。"
        translation = "Tôi đã lái xe hơi đi dạo mát ra bờ biển."
    }
    "金" = @{
        sentence = "金曜日の夜は友達とレストランで食事をします。"
        reading = "きんようびのよるはともだちとれすとらんでしょくじをします。"
        translation = "Tối thứ sáu tôi đi ăn ở nhà hàng cùng bạn bè."
    }
    "長" = @{
        sentence = "彼女の髪は長くてとても綺麗です。"
        reading = "かのじょのかみはながくてとてもきれいです。"
        translation = "Mái tóc của cô ấy dài và rất đẹp."
    }
    "間" = @{
        sentence = "約束の時間に遅れないように急ぎましょう。"
        reading = "やくそくのじかんにおくれないようにいそぎましょう。"
        translation = "Chúng ta hãy khẩn trương lên để không bị trễ giờ hẹn nhé."
    }
    "雨" = @{
        sentence = "今日は雨が降っているから傘を持って出かけます。"
        reading = "きょうはあめがふっているからかさをもってでかけます。"
        translation = "Hôm nay trời đang mưa nên tôi mang theo ô khi ra ngoài."
    }
    "電" = @{
        sentence = "部屋を出るときは部屋の電気を消してください。"
        reading = "へやをでるときはへやのでんきをけしてください。"
        translation = "Khi rời khỏi phòng, xin vui lòng tắt đèn điện trong phòng nhé."
    }
    "食" = @{
        sentence = "一日三食しっかりバランスよく食べることが大切です。"
        reading = "いちにちさんしょくしっかりばらんすよくたべることがたいせつです。"
        translation = "Ăn đủ ba bữa mỗi ngày cân đối dinh dưỡng là điều rất quan trọng."
    }
    "高" = @{
        sentence = "この店の商品は少し高いですが質が良いです。"
        reading = "このみせのしょうひんはすこしたかいですがしつがよいです。"
        translation = "Hàng hóa của cửa hàng này hơi đắt một chút nhưng chất lượng rất tốt."
    }
}

Write-Host "Batch count: $($batchData.Count) Kanji"

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

Write-Host "Validation passed 100%! Đang cập nhật database..." -ForegroundColor Green

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

Write-Host "`nĐã cập nhật thành công $updatedCount Kanji!"
