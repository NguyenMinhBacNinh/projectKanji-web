$db = Get-Content -Raw -Encoding UTF8 .\kanji_full_database.json | ConvertFrom-Json
$levels = @("N5", "N4", "N3", "N2", "N1")
foreach ($lvl in $levels) {
    $chars = @($db.psobject.properties | Where-Object { $_.Value.level -eq $lvl })
    $sample = $chars[0].Value
    Write-Host "=== LEVEL $lvl : $($chars[0].Name) ==="
    Write-Host "HanViet: $($sample.hanViet)"
    Write-Host "Meaning: $($sample.meaning)"
    Write-Host "Example: $($sample.example.sentence)"
    Write-Host "Example Reading: $($sample.example.reading)"
    Write-Host "Example Trans: $($sample.example.translation)"
    Write-Host "Vocab Count: $($sample.vocab.Count)"
    foreach ($v in ($sample.vocab | Select-Object -First 3)) {
        Write-Host "  - Word: $($v.word), Reading: $($v.reading), Meaning: $($v.meaning_vi)"
    }
}
