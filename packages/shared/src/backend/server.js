const express = require('express');
const cors = require('cors');
const routes = require('./routes');  // Import des routes définies dans routes.js

const app = express();

const corsOptions = {
  origin: '*', // Accepter toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-tête autorisées dans les requêtes
  credentials: true, // Nécessaire pour les requêtes avec des cookies ou des sessions
}

app.use(cors(corsOptions));

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Intégration des routes dans l'application Express
app.use('/api', routes);  // Assurez-vous que les routes sont préfixées par "/api"

// Lancer le serveur sur le port 4000
app.listen(4000, () => {
  console.log('Serveur démarré sur http://localhost:4000');
});
