export class Utilisateur {
    id_utilisateur: number;
    nom: string;
    prenom: string;
    email?: string;
    statut?: string;

    constructor(data: Partial<Utilisateur>) {
        this.id_utilisateur = data.id_utilisateur!;
        this.nom = data.nom!;
        this.prenom = data.prenom!;
        this.email = data.email;
        this.statut = data.statut;
    }

    fullName(): string {
        return this.prenom + ' ' + this.nom;
    }
}