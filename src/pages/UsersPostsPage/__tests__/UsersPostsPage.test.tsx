import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/test/renderWithProviders';

import {
    POST_CARD_TEST_ID,
    POSTS_PANEL_TEST_ID,
} from '../components/PostsPanel/constants/postsPanelTestIds';
import UsersPostsPage from '../UsersPostsPage';

describe('UsersPostsPage', () => {
    it('shows the posts of the user the person selects', async () => {
        const user = userEvent.setup();
        renderWithProviders(<UsersPostsPage />);

        await user.click(await screen.findByRole('button', { name: /Leanne Graham/ }));

        const postsPanel = screen.getByTestId(POSTS_PANEL_TEST_ID);
        expect(await within(postsPanel).findByText('First post')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Leanne Graham/ })).toHaveAttribute(
            'aria-current',
            'true',
        );

        await user.click(screen.getByRole('button', { name: /Ervin Howell/ }));

        expect(await within(postsPanel).findByText('Ervin post')).toBeInTheDocument();
        expect(within(postsPanel).getAllByTestId(POST_CARD_TEST_ID)).toHaveLength(1);
        expect(within(postsPanel).queryByText('First post')).not.toBeInTheDocument();
    });
});
