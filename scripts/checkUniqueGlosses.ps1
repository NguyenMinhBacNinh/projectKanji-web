[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$candDb = [System.IO.File]::ReadAllText("data/n321_selected_candidates.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$rawVetted = [System.IO.File]::ReadAllText("data/vetted_vocab_dict.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json

$knownMap = @{}
foreach ($p in $rawVetted.psobject.Properties) {
    $knownMap[$p.Name] = $p.Value
}

$uniqueGlosses = New-Object 'System.Collections.Generic.HashSet[string]'
$uniqueWords = New-Object 'System.Collections.Generic.HashSet[string]'

foreach ($prop in $candDb.psobject.Properties) {
    foreach ($v in $prop.Value.vocab) {
        if (-not $knownMap.ContainsKey($v.word)) {
            [void]$uniqueWords.Add($v.word)
            # Rút gọn gloss thành cụm nghĩa chính ngắn gọn
            $clean = ($v.gloss -split ';')[0].Trim() -replace '\(.*?\)', '' -replace '^to\s+', '' -replace '^a\s+', '' -replace '^an\s+', '' -replace '^the\s+', ''
            $clean = $clean.Trim().ToLower()
            if ($clean) {
                [void]$uniqueGlosses.Add($clean)
            }
        }
    }
}

Write-Host "Tổng số từ cần dịch: $($uniqueWords.Count)"
Write-Host "Tổng số unique glosses cần dịch: $($uniqueGlosses.Count)"
