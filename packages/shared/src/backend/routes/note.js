const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

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

module.exports = router;
