import { TextInput, View, Text, TouchableOpacity, Platform } from 'react-native'
import { EyeIcon, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { styles } from './InputStyle'

let Feather: any

if (Platform.OS !== 'web') {
  try {
    Feather = require('react-native-vector-icons/Feather').default
  } catch (error) {
    console.error('react-native-vector-icons not available:', error)
  }
}

export interface InputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'password'
  color?: string
  status?: 'normal' | 'error' | 'success'
  helper?: string
  onChangeText?: (text: string) => void
}

const TYPES = {
  text: { secureTextEntry: false },
  password: { secureTextEntry: true },
}

const STATUS = {
  normal: { borderColor: '#2E3494', helperColor: '#2E3494', color: '#2E3494' },
  error: { borderColor: '#FF0000', helperColor: '#FF0000', color: '#FF0000' },
  success: { borderColor: '#00CC00', helperColor: '#00AA00', color: '#2E3494' },
}

export function Input({
  label,
  type = 'text',
  status = 'normal',
  helper,
  onChangeText,
}: InputProps) {
  const { borderColor, helperColor, color } = STATUS[status]
  const [value, setValue] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleClickOnEye = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const renderIcon = () => {
    if (Platform.OS === 'web') {
      return isPasswordVisible ? (
        <EyeIcon color={color} />
      ) : (
        <EyeOff color={color} />
      )
    }
    
    const iconName = isPasswordVisible ? 'eye' : 'eye-off'
    return Feather ? (
      <Feather
        name={iconName}
        color={color}
        size={24}
      />
    ) : null
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        {<Text style={[styles.label, { color }]}>{label}</Text>}
        {type === 'password' && value !== '' && (
          <TouchableOpacity onPress={handleClickOnEye} style={styles.eye}>
            {renderIcon()}
          </TouchableOpacity>
        )}
        <TextInput
          style={[
            styles.input,
            { borderColor },
            { outlineStyle: 'none' } as any,
            { color: "black" }
          ]}
          secureTextEntry={type === 'password' && !isPasswordVisible}
          onChangeText={(text) => {
            onChangeText?.(text)
            setValue(text)
          }}
        />
      </View>
    </View>
  )
}