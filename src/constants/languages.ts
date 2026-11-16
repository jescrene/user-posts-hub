import type { Language } from '@/types/language';

/** Languages the interface is available in, in the order they are offered. */
export const LANGUAGES: readonly Language[] = ['en', 'es'];

/** Language used when neither the saved choice nor the browser asks for a supported one. */
export const DEFAULT_LANGUAGE: Language = 'en';

/** Key of the saved language in the browser storage. */
export const LANGUAGE_STORAGE_KEY = 'user-posts-hub.language';

/** Name of each language in that same language, as it is offered to the person. */
export const LANGUAGE_NAMES: Record<Language, string> = {
    en: 'English',
    es: 'Español',
};
