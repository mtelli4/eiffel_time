import { capitalizeWords } from '../../utils/stringUtils.ts'
import { statut_utilisateur } from '@prisma/client'

export class Utilisateur {
    id_utilisateur: number;
    nom: string;
    prenom: string;
    email: string | null;
    statut: string | null;

    constructor(data: any) {
        this.id_utilisateur = data.id_utilisateur;
        this.nom = capitalizeWords(data.nom);
        this.prenom = capitalizeWords(data.prenom);
        this.email = data.email;
        this.statut = Object.values(statut_utilisateur).includes(data.statut) ? data.statut : statut_utilisateur.indefinite;
    }

    getId(): number {
        return this.id_utilisateur;
    }

    getNom(): string {
        return this.nom;
    }

    getPrenom(): string {
        return this.prenom;
    }

    getEmail(): string | null {
        return this.email;
    }

    getStatut(): string | null {
        return this.statut;
    }

    getStatutName(): string {
        switch (this.statut) {
            case statut_utilisateur.indefinite: return 'Indéfini';
            case statut_utilisateur.administrator: return 'Administrateur';
            case statut_utilisateur.director: return 'Directeur';
            case statut_utilisateur.teacher: return 'Enseignant';
            case statut_utilisateur.student: return 'Étudiant';
            case statut_utilisateur.manager: return 'Gestionnaire';
            case statut_utilisateur.secretary: return 'Secrétaire';
            default: return 'Indéfini';
        }
    }
}
