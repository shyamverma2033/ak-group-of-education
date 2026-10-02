@echo off
title A K Group of Education - Local Server (localhost:8080)
echo Starting local web server on http://localhost:8080 ...
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0serve.ps1"
pause
