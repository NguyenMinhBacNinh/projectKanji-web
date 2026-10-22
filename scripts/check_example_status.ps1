param()

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$kanjiDataContent = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)

$levels = @('N5', 'N4', 'N3', 'N2', 'N1')
$kanjiByLevel = @{}

foreach ($lvl in $levels) {
    if ($kanjiDataContent -match "$lvl\s*:\s*""([^""]+)""\.split\("" ""\)") {
        $kanjiByLevel[$lvl] = $matches[1] -split "\s+"
    }
}

Write-Host "=== THỐNG KÊ KANJI THEO LEVEL ==="
$grandTotal = 0
$grandValid = 0
$grandTemplate = 0
$grandMissing = 0

foreach ($lvl in $levels) {
    $chars = $kanjiByLevel[$lvl]
    $totalLvl = $chars.Count
    $validLvl = 0
    $templateLvl = 0
    $missingLvl = 0
    
    foreach ($c in $chars) {
        $entry = $db.psobject.Properties[$c]
        if ($entry -and $entry.Value.example) {
            $ex = $entry.Value.example
            $sent = [string]$ex.sentence
            $trans = [string]$ex.translation
            if ($sent -and $trans -and ($sent -notlike "*と書きます。*") -and ($sent -notlike "*とかきます。*") -and ($sent -notlike "*この漢字は*")) {
                $validLvl++
            } elseif ($sent -like "*と書きます。*" -or $sent -like "*この漢字は*") {
                $templateLvl++
            } else {
                $missingLvl++
            }
        } else {
            $missingLvl++
        }
    }
    
    Write-Host "$lvl Total: $totalLvl | Hợp lệ (thực sự): $validLvl | Dạng mẫu (Template): $templateLvl | Thiếu/Rỗng: $missingLvl"
    $grandTotal += $totalLvl
    $grandValid += $validLvl
    $grandTemplate += $templateLvl
    $grandMissing += $missingLvl
}

Write-Host "-------------------------------------------"
Write-Host "TỔNG TOÀN BỘ: $grandTotal | Hợp lệ: $grandValid | Template: $grandTemplate | Thiếu: $grandMissing"
