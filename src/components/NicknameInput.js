import { useContext } from 'react';
import { ChatContext } from '../store/chat-context';

import './NicknameInput.css';

export function NicknameInput({ minLength }) {
  const { 
    nickname,
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
      <input type="text" className="itxt" placeholder="Nickname" maxLength="12" defaultValue={nickname} minLength={minLength} onChange={handleChange} onKeyDown={handleKeyPress}></input>
    </div>
  );
}