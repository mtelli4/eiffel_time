import { groupe } from '@prisma/client'

export class Groupe {
    groupe: groupe;

    constructor(groupe: groupe) {
        this.groupe = groupe;
    }

    getId(): number {
        return this.groupe.id_grp;
    }

    getLibelle(): string {
        return this.groupe.libelle || 'Libellé non défini';
    }
}