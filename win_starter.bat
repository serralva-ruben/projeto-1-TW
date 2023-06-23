@echo off

start cmd /k "cd backend && npm start"
timeout /t 10
start cmd /k "cd frontend_react && npm start"
