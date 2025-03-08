import { Bell } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../../../shared/src/lib/utils'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  date: Date
  read: boolean
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Nouvelle note disponible',
    message: 'Une note a été ajoutée pour le module Développement Web',
    type: 'info',
    date: new Date('2024-03-15T10:00:00'),
    read: false,
  },

  {
    id: '2',
    title: 'Absence signalée',
    message: 'Votre absence du 14 mars a été enregistrée',
    type: 'warning',
    date: new Date('2024-03-14T15:30:00'),
    read: true,
  },
]

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white focus:outline-none"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white dark:text-white bg-red-500 dark:bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-primary rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700 ring-opacity-5 z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Notifications
            </h3>
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Aucune notification
                </p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'p-3 rounded-lg cursor-pointer transition-colors',
                      !notification.read && 'bg-primary-10 dark:bg-gray-400/20',
                      notification.read && 'bg-gray-50 dark:bg-gray-900/30',
                      'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </h4>
                      <span
                        className={cn(
                          'w-2 h-2 rounded-full',
                          !notification.read && 'bg-primary dark:bg-white'
                        )}
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {formatDate(notification.date)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
