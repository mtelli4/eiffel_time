import React from 'react'
import { Platform } from 'react-native'
import type { AddGradeModalProps } from '../../../types/types'

export function AddGradeModal(props: AddGradeModalProps) {
  if (Platform.OS === 'web') {
    const WebAddGradeModal = React.lazy(
      () =>
        import(
          '../../../../../web/src/components/Grades/Manage/AddGradeModal.web'
        )
    )
    return (
      <React.Suspense fallback={null}>
        <WebAddGradeModal {...props} />
      </React.Suspense>
    )
  } else {
    const MobileAddGradeModal = React.lazy(
      () =>
        import(
          '../../../../../mobile/src/components/Grades/GradesManagement/AddGradeModal.native'
        )
    )
    return (
      <React.Suspense fallback={null}>
        <MobileAddGradeModal {...props} />
      </React.Suspense>
    )
  }
}
