import React from 'react';
import { Typography, AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import VideoPlayer from './VideoPlayer';
import Notifications from './Notifications';
import Options from './Options';

import '../Style/VideoChat.css';


const AppBarStyled = styled(AppBar)(({ theme }) => ({
  borderRadius: 15,
  margin: '30px 100px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '600px',
  border: '2px solid black',
  [theme.breakpoints.down('xs')]: {
    width: '90%',
  },
}));

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const FeaturesContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-around',
});

const VideoChat = () => {
  return (
    <Wrapper>
      <AppBarStyled position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBarStyled>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
     
    </Wrapper>
  );
};

export default VideoChat;
