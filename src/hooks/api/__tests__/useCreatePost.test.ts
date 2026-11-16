import { act, renderHook } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { useCreatePost } from '@/hooks/api/useCreatePost';
import { CREATED_POST_ID } from '@/test/msw/fixtures';
import { POSTS_URL } from '@/test/msw/handlers';
import { server } from '@/test/msw/server';

const NEW_POST = { body: 'Body of the new post', title: 'New post', userId: 1 };

describe('useCreatePost', () => {
    it('returns the created post', async () => {
        const { result } = renderHook(() => useCreatePost());

        let created = null;
        await act(async () => {
            created = await result.current.createPost(NEW_POST);
        });

        expect(created).toEqual({ ...NEW_POST, id: CREATED_POST_ID });
        expect(result.current).toMatchObject({ creating: false, error: null });
    });

    it('returns null and exposes the error when the request fails', async () => {
        server.use(http.post(POSTS_URL, () => new HttpResponse(null, { status: 500 })));
        const { result } = renderHook(() => useCreatePost());

        let created = undefined;
        await act(async () => {
            created = await result.current.createPost(NEW_POST);
        });

        expect(created).toBeNull();
        expect(result.current.error).toBeInstanceOf(Error);

        act(() => result.current.clearError());

        expect(result.current.error).toBeNull();
    });
});
