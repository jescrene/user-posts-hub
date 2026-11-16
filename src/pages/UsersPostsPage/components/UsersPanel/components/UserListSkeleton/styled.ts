import { styled } from '@mui/material/styles';

/**
 * Placeholder row with the same height and spacing as a user item.
 */
export const SSkeletonRow = styled('div')(({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    gap: theme.spacing(2),
    padding: theme.spacing(1, 0),
}));

/**
 * Stacks the two placeholder lines of a row, next to the avatar.
 */
export const SSkeletonText = styled('div')({
    flex: 1,
});
