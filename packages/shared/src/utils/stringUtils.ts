import { format } from "date-fns";

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

export function getTime(debut: Date, fin: Date) {
  const date = debut.toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  return `${date} : ${debut.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - ${fin.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
}

export function dateFormatting(debut: Date, fin?: Date) {
  const dateFormat = localStorage.getItem('dateFormat') || 'dd/MM/yyyy'
  if (fin === undefined) {
    return format(debut, dateFormat)
  }
  const heures = format(debut, 'HH:mm') + ' - ' + format(fin, 'HH:mm')
  return `${format(debut, dateFormat)} ${heures}`
}
