import { enseignant, utilisateur } from '@prisma/client';
import { Utilisateur } from './Utilisateur'

export class Enseignant extends Utilisateur {
    enseignant: enseignant;

    constructor(enseignant: enseignant, utilisateur: utilisateur) {
        super(utilisateur);
        this.enseignant = enseignant;
    }

    isVacataire(): boolean {
        return this.enseignant.vacataire || false;
    }
}