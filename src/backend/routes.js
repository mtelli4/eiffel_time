const express = require('express');
const { getUtilisateurById } = require('./prismaQueries');
const router = express.Router();

// Route pour obtenir un utilisateur
router.get('/api/utilisateur', async (req, res) => {
    const userId = parseInt(req.query.id) || 1;  // ID par défaut = 1 si non fourni

    try {
        const utilisateur = await getUtilisateurById(userId);

        if (!utilisateur) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json(utilisateur);
        console.log('Utilisateur récupéré:', utilisateur);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Erreur lors de la récupération de l\'utilisateur' });
    }
});

module.exports = router;
