import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { USER_SEARCH_INPUT_TEST_ID } from '../../constants/usersPanelTestIds';
import {
    USER_SEARCH_CLEAR_LABEL,
    USER_SEARCH_LABEL,
    USER_SEARCH_PLACEHOLDER,
} from '../../constants/usersPanelUiTexts';

interface UserSearchFieldProps {
    /** Text typed in the search. */
    value: string;
    /** Receives the new search text, or an empty text when the search is cleared. */
    onChange: (value: string) => void;
    /** Whether the search can be used, e.g. not while the users load. */
    disabled?: boolean;
}

/**
 * Search field of the users panel, with a button to clear the text.
 * Used by {@link UsersPanel}.
 */
const UserSearchField = ({ disabled = false, onChange, value }: UserSearchFieldProps) => (
    <TextField
        disabled={disabled}
        fullWidth
        label={USER_SEARCH_LABEL}
        onChange={({ target }) => onChange(target.value)}
        placeholder={USER_SEARCH_PLACEHOLDER}
        size="small"
        slotProps={{
            htmlInput: { 'data-testid': USER_SEARCH_INPUT_TEST_ID },
            input: {
                endAdornment: value && (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={USER_SEARCH_CLEAR_LABEL}
                            edge="end"
                            onClick={() => onChange('')}
                            size="small"
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ),
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                    </InputAdornment>
                ),
            },
        }}
        value={value}
    />
);

export default UserSearchField;
