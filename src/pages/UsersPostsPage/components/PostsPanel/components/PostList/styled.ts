import { styled } from '@mui/material/styles';

/**
 * Vertical list of post cards, without the default list bullets and spacing.
 */
export const SPostList = styled('ul')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    listStyle: 'none',
    margin: 0,
    padding: 0,
}));
