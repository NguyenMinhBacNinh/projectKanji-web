[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$db = [System.IO.File]::ReadAllText("kanji_full_database.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json

$keys = @('未', '末', '束', '杯', '果', '格', '構', '様', '権', '横', '機', '欠', '次', '欲', '歯', '歳')
foreach ($k in $keys) {
    if ($db.psobject.Properties[$k]) {
        $e = $db.psobject.Properties[$k].Value
        Write-Host "$k : hanViet='$($e.hanViet)', meaning='$($e.meaning)'"
    } else {
        Write-Host "$k : NOT IN DB"
    }
}
