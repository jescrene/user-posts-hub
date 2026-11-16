import { styled } from '@mui/material/styles';

/**
 * Surface of a panel: stacks the header and the content. It is as tall as its content, and it can
 * shrink inside a container with a limited height, so a list in it can scroll.
 */
export const SPanel = styled('section')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    minHeight: 0,
    minWidth: 0,
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
    },
}));

/**
 * Header of a panel: the title block on the left and an optional action on the right.
 */
export const SPanelHeader = styled('header')(({ theme }) => ({
    alignItems: 'flex-start',
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'space-between',
}));

/**
 * Title block of a panel. It can shrink so long titles do not push the action out.
 */
export const SPanelTitle = styled('div')({
    minWidth: 0,
});
