import { Platform } from 'react-native'
import React from 'react'
import type { CourseModalProps } from '../types/types'

export function CourseModal(props: CourseModalProps) {
  if (Platform.OS === 'web') {
    const WebCourseModal = React.lazy(
      () => import('../../../web/src/components/CourseModal.web')
    )
    return (
      <React.Suspense fallback={null}>
        <WebCourseModal {...props} />
      </React.Suspense>
    )
  } else {
    const NativeCourseModal = React.lazy(
      () => import('../../../mobile/src/components/CourseModal.native')
    )
    return (
      <React.Suspense fallback={null}>
        <NativeCourseModal {...props} />
      </React.Suspense>
    )
  }
}
