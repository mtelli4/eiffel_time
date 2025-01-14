import express from 'express'
import prisma from '../client.js'

const router = express.Router();

async function insertEvaluationAndGrades(formData) {
    const { req } = formData;

    return prisma.$transaction(async (prisma) => {
        // Créer une nouvelle évaluation
        return prisma.evaluation.create({
            data: {
                libelle: req.body.libelle,
                coefficient: req.body.coefficient,
                notemaximale: req.body.notemaximale,
                periode: req.body.periode,
                createdat: new Date(),
                id_cours: req.body.id_cours,
                id_notif: 3,
                id_module: req.body.id_module,
            }
        }) // Vous pouvez retourner l'évaluation ou d'autres données si nécessaire
    }) // Retourne le résultat de la transaction (par exemple, l'évaluation)
}


router.post('/insert-evaluation', async (req, res) => {
    try {
        const formData = req.body; // Supposons que vous recevez les données du formulaire dans le corps de la requête
        const result = await insertEvaluationAndGrades(formData);
        res.status(201).json(result); // Retourne l'évaluation créée avec succès
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'évaluation.' });
    }
})