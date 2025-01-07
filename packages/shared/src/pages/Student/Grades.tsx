import { ChevronDown, Clock, FileDown, FileSpreadsheet } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../lib/utils'
import { PlannedHours } from '../../types/types'

interface Grade {
  id: string
  value: number
  maxValue: number
  coefficient: number
  date: string
  name: string
}

interface Module {
  id: string
  code: string
  name: string
  average: number
  grades: Grade[]
  hours: PlannedHours
}

interface UE {
  id: string
  code: string
  name: string
  ects: number
  average: number
  modules: Module[]
}

const MOCK_UES: UE[] = [
  {
    id: 'ue1',
    code: 'UE51',
    name: 'Semestre 5 BC1',
    ects: 10,
    average: 15.4,
    modules: [
      {
        id: 'mod1',
        code: 'M5101',
        name: 'Développement Web',
        average: 15.5,
        hours: {
          CM: 10,
          TD: 20,
          TP: 20,
        },
        grades: [
          {
            id: 'grade1',
            value: 16,
            maxValue: 20,
            coefficient: 1,
            date: '2024-03-15',
            name: 'TP1 - React',
          },
          {
            id: 'grade2',
            value: 15,
            maxValue: 20,
            coefficient: 2,
            date: '2024-03-20',
            name: 'Contrôle Final',
          },
        ],
      },
      {
        id: 'mod2',
        code: 'M5102',
        name: 'Base de données',
        average: 14.8,
        hours: {
          CM: 15,
          TD: 15,
          TP: 15,
        },
        grades: [
          {
            id: 'grade3',
            value: 14,
            maxValue: 20,
            coefficient: 1,
            date: '2024-03-10',
            name: 'TP1 - SQL',
          },
          {
            id: 'grade4',
            value: 15,
            maxValue: 20,
            coefficient: 2,
            date: '2024-03-25',
            name: 'Contrôle Final',
          },
        ],
      },
    ],
  },
]

export function Grades() {
  const [expandedUEs, setExpandedUEs] = useState<string[]>([])
  const [expandedModules, setExpandedModules] = useState<string[]>([])

  const toggleUE = (ueId: string) => {
    setExpandedUEs((prev) =>
      prev.includes(ueId) ? prev.filter((id) => id !== ueId) : [...prev, ueId]
    )
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
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

      <div className="space-y-4">
        {MOCK_UES.map((ue) => (
          <div key={ue.id} className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => toggleUE(ue.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div>
                <h2 className="text-lg font-semibold text-primary">
                  {ue.code} - {ue.name}
                </h2>
                <p className="text-sm text-gray-600">
                  ECTS : {ue.ects} • Moyenne : {ue.average.toFixed(2)}/20
                </p>
              </div>
              <ChevronDown
                className={cn(
                  'w-5 h-5 transition-transform',
                  expandedUEs.includes(ue.id) && 'transform rotate-180'
                )}
              />
            </button>

            {expandedUEs.includes(ue.id) && (
              <div className="p-4 border-t">
                <div className="space-y-4">
                  {ue.modules.map((module) => (
                    <div key={module.id} className="bg-gray-50 rounded-lg">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between p-4"
                      >
                        <div>
                          <h3 className="font-medium text-primary">
                            {module.code} - {module.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Moyenne : {module.average.toFixed(2)}/20
                          </p>
                        </div>
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 transition-transform',
                            expandedModules.includes(module.id) &&
                              'transform rotate-180'
                          )}
                        />
                      </button>

                      {expandedModules.includes(module.id) && (
                        <div className="p-4 border-t">
                          <div className="mb-4 flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{module.hours.CM}h CM</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{module.hours.TD}h TD</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{module.hours.TP}h TP</span>
                            </div>
                          </div>
                          <table className="w-full">
                            <thead>
                              <tr className="text-left">
                                <th className="pb-2 text-sm font-medium text-gray-500">
                                  Date
                                </th>
                                <th className="pb-2 text-sm font-medium text-gray-500">
                                  Évaluation
                                </th>
                                <th className="pb-2 text-sm font-medium text-gray-500">
                                  Note
                                </th>
                                <th className="pb-2 text-sm font-medium text-gray-500">
                                  Coefficient
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {module.grades.map((grade) => (
                                <tr key={grade.id} className="border-t">
                                  <td className="py-2 text-sm">
                                    {new Date(grade.date).toLocaleDateString(
                                      'fr-FR'
                                    )}
                                  </td>
                                  <td className="py-2">{grade.name}</td>
                                  <td className="py-2">
                                    {grade.value}/{grade.maxValue}
                                  </td>
                                  <td className="py-2">{grade.coefficient}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
