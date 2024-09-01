import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';
import { SocketProvider } from './pages/SocketContext';


const root = ReactDOM.createRoot(document.getElementById('root')); // Updated to use createRoot

root.render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
);
