import { Edit2, MoreVertical, Paperclip, Search, Send } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../../../shared/src/lib/utils'

interface User {
  id: string
  name: string
  role: string
  avatar?: string
  status: 'online' | 'offline'
  lastSeen?: string
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  read: boolean
  attachments?: {
    name: string
    url: string
    type: string
  }[]
}

interface Conversation {
  id: string
  participants: User[]
  lastMessage?: Message
  unreadCount: number
}

// Données de démonstration
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    role: 'Professeur',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    status: 'online',
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    role: 'Étudiant',
    avatar:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    status: 'offline',
    lastSeen: '2024-03-15T14:30:00',
  },
]

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    participants: [MOCK_USERS[0]],
    lastMessage: {
      id: 'm1',
      senderId: '1',
      content:
        'Bonjour, pouvez-vous me confirmer la date du prochain contrôle ?',
      timestamp: '2024-03-15T15:30:00',
      read: false,
    },
    unreadCount: 1,
  },
  {
    id: '2',
    participants: [MOCK_USERS[1]],
    lastMessage: {
      id: 'm2',
      senderId: '2',
      content: 'Merci pour les documents du cours.',
      timestamp: '2024-03-15T14:00:00',
      read: true,
    },
    unreadCount: 0,
  },
]

const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: '1',
    content: 'Bonjour, pouvez-vous me confirmer la date du prochain contrôle ?',
    timestamp: '2024-03-15T15:30:00',
    read: false,
  },
  {
    id: 'm2',
    senderId: '2',
    content: 'Bien sûr, le contrôle aura lieu le 25 mars.',
    timestamp: '2024-03-15T15:32:00',
    read: true,
  },
  {
    id: 'm3',
    senderId: '1',
    content: 'Merci beaucoup !',
    timestamp: '2024-03-15T15:33:00',
    read: false,
    attachments: [
      {
        name: 'cours.pdf',
        url: 'https://example.com/cours.pdf',
        type: 'application/pdf',
      },
    ],
  },
]

export function Messages() {
  const [conversations, setConversations] =
    useState<Conversation[]>(MOCK_CONVERSATIONS)
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: `m${Date.now()}`,
      senderId: '1', // Current user ID
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatLastSeen = (lastSeen?: string) => {
    if (!lastSeen) return ''
    const date = new Date(lastSeen)
    return `Vu pour la dernière fois ${date.toLocaleString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'long',
    })}`
  }

  return (
    <div className="h-full">
      <div className="flex h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Zone de conversation */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* En-tête */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedConversation.participants[0].avatar ? (
                    <img
                      src={selectedConversation.participants[0].avatar}
                      alt={selectedConversation.participants[0].name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-600">
                        {selectedConversation.participants[0].name[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <h2 className="font-medium text-gray-900">
                      {selectedConversation.participants[0].name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.participants[0].status === 'online'
                        ? 'En ligne'
                        : formatLastSeen(
                            selectedConversation.participants[0].lastSeen
                          )}
                    </p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex flex-col max-w-[70%]',
                      message.senderId === '1'
                        ? 'ml-auto items-end'
                        : 'items-start'
                    )}
                  >
                    <div
                      className={cn(
                        'rounded-lg px-4 py-2',
                        message.senderId === '1'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900'
                      )}
                    >
                      <p>{message.content}</p>
                      {message.attachments?.map((attachment) => (
                        <a
                          key={attachment.name}
                          href={attachment.url}
                          className={cn(
                            'flex items-center gap-2 mt-2 p-2 rounded',
                            message.senderId === '1'
                              ? 'bg-white/10 text-white'
                              : 'bg-white text-primary'
                          )}
                        >
                          <Paperclip className="w-4 h-4" />
                          <span>{attachment.name}</span>
                        </a>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Zone de saisie */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez votre message..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage()
                      }
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="btn btn-primary"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Sélectionnez une conversation pour commencer</p>
            </div>
          )}
        </div>

        {/* Liste des conversations */}
        <div className="w-80 border-l border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une conversation..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              onClick={() => {
                /* Ouvrir nouvelle conversation */
              }}
              className="mt-4 w-full btn btn-primary flex items-center justify-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Nouvelle conversation
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100%-5rem)]">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={cn(
                  'w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors',
                  selectedConversation?.id === conversation.id && 'bg-gray-50'
                )}
              >
                {conversation.participants[0].avatar ? (
                  <img
                    src={conversation.participants[0].avatar}
                    alt={conversation.participants[0].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">
                      {conversation.participants[0].name[0]}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 truncate">
                      {conversation.participants[0].name}
                    </p>
                    {conversation.lastMessage && (
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(conversation.lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {conversation.participants[0].role}
                  </p>
                  {conversation.lastMessage && (
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage.content}
                    </p>
                  )}
                </div>
                {conversation.unreadCount > 0 && (
                  <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
                    {conversation.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
