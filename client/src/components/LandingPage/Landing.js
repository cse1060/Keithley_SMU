import React, { useState, useEffect } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import Home from '../Home/Home';
import './Landing.css'
function Landing() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    useEffect(() => {
      const loggedInStatus = localStorage.getItem('loggedIn');
      if (loggedInStatus === 'true') {
        setLoggedIn(true);
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }
  
      const registeredUsersFromStorage = localStorage.getItem('registeredUsers');
      if (registeredUsersFromStorage) {
        setRegisteredUsers(JSON.parse(registeredUsersFromStorage));
      }
    }, []);
  
    const handleLogin = (username, password) => {
      const user = registeredUsers.find((user) => user.username === username && user.password === password);
      if (user) {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', username);
        setUsername(username);
      } else {
        alert('Invalid username or password!');
        setUsername('');
        setPassword('');
      }
    };
  
    const handleLogout = () => {
      setLoggedIn(false);
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
    };
  
    const handleRegister = (username, password) => {
      const newUser = { username, password };
      setRegisteredUsers([...registeredUsers, newUser]);
      localStorage.setItem('registeredUsers', JSON.stringify([...registeredUsers, newUser]));
      alert('Registration successful! Please login.');
    };
  
    return (
      
      <div className="appy">
        {!loggedIn ? (
          <>
            <LoginForm onLogin={handleLogin} />
            <RegisterForm onRegister={handleRegister} />
          </>
        ) : (
          <Home username={username} onLogout={handleLogout} />
        )}
      </div>
    );
  }
  
  export default Landing;
  