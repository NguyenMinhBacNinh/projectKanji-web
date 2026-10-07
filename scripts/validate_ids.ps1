[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$html = [System.IO.File]::ReadAllText("$PSScriptRoot\..\index.html", [System.Text.Encoding]::UTF8)

# Check all element IDs accessed in JS
$idMatches = [regex]::Matches($html, "document\.getElementById\('([^']+)'\)")
$missingIds = @()
foreach ($m in $idMatches) {
    $id = $m.Groups[1].Value
    if (-not $html.Contains("id=`"$id`"") -and -not $html.Contains("id='$id'")) {
        $missingIds += $id
    }
}

$uniqueMissing = @($missingIds | Select-Object -Unique)
Write-Host "Missing element IDs count: $($uniqueMissing.Count)"
foreach ($mid in $uniqueMissing) {
    Write-Host "  - Missing ID: $mid"
}

# Check querySelectorAll class targets
$classMatches = [regex]::Matches($html, "document\.querySelectorAll\('\.([^']+)'\)")
$missingClasses = @()
foreach ($m in $classMatches) {
    $cls = $m.Groups[1].Value
    if (-not $html.Contains("class=`"$cls") -and -not $html.Contains("class='$cls") -and -not $html.Contains(" $cls")) {
        $missingClasses += $cls
    }
}
$uniqueMissingCls = @($missingClasses | Select-Object -Unique)
Write-Host "Missing classes count: $($uniqueMissingCls.Count)"
foreach ($mcls in $uniqueMissingCls) {
    Write-Host "  - Missing Class: $mcls"
}
