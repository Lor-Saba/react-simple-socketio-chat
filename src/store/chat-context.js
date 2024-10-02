import { useState, useEffect } from 'react';
import { socket } from '../socket';
import { createContext } from "react";
import Modal from '../components/Modal';

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

const MODAL_CONFIG_DEFAULT = { open: false, text: '', title: ''};

export default function ChatContextProvider({ children }){
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [nickname, setNickname] = useState('');
  const [modalConfig, setModalConfig] = useState({...MODAL_CONFIG_DEFAULT});

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
        setModalConfig({ 
          open: true, 
          title: 'Warning' ,
          text: `Nickname not valid (min ${NICKNAME_MIN_LENGTH} characters)`
        });
        //alert(`Nickname not valid (min ${NICKNAME_MIN_LENGTH} characters)`);
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
      <Modal {...modalConfig} onClose={() => setModalConfig({...MODAL_CONFIG_DEFAULT})}/>
    </ChatContext.Provider>
  );
}