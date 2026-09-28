[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectRoot = (Resolve-Path "$ScriptDir/..").Path
$JmdictXml = Join-Path $ProjectRoot "data/JMdict_e.xml"
$KanjiDataFile = Join-Path $ProjectRoot "kanji-data.js"
$DbJsonFile = Join-Path $ProjectRoot "kanji_full_database.json"

Write-Host "--- TEST CANDIDATE SELECTION & TRANSLATION FOR N3 ---" -ForegroundColor Cyan

$rawJs = [System.IO.File]::ReadAllText($KanjiDataFile, [System.Text.Encoding]::UTF8)
$rawDb = [System.IO.File]::ReadAllText($DbJsonFile, [System.Text.Encoding]::UTF8)
$database = $rawDb | ConvertFrom-Json

# Lấy 369 Kanji N3
$mN3 = [regex]::Match($rawJs, 'N3\s*:\s*"([^"]+)"')
$n3Chars = $mN3.Groups[1].Value -split '\s+' | Where-Object { $_ -and $database.psobject.Properties[$_] }
Write-Host "Tổng số Kanji N3: $($n3Chars.Count)"

$targetSet = New-Object 'System.Collections.Generic.HashSet[string]'
$candidatesByKanji = @{}
foreach ($c in $n3Chars) {
    [void]$targetSet.Add($c)
    $candidatesByKanji[$c] = New-Object System.Collections.Generic.List[object]
}

# Quét JMdict cho N3
Write-Host "Đang quét JMdict cho N3..."
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
Write-Host "Quét xong trong $([Math]::Round($sw.Elapsed.TotalSeconds, 1))s."

# Thử nghiệm scoring cho 10 Kanji đầu tiên của N3
Write-Host "`n--- Mẫu 10 Kanji đầu tiên của N3 ---"
$regNf = [regex]'^nf(\d{2})$'

foreach ($targetChar in ($n3Chars | Select-Object -First 10)) {
    $candList = $candidatesByKanji[$targetChar]
    $scored = foreach ($c in $candList) {
        $score = 0
        $word = $c.Word
        $hasPri = $false
        $nfVal = 999

        foreach ($p in $c.Pri) {
            if ($p -eq 'ichi1') { $score += 60; $hasPri = $true }
            elseif ($p -eq 'news1') { $score += 50; $hasPri = $true }
            elseif ($p -eq 'spec1') { $score += 40; $hasPri = $true }
            elseif ($p -eq 'ichi2') { $score += 25; $hasPri = $true }
            elseif ($p -eq 'news2') { $score += 20; $hasPri = $true }
            else {
                $mNf = $regNf.Match($p)
                if ($mNf.Success) {
                    $nfVal = [int]$mNf.Groups[1].Value
                    $score += (50 - $nfVal) * 2
                    $hasPri = $true
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
        if ($kanjiCount -eq 1 -and $kanaCount -gt 0 -and $chars[0] -eq [char]$targetChar) { $score += 80 }
        if ($kanjiCount -eq 2 -and $kanaCount -eq 0) { $score += 60 }
        elseif ($kanjiCount -ge 4) { $score -= 500 }

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
        if (-not $seenWord.ContainsKey($item.Word) -and -not $seenReading.ContainsKey($item.Reading)) {
            $seenWord[$item.Word] = $true
            $seenReading[$item.Reading] = $true
            $selected += $item
            if ($selected.Count -ge 4) { break }
        }
    }

    $entry = $database.psobject.Properties[$targetChar].Value
    $selStr = ($selected | ForEach-Object { "$($_.Word) ($($_.Reading)) [score=$($_.Score)] gloss=$($_.Gloss)" }) -join " || "
    Write-Host "$targetChar ($($entry.hanViet)): $selStr"
}
