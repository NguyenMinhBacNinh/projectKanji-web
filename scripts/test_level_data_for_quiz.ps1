[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$db = Get-Content -Raw -Encoding UTF8 .\kanji_full_database.json | ConvertFrom-Json

# Extract fallback map from index.html
$indexHtml = Get-Content -Raw -Encoding UTF8 .\index.html
$hvMap = @{}
if ($indexHtml -match 'const HAN_VIET_FALLBACK_MAP = \{([^}]+)\}') {
    $matches[1] -split ',' | ForEach-Object {
        if ($_ -match '"([^"]+)":\s*"([^"]+)"') {
            $hvMap[$matches[1]] = $matches[2]
        }
    }
}
Write-Host "HV Fallback Map loaded: $($hvMap.Count) entries"

$levels = @('N5', 'N4', 'N3', 'N2', 'N1')
foreach ($lvl in $levels) {
    $chars = @($db.psobject.properties | Where-Object { $_.Value.level -eq $lvl })
    
    # Count vocabs with valid word & reading & meaning
    $vocabs = @()
    $exList = @()
    foreach ($c in $chars) {
        $k = $c.Name
        $val = $c.Value
        $hv = if ($val.hanViet -and $val.hanViet -ne 'HÁN TỰ' -and $val.hanViet -ne 'HÁN') { $val.hanViet } else { $hvMap[$k] }
        if (-not $hv) { $hv = "HÁN TỰ" }
        
        if ($val.vocab) {
            foreach ($v in $val.vocab) {
                if ($v.word -and $v.word.Length -ge 1 -and $v.reading -and $v.reading -ne '...' -and $v.meaning_vi) {
                    $vocabs += [PSCustomObject]@{
                        Kanji = $k
                        HanViet = $hv
                        Word = $v.word
                        Reading = $v.reading
                        Meaning = $v.meaning_vi
                        Mnemonic = $val.mnemonic
                    }
                }
            }
        }
        
        if ($val.example -and $val.example.sentence -and ($val.example.sentence -notlike '*と書きます*')) {
            # Check if any vocab is in sentence
            foreach ($v in $val.vocab) {
                if ($v.word -and $v.word.Length -ge 2 -and $val.example.sentence.Contains($v.word)) {
                    $exList += [PSCustomObject]@{
                        Kanji = $k
                        HanViet = $hv
                        Word = $v.word
                        Reading = $v.reading
                        Meaning = $v.meaning_vi
                        Sentence = $val.example.sentence
                        ExampleReading = $val.example.reading
                        Translation = $val.example.translation
                        Mnemonic = $val.mnemonic
                    }
                    break
                }
            }
        }
    }
    
    Write-Host "Level $($lvl): Chars=$($chars.Count), ValidVocabs=$($vocabs.Count), UsableExamplesWithVocab=$($exList.Count)"
}
