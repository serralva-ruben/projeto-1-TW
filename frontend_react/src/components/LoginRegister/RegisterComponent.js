import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../../style/Register.css'

function RegisterComponent() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirm_password = formData.get("confirm_password");
    const username = formData.get("username"); // new field

    const loginData = {
      email,
      username,
      password,
      
    };

    try {

      if (password !== confirm_password) { throw Error("Confirm password doesn't match the password") }

      const response = await fetch("http://localhost:8020/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();

      if (response.ok) {
        const user = responseData;
        console.log("Register successful:", user);
        navigate("/Login");
      } else {
        console.log("Register failed:", responseData);
      }
    } catch (error) { console.log("Error:", error); }
  }

  return (
    <div>

      <div id="container1">

        <img src="controlpanel\public\mainlogo.png" alt="" />
      </div>
      <form onSubmit={handleSubmit} className='RegistrationContainer' >
        <h1>Registration Form</h1>
        <div className='inputContainer'>

          <label htmlFor="username" className='Typography' >Username:</label>
          <input type="text" id="username" name="username" required className='inputField' />

          <label htmlFor="email" className='Typography' >Email:</label>
          <input type="email" id="email" name="email" required className='inputField' />

          <label htmlFor="password" className='Typography'>Password:</label>
          <input type="password" id="password" name="password" required className='inputField' />

          <label htmlFor="confirm_password" className='Typography'>Confirm Password:</label>
          <input type="password" id="confirm_password" name="confirm_password" required className='inputField' />
        </div>
        <button type="submit" id='RegisterButton'>Register</button>
        <p>Already a user? Click <Link to="/Login">here to login</Link></p>
      </form>
    </div>
  );
}

export default RegisterComponent;
