import { useCallback, useState } from 'react';

import { createPost as createPostRequest } from '@/api/postsApi';
import type { NewPost, Post } from '@/types/post';
import { toError } from '@/utils/toError';

/**
 * Data hook that creates posts and exposes the sending and error states.
 */
export const useCreatePost = () => {
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Sends the post to the API.
     * @param newPost - Title, body and author of the post.
     * @returns The created post, or `null` when the request fails.
     */
    const createPost = useCallback(async (newPost: NewPost): Promise<Post | null> => {
        setCreating(true);
        setError(null);

        try {
            return await createPostRequest(newPost);
        } catch (caught) {
            setError(toError(caught));
            return null;
        } finally {
            setCreating(false);
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { clearError, createPost, creating, error };
};
