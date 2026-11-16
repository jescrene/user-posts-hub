import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import AppProviders from '@/providers/AppProviders';
import { POSTS_FIXTURE, USERS_FIXTURE } from '@/test/msw/fixtures';
import { POSTS_URL, USER_POSTS_URL } from '@/test/msw/handlers';
import { server } from '@/test/msw/server';
import { renderWithProviders } from '@/test/renderWithProviders';

import {
    NEW_POST_BODY_INPUT_TEST_ID,
    NEW_POST_ERROR_TEST_ID,
    NEW_POST_SUBMIT_TEST_ID,
    NEW_POST_TITLE_INPUT_TEST_ID,
    POST_CARD_TEST_ID,
    POST_CREATED_SNACKBAR_TEST_ID,
    POSTS_ERROR_TEST_ID,
} from '../constants/postsPanelTestIds';
import PostsPanel from '../PostsPanel';

const [LEANNE, ERVIN] = USERS_FIXTURE;
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

    it('shows the created post although the posts of the user could not be loaded', async () => {
        server.use(http.get(USER_POSTS_URL, () => new HttpResponse(null, { status: 500 })));
        const user = userEvent.setup();
        renderWithProviders(<PostsPanel user={LEANNE} />);
        await screen.findByTestId(POSTS_ERROR_TEST_ID);

        await publishPost(user, 'Post after error', 'Still visible');

        expect(await screen.findByTestId(POST_CREATED_SNACKBAR_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(POSTS_ERROR_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(POST_CARD_TEST_ID)).toHaveTextContent('Post after error');
    });

    it('keeps another user free and hides the notice of a post sent for someone else', async () => {
        let release = () => {};
        const released = new Promise<void>((resolve) => {
            release = resolve;
        });
        server.use(
            http.post(POSTS_URL, async () => {
                await released;
                return HttpResponse.json(
                    { body: 'Sent slowly', id: 101, title: 'Pending post', userId: LEANNE.id },
                    { status: 201 },
                );
            }),
        );
        const user = userEvent.setup();
        const { rerender } = renderWithProviders(<PostsPanel user={LEANNE} />);
        await screen.findAllByTestId(POST_CARD_TEST_ID);

        await publishPost(user, 'Pending post', 'Sent slowly');
        expect(screen.getByTestId(NEW_POST_SUBMIT_TEST_ID)).toBeDisabled();

        rerender(
            <AppProviders>
                <PostsPanel user={ERVIN} />
            </AppProviders>,
        );
        expect(screen.getByTestId(NEW_POST_SUBMIT_TEST_ID)).toBeEnabled();

        // Let the request end while Ervin is on screen. If it took longer, the notice would show on
        // Leanne below and the test would fail, so the wait cannot hide a bug.
        await act(async () => {
            release();
            await new Promise((resolve) => setTimeout(resolve, 200));
        });
        expect(screen.queryByTestId(POST_CREATED_SNACKBAR_TEST_ID)).not.toBeInTheDocument();

        rerender(
            <AppProviders>
                <PostsPanel user={LEANNE} />
            </AppProviders>,
        );

        // The post belongs to Leanne, and the notice is not shown because she was not on screen.
        expect(await screen.findByText('Pending post')).toBeInTheDocument();
        expect(screen.queryByTestId(POST_CREATED_SNACKBAR_TEST_ID)).not.toBeInTheDocument();
    });
});
