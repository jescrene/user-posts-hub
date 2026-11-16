import { styled } from '@mui/material/styles';

/**
 * Card of a post: a bordered block that highlights its border on hover.
 */
export const SPostCard = styled('article')(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    transition: theme.transitions.create('border-color'),
    '&:hover': {
        borderColor: theme.palette.primary.light,
    },
}));
