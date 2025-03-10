import { useDateFormat } from "../hooks/useDateFormat";
import { format } from "date-fns";
import { Platform } from "react-native";

/*
 * Return the given text with the first letter capitalized and the rest of the text in lowercase.
 *
 * @param text The text to capitalize.
 *
 * @returns The capitalized text.
 */
export function capitalizeFirstLetter(text: string): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/*
 * Return the given text with the first letter of each word capitalized.
 *
 * @param text The text to capitalize.
 *
 * @returns The capitalized text.
 */
export function capitalizeWords(text: string): string {
  if (!text) return ''
  return text
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ')
}

export function dateFormatting(debut: Date, fin?: Date) {
  let dateFormat
  if (Platform.OS === 'web') {
    dateFormat = localStorage.getItem('dateFormat')
  } else {
    import('react-native-mmkv').then(({ MMKV }) => {
      const storage = new MMKV()
      dateFormat = storage.getString('dateFormat')
    })
  }
  if (fin === undefined) {
    return format(debut, dateFormat || 'dd/MM/yyyy')
  }
  const heures = format(debut, 'HH:mm') + ' - ' + format(fin, 'HH:mm')
  return `${format(debut, dateFormat || 'dd/MM/yyyy')} ${heures}`
}
