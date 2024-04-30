// Login.tsx

import axios from 'axios';
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        mot_de_passe: password,
      });
  
      // Check if login was successful based on the response status
      if (response.status === 200) {
        setIsLoggedIn(true);
        onLogin();
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
      alert('Error occurred while logging in');
    }
  };

  return isLoggedIn ? (
    <div>
      <p>You are logged in</p>
    </div>
  ) : (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
