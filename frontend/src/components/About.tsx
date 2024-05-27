import React from 'react';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <h2>A propos de notre projet</h2>
      <p>Bienvenue sur notre projet "Sécurité des Cyclistes à Rennes". Ce projet vise à améliorer la sécurité des cyclistes à Rennes en fournissant des informations et des outils utiles.</p>
      <p>Ce projet a été réalisé pendant l'année 2023-2024 par un groupe de trois élèves de SI : Fanny Shehabi, Theo Laminie et Antoine Rault</p>
      <p>Ce travail a été encadré par Zoltan Miklos</p>
      <p>Pour plus d'informations, visitez notre <a href="https://github.com/feesh8/ProjetS7S8" target="_blank" rel="noopener noreferrer">github</a>.</p>
    </div>
  );
};

export default About;