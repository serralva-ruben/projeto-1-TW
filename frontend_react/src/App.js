import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterComponent from './components/LoginRegister/RegisterComponent';
import LoginComponent from './components/LoginRegister/LoginComponent';
import ProtectedRoutes from './components/authorization/ProtectedRoutes';
import PublicRoute from './components/authorization/PublicRoute';
import QuizMenuComponent from './components/quizMenu/quizMenuComponent';
import QuizComponent from './components/QuizComponent';
import UserContext from './UserContext';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
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
