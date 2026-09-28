[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$rawJs = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)
$db = [System.IO.File]::ReadAllText("kanji_full_database.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json

$mN1 = [regex]::Match($rawJs, 'N1\s*:\s*"([^"]+)"')
$n1Chars = $mN1.Groups[1].Value -split '\s+' | Where-Object { $_ }

$n1Zero = @()
foreach ($c in $n1Chars) {
    $e = $db.psobject.Properties[$c].Value
    if (-not $e.vocab -or $e.vocab.Count -eq 0) {
        $n1Zero += $c
    }
}

Write-Host "Danh sách 13 chữ 0 vocab ở N1:"
foreach ($c in $n1Zero) {
    Write-Host "  $c"
}
