[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$checkList = @('味', '品', '員', '問', '図')

Write-Host "=== 5 KANJI ĐẦU TIÊN BẮT ĐẦU TỪ 味 ==="
foreach ($k in $checkList) {
    $info = $db.psobject.Properties[$k].Value
    Write-Host "Kanji: $k"
    Write-Host "  sentence: $($info.example.sentence)"
    Write-Host "  reading: $($info.example.reading)"
    Write-Host "  translation: $($info.example.translation)"
    $isTpl = ($info.example.sentence -match 'この漢字|この字|という漢字|という意味|と読みます')
    Write-Host "  isTemplate: $isTpl"
    Write-Host ""
}
