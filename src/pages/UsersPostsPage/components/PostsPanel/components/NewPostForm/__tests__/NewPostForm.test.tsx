import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/renderWithProviders';

import {
    NEW_POST_BODY_REQUIRED,
    NEW_POST_TITLE_REQUIRED,
} from '../../../constants/newPostFormUiTexts';
import {
    NEW_POST_BODY_INPUT_TEST_ID,
    NEW_POST_ERROR_TEST_ID,
    NEW_POST_SUBMIT_TEST_ID,
    NEW_POST_TITLE_INPUT_TEST_ID,
} from '../../../constants/postsPanelTestIds';
import NewPostForm from '../NewPostForm';

/**
 * @param result - What `onSubmit` resolves to: whether the post was created.
 * @param failed - Whether the last attempt failed.
 */
const renderForm = (result = true, failed = false) => {
    const onEdit = vi.fn();
    const onSubmit = vi.fn().mockResolvedValue(result);

    renderWithProviders(
        <NewPostForm failed={failed} onEdit={onEdit} onSubmit={onSubmit} submitting={false} />,
    );

    return { onEdit, onSubmit, user: userEvent.setup() };
};

const getTitleInput = () => screen.getByTestId(NEW_POST_TITLE_INPUT_TEST_ID);
const getBodyInput = () => screen.getByTestId(NEW_POST_BODY_INPUT_TEST_ID);

describe('NewPostForm', () => {
    it('does not show errors before the person leaves a field', async () => {
        const { user } = renderForm();

        await user.type(getTitleInput(), 'A');
        await user.clear(getTitleInput());

        expect(screen.queryByText(NEW_POST_TITLE_REQUIRED)).not.toBeInTheDocument();

        await user.tab();

        expect(screen.getByText(NEW_POST_TITLE_REQUIRED)).toBeInTheDocument();
        expect(getTitleInput()).toHaveAttribute('aria-invalid', 'true');
    });

    it('shows both errors and does not send an empty post', async () => {
        const { onSubmit, user } = renderForm();

        await user.type(getTitleInput(), '   ');
        await user.click(screen.getByTestId(NEW_POST_SUBMIT_TEST_ID));

        expect(screen.getByText(NEW_POST_TITLE_REQUIRED)).toBeInTheDocument();
        expect(screen.getByText(NEW_POST_BODY_REQUIRED)).toBeInTheDocument();
        expect(getBodyInput()).toHaveAttribute('aria-invalid', 'true');
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('sends the trimmed values and clears the form once the post is created', async () => {
        const { onSubmit, user } = renderForm();

        await user.type(getTitleInput(), '  My title ');
        await user.type(getBodyInput(), 'My text');
        await user.click(screen.getByTestId(NEW_POST_SUBMIT_TEST_ID));

        expect(onSubmit).toHaveBeenCalledWith({ body: 'My text', title: 'My title' });
        expect(getTitleInput()).toHaveValue('');
        expect(getBodyInput()).toHaveValue('');
    });

    it('keeps the values when the post could not be created', async () => {
        const { user } = renderForm(false);

        await user.type(getTitleInput(), 'My title');
        await user.type(getBodyInput(), 'My text');
        await user.click(screen.getByTestId(NEW_POST_SUBMIT_TEST_ID));

        expect(getTitleInput()).toHaveValue('My title');
        expect(getBodyInput()).toHaveValue('My text');
    });

    it('shows the error of the last attempt and reports each edit', async () => {
        const { onEdit, user } = renderForm(true, true);

        expect(screen.getByTestId(NEW_POST_ERROR_TEST_ID)).toBeInTheDocument();

        await user.type(getTitleInput(), 'A');

        expect(onEdit).toHaveBeenCalled();
    });
});
