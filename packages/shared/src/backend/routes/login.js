const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const user = await prisma.utilisateur.findUnique({
      where: {
        email: req.body.email,
      }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

module.exports = router;
