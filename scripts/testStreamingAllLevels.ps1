[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$ScriptDir = $PSScriptRoot
$ProjectRoot = (Resolve-Path "$ScriptDir/..").Path
$JmdictXml = Join-Path $ProjectRoot "data/JMdict_e.xml"
$KanjiDataFile = Join-Path $ProjectRoot "kanji-data.js"
$DbJsonFile = Join-Path $ProjectRoot "kanji_full_database.json"

$rawJs = [System.IO.File]::ReadAllText($KanjiDataFile, [System.Text.Encoding]::UTF8)
$rawDb = [System.IO.File]::ReadAllText($DbJsonFile, [System.Text.Encoding]::UTF8)
$database = $rawDb | ConvertFrom-Json

# Lấy toàn bộ Kanji N3, N2, N1
$levels = @('N3', 'N2', 'N1')
$targetList = New-Object System.Collections.Generic.List[string]
$targetSet  = New-Object 'System.Collections.Generic.HashSet[string]'
$levelMap   = @{}

foreach ($lvl in @('N5', 'N4', 'N3', 'N2', 'N1')) {
    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    if ($m.Success) {
        $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ }
        foreach ($c in $chars) {
            $levelMap[$c] = $lvl
            if ($lvl -in $levels -and $database.psobject.Properties[$c]) {
                $targetList.Add($c)
                [void]$targetSet.Add($c)
            }
        }
    }
}

Write-Host "Tổng số Kanji mục tiêu (N3 + N2 + N1): $($targetList.Count) chữ."

# Khởi tạo bảng ứng viên cho từng Kanji
$candidatesByKanji = @{}
foreach ($c in $targetList) {
    $candidatesByKanji[$c] = New-Object System.Collections.Generic.List[object]
}

Write-Host "Bắt đầu quét đơn kỳ JMdict XML..."
$sw = [System.Diagnostics.Stopwatch]::StartNew()

$curKebs = New-Object System.Collections.Generic.List[string]
$curRebs = New-Object System.Collections.Generic.List[string]
$curPris = New-Object 'System.Collections.Generic.HashSet[string]'
$curGlosses = New-Object System.Collections.Generic.List[string]
$curHasMisc = $false

$entryCount = 0

foreach ($line in [System.IO.File]::ReadLines($JmdictXml)) {
    if ($line.Contains('<keb>')) {
        $s = $line.IndexOf('<keb>') + 5
        $e = $line.IndexOf('</keb>', $s)
        if ($e -gt $s) { [void]$curKebs.Add($line.Substring($s, $e - $s)) }
    } elseif ($line.Contains('<reb>')) {
        if ($curRebs.Count -eq 0) {
            $s = $line.IndexOf('<reb>') + 5
            $e = $line.IndexOf('</reb>', $s)
            if ($e -gt $s) { [void]$curRebs.Add($line.Substring($s, $e - $s)) }
        }
    } elseif ($line.Contains('_pri>')) {
        $s = $line.IndexOf('_pri>') + 5
        $e = $line.IndexOf('</', $s)
        if ($e -gt $s) { [void]$curPris.Add($line.Substring($s, $e - $s)) }
    } elseif ($line.Contains('<gloss>')) {
        if ($curGlosses.Count -lt 2) {
            $s = $line.IndexOf('<gloss>') + 7
            $e = $line.IndexOf('</gloss>', $s)
            if ($e -gt $s) { [void]$curGlosses.Add($line.Substring($s, $e - $s)) }
        }
    } elseif ($line.Contains('<misc>&')) {
        if ($line -match '<misc>&(arch|rare|obsc|sl|col|id|yojik|sens|obs|vulg);</misc>') {
            $curHasMisc = $true
        }
    } elseif ($line.Contains('</entry>')) {
        $entryCount++
        if ($curKebs.Count -gt 0 -and $curRebs.Count -gt 0) {
            # Kiểm tra xem từ có chứa katakana, chữ số hay quá 4 kanji không
            $firstKeb = $curKebs[0]
            if ($firstKeb -notmatch '[\u30A0-\u30FF0-9０-９]' -and $firstKeb.Length -le 6) {
                $matchedChars = New-Object 'System.Collections.Generic.HashSet[string]'
                foreach ($keb in $curKebs) {
                    foreach ($c in $keb.ToCharArray()) {
                        $cStr = [string]$c
                        if ($targetSet.Contains($cStr)) {
                            [void]$matchedChars.Add($cStr)
                        }
                    }
                }

                if ($matchedChars.Count -gt 0) {
                    $reading = $curRebs[0]
                    $priArray = @($curPris)
                    $glossText = [string]::Join("; ", $curGlosses)

                    foreach ($tChar in $matchedChars) {
                        $bestKeb = $null
                        foreach ($keb in $curKebs) {
                            if ($keb.Contains($tChar)) {
                                $bestKeb = $keb
                                break
                            }
                        }
                        if ($bestKeb) {
                            [void]$candidatesByKanji[$tChar].Add([PSCustomObject]@{
                                Word    = $bestKeb
                                Reading = $reading
                                Pri     = $priArray
                                Gloss   = $glossText
                                HasMisc = $curHasMisc
                            })
                        }
                    }
                }
            }
        }

        $curKebs.Clear()
        $curRebs.Clear()
        $curPris.Clear()
        $curGlosses.Clear()
        $curHasMisc = $false
    }
}

$sw.Stop()
Write-Host "Quét xong $entryCount entries trong $([Math]::Round($sw.Elapsed.TotalSeconds, 1))s."

$totalCandidates = 0
$kanjiWithCandidates = 0
$kanjiZero = 0
foreach ($c in $targetList) {
    $count = $candidatesByKanji[$c].Count
    $totalCandidates += $count
    if ($count -gt 0) { $kanjiWithCandidates++ } else { $kanjiZero++ }
}

Write-Host "Tổng ứng viên thu được: $totalCandidates"
Write-Host "Kanji có ứng viên: $kanjiWithCandidates / $($targetList.Count)"
Write-Host "Kanji 0 ứng viên: $kanjiZero"

Write-Host "Danh sách Kanji 0 ứng viên:"
foreach ($c in $targetList) {
    if ($candidatesByKanji[$c].Count -eq 0) {
        Write-Host "  $c ($($levelMap[$c]))"
    }
}
