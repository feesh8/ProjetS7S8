import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Map from './components/Map';
import DetailsAccident from './components/DetailsAccident';
import Login from './components/Login';
import './App.css';
import Signalement from './components/Signalement';


const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };


  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <h1>Sécurité des Cyclistes à Rennes</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className="links">Accueil</Link>
            </li>
            <li className="links">
              Carte (à link)
            </li>
            <li>
              <Link to="/login" className="login-button">Login</Link>
            </li>
            <li>
              <Link to="/signalement" className="signaler-button">Signaler</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>
    </div>
 
      <Routes>
          <Route path="/accidents/:id" element={<DetailsAccident />} />
          <Route path="/signalement" element={<Signalement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Map />} />
      </Routes>
      </Router>
    </div>
    
  );
};


export default App;
