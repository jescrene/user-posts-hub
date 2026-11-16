import { useUsers } from '@/hooks/api/useUsers';

/**
 * Business hook of the users panel: loads the users and prepares what the panel shows.
 */
export const useUsersPanel = () => {
    const { data } = useUsers();

    return { users: data ?? [] };
};
