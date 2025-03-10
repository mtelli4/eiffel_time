import { Alert, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

interface DeleteProps {
  onDelete: () => void
  confirmMessage?: string
}

const iconButton = {
  marginLeft: 8,
}

export function Delete({ onDelete, confirmMessage = 'Êtes-vous sûr de vouloir supprimer cet élément ?' }: DeleteProps) {
  const handleDelete = () => {
    Alert.alert(
      'Confirmation',
      confirmMessage,
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Supprimer',
          onPress: onDelete
        }
      ]
    )
  }

  return (
    <TouchableOpacity style={iconButton} onPress={handleDelete}>
      <Feather name="trash-2" size={16} color="#E74C3C" />
    </TouchableOpacity>
  )
}
