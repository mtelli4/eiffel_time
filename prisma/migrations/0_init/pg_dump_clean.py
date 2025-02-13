import argparse
import subprocess
import os

# Fonction pour exécuter pg_dump
def run_pg_dump(user, database, output_file, schema):
    dump_command = [
        "pg_dump",
        "-U", user,
        "-d", database,
        f"--schema={schema}",
        "--data-only",
        "--inserts",
        "-f", output_file
    ]
    
    try:
        print(f"Exécution de la commande pg_dump pour la base {database}...")
        subprocess.run(dump_command, check=True)
        print(f"pg_dump terminé avec succès. Fichier généré : {output_file}")
    except subprocess.CalledProcessError as e:
        print(f"Erreur lors de l'exécution de pg_dump : {e}")
        exit(1)

# Fonction pour nettoyer le fichier dump
def clean_dump_file(input_file, output_file, schema):
    if not os.path.exists(input_file):
        print(f"Fichier {input_file} introuvable.")
        exit(1)
    
    print("Nettoyage du fichier dump...")
    with open(input_file, "r") as infile:
        lines = infile.readlines()

    with open(output_file, "w") as outfile:
        outfile.write(f"-- Dump nettoyé à partir de {input_file}\n")
        outfile.write(f"SET search_path SET {schema};\n\n")
        for line in lines:
            # Exclure les lignes commençant par "SET" ou contenant "pg_catalog.set_config"
            if not line.startswith("SET ") and "pg_catalog.set_config('search_path', '', false);" not in line:
                outfile.write(line)

    print(f"Fichier nettoyé enregistré sous {output_file}.")

# Fonction principale
def main():
    parser = argparse.ArgumentParser(description="Exécuter pg_dump et nettoyer les lignes SET.")
    parser.add_argument("--user", required=True, help="Nom de l'utilisateur PostgreSQL.")
    parser.add_argument("--database", required=True, help="Nom de la base de données PostgreSQL.")
    parser.add_argument("--output", default="dump.sql", help="Nom du fichier dump généré (par défaut : dump.sql).")
    parser.add_argument("--schema", default="public", help="Nom du schéma à exporter (par défaut : public).")
    parser.add_argument("--clean_output", help="Nom du fichier dump nettoyé. Si non spécifié, le fichier sera réécrit.")
    
    args = parser.parse_args()
    
    # Si clean_output n'est pas spécifié, utiliser le fichier d'entrée comme fichier de sortie
    if not args.clean_output:
        args.clean_output = args.output
    print("Arguments : ", args)
    # Exécuter pg_dump
    run_pg_dump(args.user, args.database, args.output, args.schema)
    
    # Nettoyer le fichier dump
    clean_dump_file(args.output, args.clean_output, args.schema)

if __name__ == "__main__":
    main()
