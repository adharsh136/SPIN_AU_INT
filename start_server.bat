@echo off
echo Starting local server on port 8000...
echo.
echo If this fails, please install Python or use the "Live Server" extension in VS Code.
echo.
python -m http.server 8000
pause
