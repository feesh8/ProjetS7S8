import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Map from './components/Map';
import DetailsAccident from './components/DetailsAccident';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './App.css';
import Map_user from './components/Map_user';
import DetailsSignalement from './components/DetailsSignalement';
import Signalement from './components/Signalement';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './AuthContext';
import esir from './esir.svg';
import About from './components/About';

const App: React.FC = () => {

  const { isLoggedIn, logout } = useAuth();


  const handleLogout = () => {
    logout();
  };


  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <div className="logo-title">
            <img src={esir} alt="ESIR Logo" className="logo" />
            <h1>Sécurité des Cyclistes à Rennes</h1>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className="links">Accueil</Link>
            </li>
            <li>
              <Link to="/map_signalement" className="links">Carte</Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="login-button">Se déconnecter</button>
              ) : (
                <Link to="/login" className="login-button">Se connecter</Link>
              )}
            </li>
            <li>
              <Link to="/signalement" className="signaler-button">Signaler</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="App-content">
      <Routes>
          <Route path="/accidents/:id" element={<DetailsAccident />} />
          <Route path="/signalements/:id" element={<DetailsSignalement />} />
          <Route path="/map_signalement" element={<Map_user />} />
            <Route
            path="/signalement"
            element={
              <ProtectedRoute>
                <Signalement />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Map />} />
      </Routes>
      </div>
      <footer className="App-footer">
          <div className="footer-content">
            <p> Projet SI année 2023-2024</p>  
            <p>  |  </p>
            <p>
              <a href="https://github.com/feesh8/ProjetS7S8" className="footer-link" target="_blank" rel="noopener noreferrer">Github</a>
            </p>
            <p>  |  </p>
            <p>
              <Link to="/about" className="footer-link">A propos</Link>
            </p>
          </div>
      </footer>

      </Router>
      </div>    
  );
};


export default App;
