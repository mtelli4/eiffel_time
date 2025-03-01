import { useEffect, useState, useCallback } from 'react'
import { Platform } from 'react-native'

type ComponentType = React.ComponentType<any>

export function useEditDeleteLoader() {
  const [Edit, setEdit] = useState<ComponentType | null>(null)
  const [Delete, setDelete] = useState<ComponentType | null>(null)

  const loadComponents = useCallback(async () => {
    try {
      if (Platform.OS === 'web') {
        const { Edit: WebEdit } = await import(
          '../../../../web/src/components/Button/Edit.web'
        )
        const { Delete: WebDelete } = await import(
          '../../../../web/src/components/Button/Delete.web'
        )
        setEdit(() => WebEdit)
        setDelete(() => WebDelete)
      } else {
        const { Edit: NativeEdit } = await import(
          '../../../../mobile/src/components/Button/Edit.native'
        )
        const { Delete: NativeDelete } = await import(
          '../../../../mobile/src/components/Button/Delete.native'
        )
        setEdit(() => NativeEdit)
        setDelete(() => NativeDelete)
      }
    } catch (error) {
      console.error('Failed to load components:', error)
    }
  }, [])

  useEffect(() => {
    loadComponents()
  }, [loadComponents])

  return { Edit, Delete }
}
