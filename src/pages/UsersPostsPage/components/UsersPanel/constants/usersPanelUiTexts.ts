import type { UiTexts } from '@/types/language';

/**
 * @param username - Handle of the user.
 * @param email - Email of the user.
 * @returns Secondary line of a user item, e.g. "@Bret · sincere@april.biz". It is the same in
 * every language.
 */
export const getUserSecondaryText = (username: string, email: string) =>
    `@${username} · ${email.toLowerCase()}`;

const en = {
    clearSearchLabel: 'Clear search',
    errorMessage: 'Check your connection and try again.',
    errorTitle: 'Users could not be loaded',
    loadingLabel: 'Loading users',
    loadingText: 'Loading users…',
    noUsers: 'There are no users yet.',
    /** @returns Message shown when no user matches the search. */
    noUsersMatch: (search: string) => `No users match "${search.trim()}".`,
    retryLabel: 'Retry',
    searchLabel: 'Search by name',
    searchPlaceholder: 'e.g. Leanne',
    title: 'Users',
    /** @returns e.g. "10 users". */
    usersCount: (count: number) => `${count} ${count === 1 ? 'user' : 'users'}`,
    /** @returns Matches of the search, e.g. "3 of 10 users". */
    usersMatchCount: (shown: number, total: number) =>
        `${shown} of ${total} ${total === 1 ? 'user' : 'users'}`,
};

/** Texts of the users panel. */
export type UsersPanelUiTexts = typeof en;

const es: UsersPanelUiTexts = {
    clearSearchLabel: 'Borrar búsqueda',
    errorMessage: 'Revisa tu conexión e inténtalo de nuevo.',
    errorTitle: 'No se pudieron cargar los usuarios',
    loadingLabel: 'Cargando usuarios',
    loadingText: 'Cargando usuarios…',
    noUsers: 'Todavía no hay usuarios.',
    noUsersMatch: (search) => `Ningún usuario coincide con "${search.trim()}".`,
    retryLabel: 'Reintentar',
    searchLabel: 'Buscar por nombre',
    searchPlaceholder: 'p. ej. Leanne',
    title: 'Usuarios',
    usersCount: (count) => `${count} ${count === 1 ? 'usuario' : 'usuarios'}`,
    usersMatchCount: (shown, total) =>
        `${shown} de ${total} ${total === 1 ? 'usuario' : 'usuarios'}`,
};

export const usersPanelUiTexts: UiTexts<UsersPanelUiTexts> = { en, es };
