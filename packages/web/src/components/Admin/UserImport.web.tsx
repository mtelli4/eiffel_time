import { Text, TouchableOpacity, View } from 'react-native'
import { Utilisateur } from '../../../../shared/src/types/types'
import { styles } from '../../../../shared/src/styles/Admin/AdminStyles'
import { FileUp } from 'lucide-react'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import { useState } from 'react'
import DT from 'datatables.net-dt'
import 'datatables.net-dt/js/dataTables.dataTables.js'
import DataTable from 'datatables.net-react'
import '../../styles/dataTables.dataTables.min.css'
import { roleFinder } from '../../../../shared/src/lib/utils'

DataTable.use(DT);

interface UserImportProps {
  users: Utilisateur[]
}

export function UserImport({ users }: UserImportProps) {
  const [jsonData, setJsonData] = useState<any[]>([])
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileExtension = (file.name.split('.').pop()?.toLowerCase() || '')

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result

      if (fileExtension === 'csv') {
        const parsedData = Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
        })
        setJsonData(parsedData.data)
      } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
        setJsonData(parsedData)
      } else {
        alert('Format de fichier non pris en charge')
      }
    }

    if (fileExtension === 'csv') {
      reader.readAsText(file)
    } else {
      reader.readAsBinaryString(file)
    }
  }

  const colonnes = [
    { title: 'Nom', data: 'nom' },
    { title: 'Prénom', data: 'prenom' },
    { title: 'Email', data: 'email' },
    { title: 'Rôle', data: 'statut' },
  ]

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          Importation des utilisateurs
        </Text>
        <button
          onClick={() => document.getElementById('file-input')?.click()}
          className="btn btn-outline flex items-center gap-2"
        >
          <FileUp className="w-4 h-4" />
          Importer CSV
        </button>
        <input
          id="file-input"
          type="file"
          accept=".csv, .xlsx"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <TouchableOpacity
          onPress={() => { }}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>
            Télécharger le fichier modèle CSV
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { }}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>
            Télécharger le fichier modèle XLSX
          </Text>
        </TouchableOpacity>
      </View>
      <Text>Cette section permet d'importer des utilisateurs afin de les créer, veuillez noter qu'une vérification et une validation des données importées est nécessaire.</Text>
      <Text>Modalités d'importation des utilisateurs :</Text>
      <ul className="list-disc list-inside ml-4">
        <li>Le fichier doit être au format CSV ou XLSX.</li>
        <li>Les colonnes du fichier doivent être au format suivant : nom (Nom), prenom (Prénom), email (Email), statut (Rôle)</li>
        <li>Les rôles possibles sont : indefinite (Indéfini), student (Étudiant), teacher (Enseignant), secretary (Secrétaire), director (Directeur).</li>
        <li>Les utilisateurs seront créés.</li>
      </ul>
      <br />
      {jsonData.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <DataTable
            data={jsonData.map((user) => ({
              nom: user.nom,
              prenom: user.prenom,
              email: user.email,
              statut: roleFinder(user.statut),
            }))}
            columns={colonnes}
            options={{
              info: true,
              language: {
                info: 'Affichage de _START_ à _END_ sur _TOTAL_ utilisateurs',
                emptyTable: 'Aucun utilisateur trouvé',
                lengthMenu: 'Afficher _MENU_ utilisateurs',
                search: 'Rechercher :',
              },
            }}
          />
        </div>
      )}
    </View>
  )
}