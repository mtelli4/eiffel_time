const express = require('express');
const { PrismaClient, periode, statut_utilisateur } = require('@prisma/client');
const { Decimal } = require('@prisma/client/runtime/library');

const prisma = new PrismaClient();
const router = express.Router();

// Route pour récupérer toutes les évaluations et les notes d'un étudiant
router.get('/', async (req, res) => {
  try {
    const test = await prisma.$queryRaw`SELECT m.id_module, m.libelle, m.codeapogee,
    e.id_eval, e.libelle AS eval_libelle, e.periode, 
    c.debut, c.fin, 
    e.notemaximale, e.coefficient, e.id_module,
    n.note, n.commentaire,
    et.numeroetudiant, u.id_utilisateur, u.nom, u.prenom
FROM module m
JOIN evaluation e ON e.id_module = m.id_module
JOIN cours c ON c.id_module = m.id_module
JOIN notes n ON n.id_eval = e.id_eval
JOIN etudiant et ON et.id_utilisateur = n.id_utilisateur
JOIN utilisateur u ON u.id_utilisateur = et.id_utilisateur
ORDER BY m.id_module, e.createdat, u.nom, u.prenom`;

    res.json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

// Route pour créer une nouvelle évaluation
router.post('/insert-evaluation', async (req, res) => {
  const formData = req.body;
  try {
    const result = await prisma.$transaction(async (tx) => {
      const maxId = await tx.evaluation.aggregate({
        _max: {
          id_eval: true,
        },
      });
      const newId = maxId._max.id_eval + 1;
      const evaluation = await tx.evaluation.create({
        data: {
          id_eval: newId,
          libelle: formData.libelle,
          coefficient: formData.coefficient,
          notemaximale: formData.notemaximale,
          periode: periode[formData.periode],
          createdat: new Date(),
          id_cours: formData.id_cours,
          id_notif: 3,
          id_module: formData.id_module,
        },
      });

      return evaluation;
    });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'évaluation.', details: error });
  }
});

// Route pour supprimer une évaluation
router.delete('/delete-evaluation/:id_evaluation', async (req, res) => {
  const { id_evaluation } = req.params;
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const existingEvaluation = await prisma.evaluation.findUnique({
        where: { id_eval: parseInt(id_evaluation) },
      });

      // Si l'évaluation n'existe pas
      if (!existingEvaluation) {
        return res.status(404).json({ error: "Évaluation non trouvée." });
      }

      // Suppression des notes associées à l'évaluation
      await prisma.notes.deleteMany({
        where: { id_eval: parseInt(id_evaluation) },
      });

      // Suppression de l'évaluation
      await prisma.evaluation.delete({
        where: { id_eval: parseInt(id_evaluation) },
      });

      return { message: "Évaluation supprimée avec succès." };
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression de l'évaluation." });
  }
});

// 🔹 Route pour insérer une nouvelle note
router.post('/insert-note', async (req, res) => {
  const { id_eval, id_utilisateur, note, commentaire } = req.body;
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const result = await prisma.notes.create({
        data: {
          id_utilisateur,
          id_eval,
          note,
          commentaire,
          createdat: new Date(),
        },
      });

      return result;
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
  const { id_utilisateur, id_eval } = req.params;
  const { note, commentaire } = req.body;
  try {
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
        note: new Decimal(note),
        commentaire: commentaire,
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
        numeroetudiant: true,
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
          }
        }
      },
      where: {
        utilisateur: {
          statut: statut_utilisateur.student,
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
