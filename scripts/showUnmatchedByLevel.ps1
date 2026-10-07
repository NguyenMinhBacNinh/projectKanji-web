[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$data = Get-Content 'data\unmatched_kanji.json' -Raw -Encoding UTF8 | ConvertFrom-Json
Write-Host "Unmatched Kanji list ($($data.Count)):"
$byLevel = @{}
foreach ($item in $data) {
    $lvl = $item.level
    if (-not $byLevel.ContainsKey($lvl)) { $byLevel[$lvl] = @() }
    $byLevel[$lvl] += $item.kanji
}

foreach ($lvl in @('N5', 'N4', 'N3', 'N2', 'N1')) {
    if ($byLevel.ContainsKey($lvl)) {
        Write-Host "$lvl ($($byLevel[$lvl].Count)): $($byLevel[$lvl] -join ' ')"
    }
}
