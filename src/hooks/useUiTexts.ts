import type { UiTexts } from '@/types/language';

import { useLanguage } from './useLanguage';

/**
 * @param texts - Texts of a feature in every language.
 * @returns The texts in the language of the interface.
 */
export const useUiTexts = <T>(texts: UiTexts<T>): T => texts[useLanguage().language];
