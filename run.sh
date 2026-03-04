#!/bin/bash

# Function to kill processes on exit
cleanup() {
    echo "Stopping services..."
    kill $(lsof -t -i :8000) 2>/dev/null || true
    kill $(lsof -t -i :3000) 2>/dev/null || true
}

trap cleanup SIGINT SIGTERM

echo "🚀 Starting LikhaHomebuilders App (Auto-Mode)..."

# Kill existing processes on target ports
echo "Cleaning up existing processes on ports 8000 and 3000..."
kill $(lsof -t -i :8000) 2>/dev/null || true
kill $(lsof -t -i :3000) 2>/dev/null || true

# Install Backend Dependencies (non-interactive)
echo "📦 Installing backend dependencies..."
pip install --no-input -r backend/requirements.txt > /dev/null 2>&1

# Start Backend
echo "🌐 Starting Backend (FastAPI) on http://localhost:8000..."
cd backend
uvicorn server:app --host 0.0.0.0 --port 8000 > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Start Frontend (non-interactive)
echo "💻 Starting Frontend (React) on http://localhost:3000..."
export REACT_APP_BACKEND_URL=http://localhost:8000/api
# Use BROWSER=none to prevent opening the browser automatically
export BROWSER=none
# CI=true to make npm start more non-interactive
export CI=true

cd frontend
# Skip interactive prompt if port is busy by forcing it (though we already killed it)
npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo "✅ App is running!"
echo "   - Backend: http://localhost:8000/api"
echo "   - Frontend: http://localhost:3000"
echo "   - Logs: backend.log, frontend.log"
echo ""
echo "Press Ctrl+C to stop both services."

# Keep script running
wait $BACKEND_PID $FRONTEND_PID
