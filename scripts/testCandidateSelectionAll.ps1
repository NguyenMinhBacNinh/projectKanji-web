[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectRoot = (Resolve-Path "$ScriptDir/..").Path
$JmdictXml = Join-Path $ProjectRoot "data/JMdict_e.xml"
$KanjiDataFile = Join-Path $ProjectRoot "kanji-data.js"
$DbJsonFile = Join-Path $ProjectRoot "kanji_full_database.json"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "TEST SELECTION CHO TOÀN BỘ N3, N2, N1 (1972 KANJI)" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

$rawJs = [System.IO.File]::ReadAllText($KanjiDataFile, [System.Text.Encoding]::UTF8)
$rawDb = [System.IO.File]::ReadAllText($DbJsonFile, [System.Text.Encoding]::UTF8)
$database = $rawDb | ConvertFrom-Json

$levels = @('N3', 'N2', 'N1')
$targetByLevel = @{}
$allTargets = New-Object System.Collections.Generic.List[string]
$targetSet  = New-Object 'System.Collections.Generic.HashSet[string]'
$levelMap   = @{}

foreach ($lvl in @('N5', 'N4', 'N3', 'N2', 'N1')) {
    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    if ($m.Success) {
        $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ }
        foreach ($c in $chars) {
            $levelMap[$c] = $lvl
            if ($lvl -in $levels -and $database.psobject.Properties[$c]) {
                if (-not $targetByLevel.ContainsKey($lvl)) {
                    $targetByLevel[$lvl] = New-Object System.Collections.Generic.List[string]
                }
                $targetByLevel[$lvl].Add($c)
                $allTargets.Add($c)
                [void]$targetSet.Add($c)
            }
        }
    }
}

Write-Host "Mục tiêu: N3=$($targetByLevel['N3'].Count) | N2=$($targetByLevel['N2'].Count) | N1=$($targetByLevel['N1'].Count) | Tổng=$($allTargets.Count)"

$candidatesByKanji = @{}
foreach ($c in $allTargets) {
    $candidatesByKanji[$c] = New-Object System.Collections.Generic.List[object]
}

Write-Host "`n[*] Đang quét JMdict_e.xml (Single-pass streaming)..." -ForegroundColor Yellow
$sw = [System.Diagnostics.Stopwatch]::StartNew()

$curKebs = New-Object System.Collections.Generic.List[string]
$curRebs = New-Object System.Collections.Generic.List[string]
$curPris = New-Object 'System.Collections.Generic.HashSet[string]'
$curGlosses = New-Object System.Collections.Generic.List[string]
$curHasMisc = $false

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
        if ($curKebs.Count -gt 0 -and $curRebs.Count -gt 0) {
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
Write-Host "[✓] Quét xong JMdict trong $([Math]::Round($sw.Elapsed.TotalSeconds, 1))s." -ForegroundColor Green

# Scoring & Selection cho từng Level
$regNf = [regex]'^nf(\d{2})$'
$allSelectedWords = New-Object 'System.Collections.Generic.HashSet[string]'
$totalSelections = 0

foreach ($lvl in $levels) {
    $lvlCount = $targetByLevel[$lvl].Count
    Write-Host "`n--- Xử lý xếp hạng Level $lvl ($lvlCount Kanji) ---" -ForegroundColor Cyan
    $count4 = 0; $count3 = 0; $count2 = 0; $count1 = 0; $count0 = 0
    $lvlVocabCount = 0
    $zeroList = @()

    foreach ($tChar in $targetByLevel[$lvl]) {
        $candList = $candidatesByKanji[$tChar]
        $scored = foreach ($c in $candList) {
            $score = 0
            $word = $c.Word
            $nfVal = 999

            foreach ($p in $c.Pri) {
                if ($p -eq 'ichi1') { $score += 60 }
                elseif ($p -eq 'news1') { $score += 50 }
                elseif ($p -eq 'spec1') { $score += 40 }
                elseif ($p -eq 'ichi2') { $score += 25 }
                elseif ($p -eq 'news2') { $score += 20 }
                else {
                    $mNf = $regNf.Match($p)
                    if ($mNf.Success) {
                        $nfVal = [int]$mNf.Groups[1].Value
                        $score += (50 - $nfVal) * 2
                    }
                }
            }

            if ($word -match '[\u30A0-\u30FF0-9０-９]') { $score -= 400 }
            if ($word.Length -gt 5) { $score -= 400 }

            $chars = [char[]]$word
            $kanjiCount = 0
            $kanaCount = 0
            foreach ($ch in $chars) {
                $code = [int]$ch
                if (($code -ge 0x4E00 -and $code -le 0x9FFF) -or ($code -ge 0x3400 -and $code -le 0x4DBF)) {
                    $kanjiCount++
                } else {
                    $kanaCount++
                }
            }

            if ($kanjiCount -eq 1 -and $kanaCount -eq 0) { $score += 60 }
            if ($kanjiCount -eq 1 -and $kanaCount -gt 0 -and $chars[0] -eq [char]$tChar) { $score += 80 }
            if ($kanjiCount -eq 2 -and $kanaCount -eq 0) { $score += 60 }
            elseif ($kanjiCount -eq 3 -and $kanaCount -eq 0) { $score -= 15 }
            elseif ($kanjiCount -ge 4) { $score -= 500 }

            # Kiểm tra cấp độ của Kanji đi cùng
            foreach ($ch in $chars) {
                $chStr = [string]$ch
                if ($chStr -ne $tChar -and $levelMap.ContainsKey($chStr)) {
                    $cTier = $levelMap[$chStr]
                    if ($lvl -eq 'N3') {
                        if ($cTier -in @('N5', 'N4', 'N3')) { $score += 35 }
                        elseif ($cTier -eq 'N2') { $score += 15 }
                        else { $score -= 20 }
                    } elseif ($lvl -eq 'N2') {
                        if ($cTier -in @('N5', 'N4', 'N3', 'N2')) { $score += 35 }
                        else { $score += 10 }
                    } else { # N1
                        $score += 25
                    }
                }
            }

            if ($c.HasMisc) { $score -= 200 }

            [PSCustomObject]@{
                Word    = $c.Word
                Reading = $c.Reading
                Score   = $score
                Nf      = $nfVal
                Gloss   = $c.Gloss
            }
        }

        $sorted = @($scored) | Sort-Object -Property @{ Expression = { [int]$_.Score }; Descending = $true }, @{ Expression = { [int]$_.Nf }; Descending = $false }
        $seenWord = @{}
        $seenReading = @{}
        $selected = @()
        foreach ($item in $sorted) {
            # Bỏ qua ứng viên có điểm quá âm (từ hiếm/xấu)
            if ($item.Score -lt -100) { continue }
            if (-not $seenWord.ContainsKey($item.Word) -and -not $seenReading.ContainsKey($item.Reading)) {
                $seenWord[$item.Word] = $true
                $seenReading[$item.Reading] = $true
                $selected += $item
                [void]$allSelectedWords.Add($item.Word)
                if ($selected.Count -ge 4) { break }
            }
        }

        $cCount = $selected.Count
        $lvlVocabCount += $cCount
        $totalSelections += $cCount
        if ($cCount -ge 4) { $count4++ }
        elseif ($cCount -eq 3) { $count3++ }
        elseif ($cCount -eq 2) { $count2++ }
        elseif ($cCount -eq 1) { $count1++ }
        else {
            $count0++
            $zeroList += "$tChar (raw candidates: $($candidatesByKanji[$tChar].Count))"
        }
    }

    Write-Host "Kết quả Level $($lvl):"
    Write-Host "  - 4 vocab: $count4"
    Write-Host "  - 3 vocab: $count3"
    Write-Host "  - 2 vocab: $count2"
    Write-Host "  - 1 vocab: $count1"
    Write-Host "  - 0 vocab: $count0"
    if ($zeroList.Count -gt 0) {
        Write-Host "  Danh sách Kanji 0 vocab: $($zeroList -join ', ')" -ForegroundColor Yellow
    }
    Write-Host "  - Tổng vocab của $($lvl): $lvlVocabCount"
}

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "TỔNG KẾT TOÀN BỘ N3 + N2 + N1" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Tổng số vocabulary được chọn: $totalSelections"
Write-Host "Số vocabulary từ vựng độc nhất (unique words): $($allSelectedWords.Count)"
