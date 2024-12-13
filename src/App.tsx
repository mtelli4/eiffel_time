import './App.css'
import { useEffect, useState } from 'react'
import { Utilisateur } from './backend/classes/Utilisateur'

function App() {
    const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null)

    useEffect(() => {
        // Charger les données depuis l'API backend
        const fetchUtilisateurs = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/utilisateur')
                const data = await response.json()

                // Crée un nouvel utilisateur et stocke dans localStorage
                const utilisateurInstance = new Utilisateur(data)
                localStorage.setItem('utilisateur', JSON.stringify(utilisateurInstance))

                // Mettre à jour le state avec l'utilisateur
                setUtilisateur(utilisateurInstance)
            } catch (error) {
                console.error('Erreur lors du chargement de l\'utilisateur :', error)
            }
        }

        fetchUtilisateurs().then(r => r)
    }, [])

    // Lire les données depuis localStorage à la première montée
    useEffect(() => {
        const savedUtilisateur = localStorage.getItem('utilisateur')
        if (savedUtilisateur) {
            const parsedUtilisateur = JSON.parse(savedUtilisateur)
            setUtilisateur(parsedUtilisateur)
        }
    }, [])

    return (
        <div>
            <h1>Informations de l'utilisateur</h1>
            {utilisateur ? (
                <ul>
                    <li>ID Utilisateur : {utilisateur.id_utilisateur}</li>
                    <li>Nom et prénom : {utilisateur.nom} {utilisateur.prenom}</li>
                    <li>Email : {utilisateur.email}</li>
                    <li>Statut : {utilisateur.statut}</li>
                </ul>
            ) : (
                <p>Chargement de l'utilisateur...</p>
            )}
        </div>
    )
}

export default App
