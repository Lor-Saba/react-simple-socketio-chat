import { useState, useRef, useEffect } from 'react';
import { socket } from '../socket';
import classNames from 'classnames';
import './Messages.css';

import svgMessages from '../assets/messages.svg';
import svgLockOff from '../assets/lock-access-off.svg';
import svgLock from '../assets/lock-access.svg';

function scrollOnBottom(messagesWrapper){
  messagesWrapper.current?.scrollTo({ 
    top: messagesWrapper.current.scrollHeight, 
    left: 0, 
    behavior: "smooth" 
  });
}

function isLockableArea(messagesWrapper){
  return messagesWrapper.current?.scrollHeight - messagesWrapper.current?.scrollTop - messagesWrapper.current?.clientHeight < 50
}

export function Messages() {
  const messagesWrapper = useRef(null);
  const [messages, setMessages] = useState([]);
  const [lockScroll, setLockScroll] = useState(true);
  const [showNewMessages, setShowNewMessages] = useState(false);
  
  useEffect(() => {

    function onMessage(value) {
      setMessages(previous => [...previous, value]);
    }

    socket.on('message', onMessage);

    if (lockScroll) {
      scrollOnBottom(messagesWrapper);
    } else {
      if (messages[messages.length - 1]?.id === socket.id) {
        scrollOnBottom(messagesWrapper);
      } else {
        setShowNewMessages(true);
      }
    }

    return () => {
      socket.off('message', onMessage);
    };
  }, [messages]);

  function handleScrollOnBottom(){
    scrollOnBottom(messagesWrapper);
    setShowNewMessages(false);
  }

  function stringToColour(str) { 
    let hash = 0;
    let colour = '#'

    str.split('').forEach(char => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })

    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff; 
      value = parseInt(256 * .9) + parseInt(value * .1);
      colour += value.toString(16).padStart(2, '0')
    }

    return colour
  }

  function handleScroll(){
    const newLockScroll = isLockableArea(messagesWrapper);

    if (newLockScroll !== lockScroll) {
      setLockScroll(newLockScroll);
    }
  }

  return (
    <div id='messages'>
      <ul ref={messagesWrapper} onScroll={handleScroll}>
        <li className={`placeholder ${messages.length > 0 && 'hidden' }`}>- no messages -</li>
        { messages.map((message, index) =>
            <li key={ index } 
                style={{ 
                  background: socket.id !== message.id && stringToColour(message.nickname) 
                }} 
                className={classNames({
                  'self': socket.id === message.id,
                  'other': socket.id !== message.id,
                  'tailed': message.id !== messages[index + 1]?.id,
                  'compact': message.nickname === messages[index - 1]?.nickname
                })}
            >
              <label>{ message.nickname }</label>
              { message.text }
            </li>
        ) }
      </ul>
      <div className="messages-lockstate">
        <img src={ lockScroll ? svgLock : svgLockOff } alt="" />
      </div>
      { showNewMessages && 
        <div className="messages-unread">
          <button onClick={handleScrollOnBottom}> 
            <img src={svgMessages} alt="" />
            Unread messages
          </button>
        </div>
      }
    </div>
  );
}