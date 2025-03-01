import DT from 'datatables.net-dt'
import 'datatables.net-dt/js/dataTables.dataTables.js'
import DataTable from 'datatables.net-react'
import { FileDown, FileUp } from 'lucide-react'
import Papa from 'papaparse'
import { useState } from 'react'
import * as XLSX from 'xlsx'
import { roleFinder } from '../../../../shared/src/lib/utils'
import { styles } from '../../../../shared/src/styles/Admin/AdminStyles'
import { Utilisateur } from '../../../../shared/src/types/types'
import '../../styles/dataTables.dataTables.min.css'
// import model from '/public/import_model.csv'
// import model_csv from '../../assets/import_model.csv'
// import model_xlsx from '../../assets/import_model.xlsx'

DataTable.use(DT)

interface UserImportProps {
  users: Utilisateur[]
}

export function UserImport() {
  const [jsonData, setJsonData] = useState<any[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result

      if (fileExtension === 'csv') {
        const parsedData = Papa.parse(data as string, {
          header: true,
          skipEmptyLines: true,
        })
        setJsonData(parsedData.data)
      } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        const workbook = XLSX.read(data)
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const parsedData = XLSX.utils.sheet_to_json(worksheet)
        setJsonData(parsedData)
      } else {
        alert('Format de fichier non pris en charge')
      }
    }

    if (fileExtension === 'csv') {
      reader.readAsText(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  }

  const handleImportUsers = () => {
    console.log('Importer les utilisateurs')
  }

  const handleDownloadModel = (type: 'csv' | 'xlsx') => {
    // TODO: Finir la fonction de téléchargement du modèle
    console.log('Télécharger le modèle', type)
    fetch('../../assets/import_model.csv')
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'import_model.csv')
        document.body.appendChild(link)
        link.click()
        link.parentNode?.removeChild(link)
      })
  }

  return (
    <div style={styles.content}>
      <header style={styles.header} className="flex flex-col gap-3">
        <span className="text-gray-600 dark:text-gray-300 font-bold text-xl">
          Importation des utilisateurs
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => document.getElementById('file-input')?.click()}
            className="btn btn-outline dark:bg-primary dark:text-gray-300 flex flex-row items-center gap-2"
          >
            <FileUp style={styles.addIcon} /> Importer CSV/XLSX
          </button>
          <div className="flex flex-row-reverse gap-2">
            <input
              id="file-input"
              type="file"
              accept=".csv, .xlsx"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <button
              onClick={() => handleDownloadModel('csv')}
              className="btn btn-outline dark:bg-primary dark:text-gray-300 flex flex-row items-center gap-2"
            >
              <FileDown style={styles.addIcon} /> Modèle CSV
            </button>
            <button
              onClick={() => handleDownloadModel('xlsx')}
              className="btn btn-outline dark:bg-primary dark:text-gray-300 flex flex-row items-center gap-2"
            >
              <FileDown style={styles.addIcon} /> Modèle XLSX
            </button>
          </div>
        </div>
      </header>
      <p className="text-gray-600 dark:text-gray-300">
        Cette section permet d'importer des utilisateurs afin de les créer,
        veuillez noter qu'une vérification et une validation des données
        importées est nécessaire.
      </p>
      <br />
      <p className="text-gray-600 dark:text-gray-300">
        Modalités d'importation des utilisateurs :
      </p>
      <ul className="list-disc list-inside ml-4 text-gray-600 dark:text-gray-300">
        <li>Le fichier doit être au format CSV ou XLSX.</li>
        <li>
          Les colonnes du fichier doivent être au format suivant : nom (Nom),
          prenom (Prénom), email (Email), statut (Rôle). Toute autre colonne
          sera ignorée.
        </li>
        {/* <li>Le fichier modèle peut être téléchargé ci-dessus.</li> */}
        <li>
          Les rôles possibles sont : indefinite (Indéfini), student (Étudiant),
          teacher (Enseignant), secretary (Secrétaire), director (Directeur).
        </li>
        <li>Les utilisateurs seront créés après validation des données.</li>
      </ul>
      <br />
      {/* <pre>{JSON.stringify(jsonData, null, 2)}</pre><br /> */}
      {jsonData.length > 0 && (
        <div>
          <DataTable
            options={{
              info: true,
              language: {
                info: 'Affichage de _START_ à _END_ sur _TOTAL_ utilisateurs',
                emptyTable: 'Aucun utilisateur trouvé',
                lengthMenu: 'Afficher _MENU_ utilisateurs',
                search: 'Rechercher :',
                searchPlaceholder: 'Rechercher un utilisateur',
                infoEmpty: 'Aucun utilisateur trouvé',
              },
            }}
            className="table table-striped table-bordered"
          >
            <thead>
              <tr className="bg-[#ECF0F1] dark:bg-primary border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] dark:text-gray-300 cursor-pointer">
                  Nom
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] dark:text-gray-300 cursor-pointer">
                  Prénom
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] dark:text-gray-300 cursor-pointer">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] dark:text-gray-300 cursor-pointer">
                  Rôle
                </th>
              </tr>
            </thead>
            <tbody>
              {jsonData.map((user, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-[#ECF0F1]"
                >
                  <td className="py-3 px-4">{user.nom}</td>
                  <td className="py-3 px-4">{user.prenom}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{roleFinder(user.statut)}</td>
                </tr>
              ))}
            </tbody>
          </DataTable>
          <button className="btn btn-primary" onClick={handleImportUsers}>
            Importer les utilisateurs
          </button>
        </div>
      )}
    </div>
  )
}
