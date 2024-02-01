import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import "./Map.css";

interface DataItem {
  id: number;
  date: string;
  heure: string;
  latitude: string;
  longitude: string;
}

const Map: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:3001/api/accidents');
          if (Array.isArray(response.data)) {
            setData(response.data);
        } else {
            console.error('Le type de données reçu n\'est pas un tableau.');
        }
      } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
      }
  };

  return (
    
    <><div><MapContainer
      center={[48.117, -1.677]}
      zoom={13}
      style={{ height: '500px', width: '500px' }}
      className='Map-container'
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      {data.map((item, index) => (
        <Marker key={index} position={[parseFloat(item.latitude), parseFloat(item.longitude)]}>
          <Popup><center>Accident arrivé le {item.date} à {item.heure} <br /> <Link to={`/accidents/${item.id}`}>Détails</Link></center></Popup>
        </Marker>
      ))}
    </MapContainer><div className='flex'>
        <img src="/diagrammes/8_rues.png" alt="" style={{ width: '100%', height: 'auto' }}></img>
        <img src="/diagrammes/accidents_en_fonction_heure.png" alt="" style={{ width: '100%', height: 'auto' }}></img>
        <img src="/diagrammes/accidents_en_fonction_jour.png" alt="" style={{ width: '100%', height: 'auto' }}></img>
      </div></div></>
  );
};

export default Map;
