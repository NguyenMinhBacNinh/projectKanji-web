[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$html = [System.IO.File]::ReadAllText('index.html', [System.Text.Encoding]::UTF8)

# Find keys in KANJI_EXTENDED_DICT
$startIdx = $html.IndexOf('const KANJI_EXTENDED_DICT = {')
$endIdx = $html.IndexOf('const HAN_VIET_FALLBACK_MAP = {')
if ($startIdx -ge 0 -and $endIdx -gt $startIdx) {
    $sub = $html.Substring($startIdx, $endIdx - $startIdx)
    $lines = $sub -split "`r?`n"
    $currentKanji = ""
    $extDict = @{}
    foreach ($line in $lines) {
        if ($line -match '^\s*"([^"]+)":\s*\{') {
            $currentKanji = $matches[1]
            $extDict[$currentKanji] = @{}
        } elseif ($currentKanji -and $line -match 'exampleJp:\s*"([^"]+)"') {
            $extDict[$currentKanji]['exampleJp'] = $matches[1]
        } elseif ($currentKanji -and $line -match 'exampleVn:\s*"([^"]+)"') {
            $extDict[$currentKanji]['exampleVn'] = $matches[1]
        }
    }
    Write-Host "KANJI_EXTENDED_DICT has $($extDict.Count) kanji entries."
    $validExt = 0
    foreach ($k in $extDict.Keys) {
        $jp = $extDict[$k]['exampleJp']
        $vn = $extDict[$k]['exampleVn']
        if ($jp -and $vn -and ($jp -notmatch '^この漢字は')) {
            $validExt++
            Write-Host "$k => Jp: $jp | Vn: $vn"
        }
    }
    Write-Host "Valid non-template examples in KANJI_EXTENDED_DICT: $validExt"
}
