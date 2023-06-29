@echo off
cd backend
call npm install dotenv

cd ..
cd frontend_react
call npm install react-scripts
call npm install recharts

exit
