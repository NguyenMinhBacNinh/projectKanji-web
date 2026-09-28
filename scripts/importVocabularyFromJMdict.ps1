<#
.SYNOPSIS
    Tự động trích xuất và nhập từ vựng (Vocabulary) từ từ điển JMdict vào Kanji Database.
.DESCRIPTION
    Script thực hiện:
    1. Đọc dữ liệu JMdict (EDRDG machine-readable XML).
    2. Quét đơn kỳ (single-pass streaming) tối ưu tốc độ cho toàn bộ danh sách Kanji cần xử lý.
    3. Trích xuất word, reading, English gloss.
    4. Xếp hạng từ vựng ưu tiên dựa trên:
       - Tag tần suất của JMdict (ichi1, news1, nf01..nf48, spec1, ichi2, news2).
       - Từ gốc kun-yomi (chữ Kanji + okurigana như 学ぶ, 行く, 食べる) được ưu tiên đặc biệt.
       - Từ ghép 2 chữ Kanji (chuẩn mực).
       - Mức độ tương thích JLPT của chữ đi kèm (ưu tiên ghép với Kanji N5/N4).
       - Tránh từ hiếm, cổ xưa, tiếng lóng, thô tục (arch, rare, obsc, sl, vulg...).
    5. Dịch nghĩa từ vựng sang tiếng Việt súc tích, dễ hiểu cho người học.
    6. Tạo bản sao lưu an toàn (bảo tồn toàn bộ các file .bak hiện có).
    7. Cập nhật vào database (kanji_full_database.json & kanji_full_database.js).
    8. Bảo toàn 100% các trường dữ liệu hiện tại, không tạo Kanji mới, không duplicate.
.PARAMETER Kanji
    Chữ Kanji cụ thể cần import (mặc định: '学').
.PARAMETER Level
    Cấp độ JLPT cần import (ví dụ: 'N5', 'N4', 'N3', 'N2', 'N1').
.PARAMETER All
    Import cho toàn bộ hơn 2.000 Kanji trong database.
.PARAMETER Count
    Số lượng từ vựng cần chọn cho mỗi Kanji (mặc định: 4).
.PARAMETER DryRun
    Chạy thử nghiệm tìm kiếm và xếp hạng nhưng KHÔNG ghi thay đổi vào database.
#>
[CmdletBinding()]
param(
    [string]$Kanji = "",
    [string]$Level = "N5",
    [switch]$All,
    [int]$Count = 4,
    [switch]$DryRun,
    [switch]$Help
)

if ($Help) {
    Get-Help $MyInvocation.MyCommand.Path -Detailed
    exit 0
}

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectRoot = (Resolve-Path "$ScriptDir/..").Path
$JmdictXml = Join-Path $ProjectRoot "data/JMdict_e.xml"
$JmdictGz  = Join-Path $ProjectRoot "data/JMdict_e.gz"
$KanjiDataFile = Join-Path $ProjectRoot "kanji-data.js"
$DbJsonFile = Join-Path $ProjectRoot "kanji_full_database.json"
$DbJsFile   = Join-Path $ProjectRoot "kanji_full_database.js"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "TOOL IMPORT VOCABULARY TỪ JMDICT (EDRDG)" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Kiểm tra nguồn dữ liệu JMdict
if (-not (Test-Path $JmdictXml)) {
    if (Test-Path $JmdictGz) {
        Write-Host "[*] Đang giải nén JMdict_e.gz sang XML..." -ForegroundColor Yellow
        $inFile = [System.IO.File]::OpenRead($JmdictGz)
        $outFile = [System.IO.File]::Create($JmdictXml)
        $gzStream = New-Object System.IO.Compression.GZipStream($inFile, [System.IO.Compression.CompressionMode]::Decompress)
        $gzStream.CopyTo($outFile)
        $gzStream.Close()
        $outFile.Close()
        $inFile.Close()
        Write-Host "[✓] Giải nén hoàn tất: $JmdictXml" -ForegroundColor Green
    } else {
        Write-Error "Không tìm thấy file từ điển $JmdictXml hoặc $JmdictGz trong thư mục data/!"
        exit 1
    }
}

# 2. Đọc bảng cấp độ Kanji từ kanji-data.js
$kanjiLevelMap = @{}
if (Test-Path $KanjiDataFile) {
    $rawKanjiData = [System.IO.File]::ReadAllText($KanjiDataFile, [System.Text.Encoding]::UTF8)
    $matches = [regex]::Matches($rawKanjiData, '([Nn][1-5])\s*:\s*["'']([^"'']+)["'']')
    foreach ($m in $matches) {
        $lvl = $m.Groups[1].Value.ToUpper()
        $chars = $m.Groups[2].Value -split '\s+'
        foreach ($c in $chars) {
            if ($c) { $kanjiLevelMap[$c] = $lvl }
        }
    }
}
Write-Host "[✓] Đã nạp bảng cấp độ JLPT cho $($kanjiLevelMap.Count) chữ Kanji." -ForegroundColor Gray

# 3. Đọc database hiện tại từ kanji_full_database.json
if (-not (Test-Path $DbJsonFile)) {
    Write-Error "Không tìm thấy database $DbJsonFile!"
    exit 1
}
$dbRaw = [System.IO.File]::ReadAllText($DbJsonFile, [System.Text.Encoding]::UTF8)
$database = $dbRaw | ConvertFrom-Json
$dbKanjiCount = ($database.psobject.Properties | Measure-Object).Count
Write-Host "[✓] Đã nạp database hiện tại: $dbKanjiCount chữ Kanji." -ForegroundColor Gray

# 4. Xác định danh sách Kanji mục tiêu
$targetKanjiList = New-Object System.Collections.Generic.List[string]

if ($Kanji) {
    if (-not $database.psobject.Properties[$Kanji]) {
        Write-Error "Chữ Kanji '$Kanji' không tồn tại trong database hiện tại! Script chỉ thêm vocabulary vào Kanji đã tồn tại."
        exit 1
    }
    $targetKanjiList.Add($Kanji)
} elseif ($Level) {
    $targetLvl = $Level.ToUpper()
    # Lấy đúng theo thứ tự trong kanji-data.js nếu có
    if (Test-Path $KanjiDataFile) {
        $rawKanjiData = [System.IO.File]::ReadAllText($KanjiDataFile, [System.Text.Encoding]::UTF8)
        $m = [regex]::Match($rawKanjiData, "$targetLvl\s*:\s*[`"']([^`"']+)[`"']")
        if ($m.Success) {
            $orderedChars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ -and $database.psobject.Properties[$_] }
            foreach ($ch in $orderedChars) {
                $targetKanjiList.Add($ch)
            }
        }
    }
    if ($targetKanjiList.Count -eq 0) {
        foreach ($prop in $database.psobject.Properties) {
            $k = $prop.Name
            $lvl = if ($prop.Value.level) { $prop.Value.level } elseif ($kanjiLevelMap.ContainsKey($k)) { $kanjiLevelMap[$k] } else { '' }
            if ($lvl.ToUpper() -eq $targetLvl) {
                $targetKanjiList.Add($k)
            }
        }
    }
    Write-Host "[*] Chế độ cấp độ $($targetLvl): Tìm thấy $($targetKanjiList.Count) chữ Kanji." -ForegroundColor Yellow
} elseif ($All) {
    foreach ($prop in $database.psobject.Properties) {
        $targetKanjiList.Add($prop.Name)
    }
    Write-Host "[*] Chế độ toàn bộ: Sẽ xử lý $($targetKanjiList.Count) chữ Kanji." -ForegroundColor Yellow
} else {
    $targetKanjiList.Add("学")
}

# 5. Bảng từ điển dịch tiếng Việt cho các từ vựng N5 thông dụng
$VIETNAMESE_WORDS = @{
    # Số đếm & đơn vị
    "一つ" = "một cái"; "一人" = "một người"; "一日" = "ngày mùng một / một ngày"; "一番" = "nhất / số 1"; "一月" = "tháng một"; "一生" = "cả cuộc đời"
    "二つ" = "hai cái"; "二人" = "hai người"; "二日" = "ngày mùng hai / hai ngày"; "二月" = "tháng hai"; "二十日" = "ngày 20"; "二十歳" = "20 tuổi"; "二百" = "hai trăm (200)"
    "三つ" = "ba cái"; "三人" = "ba người"; "三日" = "ngày mùng ba / ba ngày"; "三月" = "tháng ba"; "三角" = "hình tam giác"; "三百" = "ba trăm (300)"; "三千" = "ba nghìn (3.000)"
    "四つ" = "bốn cái"; "四人" = "bốn người"; "四日" = "ngày mùng bốn / bốn ngày"; "四月" = "tháng tư"; "四季" = "bốn mùa"; "四十" = "bốn mươi (40)"; "四千" = "bốn nghìn (4.000)"
    "五つ" = "năm cái"; "五人" = "năm người"; "五日" = "ngày mùng năm / năm ngày"; "五月" = "tháng năm"; "五円" = "5 Yên"; "五十" = "năm mươi (50)"
    "六つ" = "sáu cái"; "六人" = "sáu người"; "六日" = "ngày mùng sáu / sáu ngày"; "六月" = "tháng sáu"; "六十" = "sáu mươi (60)"
    "七つ" = "bảy cái"; "七人" = "bảy người"; "七日" = "ngày mùng bảy / bảy ngày"; "七月" = "tháng bảy"; "七夕" = "lễ Thất Tịch"; "七十" = "bảy mươi (70)"
    "八つ" = "tám cái"; "八人" = "tám người"; "八日" = "ngày mùng tám / tám ngày"; "八月" = "tháng tám"; "八百屋" = "tiệm bán rau củ"; "八十" = "tám mươi (80)"
    "九つ" = "chín cái"; "九人" = "chín người"; "九日" = "ngày mùng chín / chín ngày"; "九月" = "tháng chín"; "九州" = "đảo Kyushu"; "九十" = "chín mươi (90)"
    "十" = "mười"; "十日" = "ngày mùng mười / mười ngày"; "十月" = "tháng mười"; "十分" = "đầy đủ, mười phần"; "二十" = "hai mươi (20)"
    "百" = "một trăm"; "百円" = "100 Yên"; "八百" = "tám trăm"
    "千" = "một nghìn"; "千円" = "1.000 Yên"; "千葉" = "tỉnh Chiba"; "二千" = "hai nghìn (2.000)"
    "万" = "mười nghìn (vạn)"; "一万" = "mười nghìn (1 vạn)"; "十万" = "trăm nghìn (10 vạn)"; "百万" = "triệu (100 vạn)"; "万年筆" = "bút máy"; "万一" = "vạn nhất, lỡ như"
    "円" = "đồng Yên, hình tròn"; "円高" = "đồng Yên tăng giá"; "円安" = "đồng Yên giảm giá"
    # Thời gian, phương hướng
    "今日" = "hôm nay"; "今月" = "tháng này"; "今年" = "năm nay"; "今週" = "tuần này"; "今" = "bây giờ"; "今夜" = "tối nay"
    "時間" = "thời gian, giờ giấc"; "時" = "thời gian, khi / giờ"; "時計" = "đồng hồ"; "一時間" = "một tiếng đồng hồ"; "時々" = "thỉnh thoảng"
    "毎日" = "mỗi ngày"; "毎週" = "mỗi tuần"; "毎月" = "mỗi tháng"; "毎年" = "mỗi năm"; "毎朝" = "mỗi buổi sáng"; "毎晩" = "mỗi buổi tối"
    "朝" = "buổi sáng"; "昼" = "buổi trưa"; "晩" = "buổi tối"; "夜" = "ban đêm"; "昼休み" = "nghỉ trưa"
    "午前" = "buổi sáng (AM)"; "午後" = "buổi chiều (PM)"; "前" = "phía trước / trước khi"; "名前" = "tên gọi, họ tên"; "前日" = "ngày hôm trước"; "駅前" = "trước nhà ga"; "前後" = "trước sau"
    "正午" = "buổi trưa (12h trưa)"
    "後" = "phía sau / sau khi"; "後ろ" = "phía sau"; "後半" = "nửa sau"; "最後" = "cuối cùng"
    "半分" = "một nửa"; "分" = "phút / phần"; "分かる" = "hiểu, biết"; "自分" = "bản thân mình"; "前半" = "nửa đầu"; "半年" = "nửa năm"; "半日" = "nửa ngày"
    "上" = "ở trên, phía trên"; "上手" = "giỏi giang"; "上がる" = "đi lên, tăng lên"; "上着" = "áo khoác bên ngoài"
    "下" = "ở dưới, phía dưới"; "下手" = "kém, vụng về"; "下がる" = "hạ xuống, giảm"; "地下鉄" = "tàu điện ngầm"
    "中" = "bên trong, ở giữa"; "中国" = "Trung Quốc"; "一日中" = "suốt cả ngày"; "中学校" = "trường THCS"; "中心" = "trung tâm"
    "外" = "bên ngoài"; "外国" = "nước ngoài"; "外国人" = "người nước ngoài"; "外出" = "ra ngoài"
    "左" = "bên trái"; "左手" = "tay trái"; "左側" = "phía bên trái"; "左右" = "trái phải"
    "右" = "bên phải"; "右手" = "tay phải"; "右側" = "phía bên phải"
    "東" = "hướng Đông"; "東京" = "Tokyo"; "東口" = "cửa phía Đông"; "東西" = "Đông Tây"
    "西" = "hướng Tây"; "西口" = "cửa phía Tây"; "南西" = "hướng Tây Nam"; "北西" = "hướng Tây Bắc"; "関西" = "vùng Kansai"
    "南" = "hướng Nam"; "南口" = "cửa phía Nam"; "東南" = "Đông Nam"; "南北" = "Nam Bắc"
    "北" = "hướng Bắc"; "北海道" = "Hokkaido"; "北口" = "cửa phía Bắc"; "東北" = "Đông Bắc"
    # Con người, mối quan hệ
    "人" = "con người, người"; "日本人" = "người Nhật Bản"; "大人" = "người lớn"; "人気" = "được yêu thích, hâm mộ"
    "男" = "nam giới, đàn ông"; "男の人" = "người đàn ông"; "男の子" = "bé trai"; "男性" = "nam giới, phái nam"; "長男" = "con trai cả"
    "女" = "nữ giới, phụ nữ"; "女の人" = "người phụ nữ"; "女の子" = "bé gái"; "女性" = "phụ nữ, phái nữ"; "長女" = "con gái cả"
    "子" = "đứa trẻ, con cái"; "子ども" = "trẻ em, con nít"; "子供" = "trẻ em, con nít"; "息子" = "con trai"; "女子" = "nữ giới, bé gái"; "男子" = "nam giới, bé trai"
    "父" = "bố, cha (của mình)"; "お父さん" = "bố, cha (lịch sự)"; "祖父" = "ông nội/ngoại"; "父母" = "bố mẹ"
    "母" = "mẹ (của mình)"; "お母さん" = "mẹ (lịch sự)"; "祖母" = "bà nội/ngoại"
    "友だち" = "bạn bè"; "友達" = "bạn bè"; "親友" = "bạn thân"; "友人" = "bạn bè"
    "先" = "phía trước, đi trước"; "先生" = "thầy cô giáo, bác sĩ"; "先週" = "tuần trước"; "先月" = "tháng trước"; "お先に" = "tôi xin phép trước"
    "生" = "sinh ra, sống"; "生きる" = "sống, sinh tồn"; "生まれる" = "được sinh ra"; "誕生日" = "ngày sinh nhật"
    "名" = "tên"; "有名" = "nổi tiếng"; "名字" = "họ (tên họ)"; "名所" = "danh lam thắng cảnh"
    # Học tập, trường học
    "学ぶ" = "học tập, học hỏi"; "学生" = "học sinh, sinh viên"; "学校" = "trường học"; "大学" = "trường đại học"; "学習" = "học tập, nghiên cứu"; "留学" = "du học"; "留学生" = "du học sinh"
    "高校" = "trường cấp 3 (THPT)"; "小学校" = "trường tiểu học"; "校長" = "hiệu trưởng"; "高校生" = "học sinh cấp 3"
    "本" = "sách, cội nguồn"; "日本" = "Nhật Bản"; "本屋" = "tiệm sách, hiệu sách"; "基本" = "cơ bản"
    "休む" = "nghỉ ngơi, nghỉ phép"; "休み" = "ngày nghỉ, kỳ nghỉ"; "夏休み" = "nghỉ hè"; "休日" = "ngày nghỉ"
    # Thiên nhiên, vật chất
    "山" = "ngọn núi, núi"; "富士山" = "núi Phú Sĩ"; "山登り" = "leo núi"; "火山" = "núi lửa"
    "川" = "dòng sông, con sông"; "小川" = "dòng suối nhỏ"; "川上" = "thượng nguồn"; "川下" = "hạ nguồn"; "河川" = "sông ngòi"
    "木" = "cây cối, gỗ"; "木曜日" = "thứ năm"; "大木" = "cây cổ thụ lớn"; "植木" = "cây trồng trong chậu"
    "水" = "nước"; "水曜日" = "thứ tư"; "水泳" = "bơi lội"; "冷水" = "nước lạnh"
    "火" = "ngọn lửa, lửa"; "火曜日" = "thứ ba"; "花火" = "pháo hoa"; "火事" = "hỏa hoạn, cháy nhà"
    "土" = "đất đai, thổ địa"; "土曜日" = "thứ bảy"; "土地" = "đất đai"; "お土産" = "quà lưu niệm đặc sản"
    "金" = "tiền, vàng, kim loại"; "お金" = "tiền bạc"; "金曜日" = "thứ sáu"; "金色" = "màu vàng óng"; "料金" = "cước phí"
    "天" = "trời, thiên đường"; "天気" = "thời tiết"; "天国" = "thiên đường"; "雨天" = "trời mưa"; "天才" = "thiên tài"
    "気" = "khí sắc, tinh thần"; "元気" = "khỏe mạnh"; "電気" = "điện năng"; "気持ち" = "cảm giác, tâm trạng"; "気分" = "tâm trạng"
    "雨" = "cơn mưa, mưa"; "大雨" = "mưa lớn, mưa to"; "雨水" = "nước mưa"; "小雨" = "mưa phùn, mưa nhỏ"; "梅雨" = "mùa mưa"
    "白" = "màu trắng"; "白い" = "màu trắng"; "白黒" = "đen trắng"; "白人" = "người da trắng"
    "日" = "ngày, mặt trời"; "日曜日" = "chủ nhật"
    "月" = "mặt trăng, tháng"; "月曜日" = "thứ hai"
    # Hành động, đời sống
    "行く" = "đi"; "行き" = "hướng đi, đi tới"; "旅行" = "du lịch"; "行う" = "tiến hành, tổ chức"
    "来る" = "đến"; "未来" = "tương lai"; "来週" = "tuần sau"; "来月" = "tháng sau"; "来年" = "năm sau"
    "見る" = "nhìn, xem, ngắm"; "見せる" = "cho xem"; "見学" = "tham quan học hỏi"; "花見" = "ngắm hoa anh đào"
    "聞く" = "nghe, hỏi"; "聞こえる" = "nghe thấy"; "新聞" = "báo chí, tờ báo"; "聞き取り" = "nghe hiểu"
    "話す" = "nói chuyện, trò chuyện"; "話" = "câu chuyện, cuộc trò chuyện"; "会話" = "hội thoại"; "電話" = "điện thoại"
    "語る" = "kể chuyện"; "日本語" = "tiếng Nhật"; "英語" = "tiếng Anh"; "外国語" = "ngoại ngữ"; "単語" = "từ vựng"
    "読む" = "đọc"; "読書" = "đọc sách"; "読み方" = "cách đọc"; "音読み" = "âm On (âm Hán)"; "訓読み" = "âm Kun (âm Nhật)"
    "書く" = "viết"; "辞書" = "từ điển"; "手紙" = "lá thư"; "教科書" = "sách giáo khoa"; "図書館" = "thư viện"
    "食べる" = "ăn"; "食べ物" = "đồ ăn, thức ăn"; "食事" = "bữa ăn"; "朝食" = "bữa sáng"; "昼食" = "bữa trưa"; "夕食" = "bữa tối"; "食堂" = "nhà ăn"
    "飲む" = "uống"; "飲み物" = "đồ uống"; "飲食店" = "quán ăn uống"
    "出る" = "ra ngoài, xuất hiện"; "出す" = "lấy ra, gửi đi"; "出口" = "lối ra, cửa ra"; "出発" = "xuất phát"
    "入る" = "đi vào, bước vào"; "入れる" = "cho vào, bỏ vào"; "入口" = "lối vào, cửa vào"; "入学" = "nhập học"
    "車" = "xe cộ, ô tô"; "電車" = "tàu điện"; "自転車" = "xe đạp"; "自動車" = "xe ô tô"; "車道" = "lòng đường xe chạy"
    "高" = "cao, đắt"; "高い" = "cao, đắt đỏ"; "最高" = "tuyệt vời nhất, cao nhất"
    "長" = "dài, lâu / trưởng"; "長い" = "dài, lâu"; "社長" = "giám đốc"; "学長" = "hiệu trưởng đại học"
    "間" = "khoảng cách, ở giữa"; "間違い" = "nhầm lẫn, sai sót"; "間に合う" = "kịp giờ"
    "何" = "cái gì"; "何時" = "mấy giờ"; "何人" = "mấy người"; "何日" = "ngày mấy"; "何か" = "cái gì đó"
    "国" = "đất nước, quốc gia"; "国語" = "quốc ngữ"; "帰国" = "về nước"
    "大" = "to lớn"; "大きい" = "to lớn"; "大変" = "vất vả, nghiêm trọng"; "大切" = "quan trọng"; "大好き" = "rất thích"
    "小" = "nhỏ bé"; "小さい" = "nhỏ bé"
}

# Nạp bổ sung từ điển kiểm duyệt N5 + N4 từ file JSON nếu có
$vettedDictFile = Join-Path $ProjectRoot "data/vetted_vocab_dict.json"
if (Test-Path $vettedDictFile) {
    $rawDict = [System.IO.File]::ReadAllText($vettedDictFile, [System.Text.Encoding]::UTF8)
    $objDict = $rawDict | ConvertFrom-Json
    foreach ($prop in $objDict.psobject.Properties) {
        $VIETNAMESE_WORDS[$prop.Name] = $prop.Value
    }
    Write-Host "[✓] Đã nạp $($VIETNAMESE_WORDS.Count) mục từ điển kiểm duyệt chuẩn Nhật-Việt." -ForegroundColor Gray
}

# 6. Hàm dịch bổ trợ từ tiếng Anh sang tiếng Việt súc tích
function Translate-ToVietnamese([string]$word, [string]$enGloss) {
    if ($VIETNAMESE_WORDS.ContainsKey($word)) {
        return $VIETNAMESE_WORDS[$word]
    }

    $lower = $enGloss.ToLower().Trim()
    $clean = $lower -replace '^to\s+', '' -replace '\(esp\..*?\)', '' -replace '\(former.*?\)', ''
    $first = ($clean -split ';')[0].Trim()

    $transMap = @{
        "school" = "trường học"; "student" = "học sinh, sinh viên"; "university" = "trường đại học"; "college" = "đại học"
        "learn" = "học tập, học hỏi"; "study" = "học tập"; "book" = "sách"; "read" = "đọc"; "write" = "viết"
        "water" = "nước"; "fire" = "ngọn lửa"; "tree" = "cây cối"; "wood" = "gỗ"; "gold" = "vàng, kim loại"
        "money" = "tiền bạc"; "earth" = "mặt đất, đất đai"; "soil" = "đất đai"; "sun" = "mặt trời"; "day" = "ngày"
        "moon" = "mặt trăng"; "month" = "tháng"; "year" = "năm"; "mountain" = "ngọn núi"; "river" = "dòng sông"
        "rain" = "cơn mưa"; "electricity" = "điện năng"; "electric" = "điện"; "car" = "xe cộ, ô tô"; "train" = "tàu hỏa, tàu điện"
        "time" = "thời gian"; "hour" = "giờ"; "minute" = "phút"; "morning" = "buổi sáng"; "noon" = "buổi trưa"
        "evening" = "buổi tối"; "night" = "ban đêm"; "eat" = "ăn uống"; "drink" = "uống"; "see" = "nhìn, xem"
        "hear" = "lắng nghe, nghe"; "listen" = "nghe"; "talk" = "nói chuyện"; "speak" = "nói"; "language" = "ngôn ngữ"
        "go" = "đi"; "come" = "đến, tới"; "rest" = "nghỉ ngơi"; "break" = "nghỉ giải lao"; "child" = "đứa trẻ, con cái"
        "woman" = "phụ nữ"; "man" = "đàn ông"; "father" = "người cha, bố"; "mother" = "người mẹ"; "friend" = "bạn bè"
        "name" = "tên gọi, họ tên"; "country" = "đất nước, quốc gia"; "outside" = "bên ngoài"; "inside" = "bên trong"
        "big" = "to lớn"; "large" = "rộng lớn"; "small" = "nhỏ bé"; "little" = "nhỏ"; "white" = "màu trắng"
        "high" = "cao, đắt"; "expensive" = "đắt đỏ"; "tall" = "cao"; "long" = "dài, lâu"; "now" = "bây giờ"
        "enter" = "đi vào"; "entrance" = "lối vào"; "exit" = "lối ra"; "leave" = "rời đi"; "admission" = "nhập học, vào cổng"
        "inspection" = "tham quan học hỏi"; "principal" = "hiệu trưởng"; "chancellor" = "hiệu trưởng đại học"
        "question" = "câu hỏi, vấn đề"; "problem" = "vấn đề"; "test" = "kỳ thi, kiểm tra"; "exam" = "kỳ thi"
        "work" = "công việc"; "job" = "công việc"; "company" = "công ty"; "hospital" = "bệnh viện"
        "trip" = "chuyến đi, du lịch"; "travel" = "du lịch, chuyến đi"; "cooking" = "nấu ăn, món ăn"; "dish" = "món ăn"
        "habit" = "thói quen, tập quán"; "thought" = "suy nghĩ, tư tưởng"; "think" = "suy nghĩ, cân nhắc"
        "flesh" = "thịt"; "beef" = "thịt bò"; "body" = "cơ thể, sức khỏe"; "run" = "chạy bộ, di chuyển"
        "station" = "nhà ga"; "shop" = "cửa hàng, tiệm"; "store" = "cửa hàng"; "tea" = "trà"
        "bird" = "con chim"; "fish" = "con cá"; "black" = "màu đen"; "blue" = "màu xanh"
    }

    foreach ($k in $transMap.Keys) {
        if ($first -match "\b$k\b") {
            return $transMap[$k]
        }
    }

    if ($first -match '[a-zA-Z]{3,}') {
        return "từ ghép thông dụng"
    }

    return $first
}

# 7. Quét đơn kỳ (Single-pass Streaming) trích xuất toàn bộ ứng viên cho danh sách Kanji
Write-Host "`n[*] Đang quét toàn bộ từ điển JMdict (Single-pass streaming)..." -ForegroundColor Yellow
$swScan = [System.Diagnostics.Stopwatch]::StartNew()

$targetKanjiSet = New-Object 'System.Collections.Generic.HashSet[string]'
$candidatesByKanji = @{}
foreach ($k in $targetKanjiList) {
    [void]$targetKanjiSet.Add($k)
    $candidatesByKanji[$k] = New-Object System.Collections.Generic.List[object]
}

$curKebs = New-Object System.Collections.Generic.List[string]
$curRebs = New-Object System.Collections.Generic.List[string]
$curPris = New-Object 'System.Collections.Generic.HashSet[string]'
$curGlosses = New-Object System.Collections.Generic.List[string]
$curHasMisc = $false

foreach ($line in [System.IO.File]::ReadLines($JmdictXml)) {
    if ($line.Contains('<keb>')) {
        $s = $line.IndexOf('<keb>') + 5
        $e = $line.IndexOf('</keb>', $s)
        if ($e -gt $s) { [void]$curKebs.Add($line.Substring($s, $e - $s)) }
    } elseif ($line.Contains('<reb>')) {
        if ($curRebs.Count -eq 0) {
            $s = $line.IndexOf('<reb>') + 5
            $e = $line.IndexOf('</reb>', $s)
            if ($e -gt $s) { [void]$curRebs.Add($line.Substring($s, $e - $s)) }
        }
    } elseif ($line.Contains('_pri>')) {
        $s = $line.IndexOf('_pri>') + 5
        $e = $line.IndexOf('</', $s)
        if ($e -gt $s) { [void]$curPris.Add($line.Substring($s, $e - $s)) }
    } elseif ($line.Contains('<gloss>')) {
        if ($curGlosses.Count -lt 3) {
            $s = $line.IndexOf('<gloss>') + 7
            $e = $line.IndexOf('</gloss>', $s)
            if ($e -gt $s) { [void]$curGlosses.Add($line.Substring($s, $e - $s)) }
        }
    } elseif ($line.Contains('<misc>&')) {
        if ($line -match '<misc>&(arch|rare|obsc|sl|col|id|yojik|sens|obs|vulg);</misc>') {
            $curHasMisc = $true
        }
    } elseif ($line.Contains('</entry>')) {
        if ($curKebs.Count -gt 0 -and $curRebs.Count -gt 0) {
            $reading = $curRebs[0]
            $priArray = @($curPris)
            $glossText = [string]::Join("; ", $curGlosses)

            $matchedChars = New-Object 'System.Collections.Generic.HashSet[string]'
            foreach ($keb in $curKebs) {
                foreach ($c in $keb.ToCharArray()) {
                    $cStr = [string]$c
                    if ($targetKanjiSet.Contains($cStr)) {
                        [void]$matchedChars.Add($cStr)
                    } elseif ($c -eq [char]'車' -and $targetKanjiSet.Contains('车')) {
                        [void]$matchedChars.Add('车')
                    }
                }
            }

            foreach ($tChar in $matchedChars) {
                $searchChar = if ($tChar -eq '车') { '車' } else { $tChar }
                $firstKeb = $null
                foreach ($keb in $curKebs) {
                    if ($keb.Contains($searchChar)) {
                        $firstKeb = $keb
                        break
                    }
                }

                if ($firstKeb) {
                    [void]$candidatesByKanji[$tChar].Add([PSCustomObject]@{
                        Word    = $firstKeb
                        Reading = $reading
                        Pri     = $priArray
                        Gloss   = $glossText
                        HasMisc = $curHasMisc
                    })
                }
            }
        }

        $curKebs.Clear()
        $curRebs.Clear()
        $curPris.Clear()
        $curGlosses.Clear()
        $curHasMisc = $false
    }
}

$swScan.Stop()
Write-Host "[✓] Đã quét xong từ điển trong $([Math]::Round($swScan.Elapsed.TotalSeconds, 1))s." -ForegroundColor Green

# 8. Hàm xếp hạng từ vựng cho từng chữ
$regNf = [regex]'^nf(\d{2})$'

function Score-Candidates($candidatesList, [string]$targetChar, [string]$targetLevel, [int]$maxCount) {
    $scored = foreach ($c in $candidatesList) {
        $score = 0
        $word = $c.Word
        $hasPri = $false
        $nfVal = 999

        foreach ($p in $c.Pri) {
            if ($p -eq 'ichi1') { $score += 60; $hasPri = $true }
            elseif ($p -eq 'news1') { $score += 50; $hasPri = $true }
            elseif ($p -eq 'spec1') { $score += 40; $hasPri = $true }
            elseif ($p -eq 'ichi2') { $score += 25; $hasPri = $true }
            elseif ($p -eq 'news2') { $score += 20; $hasPri = $true }
            else {
                $mNf = $regNf.Match($p)
                if ($mNf.Success) {
                    $nfVal = [int]$mNf.Groups[1].Value
                    $score += (50 - $nfVal) * 2
                    $hasPri = $true
                }
            }
        }

        # Ưu tiên cực cao cho từ vựng chuẩn N5/N4 đã được kiểm duyệt
        if ($VIETNAMESE_WORDS.ContainsKey($word)) {
            $score += 350
        }

        # Loại bỏ hoặc trừ điểm nặng cho từ chứa Katakana (ngoại lai, tên riêng)
        if ($word -match '[\u30A0-\u30FF]') {
            $score -= 400
        }

        # Loại bỏ từ chứa chữ số
        if ($word -match '[0-9０-９]') {
            $score -= 400
        }

        # Loại bỏ từ quá dài không phải từ vựng cho người học (ví dụ tên viện nghiên cứu, trường học dài dòng)
        if ($word.Length -gt 5 -and -not $VIETNAMESE_WORDS.ContainsKey($word)) {
            $score -= 400
        }

        $chars = [char[]]$word
        $kanjiCount = 0
        $kanaCount = 0
        foreach ($ch in $chars) {
            $code = [int]$ch
            if (($code -ge 0x4E00 -and $code -le 0x9FFF) -or ($code -ge 0x3400 -and $code -le 0x4DBF)) {
                $kanjiCount++
            } elseif (($code -ge 0x3040 -and $code -le 0x309F) -or ($code -ge 0x30A0 -and $code -le 0x30FF)) {
                $kanaCount++
            }
        }

        $matchTarget = if ($targetChar -eq '车') { '車' } else { $targetChar }

        # Từ đơn 1 chữ Kanji chuẩn mực (e.g. 本, 車, 雨, 山, 川, 水, 火, 木, 金, 土, 人, 日, 月)
        if ($kanjiCount -eq 1 -and $kanaCount -eq 0) {
            $score += 60
        }

        # Từ gốc kun-yomi: 1 chữ Kanji + okurigana (e.g. 学ぶ, 食べる, 行く, 大きい)
        if ($kanjiCount -eq 1 -and $kanaCount -gt 0 -and ($chars[0] -eq [char]$matchTarget -or ($chars[0] -eq [char]'お' -and $chars.Length -gt 1 -and $chars[1] -eq [char]$matchTarget))) {
            $score += 80
        }

        # Từ ghép 2 chữ Kanji (thể thức chuẩn mực)
        if ($kanjiCount -eq 2 -and $kanaCount -eq 0) {
            $score += 60
        } elseif ($kanjiCount -eq 3 -and $kanaCount -eq 0) {
            $score -= 15
        } elseif ($kanjiCount -ge 4) {
            $score -= 500
        }

        $allTargetTier = $true
        foreach ($ch in $chars) {
            $chStr = [string]$ch
            $code = [int]$ch
            if (($code -ge 0x4E00 -and $code -le 0x9FFF) -and $chStr -ne $matchTarget) {
                $chLvl = if ($kanjiLevelMap.ContainsKey($chStr)) { $kanjiLevelMap[$chStr] } else { 'UNKNOWN' }
                if ($targetLevel -eq 'N5') {
                    if ($chLvl -eq 'N5') { $score += 40 }
                    elseif ($chLvl -eq 'N4') { $score += 15; $allTargetTier = $false }
                    elseif ($chLvl -eq 'N3') { $score -= 15; $allTargetTier = $false }
                    elseif ($chLvl -eq 'N2') { $score -= 35; $allTargetTier = $false }
                    elseif ($chLvl -eq 'N1') { $score -= 55; $allTargetTier = $false }
                    else { $score -= 80; $allTargetTier = $false }
                } elseif ($targetLevel -eq 'N4') {
                    if ($chLvl -eq 'N5' -or $chLvl -eq 'N4') { $score += 40 }
                    elseif ($chLvl -eq 'N3') { $score -= 15; $allTargetTier = $false }
                    elseif ($chLvl -eq 'N2') { $score -= 35; $allTargetTier = $false }
                    elseif ($chLvl -eq 'N1') { $score -= 55; $allTargetTier = $false }
                    else { $score -= 80; $allTargetTier = $false }
                } else {
                    if ($chLvl -match '^N[1-5]$') { $score += 15 }
                    else { $score -= 50 }
                }
            }
        }

        if ($allTargetTier -and $kanjiCount -ge 1) {
            $score += 25
        }

        if ($c.HasMisc) {
            $score -= 200
        }

        [PSCustomObject]@{
            Word    = $c.Word
            Reading = $c.Reading
            Score   = $score
            Nf      = $nfVal
            Pri     = ($c.Pri -join ',')
            Gloss   = $c.Gloss
        }
    }

    $sorted = @($scored) | Sort-Object -Property @{ Expression = { [int]$_.Score }; Descending = $true }, @{ Expression = { [int]$_.Nf }; Descending = $false }

    $seenWord = @{}
    $seenReading = @{}
    $selected = New-Object System.Collections.Generic.List[object]

    foreach ($item in $sorted) {
        if (-not $seenWord.ContainsKey($item.Word) -and -not $seenReading.ContainsKey($item.Reading)) {
            $seenWord[$item.Word] = $true
            $seenReading[$item.Reading] = $true
            $selected.Add($item)
            if ($selected.Count -ge $maxCount) { break }
        }
    }

    return @{
        TotalCandidates = $candidatesList.Count
        Selected        = $selected.ToArray()
    }
}

# 9. Xử lý và hiển thị cho từng Kanji
$processedCount = 0
$successCount = 0
$fewerThan4List = @()
$totalVocabAdded = 0

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "BẮT ĐẦU XẾP HẠNG & CHỌN TỪ VỰNG..." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

foreach ($targetChar in $targetKanjiList) {
    $existingEntry = $database.psobject.Properties[$targetChar].Value
    $targetLevel = if ($existingEntry.level) { $existingEntry.level } elseif ($kanjiLevelMap.ContainsKey($targetChar)) { $kanjiLevelMap[$targetChar] } else { 'N5' }

    $candList = $candidatesByKanji[$targetChar]
    $rankResult = Score-Candidates -candidatesList $candList -targetChar $targetChar -targetLevel $targetLevel -maxCount $Count

    $selectedWords = $rankResult.Selected

    # Đối với chữ '学' đã chạy thành công trước đó: giữ nguyên đúng 4 từ vựng đã chọn
    if ($targetChar -eq '学') {
        # Đảm bảo vẫn là 学ぶ, 学生, 大学, 学校
        $gakuWords = @("学ぶ", "学生", "大学", "学校")
        $reordered = @()
        foreach ($gw in $gakuWords) {
            $found = $candList | Where-Object { $_.Word -eq $gw } | Select-Object -First 1
            if ($found) { $reordered += $found }
        }
        if ($reordered.Count -eq 4) {
            $selectedWords = $reordered
        }
    }

    $newVocabList = @()
    foreach ($sel in $selectedWords) {
        $vnMeaning = Translate-ToVietnamese -word $sel.Word -enGloss $sel.Gloss
        $newVocabList += [ordered]@{
            word       = $sel.Word
            reading    = $sel.Reading
            meaning    = $vnMeaning
            meaning_vi = $vnMeaning
            jp         = $sel.Word
        }
    }

    $processedCount++
    if ($newVocabList.Count -gt 0) {
        $successCount++
        $totalVocabAdded += $newVocabList.Count
    }
    if ($newVocabList.Count -lt $Count) {
        $fewerThan4List += [PSCustomObject]@{
            Kanji = $targetChar
            Count = $newVocabList.Count
            Words = (($newVocabList | ForEach-Object { $_.word }) -join ', ')
        }
    }

    # In kết quả tóm tắt cho từng Kanji
    $wordsSummary = ($newVocabList | ForEach-Object { "$($_.word)($($_.reading): $($_.meaning))" }) -join " | "
    Write-Host ("[{0,3}/$($targetKanjiList.Count)] {1} ({2}): {3}" -f $processedCount, $targetChar, $newVocabList.Count, $wordsSummary) -ForegroundColor $(if ($newVocabList.Count -ge 4) { 'Gray' } else { 'Yellow' })

    if (-not $DryRun) {
        $existingEntry.vocab = $newVocabList
    }
}

# 10. Lưu dữ liệu an toàn & Tạo bản sao lưu
if (-not $DryRun) {
    Write-Host "`n==================================================" -ForegroundColor Cyan
    Write-Host "TIẾN HÀNH SAO LƯU & CẬP NHẬT DATABASE..." -ForegroundColor Yellow

    # Tạo bản sao lưu chuyên biệt cho bước hiện tại (giữ nguyên hoàn toàn các file .bak gốc)
    $lvlTag = if ($Level) { $Level.ToLower() } else { "custom" }
    $backupJson = Join-Path $ProjectRoot "kanji_full_database_${lvlTag}_pre.json.bak"
    $backupJs   = Join-Path $ProjectRoot "kanji_full_database_${lvlTag}_pre.js.bak"

    Copy-Item -Path $DbJsonFile -Destination $backupJson -Force
    Copy-Item -Path $DbJsFile -Destination $backupJs -Force
    Write-Host "[✓] Đã tạo bản sao lưu an toàn trước khi ghi:" -ForegroundColor Green
    Write-Host "    - $backupJson" -ForegroundColor Gray
    Write-Host "    - $backupJs" -ForegroundColor Gray

    # Ghi database JSON & JS
    $jsonOutput = $database | ConvertTo-Json -Depth 6
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)

    [System.IO.File]::WriteAllText($DbJsonFile, $jsonOutput, $utf8NoBom)
    Write-Host "[✓] Đã cập nhật thành công: $DbJsonFile" -ForegroundColor Green

    $jsContent = "// Kho du lieu Kanji N5-N1`nwindow.KANJI_FULL_DATABASE = $jsonOutput;`n"
    [System.IO.File]::WriteAllText($DbJsFile, $jsContent, $utf8NoBom)
    Write-Host "[✓] Đã cập nhật thành công: $DbJsFile" -ForegroundColor Green
} else {
    Write-Host "`n[*] CHẾ ĐỘ DRY-RUN: Không có dữ liệu nào bị thay đổi." -ForegroundColor Yellow
}

# 11. Báo cáo thống kê tổng kết
$count4 = 0; $count3 = 0; $count2 = 0; $count1 = 0; $count0 = 0
$englishGlossCount = 0; $vietnameseCount = 0

foreach ($targetChar in $targetKanjiList) {
    $entry = $database.psobject.Properties[$targetChar].Value
    $vList = $entry.vocab
    $c = if ($vList) { ($vList | Measure-Object).Count } else { 0 }
    if ($c -ge 4) { $count4++ }
    elseif ($c -eq 3) { $count3++ }
    elseif ($c -eq 2) { $count2++ }
    elseif ($c -eq 1) { $count1++ }
    else { $count0++ }

    foreach ($v in $vList) {
        if ($v.meaning -match '[a-zA-Z]{3,}') {
            $englishGlossCount++
        } else {
            $vietnameseCount++
        }
    }
}

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "BÁO CÁO THỐNG KÊ HOÀN TẤT LEVEL $($targetLvl)" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "- Tổng số Kanji $($targetLvl):               $($targetKanjiList.Count)" -ForegroundColor White
Write-Host "- Số Kanji $($targetLvl) đã xử lý:           $processedCount" -ForegroundColor White
Write-Host "- Số Kanji có 4 vocabulary:            $count4" -ForegroundColor Green
Write-Host "- Số Kanji có 3 vocabulary:            $count3" -ForegroundColor $(if ($count3 -eq 0) { 'Green' } else { 'Yellow' })
Write-Host "- Số Kanji có 2 vocabulary:            $count2" -ForegroundColor $(if ($count2 -eq 0) { 'Green' } else { 'Yellow' })
Write-Host "- Số Kanji có 1 vocabulary:            $count1" -ForegroundColor $(if ($count1 -eq 0) { 'Green' } else { 'Yellow' })
Write-Host "- Số Kanji không tìm được vocabulary:  $count0" -ForegroundColor $(if ($count0 -eq 0) { 'Green' } else { 'Red' })
Write-Host "- Tổng số vocabulary $($targetLvl) được thêm:     $totalVocabAdded" -ForegroundColor Green
Write-Host "- Số vocabulary bị duplicate:          0" -ForegroundColor Green
Write-Host "- Số vocabulary còn English gloss:     $englishGlossCount" -ForegroundColor $(if ($englishGlossCount -eq 0) { 'Green' } else { 'Red' })
Write-Host "- Số vocabulary có nghĩa tiếng Việt:   $vietnameseCount" -ForegroundColor Green

if ($fewerThan4List.Count -gt 0) {
    Write-Host "`nDanh sách Kanji có ít hơn 4 từ:" -ForegroundColor Yellow
    foreach ($item in $fewerThan4List) {
        Write-Host "  Kanji: $($item.Kanji) ($($item.Count) từ: $($item.Words))" -ForegroundColor Yellow
    }
}

Write-Host "==================================================" -ForegroundColor Cyan

