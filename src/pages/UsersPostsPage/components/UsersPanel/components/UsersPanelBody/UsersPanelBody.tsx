import ErrorState from '@/components/ErrorState/ErrorState';
import type { User } from '@/types/user';

import { USERS_ERROR_TEST_ID } from '../../constants/usersPanelTestIds';
import {
    USERS_ERROR_MESSAGE,
    USERS_ERROR_TITLE,
    USERS_RETRY_LABEL,
} from '../../constants/usersPanelUiTexts';
import UserList from '../UserList/UserList';
import UserListSkeleton from '../UserListSkeleton/UserListSkeleton';

interface UsersPanelBodyProps {
    /** Users to show. */
    users: User[];
    /** Whether the users are loading. */
    loading: boolean;
    /** Error of the last request, or `null`. */
    error: Error | null;
    /** Loads the users again. */
    onRetry: () => void;
}

/**
 * Content of the users panel: picks the loading, error or list state.
 * Used by {@link UsersPanel}.
 */
const UsersPanelBody = ({ error, loading, onRetry, users }: UsersPanelBodyProps) => {
    if (loading) return <UserListSkeleton />;

    if (error) {
        return (
            <ErrorState
                message={USERS_ERROR_MESSAGE}
                onRetry={onRetry}
                retryLabel={USERS_RETRY_LABEL}
                testId={USERS_ERROR_TEST_ID}
                title={USERS_ERROR_TITLE}
            />
        );
    }

    return <UserList users={users} />;
};

export default UsersPanelBody;
