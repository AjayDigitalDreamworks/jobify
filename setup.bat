@echo off
REM Jobify Project Setup Script

echo ========================================
echo   JOBIFY PROJECT SETUP
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js detected
echo.

REM Create necessary directories if they don't exist
if not exist "client\pages" mkdir client\pages
if not exist "server" mkdir server

echo Installing dependencies...
echo.

REM Install root dependencies
echo [1/3] Installing root dependencies...
call npm install

REM Install client dependencies
echo [2/3] Installing client dependencies...
cd client
call npm install
cd ..

REM Install server dependencies
echo [3/3] Installing server dependencies...
cd server
call npm install
cd ..

echo.
echo ========================================
echo   SETUP COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo Next steps:
echo 1. Update MongoDB URI in server\.env
echo 2. Run "npm run dev" from root to start both services
echo    OR
echo 3. Run from separate terminals:
echo    - Server: cd server && npm run dev
echo    - Client: cd client && npm run dev
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
pause
