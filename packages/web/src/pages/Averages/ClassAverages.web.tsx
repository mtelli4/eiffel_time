import { FileDown, FileSpreadsheet } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import '../../styles/select-styles.css'

// ✅ Définition des types
interface Module {
  id_module: number
  libelle: string
}

interface Student {
  id_utilisateur: number
  nom: string
  prenom: string
  moyennes: { id_module: number; moyenne: string }[]
  absences: number
  moyenneGenerale: string
  moyenneAvecMalus: string
}

export default function Averages() {
  const [students, setStudents] = useState<Student[]>([])
  const [modules, setModules] = useState<Module[]>([])

  // 📌 Récupération des données depuis /api/averages
  useEffect(() => {
    fetch('http://localhost:4000/api/averages')
      .then((res) => res.json())
      .then((data) => {
        setModules(data.modules)
        setStudents(data.students)
      })
      .catch((error) => console.error('Erreur lors de la récupération des données:', error))
  }, [])

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <button onClick={() => console.log('Exporting XLSX')} className="btn btn-outline dark:bg-primary dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            Exporter XLSX
          </button>
          <button onClick={() => console.log('Exporting PDF')} className="btn btn-outline dark:bg-primary dark:text-white flex items-center gap-2">
            <FileDown className="w-4 h-4" />
            Exporter PDF
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-500">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-900">
                  Étudiant
                </th>
                {modules.map((module) => (
                  <th key={module.id_module} className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l border-gray-300">
                    {module.libelle}
                  </th>
                ))}
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l-2 border-gray-300 bg-gray-50 dark:bg-gray-800">
                  Moyenne générale sans malus
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l border-gray-300">
                  Absence (h)
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l-2 border-gray-300 bg-gray-50 dark:bg-gray-800">
                  Moyenne générale avec malus
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id_utilisateur} className="border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="py-3 px-4 sticky left-0 bg-white dark:bg-gray-900 dark:text-gray-300 font-medium">
                    {student.nom} {student.prenom}
                  </td>
                  {modules.map((module) => {
                    const studentModule = student.moyennes.find((m) => m.id_module === module.id_module)
                    return (
                      <td key={module.id_module} className="text-center py-3 px-4 border-l border-gray-200 dark:text-gray-300">
                        {studentModule ? studentModule.moyenne : '-'}
                      </td>
                    )
                  })}
                  <td className="text-center py-3 px-4 border-l border-gray-300">{student.moyenneGenerale}</td>
                  <td className="text-center py-3 px-4 border-l border-gray-300">{student.absences}</td>
                  <td className="text-center py-3 px-4 border-l border-gray-300">{student.moyenneAvecMalus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
