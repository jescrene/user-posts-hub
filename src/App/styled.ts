import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

/**
 * Centers the application and adds vertical space that grows on larger screens.
 */
export const SAppContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(5),
        paddingTop: theme.spacing(5),
    },
}));
