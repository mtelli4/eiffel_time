// shared/ClassAverages.tsx

import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'

export const ClassAverages: React.FC = () => {
  const [Component, setComponent] = useState<React.FC | null>(null)

  useEffect(() => {
    const loadComponent = async () => {
      if (Platform.OS === 'web') {
        const { default: ClassAverages } = await import(
          '../../../../web/src/pages/Averages/ClassAverages.web'
        )
        setComponent(() => ClassAverages)
      } else {
        const { default: ClassAverages } = await import(
          '../../../../mobile/src/screens/Averages/ClassAverages.native'
        )
        setComponent(() => ClassAverages)
      }
    }

    loadComponent()
  }, [])

  if (!Component) return null // Optionally, you can return a loading indicator here

  return <Component />
}

export default ClassAverages
