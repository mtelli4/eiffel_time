const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Route pour récupérer l'ensemble des données en une seule requête
router.get('/data', async (req, res) => {
  try {
    // Récupération de toutes les absences
    const absences = await prisma.absence.findMany({
      orderBy: {
        createdat: 'asc',  // Tri par date de création
      }
    });

    // Récupération de tous les blocs de compétences
    const blocs = await prisma.bloc_competence.findMany();

    // Récupération de tous les messages de communication
    const communiquer = await prisma.communiquer.findMany({
      orderBy: {
        createdat: 'desc',  // Tri par date de création
      }
    });

    // Récupération de tous les cours
    const cours = await prisma.cours.findMany({
      orderBy: {
        debut: 'asc',  // Tri par date de début
      }
    });

    // Récupération de tous les enseignants
    const enseignants = await prisma.enseignant.findMany({
      include: {
        utilisateur: true,  // Inclure les informations de l'utilisateur
      },
      orderBy: {
        id_utilisateur: 'asc',  // Tri par id d'utilisateur
      }
    });

    // Récupération de tous les modules liés aux enseignants
    const enseignant_module = await prisma.enseignant_module.findMany();

    // Récupération de tous les étudiants
    const etudiants = await prisma.etudiant.findMany({
      include: {
        utilisateur: true,  // Inclure les informations de l'utilisateur
      },
      orderBy: {
        id_utilisateur: 'asc',  // Tri par id d'utilisateur
      }
    });

    // Récupération de toutes les évaluations
    const evaluations = await prisma.evaluation.findMany({
      orderBy: {
        createdat: 'asc',  // Tri par date de création
      }
    });

    // Récupération de toutes les formations
    const formations = await prisma.formation.findMany({
      orderBy: {
        libelle: 'asc',  // Tri par libellé de formation
      }
    });

    // Récupération de toutes les formations liés aux utilisateurs
    const formation_utilisateur = await prisma.formation_utilisateur.findMany();

    // Récupération de tous les groupes
    const groupes = await prisma.groupe.findMany({
      orderBy: {
        id_grp: 'asc',  // Tri par id de groupe
      }
    });

    // Récupération de tous les groupes liés aux étudiants
    const groupe_etudiant = await prisma.groupe_etudiant.findMany();

    // Récupération de tous les messages
    const messages = await prisma.message.findMany({
      orderBy: {
        createdat: 'desc',  // Tri par date de création
      }
    });

    // Récupération de tous les modules
    const modules = await prisma.module.findMany();

    // Récupération de tous les modules liés aux blocs de compétences
    const module_bloc_competence = await prisma.module_bloc_competence.findMany({
      orderBy: {
        periode: 'asc',  // Tri par période
      }
    });

    // Récupération de toutes les notes
    const notes = await prisma.notes.findMany({
      orderBy: {
        createdat: 'asc',  // Tri par date de création
      }
    });

    // Récupération de tous les utilisateurs
    const utilisateurs = await prisma.utilisateur.findMany({
      orderBy: {
        id_utilisateur: 'asc',  // Tri par id d'utilisateur
      }
    });

    // Envoi de la réponse avec les données récupérées
    res.json({ absences, blocs, communiquer, cours, enseignants, enseignant_module, etudiants, evaluations, formations, formation_utilisateur, groupes, groupe_etudiant, messages, modules, module_bloc_competence, notes, utilisateurs });
  } catch (error) {
    console.error(error);  // Log de l'erreur pour déboguer
    // Retour de l'erreur en cas de problème
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

module.exports = router;
