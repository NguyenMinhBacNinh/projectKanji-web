$db = Get-Content -Raw -Encoding UTF8 .\kanji_full_database.json | ConvertFrom-Json
$levels = @("N5", "N4", "N3", "N2", "N1")

foreach ($lvl in $levels) {
    $chars = @($db.psobject.properties | Where-Object { $_.Value.level -eq $lvl })
    Write-Host "=== $lvl has $($chars.Count) kanji ==="
    $validVocabs = 0
    $validEx = 0
    foreach ($c in $chars) {
        $val = $c.Value
        if ($val.vocab -and $val.vocab.Count -gt 0 -and $val.vocab[0].reading -ne '...') {
            $validVocabs += $val.vocab.Count
        }
        if ($val.example -and $val.example.sentence -and $val.example.sentence -notlike '*と書きます*') {
            $validEx++
        }
    }
    Write-Host "  Total Vocabs available: $validVocabs, Total valid examples: $validEx"
}
