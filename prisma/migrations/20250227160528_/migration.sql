/*
  Warnings:

  - You are about to drop the column `premiereconnexion` on the `utilisateur` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "utilisateur" DROP COLUMN "premiereconnexion",
ALTER COLUMN "salt" SET DATA TYPE VARCHAR(64);
