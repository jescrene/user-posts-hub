import { describe, expect, it } from 'vitest';

import { detectLanguage } from '../detectLanguage';

describe('detectLanguage', () => {
    it('keeps the language the person saved', () => {
        expect(detectLanguage('es', ['en-US'])).toBe('es');
    });

    it('uses the first supported language of the browser, whatever its region', () => {
        expect(detectLanguage(null, ['fr-FR', 'es-CO', 'en-US'])).toBe('es');
    });

    it('ignores a saved value that is not a supported language', () => {
        expect(detectLanguage('fr', ['en-GB'])).toBe('en');
    });

    it('falls back to English when no language is supported', () => {
        expect(detectLanguage(null, ['fr-FR', 'de-DE'])).toBe('en');
    });
});
