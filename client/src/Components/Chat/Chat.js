import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';


function Chat({socket, name, room}) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('response', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      socket.off('response');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const messageData = {
        room: room,
        author: name,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit('message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="App">
      <div className="chat-container">
        <div className="messages">
          {messages.map((msgData, index) => (
            <div
            className="message"
            id={name === msgData.author ? "you" : "other"}
          >
            <div>
              <div className="message-content">
                <p>{msgData.message}</p>
              </div>
              <div className="message-meta">
                <p id="time">{msgData.time}</p>
                <p id="author">{msgData.author}</p>
              </div>
            </div>
          </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="message-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
