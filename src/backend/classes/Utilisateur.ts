import { capitalizeWords } from '../../utils/stringUtils.ts'

export class Utilisateur {
    id_utilisateur: number
    nom: string
    prenom: string
    email: string | null
    statut: string | null

    constructor(data: any) {
        this.id_utilisateur = data.id_utilisateur;
        this.nom = capitalizeWords(data.nom);
        this.prenom = capitalizeWords(data.prenom);
        this.email = data.email;
        this.statut = data.statut;
    }

    static fromJSON(data: any): Utilisateur {
        return new Utilisateur(data);
    }

    static fromJSONArray(data: any[]): Utilisateur[] {
        return data.map((item) => Utilisateur.fromJSON(item));
    }
}
