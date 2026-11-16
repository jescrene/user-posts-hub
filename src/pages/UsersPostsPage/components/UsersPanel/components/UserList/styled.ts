import List from '@mui/material/List';
import { styled } from '@mui/material/styles';

/**
 * List of users. On desktop it fills the free height of the panel and scrolls inside it, so every
 * user can be reached without leaving empty space.
 */
export const SUserList = styled(List)(({ theme }) => ({
    margin: theme.spacing(0, -1),
    padding: 0,
    [theme.breakpoints.up('md')]: {
        flex: '1 1 auto',
        minHeight: 0,
        overflowY: 'auto',
    },
}));
