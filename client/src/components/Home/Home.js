import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from '../Header/Header';

function Home({ username }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (<>
    <Header/>
    <div className="home-page">
    <button className="connect-button" onClick={() => {  }}>Connect with Keithley</button>
      <div className="content">
        <p>Welcome to the </p>
        <p>Keithley services</p>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
    </>
  );
}

export default Home;
