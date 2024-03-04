// Landing.js
import React, { useState, useEffect } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import Home from '../Home/Home';
import { useNavigate } from 'react-router-dom';
import './Landing.css'
function Landing() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
      navigate('/home',{ state: { username} });
    } else {
      alert('Invalid username or password!');
      localStorage.setItem('loggedIn', false);
      setUsername('');
      setPassword('');
      window.location.reload();
    }
  };


  const handleRegister = (username, password) => {
    const userExists = registeredUsers.some((user) => user.username === username);
    
    if (userExists) {
      alert('Username already exists. Please choose a different username.');
    } else {
      const newUser = { username, password };
      setRegisteredUsers([...registeredUsers, newUser]);
      localStorage.setItem('registeredUsers', JSON.stringify([...registeredUsers, newUser]));
      alert('Registration successful! Please login.');
      window.location.reload();
    }
  };
  

  return (
    <div className="appy">
     
        <>
          <LoginForm onLogin={handleLogin} />
          <RegisterForm onRegister={handleRegister} />
        </>
    
    </div>
  );
}

export default Landing;
