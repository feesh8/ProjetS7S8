import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const DetailsSignalement = () => {
    const [signalementDetails, setSignalementDetails] = useState<any>(null);
    const signalementId = useParams()["id"];
  
    useEffect(() => {
      const fetchSignalementDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/signalements/${signalementId}`);
          setSignalementDetails(response.data.data);
        } catch (error) {
          console.error('Error fetching signalement details:', error);
        }
      };
  
      fetchSignalementDetails();
    }, [signalementId]);
  
    if (!signalementDetails) {
      return <div>Loading...</div>;
    }
    else {
      const date = signalementDetails.date;
      console.log(date);
      console.log(signalementDetails);
    }

    function formatDate(dateTimeString : string ) {
      const date = new Date(dateTimeString);
      return date.toLocaleDateString();
    }
    
    function formatTime(dateTimeString : string) {
      const date = new Date(dateTimeString);
      return date.toLocaleTimeString();
    }
    

    // Afficher les détails de l'accident
  return (
    <div className="details-container">
      <h2>Détails du signalement</h2>
      <p><b>Date</b> : {formatDate(signalementDetails.date)}</p>
      <p><b>Heure</b> : {formatTime(signalementDetails.date)}</p>
      <p><b>Adresse</b> : {signalementDetails.adresse}</p>
      <p><b>Description</b> : {signalementDetails.description}</p>
      <Link to={`/`} className="link-retour" >Retour</Link> 
    </div>
  );

  

  //   const formattedDetails = Object.entries(signalementDetails).reduce((acc, [key, value]) => {
  //       // Exclure les champs vides ou null
  //       if (value !== '' && value !== null && value !== undefined) {
  //         // Gérer le formatage spécifique si nécessaire
  //         acc[key] = value;
  //       }
  //       return acc;
  //     }, {} as Record<string, any>);
  
  //   return (
  //       <div className="details-container">
  //   <h2>Details du signalement</h2>
  //   <dl className="details-list">
  //     {Object.entries(formattedDetails).map(([key, value]) => (
  //       <div key={key} className="details-item">
  //         <strong>{key}:</strong> {value}
  //       </div>
  //     ))}
  //   </dl>
  // </div>
  //   );

  };
  
  export default DetailsSignalement;