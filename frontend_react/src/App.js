import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterComponent from './components/LoginRegister/RegisterComponent';
import LoginComponent from './components/LoginRegister/LoginComponent';
import ProtectedRoutes from './components/authorization/ProtectedRoutes';
import PublicRoute from './components/authorization/PublicRoute';
import QuizMenuComponent from './components/quizMenu/QuizMenuComponent';
import QuizComponent from './components/QuizComponent';
import UserContext from './UserContext';
import UserBadge from "./components/UserBadge";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/UserBadge" element={<UserBadge />} />
              <Route path="/" element={<QuizMenuComponent />} />
              <Route path="/quiz/:quizTitle" element={<QuizComponent />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path="/Register" element={<RegisterComponent />} />
              <Route path="/Login" element={<LoginComponent />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </div>
  );
}

export default App;
