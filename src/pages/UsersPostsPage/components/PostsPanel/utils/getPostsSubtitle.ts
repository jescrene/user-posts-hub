import type { PostsPanelUiTexts } from '../constants/postsPanelUiTexts';

interface PostsSubtitleParams {
    /** Name of the selected user, or `null` when no user is selected. */
    userName: string | null;
    error: Error | null;
    loading: boolean;
    /** Number of posts of the user. */
    count: number;
}

/**
 * @param params - Selected user, request state of the posts and how many there are.
 * @param texts - Texts of the posts panel in the language of the interface.
 * @returns Subtitle of the posts panel: nothing without a user, the user name alone after an
 * error, or the user name with a loading text or the count, e.g. "Leanne Graham · 10 posts".
 */
export const getPostsSubtitle = (
    { count, error, loading, userName }: PostsSubtitleParams,
    texts: PostsPanelUiTexts,
) => {
    if (!userName) return undefined;
    if (error) return userName;

    return `${userName} · ${loading ? texts.loadingText : texts.postsCount(count)}`;
};
