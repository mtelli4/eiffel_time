import Feather from 'react-native-vector-icons/Feather';

const iconButton = {
  marginLeft: 8,
};

interface PlusButtonProps {
  color?: string;
  size?: number;
}

export default function PlusButton({
  color = '#2E3494',
  size = 16,
}: PlusButtonProps) {
  return <Feather name="plus" size={size} color={color} />;
}
