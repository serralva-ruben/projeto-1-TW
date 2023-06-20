import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";

function LoginComponent() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const login = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const input = formData.get("input");
    const password = formData.get("password");
  
    const loginData = {
      input,
      password,
    };
  
    try {
      const response = await fetch("http://localhost:8020/api/auth/login", {
        method:   "POST",
        headers:  {"Content-Type": "application/json",},
        body: JSON.stringify(loginData),});
  
      const answer = await response.json();
  
      if (response.ok && answer.token) {
        console.log("Login successful:", answer);
        localStorage.setItem('jwt',answer.token)
        localStorage.setItem('user',JSON.stringify(answer.user))
        setUser(answer.user)
        navigate("/");
      } else {
        throw new Error(answer.message || "Login failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      
      <form onSubmit={login} id="login-form" style={styles.LoginContainer}>
      <h1>Login Quiz</h1>
        <div style={styles.formGroup}>
          <div style={styles.inputContainer}>
            <label htmlFor="input" style={styles.Typography}>Email or Username:</label>
            <input type="text" id="input" name="input" required style={styles.inputField} />
            <label htmlFor="password" style={styles.Typography}>Password:</label>
            <input type="password" id="password" name="password" required style={styles.inputField} />
          </div>
        </div>
        <button type="submit" style={styles.LoginButton}>
          Login
        </button>
        <p>
          Not a user? Click <Link to="/Register">here to register</Link>
        </p>
 


      </form>
    </div>
  );
}

export default LoginComponent;

const styles = {

  LoginContainer: {
    margin: "5%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderColor: "black",
    borderWidth: "3px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "5%",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
  },
  
  Typography: {
    fontSize: "18px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  
  LoginButton: {
    height: "40px",
    width: "120px",
    margin: "20px",
    backgroundColor: "#3498db",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
  },

  inputContainer: {
    display: "grid",
    gap: "10px",
    gridTemplateColumns: "1fr 2fr",
  },
  inputField: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
  },
  
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  }
  
};
