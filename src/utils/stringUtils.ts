/*
 * Return the given text with the first letter capitalized and the rest of the text in lowercase.
 *
 * @param text The text to capitalize.
 *
 * @returns The capitalized text.
 */
export function capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/*
 * Return the given text with the first letter of each word capitalized.
 *
 * @param text The text to capitalize.
 *
 * @returns The capitalized text.
 */
export function capitalizeWords(text: string): string {
    if (!text) return '';
    return text
        .split(' ')
        .map(word => capitalizeFirstLetter(word))
        .join(' ');
}
