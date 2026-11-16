import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

interface ErrorStateProps {
    /** Short summary of what failed, e.g. "Users could not be loaded". */
    title: string;
    /** What the person can do about it. */
    message: string;
    /** Label of the retry button. */
    retryLabel: string;
    /** Repeats the failed action. */
    onRetry: () => void;
    /** Id used by the tests to find the error. */
    testId?: string;
}

/**
 * Error message with a retry button. It is announced by screen readers as an alert.
 * Used by {@link UsersPanelBody} and {@link PostsPanelBody}.
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
