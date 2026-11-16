import PanelContainer from '@/components/PanelContainer/PanelContainer';
import type { User } from '@/types/user';

import NewPostForm from './components/NewPostForm/NewPostForm';
import PostCreatedSnackbar from './components/PostCreatedSnackbar/PostCreatedSnackbar';
import PostsPanelBody from './components/PostsPanelBody/PostsPanelBody';
import { POSTS_PANEL_TEST_ID } from './constants/postsPanelTestIds';
import { getPostsSubtitle, POSTS_PANEL_TITLE } from './constants/postsPanelUiTexts';
import { usePostsPanel } from './hooks/usePostsPanel';

interface PostsPanelProps {
    /** User whose posts are shown, or `null` when no user is selected. */
    user: User | null;
}

/**
 * Container of the posts section: gets the posts of the selected user and their request state
 * from its business hook and passes them to the presentational components.
 * Used by {@link UsersPostsPage}.
 */
const PostsPanel = ({ user }: PostsPanelProps) => {
    const {
        addPost,
        closeCreatedNotice,
        creating,
        error,
        loading,
        posts,
        retry,
        showCreatedNotice,
    } = usePostsPanel(user);

    return (
        <PanelContainer
            subtitle={getPostsSubtitle({
                count: posts.length,
                error,
                loading,
                userName: user?.name ?? null,
            })}
            testId={POSTS_PANEL_TEST_ID}
            title={POSTS_PANEL_TITLE}
        >
            {user && <NewPostForm key={user.id} onSubmit={addPost} submitting={creating} />}
            <PostsPanelBody
                error={error}
                hasUser={Boolean(user)}
                loading={loading}
                onRetry={retry}
                posts={posts}
            />
            <PostCreatedSnackbar onClose={closeCreatedNotice} open={showCreatedNotice} />
        </PanelContainer>
    );
};

export default PostsPanel;
