import logo from './logo.svg';
import './App.css';
import Messages from './messages.js'
import { useEffect, useState } from 'react';
const { io } = require("socket.io-client");

function App() {

  const [chatinput, setChatinput] = useState({sender: "", message: ""})
  return (
    <div className="App">
      <h1>Chat app</h1>
      <div className="chat-container">
        <div className="chat-box" id="chat-box">
        <Messages />
        </div>
    </div>
          <div className="input-box">
            <input type="text" className="name" id="name" value={chatinput ? chatinput.sender : ""} placeholder="Enter your name" onInput={(e)=>{
              setChatinput({...chatinput, sender: e.target.value})
            }}/>
            <input type="text" className="message-input" id="message-input" value={chatinput ? chatinput.message : ""} placeholder="Type your message..." onInput={(e)=>{
              setChatinput({...chatinput, message: e.target.value})
            }}/>
            <button className="send-btn" id="send-btn" onClick={(e)=>{
              const socket = io("localhost:3001");
              e.preventDefault();
              setChatinput({sender: "", message: ""})
              socket.emit("chatroom",JSON.stringify(chatinput))
            }}>Send</button>
        </div>
  </div>
  );
}

export default App;
