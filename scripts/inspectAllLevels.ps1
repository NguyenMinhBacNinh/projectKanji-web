[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$rawJs = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)
$rawDb = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $rawDb | ConvertFrom-Json

$levels = @('N5', 'N4', 'N3', 'N2', 'N1')
$totalFromJs = 0
foreach ($lvl in $levels) {
    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ }
    $inDb = 0
    foreach ($c in $chars) {
        if ($db.psobject.Properties[$c]) { $inDb++ }
    }
    Write-Host "$lvl : $($chars.Count) Kanji in kanji-data.js | $inDb in database"
    $totalFromJs += $chars.Count
}

$dbTotal = ($db.psobject.Properties | Measure-Object).Count
Write-Host "Total Kanji in JS: $totalFromJs | Total Kanji in JSON DB: $dbTotal"
