[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$db = [System.IO.File]::ReadAllText("kanji_full_database.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$rawJs = [System.IO.File]::ReadAllText("kanji-data.js", [System.Text.Encoding]::UTF8)

$levels = @('N5', 'N4', 'N3', 'N2', 'N1')

Write-Host "=================================================="
Write-Host "KIỂM TRA HÁN VIỆT TOÀN BỘ CÁC CẤP ĐỘ N5 -> N1"
Write-Host "=================================================="

$totalAll = 0
$totalN321 = 0
$hanOrEmptyN321 = 0
$validN321 = 0

foreach ($lvl in $levels) {
    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ }
    
    $cnt = $chars.Count
    $totalAll += $cnt
    $hanCount = 0
    $emptyCount = 0
    $validCount = 0
    
    foreach ($c in $chars) {
        if (-not $db.psobject.Properties[$c]) {
            $emptyCount++
            continue
        }
        $hv = $db.psobject.Properties[$c].Value.hanViet
        if ([string]::IsNullOrWhiteSpace($hv) -or $hv -eq "HÁN" -or $hv -eq "HÁN TỰ") {
            $hanCount++
        } else {
            $validCount++
        }
    }
    
    if ($lvl -in @('N3', 'N2', 'N1')) {
        $totalN321 += $cnt
        $hanOrEmptyN321 += ($hanCount + $emptyCount)
        $validN321 += $validCount
    }
    
    Write-Host ("Cấp độ {0,-4}: Tổng = {1,4} | Hán Việt hợp lệ = {2,4} | Trống/HÁN = {3,2}" -f $lvl, $cnt, $validCount, ($hanCount + $emptyCount))
}

Write-Host "--------------------------------------------------"
Write-Host ("Tổng số Kanji N3/N2/N1: {0}" -f $totalN321)
Write-Host ("Hán Việt chuẩn xác N3/N2/N1: {0}" -f $validN321)
Write-Host ("Còn giá trị 'HÁN' hoặc thiếu ở N3/N2/N1: {0}" -f $hanOrEmptyN321)
Write-Host ("Tổng số Kanji toàn hệ thống (N5-N1): {0}" -f $totalAll)
Write-Host "=================================================="
