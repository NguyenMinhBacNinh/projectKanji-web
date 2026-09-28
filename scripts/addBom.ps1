param([string]$Path)
if (Test-Path $Path) {
    $bytes = [System.IO.File]::ReadAllBytes($Path)
    if ($bytes.Length -lt 3 -or $bytes[0] -ne 0xEF -or $bytes[1] -ne 0xBB -or $bytes[2] -ne 0xBF) {
        $bom = [byte[]](0xEF, 0xBB, 0xBF)
        $newBytes = New-Object byte[] ($bytes.Length + 3)
        [System.Array]::Copy($bom, 0, $newBytes, 0, 3)
        [System.Array]::Copy($bytes, 0, $newBytes, 3, $bytes.Length)
        [System.IO.File]::WriteAllBytes($Path, $newBytes)
        Write-Host "Added BOM to $Path"
    } else {
        Write-Host "$Path already has BOM"
    }
} else {
    Write-Error "File not found: $Path"
}
