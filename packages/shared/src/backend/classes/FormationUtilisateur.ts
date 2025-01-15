import { formation_utilisateur } from '@prisma/client';

export class FormationUtilisateur {
    formation_utilisateur: formation_utilisateur;

    constructor(formation_utilisateur: formation_utilisateur) {
        this.formation_utilisateur = formation_utilisateur;
    }

    getIdUtilisateur(): number {
        return this.formation_utilisateur.id_utilisateur;
    }

    getIdFormation(): number {
        return this.formation_utilisateur.id_formation;
    }
}