[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$rawJson = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$dbJson = $rawJson | ConvertFrom-Json

$rawJs = [System.IO.File]::ReadAllText('kanji_full_database.js', [System.Text.Encoding]::UTF8)

# Find N3 list and indices
$n3List = @()
foreach ($p in $dbJson.psobject.Properties) {
    if ($p.Value.level -eq 'N3') {
        $n3List += $p.Name
    }
}

$idxTsuma = $n3List.IndexOf('妻')
$idxMusume = $n3List.IndexOf('娘')
$idxKon = $n3List.IndexOf('婚')
$idxFu = $n3List.IndexOf('婦')

Write-Host "Index trong N3:"
Write-Host "  妻: $idxTsuma"
Write-Host "  娘: $idxMusume"
Write-Host "  婚: $idxKon"
Write-Host "  婦: $idxFu"

Write-Host "`n=== RECORD 妻 (Ngay trước 娘) ==="
$dbJson.psobject.Properties['妻'].Value.example | Out-String | Write-Host

Write-Host "=== RECORD 娘 ==="
$dbJson.psobject.Properties['娘'].Value.example | Out-String | Write-Host

Write-Host "=== RECORD 婚 ==="
$dbJson.psobject.Properties['婚'].Value.example | Out-String | Write-Host

Write-Host "=== RECORD 婦 ==="
$dbJson.psobject.Properties['婦'].Value.example | Out-String | Write-Host

Write-Host "=== KIỂM TRA SỰ ĐỒNG BỘ GIỮA .JSON VÀ .JS ==="
Write-Host "kanji_full_database.js có câu thật của 妻: " ($rawJs.Contains('休みの日は妻と一緒に'))
Write-Host "kanji_full_database.js có template của 娘: " ($rawJs.Contains('この漢字は「娘」と書きます。'))
Write-Host "kanji_full_database.js có template của 婚: " ($rawJs.Contains('この漢字は「婚」と書きます。'))
