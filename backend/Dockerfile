FROM node:latest

# Définissez le répertoire de travail dans le conteneur
WORKDIR /backend

# Copiez le fichier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances npm
RUN npm install

# Copiez le reste des fichiers dans le conteneur
COPY . .

# Exposez le port sur lequel votre application écoute
EXPOSE 3001

# Commande pour démarrer votre application
CMD ["npm", "run", "start"]