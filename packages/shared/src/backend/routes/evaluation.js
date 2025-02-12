const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Route pour récupérer toutes les évaluations

// Route pour insérer une nouvelle évaluation
router.post('/insert-evaluation', async (req, res) => {
  const formData = req.body; // Les données du formulaire envoyées par le frontend

  try {
    const result = await prisma.$transaction(async (tx) => {
      const lastEvaluation = await tx.evaluation.lastEvaluation(); // Récupère la dernière évaluation

      return tx.evaluation.create({
        data: {
          id_eval: lastEvaluation.id_eval + 1, // Incrémente l'id de l'évaluation
          libelle: formData.libelle,
          coefficient: parseFloat(formData.coefficient), // Convertir en float si nécessaire
          notemaximale: parseFloat(formData.notemaximale), // Convertir en float si nécessaire
          periode: periode[formData.periode], // Convertir en enum
          createdat: new Date(),
          id_cours: parseInt(formData.id_cours, 10), // Convertir en entier
          id_notif: 3, // Exemple : une notification par défaut
          id_module: parseInt(formData.id_module, 10), // Convertir en entier
        },
      }) // Retourne l'évaluation créée
    });

    res.status(201).json(result); // Réponse JSON avec un statut HTTP 201 (Created)
  } catch (error) {
    console.error("Erreur lors de la création de l'évaluation :", error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création de l'évaluation.",
      details: error.message,
    });
  }
});

module.exports = router;
