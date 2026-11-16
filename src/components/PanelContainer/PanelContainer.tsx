import { useId, type ReactNode, type Ref } from 'react';
import Typography from '@mui/material/Typography';

import { SPanel, SPanelHeader, SPanelTitle } from './styled';

/**
 * Props for the PanelContainer component.
 */
interface PanelContainerProps {
    title: string;
    subtitle?: ReactNode;
    action?: ReactNode;
    children: ReactNode;
    testId?: string;
    ref?: Ref<HTMLElement>;
}

/**
 * Container of a page section: a bordered surface with a heading and its content. It only lays
 * out the section; the content decides what to render. The section is a landmark named by its
 * heading, and changes of the subtitle are announced by screen readers.
 * Used by {@link SearchResults} and {@link UserDetails}.
 * @param param0
 * @param param0.title
 * @param param0.subtitle
 * @param param0.action
 * @param param0.children
 * @param param0.testId
 * @param param0.ref
 * @constructor
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
