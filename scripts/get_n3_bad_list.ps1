[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$tplRegex = 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

$n3Bad = @()
$n3Good = @()

foreach ($p in $db.psobject.Properties) {
    if ($p.Value.level -eq 'N3') {
        $k = $p.Name
        $s = if ($p.Value.example) { $p.Value.example.sentence } else { '' }
        if ([string]::IsNullOrWhiteSpace($s) -or ($s -match $tplRegex)) {
            $n3Bad += $k
        } else {
            $n3Good += $k
        }
    }
}

Write-Host "Total N3: $($n3Good.Count + $n3Bad.Count)"
Write-Host "N3 Good: $($n3Good.Count)"
Write-Host "N3 Bad: $($n3Bad.Count)"
[System.IO.File]::WriteAllText('scripts/n3_bad_list.txt', ($n3Bad -join ' '), [System.Text.Encoding]::UTF8)
Write-Host "Saved to scripts/n3_bad_list.txt"
