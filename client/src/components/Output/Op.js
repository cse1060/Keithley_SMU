import React, { useContext, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import Header from '../Header/Header';
import { Context } from '../../context';

const Op = () => {

  const [context, setContext] = useContext(Context)

  useEffect(() => {
    console.log(context);
  }, [])

  return (
    <><Header />
      <div>  <NavLink to="/graph">
        <button className="connect-button" style={{ textUnderlineOffset: 'none' }}>Graph</button>
      </NavLink></div>
      <h1>{context.uid}</h1>
    </>
  )
}

export default Op