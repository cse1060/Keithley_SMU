import React, { useContext, useState } from 'react';
import './Home.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Get_devices from '../Get_devices';
import verify_user from '../../middleware/verify_user';
import { useEffect } from 'react';
import { Context } from '../../context';

function Home({ username }) {

  const ipcRenderer = window.ipcRenderer;
  const [user, setUser] = useContext(Context)

  const [loading, setLoading] = useState(true)

  const session = window.session

  const navigate = useNavigate();

  async function verify_token() {
    const res = await verify_user();
    console.log(res);
    if (res.success === 0) {
      navigate("/login");
      return;
    }
    setUser(res.uid)
    ipcRenderer.send('userLogin', { login: true, uid: res.uid })
    setLoading(false)
  }

  useEffect(() => {
    ipcRenderer.send('isUserLogin', {})
  }, [])

  useEffect(() => {
    session.uid((event, args) => {
      // console.log(args);
      if (!args.login) {
        verify_token()
      } else {
        setUser(args.uid)
        setLoading(false)
      }
    })
  }, [session])

  if (loading) {
    return (
      <>
        loading
      </>
    )
  }

  return (
    <>
      {/* <Header  />
      <div className="home-page">
        <NavLink to="/output">
          <button className="connect-button" style={{ textUnderlineOffset: 'none' }}>Connect with Keithley</button>
        </NavLink>
        <div className="content">
          <p>Welcome to the </p>
          <p>Keithley services</p>
        </div>
      </div> */}

      <div className="Home">
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <p>The home directory is at </p>
        <Link to="/login" >Log in</ Link>
        <Get_devices />
        <button onClick={() => {
          ipcRenderer.send('change_size', { height: 500, width: 500 })
        }}>
          Change Size</button>
        <br />
        <button onClick={() => {
          ipcRenderer.send('isUserLogin', {})
        }}>a</button>
        {user}
        <a href='/output'>Output</a>
      </div >

    </>
  );
}

export default Home;
