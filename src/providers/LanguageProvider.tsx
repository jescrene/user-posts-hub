import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import type { Language } from '@/types/language';
import { detectLanguage } from '@/utils/detectLanguage';
import { readStoredLanguage, storeLanguage } from '@/utils/languageStorage';

import { LanguageContext } from './LanguageContext';

interface LanguageProviderProps {
    /** Application tree that reads the language. */
    children: ReactNode;
}

/**
 * Keeps the language of the interface. It starts with the saved choice or the browser language,
 * and mirrors it in the `lang` attribute of the page so screen readers pronounce it right.
 * Used by {@link AppProviders}.
 */
const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [language, setLanguageState] = useState<Language>(() =>
        detectLanguage(readStoredLanguage(), navigator.languages ?? [navigator.language]),
    );

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const setLanguage = useCallback((next: Language) => {
        setLanguageState(next);
        storeLanguage(next);
    }, []);

    const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

    return <LanguageContext value={value}>{children}</LanguageContext>;
};

export default LanguageProvider;
