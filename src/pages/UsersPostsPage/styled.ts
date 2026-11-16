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
