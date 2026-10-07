[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$kjs = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)
if ($kjs -match 'N5\s*:\s*"([^"]+)"\.split\(" "\)') {
    $n5 = $matches[1] -split '\s+'
}

$templateList = @()
foreach ($k in $n5) {
    if ($db.psobject.Properties[$k]) {
        $ex = $db.psobject.Properties[$k].Value.example
        if ($ex -and ($ex.sentence -like '*この漢字は*' -or $ex.sentence -like '*と書きます*')) {
            $templateList += $k
        }
    }
}

Write-Host "Found $($templateList.Count) template kanji in N5:"
Write-Host ($templateList -join ' ')

# Show the first 5 examples as they are right now
Write-Host "`nCurrent examples for first 5:"
foreach ($k in $templateList[0..4]) {
    $ex = $db.psobject.Properties[$k].Value.example
    Write-Host "$($k): $($ex.sentence) => $($ex.translation)"
}
