import { useCallback, useState } from 'react';

import type { User } from '@/types/user';

/**
 * Business hook of the page: keeps the user whose posts are shown.
 */
export const useSelectedUser = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    /**
     * @param user - User the person picked in the users list.
     */
    const selectUser = useCallback((user: User) => setSelectedUser(user), []);

    return { selectedUser, selectUser };
};
