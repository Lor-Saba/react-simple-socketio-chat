import { useContext } from 'react';
import { ChatContext } from '../store/chat-context';

import './ConnectionManager.css';

export function ConnectionManager() {
  const { isConnected, updateConnectedState } = useContext(ChatContext);

  return (
    <div className="connection-manager">
      { isConnected ?
        <button className='btn' onClick={ () => updateConnectedState('disconnect') }>Disconnect</button>
        :
        <button className='btn btn-primary' onClick={ () => updateConnectedState('connect') }>Connect</button>
      }
    </div>
  );
}