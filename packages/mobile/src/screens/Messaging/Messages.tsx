import React, {useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Types
interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'offline';
  lastSeen?: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
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
];

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
  },
];

export function Messages() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const message: Message = {
      id: `m${Date.now()}`,
      senderId: '1', // Current user ID
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderUserItem = ({item}: {item: User}) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => setSelectedUser(item)}>
      <View style={styles.avatarContainer}>
        <Image source={{uri: item.avatar}} style={styles.avatarImage} />
        {item.status === 'online' && <View style={styles.onlineStatus} />}
      </View>
      <Text style={styles.userName} numberOfLines={1}>
        {item.name.split(' ')[0]}
      </Text>
    </TouchableOpacity>
  );

  const renderAddButton = () => (
    <View style={styles.userItem}>
      <TouchableOpacity style={styles.addButtonContainer}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.userName}>Nouveau</Text>
    </View>
  );

  const renderMessage = ({item}: {item: Message}) => {
    const isCurrentUser = item.senderId === '1';

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
            {item.content}
          </Text>
        </View>
        <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.recentUsersContainer}>
        <FlatList
          horizontal
          data={MOCK_USERS}
          renderItem={renderUserItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentUsersList}
          ListFooterComponent={renderAddButton}
        />
      </View>

      {selectedUser ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.conversationContainer}>
          <View style={styles.selectedUserHeader}>
            <Image
              source={{uri: selectedUser.avatar}}
              style={styles.selectedUserAvatar}
            />
            <View>
              <Text style={styles.selectedUserName}>{selectedUser.name}</Text>
              <Text style={styles.selectedUserStatus}>
                {selectedUser.status === 'online' ? 'En ligne' : 'Hors ligne'}
              </Text>
            </View>
          </View>

          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messagesList}
            inverted={false}
          />

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachButton}>
              <Icon name="paperclip" size={24} color="#666" />
            </TouchableOpacity>
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
  attachButton: {
    marginRight: 12,
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
});
