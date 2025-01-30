import { fetch } from 'cross-fetch';
const API_URL = 'http://localhost:4000/api';

const getFormations = async () => {
    try {
        const response = await fetch(`${API_URL}/formations`);

        if (!response.ok) {
            throw new Error(`Erreur de réseau: ${response.status}`);
        }

        const formations = await response.json();

        return formations;
    } catch (error) {
        console.error('Erreur lors de la récupération des formations:', error);
        throw error;
    }
}

export { getFormations };