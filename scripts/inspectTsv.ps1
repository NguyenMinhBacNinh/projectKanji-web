[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$f = Get-Item 'data\jpn_sentences.tsv'
Write-Host "File size: $($f.Length) bytes ($([Math]::Round($f.Length / 1MB, 2)) MB)"

$sample = Get-Content 'data\jpn_sentences.tsv' -TotalCount 10
foreach ($s in $sample) {
    Write-Host $s
}
