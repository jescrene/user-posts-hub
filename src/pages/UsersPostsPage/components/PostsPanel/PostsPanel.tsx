import type { Ref } from 'react';

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
    /** Reference to the panel, e.g. to scroll to it. */
    ref?: Ref<HTMLElement>;
}

/**
 * Container of the posts section: gets the posts of the selected user and their request state
 * from its business hook and passes them to the presentational components.
 * Used by {@link UsersPostsPage}.
 */
const PostsPanel = ({ ref, user }: PostsPanelProps) => {
    const {
        addPost,
        clearCreateError,
        closeCreatedNotice,
        createFailed,
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
            ref={ref}
            testId={POSTS_PANEL_TEST_ID}
            title={POSTS_PANEL_TITLE}
        >
            {user && (
                <NewPostForm
                    failed={createFailed}
                    key={user.id}
                    onEdit={clearCreateError}
                    onSubmit={addPost}
                    submitting={creating}
                />
            )}
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
