import { API_URL, MessagingMessage, MessagingConversation } from '../../types/types'

// Fonction pour traiter les données des messages
const processMessagesData = (data: any): MessagingMessage[] => {
  return data.map((message: any) => ({
    id_message: message.id_message,
    emetteur: message.emetteur,
    recepteur: message.recepteur,
    message: message.contenu,
    date: message.createdat,
  }));
}

// Fonction pour traiter les données des conversations
const processConversationsData = (data: any): MessagingConversation[] => {
  return data.map((conversation: any) => ({
    utilisateur: {
      id_utilisateur: conversation.utilisateur.id_utilisateur,
      nom: conversation.utilisateur.nom,
      prenom: conversation.utilisateur.prenom,
      statut: conversation.utilisateur.statut,
      avatar: conversation.avatar || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
      status: conversation.status || 'offline',
      lastSeen: conversation.last_seen || undefined,
    },
    last_message: {
      id_message: conversation.last_message.id_message,
      id_utilisateur: conversation.last_message.emetteur,
      message: conversation.last_message.contenu,
      date: conversation.last_message.createdat,
      vu: conversation.last_message.vu,
    },
    unread: conversation.unread || 0,
  }));
}

// Récupérer les messages d'un utilisateur
export const fetchMessages = async (id: number): Promise<MessagingMessage[]> => {
  const response = await fetch(`${API_URL}/api/messaging/messages/${id}`);
  if (!response.ok) {
    throw new Error('Erreur réseau lors de la récupération des messages.');
  }
  const data = await response.json();
  return processMessagesData(data);
}

// Récupérer les conversations d'un utilisateur
export const fetchConversations = async (id: number): Promise<MessagingConversation[]> => {
  const response = await fetch(`${API_URL}/api/messaging/conversations/${id}`);
  if (!response.ok) {
    throw new Error('Erreur réseau lors de la récupération des conversations.');
  }
  const data = await response.json();
  return processConversationsData(data);
}
