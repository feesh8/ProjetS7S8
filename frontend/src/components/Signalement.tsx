import { useEffect, useState } from 'react';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./Signalement.css";
import axios from 'axios';


const Signalement = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    latitude: 48.117,
    longitude: -1.677,
    adresse: '',
    date: '',
    heure: '',
    type: 'Accident',
    description: ''
  });

  const customIcon = new L.Icon({
    iconUrl: require("./location.svg").default,
    iconSize: new L.Point(40, 47)
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  

  async function handleMapClick(event: any) {
    if (event.target && event.target._latlng) {
      const { lat, lng } = event.target._latlng;

      const apiKey = '8dc8c772f2cd466ea51dff507c2ec227';
      const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;

      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        // Mettre à jour les coordonnées dans le state formData
        setFormData(prevState => ({
          ...prevState,
          adresse: data.features[0].properties.address_line1 + ", " + data.features[0].properties.address_line2,
          latitude: lat,
          longitude: lng
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    }

  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signalements', formData);
      console.log('Nouveau signalement créé:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la création du signalement:', error);
    }
  };
 
  return (
    <div className='form-container'>
      <h2>Formulaire de Signalement</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="type">Type de signalement :</label>
          <select id="type" value={formData.type} onChange={handleChange} name="type">
            <option value="Accident">Accident</option>
            <option value="Danger">Danger</option>
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

        <label>Description :</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default Signalement;
