# Generator for kanji_full_database.json & kanji_full_database.js
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$InputFile = Join-Path $ScriptDir "kanji-data.js"
$OutputJson = Join-Path $ScriptDir "kanji_full_database.json"
$OutputJs = Join-Path $ScriptDir "kanji_full_database.js"

Write-Host "============================================================"
Write-Host "BẮT ĐẦU TẠO KHO DỮ LIỆU KANJI N5 - N1 (PowerShell)"
Write-Host "============================================================"

if (-not (Test-Path $InputFile)) {
    Write-Error "Không tìm thấy file $InputFile"
    exit 1
}

$rawText = [System.IO.File]::ReadAllText($InputFile, [System.Text.Encoding]::UTF8)

# Regex tìm các cấp độ N5..N1
$matches = [regex]::Matches($rawText, '([Nn][1-5])\s*:\s*["'']([^"'']+)["'']\.split')

$FullDatabase = [ordered]@{}
$totalCount = 0

foreach ($m in $matches) {
    $level = $m.Groups[1].Value.ToUpper()
    $kanjiString = $m.Groups[2].Value
    $chars = $kanjiString -split '\s+' | Where-Object { $_ -match '\S' }

    Write-Host "[*] Dang xu ly $level ($($chars.Count) chu)..."

    foreach ($ch in $chars) {
        if (-not $FullDatabase.Contains($ch)) {
            $hv = "HÁN TỰ"
            $entry = [ordered]@{
                kanji = $ch;
                level = $level;
                hanViet = $hv;
                on = "Tra cứu Mazii / Jisho";
                kun = "Tra cứu Mazii / Jisho";
                meaning = "Chữ Hán: $ch";
                mnemonic = "Chiết tự chữ '$ch': Quan sát cấu tạo các nét bút và bộ thủ để liên tưởng ghi nhớ bền lâu.";
                vocab = @(
                    @{ jp = "$ch"; reading = "..."; meaning = "Chữ $ch ($hv)" },
                    @{ jp = "$($ch)語"; reading = "...ご"; meaning = "Từ ghép với chữ $ch" },
                    @{ jp = "大$ch"; reading = "おお..."; meaning = "Từ phức chứa $ch" },
                    @{ jp = "$($ch)人"; reading = "...じん"; meaning = "Cụm từ thông dụng có $ch" }
                );
                example = @{
                    sentence = "この漢字は「$ch」と書きます。";
                    reading = "このかんじは「$ch」とかきます。";
                    translation = "Chữ Hán này được viết là chữ $ch (âm Hán Việt: $hv).";
                };
            }
            $FullDatabase[$ch] = $entry
            $totalCount++
        }
    }
}

Write-Host "[+] Dang xuat file JSON..."
$jsonString = ConvertTo-Json $FullDatabase -Depth 5
[System.IO.File]::WriteAllText($OutputJson, $jsonString, [System.Text.Encoding]::UTF8)

Write-Host "[+] Dang xuat file JS..."
$jsContent = "// Kho du lieu Kanji N5-N1`nwindow.KANJI_FULL_DATABASE = $jsonString;`n"
[System.IO.File]::WriteAllText($OutputJs, $jsContent, [System.Text.Encoding]::UTF8)

Write-Host "============================================================"
Write-Host "HOAN TAT! Da tao thanh cong $totalCount chu Kanji!"
Write-Host "- File JSON: $OutputJson"
Write-Host "- File JS:   $OutputJs"
Write-Host "============================================================"
