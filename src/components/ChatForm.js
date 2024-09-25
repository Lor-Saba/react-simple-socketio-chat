import { useState, useRef, useContext, useEffect } from 'react';
import { ChatContext } from '../store/chat-context';
import { socket } from '../socket';
import './ChatForm.css';

export function ChatForm(){
  const form = useRef(null);
  const formButton = useRef(null);
  const formInput = useRef(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const { nickname } = useContext(ChatContext);

  function handleKeyPress(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      formButton.current.click();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const messageData = { 
      id: socket.id, 
      nickname: nickname, 
      text: formInput.current.value
    };

    setIsLoading(true);

    socket.emit('message', messageData, () => {
      setIsLoading(false);
      form.current.reset();
    });
  }
  
  useEffect(() => {
    formInput.current.focus();

    return () => {};
  }, [isLoading]);

  return (
    <form ref={form} className="chat-form" disabled={isLoading} onSubmit={handleSubmit}>
      <textarea ref={formInput} className='itxt' disabled={isLoading} onKeyDown={handleKeyPress} required></textarea>
      <button ref={formButton} className='btn btn-primary' type="submit" disabled={isLoading}>Send</button>
    </form>
  )
}