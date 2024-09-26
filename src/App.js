import { Header } from './components/Header';
import { MessagesContainer } from './components/MessagesContainer'

import ChatContextProvider from './store/chat-context';
import './App.css';

function App() {

  return (
    <ChatContextProvider>
      {
        ({ isConnected }) => 
        <div className={ 'App' + (isConnected ? ' connected': '') }>
          <Header/>
          <MessagesContainer/>
        </div>
      }
    </ChatContextProvider>
  );
}

export default App;
