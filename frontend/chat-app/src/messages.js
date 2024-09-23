import React from 'react';
import { useState, useEffect } from 'react';
const { io } = require("socket.io-client");


const Messages = React.memo(() => {
    
    const socket = io("localhost:3001");

    const [messages, setMessages] = useState([{
        sender: "kiki",
        message: "goo"
    }])

    socket.on("chatroom", (msg)=>{
    console.log(msg)
      const msgParsed = JSON.parse(msg)
      setMessages(messages.concat(msgParsed))

    })


    socket.on("middleware", (m)=>{
        console.log(m)
    })


    return (
        <div className="chat-container">
            <div className="chat-box" id="chat-box">
                {messages.map((m, i) => (
                    <div className="chat-message received" key={i}>
                        <div className="message">{m.sender}: {m.message}</div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Messages;
