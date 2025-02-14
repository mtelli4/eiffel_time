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
router.get('/select', async (req, res) => {
  try {
    const teacherAttendances = await prisma.enseignant.findMany({
      include: {
        utilisateur: {
          select: {
            id_utilisateur: true,
            nom: true,
            prenom: true
          }
        },
        enseignant_module: {
          include: {
            module: {
              select: {
                id_module: true,
                libelle: true,
                codeapogee: true,
                heures: true,
              }
            }
          }
        }
      },
      omit: {
        vacataire: true,
      },
      where: {
        enseignant_module: {
          some: {}
        }
      }
    });

    const hoursPerModule = await getHoursPerModule();

    // Ajouter totalHours à chaque module
    teacherAttendances.forEach(teacher => {
      teacher.enseignant_module.forEach(enseignantModule => {
        const moduleId = enseignantModule.module.id_module;
        enseignantModule.module.totalHours = hoursPerModule[moduleId] || { CM: 0, TD: 0, TP: 0 };
      });
    });

    res.json(teacherAttendances);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour ajouter/mettre à jour les présences des enseignants pour chaque module
router.put('/update', async (req, res) => {
  const { id_utilisateur, id_module, present } = req.body;

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
      heures[0] = parseInt(heures[0]) + (present.CM);
      heures[1] = parseInt(heures[1]) + (present.TD);
      heures[2] = parseInt(heures[2]) + (present.TP);
      teacherModule.heures = heures.join(',')
    
      return tx.enseignant_module.update({
        where: {
          id_utilisateur_module: {
            id_utilisateur,
            id_module,
          },
        },
        data: {
          heures: teacherModule.heures,
        },
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
})

module.exports = router;