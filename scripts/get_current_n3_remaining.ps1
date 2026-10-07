[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$tplRegex = 'この漢字は|この字は|と書きます|という漢字|という意味|と読みます'

$remaining = [System.Collections.Generic.List[string]]::new()
$valid = [System.Collections.Generic.List[string]]::new()

foreach ($p in $db.psobject.Properties) {
    if ($p.Value.level -eq 'N3') {
        $k = $p.Name
        $s = if ($p.Value.example) { $p.Value.example.sentence } else { '' }
        if ([string]::IsNullOrWhiteSpace($s) -or ($s -match $tplRegex)) {
            $remaining.Add($k)
        } else {
            $valid.Add($k)
        }
    }
}

Write-Host "Total N3: $($valid.Count + $remaining.Count)"
Write-Host "Total Valid: $($valid.Count)"
Write-Host "Total Remaining: $($remaining.Count)"
Write-Host "Kanji đầu tiên còn thiếu: $($remaining[0])"
Write-Host "Kanji cuối cùng còn thiếu: $($remaining[-1])"

$batch20 = $remaining.GetRange(0, [Math]::Min(20, $remaining.Count))
Write-Host "`nBatch tiếp theo (20 Kanji): $($batch20 -join ' ')"

for ($i = 0; $i -lt $batch20.Count; $i++) {
    $k = $batch20[$i]
    $val = $db.psobject.Properties[$k].Value
    $vocabStrings = @()
    if ($val.vocab) {
        foreach ($v in $val.vocab) {
            $vocabStrings += "$($v.jp)"
        }
    }
    Write-Host "[$($i+1)] $k ($($val.hanViet)) : $($vocabStrings -join ', ')"
}
