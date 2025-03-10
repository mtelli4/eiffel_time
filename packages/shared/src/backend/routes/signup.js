const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();
const { hashPassword, generateSalt } = require('../password')

router.post('/signup', async (req, res) => {
  const { lastname, firstname, email, password } = req.body
  const salt = generateSalt(16)
  const hashedPassword = hashPassword(password, salt)
  try {
    const createUser = await prisma.$transaction(async (tx) => {
      const user = await tx.utilisateur.update({
        where: {
          email: email,
        },
        data: {
          mdp: hashedPassword,
          salt: salt,
          updatedat: new Date(),
        },
      })
      return user
    })
    res.json(createUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: `Erreur lors de la création de l'utilisateur ; ${error}.`,
    })
  }
})

module.exports = router;