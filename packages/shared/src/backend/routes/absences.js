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
              module_bloc_competence: {
                select: {
                  bloc_competence: {
                    select: {
                      formation: {
                        select: {
                          id_formation: true,
                          libelle: true,
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          debut: true,
        }
      },
      updatedat: true,
      message: true,
      valide: true,
      envoye: true,
      justificatif: true,
    },
    where: {
      etudiant: {
        utilisateur: {
          statut: 'student'
        },
      },
    },
    orderBy: {
      createdat: 'desc',  // Tri par date de création
    }
  });
  res.json(absences);
});

// Route pour accepter une absence
router.put('/:id/approve', async (req, res) => {
  const id = parseInt(req.params.id);
  const absence = await prisma.absence.update({
    where: { id_absence: id },
    data: { valide: true, updatedat: new Date() },
  });
  res.json(absence);
});

// Route pour rejeter une absence
router.put('/:id/reject', async (req, res) => {
  const id = parseInt(req.params.id);
  const absence = await prisma.absence.update({
    where: { id_absence: id },
    data: { valide: false, envoye: true, updatedat: new Date() },
  });
  res.json(absence);
});

module.exports = router;