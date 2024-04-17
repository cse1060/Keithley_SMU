import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import Plot from 'react-plotly.js';
import Header from '../Header/Header';
import './graph.css'
import DownloadCSV from '../DownloadCsv/page';
import { io } from "socket.io-client";
import { Table } from "flowbite-react";
const Graph = () => {

  const [socket, setSocket] = useState(null)
  const [csvData, setCsvData] = useState();
  const [graphData, setGraphData] = useState({ x: [0], y: [0] });

  useEffect(() => {
    if (socket === null) {
      connect_socket()
    }
  }, [])

  async function connect_socket() {
    console.log("abc");
    const sock = io("localhost:5000/", {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000/",
      },
    });
    setSocket(sock)
  }

  useEffect(() => {
    if (socket === null) return
    socket.on("trial", (data) => {
      console.log(data);
    });
    socket.on('expData', (response) => {
      const exp_data = response.expData.data
      console.log(exp_data);
      var parsedCsvData = []
      var x = [], y = []

      exp_data.map((obj, id) => {
        parsedCsvData.push({
          id: parseInt(obj[0]),
          light: parseInt(obj[1]),
          readingNo: parseInt(obj[2]),
          relativeTime: parseFloat(obj[3]),
          reading: parseFloat(obj[4]),
        })
        x.push(parseFloat(obj[3]))
        y.push(parseFloat(obj[4]))
      })

      setCsvData(parsedCsvData);
      setGraphData({
        x: x,
        y: y
      })

    })
  }, [socket]);

  const columns = [
    { title: 'ID', field: 'id', align: 'left' },
    { title: 'Light', field: 'light', align: 'left' },
    { title: 'Reading No.', field: 'readingNo', align: 'left' },
    { title: 'Relative Time', field: 'relativeTime', align: 'left' },
    { title: 'Current Reading', field: 'reading', align: 'left' },
  ];
  return (
    <>
      <a href='/profile'>A</a>
      {/* <DownloadCSV /> */}
      <Plot
        data={[
          {
            x: graphData.x,
            y: graphData.y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{ width: 1000, height: 600, title: 'A Fancy Plot' }}
      />
      {csvData &&
        <div className='overflow-auto h-[300px]'>
          <Table>
            <Table.Head>
              {
                columns.map((obj, id) => {
                  return (
                    <Table.HeadCell>{obj.title}</Table.HeadCell>
                  )
                })
              }
            </Table.Head>
            <Table.Body className="divide-y">
              {
                csvData.map((data, idx) => {
                  return (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {data.id}
                      </Table.Cell>
                      <Table.Cell>{data.light}</Table.Cell>
                      <Table.Cell>{data.readingNo}</Table.Cell>
                      <Table.Cell>{data.relativeTime}</Table.Cell>
                      <Table.Cell>
                        {data.reading}
                      </Table.Cell>
                    </Table.Row>
                  )
                })
              }
            </Table.Body>
          </Table>
        </div>
      }
    </>

  )
}

export default Graph