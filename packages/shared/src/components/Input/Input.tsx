import { TextInput, View, Text, TouchableOpacity } from 'react-native'
import { EyeIcon, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { styles } from './InputStyle'

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
  // color = '#2E3494',
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

  return (
    <View>
      <View style={styles.inputContainer}>
        {<Text style={[styles.label, { color }]}>{label}</Text>}
        {type === 'password' && value !== '' && (
          <TouchableOpacity onPress={handleClickOnEye} style={styles.eye}>
            {isPasswordVisible ? (
              <EyeIcon color={color} />
            ) : (
              <EyeOff color={color} />
            )}
          </TouchableOpacity>
        )}
        <View style={styles.helperContainer}>
          <TextInput
            style={[
              styles.input,
              { borderColor },
              { outlineStyle: 'none' } as any,
            ]}
            secureTextEntry={type === 'password' && !isPasswordVisible}
            onChangeText={(text) => {
              onChangeText?.(text)
              setValue(text)
            }}
          />
          {helper && (
            <Text style={[styles.helper, { color: helperColor }]}>
              {helper}
            </Text>
          )}
        </View>
      </View>
    </View>
  )
}
