import Feather from 'react-native-vector-icons/Feather'

const iconButton = {
  marginLeft: 8,
}

interface FileDownButtonProps {
  color?: string
  size?: number
}

export function FileDownButton({ color = "#2E3494", size = 16 }: FileDownButtonProps) {
  return (
    <Feather name="download" size={size} color={color} style={iconButton} />
  )
}
