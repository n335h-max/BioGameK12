@echo off
title 🧬 BioGame Launcher
color 0A
cls

echo.
echo  ====================================
echo   🧬  BioGame - Starting Server...
echo  ====================================
echo.

:: Check Node.js
node -v >nul 2>&1
if errorlevel 1 (
    color 0C
    echo  ❌ Node.js is NOT installed!
    echo.
    echo  Please download it from: https://nodejs.org
    echo  Then run this file again.
    echo.
    pause
    exit
)

:: Get Wi-Fi IP address
echo  📡 Your Wi-Fi IP Address for students:
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set IP=%%a
    setlocal enabledelayedexpansion
    set IP=!IP: =!
    echo      👉  http://!IP!:3001/vote.html
    endlocal
)

echo.
echo  🖥️  Host screen opens automatically in your browser.
echo  📱  Students open the link above on their phones.
echo.
echo  Press Ctrl+C to stop the server when done.
echo  ====================================
echo.

:: Open host screen in browser after 2 seconds
start "" timeout /t 2 >nul
start "" "http://localhost:3001/display.html"

:: Start the server
cd /d "%~dp0"
node server.js

pause
