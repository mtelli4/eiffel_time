const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { semestre, groupe } = req.query;

    // 🔹 Récupération des étudiants avec leur groupe
    const students = await prisma.utilisateur.findMany({
      where: {
        etudiant: { isNot: null },
        etudiant: {
          groupe_etudiant: groupe !== "all" ? { some: { id_grp: Number(groupe) } } : undefined
        }
      },
      select: {
        id_utilisateur: true,
        nom: true,
        prenom: true,
        etudiant: {
          select: {
            groupe_etudiant: {
              select: {
                groupe: {
                  select: {
                    id_grp: true,
                    libelle: true
                  }
                }
              }
            }
          }
        }
      }
    });
    
    // 🔹 Récupération des notes avec les coefficients des évaluations
    const notes = await prisma.notes.findMany({
      where: {
        evaluation: {
          module: {
            module_bloc_competence: {
              some: {
                periode: "Semestre_1"  // ✅ Correction ici
              }
            }
          }
        }
      },
      select: {
        id_utilisateur: true,
        note: true,
        evaluation: {
          select: {
            id_module: true,
            coefficient: true
          }
        }
      }
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
      _sum: { retard: true },
    });

    // 🔹 Récupération des modules selon le semestre sélectionné
const modules = await prisma.module.findMany({
  where: {
    module_bloc_competence: {
      some: {
        periode: "Semestre_1"  // ✅ Correction ici
      }
    }
  },
  select: {
    id_module: true,
    libelle: true
  }
});
// 🔹 Récupération des blocs de compétences avec leurs modules
const blocsCompetences = await prisma.bloc_competence.findMany({
  select: {
    id_bloc_comp: true,
    libelle: true,
    module_bloc_competence: {
      select: {
        module: {
          select: {
            id_module: true,
            libelle: true,
          },
        },
      },
    },
  },
});

// 🔹 Organisation des modules sous leurs blocs de compétences
const formattedBlocs = blocsCompetences.map((bloc) => ({
  id_bloc_comp: bloc.id_bloc_comp,
  libelle: bloc.libelle,
  modules: bloc.module_bloc_competence.map((m) => ({
    id_module: m.module.id_module,
    libelle: m.module.libelle,
  })),
}));

// 🔹 Création d'une liste à plat des modules (pour compatibilité avec le frontend)
const flatModules = formattedBlocs.flatMap(bloc => bloc.modules);




    // 🔹 Stocker les coefficients des modules
    const moduleCoeffMap = {};
    moduleCoefficients.forEach(({ id_module, coefficient }) => {
      moduleCoeffMap[id_module] = coefficient || 1;
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

      if (!studentAverages[id_utilisateur]) studentAverages[id_utilisateur] = {};
      if (!studentAverages[id_utilisateur][id_module]) {
        studentAverages[id_utilisateur][id_module] = { total: 0, coefTotal: 0, moduleCoeff: moduleCoeffMap[id_module] || 1 };
      }

      studentAverages[id_utilisateur][id_module].total += parseFloat(note) * coefficient;
      studentAverages[id_utilisateur][id_module].coefTotal += coefficient;
    });

    // 🔹 Calcul final des moyennes en tenant compte des coefficients des modules
    const formattedStudents = students.map((student) => {
      const studentId = student.id_utilisateur;
    
      // Vérifier si l'étudiant a un groupe
      const groupe = student.etudiant && student.etudiant.groupe_etudiant.length > 0
        ? student.etudiant.groupe_etudiant[0].groupe.libelle
        : "Aucun Groupe";
    
      let totalGeneral = 0;
      let totalCoeffModules = 0;
    
      const moyennes = Object.entries(studentAverages[studentId] || {}).map(([id_module, data]) => {
        const moyenneModule = data.coefTotal ? data.total / data.coefTotal : 0;
        const moduleCoeff = data.moduleCoeff;
    
        totalGeneral += moyenneModule * moduleCoeff;
        totalCoeffModules += moduleCoeff;
    
        return {
          id_module: parseInt(id_module),
          moyenne: moyenneModule.toFixed(2),
        };
      });
    
      const moyenneGenerale = totalCoeffModules > 0 ? (totalGeneral / totalCoeffModules).toFixed(2) : '-';
    
      // 🔹 Gestion des absences et malus
      const absencesHeures = studentAbsences[studentId] || 0;
      let malus = 0;
      if (absencesHeures > 30) malus = 0.1;
      else if (absencesHeures > 20) malus = 0.05;
      else if (absencesHeures > 10) malus = 0.025;
      else if (absencesHeures > 0) malus = 0.0;
    
      const moyenneAvecMalus = moyenneGenerale !== '-' ? (moyenneGenerale - malus).toFixed(2) : '-';
    
      return {
        id_utilisateur: studentId,
        nom: student.nom,
        prenom: student.prenom,
        groupe,  // ✅ Ajout du groupe avec gestion du cas null
        moyennes,
        absences: absencesHeures,
        moyenneGenerale,
        moyenneAvecMalus,
      };
    });
    

    // 🔹 Récupération des groupes et semestres
// 🔹 Récupération des groupes et semestres
const groupes = await prisma.groupe.findMany({
  select: { id_grp: true, libelle: true }
});

const semestres = await prisma.module_bloc_competence.findMany({
  distinct: ['periode'],
  select: { periode: true }
});

res.json({ students: formattedStudents, blocsCompetences: formattedBlocs, groupes, semestres });
  } catch (error) {
    console.error('Erreur lors de la récupération des moyennes:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;
