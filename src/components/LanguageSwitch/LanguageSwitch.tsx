import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { LANGUAGE_NAMES, LANGUAGES } from '@/constants/languages';
import { LANGUAGE_SWITCH_TEST_ID } from '@/constants/testIds';
import type { Language } from '@/types/language';

interface LanguageSwitchProps {
    /** Language the interface is shown in. */
    language: Language;
    /** Receives the language the person picks. */
    onChange: (language: Language) => void;
    /** Accessible name of the group, e.g. "Language". */
    label: string;
}

/**
 * Buttons to pick the language of the interface. Each one shows the language code and is named by
 * the language in that language, e.g. "Español", so anyone can find their own.
 * Used by {@link App}.
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
