import { Platform } from 'react-native'
import { MobileAddGradeModal } from '../../../../mobile/src/components/AddGradeModal.native'
import type { AddGradeModalProps } from '../../types/types'
import { WebAddGradeModal } from '../../../../web/src/components/AddGradeModal.web'

export function AddGradeModal(props: AddGradeModalProps) {
  if (Platform.OS === 'web') {
    return <WebAddGradeModal {...props} />
  }
  return <MobileAddGradeModal {...props} />
}
