const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  try {
    const notesParBloc = await prisma.bloc_competence.findMany({
      select: {
        id_bloc_comp: true,
        libelle: true,
        module_bloc_competence: {
          select: {
            periode: true,
            module: {
              select: {
                id_module: true,
                codeapogee: true,
                libelle: true,
                heures: true,
                evaluation: {
                  select: {
                    id_eval: true,
                    libelle: true, // Ajouter le libelle de l'évaluation
                    cours: {
                      select: {
                        debut: true, // Utilisé comme date de l'évaluation
                      },
                    },
                    notemaximale: true,
                    coefficient: true,
                    notes: {
                      where: {
                        etudiant: {
                          id_utilisateur: userId,
                        },
                      },
                      select: {
                        note: true,
                        commentaire: true,
                      },
                    },
                  },
                  where: {
                    notes: {
                      some: {
                        etudiant: {
                          id_utilisateur: userId,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        id_bloc_comp: "asc",
      },
      where: {
        module_bloc_competence: {
          some: {
            module: {
              evaluation: {
                some: {
                  notes: {
                    some: {
                      etudiant: {
                        id_utilisateur: userId,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });    

    if (notesParBloc.length === 0) {
      return res.status(404).json({ message: "Aucune note trouvée pour cet étudiant." });
    }

    res.json(notesParBloc);
  } catch (error) {
    console.error("Erreur lors de la récupération des notes :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
