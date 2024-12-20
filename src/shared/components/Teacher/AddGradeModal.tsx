import { useState } from 'react'
import {
  Button,
  /*Picker,*/ Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Platform } from 'react-native'
import { GradeStatus } from '../../../shared/types/types'
import { WebAddGradeModal } from '../../../web/components/AddGradeModal.web'
import { MobileAddGradeModal } from '../../../mobile/components/AddGradeModal.native'
import type { AddGradeModalProps } from '../../types/types'

export function AddGradeModal(props: AddGradeModalProps) {
  if (Platform.OS === 'web') {
    return <WebAddGradeModal {...props} />
  }
  return <MobileAddGradeModal {...props} />
}
