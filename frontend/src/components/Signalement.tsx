import React, { useState } from 'react';
import "./Signalement.css";

const Signalement = () => {
  const [formData, setFormData] = useState({
    date: '',
    heure: '',
    adresse: '',
    nombreBlesses: 0,
    description: ''
  });

  const [type, setType] = useState('Accident');

  const [nombreBlesses, setNombreBlesses] = useState(0);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleNombreBlessesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombreBlesses(parseInt(e.target.value));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Logique pour envoyer les données du formulaire au backend
  };
 
  return (
    <div className='form-container'>
      <h2>Formulaire de Signalement</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="type">Type de signalement :</label>
          <select id="type" value={type} onChange={handleTypeChange}>
            <option value="Accident">Accident</option>
            <option value="Zone dangereuse">Zone dangereuse</option>
          </select>
          <p></p>
        </div>

        <label>Date :</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />

        <label>Heure :</label>
        <input type="time" name="heure" value={formData.heure} onChange={handleChange} />

        <label>Adresse :</label>
        <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />

        {type === 'Accident' && (
          <div>
            <label htmlFor="nombreBlesses">Nombre de blessés :</label>
            <input
              type="number"
              id="nombreBlesses"
              value={nombreBlesses}
              onChange={handleNombreBlessesChange}
            />
          </div>
        )}

        <label>Description :</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default Signalement;
