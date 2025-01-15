import { absence } from '@prisma/client';
import { Etudiant } from './Etudiant'
import { Cours } from './Cours'
import { Badge } from '@shared/components/Absences/Badge'
import { View } from 'react-native'

export class Absence {
    absence: absence;

    constructor(absence: absence) {
        this.absence = absence;
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

    getStatus(): 'justified' | 'unjustified' | 'pending' | 'undefined' {
        if (this.isValide() && this.isEnvoye()) {
            return 'justified';
        } else if (!this.isEnvoye()) {
            return 'unjustified';
        } else if (this.isEnvoye() && !this.isValide()) {
            return 'pending';
        } else {
            return 'undefined';
        }
    }

    getStatusConfig() {
        const statusConfig = {
            justified: {
                variant: 'success' as const,
                text: 'Justifiée',
            },
            unjustified: {
                variant: 'error' as const,
                text: 'Non justifiée',
            },
            pending: {
                variant: 'warning' as const,
                text: 'En attente',
            },
            undefined: {
                variant: 'default' as const,
                text: 'Indéfini',
            },
        };

        return statusConfig[this.getStatus()] || { variant: 'default', text: 'Indéfini' };
    }
}