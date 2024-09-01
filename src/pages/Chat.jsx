import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from './SocketContext'; // Ensure this path is correct

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) {
      console.error('Socket is not initialized');
      return;
    }

    const handleMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('message', handleMessage);

    return () => {
      if (socket) {
        socket.off('message', handleMessage);
      }
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('sendMessage', 'Hello');
    } else {
      console.error('Socket is not initialized');
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
