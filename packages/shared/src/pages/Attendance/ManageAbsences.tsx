import { Check, Eye, FileDown, Filter, Search, X as XIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../lib/utils'

interface Student {
  id: string
  firstName: string
  lastName: string
  group: string
}

interface Absence {
  id: string
  studentId: string
  date: string
  module: {
    code: string
    name: string
  }
  professor: string
  status: 'pending' | 'approved' | 'rejected'
  justification?: string
  document?: string
  submissionDate?: string
}

// Mock data
const MOCK_STUDENTS: Student[] = [
  { id: '22001234', firstName: 'Jean', lastName: 'DUPONT', group: 'A1' },
  { id: '22001235', firstName: 'Marie', lastName: 'MARTIN', group: 'A2' },
]

const MOCK_ABSENCES: Absence[] = [
  {
    id: 'abs1',
    studentId: '22001234',
    date: '2024-03-15',
    module: { code: 'M5101', name: 'Développement Web' },
    professor: 'Dr. Martin',
    status: 'pending',
    justification: 'Certificat médical',
    document: 'https://example.com/justification.pdf',
    submissionDate: '2024-03-16',
  },
  {
    id: 'abs2',
    studentId: '22001235',
    date: '2024-03-20',
    module: { code: 'M5102', name: 'Base de données' },
    professor: 'Dr. Dubois',
    status: 'approved',
    justification: 'Rendez-vous médical',
    document: 'https://example.com/justification2.pdf',
    submissionDate: '2024-03-21',
  },
]

export function ManageAbsences() {
  const [absences, setAbsences] = useState<Absence[]>(MOCK_ABSENCES)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<
    Absence['status'] | 'all'
  >('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleApprove = (absenceId: string) => {
    setAbsences((prev) =>
      prev.map((abs) =>
        abs.id === absenceId ? { ...abs, status: 'approved' } : abs
      )
    )
  }

  const handleReject = (absenceId: string) => {
    setAbsences((prev) =>
      prev.map((abs) =>
        abs.id === absenceId ? { ...abs, status: 'rejected' } : abs
      )
    )
  }

  const handleExport = () => {
    console.log('Exporting absences...')
  }

  const filteredAbsences = absences.filter((absence) => {
    const student = MOCK_STUDENTS.find((s) => s.id === absence.studentId)
    const searchString =
      `${student?.firstName} ${student?.lastName} ${absence.module.code} ${absence.module.name}`.toLowerCase()
    const matchesSearch = searchString.includes(searchQuery.toLowerCase())
    const matchesStatus =
      selectedStatus === 'all' || absence.status === selectedStatus
    const matchesDateRange =
      (!startDate || absence.date >= startDate) &&
      (!endDate || absence.date <= endDate)

    return matchesSearch && matchesStatus && matchesDateRange
  })

  const getStatusBadgeClass = (status: Absence['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
    }
  }

  const getStatusText = (status: Absence['status']) => {
    switch (status) {
      case 'pending':
        return 'En attente'
      case 'approved':
        return 'Validée'
      case 'rejected':
        return 'Refusée'
    }
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">
          Gestion des absences
        </h1>
        <button
          onClick={handleExport}
          className="btn btn-outline flex items-center gap-2"
        >
          <FileDown className="w-4 h-4" />
          Exporter
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un étudiant, un module..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtres
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value as Absence['status'] | 'all')
                }
                className="w-full rounded-lg border-gray-300 focus:ring-primary focus:border-primary"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="approved">Validées</option>
                <option value="rejected">Refusées</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date début
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date fin
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Étudiant
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Module
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Date
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Statut
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAbsences.map((absence) => {
              const student = MOCK_STUDENTS.find(
                (s) => s.id === absence.studentId
              )
              return (
                <tr
                  key={absence.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {student?.lastName} {student?.firstName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Groupe {student?.group}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {absence.module.code}
                      </div>
                      <div className="text-sm text-gray-500">
                        {absence.module.name}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {new Date(absence.date).toLocaleDateString('fr-FR')}
                      </div>
                      {absence.submissionDate && (
                        <div className="text-sm text-gray-500">
                          Soumis le{' '}
                          {new Date(absence.submissionDate).toLocaleDateString(
                            'fr-FR'
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getStatusBadgeClass(absence.status)
                      )}
                    >
                      {getStatusText(absence.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {absence.document && (
                        <button
                          onClick={() => window.open(absence.document)}
                          className="p-1 text-gray-500 hover:text-primary"
                          title="Voir le justificatif"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {absence.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(absence.id)}
                            className="p-1 text-green-600 hover:text-green-700"
                            title="Valider"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(absence.id)}
                            className="p-1 text-red-600 hover:text-red-700"
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
