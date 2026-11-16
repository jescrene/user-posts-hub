import { useCallback } from 'react';

import type { User } from '@/types/user';

import { useScrollToPosts } from './useScrollToPosts';
import { useSelectedUser } from './useSelectedUser';

/**
 * Business hook of the page: selects the user the person picks and, on mobile, takes them to
 * the posts of that user.
 */
export const useUsersPostsPage = () => {
    const { selectedUser, selectUser } = useSelectedUser();
    const { postsPanelRef, scrollToPosts } = useScrollToPosts();

    /**
     * @param user - User the person picked in the users list.
     */
    const handleSelectUser = useCallback(
        (user: User) => {
            selectUser(user);
            scrollToPosts();
        },
        [scrollToPosts, selectUser],
    );

    return { handleSelectUser, postsPanelRef, selectedUser };
};
