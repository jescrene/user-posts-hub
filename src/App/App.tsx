import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import LanguageSwitch from '@/components/LanguageSwitch/LanguageSwitch';
import { appUiTexts } from '@/constants/appUiTexts';
import { APP_TEST_ID } from '@/constants/testIds';
import { useLanguage } from '@/hooks/useLanguage';
import { useUiTexts } from '@/hooks/useUiTexts';
import UsersPostsPage from '@/pages/UsersPostsPage/UsersPostsPage';

import { SAppContainer, SAppHeader } from './styled';

/**
 * Root component: the page header with the language switch, and the main content.
 */
const App = () => {
    const { language, setLanguage } = useLanguage();
    const texts = useUiTexts(appUiTexts);

    return (
        <SAppContainer data-testid={APP_TEST_ID} maxWidth="lg">
            <SAppHeader>
                <Box>
                    <Typography variant="h1">{texts.title}</Typography>
                    <Typography color="text.secondary">{texts.subtitle}</Typography>
                </Box>
                <LanguageSwitch
                    label={texts.languageLabel}
                    language={language}
                    onChange={setLanguage}
                />
            </SAppHeader>
            <Box component="main">
                <UsersPostsPage />
            </Box>
        </SAppContainer>
    );
};

export default App;
