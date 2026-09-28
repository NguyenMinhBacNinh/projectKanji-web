[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$candDb = [System.IO.File]::ReadAllText("data/n321_selected_candidates.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json

$glossFreq = @{}
$sampleEntries = @()

foreach ($prop in $candDb.psobject.Properties) {
    foreach ($v in $prop.Value.vocab) {
        $firstGloss = ($v.gloss -split ';')[0].Trim().ToLower() -replace '\(.*?\)', '' -replace '^to\s+', '' -replace '^a\s+', '' -replace '^an\s+', '' -replace '^the\s+', ''
        $firstWord = ($firstGloss -split '\s+')[0].Trim()
        if ($firstWord) {
            $glossFreq[$firstWord] = [int]$glossFreq[$firstWord] + 1
        }
    }
}

Write-Host "Top 40 từ tiếng Anh đầu tiên trong gloss:"
$glossFreq.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 40 | ForEach-Object {
    Write-Host "  $($_.Key) : $($_.Value)"
}
