import express from 'express';
import prisma from '../client.js'; // Chemin vers votre Prisma client
const router = express.Router();

async function updateUser(formData) {
    return prisma.$transaction(async (prisma) => {
        const user = await prisma.user.update({
            where: {
                id: formData.id,
            },
            data: {
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                statut: formData.statut,
            },
        });

        return user; // Retourne l'utilisateur mis à jour
    });
}