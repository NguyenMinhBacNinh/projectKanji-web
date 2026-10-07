[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$jsRaw = [System.IO.File]::ReadAllText("$PSScriptRoot\..\quiz_data.js", [System.Text.Encoding]::UTF8)

if ($jsRaw -match 'window\.QUIZ_DATABASE\s*=\s*(\{[\s\S]+\});') {
    $json = $matches[1] | ConvertFrom-Json
    $levels = @('N5', 'N4', 'N3', 'N2', 'N1')
    $totalQuestions = 0
    $errors = 0
    
    foreach ($lvl in $levels) {
        $qList = $json.$lvl
        Write-Host "Level $($lvl) question count: $($qList.Count)"
        $totalQuestions += $qList.Count
        
        $typeDistribution = @{}
        for ($i = 0; $i -lt $qList.Count; $i++) {
            $q = $qList[$i]
            $t = $q.type
            if ($typeDistribution.ContainsKey($t)) {
                $typeDistribution[$t]++
            } else {
                $typeDistribution[$t] = 1
            }
            if ($q.options.Count -ne 4) {
                Write-Host "Error in $($lvl) Q$($i+1): options count is $($q.options.Count)"
                $errors++
            }
            $uniqueOpts = @($q.options | Select-Object -Unique)
            if ($uniqueOpts.Count -ne 4) {
                Write-Host "Error in $($lvl) Q$($i+1): options not unique: $($q.options -join ' | ')"
                $errors++
            }
            if ($q.correctIndex -lt 0 -or $q.correctIndex -gt 3) {
                Write-Host "Error in $($lvl) Q$($i+1): correctIndex is $($q.correctIndex)"
                $errors++
            }
        }
        
        $typeSummary = ($typeDistribution.GetEnumerator() | ForEach-Object { "$($_.Key): $($_.Value)" }) -join ', '
        Write-Host "  -> Distribution: $typeSummary"
    }
    
    Write-Host "`nTotal Questions across all levels: $totalQuestions"
    Write-Host "Total Validation Errors: $errors"
} else {
    Write-Host "Could not match window.QUIZ_DATABASE regex!"
}
