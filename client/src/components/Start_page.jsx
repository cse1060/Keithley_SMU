import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a1a1a;
  color: #d9d9d9;
`;

const Message = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
`;

const LoginButton = styled.a`
  display: inline-block;
  background-color: #b30000;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #900000;
  }
`;

const LoginRequired = () => {
  return (
    <Container>
      <div>
        <Message>Please login first to continue.</Message>
        <LoginButton href="/login">Login</LoginButton>
      </div>
    </Container>
  );
};

export default LoginRequired;