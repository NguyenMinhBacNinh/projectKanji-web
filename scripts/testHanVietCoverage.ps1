[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$rawDb = [System.IO.File]::ReadAllText("kanji_full_database.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$rawJs = [System.IO.File]::ReadAllText("kanji-data.js", [System.Text.Encoding]::UTF8)

# 1. Nạp từ hanviet.csv
$csvMap = @{}
foreach ($line in [System.IO.File]::ReadLines("data/hanviet.csv")) {
    $parts = $line -split ',', 3
    if ($parts.Count -ge 2) {
        $c = $parts[0].Trim()
        $hvRaw = $parts[1].Trim()
        # Parse ['thượng'] hoặc "['càn', 'kiền']"
        $m = [regex]::Matches($hvRaw, "['`"]([a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+)['`"]")
        if ($m.Count -gt 0) {
            $firstHv = $m[0].Groups[1].Value.Trim().ToUpper()
            if ($c -and $firstHv -and -not $csvMap.ContainsKey($c)) {
                $csvMap[$c] = $firstHv
            }
        }
    }
}
Write-Host "Đã nạp $($csvMap.Count) mục từ hanviet.csv."

# 2. Nạp từ xue_dictionary.json (các mục đơn ký tự)
Write-Host "Đang đọc xue_dictionary.json..."
$stream = [System.IO.File]::OpenRead("data/xue_dictionary.json")
$reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
$jsonText = $reader.ReadToEnd()
$reader.Close()
$stream.Close()

$xueEntries = $jsonText | ConvertFrom-Json
$xueMap = @{}
foreach ($item in $xueEntries) {
    if ($item.sv) {
        $hv = $item.sv.Trim().ToUpper()
        if ($item.s -and $item.s.Length -eq 1 -and -not $xueMap.ContainsKey($item.s)) {
            $xueMap[$item.s] = $hv
        }
        if ($item.t -and $item.t.Length -eq 1 -and -not $xueMap.ContainsKey($item.t)) {
            $xueMap[$item.t] = $hv
        }
    }
}
Write-Host "Đã nạp $($xueMap.Count) chữ đơn từ xue_dictionary.json."

# 3. Nạp HAN_VIET_FALLBACK_MAP từ index.html
$fallbackMap = @{}
$indexContent = [System.IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)
$mFb = [regex]::Match($indexContent, 'const HAN_VIET_FALLBACK_MAP\s*=\s*\{([^}]+)\}')
if ($mFb.Success) {
    $fbMatches = [regex]::Matches($mFb.Groups[1].Value, '"([^"]+)":\s*"([^"]+)"')
    foreach ($m in $fbMatches) {
        $fallbackMap[$m.Groups[1].Value] = $m.Groups[2].Value.ToUpper()
    }
}
Write-Host "Đã nạp $($fallbackMap.Count) từ HAN_VIET_FALLBACK_MAP."

# 4. Kiểm tra độ phủ cho toàn bộ 1972 Kanji N3, N2, N1
$levels = @('N3', 'N2', 'N1')
$totalTarget = 0
$matchedCount = 0
$unmatched = @()

foreach ($lvl in $levels) {
    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ -and $rawDb.psobject.Properties[$_] }
    foreach ($c in $chars) {
        $totalTarget++
        $foundHv = $null
        if ($fallbackMap.ContainsKey($c)) {
            $foundHv = $fallbackMap[$c]
        } elseif ($csvMap.ContainsKey($c)) {
            $foundHv = $csvMap[$c]
        } elseif ($xueMap.ContainsKey($c)) {
            $foundHv = $xueMap[$c]
        }

        if ($foundHv -and $foundHv -ne "HÁN TỰ" -and $foundHv -ne "HÁN") {
            $matchedCount++
        } else {
            $unmatched += [PSCustomObject]@{
                Char = $c
                Level = $lvl
            }
        }
    }
}

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "KẾT QUẢ ĐỐI SOÁT ĐỘ PHỦ HÁN VIỆT CHO N3, N2, N1" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Tổng số Kanji mục tiêu (N3+N2+N1): $totalTarget"
Write-Host "Số Kanji đã tìm được Hán Việt chuẩn: $matchedCount"
Write-Host "Số Kanji chưa có Hán Việt: $($unmatched.Count)"

if ($unmatched.Count -gt 0) {
    Write-Host "`nDanh sách $($unmatched.Count) chữ chưa có:"
    foreach ($u in $unmatched) {
        Write-Host "  $($u.Char) ($($u.Level))"
    }
}
