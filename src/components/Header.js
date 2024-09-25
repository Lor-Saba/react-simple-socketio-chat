import './Header.css';
import { ConnectionManager } from './ConnectionManager';
import { ConnectionState } from './ConnectionState';

export function Header({ title = 'React Socket.io' }){

  return (
    <header>
      <div className="app-title">
        <h1>{title}</h1>
        <ConnectionState />
      </div>
      <ConnectionManager />
    </header>
  )
}