import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import verify_user from '../../middleware/verify_user';
import backgroundImage from '../bg11.jpeg';
import axios from 'axios';
import { Context } from '../../context';
import { io } from "socket.io-client";
import Navbar_func from '../NavbarPage/Navbar';
import Start_page from "../Start_page"
import { motion } from 'framer-motion';
// import axios from 'axios';

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
      console.log(res.data.devices);
      setDevices(res.data.devices)
    }
  }
  const options = ['Experiment 1', 'Experiment 2', 'Experiment 3'];
  const options2 = ['Instrument 1', 'Instrument 2', 'Instrument 3'];
  const options3 = ['Port 1', 'Port 2', 'Port 3'];

  const ipcRenderer = window.ipcRenderer;
  const [user, setUser] = useContext(Context)

  const [loading, setLoading] = useState(true)
  const [socket, setSocket] = useState()
  const session = window.session
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  async function verify_token() {
    const res = await verify_user();
    console.log(res);
    if (res.success === 0) {
      // console.log("***************");
      setLoading(false)
      return;
    }
    setUser(res.uid)
    setLoginSuccess(true)
    ipcRenderer.send('userLogin', { login: true, uid: res.uid })

    connect_socket()

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
        setLoginSuccess(true)
      }
    })
  }, [session])

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
    if (!socket) return
    socket.on("test", (data) => {
      console.log(data);
    });
  }, [socket]);

  if (loading) {
    return (
      <>
        loading
      </>
    )
  }

  if (!loading && !loginSuccess) {
    return (
      <>
        <h1>Login First</h1>
        <a href='/login'>Login</a>
      </>
    )
  }

  return (

    <>
      <Navbar_func></Navbar_func>

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
          {/* <InputContainer onClick={viewDevices} defaultValue={"View Available Devices"}>
          <Select>
            <option >
              View Available Devices
            </option>
            {
              devices.map((device, idx) => {
                return (
                  <option onClick={async () => {
                    const res = await axios.post("http://127.0.0.1:5000/connect_device", { connect: device });
                    if (res.data.success) {
                      setConnectedDevice(device)
                    }
                  }}>
                    {device}
                  </option>
                )
              })
            }
          </Select>
        </InputContainer> */}
          <InputContainer className='text-white' onClick={viewDevices}>
          <Select>
            <option value = "" disabled selected>
              View Available Devices
            </option>
            {
              devices.map((device, idx) => {
                return (
                  <option onClick={async () => {
                    const res = await axios.post("http://127.0.0.1:5000/connect_device", { connect: device });
                    if (res.data.success) {
                      setConnectedDevice(device)
                    }
                  }}>
                    {device}
                  </option>
                )
              })
            }
          </Select>
          </InputContainer>

          {/* <p className='text-white' onClick={() => {
            ipcRenderer.send("new_win", { message: "create" })
          }}>abc</p> */}

          <Link to="/experiment">
            <Button>Continue</Button></Link>
        </TransparentBox>
      </Container>
    </>
  );
};

export default HomePage;