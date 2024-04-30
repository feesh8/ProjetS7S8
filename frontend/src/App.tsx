import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Map from './components/Map';
import DetailsAccident from './components/DetailsAccident';
import './App.css';
<<<<<<< HEAD
import Map_user from './components/Map_user';
import DetailsSignalement from './components/DetailsSignalement';
=======
import Signalement from './components/Signalement';
>>>>>>> develop

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
            <li className="links">
              Carte (à link)
            </li>
            <li>
              <Link to="/signalement" className="signaler-button">Signaler</Link>
            </li>
          </ul>
        </nav>
      </header>
      
      <Routes>
          <Route path="/accidents/:id" element={<DetailsAccident />} />
<<<<<<< HEAD
          <Route path="/signalements/:id" element={<DetailsSignalement />} />
          <Route path="/signalement" element={<Map_user />} />
=======
          <Route path="/signalement" element={<Signalement />} />
>>>>>>> develop
          <Route path="/" element={<Map />} />
      </Routes>
      </Router>
    </div>  
    
  );
};

export default App;
