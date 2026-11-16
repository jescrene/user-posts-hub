import { act, renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { usePostsByUser } from '@/hooks/api/usePostsByUser';
import { POSTS_FIXTURE } from '@/test/msw/fixtures';
import { USER_POSTS_URL } from '@/test/msw/handlers';
import { server } from '@/test/msw/server';

const LEANNE_POSTS = POSTS_FIXTURE.filter(({ userId }) => userId === 1);
const ERVIN_POSTS = POSTS_FIXTURE.filter(({ userId }) => userId === 2);

describe('usePostsByUser', () => {
    it('loads nothing while no user is selected', () => {
        const { result } = renderHook(() => usePostsByUser(null));

        expect(result.current).toMatchObject({ data: null, error: null, loading: false });
    });

    it('shows the loading state and then the posts of the user', async () => {
        const { result } = renderHook(() => usePostsByUser(1));

        expect(result.current.loading).toBe(true);
        await waitFor(() => expect(result.current.data).toEqual(LEANNE_POSTS));
        expect(result.current.loading).toBe(false);
    });

    it('loads the posts again when the user changes', async () => {
        const { rerender, result } = renderHook(({ userId }) => usePostsByUser(userId), {
            initialProps: { userId: 1 },
        });

        await waitFor(() => expect(result.current.data).toEqual(LEANNE_POSTS));
        rerender({ userId: 2 });

        expect(result.current).toMatchObject({ data: null, loading: true });
        await waitFor(() => expect(result.current.data).toEqual(ERVIN_POSTS));
    });

    it('exposes the error and loads the posts again on retry', async () => {
        server.use(
            http.get(USER_POSTS_URL, () => new HttpResponse(null, { status: 500 }), { once: true }),
        );
        const { result } = renderHook(() => usePostsByUser(1));

        await waitFor(() => expect(result.current.error).not.toBeNull());
        expect(result.current.data).toBeNull();

        act(() => result.current.retry());

        await waitFor(() => expect(result.current.data).toEqual(LEANNE_POSTS));
        expect(result.current.error).toBeNull();
    });
});
