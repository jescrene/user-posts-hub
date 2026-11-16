import { DEFAULT_LANGUAGE, LANGUAGES } from '@/constants/languages';
import type { Language } from '@/types/language';

/**
 * @param value - Any value, e.g. read from the browser storage.
 * @returns Whether the value is a supported language.
 */
export const isLanguage = (value: unknown): value is Language =>
    LANGUAGES.includes(value as Language);

/**
 * Picks the language of the interface: the saved choice first, then the first supported language
 * of the browser (so "es-CO" gives Spanish), and English otherwise.
 * @param stored - Language saved by the person, or `null`.
 * @param browserLanguages - Languages of the browser, in order of preference.
 */
export const detectLanguage = (
    stored: string | null,
    browserLanguages: readonly string[],
): Language => {
    if (isLanguage(stored)) return stored;

    const browserLanguage = browserLanguages
        .map((tag) => tag.slice(0, 2).toLowerCase())
        .find(isLanguage);

    return browserLanguage ?? DEFAULT_LANGUAGE;
};
