import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <>
      <nav id="navbar">
        <ul>
          
          <li className="item">
            <NavLink to='/home'>Home</NavLink>
          </li>
          <li className="item">
            <NavLink to='/File'>File</NavLink>
          </li>
          <li className="item">
            <NavLink to='/Archive'>Archive</NavLink>
          </li>
          <li className="item">
            <NavLink to='/Help'>Help</NavLink>
          </li>
          <li className="item1">
            <button className='button' onClick={handleLogout}>Logout</button>
          </li>
          
        </ul>
      </nav>
    </>
  );
};

export default Header;
