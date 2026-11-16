import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { POSTS_FIXTURE, USERS_FIXTURE } from '@/test/msw/fixtures';
import { USER_POSTS_URL } from '@/test/msw/handlers';
import { server } from '@/test/msw/server';
import { renderWithProviders } from '@/test/renderWithProviders';

import {
    POST_CARD_TEST_ID,
    POSTS_EMPTY_TEST_ID,
    POSTS_ERROR_TEST_ID,
    POSTS_LOADING_TEST_ID,
    POSTS_NO_USER_TEST_ID,
} from '../constants/postsPanelTestIds';
import { postsPanelUiTexts } from '../constants/postsPanelUiTexts';
import PostsPanel from '../PostsPanel';

const [LEANNE, , CLEMENTINE] = USERS_FIXTURE;
const LEANNE_POSTS = POSTS_FIXTURE.filter(({ userId }) => userId === LEANNE.id);

describe('PostsPanel', () => {
    it('asks to select a user while no user is selected', () => {
        renderWithProviders(<PostsPanel user={null} />);

        expect(screen.getByTestId(POSTS_NO_USER_TEST_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(POSTS_LOADING_TEST_ID)).not.toBeInTheDocument();
    });

    it('shows the loading state and then the posts of the user', async () => {
        renderWithProviders(<PostsPanel user={LEANNE} />);

        const loadingState = screen.getByTestId(POSTS_LOADING_TEST_ID);
        expect(loadingState).toHaveAttribute('role', 'progressbar');
        expect(within(loadingState).queryAllByRole('listitem')).toHaveLength(0);

        const cards = await screen.findAllByTestId(POST_CARD_TEST_ID);
        expect(cards).toHaveLength(LEANNE_POSTS.length);
        expect(cards[0]).toHaveTextContent(LEANNE_POSTS[0].title);
        expect(screen.getByText(`${LEANNE.name} · 2 posts`)).toBeInTheDocument();
    });

    it('explains when the user has no posts', async () => {
        renderWithProviders(<PostsPanel user={CLEMENTINE} />);

        expect(await screen.findByTestId(POSTS_EMPTY_TEST_ID)).toBeInTheDocument();
    });

    it('shows the error and loads the posts again on retry', async () => {
        server.use(
            http.get(USER_POSTS_URL, () => new HttpResponse(null, { status: 500 }), { once: true }),
        );
        const user = userEvent.setup();
        renderWithProviders(<PostsPanel user={LEANNE} />);

        expect(await screen.findByTestId(POSTS_ERROR_TEST_ID)).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: postsPanelUiTexts.en.retryLabel }));

        expect(await screen.findAllByTestId(POST_CARD_TEST_ID)).toHaveLength(LEANNE_POSTS.length);
    });
});
