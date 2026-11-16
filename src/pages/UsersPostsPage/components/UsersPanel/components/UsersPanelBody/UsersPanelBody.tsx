import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import EmptyState from '@/components/EmptyState/EmptyState';
import ErrorState from '@/components/ErrorState/ErrorState';
import type { User } from '@/types/user';

import { USERS_EMPTY_TEST_ID, USERS_ERROR_TEST_ID } from '../../constants/usersPanelTestIds';
import {
    getNoUsersMatchText,
    NO_USERS_TEXT,
    USERS_ERROR_MESSAGE,
    USERS_ERROR_TITLE,
    USERS_RETRY_LABEL,
} from '../../constants/usersPanelUiTexts';
import UserList from '../UserList/UserList';
import UserListSkeleton from '../UserListSkeleton/UserListSkeleton';

interface UsersPanelBodyProps {
    /** Users to show, already filtered by the search. */
    users: User[];
    /** Whether the users are loading. */
    loading: boolean;
    /** Error of the last request, or `null`. */
    error: Error | null;
    /** Text typed in the search, used to explain why no user is shown. */
    search: string;
    /** Loads the users again. */
    onRetry: () => void;
}

/**
 * Content of the users panel: picks the loading, error, empty or list state.
 * Used by {@link UsersPanel}.
 */
const UsersPanelBody = ({ error, loading, onRetry, search, users }: UsersPanelBodyProps) => {
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

    if (users.length === 0) {
        return (
            <EmptyState
                icon={<PersonSearchIcon fontSize="large" />}
                message={search.trim() ? getNoUsersMatchText(search) : NO_USERS_TEXT}
                testId={USERS_EMPTY_TEST_ID}
            />
        );
    }

    return <UserList users={users} />;
};

export default UsersPanelBody;
