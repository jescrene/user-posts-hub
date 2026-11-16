import { NEW_POST_BODY_REQUIRED, NEW_POST_TITLE_REQUIRED } from '../constants/newPostFormUiTexts';
import type { NewPostValues } from '../types/newPostValues';

/** Error message of each invalid field; valid fields are left out. */
export type NewPostErrors = Partial<Record<keyof NewPostValues, string>>;

/**
 * Checks that the title and the text are filled in. Text with only spaces counts as empty.
 * @param values - Values typed in the form.
 * @returns The error of each invalid field, or an empty object when the post is valid.
 */
export const validateNewPost = ({ body, title }: NewPostValues): NewPostErrors => ({
    ...(title.trim() ? {} : { title: NEW_POST_TITLE_REQUIRED }),
    ...(body.trim() ? {} : { body: NEW_POST_BODY_REQUIRED }),
});
