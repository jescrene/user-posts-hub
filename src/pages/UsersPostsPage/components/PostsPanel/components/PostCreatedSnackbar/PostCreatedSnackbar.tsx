import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { NEW_POST_CREATED_TEXT } from '../../constants/newPostFormUiTexts';
import { POST_CREATED_SNACKBAR_TEST_ID } from '../../constants/postsPanelTestIds';

const AUTO_HIDE_MS = 4000;

interface PostCreatedSnackbarProps {
    /** Whether the notice is shown. */
    open: boolean;
    /** Hides the notice, after a few seconds or when the person closes it. */
    onClose: () => void;
}

/**
 * Notice that confirms that the new post was published. It hides itself after a few seconds.
 * Used by {@link PostsPanel}.
 */
const PostCreatedSnackbar = ({ onClose, open }: PostCreatedSnackbarProps) => (
    <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        autoHideDuration={AUTO_HIDE_MS}
        onClose={(_, reason) => reason !== 'clickaway' && onClose()}
        open={open}
    >
        <Alert
            data-testid={POST_CREATED_SNACKBAR_TEST_ID}
            onClose={onClose}
            severity="success"
            variant="filled"
        >
            {NEW_POST_CREATED_TEXT}
        </Alert>
    </Snackbar>
);

export default PostCreatedSnackbar;
