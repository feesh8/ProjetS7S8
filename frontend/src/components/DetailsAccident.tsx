import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const DetailsAccident = () => {
    const [accidentDetails, setAccidentDetails] = useState(null);
    const accidentId = useParams()["id"];
  
    useEffect(() => {
      const fetchAccidentDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/accidents/${accidentId}`);
          setAccidentDetails(response.data);
        } catch (error) {
          console.error('Error fetching accident details:', error);
        }
      };
  
      fetchAccidentDetails();
    }, [accidentId]);
  
    if (!accidentDetails) {
      return <div>Loading...</div>;
    }

    const formattedDetails = Object.entries(accidentDetails).reduce((acc, [key, value]) => {
        // Exclure les champs vides ou null
        if (value !== '' && value !== null && value !== undefined) {
          // Gérer le formatage spécifique si nécessaire
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);
  
    return (
        <div className="details-container">
    <h2>Details de l'Accident</h2>
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
  
  export default DetailsAccident;