import { createContext } from "react";

export const ChatContext = createContext({
  nickname: '',
  messages: [],
  isConnected: false,
  
  /**
   * @param {'connect'|'disconnect'} state 
   */
  updateConnectedState: (state) => {},
  
  /**
   * @param {string} newNickname 
   */
  updateNickname: (newNickname) => {}
})