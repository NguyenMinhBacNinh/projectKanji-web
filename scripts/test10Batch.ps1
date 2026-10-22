[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$testSentences = @(
    "富士山は日本で一番高い山です。",
    "来週の七日に日本へ行きます。",
    "財布にお金があまり入っていません。",
    "公園に大きな桜の木があります。",
    "暇な時に日本語の本を読みます。",
    "今日は仕事が休みですから、ゆっくり寝ます。",
    "田中先生は日本語を教えています。",
    "私の家族は三人です。",
    "本は机の上に置いてあります。",
    "夏休みに友達と花火を見に行きました。"
)

$joined = $testSentences -join "`n"
$encoded = [System.Uri]::EscapeDataString($joined)
$url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=vi&dt=t&q=$encoded"

$res = Invoke-RestMethod -Uri $url -Method Get -TimeoutSec 10

Write-Host "Raw response items count: $($res[0].Count)"
$translated = @()
foreach ($item in $res[0]) {
    $t = $item[0].Trim()
    if ($t) { $translated += $t }
}

for ($i = 0; $i -lt $testSentences.Count; $i++) {
    Write-Host "JP: $($testSentences[$i])"
    Write-Host "VI: $($translated[$i])"
    Write-Host "---"
}
