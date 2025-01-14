import { formation } from '@prisma/client';

export class Formation {
    formation: formation;

    constructor(formation: formation) {
        this.formation = formation;
    }

    getId(): number {
        return this.formation.id_formation;
    }

    getLibelle(): string {
        return this.formation.libelle || 'Nom de la formation non défini';
    }

    getLien(): string {
        return this.formation.lien || 'Lien non défini';
    }

    getTrombinoscope(): string {
        return this.formation.trombinoscope || 'Trombinoscope non défini';
    }
}
