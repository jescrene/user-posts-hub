export const POSTS_PANEL_TITLE = 'Posts';

/**
 * @param count - Number of posts.
 * @returns e.g. "10 posts".
 */
export const getPostsCountText = (count: number) => `${count} ${count === 1 ? 'post' : 'posts'}`;

/**
 * @param userName - Name of the selected user.
 * @param count - Number of posts of the user.
 * @returns Subtitle of the posts panel, e.g. "Leanne Graham · 10 posts".
 */
export const getPostsSubtitle = (userName: string, count: number) =>
    `${userName} · ${getPostsCountText(count)}`;
