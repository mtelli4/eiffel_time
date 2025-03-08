import Feather from 'react-native-vector-icons/Feather'

const iconButton = {
  marginLeft: 8,
}

interface FileDownloadButtonProps {
  color?: string
  size?: number
}

export default function FileDownButton({ color = "#2E3494", size = 16 }: FileDownloadButtonProps) {
  return (
    <Feather name="download" size={size} color={color} style={iconButton} />
  )
}
