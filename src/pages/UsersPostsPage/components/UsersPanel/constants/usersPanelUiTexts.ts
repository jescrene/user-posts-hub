export const USERS_PANEL_TITLE = 'Users';

/**
 * @param count - Number of users.
 * @returns Subtitle of the users panel, e.g. "10 users".
 */
export const getUsersCountText = (count: number) => `${count} ${count === 1 ? 'user' : 'users'}`;

/**
 * @param username - Handle of the user.
 * @param email - Email of the user.
 * @returns Secondary line of a user item, e.g. "@Bret · sincere@april.biz".
 */
export const getUserSecondaryText = (username: string, email: string) =>
    `@${username} · ${email.toLowerCase()}`;

export const USERS_LOADING_TEXT = 'Loading users…';
export const USERS_LOADING_LABEL = 'Loading users';
export const USERS_ERROR_TITLE = 'Users could not be loaded';
export const USERS_ERROR_MESSAGE = 'Check your connection and try again.';
export const USERS_RETRY_LABEL = 'Retry';

/**
 * @param params - Request state of the users and how many there are.
 * @returns Subtitle of the users panel: a loading text, the count, or nothing after an error.
 */
export const getUsersSubtitle = ({
    error,
    loading,
    usersCount,
}: {
    error: Error | null;
    loading: boolean;
    usersCount: number;
}) => {
    if (loading) return USERS_LOADING_TEXT;

    return error ? undefined : getUsersCountText(usersCount);
};
