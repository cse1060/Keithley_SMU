import React, { useState } from 'react';
import styled from 'styled-components';
import backgroundImage from '../bg11.jpeg';
import { Link } from 'react-router-dom';
import { axios } from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const TransparentBox = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 3rem;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.5rem;
  &::placeholder {
    color: black;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border-radius: 4px;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  color: white;
  font-size: 1rem;
  cursor: pointer;

  option {
    color: black;
  }
  &::placeholder {
    color: black;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  border: none;
  background-color: #8b0000;
  color: white;
  font-weight: bold;
  cursor: pointer;
  align-self: center;

  &:hover {
    background-color: #660000;
  }
`;

const HomePage = () => {
  const [devices, setDevices] = useState([])
  const [connectedDevice, setConnectedDevice] = useState(null)
  const viewDevices = async () => {
    const res = await axios.get("http://127.0.0.1:5000/view_devices");
    const dev = res.data;
    if (res.data.success) {
      setDevices(res.data.devices)
    }
  }
  const options = ['Experiment 1', 'Experiment 2', 'Experiment 3'];
  const options2 = ['Instrument 1', 'Instrument 2', 'Instrument 3'];
  const options3 = ['Port 1', 'Port 2', 'Port 3'];

  return (
    <Container>
      <TransparentBox>
        <InputContainer>
          <Select>
            <option value="" disabled selected>
              Select Experiment
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </InputContainer>
        {/* <InputContainer>
          <Select>
            <option value="" disabled selected>
              Select Instrument
            </option>
            {options2.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </InputContainer> */}
        <InputContainer>
          <Select>
            <option onClick={viewDevices}>
              View Available Devices
            </option>
            {
              devices.map((device, idx) => {
                return (
                  <p onClick={async () => {
                    const res = await axios.post("http://127.0.0.1:5000/connect_device", { connect: device });
                    if (res.data.success) {
                      setConnectedDevice(device)
                    }
                  }}>
                    {device}
                  </p>
                )
              })
            }
          </Select>
        </InputContainer>
        <Link to="/experiment">
          <Button>Continue</Button></Link>
      </TransparentBox>
    </Container>
  );
};

export default HomePage;