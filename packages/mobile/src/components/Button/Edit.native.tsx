import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from "react-native"

interface EditProps {
  onEdit: () => void
}

const iconButton = {
  marginLeft: 8,
}

export function Edit({ onEdit }: EditProps) {
  return (
    <TouchableOpacity style={iconButton} onPress={onEdit}>
      <Feather name="edit" size={16} color="#3498DB" />
    </TouchableOpacity>
  )
}
