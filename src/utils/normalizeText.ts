/**
 * Prepares a text to be compared: lowercase, without accents and without surrounding spaces.
 * @param text - Text to normalize, e.g. " José ".
 * @returns The normalized text, e.g. "jose".
 */
export const normalizeText = (text: string) =>
    text
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .trim();
