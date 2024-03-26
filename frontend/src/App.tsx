import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './components/Map';
import DetailsAccident from './components/DetailsAccident';
import './App.css';
import Signalement from './components/Signalement';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sécurité des Cyclistes à Rennes</h1>
      </header>
      <Router>
      <Routes>
          <Route path="/accidents/:id" element={<DetailsAccident />} />
          <Route path="/signalement" element={<Signalement />} />
          <Route path="/" element={<Map />} />
      </Routes>
      </Router>
    </div>
    
  );
};

export default App;
