import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import Header from '../Header/Header';

const Op = () => {
  return (
    <><Header/>
    <div>  <NavLink to="/graph">
  <button className="connect-button" style={{ textUnderlineOffset: 'none' }}>Graph</button>
</NavLink></div>
    </>
  )
}

export default Op