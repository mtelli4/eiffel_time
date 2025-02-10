import React from 'react'
  import { Platform } from 'react-native'
import type { CourseModalProps } from '../../types/types'

export function CourseModal(props: CourseModalProps) {
  if (Platform.OS === 'web') {
    const WebCourseModal = React.lazy(
      () => import('../../../../web/src/components/Schedule/CourseModal.web')
    )
    return (
      <React.Suspense fallback={null}>
        <WebCourseModal {...props} />
      </React.Suspense>
    )
  } else {
    const NativeCourseModal = React.lazy(
      () =>
        import('../../../../mobile/src/components/Schedule/CourseModal.native')
    )
    return (
      <React.Suspense fallback={null}>
        <NativeCourseModal {...props} />
      </React.Suspense>
    )
  }
}
