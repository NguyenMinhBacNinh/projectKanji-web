[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$jsonPath = "kanji_full_database.json"
$raw = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

# Find all N4 kanji in DB order
$n4All = [System.Collections.Generic.List[PSCustomObject]]::new()
foreach ($p in $db.psobject.Properties) {
    if ($p.Value.level -eq 'N4') {
        $n4All.Add([PSCustomObject]@{
            kanji = $p.Name
            index = $n4All.Count
            val = $p.Value
            isTemplate = ($p.Value.example -and ($p.Value.example.sentence -match 'この漢字|この字|という漢字|という意味'))
        })
    }
}

Write-Host "Tổng số Kanji N4: $($n4All.Count)"

# Find index of 味 and 待
$idxAji = -1
$idxMatsu = -1
for ($i = 0; $i -lt $n4All.Count; $i++) {
    if ($n4All[$i].kanji -eq '味') { $idxAji = $i }
    if ($n4All[$i].kanji -eq '待') { $idxMatsu = $i }
}

Write-Host "Index của 味: $idxAji"
Write-Host "Index của 待: $idxMatsu"

# Let's inspect the transition from valid to template in the whole N4 list!
$lastValidIdx = -1
$firstTemplateIdx = -1

for ($i = 0; $i -lt $n4All.Count; $i++) {
    if (-not $n4All[$i].isTemplate) {
        $lastValidIdx = $i
    } else {
        if ($firstTemplateIdx -eq -1) {
            $firstTemplateIdx = $i
        }
    }
}

Write-Host "Kanji hợp lệ cuối cùng trong N4: $($n4All[$lastValidIdx].kanji) (Index: $lastValidIdx)"
Write-Host "Kanji template đầu tiên trong N4: $($n4All[$firstTemplateIdx].kanji) (Index: $firstTemplateIdx)"

Write-Host "`n=== DANH SÁCH XUNG QUANH VÙNG CHUYỂN TIẾP (từ index 25 đến 35) ==="
for ($i = 25; $i -lt [Math]::Min($n4All.Count, 36); $i++) {
    $item = $n4All[$i]
    Write-Host "[$i] $($item.kanji) | isTemplate: $($item.isTemplate) | sentence: $($item.val.example.sentence)"
}

Write-Host "`n=== DANH SÁCH XUNG QUANH 待 (từ index [idxMatsu-2] đến [idxMatsu+3]) ==="
for ($i = [Math]::Max(0, $idxMatsu - 2); $i -lt [Math]::Min($n4All.Count, $idxMatsu + 4); $i++) {
    $item = $n4All[$i]
    Write-Host "[$i] $($item.kanji) | isTemplate: $($item.isTemplate) | sentence: $($item.val.example.sentence)"
    Write-Host "     reading: $($item.val.example.reading)"
    Write-Host "     translation: $($item.val.example.translation)"
}

Write-Host "`n=== KIỂM TRA CHI TIẾT 味 ==="
$itemAji = $n4All[$idxAji]
Write-Host "[$idxAji] $($itemAji.kanji) | isTemplate: $($itemAji.isTemplate)"
Write-Host "  sentence: $($itemAji.val.example.sentence)"
Write-Host "  reading: $($itemAji.val.example.reading)"
Write-Host "  translation: $($itemAji.val.example.translation)"

Write-Host "`n=== TÌM TẤT CẢ KANJI BỊ TEMPLATE TRONG N4 ==="
$templateList = @()
for ($i = 0; $i -lt $n4All.Count; $i++) {
    if ($n4All[$i].isTemplate) {
        $templateList += "$($n4All[$i].kanji)($i)"
    }
}
Write-Host "Tổng số Kanji N4 bị template: $($templateList.Count)"
Write-Host "5 chữ đầu bị template: $($templateList[0..4] -join ', ')"
