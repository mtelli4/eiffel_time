import { Utilisateur } from './Utilisateur';
import { etudiant } from '@prisma/client';

export class Etudiant extends Utilisateur {
    etudiant: etudiant;

    constructor(utilisateur: Utilisateur, etudiant: etudiant) {
        super(utilisateur.utilisateur, utilisateur.formations);
        this.etudiant = etudiant;
    }

    isDelegue(): boolean {
        return this.etudiant.delegue || false;
    }

    isTiersTemps(): boolean {
        return this.etudiant.tierstemps || false;
    }
}
