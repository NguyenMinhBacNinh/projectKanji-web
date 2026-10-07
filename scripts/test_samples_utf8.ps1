[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$db = Get-Content -Raw -Encoding UTF8 .\kanji_full_database.json | ConvertFrom-Json

function Show-Sample($lvl) {
    Write-Host "========== LEVEL $lvl =========="
    $chars = @($db.psobject.properties | Where-Object { $_.Value.level -eq $lvl })
    for ($i = 0; $i -lt [Math]::Min(3, $chars.Count); $i++) {
        $k = $chars[$i].Name
        $v = $chars[$i].Value
        Write-Host "Kanji: $k | HanViet: $($v.hanViet) | Meaning: $($v.meaning)"
        Write-Host "  Example: $($v.example.sentence)"
        Write-Host "  Trans: $($v.example.translation)"
        foreach ($voc in ($v.vocab | Select-Object -First 2)) {
            Write-Host "  Vocab: $($voc.word) [$($voc.reading)] -> $($voc.meaning_vi)"
        }
    }
}

Show-Sample "N5"
Show-Sample "N4"
Show-Sample "N3"
Show-Sample "N2"
Show-Sample "N1"
