import { ChevronDown, FileDown, FileSpreadsheet } from 'lucide-react'
import React, { useState } from 'react'
import Select from 'react-select'
import { cn } from '../../../../shared/src/lib/utils'
import '../../styles/select-styles.css'

interface Module {
  code: string
  name: string
}

interface UE {
  code: string
  name: string
  ects: number
  modules: Module[]
}

interface Student {
  id: string
  firstName: string
  lastName: string
  group: string
  grades: Record<number, Record<string, number>> // semester -> module -> grade
  ueAverages: Record<number, Record<string, number>> // semester -> UE -> average
}

const SEMESTERS = [1, 2, 3, 4, 5, 6]
const GROUPS = ['all', 'A', 'B', 'C']

const UES: UE[] = [
  {
    code: 'UE51',
    name: 'Semestre 5 BC1',
    ects: 10,
    modules: [
      { code: 'S5.A.01', name: 'Développement avancé' },
      { code: 'R5.A.04', name: 'Qualité algorithmique' },
      { code: 'R5.A.05', name: 'Programmation avancée' },
      {
        code: 'R5.A.06',
        name: 'Sensibilisation à la programmation multimédia',
      },
      {
        code: 'R5.A.07',
        name: 'Automatisation de la chaîne de production',
      },
      { code: 'R5.A.08', name: 'Qualité de développement' },
      { code: 'R5.A.09', name: 'Virtualisation avancée' },
      { code: 'R5.A.10', name: 'Nouveaux paradigmes de base de données' },
      { code: 'R5.A.13', name: 'Économie durable et numérique' },
      { code: 'R5.A.14', name: 'Anglais' },
    ],
  },
  {
    code: 'UE52',
    name: 'Semestre 5 BC2',
    ects: 10,
    modules: [
      { code: 'S5.A.01', name: 'Développement avancé' },
      { code: 'R5.A.04', name: 'Qualité algorithmique' },
      { code: 'R5.A.05', name: 'Programmation avancée' },
      {
        code: 'R5.A.06',
        name: 'Sensibilisation à la programmation multimédia',
      },
      { code: 'R5.A.08', name: 'Qualité de développement' },
      { code: 'R5.A.09', name: 'Virtualisation avancée' },
      { code: 'R5.A.10', name: 'Nouveaux paradigmes de base de données' },
      {
        code: 'R5.A.11',
        name: "Méthodes d'optimisation pour l'aide à la décision",
      },
      { code: 'R5.A.12', name: 'Modélisations mathématiques' },
      { code: 'R5.A.14', name: 'Anglais' },
    ],
  },
  {
    code: 'UE53',
    name: 'Semestre 5 BC6',
    ects: 10,
    modules: [
      { code: 'S5.A.01', name: 'Développement avancé' },
      { code: 'R5.01', name: 'Initiation au management' },
      { code: 'R5.02', name: 'Projet personnel et professionnel' },
      { code: 'R5.03', name: 'Politique de Communication' },
      {
        code: 'R5.A.06',
        name: 'Sensibilisation à la programmation multimédia',
      },
      {
        code: 'R5.A.07',
        name: 'Automatisation de la chaîne de production',
      },
      { code: 'R5.A.13', name: 'Économie durable et numérique' },
      { code: 'R5.A.14', name: 'Anglais' },
    ],
  },
]

const STUDENTS: Student[] = [
  {
    id: '22001234',
    firstName: 'Jean',
    lastName: 'DUPONT',
    group: 'A',
    grades: {
      5: {
        'S5.A.01': 15.5,
        'R5.A.04': 14.8,
        'R5.A.05': 16.2,
        'R5.A.06': 15.0,
        'R5.A.07': 14.5,
        'R5.A.08': 16.8,
        'R5.A.09': 15.2,
        'R5.A.10': 14.9,
        'R5.A.11': 15.7,
        'R5.A.12': 16.1,
        'R5.A.13': 15.4,
        'R5.A.14': 14.6,
        'R5.01': 15.8,
        'R5.02': 16.5,
        'R5.03': 15.3,
      },
    },
    ueAverages: {
      5: {
        UE51: 15.4,
        UE52: 15.7,
        UE53: 15.6,
      },
    },
  },
  {
    id: '22001235',
    firstName: 'Marie',
    lastName: 'DURAND',
    group: 'B',
    grades: {
      5: {
        'S5.A.01': 16.5,
        'R5.A.04': 15.8,
        'R5.A.05': 17.2,
        'R5.A.06': 16.0,
        'R5.A.07': 15.5,
        'R5.A.08': 17.8,
        'R5.A.09': 16.2,
        'R5.A.10': 15.9,
        'R5.A.11': 16.7,
        'R5.A.12': 17.1,
        'R5.A.13': 16.4,
        'R5.A.14': 15.6,
      },
    },
    ueAverages: {
      5: {
        UE51: 16.4,
        UE52: 16.7,
        UE53: 16.6,
      },
    },
  },
]

const semesterOptions = [
  { value: 'all', label: 'Tous les semestres' },
  { value: 1, label: 'Semestre 1' },
  { value: 2, label: 'Semestre 2' },
  { value: 3, label: 'Semestre 3' },
  { value: 4, label: 'Semestre 4' },
  { value: 5, label: 'Semestre 5' },
  { value: 6, label: 'Semestre 6' },
]

const groupOptions = [
  { value: 'all', label: 'Tous les groupes' },
  { value: 'A', label: 'Groupe Alpha' },
  { value: 'B', label: 'Groupe Beta' },
  { value: 'C', label: 'Groupe Gamma' },
]

export default function Averages() {
  const [selectedSemester, setSelectedSemester] = useState<string | number>(
    'all'
  ) // Changé à string | number et valeur par défaut à 'all'
  const [selectedGroup, setSelectedGroup] = useState<string>('all')
  const [expandedUEs, setExpandedUEs] = useState<string[]>([])

  const toggleUE = (ueCode: string) => {
    setExpandedUEs((prev) =>
      prev.includes(ueCode)
        ? prev.filter((code) => code !== ueCode)
        : [...prev, ueCode]
    )
  }

  const handleExportXLSX = () => {
    console.log('Exporting to XLSX...')
  }

  const handleExportPDF = () => {
    console.log('Exporting to PDF...')
  }

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
              defaultValue={semesterOptions.find(
                (option) => option.value === selectedSemester
              )}
              options={semesterOptions}
              isSearchable={false}
              onChange={(option) =>
                setSelectedSemester(option?.value as string | number)
              }
              className="w-full dark:text-white"
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
              defaultValue={groupOptions.find(
                (option) => option.value === selectedGroup
              )}
              options={groupOptions}
              isSearchable={false}
              onChange={(option) => setSelectedGroup(option?.value as string)}
              className="w-full dark:text-white"
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
              <tr className="border-b-2 border-gray-300 dark:border-gray-400">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-900">
                  Étudiant
                </th>
                {UES.map((ue) => (
                  <React.Fragment key={ue.code}>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l-2 border-gray-300 bg-gray-50 dark:bg-gray-800">
                      <button
                        onClick={() => toggleUE(ue.code)}
                        className="flex items-center gap-2 mx-auto font-bold text-primary dark:text-white"
                      >
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform',
                            expandedUEs.includes(ue.code) &&
                              'transform rotate-180'
                          )}
                        />
                        {ue.code} (ECTS: {ue.ects})
                      </button>
                    </th>
                    {expandedUEs.includes(ue.code) &&
                      ue.modules.map((module) => (
                        <th
                          key={module.code}
                          className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l border-gray-200 whitespace-nowrap"
                        >
                          {module.code}
                        </th>
                      ))}
                  </React.Fragment>
                ))}
              </tr>
              <tr className="border-b-2 border-gray-300 dark:border-gray-400">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-900"></th>
                {UES.map((ue) => (
                  <React.Fragment key={ue.code}>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300 border-l-2 border-gray-300 bg-gray-50 dark:bg-gray-800">
                      {ue.name}
                    </th>
                    {expandedUEs.includes(ue.code) &&
                      ue.modules.map((module) => (
                        <th
                          key={module.code}
                          className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l border-gray-200"
                        >
                          {module.name}
                        </th>
                      ))}
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {STUDENTS.filter(
                (student) =>
                  selectedGroup === 'all' || student.group === selectedGroup
              ).map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="py-3 px-4 sticky left-0 bg-white dark:bg-gray-900 dark:text-gray-300 font-medium">
                    {student.lastName} {student.firstName}
                  </td>
                  {UES.map((ue) => (
                    <React.Fragment key={ue.code}>
                      <td className="text-center py-3 px-4 border-l-2 border-gray-300 font-bold bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                        {selectedSemester !== 'all'
                          ? student.ueAverages[selectedSemester as number]?.[
                              ue.code
                            ]?.toFixed(2) || '-'
                          : Object.keys(student.ueAverages)
                              .map(
                                (sem) =>
                                  student.ueAverages[parseInt(sem)]?.[ue.code]
                              )
                              .filter((grade) => grade !== undefined)
                              .map((grade) => grade.toFixed(2))
                              .join(', ') || '-'}
                      </td>
                      {expandedUEs.includes(ue.code) &&
                        ue.modules.map((module) => (
                          <td
                            key={module.code}
                            className="text-center py-3 px-4 border-l border-gray-200 dark:text-gray-300"
                          >
                            {selectedSemester !== 'all'
                              ? student.grades[selectedSemester as number]?.[
                                  module.code
                                ]?.toFixed(2) || '-'
                              : Object.keys(student.grades)
                                  .map(
                                    (sem) =>
                                      student.grades[parseInt(sem)]?.[
                                        module.code
                                      ]
                                  )
                                  .filter((grade) => grade !== undefined)
                                  .map((grade) => grade.toFixed(2))
                                  .join(', ') || '-'}
                          </td>
                        ))}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
              {STUDENTS.filter(
                (student) =>
                  selectedGroup === 'all' || student.group === selectedGroup
              ).length === 0 && (
                <tr>
                  <td
                    colSpan={UES.reduce(
                      (total, ue) =>
                        total +
                        (expandedUEs.includes(ue.code)
                          ? ue.modules.length + 1
                          : 1),
                      1
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
