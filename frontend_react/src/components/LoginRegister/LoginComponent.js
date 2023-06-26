import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import '../../style/Login.css'

function LoginComponent() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [failedLogin, setFailedLogin] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const input = formData.get('input');
    const password = formData.get('password');

    const loginData = {
      input,
      password,
    };

    try {
      const response = await fetch('http://localhost:8020/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const answer = await response.json();

      if (response.ok && answer.token) {
        localStorage.setItem('jwt', answer.token);
        localStorage.setItem('user', JSON.stringify(answer.user));
        setUser(answer.user);
        navigate('/');
      } else {
        throw new Error(answer.message || 'Login failed');
      }
    } catch (error) {
      console.log('Error:', error);
      setFailedLogin(true);
    }
  };

  return (
      <div>
        <form onSubmit={login} id="login-container">
          <h1>Login Quiz</h1>
          <div id='errorContainer'>
            <div style={failedLogin ? styles.error : styles.noError}>
              {failedLogin ? 'Invalid login credentials' : ' '}
            </div>
          </div>
          <div id='formGroup' >
            <div id='inputContainer' >
              <label htmlFor="input" className='Typography' >
                Email or Username:
              </label>
              <input type="text" id="input" name="input" required className='inputField' />
              <label htmlFor="password" className='Typography'>
                Password:
              </label>
              <input type="password" id="password" name="password" required className='inputField' />
            </div>
          </div>
          <button type="submit" id='LoginButton' >
            Login
          </button>
          <p>
            Not a user? Click <Link to="/Register">here to register</Link>
          </p>
        </form>
      </div>
  );
}

const styles = {
  error: {
    backgroundColor: '#ff463b',
    padding: '1rem',
    borderRadius: '5px',
    borderWidth: '1px',
    borderColor: 'black',
    borderStyle: 'solid',
    marginTop: ' 1rem',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif',
  },
  noError: {
    padding: '1rem',
    marginTop: ' 1rem',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif',
  },
};

export default LoginComponent;
