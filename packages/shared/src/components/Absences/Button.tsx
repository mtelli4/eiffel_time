import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface ButtonProps {
  onPress: () => void
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  disabled?: boolean
}

export function Button({
  onPress,
  children,
  variant = 'primary',
  disabled,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        variant === 'primary' ? styles.primary : styles.outline,
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === 'primary' ? styles.textPrimary : styles.textOutline,
          disabled && styles.textDisabled,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: '#2E3494',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2E3494',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textOutline: {
    color: '#FFFFFF',
  },
  textDisabled: {
    color: '#FFFFFF',
  },
})
