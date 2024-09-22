import { socket } from '../socket';
import './ConnectionState.css';

export function ConnectionState({ isConnected }) {
  let className = 'cs ';

  if (isConnected) {
    className += 'cs-connected';
  } else {
    className += 'cs-disconnected';
  }

  return (
    <span className={ className }>
      { isConnected ? 
        <>Connected <small>{socket.id}</small></> 
      : 
        <>Disconnected</> 
      }
    </span>
  );
}
