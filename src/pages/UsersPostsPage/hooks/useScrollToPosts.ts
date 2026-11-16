import { useCallback, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Business hook of the page: brings the posts panel into view on mobile, where the panels are
 * stacked and the posts are below the users. On desktop both panels are already in view. The
 * scroll is not animated when the person prefers reduced motion.
 */
export const useScrollToPosts = () => {
    const theme = useTheme();
    const stacked = useMediaQuery(theme.breakpoints.down('md'));
    const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
    const postsPanelRef = useRef<HTMLElement>(null);

    const scrollToPosts = useCallback(() => {
        if (!stacked) return;

        postsPanelRef.current?.scrollIntoView({
            behavior: reducedMotion ? 'auto' : 'smooth',
            block: 'start',
        });
    }, [reducedMotion, stacked]);

    return { postsPanelRef, scrollToPosts };
};
