import express from 'express';
import prisma from '../client.js'; // Chemin vers votre Prisma client
const router = express.Router();

// Route pour mettre à jour un utilisateur
router.put('/update-user/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, email, statut } = req.body;

    try {
        res.json(await prisma.$transaction(async (prisma) => {
            return await prisma.utilisateur.update({
                where: { id: parseInt(id) },
                data: { nom, prenom, email, statut }
            })
        }));
    } catch (error) {
        res.status(500).json({ error: "Impossible de mettre à jour l'utilisateur ${id}" });
    }
});

module.exports = router;