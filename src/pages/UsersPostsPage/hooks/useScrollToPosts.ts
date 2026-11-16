import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Business hook of the page: brings the posts panel into view on mobile, where the panels are
 * stacked and the posts are below the users. On desktop both panels are already in view. The
 * scroll is not animated when the person prefers reduced motion.
 *
 * The scroll runs after the next render, once the panel shows the form and the loading posts.
 * Scrolling right away would stop short, because the page is not yet long enough to reach it.
 */
export const useScrollToPosts = () => {
    const theme = useTheme();
    const stacked = useMediaQuery(theme.breakpoints.down('md'));
    const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
    const postsPanelRef = useRef<HTMLElement>(null);
    const [scrollRequest, setScrollRequest] = useState(0);
    const handledRequest = useRef(0);

    useEffect(() => {
        if (scrollRequest === handledRequest.current) return;
        handledRequest.current = scrollRequest;

        if (!stacked) return;

        postsPanelRef.current?.scrollIntoView({
            behavior: reducedMotion ? 'auto' : 'smooth',
            block: 'start',
        });
    }, [reducedMotion, scrollRequest, stacked]);

    /** Asks for the posts panel to be brought into view after the next render. */
    const scrollToPosts = useCallback(() => setScrollRequest((request) => request + 1), []);

    return { postsPanelRef, scrollToPosts };
};
