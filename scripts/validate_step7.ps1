[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$jsonPath = "kanji_full_database.json"
$jsPath = "kanji_full_database.js"

$rawJson = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$db = $rawJson | ConvertFrom-Json

$rawJs = [System.IO.File]::ReadAllText($jsPath, [System.Text.Encoding]::UTF8)
$expectedJsPrefix = "window.KANJI_FULL_DATABASE = "

# Check JS sync
$jsMatchesJson = $false
if ($rawJs.StartsWith($expectedJsPrefix)) {
    $jsBody = $rawJs.Substring($expectedJsPrefix.Length).TrimEnd(";", "`r", "`n", " ")
    if ($jsBody.Length -eq $rawJson.Length) {
        $jsMatchesJson = $true
    }
}

Write-Host "=== VALIDATION BƯỚC 7 ==="
Write-Host "JSON and JS synchronized: $jsMatchesJson"

$patterns = @(
    "この漢字は",
    "この字は",
    "と書きます",
    "という漢字です",
    "という意味です",
    "と読みます",
    "という漢字"
)

$n3Total = 0
$n3Templates = 0
$n3Valid = 0
$badN3List = @()

$n4Total = 0
$n4Templates = 0
$n5Total = 0
$n5Templates = 0

foreach ($prop in $db.psobject.Properties) {
    $k = $prop.Name
    $val = $prop.Value
    $lvl = $val.level
    $s = if ($val.example) { $val.example.sentence } else { "" }

    $isTpl = $false
    foreach ($p in $patterns) {
        if ($s -like "*$p*") {
            $isTpl = $true
            break
        }
    }

    if ($lvl -eq "N3") {
        $n3Total++
        if ($isTpl -or [string]::IsNullOrWhiteSpace($s)) {
            $n3Templates++
            $badN3List += "$k : $s"
        } else {
            $n3Valid++
        }
    } elseif ($lvl -eq "N4") {
        $n4Total++
        if ($isTpl) { $n4Templates++ }
    } elseif ($lvl -eq "N5") {
        $n5Total++
        if ($isTpl) { $n5Templates++ }
    }
}

Write-Host "Tổng N3: $n3Total"
Write-Host "N3 Hợp lệ: $n3Valid"
Write-Host "N3 Template còn lại: $n3Templates"
Write-Host "Tổng N4: $n4Total (Template: $n4Templates)"
Write-Host "Tổng N5: $n5Total (Template: $n5Templates)"

if ($n3Templates -gt 0) {
    Write-Host "CÁC KANJI N3 CÒN LỖI:"
    $badN3List | ForEach-Object { Write-Host $_ }
    exit 1
}

Write-Host "`n=== KIỂM TRA ĐẶC BIỆT KANJI 薬 ==="
$yaku = $db.薬.example
Write-Host "Kanji: 薬"
Write-Host "Sentence: $($yaku.sentence)"
Write-Host "Reading: $($yaku.reading)"
Write-Host "Translation: $($yaku.translation)"

Write-Host "`n=== 10 EXAMPLE N3 ĐÃ SỬA MẪU ==="
$sampleKeys = @("薬", "娘", "経", "改", "結", "深", "給", "港", "身", "髪")
$idx = 1
foreach ($sk in $sampleKeys) {
    $ex = $db.psobject.Properties[$sk].Value.example
    Write-Host "$idx. Kanji: $sk"
    Write-Host "   sentence: $($ex.sentence)"
    Write-Host "   reading: $($ex.reading)"
    Write-Host "   translation: $($ex.translation)"
    $idx++
}
