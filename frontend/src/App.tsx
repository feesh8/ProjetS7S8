import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './components/Map';
import DetailsAccident from './components/DetailsAccident';
import Login from './components/Login';
import './App.css';


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
      <header className="App-header">
        <h1>Sécurité des Cyclistes à Rennes</h1>
      </header>
      <div>
      <h1>Welcome to My App</h1>
      {loggedIn ? (
        <div>
          <p>You are logged in</p>
          <button onClick={handleLogout}>Logout</button>
          {/* Place the actions you want to restrict here */}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
      <Router>
      <Routes>
          <Route path="/accidents/:id" element={<DetailsAccident />} />
          <Route path="/" element={<Map />} />
      </Routes>
      </Router>
    </div>
    
  );
};

export default App;
