import React, { useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./Signalement.css";
import fetch from 'node-fetch'; // npm install node-fetch


const Signalement = () => {
  const [formData, setFormData] = useState({
    date: '',
    heure: '',
    adresse: '',
    latitude: 48.117,
    longitude: -1.677,
    nombreBlesses: 0,
    description: ''
  });

  const customIcon = new L.Icon({
    iconUrl: require("./location.svg").default,
    iconSize: new L.Point(40, 47)
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

  async function handleMapClick(event: any) {
    if (event.target && event.target._latlng) {
      const { lat, lng } = event.target._latlng;

      const apiKey = '8dc8c772f2cd466ea51dff507c2ec227';
      const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      // Mettre à jour les coordonnées dans le state formData
      setFormData(prevState => ({
        ...prevState,
        adresse: data.features[0].properties.address_line1 + ", " + data.features[0].properties.address_line2,
        latitude: lat,
        longitude: lng
      }));
    }
    console.log(formData.latitude, formData.longitude);

  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log([formData.latitude, formData.longitude])
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

        {/* Remplacez le champ adresse par la carte interactive */}
        <div style={{ height: '300px', marginBottom: '20px' }}>
          <MapContainer center={[48.117, -1.677]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
            <Marker position={[formData.latitude, formData.longitude]} draggable={true} icon={customIcon} eventHandlers={{ dragend: handleMapClick }}>
              <Popup> {formData.adresse} </Popup>
            </Marker>
          </MapContainer>
        </div>

        {type === 'Accident' && (
          <div>
            <label htmlFor="nombreBlesses">Nombre de blessé(s) :</label>
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
