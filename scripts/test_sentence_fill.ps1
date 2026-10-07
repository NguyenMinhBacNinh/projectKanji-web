[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$db = Get-Content -Raw -Encoding UTF8 .\kanji_full_database.json | ConvertFrom-Json

# Let's inspect some N5 kanji with examples
$n5Chars = @($db.psobject.properties | Where-Object { $_.Value.level -eq 'N5' })
Write-Host "N5 chars count: $($n5Chars.Count)"

$sampleEx = @()
foreach ($c in $n5Chars) {
    $val = $c.Value
    if ($val.example -and $val.example.sentence -and ($val.example.sentence -notlike '*と書きます*')) {
        # find if any vocab in $val.vocab appears in $val.example.sentence
        $matchedVocab = @()
        foreach ($voc in $val.vocab) {
            if ($voc.word -and $voc.word.Length -ge 1 -and $val.example.sentence.Contains($voc.word)) {
                $matchedVocab += $voc
            }
        }
        if ($matchedVocab.Count -gt 0) {
            $sampleEx += [PSCustomObject]@{
                Kanji = $c.Name
                Sentence = $val.example.sentence
                Reading = $val.example.reading
                Translation = $val.example.translation
                Vocab = $matchedVocab[0].word
                VocabReading = $matchedVocab[0].reading
                VocabMeaning = $matchedVocab[0].meaning_vi
            }
        }
    }
}

Write-Host "N5 examples with matching vocab in sentence: $($sampleEx.Count)"
foreach ($s in ($sampleEx | Select-Object -First 5)) {
    Write-Host "---"
    Write-Host "Kanji: $($s.Kanji)"
    Write-Host "Vocab: $($s.Vocab) [$($s.VocabReading)] -> $($s.VocabMeaning)"
    Write-Host "Sentence: $($s.Sentence)"
    Write-Host "Blank: $($s.Sentence.Replace($s.Vocab, '[ ? ]'))"
    Write-Host "Trans: $($s.Translation)"
}
