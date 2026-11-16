import type { UiTexts } from '@/types/language';

/**
 * Texts of the application header, in all supported languages.
 */
const en = {
    languageLabel: 'Language',
    title: 'User Posts Hub',
};

/** Texts of the application header. */
export type AppUiTexts = typeof en;

/**
 * Texts of the application header, in all supported languages.
 */
const es: AppUiTexts = {
    languageLabel: 'Idioma',
    title: 'User Posts Hub',
};

export const appUiTexts: UiTexts<AppUiTexts> = { en, es };
