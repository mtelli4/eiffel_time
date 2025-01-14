import { capitalizeWords } from '../../utils/stringUtils';
import { statut_utilisateur, utilisateur } from '@prisma/client';

export class Utilisateur {
    utilisateur: utilisateur;

    constructor(utilisateur: utilisateur) {
        // Capitalisation des noms et prénoms
        utilisateur.nom = capitalizeWords(utilisateur.nom);
        utilisateur.prenom = capitalizeWords(utilisateur.prenom);
        this.utilisateur = utilisateur;
    }

    // Retourne l'ID de l'utilisateur
    getId(): number {
        return this.utilisateur.id_utilisateur;
    }

    // Retourne le nom de l'utilisateur
    getNom(): string {
        return this.utilisateur.nom || 'Nom non défini';
    }

    // Retourne le prénom de l'utilisateur
    getPrenom(): string {
        return this.utilisateur.prenom || 'Prénom non défini';
    }

    // Retourne le nom complet (prénom + nom)
    getFullName(): string {
        return `${this.getPrenom()} ${this.getNom()}`;
    }

    // Retourne l'email de l'utilisateur
    getEmail(): string {
        return this.utilisateur.email || 'Email non défini';
    }

    // Retourne le statut de l'utilisateur
    getStatut(): statut_utilisateur {
        return this.utilisateur.statut || statut_utilisateur.indefinite;
    }

    // Retourne le nom complet du statut de l'utilisateur
    getStatutName(): string {
        switch (this.utilisateur.statut) {
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
