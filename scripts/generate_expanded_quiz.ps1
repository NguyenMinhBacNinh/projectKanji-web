[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$db = Get-Content -Raw -Encoding UTF8 .\kanji_full_database.json | ConvertFrom-Json

# Extract fallback map from index.html
$indexHtml = Get-Content -Raw -Encoding UTF8 .\index.html
$hvMap = @{}
if ($indexHtml -match 'const HAN_VIET_FALLBACK_MAP = \{([^}]+)\}') {
    $matches[1] -split ',' | ForEach-Object {
        if ($_ -match '"([^"]+)":\s*"([^"]+)"') {
            $hvMap[$matches[1]] = $matches[2]
        }
    }
}

$levels = @('N5', 'N4', 'N3', 'N2', 'N1')

function Get-CleanMeaning($text) {
    if (-not $text) { return "Chữ Hán" }
    $clean = $text -replace '^Nghĩa:\s*', ''
    $clean = $clean -replace '^Chữ Hán:\s*', ''
    return $clean.Trim()
}

function Shuffle-Array($arr) {
    $list = [System.Collections.Generic.List[object]]::new($arr)
    $rnd = [System.Random]::new()
    for ($i = $list.Count - 1; $i -gt 0; $i--) {
        $j = $rnd.Next($i + 1)
        $tmp = $list[$i]
        $list[$i] = $list[$j]
        $list[$j] = $tmp
    }
    return $list.ToArray()
}

$allQuiz = [ordered]@{}

foreach ($lvl in $levels) {
    $targets = if ($lvl -eq 'N1') {
        @{
            vocab_reading = 95
            vocab_meaning = 85
            sentence_fill = 70
            sentence_reading = 40
            kanji_from_reading = 35
            kanji_hanviet = 35
            total = 360
        }
    } elseif ($lvl -eq 'N2') {
        @{
            vocab_reading = 70
            vocab_meaning = 60
            sentence_fill = 50
            sentence_reading = 30
            kanji_from_reading = 25
            kanji_hanviet = 25
            total = 260
        }
    } else {
        @{
            vocab_reading = 45
            vocab_meaning = 35
            sentence_fill = 30
            sentence_reading = 20
            kanji_from_reading = 15
            kanji_hanviet = 15
            total = 160
        }
    }
    Write-Host "Generating $($targets.total) questions for $($lvl)..."
    $chars = @($db.psobject.properties | Where-Object { $_.Value.level -eq $lvl })
    
    # Collect pool of kanji info
    $kanjiList = @()
    foreach ($c in $chars) {
        $k = $c.Name
        $val = $c.Value
        $hv = if ($val.hanViet -and $val.hanViet -ne 'HÁN TỰ' -and $val.hanViet -ne 'HÁN') { $val.hanViet } else { $hvMap[$k] }
        if (-not $hv) { $hv = "HÁN TỰ" }
        $meaning = Get-CleanMeaning $val.meaning
        $mnemonic = if ($val.mnemonic) { $val.mnemonic } else { "Chiết tự chữ '$($k)': Hãy quan sát kỹ cấu tạo nét bút để liên kết ghi nhớ." }
        
        $vocabs = @()
        if ($val.vocab) {
            foreach ($v in $val.vocab) {
                if ($v.word -and $v.word.Length -ge 1 -and $v.reading -and $v.reading -ne '...' -and $v.meaning_vi) {
                    $vocabs += [PSCustomObject]@{
                        Word = $v.word
                        Reading = $v.reading
                        Meaning = $v.meaning_vi
                    }
                }
            }
        }
        
        $exampleObj = $null
        if ($val.example -and $val.example.sentence -and ($val.example.sentence -notlike '*と書きます*')) {
            # Find matched vocab
            $matchedV = $null
            foreach ($v in $vocabs) {
                if ($val.example.sentence.Contains($v.Word)) {
                    $matchedV = $v
                    break
                }
            }
            $exampleObj = [PSCustomObject]@{
                Sentence = $val.example.sentence
                Reading = $val.example.reading
                Translation = $val.example.translation
                MatchedVocab = $matchedV
            }
        }
        
        $kanjiList += [PSCustomObject]@{
            Kanji = $k
            HanViet = $hv
            Meaning = $meaning
            Mnemonic = $mnemonic
            Vocabs = $vocabs
            Example = $exampleObj
        }
    }

    # All available readings, meanings, words
    $allReadings = @()
    $allMeanings = @()
    $allWords = @()
    foreach ($item in $kanjiList) {
        foreach ($v in $item.Vocabs) {
            if ($v.Reading -and -not $allReadings.Contains($v.Reading)) { $allReadings += $v.Reading }
            if ($v.Meaning -and -not $allMeanings.Contains($v.Meaning)) { $allMeanings += $v.Meaning }
            if ($v.Word -and -not $allWords.Contains($v.Word)) { $allWords += $v.Word }
        }
    }
    
    $questions = [System.Collections.Generic.List[object]]::new()
    $usedVocabKeys = [System.Collections.Generic.HashSet[string]]::new()
    $usedSentences = [System.Collections.Generic.HashSet[string]]::new()
    $rnd = [System.Random]::new(98765 + $lvl.GetHashCode())

    # --- Dạng 1: Đọc từ vựng (vocab_reading) ---
    $kanjiWithVocab = Shuffle-Array @($kanjiList | Where-Object { $_.Vocabs.Count -gt 0 })
    $qCount = 0
    foreach ($kItem in $kanjiWithVocab) {
        if ($qCount -ge $targets.vocab_reading) { break }
        $chosenV = $null
        foreach ($v in $kItem.Vocabs) {
            $key = "$($kItem.Kanji)_$($v.Word)"
            if (-not $usedVocabKeys.Contains($key)) {
                $chosenV = $v
                $null = $usedVocabKeys.Add($key)
                break
            }
        }
        if (-not $chosenV) { $chosenV = $kItem.Vocabs[$rnd.Next($kItem.Vocabs.Count)] }
        
        $correctReading = $chosenV.Reading
        $wrong = [System.Collections.Generic.List[string]]::new()
        
        # Phonetic variants
        $phoneticVariations = @()
        if ($correctReading.Contains("っ")) { $phoneticVariations += $correctReading.Replace("っ", "く") }
        if ($correctReading.Contains("ん")) { $phoneticVariations += $correctReading.Replace("ん", "む") }
        if ($correctReading.EndsWith("う")) { $phoneticVariations += $correctReading.Substring(0, $correctReading.Length - 1) + "お" }
        if ($correctReading.Contains("が")) { $phoneticVariations += $correctReading.Replace("が", "か") }
        if ($correctReading.Contains("じ")) { $phoneticVariations += $correctReading.Replace("じ", "し") }
        if ($correctReading.Contains("ば")) { $phoneticVariations += $correctReading.Replace("ば", "は") }
        
        foreach ($pv in $phoneticVariations) {
            if ($pv -ne $correctReading -and -not $wrong.Contains($pv)) {
                $wrong.Add($pv)
                if ($wrong.Count -ge 3) { break }
            }
        }
        
        $shuffledReadings = Shuffle-Array $allReadings
        foreach ($r in $shuffledReadings) {
            if ($wrong.Count -ge 3) { break }
            if ($r -ne $correctReading -and -not $wrong.Contains($r)) {
                $wrong.Add($r)
            }
        }
        if ($wrong.Count -lt 3) { continue }
        
        $opts = @($correctReading, $wrong[0], $wrong[1], $wrong[2])
        $shuffledOpts = Shuffle-Array $opts
        $corrIdx = [array]::IndexOf($shuffledOpts, $correctReading)
        
        $qObj = [ordered]@{
            id = "$($lvl.ToLower())_q$($questions.Count + 1)"
            level = $lvl
            type = "vocab_reading"
            typeName = "Đọc từ vựng"
            typeBadge = "📖 Đọc từ vựng"
            kanji = $kItem.Kanji
            word = $chosenV.Word
            targetReading = $chosenV.Reading
            targetMeaning = $chosenV.Meaning
            question = "Từ vựng 「$($chosenV.Word)」 (lấy từ chữ $($kItem.Kanji) - $($kItem.HanViet)) có cách đọc Hiragana là gì?"
            context = ""
            contextTrans = ""
            options = $shuffledOpts
            correctIndex = $corrIdx
            explanation = "Đáp án đúng: **$($chosenV.Reading)**. Từ vựng 「$($chosenV.Word)」 mang nghĩa là '$($chosenV.Meaning)' (Âm Hán Việt: $($kItem.HanViet)). Mẹo nhớ chữ $($kItem.Kanji): $($kItem.Mnemonic)"
            ttsText = $chosenV.Word
        }
        $questions.Add($qObj)
        $qCount++
    }

    # --- Dạng 2: Ý nghĩa từ vựng (vocab_meaning) ---
    $kanjiWithVocab2 = Shuffle-Array @($kanjiList | Where-Object { $_.Vocabs.Count -gt 0 })
    $qCount = 0
    foreach ($kItem in $kanjiWithVocab2) {
        if ($qCount -ge $targets.vocab_meaning) { break }
        $chosenV = $null
        foreach ($v in $kItem.Vocabs) {
            $key = "m_$($kItem.Kanji)_$($v.Word)"
            if (-not $usedVocabKeys.Contains($key)) {
                $chosenV = $v
                $null = $usedVocabKeys.Add($key)
                break
            }
        }
        if (-not $chosenV) { $chosenV = $kItem.Vocabs[$rnd.Next($kItem.Vocabs.Count)] }
        
        $correctMeaning = $chosenV.Meaning
        $wrong = [System.Collections.Generic.List[string]]::new()
        $shuffledMeanings = Shuffle-Array $allMeanings
        foreach ($m in $shuffledMeanings) {
            if ($wrong.Count -ge 3) { break }
            if ($m -ne $correctMeaning -and -not $wrong.Contains($m) -and $m.Length -gt 1) {
                $wrong.Add($m)
            }
        }
        if ($wrong.Count -lt 3) { continue }
        
        $opts = @($correctMeaning, $wrong[0], $wrong[1], $wrong[2])
        $shuffledOpts = Shuffle-Array $opts
        $corrIdx = [array]::IndexOf($shuffledOpts, $correctMeaning)
        
        $qObj = [ordered]@{
            id = "$($lvl.ToLower())_q$($questions.Count + 1)"
            level = $lvl
            type = "vocab_meaning"
            typeName = "Nghĩa của từ vựng"
            typeBadge = "💡 Nghĩa từ vựng"
            kanji = $kItem.Kanji
            word = $chosenV.Word
            targetReading = $chosenV.Reading
            targetMeaning = $chosenV.Meaning
            question = "Từ vựng 「$($chosenV.Word)」 ($($chosenV.Reading)) có ý nghĩa tiếng Việt là gì?"
            context = ""
            contextTrans = ""
            options = $shuffledOpts
            correctIndex = $corrIdx
            explanation = "Đáp án đúng: **$($chosenV.Meaning)**. Từ 「$($chosenV.Word)」 phát âm là '$($chosenV.Reading)', cấu tạo từ chữ Hán $($kItem.Kanji) ($($kItem.HanViet))."
            ttsText = $chosenV.Word
        }
        $questions.Add($qObj)
        $qCount++
    }

    # --- Dạng 3: Điền từ vào câu ví dụ (sentence_fill) ---
    $kanjiWithEx = Shuffle-Array @($kanjiList | Where-Object { $_.Example -and $_.Example.MatchedVocab })
    $qCount = 0
    foreach ($kItem in $kanjiWithEx) {
        if ($qCount -ge $targets.sentence_fill) { break }
        $ex = $kItem.Example
        if ($usedSentences.Contains($ex.Sentence)) { continue }
        $v = $ex.MatchedVocab
        $targetWord = $v.Word
        
        $blankSentence = $ex.Sentence.Replace($targetWord, " [ ? ] ")
        if ($blankSentence -eq $ex.Sentence) { continue }
        $null = $usedSentences.Add($ex.Sentence)
        
        $wrong = [System.Collections.Generic.List[string]]::new()
        $shuffledWords = Shuffle-Array $allWords
        foreach ($w in $shuffledWords) {
            if ($wrong.Count -ge 3) { break }
            if ($w -ne $targetWord -and -not $wrong.Contains($w) -and [Math]::Abs($w.Length - $targetWord.Length) -le 1) {
                $wrong.Add($w)
            }
        }
        if ($wrong.Count -lt 3) {
            foreach ($w in $shuffledWords) {
                if ($wrong.Count -ge 3) { break }
                if ($w -ne $targetWord -and -not $wrong.Contains($w)) {
                    $wrong.Add($w)
                }
            }
        }
        if ($wrong.Count -lt 3) { continue }
        
        $opts = @($targetWord, $wrong[0], $wrong[1], $wrong[2])
        $shuffledOpts = Shuffle-Array $opts
        $corrIdx = [array]::IndexOf($shuffledOpts, $targetWord)
        
        $qObj = [ordered]@{
            id = "$($lvl.ToLower())_q$($questions.Count + 1)"
            level = $lvl
            type = "sentence_fill"
            typeName = "Điền từ vào câu ví dụ"
            typeBadge = "✍️ Điền câu ví dụ"
            kanji = $kItem.Kanji
            word = $targetWord
            targetReading = $v.Reading
            targetMeaning = $v.Meaning
            question = "Chọn từ/chữ thích hợp điền vào chỗ trống [ ? ] trong câu ví dụ sau:"
            context = $blankSentence
            contextTrans = "Dịch câu: $($ex.Translation)"
            options = $shuffledOpts
            correctIndex = $corrIdx
            explanation = "Đáp án đúng: **$($targetWord)** ($($v.Reading) - $($v.Meaning)). Câu hoàn chỉnh: 「$($ex.Sentence)」 ($($ex.Translation))."
            ttsText = $ex.Sentence
        }
        $questions.Add($qObj)
        $qCount++
    }

    # --- Dạng 4: Đọc từ trong câu ví dụ (sentence_reading) ---
    $kanjiWithEx2 = Shuffle-Array @($kanjiList | Where-Object { $_.Example -and $_.Example.MatchedVocab })
    $qCount = 0
    foreach ($kItem in $kanjiWithEx2) {
        if ($qCount -ge $targets.sentence_reading) { break }
        $ex = $kItem.Example
        $v = $ex.MatchedVocab
        $targetWord = $v.Word
        $correctReading = $v.Reading
        
        $highlightedSentence = $ex.Sentence.Replace($targetWord, "【$targetWord】")
        
        $wrong = [System.Collections.Generic.List[string]]::new()
        $shuffledReadings = Shuffle-Array $allReadings
        foreach ($r in $shuffledReadings) {
            if ($wrong.Count -ge 3) { break }
            if ($r -ne $correctReading -and -not $wrong.Contains($r)) {
                $wrong.Add($r)
            }
        }
        if ($wrong.Count -lt 3) { continue }
        
        $opts = @($correctReading, $wrong[0], $wrong[1], $wrong[2])
        $shuffledOpts = Shuffle-Array $opts
        $corrIdx = [array]::IndexOf($shuffledOpts, $correctReading)
        
        $qObj = [ordered]@{
            id = "$($lvl.ToLower())_q$($questions.Count + 1)"
            level = $lvl
            type = "sentence_reading"
            typeName = "Đọc từ trong câu ví dụ"
            typeBadge = "🔍 Đọc từ trong câu"
            kanji = $kItem.Kanji
            word = $targetWord
            targetReading = $correctReading
            targetMeaning = $v.Meaning
            question = "Trong câu ví dụ sau, từ trong ngoặc vuông 【$($targetWord)】 được đọc là gì?"
            context = $highlightedSentence
            contextTrans = "Dịch câu: $($ex.Translation)"
            options = $shuffledOpts
            correctIndex = $corrIdx
            explanation = "Đáp án đúng: **$($correctReading)**. Từ 「$($targetWord)」 mang nghĩa là '$($v.Meaning)'. Dịch câu: $($ex.Translation)."
            ttsText = $targetWord
        }
        $questions.Add($qObj)
        $qCount++
    }

    # --- Dạng 5: Tìm chữ Hán từ cách đọc Hiragana (kanji_from_reading) ---
    $kanjiWithVocab3 = Shuffle-Array @($kanjiList | Where-Object { $_.Vocabs.Count -gt 0 })
    $qCount = 0
    foreach ($kItem in $kanjiWithVocab3) {
        if ($qCount -ge $targets.kanji_from_reading) { break }
        $v = $kItem.Vocabs[$rnd.Next($kItem.Vocabs.Count)]
        $targetWord = $v.Word
        if ($targetWord.Length -lt 2) { continue }
        
        $wrong = [System.Collections.Generic.List[string]]::new()
        $shuffledWords = Shuffle-Array $allWords
        foreach ($w in $shuffledWords) {
            if ($wrong.Count -ge 3) { break }
            if ($w -ne $targetWord -and $w.Length -eq $targetWord.Length -and -not $wrong.Contains($w)) {
                $wrong.Add($w)
            }
        }
        if ($wrong.Count -lt 3) {
            foreach ($w in $shuffledWords) {
                if ($wrong.Count -ge 3) { break }
                if ($w -ne $targetWord -and -not $wrong.Contains($w)) {
                    $wrong.Add($w)
                }
            }
        }
        if ($wrong.Count -lt 3) { continue }
        
        $opts = @($targetWord, $wrong[0], $wrong[1], $wrong[2])
        $shuffledOpts = Shuffle-Array $opts
        $corrIdx = [array]::IndexOf($shuffledOpts, $targetWord)
        
        $qObj = [ordered]@{
            id = "$($lvl.ToLower())_q$($questions.Count + 1)"
            level = $lvl
            type = "kanji_from_reading"
            typeName = "Tìm chữ Hán tương ứng"
            typeBadge = "🏷️ Viết chữ Hán"
            kanji = $kItem.Kanji
            word = $targetWord
            targetReading = $v.Reading
            targetMeaning = $v.Meaning
            question = "Từ vựng có cách đọc 「$($v.Reading)」 (mang nghĩa '$($v.Meaning)') được viết bằng chữ Hán nào?"
            context = ""
            contextTrans = ""
            options = $shuffledOpts
            correctIndex = $corrIdx
            explanation = "Đáp án đúng: **$($targetWord)**. Từ này có cách đọc là '$($v.Reading)', mang nghĩa '$($v.Meaning)', chứa chữ Hán $($kItem.Kanji) ($($kItem.HanViet))."
            ttsText = $targetWord
        }
        $questions.Add($qObj)
        $qCount++
    }

    # --- Dạng 6: Hán tự & Âm Hán Việt (kanji_hanviet) ---
    $shuffledK6 = Shuffle-Array $kanjiList
    $qCount = 0
    foreach ($kItem in $shuffledK6) {
        if ($qCount -ge $targets.kanji_hanviet) { break }
        $correctOpt = "$($kItem.HanViet) ($($kItem.Meaning.Split(',')[0].Trim()))"
        
        $wrong = [System.Collections.Generic.List[string]]::new()
        $shuffledAll = Shuffle-Array $kanjiList
        foreach ($other in $shuffledAll) {
            if ($wrong.Count -ge 3) { break }
            $wOpt = "$($other.HanViet) ($($other.Meaning.Split(',')[0].Trim()))"
            if ($other.Kanji -ne $kItem.Kanji -and $wOpt -ne $correctOpt -and -not $wrong.Contains($wOpt)) {
                $wrong.Add($wOpt)
            }
        }
        if ($wrong.Count -lt 3) { continue }
        
        $opts = @($correctOpt, $wrong[0], $wrong[1], $wrong[2])
        $shuffledOpts = Shuffle-Array $opts
        $corrIdx = [array]::IndexOf($shuffledOpts, $correctOpt)
        
        $qObj = [ordered]@{
            id = "$($lvl.ToLower())_q$($questions.Count + 1)"
            level = $lvl
            type = "kanji_hanviet"
            typeName = "Hán tự & Âm Hán Việt"
            typeBadge = "🎴 Hán tự & Hán Việt"
            kanji = $kItem.Kanji
            word = $kItem.Kanji
            targetReading = ""
            targetMeaning = $kItem.Meaning
            question = "Chữ Hán 「$($kItem.Kanji)」 có Âm Hán Việt và ý nghĩa là gì?"
            context = ""
            contextTrans = ""
            options = $shuffledOpts
            correctIndex = $corrIdx
            explanation = "Chữ 「$($kItem.Kanji)」 có âm Hán Việt là **$($kItem.HanViet)**, nghĩa: $($kItem.Meaning). Mẹo nhớ: $($kItem.Mnemonic)"
            ttsText = $kItem.Kanji
        }
        $questions.Add($qObj)
        $qCount++
    }

    # Fill up to exactly target questions if needed
    while ($questions.Count -lt $targets.total) {
        $extraK = $kanjiWithVocab[$rnd.Next($kanjiWithVocab.Count)]
        $v = $extraK.Vocabs[$rnd.Next($extraK.Vocabs.Count)]
        $correctReading = $v.Reading
        
        $wrong = [System.Collections.Generic.List[string]]::new()
        $shuffledReadings = Shuffle-Array $allReadings
        foreach ($r in $shuffledReadings) {
            if ($wrong.Count -ge 3) { break }
            if ($r -ne $correctReading -and -not $wrong.Contains($r)) {
                $wrong.Add($r)
            }
        }
        if ($wrong.Count -lt 3) { continue }
        
        $opts = @($correctReading, $wrong[0], $wrong[1], $wrong[2])
        $shuffledOpts = Shuffle-Array $opts
        $corrIdx = [array]::IndexOf($shuffledOpts, $correctReading)
        
        $qObj = [ordered]@{
            id = "$($lvl.ToLower())_q$($questions.Count + 1)"
            level = $lvl
            type = "vocab_reading"
            typeName = "Đọc từ vựng"
            typeBadge = "📖 Đọc từ vựng"
            kanji = $extraK.Kanji
            word = $v.Word
            targetReading = $v.Reading
            targetMeaning = $v.Meaning
            question = "Từ vựng 「$($v.Word)」 (lấy từ chữ $($extraK.Kanji) - $($extraK.HanViet)) có cách đọc Hiragana là gì?"
            context = ""
            contextTrans = ""
            options = $shuffledOpts
            correctIndex = $corrIdx
            explanation = "Đáp án đúng: **$($v.Reading)**. Từ vựng 「$($v.Word)」 mang nghĩa là '$($v.Meaning)' (Âm Hán Việt: $($extraK.HanViet))."
            ttsText = $v.Word
        }
        $questions.Add($qObj)
    }

    Write-Host "Generated $($questions.Count) questions for $($lvl)."
    $allQuiz[$lvl] = $questions
}

# Convert to JSON and save as quiz_data.js
$jsonStr = $allQuiz | ConvertTo-Json -Depth 10
$jsContent = "// Kho dữ liệu 1100 câu hỏi trắc nghiệm Quiz Kanji JLPT N5 - N1 (N5-N3: 160 câu, N2: 260 câu, N1: 360 câu)`n// Đa dạng các dạng câu hỏi: Đọc từ vựng, Nghĩa từ vựng, Điền câu ví dụ, Đọc từ trong câu, Viết chữ Hán, Hán tự & Hán Việt`nwindow.QUIZ_DATABASE = $jsonStr;`nif (typeof module !== 'undefined' && module.exports) { module.exports = window.QUIZ_DATABASE; }"

$targetPath = Join-Path (Get-Location) "quiz_data.js"
[System.IO.File]::WriteAllText($targetPath, $jsContent, [System.Text.Encoding]::UTF8)
Write-Host "Successfully generated 1100 quiz questions in $targetPath!"
