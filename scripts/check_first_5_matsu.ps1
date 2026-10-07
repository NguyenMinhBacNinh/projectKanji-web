[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$first5 = @('待', '心', '思', '急', '悪')

Write-Host "=== 5 KANJI ĐẦU TIÊN BẮT ĐẦU TỪ 待 ==="
foreach ($k in $first5) {
    $info = $db.psobject.Properties[$k].Value
    Write-Host "Kanji: $k"
    Write-Host "  sentence: $($info.example.sentence)"
    Write-Host "  translation: $($info.example.translation)"
    Write-Host ""
}

# Verify '待' specifically does not contain the template
$matsuSent = $db.psobject.Properties['待'].Value.example.sentence
Write-Host "Kiểm tra '待':"
Write-Host "  Câu hiện tại: $matsuSent"
$hasTpl = ($matsuSent -match 'この漢字は|この字は|と書きます')
Write-Host "  Có chứa template không: $hasTpl"
