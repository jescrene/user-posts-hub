import List from '@mui/material/List';
import { styled } from '@mui/material/styles';

/**
 * List of users. On desktop it scrolls inside the panel so the posts stay in view.
 */
export const SUserList = styled(List)(({ theme }) => ({
    margin: theme.spacing(0, -1),
    padding: 0,
    [theme.breakpoints.up('md')]: {
        maxHeight: '60vh',
        overflowY: 'auto',
    },
}));
