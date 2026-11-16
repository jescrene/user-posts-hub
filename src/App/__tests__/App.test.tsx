import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '@/App/App';
import { APP_TITLE } from '@/constants/appUiTexts';
import { APP_TEST_ID } from '@/constants/testIds';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('App', () => {
    it('renders the application title', () => {
        renderWithProviders(<App />);

        expect(screen.getByTestId(APP_TEST_ID)).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1, name: APP_TITLE })).toBeInTheDocument();
    });
});
