const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // 🔹 Récupération des notes avec les coefficients des évaluations
    const notes = await prisma.notes.findMany({
      select: {
        id_utilisateur: true,
        note: true,
        evaluation: {
          select: {
            id_module: true,
            coefficient: true,
          },
        },
      },
    });

    // 🔹 Récupération des coefficients des modules
    const moduleCoefficients = await prisma.module_bloc_competence.findMany({
      select: {
        id_module: true,
        coefficient: true,
      },
    });

    // 🔹 Récupération des heures d'absence des étudiants
    const absences = await prisma.absence.groupBy({
      by: ['id_utilisateur'],
      _sum: {
        retard: true,
      },
    });

    // 🔹 Récupération de tous les modules
    const modules = await prisma.module.findMany({
      select: {
        id_module: true,
        libelle: true,
      },
    });

    // 🔹 Stocker les coefficients des modules
    const moduleCoeffMap = {};
    moduleCoefficients.forEach(({ id_module, coefficient }) => {
      moduleCoeffMap[id_module] = coefficient || 1; // Si pas de coefficient, mettre 1 par défaut
    });

    // 🔹 Stocker les absences par étudiant
    const studentAbsences = {};
    absences.forEach(({ id_utilisateur, _sum }) => {
      studentAbsences[id_utilisateur] = _sum.retard || 0;
    });

    // 🔹 Regrouper les notes par étudiant et module en tenant compte des coefficients
    const studentAverages = {};

    notes.forEach(({ id_utilisateur, note, evaluation }) => {
      const { id_module, coefficient } = evaluation;

      if (!studentAverages[id_utilisateur]) {
        studentAverages[id_utilisateur] = {};
      }

      if (!studentAverages[id_utilisateur][id_module]) {
        studentAverages[id_utilisateur][id_module] = {
          total: 0,
          coefTotal: 0,
          moduleCoeff: moduleCoeffMap[id_module] || 1, // Coefficient du module
        };
      }

      // Calculer la somme pondérée des notes par rapport aux évaluations
      studentAverages[id_utilisateur][id_module].total += parseFloat(note) * coefficient;
      studentAverages[id_utilisateur][id_module].coefTotal += coefficient;
    });

    // 🔹 Récupération des étudiants
    const students = await prisma.utilisateur.findMany({
      where: {
        etudiant: { isNot: null },
      },
      select: {
        id_utilisateur: true,
        nom: true,
        prenom: true,
      },
    });

    // 🔹 Calcul final des moyennes en tenant compte des coefficients des modules
    const formattedStudents = students.map((student) => {
      const studentId = student.id_utilisateur;
      let totalGeneral = 0;
      let totalCoeffModules = 0;

      const moyennes = Object.entries(studentAverages[studentId] || {}).map(([id_module, data]) => {
        // Calcul de la moyenne pondérée par module
        const moyenneModule = data.coefTotal ? data.total / data.coefTotal : 0;
        const moduleCoeff = data.moduleCoeff;

        // Ajout au calcul de la moyenne générale
        totalGeneral += moyenneModule * moduleCoeff;
        totalCoeffModules += moduleCoeff;

        return {
          id_module: parseInt(id_module),
          moyenne: moyenneModule.toFixed(2),
        };
      });

      // Calcul de la moyenne générale en tenant compte des coefficients des modules
      const moyenneGenerale = totalCoeffModules > 0 ? (totalGeneral / totalCoeffModules).toFixed(2) : '-';

      // 🔹 Récupérer les heures d'absence et appliquer le malus
      const absencesHeures = studentAbsences[studentId] || 0;
      let malus = 0;
      if (absencesHeures > 30) malus = 0.1;
      else if (absencesHeures > 20) malus = 0.05;
      else if (absencesHeures > 10) malus = 0.025;
      else if (absencesHeures > 0) malus = 0.0;

      // 🔹 Appliquer le malus à la moyenne générale
      const moyenneAvecMalus = moyenneGenerale !== '-' ? (moyenneGenerale - malus).toFixed(2) : '-';

      return {
        id_utilisateur: studentId,
        nom: student.nom,
        prenom: student.prenom,
        moyennes,
        absences: absencesHeures,
        moyenneGenerale,
        moyenneAvecMalus,
      };
    });

    res.json({ students: formattedStudents, modules });
  } catch (error) {
    console.error('Erreur lors de la récupération des moyennes:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;
