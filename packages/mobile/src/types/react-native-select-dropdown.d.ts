// Create this file at: src/types/react-native-select-dropdown.d.ts

import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import 'react-native-select-dropdown';

declare module 'react-native-select-dropdown' {
  export interface SelectDropdownProps {
    data: any[];
    onSelect: (selectedItem: any, index: number) => void;
    defaultValue?: any;
    defaultButtonText?: string;
    buttonTextAfterSelection?: (selectedItem: any, index: number) => string;
    rowTextForSelection?: (item: any, index: number) => string;

    // Style props
    buttonStyle?: StyleProp<ViewStyle>;
    buttonTextStyle?: StyleProp<TextStyle>;
    dropdownStyle?: StyleProp<ViewStyle>;
    rowStyle?: StyleProp<ViewStyle>;
    rowTextStyle?: StyleProp<TextStyle>;

    // Field props
    valueField?: string;
    labelField?: string;
  }
}
