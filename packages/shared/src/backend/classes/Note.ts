import { notes, Prisma } from '@prisma/client';

export class Note {
    note: notes;

    constructor(note: notes) {
        this.note = note;
    }

    getUtilisateurId(): number {
        return this.note.id_utilisateur;
    }

    getEvaluationId(): number {
        return this.note.id_eval;
    }

    getNote(): Prisma.Decimal {
        return this.note.note || new Prisma.Decimal(0);
    }

    getCommentaire(): string {
        return this.note.commentaire || 'Aucun commentaire';
    }

    getCreatedAt(): Date {
        return this.note.createdat || new Date();
    }

    getUpdatedAt(): Date {
        return this.note.updatedat || new Date();
    }
}