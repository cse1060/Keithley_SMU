import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import Plot from 'react-plotly.js';
import Header from '../Header/Header';
import './graph.css'
import DownloadCSV from '../DownloadCsv/page';
import { io } from "socket.io-client";
const Graph = () => {

  const [socket, setSocket] = useState(null)

  // useEffect(() => {
  //   if (socket === null) {
  //     connect_socket()
  //   }
  // }, [])

  // async function connect_socket() {
  //   console.log("abc");
  //   const sock = io("localhost:5000/", {
  //     transports: ["websocket"],
  //     cors: {
  //       origin: "http://localhost:3000/",
  //     },
  //   });
  //   setSocket(sock)
  // }

  // useEffect(() => {
  //   if (socket === null) return
  //   socket.on("trial", (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);

  return (
    <>
      <a href='/profile'>A</a>
      {/* <DownloadCSV /> */}
      <Plot
        data={[
          {
            x: [5, 5, 5, 5, 5],
            y: [5, 5, 5, 5, 5],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
      />
    </>

  )
}

export default Graph