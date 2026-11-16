import { createTheme } from '@mui/material/styles';

/**
 * Application theme: an indigo palette over a soft grey background, rounded surfaces and
 * buttons without uppercase text.
 */
export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#4f46e5' },
        secondary: { main: '#0ea5e9' },
        background: { default: '#f5f7fb', paper: '#ffffff' },
    },
    shape: { borderRadius: 12 },
    typography: {
        fontFamily: 'Roboto, system-ui, -apple-system, "Segoe UI", sans-serif',
        h1: { fontSize: '1.75rem', fontWeight: 700 },
        h2: { fontSize: '1.25rem', fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
        MuiPaper: {
            defaultProps: { elevation: 0 },
            styleOverrides: { root: { border: '1px solid #e5e7eb' } },
        },
    },
});
