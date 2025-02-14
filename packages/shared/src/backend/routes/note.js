const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// 🔹 Route pour insérer une nouvelle note
router.post('/insert-note', async (req, res) => {
    try {
        const { id_eval, id_utilisateur, note, commentaire } = req.body;

        const result = await prisma.notes.create({
            data: {
                id_utilisateur,
                id_eval,
                note,
                commentaire,
                createdat: new Date(),
                updatedat: new Date(),
            },
        });

        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'ajout de la note." });
    }
});

// 🔹 Route pour mettre à jour une note existante
router.put('/update-note/:id_utilisateur/:id_eval', async (req, res) => {
    try {
        const { id_utilisateur, id_eval } = req.params;
        const { note, commentaire } = req.body;

        // Vérifie si la note existe déjà
        const existingNote = await prisma.notes.findUnique({
            where: {
                id_utilisateur_id_eval: {
                    id_utilisateur: parseInt(id_utilisateur),
                    id_eval: parseInt(id_eval),
                },
            },
        });

        if (!existingNote) {
            return res.status(404).json({ error: "Note non trouvée." });
        }

        // Mise à jour de la note
        const updatedNote = await prisma.notes.update({
            where: {
                id_utilisateur_id_eval: {
                    id_utilisateur: parseInt(id_utilisateur),
                    id_eval: parseInt(id_eval),
                },
            },
            data: {
                note,
                commentaire,
                updatedat: new Date(),
            },
        });

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de la note." });
    }
});

module.exports = router;
