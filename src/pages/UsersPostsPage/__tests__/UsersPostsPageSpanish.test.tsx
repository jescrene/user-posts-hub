import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { LANGUAGE_STORAGE_KEY } from '@/constants/languages';
import { renderWithProviders } from '@/test/renderWithProviders';

import { newPostFormUiTexts } from '../components/PostsPanel/constants/newPostFormUiTexts';
import {
    NEW_POST_BODY_INPUT_TEST_ID,
    NEW_POST_TITLE_INPUT_TEST_ID,
    POSTS_PANEL_TEST_ID,
} from '../components/PostsPanel/constants/postsPanelTestIds';
import { postsPanelUiTexts } from '../components/PostsPanel/constants/postsPanelUiTexts';
import { usersPanelUiTexts } from '../components/UsersPanel/constants/usersPanelUiTexts';
import UsersPostsPage from '../UsersPostsPage';

const FORM = newPostFormUiTexts.es;
const POSTS = postsPanelUiTexts.es;
const USERS = usersPanelUiTexts.es;

describe('UsersPostsPage in Spanish', () => {
    beforeEach(() => {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, 'es');
    });

    it('shows the panels, the validation and the new post in Spanish', async () => {
        const user = userEvent.setup();
        renderWithProviders(<UsersPostsPage />);

        expect(screen.getByRole('region', { name: USERS.title })).toBeInTheDocument();
        expect(screen.getByText(POSTS.noUserText)).toBeInTheDocument();

        await user.click(await screen.findByRole('button', { name: /Leanne Graham/ }));
        const postsPanel = screen.getByTestId(POSTS_PANEL_TEST_ID);
        expect(await within(postsPanel).findByText(/Leanne Graham · \d+ publicaci/)).toBeVisible();

        await user.click(screen.getByRole('button', { name: FORM.submitLabel }));
        expect(screen.getByText(FORM.titleRequired)).toBeInTheDocument();
        expect(screen.getByText(FORM.bodyRequired)).toBeInTheDocument();

        await user.type(screen.getByTestId(NEW_POST_TITLE_INPUT_TEST_ID), 'Hola');
        await user.type(screen.getByTestId(NEW_POST_BODY_INPUT_TEST_ID), 'Primera publicación');
        await user.click(screen.getByRole('button', { name: FORM.submitLabel }));

        expect(await screen.findByText(FORM.createdText)).toBeInTheDocument();
        expect(within(postsPanel).getByText('Hola')).toBeInTheDocument();
    });
});
