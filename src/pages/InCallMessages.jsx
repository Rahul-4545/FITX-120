import React, { useState, useContext } from 'react';
import { TextField, Button, List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SocketContext } from './SocketContext';


const ChatContainer = styled('div')(({ theme }) => ({
  padding: '10px',
  width: '100%',
  maxHeight: '300px',
  overflowY: 'auto',
  border: '2px solid black',
  marginTop: '20px',
  backgroundColor: '#f5f5f5',
}));

const InputContainer = styled('div')({
  display: 'flex',
  marginTop: '10px',
  alignItems: 'center',
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: '10px',
}));

const InCallMessages = () => {
  const { messages, sendMessage } = useContext(SocketContext);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div>
      <Title variant="h6">Messages</Title>
      <ChatContainer>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <Typography variant="body2">
                <strong>{msg.name}:</strong> {msg.message}
              </Typography>
            </ListItem>
          ))}
        </List>
      </ChatContainer>
      <InputContainer>
        <TextField
          label="Type Something"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginLeft: '10px' }}>
          Submit
        </Button>
      </InputContainer>
    </div>
  );
};

export default InCallMessages;
