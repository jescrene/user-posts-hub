import { useMemo } from 'react';

import { getPostsByUser } from '@/api/postsApi';
import { useFetch } from '@/hooks/useFetch';

/**
 * Data hook that loads the posts of a user, and loads them again when the user changes.
 * @param userId - Id of the user, or `null` when no user is selected.
 * Used by {@link useCreatePost} to reload the posts after a new post is created.
 */
export const usePostsByUser = (userId: number | null) => {
    const fetcher = useMemo(
        () => (userId === null ? null : (signal: AbortSignal) => getPostsByUser(userId, signal)),
        [userId],
    );

    return useFetch(fetcher);
};
