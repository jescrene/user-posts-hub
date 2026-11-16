import type { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '@/theme/theme';

interface AppProvidersProps {
    /** Application tree that receives the theme. */
    children: ReactNode;
}

/**
 * Wraps the application with the MUI theme and its CSS baseline. Tests render through it too, so
 * components look and behave the same as in the browser.
 */
const AppProviders = ({ children }: AppProvidersProps) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
);

export default AppProviders;
