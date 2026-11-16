import { getUserPostsEndpoint, POSTS_ENDPOINT } from '@/constants/api';
import type { NewPost, Post } from '@/types/post';

import { request } from './httpClient';

/**
 * Gets the posts written by a user.
 * @param userId - Id of the user.
 * @param signal - Cancels the request.
 * Used by {@link usePostsByUser}.
 */
export const getPostsByUser = (userId: number, signal?: AbortSignal) =>
    request<Post[]>(getUserPostsEndpoint(userId), { signal });

/**
 * Creates a post. JSONPlaceholder does not store it: it answers with the post and the id 101.
 * @param newPost - Title, body and author of the post.
 * Used by {@link useCreatePost}.
 */
export const createPost = (newPost: NewPost) =>
    request<Post>(POSTS_ENDPOINT, { body: newPost, method: 'POST' });
