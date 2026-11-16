import type { UiTexts } from '@/types/language';

const en = {
    bodyLabel: 'Text',
    bodyPlaceholder: 'Write your post…',
    bodyRequired: 'Write the text of the post.',
    createdText: 'Your post was published.',
    errorText: 'Your post could not be published. Check your connection and try again.',
    formTitle: 'New post',
    submitLabel: 'Publish post',
    submittingLabel: 'Publishing…',
    titleLabel: 'Title',
    titlePlaceholder: 'What is your post about?',
    titleRequired: 'Write a title for the post.',
};

/** Texts of the new post form. */
export type NewPostFormUiTexts = typeof en;

const es: NewPostFormUiTexts = {
    bodyLabel: 'Texto',
    bodyPlaceholder: 'Escribe tu publicación…',
    bodyRequired: 'Escribe el texto de la publicación.',
    createdText: 'Tu publicación se ha publicado.',
    errorText: 'No se pudo publicar. Revisa tu conexión e inténtalo de nuevo.',
    formTitle: 'Nueva publicación',
    submitLabel: 'Publicar',
    submittingLabel: 'Publicando…',
    titleLabel: 'Título',
    titlePlaceholder: '¿De qué trata tu publicación?',
    titleRequired: 'Escribe un título para la publicación.',
};

export const newPostFormUiTexts: UiTexts<NewPostFormUiTexts> = { en, es };
