[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$tplRegex = 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

$stats = @{
    N5 = @{ Total = 0; Valid = 0; Bad = 0 }
    N4 = @{ Total = 0; Valid = 0; Bad = 0 }
    N3 = @{ Total = 0; Valid = 0; Bad = 0 }
}

foreach ($p in $db.psobject.Properties) {
    $lvl = $p.Value.level
    if ($stats.ContainsKey($lvl)) {
        $stats[$lvl].Total++
        $s = if ($p.Value.example) { $p.Value.example.sentence } else { '' }
        if (-not [string]::IsNullOrWhiteSpace($s) -and ($s -notmatch $tplRegex)) {
            $stats[$lvl].Valid++
        } else {
            $stats[$lvl].Bad++
        }
    }
}

Write-Host "=== THỐNG KÊ TOÀN DIỆN HIỆN TẠI ==="
Write-Host "N5: $($stats['N5'].Valid) / $($stats['N5'].Total) (Bị template: $($stats['N5'].Bad))"
Write-Host "N4: $($stats['N4'].Valid) / $($stats['N4'].Total) (Bị template: $($stats['N4'].Bad))"
Write-Host "N3: $($stats['N3'].Valid) / $($stats['N3'].Total) (Bị template: $($stats['N3'].Bad))"
