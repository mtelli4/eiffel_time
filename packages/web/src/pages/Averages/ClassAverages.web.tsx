import { cn } from '@shared/lib/utils'
import { ChevronDown, FileDown, FileSpreadsheet } from 'lucide-react'
import React, { useState } from 'react'

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
  grades: Record<string, number>
  ueAverages: Record<string, number>
}

const SEMESTERS = [1, 2, 3, 4, 5, 6]
const GROUPS = ['A1', 'A2', 'B1', 'B2']

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
      { code: 'R5.A.07', name: 'Automatisation de la chaîne de production' },
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
      { code: 'R5.A.07', name: 'Automatisation de la chaîne de production' },
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
    group: 'A1',
    grades: {
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
    ueAverages: {
      UE51: 15.4,
      UE52: 15.7,
      UE53: 15.6,
    },
  },
  {
    id: '22001235',
    firstName: 'Marie',
    lastName: 'MARTIN',
    group: 'A1',
    grades: {
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
      'R5.01': 16.8,
      'R5.02': 17.5,
      'R5.03': 16.3,
    },
    ueAverages: {
      UE51: 16.4,
      UE52: 16.7,
      UE53: 16.6,
    },
  },
]

export default function Averages() {
  const [selectedSemester, setSelectedSemester] = useState<number>()
  const [selectedGroup, setSelectedGroup] = useState<string>('A1')
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
        <h1 className="text-2xl font-bold text-primary">Moyennes</h1>
        <div className="flex gap-3">
          <button
            onClick={handleExportXLSX}
            className="btn btn-outline flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Exporter XLSX
          </button>
          <button
            onClick={handleExportPDF}
            className="btn btn-outline flex items-center gap-2"
          >
            <FileDown className="w-4 h-4" />
            Exporter PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Semestre
            </label>
            <select
              value={selectedSemester || ''}
              onChange={(e) =>
                setSelectedSemester(
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="">Tous les semestres</option>
              {SEMESTERS.map((semester) => (
                <option key={semester} value={semester}>
                  Semestre {semester}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Groupe
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="">Tous les groupes</option>
              {GROUPS.map((group) => (
                <option key={group} value={group}>
                  Groupe {group}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 sticky left-0 bg-white">
                  Étudiant
                </th>
                {UES.map((ue) => (
                  <React.Fragment key={ue.code}>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 border-l-2 border-gray-300 bg-gray-50">
                      <button
                        onClick={() => toggleUE(ue.code)}
                        className="flex items-center gap-2 mx-auto font-bold text-primary"
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
                          className="text-center py-3 px-4 text-sm font-medium text-gray-500 border-l border-gray-200 whitespace-nowrap"
                        >
                          {module.code}
                        </th>
                      ))}
                  </React.Fragment>
                ))}
              </tr>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 sticky left-0 bg-white"></th>
                {UES.map((ue) => (
                  <React.Fragment key={ue.code}>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 border-l-2 border-gray-300 bg-gray-50">
                      {ue.name}
                    </th>
                    {expandedUEs.includes(ue.code) &&
                      ue.modules.map((module) => (
                        <th
                          key={module.code}
                          className="text-center py-3 px-4 text-sm font-medium text-gray-500 border-l border-gray-200"
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
                (student) => student.group === selectedGroup
              ).map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 sticky left-0 bg-white font-medium">
                    {student.lastName} {student.firstName}
                  </td>
                  {UES.map((ue) => (
                    <React.Fragment key={ue.code}>
                      <td className="text-center py-3 px-4 border-l-2 border-gray-300 font-bold bg-gray-50">
                        {student.ueAverages[ue.code]?.toFixed(2) || '-'}
                      </td>
                      {expandedUEs.includes(ue.code) &&
                        ue.modules.map((module) => (
                          <td
                            key={module.code}
                            className="text-center py-3 px-4 border-l border-gray-200"
                          >
                            {student.grades[module.code]?.toFixed(2) || '-'}
                          </td>
                        ))}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
