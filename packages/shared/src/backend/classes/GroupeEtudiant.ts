import { groupe_etudiant } from "@prisma/client";

export class GroupeEtudiant {
    groupe_etudiant: groupe_etudiant;

    constructor(groupe_etudiant: groupe_etudiant) {
        this.groupe_etudiant = groupe_etudiant;
    }

    getIdUtilisateur() {
        return this.groupe_etudiant.id_utilisateur;
    }

    getIdGroupe() {
        return this.groupe_etudiant.id_grp;
    }
}
