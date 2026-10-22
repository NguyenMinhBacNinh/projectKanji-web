[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$csharpCode = @"
using System;
using System.IO;
using System.Text;
using System.Collections.Generic;

public class SentenceMatcher2 {
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
                
                if (sent.Length < 6 || sent.Length > 55) continue;
                if (sent.Contains("Tom") || sent.Contains("Mary") || sent.Contains("John") || sent.Contains("Muiriel")) continue;

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
$byLevel = @{}

foreach ($prop in $db.psobject.Properties) {
    [void]$allKanji.Add($prop.Name)
    $lvl = $prop.Value.level
    if (-not $lvl) { $lvl = 'N1' }
    if (-not $byLevel.ContainsKey($lvl)) {
        $byLevel[$lvl] = @()
    }
    $byLevel[$lvl] += $prop.Name
}

$results = [SentenceMatcher2]::MatchSentences((Resolve-Path 'data\jpn_sentences.tsv').Path, $allKanji, 15)

foreach ($lvl in @('N5', 'N4', 'N3', 'N2', 'N1')) {
    $unmatchedInLvl = @()
    foreach ($k in $byLevel[$lvl]) {
        if (-not $results.ContainsKey($k)) {
            $unmatchedInLvl += $k
        }
    }
    Write-Host "$lvl Unmatched ($($unmatchedInLvl.Count)): $($unmatchedInLvl -join ' ')"
}
