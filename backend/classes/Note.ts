import { notes, Prisma } from '@prisma/client';
import { Etudiant } from './index';

export class Note {
    note: notes;
    etudiant: Etudiant;

    constructor(note: notes, etudiant: Etudiant) {
        this.note = note;
        this.etudiant = etudiant;
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

    getEtudiant(): Etudiant {
        return this.etudiant;
    }
}