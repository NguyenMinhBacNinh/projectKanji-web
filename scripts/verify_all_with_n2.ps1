[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$jsonPath = "kanji_full_database.json"
$jsPath = "kanji_full_database.js"

$rawJson = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$db = $rawJson | ConvertFrom-Json

$tplRegex = [regex]'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

$stats = @{
    "N5" = @{ Total = 0; Tpl = 0; Valid = 0 }
    "N4" = @{ Total = 0; Tpl = 0; Valid = 0 }
    "N3" = @{ Total = 0; Tpl = 0; Valid = 0 }
    "N2" = @{ Total = 0; Tpl = 0; Valid = 0 }
}

foreach ($p in $db.psobject.Properties) {
    $lvl = $p.Value.level
    if ($stats.ContainsKey($lvl)) {
        $stats[$lvl].Total++
        $s = $p.Value.example.sentence
        if ([string]::IsNullOrWhiteSpace($s) -or $tplRegex.IsMatch($s)) {
            $stats[$lvl].Tpl++
        } else {
            $stats[$lvl].Valid++
        }
    }
}

Write-Host "=== THỐNG KÊ TỔNG THỂ TẤT CẢ CÁC CẤP ĐỘ ==="
foreach ($lvl in @("N5", "N4", "N3", "N2")) {
    $st = $stats[$lvl]
    Write-Host "$lvl : Tổng = $($st.Total) | Hợp lệ = $($st.Valid) | Bị template = $($st.Tpl)"
}

# Kiểm tra đồng bộ JS
$rawJs = [System.IO.File]::ReadAllText($jsPath, [System.Text.Encoding]::UTF8)
$isSync = $rawJs.StartsWith("window.KANJI_FULL_DATABASE = ") -and $rawJs.EndsWith(";")
Write-Host "Đồng bộ file JS: $isSync"

# 10 ví dụ mẫu N2
$sampleN2 = @("並", "営", "改", "昇", "温", "研", "費", "締", "齢", "貿")
# Lọc những chữ có trong N2 thực tế
$actualSamples = @("並", "営", "改", "昇", "温", "築", "課", "賢", "齢", "貿")
Write-Host "`n=== 10 VÍ DỤ N2 ĐÃ SỬA MẪU (GẦN GŨI ĐỜI SỐNG, CÔNG VIỆC, HỌC TẬP) ==="
$idx = 1
foreach ($sk in $actualSamples) {
    $ex = $db.psobject.Properties[$sk].Value.example
    Write-Host "$idx. Kanji: $sk"
    Write-Host "   sentence: $($ex.sentence)"
    Write-Host "   reading: $($ex.reading)"
    Write-Host "   translation: $($ex.translation)"
    $idx++
}
