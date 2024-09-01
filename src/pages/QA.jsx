import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from './SocketContext'; // Ensure this path is correct

const QA = () => {
  const [questions, setQuestions] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) {
      console.error('Socket is not initialized');
      return;
    }

    const handleQuestion = (question) => {
      setQuestions((prevQuestions) => [...prevQuestions, question]);
    };

    socket.on('newQuestion', handleQuestion);

    return () => {
      socket.off('newQuestion', handleQuestion);
    };
  }, [socket]);

  const askQuestion = () => {
    if (socket) {
      socket.emit('askQuestion', 'What is the meaning of life?');
    } else {
      console.error('Socket is not initialized');
    }
  };

  return (
    <div>
      <button onClick={askQuestion}>Ask Question</button>
      <div>
        {questions.map((q, index) => (
          <p key={index}>{q}</p>
        ))}
      </div>
    </div>
  );
};

export default QA;
