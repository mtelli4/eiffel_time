const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/qrcode/:id", async (req, res) => {
  const { id } = req.params;
  const coursId = parseInt(id);
  try {
    const qrcode = await prisma.cours.findUnique({
      select: {
        groupe: {
          select: {
            groupe_etudiant: {
              select: {
                id_utilisateur: true
              }
            }
          }
        }
      },
      where: {
        id_cours: coursId,
      },
    });
    res.json(qrcode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router