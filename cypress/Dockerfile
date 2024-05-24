# Utilise une image de base avec Node.js
FROM cypress/included:latest

# Définis le répertoire de travail
WORKDIR /cypress

# Copie les dépendances Cypress et installe
COPY package.json ./

# Copie les dépendances Cypress et installe
COPY package-lock.json ./

RUN npm install

# Copie le reste du code source
COPY . .

# Installer Cypress et ses dépendances
RUN npm install cypress --save-dev

# Exécute les tests Cypress
CMD ["npm", "run", "test:cypress"]
