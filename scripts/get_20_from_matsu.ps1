[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$n4List = [System.Collections.Generic.List[string]]::new()
foreach ($p in $db.psobject.Properties) {
    if ($p.Value.level -eq 'N4') {
        $n4List.Add($p.Name)
    }
}

$idx = $n4List.IndexOf('待')
Write-Host "Index of 待: $idx"

$batch20 = $n4List.GetRange($idx, 20)
Write-Host "20 Kanji starting from 待: $($batch20 -join ' ')"

for ($i = 0; $i -lt $batch20.Count; $i++) {
    $k = $batch20[$i]
    $val = $db.psobject.Properties[$k].Value
    $vocabList = @()
    if ($val.vocab) {
        foreach ($v in $val.vocab) {
            $vocabList += "$($v.jp) ($($v.reading): $($v.vn))"
        }
    }
    Write-Host "[$($i+1)] $k | HV: $($val.hanViet) | Vocab: $($vocabList -join ', ')"
}
