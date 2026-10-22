[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$tplRegex = 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

$n3Bad = [System.Collections.Generic.List[string]]::new()

foreach ($p in $db.psobject.Properties) {
    if ($p.Value.level -eq 'N3') {
        $k = $p.Name
        $s = if ($p.Value.example) { $p.Value.example.sentence } else { '' }
        if ([string]::IsNullOrWhiteSpace($s) -or ($s -match $tplRegex)) {
            $n3Bad.Add($k)
        }
    }
}

Write-Host "Total bad Kanji: $($n3Bad.Count)"

$gSize = 52
for ($g = 0; $g -lt 5; $g++) {
    $start = $g * $gSize
    $len = [Math]::Min($gSize, $n3Bad.Count - $start)
    $group = $n3Bad.GetRange($start, $len)
    Write-Host "`nGroup $($g+1) ($len Kanji: $($group[0]) .. $($group[-1])):"
    Write-Host ($group -join ' ')
    [System.IO.File]::WriteAllText("scripts/n3_group$($g+1).txt", ($group -join ' '), [System.Text.Encoding]::UTF8)
}
