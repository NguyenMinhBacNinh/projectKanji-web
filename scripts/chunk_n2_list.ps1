[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$rawJs = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)
$m = [regex]::Match($rawJs, 'N2\s*:\s*"([^"]+)"')
$chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ }

Write-Host "Total N2 characters: $($chars.Count)"

[System.IO.File]::WriteAllLines("scripts\n2_all_kanji.txt", $chars, [System.Text.Encoding]::UTF8)

# Chia thành 7 nhóm (khoảng 50-53 chữ / nhóm)
$groupSize = 53
$groupIndex = 1
for ($i = 0; $i -lt $chars.Count; $i += $groupSize) {
    $count = [Math]::Min($groupSize, $chars.Count - $i)
    $group = $chars[$i..($i + $count - 1)]
    $outFile = "scripts\n2_group$groupIndex.txt"
    [System.IO.File]::WriteAllText($outFile, ($group -join " "), [System.Text.Encoding]::UTF8)
    Write-Host "Group $groupIndex ($count Kanji): $($group[0]) .. $($group[$count - 1]) -> $outFile"
    $groupIndex++
}
