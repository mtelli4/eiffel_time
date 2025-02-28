const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// 🔹 Route GET pour récupérer les moyennes des étudiants par module
router.get('/', async (req, res) => {
    try {
        const averages = await prisma.$queryRaw`
            SELECT 
                n.id_utilisateur, 
                e.id_module, 
                SUM(n.note * e.coefficient) / NULLIF(SUM(e.coefficient), 0) AS moyenne
            FROM notes n
            JOIN evaluation e ON n.id_eval = e.id_eval
            GROUP BY n.id_utilisateur, e.id_module
        `;

        res.json(averages);
    } catch (error) {
        console.error("❌ Erreur lors du chargement des moyennes :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

module.exports = router;
