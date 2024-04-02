import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    window.ipcRenderer.send('userLogin', { login: false, uid: "" })
    const res = await axios.get("http://127.0.0.1:5000/deleteLoginToken")
    navigate('/login');
  };

  const session = window.session
  const [user, setUser] = useState("")

  useEffect(() => {
    window.ipcRenderer.send('isUserLogin', {})
  })

  useEffect(() => {
    session.uid((event, args) => {
      setUser(args.uid)
    })
  }, [session])

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
          <li>{user}</li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
