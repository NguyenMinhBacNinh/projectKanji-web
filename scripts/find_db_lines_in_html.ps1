[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$html = [System.IO.File]::ReadAllText('index.html', [System.Text.Encoding]::UTF8)

$lines = $html -split "`n"
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match 'database|DICT_CACHE|loadLiveKanji|localFallback|exampleJp|exampleVn|exampleSentence') {
        Write-Host "Line $($i+1): $($lines[$i].Trim())"
    }
}
