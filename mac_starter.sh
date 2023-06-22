#!/bin/bash

osascript -e 'tell app "Terminal"
    do script "cd backend && npm start" in window 1
    delay 6
    do script "cd frontend_react && npm start" in window 1
end tell'