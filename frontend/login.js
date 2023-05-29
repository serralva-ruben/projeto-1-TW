const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const response = await fetch("http://127.0.0.1:8020/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const data = await response.json();

      // Store the JWT token in local storage or cookies
      localStorage.setItem("token", data.token);

      // Redirect the user to the protected page
      window.location.href = "./index.html";
    } else {
      // Display an error message to the user
      alert("Invalid email or password");
      console.error();
    }
  } catch (error) {
    console.error(error);
  }
});
