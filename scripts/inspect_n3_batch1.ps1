[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$n3Chars = "与 両 乗 予 争 互 亡 交 他 付 件 任 伝 似 位 余 例 供 便 係 信 倒 候 値 偉 側 偶 備 働 優" -split " "

Write-Host "Batch 1 N3 count: $($n3Chars.Count)"

for ($i = 0; $i -lt $n3Chars.Count; $i++) {
    $k = $n3Chars[$i]
    $val = $db.psobject.Properties[$k].Value
    $vocabList = @()
    if ($val.vocab) {
        foreach ($v in $val.vocab) {
            $vocabList += "$($v.jp)"
        }
    }
    Write-Host "[$($i+1)] $k | HV: $($val.hanViet) | Nghĩa: $($val.meaning) | Vocab: $($vocabList -join ', ')"
}
