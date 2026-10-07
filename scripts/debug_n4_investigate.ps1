[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

Write-Host "=== KIỂM TRA 味 VÀ 待 TRONG kanji_full_database.json ==="
$k1 = $db.psobject.Properties['味'].Value
$k2 = $db.psobject.Properties['待'].Value

Write-Host "Kanji: 味"
Write-Host "  reading: $($k1.example.reading)"
Write-Host "  sentence: $($k1.example.sentence)"
Write-Host "  translation: $($k1.example.translation)"

Write-Host "Kanji: 待"
Write-Host "  reading: $($k2.example.reading)"
Write-Host "  sentence: $($k2.example.sentence)"
Write-Host "  translation: $($k2.example.translation)"

Write-Host "`n=== KIỂM TRA kanji_full_database.js ==="
$jsRaw = [System.IO.File]::ReadAllText('kanji_full_database.js', [System.Text.Encoding]::UTF8)
$hasAjiInJs = $jsRaw -match 'この料理は少し辛い味がしますが'
$hasMatsuInJs = $jsRaw -match 'この漢字は「待」と書きます。'
Write-Host "kanji_full_database.js có câu mới của 味: $hasAjiInJs"
Write-Host "kanji_full_database.js có câu template của 待: $hasMatsuInJs"
