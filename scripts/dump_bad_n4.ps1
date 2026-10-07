[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [System.IO.File]::ReadAllText('kanji_full_database.json', [System.Text.Encoding]::UTF8)
$db = $raw | ConvertFrom-Json

$badKanji = "曜 有 服 朝 業 楽 歌 止 正 歩 死 注 洋 海 漢 牛 物 特 犬 理 用 田 町 画 界 病 発 的 目 真 着 知 研 社 私 秋 究 空 立 答 紙 終 習 考 者 肉 自 色 花 英 茶 親 言 計 試 買 貸 質 赤 走 起 足 転 近 送 通 週 運 道 重 野 銀 開 院 集 青 音 題 風 飯 飲 館 駅 験 魚 鳥 黒" -split " "

Write-Host "Total bad Kanji: $($badKanji.Count)"

$dataList = @()
foreach ($k in $badKanji) {
    $info = $db.psobject.Properties[$k].Value
    $vocabStrings = @()
    if ($info.vocab) {
        foreach ($v in $info.vocab) {
            $vocabStrings += "$($v.jp)"
        }
    }
    $dataList += [PSCustomObject]@{
        kanji = $k
        on = $info.on
        kun = $info.kun
        meaning = $info.meaning
        vocab = $vocabStrings -join ', '
    }
}

$dataList | Export-Csv -Path 'scripts/bad_n4_dump.csv' -NoTypeInformation -Encoding UTF8
Write-Host "Dumped to scripts/bad_n4_dump.csv"
