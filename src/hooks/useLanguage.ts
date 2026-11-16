import { useContext } from 'react';

import { LanguageContext } from '@/providers/LanguageContext';

/**
 * @returns The language of the interface and the way to change it.
 * @throws When it is used outside {@link LanguageProvider}.
 */
export const useLanguage = () => {
    const context = useContext(LanguageContext);

    // The context is `null` when the hook is used outside the provider, which is a programming error.
    if (!context) throw new Error('useLanguage must be used inside LanguageProvider.');

    return context;
};
