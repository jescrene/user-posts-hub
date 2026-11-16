import UsersPanel from './components/UsersPanel/UsersPanel';
import { SUsersPostsLayout } from './styled';

/**
 * Page that lists the users and the posts of the selected user.
 */
const UsersPostsPage = () => (
    <SUsersPostsLayout>
        <UsersPanel />
    </SUsersPostsLayout>
);

export default UsersPostsPage;
