import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import { alpha, styled } from '@mui/material/styles';

/**
 * Avatar with the initials of the user. Its background color comes from the `sx` prop because it
 * depends on the user.
 */
export const SUserAvatar = styled(Avatar)(({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: '0.95rem',
    fontWeight: 600,
}));

/**
 * Clickable row of a user. The selected row is highlighted with the primary color and a bar on
 * its left edge.
 */
export const SUserButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    '&.Mui-selected': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        boxShadow: `inset 3px 0 0 ${theme.palette.primary.main}`,
    },
    '&.Mui-selected:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.14),
    },
}));
