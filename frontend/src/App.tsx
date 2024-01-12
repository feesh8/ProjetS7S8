import React from 'react';
import Map from './components/Map';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sécurité des Cyclistes à Rennes</h1>
      </header>
      <main className="flex">
        <div className="Map-container">
          <Map />
        </div>
        <div>
        <img src="/diagrammes/8_rues.png"></img>
        <img src="/diagrammes/accidents_en_fonction_heure.png"></img>
        <img src="/diagrammes/accidents_en_fonction_jour.png"></img>
        </div>
        
      </main>
    </div>
  );
};

export default App;
