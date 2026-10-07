[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$port = 9222
$url = "file:///c:/Users/admin/Kanji-web/index.html"

Get-Process msedge -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*$port*" } | Stop-Process -Force -ErrorAction SilentlyContinue

$proc = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--window-size=1200,1600", "--remote-debugging-port=$port", "--user-data-dir=$env:TEMP\edge_dev_profile_ss", $url -PassThru

Start-Sleep -Seconds 3

try {
    $page = $null
    for ($i = 0; $i -lt 10; $i++) {
        $pages = Invoke-RestMethod -Uri "http://localhost:$port/json"
        $page = $pages | Where-Object { $_.type -eq "page" -and $_.url -like "*index.html*" } | Select-Object -First 1
        if ($page) { break }
        Start-Sleep -Seconds 1
    }

    $wsUrl = $page.webSocketDebuggerUrl
    $ws = New-Object System.Net.WebSockets.ClientWebSocket
    $ct = [System.Threading.CancellationToken]::None
    $ws.ConnectAsync([System.Uri]$wsUrl, $ct).Wait()

    function Send-CDPCommand($method, $params) {
        $id = Get-Random
        $cmdObj = @{ id = $id; method = $method; params = $params }
        $json = $cmdObj | ConvertTo-Json -Depth 10 -Compress
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
        $segment = [System.ArraySegment[byte]]::new($bytes)
        $ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $ct).Wait()

        $buffer = [byte[]]::new(1048576)
        $ms = New-Object System.IO.MemoryStream
        do {
            $recvSegment = [System.ArraySegment[byte]]::new($buffer)
            $res = $ws.ReceiveAsync($recvSegment, $ct).Result
            $ms.Write($buffer, 0, $res.Count)
        } while (-not $res.EndOfMessage)

        $respBytes = $ms.ToArray()
        $respStr = [System.Text.Encoding]::UTF8.GetString($respBytes)
        return $respStr | ConvertFrom-Json
    }

    Start-Sleep -Seconds 2
    $ss = Send-CDPCommand "Page.captureScreenshot" @{ format = "png" }
    if ($ss.result -and $ss.result.data) {
        $imgBytes = [System.Convert]::FromBase64String($ss.result.data)
        [System.IO.File]::WriteAllBytes("c:\Users\admin\Kanji-web\kanji_one_screenshot.png", $imgBytes)
        Write-Host "Screenshot saved successfully to c:\Users\admin\Kanji-web\kanji_one_screenshot.png"
    }

    $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "done", $ct).Wait()
} finally {
    Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
}
