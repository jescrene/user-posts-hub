import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import EmptyState from '@/components/EmptyState/EmptyState';
import ErrorState from '@/components/ErrorState/ErrorState';
import { useUiTexts } from '@/hooks/useUiTexts';
import type { User } from '@/types/user';

import { USERS_EMPTY_TEST_ID, USERS_ERROR_TEST_ID } from '../../constants/usersPanelTestIds';
import { usersPanelUiTexts } from '../../constants/usersPanelUiTexts';
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
    /** Id of the selected user, or `null`. */
    selectedUserId: number | null;
    /** Receives the user the person picks. */
    onSelectUser: (user: User) => void;
}

/**
 * Content of the users panel: picks the loading, error, empty or list state.
 * Used by {@link UsersPanel}.
 */
const UsersPanelBody = ({
    error,
    loading,
    onRetry,
    onSelectUser,
    search,
    selectedUserId,
    users,
}: UsersPanelBodyProps) => {
    const texts = useUiTexts(usersPanelUiTexts);

    if (loading) return <UserListSkeleton />;

    if (error) {
        return (
            <ErrorState
                message={texts.errorMessage}
                onRetry={onRetry}
                retryLabel={texts.retryLabel}
                testId={USERS_ERROR_TEST_ID}
                title={texts.errorTitle}
            />
        );
    }

    if (users.length === 0) {
        return (
            <EmptyState
                icon={<PersonSearchIcon fontSize="large" />}
                message={search.trim() ? texts.noUsersMatch(search) : texts.noUsers}
                testId={USERS_EMPTY_TEST_ID}
            />
        );
    }

    return <UserList onSelectUser={onSelectUser} selectedUserId={selectedUserId} users={users} />;
};

export default UsersPanelBody;
