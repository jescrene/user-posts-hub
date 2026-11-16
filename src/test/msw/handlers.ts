import { http, HttpResponse, type AnyHandler } from 'msw';

import { API_BASE_URL, POSTS_ENDPOINT, USERS_ENDPOINT } from '@/constants/api';
import type { NewPost } from '@/types/post';

import { CREATED_POST_ID, POSTS_FIXTURE, USERS_FIXTURE } from './fixtures';

export const USERS_URL = `${API_BASE_URL}${USERS_ENDPOINT}`;
export const USER_POSTS_URL = `${API_BASE_URL}${USERS_ENDPOINT}/:userId/posts`;
export const POSTS_URL = `${API_BASE_URL}${POSTS_ENDPOINT}`;

/**
 * Default API handlers shared by every test (happy paths). They answer like JSONPlaceholder.
 */
export const handlers: AnyHandler[] = [
    http.get(USERS_URL, () => HttpResponse.json(USERS_FIXTURE)),
    http.get(USER_POSTS_URL, ({ params }) =>
        HttpResponse.json(POSTS_FIXTURE.filter(({ userId }) => userId === Number(params.userId))),
    ),
    http.post(POSTS_URL, async ({ request }) => {
        const newPost = (await request.json()) as NewPost;

        return HttpResponse.json({ ...newPost, id: CREATED_POST_ID }, { status: 201 });
    }),
];
