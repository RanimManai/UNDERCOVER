import { useState,useEffect } from "react";
import { io } from "socket.io-client";
import getCookieValue from "./getCookieValue.js";
const username=getCookieValue("username");
const game=getCookieValue("game");
const word=getCookieValue("word");
function Chat(){
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [kicked,setKicked]=useState(false);
    const [username, setUsername] = useState('');
    const [game, setGame] = useState('');
    const [word, setWord] = useState('');

    const socket = io('http://localhost:3334',{
      query: {
        game: getCookieValue("game"),
        username: getCookieValue("username")
    }
    });;
    
    useEffect(() => {
      const usernameValue = getCookieValue("username");
        const gameValue = getCookieValue("game");
        const wordValue = getCookieValue("word");
        setUsername(usernameValue);
        setGame(gameValue);
        setWord(wordValue);
      socket.on('chat message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
      socket.on('changeCookie', (cookieData) => {
        document.cookie = `${cookieData.name}=${cookieData.value}; ${cookieData.options}`;
        setKicked(kicked=>Boolean(getCookieValue("kicked")))
    });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    const handleMessageSubmit = (e) => {
      e.preventDefault();
      if (!(messageInput.replace(/\s+/g, "")==="")){
        socket.emit('chat message', username+" says : "+messageInput);
        setMessageInput('');
      }
    };
  
    return (
      <div id="chat">
        <h3>{"Your word is "+word}</h3>
         <div id="text">
          <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
            ))}
        </ul>
            </div>
       
        <form onSubmit={handleMessageSubmit}>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type ur message here"
            />
          <button type="submit" disabled={kicked?true:false}>Send</button>
        </form>
            </div>
    
    );
  };
export default Chat;