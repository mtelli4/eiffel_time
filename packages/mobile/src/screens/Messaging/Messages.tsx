import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  fetchConversations,
  fetchMessages,
} from '../../../../shared/src/backend/services/messaging';
import {
  MessagingConversation,
  MessagingMessage,
  MessagingUtilisateur,
} from '../../../../shared/src/types/types';

export function Messages() {
  const [conversations, setConversations] = useState<MessagingConversation[]>(
    [],
  );
  const [selectedConversation, setSelectedConversation] =
    useState<MessagingConversation | null>(null);
  const [messages, setMessages] = useState<MessagingMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // États pour le modal de nouvelle conversation
  const [showNewConversationModal, setShowNewConversationModal] =
    useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<MessagingUtilisateur[]>(
    [],
  );
  const [filteredUsers, setFilteredUsers] = useState<MessagingUtilisateur[]>(
    [],
  );
  const [allUsers, setAllUsers] = useState<MessagingUtilisateur[]>([]);

  const userId = 3;

  useEffect(() => {
    const getConversations = async () => {
      try {
        const conversations = await fetchConversations(userId);
        setConversations(conversations);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des conversations:',
          error,
        );
      }
    };

    getConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      const getMessages = async () => {
        try {
          const messages = await fetchMessages(userId);
          setMessages(messages);
        } catch (error) {
          console.error('Erreur lors de la récupération des messages:', error);
        }
      };

      getMessages();
    }
  }, [selectedConversation]);

  // Effet pour filtrer les utilisateurs lors de la recherche
  useEffect(() => {
    // Cette fonction devrait être remplacée par votre appel API réel
    const fetchAllUsers = async () => {
      try {
        // Remplacer par votre appel API pour obtenir tous les utilisateurs
        // Exemple de données simulées
        const usersData = conversations.map(conv => conv.utilisateur);
        setAllUsers(usersData);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des utilisateurs:',
          error,
        );
      }
    };

    fetchAllUsers();
  }, [conversations]);

  // Filtrer les utilisateurs en fonction de la recherche
  useEffect(() => {
    if (userSearchQuery.trim() === '') {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter(user =>
        (user.nom.toLowerCase() + ' ' + user.prenom.toLowerCase()).includes(
          userSearchQuery.toLowerCase(),
        ),
      );
      setFilteredUsers(filtered);
    }
  }, [userSearchQuery, allUsers]);

  const handleSendMessage = () => {
    /* if (!newMessage.trim() || !selectedUser) return;

    const message: Message = {
      id: `m${Date.now()}`,
      senderId: '1', // Current user ID
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages([...messages, message]);
    setNewMessage(''); */
  };

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

  const renderUserItem = ({item}: {item: MessagingConversation}) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => setSelectedConversation(item)}>
      <View style={styles.avatarContainer}>
        <Image
          source={{uri: item.utilisateur.avatar}}
          style={styles.avatarImage}
        />
        {item.utilisateur.status === 'online' && (
          <View style={styles.onlineStatus} />
        )}
      </View>
      <Text style={styles.userName} numberOfLines={1}>
        {item.utilisateur.nom + ' ' + item.utilisateur.prenom}
      </Text>
    </TouchableOpacity>
  );

  const renderAddButton = () => (
    <View style={styles.userItem}>
      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={() => setShowNewConversationModal(true)}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.userName}>Nouveau</Text>
    </View>
  );

  const renderMessage = ({item}: {item: MessagingMessage}) => {
    const isCurrentUser = item.emetteur === userId;

    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.sentMessage : styles.receivedMessage,
        ]}>
        <View
          style={[
            styles.messageBubble,
            isCurrentUser ? styles.sentBubble : styles.receivedBubble,
          ]}>
          <Text
            style={[
              styles.messageText,
              isCurrentUser
                ? styles.sentMessageText
                : styles.receivedMessageText,
            ]}>
            {item.message}
          </Text>
        </View>
        <Text style={styles.timestamp}>{formatTimestamp(item.date)}</Text>
      </View>
    );
  };

  // Fonctions pour le modal de nouvelle conversation
  const handleCloseNewConversationModal = () => {
    setShowNewConversationModal(false);
    setUserSearchQuery('');
    setSelectedUsers([]);
  };

  const handleToggleUserSelection = (user: MessagingUtilisateur) => {
    const isSelected = selectedUsers.some(
      u => u.id_utilisateur === user.id_utilisateur,
    );

    if (isSelected) {
      setSelectedUsers(
        selectedUsers.filter(u => u.id_utilisateur !== user.id_utilisateur),
      );
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleCreateConversation = () => {
    // Logique pour créer une nouvelle conversation
    // À compléter selon votre logique métier
    console.log('Creating conversation with users:', selectedUsers);

    // Fermer le modal après création
    handleCloseNewConversationModal();
  };

  const roleFinder = (statut: string) => {
    // Remplacer par votre logique pour déterminer le rôle
    const roles: {[key: string]: string} = {
      admin: 'Administrateur',
      user: 'Utilisateur',
      manager: 'Gestionnaire',
    };
    return roles[statut] || 'Utilisateur';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.recentUsersContainer}>
        <FlatList
          horizontal
          data={conversations}
          renderItem={renderUserItem}
          keyExtractor={item => item.utilisateur.id_utilisateur.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentUsersList}
          ListFooterComponent={renderAddButton}
        />
      </View>

      {selectedConversation ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.conversationContainer}>
          <View style={styles.selectedUserHeader}>
            <Image
              source={{uri: selectedConversation.utilisateur.avatar}}
              style={styles.selectedUserAvatar}
            />
            <View>
              <Text style={styles.selectedUserName}>
                {selectedConversation.utilisateur.nom +
                  ' ' +
                  selectedConversation.utilisateur.prenom}
              </Text>
              <Text style={styles.selectedUserStatus}>
                {selectedConversation.utilisateur.status === 'online'
                  ? 'En ligne'
                  : 'Hors ligne'}
              </Text>
            </View>
          </View>

          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id_message.toString()}
            contentContainerStyle={styles.messagesList}
            inverted={false}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Écrivez votre message..."
              placeholderTextColor="#666"
              multiline
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !newMessage.trim() && styles.sendButtonDisabled,
              ]}
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}>
              <Icon
                name="send"
                size={24}
                color={newMessage.trim() ? '#fff' : '#666'}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.noConversationContainer}>
          <Text style={styles.noConversationText}>
            Sélectionnez un utilisateur pour commencer une conversation
          </Text>
        </View>
      )}

      {/* Modal de nouvelle conversation */}
      <Modal
        visible={showNewConversationModal}
        transparent={true}
        animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={handleCloseNewConversationModal}
              style={styles.closeButton}>
              <Icon name="x" size={20} color="#6B7280" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Nouvelle conversation</Text>

            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrapper}>
                <Icon
                  name="search"
                  size={20}
                  color="#9CA3AF"
                  style={styles.searchIcon}
                />
                <TextInput
                  value={userSearchQuery}
                  onChangeText={setUserSearchQuery}
                  placeholder="Rechercher un utilisateur..."
                  placeholderTextColor="#6B7280"
                  style={styles.searchInput}
                />
              </View>
            </View>

            {selectedUsers.length > 0 && (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.selectedUsersContainer}
                contentContainerStyle={styles.selectedUsersContent}>
                {selectedUsers.map(user => (
                  <View key={user.id_utilisateur} style={styles.userChip}>
                    <Text style={styles.userChipText}>
                      {user.nom + ' ' + user.prenom}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleToggleUserSelection(user)}>
                      <Icon name="x" size={16} color="#3B82F6" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}

            <View style={styles.userListContainer}>
              {filteredUsers.length === 0 ? (
                <Text style={styles.noUsersText}>Aucun utilisateur trouvé</Text>
              ) : (
                <FlatList
                  data={filteredUsers}
                  keyExtractor={item => item.id_utilisateur.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => handleToggleUserSelection(item)}
                      style={[
                        styles.modalUserItem, // Utiliser un style spécifique pour les éléments du modal
                        selectedUsers.some(
                          u => u.id_utilisateur === item.id_utilisateur,
                        ) && styles.selectedUserItem,
                      ]}>
                      {item.avatar ? (
                        <Image
                          source={{uri: item.avatar}}
                          style={styles.modalAvatar}
                        />
                      ) : (
                        <View style={styles.avatarPlaceholder}>
                          <Icon name="user" size={20} color="#9CA3AF" />
                        </View>
                      )}
                      <View style={styles.userInfo}>
                        <Text style={styles.userNameModal}>
                          {item.nom + ' ' + item.prenom}
                        </Text>
                        <Text style={styles.userRole}>
                          {roleFinder(item.statut)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>

            <TouchableOpacity
              onPress={handleCreateConversation}
              disabled={selectedUsers.length === 0}
              style={[
                styles.createButton,
                selectedUsers.length === 0 && styles.disabledButton,
              ]}>
              <Text style={styles.createButtonText}>Créer la conversation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  recentUsersContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingVertical: 12,
  },
  recentUsersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  recentUsersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  addButton: {
    padding: 4,
  },
  recentUsersList: {
    paddingHorizontal: 16,
  },
  userItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 60,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  addButtonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2E3494',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineStatus: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    marginTop: 4,
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  conversationContainer: {
    flex: 1,
  },
  selectedUserHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  selectedUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  selectedUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  selectedUserStatus: {
    fontSize: 14,
    color: '#666',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
  },
  sentBubble: {
    backgroundColor: '#2E3494',
  },
  receivedBubble: {
    backgroundColor: '#f5f5f5',
  },
  messageText: {
    fontSize: 16,
  },
  sentMessageText: {
    color: '#fff',
  },
  receivedMessageText: {
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  messageInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    fontSize: 16,
    color: '#000',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2E3494',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#f5f5f5',
  },
  noConversationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  noConversationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },

  // Styles pour le modal de nouvelle conversation
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    padding: 24,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  selectedUsersContainer: {
    marginBottom: 16,
  },
  selectedUsersContent: {
    flexDirection: 'row',
  },
  userChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 52, 148, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  userChipText: {
    fontSize: 14,
    color: '#2E3494',
    marginRight: 6,
  },
  userListContainer: {
    maxHeight: 240,
    marginBottom: 24,
  },
  noUsersText: {
    textAlign: 'center',
    color: '#6B7280',
    paddingVertical: 16,
  },
  selectedUserItem: {
    backgroundColor: 'rgba(46, 52, 148, 0.1)',
  },
  modalAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userNameModal: {
    fontWeight: '500',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  createButton: {
    backgroundColor: '#2E3494',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
  },
  // Ajoutez ces styles à votre objet StyleSheet
  modalUserItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    width: '100%', // Assurez-vous que l'élément occupe toute la largeur
  },
});
