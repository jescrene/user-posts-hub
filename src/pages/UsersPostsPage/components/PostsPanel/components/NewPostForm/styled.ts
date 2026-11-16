import { styled } from '@mui/material/styles';

/**
 * Form block of the posts panel: a tinted surface that stacks the fields.
 */
export const SNewPostForm = styled('form')(({ theme }) => ({
    backgroundColor: theme.palette.grey[50],
    border: `1px dashed ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
}));

/**
 * Aligns the submit button to the right, and stretches it on mobile.
 */
export const SNewPostActions = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
}));
