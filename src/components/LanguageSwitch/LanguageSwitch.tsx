import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { LANGUAGE_NAMES, LANGUAGES } from '@/constants/languages';
import { LANGUAGE_SWITCH_TEST_ID } from '@/constants/testIds';
import type { Language } from '@/types/language';

/**
 * Props for the LanguageSwitch component.
 */
interface LanguageSwitchProps {
    language: Language;
    onChange: (language: Language) => void;
    label: string;
}

/**
 * Switches the language of the page. It is a group of toggle buttons, one for each language.
 * The buttons are labeled with the language code, and the aria-label of each button is the name of the language in that language.
 * Used by {@link Header} and {@link SearchResults}.
 * @param param0
 * @param param0.label
 * @param param0.language
 * @param param0.onChange
 * @constructor
 */
const LanguageSwitch = ({ label, language, onChange }: LanguageSwitchProps) => (
    <ToggleButtonGroup
        aria-label={label}
        data-testid={LANGUAGE_SWITCH_TEST_ID}
        exclusive
        onChange={(_, next: Language | null) => next && onChange(next)}
        size="small"
        value={language}
    >
        {LANGUAGES.map((code) => (
            <ToggleButton aria-label={LANGUAGE_NAMES[code]} key={code} lang={code} value={code}>
                {code.toUpperCase()}
            </ToggleButton>
        ))}
    </ToggleButtonGroup>
);

export default LanguageSwitch;
