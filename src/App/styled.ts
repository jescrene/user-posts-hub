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

/**
 * Page header: the brand centered and the language switch on the right. On narrow screens the
 * switch moves above the brand, so the brand keeps the whole width to stay centered.
 */
export const SAppHeader = styled('header')(({ theme }) => ({
    alignItems: 'center',
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateAreas: '"language" "brand"',
    [theme.breakpoints.up('sm')]: {
        gridTemplateAreas: '". brand language"',
        gridTemplateColumns: '1fr auto 1fr',
    },
}));

/**
 * Logo and title of the application, side by side and centered in the header.
 */
export const SAppBrand = styled('div')(({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    gap: theme.spacing(1.5),
    gridArea: 'brand',
    justifyContent: 'center',
}));

/**
 * Place of the language switch: the right edge of the header.
 */
export const SAppLanguage = styled('div')({
    gridArea: 'language',
    justifySelf: 'end',
});
