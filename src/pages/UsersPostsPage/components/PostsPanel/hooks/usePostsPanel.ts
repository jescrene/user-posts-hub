import { useCallback, useMemo, useRef, useState } from 'react';

import { useCreatePost } from '@/hooks/api/useCreatePost';
import { usePostsByUser } from '@/hooks/api/usePostsByUser';
import type { Post } from '@/types/post';
import type { User } from '@/types/user';

import type { NewPostValues } from '../types/newPostValues';

/**
 * Business hook of the posts panel: loads the posts of the selected user and creates new ones.
 * JSONPlaceholder does not store the created posts and always answers with the id 101, so they
 * are kept here with a local negative id, unique and different from the ids of the API.
 * @param user - Selected user, or `null` when no user is selected.
 */
export const usePostsPanel = (user: User | null) => {
    const [createdPosts, setCreatedPosts] = useState<Post[]>([]);
    const [showCreatedNotice, setShowCreatedNotice] = useState(false);
    const nextLocalId = useRef(-1);
    const { data, error, loading, retry } = usePostsByUser(user?.id ?? null);
    const { createPost, creating } = useCreatePost();

    /**
     * Creates a post for the selected user and shows it first in the list.
     * @param values - Title and text of the post.
     * @returns Whether the post was created.
     */
    const addPost = useCallback(
        async ({ body, title }: NewPostValues) => {
            if (!user) return false;

            const created = await createPost({ body, title, userId: user.id });

            if (!created) return false;

            const localPost = { ...created, id: nextLocalId.current };
            nextLocalId.current -= 1;
            setCreatedPosts((current) => [localPost, ...current]);
            setShowCreatedNotice(true);

            return true;
        },
        [createPost, user],
    );

    const closeCreatedNotice = useCallback(() => setShowCreatedNotice(false), []);

    const posts = useMemo(
        () => [...createdPosts.filter(({ userId }) => userId === user?.id), ...(data ?? [])],
        [createdPosts, data, user],
    );

    return {
        addPost,
        closeCreatedNotice,
        creating,
        error,
        loading,
        posts,
        retry,
        showCreatedNotice,
    };
};
