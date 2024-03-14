import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import Header from '../Header/Header';

function Home({ username }) {

  return (
    <>
      <Header  />
      <div className="home-page">
        <NavLink to="/output">
          <button className="connect-button" style={{ textUnderlineOffset: 'none' }}>Connect with Keithley</button>
        </NavLink>
        <div className="content">
          <p>Welcome to the </p>
          <p>Keithley services</p>
        </div>
      </div>
    </>
  );
}

export default Home;
