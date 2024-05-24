import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./DetailsAccident.css"


const DetailsAccident = () => {
    const [accidentDetails, setAccidentDetails] = useState<any>({});
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

    const renderDescription = () => {
      if (!accidentDetails) return null;
  
      const { NbHopital, NbNonHopital, 'Nombre des personnes décédées': NombreDecedes, ...details } = accidentDetails;
  
      return (
        <div>
          <p>Nombre d'hospitalisations : {NbHopital}</p>
          <p>Nombre de personnes non hospitalisées : {NbNonHopital}</p>
          <p>Nombre de personnes décédées : {NombreDecedes}</p>
          <p>Intersection : {details.intersection}</p>
        </div>
      );
    };

    // Afficher les détails de l'accident
  return (
    <div className="details-container">
      <h2>Détails de l'accident</h2>
      <p><b>Date</b> : {accidentDetails.Date}</p>
      <p><b>Heure</b> : {accidentDetails.Heure}</p>
      <p><b>Adresse</b> : {accidentDetails.adresse}</p>
      <p><b>Description</b> : {renderDescription()}</p>
      <Link to={`/`} className="link-retour" >Retour</Link>
    </div>
  );
  };
  
  export default DetailsAccident;