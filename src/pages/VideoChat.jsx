import React from 'react';
import { Typography, AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import VideoPlayer from './VideoPlayer';
import Notifications from './Notifications';
import Options from './options';
import InCallMessages from './InCallMessages';
import Polls from './Polls';

import '../Style/VideoChat.css';

const AppBarStyled = styled(AppBar)({
  borderRadius: 15,
  margin: '30px 0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '600px',
  border: '2px solid black',
  padding: '10px',
});

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  marginTop: '400px',  // Adjust this value to move the video down
});

const FeaturesContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  marginTop: '20px',
});

const FeatureBox = styled('div')({
  flex: 1,
  padding: '10px',
  boxSizing: 'border-box',
  maxWidth: '45%',
  marginRight: '10px',
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
      <FeaturesContainer>
        <FeatureBox>
          <InCallMessages />
        </FeatureBox>
        <FeatureBox>
          <Polls />
        </FeatureBox>
      </FeaturesContainer>
    </Wrapper>
  );
};

export default VideoChat;
