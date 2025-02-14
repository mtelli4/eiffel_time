const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Fonction pour récupérer le nombre d'heures effectuées pour chaque module, différenciées par type de cours
async function getHoursPerModule() {
  const modules = await prisma.module.findMany({
    include: {
      cours: {
        where: {
          appel: true,
        },
        select: {
          debut: true,
          fin: true,
          type: true,
        },
      },
    },
  });

  const hoursPerModule = modules.reduce((acc, module) => {
    const totalHours = module.cours.reduce((total, cours) => {
      const start = new Date(cours.debut);
      const end = new Date(cours.fin);
      const hours = (end - start) / (1000 * 60 * 60); // Convertir la différence en heures

      if (!total[cours.type]) {
        total[cours.type] = 0;
      }
      total[cours.type] += hours;
      return total;
    }, { CM: 0, TD: 0, TP: 0 }); // Initialiser les types de cours à 0

    acc[module.id_module] = totalHours;
    return acc;
  }, {});

  return hoursPerModule;
}

// Route pour récupérer l'ensemble des présences des enseignants pour chaque module
router.get('/', async (req, res) => {
  try {
    const teacherAttendances = await prisma.enseignant.findMany({
      select: {
        utilisateur: {
          select: {
            id_utilisateur: true,
            nom: true,
            prenom: true
          }
        },
        enseignant_module: {
          select: {
            module: {
              select: {
                id_module: true,
                libelle: true,
                codeapogee: true,
                heures: true
              }
            },
            heures: true
          }
        }
      },
      orderBy: {
        utilisateur: {
          nom: 'asc'
        }
      }
    });

    // Handle null heures and sort by prenom and module libelle
    teacherAttendances.forEach((teacher) => {
      teacher.enseignant_module.forEach((module) => {
        if (module.heures === null) {
          module.heures = '0,0,0';
        }
      });
    });

    // Sort by prenom and module libelle in JavaScript
    teacherAttendances.sort((a, b) => {
      if (a.utilisateur.prenom < b.utilisateur.prenom) return -1;
      if (a.utilisateur.prenom > b.utilisateur.prenom) return 1;
      return 0;
    });

    teacherAttendances.forEach((teacher) => {
      teacher.enseignant_module.sort((a, b) => {
        if (a.module.libelle < b.module.libelle) return -1;
        if (a.module.libelle > b.module.libelle) return 1;
        return 0;
      });
    });

    res.json(teacherAttendances);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour ajouter/mettre à jour les présences des enseignants pour chaque module
router.put('/update', async (req, res) => {
  const { id_utilisateur, id_module, type, presences } = req.body;


  try {
    const updatedAttendance = await prisma.$transaction(async (tx) => {
      const teacherModule = await tx.enseignant_module.findFirst({
        where: {
          id_utilisateur: id_utilisateur,
          id_module: id_module,
        },
      });

      if (teacherModule.heures === null) {
        teacherModule.heures = '0,0,0';
      }

      let heures = teacherModule.heures.split(',');
      heures[type] += parseInt(presences);
      teacherModule.heures = heures.join(',')

      return tx.enseignant_module.update({
        where: {
          id_module_id_utilisateur: {
            id_module: id_module,
            id_utilisateur: id_utilisateur,
          },
        },
        data: {
          heures: teacherModule.heures,
        },
      });
    });

    const heures = updatedAttendance.heures.split(',');
    res.json({
      id_utilisateur,
      id_module,
      heures: {
        CM: parseInt(heures[0]),
        TD: parseInt(heures[1]),
        TP: parseInt(heures[2]),
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;