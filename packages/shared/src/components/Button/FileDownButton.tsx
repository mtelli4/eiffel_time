import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'

interface FileDownButtonProps {
  color?: string
  size?: number
}

export function FileDownButton({ color = '#2E3494', size = 16 }: FileDownButtonProps) {
  const [FileDownButton, setFileDownButton] = useState<any>(null)

  useEffect(() => {
    const loadComponent = async () => {
      if (Platform.OS === 'web') {
        const { FileDownButton } = await import('../../../../web/src/components/Button/FileDownButton.web')
        setFileDownButton(() => FileDownButton)
      } else {
        const { FileDownButton } = await import('../../../../mobile/src/components/Button/FileDownButton.native')
        setFileDownButton(() => FileDownButton)
      }
    }

    loadComponent().then((r) => r)
  }, [])

  if (!FileDownButton) return null // Optionally, you can return a loading indicator here

  return <FileDownButton color={color} size={size} />
}

