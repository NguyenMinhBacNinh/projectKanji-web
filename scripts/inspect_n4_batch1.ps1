[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$kjs = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)
if ($kjs -match 'N4\s*:\s*"([^"]+)"\.split\(" "\)') {
    $n4 = $matches[1] -split '\s+'
}

Write-Host "Total N4 Kanji: $($n4.Count)"

$templateN4 = @()
$validN4 = @()

foreach ($k in $n4) {
    if ($db.psobject.Properties[$k]) {
        $ex = $db.psobject.Properties[$k].Value.example
        $sent = if ($ex) { $ex.sentence } else { "" }
        if ($sent -and ($sent -notlike "*この漢字は*") -and ($sent -notlike "*と書きます*") -and ($sent -notlike "*この字は*") -and ($sent -notlike "*という漢字*")) {
            $validN4 += $k
        } else {
            $templateN4 += $k
        }
    } else {
        $templateN4 += $k
    }
}

Write-Host "Valid N4 examples: $($validN4.Count)"
Write-Host "Need update N4: $($templateN4.Count)"
Write-Host "`nFirst 30 N4 Kanji to process in Batch 1:"
$batch1 = $templateN4 | Select-Object -First 30
Write-Host ($batch1 -join ' ')

Write-Host "`nVocab list for the first 30 N4 Kanji:"
foreach ($k in $batch1) {
    $v = $db.psobject.Properties[$k].Value
    $vocabs = @()
    if ($v.vocab) {
        foreach ($w in $v.vocab) { $vocabs += $w.word }
    }
    Write-Host "$($k) ($($v.hanViet)): $($vocabs -join ', ')"
}
