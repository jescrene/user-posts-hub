import type { User } from '@/types/user';

import { USER_LIST_TEST_ID } from '../../constants/usersPanelTestIds';
import UserListItem from '../UserListItem/UserListItem';
import { SUserList } from './styled';

interface UserListProps {
    /** Users to show, already filtered. */
    users: User[];
}

/**
 * List of users. It only renders the rows it receives.
 * Used by {@link UsersPanel}.
 */
const UserList = ({ users }: UserListProps) => (
    <SUserList data-testid={USER_LIST_TEST_ID}>
        {users.map((user) => (
            <UserListItem key={user.id} user={user} />
        ))}
    </SUserList>
);

export default UserList;
