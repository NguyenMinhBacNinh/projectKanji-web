[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$n4List = [System.Collections.Generic.List[PSCustomObject]]::new()
foreach ($p in $db.psobject.Properties) {
    if ($p.Value.level -eq 'N4') {
        $n4List.Add([PSCustomObject]@{
            kanji = $p.Name
            sentence = if ($p.Value.example) { $p.Value.example.sentence } else { '' }
            hasTemplate = if ($p.Value.example -and $p.Value.example.sentence -match 'この漢字|この字|という漢字|という意味') { $true } else { $false }
        })
    }
}

Write-Host "Total N4 in DB: $($n4List.Count)"
$ajiIndex = -1
for ($i = 0; $i -lt $n4List.Count; $i++) {
    if ($n4List[$i].kanji -eq '味') {
        $ajiIndex = $i
        break
    }
}

Write-Host "Index of 味: $ajiIndex"
Write-Host "Previous 5 Kanji before 味:"
for ($i = [Math]::Max(0, $ajiIndex - 5); $i -lt $ajiIndex; $i++) {
    Write-Host "$($n4List[$i].kanji): $($n4List[$i].sentence)"
}

Write-Host "From 味 onward (30 Kanji):"
$end = [Math]::Min($n4List.Count, $ajiIndex + 30)
for ($i = $ajiIndex; $i -lt $end; $i++) {
    Write-Host "$($n4List[$i].kanji) [Template=$($n4List[$i].hasTemplate)]: $($n4List[$i].sentence)"
}
