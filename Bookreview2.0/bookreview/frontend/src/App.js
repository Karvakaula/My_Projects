import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from './components/navbar'
import BookList from './components/Booklist'
import Header from './components/Header'
import Main from './components/Main'
import LoginPage from './components/LoginPage' // Import the LoginPage component
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate  } from "react-router-dom";
import Profile from './components/usermenus/Profile'
const theme = createTheme({
  palette: {
    primary: {
      main: '#f8bbd0',
    },
    secondary: {
      main: '#aed581',
    },
  },
});

function App() {
  const [Logged, setLogged] = useState(false); // Initialize Logged state to false


  // Function to handle login
  const handleLogin = () => {
    // Your login logic here, which will eventually set Logged to true upon successful login
    setLogged(true);
    console.log("logged?",Logged)
     // For demonstration, setting it directly to true
  }

  // Function to handle logout
  const handleLogout = () => {
    console.log("LOGOUT")
    setLogged(false);
  }

  useEffect(() => {
  
  }, []);

  return (
    
    <Router>

    <div className="App">
      <ThemeProvider theme={theme}>
      
      <Navbar onLogout={handleLogout} islogged={Logged}/>
      <Routes>
          <Route exact path="/" element={Logged ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />}/>
          <Route exact path="/home/*" element={Logged? <Main /> : <Navigate to='/'/>}/>
      </Routes>
      </ThemeProvider>
    </div>
    </Router>
    
  );
}

export default App;
