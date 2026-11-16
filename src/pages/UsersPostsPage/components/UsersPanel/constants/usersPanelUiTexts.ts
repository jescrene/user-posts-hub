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

export const USER_SEARCH_LABEL = 'Search by name';
export const USER_SEARCH_PLACEHOLDER = 'e.g. Leanne';
export const USER_SEARCH_CLEAR_LABEL = 'Clear search';
export const NO_USERS_TEXT = 'There are no users yet.';

/**
 * @param search - Text typed in the search.
 * @returns Message shown when no user matches the search.
 */
export const getNoUsersMatchText = (search: string) => `No users match "${search.trim()}".`;

interface UsersSubtitleParams {
    error: Error | null;
    loading: boolean;
    /** Number of users that match the search. */
    shownCount: number;
    /** Number of users. */
    totalCount: number;
}

/**
 * @returns Subtitle of the users panel: a loading text, the count ("10 users"), the matches while
 * searching ("3 of 10 users"), or nothing after an error.
 */
export const getUsersSubtitle = ({
    error,
    loading,
    shownCount,
    totalCount,
}: UsersSubtitleParams) => {
    if (loading) return USERS_LOADING_TEXT;
    if (error) return undefined;

    return shownCount === totalCount
        ? getUsersCountText(totalCount)
        : `${shownCount} of ${getUsersCountText(totalCount)}`;
};
