import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { APP_SUBTITLE, APP_TITLE } from '@/constants/appUiTexts';
import { APP_TEST_ID } from '@/constants/testIds';

import { SAppContainer } from './styled';

/**
 * Root component: the page header and the main content of the application.
 */
const App = () => (
    <SAppContainer data-testid={APP_TEST_ID} maxWidth="lg">
        <Box component="header">
            <Typography variant="h1">{APP_TITLE}</Typography>
            <Typography color="text.secondary">{APP_SUBTITLE}</Typography>
        </Box>
    </SAppContainer>
);

export default App;
