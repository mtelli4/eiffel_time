import { TextInput, StyleSheet, View, Text } from 'react-native'

interface InputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'password'
  color?: string
  status?: 'normal' | 'error'
  onChangeText?: (text: string) => void
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: '#2E3494',
    padding: 16,
    borderRadius: 10,
    fontFamily: 'Montserrat',
    fontWeight: 500,
    fontSize: 16,
    color: '#2E3494',
    width: 350,
  },
  // text: {
  //   // marginBottom: 8,
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // }
})

const TYPES = {
  text: { secureTextEntry: false },
  password: { secureTextEntry: true },
}

const STATUS = {
  normal: { borderColor: '#2E3494' },
  error: { borderColor: '#FF0000' },
}

export function Input({
  label,
  placeholder,
  color = '#2E3494',
  type = 'text',
  status = 'normal',
  onChangeText,
}: InputProps) {
  const inputType = TYPES[type]

  return (
    <View>
      {/* <Text style={styles.text}>{label}</Text> */}
      <TextInput
        style={[styles.input, { color: color }]}
        placeholder={placeholder}
        placeholderTextColor={color + '55'}
        {...inputType}
        onChangeText={onChangeText}
      />
    </View>
  )
}
