// Login.tsx

import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, Route, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import "./Login.css";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        mot_de_passe: password,
      });
  
      // Check if login was successful based on the response status
      if (response.status === 200) {
        login();
        navigate('/'); // Redirect to the home page
      }
    } catch (error) {
      // Check if the error response exists and has a status of 401
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        console.error('Error occurred while logging in:', error);
        alert('Invalid email or password');
      } else {
        console.error('Error occurred while logging in:', error);
        alert('Error occurred while logging in');
      }
    }
  };

  return (
    // <div>
    //   <input
    //     type="text"
    //     placeholder="Email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button onClick={handleLogin}>Login</button>
    //   <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    // </div>
        <div className="form-container">
        <h2>Connexion</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Se connecter</button>
        <p>Vous n'avez pas de compte <Link to="/signup">S'inscrire</Link></p>
      </div>
  );
};

export default Login;
