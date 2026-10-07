[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$csharpCode = @"
using System;
using System.IO;
using System.Text;
using System.Collections.Generic;

public class SentenceMatcher {
    public static Dictionary<string, List<string>> MatchSentences(string tsvPath, HashSet<string> targetKanji, int maxPerKanji) {
        var results = new Dictionary<string, List<string>>();
        using (var reader = new StreamReader(tsvPath, Encoding.UTF8)) {
            string line;
            while ((line = reader.ReadLine()) != null) {
                int firstTab = line.IndexOf('\t');
                if (firstTab < 0) continue;
                int secondTab = line.IndexOf('\t', firstTab + 1);
                if (secondTab < 0) continue;
                string sent = line.Substring(secondTab + 1).Trim();
                
                // Length check
                if (sent.Length < 8 || sent.Length > 45) continue;
                if (sent.Contains("Tom") || sent.Contains("Mary") || sent.Contains("John") || sent.Contains("Muiriel")) continue;

                // Match characters
                for (int i = 0; i < sent.Length; i++) {
                    string ch = sent.Substring(i, 1);
                    if (targetKanji.Contains(ch)) {
                        List<string> list;
                        if (!results.TryGetValue(ch, out list)) {
                            list = new List<string>();
                            results[ch] = list;
                        }
                        if (list.Count < maxPerKanji && !list.Contains(sent)) {
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

Write-Host "Total Kanji to find: $($allKanji.Count)"
$sw = [System.Diagnostics.Stopwatch]::StartNew()
$results = [SentenceMatcher]::MatchSentences((Resolve-Path 'data\jpn_sentences.tsv').Path, $allKanji, 10)
$sw.Stop()
Write-Host "C# matching took: $($sw.ElapsedMilliseconds) ms"
Write-Host "Matched Kanji count: $($results.Count) / $($allKanji.Count) ($([Math]::Round($results.Count / $allKanji.Count * 100, 2))%)"

foreach ($lvl in @('N5', 'N4', 'N3', 'N2', 'N1')) {
    $list = $kanjiByLevel[$lvl]
    $mCount = 0
    foreach ($k in $list) {
        if ($results.ContainsKey($k)) { $mCount++ }
    }
    Write-Host "$lvl : $mCount / $($list.Count) matched"
}

$unmatched = @()
foreach ($k in $allKanji) {
    if (-not $results.ContainsKey($k)) {
        $unmatched += $k
    }
}
Write-Host "Unmatched: $($unmatched.Count)"
if ($unmatched.Count -gt 0) {
    Write-Host "Sample unmatched ($($unmatched.Count)): $($unmatched[0..[Math]::Min(20, $unmatched.Count - 1)] -join ', ')"
}
