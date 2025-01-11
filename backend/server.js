// server.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');  // Import des routes définies dans routes.js

const app = express();

// Middleware pour permettre les requêtes depuis n'importe quel domaine (CORS)
app.use(cors());

// Intégration des routes dans l'application Express
app.use(routes);

// Lancer le serveur sur le port 4000
app.listen(4000, () => {
    console.log('Serveur démarré sur http://localhost:4000');
});
