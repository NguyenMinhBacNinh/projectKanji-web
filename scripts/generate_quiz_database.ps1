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
    Write-Host "Generating 60 questions for $($lvl)..."
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
            # Check if any vocab in example
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

    # All available readings for distractors
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
    $rnd = [System.Random]::new(12345 + $lvl.GetHashCode())

    # --- 1. Dạng 1: Đọc từ vựng (vocab_reading) - 20 câu ---
    $kanjiWithVocab = @($kanjiList | Where-Object { $_.Vocabs.Count -gt 0 })
    $shuffledK1 = Shuffle-Array $kanjiWithVocab
    $qCount = 0
    foreach ($kItem in $shuffledK1) {
        if ($qCount -ge 20) { break }
        $v = $kItem.Vocabs[$rnd.Next($kItem.Vocabs.Count)]
        
        # Build 3 distinct wrong readings
        $correctReading = $v.Reading
        $wrong = [System.Collections.Generic.List[string]]::new()
        
        # Try generating plausible phonetic variations
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
        
        # Fill remaining with other random readings
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
            word = $v.Word
            targetReading = $v.Reading
            targetMeaning = $v.Meaning
            question = "Từ vựng 「$($v.Word)」 (lấy từ chữ $($kItem.Kanji) - $($kItem.HanViet)) có cách đọc Hiragana là gì?"
            context = ""
            contextTrans = ""
            options = $shuffledOpts
            correctIndex = $corrIdx
            explanation = "Đáp án đúng: **$($v.Reading)**. Từ vựng 「$($v.Word)」 mang nghĩa là '$($v.Meaning)' (Âm Hán Việt: $($kItem.HanViet)). Mẹo nhớ chữ $($kItem.Kanji): $($kItem.Mnemonic)"
            ttsText = $v.Word
        }
        $questions.Add($qObj)
        $qCount++
    }

    # --- 2. Dạng 2: Ý nghĩa từ vựng (vocab_meaning) - 15 câu ---
    $shuffledK2 = Shuffle-Array $kanjiWithVocab
    $qCount = 0
    foreach ($kItem in $shuffledK2) {
        if ($qCount -ge 15) { break }
        $v = $kItem.Vocabs[$rnd.Next($kItem.Vocabs.Count)]
        $correctMeaning = $v.Meaning
        
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
            word = $v.Word
            targetReading = $v.Reading
            targetMeaning = $v.Meaning
            question = "Từ vựng 「$($v.Word)」 ($($v.Reading)) có ý nghĩa tiếng Việt là gì?"
            context = ""
            contextTrans = ""
            options = $shuffledOpts
            correctIndex = $corrIdx
            explanation = "Đáp án đúng: **$($v.Meaning)**. Từ 「$($v.Word)」 phát âm là '$($v.Reading)', cấu tạo từ chữ Hán $($kItem.Kanji) ($($kItem.HanViet))."
            ttsText = $v.Word
        }
        $questions.Add($qObj)
        $qCount++
    }

    # --- 3. Dạng 3: Điền từ vào câu ví dụ (sentence_fill) - 12 câu ---
    $kanjiWithExVocab = @($kanjiList | Where-Object { $_.Example -and $_.Example.MatchedVocab })
    $shuffledK3 = Shuffle-Array $kanjiWithExVocab
    $qCount = 0
    foreach ($kItem in $shuffledK3) {
        if ($qCount -ge 12) { break }
        $ex = $kItem.Example
        $v = $ex.MatchedVocab
        $targetWord = $v.Word
        
        # Replace word with [ ? ]
        $blankSentence = $ex.Sentence.Replace($targetWord, " [ ? ] ")
        if ($blankSentence -eq $ex.Sentence) { continue }
        
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

    # --- 4. Dạng 4: Đọc từ trong câu ví dụ (sentence_reading) - 7 câu ---
    $shuffledK4 = Shuffle-Array $kanjiWithExVocab
    $qCount = 0
    foreach ($kItem in $shuffledK4) {
        if ($qCount -ge 7) { break }
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

    # --- 5. Dạng 5: Chữ Hán & Âm Hán Việt (kanji_hanviet) - 6 câu ---
    $shuffledK5 = Shuffle-Array $kanjiList
    $qCount = 0
    foreach ($kItem in $shuffledK5) {
        if ($qCount -ge 6) { break }
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

    # If not yet exactly 60, fill up with more vocab_reading or vocab_meaning
    while ($questions.Count -lt 60) {
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
$jsContent = "// Kho dữ liệu 300 câu hỏi trắc nghiệm Quiz Kanji JLPT N5 - N1`n// Mỗi trình độ 60 câu hỏi đa dạng: Đọc từ vựng, Ý nghĩa từ vựng, Điền câu ví dụ, Nhận diện Hán tự`nwindow.QUIZ_DATABASE = $jsonStr;`nif (typeof module !== 'undefined' && module.exports) { module.exports = window.QUIZ_DATABASE; }"

$targetPath = Join-Path (Get-Location) "quiz_data.js"
[System.IO.File]::WriteAllText($targetPath, $jsContent, [System.Text.Encoding]::UTF8)
Write-Host "Successfully generated quiz_data.js at $targetPath!"
