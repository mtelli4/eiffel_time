import { evaluation } from '@prisma/client';

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
        return this.evaluation.periode || 'Période non définie';
    }

    getCreatedAt(): /* DateTime */ Date {
        return this.evaluation.createdat || new Date();
    }

    getUpdatedAt(): /* DateTime */ Date {
        return this.evaluation.updatedat || new Date();
    }

    getCoursId(): number {
        return this.evaluation.id_cours || 0;
    }
}