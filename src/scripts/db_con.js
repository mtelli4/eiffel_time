const { Pool } = require('pg');

const pool = new Pool({
    user: 'votre_utilisateur',
    host: 'votre_hote',
    database: 'votre_base_de_donnees',
    password: 'votre_mot_de_passe',
    port: 5432,
});

async function insertPresenceData(name, status) {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO ingrid.presence (nom, statut) VALUES ($1, $2)';
        await client.query(query, [name, status]);
        console.log('Données de présence insérées avec succès');
    } catch (err) {
        console.error('Erreur lors de l\'insertion des données de présence', err);
    } finally {
        client.release();
    }
}
