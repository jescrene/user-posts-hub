/** Base URL of the API. It can be overridden with `VITE_API_BASE_URL`. */
export const API_BASE_URL: string =
    import.meta.env.VITE_API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';

export const USERS_ENDPOINT = '/users';
export const POSTS_ENDPOINT = '/posts';

/**
 * @param userId - Id of the user whose posts are requested.
 * @returns Endpoint that lists the posts of the user, e.g. `/users/1/posts`.
 */
export const getUserPostsEndpoint = (userId: number) => `${USERS_ENDPOINT}/${userId}/posts`;
