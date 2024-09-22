import './ConnectionManager.css';

export function ConnectionManager({ isConnected, onToggleConnection }) {
  return (
    <>
      <div className="connection-manager">
        { isConnected ?
          <button className='btn' onClick={ () => onToggleConnection('disconnect') }>Disconnect</button>
          :
          <button className='btn btn-primary' onClick={ () => onToggleConnection('connect') }>Connect</button>
        }
      </div>
    </>
  );
}