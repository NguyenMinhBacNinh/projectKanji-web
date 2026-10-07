[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$port = 9222
$url = "file:///c:/Users/admin/Kanji-web/index.html?kanji=父"

Get-Process msedge -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*$port*" } | Stop-Process -Force -ErrorAction SilentlyContinue

$proc = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--window-size=1200,1600", "--remote-debugging-port=$port", "--user-data-dir=$env:TEMP\edge_dev_profile_father", $url -PassThru

Start-Sleep -Seconds 3

try {
    $page = $null
    for ($i = 0; $i -lt 10; $i++) {
        $pages = Invoke-RestMethod -Uri "http://localhost:$port/json"
        $page = $pages | Where-Object { $_.type -eq "page" -and $_.url -like "*index.html*" } | Select-Object -First 1
        if ($page) { break }
        Start-Sleep -Seconds 1
    }

    if (-not $page) {
        Write-Host "No page found!"
        exit 1
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

    $evalScript = @"
(() => {
    const kanji = '父';
    const dbItem = window.KANJI_FULL_DATABASE ? window.KANJI_FULL_DATABASE[kanji] : null;
    const localInfo = window.getKanjiInfo ? window.getKanjiInfo(kanji) : null;
    const cacheKey = 'kanji_dict_' + kanji;
    const cacheRaw = localStorage.getItem(cacheKey);
    let cachedObj = null;
    try { cachedObj = JSON.parse(cacheRaw); } catch(e){}

    const mainJp = document.getElementById('mainExampleSentenceJp');
    const mainVn = document.getElementById('mainExampleSentenceVn');
    const backJp = document.getElementById('exampleSentenceJp');
    const backVn = document.getElementById('exampleSentenceVn');

    return JSON.stringify({
        databaseItem: dbItem ? {
            sentence: dbItem.example ? dbItem.example.sentence : null,
            translation: dbItem.example ? dbItem.example.translation : null
        } : 'NOT_FOUND',
        localInfo: localInfo ? {
            exampleSentence: localInfo.example ? localInfo.example.sentence : null,
            exampleTranslation: localInfo.example ? localInfo.example.translation : null,
            exampleJp: localInfo.exampleJp,
            exampleVn: localInfo.exampleVn
        } : 'NOT_FOUND',
        localStorageCache: cachedObj ? {
            exampleSentence: cachedObj.example ? cachedObj.example.sentence : null,
            exampleTranslation: cachedObj.example ? cachedObj.example.translation : null,
            exampleJp: cachedObj.exampleJp,
            exampleVn: cachedObj.exampleVn
        } : 'NO_CACHE',
        currentKanjiRendered: document.getElementById('kanjiBigText') ? document.getElementById('kanjiBigText').textContent : null,
        mainExampleSentenceJp: mainJp ? mainJp.innerHTML : null,
        mainExampleSentenceVn: mainVn ? mainVn.textContent : null,
        backExampleSentenceJp: backJp ? backJp.innerHTML : null,
        backExampleSentenceVn: backVn ? backVn.textContent : null
    }, null, 2);
})()
"@

    $res = Send-CDPCommand "Runtime.evaluate" @{ expression = $evalScript; returnByValue = $true }
    Write-Host "`n=== RUNTIME CHECK FOR KANJI 父 ===" -ForegroundColor Cyan
    Write-Host $res.result.result.value

    # Also capture screenshot
    $ss = Send-CDPCommand "Page.captureScreenshot" @{ format = "png" }
    if ($ss.result -and $ss.result.data) {
        $imgBytes = [System.Convert]::FromBase64String($ss.result.data)
        [System.IO.File]::WriteAllBytes("c:\Users\admin\Kanji-web\kanji_father_screenshot.png", $imgBytes)
        Write-Host "Screenshot saved to c:\Users\admin\Kanji-web\kanji_father_screenshot.png"
    }

    $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "done", $ct).Wait()
} finally {
    Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
}
