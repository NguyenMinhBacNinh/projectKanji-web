[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$candDb = [System.IO.File]::ReadAllText("data/n321_selected_candidates.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json

$glossList = New-Object System.Collections.Generic.List[string]
$seen = New-Object 'System.Collections.Generic.HashSet[string]'

foreach ($prop in $candDb.psobject.Properties) {
    foreach ($v in $prop.Value.vocab) {
        $clean = ($v.gloss -split ';')[0].Trim() -replace '\(.*?\)', '' -replace '^to\s+', '' -replace '^a\s+', '' -replace '^an\s+', '' -replace '^the\s+', ''
        $clean = $clean.Trim().ToLower()
        if ($clean -and -not $seen.Contains($clean)) {
            [void]$seen.Add($clean)
            $glossList.Add($clean)
            if ($glossList.Count -ge 20) { break }
        }
    }
    if ($glossList.Count -ge 20) { break }
}

Write-Host "Mẫu 20 glosses đầu tiên:"
$joined = [string]::Join("`n", $glossList)
$url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=" + [System.Uri]::EscapeDataString($joined)
$res = Invoke-RestMethod -Uri $url -Method Get -TimeoutSec 10

$translated = @()
foreach ($item in $res[0]) {
    $t = $item[0].Trim()
    if ($t) { $translated += $t }
}

for ($i = 0; $i -lt [Math]::Min($glossList.Count, $translated.Count); $i++) {
    Write-Host "  $($glossList[$i]) -> $($translated[$i])"
}
