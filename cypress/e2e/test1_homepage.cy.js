describe('first test', () => {
    it('check map', () => {
      cy.visit('http://localhost:3000')

      //vérification de la présence du titre, de la carte et des diagrammes
      cy.contains('Sécurité des Cyclistes à Rennes')
      cy.get('.leaflet-container').should('exist');
      cy.get('[src="/diagrammes/8_rues.png"]').should('exist');
      cy.get('[src="/diagrammes/accidents_en_fonction_heure.png"]').should('exist');
      cy.get('[src="/diagrammes/accidents_en_fonction_jour.png"]').should('exist');

      //vérification des marqueur et des détails pour chaque pin
      cy.get('.marker-cluster-large > div > span').click();
      cy.get('[style="margin-left: -20px; margin-top: -20px; width: 40px; height: 40px; transform: translate3d(236px, 274px, 0px); z-index: 274; opacity: 1;"] > div > span').click();
      cy.get('[style="margin-left: -20px; margin-top: -23.5px; width: 40px; height: 47px; transform: translate3d(318px, 266px, 0px); z-index: 266; opacity: 1;"]').click();
      cy.get('center > a').click();
      cy.url().should('include', '/accidents/1');
      cy.visit('/');

      //vérification du zoom sur la carte
      cy.get('.leaflet-control-zoom-in').click();
      cy.wait(500); 
      cy.get('.leaflet-control-zoom-out').click();    
      cy.wait(500); 



    })
  })