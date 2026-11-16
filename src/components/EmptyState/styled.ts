import { styled } from '@mui/material/styles';

/**
 * Centers the icon and the message of an empty state.
 */
export const SEmptyState = styled('div')(({ theme }) => ({
    alignItems: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    justifyContent: 'center',
    padding: theme.spacing(4, 2),
    textAlign: 'center',
}));
