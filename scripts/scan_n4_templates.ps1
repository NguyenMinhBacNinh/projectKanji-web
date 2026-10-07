[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$n4All = @()
$n4Bad = @()
$n4Good = @()

$templateRegex = 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

foreach ($p in $db.psobject.Properties) {
    if ($p.Value.level -eq 'N4') {
        $k = $p.Name
        $ex = $p.Value.example
        $n4All += $k
        $sent = if ($ex) { $ex.sentence } else { '' }
        
        if ([string]::IsNullOrWhiteSpace($sent) -or ($sent -match $templateRegex)) {
            $n4Bad += [PSCustomObject]@{
                kanji = $k
                sentence = $sent
                reading = if ($ex) { $ex.reading } else { '' }
                translation = if ($ex) { $ex.translation } else { '' }
            }
        } else {
            $n4Good += $k
        }
    }
}

Write-Host "Tổng số Kanji N4: $($n4All.Count)"
Write-Host "Số N4 hợp lệ: $($n4Good.Count)"
Write-Host "Số N4 bị template/sai: $($n4Bad.Count)"

Write-Host "`nDanh sách N4 bị template/sai ($($n4Bad.Count) chữ):"
$badList = $n4Bad | ForEach-Object { $_.kanji }
Write-Host ($badList -join ' ')

# Also specifically check 味, 待, 曜
Write-Host "`nKiểm tra cụ thể 味, 待, 曜:"
foreach ($ch in @('味', '待', '曜')) {
    $item = $db.psobject.Properties[$ch].Value
    $s = if ($item.example) { $item.example.sentence } else { '(null)' }
    $isBad = ($s -match $templateRegex)
    Write-Host "  $($ch): sentence = '$s' [isBad = $isBad]"
}
