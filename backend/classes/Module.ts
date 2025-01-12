import { module } from '@prisma/client';

export class Module {
    module: module;

    constructor(module: module) {
        this.module = module;
    }

    getId(): number {
        return this.module.id_module;
    }

    getLibelle(): string {
        return this.module.libelle || 'Libellé non défini';
    }

    getCodeApogee(): string {
        return this.module.codeapogee || 'Code Apogée non défini';
    }

    getHeuresCM(): number {
        const heures = this.module.heures || '0,0,0';
        return parseInt(heures.split(',')[0]);
    }

    getHeuresTD(): number {
        const heures = this.module.heures || '0,0,0';
        return parseInt(heures.split(',')[1]);
    }

    getHeuresTP(): number {
        const heures = this.module.heures || '0,0,0';
        return parseInt(heures.split(',')[2]);
    }
}