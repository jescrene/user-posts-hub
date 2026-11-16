import type { UiTexts } from '@/types/language';

const en = {
    emptyText: 'This user has not written any posts yet.',
    errorMessage: 'Check your connection and try again.',
    errorTitle: 'Posts could not be loaded',
    loadingLabel: 'Loading posts',
    loadingText: 'Loading posts…',
    noUserText: 'Select a user to see their posts.',
    /** @returns e.g. "10 posts". */
    postsCount: (count: number) => `${count} ${count === 1 ? 'post' : 'posts'}`,
    retryLabel: 'Retry',
    title: 'Posts',
};

/** Texts of the posts panel. */
export type PostsPanelUiTexts = typeof en;

const es: PostsPanelUiTexts = {
    emptyText: 'Este usuario todavía no ha escrito publicaciones.',
    errorMessage: 'Revisa tu conexión e inténtalo de nuevo.',
    errorTitle: 'No se pudieron cargar las publicaciones',
    loadingLabel: 'Cargando publicaciones',
    loadingText: 'Cargando publicaciones…',
    noUserText: 'Elige un usuario para ver sus publicaciones.',
    postsCount: (count) => `${count} ${count === 1 ? 'publicación' : 'publicaciones'}`,
    retryLabel: 'Reintentar',
    title: 'Publicaciones',
};

export const postsPanelUiTexts: UiTexts<PostsPanelUiTexts> = { en, es };
