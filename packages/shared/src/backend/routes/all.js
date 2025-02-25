const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Route pour récupérer la liste des formations
router.get('/formations', async (req, res) => {
  try {
    const formations = await prisma.formation.findMany({
      select: {
        id_formation: true,
        libelle: true,
      },
      orderBy: {
        id_formation: 'asc',  // Tri par id de formation
      },
    });

    res.json(formations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des formations.' });
  }
});

module.exports = router;
