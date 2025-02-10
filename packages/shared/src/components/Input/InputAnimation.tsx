import { useRef } from 'react'
import { Animated } from 'react-native'

export const createLabelAnimation = (value: string) => {
  const labelAnimation = useRef(new Animated.Value(0)).current

  const animateLabel = (toValue: number) => {
    Animated.timing(labelAnimation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  const handleFocus = () => !value && animateLabel(1)
  const handleBlur = () => !value && animateLabel(0)

  const labelStyle = {
    transform: [
      {
        translateY: labelAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
        }),
      },
      {
        translateX: labelAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -6],
        }),
      },
    ],
    zIndex: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-1, 1],
    }),
    padding: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 8],
    }),
  }

  return { labelAnimation, animateLabel, handleFocus, handleBlur, labelStyle }
}
