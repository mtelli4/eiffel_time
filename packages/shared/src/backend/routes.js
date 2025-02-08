const express = require('express');
const { PrismaClient, periode } = require('@prisma/client');  // Import du client Prisma
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
  const formData = req.body; // Les données du formulaire envoyées par le frontend

  try {
    const result = await prisma.$transaction(async (tx) => {
      const lastEvaluation = await tx.evaluation.lastEvaluation(); // Récupère la dernière évaluation

      return tx.evaluation.create({
        data: {
          id_eval: lastEvaluation.id_eval + 1, // Incrémente l'id de l'évaluation
          libelle: formData.libelle,
          coefficient: parseFloat(formData.coefficient), // Convertir en float si nécessaire
          notemaximale: parseFloat(formData.notemaximale), // Convertir en float si nécessaire
          periode: periode[formData.periode], // Convertir en enum
          createdat: new Date(),
          id_cours: parseInt(formData.id_cours, 10), // Convertir en entier
          id_notif: 3, // Exemple : une notification par défaut
          id_module: parseInt(formData.id_module, 10), // Convertir en entier
        },
      }) // Retourne l'évaluation créée
    });

    res.status(201).json(result); // Réponse JSON avec un statut HTTP 201 (Created)
  } catch (error) {
    console.error("Erreur lors de la création de l'évaluation :", error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création de l'évaluation.",
      details: error.message,
    });
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
      where: { premiereconnexion: { not: null }, }, // On exclut les utilisateurs supprimés
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

// Route pour créer un nouvel utilisateur
router.post('/create-user', async (req, res) => {
  const data = req.body;
  const now = new Date();

  try {
    const createUser = await prisma.$transaction(async (tx) => {
      const lastUser = await tx.utilisateur.aggregate({
        _max: {
          id_utilisateur: true,
        },
      });

      const user = await tx.utilisateur.create({
        data: {
          id_utilisateur: lastUser._max.id_utilisateur + 1,
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          statut: data.statut,
          createdat: now,
          updatedat: now,
        },
      });

      const createUserFormations = data.formations.map((formation) =>
        tx.formation_utilisateur.create({
          data: {
            id_utilisateur: user.id_utilisateur,
            id_formation: formation.id_formation,
          },
        })
      );
      await Promise.all(createUserFormations);

      const createUserGroupes = data.groupes.map((groupe) =>
        tx.groupe_etudiant.create({
          data: {
            id_utilisateur: user.id_utilisateur,
            id_grp: groupe.value,
          },
        })
      );
      await Promise.all(createUserGroupes);

      return user;
    });

    res.json(createUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erreur lors de la création de l'utilisateur ; ${error}.` });
  }
});

// Route pour mettre à jour un utilisateur
router.put('/update-user/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

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

      // Suppression de toutes les formations liées à l'utilisateur
      await tx.formation_utilisateur.deleteMany({
        where: { id_utilisateur: parseInt(id) },
      });

      // Ajout des nouvelles formations liées à l'utilisateur
      const updateUserFormations = data.formations.map((formation) => 
        tx.formation_utilisateur.create({
          data: {
            id_utilisateur: parseInt(id),
            id_formation: formation.id_formation,
          },
        })
      );

      // Suppression de tous les groupes liés à l'utilisateur
      await tx.groupe_etudiant.deleteMany({
        where: { id_utilisateur: parseInt(id) },
      });

      // Ajout des nouveaux groupes liés à l'utilisateur
      const updateUserGroupes = data.groupes.map((groupe) =>
        tx.groupe_etudiant.create({
          data: {
            id_utilisateur: parseInt(id),
            id_grp: groupe.value,
          },
        })
      );
      await Promise.all(updateUserFormations, updateUserGroupes);

      // Mise à jour des données de l'enseignant
      const isEnseignant = await tx.enseignant.findUnique({
        where: { id_utilisateur: parseInt(id) },
      });

      // Si l'enseignant n'existe pas, on le crée
      if (!isEnseignant) {
        await tx.enseignant.create({
          data: {
            id_utilisateur: parseInt(id),
            vacataire: data.vacataire,
          },
        });
      } else {
        await tx.enseignant.update({
          where: { id_utilisateur: parseInt(id) },
          data: {
            vacataire: data.vacataire,
          },
        });
      }

      return { ...user, formations: data.formations, groupes: data.groupes };
    });

    res.json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erreur lors de la mise à jour de l'utilisateur ${id} ; ${error}.` });
  }
});

// Route pour supprimer un utilisateur
router.delete('/delete-user/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const deleteUser = await prisma.$transaction(async (tx) => {
      // On met à jour la table utilisateur pour considérer l'utilisateur comme supprimé
      const user = await tx.utilisateur.update({
        data: { premiereconnexion: null, }, // On met à null pour considérer l'utilisateur comme supprimé
        where: { id_utilisateur: parseInt(id) },
      });

      return user;
    });

    res.json(deleteUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erreur lors de la suppression de l'utilisateur ${id} ; ${error}.` });
  }
})

// Route pour récupérer la liste des formations
router.get('/formations', async (req, res) => {
  try {
    const formations = await prisma.formation.findMany({
      select: {
        id_formation: true,
        libelle: true,
      },
      orderBy: {
        id_formation: 'asc',  // Tri par id de formation
      },
    });

    res.json(formations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des formations.' });
  }
});

// Route pour récupérer la liste des groupes
router.get('/groupes', async (req, res) => {
  try {
    const groupes = await prisma.groupe.findMany({
      select: {
        id_grp: true,
        libelle: true,
      },
      orderBy: {
        id_grp: 'asc',  // Tri par id de groupe
      },
    });

    res.json(groupes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des groupes.' });
  }
});

module.exports = router;  // Exporte le routeur pour l'utiliser dans d'autres fichiers
