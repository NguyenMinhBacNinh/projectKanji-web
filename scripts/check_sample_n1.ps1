[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$raw = [System.IO.File]::ReadAllText("kanji_full_database.json", [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$sampleKeys = @('丁', '俊', '瞬', '策', '粋', '繁', '脈', '薫', '街', '誇', '輝', '響', '鼓')
foreach ($k in $sampleKeys) {
    $prop = $db.psobject.Properties[$k]
    if ($prop) {
        $val = $prop.Value
        Write-Host "Kanji: $k | Level: $($val.level) | Hanviet: $($val.hanviet)" -ForegroundColor Cyan
        Write-Host "Sentence: $($val.example.sentence)" -ForegroundColor White
        Write-Host "Reading:  $($val.example.reading)" -ForegroundColor Yellow
        Write-Host "Trans:    $($val.example.translation)" -ForegroundColor Green
        Write-Host "--------------------------------------------------"
    }
}
