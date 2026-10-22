[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$rawJs = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)
$m = [regex]::Match($rawJs, 'N1\s*:\s*"([^"]+)"')
if ($m.Success) {
    $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ }
    Write-Host "N1 count in kanji-data.js: $($chars.Count)"
}

$db = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$n1List = @()
$tplRegex = [regex]'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'
$n1Tpl = 0

foreach ($p in $db.psobject.Properties) {
    if ($p.Value.level -eq "N1") {
        $n1List += $p.Name
        if ($tplRegex.IsMatch($p.Value.example.sentence)) {
            $n1Tpl++
        }
    }
}

Write-Host "N1 count in kanji_full_database.json: $($n1List.Count)"
Write-Host "N1 currently with template: $n1Tpl"
Write-Host "Sample 20 N1 chars:" ($n1List[0..19] -join ' ')
