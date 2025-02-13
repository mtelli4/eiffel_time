import { ChevronDown, Clock, FileDown, FileSpreadsheet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { API_URL, periodeLabels, PlannedHours } from '../../types/types'
import { periode } from '@prisma/client'

interface Grade {
  id: string
  value: number
  maxValue: number
  coefficient: number
  date: string
  name: string
}

interface mbd {
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
  modules: mbd[]
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

type BC = {
  id_bloc_comp: number
  libelle: string
  periode: periode
  modules: {
    id_module: number
    codeapogee: string
    libelle: string
    heures: {
      CM: number
      TD: number
      TP: number
    }
    evaluations: {
      id_evaluation: number
      libelle: string
      date: Date
      notemaximale: number
      coefficient: number
      note: number
      commentaire: string
    }[]
  }[]
}

export function Grades() {
  const [expandedUEs, setExpandedUEs] = useState<string[]>([])
  const [expandedModules, setExpandedModules] = useState<string[]>([])
  const [notes, setNotes] = useState<BC[]>([])
  const id = 3
  
  useEffect(() => {
    fetch(`${API_URL}/api/notes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const notes: BC[] = data.map((bc: any) => ({
          id_bloc_comp: bc.id_bloc_comp,
          libelle: bc.libelle,
          periode: bc.module_bloc_competence[0]?.periode || "",
          modules: bc.module_bloc_competence.map((mbc: any) => ({
            id_module: mbc.module.id_module,
            codeapogee: mbc.module.codeapogee,
            libelle: mbc.module.libelle,
            heures: {
              CM: mbc.module.heures.split(",")[0],
              TD: mbc.module.heures.split(",")[1],
              TP: mbc.module.heures.split(",")[2],
            },
            evaluations: mbc.module.evaluation.map((evaluationItem: any) => ({
              id_evaluation: evaluationItem.id_eval,
              libelle: evaluationItem.libelle,
              date: new Date(evaluationItem.cours.debut),
              notemaximale: evaluationItem.notemaximale,
              coefficient: evaluationItem.coefficient,
              note: evaluationItem.notes[0]?.note || null,
              commentaire: evaluationItem.notes[0]?.commentaire || "",
            })),
          })),
        }));

        setNotes(notes);
      })
      .catch((err) => console.error(err));
  }, [id]);

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
        {notes.map((bc) => (
          <div key={bc.id_bloc_comp} className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => toggleUE(bc.id_bloc_comp.toString())}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div>
                <h2 className="text-lg font-semibold text-primary">
                  {bc.libelle} - {periodeLabels[bc.periode]} {/* prisma periode.bc.periode */}
                </h2>
                {/* <p className="text-sm text-gray-600">
                  ECTS : {bc.ects} • Moyenne : {bc.average.toFixed(2)}/20
                </p> */}
              </div>
              <ChevronDown
                className={cn(
                  'w-5 h-5 transition-transform',
                  expandedUEs.includes(bc.id_bloc_comp.toString()) && 'transform rotate-180'
                )}
              />
            </button>

            {expandedUEs.includes(bc.id_bloc_comp.toString()) && (
              <div className="p-4 border-t">
                <div className="space-y-4">
                  {bc.modules.map((module) => module.evaluations.length > 0 && (
                    <div key={module.id_module} className="bg-gray-50 rounded-lg">
                      <button
                        onClick={() => toggleModule(module.id_module.toString())}
                        className="w-full flex items-center justify-between p-4"
                      >
                        <div>
                          <h3 className="font-medium text-primary">
                            {module.codeapogee} - {module.libelle}
                          </h3>
                          {/* <p className="text-sm text-gray-600">
                            Moyenne : {module.average.toFixed(2)}/20
                          </p> */}
                        </div>
                        <ChevronDown className={cn('w-5 h-5 transition-transform', expandedModules.includes(module.id_module.toString()) && 'transform rotate-180')} />
                      </button>

                      {expandedModules.includes(module.id_module.toString()) && (
                        <div className="p-4 border-t">
                          <div className="mb-4 flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{module.heures.CM}h CM</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{module.heures.TD}h TD</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{module.heures.TP}h TP</span>
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
                                <th className="pb-2 text-sm font-medium text-gray-500">
                                  Commentaire
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {module.evaluations.map((evaluation) => (
                                <tr key={evaluation.id_evaluation} className="border-t">
                                  <td className="py-2 text-sm">
                                    {new Date(evaluation.date).toLocaleDateString(
                                      'fr-FR'
                                    )}
                                  </td>
                                  <td className="py-2">{evaluation.libelle}</td>
                                  <td className="py-2">
                                    {evaluation.note}/{evaluation.notemaximale}
                                  </td>
                                  <td className="py-2">{evaluation.coefficient}</td>
                                  <td className="py-2">-</td>
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
