import { useEffect, useState } from 'react'
import { Platform } from 'react-native'

type ComponentType = React.ComponentType<any>

export function useEditDeleteLoader() {
  const [Edit, setEdit] = useState<ComponentType | null>(null)
  const [Delete, setDelete] = useState<ComponentType | null>(null)

  useEffect(() => {
    const loadComponents = async () => {
      if (Platform.OS === 'web') {
        const { Edit } = await import(
          '../../../../web/src/components/Button/Edit.web'
        )
        const { Delete } = await import(
          '../../../../web/src/components/Button/Delete.web'
        )
        setEdit(() => Edit)
        setDelete(() => Delete)
      } else {
        const { Edit } = await import(
          '../../../../mobile/src/components/Button/Edit.native'
        )
        const { Delete } = await import(
          '../../../../mobile/src/components/Button/Delete.native'
        )
        setEdit(() => Edit)
        setDelete(() => Delete)
      }
    }

    loadComponents().then((r) => r)
  }, [])

  return { Edit, Delete }
}
