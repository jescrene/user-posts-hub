import type { User } from '@/types/user';

import { USER_LIST_TEST_ID } from '../../constants/usersPanelTestIds';
import UserListItem from '../UserListItem/UserListItem';
import { SUserList } from './styled';

interface UserListProps {
    /** Users to show, already filtered. */
    users: User[];
    /** Id of the selected user, or `null`. */
    selectedUserId: number | null;
    /** Receives the user the person picks. */
    onSelectUser: (user: User) => void;
}

/**
 * List of users. It only renders the rows it receives and marks the selected one.
 * Used by {@link UsersPanelBody}.
 */
const UserList = ({ onSelectUser, selectedUserId, users }: UserListProps) => (
    <SUserList data-testid={USER_LIST_TEST_ID}>
        {users.map((user) => (
            <UserListItem
                key={user.id}
                onSelect={onSelectUser}
                selected={user.id === selectedUserId}
                user={user}
            />
        ))}
    </SUserList>
);

export default UserList;
