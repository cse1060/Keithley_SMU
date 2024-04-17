import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CSVLink } from "react-csv";

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

const DownloadCSV = (props) => {

  return (
    <>
      <DownloadButton
        onClick={() => {
          console.log("CSV Download");
        }}
      ><CSVLink data={props.data} >Download CSV</CSVLink></DownloadButton>
    </>
  )
}

export default DownloadCSV