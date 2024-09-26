import { useContext } from 'react';
import { ChatContext } from '../store/chat-context';

import './Nickname.css';

export function Nickname() {
  const { 
    nickname,
    nicknameMinLength,
    updateConnectedState, 
    updateNickname 
  } = useContext(ChatContext);

  function handleChange(event) {
    updateNickname(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      updateConnectedState('connect');
    }
  }

  return (
    <div id="nickname-input">
      <input 
        type="text" 
        className="itxt" 
        placeholder="Nickname" 
        maxLength="12" 
        minLength={nicknameMinLength} 
        defaultValue={nickname} 
        onChange={handleChange} 
        onKeyDown={handleKeyPress}></input>
    </div>
  );
}