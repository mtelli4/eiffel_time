import { evaluation } from '@prisma/client';
import { Note } from './Note'

export class Evaluation {
    evaluation: evaluation;
    notes: Note[] = [];

    constructor(evaluation: evaluation, notes: Note[]) {
        this.evaluation = evaluation;
        this.notes = notes;
    }

    getId(): number {
        return this.evaluation.id_eval;
    }

    getLibelle(): string {
        return this.evaluation.libelle || 'Libellé non défini';
    }

    getCoefficient(): number {
        return this.evaluation.coefficient || 0;
    }

    getNoteMax(): number {
        return this.evaluation.notemaximale || 0;
    }

    getPeriode(): string {
        return this.evaluation.periode || 'Période non définie';
    }

    getCreatedAt(): Date {
        return this.evaluation.createdat || new Date();
    }

    getUpdatedAt(): Date {
        return this.evaluation.updatedat || new Date();
    }

    getCoursId(): number {
        return this.evaluation.id_cours || 0;
    }

    getNotes(): Note[] {
        return this.notes;
    }
}