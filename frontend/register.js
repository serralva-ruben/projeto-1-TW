const registrationForm = document.querySelector("#registration-form");

registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm_password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8020/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.status === 200) {
            alert("Registration successful!");
            window.location.href = "http://127.0.0.1:5500/frontend/login.html"; // Redirect to login page
        } else {
            // Display an error message to the user
            alert("Registration failed!");
        }
    } catch (error) {
        console.error(error);
    }
});