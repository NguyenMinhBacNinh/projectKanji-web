[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$db = Get-Content -Raw -Encoding UTF8 .\kanji_full_database.json | ConvertFrom-Json

$levels = @('N5', 'N4', 'N3', 'N2', 'N1')
foreach ($lvl in $levels) {
    $chars = @($db.psobject.properties | Where-Object { $_.Value.level -eq $lvl })
    Write-Host "Level $lvl: Total=$($chars.Count)"
}
