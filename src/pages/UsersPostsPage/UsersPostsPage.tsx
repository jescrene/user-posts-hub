import PostsPanel from './components/PostsPanel/PostsPanel';
import UsersPanel from './components/UsersPanel/UsersPanel';
import { useSelectedUser } from './hooks/useSelectedUser';
import { SUsersPostsLayout } from './styled';

/**
 * Page that lists the users and the posts of the selected user. It owns the selection and shares
 * it with both panels.
 */
const UsersPostsPage = () => {
    const { selectedUser, selectUser } = useSelectedUser();

    return (
        <SUsersPostsLayout>
            <UsersPanel onSelectUser={selectUser} selectedUserId={selectedUser?.id ?? null} />
            <PostsPanel user={selectedUser} />
        </SUsersPostsLayout>
    );
};

export default UsersPostsPage;
