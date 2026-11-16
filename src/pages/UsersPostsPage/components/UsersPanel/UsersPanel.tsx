import PanelContainer from '@/components/PanelContainer/PanelContainer';

import UserList from './components/UserList/UserList';
import { USERS_PANEL_TEST_ID } from './constants/usersPanelTestIds';
import { getUsersCountText, USERS_PANEL_TITLE } from './constants/usersPanelUiTexts';
import { useUsersPanel } from './hooks/useUsersPanel';

/**
 * Container of the users section: gets the users from its business hook and passes them to the
 * presentational components.
 * Used by {@link UsersPostsPage}.
 */
const UsersPanel = () => {
    const { users } = useUsersPanel();

    return (
        <PanelContainer
            subtitle={getUsersCountText(users.length)}
            testId={USERS_PANEL_TEST_ID}
            title={USERS_PANEL_TITLE}
        >
            <UserList users={users} />
        </PanelContainer>
    );
};

export default UsersPanel;
