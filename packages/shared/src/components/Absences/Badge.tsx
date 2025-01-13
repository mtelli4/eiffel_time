import { StyleSheet, Text, View } from 'react-native'

interface BadgeProps {
  children: React.ReactNode
  variant: 'success' | 'warning' | 'error' | 'default'
  style?: object
}

export function Badge({ children, variant, style }: BadgeProps) {
  const variantStyles = {
    success: styles.success,
    warning: styles.warning,
    error: styles.error,
    default: {
        backgroundColor: '#E5E7EB',
        color: '#374151',
    }
  }

  return (
    <View style={[styles.badgeContainer, variantStyles[variant], style]}>
      <Text style={[styles.text, variantStyles[variant]]}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badgeContainer: {
    borderRadius: 9999, // Fully rounded corners for pill shape
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  success: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  warning: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  error: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
  },
})
