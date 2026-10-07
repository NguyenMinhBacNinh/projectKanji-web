$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$levels = @(
    @{ lvl = "N5"; k = "%E4%B8%80" },
    @{ lvl = "N4"; k = "%E4%B8%8D" },
    @{ lvl = "N3"; k = "%E4%B8%8E" },
    @{ lvl = "N2"; k = "%E4%B8%A6" },
    @{ lvl = "N1"; k = "%E4%B8%81" }
)

foreach ($item in $levels) {
    $lvl = $item.lvl
    $k = $item.k
    $url = "file:///c:/Users/admin/Kanji-web/index.html?kanji=" + $k
    $lines = & $edgePath --headless --disable-gpu --dump-dom $url 2>$null
    $badgeLine = $lines | Where-Object { $_ -match "mainVocabLevelBadge" -and $_ -match "span" }
    Write-Host "Level: $lvl -> Found: $badgeLine"
}
