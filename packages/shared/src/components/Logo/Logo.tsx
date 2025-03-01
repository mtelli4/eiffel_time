import { View, Image, Text, ImageSourcePropType } from 'react-native'
import { styles } from './LogoStyle'

interface LogoProps {
  source?: ImageSourcePropType
  label?: string
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
}

const SIZES = {
  xsmall: 16,
  small: 24,
  medium: 32,
  large: 40,
  xlarge: 48,
}

export function Logo({ source, label, size = 'medium' }: LogoProps) {
  return (
    <View style={[styles.container, { gap: SIZES[size] / 2 }]}>
      <Image
        source={source}
        style={{ width: SIZES[size] + 32, height: SIZES[size] + 32 }}
      />
      <Text style={{ ...styles.text, fontSize: SIZES[size] }}>{label}</Text>
    </View>
  )
}
