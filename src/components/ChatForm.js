
import { useState, useRef } from 'react';
import { socket } from '../socket';
import './ChatForm.css';

export function ChatForm({ nickname }){
  const formButton = useRef(null);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  function handleKeyPress(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      formButton.current.click();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);

    socket.emit('message', { id: socket.id, text: value, nickname: nickname }, () => {
      setValue('');
      setIsLoading(false);
    });
  }

  return (
    <>
      <form className="chat-form" disabled={isLoading} onSubmit={handleSubmit}>
        <textarea ref={input => input?.focus()} className='itxt' disabled={isLoading} value={value} onChange={ e => setValue(e.target.value) } onKeyDown={handleKeyPress} required></textarea>
        <button ref={formButton} className='btn btn-primary' type="submit" disabled={isLoading}>Send</button>
      </form>
    </>
  )
}