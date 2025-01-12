import { Utilisateur } from './Utilisateur';
import { etudiant } from '@prisma/client';

export class Etudiant extends Utilisateur {
    etudiant: etudiant;

    constructor(utilisateur: Utilisateur, etudiant: etudiant) {
        super(utilisateur.utilisateur);
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
