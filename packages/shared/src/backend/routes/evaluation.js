const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Route pour récupérer toutes les évaluations

// Route pour insérer une nouvelle évaluation
router.post('/insert-evaluation', async (req, res) => {
  try {
    const formData = req.body; // Les données du formulaire envoyées par le frontend
    const result = await prisma.$transaction(async (prisma) => {
      const maxId = await prisma.evaluation.aggregate({
        _max: {
          id_eval: true,
        },
      });
      const newId = maxId._max.id_eval + 1;
      const evaluation = await prisma.evaluation.create({
        data: {
          id_eval: newId,
          libelle: formData.libelle,
          coefficient: formData.coefficient,
          notemaximale: formData.notemaximale,
          periode: periode[formData.periode],
          createdat: new Date(),
          id_cours: formData.id_cours,
          id_notif: 3, // Par exemple, une notification par défaut
          id_module: formData.id_module,
        },
      });

      return evaluation; // Retourne l'évaluation créée
    });
    res.status(201).json(result); // Réponse JSON contenant l'évaluation créée
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'évaluation.', details: error });
  }
});

module.exports = router;
