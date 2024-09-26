import { useState, useEffect } from 'react';
import { socket } from '../socket';
import { createContext } from "react";

const NICKNAME_MIN_LENGTH = 4;

export const ChatContext = createContext({
  nickname: '',
  nicknameMinLength: 4,
  messages: [],
  isConnected: false,
  
  /**
   * @param {'connect'|'disconnect'} state 
   */
  updateConnectedState: (state) => {},
  
  /**
   * @param {string} newNickname 
   */
  updateNickname: (newNickname) => {}
});

export default function ChatContextProvider({ children }){
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

  const chatCtx = { 
    nickname: nickname,
    nicknameMinLength: NICKNAME_MIN_LENGTH,
    isConnected: isConnected,
    updateConnectedState: handleToggleConnection,
    updateNickname: handleNicknameChange
  };

  return (
    <ChatContext.Provider value={chatCtx}>
      <ChatContext.Consumer>
        {children}
      </ChatContext.Consumer>
    </ChatContext.Provider>
  );
}