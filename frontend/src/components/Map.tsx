import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface Incident {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
}

const Map: React.FC = () => {

  const incidents: Incident[] = [
    { id: 1, latitude: 48.119, longitude: -1.678, description: 'Incident 1' },
    { id: 2, latitude: 48.118, longitude: -1.675, description: 'Incident 2' },
  ];

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
      {incidents.map(incident => (
        <Marker key={incident.id} position={[incident.latitude, incident.longitude]}>
          <Popup>{incident.description}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
