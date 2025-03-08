import { Edit2, MoreVertical, Paperclip, Search, Send, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { fetchConversations, fetchMessages, fetchUsers, sendMessage } from '../../../../shared/src/backend/services/messaging'
import { cn, roleFinder } from '../../../../shared/src/lib/utils'
import { MessagingConversation, MessagingMessage, MessagingUtilisateur } from '../../../../shared/src/types/types'

export function Messages() {
  // useAuthCheck()

  const [conversations, setConversations] = useState<MessagingConversation[]>(
    []
  )
  const [selectedConversation, setSelectedConversation] =
    useState<MessagingConversation | null>(null)
  const [messages, setMessages] = useState<MessagingMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewConversationModal, setShowNewConversationModal] =
    useState(false)
  const [selectedUsers, setSelectedUsers] = useState<MessagingUtilisateur[]>([])
  const [userSearchQuery, setUserSearchQuery] = useState('')
  const [availableUsers, setAvailableUsers] = useState<MessagingUtilisateur[]>(
    []
  )

  const user = localStorage.getItem('user')
  const userId = user ? JSON.parse(user).id_utilisateur : null

  useEffect(() => {
    const getConversations = async () => {
      try {
        const conversations = await fetchConversations(userId)
        setConversations(conversations)
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des conversations:',
          error
        )
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

  useEffect(() => {
    if (showNewConversationModal) {
      const getUsers = async () => {
        try {
          const users = await fetchUsers(userId)
          setAvailableUsers(users)
        } catch (error) {
          console.error(
            'Erreur lors de la récupération des utilisateurs:',
            error
          )
        }
      }

      getUsers()
    }
  }, [userSearchQuery, showNewConversationModal])

  let filteredUsers = availableUsers.filter(
    (user) => !conversations.some((c) => c.utilisateur.id_utilisateur === user.id_utilisateur)
  )

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: MessagingMessage = {
      id_message: messages.length + 1,
      emetteur: userId,
      recepteur: selectedConversation.utilisateur.id_utilisateur,
      message: newMessage,
      date: new Date().toISOString(),
      vu: false,
    }
    
    message.id_message = await sendMessage(message)

    setMessages([...messages, message])
    setNewMessage('')
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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

  const handleNewConversation = () => {
    setShowNewConversationModal(true)
  }

  const handleCloseNewConversationModal = () => {
    setShowNewConversationModal(false)
    setSelectedUsers([])
    setUserSearchQuery('')
  }

  const handleToggleUserSelection = (user: MessagingUtilisateur) => {
    if (selectedUsers.some((u) => u.id_utilisateur === user.id_utilisateur)) {
      setSelectedUsers(
        selectedUsers.filter((u) => u.id_utilisateur !== user.id_utilisateur)
      )
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  const handleCreateConversation = () => {
    if (selectedUsers.length === 0) return

    // Create a new conversation with the selected user
    // Assuming we're currently just handling single-user conversations
    const newUser = selectedUsers[0]
    const newConversation: MessagingConversation = {
      utilisateur: newUser,
      unread: 0,
      last_message: null as any, // This assumes the API expects this structure
    }

    setConversations([newConversation, ...conversations])
    setSelectedConversation(newConversation)
    setShowNewConversationModal(false)
    setSelectedUsers([])
    setUserSearchQuery('')
  }

  filteredUsers = filteredUsers.filter(
    (user) =>
      user.prenom.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.nom.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.statut.toLowerCase().includes(userSearchQuery.toLowerCase())
  )

  return (
    <div className="h-full">
      <div className="flex h-[calc(100vh-8rem)] bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
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
                      alt={
                        selectedConversation.utilisateur.prenom +
                        ' ' +
                        selectedConversation.utilisateur.nom
                      }
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-600">
                        {selectedConversation.utilisateur.prenom[0] +
                          selectedConversation.utilisateur.nom[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <h2 className="font-medium text-gray-900 dark:text-white">
                      {selectedConversation.utilisateur.prenom +
                        ' ' +
                        selectedConversation.utilisateur.nom}
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
                {messages.map(
                  (message) =>
                    (message.emetteur ===
                      selectedConversation.utilisateur.id_utilisateur ||
                      message.recepteur ===
                        selectedConversation.utilisateur.id_utilisateur) && (
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
                              : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
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
                        <span className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                          {formatTimestamp(message.date)}
                        </span>
                      </div>
                    )
                )}
              </div>

              {/* Zone de saisie */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez votre message..."
                    className="flex-1 px-4 py-2 dark:bg-gray-800 dark:text-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full pl-10 pr-4 py-2  dark:bg-gray-800 dark:text-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              onClick={handleNewConversation}
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
                  'w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
                  selectedConversation?.utilisateur.id_utilisateur ===
                    conversation.utilisateur.id_utilisateur &&
                    'bg-gray-50 dark:bg-gray-800'
                )}
              >
                {conversation.utilisateur.avatar ? (
                  <img
                    src={conversation.utilisateur.avatar}
                    alt={
                      conversation.utilisateur.prenom +
                      ' ' +
                      conversation.utilisateur.nom
                    }
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">
                      {conversation.utilisateur.prenom[0] +
                        conversation.utilisateur.nom[0]}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {conversation.utilisateur.prenom +
                        ' ' +
                        conversation.utilisateur.nom}
                    </p>
                    {conversation.last_message && (
                      <span className="text-xs text-gray-500 dark:text-gray-300">
                        {formatTimestamp(conversation.last_message.date)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-300 text-left">
                    {roleFinder(conversation.utilisateur.statut)}
                  </p>
                  {conversation.last_message && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
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

      {/* Modal de nouvelle conversation */}
      {showNewConversationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative transition-colors duration-200">
            <button
              onClick={handleCloseNewConversationModal}
              className="absolute right-4 top-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-primary dark:text-white mb-6">
              Nouvelle conversation
            </h2>

            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  placeholder="Rechercher un utilisateur..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {selectedUsers.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedUsers.map((user) => (
                  <div
                    key={user.id_utilisateur}
                    className="flex items-center gap-1 bg-primary/10 dark:bg-primary/60 text-primary dark:text-blue-500 px-2 py-1 rounded-full"
                  >
                    <span className="text-sm">
                      {user.prenom + ' ' + user.nom}
                    </span>
                    <button
                      onClick={() => handleToggleUserSelection(user)}
                      className="text-primary dark:text-blue-500 hover:text-primary/80 dark:hover:text-blue-500/80"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="max-h-60 overflow-y-auto mb-6">
              {filteredUsers.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  Aucun utilisateur trouvé
                </p>
              ) : (
                <div className="space-y-2">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id_utilisateur}
                      onClick={() => handleToggleUserSelection(user)}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors',
                        selectedUsers.some(
                          (u) => u.id_utilisateur === user.id_utilisateur
                        )
                          ? 'bg-primary/10 dark:bg-dark-primary/20'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      )}
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.prenom + ' ' + user.nom}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.prenom + ' ' + user.nom}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {roleFinder(user.statut)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleCreateConversation}
              disabled={selectedUsers.length === 0}
              className="w-full btn btn-primary"
            >
              Créer la conversation
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
