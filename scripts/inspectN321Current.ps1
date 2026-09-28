[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$rawJs = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)
$rawDb = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $rawDb | ConvertFrom-Json

foreach ($lvl in @('N3', 'N2', 'N1')) {
    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ }
    Write-Host "=== Inspecting Level $lvl ($($chars.Count) Kanji) ==="
    $sample = $chars | Select-Object -First 3
    foreach ($c in $sample) {
        $e = $db.psobject.Properties[$c].Value
        Write-Host "Kanji: $c"
        if ($e.vocab) {
            foreach ($v in $e.vocab) {
                Write-Host "  word=$($v.word) | reading=$($v.reading) | meaning=$($v.meaning)"
            }
        } else {
            Write-Host "  NO VOCAB"
        }
    }
}
