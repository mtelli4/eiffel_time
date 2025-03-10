const express = require('express');
const cors = require('cors');
const routes = require('./routes');  // Import des routes définies dans routes.js
const app = express();

// Configuration de CORS pour autoriser les requêtes provenant de l'application React
const corsOptions = {
  origin: '*', // URL de l'application React
  // Autoriser les cookies pour les requêtes CORS
  credentials: true,
  // Autoriser les méthodes HTTP
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // Autoriser les en-têtes HTTP
  allowedHeaders: ['Content-Type', 'Authorization'],
  // Exposer les en-têtes HTTP
  exposedHeaders: ['Authorization'],
  // Préflight Continue
  preflightContinue: false,
  // Configuration des options CORS pour les requêtes pré-vol
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Intégration des routes dans l'application Express
app.use('/api', routes);  // Assurez-vous que les routes sont préfixées par "/api"

const PORT = 4000;
// Lancer le serveur sur le port 4000
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
