import { describe, expect, it } from 'vitest';

import {
    NEW_POST_BODY_REQUIRED,
    NEW_POST_TITLE_REQUIRED,
} from '../../constants/newPostFormUiTexts';
import { validateNewPost } from '../validateNewPost';

describe('validateNewPost', () => {
    it('accepts a post with a title and a text', () => {
        expect(validateNewPost({ body: 'Text', title: 'Title' })).toEqual({});
    });

    it('requires the title and the text', () => {
        expect(validateNewPost({ body: '', title: '' })).toEqual({
            body: NEW_POST_BODY_REQUIRED,
            title: NEW_POST_TITLE_REQUIRED,
        });
    });

    it('treats text with only spaces or line breaks as empty', () => {
        expect(validateNewPost({ body: ' \n ', title: '   ' })).toEqual({
            body: NEW_POST_BODY_REQUIRED,
            title: NEW_POST_TITLE_REQUIRED,
        });
    });
});
