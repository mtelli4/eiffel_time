const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const notesParBloc = await prisma.bloc_competence.findMany({
      select: {
        id_bloc_comp: true,
        libelle: true,
        
      },
      orderBy: {
        id_bloc_comp: 'asc'
      },
    });

    res.json(notesParBloc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
