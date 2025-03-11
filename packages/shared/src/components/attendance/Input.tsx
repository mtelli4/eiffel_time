import { StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native'

interface InputProps {
  label?: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  error?: string
  isDarkMode?: boolean
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error,
  isDarkMode,
}: InputProps) {
  const colorScheme = useColorScheme()
  isDarkMode = colorScheme === 'dark'

  return (
    <View style={[styles.container, error && styles.containerError]}>
      {label && (
        <Text style={[styles.label, isDarkMode && styles.darkLabel]}>
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={[
          styles.input,
          error && styles.inputError,
          isDarkMode && styles.darkInput,
        ]}
        placeholderTextColor={isDarkMode ? '#9CA3AF' : '#9CA3AF'}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  containerError: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  error: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  // Dark theme styles
  darkLabel: {
    color: '#E5E7EB',
  },
  darkInput: {
    borderColor: '#4B5563',
    color: '#F9FAFB',
    backgroundColor: '#111827',
  },
  darkPlaceholder: {
    color: '#9CA3AF',
  },
})
