import express from 'express';
import prisma from '../client.js'; // Chemin vers votre Prisma client
const router = express.Router();

async function insertEvaluationAndGrades(formData) {
    return prisma.$transaction(async (prisma) => {
        const evaluation = await prisma.evaluation.create({
            data: {
                libelle: formData.libelle,
                coefficient: formData.coefficient,
                notemaximale: formData.notemaximale,
                periode: formData.periode,
                createdat: new Date(),
                id_cours: formData.id_cours,
                id_notif: 3, // Par exemple, une notification par défaut
                id_module: formData.id_module,
            },
        });

        return evaluation; // Retourne l'évaluation créée
    });
}

router.post('/insert-evaluation', async (req, res) => {
    try {
        const formData = req.body; // Les données du formulaire envoyées par le frontend
        const result = await insertEvaluationAndGrades(formData);
        res.status(201).json(result); // Réponse JSON contenant l'évaluation créée
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'évaluation.', details: error });
    }
});

export default router;
