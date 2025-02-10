const router = require('../routes');

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