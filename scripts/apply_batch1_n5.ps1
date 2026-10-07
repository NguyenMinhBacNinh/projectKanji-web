[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$batchData = @{
    "一" = @{ sentence = "一人で学校へ行きます。"; reading = "ひとりでがっこうへいきます。"; translation = "Tôi đi đến trường một mình." }
    "七" = @{ sentence = "毎朝七時に起きます。"; reading = "まいあさしちじにおきます。"; translation = "Mỗi sáng tôi thức dậy lúc bảy giờ." }
    "万" = @{ sentence = "この靴は一万円でした。"; reading = "このくつはいちまんえんでした。"; translation = "Đôi giày này có giá một vạn yên (mười nghìn yên)." }
    "三" = @{ sentence = "りんごを三個買いました。"; reading = "りんごをさんこかいました。"; translation = "Tôi đã mua ba quả táo." }
    "上" = @{ sentence = "机の上に本があります。"; reading = "つくえのうえにほんがあります。"; translation = "Trên bàn có một cuốn sách." }
    "下" = @{ sentence = "木の下で少し休みましょう。"; reading = "きのしたですこしやすみましょう。"; translation = "Chúng ta hãy nghỉ một lát dưới gốc cây nhé." }
    "中" = @{ sentence = "かばんの中に財布が入っています。"; reading = "かばんのなかにさいふがはいっています。"; translation = "Trong cặp có chiếc ví tiền." }
    "九" = @{ sentence = "九月の日本は涼しいです。"; reading = "くがつのにほんはすずしいです。"; translation = "Nhật Bản vào tháng chín thời tiết mát mẻ." }
    "二" = @{ sentence = "二人で一緒に映画を見ました。"; reading = "ふたりでいっしょにえいがをみました。"; translation = "Hai người chúng tôi đã cùng nhau xem phim." }
    "五" = @{ sentence = "午後五時に仕事が終わります。"; reading = "ごごごじにしごとがおわります。"; translation = "Công việc kết thúc vào lúc năm giờ chiều." }
    "人" = @{ sentence = "あの人はとても優しいです。"; reading = "あのひとはとてもやさしいです。"; translation = "Người kia rất tốt bụng và hiền lành." }
    "今" = @{ sentence = "今から友達とご飯を食べます。"; reading = "いまからともだちとごはんをたべます。"; translation = "Bây giờ tôi đi ăn cơm cùng bạn bè." }
    "休" = @{ sentence = "今日は日曜日なので休みます。"; reading = "きょうはにちようびなのでやすみます。"; translation = "Hôm nay là chủ nhật nên tôi nghỉ ngơi." }
    "何" = @{ sentence = "朝ごはんに何を食べましたか。"; reading = "あさごはんなにをたべましたか。"; translation = "Buổi sáng bạn đã ăn món gì thế?" }
    "先" = @{ sentence = "お先に失礼します。"; reading = "おさきにしつれいします。"; translation = "Tôi xin phép về trước ạ." }
    "入" = @{ sentence = "部屋に入る前に靴を脱ぎます。"; reading = "へやにはいるまえにくつをぬぎます。"; translation = "Trước khi vào phòng tôi cởi giày ra." }
    "八" = @{ sentence = "八月はとても暑い季節です。"; reading = "はちがつはとてもあついきせつです。"; translation = "Tháng tám là mùa thời tiết rất nóng." }
    "六" = @{ sentence = "家族は六人います。"; reading = "かぞくはろくにんいます。"; translation = "Gia đình tôi có sáu người." }
    "円" = @{ sentence = "このペンは百円です。"; reading = "このぺんはひゃくえんです。"; translation = "Chiếc bút này có giá một trăm yên." }
    "出" = @{ sentence = "明日の朝八時に家を出ます。"; reading = "あしたのあさはちじにいえをでます。"; translation = "Tám giờ sáng mai tôi sẽ rời khỏi nhà." }
    "分" = @{ sentence = "あと十分で電車が来ます。"; reading = "あとじゅっぷんででんしゃがきます。"; translation = "Mười phút nữa tàu điện sẽ đến." }
    "前" = @{ sentence = "駅の前で友達を待ちます。"; reading = "えきのまえでともだちをまちます。"; translation = "Tôi đứng đợi bạn ở phía trước nhà ga." }
    "北" = @{ sentence = "日本の北には北海道があります。"; reading = "にほんのきたにはほっかいどうがあります。"; translation = "Ở phía bắc nước Nhật có vùng Hokkaido." }
    "十" = @{ sentence = "このクラスには十人の学生がいます。"; reading = "このくらすにはじゅうにんのがくせいがいます。"; translation = "Lớp học này có mười bạn học sinh." }
    "千" = @{ sentence = "財布に千円しかありません。"; reading = "さいふにせんえんしかありません。"; translation = "Trong ví tôi chỉ còn có một nghìn yên." }
    "午" = @{ sentence = "午前中は図書館で勉強します。"; reading = "ごぜんちゅうはとしょかんでべんきょうします。"; translation = "Suốt buổi sáng tôi học bài ở thư viện." }
    "半" = @{ sentence = "毎晩十時半に寝ます。"; reading = "まいばんじゅうじはんにねます。"; translation = "Mỗi tối tôi đi ngủ lúc mười giờ rưỡi." }
    "南" = @{ sentence = "私の部屋の窓は南に向いています。"; reading = "わたしのへやのまどはみなみにむいています。"; translation = "Cửa sổ phòng tôi quay về hướng nam." }
    "友" = @{ sentence = "休日に友達と買い物へ行きました。"; reading = "きゅうじつにともだちとかいものへいきました。"; translation = "Ngày nghỉ tôi đã đi mua sắm cùng bạn bè." }
    "右" = @{ sentence = "次の交差点を右に曲がってください。"; reading = "つぎのこうさてんをみぎにまがってください。"; translation = "Xin hãy rẽ phải ở ngã tư tiếp theo." }
    "名" = @{ sentence = "ここにお名前を書いてください。"; reading = "ここにおなまえをかいてください。"; translation = "Xin vui lòng viết tên của bạn vào đây." }
    "四" = @{ sentence = "テーブルの周りに椅子が四つあります。"; reading = "てーぶるのまわりにいすがよっつあります。"; translation = "Xung quanh bàn có bốn chiếc ghế." }
    "国" = @{ sentence = "来週自分の国へ帰ります。"; reading = "らいしゅうじぶんのくにへかえります。"; translation = "Tuần sau tôi sẽ trở về nước của mình." }
    "土" = @{ sentence = "土曜日の夜は家で休みます。"; reading = "どようびのよるはいえでやすみます。"; translation = "Tối thứ bảy tôi nghỉ ngơi ở nhà." }
    "外" = @{ sentence = "外は雨が降っています。"; reading = "そとはあめがふっています。"; translation = "Bên ngoài trời đang đổ mưa." }
    "大" = @{ sentence = "この公園には大きな木がたくさんあります。"; reading = "このこうえんにはおおきなきがたくさんあります。"; translation = "Trong công viên này có rất nhiều cây lớn." }
    "天" = @{ sentence = "今日は天気が良くて暖かいです。"; reading = "きょうはてんきがよくてあたたかいです。"; translation = "Hôm nay thời tiết đẹp và ấm áp." }
    "女" = @{ sentence = "あの女の子は歌が上手です。"; reading = "あのおんなのこはうたがじょうずです。"; translation = "Bé gái kia hát rất hay." }
    "子" = @{ sentence = "公園で子供たちが遊んでいます。"; reading = "こうえんでこどもたちがあそんでいます。"; translation = "Lũ trẻ đang vui chơi trong công viên." }
    "学" = @{ sentence = "大学で日本語を勉強しています。"; reading = "だいがくでにほんごをべんきょうしています。"; translation = "Tôi đang học tiếng Nhật ở trường đại học." }
    "小" = @{ sentence = "かわいい小さな犬を飼っています。"; reading = "かわいいちいさないぬをかっています。"; translation = "Tôi đang nuôi một chú cún nhỏ đáng yêu." }
    "山" = @{ sentence = "夏休みに友達と山へ行きました。"; reading = "なつやすみにともだちとやまへいきました。"; translation = "Kỳ nghỉ hè tôi đã cùng bạn bè đi leo núi." }
    "川" = @{ sentence = "この川の水はとても澄んでいます。"; reading = "このかわのみずはとてもすんでいます。"; translation = "Nước của con sông này rất trong lành." }
    "左" = @{ sentence = "郵便局は銀行の左側にあります。"; reading = "ゆうびんきょくはぎんこうのひだりがわにあります。"; translation = "Bưu điện nằm ở phía bên trái ngân hàng." }
    "年" = @{ sentence = "来年日本へ旅行に行きたいです。"; reading = "らいねんにほんへりょこうにいきたいです。"; translation = "Năm sau tôi muốn đi du lịch Nhật Bản." }
    "後" = @{ sentence = "ご飯を食べた後に散歩をします。"; reading = "ごはんをたべたあとにさんぽをします。"; translation = "Sau khi ăn cơm xong tôi đi dạo." }
    "日" = @{ sentence = "日曜日に部屋を掃除しました。"; reading = "にちようびにへやをそうじしました。"; translation = "Vào ngày chủ nhật tôi đã dọn dẹp phòng." }
    "時" = @{ sentence = "暇な時に好きな音楽を聞きます。"; reading = "ひまなときにすきなおんがくをききます。"; translation = "Khi rảnh rỗi tôi nghe bản nhạc yêu thích." }
    "書" = @{ sentence = "先生に日本語で手紙を書きました。"; reading = "せんせいににほんごでてがみをかきました。"; translation = "Tôi đã viết thư bằng tiếng Nhật gửi cho thầy cô." }
    "月" = @{ sentence = "月曜日の朝は道が混んでいます。"; reading = "げつようびのあさはみちがこんでいます。"; translation = "Sáng thứ hai đường phố rất đông đúc." }
}

Write-Host "Batch count: $($batchData.Count) Kanji"

# Load current DB
$jsonPath = "kanji_full_database.json"
$jsPath = "kanji_full_database.js"

$raw = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

# Validation checks
$errors = @()
$seenSentences = @{}
$successCount = 0

foreach ($k in $batchData.Keys) {
    $info = $batchData[$k]
    $sent = $info.sentence
    $trans = $info.translation
    
    # 1. Target Kanji must appear in sentence
    if (-not $sent.Contains($k)) {
        $errors += "LỖI: Kanji '$k' không xuất hiện trong câu: '$sent'"
    }
    
    # 2. Must have translation
    if ([string]::IsNullOrWhiteSpace($trans)) {
        $errors += "LỖI: Kanji '$k' thiếu bản dịch tiếng Việt!"
    }
    
    # 3. Check duplicate in current batch
    if ($seenSentences.ContainsKey($sent)) {
        $errors += "LỖI: Câu trùng lặp giữa '$k' và '$($seenSentences[$sent])': '$sent'"
    } else {
        $seenSentences[$sent] = $k
    }
    
    # Check DB entry exists
    if (-not $db.psobject.Properties[$k]) {
        $errors += "LỖI: Kanji '$k' không tồn tại trong database!"
    }
}

if ($errors.Count -gt 0) {
    Write-Host "PHÁT HIỆN LỖI KIỂM TRA:" -ForegroundColor Red
    foreach ($err in $errors) {
        Write-Host "  - $err" -ForegroundColor Red
    }
    exit 1
}

Write-Host "Tất cả 50 câu kiểm tra hợp lệ 100%! Đang cập nhật vào database..." -ForegroundColor Green

# Update only example field
foreach ($k in $batchData.Keys) {
    $val = $db.psobject.Properties[$k].Value
    $newEx = [PSCustomObject]@{
        sentence = $batchData[$k].sentence
        reading = $batchData[$k].reading
        translation = $batchData[$k].translation
    }
    $val.example = $newEx
    $successCount++
}

# Write to kanji_full_database.json
$outJson = $db | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($jsonPath, $outJson, [System.Text.Encoding]::UTF8)
Write-Host "Đã lưu thành công vào $jsonPath" -ForegroundColor Green

# Write to kanji_full_database.js
$jsContent = "window.KANJI_FULL_DATABASE = $outJson;"
[System.IO.File]::WriteAllText($jsPath, $jsContent, [System.Text.Encoding]::UTF8)
Write-Host "Đã lưu thành công vào $jsPath" -ForegroundColor Green

Write-Host "`n=== BÁO CÁO KẾT QUẢ BATCH 1 ==="
Write-Host "Số Kanji đã xử lý: $successCount"
Write-Host "Thành công: $successCount"
Write-Host "Thất bại: 0"
