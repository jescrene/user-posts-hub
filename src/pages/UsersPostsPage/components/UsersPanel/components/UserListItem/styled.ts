import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

/**
 * Avatar with the initials of the user. Its background color comes from the `sx` prop because it
 * depends on the user.
 */
export const SUserAvatar = styled(Avatar)(({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: '0.95rem',
    fontWeight: 600,
}));
