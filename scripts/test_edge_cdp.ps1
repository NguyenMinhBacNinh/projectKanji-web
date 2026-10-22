[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

Write-Host "Edge path: $edgePath"

# Start Edge with remote debugging on port 9222
$proc = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--remote-debugging-port=9222", "http://127.0.0.1:8080/index.html" -PassThru

Start-Sleep -Seconds 3

try {
    # Check tabs via CDP
    $tabsJson = Invoke-RestMethod -Uri "http://127.0.0.1:9222/json"
    Write-Host "Tabs found: $($tabsJson.Count)"
    $wsUrl = $tabsJson[0].webSocketDebuggerUrl
    Write-Host "WebSocket URL: $wsUrl"
} catch {
    Write-Host "Error connecting to Edge CDP: $_"
} finally {
    if ($proc -and -not $proc.HasExited) {
        Stop-Process -Id $proc.Id -Force
    }
}
