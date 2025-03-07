import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import { FileUp } from 'lucide-react'
import DataTable from 'datatables.net-react'
import DT from 'datatables.net-dt'
import 'datatables.net-dt/js/dataTables.dataTables.js'
import '../../styles/dataTables.dataTables.min.css'
import { importUsers } from '../../../../shared/src/backend/services/admin'
import { roleFinder } from '../../../../shared/src/lib/utils'
import { ImportUser } from '../../../../shared/src/types/types'

DataTable.use(DT)

export function UserImport() {
  const [jsonData, setJsonData] = useState<ImportUser[]>([])
  const [validData, setValidData] = useState<ImportUser[]>([])
  const [showOnlyValid, setShowOnlyValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const user = localStorage.getItem('user')
  const statut = JSON.parse(user as string)?.statut || ''

  // Vérifie si l'email correspond à celui de l'Université Gustave Eiffel
  const isEmailValid = (email: string, role?: string) => {
    if (role === 'student' && statut === 'secretary') return email.endsWith('@edu.univ-eiffel.fr')
    return email.endsWith('@u-pem.fr') || email.endsWith('@univ-eiffel.fr') || email.endsWith('@edu.univ-eiffel.fr')
  }

  // Gestion du fichier déposé
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return
    setLoading(true)

    const file = acceptedFiles[0]
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''
    const reader = new FileReader()

    reader.onload = (e) => {
      const data = e.target?.result
      let parsedData: ImportUser[] = []

      if (fileExtension === 'csv') {
        parsedData = Papa.parse(data as string, {
          header: true,
          skipEmptyLines: true,
        }).data as ImportUser[]
      } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        const workbook = XLSX.read(data)
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        parsedData = XLSX.utils.sheet_to_json(worksheet)
      } else if (fileExtension === 'json') {
        parsedData = JSON.parse(data as string)
      }

      setJsonData(parsedData)
      setValidData(parsedData.filter((user) => isEmailValid(user.email, user.statut)))
      setLoading(false)
    }

    if (fileExtension === 'csv' || fileExtension === 'json') {
      reader.readAsText(file)
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      reader.readAsArrayBuffer(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/json': ['.json'],
    },
  })

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold dark:text-white">
          Importation des {statut === 'secretary' ? 'étudiants' : 'utilisateurs'}
        </h2>
      </div>
      {jsonData.length === 0 && (
        <div className='text-gray-600 dark:text-gray-300'>
          <p>Cette section permet d'importer des utilisateurs afin de les créer, veuillez noter qu'une vérification et une validation des données importées est nécessaire pour éviter toute erreur.</p>
          <br />
          <p>Modalités d'importation des utilisateurs :</p>
          <ul className="list-disc list-inside ml-4">
            <li>Le fichier doit être au format CSV, XLSX, XLS ou JSON.</li>
            <li>Les colonnes du fichier doivent être au format suivant : nom (Nom), prenom (Prénom), email (Email), statut (Rôle). Toute autre colonne sera ignorée.</li>
            <li>Les rôles possibles sont : indefinite (Indéfini), student (Étudiant), teacher (Enseignant), secretary (Secrétaire), director (Directeur).</li>
            <li>Les utilisateurs seront créés après validation des données.</li>
            {statut === 'secretary' && <li>La création des utilisateurs est irréversible, veuillez vérifier les données avant de les importer.</li>}
            <li>La création des utilisateurs sera limitée aux utilisateurs valides et aux 4 colonnes citées ci-dessus. {statut === 'secretary' && <>Veuillez faire appel à un administrateur ou un gestionnaire pour modifier.</>}</li>
          </ul>
          <br />
          {/* Zone de drag & drop */}
          <div {...getRootProps()} className="border-2 border-dashed p-6 text-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-blue-600 font-medium">Déposez votre fichier ici...</p>
            ) : (
              <p className="text-gray-600">Glissez-déposez un fichier ici ou cliquez pour sélectionner un fichier</p>
            )}
            <FileUp className="mx-auto mt-2 text-gray-500" size={24} />
          </div>
        </div>
      )}
      <br />
      {/* Affichage des utilisateurs importés */}
      {jsonData.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
          <div className="mb-4 flex justify-between items-center">
            {/* Toggle switch */}
            <label className="flex items-center cursor-pointer">
              <span className="mr-2">Afficher uniquement valides</span>
              <input
                type="checkbox"
                className="hidden"
                checked={showOnlyValid}
                onChange={() => setShowOnlyValid(!showOnlyValid)}
              />
              <span className={`relative w-10 h-5 bg-gray-400 rounded-full transition ${showOnlyValid ? 'bg-green-600' : ''}`}>
                <span className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transform transition ${showOnlyValid ? 'translate-x-5' : ''}`}></span>
              </span>
            </label>
          </div>

          {/* Tableau des utilisateurs */}
          {!showOnlyValid ? (<DataTable
            className="display w-full dark:text-gray-300 custom-table"
            options={{
              info: true,
              language: {
                info: 'Affichage de _START_ à _END_ sur _TOTAL_ utilisateurs',
                lengthMenu: 'Afficher _MENU_ utilisateurs',
                search: 'Rechercher :',
                searchPlaceholder: 'Rechercher un utilisateur',
                infoEmpty: 'Aucun utilisateur trouvé',
                emptyTable: loading ? 'Chargement des données...' : 'Aucun utilisateur trouvé',
              },
              pageLength: 10,
            }}
            key={jsonData.length}
          >
            <thead>
              <tr className="bg-[#ECF0F1] dark:bg-gray-900 border-b border-gray-200">
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left">Prénom</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Rôle</th>
              </tr>
            </thead>
            <tbody>
              {jsonData.map((user, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 hover:bg-gray-600 dark:hover:bg-[#2C3E50] ${!isEmailValid(user.email, user.statut) ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'
                    }`}
                >
                  <td className="py-3 px-4">{user.nom}</td>
                  <td className="py-3 px-4">{user.prenom}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{roleFinder(user.statut)}</td>
                </tr>
              ))}
            </tbody>
          </DataTable>) : (
            <DataTable
              className="display w-full dark:text-gray-300 custom-table"
              options={{
                info: true,
                language: {
                  info: 'Affichage de _START_ à _END_ sur _TOTAL_ utilisateurs',
                  lengthMenu: 'Afficher _MENU_ utilisateurs',
                  search: 'Rechercher :',
                  searchPlaceholder: 'Rechercher un utilisateur',
                  infoEmpty: 'Aucun utilisateur trouvé',
                  emptyTable: loading ? 'Chargement des données...' : 'Aucun utilisateur trouvé',
                },
                pageLength: 10,
              }}
              key={validData.length}
            >
              <thead>
                <tr className="bg-[#ECF0F1] dark:bg-gray-900 border-b border-gray-200">
                  <th className="py-3 px-4 text-left">Nom</th>
                  <th className="py-3 px-4 text-left">Prénom</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Rôle</th>
                </tr>
              </thead>
              <tbody>
                {validData.map((user, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 hover:bg-gray-600 dark:hover:bg-[#2C3E50] ${!isEmailValid(user.email, user.statut) ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'
                      }`}
                  >
                    <td className="py-3 px-4">{user.nom}</td>
                    <td className="py-3 px-4">{user.prenom}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{roleFinder(user.statut)}</td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          )}
          <br />
          {/* Bouton d'importation */}
          <button
            className="mt-4 px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
            onClick={() => importUsers(validData, statut)}
            disabled={validData.length === 0}
          >
            Importer les utilisateurs ({validData.length} valide{validData.length > 1 ? 's' : ''})
          </button>
        </div>
      )}
    </div>
  )
}
