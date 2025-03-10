import { evaluation, periode } from '@prisma/client'
import { Note } from './Note'

export class Evaluation {
    evaluation: evaluation;

    constructor(evaluation: evaluation) {
        this.evaluation = evaluation;
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
        return periode[this.evaluation.periode as keyof typeof periode] || 'Période non définie';
    }

    getPeriodeName(): string {
        switch (this.evaluation.periode) {
            case periode.Semestre_1: return 'Semestre 1';
            case periode.Semestre_2: return 'Semestre 2';
            case periode.Semestre_3: return 'Semestre 3';
            case periode.Semestre_4: return 'Semestre 4';
            case periode.Semestre_5: return 'Semestre 5';
            case periode.Semestre_6: return 'Semestre 6';
            default: return 'Indéfini';
        }
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
}