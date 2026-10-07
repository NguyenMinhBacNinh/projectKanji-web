$html = (Invoke-WebRequest -Uri 'https://downloads.tatoeba.org/exports/per_language/jpn/' -UseBasicParsing).Content
$lines = $html -split "`n"
foreach ($l in $lines) {
    if ($l -match 'jpn-vie') {
        Write-Host $l
    }
}
