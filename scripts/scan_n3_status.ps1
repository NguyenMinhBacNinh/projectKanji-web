[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$n3Total = 0
$n3Valid = 0
$n3Template = 0
$n3TemplateList = @()
$n3ValidList = @()

$tplRegex = 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

foreach ($p in $db.psobject.Properties) {
    if ($p.Value.level -eq 'N3') {
        $n3Total++
        $k = $p.Name
        $s = if ($p.Value.example) { $p.Value.example.sentence } else { '' }
        if (-not [string]::IsNullOrWhiteSpace($s) -and ($s -notmatch $tplRegex)) {
            $n3Valid++
            $n3ValidList += $k
        } else {
            $n3Template++
            $n3TemplateList += $k
        }
    }
}

Write-Host "Tổng số Kanji N3: $n3Total"
Write-Host "N3 đã có example hợp lệ: $n3Valid"
Write-Host "N3 đang bị template: $n3Template"
Write-Host "5 chữ template đầu: $($n3TemplateList[0..4] -join ' ')"
if ($n3Valid -gt 0) {
    Write-Host "5 chữ hợp lệ đầu: $($n3ValidList[0..4] -join ' ')"
}
