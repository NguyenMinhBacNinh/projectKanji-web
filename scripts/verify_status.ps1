[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$jsonPath = "kanji_full_database.json"
$jsPath = "kanji_full_database.js"

$jsonRaw = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$jsRaw = [System.IO.File]::ReadAllText($jsPath, [System.Text.Encoding]::UTF8)

$db = $jsonRaw | ConvertFrom-Json

$levels = @('N5', 'N4', 'N3', 'N2', 'N1')
$stats = @{}
foreach ($lvl in $levels) {
    $stats[$lvl] = @{ Total = 0; Valid = 0; Template = 0; Missing = 0 }
}

$tplPattern = "この漢字は|この字は|と書きます|という漢字|という意味|と読みます"

foreach ($p in $db.psobject.Properties) {
    $item = $p.Value
    $lvl = $item.level
    if (-not $stats.ContainsKey($lvl)) {
        continue
    }
    $stats[$lvl].Total++

    $ex = $item.example
    if (-not $ex -or -not $ex.sentence -or $ex.sentence.Trim() -eq "") {
        $stats[$lvl].Missing++
    } elseif ($ex.sentence -match $tplPattern) {
        $stats[$lvl].Template++
    } else {
        $stats[$lvl].Valid++
    }
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "       BÁO CÁO TỔNG THỂ DỮ LIỆU KANJI     " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

$grandTotal = 0
$grandValid = 0
$grandTpl = 0
$grandMiss = 0

foreach ($lvl in $levels) {
    $s = $stats[$lvl]
    $grandTotal += $s.Total
    $grandValid += $s.Valid
    $grandTpl += $s.Template
    $grandMiss += $s.Missing

    $color = if ($s.Valid -eq $s.Total) { "Green" } else { "Yellow" }
    Write-Host ("{0}: {1,4} / {2,4} hợp lệ ({3:P1}) | Template: {4,3} | Thiếu: {5,3}" -f `
        $lvl, $s.Valid, $s.Total, ($s.Valid / $s.Total), $s.Template, $s.Missing) -ForegroundColor $color
}

Write-Host "------------------------------------------"
Write-Host ("TỔNG: {0,4} / {1,4} hợp lệ ({2:P1}) | Template: {3,3} | Thiếu: {4,3}" -f `
    $grandValid, $grandTotal, ($grandValid / $grandTotal), $grandTpl, $grandMiss) -ForegroundColor Green

Write-Host "`n=== KIỂM TRA ĐỒNG BỘ JSON VÀ JS ===" -ForegroundColor Cyan
$expectedJsPrefix = "window.KANJI_FULL_DATABASE = "
$isPrefixed = $jsRaw.StartsWith($expectedJsPrefix)
Write-Host "JS có tiền tố window.KANJI_FULL_DATABASE: $isPrefixed" -ForegroundColor Green
$jsBody = if ($isPrefixed) { $jsRaw.Substring($expectedJsPrefix.Length).TrimEnd("`r`n; ") } else { "" }
$jsonBody = $jsonRaw.Trim()
$isMatch = ($jsBody.Length -eq $jsonBody.Length)
Write-Host "Kích thước dữ liệu JSON và JS khớp nhau: $isMatch" -ForegroundColor Green
