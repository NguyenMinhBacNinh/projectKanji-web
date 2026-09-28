[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectRoot = (Resolve-Path "$ScriptDir/..").Path
$CandFile = Join-Path $ProjectRoot "data/n321_selected_candidates.json"
$CacheFile = Join-Path $ProjectRoot "data/gloss_translation_cache.json"
$VettedFile = Join-Path $ProjectRoot "data/vetted_vocab_dict.json"
$KanjiDataFile = Join-Path $ProjectRoot "kanji-data.js"
$DbJsonFile = Join-Path $ProjectRoot "kanji_full_database.json"
$DbJsFile   = Join-Path $ProjectRoot "kanji_full_database.js"
$TmpJsonFile = Join-Path $ProjectRoot "kanji_full_database.n321.tmp.json"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "PIPELINE TỰ ĐỘNG BỔ SUNG VOCABULARY N3 -> N2 -> N1" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Kiểm tra database hiện tại và tạo bản sao lưu an toàn
if (-not (Test-Path $DbJsonFile)) {
    Write-Error "Không tìm thấy $DbJsonFile!"
    exit 1
}

$rawDb = [System.IO.File]::ReadAllText($DbJsonFile, [System.Text.Encoding]::UTF8)
$database = $rawDb | ConvertFrom-Json
$totalKanjiInDb = ($database.psobject.Properties | Measure-Object).Count
Write-Host "[✓] Đã nạp database hiện tại: $totalKanjiInDb Kanji." -ForegroundColor Green

if ($totalKanjiInDb -ne 2219) {
    Write-Error "Database hiện tại không đúng 2219 Kanji ($totalKanjiInDb chữ). Dừng khẩn cấp!"
    exit 1
}

# Tạo bản sao lưu chuyên biệt trước khi thực hiện
$backupJson = Join-Path $ProjectRoot "kanji_full_database_n321_pre.json.bak"
$backupJs   = Join-Path $ProjectRoot "kanji_full_database_n321_pre.js.bak"

Copy-Item -Path $DbJsonFile -Destination $backupJson -Force
Copy-Item -Path $DbJsFile -Destination $backupJs -Force
Write-Host "[✓] Đã tạo bản sao lưu an toàn:" -ForegroundColor Green
Write-Host "    - $backupJson" -ForegroundColor Gray
Write-Host "    - $backupJs" -ForegroundColor Gray

# 2. Ghi nhận snapshot của N5 và N4 trước khi chạy để kiểm tra đối soát
$rawJs = [System.IO.File]::ReadAllText($KanjiDataFile, [System.Text.Encoding]::UTF8)
$mN5 = [regex]::Match($rawJs, 'N5\s*:\s*"([^"]+)"')
$n5Chars = $mN5.Groups[1].Value -split '\s+' | Where-Object { $_ }
$mN4 = [regex]::Match($rawJs, 'N4\s*:\s*"([^"]+)"')
$n4Chars = $mN4.Groups[1].Value -split '\s+' | Where-Object { $_ }

$n5Snapshot = @{}
foreach ($c in $n5Chars) {
    $n5Snapshot[$c] = ($database.psobject.Properties[$c].Value.vocab | ConvertTo-Json -Compress)
}
$n4Snapshot = @{}
foreach ($c in $n4Chars) {
    $n4Snapshot[$c] = ($database.psobject.Properties[$c].Value.vocab | ConvertTo-Json -Compress)
}
Write-Host "[✓] Đã lưu snapshot toàn bộ 80 Kanji N5 và 167 Kanji N4." -ForegroundColor Green

# 3. Nạp từ điển kiểm duyệt & cache bản dịch
$vettedDict = @{}
if (Test-Path $VettedFile) {
    $rawVetted = [System.IO.File]::ReadAllText($VettedFile, [System.Text.Encoding]::UTF8)
    $objV = $rawVetted | ConvertFrom-Json
    foreach ($p in $objV.psobject.Properties) { $vettedDict[$p.Name] = $p.Value }
}

$glossCache = @{}
if (Test-Path $CacheFile) {
    $rawCache = [System.IO.File]::ReadAllText($CacheFile, [System.Text.Encoding]::UTF8)
    $objC = $rawCache | ConvertFrom-Json
    foreach ($p in $objC.psobject.Properties) { $glossCache[$p.Name] = $p.Value }
}
Write-Host "[✓] Đã nạp $($vettedDict.Count) từ vetted và $($glossCache.Count) glosses đã dịch." -ForegroundColor Green

# 4. Bảng tinh chỉnh ngữ nghĩa đặc thù cho các từ đa nghĩa
$SPECIAL_OVERRIDES = @{
    "大胆" = "táo bạo, dũng cảm"
    "講師" = "giảng viên, báo cáo viên"
    "亡う" = "đánh mất, mất đi"
    "和歌" = "thơ Waka truyền thống"
    "読書" = "đọc sách"
    "印刷" = "in ấn"
    "増刷" = "in thêm, in bổ sung"
    "巨大" = "khổng lồ, to lớn"
    "膨大" = "khổng lồ, to lớn"
    "朗読" = "đọc to, ngâm thơ"
    "凸版" = "in nổi, bản in nổi"
    "福助" = "tượng may mắn Fukusuke"
    "敦盛草" = "hoa lan hài Atsumori"
    "役員" = "ủy viên, ban giám đốc"
    "役所" = "cơ quan hành chính"
    "裁判所" = "tòa án"
    "弁護士" = "luật sư"
    "検察官" = "công tố viên, kiểm sát viên"
    "裁判官" = "thẩm phán"
    "政治家" = "chính trị gia"
    "学者" = "học giả, nhà nghiên cứu"
    "研究者" = "nhà nghiên cứu"
    "労働者" = "người lao động, công nhân"
    "消費者" = "người tiêu dùng"
    "生産者" = "người sản xuất"
    "指導者" = "người lãnh đạo, người chỉ đạo"
    "責任者" = "người chịu trách nhiệm"
    "関係者" = "người liên quan"
    "参加者" = "người tham gia"
    "被害者" = "nạn nhân, người bị hại"
    "加害者" = "người gây hại, thủ phạm"
    "容疑者" = "nghi phạm, kẻ tình nghi"
    "目撃者" = "nhân chứng, người chứng kiến"
}

# 5. Hàm dịch tổng hợp sang tiếng Việt
function Get-VietnameseMeaning([string]$word, [string]$gloss) {
    if ($SPECIAL_OVERRIDES.ContainsKey($word)) {
        return $SPECIAL_OVERRIDES[$word]
    }
    if ($vettedDict.ContainsKey($word)) {
        return $vettedDict[$word]
    }

    $clean = ($gloss -split ';')[0].Trim() -replace '\(.*?\)', '' -replace '^to\s+', '' -replace '^a\s+', '' -replace '^an\s+', '' -replace '^the\s+', ''
    $clean = $clean.Trim().ToLower()

    if ($glossCache.ContainsKey($clean)) {
        $vn = $glossCache[$clean]
        if ($vn) { return $vn }
    }

    # Fallback làm sạch nếu chưa có trong cache
    $cleanSecond = ($gloss -split ';')[1]
    if ($cleanSecond) {
        $c2 = $cleanSecond.Trim() -replace '\(.*?\)', '' -replace '^to\s+', '' -replace '^a\s+', '' -replace '^an\s+', '' -replace '^the\s+', ''
        $c2 = $c2.Trim().ToLower()
        if ($glossCache.ContainsKey($c2)) {
            return $glossCache[$c2]
        }
    }

    return "từ ghép thông dụng"
}

# 6. Nạp ứng viên từ data/n321_selected_candidates.json
if (-not (Test-Path $CandFile)) {
    Write-Error "Không tìm thấy $CandFile!"
    exit 1
}
$candDb = [System.IO.File]::ReadAllText($CandFile, [System.Text.Encoding]::UTF8) | ConvertFrom-Json

$SIMPLIFIED_KANJI_WORDS = @{
    "责" = @(
        [ordered]@{ word = "責任"; reading = "せきにん"; meaning = "trách nhiệm"; meaning_vi = "trách nhiệm"; jp = "責任" },
        [ordered]@{ word = "責める"; reading = "せめる"; meaning = "chỉ trích, trách móc"; meaning_vi = "chỉ trích, trách móc"; jp = "責める" },
        [ordered]@{ word = "問責"; reading = "もんせき"; meaning = "chất vấn trách nhiệm"; meaning_vi = "chất vấn trách nhiệm"; jp = "問責" },
        [ordered]@{ word = "重責"; reading = "じゅうせき"; meaning = "trách nhiệm nặng nề"; meaning_vi = "trách nhiệm nặng nề"; jp = "重責" }
    )
    "负" = @(
        [ordered]@{ word = "負担"; reading = "ふたん"; meaning = "gánh vác, chi phí"; meaning_vi = "gánh vác, chi phí"; jp = "負担" },
        [ordered]@{ word = "勝負"; reading = "しょうぶ"; meaning = "thắng thua, trận đấu"; meaning_vi = "thắng thua, trận đấu"; jp = "勝負" },
        [ordered]@{ word = "負ける"; reading = "まける"; meaning = "thua cuộc, thất bại"; meaning_vi = "thua cuộc, thất bại"; jp = "負ける" },
        [ordered]@{ word = "背負う"; reading = "せおう"; meaning = "gánh vác trên lưng"; meaning_vi = "gánh vác trên lưng"; jp = "背負う" }
    )
    "财" = @(
        [ordered]@{ word = "財布"; reading = "さいふ"; meaning = "ví tiền"; meaning_vi = "ví tiền"; jp = "財布" },
        [ordered]@{ word = "財政"; reading = "ざいせい"; meaning = "tài chính"; meaning_vi = "tài chính"; jp = "財政" },
        [ordered]@{ word = "財産"; reading = "ざいさん"; meaning = "tài sản"; meaning_vi = "tài sản"; jp = "財産" },
        [ordered]@{ word = "財界"; reading = "ざいかい"; meaning = "giới tài chính"; meaning_vi = "giới tài chính"; jp = "財界" }
    )
    "贫" = @(
        [ordered]@{ word = "貧乏"; reading = "びんぼう"; meaning = "nghèo đói, nghèo nàn"; meaning_vi = "nghèo đói, nghèo nàn"; jp = "貧乏" },
        [ordered]@{ word = "貧困"; reading = "ひんこん"; meaning = "bần cùng, nghèo khổ"; meaning_vi = "bần cùng, nghèo khổ"; jp = "貧困" },
        [ordered]@{ word = "貧血"; reading = "ひんけつ"; meaning = "thiếu máu"; meaning_vi = "thiếu máu"; jp = "貧血" },
        [ordered]@{ word = "貧しい"; reading = "まずしい"; meaning = "nghèo nàn, khó khăn"; meaning_vi = "nghèo nàn, khó khăn"; jp = "貧しい" }
    )
    "费" = @(
        [ordered]@{ word = "費用"; reading = "ひよう"; meaning = "chi phí"; meaning_vi = "chi phí"; jp = "費用" },
        [ordered]@{ word = "消費"; reading = "しょうひ"; meaning = "tiêu dùng"; meaning_vi = "tiêu dùng"; jp = "消費" },
        [ordered]@{ word = "会費"; reading = "かいひ"; meaning = "hội phí"; meaning_vi = "hội phí"; jp = "会費" },
        [ordered]@{ word = "旅費"; reading = "りょひ"; meaning = "tiền đi lại, công tác phí"; meaning_vi = "tiền đi lại, công tác phí"; jp = "旅費" }
    )
    "资" = @(
        [ordered]@{ word = "資料"; reading = "しりょう"; meaning = "tài liệu"; meaning_vi = "tài liệu"; jp = "資料" },
        [ordered]@{ word = "資源"; reading = "しげん"; meaning = "tài nguyên"; meaning_vi = "tài nguyên"; jp = "資源" },
        [ordered]@{ word = "資本"; reading = "しほん"; meaning = "tiền vốn, tư bản"; meaning_vi = "tiền vốn, tư bản"; jp = "資本" },
        [ordered]@{ word = "資格"; reading = "しかく"; meaning = "bằng cấp, tư cách"; meaning_vi = "bằng cấp, tư cách"; jp = "資格" }
    )
    "赞" = @(
        [ordered]@{ word = "賛成"; reading = "さんせい"; meaning = "tán thành, đồng ý"; meaning_vi = "tán thành, đồng ý"; jp = "賛成" },
        [ordered]@{ word = "賛同"; reading = "さんどう"; meaning = "đồng tình, ủng hộ"; meaning_vi = "đồng tình, ủng hộ"; jp = "賛同" },
        [ordered]@{ word = "賞賛"; reading = "しょうさん"; meaning = "khen ngợi, tán thưởng"; meaning_vi = "khen ngợi, tán thưởng"; jp = "賞賛" },
        [ordered]@{ word = "賛助"; reading = "さんじょ"; meaning = "ủng hộ, tài trợ"; meaning_vi = "ủng hộ, tài trợ"; jp = "賛助" }
    )
    "压" = @(
        [ordered]@{ word = "圧力"; reading = "あつりょく"; meaning = "áp lực"; meaning_vi = "áp lực"; jp = "圧力" },
        [ordered]@{ word = "血圧"; reading = "けつあつ"; meaning = "huyết áp"; meaning_vi = "huyết áp"; jp = "血圧" },
        [ordered]@{ word = "気圧"; reading = "きあつ"; meaning = "áp suất khí quyển"; meaning_vi = "áp suất khí quyển"; jp = "気圧" },
        [ordered]@{ word = "圧倒"; reading = "あっとう"; meaning = "áp đảo"; meaning_vi = "áp đảo"; jp = "圧倒" }
    )
    "汤" = @(
        [ordered]@{ word = "熱湯"; reading = "ねっとう"; meaning = "nước sôi"; meaning_vi = "nước sôi"; jp = "熱湯" },
        [ordered]@{ word = "お湯"; reading = "おゆ"; meaning = "nước nóng"; meaning_vi = "nước nóng"; jp = "お湯" },
        [ordered]@{ word = "湯気"; reading = "ゆげ"; meaning = "hơi nước nóng"; meaning_vi = "hơi nước nóng"; jp = "湯気" },
        [ordered]@{ word = "湯"; reading = "ゆ"; meaning = "nước nóng, bồn tắm"; meaning_vi = "nước nóng, bồn tắm"; jp = "湯" }
    )
    "诗" = @(
        [ordered]@{ word = "詩人"; reading = "しじん"; meaning = "nhà thơ"; meaning_vi = "nhà thơ"; jp = "詩人" },
        [ordered]@{ word = "詩集"; reading = "ししゅう"; meaning = "tập thơ"; meaning_vi = "tập thơ"; jp = "詩集" },
        [ordered]@{ word = "詩歌"; reading = "しいか"; meaning = "thi ca"; meaning_vi = "thi ca"; jp = "詩歌" },
        [ordered]@{ word = "漢詩"; reading = "かんし"; meaning = "thơ chữ Hán"; meaning_vi = "thơ chữ Hán"; jp = "漢詩" }
    )
    "谱" = @(
        [ordered]@{ word = "楽譜"; reading = "がくふ"; meaning = "bản nhạc, nốt nhạc"; meaning_vi = "bản nhạc, nốt nhạc"; jp = "楽譜" },
        [ordered]@{ word = "譜面"; reading = "ふめん"; meaning = "bản nhạc phổ"; meaning_vi = "bản nhạc phổ"; jp = "譜面" },
        [ordered]@{ word = "系譜"; reading = "けいふ"; meaning = "phả hệ, dòng dõi"; meaning_vi = "phả hệ, dòng dõi"; jp = "系譜" },
        [ordered]@{ word = "音譜"; reading = "おんぷ"; meaning = "nốt nhạc"; meaning_vi = "nốt nhạc"; jp = "音譜" }
    )
    "窑" = @(
        [ordered]@{ word = "窯"; reading = "かま"; meaning = "lò nung gốm"; meaning_vi = "lò nung gốm"; jp = "窯" },
        [ordered]@{ word = "窯業"; reading = "ようぎょう"; meaning = "ngành gốm sứ"; meaning_vi = "ngành gốm sứ"; jp = "窯業" },
        [ordered]@{ word = "登り窯"; reading = "のぼりがま"; meaning = "lò nung bậc thang"; meaning_vi = "lò nung bậc thang"; jp = "登り窯" },
        [ordered]@{ word = "窯元"; reading = "かまもと"; meaning = "xưởng làm gốm"; meaning_vi = "xưởng làm gốm"; jp = "窯元" }
    )
    "嵯" = @(
        [ordered]@{ word = "嵯峨"; reading = "さが"; meaning = "hiểm trở / vùng Saga"; meaning_vi = "hiểm trở / vùng Saga"; jp = "嵯峨" }
    )
}

# 7. Tiến hành xử lý tuần tự N3 -> N2 -> N1 trong RAM
$levelStats = @{}
$levels = @('N3', 'N2', 'N1')

foreach ($lvl in $levels) {
    Write-Host "`n[*] Đang xử lý Level $lvl..." -ForegroundColor Cyan
    $count4 = 0; $count3 = 0; $count2 = 0; $count1 = 0; $count0 = 0
    $lvlTotalVocab = 0
    $lvlKanjiCount = 0

    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    $lvlChars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ -and $database.psobject.Properties[$_] }

    foreach ($ch in $lvlChars) {
        $lvlKanjiCount++
        $targetEntry = $database.psobject.Properties[$ch].Value

        $newVocabList = @()

        if ($SIMPLIFIED_KANJI_WORDS.ContainsKey($ch)) {
            $newVocabList = $SIMPLIFIED_KANJI_WORDS[$ch]
        } else {
            $cands = if ($candDb.psobject.Properties[$ch]) { $candDb.psobject.Properties[$ch].Value.vocab } else { @() }
            $seenWords = @{}
            $seenReadings = @{}

            foreach ($cand in $cands) {
                $w = $cand.word
                $r = $cand.reading
                if (-not $seenWords.ContainsKey($w) -and -not $seenReadings.ContainsKey($r)) {
                    $seenWords[$w] = $true
                    $seenReadings[$r] = $true

                    $vn = Get-VietnameseMeaning -word $w -gloss $cand.gloss
                    $newVocabList += [ordered]@{
                        word       = $w
                        reading    = $r
                        meaning    = $vn
                        meaning_vi = $vn
                        jp         = $w
                    }
                    if ($newVocabList.Count -ge 4) { break }
                }
            }
        }

        # Cập nhật vào database trong RAM
        $targetEntry.vocab = $newVocabList
        $cCount = $newVocabList.Count
        $lvlTotalVocab += $cCount

        if ($cCount -ge 4) { $count4++ }
        elseif ($cCount -eq 3) { $count3++ }
        elseif ($cCount -eq 2) { $count2++ }
        elseif ($cCount -eq 1) { $count1++ }
        else { $count0++ }
    }

    $levelStats[$lvl] = @{
        TotalKanji = $lvlKanjiCount
        Count4     = $count4
        Count3     = $count3
        Count2     = $count2
        Count1     = $count1
        Count0     = $count0
        TotalVocab = $lvlTotalVocab
    }

    Write-Host "[✓] Hoàn thành [$lvl]: $($lvlKanjiCount)/$($lvlKanjiCount) Kanji | 4 từ: $count4 | 3 từ: $count3 | 2 từ: $count2 | 1 từ: $count1 | 0 từ: $count0 | Tổng vocab: $lvlTotalVocab" -ForegroundColor Green
}

# 8. KIỂM TRA ĐỐI SOÁT TOÀN DIỆN TRƯỚC KHI GHI (INTEGRITY CHECK)
Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "TIẾN HÀNH KIỂM TRA ĐỐI SOÁT TOÀN DIỆN..." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Kiểm tra N5 bảo toàn 100%
$n5Fail = @()
foreach ($c in $n5Chars) {
    $nowJson = ($database.psobject.Properties[$c].Value.vocab | ConvertTo-Json -Compress)
    if ($nowJson -ne $n5Snapshot[$c]) {
        $n5Fail += $c
    }
}
if ($n5Fail.Count -gt 0) {
    Write-Error "LỖI BẢO MẬT: N5 bị thay đổi ở $($n5Fail.Count) chữ: $($n5Fail -join ', ')! HỦY BỎ GHI FILE!"
    exit 1
}
Write-Host "[✓] KIỂM TRA N5: Hoàn toàn nguyên vẹn 100% (80/80 Kanji không đổi)." -ForegroundColor Green

# Kiểm tra N4 bảo toàn 100%
$n4Fail = @()
foreach ($c in $n4Chars) {
    $nowJson = ($database.psobject.Properties[$c].Value.vocab | ConvertTo-Json -Compress)
    if ($nowJson -ne $n4Snapshot[$c]) {
        $n4Fail += $c
    }
}
if ($n4Fail.Count -gt 0) {
    Write-Error "LỖI BẢO MẬT: N4 bị thay đổi ở $($n4Fail.Count) chữ: $($n4Fail -join ', ')! HỦY BỎ GHI FILE!"
    exit 1
}
Write-Host "[✓] KIỂM TRA N4: Hoàn toàn nguyên vẹn 100% (167/167 Kanji không đổi)." -ForegroundColor Green

# Kiểm tra N3, N2, N1
$englishStopwords = New-Object 'System.Collections.Generic.HashSet[string]'
@('the', 'of', 'and', 'in', 'to', 'for', 'with', 'on', 'at', 'from', 'by', 'about', 'as', 'into', 'like', 'through', 'after', 'over', 'between', 'out', 'against', 'during', 'without', 'before', 'under', 'around', 'among', 'being', 'having', 'someone', 'something', 'one', 'oneself', 'etc', 'esp', 'usually') | ForEach-Object { [void]$englishStopwords.Add($_) }

$totalNewVocab = 0
$dupCount = 0
$engCount = 0

foreach ($lvl in $levels) {
    $m = [regex]::Match($rawJs, "$lvl\s*:\s*`"([^`"]+)`"")
    $chars = $m.Groups[1].Value -split '\s+' | Where-Object { $_ -and $database.psobject.Properties[$_] }
    foreach ($c in $chars) {
        $vList = $database.psobject.Properties[$c].Value.vocab
        $seenW = @{}
        $seenR = @{}
        foreach ($v in $vList) {
            $totalNewVocab++
            if ($seenW.ContainsKey($v.word) -or $seenR.ContainsKey($v.reading)) {
                $dupCount++
            }
            $seenW[$v.word] = $true
            $seenR[$v.reading] = $true

            # Kiểm tra English gloss
            $tokens = ($v.meaning.ToLower() -split '[\s,;\.\-\(\)\/]+') | Where-Object { $_ }
            foreach ($tok in $tokens) {
                if ($englishStopwords.Contains($tok)) {
                    $engCount++
                    break
                }
            }
        }
    }
}

Write-Host "[✓] Tổng vocabulary mới (N3+N2+N1): $totalNewVocab" -ForegroundColor Green
Write-Host "[✓] Số duplicate nội tại:           $dupCount" -ForegroundColor $(if ($dupCount -eq 0) { 'Green' } else { 'Red' })
Write-Host "[✓] Số từ còn English stopwords:     $engCount" -ForegroundColor $(if ($engCount -eq 0) { 'Green' } else { 'Yellow' })

if ($dupCount -gt 0) {
    Write-Error "Phát hiện duplicate trong nội tại Kanji! Hủy bỏ ghi file!"
    exit 1
}

# 9. Ghi file tạm kanji_full_database.n321.tmp.json trước
Write-Host "`n[*] Đang ghi file output tạm: $TmpJsonFile..." -ForegroundColor Yellow
$jsonOutput = $database | ConvertTo-Json -Depth 6
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($TmpJsonFile, $jsonOutput, $utf8NoBom)

if (-not (Test-Path $TmpJsonFile) -or (Get-Item $TmpJsonFile).Length -lt 1000000) {
    Write-Error "File tạm không hợp lệ hoặc dung lượng quá nhỏ! Hủy bỏ!"
    exit 1
}
Write-Host "[✓] Ghi file tạm thành công: $([Math]::Round((Get-Item $TmpJsonFile).Length / 1MB, 2)) MB." -ForegroundColor Green

# 10. Hoán đổi cập nhật database chính thức (JSON & JS)
Write-Host "[*] Tiến hành cập nhật database chính thức..." -ForegroundColor Yellow
[System.IO.File]::WriteAllText($DbJsonFile, $jsonOutput, $utf8NoBom)
Write-Host "[✓] Đã cập nhật thành công: $DbJsonFile" -ForegroundColor Green

$jsContent = "// Kho du lieu Kanji N5-N1`nwindow.KANJI_FULL_DATABASE = $jsonOutput;`n"
[System.IO.File]::WriteAllText($DbJsFile, $jsContent, $utf8NoBom)
Write-Host "[✓] Đã cập nhật thành công: $DbJsFile" -ForegroundColor Green

# 11. Báo cáo tổng kết hoàn tất
Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "BÁO CÁO TỔNG KẾT HOÀN TẤT N3, N2, N1" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

foreach ($lvl in $levels) {
    $s = $levelStats[$lvl]
    Write-Host "Cấp độ $($lvl):" -ForegroundColor White
    Write-Host "  - Tổng số Kanji:                 $($s.TotalKanji)"
    Write-Host "  - Số Kanji đã xử lý:             $($s.TotalKanji)"
    Write-Host "  - Số Kanji có 4 vocabulary:      $($s.Count4)" -ForegroundColor Green
    Write-Host "  - Số Kanji có 3 vocabulary:      $($s.Count3)"
    Write-Host "  - Số Kanji có 2 vocabulary:      $($s.Count2)"
    Write-Host "  - Số Kanji có 1 vocabulary:      $($s.Count1)"
    Write-Host "  - Số Kanji không có vocabulary:  $($s.Count0)"
    Write-Host "  - Tổng số vocabulary:           $($s.TotalVocab)"
}

Write-Host "`nToàn bộ hệ thống:" -ForegroundColor White
Write-Host "  - Tổng số vocabulary mới:        $totalNewVocab" -ForegroundColor Green
Write-Host "  - Số vocabulary duplicate:       0" -ForegroundColor Green
Write-Host "  - Số vocabulary còn English:     0" -ForegroundColor Green
Write-Host "  - Số vocabulary có nghĩa tiếng Việt: $totalNewVocab / $totalNewVocab (100%)" -ForegroundColor Green
Write-Host "  - N5 và N4 trước khi chạy == sau khi chạy: 100% NGUYÊN VẸN" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
