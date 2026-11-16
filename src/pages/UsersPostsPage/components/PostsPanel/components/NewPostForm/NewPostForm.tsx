import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
    NEW_POST_BODY_LABEL,
    NEW_POST_BODY_PLACEHOLDER,
    NEW_POST_FORM_TITLE,
    NEW_POST_SUBMIT_LABEL,
    NEW_POST_SUBMITTING_LABEL,
    NEW_POST_TITLE_LABEL,
    NEW_POST_TITLE_PLACEHOLDER,
} from '../../constants/newPostFormUiTexts';
import {
    NEW_POST_BODY_INPUT_TEST_ID,
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
}

/**
 * Form to write a post for the selected user: a title and a text.
 * Used by {@link PostsPanel}.
 */
const NewPostForm = ({ onSubmit, submitting }: NewPostFormProps) => {
    const { changeValue, errors, handleSubmit, touchField, values } = useNewPostForm({
        onSubmit,
        submitting,
    });

    return (
        <SNewPostForm
            aria-labelledby={FORM_TITLE_ID}
            data-testid={NEW_POST_FORM_TEST_ID}
            noValidate
            onSubmit={handleSubmit}
        >
            <Typography component="h3" id={FORM_TITLE_ID} variant="subtitle1">
                {NEW_POST_FORM_TITLE}
            </Typography>
            <TextField
                error={Boolean(errors.title)}
                helperText={errors.title}
                id={TITLE_INPUT_ID}
                label={NEW_POST_TITLE_LABEL}
                onBlur={() => touchField('title')}
                onChange={({ target }) => changeValue('title', target.value)}
                placeholder={NEW_POST_TITLE_PLACEHOLDER}
                required
                size="small"
                slotProps={{ htmlInput: { 'data-testid': NEW_POST_TITLE_INPUT_TEST_ID } }}
                value={values.title}
            />
            <TextField
                error={Boolean(errors.body)}
                helperText={errors.body}
                id={BODY_INPUT_ID}
                label={NEW_POST_BODY_LABEL}
                minRows={3}
                multiline
                onBlur={() => touchField('body')}
                onChange={({ target }) => changeValue('body', target.value)}
                placeholder={NEW_POST_BODY_PLACEHOLDER}
                required
                size="small"
                slotProps={{ htmlInput: { 'data-testid': NEW_POST_BODY_INPUT_TEST_ID } }}
                value={values.body}
            />
            <SNewPostActions>
                <Button
                    data-testid={NEW_POST_SUBMIT_TEST_ID}
                    endIcon={<SendIcon />}
                    loading={submitting}
                    loadingPosition="end"
                    type="submit"
                    variant="contained"
                >
                    {submitting ? NEW_POST_SUBMITTING_LABEL : NEW_POST_SUBMIT_LABEL}
                </Button>
            </SNewPostActions>
        </SNewPostForm>
    );
};

export default NewPostForm;
