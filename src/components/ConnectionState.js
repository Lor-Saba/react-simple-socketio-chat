import { socket } from '../socket';
import { useContext } from 'react';
import { ChatContext } from '../store/chat-context';

import './ConnectionState.css';

export function ConnectionState() {
  const { isConnected } = useContext(ChatContext);
  let className = ['cs'];

  if (isConnected) {
    className.push('cs-connected');
  } else {
    className.push('cs-disconnected');
  }

  return (
    <span className={ className.join(' ') }>
      { isConnected ? 
        <>Connected <small>{socket.id}</small></> 
      : 
        <>Disconnected</> 
      }
    </span>
  );
}
