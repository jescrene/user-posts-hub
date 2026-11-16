import { useId } from 'react';
import { useTheme } from '@mui/material/styles';

interface AppLogoProps {
    /** Width and height of the logo, in pixels. */
    size?: number;
}

/**
 * Logo of the application: a post bubble with lines of text over a rounded square with the
 * primary and secondary colors of the theme. It is decorative, so screen readers skip it; the
 * title next to it names the application. `public/logo.svg`, the favicon, is the same drawing.
 * Used by {@link App}.
 */
const AppLogo = ({ size = 40 }: AppLogoProps) => {
    const { palette } = useTheme();
    const gradientId = useId();

    return (
        <svg aria-hidden focusable="false" height={size} viewBox="0 0 48 48" width={size}>
            <defs>
                <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor={palette.primary.main} />
                    <stop offset="1" stopColor={palette.secondary.main} />
                </linearGradient>
            </defs>
            <rect fill={`url(#${gradientId})`} height="48" rx="12" width="48" />
            <path
                d="M15 11h18a5 5 0 0 1 5 5v11a5 5 0 0 1-5 5H21l-6.5 5.5V32H15a5 5 0 0 1-5-5V16a5 5 0 0 1 5-5Z"
                fill={palette.common.white}
            />
            <rect fill={palette.primary.main} height="3.5" rx="1.75" width="18" x="15" y="16" />
            <rect
                fill={palette.primary.main}
                height="3"
                opacity="0.45"
                rx="1.5"
                width="13"
                x="15"
                y="23"
            />
        </svg>
    );
};

export default AppLogo;
