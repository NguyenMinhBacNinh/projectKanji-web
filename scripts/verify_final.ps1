[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Check quiz_data.js exists and valid
$quizPath = "$PSScriptRoot\..\quiz_data.js"
if (-not (Test-Path $quizPath)) {
    Write-Host "quiz_data.js not found!"
    exit 1
}

$rawQuiz = [System.IO.File]::ReadAllText($quizPath, [System.Text.Encoding]::UTF8)
Write-Host "quiz_data.js size: $($rawQuiz.Length) bytes"

# Check JSON parsing
if ($rawQuiz -match 'window\.QUIZ_DATABASE\s*=\s*(\{[\s\S]+\});') {
    $data = $matches[1] | ConvertFrom-Json
    $levels = @('N5', 'N4', 'N3', 'N2', 'N1')
    foreach ($lvl in $levels) {
        $count = $data.$lvl.Count
        Write-Host "Level $($lvl): $count questions"
    }
} else {
    Write-Host "Error parsing QUIZ_DATABASE in quiz_data.js!"
}

# Check index.html
$indexPath = "$PSScriptRoot\..\index.html"
$rawIndex = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)
Write-Host "index.html size: $($rawIndex.Length) bytes"

$checks = @(
    "quiz_data.js",
    "quizSection",
    "quizLevelTabs",
    "quizFilterContainer",
    "quizPaletteModal",
    "quizResultModal",
    "initQuizForLevel",
    "renderQuizQuestion",
    "handleQuizOptionSelected",
    "btnOpenQuizPalette",
    "btnViewQuizResult"
)

foreach ($c in $checks) {
    if ($rawIndex.Contains($c)) {
        Write-Host "[OK] index.html contains $c"
    } else {
        Write-Host "[MISSING] index.html missing $c"
    }
}
