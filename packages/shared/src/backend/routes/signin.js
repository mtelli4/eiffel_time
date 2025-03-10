const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();
const { comparePasswords } = require('../password')

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.utilisateur.findUnique({
      select: {
        id_utilisateur: true, prenom: true, nom: true, email: true, statut: true, mdp: true, salt: true
      },
      where: {
        email: email.toLowerCase(),
      },
    })
    if (user) {
      const valid = comparePasswords(password, user.salt, user.mdp)
      if (valid) {
        // enlever le mdp et le salt
        res.json({valid: valid, user: user})
      }
    } else {
      res.json({valid: false, user: false})
    }
  } catch (error) {
    res.status(500).json({
      error: `Erreur lors de la connexion de l'utilisateur ; ${error}.`,
    })
  }
})

module.exports = router;
