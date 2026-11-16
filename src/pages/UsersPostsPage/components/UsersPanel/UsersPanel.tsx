import PanelContainer from '@/components/PanelContainer/PanelContainer';

import UserSearchField from './components/UserSearchField/UserSearchField';
import UsersPanelBody from './components/UsersPanelBody/UsersPanelBody';
import { USERS_PANEL_TEST_ID } from './constants/usersPanelTestIds';
import { getUsersSubtitle, USERS_PANEL_TITLE } from './constants/usersPanelUiTexts';
import { useUsersPanel } from './hooks/useUsersPanel';

/**
 * Container of the users section: gets the users, the search and the request state from its
 * business hook and passes them to the presentational components.
 * Used by {@link UsersPostsPage}.
 */
const UsersPanel = () => {
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
                search={search}
                users={filteredUsers}
            />
        </PanelContainer>
    );
};

export default UsersPanel;
