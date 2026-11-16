import { createContext } from 'react';

import type { Language } from '@/types/language';

/** Language of the interface and the way to change it. */
export interface LanguageContextValue {
    /** Language the interface is shown in. */
    language: Language;
    /** Changes the language and saves the choice. */
    setLanguage: (language: Language) => void;
}

/** Shared by {@link LanguageProvider}; read it with `useLanguage`. */
export const LanguageContext = createContext<LanguageContextValue | null>(null);
