#!/bin/bash

osascript -e 'tell application "Terminal"
    do script "cd backend && npm start"
    delay 10
    do script "cd frontend_react && npm start" in front window
end tell'
