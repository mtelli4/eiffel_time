// prismaQueries.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fonction pour récupérer un utilisateur par ID
async function getUtilisateurById(id_utilisateur) {
    try {
        return await prisma.utilisateur.findUnique({
            where: {
                id_utilisateur: id_utilisateur,
            },
            select: {
                id_utilisateur: true,
                nom: true,
                prenom: true,
                email: true,
                statut: true,
            },
        })
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        throw new Error('Erreur lors de la récupération de l\'utilisateur');
    }
}

module.exports = {
    getUtilisateurById,
};
