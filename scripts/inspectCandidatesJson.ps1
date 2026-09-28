[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$candFile = "data/n321_selected_candidates.json"
$raw = [System.IO.File]::ReadAllText($candFile, [System.Text.Encoding]::UTF8)
$candDb = $raw | ConvertFrom-Json

$allWords = New-Object 'System.Collections.Generic.HashSet[string]'
$totalItems = 0
$byLevel = @{}

foreach ($prop in $candDb.psobject.Properties) {
    $c = $prop.Name
    $lvl = $prop.Value.level
    $vocabList = $prop.Value.vocab
    if (-not $byLevel.ContainsKey($lvl)) {
        $byLevel[$lvl] = @{ Kanji = 0; Vocab = 0 }
    }
    $byLevel[$lvl].Kanji++
    $byLevel[$lvl].Vocab += $vocabList.Count
    $totalItems += $vocabList.Count
    foreach ($v in $vocabList) {
        [void]$allWords.Add($v.word)
    }
}

Write-Host "Tổng số Kanji trong candidates: $(($candDb.psobject.Properties | Measure-Object).Count)"
foreach ($k in $byLevel.Keys) {
    Write-Host "  Level $k : $($byLevel[$k].Kanji) Kanji, $($byLevel[$k].Vocab) vocab"
}
Write-Host "Tổng số vocab entries: $totalItems"
Write-Host "Tổng số unique words: $($allWords.Count)"
