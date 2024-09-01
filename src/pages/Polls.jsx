import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from './SocketContext'; // Ensure this path is correct

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const { socket, polls: contextPolls, createPoll } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) {
      console.error('Socket is not initialized');
      return;
    }

    const handlePoll = (poll) => {
      setPolls((prevPolls) => [...prevPolls, poll]);
    };

    socket.on('newPoll', handlePoll);

    return () => {
      socket.off('newPoll', handlePoll);
    };
  }, [socket]);

  const handleCreatePoll = () => {
    createPoll({ question: 'What is your favorite color?', options: ['Red', 'Green', 'Blue'] });
  };

  return (
    <div>
      <button onClick={handleCreatePoll}>Create Poll</button>
      <div>
        {polls.map((poll, index) => (
          <div key={index}>
            <h4>{poll.question}</h4>
            <ul>
              {poll.options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Polls;
