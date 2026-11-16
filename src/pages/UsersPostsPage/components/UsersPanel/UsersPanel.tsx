import PanelContainer from '@/components/PanelContainer/PanelContainer';

import UsersPanelBody from './components/UsersPanelBody/UsersPanelBody';
import { USERS_PANEL_TEST_ID } from './constants/usersPanelTestIds';
import { getUsersSubtitle, USERS_PANEL_TITLE } from './constants/usersPanelUiTexts';
import { useUsersPanel } from './hooks/useUsersPanel';

/**
 * Container of the users section: gets the users and their request state from its business hook
 * and passes them to the presentational components.
 * Used by {@link UsersPostsPage}.
 */
const UsersPanel = () => {
    const { error, loading, retry, users } = useUsersPanel();

    return (
        <PanelContainer
            subtitle={getUsersSubtitle({ error, loading, usersCount: users.length })}
            testId={USERS_PANEL_TEST_ID}
            title={USERS_PANEL_TITLE}
        >
            <UsersPanelBody error={error} loading={loading} onRetry={retry} users={users} />
        </PanelContainer>
    );
};

export default UsersPanel;
