import { cours } from '@prisma/client';

export class Cours {
    cours: cours;

    constructor(cours: cours) {
        this.cours = cours;
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
        return new Date(this.cours.debut || new Date());
    }

    getFin(): Date {
        return new Date(this.cours.fin || new Date());
    }

    getSalle(): string {
        return this.cours.salle || 'Salle non définie';
    }

    getCreatedAt(): Date {
        return new Date(this.cours.createdat || new Date());
    }

    getUpdatedAt(): Date {
        return new Date(this.cours.updatedat || new Date());
    }

    isAppel(): boolean {
        return this.cours.appel || false;
    }

    getIdModule(): number {
        return this.cours.id_module;
    }

    getTime(): string {
        const date = this.getDebut().toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
        const debut = this.getDebut().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        const fin = this.getFin().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        return `${date} : ${debut} - ${fin}`;
    }
}