[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$urls = @(
    "https://raw.githubusercontent.com/phucbm/xue-hanzi/main/public/data/dictionary.json",
    "https://raw.githubusercontent.com/ph0ngp/hanviet-pinyin-wordlist/master/hanviet.csv"
)

$outFileJson = "data/xue_dictionary.json"
if (-not (Test-Path $outFileJson)) {
    try {
        Write-Host "Downloading xue-hanzi dictionary.json..."
        Invoke-WebRequest -Uri $urls[0] -OutFile $outFileJson -TimeoutSec 30
        Write-Host "Success: $((Get-Item $outFileJson).Length) bytes"
    } catch {
        Write-Host "Failed to download dictionary.json: $_"
    }
} else {
    Write-Host "$outFileJson already exists"
}

$outFileCsv = "data/hanviet.csv"
if (-not (Test-Path $outFileCsv)) {
    try {
        Write-Host "Downloading hanviet.csv..."
        Invoke-WebRequest -Uri $urls[1] -OutFile $outFileCsv -TimeoutSec 30
        Write-Host "Success: $((Get-Item $outFileCsv).Length) bytes"
    } catch {
        Write-Host "Failed to download hanviet.csv: $_"
    }
} else {
    Write-Host "$outFileCsv already exists"
}
