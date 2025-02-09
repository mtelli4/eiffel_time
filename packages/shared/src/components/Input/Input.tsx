import { TextInput, View, Text, Animated, TouchableOpacity } from "react-native";
import { EyeIcon, EyeOff } from 'lucide-react';
import { useState } from "react";
import { styles } from "./InputStyle";
// import { createLabelAnimation } from "./InputAnimation";

interface InputProps {
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
  password: { secureTextEntry: true }
}

const STATUS = {
  normal: { borderColor: '#2E3494', helperColor: '#2E3494' },
  error: { borderColor: '#CC0000', helperColor: '#AA0000' },
  success: { borderColor: '#00CC00', helperColor: '#00AA00' }
}

export function Input({
  label,
  color = '#2E3494',
  type = 'text',
  status = 'normal',
  helper,
  onChangeText,
}: InputProps) {
  const { borderColor, helperColor } = STATUS[status]
  const [value, setValue] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleClickOnEye = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        {<Animated.Text style={[styles.label]}>{label}</Animated.Text>}
        {type === 'password' && value !== "" && (
          <TouchableOpacity onPress={handleClickOnEye} style={styles.eye}>
            {isPasswordVisible ? (
              <EyeIcon color={color} />
            ) : (
              <EyeOff color={color} />
            )}
          </TouchableOpacity>
        )}
        <TextInput
          style={[styles.input, { color, borderColor }]}
          secureTextEntry={type === 'password' && !isPasswordVisible}
          onChangeText={(text) => {
            onChangeText?.(text);
            setValue(text)
          }}
        />
      </View>

      {helper &&
        <Text style={[styles.helper, { color: helperColor }]}>
          {helper}
        </Text>}
    </View>
  )
}