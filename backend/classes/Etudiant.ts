import { etudiant, utilisateur } from '@prisma/client';
import { Utilisateur } from './Utilisateur'

export class Etudiant extends Utilisateur {
    etudiant: etudiant;

    constructor(etudiant: etudiant, utilisateur: utilisateur) {
        super(utilisateur);
        this.etudiant = etudiant;
    }

    getNumeroEtudiant(): string {
        return this.etudiant.numeroetudiant || 'Numéro étudiant non défini';
    }

    isDelegue(): boolean {
        return this.etudiant.delegue || false;
    }

    isTiersTemps(): boolean {
        return this.etudiant.tierstemps || false;
    }
}
