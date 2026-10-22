$db = Get-Content -Raw -Encoding UTF8 .\kanji_full_database.json | ConvertFrom-Json
$levels = @("N5", "N4", "N3", "N2", "N1")
foreach ($lvl in $levels) {
    $c = @($db.psobject.properties | Where-Object { $_.Value.level -eq $lvl })
    $v = @($c | Where-Object { $_.Value.vocab -and $_.Value.vocab.Count -gt 0 -and $_.Value.vocab[0].reading -and $_.Value.vocab[0].reading -ne '...' })
    $e = @($c | Where-Object { $_.Value.example -and $_.Value.example.sentence -and ($_.Value.example.sentence -notlike '*と書きます*') })
    Write-Host "$lvl : Total=$($c.Count), WithVocab=$($v.Count), WithEx=$($e.Count)"
}
