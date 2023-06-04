import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { UserContextProvider } from './context/userContext/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
    <UserContextProvider>
    <App />
    </UserContextProvider>
  </AuthContextProvider>

  </React.StrictMode>
); 


