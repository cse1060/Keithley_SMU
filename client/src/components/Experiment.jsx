import React, { useState } from 'react';
import styled from 'styled-components';
import img from "./bg15.jpeg";
import img2 from "./bg11.jpeg"; // Import a new background image
import { motion } from "framer-motion";
import Navbar_func from './NavbarPage/Navbar';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { ReactTabulator } from 'react-tabulator';
import { parse } from 'papaparse';
import { Table } from "flowbite-react";
import DownloadCSV from './DownloadCsv/page';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ComponentWrapper = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 3rem;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease-in-out;
`;

const TransparentBox = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 2rem;
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  width: 100%;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-inner-spin-button {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 4px;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
  &::-webkit-outer-spin-button {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 4px;
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.5rem;
  }
  &::placeholder {
    color: black;
  }
`;
const DownloadButton = styled.a`
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  border: none;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  margin-top: 1rem;
  &:hover {
    background-color: #45a049;
  }
`;
const DownloadWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
const Button = styled.button`
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  border: none;
  background-color: #8b0000;
  color: white;
  font-weight: bold;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  align-self: center;
  &:hover {
    background-color: ${props => (props.disabled ? '#8b0000' : '#cc0000')};
  }
`;
const ExperimentProgressWrapper = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 1rem;
  color: white;
`;
const DataTableWrapper = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;


// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

const THead = styled.thead``;

const TBody = styled.tbody``;

const TR = styled.tr``;

const TH = styled.th`
  padding: 0.5rem;
  text-align: left;
`;

const TD = styled.td`
  padding: 0.5rem;
`;

const ExperimentForm = () => {
  const [isMoved, setIsMoved] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(img);
  // const [csvData, setCsvData] = useState('');
  const [isExperimentInProgress, setIsExperimentInProgress] = useState(false);
  const [expName, setExpName] = useState({});
  const [csvData, setCsvData] = useState();
  const [graphData, setGraphData] = useState();
  const [formValues, setFormValues] = useState({
    srcVoltage: '',
    totalTime: '',
    iterationNumber: '',
    readings: '',
  });

  const handleButtonClick = async () => {
    setIsMoved(!isMoved);
    setBackgroundImage(img2); // Change the background image
    setIsExperimentInProgress(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/experiment1', JSON.stringify({
        src_voltage: formValues.srcVoltage,
        tot_time: formValues.totalTime,
        iter_num: formValues.iterationNumber,
        readings: formValues.readings,
      }));
      console.log(response.data);
      // const base64CsvData = response.data.csv;
      // const csvContent = atob(base64CsvData);
      // const csvRows = csvContent.split('\n');
      // const parsedCsvData = csvRows.map(row => {
      //   const [id, light, readingNo, relativeTime, reading] = row.split(',');
      //   return {
      //     id: parseInt(id),
      //     light: parseInt(light),
      //     readingNo: parseInt(readingNo),
      //     relativeTime: parseFloat(relativeTime),
      //     reading: parseFloat(reading),
      //   };
      // });

      const exp_data = response.data.data
      var parsedCsvData = []
      var x = [], y = []

      exp_data.data.map((obj, id) => {
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

      console.log(parsedCsvData);
      console.log(x);
      console.log(y);
      setCsvData(parsedCsvData);
      setGraphData({
        x: x,
        y: y
      })

      // const response2 = await axios.post('/curve_fitting', JSON.stringify({
      //   data: {
      //     'Smu1_Time(1)(1)': parsedCsvData.relativeTime,
      //     'Smu1_I(1)(1)': parsedCsvData.reading
      //   }
      // }));
      // console.log(response2.data);
      // const base64CsvData2 = response2.data.csv;
      // const csvContent2 = atob(base64CsvData2);
      // const csvRows2 = csvContent2.split('\n');
      // const parsedCsvData2 = csvRows2.map(row => {
      //   const [x, y] = row.split(',');
      //   return {
      //     x: parseInt(x),
      //     y: parseInt(y)
      //   };
      // });
      // setGraphData(parsedCsvData2);


    } catch (error) {
      console.error('Error submitting form:', error);
      setIsExperimentInProgress(false);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'expName') {
      setExpName(e.target.value);
    } else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
  };

  const variants = {
    initial: { x: 0 }, // Start at its initial position (left: 0)
    moved: { x: '+170%', y: '-10%', width: '300px' }, // Move to the left of the screen (off-screen) and reduce width slightly
  };
  const downloadVariants = {
    initial: { x: 0 },
    visible: { x: '+170%', y: '40%' },
  };
  const columns = [
    { title: 'ID', field: 'id', align: 'left' },
    { title: 'Light', field: 'light', align: 'left' },
    { title: 'Reading No.', field: 'readingNo', align: 'left' },
    { title: 'Relative Time', field: 'relativeTime', align: 'left' },
    { title: 'Current Reading', field: 'reading', align: 'left' },
  ];

  return (
    <>
      <a href='/graph'>graph</a>
      <Navbar_func />
      <Container backgroundImage={backgroundImage}>
        <ComponentWrapper animate={isMoved ? 'moved' : 'initial'} variants={variants} transition={{ duration: 0.5 }}>
          <Input
            type="text"
            placeholder="Name of the Experiment"
            name="expName"
            value={expName}
            onChange={handleInputChange}
          />
          <Input
            className="mt-12"
            type="number"
            step="0.01"
            placeholder="Source Voltage (in Volts)"
            name="srcVoltage"
            value={formValues.srcVoltage}
            onChange={handleInputChange}
          />
          <Input
            type="number"
            placeholder="Total Time (in seconds)"
            name="totalTime"
            value={formValues.totalTime}
            onChange={handleInputChange}
          />
          <Input
            type="number"
            placeholder="Number of Iterations"
            name="iterationNumber"
            value={formValues.iterationNumber}
            onChange={handleInputChange}
          />
          <Input
            type="number"
            placeholder="Number of Readings"
            name="readings"
            value={formValues.readings}
            onChange={handleInputChange}
          />
          <Button onClick={handleButtonClick} disabled={isMoved}>
            Run Experiment
          </Button>
          {csvData && (
            <DownloadCSV filename={expName} data={csvData} />
          )}
        </ComponentWrapper>
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
        {graphData &&
          <Plot
            data={[
              {
                x: graphData.x,
                y: graphData.y,
                mode: 'lines',
                type: 'scatter',
                type: 'scatter',
                marker: { color: 'red' },
              },
            ]}
            layout={{ title: 'Real-time Graph' }}
          />}
      </Container>
    </>
  );
};

export default ExperimentForm;