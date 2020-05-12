import React, { useState } from 'react';
import styled from 'styled-components';

const CibButton = styled.button`
  width: 350px;
  height: 60px;
  background-color: #000;
  color: #fff;
  font-size: 18px;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #80FFA0;
`;

const Foi = styled.img`
  width: 200px;
`;

const Title = styled.h1`
  font-size: 64px;
  margin-bottom: 30px;
`;

const Paragraph = styled.p`
  font-size: 8px;
  font-weight: 700;
`;

const App = () => {
  const [logged, setLogged] = useState(false);
  const [ida, setIDA] = useState(null);
  const [token, setToken] = useState(null);

  const handler = () => {
    const response = window.open('http://ba3a4026.ngrok.io/login', '',
      `toolbar=no,
      location=no,
      status=no,
      menubar=no,
      scrollbars=yes,
      resizable=yes,
      width=320,
      height=480`
    );

    setTimeout(() => {
      response.postMessage('signing', '*');
      window.addEventListener("message", (windowMessage) => {
        const { token, ida } = JSON.parse(windowMessage.data);
        setLogged(true);
        setIDA(ida);
        setToken(token);
      }, false);
    }, 2000);
  }
    
  return (
    <AppContainer>
      <Title>Som.</Title>
      {
        !logged ? <CibButton onClick={handler}>Logar com o IDA</CibButton> : <Foi src='https://s3.amazonaws.com/word-art/5ce1eabf5cf85d6cd0fd23cb.png' />
      }
      <Paragraph>{token ? 'Token:' : null} {token}</Paragraph>
      <p>{ida ? 'IDA:' : null} {ida}</p>
    </AppContainer>
  );
}

export default App;
