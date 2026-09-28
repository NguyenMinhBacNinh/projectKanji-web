[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$db = [System.IO.File]::ReadAllText("kanji_full_database.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$rawJs = [System.IO.File]::ReadAllText("kanji-data.js", [System.Text.Encoding]::UTF8)

# Check user's specific test list
$testChars = @(
    @{ k = '未'; expected = 'VỊ' },
    @{ k = '末'; expected = 'MẠT' },
    @{ k = '束'; expected = 'THÚC' },
    @{ k = '杯'; expected = 'BÔI' },
    @{ k = '果'; expected = 'QUẢ' },
    @{ k = '格'; expected = 'CÁCH' },
    @{ k = '構'; expected = 'CẤU' },
    @{ k = '様'; expected = 'DẠNG' },
    @{ k = '権'; expected = 'QUYỀN' },
    @{ k = '横'; expected = 'HOÀNH' },
    @{ k = '機'; expected = 'CƠ' },
    @{ k = '欠'; expected = 'KHIẾM' },
    @{ k = '次'; expected = 'THỨ' },
    @{ k = '欲'; expected = 'DỤC' },
    @{ k = '歯'; expected = 'XỈ' },
    @{ k = '歳'; expected = 'TUẾ' }
)

Write-Host "`n=== 1. KIỂM TRA CÁC CHỮ VÍ DỤ CỦA NGƯỜI DÙNG ===" -ForegroundColor Cyan
$allTestPassed = $true
foreach ($t in $testChars) {
    $k = $t.k
    $expected = $t.expected
    $item = $db.psobject.Properties[$k].Value
    $hv = $item.hanViet
    $gridText = if ($hv.Length -gt 4) { $hv.Substring(0, 4) } else { $hv }
    
    $status = if ($hv -eq $expected) { "[PASS]" } else { "[FAIL]" }
    if ($status -eq "[FAIL]") { $allTestPassed = $false }
    
    Write-Host ("{0} {1} -> Thẻ: '{2,-6}' | Mục lục: '{3,-6}' | Kỳ vọng: '{4}'" -f $status, $k, $hv, $gridText, $expected)
}

Write-Host "`n=== 2. KIỂM TRA TOÀN BỘ 1972 KANJI N3, N2, N1 ===" -ForegroundColor Cyan
$levels = @('N3', 'N2', 'N1')
$hasError = $false

foreach ($lvl in $levels) {
    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ }
    
    $badChars = @()
    foreach ($c in $chars) {
        if (-not $db.psobject.Properties[$c]) {
            $badChars += "$c (Thiếu trong DB)"
            continue
        }
        $item = $db.psobject.Properties[$c].Value
        $hv = $item.hanViet
        if ([string]::IsNullOrWhiteSpace($hv) -or $hv -eq "HÁN" -or $hv -eq "HÁN TỰ") {
            $badChars += "$c ($hv)"
        }
    }
    
    if ($badChars.Count -gt 0) {
        Write-Host ("[-] " + $lvl + ": Có " + $badChars.Count + " chữ lỗi: " + ($badChars -join ', ')) -ForegroundColor Red
        $hasError = $true
    } else {
        Write-Host ("[✓] " + $lvl + ": Toàn bộ " + $chars.Count + " chữ hiển thị Hán Việt thực tế 100%!") -ForegroundColor Green
    }
}

if (-not $hasError -and $allTestPassed) {
    Write-Host "`n[✓✓✓] TOÀN BỘ KIỂM TRA ĐẠT CHUẨN 100%!" -ForegroundColor Green
} else {
    Write-Host "`n[X] Có lỗi phát hiện!" -ForegroundColor Red
}
