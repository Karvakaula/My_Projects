import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f8bbd0",
    },
    secondary: {
      main: "#aed581",
    },
  },
});

function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [registering, setRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // State variable for username
  const [password, setPassword] = useState(""); // State variable for password

  const handleLogin = async (username, passwd) => {
    try {
      const data = {
        username: username,
        password: passwd,
      };

      const response = await fetch(`http://localhost:3001/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorField = document.getElementById("errorfield1L");
        errorField.textContent = "Invalid login credentials";
        return;
      }
      const responseBody = await response.json();
      localStorage.setItem("username", responseBody.username);
      localStorage.setItem("userId", responseBody.userId);

      localStorage.setItem("token", responseBody.token);

      console.log("uname", responseBody.username);
      document.getElementById("username").innerHTML = " ";
      setIsLoggedIn(true);
      onLogin();
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const handlechange = () => {
    if (!registering) {
      setRegistering(true);
    } else {
      setRegistering(false);
    }
  };
  return (
    <section id="LoginPage">
      {!registering ? (
        <div className="LoginForm">
          <h1>Login</h1>
          <h3 id="errorfield1L"></h3>
          <TextField
            id="username"
            label="Username"
            autocomplete="off"
            variant="standard"
            
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            autocomplete="off"
            variant="standard"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn"
            onClick={() => handleLogin(username, password)}
          >
            Log In
          </button>
          <button className="btn" onClick={handlechange}>
            Register
          </button>
        </div>
      ) : (
        <div className="LoginForm">
          <h1>Register</h1>
          <TextField id="standard-basic" label="Username" variant="standard" />
          <TextField id="standard-basic" label="Password" variant="standard" />
          <TextField
            id="standard-basic"
            label="Password repeat"
            variant="standard"
          />
          <button className="btn" onClick={handlechange}>
            Log In
          </button>
          <button className="btn" onClick={handlechange}>
            Register
          </button>
        </div>
      )}
    </section>
  );
}
export default LoginForm;
