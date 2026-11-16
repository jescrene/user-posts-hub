import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';

import { SEmptyState } from './styled';

/**
 * Props for the EmptyState component.
 */
interface EmptyStateProps {
    icon: ReactNode;
    message: string;
    testId?: string;
}

/**
 * Message shown when a page has no content, e.g. because the search returned no results. It shows an icon and a message.
 * Used by {@link PanelContainer} and {@link SearchResults}.
 * @param param0
 * @param param0.icon
 * @param param0.message
 * @param param0.testId
 * @constructor
 */
const EmptyState = ({ icon, message, testId }: EmptyStateProps) => (
    <SEmptyState data-testid={testId} role="status">
        {icon}
        <Typography variant="body2">{message}</Typography>
    </SEmptyState>
);

export default EmptyState;
