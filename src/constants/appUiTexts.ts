import type { UiTexts } from '@/types/language';

/**
 * Texts of the application header, in all supported languages.
 */
const en = {
    languageLabel: 'Language',
    subtitle: 'Browse the users of JSONPlaceholder and share new posts.',
    title: 'User Posts Hub',
};

/** Texts of the application header. */
export type AppUiTexts = typeof en;

/**
 * Texts of the application header, in all supported languages.
 */
const es: AppUiTexts = {
    languageLabel: 'Idioma',
    subtitle: 'Explora los usuarios de JSONPlaceholder y comparte nuevas publicaciones.',
    title: 'User Posts Hub',
};

export const appUiTexts: UiTexts<AppUiTexts> = { en, es };
