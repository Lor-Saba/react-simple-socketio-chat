import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { Header } from './components/Header';
import { Messages } from './components/Messages';
import { ChatForm } from './components/ChatForm';
import { NicknameInput } from './components/NicknameInput';

import './App.css';

const NICKNAME_MIN_LENGTH = 4;

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    document.title = `Chat ${ nickname ? `(${nickname})` : '' }`;

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [nickname]);

  function handleToggleConnection(action){
    if (action === 'connect') {
      if (nickname.length >= NICKNAME_MIN_LENGTH) {
        socket.connect();
      } else {
        alert(`Nickname not valid (min ${NICKNAME_MIN_LENGTH} characters)`);
      }
    } else {
      socket.disconnect();
    }
  }

  function handleNicknameChange(value){
    setNickname(value);
  }

  return (
    <>
      <div className={ 'App' + (isConnected ? ' connected': '') }>
        <Header isConnected={isConnected} onToggleConnection={handleToggleConnection}/>
        { 
          isConnected ? 
            <>
              <Messages/>
              <ChatForm nickname={nickname}/>
            </>
          : 
            <NicknameInput onChange={handleNicknameChange} minLength={NICKNAME_MIN_LENGTH} onEnter={() => handleToggleConnection('connect')}/>
        }
      </div>
    </>
  );
}

export default App;
