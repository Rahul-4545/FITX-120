import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:3001');

const SocketProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [screenSharingStream, setScreenSharingStream] = useState(null);
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [messages, setMessages] = useState([]);
  const [polls, setPolls] = useState([]);

  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      })
      .catch((err) => {
        console.error('Error accessing media devices.', err);
        alert('Permission denied or no media devices available.');
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on('messageReceived', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('pollCreated', (poll) => {
      setPolls((prevPolls) => [...prevPolls, poll]);
    });

    socket.on('pollUpdated', (poll) => {
      setPolls((prevPolls) => prevPolls.map(p => p.id === poll.id ? poll : p));
    });

    socket.on('polls', (roomPolls) => {
      setPolls(roomPolls);
    });

    return () => {
      socket.off('me');
      socket.off('callUser');
      socket.off('messageReceived');
      socket.off('pollCreated');
      socket.off('pollUpdated');
      socket.off('polls');
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit('sendMessage', { message, name, id: me });
    setMessages((prevMessages) => [...prevMessages, { message, name }]);
  };

  const createPoll = (pollData) => {
    socket.emit('createPoll', { ...pollData, to: me });
  };

  const votePoll = (pollId, option) => {
    socket.emit('votePoll', { pollId, option, from: me });
  };

  const getPolls = () => {
    socket.emit('getPolls', me);
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;

      }
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }

    window.location.reload();
  };

  const declineCall = () => {
    setCall({});
    socket.emit('declineCall', { to: call.from });
  };

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ cursor: true });
      setScreenSharingStream(screenStream);
      const videoTrack = screenStream.getVideoTracks()[0];

      if (connectionRef.current) {
        connectionRef.current.replaceTrack(stream.getVideoTracks()[0], videoTrack, stream);
      }

      screenStream.getVideoTracks()[0].onended = () => {
        if (connectionRef.current) {
          connectionRef.current.replaceTrack(videoTrack, stream.getVideoTracks()[0], stream);
        }
        setScreenSharingStream(null);
      };

      if (myVideo.current) {
        myVideo.current.srcObject = screenStream;
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      declineCall,
      shareScreen,
      screenSharingStream,
      messages,
      sendMessage,
      polls,
      createPoll,
      votePoll,
      getPolls,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
