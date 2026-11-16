import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import App from '@/App/App';
import { appUiTexts } from '@/constants/appUiTexts';
import { LANGUAGE_STORAGE_KEY } from '@/constants/languages';
import { APP_TEST_ID } from '@/constants/testIds';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('App', () => {
    it('renders the application title', () => {
        renderWithProviders(<App />);

        expect(screen.getByTestId(APP_TEST_ID)).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { level: 1, name: appUiTexts.en.title }),
        ).toBeInTheDocument();
    });

    it('switches the interface to Spanish and keeps the choice', async () => {
        const user = userEvent.setup();
        renderWithProviders(<App />);

        await user.click(screen.getByRole('button', { name: 'Español' }));

        expect(screen.getByText(appUiTexts.es.subtitle)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Español' })).toHaveAttribute(
            'aria-pressed',
            'true',
        );
        expect(document.documentElement).toHaveAttribute('lang', 'es');
        expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('es');
    });
});
