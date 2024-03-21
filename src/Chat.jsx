import { useState,useEffect } from "react";
import { io } from "socket.io-client";
import getCookieValue from "./getCookieValue.js";
function Chat(){
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const socket = io('http://localhost:3334');
  
    useEffect(() => {
      socket.on('chat message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    const handleMessageSubmit = (e) => {
      e.preventDefault();
      socket.emit('chat message', getCookieValue("username")+" says :"+messageInput);
      setMessageInput('');
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
          <button type="submit">Send</button>
        </form>
            </div>
    
    );
  };
export default Chat;