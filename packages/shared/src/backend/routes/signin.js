const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();
const { comparePasswords } = require('../password')

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(email)

    const user = await prisma.utilisateur.findUnique({
      where: {
        email: email,
      },
    })
    if (user) {
      const valid = comparePasswords(password, user.salt, user.mdp)
      res.json(valid)
    } else {
      res.json(false)
    }
  } catch (error) {
    res.status(500).json({
      error: `Erreur lors de la connexion de l'utilisateur ; ${error}.`,
    })
  }
})

module.exports = router;
