const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Route pour récupérer toutes les absences
router.get('/', async (req, res) => {
  const absences = await prisma.absence.findMany({
    select: {
      id_absence: true,
      etudiant: {
        select: {
          utilisateur: {
            select: {
              id_utilisateur: true,
              nom: true,
              prenom: true,
            }
          },
          groupe_etudiant: {
            select: {
              groupe: {
                select: {
                  id_grp: true,
                  libelle: true,
                }
              }
            }
          }
        }
      },
      cours: {
        select: {
          module: {
            select: {
              id_module: true,
              codeapogee: true,
              libelle: true,
            }
          },
          debut: true,
        }
      },
      updatedat: true,
      valide: true,
      envoye: true,
      justificatif: true,
    },
    orderBy: {
      createdat: 'desc',  // Tri par date de création
    }
  });
  res.json(absences);
});

module.exports = router;