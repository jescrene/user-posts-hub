import type { User } from '@/types/user';
import { normalizeText } from '@/utils/normalizeText';

/**
 * Keeps the users whose name contains the search text, ignoring case and accents.
 * @param users - Users to filter.
 * @param search - Text typed by the person. An empty text keeps every user.
 */
export const filterUsersByName = (users: User[], search: string) => {
    const normalizedSearch = normalizeText(search);

    if (!normalizedSearch) return users;

    return users.filter(({ name }) => normalizeText(name).includes(normalizedSearch));
};
