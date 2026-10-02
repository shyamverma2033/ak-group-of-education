# Zero-Dependency Built-in Local HTTP Server for A K Group Website
param([int]$Port = 8080)

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Host "Error starting server on port $Port : $_" -ForegroundColor Red
    exit 1
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  A K Group of Education - Local Development Server" -ForegroundColor Yellow
Write-Host "  URL: $prefix" -ForegroundColor Green
Write-Host "  Press Ctrl+C in this window to stop the server" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

# Automatically open browser
Start-Process "$prefix"

$baseDir = $PSScriptRoot

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $relPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath.TrimStart('/'))
        if ([string]::IsNullOrWhiteSpace($relPath)) {
            $relPath = "index.html"
        }

        $filePath = Join-Path $baseDir $relPath

        # Check clean URLs (e.g. /about -> about.html)
        if (-not (Test-Path $filePath -PathType Leaf)) {
            if (Test-Path "$filePath.html" -PathType Leaf) {
                $filePath = "$filePath.html"
            }
        }

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".svg"  { "image/svg+xml" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".png"  { "image/png" }
                ".ico"  { "image/x-icon" }
                ".json" { "application/json; charset=utf-8" }
                ".xml"  { "application/xml; charset=utf-8" }
                default { "application/octet-stream" }
            }

            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $notFound = Join-Path $baseDir "404.html"
            if (Test-Path $notFound -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($notFound)
                $response.ContentType = "text/html; charset=utf-8"
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        }

        $response.Close()
    }
} finally {
    $listener.Stop()
}
