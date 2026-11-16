import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

/**
 * Props for the ErrorState component.
 */
interface ErrorStateProps {
    title: string;
    message: string;
    retryLabel: string;
    onRetry: () => void;
    testId?: string;
}

/**
 * Message shown when a page fails to load, e.g. because the network is down. It shows a retry button.
 * Used by {@link PanelContainer} and {@link SearchResults}.
 * @param param0
 * @param param0.message
 * @param param0.onRetry
 * @param param0.retryLabel
 * @param param0.testId
 * @param param0.title
 * @constructor
 */
const ErrorState = ({ message, onRetry, retryLabel, testId, title }: ErrorStateProps) => (
    <Alert
        action={
            <Button color="inherit" onClick={onRetry} size="small">
                {retryLabel}
            </Button>
        }
        data-testid={testId}
        severity="error"
        variant="outlined"
    >
        <AlertTitle>{title}</AlertTitle>
        {message}
    </Alert>
);

export default ErrorState;
