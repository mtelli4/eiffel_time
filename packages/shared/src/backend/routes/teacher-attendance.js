const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Route pour récupérer l'ensemble des présences des enseignants pour chaque module
router.get('/select', async (req, res) => {
  try {
    const teacherAttendances = await prisma.enseignant.findMany({
      include: {
        utilisateur: {
          select: {
            id_utilisateur: true,
            nom: true,
            prenom: true
          }
        },
        enseignant_module: {
          include: {
            module: {
              select: {
                id_module: true,
                libelle: true,
                codeapogee: true,
                heures: true,
              }
            }
          }
        }
      },
      omit: {
        vacataire: true,
      },
    });
    res.json(teacherAttendances);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
