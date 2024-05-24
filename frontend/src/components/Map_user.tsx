import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Link } from 'react-router-dom';
import L, { MarkerCluster } from "leaflet";
import "./Map_user.css";
import "leaflet/dist/leaflet.css";

interface DataItem {
  id: number;
  date: string;
  latitude: string;
  longitude: string;
  description: string;
  type: string;
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
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [data, selectedType, startDate, endDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/signalements');
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error('Le type de données reçu n\'est pas un tableau.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const applyFilters = () => {
    let filtered = data;
    if (selectedType) {
      filtered = filtered.filter(item => item.type === selectedType);
    }
    if (startDate) {
      filtered = filtered.filter(item => new Date(item.date) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter(item => new Date(item.date) <= new Date(endDate));
    }
    setFilteredData(filtered);
  };

  // return (
  //   <div>
  //     <div className="filter-controls">
  //       <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
  //         <option value="">Tous</option>
  //         <option value="Accident">Accident</option>
  //         <option value="Danger">Danger</option>
  //       </select>
  //       <input 
  //         type="date" 
  //         value={startDate} 
  //         onChange={(e) => setStartDate(e.target.value)} 
  //         placeholder="Date de début" 
  //       />
  //       <input 
  //         type="date" 
  //         value={endDate} 
  //         onChange={(e) => setEndDate(e.target.value)} 
  //         placeholder="Date de fin" 
  //       />
  //     </div>
  //     <MapContainer
  //       center={[48.117, -1.677]}
  //       zoom={13}
  //       style={{ height: '500px', width: '500px' }}
  //       className='Map-container'
  //     >
  //       <TileLayer
  //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
  //       <MarkerClusterGroup chunkedLoading>
  //         {filteredData.map((item, index) => (
  //           <Marker key={index} position={[parseFloat(item.latitude), parseFloat(item.longitude)]} icon={customIcon}>
  //             <Popup>
  //               <center>
  //                 Accident arrivé le {new Date(item.date).toLocaleDateString()} <br />
  //                 <Link to={`/signalements/${item.id}`}>Détails</Link>
  //               </center>
  //             </Popup>
  //           </Marker>
  //         ))}
  //       </MarkerClusterGroup>
  //     </MapContainer>
  //   </div>
  // );

  return (
    <div className="map-page">
      <div className="filter-controls">
        <h2>Filtres</h2>
        <label>
          Type de signalement :
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">Tous</option>
            <option value="Accident">Accident</option>
            <option value="Danger">Danger</option>
          </select>
        </label>
        <label>
          Date de début :
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </label>
        <label>
          Date de fin :
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </label>
      </div>

      <MapContainer
        center={[48.117, -1.677]}
        zoom={13}
        style={{ height: '600px', width: '75%' }}
        className="Map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup chunkedLoading>
          {filteredData.map((item, index) => (
            <Marker key={index} position={[parseFloat(item.latitude), parseFloat(item.longitude)]} icon={customIcon}>
              <Popup>
                <center>
                  {item.type} survenu le {new Date(item.date).toLocaleDateString()} <br />
                  <Link to={`/signalements/${item.id}`}>Détails</Link>
                </center>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
  
};

export default Map;
