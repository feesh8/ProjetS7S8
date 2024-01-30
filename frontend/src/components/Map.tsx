import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface DataItem {
  id: number;
  date: string;
  heure: string;
  jsem: string;
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
    
    <MapContainer
      center={[48.117, -1.677]}
      zoom={13}
      style={{ height: '500px', width: '500px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    {data.map((item, index) => (
         <Marker key={index} position={[parseFloat(item.latitude), parseFloat(item.longitude)]}>
          <Popup><center>Accident arrivé le {item.date} à {item.heure} <br/> Détails</center></Popup>
        </Marker>
    ))}
    </MapContainer>
  );
};

export default Map;
