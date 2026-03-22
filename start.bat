@echo off
title Smart Farming System Runner
echo ===================================================
echo Starting Smart Climate-Based Farming Guidance System
echo ===================================================
echo.

echo Starting FastAPI Backend (Port 8005)...
start "FastAPI Backend" cmd /k "cd backend && (if exist venv\Scripts\activate.bat call venv\Scripts\activate.bat) && python -m uvicorn main:app --reload --port 8005"

echo Starting React Frontend (Vite)...
start "React Frontend" cmd /k "cd frontend && npm run dev -- --open"

echo.
echo Both servers are starting up in separate windows!
echo - Backend API will be available at: http://localhost:8005
echo - Frontend UI will automatically open in your browser!
echo.
echo Please leave those terminal windows open while you are testing the project.
pause
