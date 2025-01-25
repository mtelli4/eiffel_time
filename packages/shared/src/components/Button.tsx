import { TouchableOpacity, Text, StyleSheet } from 'react-native'

interface ButtonProps {
  label?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary' | 'negative' | 'positive'
  onpress?: () => void
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    outlineWidth: 0,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontWeight: 500,
  },
})

const SIZE_STYLES = {
  small: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 24 },
  medium: { fontSize: 20, paddingVertical: 16, paddingHorizontal: 32 },
  large: { fontSize: 24, paddingVertical: 20, paddingHorizontal: 40 },
}

const VARIANT_STYLES = {
  primary: { backgroundColor: '#2E3494', color: '#FFFFFF' },
  secondary: { backgroundColor: '#FFFFFF', color: '#2E3494' },
  negative: { backgroundColor: '#BB0000', color: '#FFFFFF' },
  positive: { backgroundColor: '#009951', color: '#FFFFFF' },
}

export function Button({
  label = 'Button',
  size = 'medium',
  variant = 'primary',
  onpress,
}: ButtonProps) {
  const { fontSize, paddingVertical, paddingHorizontal } = SIZE_STYLES[size];
  const { backgroundColor, color } = VARIANT_STYLES[variant];

  return (
    <TouchableOpacity
      onPress={onpress}
      style={[
        styles.button,
        { backgroundColor, paddingVertical, paddingHorizontal },
      ]}
    >
      <Text
        style={[
          styles.text,
          { fontSize, color },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}