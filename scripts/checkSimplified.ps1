[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$db = [System.IO.File]::ReadAllText("kanji_full_database.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json

$keys = @('责', '负', '财', '贫', '费', '资', '赞', '压', '汤', '诗', '谱', '窑')
foreach ($k in $keys) {
    if ($db.psobject.Properties[$k]) {
        $e = $db.psobject.Properties[$k].Value
        $vStr = ($e.vocab | ForEach-Object { "$($_.word) ($($_.reading): $($_.meaning))" }) -join " | "
        Write-Host "[$($e.level)] $k : $vStr"
    }
}
