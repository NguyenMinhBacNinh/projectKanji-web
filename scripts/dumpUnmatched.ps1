[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$csharpCode = @"
using System;
using System.IO;
using System.Text;
using System.Collections.Generic;

public class SentenceMatcher3 {
    public static Dictionary<string, List<string>> MatchSentences(string tsvPath, HashSet<string> targetKanji) {
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
                        if (list.Count < 20 && !list.Contains(sent)) {
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
foreach ($prop in $db.psobject.Properties) {
    [void]$allKanji.Add($prop.Name)
}

$results = [SentenceMatcher3]::MatchSentences((Resolve-Path 'data\jpn_sentences.tsv').Path, $allKanji)

$unmatchedList = @()
foreach ($prop in $db.psobject.Properties) {
    $k = $prop.Name
    if (-not $results.ContainsKey($k)) {
        $val = $prop.Value
        $vocabWords = @()
        if ($val.vocab) {
            foreach ($v in $val.vocab) {
                $vocabWords += "$($v.word) ($($v.meaning_vi))"
            }
        }
        $unmatchedList += [PSCustomObject]@{
            kanji = $k
            level = $val.level
            hanViet = $val.hanViet
            meaning = $val.meaning
            vocabs = ($vocabWords -join ', ')
        }
    }
}

Write-Host "Unmatched count: $($unmatchedList.Count)"
$unmatchedJson = $unmatchedList | ConvertTo-Json -Depth 3
[System.IO.File]::WriteAllText('data\unmatched_kanji.json', $unmatchedJson, [System.Text.Encoding]::UTF8)
Write-Host "Saved unmatched kanji details to data\unmatched_kanji.json"
