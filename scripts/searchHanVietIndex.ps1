[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$indexContent = [System.IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)
$lines = $indexContent -split "`n"
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match 'hanViet|HAN_VIET') {
        Write-Host "Line $($i+1): $($lines[$i].Trim())"
    }
}
