import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';

import { SPanel, SPanelHeader, SPanelTitle } from './styled';

interface PanelContainerProps {
    /** Heading of the panel. */
    title: string;
    /** Short text under the heading, e.g. how many items the panel shows. */
    subtitle?: ReactNode;
    /** Element shown at the right of the header, e.g. a button. */
    action?: ReactNode;
    /** Content of the panel. */
    children: ReactNode;
    /** Id used by the tests to find the panel. */
    testId?: string;
}

/**
 * Container of a page section: a bordered surface with a heading and its content. It only lays
 * out the section; the content decides what to render.
 */
const PanelContainer = ({ action, children, subtitle, testId, title }: PanelContainerProps) => (
    <SPanel data-testid={testId}>
        <SPanelHeader>
            <SPanelTitle>
                <Typography component="h2" variant="h2">
                    {title}
                </Typography>
                {subtitle && (
                    <Typography color="text.secondary" variant="body2">
                        {subtitle}
                    </Typography>
                )}
            </SPanelTitle>
            {action}
        </SPanelHeader>
        {children}
    </SPanel>
);

export default PanelContainer;
