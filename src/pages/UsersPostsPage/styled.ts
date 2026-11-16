import { styled } from '@mui/material/styles';

/**
 * Two-column layout on desktop (users on the left, posts on the right) that stacks on mobile.
 */
export const SUsersPostsLayout = styled('div')(({ theme }) => ({
    alignItems: 'start',
    display: 'grid',
    gap: theme.spacing(3),
    gridTemplateColumns: 'minmax(0, 1fr)',
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'minmax(0, 22rem) minmax(0, 1fr)',
    },
}));

/**
 * Column of the users panel. On desktop it stays in view while the posts scroll, and it is never
 * taller than the window, so the users list scrolls inside it instead of being cut.
 */
export const SUsersColumn = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    [theme.breakpoints.up('md')]: {
        maxHeight: `calc(100dvh - ${theme.spacing(6)})`,
        position: 'sticky',
        top: theme.spacing(3),
    },
}));
