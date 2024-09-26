import { useContext } from 'react';
import { Messages } from './Messages';
import { ChatForm } from './ChatForm';
import { Nickname } from './Nickname';
import { ChatContext } from '../store/chat-context';

export function MessagesContainer(){
  const { isConnected } = useContext(ChatContext);

  return (
    isConnected ? 
      <>
        <Messages/>
        <ChatForm/>
      </>
    : 
      <>
        <Nickname/>
      </>
  );
}