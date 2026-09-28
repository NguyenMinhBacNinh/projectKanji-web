[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$candDb = [System.IO.File]::ReadAllText("data/n321_selected_candidates.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$cacheDb = [System.IO.File]::ReadAllText("data/gloss_translation_cache.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$vettedDb = [System.IO.File]::ReadAllText("data/vetted_vocab_dict.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json

$cache = @{}
foreach ($p in $cacheDb.psobject.Properties) { $cache[$p.Name] = $p.Value }
$vetted = @{}
foreach ($p in $vettedDb.psobject.Properties) { $vetted[$p.Name] = $p.Value }

$englishStopwords = New-Object 'System.Collections.Generic.HashSet[string]'
@('the', 'of', 'and', 'in', 'to', 'for', 'with', 'on', 'at', 'from', 'by', 'about', 'as', 'into', 'like', 'through', 'after', 'over', 'between', 'out', 'against', 'during', 'without', 'before', 'under', 'around', 'among', 'being', 'having', 'someone', 'something', 'one', 'oneself', 'etc', 'esp', 'usually') | ForEach-Object { [void]$englishStopwords.Add($_) }

$totalVocab = 0
$hasVietnamese = 0
$actualEnglish = @()
$missingGloss = @()

foreach ($prop in $candDb.psobject.Properties) {
    foreach ($v in $prop.Value.vocab) {
        $totalVocab++
        $w = $v.word
        $vn = $null
        if ($vetted.ContainsKey($w)) {
            $vn = $vetted[$w]
        } else {
            $clean = ($v.gloss -split ';')[0].Trim() -replace '\(.*?\)', '' -replace '^to\s+', '' -replace '^a\s+', '' -replace '^an\s+', '' -replace '^the\s+', ''
            $clean = $clean.Trim().ToLower()
            if ($cache.ContainsKey($clean)) {
                $vn = $cache[$clean]
            }
        }

        if (-not $vn) {
            $missingGloss += [PSCustomObject]@{ Word = $w; Gloss = $v.gloss; Clean = $clean }
            continue
        }

        # Kiểm tra xem có chứa từ tiếng Anh không
        $isEng = $false
        $tokens = ($vn.ToLower() -split '[\s,;\.\-\(\)\/]+') | Where-Object { $_ }
        foreach ($tok in $tokens) {
            if ($englishStopwords.Contains($tok)) {
                $isEng = $true
                break
            }
        }

        if ($isEng) {
            $actualEnglish += [PSCustomObject]@{ Word = $w; Gloss = $v.gloss; Clean = $clean; Vn = $vn }
        } else {
            $hasVietnamese++
        }
    }
}

Write-Host "Tổng số vocabulary N3, N2, N1: $totalVocab"
Write-Host "Số vocabulary có nghĩa tiếng Việt chuẩn: $hasVietnamese"
Write-Host "Số vocabulary còn tiếng Anh: $($actualEnglish.Count)"
Write-Host "Số vocabulary thiếu gloss dịch: $($missingGloss.Count)"

if ($actualEnglish.Count -gt 0) {
    Write-Host "`nMẫu 10 từ còn tiếng Anh:"
    $actualEnglish | Select-Object -First 10 | ForEach-Object {
        Write-Host "  $($_.Word) | gloss: $($_.Gloss) | clean: $($_.Clean) | vn: $($_.Vn)"
    }
}
