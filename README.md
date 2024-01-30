# VestiMeteo-Back

## Description
Ce projet vise à créer un service en ligne utilisant les données météorologiques de l'API OpenWeather pour fournir des conseils vestimentaires adaptés aux conditions météorologiques actuelles. En d'autres termes, le projet intègre un backend qui interroge l'API météo "Open Weather" pour récupérer des informations sur les conditions météorologiques et utilise ces données pour recommander des tenues vestimentaires appropriées aux utilisateurs.

## Configuration
Assurez-vous d'avoir Node.js et npm d'installés.

## Installation
1. Clonez ce dépôt : `git clone https://github.com/Vesti-Meteo/VestiMeteo-Back.git`
2. Accédez au répertoire : `cd VestiMeteo-Back`
3. Installez les dépendances : `npm install bcrypt cors dotenv express helmet jsonwebtoken mongoose node-cache node-fetch nodemon`

## Usage
- Compiler TypeScript : `npx tsc`
- Démarrez le linter (ESLint) : `npm run lint`
- Démarrez le Dockercompose : `docker-compose up -d`
- Démarrez l'application : `npm run dev`
- Visitez http://localhost:8000 dans votre navigateur.

## Swagger API
Pour accéder à la documentation Swagger de l'API, rendez-vous sur http://localhost:3000/api-docs après avoir démarré l'application.

## Grafana - Prometheus
Pour accéder au metrics de Grafana, rendez-vous sur http://localhost:8000/metrics ou directement sur le port de Grafana pour visualiser les dashboards de Vesti Météo : http://localhost:3000/.
