import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const DetailsSignalement = () => {
    const [signalementDetails, setSignalementDetails] = useState(null);
    const signalementId = useParams()["id"];
  
    useEffect(() => {
      const fetchSignalementDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/signalement/${signalementId}`);//url faux
          setSignalementDetails(response.data);
        } catch (error) {
          console.error('Error fetching signalement details:', error);
        }
      };
  
      fetchSignalementDetails();
    }, [signalementId]);
  
    if (!signalementDetails) {
      return <div>Loading...</div>;
    }

    const formattedDetails = Object.entries(signalementDetails).reduce((acc, [key, value]) => {
        // Exclure les champs vides ou null
        if (value !== '' && value !== null && value !== undefined) {
          // Gérer le formatage spécifique si nécessaire
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);
  
    return (
        <div className="details-container">
    <h2>Details du signalement</h2>
    <dl className="details-list">
      {Object.entries(formattedDetails).map(([key, value]) => (
        <div key={key} className="details-item">
          <strong>{key}:</strong> {value}
        </div>
      ))}
    </dl>
  </div>
    );
  };
  
  export default DetailsSignalement;