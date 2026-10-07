[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$tsvPath = "data\jpn_sentences.tsv"
if (-not (Test-Path $tsvPath)) {
    Write-Host "Không tìm thấy $tsvPath"
    exit 1
}

$db = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$n1Chars = @()
foreach ($p in $db.psobject.Properties) {
    if ($p.Value.level -eq "N1") {
        $n1Chars += $p.Name
    }
}
Write-Host "Total N1 characters: $($n1Chars.Count)"

$csharpCode = @"
using System;
using System.IO;
using System.Text;
using System.Collections.Generic;

public class TatoebaCoverage {
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
                
                if (sent.Length < 12 || sent.Length > 55) continue;
                if (sent.Contains("トム") || sent.Contains("メアリー") || sent.Contains("ジョン") || sent.Contains("ボブ") || sent.Contains("アリス")) continue;
                if (!sent.EndsWith("。") && !sent.EndsWith("？")) continue;
                if (sent.Contains("この漢字") || sent.Contains("と書きます")) continue;

                for (int i = 0; i < sent.Length; i++) {
                    string ch = sent.Substring(i, 1);
                    if (targetKanji.Contains(ch)) {
                        List<string> list;
                        if (!results.TryGetValue(ch, out list)) {
                            list = new List<string>();
                            results[ch] = list;
                        }
                        if (list.Count < 5 && !list.Contains(sent)) {
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

$targets = New-Object 'System.Collections.Generic.HashSet[string]'
foreach ($k in $n1Chars) { [void]$targets.Add($k) }

$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
$matched = [TatoebaCoverage]::MatchSentences((Resolve-Path $tsvPath).Path, $targets)
$stopwatch.Stop()

Write-Host "Match completed in $($stopwatch.ElapsedMilliseconds) ms"
Write-Host "Matched N1 Kanji: $($matched.Count) / $($n1Chars.Count)"

$unmatched = @()
foreach ($k in $n1Chars) {
    if (-not $matched.ContainsKey($k)) {
        $unmatched += $k
    }
}
Write-Host "Unmatched N1 Kanji: $($unmatched.Count)"
if ($unmatched.Count -gt 0) {
    Write-Host "Sample unmatched (first 20):" ($unmatched[0..([Math]::Min(19, $unmatched.Count - 1))] -join ' ')
}
