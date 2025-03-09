import { ChevronDown, FileDown, FileSpreadsheet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { cn } from '../../../../shared/src/lib/utils'
import '../../styles/select-styles.css'

interface Module {
  id_module: number
  libelle: string
  code?: string // Ajout du champ code pour les modules
}

interface Groupe {
  id_grp: number
  libelle: string
}

interface Semestre {
  periode: string
}

interface BlocCompetence {
  id_bloc_comp: number
  libelle: string
  code?: string // Ajout du champ code pour les blocs
  modules: Module[]
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
  const [blocsCompetences, setBlocsCompetences] = useState<BlocCompetence[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [groupes, setGroupes] = useState<Groupe[]>([])
  const [semestres, setSemestres] = useState<Semestre[]>([])
  const [selectedGroupe, setSelectedGroupe] = useState('all')
  const [selectedSemestre, setSelectedSemestre] = useState('all')
  const [expandedBlocs, setExpandedBlocs] = useState<number[]>([])

  // Récupération des données avec filtres dynamiques
  const fetchData = () => {
    fetch(
      `http://localhost:4000/api/averages?semestre=${selectedSemestre}&groupe=${selectedGroupe}`
    )
      .then((res) => res.json())
      .then((data) => {
        setModules(data.modules)
        setStudents(data.students)
        setGroupes(data.groupes)
        setBlocsCompetences(data.blocsCompetences)
        setSemestres(data.semestres)
      })
      .catch((error) =>
        console.error('Erreur lors de la récupération des données:', error)
      )
  }

  useEffect(() => {
    fetchData()
  }, [selectedGroupe, selectedSemestre])

  const toggleBloc = (blocId: number) => {
    setExpandedBlocs((prev) =>
      prev.includes(blocId)
        ? prev.filter((id) => id !== blocId)
        : [...prev, blocId]
    )
  }

  const handleExportXLSX = () => {
    console.log('Exporting to XLSX...')
  }

  const handleExportPDF = () => {
    console.log('Exporting to PDF...')
  }

  // Calcul de la moyenne d'un bloc pour un étudiant
  const calculateBlocAverage = (
    student: Student,
    bloc: BlocCompetence
  ): string => {
    const moduleNotes = bloc.modules
      .map((module) => {
        const note = student.moyennes.find(
          (m) => m.id_module === module.id_module
        )
        return note ? parseFloat(note.moyenne) : null
      })
      .filter((note) => note !== null) as number[]

    if (moduleNotes.length === 0) return '-'

    const average =
      moduleNotes.reduce((sum, note) => sum + note, 0) / moduleNotes.length
    return average.toFixed(2)
  }

  // Création des options pour les select
  const semestreOptions = [
    { value: 'all', label: 'Tous les semestres' },
    ...semestres.map((sem) => ({
      value: sem.periode,
      label: `Semestre ${sem.periode}`,
    })),
  ]

  const groupeOptions = [
    { value: 'all', label: 'Tous les groupes' },
    ...groupes.map((grp) => ({
      value: grp.id_grp.toString(),
      label: grp.libelle,
    })),
  ]

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <button
            onClick={handleExportXLSX}
            className="btn btn-outline dark:bg-primary dark:text-white flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Exporter XLSX
          </button>
          <button
            onClick={handleExportPDF}
            className="btn btn-outline dark:bg-primary dark:text-white flex items-center gap-2"
          >
            <FileDown className="w-4 h-4" />
            Exporter PDF
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Semestre
            </label>
            <Select
              defaultValue={semestreOptions.find(
                (option) => option.value === selectedSemestre
              )}
              options={semestreOptions}
              isSearchable={false}
              onChange={(option) =>
                setSelectedSemestre(option?.value as string)
              }
              className="w-full text-black dark:text-white"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'var(--select-bg, --select-bg)',
                  borderColor: state.isFocused
                    ? 'var(--select-focus-border, white)'
                    : 'var(--select-border, #cccccc)',
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: 'var(--select-menu-bg, white)',
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isSelected
                    ? 'var(--select-selected-bg, #2e3494)'
                    : state.isFocused
                    ? 'var(--select-hover-bg, #deebff)'
                    : 'var(--select-menu-bg, --select-menu-bg)',
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: 'var(--select-text, black)',
                }),
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Groupe
            </label>
            <Select
              defaultValue={groupeOptions.find(
                (option) => option.value === selectedGroupe
              )}
              options={groupeOptions}
              isSearchable={false}
              onChange={(option) => setSelectedGroupe(option?.value as string)}
              className="w-full text-black dark:text-white"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'var(--select-bg, --select-bg)',
                  borderColor: state.isFocused
                    ? 'var(--select-focus-border, white)'
                    : 'var(--select-border, #cccccc)',
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: 'var(--select-menu-bg, white)',
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isSelected
                    ? 'var(--select-selected-bg, #2e3494)'
                    : state.isFocused
                    ? 'var(--select-hover-bg, #deebff)'
                    : 'var(--select-menu-bg, --select-menu-bg)',
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: 'var(--select-text, black)',
                }),
              }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-500">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-900">
                  Étudiant
                </th>
                {blocsCompetences.map((bloc) => (
                  <React.Fragment key={bloc.id_bloc_comp}>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l-2 border-gray-300 bg-gray-50 dark:bg-gray-800">
                      <button
                        onClick={() => toggleBloc(bloc.id_bloc_comp)}
                        className="flex items-center gap-2 mx-auto font-bold text-primary dark:text-white"
                      >
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform',
                            expandedBlocs.includes(bloc.id_bloc_comp) &&
                              'transform rotate-180'
                          )}
                        />
                        {bloc.code || `BC ${bloc.id_bloc_comp}`}
                      </button>
                    </th>
                    {expandedBlocs.includes(bloc.id_bloc_comp) &&
                      bloc.modules.map((module) => (
                        <th
                          key={module.id_module}
                          className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l border-gray-200 dark:border-gray-500 whitespace-nowrap"
                        >
                          {module.code || `Module ${module.id_module}`}
                        </th>
                      ))}
                  </React.Fragment>
                ))}
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l-2 border-gray-300 bg-gray-50 dark:bg-gray-800">
                  Moyenne générale
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l border-gray-200 dark:border-gray-500">
                  Absence (h)
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l-2 border-gray-300 bg-gray-50 dark:bg-gray-800">
                  Moyenne avec malus
                </th>
              </tr>
              <tr className="border-b-2 border-gray-300 dark:border-gray-500">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-900"></th>
                {blocsCompetences.map((bloc) => (
                  <React.Fragment key={bloc.id_bloc_comp}>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300 border-l-2 border-gray-300 bg-gray-50 dark:bg-gray-800">
                      {bloc.libelle}
                    </th>
                    {expandedBlocs.includes(bloc.id_bloc_comp) &&
                      bloc.modules.map((module) => (
                        <th
                          key={module.id_module}
                          className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l border-gray-200"
                        >
                          {module.libelle}
                        </th>
                      ))}
                  </React.Fragment>
                ))}
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300 border-l-2 border-gray-300 bg-gray-50 dark:bg-gray-800"></th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l border-gray-200"></th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300 border-l-2 border-gray-300 bg-gray-50 dark:bg-gray-800"></th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr
                    key={student.id_utilisateur}
                    className="border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <td className="py-3 px-4 sticky left-0 bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-300 font-medium">
                      {student.nom} {student.prenom}
                    </td>
                    {blocsCompetences.map((bloc) => (
                      <React.Fragment key={bloc.id_bloc_comp}>
                        <td className="text-center py-3 px-4 border-l-2 border-gray-300 text-black font-bold bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                          {calculateBlocAverage(student, bloc)}
                        </td>
                        {expandedBlocs.includes(bloc.id_bloc_comp) &&
                          bloc.modules.map((module) => {
                            const studentModule = student.moyennes.find(
                              (m) => m.id_module === module.id_module
                            )
                            return (
                              <td
                                key={module.id_module}
                                className="text-center py-3 px-4 border-l border-gray-200 text-black dark:border-gray-500 dark:text-gray-300"
                              >
                                {studentModule ? studentModule.moyenne : '-'}
                              </td>
                            )
                          })}
                      </React.Fragment>
                    ))}
                    <td className="text-center py-3 px-4 border-l-2 border-gray-300 text-black font-bold bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                      {student.moyenneGenerale || '-'}
                    </td>
                    <td className="text-center py-3 px-4 border-l border-gray-200 text-black dark:border-gray-500 dark:text-gray-300">
                      {student.absences || '-'}
                    </td>
                    <td className="text-center py-3 px-4 border-l-2 border-gray-300 text-black font-bold bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                      {student.moyenneAvecMalus || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={blocsCompetences.reduce(
                      (total, bloc) =>
                        total +
                        (expandedBlocs.includes(bloc.id_bloc_comp)
                          ? bloc.modules.length + 1
                          : 1),
                      3
                    )}
                    className="text-center py-6 dark:text-gray-300 border-b border-white"
                  >
                    Aucun étudiant trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
