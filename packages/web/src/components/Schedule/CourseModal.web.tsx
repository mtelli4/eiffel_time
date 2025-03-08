import { MessageSquare, QrCode, X } from 'lucide-react'
import { CourseModalProps } from '../../../../shared/src/types/types'

export default function WebCourseModal({
  course,
  onClose,
  onPresenceCheck,
}: CourseModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover\:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-primary dark:text-gray-100 mb-4">
          {course.summary}
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Enseignant(e)
            </p>
            <p className="font-medium text-gray-600 dark:text-gray-300">
              {course.teacher}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Salle</p>
            <p className="font-medium text-gray-600 dark:text-gray-300">
              {course.location}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Horaire</p>
            <p className="font-medium text-gray-600 dark:text-gray-300">
              {course.start} - {course.end}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Groupe(s)
            </p>
            <p className="font-medium text-gray-600 dark:text-gray-300">
              {course.group}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onPresenceCheck}
            className="btn btn-primary flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            Afficher QR Code
          </button>
          <button className="btn btn-outline flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Chat du cours
          </button>
        </div>
      </div>
    </div>
  )
}
