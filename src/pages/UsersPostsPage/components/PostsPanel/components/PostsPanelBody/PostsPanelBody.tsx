import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';

import EmptyState from '@/components/EmptyState/EmptyState';
import ErrorState from '@/components/ErrorState/ErrorState';
import type { Post } from '@/types/post';

import {
    POSTS_EMPTY_TEST_ID,
    POSTS_ERROR_TEST_ID,
    POSTS_NO_USER_TEST_ID,
} from '../../constants/postsPanelTestIds';
import {
    POSTS_EMPTY_TEXT,
    POSTS_ERROR_MESSAGE,
    POSTS_ERROR_TITLE,
    POSTS_NO_USER_TEXT,
    POSTS_RETRY_LABEL,
} from '../../constants/postsPanelUiTexts';
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
 * Content of the posts panel: picks the no user, loading, error, empty or list state.
 * Used by {@link PostsPanel}.
 */
const PostsPanelBody = ({ error, hasUser, loading, onRetry, posts }: PostsPanelBodyProps) => {
    if (!hasUser) {
        return (
            <EmptyState
                icon={<TouchAppOutlinedIcon fontSize="large" />}
                message={POSTS_NO_USER_TEXT}
                testId={POSTS_NO_USER_TEST_ID}
            />
        );
    }

    if (loading) return <PostListSkeleton />;

    if (error) {
        return (
            <ErrorState
                message={POSTS_ERROR_MESSAGE}
                onRetry={onRetry}
                retryLabel={POSTS_RETRY_LABEL}
                testId={POSTS_ERROR_TEST_ID}
                title={POSTS_ERROR_TITLE}
            />
        );
    }

    if (posts.length === 0) {
        return (
            <EmptyState
                icon={<ArticleOutlinedIcon fontSize="large" />}
                message={POSTS_EMPTY_TEXT}
                testId={POSTS_EMPTY_TEST_ID}
            />
        );
    }

    return <PostList posts={posts} />;
};

export default PostsPanelBody;
