import './App.css'
import { useEffect } from 'react'
import { Utilisateur } from './backend/classes/Utilisateur.ts'

function App() {
    useEffect(() => {
        // Charger les données depuis l'API backend
        const fetchUtilisateurs = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/utilisateur')
                const data = await response.json()
                localStorage.setItem('utilisateur', JSON.stringify(new Utilisateur(data)))
            } catch (error) {
                console.error('Erreur lors du chargement de l\'utilisateur :', error)
            }
        }

        fetchUtilisateurs().then(() => console.log('Utilisateur chargé'))
    }, [])

    return (
        <div>
            <ul>
                <li>Utilisateur : {localStorage.getItem('utilisateur')}</li>
            </ul>
        </div>
    )
}

export default App
