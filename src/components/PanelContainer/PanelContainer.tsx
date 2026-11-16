import { useId, type ReactNode, type Ref } from 'react';
import Typography from '@mui/material/Typography';

import { SPanel, SPanelHeader, SPanelTitle } from './styled';

interface PanelContainerProps {
    /** Heading of the panel. It also names the section for screen readers. */
    title: string;
    /** Short text under the heading, e.g. how many items the panel shows. */
    subtitle?: ReactNode;
    /** Element shown at the right of the header, e.g. a button. */
    action?: ReactNode;
    /** Content of the panel. */
    children: ReactNode;
    /** Id used by the tests to find the panel. */
    testId?: string;
    /** Reference to the section, e.g. to scroll to it. */
    ref?: Ref<HTMLElement>;
}

/**
 * Container of a page section: a bordered surface with a heading and its content. It only lays
 * out the section; the content decides what to render. The section is a landmark named by its
 * heading, and changes of the subtitle are announced by screen readers.
 */
const PanelContainer = ({
    action,
    children,
    ref,
    subtitle,
    testId,
    title,
}: PanelContainerProps) => {
    const titleId = useId();

    return (
        <SPanel aria-labelledby={titleId} data-testid={testId} ref={ref}>
            <SPanelHeader>
                <SPanelTitle>
                    <Typography component="h2" id={titleId} variant="h2">
                        {title}
                    </Typography>
                    <Typography aria-live="polite" color="text.secondary" variant="body2">
                        {subtitle}
                    </Typography>
                </SPanelTitle>
                {action}
            </SPanelHeader>
            {children}
        </SPanel>
    );
};

export default PanelContainer;
