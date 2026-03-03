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

# Set essential env vars if not set
export MONGO_URL="${MONGO_URL:-mongodb://localhost:27017/likhahomebuilders}"
export DB_NAME="${DB_NAME:-likhahomebuilders}"
export ALLOWED_ORIGINS="${ALLOWED_ORIGINS:-*}"

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
export BROWSER=none
export CI=true

cd frontend
echo "📦 Installing frontend dependencies (this might take a while)..."
# Use yarn if it's the package manager
if [ -f "yarn.lock" ] || grep -q "yarn" package.json; then
    yarn install > /dev/null 2>&1
else
    npm install --include=dev --no-fund --no-audit > /dev/null 2>&1
fi

echo "🏗️ Starting React..."
# Try yarn start or npm start
if command -v yarn &> /dev/null; then
    yarn start > ../frontend.log 2>&1 &
else
    npm start > ../frontend.log 2>&1 &
fi
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
