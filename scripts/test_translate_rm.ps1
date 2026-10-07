[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$q = [System.Uri]::EscapeDataString('薬を飲んだら、少し楽になりました。')
$url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=vi&dt=t&dt=rm&q=$q"
$res = Invoke-RestMethod -Uri $url

Write-Host "Translation: $($res[0][0][0])"
Write-Host "Romanization / translit: $($res[0][1][2])"
$res | ConvertTo-Json -Depth 4 | Write-Host
