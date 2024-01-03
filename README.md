# VestiMeteo-Back

## Description
Ce projet vise à créer un service en ligne qui utilise les données météorologiques de l'API OpenWeather pour fournir des conseils vestimentaires adaptés aux conditions météorologiques actuelles. En d'autres termes, le projet intégre un backend qui fait appel à l'API météo "Open Weather" pour récupérer des informations sur les conditions météorologiques, puis à utiliser ces données pour recommander des tenues vestimentaires appropriées aux utilisateurs. 

## Configuration
Assurez-vous d'avoir Node.js et npm d'installés.

## Installation
1. Clonez ce dépôt : `git clone https://github.com/Vesti-Meteo/VestiMeteo-Back.git`
2. Accédez au répertoire : `cd VestiMeteo-Back`
3. Installez les dépendances : `npm install bcrypt cors dotenv express helmet jsonwebtoken mongoose morgan nodemon`

## Usage
- Compiler TypeScript : `npx tsc`
- Démarrez l'application : `npm run dev`
- Visitez http://localhost:8000 dans votre navigateur.

## Swagger API
Pour accéder à la documentation Swagger de l'API, rendez-vous sur http://localhost:3000/api-docs après avoir démarré l'application.
