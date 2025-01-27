const express = require('express');
const { PrismaClient } = require('@prisma/client');  // Import du client Prisma
const prisma = new PrismaClient();  // Initialisation du client Prisma
const router = express.Router();    // Initialisation du routeur Express

router.post('/login', async (req, res) => {
  try {
    const user = await prisma.utilisateur.findUnique({
      where: {
        email: req.body.email,
      }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

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

// Route pour insérer une nouvelle évaluation
router.post('/insert-evaluation', async (req, res) => {
  try {
    const formData = req.body; // Les données du formulaire envoyées par le frontend
    const result = await prisma.$transaction(async (prisma) => {
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
    res.status(201).json(result); // Réponse JSON contenant l'évaluation créée
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'évaluation.', details: error });
  }
});

// Route pour récupérer la liste des utilisateurs
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.utilisateur.findMany({
      select: {
        id_utilisateur: true,
        nom: true,
        prenom: true,
        email: true,
        statut: true,
        formation_utilisateur: {
          select: {
            formation: {
              select: {
                id_formation: true,
                libelle: true,
              },
            },
          },
        },
        etudiant: {
          select: {
            groupe_etudiant: {
              select: {
                groupe: {
                  select: {
                    id_grp: true,
                    libelle: true,
                  }
                }
              }
            }
          }
        },
        enseignant: {
          select: {
            vacataire: true,
          }
        },
      },
      orderBy: {
        id_utilisateur: 'asc',  // Tri par id d'utilisateur
      },
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
});

// Route pour mettre à jour un utilisateur
router.put('/update-user/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const now = new Date();

  try {
    const updateUser = await prisma.$transaction(async (tx) => {
      const user = await tx.utilisateur.update({
        where: { id_utilisateur: parseInt(id) },
        data: {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          statut: data.statut,
          updatedat: new Date(),
        },
      });

      // TODO: Ajouter les formations, groupes, etc. à mettre à jour

      return user;
    });

    res.json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erreur lors de la mise à jour de l'utilisateur ${id} ; ${error}.` });
  }
});

module.exports = router;  // Exporte le routeur pour l'utiliser dans d'autres fichiers
