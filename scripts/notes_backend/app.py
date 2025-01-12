from flask import Flask, jsonify, request
from flask_cors import CORS  # Import Flask-CORS


import psycopg2
from psycopg2.extras import RealDictCursor


app = Flask(__name__)
CORS(app)
# Configuration de la connexion à PostgreSQL
DATABASE_CONFIG = {
    'dbname': 'gestion_etudiants',  # Nom de la base de données
    'user': '**',             # Utilisateur PostgreSQL
    'password': '**',         # Mot de passe PostgreSQL
    'host': 'localhost',            # Adresse du serveur
    'port': 5432                    # Port par défaut de PostgreSQL
}
def execute_queryy(query, params=None, fetch_one=False, fetch_all=False):
    try:
        conn = psycopg2.connect(**DATABASE_CONFIG)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(query, params)

        result = None
        if fetch_one:  # Récupérer une seule ligne
            result = cursor.fetchone()
        elif fetch_all:  # Récupérer toutes les lignes
            result = cursor.fetchall()

        conn.commit()
        cursor.close()
        conn.close()
        return result
    except Exception as e:
        print(f"Erreur : {e}")
        return None

# Fonction pour exécuter une requête SQL
def execute_query(query, params=None, fetch_one=False, fetch_all=True):
    try:
        conn = psycopg2.connect(**DATABASE_CONFIG)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(query, params)
        result = None
        if fetch_one:
            result = cursor.fetchone()
        elif fetch_all:
            result = cursor.fetchall()
        conn.commit()
        cursor.close()
        conn.close()
        return result
    except Exception as e:
        print(f"Erreur : {e}")
        return None

# Routes de l'API

# Route pour obtenir les promotions
@app.route('/promotions', methods=['GET'])
def get_promotions():
    query = "SELECT id, nom FROM promotions;"
    promotions = execute_query(query)
    return jsonify(promotions)

# Route pour obtenir les matieres
@app.route('/matieres', methods=['GET'])
def get_matieres():
    query = "SELECT id, nom FROM matieres;"
    matieres = execute_query(query)
    return jsonify(matieres)

# Route pour obtenir les classes d'une promotion
@app.route('/promotions/<int:promotion_id>/classes', methods=['GET'])
def get_classes(promotion_id):
    query = "SELECT id, nom FROM classes WHERE promotion_id = %s;"
    classes = execute_query(query, (promotion_id,))
    return jsonify(classes)

# Route pour obtenir les étudiants d'une classe
@app.route('/classes/<int:classe_id>/etudiants', methods=['GET'])
def get_etudiants(classe_id):
    query = "SELECT id, nom, prenom FROM etudiants WHERE classe_id = %s;"
    etudiants = execute_query(query, (classe_id,))
    return jsonify(etudiants)



# Route pour obtenir les notes d'un étudiant
@app.route('/etudiants/<int:etudiant_id>/notes', methods=['GET'])
def get_notes(etudiant_id):
    query = """
    SELECT n.id, n.note, n.commentaire, m.nom AS matiere
    FROM notes n
    JOIN matieres m ON n.matiere_id = m.id
    WHERE n.etudiant_id = %s;
    """
    notes = execute_query(query, (etudiant_id,))
    return jsonify(notes)

# Route pour ajouter une note
@app.route('/etudiants/<int:etudiant_id>/notes', methods=['POST'])
def add_note(etudiant_id):
    
    data = request.json
    print("Données reçues :", data)  # Log pour voir ce qui a été reçu
    
    matiere = data.get('matiere')
    note = data.get('note')
    commentaire = data.get('commentaire')
    print(f"Matière: {matiere}, Note: {note}, Commentaire: {commentaire}"  )
     # Log des valeurs extraites

    # Vérifier si la matière existe ou l'ajouter
    query_matiere = "SELECT id FROM matieres WHERE nom = %s;"
    matiere_id = execute_query(query_matiere, (matiere,), fetch_one=True)
    matiere_id = matiere_id['id']  # Si execute_query retourne un dictionnaire ou RealDictRow

   # if not matiere_id:
   #     query_insert_matiere = "INSERT INTO matieres (nom) VALUES (%s) RETURNING id;"
     #   matiere_id = execute_query(query_insert_matiere, (matiere,), fetch_one=True)['id']
   # else:
   # matiere_id = matiere_id['id']
    print(f"Matière: {matiere}, Note: {note}, Commentaire: {commentaire}, id: {matiere_id}"  )
    # Ajouter la note
    query_note = """
    INSERT INTO notes (etudiant_id, matiere_id, note, commentaire)
    VALUES (%s, %s, %s, %s);
    """
    execute_queryy(query_note, (etudiant_id, matiere_id, note, commentaire))
    return jsonify({
            "message": "Note ajoutée avec succès" }), 201

if __name__ == '__main__':
    app.run(debug=True)
