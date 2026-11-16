import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
    const [failedUserId, setFailedUserId] = useState<number | null>(null);
    // Users with a post being sent. A list, so a request that ends does not unlock another one.
    const [pendingUserIds, setPendingUserIds] = useState<number[]>([]);
    const nextLocalId = useRef(-1);
    // User selected now, read when a request ends to know if the person is still on that user.
    const selectedUserId = useRef<number | null>(user?.id ?? null);
    const { data, error, loading, retry } = usePostsByUser(user?.id ?? null);
    const { clearError, createPost, error: createError } = useCreatePost();

    useEffect(() => {
        selectedUserId.current = user?.id ?? null;
    }, [user]);

    /**
     * Creates a post for the selected user and shows it first in the list.
     * @param values - Title and text of the post.
     * @returns Whether the post was created.
     */
    const addPost = useCallback(
        async ({ body, title }: NewPostValues) => {
            if (!user) return false;

            const userId = user.id;
            setPendingUserIds((ids) => [...ids, userId]);
            const created = await createPost({ body, title, userId });
            setPendingUserIds((ids) => ids.filter((id) => id !== userId));

            if (!created) {
                setFailedUserId(userId);
                return false;
            }

            const localPost = { ...created, id: nextLocalId.current };
            nextLocalId.current -= 1;
            setCreatedPosts((current) => [localPost, ...current]);
            // The notice confirms the post to the person looking at that user, not at another one.
            if (selectedUserId.current === userId) setShowCreatedNotice(true);

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
        clearCreateError: clearError,
        closeCreatedNotice,
        // The error belongs to the user it failed for, so it is hidden after selecting another.
        createFailed: Boolean(createError) && failedUserId === user?.id,
        // The post is being sent for the selected user, so the form of another user stays free.
        creating: user ? pendingUserIds.includes(user.id) : false,
        error,
        loading,
        posts,
        retry,
        showCreatedNotice,
    };
};
