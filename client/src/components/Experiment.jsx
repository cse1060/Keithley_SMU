import React from 'react';
import styled from 'styled-components';
import img from "./bg15.jpeg";
import { Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  // background-color:rgba(0, 0, 0, 0.85);
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
    background-color: rgba(0, 0, 0, 0.7); /* Darker background color */
    color: white; /* White text color */
    border-radius: 4px; /* Squared corners */
    width: 1.5rem; /* Increased width */
    height: 1.5rem; /* Increased height */
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

const Button = styled.button`
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  border: none;
  background-color: #8b0000; /* Red background color */
  color: white;
  font-weight: bold;
  cursor: pointer;
  align-self: center;
  &:hover {
    background-color: #cc0000; /* Darker shade on hover */
  }

`;

const ExperimentForm = () => {
  return (
    <Container>
      <TransparentBox>
        <Input className='mt-12'
          type="number"
          placeholder="Experiment Duration (in minutes)"
          name="duration"
        />
        <Input
          type="number"
          placeholder="Measurement Interval (in minutes)"
          name="interval"
        />
        <Input
          type="text"
          placeholder="Name of the Experiment"
          name="name"
        />
        <Link to="/graph">
          <Button>Run Experiment</Button></Link>
      </TransparentBox>
    </Container>
  );
};

export default ExperimentForm;