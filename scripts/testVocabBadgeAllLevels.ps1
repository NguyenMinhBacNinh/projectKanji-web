$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$testCases = @(
    @{ level = "N5"; kanji = "%E4%B8%80" },
    @{ level = "N4"; kanji = "%E4%B8%8D" },
    @{ level = "N3"; kanji = "%E4%B8%8E" },
    @{ level = "N2"; kanji = "%E4%B8%A6" },
    @{ level = "N1"; kanji = "%E4%B8%81" }
)

Write-Host "=== TEST MAIN VOCAB LEVEL BADGE FOR ALL 5 LEVELS ===" -ForegroundColor Cyan

$allPassed = $true
$tmpDir = Join-Path $env:TEMP ("edge_test_" + [Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tmpDir | Out-Null

try {
    foreach ($tc in $testCases) {
        $lvl = $tc.level
        $k = $tc.kanji
        $url = "file:///c:/Users/admin/Kanji-web/index.html?kanji=" + $k
        $userDir = Join-Path $tmpDir $lvl
        
        $output = & $edgePath --headless --disable-gpu --user-data-dir="$userDir" --dump-dom $url 2>$null
        $dom = $output -join "`n"
        
        $match = [regex]::Match($dom, '<span id="mainVocabLevelBadge"[^>]*>([^<]+)</span>')
        
        if ($match.Success) {
            $actualText = $match.Groups[1].Value.Trim()
            if ($actualText -like "*$lvl*") {
                Write-Host ("[PASS] Level " + $lvl + ": " + $actualText) -ForegroundColor Green
            } else {
                Write-Host ("[FAIL] Level " + $lvl + ": Expected level " + $lvl + " but got: " + $actualText) -ForegroundColor Red
                $allPassed = $false
            }
        } else {
            Write-Host ("[FAIL] Badge not found for Level " + $lvl) -ForegroundColor Red
            $allPassed = $false
        }
    }
} finally {
    Remove-Item -Recurse -Force $tmpDir -ErrorAction SilentlyContinue
}

if ($allPassed) {
    Write-Host "`nAll 5 levels passed successfully!" -ForegroundColor Green
} else {
    Write-Host "`nSome tests failed." -ForegroundColor Red
}
