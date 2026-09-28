[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$candDb = [System.IO.File]::ReadAllText("data/n321_selected_candidates.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$rawDb = [System.IO.File]::ReadAllText("kanji_full_database.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$rawVetted = [System.IO.File]::ReadAllText("data/vetted_vocab_dict.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json

$knownMap = @{}
# 1. Từ vetted dict
foreach ($p in $rawVetted.psobject.Properties) {
    $knownMap[$p.Name] = $p.Value
}
# 2. Từ N5 và N4 hiện tại
foreach ($p in $rawDb.psobject.Properties) {
    if ($p.Value.level -in @('N5', 'N4') -and $p.Value.vocab) {
        foreach ($v in $p.Value.vocab) {
            if ($v.word -and $v.meaning) {
                $knownMap[$v.word] = $v.meaning
            }
        }
    }
}

Write-Host "Tổng số từ đã có sẵn trong từ điển kiểm duyệt N5/N4: $($knownMap.Count)"

$alreadyKnown = 0
$needTranslation = 0
$uniqueNeed = New-Object 'System.Collections.Generic.HashSet[string]'

foreach ($prop in $candDb.psobject.Properties) {
    foreach ($v in $prop.Value.vocab) {
        if ($knownMap.ContainsKey($v.word)) {
            $alreadyKnown++
        } else {
            $needTranslation++
            [void]$uniqueNeed.Add($v.word)
        }
    }
}

Write-Host "Trong số 7662 entries của N3, N2, N1:"
Write-Host "  - Đã có sẵn trong từ điển đã dịch: $alreadyKnown entries"
Write-Host "  - Cần dịch nghĩa: $needTranslation entries ($($uniqueNeed.Count) từ độc nhất)"
