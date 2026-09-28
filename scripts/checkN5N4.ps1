[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$db = [System.IO.File]::ReadAllText("kanji_full_database.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$rawJs = [System.IO.File]::ReadAllText("kanji-data.js", [System.Text.Encoding]::UTF8)

$mN5 = [regex]::Match($rawJs, 'N5\s*:\s*"([^"]+)"')
$n5Chars = $mN5.Groups[1].Value -split '\s+' | Where-Object { $_ }

Write-Host "=== N5 CHARACTERS WITH HÁN TỰ IN DB ==="
foreach ($c in $n5Chars) {
    $item = $db.psobject.Properties[$c].Value
    if ($item.hanViet -eq 'HÁN TỰ' -or [string]::IsNullOrWhiteSpace($item.hanViet)) {
        Write-Host "$c : hanViet = '$($item.hanViet)'"
    }
}
