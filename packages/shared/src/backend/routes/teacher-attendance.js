const express = require('express');
const { PrismaClient, periode } = require('@prisma/client');
const { ObjectEnumValue } = require('@prisma/client/runtime/library');

const prisma = new PrismaClient();
const router = express.Router();

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
                heures: true,
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

    const periodeLabels = {
      Semestre_1: "Semestre 1",
      Semestre_2: "Semestre 2",
      Semestre_3: "Semestre 3",
      Semestre_4: "Semestre 4",
      Semestre_5: "Semestre 5",
      Semestre_6: "Semestre 6",
    }

    // Récupérer les périodes de chaque module (module_bloc_competence)
    const periodePerModule = await prisma.module_bloc_competence.findMany({
      select: {
        id_module: true,
        periode: true
      }
    });
    
    // Formater periodePerModule pour avoir un objet avec id_module comme clé et periode[] sans doublons comme valeur
    const periodePerModuleFormatted = {};
    periodePerModule.forEach((module) => {
      if (!periodePerModuleFormatted[module.id_module]) {
        periodePerModuleFormatted[module.id_module] = new Set();
      }
      periodePerModuleFormatted[module.id_module].add(periodeLabels[module.periode]);
    });

    // Convertir les Sets en tableaux
    Object.keys(periodePerModuleFormatted).forEach((id_module) => {
      periodePerModuleFormatted[id_module] = Array.from(periodePerModuleFormatted[id_module]);
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

    res.json({ teacherAttendances, periodePerModuleFormatted });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour ajouter/mettre à jour les présences des enseignants pour chaque module
router.put('/update', async (req, res) => {
  const { id_utilisateur, id_module, type, presences } = req.body;

  console.log(req.body);
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
      if (type === 'CM') {
        heures[0] = presences;
      } else if (type === 'TD') {
        heures[1] = presences;
      } else if (type === 'TP') {
        heures[2] = presences;
      } else {
        throw new Error('Invalid type');
      }
      heures = heures.join(',');

      return tx.enseignant_module.update({
        data: {
          heures: heures,
        },
        where: {
          id_module_id_utilisateur: {
            id_module: id_module,
            id_utilisateur: id_utilisateur,
          },
        },
      });
    });
    console.log(updatedAttendance);

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