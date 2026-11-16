import PanelContainer from '@/components/PanelContainer/PanelContainer';
import type { User } from '@/types/user';

import UserSearchField from './components/UserSearchField/UserSearchField';
import UsersPanelBody from './components/UsersPanelBody/UsersPanelBody';
import { USERS_PANEL_TEST_ID } from './constants/usersPanelTestIds';
import { getUsersSubtitle, USERS_PANEL_TITLE } from './constants/usersPanelUiTexts';
import { useUsersPanel } from './hooks/useUsersPanel';

interface UsersPanelProps {
    /** Id of the selected user, or `null` when no user is selected. */
    selectedUserId: number | null;
    /** Receives the user the person picks. */
    onSelectUser: (user: User) => void;
}

/**
 * Container of the users section: gets the users, the search and the request state from its
 * business hook and passes them to the presentational components.
 * Used by {@link UsersPostsPage}.
 */
const UsersPanel = ({ onSelectUser, selectedUserId }: UsersPanelProps) => {
    const { error, filteredUsers, loading, retry, search, setSearch, totalUsers } = useUsersPanel();

    return (
        <PanelContainer
            subtitle={getUsersSubtitle({
                error,
                loading,
                shownCount: filteredUsers.length,
                totalCount: totalUsers,
            })}
            testId={USERS_PANEL_TEST_ID}
            title={USERS_PANEL_TITLE}
        >
            <UserSearchField
                disabled={loading || Boolean(error)}
                onChange={setSearch}
                value={search}
            />
            <UsersPanelBody
                error={error}
                loading={loading}
                onRetry={retry}
                onSelectUser={onSelectUser}
                search={search}
                selectedUserId={selectedUserId}
                users={filteredUsers}
            />
        </PanelContainer>
    );
};

export default UsersPanel;
