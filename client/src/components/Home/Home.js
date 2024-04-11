// import React, { useContext, useState } from 'react';
// import './Home.css';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import Get_devices from '../Get_devices';
// import verify_user from '../../middleware/verify_user';
// import { useEffect } from 'react';
// import { Context } from '../../context';

// import { io } from "socket.io-client";

// function Home({ username }) {

//   const ipcRenderer = window.ipcRenderer;
//   const [user, setUser] = useContext(Context)

//   const [loading, setLoading] = useState(true)
//   const [socket, setSocket] = useState()
//   const session = window.session
//   const [loginSuccess, setLoginSuccess] = useState(false);

//   const navigate = useNavigate();

//   async function verify_token() {
//     const res = await verify_user();
//     console.log(res);
//     if (res.success === 0) {
//       // console.log("***************");
//       setLoading(false)
//       return;
//     }
//     setUser(res.uid)
//     ipcRenderer.send('userLogin', { login: true, uid: res.uid })

//     connect_socket()

//     setLoading(false)
//   }

//   useEffect(() => {
//     ipcRenderer.send('isUserLogin', {})
//   }, [])

//   useEffect(() => {
//     session.uid((event, args) => {
//       // console.log(args);
//       if (!args.login) {
//         verify_token()
//       } else {
//         setUser(args.uid)
//         setLoading(false)
//         setLoginSuccess(true)
//       }
//     })
//   }, [session])

//   async function connect_socket() {
//     console.log("abc");
//     const sock = io("localhost:5000/", {
//       transports: ["websocket"],
//       cors: {
//         origin: "http://localhost:3000/",
//       },
//     });
//     setSocket(sock)
//   }

//   useEffect(() => {
//     if (!socket) return
//     socket.on("test", (data) => {
//       console.log(data);
//     });
//   }, [socket]);

//   if (loading) {
//     return (
//       <>
//         loading
//       </>
//     )
//   }

//   if (!loading && !loginSuccess) {
//     return (
//       <>
//         <h1>Login First</h1>
//         <a href='/login'>Login</a>
//       </>
//     )
//   }

//   return (
//     <>
//       {/* <Header  />
//       <div className="home-page">
//         <NavLink to="/output">
//           <button className="connect-button" style={{ textUnderlineOffset: 'none' }}>Connect with Keithley</button>
//         </NavLink>
//         <div className="content">
//           <p>Welcome to the </p>
//           <p>Keithley services</p>
//         </div>
//       </div> */}

//       <div className="Home">
//         <h1 className="text-3xl font-bold underline">
//           Hello world!
//         </h1>
//         <p>The home directory is at </p>
//         <Link to="/login" >Log in</ Link>
//         <Get_devices />
//         <button onClick={() => {
//           ipcRenderer.send('change_size', { height: 500, width: 500 })
//         }}>
//           Change Size</button>
//         <br />
//         <button onClick={() => {
//           ipcRenderer.send('isUserLogin', {})
//         }}>a</button>
//         {user}
//         <a href='/output'>Output</a>
//         <br></br>
//         <a href='/graph'>graph</a>
//       </div >

//     </>
//   );
// }

// export default Home;
