const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Route pour récupérer toutes les évaluations et les notes d'un étudiant
router.get('/', async (req, res) => {
  try {
    const evaluationsAndNotes = await prisma.module.findMany({
      select: {
        id_module: true,
        libelle: true,
        codeapogee: true,
        evaluation: {
          select: {
            id_eval: true,
            libelle: true,
            periode: true,
            cours: {
              select: {
                debut: true,
                fin: true,
              },
            },
            notemaximale: true,
            coefficient: true,
            notes: {
              select: {
                etudiant: {
                  select: {
                    numeroetudiant: true,
                    utilisateur: {
                      select: {
                        id_utilisateur: true,
                        nom: true,
                        prenom: true,
                      }
                    }
                  }
                },
                note: true,
                commentaire: true,
              }
            }
          }
        }
      }
    });

    res.status(200).json(evaluationsAndNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des évaluations et des notes." });
  }
});

// 🔹 Route pour insérer une nouvelle note
router.post('/insert-note', async (req, res) => {
  try {
    const { id_eval, id_utilisateur, note, commentaire } = req.body;

    const result = await prisma.notes.create({
      data: {
        id_utilisateur,
        id_eval,
        note,
        commentaire,
        createdat: new Date(),
        updatedat: new Date(),
      },
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'ajout de la note." });
  }
});

router.delete("/delete-note/:id_utilisateur/:id_eval", async (req, res) => {
  try {
    const { id_utilisateur, id_eval } = req.params;


    const existingNote = await prisma.notes.findUnique({
      where: {
        id_utilisateur_id_eval: {
          id_utilisateur: parseInt(id_utilisateur),
          id_eval: parseInt(id_eval),
        },
      },
    });

    if (!existingNote) {
      return res.status(404).json({ error: "Note non trouvée." });
    }

    await prisma.notes.delete({
      where: {
        id_utilisateur_id_eval: {
          id_utilisateur: parseInt(id_utilisateur),
          id_eval: parseInt(id_eval),
        },
      },
    });

    res.status(200).json({ message: "Note supprimée avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression de la note." });
  }
});




// 🔹 Route pour mettre à jour une note existante
router.put('/update-note/:id_utilisateur/:id_eval', async (req, res) => {
  try {
    const { id_utilisateur, id_eval } = req.params;
    const { note, commentaire } = req.body;

    // Vérifie si la note existe déjà
    const existingNote = await prisma.notes.findUnique({
      where: {
        id_utilisateur_id_eval: {
          id_utilisateur: parseInt(id_utilisateur),
          id_eval: parseInt(id_eval),
        },
      },
    });

    if (!existingNote) {
      return res.status(404).json({ error: "Note non trouvée." });
    }

    // Mise à jour de la note
    const updatedNote = await prisma.notes.update({
      where: {
        id_utilisateur_id_eval: {
          id_utilisateur: parseInt(id_utilisateur),
          id_eval: parseInt(id_eval),
        },
      },
      data: {
        note,
        commentaire,
        updatedat: new Date(),
      },
    });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour de la note." });
  }
});

// Route pour récupérer la liste des cours
router.get('/cours', async (req, res) => {
  try {
    const cours = await prisma.cours.findMany({
      orderBy: {
        id_cours: 'asc',  // Tri par id de cours
      },
    });

    res.json(cours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des cours.' });
  }
});

// Route pour récupérer la liste des étudiants
router.get('/etudiants', async (req, res) => {
  try {
    const etudiants = await prisma.etudiant.findMany({
      select: {
        id_utilisateur: true,
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
          }
        }
      },
      orderBy: {
        utilisateur: {
          nom: 'asc',  // Tri par nom
        },
        utilisateur: {
          prenom: 'asc',  // Puis par prénom
        }
      },
    });

    res.json(etudiants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des étudiants.' });
  }
});

module.exports = router;
