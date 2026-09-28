[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$SHINJITAI_HANVIET = @{
    # N3 (16 chữ)
    "単" = "ĐƠN"; "変" = "BIẾN"; "実" = "THỰC"; "寝" = "TẨM"; "戦" = "CHIẾN"; "戻" = "LỆ"
    "抜" = "BẠT"; "済" = "TẾ"; "満" = "MÃN"; "絵" = "HỘI"; "资" = "TƯ"; "込" = "HỖI"
    "険" = "HIỂM"; "雑" = "TẠP"; "静" = "TĨNH"; "頼" = "LẠI"

    # N2 (16 chữ)
    "党" = "ĐẢNG"; "届" = "GIỚI"; "悩" = "NÃO"; "捜" = "SƯU"; "査" = "TRA"; "欧" = "ÂU"
    "涙" = "LỆ"; "湾" = "LOAN"; "焼" = "THIÊU"; "畳" = "ĐIỆP"; "県" = "HUYỆN"; "脳" = "NÃO"
    "蔵" = "TÀNG"; "軽" = "KHINH"; "鉱" = "KHOÁNG"; "齢" = "LINH"

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
}

# Nạp từ điển csv & xue
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

$rawDb = [System.IO.File]::ReadAllText("kanji_full_database.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$rawJs = [System.IO.File]::ReadAllText("kanji-data.js", [System.Text.Encoding]::UTF8)

$unmatched = @()
$matched = 0

foreach ($lvl in @('N3', 'N2', 'N1')) {
    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ -and $rawDb.psobject.Properties[$_] }
    foreach ($c in $chars) {
        $hv = $null
        if ($SHINJITAI_HANVIET.ContainsKey($c)) {
            $hv = $SHINJITAI_HANVIET[$c]
        } elseif ($csvMap.ContainsKey($c)) {
            $hv = $csvMap[$c]
        } elseif ($xueMap.ContainsKey($c)) {
            $hv = $xueMap[$c]
        }

        if ($hv -and $hv -ne "HÁN TỰ" -and $hv -ne "HÁN") {
            $matched++
        } else {
            $unmatched += "$c ($lvl)"
        }
    }
}

Write-Host "Tổng số Kanji N3+N2+N1: 1972"
Write-Host "Số Kanji có Hán Việt chuẩn: $matched / 1972"
Write-Host "Số Kanji chưa có: $($unmatched.Count)"
if ($unmatched.Count -gt 0) {
    Write-Host "Chưa có: $($unmatched -join ', ')"
}
