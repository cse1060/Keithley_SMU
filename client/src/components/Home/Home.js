// Home.js
import React from 'react';
import './Home.css'
import Header from '../Header/Header';
function Home({ username, onLogout }) {
  return (
    
    <div className="home">
        <button className="logout-button" onClick={onLogout}>Logout</button>
      <div className="header">
        <h1>Welcome, {username}!</h1>
        
      </div>
      <div className="content">
        <p>Keithley services</p>
       
      </div>
    </div>
  );
}

export default Home;
