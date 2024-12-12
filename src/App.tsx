import './App.css'
import { useEffect, useState } from 'react'

function App() {
    const [utilisateurs, setUtilisateurs] = useState([])

    useEffect(() => {
        // Fonction pour charger les utilisateurs depuis l'API backend
        const fetchUtilisateurs = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/utilisateurs')
                const data = await response.json()
                setUtilisateurs(data)
            } catch (error) {
                console.error(
                    'Erreur lors du chargement des utilisateurs :',
                    error
                )
            }
        }

        fetchUtilisateurs().then(() => console.log('Utilisateurs chargés'))
    }, [])

    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            <ul>
                {utilisateurs.map((utilisateur) => (
                    <li key={utilisateur.id_utilisateur}>
                        {utilisateur.prenom} {utilisateur.nom} -{' '}
                        {utilisateur.email} -{' '}
                        {utilisateur.statut}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
