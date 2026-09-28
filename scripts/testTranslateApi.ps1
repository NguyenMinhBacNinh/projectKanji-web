[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

try {
    $text = "politics`neconomics`nenvironment`nresponsibility`nexperience"
    $encoded = [System.Uri]::EscapeDataString($text)
    $url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=$encoded"
    $res = Invoke-RestMethod -Uri $url -Method Get -TimeoutSec 5
    Write-Host "Google Translate response:"
    foreach ($item in $res[0]) {
        Write-Host "  $($item[0])"
    }
} catch {
    Write-Host "Failed: $_"
}
