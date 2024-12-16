-- CreateEnum
CREATE TYPE "statut_utilisateur" AS ENUM ('étudiant', 'etudiant', 'enseignant', 'secrétaire', 'secretaire', 'directeur', 'gestionnaire', 'admin', 'indéfini', 'indefini');

-- CreateEnum
CREATE TYPE "type_cours" AS ENUM ('CM', 'TD', 'TP', '');

-- CreateTable
CREATE TABLE "absence" (
    "id_absence" SERIAL NOT NULL,
    "justificatif" VARCHAR(50),
    "message" VARCHAR(1000),
    "valide" BOOLEAN,
    "retard" INTEGER,
    "envoye" BOOLEAN,
    "createdat" TIMESTAMP(6),
    "updatedat" TIMESTAMP(6),
    "id_notif" INTEGER NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,
    "id_cours" INTEGER NOT NULL,

    CONSTRAINT "absence_pkey" PRIMARY KEY ("id_absence")
);

-- CreateTable
CREATE TABLE "bloc_competence" (
    "id_bloc_comp" SERIAL NOT NULL,
    "libelle" VARCHAR(50),
    "id_formation" INTEGER NOT NULL,

    CONSTRAINT "bloc_competence_pkey" PRIMARY KEY ("id_bloc_comp")
);

-- CreateTable
CREATE TABLE "communiquer" (
    "id_communiquer" SERIAL NOT NULL,
    "contenu" TEXT NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL,
    "id_cours" INTEGER NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,

    CONSTRAINT "communiquer_pkey" PRIMARY KEY ("id_communiquer")
);

-- CreateTable
CREATE TABLE "cours" (
    "id_cours" SERIAL NOT NULL,
    "type" "type_cours",
    "libelle" VARCHAR(50),
    "debut" TIMESTAMP(6),
    "fin" TIMESTAMP(6),
    "batiment" VARCHAR(50) NOT NULL,
    "salle" VARCHAR(10),
    "createdat" TIMESTAMP(6),
    "updatedat" TIMESTAMP(6),
    "appel" BOOLEAN,
    "presence" VARCHAR(10),
    "id_module" INTEGER NOT NULL,
    "id_formation" INTEGER NOT NULL,
    "id_grp" INTEGER,

    CONSTRAINT "cours_pkey" PRIMARY KEY ("id_cours")
);

-- CreateTable
CREATE TABLE "enseignant" (
    "id_utilisateur" INTEGER NOT NULL,
    "vacataire" BOOLEAN,

    CONSTRAINT "enseignant_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateTable
CREATE TABLE "enseignant_module" (
    "id_module" INTEGER NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,

    CONSTRAINT "enseignant_module_pkey" PRIMARY KEY ("id_module","id_utilisateur")
);

-- CreateTable
CREATE TABLE "etudiant" (
    "id_utilisateur" INTEGER NOT NULL,
    "numeroetudiant" VARCHAR(50),
    "tierstemps" BOOLEAN,
    "delegue" BOOLEAN,
    "id_grp" INTEGER NOT NULL,

    CONSTRAINT "etudiant_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateTable
CREATE TABLE "evaluation" (
    "id_eval" SERIAL NOT NULL,
    "libelle" VARCHAR(50),
    "coefficient" INTEGER,
    "notemaximale" DECIMAL(20,0),
    "periode" VARCHAR(50),
    "createdat" TIMESTAMP(6),
    "updatedat" TIMESTAMP(6),
    "id_cours" INTEGER NOT NULL,
    "id_notif" INTEGER NOT NULL,

    CONSTRAINT "evaluation_pkey" PRIMARY KEY ("id_eval")
);

-- CreateTable
CREATE TABLE "formation" (
    "id_formation" SERIAL NOT NULL,
    "libelle" VARCHAR(50),
    "lien" VARCHAR(255),
    "trombinoscope" VARCHAR(50),

    CONSTRAINT "formation_pkey" PRIMARY KEY ("id_formation")
);

-- CreateTable
CREATE TABLE "formation_utilisateur" (
    "id_utilisateur" INTEGER NOT NULL,
    "id_formation" INTEGER NOT NULL,

    CONSTRAINT "formation_utilisateur_pkey" PRIMARY KEY ("id_utilisateur","id_formation")
);

-- CreateTable
CREATE TABLE "groupe" (
    "id_grp" SERIAL NOT NULL,
    "libelle" VARCHAR(50),

    CONSTRAINT "groupe_pkey" PRIMARY KEY ("id_grp")
);

-- CreateTable
CREATE TABLE "groupe_formation" (
    "id_formation" INTEGER NOT NULL,
    "id_grp" INTEGER NOT NULL,

    CONSTRAINT "groupe_formation_pkey" PRIMARY KEY ("id_formation","id_grp")
);

-- CreateTable
CREATE TABLE "message" (
    "id_message" SERIAL NOT NULL,
    "contenu" TEXT,
    "createdat" TIMESTAMP(6),
    "emetteur" INTEGER NOT NULL,
    "recepteur" INTEGER NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id_message")
);

-- CreateTable
CREATE TABLE "module" (
    "id_module" SERIAL NOT NULL,
    "libelle" VARCHAR(50),
    "codeapogee" VARCHAR(50),
    "heures" VARCHAR(50),

    CONSTRAINT "module_pkey" PRIMARY KEY ("id_module")
);

-- CreateTable
CREATE TABLE "module_bloc_competence" (
    "id_module" INTEGER NOT NULL,
    "id_bloc_comp" INTEGER NOT NULL,

    CONSTRAINT "module_bloc_competence_pkey" PRIMARY KEY ("id_module","id_bloc_comp")
);

-- CreateTable
CREATE TABLE "notes" (
    "id_utilisateur" INTEGER NOT NULL,
    "id_eval" INTEGER NOT NULL,
    "note" DECIMAL(15,2),
    "commentaire" VARCHAR(255),
    "createdat" TIMESTAMP(6),
    "updatedat" TIMESTAMP(6),

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id_utilisateur","id_eval")
);

-- CreateTable
CREATE TABLE "notification" (
    "id_notif" SERIAL NOT NULL,
    "type" VARCHAR(50),
    "message" TEXT,
    "createdat" TIMESTAMP(6),
    "id_utilisateur" INTEGER NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id_notif")
);

-- CreateTable
CREATE TABLE "sequelizemeta" (
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "sequelizemeta_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "utilisateur" (
    "id_utilisateur" SERIAL NOT NULL,
    "nom" VARCHAR(255) NOT NULL,
    "prenom" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "mdp" VARCHAR(255),
    "salt" VARBIT(16),
    "premiereconnexion" BOOLEAN,
    "statut" "statut_utilisateur",
    "createdat" TIMESTAMP(6) NOT NULL,
    "updatedat" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateTable
CREATE TABLE "utilisateurs_eav" (
    "id_user_eav" SERIAL NOT NULL,
    "attribute" VARCHAR(255),
    "valueeav" VARCHAR(255),
    "createdat" TIMESTAMP(6) NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,

    CONSTRAINT "utilisateurs_eav_pkey" PRIMARY KEY ("id_user_eav")
);

-- CreateIndex
CREATE UNIQUE INDEX "etudiant_numeroetudiant_key" ON "etudiant"("numeroetudiant");

-- AddForeignKey
ALTER TABLE "absence" ADD CONSTRAINT "absence_id_cours_fkey" FOREIGN KEY ("id_cours") REFERENCES "cours"("id_cours") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "absence" ADD CONSTRAINT "absence_id_notif_fkey" FOREIGN KEY ("id_notif") REFERENCES "notification"("id_notif") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "absence" ADD CONSTRAINT "absence_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "etudiant"("id_utilisateur") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bloc_competence" ADD CONSTRAINT "bloc_competence_id_formation_fkey" FOREIGN KEY ("id_formation") REFERENCES "formation"("id_formation") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "communiquer" ADD CONSTRAINT "communiquer_id_cours_fkey" FOREIGN KEY ("id_cours") REFERENCES "cours"("id_cours") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "communiquer" ADD CONSTRAINT "communiquer_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cours" ADD CONSTRAINT "cours_id_formation_fkey" FOREIGN KEY ("id_formation") REFERENCES "formation"("id_formation") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cours" ADD CONSTRAINT "cours_id_grp_fkey" FOREIGN KEY ("id_grp") REFERENCES "groupe"("id_grp") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cours" ADD CONSTRAINT "cours_id_module_fkey" FOREIGN KEY ("id_module") REFERENCES "module"("id_module") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enseignant" ADD CONSTRAINT "enseignant_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enseignant_module" ADD CONSTRAINT "enseignant_module_id_module_fkey" FOREIGN KEY ("id_module") REFERENCES "module"("id_module") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enseignant_module" ADD CONSTRAINT "enseignant_module_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "enseignant"("id_utilisateur") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "etudiant" ADD CONSTRAINT "etudiant_id_grp_fkey" FOREIGN KEY ("id_grp") REFERENCES "groupe"("id_grp") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "etudiant" ADD CONSTRAINT "etudiant_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evaluation" ADD CONSTRAINT "evaluation_id_cours_fkey" FOREIGN KEY ("id_cours") REFERENCES "cours"("id_cours") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evaluation" ADD CONSTRAINT "evaluation_id_notif_fkey" FOREIGN KEY ("id_notif") REFERENCES "notification"("id_notif") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "formation_utilisateur" ADD CONSTRAINT "formation_utilisateur_id_formation_fkey" FOREIGN KEY ("id_formation") REFERENCES "formation"("id_formation") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "formation_utilisateur" ADD CONSTRAINT "formation_utilisateur_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groupe_formation" ADD CONSTRAINT "groupe_formation_id_formation_fkey" FOREIGN KEY ("id_formation") REFERENCES "formation"("id_formation") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groupe_formation" ADD CONSTRAINT "groupe_formation_id_grp_fkey" FOREIGN KEY ("id_grp") REFERENCES "groupe"("id_grp") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_emetteur_fkey" FOREIGN KEY ("emetteur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_recepteur_fkey" FOREIGN KEY ("recepteur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "module_bloc_competence" ADD CONSTRAINT "module_bloc_competence_id_bloc_comp_fkey" FOREIGN KEY ("id_bloc_comp") REFERENCES "bloc_competence"("id_bloc_comp") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "module_bloc_competence" ADD CONSTRAINT "module_bloc_competence_id_module_fkey" FOREIGN KEY ("id_module") REFERENCES "module"("id_module") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_id_eval_fkey" FOREIGN KEY ("id_eval") REFERENCES "evaluation"("id_eval") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "etudiant"("id_utilisateur") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "etudiant"("id_utilisateur") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "utilisateurs_eav" ADD CONSTRAINT "utilisateurs_eav_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE NO ACTION ON UPDATE NO ACTION;
