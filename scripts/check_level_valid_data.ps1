[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$db = Get-Content -Raw -Encoding UTF8 .\kanji_full_database.json | ConvertFrom-Json

$levels = @('N5', 'N4', 'N3', 'N2', 'N1')
foreach ($lvl in $levels) {
    $chars = @($db.psobject.properties | Where-Object { $_.Value.level -eq $lvl })
    Write-Host "Level $($lvl) - Total Kanji in DB: $($chars.Count)"
    
    # Check vocab list
    $vocabs = @()
    foreach ($c in $chars) {
        if ($c.Value.vocab) {
            foreach ($v in $c.Value.vocab) {
                if ($v.word -and $v.reading -and $v.reading -ne '...' -and $v.meaning_vi) {
                    $vocabs += [PSCustomObject]@{
                        Kanji = $c.Name
                        Word = $v.word
                        Reading = $v.reading
                        Meaning = $v.meaning_vi
                    }
                }
            }
        }
    }
    Write-Host "  Valid Vocabs count: $($vocabs.Count)"
    
    # Check examples
    $examples = @()
    foreach ($c in $chars) {
        if ($c.Value.example -and $c.Value.example.sentence -and ($c.Value.example.sentence -notlike '*と書きます*')) {
            $examples += [PSCustomObject]@{
                Kanji = $c.Name
                Sentence = $c.Value.example.sentence
                Reading = $c.Value.example.reading
                Translation = $c.Value.example.translation
            }
        }
    }
    Write-Host "  Valid Examples count: $($examples.Count)"
}
