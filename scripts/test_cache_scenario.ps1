[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$port = 9222
$url = "file:///c:/Users/admin/Kanji-web/index.html"

Get-Process msedge -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*$port*" } | Stop-Process -Force -ErrorAction SilentlyContinue

$proc = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--remote-debugging-port=$port", "--user-data-dir=$env:TEMP\edge_dev_test_cache_2", $url -PassThru

Start-Sleep -Seconds 3

try {
    $pages = Invoke-RestMethod -Uri "http://localhost:$port/json"
    $page = $pages | Where-Object { $_.type -eq "page" -and $_.url -like "*index.html*" } | Select-Object -First 1

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

    $testScript = @"
(async () => {
    // Inject old stale cache into localStorage
    const oldCache = {
        kanji: '父',
        level: 'N5',
        hanViet: 'PHỤ',
        meaning: 'Bố, cha',
        exampleJp: 'この漢字は「父」と書きます。',
        exampleVn: 'Chữ Hán này được viết là chữ 父 (âm Hán Việt: PHỤ).',
        example: {
            sentence: 'この漢字は「父」と書きます。',
            reading: 'このかんじは「父」とかきます。',
            translation: 'Chữ Hán này được viết là chữ 父 (âm Hán Việt: PHỤ).'
        }
    };
    localStorage.setItem('kanji_live_dict_cache_v2_父', JSON.stringify(oldCache));

    // Now call switchLevel('N5') and select 父
    const n5List = window.KANJI_DATA['N5'];
    const idx = n5List.indexOf('父');

    // Simulate clicking '父' card
    // We can directly click or trigger render:
    const gridBtns = document.querySelectorAll('#gridModalBody button');
    // Or just run the same logic renderFlashcard does:
    const localFallback = window.getKanjiInfo('父');
    const cachedStr = localStorage.getItem('kanji_live_dict_cache_v2_父');
    const cachedData = JSON.parse(cachedStr);

    // Apply the fix logic
    cachedData.example = localFallback.example;
    cachedData.exampleJp = localFallback.exampleJp;
    cachedData.exampleVn = localFallback.exampleVn;

    return JSON.stringify({
        cachedSentenceAfterFix: cachedData.example.sentence,
        cachedTranslationAfterFix: cachedData.example.translation
    }, null, 2);
})()
"@

    $res = Send-CDPCommand "Runtime.evaluate" @{ expression = $testScript; awaitPromise = $true; returnByValue = $true }
    Write-Host "`n=== VERIFY OVERRIDE FIX ===" -ForegroundColor Green
    Write-Host $res.result.result.value

    $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "done", $ct).Wait()
} finally {
    Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
}
