import { getUsers } from '@/api/usersApi';
import { useFetch } from '@/hooks/useFetch';

/**
 * Data hook that loads every user.
 */
export const useUsers = () => useFetch(getUsers);
