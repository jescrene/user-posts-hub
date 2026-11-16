/** Language the interface can be shown in. */
export type Language = 'en' | 'es';

/**
 * Texts of a feature in every language. Each language must have the same keys, so a text cannot
 * be left without translation.
 */
export type UiTexts<T> = Record<Language, T>;
