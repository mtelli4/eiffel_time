import { absence } from '@prisma/client';
import { Etudiant } from './Etudiant'
import { Cours } from './Cours'
import { Badge } from '@shared/components/Absences/Badge'
import { View } from 'react-native'

export class Absence {
    absence: absence;
    etudiant: Etudiant;
    cours: Cours;
    status: 'justified' | 'unjustified' | 'pending' = 'unjustified';

    constructor(absence: absence, etudiant: Etudiant, cours: Cours) {
        this.absence = absence;
        this.etudiant = etudiant;
        this.cours = cours;
        this.setStatus();
    }

    getId(): number {
        return this.absence.id_absence;
    }

    getJustificatifLink(): string {
        return this.absence.justificatif || '';
    }

    getMessage(): string {
        return this.absence.message || '';
    }

    isValide(): boolean {
        return this.absence.valide || false;
    }

    getRetard(): number {
        return this.absence.retard || 0;
    }

    isRetard(): boolean {
        return this.getRetard() > 0;
    }

    isEnvoye(): boolean {
        return this.absence.envoye || false;
    }

    getCreatedAt(): Date {
        return this.absence.createdat || new Date();
    }

    getUpdatedAt(): Date {
        return this.absence.updatedat || new Date();
    }

    getIdUtilisateur(): number {
        return this.absence.id_utilisateur;
    }

    getIdCours(): number {
        return this.absence.id_cours;
    }

    getEtudiant(): Etudiant {
        return this.etudiant;
    }

    getCours(): Cours {
        return this.cours;
    }

    setStatus() {
        if (this.isValide() && this.isEnvoye()) {
            this.status = 'justified';
        } else if (!this.isEnvoye()) {
            this.status = 'unjustified';
        } else if (this.isEnvoye() && !this.isValide()) {
            this.status = 'pending';
        }
    }

    getStatus() {
        return this.status;
    }
}