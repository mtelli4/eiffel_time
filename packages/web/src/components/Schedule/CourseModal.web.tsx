import { MessageSquare, QrCode, X } from 'lucide-react'
import { CourseModalProps } from '../../../../shared/src/types/types'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import { API_URL } from '../../../../shared/src/types/types'
import { Button } from '@shared/components/Button/Button'

export default function WebCourseModal({
  course,
  onClose,
  onPresenceCheck,
}: CourseModalProps) {
  const [showQRCode, setShowQRCode] = useState(false)

  const qrData = JSON.stringify({
    courseId: course.id,
    summary: course.summary,
    date: new Date().toISOString().split('T')[0],
    time: `${course.start}-${course.end}`,
    location: course.location,
  })

  const courseId = 5

  const [data, setData] = useState()

  const presence = async () => {
    const response = await fetch(`${API_URL}/api/qrcode/qrcode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId: courseId }),
    })
    const data = await response.json()
    setData(data)
  }

  const presenceDelete = async () => {
    const response = await fetch(`${API_URL}/api/qrcode/qrcodedelete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId: courseId }),
    })
    const data = await response.json()
    setData(data)
  }

  const handleGenerateQrcode = () => {
    const newShowQRCode = !showQRCode;
    setShowQRCode(newShowQRCode);
    if (newShowQRCode) {
      presence();
    } else {
      presenceDelete();
    }
  }

  const handlePresenceCheck = () => {

  }
  
  // console.log(data)
  
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

        {showQRCode && (
          <div className="mb-6 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
            <QRCodeSVG value={qrData} size={200} />
            <p className="mt-4 text-sm text-gray-600">
              Scannez ce QR Code pour valider votre présence
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleGenerateQrcode}
            className="btn btn-primary flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            {showQRCode ? 'Masquer QR Code' : 'Afficher QR Code'}
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
