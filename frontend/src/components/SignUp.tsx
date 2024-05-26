// SignUp.tsx

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import "./Login.css";


const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async () => {

    try {
      // Send sign-up request to backend
      const response = await axios.post('http://localhost:3001/signup', {
        email: email,
        mot_de_passe: password,
      });


      // Check if sign-up was successful
      if (response.status === 200) {
        alert('Account created successfully!');
        login();
        navigate('/'); // Redirect to login page after successful sign-up
      } else {
        alert('Sign-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred during sign-up:', error);
      alert('Error occurred during sign-up');
    }
  };

  return (
    <div className="form-container">
      <h2>Inscription</h2>
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
      <button onClick={handleSignUp}>S'inscrire</button>
    </div>
  );
};

export default SignUp;
