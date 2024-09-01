import React, { useContext } from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SocketContext } from './SocketContext';
import '../Style/VideoPlayer.css';

const Video = styled('video')(({ theme }) => ({
  width: '550px',
  [theme.breakpoints.down('xs')]: {
    width: '300px',
  },
}));

const PaperContainer = styled(Paper)(({ theme }) => ({
  padding: '10px',
  border: '2px solid black',
  margin: '10px',
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  return (
    <Grid container justifyContent="center">
      {stream && (
        <Grid item xs={12} md={6}>
          <PaperContainer>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <Video playsInline muted ref={myVideo} autoPlay />
          </PaperContainer>
        </Grid>
      )}
      {callAccepted && !callEnded && (
        <Grid item xs={12} md={6}>
          <PaperContainer>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <Video playsInline ref={userVideo} autoPlay />
          </PaperContainer>
        </Grid>
      )}
    </Grid>
  );
};

export default VideoPlayer;