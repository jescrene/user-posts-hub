import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { USERS_FIXTURE } from '@/test/msw/fixtures';
import { USERS_URL } from '@/test/msw/handlers';
import { server } from '@/test/msw/server';
import { renderWithProviders } from '@/test/renderWithProviders';

import {
    USER_LIST_ITEM_TEST_ID,
    USER_SEARCH_INPUT_TEST_ID,
    USERS_EMPTY_TEST_ID,
    USERS_ERROR_TEST_ID,
    USERS_LOADING_TEST_ID,
} from '../constants/usersPanelTestIds';
import { USER_SEARCH_CLEAR_LABEL, USERS_RETRY_LABEL } from '../constants/usersPanelUiTexts';
import UsersPanel from '../UsersPanel';

describe('UsersPanel', () => {
    it('shows the loading state and then every user', async () => {
        renderWithProviders(<UsersPanel />);

        expect(screen.getByTestId(USERS_LOADING_TEST_ID)).toBeInTheDocument();
        expect(await screen.findAllByTestId(USER_LIST_ITEM_TEST_ID)).toHaveLength(
            USERS_FIXTURE.length,
        );
        expect(screen.queryByTestId(USERS_LOADING_TEST_ID)).not.toBeInTheDocument();
    });

    it('filters the users by name and clears the search', async () => {
        const user = userEvent.setup();
        renderWithProviders(<UsersPanel />);
        await screen.findAllByTestId(USER_LIST_ITEM_TEST_ID);

        await user.type(screen.getByTestId(USER_SEARCH_INPUT_TEST_ID), 'ervin');

        const items = screen.getAllByTestId(USER_LIST_ITEM_TEST_ID);
        expect(items).toHaveLength(1);
        expect(within(items[0]).getByText('Ervin Howell')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: USER_SEARCH_CLEAR_LABEL }));

        expect(screen.getAllByTestId(USER_LIST_ITEM_TEST_ID)).toHaveLength(USERS_FIXTURE.length);
    });

    it('explains when no user matches the search', async () => {
        const user = userEvent.setup();
        renderWithProviders(<UsersPanel />);
        await screen.findAllByTestId(USER_LIST_ITEM_TEST_ID);

        await user.type(screen.getByTestId(USER_SEARCH_INPUT_TEST_ID), 'nobody');

        expect(screen.getByTestId(USERS_EMPTY_TEST_ID)).toHaveTextContent('nobody');
        expect(screen.queryByTestId(USER_LIST_ITEM_TEST_ID)).not.toBeInTheDocument();
    });

    it('shows the error and loads the users again on retry', async () => {
        server.use(
            http.get(USERS_URL, () => new HttpResponse(null, { status: 500 }), { once: true }),
        );
        const user = userEvent.setup();
        renderWithProviders(<UsersPanel />);

        expect(await screen.findByTestId(USERS_ERROR_TEST_ID)).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: USERS_RETRY_LABEL }));

        expect(await screen.findAllByTestId(USER_LIST_ITEM_TEST_ID)).toHaveLength(
            USERS_FIXTURE.length,
        );
        expect(screen.queryByTestId(USERS_ERROR_TEST_ID)).not.toBeInTheDocument();
    });
});
