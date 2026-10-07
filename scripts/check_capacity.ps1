[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$db = Get-Content -Raw -Encoding UTF8 .\kanji_full_database.json | ConvertFrom-Json

$levels = @('N5', 'N4', 'N3', 'N2', 'N1')
foreach ($lvl in $levels) {
    $chars = @($db.psobject.properties | Where-Object { $_.Value.level -eq $lvl })
    $uniqueVocabs = [System.Collections.Generic.HashSet[string]]::new()
    $uniqueExamples = [System.Collections.Generic.HashSet[string]]::new()
    
    foreach ($c in $chars) {
        $val = $c.Value
        if ($val.vocab) {
            foreach ($v in $val.vocab) {
                if ($v.word -and $v.reading -and $v.reading -ne '...' -and $v.meaning_vi) {
                    $null = $uniqueVocabs.Add($v.word)
                }
            }
        }
        if ($val.example -and $val.example.sentence -and ($val.example.sentence -notlike '*と書きます*')) {
            $null = $uniqueExamples.Add($val.example.sentence)
        }
    }
    Write-Host "Level $($lvl): Chars=$($chars.Count), UniqueVocabs=$($uniqueVocabs.Count), UniqueExamples=$($uniqueExamples.Count)"
}
