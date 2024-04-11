// Landing.js
import React, { useState, useEffect } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import Home from '../Home/Home';
import { useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import { FaForward } from "react-icons/fa";
import { FaTachographDigital } from "react-icons/fa6";
import { AiFillExperiment } from "react-icons/ai";
import { GiSewingMachine } from "react-icons/gi";
function Landing() {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [registeredUsers, setRegisteredUsers] = useState([]);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const loggedInStatus = localStorage.getItem('loggedIn');
  //   if (loggedInStatus === 'true') {
  //     setLoggedIn(true);
  //     const storedUsername = localStorage.getItem('username');
  //     if (storedUsername) {
  //       setUsername(storedUsername);
  //     }
  //   }

  //   const registeredUsersFromStorage = localStorage.getItem('registeredUsers');
  //   if (registeredUsersFromStorage) {
  //     setRegisteredUsers(JSON.parse(registeredUsersFromStorage));
  //   }
  // }, []);

  // const handleLogin = (username, password) => {
  //   const user = registeredUsers.find((user) => user.username === username && user.password === password);
  //   if (user) {
  //     setLoggedIn(true);
  //     localStorage.setItem('loggedIn', true);
  //     localStorage.setItem('username', username);
  //     setUsername(username);
  //     navigate('/home',{ state: { username} });
  //   } else {
  //     alert('Invalid username or password!');
  //     localStorage.setItem('loggedIn', false);
  //     setUsername('');
  //     setPassword('');
  //     window.location.reload();
  //   }
  // };


  // const handleRegister = (username, password) => {
  //   const userExists = registeredUsers.some((user) => user.username === username);
    
  //   if (userExists) {
  //     alert('Username already exists. Please choose a different username.');
  //     window.location.reload();
  //   } else {
  //     const newUser = { username, password };
  //     setRegisteredUsers([...registeredUsers, newUser]);
  //     localStorage.setItem('registeredUsers', JSON.stringify([...registeredUsers, newUser]));
  //     alert('Registration successful! Please login.');
  //     window.location.reload();
  //   }
  // };
  

  return (
  <div>
     
     <Navbar fluid rounded className="bg-black text-red-800 text-lg">
      <NavbarBrand className='text-red-600 mx-4'>
      <FaForward title="Run Experiment" type = "button" size={33} className="ml-4 dropdown-toggle"/>
      
      {/* <GiSewingMachine type = "button" size={33} className = "mx-4"/>
      <AiFillExperiment type = "button" size={33} className="ml-4"/> 
      <FaTachographDigital type = "button" size= {33} className="mx-4"/>  */}
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="/login" active>
          Login
        </NavbarLink>
        <NavbarLink href="#" active>Logout</NavbarLink>
      </NavbarCollapse>
    </Navbar>
    
  </div>
  );
}

export default Landing;
