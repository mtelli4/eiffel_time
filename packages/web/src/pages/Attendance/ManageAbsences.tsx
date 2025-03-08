import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
  Check,
  FileDown,
  FileText,
  Filter,
  Search,
  X as XIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import { cn } from '../../../../shared/src/lib/utils'
import { Formation, ManageAbsencesAbsence } from '../../../../shared/src/types/types'
import { approveAbsence, fetchAbsences, rejectAbsence } from '../../../../shared/src/backend/services/absences'
import { dateFormatting } from '../../../../shared/src/utils/stringUtils'
import '../../styles/select-styles.css'

// Définition des options pour la fréquence des alertes
const statusOptions = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'pending', label: 'En attente' },
  { value: 'approved', label: 'Validées' },
  { value: 'rejected', label: 'Refusées' },
  { value: 'unsent', label: 'Non envoyées' },
]

export function ManageAbsences() {
  const [absences, setAbsences] = useState<ManageAbsencesAbsence[]>([])
  const [formations, setFormations] = useState<Formation[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatut, setSelectedStatut] = useState<
    ManageAbsencesAbsence['statut'] | 'all'
  >('all')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [selectedFormation, setSelectedFormation] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [alertFrequency, setAlertFrequency] = useState('immediate')

  useEffect(() => {
    fetchAbsences()
      .then((data) => {
        setAbsences(data.absences)
        setFormations(data.formations)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des absences:', error)
      })
  }, [])

  const handleApprove = async (id_absence: number) => {
    const result = await approveAbsence(id_absence)
    if (!result) return
    setAbsences((prev) =>
      prev.map((abs) =>
        abs.id_absence === id_absence ? { ...abs, statut: 'approved' } : abs
      )
    )
  }

  const handleReject = async (id_absence: number) => {
    const result = await rejectAbsence(id_absence)
    if (!result) return
    setAbsences((prev) =>
      prev.map((abs) =>
        abs.id_absence === id_absence ? { ...abs, statut: 'rejected' } : abs
      )
    )
  }

  const handleExport = (absences: ManageAbsencesAbsence[]) => {
    const doc = new jsPDF()


    // Titre du document
    doc.setFontSize(18)
    doc.text('Liste des Absences', 14, 20)

    // Préparer les données pour autoTable
    const tableData = absences.map((absence) => [
      `${absence.etudiant.nom} ${absence.etudiant.prenom}`,
      absence.module.codeapogee,
      absence.module.libelle,
      dateFormatting(absence.date),
      getStatutText(absence.statut),
    ])

    // Ajouter le tableau
    autoTable(doc, {
      startY: 30,
      head: [['Étudiant', 'Code Apogée', 'Module', 'Date', 'Statut']],
      body: tableData,
      headStyles: {
        fillColor: '#2E3494',
        textColor: 'white'
      },
    })

    // Télécharger le fichier PDF
    doc.save(`absences-${dateFormatting(new Date())}.pdf`)
  }

  const filteredAbsences = absences.filter((absence) => {
    const student = absences.find(
      (s) => s.id_absence === absence.id_absence
    )?.etudiant
    const searchString =
      `${student?.prenom} ${student?.nom} ${absence.module.codeapogee} ${absence.module.libelle}`.toLowerCase()
    const matchesSearch = searchString.includes(searchQuery.toLowerCase())
    const matchesStatut = selectedStatut === 'all' || absence.statut === selectedStatut
    const matchesDateRange = (!startDate || absence.date >= startDate) && (!endDate || absence.date <= endDate)
    const matchesFormation = selectedFormation === null || absence.module.formation.id_formation === selectedFormation
    return matchesSearch && matchesStatut && matchesDateRange && matchesFormation
  })

  filteredAbsences.sort((a, b) => b.date.getTime() - a.date.getTime())

  const getStatutBadgeClass = (statut: ManageAbsencesAbsence['statut']) => {
    switch (statut) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-white'
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-600 dark:text-white'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-600 dark:text-white'
      case 'unsent':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-white'
    }
  }

  const getStatutText = (statut: ManageAbsencesAbsence['statut']) => {
    switch (statut) {
      case 'pending':
        return 'En attente'
      case 'approved':
        return 'Validée'
      case 'rejected':
        return 'Refusée'
      case 'unsent':
        return 'Non envoyée'
    }
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => handleExport(filteredAbsences)}
          className="btn btn-outline dark:bg-primary dark:text-white flex items-center gap-2"
        >
          <FileDown className="w-4 h-4" />
          Exporter en PDF
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un étudiant, un module..."
              className="w-full pl-10 pr-4 py-2 dark:bg-gray-800 dark:text-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline dark:bg-primary dark:text-white flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtres
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Statut
              </label>
              <Select
                defaultValue={statusOptions.find(
                  (option) => option.value === selectedStatut
                )}
                options={statusOptions}
                isSearchable={false}
                onChange={(option) =>
                  setSelectedStatut(
                    option?.value as ManageAbsencesAbsence['statut'] | 'all'
                  )
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
                        : 'var(--select-menu-bg, white)',
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: 'var(--select-text, black)',
                  }),
                }}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                Date de début
              </label>
              <DatePicker
                // showIcon
                calendarIconClassName="w-5 h-5 text-gray-400 dark:text-white"
                selected={startDate ? new Date(startDate) : null}
                onChange={(date: Date | null) => setStartDate(date)}
                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                calendarClassName="dark:bg-gray-800"
                dayClassName={(date) => {
                  const isToday =
                    date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear()

                  const isSelected =
                    endDate &&
                    date.getDate() === new Date(endDate).getDate() &&
                    date.getMonth() === new Date(endDate).getMonth() &&
                    date.getFullYear() === new Date(endDate).getFullYear()

                  if (isSelected) return 'bg-primary text-white'
                  if (isToday) return 'bg-gray-700 text-white'
                  return 'dark:hover:bg-gray-700 dark:text-white'
                }}
                wrapperClassName="w-full"
                dateFormat="dd/MM/yyyy"
                placeholderText="jj/mm/aaaa"
                popperProps={{
                  strategy: 'fixed',
                }}
                customInput={
                  <input
                    className="w-full rounded-lg border border-gray-300 p-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    placeholder="jj/mm/aaaa"
                  />
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date fin
              </label>
              <DatePicker
                selected={endDate ? new Date(endDate) : null}
                onChange={(date: Date | null) => setEndDate(date)}
                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                calendarClassName="dark:bg-gray-800"
                dayClassName={(date) => {
                  const isToday =
                    date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear()

                  const isSelected =
                    endDate &&
                    date.getDate() === new Date(endDate).getDate() &&
                    date.getMonth() === new Date(endDate).getMonth() &&
                    date.getFullYear() === new Date(endDate).getFullYear()

                  if (isSelected) return 'bg-primary text-white'
                  if (isToday) return 'bg-gray-700 text-white'
                  return 'dark:hover:bg-gray-700 dark:text-white'
                }}
                wrapperClassName="w-full"
                dateFormat="dd/MM/yyyy"
                placeholderText="jj/mm/aaaa"
                popperProps={{
                  strategy: 'fixed',
                }}
                customInput={
                  <input
                    className="w-full rounded-lg border border-gray-300 p-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    placeholder="jj/mm/aaaa"
                  />
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Formation
              </label>
              <Select
                options={[...formations].map((formation) => ({
                  value: formation.id_formation,
                  label: formation.libelle,
                }))}
                isClearable
                onChange={(option) => setSelectedFormation(option?.value as number | null)}
                isSearchable
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
                placeholder="Sélectionner une formation"
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200">
              {/* <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                ID
              </th> */}
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                Étudiant
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                Formation
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                Module
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                Date
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                Message
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                Statut
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAbsences.map((absence) => {
              return (
                absence.etudiant.groupes.length > 0 && (
                  <tr
                    key={absence.id_absence}
                    className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {/* <td className="py-3 px-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {absence.id_absence}
                    </div>
                  </td> */}
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {absence.etudiant.nom} {absence.etudiant.prenom}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          {absence.etudiant.groupes
                            .map((groupe) => groupe.libelle)
                            .join(', ')}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          {absence.module.formation.libelle}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-300">
                          {absence.module.codeapogee}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          {absence.module.libelle}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {dateFormatting(absence.date)}
                        </div>
                        {absence.updatedat && (
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            Soumis le{' '}
                            {new Date(absence.updatedat).toLocaleDateString(
                              'fr-FR'
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {absence.message}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          getStatutBadgeClass(absence.statut)
                        )}
                      >
                        {getStatutText(absence.statut)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        {absence.path && (
                          <button
                            onClick={() => window.open(absence.path, '_blank')}
                            className="p-1 text-gray-500 hover:text-primary"
                            title="Voir le justificatif"
                          >
                            <FileText className="w-4 h-4 dark:text-white" />
                          </button>
                        )}
                        {absence.statut === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(absence.id_absence)}
                              className="p-1 text-green-600 dark:text-green-300 hover:text-green-700"
                              title="Valider"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(absence.id_absence)}
                              className="p-1 text-red-600 dark:text-red-300 hover:text-red-700"
                              title="Refuser"
                            >
                              <XIcon className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
