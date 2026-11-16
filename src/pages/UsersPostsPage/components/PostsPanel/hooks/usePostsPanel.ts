import { usePostsByUser } from '@/hooks/api/usePostsByUser';
import type { User } from '@/types/user';

/**
 * Business hook of the posts panel: loads the posts of the selected user.
 * @param user - Selected user, or `null` when no user is selected.
 */
export const usePostsPanel = (user: User | null) => {
    const { data, error, loading, retry } = usePostsByUser(user?.id ?? null);

    return { error, loading, posts: data ?? [], retry };
};
