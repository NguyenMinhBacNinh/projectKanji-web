[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$csharpCode = @"
using System;
using System.IO;
using System.Text;
using System.Collections.Generic;
using System.Linq;

public class SentenceCandidate {
    public string Sentence;
    public int Length;
    public bool HasVocab;
}

public class FastMatcher {
    public static Dictionary<string, List<string>> FindCandidates(string tsvPath, HashSet<string> targetKanji, Dictionary<string, List<string>> kanjiVocabs) {
        var results = new Dictionary<string, List<string>>();
        using (var reader = new StreamReader(tsvPath, Encoding.UTF8)) {
            string line;
            while ((line = reader.ReadLine()) != null) {
                int firstTab = line.IndexOf('\t');
                if (firstTab < 0) continue;
                int secondTab = line.IndexOf('\t', firstTab + 1);
                if (secondTab < 0) continue;
                string sent = line.Substring(secondTab + 1).Trim();
                
                if (sent.Length < 7 || sent.Length > 55) continue;
                if (sent.Contains("Tom") || sent.Contains("Mary") || sent.Contains("John") || sent.Contains("Muiriel") || sent.Contains("Alice") || sent.Contains("Bob")) continue;
                if (!sent.EndsWith("。") && !sent.EndsWith("？") && !sent.EndsWith("！") && !sent.EndsWith("!")) continue;

                // Match characters
                for (int i = 0; i < sent.Length; i++) {
                    string ch = sent.Substring(i, 1);
                    if (targetKanji.Contains(ch)) {
                        List<string> list;
                        if (!results.TryGetValue(ch, out list)) {
                            list = new List<string>();
                            results[ch] = list;
                        }
                        // Keep up to 50 candidates per kanji for plenty of variety
                        if (list.Count < 50 && !list.Contains(sent)) {
                            list.Add(sent);
                        }
                    }
                }
            }
        }
        return results;
    }
}
"@

Add-Type -TypeDefinition $csharpCode -Language CSharp

$rawDb = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $rawDb | ConvertFrom-Json

$allKanji = New-Object 'System.Collections.Generic.HashSet[string]'
$kanjiVocabs = New-Object 'System.Collections.Generic.Dictionary[string, System.Collections.Generic.List[string]]'
$kanjiLevel = @{}

foreach ($prop in $db.psobject.Properties) {
    $k = $prop.Name
    [void]$allKanji.Add($k)
    $kanjiLevel[$k] = if ($prop.Value.level) { $prop.Value.level } else { "N1" }
    $vList = New-Object 'System.Collections.Generic.List[string]'
    if ($prop.Value.vocab) {
        foreach ($v in $prop.Value.vocab) {
            if ($v.word) { $vList.Add($v.word) }
        }
    }
    $kanjiVocabs[$k] = $vList
}

Write-Host "Scanning Tatoeba..."
$sw = [System.Diagnostics.Stopwatch]::StartNew()
$candidates = [FastMatcher]::FindCandidates((Resolve-Path 'data\jpn_sentences.tsv').Path, $allKanji, $kanjiVocabs)
$sw.Stop()
Write-Host "Found candidates for $($candidates.Count) Kanji in $($sw.ElapsedMilliseconds) ms"

# Sort candidate sentences for each kanji by quality:
# - prefer containing kanji vocab
# - prefer length close to target (N5: 15, N4: 20, N3: 25, N2: 30, N1: 35)
$sortedKanji = $candidates.Keys | Sort-Object { $candidates[$_].Count }

$usedSentences = New-Object 'System.Collections.Generic.HashSet[string]'
$assigned = @{}

foreach ($k in $sortedKanji) {
    $list = $candidates[$k]
    $lvl = $kanjiLevel[$k]
    $idealLen = switch ($lvl) {
        'N5' { 16 }
        'N4' { 20 }
        'N3' { 25 }
        'N2' { 30 }
        default { 32 }
    }
    $vocabs = $kanjiVocabs[$k]
    
    # Score candidates
    $bestSent = $null
    $bestScore = -999999
    
    foreach ($sent in $list) {
        if ($usedSentences.Contains($sent)) { continue }
        
        $score = 100 - [Math]::Abs($sent.Length - $idealLen) * 2
        foreach ($w in $vocabs) {
            if ($sent.Contains($w)) {
                $score += 30
                break
            }
        }
        # Polite endings bonus
        if ($sent -match '(です|ます|でした|ました|ません|ましょう|てください|ています)。$') {
            $score += 15
        }
        
        if ($score -gt $bestScore) {
            $bestScore = $score
            $bestSent = $sent
        }
    }
    
    if ($bestSent) {
        $assigned[$k] = $bestSent
        [void]$usedSentences.Add($bestSent)
    }
}

Write-Host "Assigned unique Tatoeba sentences: $($assigned.Count) / $($allKanji.Count) ($([Math]::Round($assigned.Count / $allKanji.Count * 100, 2))%)"
Write-Host "Total unique sentences used: $($usedSentences.Count)"
Write-Host "Remaining unassigned Kanji: $($allKanji.Count - $assigned.Count)"
