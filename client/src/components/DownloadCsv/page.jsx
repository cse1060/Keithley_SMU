import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import axios from 'Axios';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height:90vh;
`;

const DownloadButton = styled.button`
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  border: none;
  background-color: #8b0000;
  color: white;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #660000;
  }
`;

const DownloadCSV = () => {
    
    const [data, setData] = useState([
        ['Name', 'Age', 'City'],
        ['John', 30, 'New York'],
        ['Jane', 25, 'Los Angeles'],
        ['Bob', 40, 'Chicago'],
    ]);
    useEffect(async()=>{
      const res = await axios.get("http://127.0.0.1:5000/experiment1");
      const dev = res.data;
      if (res.data.success) {
        console.log(res.data.devices);
        setData(res.data.devices)
    }
    })
    const handleDownload = () => {
        const csvData = data.map((row) => row.join(',')).join('\n');
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <>
            {/* <Container> */}
                <DownloadButton onClick={handleDownload}>Download CSV</DownloadButton>
            {/* </Container> */}
        </>
    )
}

export default DownloadCSV