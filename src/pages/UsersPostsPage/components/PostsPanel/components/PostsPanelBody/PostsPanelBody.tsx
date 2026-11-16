import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';

import EmptyState from '@/components/EmptyState/EmptyState';
import ErrorState from '@/components/ErrorState/ErrorState';
import { useUiTexts } from '@/hooks/useUiTexts';
import type { Post } from '@/types/post';

import {
    POSTS_EMPTY_TEST_ID,
    POSTS_ERROR_TEST_ID,
    POSTS_NO_USER_TEST_ID,
} from '../../constants/postsPanelTestIds';
import { postsPanelUiTexts } from '../../constants/postsPanelUiTexts';
import PostList from '../PostList/PostList';
import PostListSkeleton from '../PostListSkeleton/PostListSkeleton';

interface PostsPanelBodyProps {
    /** Whether a user is selected. */
    hasUser: boolean;
    /** Posts of the selected user. */
    posts: Post[];
    /** Whether the posts are loading. */
    loading: boolean;
    /** Error of the last request, or `null`. */
    error: Error | null;
    /** Loads the posts again. */
    onRetry: () => void;
}

/**
 * Content of the posts panel: picks the no user, loading, error, empty or list state. After an
 * error it still lists the posts created meanwhile.
 * Used by {@link PostsPanel}.
 */
const PostsPanelBody = ({ error, hasUser, loading, onRetry, posts }: PostsPanelBodyProps) => {
    const texts = useUiTexts(postsPanelUiTexts);

    if (!hasUser) {
        return (
            <EmptyState
                icon={<TouchAppOutlinedIcon fontSize="large" />}
                message={texts.noUserText}
                testId={POSTS_NO_USER_TEST_ID}
            />
        );
    }

    if (loading) return <PostListSkeleton />;

    // The posts created in this visit are still shown, because they do not depend on the request.
    if (error) {
        return (
            <>
                <ErrorState
                    message={texts.errorMessage}
                    onRetry={onRetry}
                    retryLabel={texts.retryLabel}
                    testId={POSTS_ERROR_TEST_ID}
                    title={texts.errorTitle}
                />
                {posts.length > 0 && <PostList posts={posts} />}
            </>
        );
    }

    if (posts.length === 0) {
        return (
            <EmptyState
                icon={<ArticleOutlinedIcon fontSize="large" />}
                message={texts.emptyText}
                testId={POSTS_EMPTY_TEST_ID}
            />
        );
    }

    return <PostList posts={posts} />;
};

export default PostsPanelBody;
