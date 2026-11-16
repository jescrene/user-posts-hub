import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useUiTexts } from '@/hooks/useUiTexts';

import { newPostFormUiTexts } from '../../constants/newPostFormUiTexts';
import {
    NEW_POST_BODY_INPUT_TEST_ID,
    NEW_POST_ERROR_TEST_ID,
    NEW_POST_FORM_TEST_ID,
    NEW_POST_SUBMIT_TEST_ID,
    NEW_POST_TITLE_INPUT_TEST_ID,
} from '../../constants/postsPanelTestIds';
import type { NewPostValues } from '../../types/newPostValues';
import { useNewPostForm } from './hooks/useNewPostForm';
import { SNewPostActions, SNewPostForm } from './styled';

const FORM_TITLE_ID = 'new-post-form-title';
const TITLE_INPUT_ID = 'new-post-title';
const BODY_INPUT_ID = 'new-post-body';

interface NewPostFormProps {
    /** Creates the post; resolves to whether it was created, so the form is cleared. */
    onSubmit: (values: NewPostValues) => Promise<boolean>;
    /** Whether the post is being sent; the form cannot be sent again meanwhile. */
    submitting: boolean;
    /** Whether the last attempt to publish failed. The typed values are kept to try again. */
    failed: boolean;
    /** Called when the person edits a field, e.g. to hide the error of the last attempt. */
    onEdit: () => void;
}

/**
 * Form to write a post for the selected user: a title and a text.
 * Used by {@link PostsPanel}.
 */
const NewPostForm = ({ failed, onEdit, onSubmit, submitting }: NewPostFormProps) => {
    const { changeValue, errors, handleSubmit, touchField, values } = useNewPostForm({
        onEdit,
        onSubmit,
        submitting,
    });
    const texts = useUiTexts(newPostFormUiTexts);

    return (
        <SNewPostForm
            aria-labelledby={FORM_TITLE_ID}
            data-testid={NEW_POST_FORM_TEST_ID}
            noValidate
            onSubmit={handleSubmit}
        >
            <Typography component="h3" id={FORM_TITLE_ID} variant="subtitle1">
                {texts.formTitle}
            </Typography>
            <TextField
                error={Boolean(errors.title)}
                helperText={errors.title}
                id={TITLE_INPUT_ID}
                label={texts.titleLabel}
                onBlur={() => touchField('title')}
                onChange={({ target }) => changeValue('title', target.value)}
                placeholder={texts.titlePlaceholder}
                required
                size="small"
                slotProps={{ htmlInput: { 'data-testid': NEW_POST_TITLE_INPUT_TEST_ID } }}
                value={values.title}
            />
            <TextField
                error={Boolean(errors.body)}
                helperText={errors.body}
                id={BODY_INPUT_ID}
                label={texts.bodyLabel}
                minRows={3}
                multiline
                onBlur={() => touchField('body')}
                onChange={({ target }) => changeValue('body', target.value)}
                placeholder={texts.bodyPlaceholder}
                required
                size="small"
                slotProps={{ htmlInput: { 'data-testid': NEW_POST_BODY_INPUT_TEST_ID } }}
                value={values.body}
            />
            {failed && (
                <Alert data-testid={NEW_POST_ERROR_TEST_ID} severity="error">
                    {texts.errorText}
                </Alert>
            )}
            <SNewPostActions>
                <Button
                    data-testid={NEW_POST_SUBMIT_TEST_ID}
                    endIcon={<SendIcon />}
                    loading={submitting}
                    loadingPosition="end"
                    type="submit"
                    variant="contained"
                >
                    {submitting ? texts.submittingLabel : texts.submitLabel}
                </Button>
            </SNewPostActions>
        </SNewPostForm>
    );
};

export default NewPostForm;
