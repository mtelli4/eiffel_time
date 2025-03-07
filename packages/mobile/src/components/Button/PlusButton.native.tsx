import {TouchableOpacity, useColorScheme} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const iconButton = {
  marginLeft: 8,
};

export default function PlusButton() {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#FFFFFF' : '#2E3494';

  return (
    <TouchableOpacity style={iconButton}>
      <Feather name="plus" size={16} color={iconColor} />
    </TouchableOpacity>
  );
}
