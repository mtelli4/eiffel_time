import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'

export const FileDownButton: React.FC = () => {
  const [FileDownButton, setFileDownButton] = useState<React.FC | null>(null)

  useEffect(() => {
    const loadComponent = async () => {
      if (Platform.OS === 'web') {
        const { default: FileDownButton } = await import('../../../../web/src/components/Button/FileDownButton.web')
        setFileDownButton(() => FileDownButton)
      } else {
        const { default: FileDownButton } = await import('../../../../mobile/src/components/Button/FileDownButton.native')
        setFileDownButton(() => FileDownButton)
      }
    }

    loadComponent().then((r) => r)
  }, [])

  if (!FileDownButton) return null // Optionally, you can return a loading indicator here

  return <FileDownButton />
}

