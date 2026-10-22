[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$kanjiDataContent = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)
if ($kanjiDataContent -match 'N5\s*:\s*"([^"]+)"\.split\(" "\)') {
    $n5 = $matches[1] -split "\s+"
}

Write-Host "Total N5 kanji: $($n5.Count)"
$missing = @()
foreach ($k in $n5) {
    if (-not $db.psobject.Properties[$k]) {
        $missing += $k
    }
}
Write-Host "Missing in DB: $($missing -join ', ')"
Write-Host "First 50 N5 kanji: $($n5[0..49] -join ' ')"
