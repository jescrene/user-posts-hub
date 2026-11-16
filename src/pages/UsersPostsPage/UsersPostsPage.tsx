import PostsPanel from './components/PostsPanel/PostsPanel';
import UsersPanel from './components/UsersPanel/UsersPanel';
import { useUsersPostsPage } from './hooks/useUsersPostsPage';
import { SUsersPostsLayout } from './styled';

/**
 * Page that lists the users and the posts of the selected user. It owns the selection and shares
 * it with both panels.
 */
const UsersPostsPage = () => {
    const { handleSelectUser, postsPanelRef, selectedUser } = useUsersPostsPage();

    return (
        <SUsersPostsLayout>
            <UsersPanel onSelectUser={handleSelectUser} selectedUserId={selectedUser?.id ?? null} />
            <PostsPanel ref={postsPanelRef} user={selectedUser} />
        </SUsersPostsLayout>
    );
};

export default UsersPostsPage;
