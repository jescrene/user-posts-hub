import { describe, expect, it } from 'vitest';

import { validateNewPost } from '../validateNewPost';

describe('validateNewPost', () => {
    it('accepts a post with a title and a text', () => {
        expect(validateNewPost({ body: 'Text', title: 'Title' })).toEqual({});
    });

    it('requires the title and the text', () => {
        expect(validateNewPost({ body: '', title: '' })).toEqual({
            body: 'required',
            title: 'required',
        });
    });

    it('treats text with only spaces or line breaks as empty', () => {
        expect(validateNewPost({ body: ' \n ', title: '   ' })).toEqual({
            body: 'required',
            title: 'required',
        });
    });
});
