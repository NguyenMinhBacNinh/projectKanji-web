[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$kanjiList = @(
    '味', '品', '員', '問', '図', '地', '堂', '場', '売', '夏',
    '夕', '多', '夜', '妹', '姉', '始', '字', '安', '室', '家',
    '少', '屋', '工', '帰', '広', '店', '度', '建', '弟', '強'
)

foreach ($k in $kanjiList) {
    $info = $db.psobject.Properties[$k].Value
    $vocabList = @()
    if ($info.vocab) {
        foreach ($v in $info.vocab) {
            $vocabList += "$($v.jp) ($($v.vn))"
        }
    }
    Write-Host "Kanji: $k | HV: $($info.hanViet) | Nghĩa: $($info.meaning)"
    Write-Host "  Vocab: $($vocabList -join ', ')"
}
