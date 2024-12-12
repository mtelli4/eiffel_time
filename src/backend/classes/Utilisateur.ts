import { capitalizeFirstLetter } from '../../utils/stringUtils.ts'

export class Utilisateur {
    id_utilisateur: number;
    nom: string;
    prenom: string;
    email?: string;
    statut?: string;

    constructor(data: Partial<Utilisateur>) {
        this.id_utilisateur = data.id_utilisateur!;
        this.nom = capitalizeFirstLetter(data.nom!);
        this.prenom = capitalizeFirstLetter(data.prenom!);
        this.email = data.email;
        this.statut = data.statut;
    }

    fullName(): string {
        return this.prenom + ' ' + this.nom;
    }

    static fromJSON(data: any): Utilisateur {
        return new Utilisateur(data);
    }

    static fromJSONArray(data: any[]): Utilisateur[] {
        return data.map((item) => Utilisateur.fromJSON(item));
    }
}
