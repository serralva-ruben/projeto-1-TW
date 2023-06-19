import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import QuizComponent from './components/QuizComponent';


function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Navigate to="/Login" replace />} /> */}

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<QuizComponent />} />
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
