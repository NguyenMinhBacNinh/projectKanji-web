$db = Get-Content -Raw -Encoding UTF8 .\kanji_full_database.json | ConvertFrom-Json
$kd = Get-Content -Raw -Encoding UTF8 .\kanji-data.js

# Check kanji counts in kanji-data.js
$n5_count = ($db.psobject.properties | Where-Object { $_.Value.level -eq 'N5' }).Count
$n4_count = ($db.psobject.properties | Where-Object { $_.Value.level -eq 'N4' }).Count
$n3_count = ($db.psobject.properties | Where-Object { $_.Value.level -eq 'N3' }).Count
$n2_count = ($db.psobject.properties | Where-Object { $_.Value.level -eq 'N2' }).Count
$n1_count = ($db.psobject.properties | Where-Object { $_.Value.level -eq 'N1' }).Count

Write-Host "Kanji per level in DB: N5=$n5_count, N4=$n4_count, N3=$n3_count, N2=$n2_count, N1=$n1_count"
