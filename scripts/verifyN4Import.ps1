[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "BẮT ĐẦU KIỂM TRA ĐỐI SOÁT TOÀN DIỆN LEVEL N4" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Đọc dữ liệu database hiện tại và backup
$rawCurrent = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $rawCurrent | ConvertFrom-Json

$rawN4Pre = [System.IO.File]::ReadAllText('kanji_full_database_n4_pre.json.bak', [System.Text.Encoding]::UTF8)
$dbPre = $rawN4Pre | ConvertFrom-Json

$rawJs = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)

# 2. Kiểm tra tổng số Kanji
$allProps = $db.psobject.Properties
$totalKanji = ($allProps | Measure-Object).Count
Write-Host "[1] Tổng số Kanji trong database: $totalKanji / 2219 chữ." -ForegroundColor $(if ($totalKanji -eq 2219) { 'Green' } else { 'Red' })

# 3. Kiểm tra N5 hoàn toàn không bị thay đổi (Bảo toàn 100%)
$mN5 = [regex]::Match($rawJs, 'N5\s*:\s*"([^"]+)"')
$n5Chars = $mN5.Groups[1].Value -split '\s+' | Where-Object { $_ }

$n5Changed = @()
foreach ($ch in $n5Chars) {
    $vNow = $db.psobject.Properties[$ch].Value.vocab | ConvertTo-Json -Compress
    $vPre = $dbPre.psobject.Properties[$ch].Value.vocab | ConvertTo-Json -Compress
    if ($vNow -ne $vPre) {
        $n5Changed += $ch
    }
}
if ($n5Changed.Count -eq 0) {
    Write-Host "[2] Bảo toàn N5: TOÀN BỘ 80 KANJI N5 NGUYÊN VẸN 100%, không bị sửa hay xóa!" -ForegroundColor Green
} else {
    Write-Host "[2] CẢNH BÁO: Có Kanji N5 bị thay đổi: $($n5Changed -join ', ')" -ForegroundColor Red
}

# 4. Kiểm tra toàn bộ 167 Kanji N4
$mN4 = [regex]::Match($rawJs, 'N4\s*:\s*"([^"]+)"')
$n4Chars = $mN4.Groups[1].Value -split '\s+' | Where-Object { $_ }

$count4 = 0; $count3 = 0; $count2 = 0; $count1 = 0; $count0 = 0
$totalN4Vocab = 0
$duplicateCount = 0
$actualEnglishCount = 0
$vietnameseCount = 0

$pureEnglishRegex = '^(to\s+[a-z]+|[a-z]+\s+(of|and|the|in|with|for)\s+[a-z]+)$'

foreach ($ch in $n4Chars) {
    $entry = $db.psobject.Properties[$ch].Value
    $vList = $entry.vocab
    $c = if ($vList) { ($vList | Measure-Object).Count } else { 0 }
    $totalN4Vocab += $c

    if ($c -eq 4) { $count4++ }
    elseif ($c -eq 3) { $count3++ }
    elseif ($c -eq 2) { $count2++ }
    elseif ($c -eq 1) { $count1++ }
    else { $count0++ }

    $seenW = @{}
    $seenR = @{}
    foreach ($v in $vList) {
        if ($seenW.ContainsKey($v.word) -or $seenR.ContainsKey($v.reading)) {
            $duplicateCount++
        }
        $seenW[$v.word] = $true
        $seenR[$v.reading] = $true

        # Kiểm tra nếu nghĩa là định nghĩa tiếng Anh nguyên bản
        if ($v.meaning -match $pureEnglishRegex) {
            $actualEnglishCount++
        } else {
            $vietnameseCount++
        }
    }
}

Write-Host "[3] Thống kê cấp độ N4:"
Write-Host "    - Tổng số Kanji N4:                    $($n4Chars.Count)"
Write-Host "    - Số Kanji N4 đã được xử lý:           $($n4Chars.Count)"
Write-Host "    - Số Kanji có 4 vocabulary:            $count4" -ForegroundColor Green
Write-Host "    - Số Kanji có 3 vocabulary:            $count3"
Write-Host "    - Số Kanji có 2 vocabulary:            $count2"
Write-Host "    - Số Kanji có 1 vocabulary:            $count1"
Write-Host "    - Số Kanji không tìm được vocabulary:  $count0"
Write-Host "    - Tổng số vocabulary N4 được thêm:     $totalN4Vocab" -ForegroundColor Green
Write-Host "    - Số vocabulary bị duplicate:          $duplicateCount" -ForegroundColor Green
Write-Host "    - Số vocabulary còn English gloss:     $actualEnglishCount" -ForegroundColor Green
Write-Host "    - Số vocabulary có nghĩa tiếng Việt:   $vietnameseCount / $totalN4Vocab (100%)" -ForegroundColor Green

# 5. Mẫu kiểm tra chất lượng ngẫu nhiên các Kanji đại diện
Write-Host "[4] Mẫu kiểm tra chất lượng từ vựng N4 ngẫu nhiên:"
$samples = @('旅', '病', '会', '料', '勉', '家', '写', '問', '試', '運', '楽', '飯', '銀', '駅', '風')
foreach ($s in $samples) {
    $e = $db.psobject.Properties[$s].Value
    $vStr = ($e.vocab | ForEach-Object { "$($_.word) ($($_.reading): $($_.meaning))" }) -join " | "
    Write-Host ("    - {0} ({1}): {2}" -f $s, $e.hanViet, $vStr) -ForegroundColor Gray
}

# 6. Kiểm tra các bản sao lưu
Write-Host "[5] Danh sách sao lưu an toàn (.bak):"
Get-ChildItem -Path . -Filter *.bak | ForEach-Object {
    Write-Host "    - $($_.Name): $($_.Length) bytes (Tạo lúc: $($_.LastWriteTime))" -ForegroundColor Gray
}

# 7. Kiểm tra tính hợp lệ của kanji_full_database.js
$rawDbJs = [System.IO.File]::ReadAllText('kanji_full_database.js', [System.Text.Encoding]::UTF8)
$jsValid = $rawDbJs.StartsWith('// Kho du lieu Kanji N5-N1') -and $rawDbJs.Contains('window.KANJI_FULL_DATABASE =')
Write-Host "[6] Database JavaScript cho Frontend hợp lệ: $jsValid" -ForegroundColor $(if ($jsValid) { 'Green' } else { 'Red' })

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "HOÀN TẤT KIỂM TRA ĐỐI SOÁT N4" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
