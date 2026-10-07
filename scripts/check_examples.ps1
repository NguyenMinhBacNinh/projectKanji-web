[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$samples = @('一', '二', '日', '月', '木', '金', '土', '何', '私', '学', '校')
foreach ($k in $samples) {
    if ($db.psobject.Properties[$k]) {
        $val = $db.psobject.Properties[$k].Value
        Write-Host "Kanji: $k"
        if ($val.example) {
            Write-Host "  reading:     $($val.example.reading)"
            Write-Host "  sentence:    $($val.example.sentence)"
            Write-Host "  translation: $($val.example.translation)"
        } else {
            Write-Host "  No example field!"
        }
    }
}
