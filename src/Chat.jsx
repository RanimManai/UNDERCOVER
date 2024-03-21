import { useState,useEffect } from "react";
import { io } from "socket.io-client";
import getCookieValue from "./getCookieValue.js";
function Chat(){
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [kicked,setKicked]=useState(false);

    const socket = io('http://localhost:3334',{
      query: {
        game: getCookieValue("game"),
        username: getCookieValue("username")
    }
    });;
  
    useEffect(() => {
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
      if (!(messageInput==="")){
        socket.emit('chat message', getCookieValue("username")+" says : "+messageInput);
        setMessageInput('');
      }
    };
  
    return (
      <div id="chat">
        <h3>{"Your word is "+getCookieValue("word")}</h3>
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