[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectRoot = (Resolve-Path "$ScriptDir/..").Path
$DbJsonFile = Join-Path $ProjectRoot "kanji_full_database.json"
$rawDb = [System.IO.File]::ReadAllText($DbJsonFile, [System.Text.Encoding]::UTF8)
$database = $rawDb | ConvertFrom-Json

# Bảng Hán Việt của toàn bộ 2219 Kanji trong database
$kanjiHanViet = @{}
$kanjiMeanings = @{}
foreach ($prop in $database.psobject.Properties) {
    $k = $prop.Name
    $val = $prop.Value
    if ($val.hanViet) { $kanjiHanViet[$k] = $val.hanViet.ToLower() }
    if ($val.meaning) { $kanjiMeanings[$k] = $val.meaning }
}

Write-Host "Đã nạp Hán Việt cho $($kanjiHanViet.Count) Kanji."

# Thử nghiệm hàm tổng hợp Hán Việt cho từ ghép 2 chữ Kanji
function Synthesize-HanViet([string]$word) {
    if ($word.Length -eq 2) {
        $c1 = [string]$word[0]
        $c2 = [string]$word[1]
        if ($kanjiHanViet.ContainsKey($c1) -and $kanjiHanViet.ContainsKey($c2)) {
            return "$($kanjiHanViet[$c1]) $($kanjiHanViet[$c2])"
        }
    }
    return $null
}

# Kiểm tra thử nghiệm
$testWords = @('政治', '経済', '社会', '環境', '責任', '憲法', '裁判', '弁護', '統一', '外交', '交渉', '交通', '寄付', '相互', '戦争', '競争', '予選', '予想')
foreach ($w in $testWords) {
    $syn = Synthesize-HanViet $w
    Write-Host "Từ: $w -> Hán Việt: $syn"
}
