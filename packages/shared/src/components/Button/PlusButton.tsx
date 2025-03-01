import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'

export const PlusButton: React.FC = () => {
  const [PlusButton, setPlusButton] = useState<React.FC | null>(null)

  useEffect(() => {
    const loadComponent = async () => {
      if (Platform.OS === 'web') {
        const { default: PlusButton } = await import('../../../../web/src/components/Button/PlusButton.web')
        setPlusButton(() => PlusButton)
      } else {
        const { default: PlusButton } = await import('../../../../mobile/src/components/Button/PlusButton.native')
        setPlusButton(() => PlusButton)
      }
    }

    loadComponent().then((r) => r)
  }, [])

  if (!PlusButton) return null // Optionally, you can return a loading indicator here

  return <PlusButton />
}

