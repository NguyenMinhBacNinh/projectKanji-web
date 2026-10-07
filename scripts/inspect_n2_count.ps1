[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$rawJs = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)
$m = [regex]::Match($rawJs, 'N2\s*:\s*"([^"]+)"')
if ($m.Success) {
    $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ }
    Write-Host "N2 count in kanji-data.js: $($chars.Count)"
} else {
    Write-Host "Không match N2 trong kanji-data.js"
}

$db = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$n2List = @()
$n2Templates = 0
$tplRegex = [regex]'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

foreach ($p in $db.psobject.Properties) {
    if ($p.Value.level -eq "N2") {
        $n2List += $p.Name
        if ($tplRegex.IsMatch($p.Value.example.sentence)) {
            $n2Templates++
        }
    }
}

Write-Host "N2 count in kanji_full_database.json: $($n2List.Count)"
Write-Host "N2 currently with template: $n2Templates"
Write-Host "Sample 20 N2 chars:" ($n2List[0..19] -join ' ')
