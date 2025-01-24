const express = require('express');
const { PrismaClient } = require('@prisma/client');  // Import du client Prisma
const prisma = new PrismaClient();  // Initialisation du client Prisma
const router = express.Router();    // Initialisation du routeur Express

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

router.get('/users', async (req, res) => {
  try {
    const users = await prisma.utilisateur.findMany({
      orderBy: {
        id_utilisateur: 'asc',  // Tri par id d'utilisateur
      }
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
});

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

// Route pour récupérer la liste des modules avec leurs évaluations avec les notes des étudiants
router.get('/modules', async (req, res) => {
  try {
    // Récupération de tous les modules avec leurs évaluations et notes associées
    const modules = await prisma.module.findMany({
      include: {
        cours: {
          include: {
            evaluation: {
              include: {
                notes: {
                  include: {
                    etudiant: {
                      include: {
                        utilisateur: true,  // Inclure les informations de l'utilisateur
                      }
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        id_module: 'asc',  // Tri par id de module
      }
    });

    // Conversion des modules, évaluations et notes en objets Module, Evaluation et Note
    const modulesList = modules.map(module => {
      const cours = (module.cours || []).map(cours => {
        const evaluations = (cours.evaluation || []).map(evaluation => {
          const notes = (evaluation.notes || []).map(note => ({
            id_utilisateur: note.id_utilisateur,
            id_eval: note.id_eval,
            note: note.note,
            commentaire: note.commentaire,
            createdat: note.createdat,
            updatedat: note.updatedat,
            etudiant: {
              numeroetudiant: note.etudiant.numeroetudiant,
              tierstemps: note.etudiant.tierstemps,
              delegue: note.etudiant.delegue,
              utilisateur: {
                id_utilisateur: note.etudiant.utilisateur.id_utilisateur,
                nom: note.etudiant.utilisateur.nom,
                prenom: note.etudiant.utilisateur.prenom,
                email: note.etudiant.utilisateur.email,
                statut: note.etudiant.utilisateur.statut,
              },
            },
          }));

          return {
            id_eval: evaluation.id_eval,
            libelle: evaluation.libelle,
            coefficient: evaluation.coefficient,
            notemaximale: evaluation.notemaximale,
            periode: evaluation.periode,
            createdat: evaluation.createdat,
            updatedat: evaluation.updatedat,
            id_cours: evaluation.id_cours,
            notes: notes,
          };
        });

        return {
          id_cours: cours.id_cours,
          type: cours.type,
          libelle: cours.libelle,
          debut: cours.debut,
          fin: cours.fin,
          salle: cours.salle,
          createdat: cours.createdat,
          updatedat: cours.updatedat,
          appel: cours.appel,
          evaluations: evaluations,
        };
      });

      return {
        id_module: module.id_module,
        libelle: module.libelle,
        codeapogee: module.codeapogee,
        heures: module.heures,
        cours: cours,
      };
    });

    res.json(modulesList);

  } catch (error) {
    console.error(error);  // Log de l'erreur pour déboguer
    // Retour de l'erreur en cas de problème
    res.status(500).json({ error: 'Erreur lors de la récupération des notes.' });
  }
});

// Route pour récupérer la liste des absences des étudiants
router.get('/absences', async (req, res) => {
  try {
    // Récupération de toutes les absences des étudiants
    const absences = await prisma.absence.findMany({
      include: {
        etudiant: {
          include: {
            utilisateur: true,  // Inclure les informations de l'utilisateur
          }
        },
        cours: {
          include: {
            module: true,  // Inclure les informations du module
            evaluation: true,  // Inclure les informations de l'évaluation
          }
        }
      },
      where: {
        id_utilisateur: 3,  // Filtre par id d'utilisateur (3 = étudiant)
      },
      orderBy: {
        id_absence: 'asc',  // Tri par id d'absence
      }
    });

    const absencesList = absences.map(a => ({
      id_absence: a.id_absence,
      justificatif: a.justificatif,
      message: a.message,
      valide: a.valide,
      retard: a.retard,
      envoye: a.envoye,
      createdat: a.createdat,
      updatedat: a.updatedat,
      etudiant: {
        numeroetudiant: a.etudiant.numeroetudiant,
        tierstemps: a.etudiant.tierstemps,
        delegue: a.etudiant.delegue,
        utilisateur: {
          id_utilisateur: a.etudiant.id_utilisateur,
          nom: a.etudiant.utilisateur.nom,
          prenom: a.etudiant.utilisateur.prenom,
          email: a.etudiant.utilisateur.email,
          statut: a.etudiant.utilisateur.statut
        }
      },
      cours: {
        id_cours: a.cours.id_cours,
        type: a.cours.type,
        libelle: a.cours.libelle,
        debut: a.cours.debut,
        fin: a.cours.fin,
        salle: a.cours.salle,
        createdat: a.cours.createdat,
        updatedat: a.cours.updatedat,
        appel: a.cours.appel,
        evaluations: a.evaluations,
        module: {
          id_module: a.cours.module.id_module,
          libelle: a.cours.module.libelle,
          codeapogee: a.cours.module.codeapogee,
          heures: a.cours.module.heures
        }
      }
    }))

    res.json(absences);

  } catch (error) {
    console.error(error);  // Log de l'erreur pour déboguer
    // Retour de l'erreur en cas de problème
    res.status(500).json({ error: 'Erreur lors de la récupération des absences. ' + error });
  }
});

async function insertEvaluationAndGrades(formData) {
  return prisma.$transaction(async (prisma) => {
    const evaluation = await prisma.evaluation.create({
      data: {
        id_eval: 100,
        libelle: formData.libelle,
        coefficient: formData.coefficient,
        notemaximale: formData.notemaximale,
        periode: formData.periode,
        createdat: new Date(),
        id_cours: formData.id_cours,
        id_notif: 3, // Par exemple, une notification par défaut
        id_module: formData.id_module,
      },
    });

    return evaluation; // Retourne l'évaluation créée
  });
}

router.post('/insert-evaluation', async (req, res) => {
  try {
    const formData = req.body; // Les données du formulaire envoyées par le frontend
    const result = await insertEvaluationAndGrades(formData);
    res.status(201).json(result); // Réponse JSON contenant l'évaluation créée
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'évaluation.', details: error });
  }
});

module.exports = router;  // Exporte le routeur pour l'utiliser dans d'autres fichiers
