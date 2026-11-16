import { LANGUAGE_STORAGE_KEY } from '@/constants/languages';
import type { Language } from '@/types/language';

/**
 * @returns The language saved by the person, or `null` when there is none or the storage is
 * blocked (e.g. in some private windows).
 */
export const readStoredLanguage = () => {
    try {
        return localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
        return null;
    }
};

/**
 * Saves the language so it is kept on the next visit. A blocked storage is ignored: the choice
 * then lasts until the page is reloaded.
 * @param language - Language the person picked.
 */
export const storeLanguage = (language: Language) => {
    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
        // The language still applies to the current visit.
    }
};
