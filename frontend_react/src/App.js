import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterComponent from './components/LoginRegister/RegisterComponent';
import LoginComponent from './components/LoginRegister/LoginComponent';
import ProtectedRoutes from './components/authorization/ProtectedRoutes';
import PublicRoute from './components/authorization/PublicRoute';
import QuizMenuComponent from './components/quizMenu/quizMenuComponent';
import QuizComponent from './components/QuizComponent';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Navigate to="/Login" replace />} /> */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<QuizMenuComponent />} />
          <Route path="/quiz/:quizTitle" element={<QuizComponent />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/Register" element={<RegisterComponent />} />
          <Route path="/Login" element={<LoginComponent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
