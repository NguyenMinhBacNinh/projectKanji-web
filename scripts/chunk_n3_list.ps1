[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('scripts/n3_bad_list.txt', [System.Text.Encoding]::UTF8)
$list = $raw -split " "

Write-Host "Total items in bad list: $($list.Count)"
$chunkSize = 60
$chunkIdx = 1

for ($i = 0; $i -lt $list.Count; $i += $chunkSize) {
    $count = [Math]::Min($chunkSize, $list.Count - $i)
    $chunk = $list[$i..($i + $count - 1)]
    Write-Host "`n=== CHUNK $chunkIdx ($count Kanji: $($chunk[0]) .. $($chunk[-1])) ==="
    Write-Host ($chunk -join ' ')
    $chunkIdx++
}
