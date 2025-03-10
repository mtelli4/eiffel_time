const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const router = express.Router()

router.post('/qrcode', async (req, res) => {
  const { courseId } = req.body;
  try {
    const createPresence = await prisma.$transaction(async (tx) => {
      const cours = await prisma.cours.findUnique({
        select: {
          groupe: {
            select: {
              groupe_etudiant: {
                select: {
                  id_utilisateur: true,
                },
              },
            },
          },
        },
        where: {
          id_cours: courseId,
        },
      })

      const etudiantsIds = cours.groupe.groupe_etudiant.map(ge => ge.id_utilisateur);
      const presencesData = etudiantsIds.map(id_utilisateur => ({
        id_utilisateur,
        id_cours: courseId,
      }));

      await tx.qrcode.createMany({
        data: presencesData,
        skipDuplicates: true // Optionnel pour éviter les doublons
      });

      return {
        id_cours: courseId,
        etudiants: etudiantsIds.map(id => id.toString())
      };
    })
    res.json(createPresence)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/qrcodedelete/', async (req, res) => {
  const { courseId } = req.body;
  try {
    const deletePresence = await prisma.qrcode.deleteMany({
      where: {
        id_cours: courseId,
      },
    })
    res.json(deletePresence)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}); 

module.exports = router
