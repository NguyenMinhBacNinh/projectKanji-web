[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$tplRegex = 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

$totalN3 = 0
$templateList = [System.Collections.Generic.List[PSCustomObject]]::new()
$validList = [System.Collections.Generic.List[PSCustomObject]]::new()

foreach ($p in $db.psobject.Properties) {
    if ($p.Value.level -eq 'N3') {
        $totalN3++
        $k = $p.Name
        $s = if ($p.Value.example) { $p.Value.example.sentence } else { '' }
        if ([string]::IsNullOrWhiteSpace($s) -or ($s -match $tplRegex)) {
            $templateList.Add([PSCustomObject]@{
                Kanji = $k
                Sentence = $s
            })
        } else {
            $validList.Add([PSCustomObject]@{
                Kanji = $k
                Sentence = $s
            })
        }
    }
}

Write-Host "Tổng N3: $totalN3"
Write-Host "Số template tìm thấy: $($templateList.Count)"
Write-Host "Số hợp lệ hiện tại: $($validList.Count)"

# Output the list to a file for reference
$lines = @()
for ($i = 0; $i -lt $templateList.Count; $i++) {
    $lines += "$($i + 1). Kanji: $($templateList[$i].Kanji) | sentence: $($templateList[$i].Sentence)"
}
[System.IO.File]::WriteAllLines('scripts/n3_templates_found.txt', $lines, [System.Text.Encoding]::UTF8)

Write-Host "First 15 templates:"
for ($i = 0; $i -lt [Math]::Min(15, $templateList.Count); $i++) {
    Write-Host "$($i + 1). Kanji: $($templateList[$i].Kanji) -> sentence: $($templateList[$i].Sentence)"
}

Write-Host "`nCheck if 薬 is in template list:"
$yaku = $templateList | Where-Object { $_.Kanji -eq '薬' }
if ($yaku) {
    Write-Host "YES! 薬 is in template list: $($yaku.Sentence)"
} else {
    Write-Host "NO! 薬 is NOT in template list"
}
