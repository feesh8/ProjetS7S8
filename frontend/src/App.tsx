import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Map from './components/Map';
import DetailsAccident from './components/DetailsAccident';
import './App.css';
import Map_user from './components/Map_user';
import DetailsSignalement from './components/DetailsSignalement';
import Signalement from './components/Signalement';

const App: React.FC = () => {
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
              <Link to="/map_signalement" className="links">Carte</Link>
            <li>
              <Link to="/signalement" className="signaler-button">Signaler</Link>
            </li>
          </ul>
        </nav>
      </header>
      
      <Routes>
          <Route path="/accidents/:id" element={<DetailsAccident />} />
          <Route path="/signalements/:id" element={<DetailsSignalement />} />
          <Route path="/map_signalement" element={<Map_user />} />
          <Route path="/signalement" element={<Signalement />} />
          <Route path="/" element={<Map />} />
      </Routes>
      </Router>
    </div>  
    
  );
};

export default App;
