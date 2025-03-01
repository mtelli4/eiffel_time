const express = require('express');
const { PrismaClient, periode } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();



router.post('/insert-evaluation', async (req, res) => {
  try {
    const formData = req.body; 
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

router.delete('/delete-evaluation/:id_evaluation', async (req, res) => {
  try {
      const { id_evaluation } = req.params;

   
      const existingEvaluation = await prisma.evaluation.findUnique({
          where: { id_eval: parseInt(id_evaluation) }, 
      });

      if (!existingEvaluation) {
          return res.status(404).json({ error: "Évaluation non trouvée." });
      }

 
      await prisma.notes.deleteMany({
          where: { id_eval: parseInt(id_evaluation) },
      });

    
      await prisma.evaluation.delete({
          where: { id_eval: parseInt(id_evaluation) },
      });

      res.status(200).json({ message: "Évaluation supprimée avec succès." });
  } catch (error) {
      console.error("Erreur lors de la suppression de l'évaluation :", error);
      res.status(500).json({ error: "Erreur serveur lors de la suppression." });
  }
});


module.exports = router;
