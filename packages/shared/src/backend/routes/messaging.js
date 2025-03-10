const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Récupérer les messages d'un utilisateur
router.get('/messages/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { emetteur: userId },
          { recepteur: userId }
        ],
      },
      orderBy: {
        createdat: 'asc',
      },
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des messages.' });
  }
});

// Récupérer les conversations d'un utilisateur
router.get('/conversations/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const conversations = await prisma.message.groupBy({
      by: ['emetteur', 'recepteur'],
      where: {
        OR: [
          { emetteur: userId },
          { recepteur: userId }
        ]
      },
      _max: {
        createdat: true
      }
    });

    const conversationDetails = await Promise.all(conversations.map(async (conv) => {
      const lastMessage = await prisma.message.findFirst({
        where: {
          OR: [
            { emetteur: conv.emetteur, recepteur: conv.recepteur },
            { emetteur: conv.recepteur, recepteur: conv.emetteur }
          ]
        },
        orderBy: {
          createdat: 'desc'
        }
      });

      const utilisateur = await prisma.utilisateur.findUnique({
        where: {
          id_utilisateur: conv.emetteur === userId ? conv.recepteur : conv.emetteur
        },
        select: {
          id_utilisateur: true,
          nom: true,
          prenom: true,
          statut: true
        }
      });

      return {
        utilisateur,
        last_message: lastMessage,
        unread: 0 // À compléter avec la logique pour les messages non lus
      };
    }));

    // Pas de conversations en double
    res.json(conversationDetails.filter((conv, index, self) => index === self.findIndex((c) => c.utilisateur.id_utilisateur === conv.utilisateur.id_utilisateur)));

    // res.json(conversationDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des conversations.' });
  }
});

// Route pour récupérer les utilisateurs avec lesquels l'utilisateur n'a pas de conversation
router.get('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const utilisateurs = await prisma.$queryRaw`
    SELECT u.id_utilisateur, u.nom, u.prenom, u.statut
    FROM utilisateur u, message m
    WHERE u.id_utilisateur != ${userId} AND u.id_utilisateur != m.emetteur AND u.id_utilisateur != m.recepteur
    GROUP BY u.id_utilisateur, u.nom, u.prenom, u.statut
    ORDER BY u.nom, u.prenom;`;

    res.json(utilisateurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
});

// Route pour envoyer un message
router.post('/send', async (req, res) => {
  const { emetteur, recepteur, message, date } = req.body;

  try {
    const newMessage = await prisma.$transaction(async (tx) => {
      const newMessage = await tx.message.create({
        data: {
          emetteur,
          recepteur,
          contenu: message,
          createdat: date
        }
      });

      return newMessage;
    });

    res.json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erreur lors de l'envoi du message ; ${error}.` });
  }
});

module.exports = router;
