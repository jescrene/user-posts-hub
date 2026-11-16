import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';

import { SEmptyState } from './styled';

interface EmptyStateProps {
    /** Illustrative icon shown above the message. */
    icon: ReactNode;
    /** Explains why there is nothing to show. */
    message: string;
    /** Id used by the tests to find the empty state. */
    testId?: string;
}

/**
 * Message shown instead of a list that has no items, e.g. when a search has no matches.
 * Used by {@link UsersPanelBody} and {@link PostsPanelBody}.
 */
const EmptyState = ({ icon, message, testId }: EmptyStateProps) => (
    <SEmptyState data-testid={testId} role="status">
        {icon}
        <Typography variant="body2">{message}</Typography>
    </SEmptyState>
);

export default EmptyState;
