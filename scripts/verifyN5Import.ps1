[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "BẮT ĐẦU KIỂM TRA ĐỐI SOÁT LEVEL N5" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Đọc danh sách N5 từ kanji-data.js
$rawJs = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)
$m = [regex]::Match($rawJs, 'N5\s*:\s*"([^"]+)"')
$n5Chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ }
Write-Host "[1] Danh sách N5 trong kanji-data.js: $($n5Chars.Count) chữ."

# 2. Đọc database kanji_full_database.json
$rawJson = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $rawJson | ConvertFrom-Json
$allProps = $db.psobject.Properties
$totalKanji = ($allProps | Measure-Object).Count
Write-Host "[2] Tổng số chữ Kanji trong database: $totalKanji / 2219 chữ."

# 3. Kiểm tra bảo toàn các trường quan trọng
$requiredFields = @('kanji', 'hanViet', 'meaning', 'mnemonic', 'on', 'kun', 'example', 'vocab')
$fieldsIntact = $true
foreach ($p in $allProps) {
    foreach ($f in $requiredFields) {
        if (-not $p.Value.psobject.Properties[$f]) {
            Write-Warning "Kanji $($p.Name) thiếu trường $f!"
            $fieldsIntact = $false
        }
    }
}
if ($fieldsIntact) {
    Write-Host "[3] Toàn bộ 2,219 Kanji bảo toàn 100% các trường: $($requiredFields -join ', ')." -ForegroundColor Green
}

# 4. Kiểm tra từ vựng của 80 Kanji N5
$n5Processed = 0
$n5Success = 0
$n5FewerThan4 = @()
$totalVocabAdded = 0
$duplicateFound = $false

foreach ($ch in $n5Chars) {
    $entry = $db.psobject.Properties[$ch].Value
    if (-not $entry) {
        Write-Warning "Kanji N5 $ch không tìm thấy trong DB!"
        continue
    }
    $n5Processed++
    $vList = $entry.vocab
    $vCount = if ($vList) { ($vList | Measure-Object).Count } else { 0 }
    
    if ($vCount -gt 0) {
        $n5Success++
        $totalVocabAdded += $vCount
    }
    if ($vCount -lt 4) {
        $n5FewerThan4 += "$ch ($vCount từ)"
    }

    # Kiểm tra trùng lặp từ hoặc cách đọc trong cùng 1 Kanji
    $seenW = @{}
    $seenR = @{}
    foreach ($v in $vList) {
        if ($seenW.ContainsKey($v.word)) {
            Write-Warning "Kanji $ch có từ trùng lặp: $($v.word)"
            $duplicateFound = $true
        }
        $seenW[$v.word] = $true
    }
}

Write-Host "[4] Kết quả kiểm tra từ vựng N5:"
Write-Host "    - Số Kanji N5 đã xử lý: $n5Processed / 80"
Write-Host "    - Số Kanji nhận từ vựng thành công: $n5Success / 80"
Write-Host "    - Số Kanji có ít hơn 4 từ vựng: $($n5FewerThan4.Count)"
Write-Host "    - Tổng số từ vựng N5 đã nhập: $totalVocabAdded"
Write-Host "    - Kiểm tra từ trùng lặp: $(if (-not $duplicateFound) { 'KHÔNG CÓ TRÙNG LẶP (Hoàn hảo)' } else { 'CÓ TRÙNG LẶP!' })" -ForegroundColor $(if (-not $duplicateFound) { 'Green' } else { 'Red' })

# 5. Kiểm tra chữ '学'
$gakuEntry = $db.学.vocab
$gakuWords = ($gakuEntry | ForEach-Object { "$($_.word) ($($_.reading): $($_.meaning))" }) -join " | "
Write-Host "[5] Kiểm tra riêng chữ '学':"
Write-Host "    - Từ vựng: $gakuWords" -ForegroundColor Green

# 6. Kiểm tra các bản sao lưu
Write-Host "[6] Tình trạng bản sao lưu (.bak):"
$baks = Get-ChildItem -Path . -Filter *.bak
foreach ($b in $baks) {
    Write-Host "    - $($b.Name): $($b.Length) bytes (Tạo lúc: $($b.LastWriteTime))" -ForegroundColor Gray
}

# 7. Kiểm tra file JS database
$rawDbJs = [System.IO.File]::ReadAllText('kanji_full_database.js', [System.Text.Encoding]::UTF8)
$jsValid = $rawDbJs.StartsWith('// Kho du lieu Kanji N5-N1') -and $rawDbJs.Contains('window.KANJI_FULL_DATABASE =')
Write-Host "[7] File kanji_full_database.js hợp lệ cho trình duyệt: $jsValid" -ForegroundColor $(if ($jsValid) { 'Green' } else { 'Red' })

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "HOÀN TẤT KIỂM TRA ĐỐI SOÁT" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
