[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$jsonPath = "kanji_full_database.json"
$jsPath = "kanji_full_database.js"

$rawJson = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$db = $rawJson | ConvertFrom-Json

$tplRegex = [regex]'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

$n3List = @()
$tplList = @()

foreach ($p in $db.psobject.Properties) {
    $k = $p.Name
    $val = $p.Value
    if ($val.level -eq "N3") {
        $n3List += $k
        $s = $val.example.sentence
        if ($tplRegex.IsMatch($s)) {
            $tplList += @{ kanji = $k; sentence = $s }
        }
    }
}

Write-Host "Tổng N3 trong DB: $($n3List.Count)"
Write-Host "Template tìm thấy trong N3: $($tplList.Count)"

if ($tplList.Count -gt 0) {
    Write-Host "`nCÁC KANJI N3 CÒN BỊ TEMPLATE:"
    $tplList | ForEach-Object { Write-Host "$($_.kanji) : $($_.sentence)" }
    exit 1
} else {
    Write-Host "XÁC NHẬN: 100% 369 Kanji N3 KHÔNG CÒN BẤT KỲ TEMPLATE NÀO!"
}

# Kiểm tra N4 và N5
$n4Tpl = 0
$n4Total = 0
$n5Tpl = 0
$n5Total = 0

foreach ($p in $db.psobject.Properties) {
    $val = $p.Value
    if ($val.level -eq "N4") {
        $n4Total++
        if ($tplRegex.IsMatch($val.example.sentence)) { $n4Tpl++ }
    } elseif ($val.level -eq "N5") {
        $n5Total++
        if ($tplRegex.IsMatch($val.example.sentence)) { $n5Tpl++ }
    }
}

Write-Host "N4 Total: $n4Total (Template: $n4Tpl)"
Write-Host "N5 Total: $n5Total (Template: $n5Tpl)"

# 10 ví dụ N3 đã sửa bao gồm 薬
$samples = @("薬", "娘", "局", "掛", "深", "給", "港", "身", "猫", "髪")
Write-Host "`n=== 10 VÍ DỤ N3 ĐÃ SỬA (CÓ 薬 VÀ 娘) ==="
$i = 1
foreach ($sk in $samples) {
    $ex = $db.psobject.Properties[$sk].Value.example
    Write-Host "$i. Kanji: $sk"
    Write-Host "   sentence: $($ex.sentence)"
    Write-Host "   reading: $($ex.reading)"
    Write-Host "   translation: $($ex.translation)"
    $i++
}
