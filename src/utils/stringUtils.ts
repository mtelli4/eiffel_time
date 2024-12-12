export function capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function capitalizeWords(text: string): string {
    if (!text) return '';
    return text
        .split(' ')
        .map(word => capitalizeFirstLetter(word))
        .join(' ');
}
