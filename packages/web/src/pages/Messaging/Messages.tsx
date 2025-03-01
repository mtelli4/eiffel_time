import { Edit2, MoreVertical, Paperclip, Search, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn, roleFinder } from '../../../../shared/src/lib/utils'
import { fetchConversations, fetchMessages } from '../../../../shared/src/backend/services/messaging'
import { MessagingConversation, MessagingMessage } from '../../../../shared/src/types/types'
import useAuthCheck from '@shared/hooks/useAuthCheck'

export function Messages() {
  // useAuthCheck()

  const [conversations, setConversations] = useState<MessagingConversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<MessagingConversation | null>(null)
  const [messages, setMessages] = useState<MessagingMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const userId = 3

  useEffect(() => {
    const getConversations = async () => {
      try {
        const conversations = await fetchConversations(userId)
        setConversations(conversations)
      } catch (error) {
        console.error('Erreur lors de la récupération des conversations:', error)
      }
    }

    getConversations()
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      const getMessages = async () => {
        try {
          const messages = await fetchMessages(userId)
          setMessages(messages)
        } catch (error) {
          console.error('Erreur lors de la récupération des messages:', error)
        }
      }

      getMessages()
    }
  }, [selectedConversation])

  const handleSendMessage = () => {
    /* if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: `m${Date.now()}`,
      senderId: '1', // Current user ID
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    }

    setMessages([...messages, message])
    setNewMessage('') */
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
                  {selectedConversation.utilisateur.avatar ? (
                    <img
                      src={selectedConversation.utilisateur.avatar}
                      alt={selectedConversation.utilisateur.prenom + ' ' + selectedConversation.utilisateur.nom}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-600">
                        {selectedConversation.utilisateur.prenom + ' ' + selectedConversation.utilisateur.nom}
                      </span>
                    </div>
                  )}
                  <div>
                    <h2 className="font-medium text-gray-900">
                      {selectedConversation.utilisateur.prenom + ' ' + selectedConversation.utilisateur.nom}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.utilisateur.status === 'online'
                        ? 'En ligne'
                        : formatLastSeen(
                            selectedConversation.utilisateur.lastSeen
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
                {messages.map((message) => (message.emetteur === selectedConversation.utilisateur.id_utilisateur || message.recepteur === selectedConversation.utilisateur.id_utilisateur) && (
                  <div
                    key={'m' + message.id_message}
                    className={cn(
                      'flex flex-col max-w-[70%]',
                      message.emetteur === userId
                        ? 'ml-auto items-end'
                        : 'items-start'
                    )}
                  >
                    <div
                      className={cn(
                        'rounded-lg px-4 py-2',
                        message.emetteur === userId
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900'
                      )}
                    >
                      <p>{message.message}</p>
                      {message.attachments?.map((attachment) => (
                        <a
                          key={attachment.name}
                          href={attachment.url}
                          className={cn(
                            'flex items-center gap-2 mt-2 p-2 rounded',
                            message.emetteur === userId
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
                      {formatTimestamp(message.date)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Zone de saisie */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  {/* <button className="text-gray-500 hover:text-gray-700">
                    <Paperclip className="w-5 h-5" />
                  </button> */}
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
                key={'u' + conversation.utilisateur.id_utilisateur}
                onClick={() => setSelectedConversation(conversation)}
                className={cn(
                  'w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors',
                  selectedConversation?.utilisateur.id_utilisateur === conversation.utilisateur.id_utilisateur && 'bg-gray-50'
                )}
              >
                {conversation.utilisateur.avatar ? (
                  <img
                    src={conversation.utilisateur.avatar}
                    alt={conversation.utilisateur.prenom + ' ' + conversation.utilisateur.nom}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">
                      {conversation.utilisateur.prenom + conversation.utilisateur.nom}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 truncate">
                      {conversation.utilisateur.prenom + ' ' + conversation.utilisateur.nom}
                    </p>
                    {conversation.last_message && (
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(conversation.last_message.date)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {roleFinder(conversation.utilisateur.statut)}
                  </p>
                  {conversation.last_message && (
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.last_message.message}
                    </p>
                  )}
                </div>
                {conversation.unread > 0 && (
                  <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
                    {conversation.unread}
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
