const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();  // Créez une instance de PrismaClient
const router = express.Router();    // Initialisation du routeur Express

// Route pour récupérer la liste des utilisateurs avec leurs formations
router.get('/utilisateurs', async (req, res) => {
    try {
        // Récupération de tous les utilisateurs avec leurs formations liées
        const utilisateurs = await prisma.utilisateur.findMany({
            include: {
                formation_utilisateur: {
                    include: {
                        formation: true,  // Inclure les formations associées
                    },
                    orderBy: {
                        formation: {
                            libelle: 'asc',  // Tri par libellé de formation
                        }
                    }
                },
            },
            orderBy: {
                id_utilisateur: 'asc',  // Tri par nom d'utilisateur
            }
        });

        // Conversion des utilisateurs et formations en objets Utilisateur et Formation
        const users = utilisateurs.map(utilisateur => {
            const formations = utilisateur.formation_utilisateur.map(fu => ({
                id_formation: fu.formation.id_formation,
                libelle: fu.formation.libelle,
                lien: fu.formation.lien,
                trombinoscope: fu.formation.trombinoscope,
            }));

            // Retourner un objet simple représentant l'utilisateur avec ses formations
            return {
                id_utilisateur: utilisateur.id_utilisateur,
                nom: utilisateur.nom,
                prenom: utilisateur.prenom,
                email: utilisateur.email,
                statut: utilisateur.statut,
                formations: formations,
            };
        });

        // Retourne la liste des utilisateurs avec leurs formations
        res.json(users);

    } catch (error) {
        console.error(error);  // Log de l'erreur pour déboguer
        // Retour de l'erreur en cas de problème
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
    }
});

module.exports = router;  // Exporte le routeur pour l'utiliser dans d'autres fichiers
