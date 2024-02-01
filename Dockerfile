# image 
FROM node:latest

# répertoire pour l'application
WORKDIR /usr/src/app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Seedings
# RUN npm run seed:db

# Copier tous les fichiers source de l'application dans l'image
COPY . .

RUN npm run build

# Exposer le port que votre application utilise
EXPOSE 8000

# Définir la commande pour démarrer l'application
CMD ["node", "dist/index.js"]

