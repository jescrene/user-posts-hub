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
