import PanelContainer from '@/components/PanelContainer/PanelContainer';
import type { User } from '@/types/user';

import PostList from './components/PostList/PostList';
import { POSTS_PANEL_TEST_ID } from './constants/postsPanelTestIds';
import { getPostsSubtitle, POSTS_PANEL_TITLE } from './constants/postsPanelUiTexts';
import { usePostsPanel } from './hooks/usePostsPanel';

interface PostsPanelProps {
    /** User whose posts are shown, or `null` when no user is selected. */
    user: User | null;
}

/**
 * Container of the posts section: gets the posts of the selected user from its business hook and
 * passes them to the presentational components.
 * Used by {@link UsersPostsPage}.
 */
const PostsPanel = ({ user }: PostsPanelProps) => {
    const { posts } = usePostsPanel(user);

    return (
        <PanelContainer
            subtitle={user ? getPostsSubtitle(user.name, posts.length) : undefined}
            testId={POSTS_PANEL_TEST_ID}
            title={POSTS_PANEL_TITLE}
        >
            <PostList posts={posts} />
        </PanelContainer>
    );
};

export default PostsPanel;
