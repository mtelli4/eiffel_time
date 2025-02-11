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

// Route pour récupérer la liste des groupes
router.get('/groupes', async (req, res) => {
  try {
    const groupes = await prisma.groupe.findMany({
      select: {
        id_grp: true,
        libelle: true,
      },
      orderBy: {
        id_grp: 'asc',  // Tri par id de groupe
      },
    });

    res.json(groupes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des groupes.' });
  }
});

module.exports = router;
