export const POSTS_PANEL_TITLE = 'Posts';
export const POSTS_NO_USER_TEXT = 'Select a user to see their posts.';
export const POSTS_EMPTY_TEXT = 'This user has not written any posts yet.';
export const POSTS_LOADING_TEXT = 'Loading posts…';
export const POSTS_LOADING_LABEL = 'Loading posts';
export const POSTS_ERROR_TITLE = 'Posts could not be loaded';
export const POSTS_ERROR_MESSAGE = 'Check your connection and try again.';
export const POSTS_RETRY_LABEL = 'Retry';

/**
 * @param count - Number of posts.
 * @returns e.g. "10 posts".
 */
export const getPostsCountText = (count: number) => `${count} ${count === 1 ? 'post' : 'posts'}`;

interface PostsSubtitleParams {
    /** Name of the selected user, or `null` when no user is selected. */
    userName: string | null;
    error: Error | null;
    loading: boolean;
    /** Number of posts of the user. */
    count: number;
}

/**
 * @returns Subtitle of the posts panel: nothing without a user, the user name alone after an
 * error, or the user name with a loading text or the count, e.g. "Leanne Graham · 10 posts".
 */
export const getPostsSubtitle = ({ count, error, loading, userName }: PostsSubtitleParams) => {
    if (!userName) return undefined;
    if (error) return userName;

    return `${userName} · ${loading ? POSTS_LOADING_TEXT : getPostsCountText(count)}`;
};
