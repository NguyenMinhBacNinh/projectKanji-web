[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$rawJs = [System.IO.File]::ReadAllText('kanji-data.js', [System.Text.Encoding]::UTF8)
$rawDb = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $rawDb | ConvertFrom-Json

$levels = @('N5', 'N4', 'N3', 'N2', 'N1')
foreach ($lvl in $levels) {
    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ }
    $withVocab = 0
    $totalVocab = 0
    $englishVocab = 0
    $vietnameseVocab = 0
    foreach ($c in $chars) {
        $e = $db.psobject.Properties[$c].Value
        if ($e -and $e.vocab -and $e.vocab.Count -gt 0) {
            $withVocab++
            $totalVocab += $e.vocab.Count
            foreach ($v in $e.vocab) {
                # Kiểm tra xem meaning có thuần tiếng Anh hay không (e.g. bắt đầu bằng 'to ', hoặc không có dấu tiếng Việt và có từ tiếng Anh)
                if ($v.meaning -match '^[a-zA-Z\s,;\.\-\(\)\/]+$' -and $v.meaning -notmatch '[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]') {
                    $englishVocab++
                } else {
                    $vietnameseVocab++
                }
            }
        }
    }
    Write-Host "$lvl : Chars=$($chars.Count) | WithVocab=$withVocab | TotalVocab=$totalVocab | English=$englishVocab | Vietnamese=$vietnameseVocab"
}

Write-Host "`n--- Sample N3 Kanji (政, 経, 済) ---"
foreach ($k in @('政', '経', '済')) {
    $e = $db.psobject.Properties[$k].Value
    Write-Host "Kanji $k :"
    foreach ($v in $e.vocab) {
        Write-Host "  $($v.word) ($($v.reading)): $($v.meaning)"
    }
}

Write-Host "`n--- Sample N1 Kanji (鬱, 璧) ---"
foreach ($k in @('鬱', '璧')) {
    if ($db.psobject.Properties[$k]) {
        $e = $db.psobject.Properties[$k].Value
        Write-Host "Kanji $k :"
        foreach ($v in $e.vocab) {
            Write-Host "  $($v.word) ($($v.reading)): $($v.meaning)"
        }
    }
}
