const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

// Middleware pour permettre les requêtes depuis n'importe quel domaine (CORS)
app.use(cors());

// API pour obtenir tous les utilisateurs
app.get('/api/utilisateurs', async (req, res) => {
    try {
        const utilisateurs = await prisma.utilisateur.findMany();
        res.json(utilisateurs);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
});

// Lancer le serveur
app.listen(4000, () => {
    console.log('Serveur démarré sur http://localhost:4000');
});
