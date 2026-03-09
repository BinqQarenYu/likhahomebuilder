# run.ps1 - Windows equivalent of run.sh

function Stop-PortProcess([int]$port) {
    Write-Host "Checking for processes on port $port..."
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connections) {
        foreach ($conn in $connections) {
            $procId = $conn.OwningProcess
            $proc = Get-Process -Id $procId -ErrorAction SilentlyContinue
            if ($proc) {
                Write-Host "Stopping process $($proc.Name) (PID: $procId) on port $port"
                Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
            }
        }
    }
}

Write-Host "Starting LikhaHomebuilders App..."

$scriptRoot = Get-Location

# 1. Cleanup
Stop-PortProcess 8000
Stop-PortProcess 3000

# 2. Check for dependencies
$pythonFound = Get-Command py -ErrorAction SilentlyContinue
if (-not $pythonFound) { $pythonFound = Get-Command python -ErrorAction SilentlyContinue }

# 3. Start Backend
Write-Host "`nStarting Backend (FastAPI) on http://localhost:8000..."
if (Test-Path "backend\requirements.txt") {
    Write-Host "Ensuring backend dependencies..."
    if ($pythonFound.Name -eq "py.exe") {
        py -m pip install -r backend/requirements.txt --quiet
    }
    else {
        python -m pip install -r backend/requirements.txt --quiet
    }
}

$backendJob = Start-Job -ScriptBlock { 
    param($path) 
    Set-Location "$path\backend"
    if (Get-Command py -ErrorAction SilentlyContinue) {
        py -m uvicorn server:app --host 0.0.0.0 --port 8000 > "$path\backend_new.log" 2>&1
    }
    else {
        uvicorn server:app --host 0.0.0.0 --port 8000 > "$path\backend_new.log" 2>&1
    }
} -ArgumentList $scriptRoot -Name "LikhaBackend"

# 4. Start Frontend
Write-Host "`nStarting Frontend (React) on http://localhost:3000..."
if (Test-Path "frontend\package.json") {
    if (-not (Test-Path "frontend\node_modules")) {
        Write-Host "Installing frontend dependencies (this may take a while)..."
        Push-Location frontend
        npm install --quiet
        Pop-Location
    }
}

$frontendJob = Start-Job -ScriptBlock { 
    param($path) 
    Set-Location "$path\frontend"
    $env:REACT_APP_BACKEND_URL = "http://localhost:8000/api"
    $env:BROWSER = "none"
    $env:CI = "true"
    npm.cmd start > "$path\frontend_new.log" 2>&1
} -ArgumentList $scriptRoot -Name "LikhaFrontend"

Write-Host "`nApp attempts started!"
Write-Host "   - Backend: http://localhost:8000/api"
Write-Host "   - Frontend: http://localhost:3000"
Write-Host "`nUse 'Get-Job' to see status, and 'Receive-Job -Name LikhaBackend' for logs."

# Wait loop
while ($true) {
    Start-Sleep -Seconds 30
}
