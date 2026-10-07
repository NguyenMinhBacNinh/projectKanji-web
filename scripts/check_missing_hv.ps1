[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$db = Get-Content -Raw -Encoding UTF8 .\kanji_full_database.json | ConvertFrom-Json

# Extract fallback map from index.html
$indexHtml = Get-Content -Raw -Encoding UTF8 .\index.html
$hvMap = @{}
if ($indexHtml -match 'const HAN_VIET_FALLBACK_MAP = \{([^}]+)\}') {
    $matches[1] -split ',' | ForEach-Object {
        if ($_ -match '"([^"]+)":\s*"([^"]+)"') {
            $hvMap[$matches[1]] = $matches[2]
        }
    }
}

$levels = @('N5', 'N4', 'N3', 'N2', 'N1')
foreach ($lvl in $levels) {
    $chars = @($db.psobject.properties | Where-Object { $_.Value.level -eq $lvl })
    $missingHv = 0
    foreach ($c in $chars) {
        $k = $c.Name
        $val = $c.Value
        $hv = if ($val.hanViet -and $val.hanViet -ne 'HÁN TỰ' -and $val.hanViet -ne 'HÁN') { $val.hanViet } else { $hvMap[$k] }
        if (-not $hv -or $hv -eq 'HÁN TỰ') {
            $missingHv++
        }
    }
    Write-Host "Level $($lvl): Missing HanViet count = $($missingHv) / $($chars.Count)"
}
