[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$rawDb = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $rawDb | ConvertFrom-Json

$total = 0
$hasExample = 0
$templatePattern = 0
$distinctSentences = @{}
$validCount = 0

foreach ($prop in $db.psobject.Properties) {
    $total++
    $val = $prop.Value
    if ($val.example) {
        $hasExample++
        $sent = $val.example.sentence
        if ($sent) {
            if ($sent -like "*と書きます。*" -or $sent -like "*とかきます。*") {
                $templatePattern++
            } else {
                $validCount++
                if (-not $distinctSentences.ContainsKey($sent)) {
                    $distinctSentences[$sent] = @()
                }
                $distinctSentences[$sent] += $prop.Name
            }
        }
    }
}

Write-Host "Total Kanji: $total"
Write-Host "Has example field: $hasExample"
Write-Host "Template pattern ('と書きます。'): $templatePattern"
Write-Host "Non-template examples: $validCount"
Write-Host "Unique non-template sentences: $($distinctSentences.Count)"

# Let's inspect some non-template examples if any
if ($validCount -gt 0) {
    Write-Host "`nSample non-template examples:"
    $i = 0
    foreach ($k in $distinctSentences.Keys) {
        Write-Host "Kanji: $($distinctSentences[$k] -join ',') => Sent: $k"
        $i++
        if ($i -ge 10) { break }
    }
}
