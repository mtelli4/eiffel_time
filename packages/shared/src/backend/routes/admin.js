const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Route pour récupérer la liste des utilisateurs
router.get('/users', async (req, res) => {
  try {
    const formation = { select: { formation: { select: { id_formation: true, libelle: true, }, }, }, };
    const enseignant = { select: { vacataire: true, }, };
    const etudiant = { select: { groupe_etudiant: { select: { groupe: { select: { id_grp: true, libelle: true, } } } } }, };

    const users = await prisma.utilisateur.findMany({
      select: {
        id_utilisateur: true,
        nom: true,
        prenom: true,
        email: true,
        statut: true,
        formation_utilisateur: formation,
        etudiant: etudiant,
        enseignant: enseignant,
      },
      // On exclut les utilisateurs supprimés
      where: { OR: [{ mdp: { not: 'motdepasse' } }, { mdp: null }] },
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
          createdat: new Date(),
          updatedat: new Date(),
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
      await Promise.all([...createUserFormations]);

      if (data.statut === 'teacher') {
        await tx.enseignant.create({
          data: {
            id_utilisateur: user.id_utilisateur,
            vacataire: data.vacataire,
          },
        });
      }

      if (data.statut === 'student') {
        await tx.etudiant.create({
          data: {
            id_utilisateur: user.id_utilisateur,
            delegue: false,
            tierstemps: false,
          },
        });
        const createStudentGroups = data.groupes.map((groupe) =>
          tx.groupe_etudiant.create({
            data: {
              id_utilisateur: user.id_utilisateur,
              id_grp: groupe.id_grp,
            },
          })
        );
        await Promise.all([...createStudentGroups]);
      }

      return { ...user, formations: data.formations, groupes: data.groupes, vacataire: data.vacataire };
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
  const userId = parseInt(id);

  try {
    const updateUser = await prisma.$transaction(async (tx) => {
      const user = await tx.utilisateur.update({
        where: { id_utilisateur: userId },
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
        where: { id_utilisateur: userId },
      });

      // Ajout des nouvelles formations liées à l'utilisateur
      const updateUserFormations = data.formations.map((formation) =>
        tx.formation_utilisateur.create({
          data: {
            id_utilisateur: userId,
            id_formation: formation.id_formation,
          },
        })
      );

      // Suppression de tous les groupes liés à l'utilisateur
      await tx.groupe_etudiant.deleteMany({
        where: { id_utilisateur: userId },
      });

      // Ajout des nouveaux groupes liés à l'utilisateur
      const updateUserGroupes = data.groupes.map((groupe) =>
        tx.groupe_etudiant.create({
          data: {
            id_utilisateur: userId,
            id_grp: groupe.id_grp,
          },
        })
      );
      await Promise.all([...updateUserFormations, ...updateUserGroupes]);

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

      return { ...user, formations: data.formations, groupes: data.groupes, vacataire: data.vacataire };
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
        data: { mdp: 'motdepasse', }, // On met un mot de passe bidon pour signifier que l'utilisateur est supprimé
        where: { id_utilisateur: parseInt(id) },
      });

      return user;
    });

    res.json(deleteUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erreur lors de la suppression de l'utilisateur ${id} ; ${error}.` });
  }
});

// Route pour importer/créer des utilisateurs
router.post('/import-users/', async (req, res) => {
  const data = req.body;

  try {
    const importUsers = await prisma.$transaction(async (tx) => {
      const lastUser = await tx.utilisateur.aggregate({
        _max: {
          id_utilisateur: true,
        },
      });

      let lastId = lastUser._max.id_utilisateur;
      const createUsers = data.map((user) => {
        lastId++;
        const users = tx.utilisateur.create({
          data: {
            id_utilisateur: lastId,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            statut: user.statut,
            createdat: new Date(),
            updatedat: new Date(),
          },
        });
        if (user.statut === 'teacher') {
          tx.enseignant.create({
            data: {
              id_utilisateur: lastId,
              vacataire: null,
            },
          });
        } else if (user.statut === 'student') {
          tx.etudiant.create({
            data: {
              id_utilisateur: lastId,
              delegue: false,
              tierstemps: false,
            },
          });
        }
        return users;
      });
      await Promise.all([...createUsers]);
    });
    res.json(importUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erreur lors de l'import des utilisateurs ; ${error}.` });
  }
});

module.exports = router;
