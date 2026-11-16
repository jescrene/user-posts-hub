import type { NewPostValues } from '../types/newPostValues';

/** Why a field is not valid. The form turns it into a message in the language of the interface. */
export type NewPostError = 'required';

/** Error of each invalid field; valid fields are left out. */
export type NewPostErrors = Partial<Record<keyof NewPostValues, NewPostError>>;

/**
 * Checks that the title and the text are filled in. Text with only spaces counts as empty.
 * @param values - Values typed in the form.
 * @returns The error of each invalid field, or an empty object when the post is valid.
 */
export const validateNewPost = ({ body, title }: NewPostValues): NewPostErrors => ({
    ...(title.trim() ? {} : { title: 'required' }),
    ...(body.trim() ? {} : { body: 'required' }),
});
