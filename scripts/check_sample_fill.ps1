[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$jsRaw = [System.IO.File]::ReadAllText("$PSScriptRoot\..\quiz_data.js", [System.Text.Encoding]::UTF8)

if ($jsRaw -match 'window\.QUIZ_DATABASE\s*=\s*(\{[\s\S]+\});') {
    $json = $matches[1] | ConvertFrom-Json
    $levels = @('N5', 'N4', 'N3', 'N2', 'N1')
    foreach ($lvl in $levels) {
        $fillQ = @($json.$lvl | Where-Object { $_.type -eq 'sentence_fill' })
        if ($fillQ.Count -gt 0) {
            $q = $fillQ[0]
            Write-Host "`n=== Sample sentence_fill in $lvl ==="
            Write-Host "Question: $($q.question)"
            Write-Host "Context: $($q.context)"
            Write-Host "Context Trans: $($q.contextTrans)"
            Write-Host "Options: $($q.options -join ' | ')"
            Write-Host "Correct: $($q.correctIndex + 1) -> $($q.options[$q.correctIndex])"
            Write-Host "Explanation: $($q.explanation)"
        }
    }
}
