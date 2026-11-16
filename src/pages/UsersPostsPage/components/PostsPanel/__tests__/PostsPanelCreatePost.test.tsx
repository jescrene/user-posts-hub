import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { POSTS_FIXTURE, USERS_FIXTURE } from '@/test/msw/fixtures';
import { POSTS_URL } from '@/test/msw/handlers';
import { server } from '@/test/msw/server';
import { renderWithProviders } from '@/test/renderWithProviders';

import {
    NEW_POST_BODY_INPUT_TEST_ID,
    NEW_POST_ERROR_TEST_ID,
    NEW_POST_SUBMIT_TEST_ID,
    NEW_POST_TITLE_INPUT_TEST_ID,
    POST_CARD_TEST_ID,
    POST_CREATED_SNACKBAR_TEST_ID,
} from '../constants/postsPanelTestIds';
import PostsPanel from '../PostsPanel';

const [LEANNE] = USERS_FIXTURE;
const LEANNE_POSTS_COUNT = POSTS_FIXTURE.filter(({ userId }) => userId === LEANNE.id).length;

/**
 * Renders the panel for Leanne and waits for her posts.
 */
const renderPanel = async () => {
    const user = userEvent.setup();

    renderWithProviders(<PostsPanel user={LEANNE} />);
    await screen.findAllByTestId(POST_CARD_TEST_ID);

    return user;
};

/**
 * @param user - User event instance.
 * @param title - Title of the post.
 * @param body - Text of the post.
 */
const publishPost = async (
    user: ReturnType<typeof userEvent.setup>,
    title: string,
    body: string,
) => {
    await user.type(screen.getByTestId(NEW_POST_TITLE_INPUT_TEST_ID), title);
    await user.type(screen.getByTestId(NEW_POST_BODY_INPUT_TEST_ID), body);
    await user.click(screen.getByTestId(NEW_POST_SUBMIT_TEST_ID));
};

describe('PostsPanel post creation', () => {
    it('shows the created post first, confirms it and clears the form', async () => {
        const user = await renderPanel();

        await publishPost(user, 'Brand new post', 'Hello from the test');

        expect(await screen.findByTestId(POST_CREATED_SNACKBAR_TEST_ID)).toBeInTheDocument();
        const cards = screen.getAllByTestId(POST_CARD_TEST_ID);
        expect(cards).toHaveLength(LEANNE_POSTS_COUNT + 1);
        expect(cards[0]).toHaveTextContent('Brand new post');
        expect(cards[0]).toHaveTextContent('Hello from the test');
        expect(screen.getByTestId(NEW_POST_TITLE_INPUT_TEST_ID)).toHaveValue('');
        expect(screen.getByText(`${LEANNE.name} · 3 posts`)).toBeInTheDocument();
    });

    it('keeps every created post although the API answers with the same id', async () => {
        const user = await renderPanel();

        await publishPost(user, 'First new post', 'One');
        await screen.findByText('First new post');
        await publishPost(user, 'Second new post', 'Two');
        await screen.findByText('Second new post');

        const cards = screen.getAllByTestId(POST_CARD_TEST_ID);
        expect(cards).toHaveLength(LEANNE_POSTS_COUNT + 2);
        expect(cards[0]).toHaveTextContent('Second new post');
        expect(cards[1]).toHaveTextContent('First new post');
    });

    it('shows the error and keeps the values when the post cannot be published', async () => {
        server.use(http.post(POSTS_URL, () => new HttpResponse(null, { status: 500 })));
        const user = await renderPanel();

        await publishPost(user, 'Lost post', 'Never saved');

        expect(await screen.findByTestId(NEW_POST_ERROR_TEST_ID)).toBeInTheDocument();
        expect(screen.getAllByTestId(POST_CARD_TEST_ID)).toHaveLength(LEANNE_POSTS_COUNT);
        expect(screen.getByTestId(NEW_POST_TITLE_INPUT_TEST_ID)).toHaveValue('Lost post');

        await user.type(screen.getByTestId(NEW_POST_TITLE_INPUT_TEST_ID), '!');

        expect(screen.queryByTestId(NEW_POST_ERROR_TEST_ID)).not.toBeInTheDocument();
    });
});
