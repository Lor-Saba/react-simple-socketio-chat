import './Header.css';
import { ConnectionManager } from './ConnectionManager';
import { ConnectionState } from './ConnectionState';

export function Header({ isConnected, title = 'React Socket.io', onToggleConnection }){

  return (
    <header>
      <div className="app-title">
        <h1>{title}</h1>
        <ConnectionState isConnected={isConnected}/>
      </div>
      <ConnectionManager isConnected={isConnected} onToggleConnection={onToggleConnection} />
    </header>
  )
}