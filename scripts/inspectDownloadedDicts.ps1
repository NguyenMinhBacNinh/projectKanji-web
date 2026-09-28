[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Kiểm tra hanviet.csv
$lines = [System.IO.File]::ReadLines("data/hanviet.csv") | Select-Object -First 20
Write-Host "--- 20 dòng đầu hanviet.csv ---"
foreach ($l in $lines) { Write-Host $l }

# Kiểm tra cấu trúc một vài Kanji trong xue_dictionary.json
$stream = [System.IO.File]::OpenRead("data/xue_dictionary.json")
$reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
$buffer = New-Object char[] 1500
$reader.Read($buffer, 0, 1500) | Out-Null
$reader.Close()
$stream.Close()
Write-Host "`n--- 1500 ký tự đầu xue_dictionary.json ---"
Write-Host ([string]::new($buffer))
