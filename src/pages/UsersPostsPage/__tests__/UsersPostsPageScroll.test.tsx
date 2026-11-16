import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/renderWithProviders';

import { POSTS_PANEL_TEST_ID } from '../components/PostsPanel/constants/postsPanelTestIds';
import UsersPostsPage from '../UsersPostsPage';

const scrollIntoView = vi.fn();

/**
 * Simulates the screen size: on mobile only the `max-width` queries match.
 * @param mobile - Whether the screen is as narrow as a phone.
 */
const mockScreen = (mobile: boolean) => {
    vi.stubGlobal('matchMedia', (query: string) => ({
        addEventListener: vi.fn(),
        addListener: vi.fn(),
        matches: mobile && query.includes('max-width'),
        media: query,
        removeEventListener: vi.fn(),
        removeListener: vi.fn(),
    }));
};

/** Renders the page and selects the first user. */
const selectFirstUser = async () => {
    const user = userEvent.setup();
    renderWithProviders(<UsersPostsPage />);
    await user.click(await screen.findByRole('button', { name: /Leanne Graham/ }));
};

describe('UsersPostsPage scroll', () => {
    beforeEach(() => {
        Element.prototype.scrollIntoView = scrollIntoView;
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        scrollIntoView.mockClear();
    });

    it('takes the person to the posts after selecting a user on mobile', async () => {
        mockScreen(true);
        await selectFirstUser();

        expect(scrollIntoView).toHaveBeenCalledTimes(1);
        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
        expect(scrollIntoView.mock.contexts[0]).toBe(screen.getByTestId(POSTS_PANEL_TEST_ID));
    });

    it('does not scroll on desktop, where both panels are in view', async () => {
        mockScreen(false);
        await selectFirstUser();

        expect(scrollIntoView).not.toHaveBeenCalled();
    });
});
