import { CourseModalProps } from '@shared/types/types'
import { MessageSquare, QrCode, X } from 'lucide-react'

export default function WebCourseModal({
  course,
  onClose,
  onPresenceCheck,
}: CourseModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover\:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-primary mb-4">
          {course.subject}
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Professeur</p>
            <p className="font-medium">{course.professor}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Salle</p>
            <p className="font-medium">{course.room}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Horaire</p>
            <p className="font-medium">
              {course.startTime} - {course.endTime}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Type</p>
            <p className="font-medium">{course.type}</p>
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
