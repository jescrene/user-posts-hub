import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { useUiTexts } from '@/hooks/useUiTexts';

import { USER_SEARCH_INPUT_TEST_ID } from '../../constants/usersPanelTestIds';
import { usersPanelUiTexts } from '../../constants/usersPanelUiTexts';

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
const UserSearchField = ({ disabled = false, onChange, value }: UserSearchFieldProps) => {
    const texts = useUiTexts(usersPanelUiTexts);

    return (
        <TextField
            disabled={disabled}
            fullWidth
            label={texts.searchLabel}
            onChange={({ target }) => onChange(target.value)}
            placeholder={texts.searchPlaceholder}
            size="small"
            slotProps={{
                htmlInput: { 'data-testid': USER_SEARCH_INPUT_TEST_ID },
                input: {
                    endAdornment: value && (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={texts.clearSearchLabel}
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
};

export default UserSearchField;
