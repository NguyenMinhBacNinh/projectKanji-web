[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$csharpCode = @"
using System;
using System.IO;
using System.Text;
using System.Collections.Generic;

public class TatoebaFinder {
    public static Dictionary<string, List<string>> MatchSentences(string tsvPath, HashSet<string> targetKanji, Dictionary<string, List<string>> kanjiVocabs) {
        var results = new Dictionary<string, List<string>>();
        using (var reader = new StreamReader(tsvPath, Encoding.UTF8)) {
            string line;
            while ((line = reader.ReadLine()) != null) {
                int firstTab = line.IndexOf('\t');
                if (firstTab < 0) continue;
                int secondTab = line.IndexOf('\t', firstTab + 1);
                if (secondTab < 0) continue;
                string sent = line.Substring(secondTab + 1).Trim();
                
                if (sent.Length < 12 || sent.Length > 45) continue;
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
                        if (list.Count < 30 && !list.Contains(sent)) {
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

# Romaji to Hiragana converter in C#
$romajiConverterCode = @"
using System;
using System.Text;
using System.Collections.Generic;

public class RomajiToHiragana {
    private static readonly Dictionary<string, string> Map = new Dictionary<string, string> {
        {"kya","きゃ"},{"kyu","きゅ"},{"kyo","きょ"},
        {"sha","しゃ"},{"shu","しゅ"},{"sho","しょ"},
        {"cha","ちゃ"},{"chu","ちゅ"},{"cho","ちょ"},
        {"nya","にゃ"},{"nyu","にゅ"},{"nyo","にょ"},
        {"hya","ひゃ"},{"hyu","ひゅ"},{"hyo","ひょ"},
        {"mya","みゃ"},{"myu","みゅ"},{"myo","みょ"},
        {"rya","りゃ"},{"ryu","りゅ"},{"ryo","りょ"},
        {"gya","ぎゃ"},{"gyu","ぎゅ"},{"gyo","ぎょ"},
        {"ja","じゃ"},{"ju","じゅ"},{"jo","じょ"},
        {"bya","びゃ"},{"byu","びゅ"},{"byo","びょ"},
        {"pya","ぴゃ"},{"pyu","ぴゅ"},{"pyo","ぴょ"},
        {"ka","か"},{"ki","き"},{"ku","く"},{"ke","け"},{"ko","こ"},
        {"sa","さ"},{"shi","し"},{"si","し"},{"su","す"},{"se","せ"},{"so","そ"},
        {"ta","た"},{"chi","ち"},{"ti","ち"},{"tsu","つ"},{"tu","つ"},{"te","て"},{"to","と"},
        {"na","な"},{"ni","に"},{"nu","ぬ"},{"ne","ね"},{"no","の"},
        {"ha","は"},{"hi","ひ"},{"fu","ふ"},{"hu","ふ"},{"he","へ"},{"ho","ほ"},
        {"ma","ま"},{"mi","み"},{"mu","む"},{"me","め"},{"mo","も"},
        {"ya","や"},{"yu","ゆ"},{"yo","よ"},
        {"ra","ら"},{"ri","り"},{"ru","る"},{"re","れ"},{"ro","ろ"},
        {"wa","わ"},{"wo","を"},
        {"ga","が"},{"gi","ぎ"},{"gu","ぐ"},{"ge","げ"},{"go","ご"},
        {"za","ざ"},{"ji","じ"},{"zi","じ"},{"zu","ず"},{"ze","ぜ"},{"zo","ぞ"},
        {"da","だ"},{"di","ぢ"},{"du","づ"},{"de","で"},{"do","ど"},
        {"ba","ば"},{"bi","び"},{"bu","ぶ"},{"be","べ"},{"bo","ぼ"},
        {"pa","ぱ"},{"pi","ぴ"},{"pu","ぷ"},{"pe","ぺ"},{"po","ぽ"},
        {"a","あ"},{"i","い"},{"u","う"},{"e","え"},{"o","お"},
        {"n","ん"}
    };

    public static string Convert(string romaji) {
        if (string.IsNullOrEmpty(romaji)) return "";
        string r = romaji.ToLower()
            .Replace("ō", "おう").Replace("ū", "う").Replace("ā", "あ").Replace("ī", "い").Replace("ē", "え")
            .Replace("oo", "おお").Replace("ou", "おう").Replace("uu", "う");
        
        var sb = new StringBuilder();
        int i = 0;
        while (i < r.Length) {
            char c = r[i];
            if (c == ' ' || c == '.' || c == ',' || c == '?' || c == '!' || c == '。' || c == '、' || c == '？' || c == '！') {
                if (c == '。' || c == '.') sb.Append("。");
                else if (c == '、' || c == ',') sb.Append("、");
                else if (c == '？' || c == '?') sb.Append("？");
                else if (c == '！' || c == '!') sb.Append("！");
                i++;
                continue;
            }

            // Double consonants (sokuon)
            if (i + 1 < r.Length && r[i] == r[i+1] && "bcdfghjklmpqrstvwxyz".IndexOf(r[i]) >= 0 && r[i] != 'n') {
                sb.Append("っ");
                i++;
                continue;
            }
            if (i + 1 < r.Length && r[i] == 't' && r[i+1] == 'c') {
                sb.Append("っ");
                i++;
                continue;
            }

            // Try 3-char match
            if (i + 3 <= r.Length && Map.ContainsKey(r.Substring(i, 3))) {
                sb.Append(Map[r.Substring(i, 3)]);
                i += 3;
                continue;
            }

            // Try 2-char match
            if (i + 2 <= r.Length && Map.ContainsKey(r.Substring(i, 2))) {
                sb.Append(Map[r.Substring(i, 2)]);
                i += 2;
                continue;
            }

            // Try 1-char match
            if (Map.ContainsKey(r.Substring(i, 1))) {
                sb.Append(Map[r.Substring(i, 1)]);
                i++;
                continue;
            }

            sb.Append(c);
            i++;
        }
        return sb.ToString();
    }
}
"@

Add-Type -TypeDefinition $romajiConverterCode -Language CSharp

$targets = New-Object 'System.Collections.Generic.HashSet[string]'
foreach ($k in @('薬', '局', '居', '差', '市')) { [void]$targets.Add($k) }

$vocabs = New-Object 'System.Collections.Generic.Dictionary[string, System.Collections.Generic.List[string]]'
$tsvPath = (Resolve-Path 'data/jpn_sentences.tsv').Path

$candidates = [TatoebaFinder]::MatchSentences($tsvPath, $targets, $vocabs)

Write-Host "Matched candidates count: $($candidates.Count)"

foreach ($k in $targets) {
    if ($candidates.ContainsKey($k) -and $candidates[$k].Count -gt 0) {
        $sent = $candidates[$k][0]
        # Query translate API
        $encoded = [System.Uri]::EscapeDataString($sent)
        $url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=vi&dt=t&dt=rm&q=$encoded"
        $res = Invoke-RestMethod -Uri $url
        $trans = $res[0][0][0]
        $romaji = ""
        if ($res[0].Count -ge 2 -and $res[0][1].Count -ge 4) {
            $romaji = $res[0][1][3]
        }
        $hira = [RomajiToHiragana]::Convert($romaji)
        Write-Host "Kanji: $k"
        Write-Host "  Sentence: $sent"
        Write-Host "  Trans: $trans"
        Write-Host "  Romaji: $romaji"
        Write-Host "  Hiragana: $hira"
        Write-Host ""
    }
}
