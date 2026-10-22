[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$rawDb = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $rawDb | ConvertFrom-Json

$allKanji = New-Object 'System.Collections.Generic.HashSet[string]'
$kanjiByLevel = @{
    'N5' = New-Object 'System.Collections.Generic.List[string]';
    'N4' = New-Object 'System.Collections.Generic.List[string]';
    'N3' = New-Object 'System.Collections.Generic.List[string]';
    'N2' = New-Object 'System.Collections.Generic.List[string]';
    'N1' = New-Object 'System.Collections.Generic.List[string]';
}

foreach ($prop in $db.psobject.Properties) {
    [void]$allKanji.Add($prop.Name)
    $lvl = $prop.Value.level
    if (-not $lvl) { $lvl = 'N1' }
    $kanjiByLevel[$lvl].Add($prop.Name)
}

Write-Host "Total Kanji to find sentences for: $($allKanji.Count)"

$stream = [System.IO.File]::OpenText('data\jpn_sentences.tsv')
$lineCount = 0
$matchedKanji = New-Object 'System.Collections.Generic.HashSet[string]'
$sentencesByKanji = @{}

while (-not $stream.EndOfStream) {
    $line = $stream.ReadLine()
    $lineCount++
    $parts = $line -split "`t"
    if ($parts.Length -ge 3) {
        $sent = $parts[2].Trim()
        if ($sent.Length -ge 8 -and $sent.Length -le 45 -and $sent -notmatch 'Muiriel|Tom|Mary|John') {
            $seenInSent = New-Object 'System.Collections.Generic.HashSet[string]'
            foreach ($c in $sent.ToCharArray()) {
                $strC = [string]$c
                if ($allKanji.Contains($strC) -and -not $seenInSent.Contains($strC)) {
                    [void]$seenInSent.Add($strC)
                    if (-not $sentencesByKanji.ContainsKey($strC)) {
                        $sentencesByKanji[$strC] = New-Object 'System.Collections.Generic.List[string]'
                        [void]$matchedKanji.Add($strC)
                    }
                    if ($sentencesByKanji[$strC].Count -lt 5) {
                        $sentencesByKanji[$strC].Add($sent)
                    }
                }
            }
        }
    }
}
$stream.Close()

Write-Host "Finished reading $lineCount lines."
Write-Host "Total matched Kanji: $($matchedKanji.Count) / $($allKanji.Count) ($([Math]::Round($matchedKanji.Count / $allKanji.Count * 100, 2))%)"

foreach ($lvl in @('N5', 'N4', 'N3', 'N2', 'N1')) {
    $list = $kanjiByLevel[$lvl]
    $mCount = 0
    foreach ($k in $list) {
        if ($matchedKanji.Contains($k)) { $mCount++ }
    }
    Write-Host "$lvl : $mCount / $($list.Count) matched"
}

# Check unmatched Kanji
$unmatched = @()
foreach ($k in $allKanji) {
    if (-not $matchedKanji.Contains($k)) {
        $unmatched += $k
    }
}
Write-Host "Unmatched count: $($unmatched.Count)"
if ($unmatched.Count -gt 0) {
    Write-Host "Sample unmatched: $($unmatched[0..[Math]::Min(20, $unmatched.Count - 1)] -join ', ')"
}
