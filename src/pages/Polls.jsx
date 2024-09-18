import React, { useState, useContext } from 'react';
import { Button, TextField, Typography, List, ListItem, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SocketContext } from './SocketContext';
import DeleteIcon from '@mui/icons-material/Delete';
import '../Style/Polls.css';

const PollContainer = styled('div')({
  marginTop: '20px',
});

const OptionContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
});

const Polls = () => {
  const { polls, createPoll } = useContext(SocketContext);
  const [pollQuestion, setPollQuestion] = useState('');
  const [newOption, setNewOption] = useState('');
  const [pollOptions, setPollOptions] = useState([]);

  const handleAddOption = () => {
    if (newOption.trim()) {
      setPollOptions((prevOptions) => [...prevOptions, newOption.trim()]);
      setNewOption('');
    } else {
      alert('Option cannot be empty.');
    }
  };

  const handleRemoveOption = (index) => {
    setPollOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };

  const handleCreatePoll = () => {
    if (pollQuestion.trim() && pollOptions.length > 0) {
      createPoll({ question: pollQuestion, options: pollOptions });
      setPollQuestion('');
      setPollOptions([]);
    } else {
      alert('Please provide a question and at least one option.');
    }
  };

  return (
    <PollContainer>
      <Typography variant="h6">Create a Poll</Typography>
      <TextField
        label="Poll Question"
        fullWidth
        value={pollQuestion}
        onChange={(e) => setPollQuestion(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Add an Option"
        fullWidth
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddOption}
        fullWidth
        style={{ marginTop: '10px' }}
      >
        Add Option
      </Button>
      {pollOptions.length > 0 && (
        <List style={{ marginTop: '20px' }}>
          {pollOptions.map((option, index) => (
            <ListItem key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" style={{ flex: 1 }}>
                {option}
              </Typography>
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveOption(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreatePoll}
        fullWidth
        style={{ marginTop: '20px' }}
      >
        Create Poll
      </Button>
      <Typography variant="h6" style={{ marginTop: '30px' }}>Available Polls</Typography>
      <List>
        {polls.length > 0 ? (
          polls.map((poll, index) => (
            <ListItem key={index}>
              <Typography variant="body1"><strong>{poll.question}</strong></Typography>
              <List>
                {poll.options.map((option, idx) => (
                  <ListItem key={idx}>
                    <Typography variant="body2">{option}</Typography>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          ))
        ) : (
          <ListItem>No polls available</ListItem>
        )}
      </List>
    </PollContainer>
  );
};

export default Polls;
