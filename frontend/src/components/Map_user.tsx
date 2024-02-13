import MarkerClusterGroup from 'react-leaflet-cluster'
import L, {MarkerCluster} from "leaflet";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import "./Map_user.css";
import "leaflet/dist/leaflet.css";

interface DataItem {
  id: number;
  date: string;
  heure: string;
  latitude: string;
  longitude: string;
}

const customIcon = new L.Icon({
  iconUrl: require("./location.svg").default,
  iconSize: new L.Point(40, 47)
});

const createClusterCustomIcon = function (cluster: MarkerCluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: L.point(33, 33, true)
  });
};

const Map: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:3001/api/signalement');
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
        <MarkerClusterGroup
        chunkedLoading
      >
      {data.map((item, index) => (
        <Marker key={index} position={[parseFloat(item.latitude), parseFloat(item.longitude)]} icon={customIcon}>
          <Popup><center>Accident arrivé le {item.date} à {item.heure} <br /> <Link to={`/accidents/${item.id}`}>Détails</Link></center></Popup>
        </Marker>
      ))}
      </MarkerClusterGroup>
    </MapContainer></div></>
  );
};

export default Map;
