import { enseignant_module } from '@prisma/client';

export class EnseignatModule {
    enseignant_module: enseignant_module;

    constructor(enseignant_module: enseignant_module) {
        this.enseignant_module = enseignant_module;
    }

    getIdModule(): number {
        return this.enseignant_module.id_module;
    }

    getIdEnseignant(): number {
        return this.enseignant_module.id_utilisateur;
    }
}