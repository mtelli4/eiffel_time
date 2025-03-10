const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Récupérer les informations d'un utilisateur
router.post('/me/:email', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.utilisateur.findUnique({
      select: {
        id_utilisateur: true,
        nom: true,
        prenom: true,
        statut: true,
      },
      where: {
        email: email,
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des informations.' });
  }
});

module.exports = router;
