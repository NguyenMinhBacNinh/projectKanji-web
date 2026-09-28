[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectRoot = (Resolve-Path "$ScriptDir/..").Path
$DbJsonFile = Join-Path $ProjectRoot "kanji_full_database.json"
$DbJsFile   = Join-Path $ProjectRoot "kanji_full_database.js"
$KanjiDataFile = Join-Path $ProjectRoot "kanji-data.js"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "CẬP NHẬT ÂM HÁN VIỆT CHUẨN XÁC CHO N3, N2, N1" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Tạo bản sao lưu an toàn trước khi sửa
$bakJson = Join-Path $ProjectRoot "kanji_full_database_before_hanviet_fix.json.bak"
$bakJs   = Join-Path $ProjectRoot "kanji_full_database_before_hanviet_fix.js.bak"
Copy-Item -Path $DbJsonFile -Destination $bakJson -Force
Copy-Item -Path $DbJsFile -Destination $bakJs -Force
Write-Host "[✓] Đã tạo bản sao lưu an toàn:" -ForegroundColor Green
Write-Host "    - $bakJson" -ForegroundColor Gray
Write-Host "    - $bakJs" -ForegroundColor Gray

# 2. Đọc database hiện tại
$rawDb = [System.IO.File]::ReadAllText($DbJsonFile, [System.Text.Encoding]::UTF8)
$database = $rawDb | ConvertFrom-Json
$rawJs = [System.IO.File]::ReadAllText($KanjiDataFile, [System.Text.Encoding]::UTF8)

# 3. Snapshot N5 và N4 để đảm bảo bảo toàn 100%
$mN5 = [regex]::Match($rawJs, 'N5\s*:\s*"([^"]+)"')
$n5Chars = $mN5.Groups[1].Value -split '\s+' | Where-Object { $_ }
$mN4 = [regex]::Match($rawJs, 'N4\s*:\s*"([^"]+)"')
$n4Chars = $mN4.Groups[1].Value -split '\s+' | Where-Object { $_ }

$n5Snapshot = @{}
foreach ($c in $n5Chars) {
    $n5Snapshot[$c] = ($database.psobject.Properties[$c].Value | ConvertTo-Json -Compress)
}
$n4Snapshot = @{}
foreach ($c in $n4Chars) {
    $n4Snapshot[$c] = ($database.psobject.Properties[$c].Value | ConvertTo-Json -Compress)
}
Write-Host "[✓] Đã chụp snapshot toàn bộ N5 và N4 (tất cả các trường dữ liệu)." -ForegroundColor Green

# 4. Xây dựng từ điển Hán Việt toàn diện
$SHINJITAI_HANVIET = @{
    # N3 (16 chữ)
    "単" = "ĐƠN"; "変" = "BIẾN"; "実" = "THỰC"; "寝" = "TẨM"; "戦" = "CHIẾN"; "戻" = "LỆ"
    "抜" = "BẠT"; "済" = "TẾ"; "満" = "MÃN"; "絵" = "HỘI"; "资" = "TƯ"; "込" = "HỖI"
    "険" = "HIỂM"; "雑" = "TẠP"; "静" = "TĨNH"; "頼" = "LẠI"

    # N2 (17 chữ)
    "党" = "ĐẢNG"; "届" = "GIỚI"; "悩" = "NÃO"; "捜" = "SƯU"; "査" = "TRA"; "欧" = "ÂU"
    "涙" = "LỆ"; "湾" = "LOAN"; "焼" = "THIÊU"; "畳" = "ĐIỆP"; "県" = "HUYỆN"; "脳" = "NÃO"
    "蔵" = "TÀNG"; "軽" = "KHINH"; "鉱" = "KHOÁNG"; "齢" = "LINH"; "横" = "HOÀNH"

    # N1 (76 chữ)
    "冴" = "NGÀ"; "凪" = "CHỈ"; "匁" = "CHỈ"; "塀" = "BIÊN"; "塁" = "LŨY"; "壊" = "HOẠI"
    "壌" = "NHƯỠNG"; "尭" = "NGHIÊU"; "峠" = "ĐÈO"; "巌" = "NHAM"; "廃" = "PHẾ"; "弐" = "NHỊ"
    "弥" = "DI"; "彦" = "NGẠN"; "径" = "KÍNH"; "恵" = "HUỆ"; "惣" = "TỔNG"; "懐" = "HOÀI"
    "拠" = "CỨ"; "拡" = "KHUẾCH"; "挙" = "CỬ"; "掲" = "YẾT"; "摂" = "NHIẾP"; "晋" = "TẤN"
    "暁" = "HIỂU"; "枠" = "NGÕA"; "柾" = "CHÍNH"; "桜" = "ANH"; "桟" = "SẠN"; "椋" = "LƯƠNG"
    "検" = "KIỂM"; "槙" = "ĐIÊN"; "殴" = "ẨU"; "沢" = "TRẠCH"; "渇" = "KHÁT"; "渉" = "THIỆP"
    "渋" = "SÁP"; "渓" = "KHÊ"; "澪" = "LINH"; "瀬" = "LẠI"; "獣" = "THÚ"; "砕" = "TOÁI"
    "禅" = "THIỀN"; "稲" = "ĐẠO"; "穂" = "TUỆ"; "穏" = "ỔN"; "穣" = "NHƯỠNG"; "窃" = "THIẾT"
    "窑" = "DAO"; "笹" = "THẾ"; "縁" = "DUYÊN"; "縄" = "THẰNG"; "脚" = "CƯỚC"; "舗" = "PHỐ"
    "蕗" = "LỘ"; "薫" = "HUÂN"; "蛍" = "HUỲNH"; "訳" = "DỊCH"; "譲" = "NHƯỢNG"; "践" = "TIỄN"
    "逓" = "ĐỆ"; "郷" = "HƯƠNG"; "醸" = "NHƯỠNG"; "釈" = "THÍCH"; "銭" = "TIỀN"; "鋳" = "CHÚ"
    "陥" = "HÃM"; "霊" = "LINH"; "顕" = "HIỂN"; "駄" = "ĐÀ"; "駆" = "KHU"; "騒" = "TAO"
    "髄" = "TỦY"; "鶏" = "KÊ"; "麿" = "MA"; "黙" = "MẶC"

    # Các chữ giản thể đặc thù
    "负" = "PHỤ"; "财" = "TÀI"; "贫" = "BẦN"; "责" = "TRÁCH"; "费" = "PHÍ"; "赞" = "TÁN"
    "压" = "ÁP"; "汤" = "THANG"; "诗" = "THI"; "谱" = "PHỔ"
}

# Nạp từ hanviet.csv
$csvMap = @{}
foreach ($line in [System.IO.File]::ReadLines("data/hanviet.csv")) {
    $parts = $line -split ',', 3
    if ($parts.Count -ge 2) {
        $c = $parts[0].Trim()
        $hvRaw = $parts[1].Trim()
        $m = [regex]::Matches($hvRaw, "['`"]([a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+)['`"]")
        if ($m.Count -gt 0) {
            $firstHv = $m[0].Groups[1].Value.Trim().ToUpper()
            if ($c -and $firstHv -and -not $csvMap.ContainsKey($c)) { $csvMap[$c] = $firstHv }
        }
    }
}

# Nạp từ xue_dictionary.json
$stream = [System.IO.File]::OpenRead("data/xue_dictionary.json")
$reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
$jsonText = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$xueEntries = $jsonText | ConvertFrom-Json
$xueMap = @{}
foreach ($item in $xueEntries) {
    if ($item.sv) {
        $hv = $item.sv.Trim().ToUpper()
        if ($item.s -and $item.s.Length -eq 1 -and -not $xueMap.ContainsKey($item.s)) { $xueMap[$item.s] = $hv }
        if ($item.t -and $item.t.Length -eq 1 -and -not $xueMap.ContainsKey($item.t)) { $xueMap[$item.t] = $hv }
    }
}

# 5. Cập nhật hàng loạt cho toàn bộ Kanji N3, N2, N1
$levels = @('N3', 'N2', 'N1')
$stats = @{}
$allUpdatedCount = 0

foreach ($lvl in $levels) {
    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ -and $database.psobject.Properties[$_] }
    $lvlUpdated = 0

    foreach ($c in $chars) {
        $targetEntry = $database.psobject.Properties[$c].Value
        
        $newHv = $null
        if ($SHINJITAI_HANVIET.ContainsKey($c)) {
            $newHv = $SHINJITAI_HANVIET[$c]
        } elseif ($csvMap.ContainsKey($c)) {
            $newHv = $csvMap[$c]
        } elseif ($xueMap.ContainsKey($c)) {
            $newHv = $xueMap[$c]
        }

        if (-not $newHv -or $newHv -eq "HÁN" -or $newHv -eq "HÁN TỰ") {
            Write-Error "Không tìm thấy Hán Việt cho chữ: $c ($lvl)!"
            exit 1
        }

        # CẬP NHẬT DUY NHẤT FIELD hanViet
        $targetEntry.hanViet = $newHv
        $lvlUpdated++
        $allUpdatedCount++
    }

    $stats[$lvl] = @{
        Total = $chars.Count
        Updated = $lvlUpdated
    }
    Write-Host "[✓] Hoàn thành cấp độ $($lvl): Đã cập nhật $lvlUpdated / $($chars.Count) Kanji." -ForegroundColor Green
}

# 6. Kiểm tra đối soát bảo toàn 100% N5 và N4
Write-Host "`n[*] Đang kiểm tra đối soát bảo toàn N5 và N4..." -ForegroundColor Yellow
foreach ($c in $n5Chars) {
    $nowJson = ($database.psobject.Properties[$c].Value | ConvertTo-Json -Compress)
    if ($nowJson -ne $n5Snapshot[$c]) {
        Write-Error "LỖI BẢO MẬT: N5 bị thay đổi ở chữ $c! Hủy bỏ ghi file!"
        exit 1
    }
}
Write-Host "[✓] N5 bảo toàn 100% nguyên vẹn (80/80 Kanji không thay đổi)." -ForegroundColor Green

foreach ($c in $n4Chars) {
    $nowJson = ($database.psobject.Properties[$c].Value | ConvertTo-Json -Compress)
    if ($nowJson -ne $n4Snapshot[$c]) {
        Write-Error "LỖI BẢO MẬT: N4 bị thay đổi ở chữ $c! Hủy bỏ ghi file!"
        exit 1
    }
}
Write-Host "[✓] N4 bảo toàn 100% nguyên vẹn (167/167 Kanji không thay đổi)." -ForegroundColor Green

# 7. Kiểm tra không còn chữ nào mang giá trị "HÁN TỰ" hoặc "HÁN"
$stillHan = 0
foreach ($lvl in $levels) {
    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ -and $database.psobject.Properties[$_] }
    foreach ($c in $chars) {
        $hv = $database.psobject.Properties[$c].Value.hanViet
        if ($hv -eq "HÁN" -or $hv -eq "HÁN TỰ" -or [string]::IsNullOrWhiteSpace($hv)) {
            $stillHan++
        }
    }
}

if ($stillHan -gt 0) {
    Write-Error "Vẫn còn $stillHan chữ mang giá trị HÁN hoặc trống! Hủy bỏ ghi file!"
    exit 1
}
Write-Host "[✓] Xác nhận: 0 chữ N3/N2/N1 còn mang giá trị 'HÁN' hoặc 'HÁN TỰ'." -ForegroundColor Green

# 8. Ghi dữ liệu vào database JSON và JS
Write-Host "`n[*] Đang ghi cập nhật database..." -ForegroundColor Yellow
$jsonOutput = $database | ConvertTo-Json -Depth 6
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

[System.IO.File]::WriteAllText($DbJsonFile, $jsonOutput, $utf8NoBom)
Write-Host "[✓] Đã cập nhật thành công: $DbJsonFile" -ForegroundColor Green

$jsContent = "// Kho du lieu Kanji N5-N1`nwindow.KANJI_FULL_DATABASE = $jsonOutput;`n"
[System.IO.File]::WriteAllText($DbJsFile, $jsContent, $utf8NoBom)
Write-Host "[✓] Đã cập nhật thành công: $DbJsFile" -ForegroundColor Green

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "HOÀN TẤT CẬP NHẬT HÁN VIỆT CHO $allUpdatedCount KANJI" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
