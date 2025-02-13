const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/select', async (req, res) => {
  // Utilisation de req.query pour passer l'ID en paramètre de requête
  const { id } = req.query;
  try {
    const note = await prisma.notes.findMany({
      select: {
        note: true,
        commentaire: true,
      },
      where: {
        id_utilisateur: Number(id) || 1,  // Utilisation de l'ID passé ou valeur par défaut 1
      },
      orderBy: {
        createdat: 'asc',  // Tri par date de création
      },
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
