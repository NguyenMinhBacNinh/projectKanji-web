[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Test with Windows Script Host JScript or PowerShell
$html = [System.IO.File]::ReadAllText("$PSScriptRoot\..\index.html", [System.Text.Encoding]::UTF8)

# Check script block bracket balance
$scriptMatches = [regex]::Matches($html, '<script>([\s\S]*?)<\/script>')
Write-Host "Found $($scriptMatches.Count) inline script blocks in index.html"

for ($s = 0; $s -lt $scriptMatches.Count; $s++) {
    $code = $scriptMatches[$s].Groups[1].Value
    $curly = 0
    $round = 0
    $square = 0
    $inString = $false
    $strChar = ''
    
    for ($i = 0; $i -lt $code.Length; $i++) {
        $ch = $code[$i]
        $prev = if ($i -gt 0) { $code[$i-1] } else { '' }
        
        if ($inString) {
            if ($ch -eq $strChar -and $prev -ne '\') {
                $inString = $false
            }
        } else {
            if ($ch -eq '"' -or $ch -eq "'" -or $ch -eq '`') {
                $inString = $true
                $strChar = $ch
            } elseif ($ch -eq '{') { $curly++ }
            elseif ($ch -eq '}') { $curly-- }
            elseif ($ch -eq '(') { $round++ }
            elseif ($ch -eq ')') { $round-- }
            elseif ($ch -eq '[') { $square++ }
            elseif ($ch -eq ']') { $square-- }
        }
    }
    
    Write-Host "Script block $s balance: curly=$curly, round=$round, square=$square"
}
