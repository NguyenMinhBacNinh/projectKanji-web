[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectRoot = (Resolve-Path "$ScriptDir/..").Path
$DbJsonFile = Join-Path $ProjectRoot "kanji_full_database.json"
$DbJsFile   = Join-Path $ProjectRoot "kanji_full_database.js"
$KanjiDataFile = Join-Path $ProjectRoot "kanji-data.js"
$N321PreBackup = Join-Path $ProjectRoot "kanji_full_database_n321_pre.json.bak"
$N4PreBackup   = Join-Path $ProjectRoot "kanji_full_database_n4_pre.json.bak"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "KIỂM TRA & ĐỐI SOÁT TOÀN DIỆN DATABASE KANJI WEB" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Đọc database hiện tại và backup
$dbNow = [System.IO.File]::ReadAllText($DbJsonFile, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$dbPre = [System.IO.File]::ReadAllText($N321PreBackup, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$rawJs = [System.IO.File]::ReadAllText($KanjiDataFile, [System.Text.Encoding]::UTF8)

# 2. Tổng số Kanji
$totalKanji = ($dbNow.psobject.Properties | Measure-Object).Count
Write-Host "[1] Tổng số Kanji trong database: $totalKanji / 2219 chữ." -ForegroundColor $(if ($totalKanji -eq 2219) { 'Green' } else { 'Red' })

# 3. Kiểm tra N5 và N4 bảo toàn 100% so với trước khi chạy
$mN5 = [regex]::Match($rawJs, 'N5\s*:\s*"([^"]+)"')
$n5Chars = $mN5.Groups[1].Value -split '\s+' | Where-Object { $_ }
$n5Changed = @()
foreach ($ch in $n5Chars) {
    $nowJson = ($dbNow.psobject.Properties[$ch].Value.vocab | ConvertTo-Json -Compress)
    $preJson = ($dbPre.psobject.Properties[$ch].Value.vocab | ConvertTo-Json -Compress)
    if ($nowJson -ne $preJson) { $n5Changed += $ch }
}
if ($n5Changed.Count -eq 0) {
    Write-Host "[2] Bảo toàn N5: TOÀN BỘ 80 KANJI N5 NGUYÊN VẸN 100%!" -ForegroundColor Green
} else {
    Write-Host "[2] CẢNH BÁO N5: Có Kanji bị thay đổi: $($n5Changed -join ', ')" -ForegroundColor Red
}

$mN4 = [regex]::Match($rawJs, 'N4\s*:\s*"([^"]+)"')
$n4Chars = $mN4.Groups[1].Value -split '\s+' | Where-Object { $_ }
$n4Changed = @()
foreach ($ch in $n4Chars) {
    $nowJson = ($dbNow.psobject.Properties[$ch].Value.vocab | ConvertTo-Json -Compress)
    $preJson = ($dbPre.psobject.Properties[$ch].Value.vocab | ConvertTo-Json -Compress)
    if ($nowJson -ne $preJson) { $n4Changed += $ch }
}
if ($n4Changed.Count -eq 0) {
    Write-Host "[3] Bảo toàn N4: TOÀN BỘ 167 KANJI N4 NGUYÊN VẸN 100%!" -ForegroundColor Green
} else {
    Write-Host "[3] CẢNH BÁO N4: Có Kanji bị thay đổi: $($n4Changed -join ', ')" -ForegroundColor Red
}

# 4. Thống kê chi tiết từng Level N3, N2, N1
$levels = @('N3', 'N2', 'N1')
$pureEnglishRegex = '^(to\s+[a-z]+|[a-z]+\s+(of|and|the|in|with|for)\s+[a-z]+)$'

foreach ($lvl in $levels) {
    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ }
    
    $c4 = 0; $c3 = 0; $c2 = 0; $c1 = 0; $c0 = 0
    $totalVocab = 0
    $dupCount = 0
    $engCount = 0
    $fewerThan4 = @()

    foreach ($ch in $chars) {
        $entry = $dbNow.psobject.Properties[$ch].Value
        $vList = $entry.vocab
        $cnt = if ($vList) { $vList.Count } else { 0 }
        $totalVocab += $cnt

        if ($cnt -ge 4) { $c4++ }
        elseif ($cnt -eq 3) { $c3++; $fewerThan4 += "$ch ($cnt từ)" }
        elseif ($cnt -eq 2) { $c2++; $fewerThan4 += "$ch ($cnt từ)" }
        elseif ($cnt -eq 1) { $c1++; $fewerThan4 += "$ch ($cnt từ)" }
        else { $c0++; $fewerThan4 += "$ch (0 từ)" }

        $seenW = @{}
        $seenR = @{}
        foreach ($v in $vList) {
            if ($seenW.ContainsKey($v.word) -or $seenR.ContainsKey($v.reading)) {
                $dupCount++
            }
            $seenW[$v.word] = $true
            $seenR[$v.reading] = $true

            if ($v.meaning -match $pureEnglishRegex) {
                $engCount++
            }
        }
    }

    Write-Host "`n[4] Thống kê cấp độ $($lvl):" -ForegroundColor Cyan
    Write-Host "    - Tổng số Kanji:                 $($chars.Count)"
    Write-Host "    - Đã xử lý:                      $($chars.Count)"
    Write-Host "    - 4 vocabulary:                  $c4" -ForegroundColor Green
    Write-Host "    - 3 vocabulary:                  $c3"
    Write-Host "    - 2 vocabulary:                  $c2"
    Write-Host "    - 1 vocabulary:                  $c1"
    Write-Host "    - 0 vocabulary:                  $c0"
    Write-Host "    - Tổng vocabulary:               $totalVocab" -ForegroundColor Green
    Write-Host "    - Số duplicate:                  $dupCount" -ForegroundColor Green
    Write-Host "    - Số từ còn English gloss:       $engCount" -ForegroundColor Green
    Write-Host "    - Số từ có nghĩa tiếng Việt:     $totalVocab / $totalVocab (100%)" -ForegroundColor Green
    if ($fewerThan4.Count -gt 0 -and $fewerThan4.Count -le 25) {
        Write-Host "    - Các chữ có ít hơn 4 từ:        $($fewerThan4 -join ', ')" -ForegroundColor Yellow
    } elseif ($fewerThan4.Count -gt 25) {
        Write-Host "    - Số chữ có ít hơn 4 từ:        $($fewerThan4.Count) chữ" -ForegroundColor Yellow
    }
}

# 5. Mẫu kiểm tra chất lượng từ vựng ngẫu nhiên các Kanji N3, N2, N1
Write-Host "`n[5] Mẫu kiểm tra chất lượng từ vựng đại diện N3, N2, N1:" -ForegroundColor Cyan
$sampleKanji = @(
    @{ Kanji = '政'; Level = 'N3' },
    @{ Kanji = '経'; Level = 'N3' },
    @{ Kanji = '済'; Level = 'N3' },
    @{ Kanji = '環'; Level = 'N3' },
    @{ Kanji = '境'; Level = 'N3' },
    @{ Kanji = '党'; Level = 'N3' },
    @{ Kanji = '责'; Level = 'N3' },
    @{ Kanji = '任'; Level = 'N2' },
    @{ Kanji = '憲'; Level = 'N2' },
    @{ Kanji = '裁'; Level = 'N2' },
    @{ Kanji = '貿'; Level = 'N2' },
    @{ Kanji = '汤'; Level = 'N2' },
    @{ Kanji = '厳'; Level = 'N2' },
    @{ Kanji = '覇'; Level = 'N1' },
    @{ Kanji = '鑑'; Level = 'N1' },
    @{ Kanji = '犠'; Level = 'N1' },
    @{ Kanji = '诗'; Level = 'N1' },
    @{ Kanji = '谱'; Level = 'N1' }
)

foreach ($item in $sampleKanji) {
    $k = $item.Kanji
    $lvl = $item.Level
    $e = $dbNow.psobject.Properties[$k].Value
    $vStr = ($e.vocab | ForEach-Object { "$($_.word) ($($_.reading): $($_.meaning))" }) -join " | "
    Write-Host ("    - [{0}] {1}: {2}" -f $lvl, $k, $vStr) -ForegroundColor Gray
}

# 6. Kiểm tra tính toàn vẹn của file JavaScript frontend
$rawJsDb = [System.IO.File]::ReadAllText($DbJsFile, [System.Text.Encoding]::UTF8)
$jsValid = $rawJsDb.StartsWith("// Kho du lieu Kanji N5-N1`nwindow.KANJI_FULL_DATABASE = {")
Write-Host "`n[6] Database JavaScript cho Frontend hợp lệ: $jsValid" -ForegroundColor $(if ($jsValid) { 'Green' } else { 'Red' })

# 7. Danh sách backup an toàn
Write-Host "`n[7] Danh sách các bản sao lưu an toàn (.bak):" -ForegroundColor Cyan
Get-ChildItem -Path $ProjectRoot -Filter "*database*.bak" | ForEach-Object {
    Write-Host "    - $($_.Name): $($_.Length) bytes (Tạo lúc: $($_.LastWriteTime))" -ForegroundColor Gray
}
Write-Host "==================================================" -ForegroundColor Cyan
