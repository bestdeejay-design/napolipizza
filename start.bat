@echo off
REM Napoli Pizza - Local Development Server for Windows
REM This script starts a local development server

echo.
echo 🍕 Starting Napoli Pizza development server...
echo.

REM Check if Python is available
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error: Python is not installed. Please install Python 3.
    pause
    exit /b 1
)

echo ✅ Using Python
echo.
echo 📍 Opening site at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the server
cd /d "%~dp0src"
python -m http.server 8000

pause
