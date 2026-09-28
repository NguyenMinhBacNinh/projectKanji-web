[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectRoot = (Resolve-Path "$ScriptDir/..").Path
$CandFile = Join-Path $ProjectRoot "data/n321_selected_candidates.json"
$CacheFile = Join-Path $ProjectRoot "data/gloss_translation_cache.json"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "BATCH TRANSLATION & CACHE CHO TOÀN BỘ N3, N2, N1" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Đọc cache hiện có nếu có
$glossCache = @{}
if (Test-Path $CacheFile) {
    $rawCache = [System.IO.File]::ReadAllText($CacheFile, [System.Text.Encoding]::UTF8)
    $objCache = $rawCache | ConvertFrom-Json
    foreach ($p in $objCache.psobject.Properties) {
        $glossCache[$p.Name] = $p.Value
    }
    Write-Host "[✓] Đã nạp $($glossCache.Count) mục từ điển cache có sẵn." -ForegroundColor Green
}

# 2. Đọc candidates JSON
$rawCand = [System.IO.File]::ReadAllText($CandFile, [System.Text.Encoding]::UTF8)
$candDb = $rawCand | ConvertFrom-Json

# 3. Thu thập các gloss cần dịch
$missingGlosses = New-Object System.Collections.Generic.List[string]
$seen = New-Object 'System.Collections.Generic.HashSet[string]'

foreach ($prop in $candDb.psobject.Properties) {
    foreach ($v in $prop.Value.vocab) {
        $clean = ($v.gloss -split ';')[0].Trim() -replace '\(.*?\)', '' -replace '^to\s+', '' -replace '^a\s+', '' -replace '^an\s+', '' -replace '^the\s+', ''
        $clean = $clean.Trim().ToLower()
        if ($clean -and -not $glossCache.ContainsKey($clean) -and -not $seen.Contains($clean)) {
            [void]$seen.Add($clean)
            $missingGlosses.Add($clean)
        }
    }
}

Write-Host "[*] Số glosses cần dịch mới: $($missingGlosses.Count)" -ForegroundColor Yellow

# Hàm chuẩn hóa nghĩa tiếng Việt ngắn gọn, tự nhiên
function Clean-Vietnamese([string]$vn) {
    $clean = $vn.Trim().ToLower()
    # Loại bỏ tiền tố không cần thiết
    $clean = $clean -replace '^sự\s+', '' -replace '^việc\s+', '' -replace '^tính\s+chất\s+', ''
    return $clean
}

# 4. Dịch theo batch (40 dòng mỗi batch)
$batchSize = 40
$totalBatches = [Math]::Ceiling($missingGlosses.Count / $batchSize)
$batchIndex = 0

for ($i = 0; $i -lt $missingGlosses.Count; $i += $batchSize) {
    $batchIndex++
    $count = [Math]::Min($batchSize, $missingGlosses.Count - $i)
    $chunk = $missingGlosses.GetRange($i, $count)

    $joined = [string]::Join("`n", $chunk)
    $url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=" + [System.Uri]::EscapeDataString($joined)

    $retry = 0
    $success = $false
    while ($retry -lt 3 -and -not $success) {
        try {
            $res = Invoke-RestMethod -Uri $url -Method Get -TimeoutSec 15
            $translatedLines = @()
            foreach ($item in $res[0]) {
                $t = $item[0]
                if ($t) {
                    # Tách các dòng bên trong nếu có
                    $lines = $t -split "`n"
                    foreach ($l in $lines) {
                        $trimmed = $l.Trim()
                        if ($trimmed) { $translatedLines += $trimmed }
                    }
                }
            }

            if ($translatedLines.Count -eq $chunk.Count) {
                for ($j = 0; $j -lt $chunk.Count; $j++) {
                    $orig = $chunk[$j]
                    $trans = Clean-Vietnamese $translatedLines[$j]
                    $glossCache[$orig] = $trans
                }
                $success = $true
            } else {
                # Trường hợp số dòng không khớp 1-1, gán từng phần tử
                for ($j = 0; $j -lt [Math]::Min($chunk.Count, $translatedLines.Count); $j++) {
                    $orig = $chunk[$j]
                    $trans = Clean-Vietnamese $translatedLines[$j]
                    $glossCache[$orig] = $trans
                }
                $success = $true
            }
        } catch {
            $retry++
            Start-Sleep -Milliseconds (500 * $retry)
        }
    }

    if ($batchIndex % 10 -eq 0 -or $batchIndex -eq $totalBatches) {
        Write-Host "  [Batch $batchIndex/$totalBatches] Đã dịch $([Math]::Min($i + $count, $missingGlosses.Count))/$($missingGlosses.Count) glosses..." -ForegroundColor Gray
        # Lưu cache trung gian định kỳ
        $cacheJson = $glossCache | ConvertTo-Json -Depth 2
        [System.IO.File]::WriteAllText($CacheFile, $cacheJson, [System.Text.Encoding]::UTF8)
    }

    Start-Sleep -Milliseconds 150
}

# 5. Lưu toàn bộ cache cuối cùng
$cacheJson = $glossCache | ConvertTo-Json -Depth 2
[System.IO.File]::WriteAllText($CacheFile, $cacheJson, [System.Text.Encoding]::UTF8)
Write-Host "[✓] Đã lưu hoàn tất $($glossCache.Count) glosses vào: $CacheFile" -ForegroundColor Green
