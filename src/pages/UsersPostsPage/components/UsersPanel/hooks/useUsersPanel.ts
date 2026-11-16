import { useMemo, useState } from 'react';

import { useUsers } from '@/hooks/api/useUsers';

import { filterUsersByName } from '../utils/filterUsersByName';

/**
 * Business hook of the users panel: loads the users and filters them by the search text.
 */
export const useUsersPanel = () => {
    const [search, setSearch] = useState('');
    const { data, error, loading, retry } = useUsers();

    const filteredUsers = useMemo(() => filterUsersByName(data ?? [], search), [data, search]);

    return {
        error,
        filteredUsers,
        loading,
        retry,
        search,
        setSearch,
        totalUsers: data?.length ?? 0,
    };
};
