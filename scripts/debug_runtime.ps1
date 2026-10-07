[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$port = 9222
$url = "file:///c:/Users/admin/Kanji-web/index.html"

# Clean up any old msedge
Get-Process msedge -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*$port*" } | Stop-Process -Force -ErrorAction SilentlyContinue

$proc = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--remote-debugging-port=$port", "--user-data-dir=$env:TEMP\edge_dev_profile_2", $url -PassThru

Start-Sleep -Seconds 3

try {
    # Wait up to 10 seconds for the index.html page to be ready
    $page = $null
    for ($i = 0; $i -lt 10; $i++) {
        $pages = Invoke-RestMethod -Uri "http://localhost:$port/json"
        $page = $pages | Where-Object { $_.type -eq "page" -and $_.url -like "*index.html*" } | Select-Object -First 1
        if ($page) { break }
        Start-Sleep -Seconds 1
    }

    if (-not $page) {
        Write-Host "No index.html page found! Targets were:"
        $pages | Format-Table -Property id, type, url | Out-String | Write-Host
        exit 1
    }
    
    Write-Host "Connected to page URL: $($page.url)"
    $wsUrl = $page.webSocketDebuggerUrl

    $ws = New-Object System.Net.WebSockets.ClientWebSocket
    $ct = [System.Threading.CancellationToken]::None
    $ws.ConnectAsync([System.Uri]$wsUrl, $ct).Wait()

    function Send-CDPCommand($method, $params) {
        $id = Get-Random
        $cmdObj = @{
            id = $id
            method = $method
            params = $params
        }
        $json = $cmdObj | ConvertTo-Json -Depth 10 -Compress
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
        $segment = [System.ArraySegment[byte]]::new($bytes)
        $ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $ct).Wait()

        $buffer = [byte[]]::new(65536)
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

    $scriptToRun = @"
(() => {
    const kanji = '一';
    let info = null;
    try {
        info = window.getKanjiInfo ? window.getKanjiInfo(kanji) : null;
    } catch(e) {
        info = { error: e.toString() };
    }

    const mainJp = document.getElementById('mainExampleSentenceJp');
    const mainVn = document.getElementById('mainExampleSentenceVn');
    const backJp = document.getElementById('exampleSentenceJp');
    const backVn = document.getElementById('exampleSentenceVn');

    return JSON.stringify({
        kanji: kanji,
        infoExists: !!info,
        infoExample: info ? info.example : null,
        infoExampleSentence: (info && info.example) ? info.example.sentence : null,
        infoExampleTranslation: (info && info.example) ? info.example.translation : null,
        mainExampleSentenceJp: {
            exists: !!mainJp,
            innerHTML: mainJp ? mainJp.innerHTML : null,
            textContent: mainJp ? mainJp.textContent : null,
            computedStyle: mainJp ? {
                display: window.getComputedStyle(mainJp).display,
                visibility: window.getComputedStyle(mainJp).visibility,
                opacity: window.getComputedStyle(mainJp).opacity,
                color: window.getComputedStyle(mainJp).color,
                fontSize: window.getComputedStyle(mainJp).fontSize,
                height: window.getComputedStyle(mainJp).height,
                offsetHeight: mainJp.offsetHeight,
                offsetWidth: mainJp.offsetWidth
            } : null,
            parentComputedStyle: (mainJp && mainJp.parentElement) ? {
                className: mainJp.parentElement.className,
                display: window.getComputedStyle(mainJp.parentElement).display,
                visibility: window.getComputedStyle(mainJp.parentElement).visibility,
                opacity: window.getComputedStyle(mainJp.parentElement).opacity,
                offsetHeight: mainJp.parentElement.offsetHeight
            } : null
        },
        mainExampleSentenceVn: {
            exists: !!mainVn,
            innerHTML: mainVn ? mainVn.innerHTML : null,
            textContent: mainVn ? mainVn.textContent : null
        },
        backExampleSentenceJp: {
            exists: !!backJp,
            innerHTML: backJp ? backJp.innerHTML : null,
            textContent: backJp ? backJp.textContent : null
        },
        backExampleSentenceVn: {
            exists: !!backVn,
            innerHTML: backVn ? backVn.innerHTML : null,
            textContent: backVn ? backVn.textContent : null
        }
    }, null, 2);
})()
"@

    $cdpResp = Send-CDPCommand "Runtime.evaluate" @{ expression = $scriptToRun; returnByValue = $true }
    Write-Host "`n=== KẾT QUẢ RUNTIME MỚI SAU KHI CẬP NHẬT ===" -ForegroundColor Green
    Write-Host $cdpResp.result.result.value

    $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "done", $ct).Wait()
} finally {
    Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
}
