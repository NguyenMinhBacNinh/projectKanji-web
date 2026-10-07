[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$rawJs = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)
$m = [regex]::Match($rawJs, 'N1\s*:\s*"([^"]+)"')
$chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ }

Write-Host "Total N1 characters: $($chars.Count)"

if (-not (Test-Path "scripts\n1_groups")) {
    New-Item -ItemType Directory -Path "scripts\n1_groups" | Out-Null
}

$groupSize = 50
$groupIndex = 1
for ($i = 0; $i -lt $chars.Count; $i += $groupSize) {
    $count = [Math]::Min($groupSize, $chars.Count - $i)
    $group = $chars[$i..($i + $count - 1)]
    $outFile = "scripts\n1_groups\n1_group$groupIndex.txt"
    [System.IO.File]::WriteAllText($outFile, ($group -join " "), [System.Text.Encoding]::UTF8)
    Write-Host "Group $groupIndex ($count Kanji): $($group[0]) .. $($group[$count - 1]) -> $outFile"
    $groupIndex++
}

Write-Host "Tổng số nhóm N1: $($groupIndex - 1)"
