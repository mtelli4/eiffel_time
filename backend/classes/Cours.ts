import { cours } from '@prisma/client'
import { Module, Formation, Groupe, Evaluation } from './index'

export class Cours {
    cours: cours;
    evaluations: Evaluation[];

    constructor(cours: cours, evaluations: Evaluation[]) {
        this.cours = cours;
        this.evaluations = evaluations;
    }

    getId(): number {
        return this.cours.id_cours;
    }

    getType(): string {
        return this.cours.type || 'Type non défini';
    }

    getLibelle(): string {
        return this.cours.libelle || 'Libellé non défini';
    }

    getDebut(): Date {
        return this.cours.debut || new Date();
    }

    getFin(): Date {
        return this.cours.fin || new Date();
    }

    getSalle(): string {
        return this.cours.salle || 'Salle non définie';
    }

    getCreatedAt(): Date {
        return this.cours.createdat || new Date();
    }

    getUpdatedAt(): Date {
        return this.cours.updatedat || new Date();
    }

    isAppel(): boolean {
        return this.cours.appel || false;
    }

    getEvaluations(): Evaluation[] {
        return this.evaluations;
    }
}